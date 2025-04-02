import Product from "../models/product.model.js";
import { errorhandler } from "../utils/error.js";

export const create = async (req,res,next)=>{
    // if(!req.user.isAdmin){
    //     return next(errorhandler(403,'You are not allowed to create the post'));
    // }
    
    const newProduct = new Product({
        ...req.body, 
    });
    try {
        const saveProduct = await newProduct.save();
        res.status(200).json(saveProduct);
    } catch (error) {
        next(error);
    }
};

export const getProducts = async (req,res,next)=>{
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit);
        const sortDirection = req.query.order === 'asc' ? 1 : -1;
        const products = await Product.find()
        .sort({createdAt: sortDirection}).skip(startIndex).limit(limit);

        
        const totalProducts = await Product.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth()-1,
        now.getDate()
    );
    const lastMonthProducts = await Product.countDocuments({
        createdAt: { $gte: oneMonthAgo},
    });

    const thirtyTwoDaysAgo = new Date();
        
        thirtyTwoDaysAgo.setDate(now.getDate() - 33);
 

    res.status(200).json({products,totalProducts,lastMonthProducts});

         
    } catch (error) {
        next(error);
    }
}

export const updateProducts = async (req,res,next)=>{
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params._id,{
                $set:{
                    id: req.body.id,
                    name: req.body.name,
                    head: req.body.head,
                    launchDate: req.body.launchDate,
                    cost: req.body.cost,
                    status: req.body.status,
                }
            },{new: true}
        )
        res.status(200).json(updatedProduct);
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (req,res,next)=>{
    try {
        await Product.findByIdAndDelete(req.params._id);
        res.status(200).json('The product has been deleted');
    } catch (error) {
        next(error);
    }
};

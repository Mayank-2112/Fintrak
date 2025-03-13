import Purchase from "../models/purchase.model.js";
import { errorhandler } from "../utils/error.js";

export const create = async (req,res,next)=>{
    // if(!req.user.isAdmin){
    //     return next(errorhandler(403,'You are not allowed to create the post'));
    // }
    
    const newPurchase = new Purchase({
        ...req.body, 
    });
    try {
        const savePurchase = await newPurchase.save();
        res.status(200).json(savePurchase);
    } catch (error) {
        next(error);
    }
};

export const getPurchases = async (req,res,next)=>{
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit);
        const sortDirection = req.query.order === 'asc' ? 1 : -1;
        const purchases = await Purchase.find()
        .sort({createdAt: sortDirection}).skip(startIndex).limit(limit);

        
        const totalPurchases = await Purchase.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth()-1,
        now.getDate()
    );
    const lastMonthPurchases = await Purchase.countDocuments({
        createdAt: { $gte: oneMonthAgo},
    });

    res.status(200).json({purchases,totalPurchases,lastMonthPurchases});

         
    } catch (error) {
        next(error);
    }
}

export const updatePurchase = async (req,res,next)=>{
    try {
        const updatedPurchase = await Purchase.findByIdAndUpdate(
            req.params._id,{
                $set:{
                    id: req.body.id,
                    purchaseItem: req.body.purchaseItem,
                    vendorName: req.body.vendorName,
                    purchaseDate: req.body.purchaseDate,
                    amount: req.body.amount,
                    category: req.body.category,
                }
            },{new: true}
        )
        res.status(200).json(updatedPurchase);
    } catch (error) {
        next(error);
    }
};

export const deletePurchase = async (req,res,next)=>{
    try {
        await Purchase.findByIdAndDelete(req.params._id);
        res.status(200).json('The purchase has been deleted');
    } catch (error) {
        next(error);
    }
};

import Sale from "../models/sale.model.js";
import { errorhandler } from "../utils/error.js";

export const create = async (req,res,next)=>{
    // if(!req.user.isAdmin){
    //     return next(errorhandler(403,'You are not allowed to create the post'));
    // }
    
    const newSale = new Sale({
        ...req.body, 
    });
    try {
        const saveSale = await newSale.save();
        res.status(200).json(saveSale);
    } catch (error) {
        next(error);
    }
};

export const getSales = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit);
        const sortDirection = req.query.order === 'asc' ? 1 : -1;

        // Fetch paginated sales sorted by salesDate
        const sales = await Sale.find()
            .sort({ salesDate: sortDirection })
            .skip(startIndex)
            .limit(limit);

        // Get total sales count
        const totalSales = await Sale.countDocuments();

        // Get the first day and last day of the current month
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); // 1st day of the month
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Last day of the month


        // Calculate total sales amount for the current month based on salesDate
        const currentMonthSalesAmount = await Sale.aggregate([
            { 
                $match: { 
                    salesDate: { $gte: startOfMonth, $lte: endOfMonth } 
                } 
            },
            { 
                $group: { 
                    _id: null, 
                    totalAmount: { $sum: "$amount" } 
                } 
            }
        ]);

        // Extract the total amount or set to 0 if no data found
        const currentMonthTotalAmount = currentMonthSalesAmount.length > 0 ? currentMonthSalesAmount[0].totalAmount : 0;

        res.status(200).json({ 
            sales, 
            totalSales, 
            currentMonthTotalAmount 
        });

    } catch (error) {
        next(error);
    }
};

export const updateSale = async (req,res,next)=>{
    try {
        const updatedSale = await Sale.findByIdAndUpdate(
            req.params._id,{
                $set:{
                    id: req.body.id,
                    productName: req.body.productName,
                    clientName: req.body.clientName,
                    saleDate: req.body.saleDate,
                    amount: req.body.amount,
                }
            },{new: true}
        )
        res.status(200).json(updatedSale);
    } catch (error) {
        next(error);
    }
};

export const deleteSale = async (req,res,next)=>{
    try {
        await Sale.findByIdAndDelete(req.params._id);
        res.status(200).json('The sale has been deleted');
    } catch (error) {
        next(error);
    }
};

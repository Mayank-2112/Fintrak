import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    productName: {
        type: String,
        required: true,
    },
    clientName:{
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    saleDate: {
        type: Date,
        required: true,
    },
},{timestamps: true});

const Sale = mongoose.model('Sale', saleSchema);

export default Sale;
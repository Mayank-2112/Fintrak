import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    purchaseItem: {
        type: String,
        required: true,
    },
    vendorName:{
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    purchaseDate: {
        type: Date,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
},{timestamps: true});

const Purchase = mongoose.model('Purchase', purchaseSchema);

export default Purchase;
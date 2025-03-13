import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    head:{
        type: String,
        required: true
    },
    launchDate:{
        type: Date,
        required: true
    },
    cost:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        required: true
    }
},{timestamps: true});

const Product = mongoose.model('Product', productSchema);

export default Product;
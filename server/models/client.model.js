import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
},{timestamps: true});

const Client = mongoose.model('Client', clientSchema);

export default Client;
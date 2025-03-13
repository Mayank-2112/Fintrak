import mongoose from "mongoose";

const deptSchema = new mongoose.Schema({
    deptId: {
        type: String,
        required: true,
        unique: true,
    },
    deptName: {
        type: String,
        required: true,
        unique: true,
    },
    deptHead: {
        type: String,
        required: true,
    },
    
},{timestamps: true});

const Dept = mongoose.model('Dept', deptSchema);

export default Dept;
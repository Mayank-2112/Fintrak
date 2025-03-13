import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
    memId: {
        type: Number,
        required: true,
        unique: true,
    },
    memName: {
        type: String,
        required: true,
    },
    memEmail: {
        type: String,
        required: true,
    },
    memRole: {
        type: String,
        required: true,
    },
    deptId:{
        type: String,
        required: true,
    }

},{timestamps: true});

const Member = mongoose.model('Member', memberSchema);

export default Member;

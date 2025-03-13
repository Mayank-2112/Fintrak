import Dept from "../models/dept.model.js";
import { errorhandler } from "../utils/error.js";

export const create = async (req,res,next)=>{
    // if(!req.user.isAdmin){
    //     return next(errorhandler(403,'You are not allowed to create the post'));
    // }
    
    const newDept = new Dept({
        ...req.body, 
    });
    try {
        const saveDept = await newDept.save();
        res.status(200).json(saveDept);
    } catch (error) {
        next(error);
    }
};

export const getDepts = async (req,res,next)=>{
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit);
        const sortDirection = req.query.order === 'asc' ? 1 : -1;
        const depts = await Dept.find()
        .sort({createdAt: sortDirection}).skip(startIndex).limit(limit);

        
        const totalDepts = await Dept.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth()-1,
        now.getDate()
    );
    const lastMonthDepts = await Dept.countDocuments({
        createdAt: { $gte: oneMonthAgo},
    });

    res.status(200).json({depts,totalDepts,lastMonthDepts});

         
    } catch (error) {
        next(error);
    }
}

export const updateDept = async (req,res,next)=>{
    try {
        const updatedDept = await Dept.findByIdAndUpdate(
            req.params._id,{
                $set:{
                    deptId: req.body.deptId,
                    deptName: req.body.deptName,
                    deptHead: req.body.deptHead,
                }
            },{new: true}
        )
        res.status(200).json(updatedDept);
    } catch (error) {
        next(error);
    }
};

export const deleteDept = async (req,res,next)=>{
    try {
        await Dept.findByIdAndDelete(req.params._id);
        res.status(200).json('The department has been deleted');
    } catch (error) {
        next(error);
    }
};

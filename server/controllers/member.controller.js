import Member from "../models/member.model.js";
import { errorhandler } from "../utils/error.js";

export const create = async (req,res,next)=>{
    // if(!req.user.isAdmin){
    //     return next(errorhandler(403,'You are not allowed to create the post'));
    // }
    
    const newMember = new Member({
        ...req.body, 
    });
    try {
        const saveMember = await newMember.save();
        res.status(200).json(saveMember);
    } catch (error) {
        next(error);
    }
};

export const getMembers = async (req,res,next)=>{
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit);
        const sortDirection = req.query.order === 'asc' ? 1 : -1;
        const members = await Member.find()
        .sort({createdAt: sortDirection}).skip(startIndex).limit(limit);

        
        const totalMembers = await Member.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth()-1,
        now.getDate()
    );
    const lastMonthMembers = await Member.countDocuments({
        createdAt: { $gte: oneMonthAgo},
    });

    res.status(200).json({members,totalMembers,lastMonthMembers});

         
    } catch (error) {
        next(error);
    }
}

export const updateMember = async (req,res,next)=>{
    try {
        const updatedMember = await Member.findByIdAndUpdate(
            req.params._id,{
                $set:{
                    memId: req.body.memId,
                    memName: req.body.memName,
                    memEmail: req.body.memEmail,
                    memRole: req.body.memRole,
                    deptId: req.body.deptId,
                }
            },{new: true}
        )
        res.status(200).json(updatedMember);
    } catch (error) {
        next(error);
    }
};

export const deleteMember = async (req,res,next)=>{
    try {
        await Member.findByIdAndDelete(req.params._id);
        res.status(200).json('The member has been deleted');
    } catch (error) {
        next(error);
    }
};

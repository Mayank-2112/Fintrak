import User from "../models/user.model.js";
import { errorhandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';


export const update = async (req,res,next)=>{
    if(req.body.password){
        if(req.body.password.length < 6){
            return next(errorhandler(400,'Password must be atleast 6 characters'));
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    };
    if(req.body.name){
        if(req.body.name.length < 7 || req.body.name.length > 20){
            return next(errorhandler(400,'Username must be between 7 and 20 characters'));
        }
        
    }
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id,{
            $set: {
                name : req.body.name,
                email: req.body.email,
                password: req.body.password,
                profilePicture: req.body.profilePicture,
            },
        },{new: true});
        const {password, ...rest} = updateUser._doc;
        res.status(200).json(rest);
    } 
    catch (error) {
        next(error);
    }
};
    
export const deleteUser = async (req,res,next)=>{
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('User has been deleted');
    } catch (error) {
        next(error);
    }
};



export const getUser = async (req,res,next)=>{
    try {
        const user = await User.findById(req.params.userId);
        if(!user){
            return next(errorhandler(404,'User Not Found!!'));
        }
        const {password,...rest} = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};
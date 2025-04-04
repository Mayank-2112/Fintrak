import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorhandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup = async (req,res,next)=>{
    const {name,email,password} = req.body;
    console.log(req.body);
    
    if(!name || !email || !password || name === '' || email === '' || password === '')
    {
        next(errorhandler(400,'All fields are required!!'));
    }
    const hashPassword = bcryptjs.hashSync(password,10);
    const newUser = new User({name,email,password:hashPassword});
    try {
        await newUser.save();
        res.json({ success: true, message: 'User added' });
    } catch (error) {
        next(error);        
    }
}

export const signin = async (req,res,next)=>{
    const {email,password} = req.body;
    if(!email || !password || email === '' || password === ''){
        next(errorhandler(400,'All fields are required'));
    }
    
    try {
        const validUser = await User.findOne({email});
        if(!validUser){
            return next(errorhandler(404,'User Not Found!!'));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword){
            return next(errorhandler(404,'Invalid Password!!'));
        }
        const token = jwt.sign({id: validUser._id, isAdmin: validUser.isAdmin},process.env.JWT_SECRET);
        const {password: pass, ...rest} = validUser._doc;
        res.status(200).cookie('access_token', token, { httpOnly: true }).json(rest);
    } catch (error) {
        next(error);
    }
}

export const google = async (req,res,next)=>{
    const {email,name,googlePhotoURL} = req.body;
    try {
        const user = await User.findOne({email});
        if(user){
            const token = jwt.sign({id: user._id, isAdmin: user.isAdmin},process.env.JWT_SECRET);
            const {password,...rest} =user._doc;
            res.status(200).cookie('access_token',token,{
                httpOnly: true,
            }).json(rest);
        }
        else{
            const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatePassword,10);
            const newUser = new User({
                name: name,
                email,
                password: hashedPassword,
                profilePicture: googlePhotoURL,
            });
            await newUser.save();
            const token = jwt.sign({id: newUser._id, isAdmin: newUser.isAdmin},process.env.JWT_SECRET);
            const {password,...rest} =newUser._doc;
            res.status(200).cookie('access_token',token,{
                httpOnly: true,
            }).json(rest);
        }
    } catch (error) {
        next(error);
    }
}
export const signout = async (req,res,next)=>{
    try {
        res.clearCookie('access_token');
        res.status(200).json('User have been logged out!');
    } catch (error) {
        next(error);
    }
}

import Client from "../models/client.model.js";
import { errorhandler } from "../utils/error.js";

export const create = async (req,res,next)=>{
    // if(!req.user.isAdmin){
    //     return next(errorhandler(403,'You are not allowed to create the post'));
    // }
    
    const newClient = new Client({
        ...req.body, 
    });
    try {
        const saveCLient = await newClient.save();
        res.status(200).json(saveCLient);
    } catch (error) {
        next(error);
    }
};

export const getClients = async (req,res,next)=>{
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit);
        const sortDirection = req.query.order === 'asc' ? 1 : -1;
        const clients = await Client.find()
        .sort({createdAt: sortDirection}).skip(startIndex).limit(limit);

        
        const totalClients = await Client.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth()-1,
        now.getDate()
    );
    const lastMonthClients = await Client.countDocuments({
        createdAt: { $gte: oneMonthAgo},
    });

    res.status(200).json({clients,totalClients,lastMonthClients});

         
    } catch (error) {
        next(error);
    }
}

export const updateClient = async (req,res,next)=>{
    try {
        const updatedClient = await Client.findByIdAndUpdate(
            req.params._id,{
                $set:{
                    id: req.body.id,
                    name: req.body.name,
                    email: req.body.email,
                    status: req.body.status,
                }
            },{new: true}
        )
        res.status(200).json(updatedClient);
    } catch (error) {
        next(error);
    }
};

export const deleteClient = async (req,res,next)=>{
    try {
        await Client.findByIdAndDelete(req.params._id);
        res.status(200).json('The client has been deleted');
    } catch (error) {
        next(error);
    }
};

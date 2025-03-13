import express from 'express';
import {verifyToken} from '../utils/verifyUser.js';
import { create, deleteClient, getClients, updateClient } from '../controllers/client.controller.js';
const router = express.Router();

router.post('/create', create);
router.get('/getall', getClients);
router.delete('/delete/:_id', deleteClient);  
router.put('/update/:_id',updateClient); 

export default router;
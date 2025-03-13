import express from 'express';
import {verifyToken} from '../utils/verifyUser.js';
import { deleteUser, getUser, update } from '../controllers/user.controller.js';
const router = express.Router();

router.get('/getuser', getUser);
router.delete('/delete/:_id', deleteUser);  
router.put('/update/:id',update); 

export default router;
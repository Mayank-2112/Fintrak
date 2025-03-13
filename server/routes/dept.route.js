import express from 'express';
import {verifyToken} from '../utils/verifyUser.js';
import { create, deleteDept, getDepts, updateDept } from '../controllers/dept.controller.js';
const router = express.Router();

router.post('/create', create);
router.get('/getall', getDepts);
router.delete('/delete/:_id', deleteDept);  
router.put('/update/:_id',updateDept); 

export default router;
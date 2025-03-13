import express from 'express';
import {verifyToken} from '../utils/verifyUser.js';
import { create, deleteMember, getMembers, updateMember } from '../controllers/member.controller.js';
const router = express.Router();

router.post('/create', create);
router.get('/getall', getMembers);
router.delete('/delete/:_id', deleteMember);  
router.put('/update/:_id',updateMember); 

export default router;
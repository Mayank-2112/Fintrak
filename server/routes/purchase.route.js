import express from 'express';
import {verifyToken} from '../utils/verifyUser.js';
import { create, deletePurchase, getPurchases, updatePurchase } from '../controllers/purchase.controller.js';
const router = express.Router();

router.post('/create', create);
router.get('/getall', getPurchases);
router.delete('/delete/:_id', deletePurchase);  
router.put('/update/:_id',updatePurchase); 

export default router;
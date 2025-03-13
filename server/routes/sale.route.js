import express from 'express';
import {verifyToken} from '../utils/verifyUser.js';
import { create, deleteSale, getSales, updateSale } from '../controllers/sale.controller.js';
const router = express.Router();

router.post('/create', create);
router.get('/getall', getSales);
router.delete('/delete/:_id', deleteSale);  
router.put('/update/:_id',updateSale); 

export default router;
import express from 'express';
import {verifyToken} from '../utils/verifyUser.js';
import { create, deleteProduct, getProducts, updateProducts } from '../controllers/product.controller.js';
const router = express.Router();

router.post('/create', create);
router.get('/getall', getProducts);
// router.get('/getposts',getPosts);
router.delete('/delete/:_id', deleteProduct);  
router.put('/update/:_id',updateProducts); 

export default router;
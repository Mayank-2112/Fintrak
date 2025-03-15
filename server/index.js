import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import productRoutes from './routes/product.route.js';
import clientRoutes from './routes/client.route.js';
import purchaseRoutes from  './routes/purchase.route.js';
import saleRoutes from './routes/sale.route.js';
import userRoutes from './routes/user.route.js';
import deptRoutes from './routes/dept.route.js';
import memberRoutes from './routes/mem.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';


dotenv.config();
mongoose.connect(process.env.MONGO).then(
    ()=>{console.log('Database is connected!!')}
).catch((err)=>{
    console.log(err);
});
const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.listen(3000,()=>{
    console.log('Server is running on port 3000!!');
});
app.use('/server/auth',authRoutes);
app.use('/server/product',productRoutes);
app.use('/server/client',clientRoutes);
app.use('/server/purchase',purchaseRoutes);
app.use('/server/sale',saleRoutes);
app.use('/server/user',userRoutes);
app.use('/server/department', deptRoutes);
app.use('/server/member', memberRoutes);

// app.use(express.static(path.join(__dirname,'/client/dist')));
// app.get('*',(req,res)=>{
//     res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
// });
app.use((err, req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});
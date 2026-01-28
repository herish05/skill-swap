import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import { connectDB } from './db/mongo.js';
import swapRoutes from './routes/swap.routes.js';
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use("/",swapRoutes)
connectDB();
const PORT = process.env.PORT || 4004;

app.listen(PORT,()=>{
    console.log(`Swap service running on Port ${PORT}`);
})
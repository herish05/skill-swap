import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import skillRoutes from './routes/skill-routes.js'
import { connectDB } from './db/mongo.js';
dotenv.config();
const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use("/",skillRoutes);

const PORT = process.env.PORT || 4003;
app.listen(PORT,()=>{
    console.log(`Skill Service running on port ${PORT}`);
})
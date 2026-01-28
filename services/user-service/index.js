import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import connectDB from "./db/mongo.js";
import userProfileRoutes from "./routes/user.routes.js"
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/",userProfileRoutes)

const PORT = process.env.PORT || 4002;

app.listen(PORT,()=>{
    console.log(`User Service running on port ${PORT}`)
})

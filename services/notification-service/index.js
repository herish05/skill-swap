import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import notificationRoutes from "./routes/notification.routes.js"
import { connectDB } from "./db/mongo.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/notification", notificationRoutes);
connectDB();
let PORT = process.env.PORT || 4006;
app.listen(PORT,()=>{
    console.log(`Notification service is running on PORT ${PORT}`);
})
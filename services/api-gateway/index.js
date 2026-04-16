import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js"
import skillRoutes from "./routes/skill.routes.js"
import swapRoutes from "./routes/swap.routes.js";
import notificationRoutes from './routes/notification.routes.js';
import { apiLimiter } from "./middlewares/ratelimiter.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(apiLimiter);
app.use("/auth",authRoutes);
app.use("/users",userRoutes)
app.use("/skills",skillRoutes);
app.use("/swaps",swapRoutes);
app.use("/notification",notificationRoutes);

const PORT = process.env.PORT || 4000;
app.get("/health",async(req,res)=>{
  try {
    res.json({status:"ok",service :"API-Gateway"});
  } catch (error) {
    console.log(error);
    res.status(500).json({message :"error to check health"});
  }
})
app.get("/wake",async(req,res)=>{
  try {
    const services = [
      process.env.AUTH_SERVICE_URL,
      process.env.CHAT_SERVICE_URL,
      process.env.USER_SERVICE_URL,
      process.env.SKILL_SERVICE_URL,
      process.env.SWAP_SERVICE_URL,
      process.env.NOTIFICATION_SERVICE_URL,
    ];
    await Promise.all(
      services.map(url=>fetch(url+"/health")).catch(()=>{})
    )
    res.json({message:"All services triggered"})
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Failed to wake up services"});
  }
})
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});


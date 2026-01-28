import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js"
import skillRoutes from "./routes/skill.routes.js"
import swapRoutes from "./routes/swap.routes.js";
import notificationRoutes from './routes/notification.routes.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth",authRoutes);
app.use("/users",userRoutes)
app.use("/skills",skillRoutes);
app.use("/swaps",swapRoutes);
app.use("/notification",notificationRoutes);
app.get("/health",(req,res)=>{
  res.json({message:"API Gateway is healthy"});
})
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});


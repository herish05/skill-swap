import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/mongo.js";
import authRoutes from "./routes/auth.routes.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
connectDB();
app.use("/",authRoutes);

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT} (ESM)`);
});


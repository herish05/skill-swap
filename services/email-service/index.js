import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import emialRoutes from "./routes/email.routes.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


app.use("/email",emialRoutes);
const PORT = process.env.PORT || 4010;
app.listen(PORT,()=>{
    console.log(`Email service running on PORT ${PORT}`);
});


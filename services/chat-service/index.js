import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import {Server} from "socket.io";
import { connectDB } from "./db/mongo";
import { initChatSocket } from "./sockets/chat.socket";
import chatRoutes from "./routes/chat.routes.js";
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/chats",chatRoutes);
connectDB();
const server = http.createServer(app);
const io = new Server(server,{cors:{origin: "*"}});
const PORT = process.env.PORT || 4007;
initChatSocket(io);
server.listen(PORT,()=>{
    console.log(`Chat service running on PORT ${PORT}`);
})
import jwt from "jsonwebtoken";

export const authFirst = (req,res,next)=>{
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({message:"Authorization token missing"});
        }
        const token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
            if(err)return res.status(401).json({message:"Token expired"});
            req.user = decoded;
            next()
        });
    }catch(error) {
         console.error("Auth error:", error.message);

         return res.status(401).json({ message: "Invalid or expired token" });
    }
}
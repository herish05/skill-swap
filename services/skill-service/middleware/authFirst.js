import jwt from "jsonwebtoken";

export const authFirst = (req,res,next)=>{
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({message:"Authorization token missing"});
        }


        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = {
            userId:decoded.userId,
            email:decoded.email
        };
        next();
    }catch(error) {
         console.error("Auth error:", error.message);
            console.log(error)
         return res.status(401).json({ message: "Invalid or expired token" });
    }
}
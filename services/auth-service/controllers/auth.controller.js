import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const generateOtp = ()=>Math.floor(100000 + Math.random() * 900000).toString();

export const healthCheck = (req,res)=>{
   res.status(200).json({
     service: "auth-service",
     status: "running",
     moduleSystem: "esm",
   });
}

export const signup = async(req,res)=>{
    const {email,password,dateofbirth} = req.body;

    if(!email || !password || !dateofbirth) {
        return res.status(400).json({message:"Email,password and dateofbirth are required"})
    }
    const existingUser = await User.findOne({email});
    if(existingUser) {
        return res.status(409).json({message:"User already exists"});
    }
    const passwordHash = await bcrypt.hash(password,10);
    const otpCode = generateOtp();
    const user = await User.create({
      email: email.toLowerCase(),
      passwordHash,
      dateofbirth: new Date(dateofbirth),
      otp: {
        code: otpCode,
        purpose: "email-verification",
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 min
      },
    });
    console.log("OTP for email verification :",otpCode)
    res.status(201).json({message:"User registered.verify your email using otp."});
}

export const verifyEmailOtp = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user || !user.otp)
    return res.status(400).json({ error: "Invalid request" });

  if (
    user.otp.code !== String(otp) ||
    user.otp.expiresAt < new Date() ||
    user.otp.purpose !== "email-verification"
  ) {
    return res.status(400).json({ error: "Invalid or expired OTP" });
  }

  user.isEmailVerified = true;
  user.otp = undefined;
  await user.save();

  res.json({ message: "Email verified successfully" });
};
export const login = async(req,res) =>{
    const {email,password} = req.body;
    console.log(email,password);
    const user = await User.findOne({email});
    if(!user) {
        return res.status(401).json({message:"Invalid credentials"});
    }
    const match = await bcrypt.compare(password,user.passwordHash);
    if(!match) {
        return res.status(401).json({message:"Invalid credentials"});
    }
    if(!user.isEmailVerified) {
        return res.status(403).json({message:"Email not verified"});
    }
    const token = jwt.sign({userId:user._id,email:user.email},process.env.JWT_SECRET,{expiresIn:"1h"});
    user.lastLoginAt = new Date();
    await user.save();
    res.json({token});  
}

export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.json({ message: "If user exists, OTP sent" });

  const otpCode = generateOtp();

  user.otp = {
    code: otpCode,
    purpose: "password-reset",
    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
  };

  await user.save();
  console.log("Password reset OTP:", otpCode);

  res.json({ message: "OTP sent for password reset" });
};

export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  const user = await User.findOne({ email });
  if (!user || !user.otp)
    return res.status(400).json({ error: "Invalid request" });

  if (
    user.otp.code !== String(otp) ||
    user.otp.expiresAt < new Date() ||
    user.otp.purpose !== "password-reset"
  ) {
    return res.status(400).json({ error: "Invalid or expired OTP" });
  }
  user.passwordHash = await bcrypt.hash(newPassword, 10);
  user.otp = undefined;

  await user.save();

  res.json({ message: "Password reset successful" });
};
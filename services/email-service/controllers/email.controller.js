import { sendMail } from "../services/email.services.js";
export const healthCheck = (req,res)=>{
  try {
    res.status(200).json({message:"Email service is healthy"});
  } catch (error) {
    console.log("Error in email service",error);
  }
}
export const sendWelcomeEmail = async(req,res)=>{
    const {email,name} = req.body;
   const html = `
    <div style="font-family:sans-serif;">
      <h2>Welcome to SkillSwap, ${name}! 🚀</h2>
      <p>You can now exchange skills with people around the world.</p>
      <p>Start exploring and swapping knowledge today!</p>
    </div>
  `;

    await sendMail(email,"Welcome to SkillSwap 🚀",html);
    res.json({message:"Welcome email sent"})
};

export const sendOtpEmail = async(req,res)=>{
    const {email,otp} = req.body;

    const html = `
    <div style="font-family:sans-serif;">
      <h2>Verify Your Email</h2>
      <p>Your OTP code is:</p>
      <h1 style="letter-spacing:5px;">${otp}</h1>
      <p>This code expires in 10 minutes.</p>
    </div>
  `;
  await sendMail(email,"Email Verification OTP",html);
    res.json({message:"OTP email sent"})
}
export const sendPasswordResetOtp = async(req,res)=>{
    const {email,otp} = req.body;
    const html = `
    <div style="font-family:sans-serif;">
      <h2>Password Reset Request</h2>
      <p>Use this OTP to reset your password:</p>
      <h1 style="letter-spacing:5px;">${otp}</h1>
      <p>This code expires in 5 minutes.</p>
    </div>
  `;
  await sendMail(email,"Reset Password OTP",html);
  res.json({message:"Otp for reset password sent"})
}
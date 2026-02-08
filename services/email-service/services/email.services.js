import { transporter } from "../utils/mailer.js";

export const sendMail =  async(to, subject,html)=>{
    await transporter.sendMail({
      from: `"SkillSwap" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });
}
import { transporter } from "../utils/mailer.js";

export const sendMail = (to, subject, html) => {
  transporter
    .sendMail({
      from: `"SkillSwap" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    })
    .then(() => console.log("Email Sent"))
    .catch((err) => console.log("Mail Error:", err));
};
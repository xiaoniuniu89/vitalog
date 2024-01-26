import nodemailer from "nodemailer";

export async function sendEmail(to: string, summary: string) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: process.env.EMAIL_SERVER_PORT,
    service: "gmail",
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: `"Weekly Summary" ${process.env.EMAIL_FROM}`,
    to: to,
    subject: "Your Vitalog Weekly Summary",
    text: summary,
    html: `<b>${summary}</b>`,
  });

  return info.messageId;
}



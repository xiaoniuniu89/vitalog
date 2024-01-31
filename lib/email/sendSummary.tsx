import { renderAsync } from "@react-email/render";
import nodemailer from "nodemailer";
import { WeeklySummaryEmail } from "@/components/Email/WeeklySummaryEmail";
import { WeeklySummary } from "@prisma/client";

export async function sendEmail(
  to: string,
  summary: WeeklySummary,
  firstName: string,
  lastName: string,
) {
  const userName = `${firstName} ${lastName}`;

  const emailHtml = await renderAsync(
    <WeeklySummaryEmail analysis={summary} user={{ name: userName }} />,
  );

  let transporter = nodemailer.createTransport({
    // @ts-ignore
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
    text: summary.summary,
    html: emailHtml,
  });

  return info.messageId;
}

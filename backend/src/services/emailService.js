import nodemailer from "nodemailer";
import env from "../config/env.js";

const transporter = nodemailer.createTransport({
  host: env.email?.host || process.env.SMTP_HOST,
  port: Number(env.email?.port || process.env.SMTP_PORT) || 587,
  secure: (env.email?.port || process.env.SMTP_PORT) === "465",
  auth: {
    user: env.email?.user || process.env.SMTP_USER,
    pass: env.email?.password || process.env.SMTP_PASSWORD,
  },
});

function buildContactEmailTemplate({ name, mobile, email, message }) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #FBF6EE; padding: 32px; border-radius: 12px;">
      <h2 style="color: #7A3E1D; font-family: Georgia, serif; margin-bottom: 8px;">
        New Contact Message
      </h2>
      <p style="color: #4B3621; font-size: 13px; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 24px;">
        Petaland Patternart
      </p>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; color: #4B3621; font-weight: bold; width: 120px;">Name</td>
          <td style="padding: 10px 0; color: #4B3621;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #4B3621; font-weight: bold;">Mobile</td>
          <td style="padding: 10px 0; color: #4B3621;">${mobile}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #4B3621; font-weight: bold;">Email</td>
          <td style="padding: 10px 0; color: #4B3621;">${email}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #4B3621; font-weight: bold; vertical-align: top;">Message</td>
          <td style="padding: 10px 0; color: #4B3621;">${message}</td>
        </tr>
      </table>
      <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #E9DCC9;">
        <p style="color: #4B3621; font-size: 12px;">
          This message was submitted through the Petaland Patternart contact form.
        </p>
      </div>
    </div>
  `;
}

async function sendContactFormEmail({ name, mobile, email, message }) {
  try {
    const adminEmail = env.email?.adminReceiver || process.env.ADMIN_EMAIL;

    const info = await transporter.sendMail({
      from: `"Petaland Patternart" <${env.email?.user || process.env.SMTP_USER}>`,
      to: adminEmail,
      replyTo: email,
      subject: `New Contact Message from ${name}`,
      html: buildContactEmailTemplate({ name, mobile, email, message }),
    });

    return info;
  } catch (error) {
    throw new Error(`Failed to send contact email: ${error.message}`);
  }
}

async function sendAdminNotificationEmail(subject, htmlContent) {
  try {
    const adminEmail = env.email?.adminReceiver || process.env.ADMIN_EMAIL;

    const info = await transporter.sendMail({
      from: `"Petaland Patternart" <${env.email?.user || process.env.SMTP_USER}>`,
      to: adminEmail,
      subject,
      html: htmlContent,
    });

    return info;
  } catch (error) {
    throw new Error(`Failed to send admin notification: ${error.message}`);
  }
}

async function verifyEmailConnection() {
  try {
    await transporter.verify();
    return true;
  } catch (error) {
    throw new Error(`Email transporter verification failed: ${error.message}`);
  }
}

export default {
  sendContactFormEmail,
  sendAdminNotificationEmail,
  verifyEmailConnection,
};
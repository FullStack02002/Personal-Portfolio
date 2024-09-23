import nodemailer from "nodemailer"
import { google } from 'googleapis';

// OAuth2 setup
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export const sendEmail=async(options)=>{
    const accessToken = await oauth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.SMTP_MAIL,
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken.token,
        },
      });

    const mailOptions={
        from:process.env.SMTP_MAIL,
        to:options.email,
        subject:options.subject,
        text:options.message,
    }

    await transporter.sendMail(mailOptions);
}



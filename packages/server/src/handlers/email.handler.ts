import nodemailer from "nodemailer";

export const Email = () => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "haven.rogahn37@ethereal.email",
      pass: "jgwseVNPh7zNjcJCju",
    },
  });

  const from = '"Pocket 💰" <support@pocket.com>';

  const sendPasswordRestore = ({ to, token }: { to: string; token: string }) =>
    transporter.sendMail({
      from,
      to,
      subject: "Pocket password restore", // Subject line
      html: `<div>
      <h1>Password restore for pocket account</h1>
      <span>Please follow the link to reset your password</span>
      <span>
      <a href="http://localhost:3000/?token=${token}" target="_blank">Reset password</a>
      </span>
      </div>`, // html body
    });

  const sendVerifyEmail = ({ to }: { to: string; token: string }) =>
    transporter.sendMail({
      from: '"Pocket 💰" <support@pocket.com>',
      to,
      subject: "Pocket email verification",
      html: `<div>
      <span>Please follow the link to verify your email</span>
      <span></span>
      </div>`,
    });

  return { sendPasswordRestore, sendVerifyEmail };
};

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
      subject: "Pocket password reset", // Subject line
      html: `<!DOCTYPE html><html><head><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap" rel="stylesheet"><style>body{background-color:#fffcfc;display:flex;flex-direction:column;align-items:center}.container{font-family:'Roboto Slab',serif;background-color:#a7d5b7;display:flex;flex-direction:column;align-items:center;width:500px;padding:25px 25px;border-radius:2px}.logo{padding-bottom:20px;font-size:50px;color:#dabe45}.box-container{display:flex;flex-direction:column;height:200px;width:95%;background-color:#5ccabe;align-items:center;margin:20px;padding:30px 0;border-radius:2px}.title{padding:5px;font-size:25px}.sub-title{padding:25px 50px;font-size:16px}.button{padding:15px 32px;text-align:center;text-decoration:none;display:inline-block;border-radius:5px;font-size:15px;margin:4px 2px;cursor:pointer;background-color:#dabe45}.link{text-decoration:none;color:#fffcfc}</style></head><body><div class="container"><span class="logo">Pocket</span><div class="box-container"><span class="title">Forgot your password?</span><div class="sub-title"><div>That's ok, it happends!</div><div>Click on the button below to reset your password</div></div><a class="link" href="http://localhost:3000/?token=${token}"><div autofocus class="button">Reset password</div></a></div></div></body></html>`, // html body
    });

  const sendVerifyEmail = ({
    to,
    name,
    token,
  }: {
    to: string;
    name: string;
    token: string;
  }) =>
    transporter.sendMail({
      from: '"Pocket 💰" <support@pocket.com>',
      to,
      subject: "Pocket email verification",
      html: `<!DOCTYPE html><html><head><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap" rel="stylesheet"><style>body{background-color:#fffcfc;display:flex;flex-direction:column;align-items:center}.container{font-family:'Roboto Slab',serif;background-color:#a7d5b7;display:flex;flex-direction:column;align-items:center;width:500px;padding:25px 25px;border-radius:2px}.logo{padding-bottom:20px;font-size:50px;color:#dabe45}.box-container{display:flex;flex-direction:column;height:270px;width:95%;background-color:#5ccabe;align-items:center;margin:20px;padding:30px 0;border-radius:2px}.title{padding:5px;font-size:25px}.sub-title{padding:25px 50px;font-size:16px}.button{border:none;color:#fff;padding:15px 32px;text-align:center;text-decoration:none;display:inline-block;border-radius:5px;font-size:15px;margin:4px 2px;cursor:pointer;background-color:#dabe45}.link{text-decoration:none;color:#fffcfc}</style></head><body><div class="container"><span class="logo">Pocket</span><div class="box-container"><span class="title">Verify your e-mail address</span><div class="sub-title"><div style="margin:10px 0">Hey ${name}!</div><div style="margin:10px 0">Thank you for choosing Pocket application.</div><span>Please confirm that</span><b>${to}</b><span>is your e-mail address by clicking the button bellow.</span></div><a class="link" href="http://localhost:3000/verify/?token=${token}"><div autofocus class="button">Verify</div></a></div></div></body></html>`,
    });

  return { sendPasswordRestore, sendVerifyEmail };
};

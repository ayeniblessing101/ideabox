import nodemailer from 'nodemailer';

/**
 * A method to send email
 * @param {object} existingUser
 * @param {object} resetToken
 *
 * @returns {object} - returns success or failure message
 */
const sendMail = (existingUser, resetToken) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  // setup email data with unicode symbols
  const mailOptions = {
    from: 'IdeaBox 👻',
    to: existingUser.email,
    subject: 'IdeaBox || Reset Password',
    html: `<body><div>
            <div style="background-color:#f2f3f5;padding:20px">
              <div style="max-width:600px;margin:0 auto">
               <div 
                style="
                  background:#fff;
                  font:14px sans-serif;
                  color:#686f7a;
                  border-top:4px solid #EF4743;
                  margin-bottom:20px">
                <div 
                  style="
                   border-bottom:1px solid #f2f3f5;
                   padding-bottom:20px;
                   padding-top:20px">
                  <h4 
                    style="
                      padding-top:0; 
                      padding-left:20px; 
                      margin:0; 
                      font-size:30px;">Idea Box</h4>
                </div>
                <div style="padding:30px 20px;line-height:1.5em;color:#686f7a">
                  <p style="color:#737373">Hi ${existingUser.firstname} ${
  existingUser.lastname
},</p>
                  <p 
                    style="
                      border-bottom:1px solid #f2f3f5;
                      padding-bottom:20px;
                      margin-bottom:20px;
                      color:#686f7a">
                     A password reset for your account was requested.
                  </p>
                  <p 
                    style="
                      border-bottom:1px solid #f2f3f5;
                      padding-bottom:20px;
                      margin-bottom:20px;
                      color:#686f7a">
                      Please click the button below to change your password.
                  </p>
                  <a href=http://localhost:3000/reset-password?token=${resetToken} 
                    style="
                      display:inline-block;
                      font-size:15px;color:#ffffff;
                      padding:10px 15px;
                      text-decoration:none;
                      background-color:#EF4743;
                      border-radius:3px" 
                      target="_blank">
                      Change Your Password
                  </a>
                </div>
             </div>
            </div>
          </body>`,
  };
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return {
        status: 400,
        payload: error,
      };
    }
    return `Message ${info.messageId} sent: ${info.response}`;
  });
};

export default sendMail;

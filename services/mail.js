
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  family: 4
});


async function sendMail({ emailFrom, emailTo, file }) {
  await transporter.verify((error, success) => {
    if (error) {
      console.log("SMTP Error:", error);
    } else {
      console.log("Server is ready to take messages:", success);
    }
  });

  return await transporter.sendMail({
    from: emailFrom,
    to: emailTo,
    subject: "inShare file sharing",
    text: `${emailFrom} shared a file with you.`,
    html: require("./emailTemplate")({
      emailFrom,
      downloadLink: `${process.env.APP_BASE_URL}/files/${file.uuid}?source=email`,
      size: parseInt(file.size / 1000) + " KB",
      expires: "24 hours",
    }),
  });
}

module.exports = sendMail;

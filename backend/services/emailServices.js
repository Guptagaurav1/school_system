const nodemailer = require('nodemailer');
const ejs = require("ejs");
const path = require("path");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    }
});

const sendEmail = async (toUser, subject,templateName, data) => {

    try {
    const templatePath = path.join(__dirname, `../mail_template/${templateName}`);
        const html = await ejs.renderFile(templatePath, data);

        const emailOptions = {
            from: process.env.MAIL_USERNAME,
            to: toUser,  
            subject,
            html
        };

        await transporter.sendMail(emailOptions);

        console.log("Email sent successfully");

    } catch (error) {
        console.log("Error while sending email:", error);
    }
};

module.exports = sendEmail;

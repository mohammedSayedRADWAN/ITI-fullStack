const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // 1) Create a transporter
    // For local development, Mailtrap is recommended
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'sandbox.smtp.mailtrap.io',
        port: process.env.EMAIL_PORT || 2525,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // 2) Define the email options
    const mailOptions = {
        from: 'ITI Lab <hello@itilab.com>',
        to: options.email,
        subject: options.subject,
        text: options.message,
        // html: 
    };

    // 3) Actually send the email
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;

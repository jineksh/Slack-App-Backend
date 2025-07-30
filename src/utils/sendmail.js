import transporter from '../config/mail.js';

const sendMail = async (to, subject, text) => {
    try {
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to,
            subject,
            text,
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

export default  sendMail;
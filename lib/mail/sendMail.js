import transporter from "./mailer.js";

const sendMail = async ({ to, subject, html }) => {
  const mailOptions = {
    from: `"Vidyarishi" <${process.env.SMTP_MAIL}>`,
    to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.response);
    return true;
  } catch (err) {
    console.error("❌ Email error:", err);
    return false;
  }
};

export default sendMail;

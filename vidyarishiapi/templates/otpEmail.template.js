export const otpEmailTemplate = ({ otp, expiryMinutes }) => {
  return `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 560px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden;">
    
    <div style="background: #4f46e5; color: #ffffff; padding: 20px; text-align: center;">
      <img 
        src="https://www.vidyarishi.com/images/vidya/logo/VR_logo.png" 
        alt="Vidyarishi Logo" 
        style="height:50px; margin-bottom:15px;" 
      />
            <h2 style="margin: 0;">Vidyarishi Verification</h2>
    </div>

    <div style="padding: 24px; color: #111827;">
      <p>Dear User,</p>

      <p>Please use the following One-Time Password (OTP) to complete your verification:</p>

      <div style="text-align: center; margin: 24px 0;">
        <span style="
          display: inline-block;
          font-size: 32px;
          letter-spacing: 6px;
          font-weight: bold;
          color: #4f46e5;
          padding: 12px 20px;
          border: 1px dashed #c7d2fe;
          border-radius: 8px;
        ">
          ${otp}
        </span>
      </div>

      <p>
        This OTP is valid for <strong>${expiryMinutes} minutes</strong>.
        For your security, please do not share this code with anyone.
      </p>

      <p style="margin-top: 24px;">
        Regards,<br />
        <strong>Team Vidyarishi</strong>
      </p>
    </div>

    <div style="background: #f9fafb; padding: 12px; text-align: center; font-size: 12px; color: #6b7280;">
      © ${new Date().getFullYear()} Vidyarishi. All rights reserved.
    </div>
  </div>
  `;
};

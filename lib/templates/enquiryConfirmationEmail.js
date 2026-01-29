export const enquiryConfirmationTemplate = ({
    name,
    courseName,
    phone,
}) => `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden">
    
    <div style="background:#7c3aed;color:#fff;padding:24px;text-align:center">
      <img src="https://www.vidyarishi.com/images/vidya/logo/VR_logo.png" alt="Vidyarishi Logo" style="height:50px; margin-bottom:15px;" />
      <h1 style="margin:0">Thanks for your enquiry!</h1>
    </div>

    <div style="padding:24px;color:#111827">
      <p>Hi <strong>${name}</strong>,</p>

      <p>
        Thank you for showing interest in the course:
      </p>

      <p style="font-size:18px;font-weight:600">
        ${courseName}
      </p>

      <p>
        Our team will contact you shortly on:
        <br />
        <strong>${phone}</strong>
      </p>

      <p style="margin-top:24px">
        Regards,<br />
        <strong>Vidyarishi Team</strong>
      </p>
    </div>

    <div style="background:#f9fafb;padding:12px;text-align:center;font-size:12px;color:#6b7280">
      © ${new Date().getFullYear()} Vidyarishi. All rights reserved.
    </div>

  </div>
`;

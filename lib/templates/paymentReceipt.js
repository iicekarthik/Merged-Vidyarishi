export const receiptEmailTemplate = ({
  customerName,
  customerEmail,
  customerPhone,
  courseName,
  amount,
  paymentStatus,
  transactionDate,
  supportNumber = "+91 9619 535 535",
  websiteUrl = "https://www.vidyarishi.com",
}) => `
  <div style="font-family:Arial, sans-serif; max-width:600px; margin:0 auto; border:1px solid #e0e0e0; border-radius:10px; overflow:hidden; background:#ffffff; color:#333;">
    
    <!-- Header -->
    <div style="background-color:#d496e3; color:black; padding:30px 20px; text-align:center;">
      <img src="https://www.vidyarishi.com/images/vidya/logo/VR_logo.png" alt="Vidyarishi Logo" style="height:50px; margin-bottom:15px;" />
      <h1 style="margin:0; font-size:26px; font-weight:600;">Payment Confirmation</h1>
      <p style="margin:8px 0 0; font-size:16px;">Thank you for your payment!</p>
    </div>

    <!-- Payment Details -->
    <div style="padding:20px; text-align:center; background:#F6FFED; border-bottom:1px solid #e6e6e6;">
      <h2 style="color:#28a745; font-size:30px; margin:0;">₹${amount}</h2>
      <p style="margin:8px 0 0; font-size:15px;">Payment Status <strong>${paymentStatus}</strong></p>
      <p style="margin:8px 0 0; font-size:15px;">Paid Successfully on <strong>${transactionDate}</strong></p>
    </div>

    <!-- Student Info -->
    <div style="padding:20px; border-bottom:1px solid #e6e6e6;">
      <h3 style="border-bottom:1px solid #ccc; padding-bottom:5px;">Student Information</h3>
      <p><strong>Name:</strong> ${customerName}</p>
      <p><strong>Email:</strong> <a href="mailto:${customerEmail}" style="color:#0B5ED7; text-decoration:none;">${customerEmail}</a></p>
      <p><strong>Phone:</strong> ${customerPhone}</p>
      <p><strong>Course:</strong> ${courseName}</p>
    </div>

    <!-- Payment Summary -->
    <div style="padding:20px; border-bottom:1px solid #e6e6e6;">
      <h3 style="border-bottom:1px solid #ccc; padding-bottom:5px;">Payment Summary</h3>
      <table width="100%" cellpadding="10" cellspacing="0" style="border-collapse:collapse; font-size:15px;">
        <thead>
          <tr style="background:#f8f9fa;">
            <th align="left" style="border:1px solid #dee2e6;">Description</th>
            <th align="right" style="border:1px solid #dee2e6;">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border:1px solid #dee2e6;">Total Amount Paid</td>
            <td align="right" style="border:1px solid #dee2e6;">₹${amount}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Contact & Footer -->
    <div style="padding:20px; background:#FAFAFA; text-align:center; color:#555; font-size:14px;">
      <p style="margin:5px 0;"><strong>VIDYARISHI</strong></p>
      <p style="margin:5px 0;">Need help? Contact us at <a href="tel:${supportNumber}" style="color:#0B5ED7; text-decoration:none;">${supportNumber}</a></p>
      <p style="margin:5px 0;">Visit: <a href="${websiteUrl}" target="_blank" style="color:#0B5ED7; text-decoration:none;">${websiteUrl}</a></p>
      <hr style="border:none; border-top:1px solid #ddd; margin:10px 0;" />
      <p style="margin:5px 0;">Thank you for choosing <strong>VIDYARISHI</strong>.</p>
    </div>

  </div>
`;

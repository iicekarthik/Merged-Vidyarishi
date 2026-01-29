import dbConnect from "@/vidyarishiapi/config/db";
import Admin from "@/vidyarishiapi/models/Admin-info/Admin";
import { hashPassword } from "@/vidyarishiapi/utils/password";
import { errorHandler } from "@/vidyarishiapi/lib/errorHandler";

async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  const {
    fullName,
    email,
    phone,
    dob,
    gender,
    state,
    city,
    password,
  } = req.body;

  if (!email || !password || !fullName || !phone) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  await dbConnect();

  const existingAdmin = await Admin.findOne({
    $or: [{ email }, { phone }],
  });

  if (existingAdmin) {
    return res.status(409).json({ message: "Admin already exists" });
  }

  const hashedPassword = await hashPassword(password);

  const admin = await Admin.create({
    fullName,
    email,
    phone,
    dob,
    gender,
    state,
    city,
    password: hashedPassword,
    isAdmin: true,
    role: "admin",
    isPhoneNumberVerified: true,
  });

  return res.status(201).json({
    success: true,
    message: "Admin registered successfully",
    adminId: admin._id,
  });
}

export default errorHandler(handler);



// example registration
// {
//   "fullName": "Bhoomi Gupta",
//   "email": "fysbcitbhoomitemp@gmail.com",
//   "phone": "7039629246",
//   "password": "bhoomigupta@123",
//   "gender": "Female",
//   "city": "Mumbai",
//   "state": "Maharashtra"
// }
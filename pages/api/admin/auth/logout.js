import RefreshToken from "@/vidyarishiapi/models/RefreshToken";

export default async function handler(req, res) {
  const cookies = parse(req.headers.cookie || "");
  const refreshToken = cookies.refreshToken;

  if (refreshToken) {
    await RefreshToken.deleteOne({ token: refreshToken });
  }

  res.setHeader("Set-Cookie", [
    "accessToken=; Path=/; Max-Age=0",
    "refreshToken=; Path=/; Max-Age=0",
  ]);

  res.json({ success: true });
}

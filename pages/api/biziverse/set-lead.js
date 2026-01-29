const ALLOWED_ORIGINS = [
  "https://vidyarishi.com",
  "https://amityonline.vidyarishi.com",
  "http://localhost:3000",
  "http://localhost:5173",
];

export default async function handler(req, res) {
  const origin = req.headers.origin || "";

  res.setHeader(
    "Access-Control-Allow-Origin",
    ALLOWED_ORIGINS.includes(origin) ? origin : "*"
  );
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const payload = [
      {
        moduleID: 25,
        actionType: "setLead",
        data: JSON.stringify(req.body.apiParams[0].data), // ✅ STRING
      },
    ];

    const response = await fetch(
      "https://biziverse.com/PremiumAPI.asmx/setAPI",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          apiKey: process.env.BIZIVERSE_API_KEY,
          apiParams: JSON.stringify(payload), // ✅ STRING
        }),
      }
    );

    const text = await response.text();

    return res.status(200).json({ success: true, data: text });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false });
  }
}

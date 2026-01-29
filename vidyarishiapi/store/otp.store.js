let otpStore;

// Next.js / Node.js server hot-reload karta rehta hai.
// Har reload me naya Map() banane se OTP lose ho jata.
// Isiliye hum global object use karte hain.
// Agar global.otpStore pehle se exist nahi karta → ek new Map() create karo.
// Agar exist karta hai → usi ko reuse karo (OTP lost nahi hoga server reload me).

if (!global.otpStore) {
  global.otpStore = new Map();
}

// Local otpStore variable ko global store ke equal set kar diya.
otpStore = global.otpStore;

export default otpStore;

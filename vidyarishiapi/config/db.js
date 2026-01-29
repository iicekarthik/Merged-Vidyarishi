import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) throw new Error("MONGO_URI missing in .env");

// NextJS multiple reload karta hai, isliye ek cached connection global me store karte hain.
let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

export default async function dbConnect() {

  // Agar already connected ho → use same connection.
  if (cached.conn) return cached.conn;
  if (!cached.promise) {

    // Agar already connected ho → use same connection.
    cached.promise = mongoose.connect(MONGO_URI).then((mongoose) => mongoose);
  }

  // Connection resolve hone ke baad usse return kar do.
  cached.conn = await cached.promise;
  return cached.conn;
}

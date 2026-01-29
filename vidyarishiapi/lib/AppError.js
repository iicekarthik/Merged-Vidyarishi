// vidyarishiapi/utils/AppError.js
// Custom error throw karne ke liye AppError use hota hai.
export default class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);  // message → error ka text.
    this.statusCode = statusCode;  // statusCode → HTTP error code.
    this.name = "AppError";

    // Stack trace clean banane ke liye
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

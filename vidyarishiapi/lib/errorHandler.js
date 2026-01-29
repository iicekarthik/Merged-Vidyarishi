// vidyarishiapi/utils/errorHandler.js
// API errors ko handle karta hai
import AppError from "./AppError";

export const errorHandler = (fn) => {
  // For pages/api: (req, res)
  return async (req, res) => {
    try {
      return await fn(req, res);
    } catch (err) {
      console.error("🔥 Global Error Handler (pages/api):", err);

      const statusCode = err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      return res.status(statusCode).json({
        success: false,
        message,
      });
    }
  };
};

// For app router: (req) => Response
export const responseHandler = (fn) => {
  return async (req) => {
    try {
      return await fn(req);
    } catch (err) {
      console.error("Global Error Handler (app router):", err);

      const statusCode = err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      return new Response(
        JSON.stringify({
          success: false,
          message,
        }),
        { status: statusCode }
      );
    }
  };
};

export { AppError };

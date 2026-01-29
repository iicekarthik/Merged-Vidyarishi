const postAPI = async (url, body = {}) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      credentials: "include", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    return await res.json();
  } catch (err) {
    console.error(`API Error (${url}):`, err);
    return { error: true, message: "Network error" };
  }
};

export const checkUserAPI = async (phone) => {
  return await postAPI("/api/auth/check-user", { phone });
};

export const verifyOtpAPI = async (phone, otp) => {
  return await postAPI("/api/auth/verify-otp", { phone, otp });
};

export const registerUserAPI = async (data) => {
  return await postAPI("/api/auth/register", data);
};

export const refreshTokenAPI = async () => {
  return await postAPI("/api/auth/refresh-token");
};

export const logoutUserAPI = async () => {
  return await postAPI("/api/auth/logout");
};

export const getAuthToken = () => {
  console.warn("getAuthToken() no longer works. Tokens are HttpOnly.");
  return null;
};

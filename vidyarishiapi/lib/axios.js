import axios from "axios";

const api = axios.create({

  // Cookies (AccessToken, RefreshToken) har request ke saath backend ko bheji jaayengi.
  // Yeh JWT auth ke liye zaroori hai
  withCredentials: true,
});

export default api;
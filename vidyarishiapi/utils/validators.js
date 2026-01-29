export const isValidPhone = (phone) => /^\d{10}$/.test(phone);
export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

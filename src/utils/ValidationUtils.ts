export const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validatePassword = (password: string) => {
  return password.length >= 6; // Example: Password must be at least 6 characters long
};
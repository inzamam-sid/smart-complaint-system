// utils/validation.js

const validateSignUpData = (req) => {
  const { firstName, emailId, password } = req.body;

  if (!firstName || firstName.trim().length < 2) {
    throw new Error("First name is required and must be at least 2 characters long.");
  }

  if (!emailId || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailId)) {
    throw new Error("Valid email is required.");
  }

  if (!password || password.length < 6) {
    throw new Error("Password must be at least 6 characters long.");
  }
};

module.exports = {
  validateSignUpData,
};

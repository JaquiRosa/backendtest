function validatePassword(password) {
  const minMaxLength = /^.{6,20}$/;
  const hasLowerCase = /[a-z]/;
  const hasUpperCase = /[A-Z]/;
  const hasNumber = /\d/;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

  if (!minMaxLength.test(password)) {
    return "Password must be between 6 and 20 characters";
  }

  if (!hasLowerCase.test(password)) {
    return "Password must contain at least one lowercase letter";
  }

  if (!hasUpperCase.test(password)) {
    return "Password must contain at least one uppercase letter";
  }

  if (!hasNumber.test(password)) {
    return "Password must contain at least one number";
  }

  if (!hasSpecialChar.test(password)) {
    return "Password must contain at least one special character";
  }

  return null;
}

module.exports = validatePassword;
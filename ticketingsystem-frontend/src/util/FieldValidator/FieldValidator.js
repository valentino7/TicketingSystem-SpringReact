function validateNameField(name) {
  let re = /^[A-Za-zàèìòùáéíóúÀÈÌÒÙÁÉÍÓÚ\s]+$/;
  return name !== "" && re.test(String(name));
}

function validateSurnameField(surname) {
  let re = /^[A-Za-zàèìòùáéíóúÀÈÌÒÙÁÉÍÓÚ\s]+$/;
  return surname !== "" && re.test(String(surname));
}

function validateEmailField(email) {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email !== "" && re.test(String(email).toLowerCase());
}

function validateRoleField(role) {
  return role !== null && role !== undefined && role !== '';
}

function validatePasswordField(password) {
  return password !== "" && password.length >= 3;
}

function validateConfirmPasswordField(password, confirmPassword) {
  return confirmPassword !== "" && confirmPassword === password;
}

function validateUsernameField(username) {
  return username !== "";
}

function validateField(name, value) {
  switch (name) {
    case 'name':
      return validateNameField(value);
    case 'surname':
      return validateSurnameField(value);
    case 'email':
      return validateEmailField(value);
    case 'username':
      return validateUsernameField(value);
    case 'password':
      return validatePasswordField(value);
    case 'role':
      return validateRoleField(value);
  }
}

function validateRegistrationForm(name, surname, email, role, username, password, confirmPassword) {
  return validateNameField(name) &&
    validateSurnameField(surname) &&
    validateEmailField(email) &&
    validateRoleField(role) &&
    validateUsernameField(username) &&
    validatePasswordField(password) &&
    validateConfirmPasswordField(password, confirmPassword);
}

function validateLoginForm(username, password) {
  return validateUsernameField(username) &&
    validatePasswordField(password);
}

export {
  validateConfirmPasswordField,
  validateEmailField,
  validateRegistrationForm,
  validateNameField,
  validatePasswordField,
  validateSurnameField,
  validateRoleField,
  validateUsernameField,
  validateLoginForm,
  validateField
};

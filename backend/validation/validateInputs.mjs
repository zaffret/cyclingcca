const isNotString = (input, name) => {
  if (typeof input !== "string" || input.trim() === "") {
    return "Invalid " + name;
  }
  return null;
};

const isNotNumber = (input, name) => {
  const number = Number(input);

  if (isNaN(number) || !Number.isInteger(number) || number < 0) {
    return "Invalid " + name;
  }
  return null;
};

const isNotEmail = (input) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!input) {
    return "Email is required";
  }

  if (!emailRegex.test(input)) {
    return "Invalid email format";
  }
  return null;
};

const isNotPsw = (input) => {
  const pswRegex =
    /(?!.*\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

  if (!input) {
    return "Password is required";
  }

  if (!pswRegex.test(input)) {
    return "Invalid password format";
  }

  return null;
};

const isNotPhoneNumber = (input) => {
  const phoneRegex = /^\d{8}$/;
  if (!input) {
    return "Phone number is required";
  }

  if (!phoneRegex.test(input)) {
    return "Invalid phone number";
  }
  return null;
};

const isNotMatricNumber = (input) => {
  const matricRegex = /^\d{7}[A-Za-z]$/;
  if (!input) {
    return "Matric number is required";
  }

  if (!matricRegex.test(input)) {
    return "Invalid matric number format";
  }
  return null;
};

const isEndBeforeStart = (start, end) => {
  if (new Date(end) < new Date(start)) {
    return "End date and time must be after the start date and time.";
  }
  return null;
};

const isRegistrationClosingInvalid = (start, end, registrationClosing) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const closingDate = new Date(registrationClosing);

  if (closingDate < startDate) {
    return "Registration closing time must be after or equal to the start date and time.";
  }
  if (closingDate > endDate) {
    return "Registration closing time must be before or equal to the end date and time.";
  }
  return null;
};

export {
  isNotString,
  isNotNumber,
  isNotEmail,
  isNotPsw,
  isNotPhoneNumber,
  isNotMatricNumber,
  isEndBeforeStart,
  isRegistrationClosingInvalid,
};

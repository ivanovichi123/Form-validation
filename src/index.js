import "./style.css";
const form = document.querySelector("form");
const email = document.getElementById("email");
const emailError = document.querySelector(".error-email");
const postalCode = document.getElementById("postal-code");
const postalCodeError = document.querySelector(".error-code");
const country = document.getElementById("country");
const password = document.getElementById("password");
const passwordError = document.querySelector(".error-password");
const confirmPassword = document.getElementById("confirm-password");
const confirmPasswordError = document.querySelector(".error-cpassword");

email.addEventListener("input", (event) => {
  if (email.validity.valid) {
    emailError.textContent = "";
    emailError.className = "error-email";
  } else {
    showErrorEmail();
  }
});

form.addEventListener("submit", (event) => {
  let counter = 0;
  if (checkPostalCode()) {
    counter++;
  }
  if (!email.validity.valid) {
    showErrorEmail();
    counter++;
  }
  if (!password.validity.valid) {
    showErrorPassword();
    counter++;
  }
  if (checkPasswords()) {
    counter++;
  }
  if (counter === 0) {
    console.log("The form is valid");
    event.preventDefault();
  } else {
    event.preventDefault();
    console.log("The form is invalid");
  }
});

function showErrorEmail() {
  if (email.validity.valueMissing) {
    emailError.textContent = "You need to put an email";
  } else if (email.validity.typeMismatch) {
    emailError.textContent = "Put a correct email address";
  } else if (email.validity.patternMismatch) {
    emailError.textContent = "The email must end with '@example.com'";
  }
  emailError.className = "error-email active";
}

function checkPostalCode() {
  const constraints = {
    swiss: [
      "^(CH-)?\\d{4}$",
      "Swiss postal codes must have exactly 4 digits: e.g. CH-1950 or 1950",
    ],
    french: [
      "^(F-)?\\d{5}$",
      "French postal codes must have exactly 5 digits: e.g. F-75012 or 75012",
    ],
    german: [
      "^(D-)?\\d{5}$",
      "German postal codes must have exactly 5 digits: e.g. D-12345 or 12345",
    ],
  };

  const countryV = document.getElementById("country").value;
  const constraint = new RegExp(constraints[countryV][0], "");

  if (constraint.test(postalCode.value)) {
    postalCodeError.textContent = "";
    return false;
  } else if (postalCode.value === "") {
    postalCodeError.textContent = "You need to put a postal code";
    return true;
  } else {
    postalCodeError.textContent = constraints[countryV][1];
    return true;
  }
}

postalCode.addEventListener("input", (event) => {
  checkPostalCode();
});

country.addEventListener("input", (event) => {
  checkPostalCode();
});

password.addEventListener("input", (event) => {
  checkPasswords();
  if (password.validity.valid) {
    passwordError.textContent = "";
    passwordError.className = "error-password";
  } else {
    showErrorPassword();
  }
});

function showErrorPassword() {
  if (password.validity.valueMissing) {
    passwordError.textContent = "You need to put a password";
  } else if (password.validity.patternMismatch) {
    passwordError.textContent =
      "The password must have two capital letters, minimum of 8 letters and one symbol";
  }
  passwordError.className = "error-password active";
}

confirmPassword.addEventListener("input", (event) => {
  checkPasswords();
});

function checkPasswords() {
  if (confirmPassword.value !== password.value) {
    confirmPasswordError.textContent = "The passwords do not match";
    passwordError.className = "error-cpassword active";
    return true;
  } else {
    confirmPasswordError.textContent = "";
    passwordError.className = "error-cpassword";
  }
}



// Tabs switching
const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

loginTab.addEventListener("click", () => {
  loginTab.classList.add("active");
  registerTab.classList.remove("active");
  loginForm.classList.add("active");
  registerForm.classList.remove("active");
});

registerTab.addEventListener("click", () => {
  registerTab.classList.add("active");
  loginTab.classList.remove("active");
  registerForm.classList.add("active");
  loginForm.classList.remove("active");
});

// Login form submission
loginForm.addEventListener("submit", function (e) {
  e.preventDefault(); // prevent page reload
  // Optional: add login validation here
  window.location.href = "dashboard.html";
});

// Register form submission with inline validation messages
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const passwordMessage = document.getElementById("passwordMessage");
const confirmPasswordMessage = document.getElementById("confirmPasswordMessage");

registerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:'",.<>/?\\|`~]).{8,}$/;

  let valid = true;

  if (!passwordRegex.test(password)) {
    passwordMessage.textContent = "Password must be 8+ chars, include uppercase, number & symbol.";
    passwordMessage.classList.remove("valid");
    valid = false;
  } else {
    passwordMessage.textContent = "Strong password ✓";
    passwordMessage.classList.add("valid");
  }

  if (password !== confirmPassword) {
    confirmPasswordMessage.textContent = "Passwords do not match.";
    confirmPasswordMessage.classList.remove("valid");
    valid = false;
  } else if (confirmPassword.length > 0) {
    confirmPasswordMessage.textContent = "Passwords match ✓";
    confirmPasswordMessage.classList.add("valid");
  } else {
    confirmPasswordMessage.textContent = "";
  }

  if (!valid) return;

  // Passed all validation
  passwordMessage.textContent = "";
  confirmPasswordMessage.textContent = "";
  alert("Registration successful!");
  registerForm.reset();

  // Switch to login tab after registration
  loginTab.click();
});

// Consolidated and fixed registration script

// Global variable to store correct CAPTCHA answer
let correctCaptchaAnswer = 0;

/**
 * Generate a simple addition CAPTCHA and display the question.
 */
function generateCaptcha() {
  const num1 = Math.floor(Math.random() * 10) + 1; // 1-10
  const num2 = Math.floor(Math.random() * 10) + 1; // 1-10
  correctCaptchaAnswer = num1 + num2;
  const question = `${num1} + ${num2} = ?`;
  const qEl = document.getElementById("captchaQuestion");
  if (qEl) qEl.textContent = question;
}

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const usernameInput = document.getElementById("regUsername");
  const emailInput = document.getElementById("regEmail");
  const passwordInput = document.getElementById("regPassword");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const agreeTermsCheckbox = document.getElementById("agreeTerms");
  const captchaAnswerInput = document.getElementById("captchaAnswer");
  const errorMessage = document.getElementById("errorMessage");
  const registerButton = document.getElementById("registerButton");

  // Safe guard: if essential elements are missing, do nothing.
  if (
    !registerForm ||
    !usernameInput ||
    !emailInput ||
    !passwordInput ||
    !confirmPasswordInput ||
    !errorMessage ||
    !registerButton
  ) {
    return;
  }

  // Display message helper
  function displayMessage(message, isError = true) {
    errorMessage.textContent = message;
    errorMessage.style.color = isError ? "#e74c3c" : "#2ecc71";
    errorMessage.classList.add("show");

    setTimeout(() => {
      errorMessage.classList.remove("show");
    }, 4000);
  }

  // Initialize CAPTCHA when page loads
  generateCaptcha();

  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();
    const userCaptchaAnswer = captchaAnswerInput
      ? parseInt(captchaAnswerInput.value.trim(), 10)
      : NaN;

    // Basic client-side validations
    if (username.length < 4) {
      displayMessage("Nama pengguna minimal 4 karakter.");
      usernameInput.focus();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      displayMessage("Format email tidak valid.");
      emailInput.focus();
      return;
    }

    if (password.length < 6) {
      displayMessage("Kata sandi minimal 6 karakter.");
      passwordInput.focus();
      return;
    }

    if (password !== confirmPassword) {
      displayMessage("Konfirmasi kata sandi tidak cocok.");
      confirmPasswordInput.focus();
      return;
    }

    // CAPTCHA validation
    if (
      isNaN(userCaptchaAnswer) ||
      userCaptchaAnswer !== correctCaptchaAnswer
    ) {
      displayMessage("Jawaban CAPTCHA salah. Soal baru telah dibuat.");
      generateCaptcha();
      if (captchaAnswerInput) {
        captchaAnswerInput.value = "";
        captchaAnswerInput.focus();
      }
      return;
    }

    // Terms & Conditions validation
    if (agreeTermsCheckbox && !agreeTermsCheckbox.checked) {
      displayMessage("Anda harus menyetujui Syarat dan Ketentuan.");
      agreeTermsCheckbox.focus();
      return;
    }

    // Simulate registration process
    registerButton.textContent = "Mendaftar...";
    registerButton.disabled = true;

    // NOTE: In a real app, send the data to the server and never handle passwords in plaintext on the client.
    setTimeout(() => {
      displayMessage(
        `Pendaftaran Berhasil! Selamat datang, ${username}. Anda akan diarahkan ke halaman login.`,
        false
      );

      setTimeout(() => {
        window.location.href = "index.html";
      }, 3000);
    }, 2500);
  });
});

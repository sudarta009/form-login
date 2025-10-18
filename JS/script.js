document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const errorMessage = document.getElementById("errorMessage");
  const loginButton = document.getElementById("loginButton");

  // Fungsi untuk menampilkan pesan error
  function displayError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add("show");
    // Sembunyikan pesan setelah 3 detik
    setTimeout(() => {
      errorMessage.classList.remove("show");
    }, 3000);
  }

  // Event listener untuk submit form
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Mencegah form dikirim secara default

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // 1. Validasi Sisi Klien Dasar (Keamanan UI/UX)
    if (username.length < 4) {
      displayError("Nama pengguna minimal 4 karakter.");
      usernameInput.focus();
      return;
    }

    if (password.length < 6) {
      displayError("Kata sandi minimal 6 karakter.");
      passwordInput.focus();
      return;
    }

    // Menonaktifkan tombol dan menunjukkan proses
    loginButton.textContent = "Memproses...";
    loginButton.disabled = true;

    // 2. Simulasi Login Sisi Server (Fitur Interaktif)
    setTimeout(() => {
      const username = usernameInput.value.trim();
      const password = passwordInput.value.trim();

      // Tentukan peran berdasarkan username
      const userRole = username === "admin" ? "admin" : "user";

      // KONDISI UTAMA: Pastikan salah satu terpenuhi
      if (
        (username === "admin" && password === "123456") ||
        (username === "pengguna" && password === "rahasia")
      ) {
        // --- Bagian KRUSIAL 1: Penyimpanan Sesi ---
        sessionStorage.setItem("loggedInUser", username);
        sessionStorage.setItem("userRole", userRole);

        alert(
          "Login Berhasil! Selamat datang, " +
            username +
            ". Anda dialihkan ke Dashboard."
        );

        // --- Bagian KRUSIAL 2: Pengalihan ---
        window.location.href = "dashboard.html";
      } else {
        displayError("Nama pengguna atau kata sandi salah.");
        loginButton.textContent = "Login";
        loginButton.disabled = false;
      }
    }, 1500); // Simulasi delay jaringan 1.5 detik
  });

  // Menambahkan efek visual fokus pada input
  const inputs = [usernameInput, passwordInput];
  inputs.forEach((input) => {
    input.addEventListener("focus", () => {
      input.parentElement.querySelector("label").style.color = "#007bff";
    });
    input.addEventListener("blur", () => {
      input.parentElement.querySelector("label").style.color = "#555";
    });
  });
});

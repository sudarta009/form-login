document.addEventListener("DOMContentLoaded", () => {
  const forgotPasswordForm = document.getElementById("forgotPasswordForm");
  const emailInput = document.getElementById("email");
  const errorMessage = document.getElementById("errorMessage");
  const resetButton = document.getElementById("resetButton");

  // Fungsi untuk menampilkan pesan (bisa sukses atau error)
  function displayMessage(message, isError = true) {
    errorMessage.textContent = message;
    errorMessage.style.color = isError ? "#e74c3c" : "#2ecc71"; // Merah untuk error, Hijau untuk sukses
    errorMessage.classList.add("show");

    // Sembunyikan pesan setelah 4 detik
    setTimeout(() => {
      errorMessage.classList.remove("show");
    }, 4000);
  }

  // Event listener untuk submit form
  forgotPasswordForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Mencegah form dikirim secara default

    const email = emailInput.value.trim();

    // Validasi Sisi Klien Dasar
    if (email === "") {
      displayMessage("Email tidak boleh kosong.");
      emailInput.focus();
      return;
    }

    // Regex sederhana untuk validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      displayMessage("Format email tidak valid.");
      emailInput.focus();
      return;
    }

    // Menonaktifkan tombol dan menunjukkan proses
    resetButton.textContent = "Mengirim...";
    resetButton.disabled = true;

    // **Simulasi Pengiriman Email Reset**
    // **CATATAN PENTING**: Dalam aplikasi nyata, ini akan menjadi permintaan
    // (request) ke server Anda (dengan Java/Node/PHP, dll.) untuk:
    // 1. Memeriksa apakah email ada di database.
    // 2. Membuat token reset unik.
    // 3. Mengirim email berisi token ke alamat email pengguna.

    setTimeout(() => {
      // **Simulasi Sukses**
      displayMessage(
        `Tautan reset telah dikirim ke ${email}. Cek kotak masuk Anda.`,
        false
      );
      emailInput.value = ""; // Kosongkan input setelah sukses

      // Mengembalikan status tombol
      resetButton.textContent = "Kirim Tautan Reset";
      resetButton.disabled = false;
    }, 2000); // Simulasi delay jaringan 2 detik
  });
});

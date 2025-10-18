document.addEventListener("DOMContentLoaded", () => {
  const loggedInUser = sessionStorage.getItem("loggedInUser");
  const userRole = sessionStorage.getItem("userRole");

  const welcomeTitle = document.getElementById("welcomeTitle");
  const welcomeMessage = document.getElementById("welcomeMessage");
  const adminSection = document.getElementById("adminSection");
  const userSection = document.getElementById("userSection");

  // 1. Verifikasi Otentikasi
  if (!loggedInUser || !userRole) {
    // Jika tidak ada data sesi, paksa logout
    window.location.href = "index.html";
    return;
  }

  // 2. Personalisasi dan Logika RBAC (Role-Based Access Control)
  welcomeTitle.textContent = `👋 Selamat Datang, ${loggedInUser}!`;

  if (userRole === "admin") {
    // Tampilkan bagian khusus Admin
    welcomeMessage.textContent =
      "Anda masuk sebagai **Administrator**. Akses penuh ke alat manajemen.";
    adminSection.style.display = "block";
  } else {
    // Asumsi peran 'user'
    welcomeMessage.textContent =
      "Ini adalah ringkasan akun dan aktivitas pribadi Anda.";
    userSection.style.display = "block";
  }
});

/**
 * Fungsi Logout
 */
function logout() {
  // Hapus data sesi saat logout
  sessionStorage.removeItem("loggedInUser");
  sessionStorage.removeItem("userRole");
  alert("Anda telah keluar. Sampai jumpa!");
  window.location.href = "login.html";
}

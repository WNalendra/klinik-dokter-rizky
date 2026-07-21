document.addEventListener("DOMContentLoaded", () => {
  const navbarToggle = document.getElementById("navbarToggle");
  const navbarNav = document.getElementById("navbarNav");
  if (navbarToggle && navbarNav) {
    navbarToggle.addEventListener("click", () => {
      const isOpen = navbarNav.classList.toggle("show");
      navbarToggle.setAttribute("aria-expanded", String(isOpen));
    });
    navbarNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth < 992) {
          navbarNav.classList.remove("show");
          navbarToggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  const dateInput = document.getElementById("apptDate");
  if (dateInput) {
    const today = new Date().toISOString().slice(0, 10);
    dateInput.min = today;
    dateInput.value = today;
  }

  const complaintSelect = document.getElementById("complaint");
  const complaintOther = document.getElementById("complaintOther");
  if (complaintSelect && complaintOther) {
    complaintSelect.addEventListener("change", () => {
      const isOther = complaintSelect.value === "Lainnya";
      complaintOther.classList.toggle("hidden", !isOther);
      complaintOther.required = isOther;
      if (!isOther) complaintOther.value = "";
    });
  }
});

function toggleFAQ(btn) {
  const content = btn.nextElementSibling;
  const icon = btn.querySelector("span");
  content.classList.toggle("open");
  icon.textContent = content.classList.contains("open") ? "−" : "+";
}

document
  .getElementById("reservationForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const date = document.getElementById("apptDate").value;
    const name = document.getElementById("fullName").value.trim();
    const wa = document.getElementById("whatsapp").value.trim();
    const nik = document.getElementById("NIK").value.trim();
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    let complaint = document.getElementById("complaint").value;
    const complaintOther = document.getElementById("complaintOther").value.trim();
    if (!date || !name || !wa || !nik || !age || !gender || !complaint)
      return alert("Lengkapi semua field.");
    if (complaint === "Lainnya") {
      if (!complaintOther) return alert("Mohon tuliskan keluhan Anda.");
      complaint = complaintOther;
    }
    document.getElementById("reservasi-section").classList.add("hidden");
    document.getElementById("success-view").classList.remove("hidden");
    const msg = `Halo Admin Klinik, saya ingin mengajukan reservasi.\n\nNama: ${name}\nWhatsApp: ${wa}\nUsia: ${age}\nJenis kelamin: ${gender}\nKeluhan: ${complaint}\nTanggal yang diinginkan: ${date}\n\nMohon informasi slot waktu yang tersedia.`;
    document.getElementById("whatsappConfirmLink").href =
      `https://wa.me/6281217440795?text=${encodeURIComponent(msg)}`;
    window.open(document.getElementById("whatsappConfirmLink").href, "_blank");
  });

function resetReservation() {
  document.getElementById("reservasi-section").classList.remove("hidden");
  document.getElementById("success-view").classList.add("hidden");
  document.getElementById("reservationForm").reset();
  const today = new Date().toISOString().slice(0, 10);
  document.getElementById("apptDate").value = today;
  const complaintOther = document.getElementById("complaintOther");
  if (complaintOther) {
    complaintOther.classList.add("hidden");
    complaintOther.required = false;
  }
}
// Dynamic greeting based on time of day
function greeting() {
  const hour = new Date().getHours();
  let message = "Welcome!";
  if (hour < 12) message = "Good Morning 🌞";
  else if (hour < 18) message = "Good Afternoon 🌤️";
  else message = "Good Evening 🌙";

  const greetingElement = document.getElementById("greeting");
  if (greetingElement) {
    greetingElement.innerText = message;
  }
}

// Dark mode toggle — persisted across pages via localStorage
function applyStoredTheme() {
  const stored = localStorage.getItem("theme");
  if (stored === "dark") {
    document.body.classList.add("dark-mode");
  }
  updateThemeToggleLabel();
}

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  updateThemeToggleLabel();
}

function updateThemeToggleLabel() {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;
  const isDark = document.body.classList.contains("dark-mode");
  btn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
}

// Hamburger menu toggle
function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  navLinks.classList.toggle("active");
}

// Fade-in project cards on scroll
function revealOnScroll() {
  const cards = document.querySelectorAll(".project-card");
  const windowHeight = window.innerHeight;

  cards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    if (cardTop < windowHeight - 50) {
      card.classList.add("visible");
    }
  });
}

// Contact form — builds a mailto: link on submit instead of relying on
// form action="mailto:..." with enctype="text/plain", which many browsers
// and mail clients handle inconsistently (or ignore the body entirely).
function handleContactSubmit(event) {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const subject = encodeURIComponent(`Portfolio contact from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:goodluckyhara@gmail.com?subject=${subject}&body=${body}`;
}

// Apply theme immediately (before load) to avoid a flash of the wrong theme
applyStoredTheme();

// Run greeting and animations on load
window.addEventListener("load", () => {
  greeting();
  revealOnScroll();

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactSubmit);
  }
});

// Run fade-in on scroll
window.addEventListener("scroll", revealOnScroll);

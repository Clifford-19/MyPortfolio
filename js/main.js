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

// Dark mode toggle
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
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

// Run greeting and animations on load
window.addEventListener("load", () => {
  greeting();
  revealOnScroll();
});

// Run fade-in on scroll
window.addEventListener("scroll", revealOnScroll);

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
  if (navLinks) navLinks.classList.toggle("active");
}

// Add a Zamora link throughout the site's navigation.
function addZamoraNavigationLink() {
  const navLinks = document.getElementById("navLinks");
  if (!navLinks || navLinks.querySelector('[data-zamora-link]')) return;

  const item = document.createElement("li");
  const link = document.createElement("a");
  link.href = "https://zamora.wauze.com";
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "Zamora ↗";
  link.dataset.zamoraLink = "true";
  item.appendChild(link);
  const contactItem = Array.from(navLinks.children).find((child) =>
    child.querySelector('a[href="contact.html"]')
  );
  navLinks.insertBefore(item, contactItem || null);
}

// Let visitors choose a profile photo. It is saved in this browser only.
function setupProfilePhotoUpload() {
  const avatars = document.querySelectorAll(".avatar");
  if (!avatars.length) return;

  const savedPhoto = localStorage.getItem("profilePhoto");
  avatars.forEach((avatar, index) => {
    avatar.dataset.initials = avatar.textContent.trim();
    if (savedPhoto) showProfilePhoto(avatar, savedPhoto);

    const controls = document.createElement("div");
    controls.className = "profile-upload";

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.className = "profile-upload-input";
    input.id = `profilePhotoInput${index}`;
    input.setAttribute("aria-label", "Choose a profile photo");

    const choose = document.createElement("label");
    choose.className = "profile-upload-button";
    choose.htmlFor = input.id;
    choose.textContent = savedPhoto ? "Change profile photo" : "Upload profile photo";

    const status = document.createElement("p");
    status.className = "profile-upload-status";
    status.setAttribute("aria-live", "polite");

    input.addEventListener("change", () => {
      const file = input.files && input.files[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        status.textContent = "Please choose an image file.";
        input.value = "";
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        status.textContent = "Please choose an image smaller than 2 MB.";
        input.value = "";
        return;
      }

      const reader = new FileReader();
      reader.addEventListener("load", () => {
        try {
          localStorage.setItem("profilePhoto", reader.result);
          document.querySelectorAll(".avatar").forEach((item) => showProfilePhoto(item, reader.result));
          document.querySelectorAll(".profile-upload-button").forEach((button) => {
            button.textContent = "Change profile photo";
          });
          document.querySelectorAll(".profile-upload-status").forEach((message) => {
            message.textContent = "Profile photo saved in this browser.";
          });
        } catch (error) {
          status.textContent = "Could not save this image. Try a smaller photo or clear browser storage.";
        }
      });
      reader.addEventListener("error", () => {
        status.textContent = "Could not read that image. Please try another file.";
      });
      reader.readAsDataURL(file);
    });

    controls.append(input, choose, status);
    avatar.insertAdjacentElement("afterend", controls);
  });
}

function showProfilePhoto(avatar, dataUrl) {
  const image = document.createElement("img");
  image.src = dataUrl;
  image.alt = "Goodlucky Hara profile photo";
  avatar.replaceChildren(image);
  avatar.classList.add("has-profile-photo");
}

// Highlight Zamora from the homepage and About page as well as the Projects page.
function addZamoraHighlights() {
  const hero = document.querySelector(".hero");
  if (hero && !document.querySelector(".zamora-highlight")) {
    const highlight = document.createElement("section");
    highlight.className = "zamora-highlight";
    highlight.innerHTML = '<h2>Explore Zamora</h2><p>Discover Zamora, one of my featured projects.</p><a class="btn" href="https://zamora.wauze.com" target="_blank" rel="noopener noreferrer">Visit Zamora ↗</a>';
    hero.insertAdjacentElement("afterend", highlight);
  }

  const aboutCard = document.querySelector(".about-card");
  if (aboutCard && !aboutCard.querySelector(".zamora-about-link")) {
    const link = document.createElement("p");
    link.className = "zamora-about-link";
    link.innerHTML = 'Explore my <a href="https://zamora.wauze.com" target="_blank" rel="noopener noreferrer">Zamora project ↗</a>.';
    aboutCard.appendChild(link);
  }
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

// Run page enhancements and animations on load
window.addEventListener("load", () => {
  greeting();
  addZamoraNavigationLink();
  addZamoraHighlights();
  setupProfilePhotoUpload();
  revealOnScroll();

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactSubmit);
  }
});

// Run fade-in on scroll
window.addEventListener("scroll", revealOnScroll);

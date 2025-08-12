// Get main content area for the blur effect
const mainContent = document.getElementById("main-content");
// Select all feature and testimonial cards for the new selection feature
const featureCards = document.querySelectorAll(".feature-card");
const testimonialCards = document.querySelectorAll(".testimonial");

// ---------- Theme dropdown + behavior ----------
const paletteBtn = document.getElementById("palette-btn");
const themeDropdown = document.getElementById("theme-dropdown");
const dropdownButtons = themeDropdown.querySelectorAll("button");
const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
const mobileNav = document.getElementById("mobile-nav");
const navLinks = document.querySelectorAll("#mobile-nav .nav-link");

// Function to get the current computed value of a CSS custom property
function getCssVariable(name) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

// open/close dropdown
paletteBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  themeDropdown.classList.toggle("hidden");
});

// close when clicking outside
document.addEventListener("click", (e) => {
  if (!themeDropdown.contains(e.target) && !paletteBtn.contains(e.target)) {
    themeDropdown.classList.add("hidden");
  }
});

// function to apply theme exactly like your todo app (data-theme + body.class)
function applyTheme(themeName) {
  // themeName expected 'theme-light' or 'theme-dark'
  document.documentElement.setAttribute("data-theme", themeName);
  document.body.className = themeName;
  localStorage.setItem("site-theme", themeName);

  // set palette icon (sun / moon) and color
  const icon = document.getElementById("palette-icon");
  if (themeName === "theme-dark") {
    icon.className = "bx bx-moon";
    icon.style.color = getCssVariable("--accent-ui") || "#ff4da6";
  } else {
    icon.className = "bx bx-sun";
    icon.style.color = getCssVariable("--accent-ui") || "#ff007f";
  }
}

// wire dropdown buttons
dropdownButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const theme = btn.getAttribute("data-theme");
    applyTheme(theme);
    themeDropdown.classList.add("hidden");
  });
});

// init theme on load (persist or system)
(function initTheme() {
  const saved = localStorage.getItem("site-theme");
  if (saved) {
    applyTheme(saved);
  } else {
    // system preference fallback
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(prefersDark ? "theme-dark" : "theme-light");
  }
})();

// listen for system changes only if user hasn't chosen (behaviour similar to todo app)
if (window.matchMedia) {
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      const saved = localStorage.getItem("site-theme");
      if (!saved) applyTheme(e.matches ? "theme-dark" : "theme-light");
    });
}

// Accessibility: keyboard navigation for dropdown
paletteBtn.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    themeDropdown.classList.toggle("hidden");
  }
});

// ---------- Mobile navigation toggle with blur effect ----------
mobileMenuToggle.addEventListener("click", () => {
  mobileNav.classList.toggle("hidden");
  mainContent.classList.toggle("blur-background");
  const icon = mobileMenuToggle.querySelector("i");
  if (mobileNav.classList.contains("hidden")) {
    icon.className = "bx bx-menu";
  } else {
    icon.className = "bx bx-x";
  }
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.add("hidden");
    mainContent.classList.remove("blur-background");
    const icon = mobileMenuToggle.querySelector("i");
    icon.className = "bx bx-menu";
  });
});

// ---------- Feature and Testimonial card selection functionality ----------
function toggleCardSelection(card) {
  const isSelected = card.getAttribute("data-selected") === "true";
  card.setAttribute("data-selected", !isSelected);
}

featureCards.forEach((card) => {
  card.addEventListener("click", () => {
    toggleCardSelection(card);
  });
});

testimonialCards.forEach((card) => {
  card.addEventListener("click", () => {
    toggleCardSelection(card);
  });
});

// ---------- Swiper init (testimonials) ----------
const swiper = new Swiper(".swiper", {
  // Better animation and grab cursor for mobile
  loop: true,
  grabCursor: true,

  // Responsive settings
  slidesPerView: 1, // Start with one slide on mobile
  spaceBetween: 24,

  breakpoints: {
    // Tablet view
    768: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    // Desktop view
    1024: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-next.custom-arrow",
    prevEl: ".swiper-prev.custom-arrow",
  },

  // Pagination dots
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

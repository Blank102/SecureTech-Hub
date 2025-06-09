document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
});

const colorMap = {
  malware:      { hex: '#f28b82', rgb: '242, 139, 130' },
  phishing:     { hex: '#ffd24b', rgb: '255, 210, 75'   },
  ransomware:   { hex: '#d7aefb', rgb: '215, 174, 251' },
  social:       { hex: '#a7ffeb', rgb: '167, 255, 235' },
  ddos:         { hex: '#aecbfa', rgb: '174, 203, 250' }
};

function showThreat(type) {
  // Remove active classes
  document.querySelectorAll('.threat-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.threat-text').forEach(t => t.classList.remove('active'));

  // Add active class to current
  document.querySelector(`.threat-btn.${type}`).classList.add('active');
  document.querySelector(`.threat-text.${type}`).classList.add('active');

  // Set dynamic CSS variables
  const threatInfo = document.querySelector('.threats-container');
  threatInfo.style.setProperty('--threat-color', colorMap[type].hex);
  threatInfo.style.setProperty('--threat-color-rgb', colorMap[type].rgb);
}

const carousel = document.querySelector('.carousel');
const title = document.querySelector('.carousel-title');
const expandButtons = document.querySelectorAll('.expand');
const overlay = document.getElementById('overlay');
const overlayTitle = document.getElementById('overlayTitle');
const overlayStory = document.getElementById('overlayStory');

// Slide title on scroll
carousel.addEventListener('scroll', () => {
  const maxShift = 150;
  const scrollRatio = carousel.scrollLeft / carousel.scrollWidth;
  const shift = Math.min(maxShift, scrollRatio * maxShift * 4);
  title.style.transform = `translateX(-${shift}px)`;
});

// Expand card
expandButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.card');
    const titleElement = card.querySelector('.card-title');
    const storyElement = card.querySelector('.card-story');

    overlayTitle.textContent = titleElement.textContent;
    overlayStory.textContent = storyElement.textContent;
    overlay.classList.add('active');
  });
});

function closeOverlay() {
  overlay.classList.remove('active');
}

function scrollCarousel(direction) {
  const carousel = document.querySelector('.carousel');
  const cardWidth = document.querySelector('.card.one').offsetWidth + 20;
  const distance = direction * cardWidth ;
  const duration = 600; // duration in milliseconds

  const start = carousel.scrollLeft;
  const startTime = performance.now();

  function animateScroll(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 0.5 - 0.5 * Math.cos(Math.PI * progress); // easeInOut

    carousel.scrollLeft = start + distance * ease;

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  }

  requestAnimationFrame(animateScroll);
}

  const scrollTopBtn = document.getElementById("scrollTopBtn");

  window.addEventListener("scroll", () => {
    const threats = document.getElementById("introSection");
    if (!threats) return;

    const showAfter = threats.offsetTop + threats.offsetHeight;
    scrollTopBtn.style.display = window.scrollY > showAfter ? "block" : "none";
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

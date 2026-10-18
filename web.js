
const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");
const scrollProgress = document.querySelector("#scrollProgress");
const heroVisual = document.querySelector("#heroVisual");

// Mobile navigation
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll("#navLinks a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Scroll progress bar
function updateScrollProgress() {
  const scrollableHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress = scrollableHeight > 0
    ? (window.scrollY / scrollableHeight) * 100
    : 0;

  scrollProgress.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateScrollProgress, {
  passive: true
});

updateScrollProgress();

// Reveal sections when they enter the viewport
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  revealElements.forEach((element) => {
    observer.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}

// Mouse-controlled 3D visual
if (heroVisual && window.matchMedia("(pointer: fine)").matches) {
  heroVisual.addEventListener("mousemove", (event) => {
    const rect = heroVisual.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    heroVisual.style.transform =
      `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  });

  heroVisual.addEventListener("mouseleave", () => {
    heroVisual.style.transform = "";
  });
}

// Automatically show current year in footer
document.querySelector("#year").textContent =
  new Date().getFullYear();

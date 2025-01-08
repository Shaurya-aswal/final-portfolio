// const scroll = new LocomotiveScroll({
//     el: document.querySelector('.main'),
//     smooth: true
// });

function loaderAnimation() {
  var loader = document.querySelector(".loader");
  setTimeout(function () {
    loader.style.top = "-100%";
  }, 4200);
}

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

loaderAnimation();

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // Your code here
  initSmoothScroll();
});

// cursor

const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circ");

const colors = [
  "#ffb56b",
  "#fdaf69",
  "#f89d63",
  "#f59761",
  "#ef865e",
  "#ec805d",
  "#e36e5c",
  "#df685c",
  "#d5585c",
  "#d1525c",
  "#c5415d",
  "#c03b5d",
  "#b22c5e",
  "#ac265e",
  "#9c155f",
  "#950f5f",
  "#830060",
  "#7c0060",
  "#680060",
  "#60005f",
  "#48005f",
  "#3d005e",
];

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function (e) {
  coords.x = e.clientX;
  coords.y = e.clientY;
});

function animateCircles() {
  let x = coords.x;
  let y = coords.y;

  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";

    circle.style.scale = (circles.length - index) / circles.length;

    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });

  requestAnimationFrame(animateCircles);
}

animateCircles();

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navBtns = document.querySelector(".nav-btns");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navBtns.classList.toggle("active");
  });
});

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  speed: 800, // Increase speed for smoother animations
  autoplay: {
    delay: 1000,
    disableOnInteraction: false,
  },
  effect: "coverflow", // Use a 3D coverflow effect
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  },
});

document.getElementById('full-scr').style.top = '-100%'; // Ensure it's hidden

function loaderAnimation() {
  var loader = document.querySelector(".loader");
  setTimeout(function () {
    loader.style.opacity = "0"; // Gradual fade-out
    loader.style.pointerEvents = "none"; // Disable interactions
    setTimeout(() => (loader.style.display = "none"), 1000); // Hide after fade-out
  }, 4200); // Matches your current delay
}

loaderAnimation();


document.addEventListener("DOMContentLoaded", function () {
  const projects = document.querySelectorAll(".project");
  const hoverImage = document.createElement("div");
  hoverImage.classList.add("hover-image");
  document.body.appendChild(hoverImage);

  let activeProject = null;

  // Function to check if the device is a tablet or phone
  function isMobileOrTablet() {
    return window.innerWidth <= 1024; // Adjust breakpoint as needed
  }

  // Track cursor position (for desktop only)
  if (!isMobileOrTablet()) {
    document.addEventListener("mousemove", function (e) {
      if (activeProject) {
        const x = e.clientX;
        const y = e.clientY;
        hoverImage.style.left = `${x}px`;
        hoverImage.style.top = `${y}px`;
      }
    });
  }

  // Handle project clicks
  projects.forEach((project) => {
    project.addEventListener("click", function (e) {
      // Remove active class from all other projects
      projects.forEach((p) => p.classList.remove("active"));

      // Add active class to the clicked project
      this.classList.add("active");
      activeProject = this;

      // Set hover image background (for desktop only)
      if (!isMobileOrTablet()) {
        const imageUrl = this.querySelector(".project-image").getAttribute("src");
        hoverImage.style.backgroundImage = `url(${imageUrl})`;

        // Position hover image at cursor location
        const x = e.clientX;
        const y = e.clientY;
        hoverImage.style.left = `${x}px`;
        hoverImage.style.top = `${y}px`;
        hoverImage.style.opacity = "1";
        hoverImage.style.transform = "translate(-50%, -50%) scale(1)";
      }

      // Open GitHub repository (for tablets and phones only)
      if (isMobileOrTablet()) {
        const githubUrl = this.getAttribute("data-github-url");
        if (githubUrl) {
          window.open(githubUrl, "_blank");
        }
      }
    });
  });

  // Close hover image when clicking outside (for desktop only)
  if (!isMobileOrTablet()) {
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".project")) {
        projects.forEach((p) => p.classList.remove("active"));
        hoverImage.style.opacity = "0";
        hoverImage.style.transform = "translate(-50%, -50%) scale(0.8)";
        activeProject = null;
      }
    });
  }
});
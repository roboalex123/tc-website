const logos = [
  {
    label: "Clovis Community College",
    mainText:
      "Thanks for visiting our conference page. Explore our presentations, meet our peer tutors, and access presentation materials.",
    alt: "Clovis Community College logo",
    src: "./ccc-logo.png",
  },
  {
    label: "Tutorial Center",
    mainText:
      "We are proud to share the work of our peer tutors and the Clovis Community College Tutorial Center at the NCWCA.",
    alt: "Tutorial Center logo",
    src: "./tc-logo.png",
  },
];

// Timing
const SWAP_EVERY = 3500;
const FADE_MS = 420;

const logoImg = document.getElementById("logo");
const logoLabel = document.getElementById("logoLabel");
const heroText = document.getElementById("heroText");

let idx = 0;
let timer = null;

const prefersReducedMotion =
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function preload() {
  logos.forEach((item) => {
    const img = new Image();
    img.src = item.src;
  });
}

function setLogo(i) {
  const item = logos[i];
  logoImg.src = item.src;
  logoImg.alt = item.alt;
  logoLabel.textContent = item.label;
  heroText.textContent = item.mainText;
}

function swapLogo() {
  if (prefersReducedMotion) {
    idx = (idx + 1) % logos.length;
    setLogo(idx);
    return;
  }

  logoImg.classList.add("fading");
  heroText.style.opacity = "0";
  heroText.style.transform = "translateY(4px)";
  heroText.style.transition = `opacity ${FADE_MS}ms ease, transform ${FADE_MS}ms ease`;

  setTimeout(() => {
    idx = (idx + 1) % logos.length;
    setLogo(idx);

    requestAnimationFrame(() => {
      logoImg.classList.remove("fading");
      heroText.style.opacity = "1";
      heroText.style.transform = "translateY(0)";
    });
  }, FADE_MS);
}

function start() {
  if (!logoImg || !logoLabel || !heroText) return;

  preload();
  setLogo(idx);

  if (timer) clearInterval(timer);
  timer = setInterval(swapLogo, SWAP_EVERY);
}

start();
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");
const music = document.getElementById("music");
const box = document.querySelector(".box");

function getNoButtonRect(x, y) {
  const boxRect = box.getBoundingClientRect();
  return {
    left: boxRect.left + x,
    top: boxRect.top + y,
    right: boxRect.left + x + noBtn.offsetWidth,
    bottom: boxRect.top + y + noBtn.offsetHeight,
  };
}

function isOverlappingYes(x, y) {
  const yesRect = yesBtn.getBoundingClientRect();
  const noRect = getNoButtonRect(x, y);
  const margin = 14;

  return !(
    noRect.right + margin < yesRect.left ||
    noRect.left - margin > yesRect.right ||
    noRect.bottom + margin < yesRect.top ||
    noRect.top - margin > yesRect.bottom
  );
}

function setNoInitialPosition() {
  const boxRect = box.getBoundingClientRect();
  const startX = Math.max(10, boxRect.width - noBtn.offsetWidth - 16);
  const startY = Math.max(10, boxRect.height - noBtn.offsetHeight - 16);
  noBtn.style.left = `${startX}px`;
  noBtn.style.top = `${startY}px`;
}

function moveNo() {
  const boxRect = box.getBoundingClientRect();
  const maxX = Math.max(0, boxRect.width - noBtn.offsetWidth - 8);
  const maxY = Math.max(0, boxRect.height - noBtn.offsetHeight - 8);
  let x, y;
  let tries = 0;

  do {
    x = Math.random() * maxX;
    y = Math.random() * maxY;
    tries++;
  } while (isOverlappingYes(x, y) && tries < 80);

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

window.addEventListener("load", setNoInitialPosition);
window.addEventListener("resize", setNoInitialPosition);

noBtn.addEventListener("mouseover", moveNo);
noBtn.addEventListener("click", moveNo);

yesBtn.addEventListener("click", () => {
  document.body.style.background =
    "radial-gradient(circle at top, #ffe5f0, #ff8ab3 40%, #1b1f3a 100%)";
  message.innerHTML = "💖 My Loveeeeeeeeaa, you made my heart dance! , LOVE YOU SO MUCHHHHHH";

  if (music.paused) {
    music.play().catch(() => {
      /* autoplay may be blocked until user interacts */
    });
  }

  confetti({
    particleCount: 180,
    spread: 90,
    origin: { y: 0.6 },
    colors: ["#ff9ec8", "#ff5c8a", "#ffd0e6", "#ffffff"],
  });

  setInterval(createHeart, 360);
});

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerHTML = "💖";
  heart.style.left = `${Math.random() * window.innerWidth}px`;
  heart.style.top = `${window.innerHeight}px`;
  heart.style.opacity = `${0.6 + Math.random() * 0.4}`;
  heart.style.fontSize = `${18 + Math.random() * 16}px`;

  document.body.appendChild(heart);

  let pos = window.innerHeight;
  const drift = (Math.random() - 0.5) * 1.4;

  const anim = setInterval(() => {
    pos -= 2.4;
    heart.style.top = `${pos}px`;
    heart.style.left = `${parseFloat(heart.style.left) + drift}px`;

    if (pos < -60) {
      clearInterval(anim);
      heart.remove();
    }
  }, 18);
}

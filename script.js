const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");

// 💔 NO button stays on screen and moves
noBtn.style.position = "fixed";

function moveNoButton() {
  const padding = 20;

  const btnWidth = noBtn.offsetWidth;
  const btnHeight = noBtn.offsetHeight;

  const maxX = window.innerWidth - btnWidth - padding;
  const maxY = window.innerHeight - btnHeight - padding;

  const x = Math.max(padding, Math.random() * maxX);
  const y = Math.max(padding, Math.random() * maxY);

  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
}

noBtn.addEventListener("mouseover", moveNoButton);
noBtn.addEventListener("click", moveNoButton);
noBtn.addEventListener("touchstart", moveNoButton);

// 💖 YES button
yesBtn.addEventListener("click", () => {
  document.body.style.background =
    "linear-gradient(45deg, #ff4d6d, #ffb3c1)";

  message.innerHTML =
    "💖 YAYYY Halaaaa 💖 You made me the happiest person!";

  // 💔 HIDE NO BUTTON HERE 👇
  noBtn.style.display = "none";

  // 💖 hearts start
  setInterval(createHeart, 250);
});

// 💖 floating hearts
setInterval(createHeart, 800);

// 💖 heart function
function createHeart() {
  const heart = document.createElement("div");
  heart.innerHTML = "💖";

  heart.style.position = "fixed";
  heart.style.left = Math.random() * window.innerWidth + "px";
  heart.style.top = window.innerHeight + "px";

  heart.style.fontSize = Math.random() * 20 + 10 + "px";
  heart.style.pointerEvents = "none";

  document.body.appendChild(heart);

  let pos = window.innerHeight;

  const fall = setInterval(() => {
    pos -= 2;
    heart.style.top = pos + "px";

    if (pos < -50) {
      clearInterval(fall);
      heart.remove();
    }
  }, 20);
}
function showScene(id) {
  document.querySelectorAll(".scene").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const cheesyPopup = document.getElementById("cheesyPopup");
const sorryBtn = document.getElementById("sorryBtn");
const hateBtn = document.getElementById("hateBtn");
const finalNoBtn = document.getElementById("finalNoBtn");

let noCount = 0;
let isHateMode = false;

// UNIVERSAL NINJA LOGIC: Stays inside the designated Glass Card
const moveNinja = (btn, containerId) => {
  const box = document.getElementById(containerId);
  const boxRect = box.getBoundingClientRect();
  const btnRect = btn.getBoundingClientRect();

  const minX = boxRect.left + 15;
  const maxX = boxRect.right - btnRect.width - 15;
  const minY = boxRect.top + 15;
  const maxY = boxRect.bottom - btnRect.height - 15;

  const randomX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
  const randomY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;

  btn.style.position = "fixed";
  btn.style.margin = "0";
  btn.style.left = `${randomX}px`;
  btn.style.top = `${randomY}px`;
};

// Scene 1 Interaction
const handleNo1 = (e) => {
  if (e) e.preventDefault();
  noCount++;
  if (noCount >= 6) {
    isHateMode = true;
    cheesyPopup.style.display = "flex";
  } else {
    moveNinja(noBtn, "mainCard");
  }
};
noBtn.addEventListener("mouseover", handleNo1);
noBtn.addEventListener("touchstart", handleNo1);

yesBtn.addEventListener("mouseover", () => { if (isHateMode) moveNinja(yesBtn, "mainCard"); });
yesBtn.addEventListener("touchstart", (e) => { if (isHateMode) { e.preventDefault(); moveNinja(yesBtn, "mainCard"); } });

sorryBtn.onclick = () => {
  isHateMode = false; noCount = 0;
  cheesyPopup.style.display = "none";
  yesBtn.style.position = "relative"; yesBtn.style.left = "0"; yesBtn.style.top = "0";
};
hateBtn.addEventListener("mouseover", () => moveNinja(hateBtn, "popupCard"));

// Reveal Flow
yesBtn.onclick = () => {
  if (!isHateMode) {
    showScene("scene2");
    setTimeout(() => {
      document.getElementById("curtainWrapper").classList.add("fade-out");
      document.getElementById("picnicContent").classList.remove("hidden");
    }, 3000); 
  }
};

// Memory Navigation
let opened = new Set();
document.querySelectorAll(".bubble").forEach(b => {
  b.onclick = () => {
    opened.add(b.dataset.scene);
    showScene(b.dataset.scene);
    if (opened.size === 4) document.getElementById("toVideoBtn").classList.remove("hidden");
  };
});
document.querySelectorAll(".back").forEach(btn => btn.onclick = () => showScene("scene2"));

// Video & End Game
const video = document.getElementById('capcutVideo');
document.getElementById("toVideoBtn").onclick = () => showScene("videoScene");
document.getElementById('videoControlBtn').onclick = () => {
  if (video.paused) { video.play(); document.getElementById('videoControlBtn').innerHTML = "Pause ⏸️"; }
  else { video.pause(); document.getElementById('videoControlBtn').innerHTML = "Watch Story ▶️"; }
};
video.onended = () => showScene("end");

// Final Troll Navigation
document.getElementById("bonusBtn").onclick = () => showScene("trollScene");
const handleFinalNo = (e) => { if (e) e.preventDefault(); moveNinja(finalNoBtn, "trollCard"); };
finalNoBtn.addEventListener("mouseover", handleFinalNo);
finalNoBtn.addEventListener("touchstart", handleFinalNo);
document.getElementById("finalYesBtn").onclick = () => showScene("realEnd");

// Hearts Background
setInterval(() => {
  const h = document.createElement("div");
  h.className = "heart"; h.innerHTML = "❤️";
  h.style.left = Math.random() * 100 + "vw";
  h.style.fontSize = Math.random() * 20 + 10 + "px";
  h.style.animationDuration = Math.random() * 2 + 3 + "s";
  document.getElementById("heartBg").appendChild(h);
  setTimeout(() => h.remove(), 4000);
}, 400);
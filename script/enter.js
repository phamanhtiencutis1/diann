document.getElementById("enterText").addEventListener("click", function () {
  document.getElementById("enterText").style.display = "none";
  document.getElementById("videoSection").style.display = "block";
  document.getElementById("snow").style.display = "none";

  const music = document.getElementById("bgMusic");
  music.volume = 0.5;
  music.play().catch((err) => {
    console.warn("Trình duyệt chặn autoplay:", err);
  });

  document.getElementById("profileCard").style.display = "block";
});
// Tự động đổi màu ngẫu nhiên mỗi giây cho enterText
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

setInterval(() => {
  document.getElementById("enterText").style.color = getRandomColor();
}, 1000);

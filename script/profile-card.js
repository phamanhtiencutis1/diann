async function loadDiscordStatus() {
  try {
    const response = await fetch("https://api.lanyard.rest/v1/users/560482241130528778");
    const { success, data } = await response.json();

    if (!success || !data) throw new Error("Không thể lấy dữ liệu từ API.");

    const user = data.discord_user;
    const presence = data;

    // Avatar xử lý an toàn
    const avatarMini = document.getElementById("discord-avatar-mini");
    if (user.avatar && avatarMini) {
      const isGif = user.avatar.startsWith("a_");
      const ext = isGif ? "gif" : "png";
      avatarMini.src = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}`;
    }

    // Tên người dùng (hiển thị biệt danh tuỳ chỉnh)
    const usernameMini = document.getElementById("discord-username-mini");
    if (usernameMini) {
      usernameMini.textContent = "D I A N N"; // Tên custom, không dùng discriminator
    }

    // Hiển thị hoạt động
    const activityMini = document.getElementById("discord-activity-mini");
    if (activityMini) {
      const activity = presence.activities.find(a => a.type === 0 || a.type === 2); // Playing or Listening

      if (activity) {
        const action = activity.type === 2 ? "nghe" : "chơi";
        activityMini.textContent = `Đang ${action}: ${activity.name}`;
      } else {
        const statusMap = {
          online: "Trực tuyến.",
          idle: "Rảnh.",
          dnd: "Không làm phiền.",
          offline: "Không hoạt động."
        };
        activityMini.textContent = statusMap[presence.discord_status] || "Không rõ trạng thái.";
      }
    }

  } catch (err) {
    console.error("Lỗi khi tải Discord status:", err);
    const activityMini = document.getElementById("discord-activity-mini");
    if (activityMini) {
      activityMini.textContent = "Không thể tải dữ liệu Discord.";
    }
  }
}

// Gọi hàm khi DOM đã sẵn sàng và cập nhật mỗi 30s
window.addEventListener("DOMContentLoaded", () => {
  loadDiscordStatus();
  setInterval(loadDiscordStatus, 30000);
});

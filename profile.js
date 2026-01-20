const username = localStorage.getItem("loggedInUser");
if (!username) window.location.href = "login.html";
document.getElementById("welcomeUser").textContent = `Hello, ${username}`;
document.getElementById("profileUsername").textContent = username;
const homeIcon = document.getElementById("homeIcon");
const dropdownMenu = document.getElementById("dropdownMenu");
homeIcon.onclick = () => {
  dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
};
document.getElementById("dashboardBtn").onclick = () => window.location.href = "dashboard.html";
document.getElementById("logoutBtn").onclick = () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
};
const togglePasswordBtn = document.getElementById("togglePasswordBtn");
const passwordForm = document.getElementById("passwordForm");

togglePasswordBtn.onclick = () => {
  passwordForm.style.display = passwordForm.style.display === "none" ? "block" : "none";
};
const passwordMsg = document.getElementById("passwordMsg");
passwordForm.addEventListener("submit", e => {
  e.preventDefault();
  const oldPassword = document.getElementById("oldPassword").value;
  const newPassword = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  const user = JSON.parse(localStorage.getItem(username));

  if (!user || user.password !== oldPassword) {
    passwordMsg.textContent = "Current password is incorrect.";
    passwordMsg.style.color = "red";
    return;
  }

  if (newPassword !== confirmPassword) {
    passwordMsg.textContent = "New passwords do not match.";
    passwordMsg.style.color = "red";
    return;
  }

  user.password = newPassword;
  localStorage.setItem(username, JSON.stringify(user));

  passwordMsg.textContent = "Password updated successfully!";
  passwordMsg.style.color = "green";
  passwordForm.reset();
  passwordForm.style.display = "none";
});
const books = JSON.parse(localStorage.getItem(`books_${username}`)) || [];
const completedCount = books.filter(b => b.status === "Completed").length;
const readingCount = books.filter(b => b.status === "Reading").length;
const wantCount = books.filter(b => b.status === "Want to Read").length;

document.getElementById("completedCount").textContent = completedCount;
document.getElementById("readingCount").textContent = readingCount;
document.getElementById("wantCount").textContent = wantCount;
let level = Math.floor(completedCount / 5) + 1;
document.getElementById("userLevel").textContent = `Level ${level}`;
let progressPercent = (completedCount % 5) * 20;
document.getElementById("levelProgress").style.width = `${progressPercent}%`;
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
loginBtn.onclick = () => {
  loginForm.classList.remove("hidden");
  signupForm.classList.add("hidden");
  loginBtn.classList.add("active");
  signupBtn.classList.remove("active");
};
signupBtn.onclick = () => {
  signupForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
  signupBtn.classList.add("active");
  loginBtn.classList.remove("active");
};
signupForm.addEventListener("submit", e => {
  e.preventDefault();

  const username = signupUsername.value.trim();
  const password = signupPassword.value;

  if (localStorage.getItem(username)) {
    signupMsg.textContent = "Username already exists";
    signupMsg.style.color = "red";
    return;
  }
  const user = { username, password };
  localStorage.setItem(username, JSON.stringify(user));

  signupMsg.textContent = "Account created. Please login.";
  signupMsg.style.color = "green";
  signupForm.reset();
});
loginForm.addEventListener("submit", e => {
  e.preventDefault();

  const username = loginUsername.value.trim();
  const password = loginPassword.value;

  const user = JSON.parse(localStorage.getItem(username));

  if (!user || user.password !== password) {
    loginMsg.textContent = "Invalid username or password";
    loginMsg.style.color = "red";
    return;
  }

  localStorage.setItem("loggedInUser", username);
  window.location.href = "dashboard.html";
});
const username = localStorage.getItem("loggedInUser");
if (!username) window.location.href = "login.html";

document.getElementById("welcomeUser").textContent = `Hello, ${username}`;

const homeIcon = document.getElementById("homeIcon");
const dropdownMenu = document.getElementById("dropdownMenu");

homeIcon.onclick = () => {
  dropdownMenu.style.display =
    dropdownMenu.style.display === "block" ? "none" : "block";
};

document.getElementById("profile").onclick = () => {
  window.location.href = "profile.html";
};

document.getElementById("logoutBtn").onclick = () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
};
const addBookBtn = document.getElementById("addBookBtn");
const addBookModal = document.getElementById("addBookModal");
const closeAddModal = document.getElementById("closeAddModal");

addBookBtn.onclick = () => addBookModal.style.display = "flex";
closeAddModal.onclick = () => addBookModal.style.display = "none";

window.onclick = e => {
  if (e.target === addBookModal) addBookModal.style.display = "none";
};
const bookForm = document.getElementById("bookForm");
const bookList = document.getElementById("bookList");
const statusFilter = document.getElementById("statusFilter");

let books = JSON.parse(localStorage.getItem(`books_${username}`)) || [];
renderBooks();

bookForm.onsubmit = e => {
  e.preventDefault();

  const book = {
    title: bookTitle.value,
    author: bookAuthor.value,
    series: bookSeries.value,
    number: bookNumber.value ? +bookNumber.value : null,
    genre: bookGenre.value,
    status: bookStatus.value,
    notes: bookNotes.value
  };

  books.push(book);
  localStorage.setItem(`books_${username}`, JSON.stringify(books));
  bookForm.reset();
  addBookModal.style.display = "none";
  renderBooks(statusFilter.value);
};

statusFilter.onchange = () => renderBooks(statusFilter.value);

function renderBooks(filter = "All") {
  bookList.innerHTML = "";

  const filtered = filter === "All"
    ? books
    : books.filter(b => b.status === filter);

  const map = {};

  filtered.forEach(b => {
    const key = b.series || "Standalone";
    if (!map[key]) map[key] = [];
    map[key].push(b);
  });

  for (let series in map) {
    const folder = document.createElement("div");
    folder.className = "series-folder";
    folder.innerHTML = `<h4>${series}</h4>`;

    map[series].sort((a,b)=> (a.number||0)-(b.number||0));

    map[series].forEach(book => {
      const div = document.createElement("div");
      div.className = "book-item";
      div.innerHTML = `<strong>${book.title}</strong> by ${book.author}`;
      div.onclick = () => {
        localStorage.setItem("selectedBookIndex", books.indexOf(book));
        window.location.href = "book.html";
      };
      folder.appendChild(div);
    });

    bookList.appendChild(folder);
  }
}
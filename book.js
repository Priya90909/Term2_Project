// Get logged-in user
const username = localStorage.getItem("loggedInUser");
if (!username) window.location.href = "login.html";
// Elements
const backArrow = document.getElementById("backArrow");
const homeIcon = document.getElementById("homeIcon");
const dropdownMenu = document.getElementById("dropdownMenu");
const profileBtn = document.getElementById("profileBtn");
const logoutBtn = document.getElementById("logoutBtn");
const bookTitleEl = document.getElementById("bookTitle");
const bookAuthorEl = document.getElementById("bookAuthor");
const bookSeriesEl = document.getElementById("bookSeries");
const bookNumberEl = document.getElementById("bookNumber");
const bookGenreEl = document.getElementById("bookGenre");
const bookStatusEl = document.getElementById("bookStatus");
const bookNotesEl = document.getElementById("bookNotes");
const editBtn = document.getElementById("editBtn");
const deleteBtn = document.getElementById("deleteBtn");
const editModal = document.getElementById("editModal");
const closeModal = document.getElementById("closeModal");
const editBookForm = document.getElementById("editBookForm");
const editTitle = document.getElementById("editTitle");
const editAuthor = document.getElementById("editAuthor");
const editSeries = document.getElementById("editSeries");
const editNumber = document.getElementById("editNumber");
const editGenre = document.getElementById("editGenre");
const editStatus = document.getElementById("editStatus");
const editNotes = document.getElementById("editNotes");
backArrow.onclick = () => window.location.href = "dashboard.html";
homeIcon.onclick = () => {
  dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
};
profileBtn.onclick = () => window.location.href = "profile.html";
logoutBtn.onclick = () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
};
let books = JSON.parse(localStorage.getItem(`books_${username}`)) || [];
const index = parseInt(localStorage.getItem("selectedBookIndex"));
if (isNaN(index) || index < 0 || index >= books.length) {
  alert("Book not found!");
  window.location.href = "dashboard.html";
}

let book = books[index];
function displayBook() {
  bookTitleEl.textContent = book.title;
  bookAuthorEl.textContent = book.author;
  bookSeriesEl.textContent = book.series || "-";
  bookNumberEl.textContent = book.number || "-";
  bookGenreEl.textContent = book.genre || "-";
  bookStatusEl.textContent = book.status;
  bookNotesEl.textContent = book.notes || "-";
}
displayBook();
deleteBtn.onclick = () => {
  if (confirm("Are you sure you want to delete this book?")) {
    books.splice(index, 1);
    localStorage.setItem(`books_${username}`, JSON.stringify(books));
    window.location.href = "dashboard.html";
  }
};
editBtn.onclick = () => {
  editTitle.value = book.title;
  editAuthor.value = book.author;
  editSeries.value = book.series;
  editNumber.value = book.number;
  editGenre.value = book.genre;
  editStatus.value = book.status;
  editNotes.value = book.notes;

  editModal.style.display = "flex";
};
closeModal.onclick = () => editModal.style.display = "none";
window.onclick = (e) => {
  if (e.target === editModal) editModal.style.display = "none";
};
editBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  book.title = editTitle.value.trim();
  book.author = editAuthor.value.trim();
  book.series = editSeries.value.trim();
  book.number = editNumber.value ? parseInt(editNumber.value) : null;
  book.genre = editGenre.value.trim();
  book.status = editStatus.value;
  book.notes = editNotes.value.trim();

  books[index] = book;
  localStorage.setItem(`books_${username}`, JSON.stringify(books));

  displayBook();
  editModal.style.display = "none";
});

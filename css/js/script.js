// Mobile menu toggle
function toggleMenu() {
  const menu = document.getElementById('navMenu');
  menu.classList.toggle('show');
}

// Dark/Light mode toggle (visitor)
function toggleTheme() {
  document.body.classList.toggle('dark-mode');
}

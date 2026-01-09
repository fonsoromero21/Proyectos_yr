// Toggle nav menu
const selectElement = el => document.querySelector(el);
const menuToggle = selectElement('.menu-toggle');
const body = selectElement('body');

if (menuToggle) {
  menuToggle.addEventListener('click', () => body.classList.toggle('open'));
}

// Close menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => body.classList.remove('open'));
});

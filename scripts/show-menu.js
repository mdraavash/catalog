const displayMobilemenu = document.getElementById("show-menu-button")
const closeMobilemenu = document.getElementById("close-menu-button")
const navLinks = document.querySelectorAll('.nav-link, .dropdown-item a');

displayMobilemenu.addEventListener("click", () => {
    document.body.classList.toggle("show-mobile-menu");
});

closeMobilemenu.addEventListener("click", () => displayMobilemenu.click());
navLinks.forEach(link => {
    link.addEventListener('click', () => displayMobilemenu.click())
});
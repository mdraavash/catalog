// const displayMobilemenu = document.getElementById("show-menu-button")
// const closeMobilemenu = document.getElementById("close-menu-button")
// const navLinks = document.querySelectorAll('.nav-link, .dropdown-item a');

// displayMobilemenu.addEventListener("click", () => {
//     document.body.classList.toggle("show-mobile-menu");
// });

// closeMobilemenu.addEventListener("click", () => displayMobilemenu.click());
// navLinks.forEach(link => {
//     link.addEventListener('click', () => displayMobilemenu.click();)
// });

// --- Mobile Menu Logic (Corrected) ---
const openMenuBtn = document.querySelector('#show-menu-button');
const closeMenuBtn = document.querySelector('#close-menu-button');
const navBar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link, .dropdown-item a');

openMenuBtn.addEventListener('click', () => {
    navBar.classList.add('mobile-menu-active');
});

closeMenuBtn.addEventListener('click', () => {
    navBar.classList.remove('mobile-menu-active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navBar.classList.remove('mobile-menu-active');
    });
});
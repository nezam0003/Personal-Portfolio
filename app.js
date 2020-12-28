const date = document.getElementById('date');
date.innerHTML = new Date().getFullYear();

const navToggle = document.querySelector('.nav-toggle');
const linksContainer = document.querySelector('.items-container');
const links = document.querySelector('.nav-items');

// Toggle events
navToggle.addEventListener('click', () => {
    const linksContainerHeight = linksContainer.getBoundingClientRect().height;
    const linksHeight = links.getBoundingClientRect().height;
    if (linksContainerHeight === 0) {
        linksContainer.style.height = `${linksHeight}px`;
    } else {
        linksContainer.style.height = 0;
    }
});

// Target Navbar & Scroll-Link
const navbar = document.getElementById('nav');
const topLink = document.querySelector('.top-link');
// Fixed navbar
window.addEventListener('scroll', () => {
    const scrollHeight = window.pageYOffset;
    const navHeight = navbar.getBoundingClientRect().height;
    if (scrollHeight > navHeight) {
        navbar.classList.add('fixed-nav');
    } else {
        navbar.classList.remove('fixed-nav');
    }
    if (scrollHeight > 400) {
        topLink.classList.add('show-link');
    } else {
        topLink.classList.remove('show-link');
    }
});
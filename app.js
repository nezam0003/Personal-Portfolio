const date = document.getElementById('date');
date.innerHTML = new Date().getFullYear();

const navToggle = document.querySelector('.nav-toggle');
const linksContainer = document.querySelector('.items-container');
const links = document.querySelector('.nav-items');

// set initial state of menu 
let showMenu = false;
// Toggle events
navToggle.addEventListener('click', () => {
    const linksContainerHeight = linksContainer.getBoundingClientRect().height;
    const linksHeight = links.getBoundingClientRect().height;
    if (!(showMenu) && (linksContainerHeight === 0)) {
        navToggle.classList.add('close');
        linksContainer.style.height = `${linksHeight}px`;
        showMenu = true;
    } else {
        navToggle.classList.remove('close');
        linksContainer.style.height = 0;
        showMenu = false;
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

// Smooth scroll
const scrollLinks = document.querySelectorAll('.nav-link');
scrollLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        // Navigate to specific section
        const id = e.currentTarget.getAttribute("href").slice(1);
        const element = document.getElementById(id);
        // calculate the height and get exact position of the specific section
        const navHeight = navbar.getBoundingClientRect().height;
        const containerHeight = linksContainer.getBoundingClientRect().height;
        const fixedNav = navbar.classList.contains('fixed-nav');
        let position = element.offsetTop - navHeight;
        if (!fixedNav) {
            position = position - navHeight;
        }
        if (navHeight > 82) {
            position = position + containerHeight;
        }
        window.scrollTo({
            left: 0,
            top: position,
        });
        // close links when click on a specific link
        linksContainer.style.height = 0;
    });
});

// Typing Effect
const TypeWriter = function(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }
    // type method
TypeWriter.prototype.type = function() {
    // current index of word
    const current = this.wordIndex % this.words.length;

    // Get full text of current word
    const fullTxt = this.words[current];

    // Check if Deleting
    if (this.isDeleting) {
        // Remove character
        this.txt = fullTxt.substring(0, this.txt.length - 1);

    } else {
        // Add character
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial Type speed
    let typeSpeed = 300;
    if (this.isDeleting) {
        typeSpeed /= 2;
    }

    // if Word is completed
    if (!this.isDeleting && this.txt === fullTxt) {
        // this will make pause at the End
        typeSpeed = this.wait;
        // set isDeleting to True
        this.isDeleting = true;
    }
    // Switch to the next word after deleting one
    else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.wordIndex++;
        // Pause before start typing again
        typeSpeed = 500;

    }

    setTimeout(() => this.type(), typeSpeed);
}

// init on DOM Load
document.addEventListener('DOMContentLoaded', init);

// init App
function init() {
    const txtElement = document.querySelector('.text-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    // Initialize TypeWriter
    new TypeWriter(txtElement, words, wait);

}

// Class type Writer
class TypeWriter2 {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }
    type() {
        // current index of word
        const current = this.wordIndex % this.words.length;

        // Get full text of current word
        const fullTxt = this.words[current];

        // Check if Deleting
        if (this.isDeleting) {
            // Remove character
            this.txt = fullTxt.substring(0, this.txt.length - 1);

        } else {
            // Add character
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert txt into element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        // Initial Type speed
        let typeSpeed = 300;
        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        // if Word is completed
        if (!this.isDeleting && this.txt === fullTxt) {
            // this will make pause at the End
            typeSpeed = this.wait;
            // set isDeleting to True
            this.isDeleting = true;
        }
        // Switch to the next word after deleting one
        else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            // Pause before start typing again
            typeSpeed = 500;

        }

        setTimeout(() => this.type(), typeSpeed);
    }
}
// init2 on DOM Load
document.addEventListener('DOMContentLoaded', init2);

// init2 App
function init2() {
    const txtElement = document.querySelector('.text-type2');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    // Init2ialize TypeWriter
    new TypeWriter(txtElement, words, wait);

}

// ***********Dynamic Image gallery**********
const current = document.querySelector('#current');
// get all images
const imgs = document.querySelectorAll('.images img');
const opacity = 0.4;

// set the opacity for first image
imgs[0].style.opacity = opacity;

imgs.forEach((img) => {
    img.addEventListener('click', (e) => {
        // Reset the opacity
        imgs.forEach(img => (img.style.opacity = 1));

        // Change current images to src of clicked image
        current.src = e.target.src;

        // Add fade-in class
        current.classList.add('fade-in');

        // Remove fade in class in after .5sec
        setTimeout(() => current.classList.remove('fade-in'), 500);

        // Change the opacity of current clicked image
        e.target.style.opacity = opacity;
    });
});

// Download CV
const btnDownload = document.getElementById('btn-download');
const xhr = new XMLHttpRequest();
xhr.responseType = "blob";
xhr.open("GET", "cv.pdf", true);
xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
        const obj = window.URL.createObjectURL(xhr.response);
        btnDownload.setAttribute("href", obj);

        // Remove obj after 60s
        setTimeout(() => {
            window.URL.revokeObjectURL(obj);
        }, 60 * 1000);
    } else {
        console.log('error');
    }
}
xhr.send();
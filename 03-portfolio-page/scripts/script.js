const body = document.body;
const saved_theme = localStorage.getItem('theme');

initializeTheme()

function initializeTheme() {
    if (saved_theme === null ) {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    } 
    if (saved_theme === 'dark') {
        body.classList.add('dark');
    }
}

// Function to alternate between light and dark mode
function updateTheme() {
    const theme_button = document.getElementById('theme-button');
    if (body.classList.contains("dark")) {
        body.classList.remove('dark');
        theme_button.getElementsByTagName("span")[0].textContent = "dark_mode";
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark');
        theme_button.getElementsByTagName("span")[0].textContent = "light_mode";
        localStorage.setItem('theme', 'dark');
    }
}

// Scroll to navigation links
const navLinks = document.querySelectorAll('#menu ul.menu-links a');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});
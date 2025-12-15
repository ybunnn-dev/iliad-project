document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SELECT DOM ELEMENTS ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    // --- 2. MOBILE MENU TOGGLE LOGIC (NEW) ---
    // This handles the hamburger button click
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            // Toggle the .active class on the list to slide it in/out
            navLinksContainer.classList.toggle('active');
            
            // Optional: Switch icon between ☰ and ✕
            if (navLinksContainer.classList.contains('active')) {
                menuToggle.innerHTML = '✕'; 
            } else {
                menuToggle.innerHTML = '☰';
            }
        });
    }

    // --- 3. SMOOTH SCROLL & CLOSE MENU ON CLICK ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Stop default jump
            
            // Get target ID and Element
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Scroll smoothly
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
                
                // IMPORTANT: Close mobile menu after clicking a link
                navLinksContainer.classList.remove('active');
                if (menuToggle) menuToggle.innerHTML = '☰';
            }
        });
    });

    // --- 4. SCROLL SPY (HIGHLIGHT ACTIVE LINK) ---
    window.addEventListener('scroll', () => {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            
            // Use offset (150px) to account for the navbar height
            if (window.scrollY >= (sectionTop - 150)) {
                // Only capture sections with an ID
                if (section.getAttribute('id')) {
                    currentSection = section.getAttribute('id');
                }
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            // Check if link matches current section
            if (link.getAttribute('href').includes(currentSection)) {
                link.classList.add('active');
            }
        });
    });

});
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Select all navigation links and sections
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    // 2. Add scroll event listener to update active state
    window.addEventListener('scroll', () => {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Logic: If we have scrolled 1/3rd into the section
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            // Check if the href matches the current section ID
            if (link.getAttribute('href').includes(currentSection)) {
                link.classList.add('active');
            }
        });
    });

    // 3. Smooth scrolling is handled by CSS (html { scroll-behavior: smooth; })
    // But if you want to force specific behavior on click, you can add this:
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Optional: Mobile Menu Toggle Logic
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    if(menuToggle) {
        menuToggle.addEventListener('click', () => {
            // Simple toggle for mobile view (you'd need to add CSS for .show)
            if(navLinksContainer.style.display === 'flex') {
                navLinksContainer.style.display = 'none';
            } else {
                navLinksContainer.style.display = 'flex';
                navLinksContainer.style.flexDirection = 'column';
                navLinksContainer.style.position = 'absolute';
                navLinksContainer.style.top = '60px';
                navLinksContainer.style.right = '0';
                navLinksContainer.style.background = 'rgba(0,0,0,0.9)';
                navLinksContainer.style.width = '100%';
                navLinksContainer.style.padding = '20px';
            }
        });
    }
});
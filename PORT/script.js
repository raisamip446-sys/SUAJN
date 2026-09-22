document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       MOBILE NAVIGATION
    ========================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");

            const isOpen = navLinks.classList.contains("active");

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );

            menuToggle.textContent = isOpen ? "✕" : "☰";
        });


        /* Close menu when a navigation link is clicked */

        const navigationItems = document.querySelectorAll(
            ".nav-links a"
        );

        navigationItems.forEach((link) => {

            link.addEventListener("click", () => {
                navLinks.classList.remove("active");

                menuToggle.textContent = "☰";

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation"
                );
            });

        });
    }


    /* ==========================================
       ACTIVE NAVIGATION LINK
    ========================================== */

    const sections = document.querySelectorAll("section[id]");
    const navigationLinks = document.querySelectorAll(".nav-links a");

    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });


        navigationLinks.forEach((link) => {

            link.classList.remove("active");

            const target = link.getAttribute("href");

            if (target === `#${currentSection}`) {
                link.classList.add("active");
            }

        });

    }

    window.addEventListener("scroll", updateActiveNavigation);

    updateActiveNavigation();


    /* ==========================================
       HEADER SCROLL EFFECT
    ========================================== */

    const header = document.querySelector(".header");

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", updateHeader);

    updateHeader();


    /* ==========================================
       REVEAL SECTIONS ON SCROLL
    ========================================== */

    const revealElements = document.querySelectorAll(
        ".section-heading, .about-text, .service-card, .education-card, .skill, .contact-info, .contact-form"
    );

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("reveal-visible");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach((element) => {
        element.classList.add("reveal");
        revealObserver.observe(element);
    });


    /* ==========================================
       CONTACT FORM
    ========================================== */

    const contactForm = document.querySelector(".contact-form");

    if (contactForm) {

        contactForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const name = document.querySelector("#name").value.trim();
            const email = document.querySelector("#email").value.trim();
            const message = document.querySelector("#message").value.trim();


            if (!name || !email || !message) {

                showFormMessage(
                    "Please fill in all the fields.",
                    "error"
                );

                return;
            }


            showFormMessage(
                `Thanks ${name}! Your message has been prepared successfully.`,
                "success"
            );

            contactForm.reset();

        });

    }


    /* ==========================================
       FORM MESSAGE
    ========================================== */

    function showFormMessage(message, type) {

        let messageElement = document.querySelector(
            ".form-message"
        );


        if (!messageElement) {

            messageElement = document.createElement("p");

            messageElement.className = "form-message";

            contactForm.appendChild(messageElement);

        }


        messageElement.textContent = message;

        messageElement.className =
            `form-message ${type}`;


        setTimeout(() => {

            messageElement.remove();

        }, 5000);

    }


    /* ==========================================
       UPDATE COPYRIGHT YEAR
    ========================================== */

    const footerParagraphs =
        document.querySelectorAll(".footer p");

    if (footerParagraphs.length > 0) {

        footerParagraphs[0].textContent =
            `© ${new Date().getFullYear()} Aashish Khanal. All Rights Reserved.`;

    }

});

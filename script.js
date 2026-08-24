// ======================================
// CORVION LABS
// SCRIPT.JS
// ======================================

// ---------- Mobile Menu ----------

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    document.querySelectorAll("#nav-menu a").forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

        });

    });

}

// ---------- Fade In Animation ----------

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

        }

    });

}, {
    threshold: 0.15
});

document.querySelectorAll("section").forEach(section => {

    section.classList.add("fade-in");

    observer.observe(section);

});

// ---------- Close Mobile Menu On Resize ----------

window.addEventListener("resize", () => {

    if (window.innerWidth > 900 && navMenu) {

        navMenu.classList.remove("active");

    }

});
// =========================================================
// CORVION LABS
// SCRIPT.JS
// =========================================================
//
// This file controls:
// 1. Mobile navigation
// 2. Section fade-in animation
// 3. Gallery Photos / Videos tabs
// 4. Independent Before / After carousels
//
// The goal is to keep each feature separate and easy to
// understand and modify later.
// =========================================================


/* =========================================================
   1. MOBILE MENU
   ========================================================= */

// Find the mobile menu button and navigation menu.
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");


// Only run the menu code if both elements exist.
if (menuToggle && navMenu) {

    // Open / close the mobile navigation.
    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");

    });


    // Close the mobile menu after selecting a navigation link.
    navMenu.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

        });

    });


    // If the browser becomes wider than the mobile breakpoint,
    // make sure the mobile menu is closed.
    window.addEventListener("resize", () => {

        if (window.innerWidth > 900) {

            navMenu.classList.remove("active");

        }

    });

}


/* =========================================================
   2. SECTION FADE-IN ANIMATION
   ========================================================= */

// IntersectionObserver watches sections as they enter
// the screen and adds the "visible" class.
const fadeObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                // Once the section has appeared, we don't need
                // to keep watching it.
                fadeObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.15
    }
);


// Apply the fade-in effect to every section.
document.querySelectorAll("section").forEach((section) => {

    section.classList.add("fade-in");

    fadeObserver.observe(section);

});


/* =========================================================
   3. GALLERY TABS
   =========================================================

   Clicking "Photos" displays the photo gallery.

   Clicking "Videos" displays the video area.

   IMPORTANT:
   There is intentionally NO "click outside" behavior here.

   Clicking outside the gallery will NOT collapse it.
   ========================================================= */

const galleryTabs = document.querySelectorAll(".gallery-tab");
const galleryContents = document.querySelectorAll(".gallery-content");


// Function used to switch between gallery tabs.
function showGallery(galleryName) {

    // Remove active state from every tab.
    galleryTabs.forEach((tab) => {

        tab.classList.remove("active");

    });


    // Hide every gallery content area.
    galleryContents.forEach((content) => {

        content.classList.remove("active");

    });


    // Find the selected tab.
    const selectedTab = document.querySelector(
        `.gallery-tab[data-gallery="${galleryName}"]`
    );


    // Find the selected gallery content.
    const selectedContent = document.getElementById(galleryName);


    // Activate them if they exist.
    if (selectedTab) {

        selectedTab.classList.add("active");

    }

    if (selectedContent) {

        selectedContent.classList.add("active");

    }

}


// Give every gallery tab its click behavior.
galleryTabs.forEach((tab) => {

    tab.addEventListener("click", () => {

        showGallery(tab.dataset.gallery);

    });

});


/*
   Optional default:

   If no gallery tab is active when the page loads,
   automatically show Photos.

   This makes the gallery easier to use.
*/

if (
    galleryTabs.length > 0 &&
    !document.querySelector(".gallery-tab.active")
) {

    showGallery("photos");

}


/* =========================================================
   4. CAROUSELS
   =========================================================

   Every .gallery-carousel gets its OWN carousel controller.

   This is important because we now have:

       BEFORE carousel
              +
       AFTER carousel

   Clicking the Before arrows only changes Before.

   Clicking the After arrows only changes After.
   ========================================================= */


function initializeCarousel(carousel) {

    // Find all slides inside this particular carousel.
    const slides = carousel.querySelectorAll(".carousel-slide");

    // Find this carousel's own buttons.
    const previousButton =
        carousel.querySelector(".carousel-prev");

    const nextButton =
        carousel.querySelector(".carousel-next");


    // A carousel without slides cannot function.
    if (slides.length === 0) {
        return;
    }


    // Keep track of which picture is currently displayed.
    let currentSlide = 0;


    // Show one particular slide.
    function showSlide(index) {

        slides.forEach((slide, slideIndex) => {

            slide.classList.toggle(
                "active",
                slideIndex === index
            );

        });

    }


    // Move to the previous picture.
    function showPreviousSlide() {

        currentSlide--;

        // If we move before the first picture,
        // go to the last picture.
        if (currentSlide < 0) {

            currentSlide = slides.length - 1;

        }

        showSlide(currentSlide);

    }


    // Move to the next picture.
    function showNextSlide() {

        currentSlide++;

        // If we move past the last picture,
        // return to the first picture.
        if (currentSlide >= slides.length) {

            currentSlide = 0;

        }

        showSlide(currentSlide);

    }


    // Previous button.
    if (previousButton) {

        previousButton.addEventListener(
            "click",
            showPreviousSlide
        );

    }


    // Next button.
    if (nextButton) {

        nextButton.addEventListener(
            "click",
            showNextSlide
        );

    }


    // Make sure the first slide is displayed.
    showSlide(currentSlide);

}


/* =========================================================
   5. INITIALIZE EVERY CAROUSEL
   ========================================================= */

// Find ALL carousels on the page.
//
// querySelectorAll() is important here.
//
// querySelector() would only find the first one.
//
// querySelectorAll() finds:
// - Before carousel
// - After carousel
// - Any future carousel we add later
//
document
    .querySelectorAll(".gallery-carousel")
    .forEach((carousel) => {

        initializeCarousel(carousel);

    });


// =========================================================
// END OF SCRIPT
// =========================================================
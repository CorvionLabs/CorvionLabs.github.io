// =========================================================
// CORVION LABS
// SCRIPT.JS
// =========================================================
//
// This file controls:
//
// 1. Mobile navigation
// 2. Section fade-in animation
// 3. Gallery Photos / Videos tabs
// 4. Before / After carousels
//
// Everything is separated into sections so the code is
// easier to understand and maintain.
// =========================================================



/* =========================================================
   1. MOBILE MENU
   ========================================================= */

// Find the hamburger button and navigation menu.
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");


// Only run this code if both elements exist.
if (menuToggle && navMenu) {

    // -----------------------------------------------------
    // OPEN / CLOSE MENU
    // -----------------------------------------------------
    //
    // Clicking the hamburger toggles the mobile menu.
    //
    menuToggle.addEventListener("click", (event) => {

        // Prevent this click from being treated as an
        // outside click by the document listener below.
        event.stopPropagation();

        navMenu.classList.toggle("active");

    });


    // -----------------------------------------------------
    // CLOSE MENU AFTER CLICKING A NAVIGATION LINK
    // -----------------------------------------------------
    //
    // Example:
    // Tap "Services" → menu closes → page moves to Services.
    //
    navMenu.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

        });

    });


    // -----------------------------------------------------
    // CLOSE MENU WHEN CLICKING OUTSIDE
    // -----------------------------------------------------
    //
    // This only closes the MOBILE navigation menu.
    //
    // It does NOT affect the gallery or carousels.
    //
    document.addEventListener("click", (event) => {

        const clickedInsideMenu = navMenu.contains(event.target);
        const clickedHamburger = menuToggle.contains(event.target);


        // If the user clicked somewhere other than the
        // menu or hamburger, close the menu.
        if (!clickedInsideMenu && !clickedHamburger) {

            navMenu.classList.remove("active");

        }

    });


    // -----------------------------------------------------
    // CLOSE MENU WHEN SWITCHING TO DESKTOP
    // -----------------------------------------------------
    //
    // If the screen becomes wider than 900px, make sure
    // the mobile menu is no longer open.
    //
    window.addEventListener("resize", () => {

        if (window.innerWidth > 900) {

            navMenu.classList.remove("active");

        }

    });

}



/* =========================================================
   2. SECTION FADE-IN ANIMATION
   ========================================================= */

// IntersectionObserver detects when a section enters
// the screen.
//
// When it does, we add the "visible" class.
//
// The CSS controls the actual animation.
const fadeObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");


                // Once the section has appeared, we no longer
                // need to watch it.
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
//
// The gallery has two main tabs:
//
//     PHOTOS
//     VIDEOS
//
// Clicking Photos shows the photo gallery.
// Clicking Videos shows the video area.
//
// IMPORTANT:
// There is NO "click outside gallery" code here.
//
// Therefore clicking outside the gallery will NOT collapse
// the gallery.
// ========================================================= */

const galleryTabs = document.querySelectorAll(".gallery-tab");
const galleryContents = document.querySelectorAll(".gallery-content");


// ---------------------------------------------------------
// SWITCH GALLERY
// ---------------------------------------------------------
//
// This function receives either:
//
//     "photos"
//     "videos"
//
// and displays the appropriate gallery.
// ---------------------------------------------------------

function showGallery(galleryName) {


    // Remove "active" from every tab.
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


    // Activate the selected tab.
    if (selectedTab) {

        selectedTab.classList.add("active");

    }


    // Show the selected gallery.
    if (selectedContent) {

        selectedContent.classList.add("active");

    }

}


// ---------------------------------------------------------
// GIVE EACH GALLERY TAB ITS CLICK FUNCTION
// ---------------------------------------------------------

galleryTabs.forEach((tab) => {

    tab.addEventListener("click", () => {

        showGallery(tab.dataset.gallery);

    });

});


// ---------------------------------------------------------
// DEFAULT GALLERY
// ---------------------------------------------------------
//
// If neither Photos nor Videos is active when the page
// loads, automatically show Photos.
//
// This makes the gallery immediately usable.
// ---------------------------------------------------------

if (
    galleryTabs.length > 0 &&
    !document.querySelector(".gallery-tab.active")
) {

    showGallery("photos");

}



/* =========================================================
   4. CAROUSEL SYSTEM
   =========================================================
//
// This is designed to support MULTIPLE carousels.
//
// Currently you have:
//
//     BEFORE CAROUSEL
//     AFTER CAROUSEL
//
// Each carousel operates independently.
//
// Clicking the Before arrows only changes Before.
//
// Clicking the After arrows only changes After.
//
// If you add another carousel later, it will work
// automatically as long as it uses:
//
//     .gallery-carousel
//     .carousel-slide
//     .carousel-prev
//     .carousel-next
// ========================================================= */


function initializeCarousel(carousel) {


    // -----------------------------------------------------
    // FIND THIS CAROUSEL'S SLIDES
    // -----------------------------------------------------
    //
    // We search INSIDE this carousel.
    //
    // This is important because it prevents the Before
    // carousel from controlling the After carousel.
    //
    const slides = carousel.querySelectorAll(
        ".carousel-slide"
    );


    // Find this carousel's Previous button.
    const previousButton = carousel.querySelector(
        ".carousel-prev"
    );


    // Find this carousel's Next button.
    const nextButton = carousel.querySelector(
        ".carousel-next"
    );


    // -----------------------------------------------------
    // SAFETY CHECK
    // -----------------------------------------------------
    //
    // If there are no slides, there is nothing to control.
    //
    if (slides.length === 0) {

        return;

    }


    // Keep track of the currently displayed slide.
    let currentSlide = 0;



    /* -----------------------------------------------------
       SHOW A SPECIFIC SLIDE
    ----------------------------------------------------- */

    function showSlide(index) {


        // Go through every slide.
        slides.forEach((slide, slideIndex) => {


            // Only the selected slide gets "active".
            slide.classList.toggle(
                "active",
                slideIndex === index
            );

        });

    }



    /* -----------------------------------------------------
       PREVIOUS SLIDE
    ----------------------------------------------------- */

    function showPreviousSlide() {


        // Move backward one slide.
        currentSlide--;


        // If we move before the first slide,
        // jump to the last slide.
        if (currentSlide < 0) {

            currentSlide = slides.length - 1;

        }


        // Display the new slide.
        showSlide(currentSlide);

    }



    /* -----------------------------------------------------
       NEXT SLIDE
    ----------------------------------------------------- */

    function showNextSlide() {


        // Move forward one slide.
        currentSlide++;


        // If we move past the final slide,
        // return to the first slide.
        if (currentSlide >= slides.length) {

            currentSlide = 0;

        }


        // Display the new slide.
        showSlide(currentSlide);

    }



    /* -----------------------------------------------------
       PREVIOUS BUTTON
    ----------------------------------------------------- */

    if (previousButton) {

        previousButton.addEventListener(
            "click",
            showPreviousSlide
        );

    }



    /* -----------------------------------------------------
       NEXT BUTTON
    ----------------------------------------------------- */

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            showNextSlide
        );

    }



    // -----------------------------------------------------
    // INITIAL STATE
    // -----------------------------------------------------
    //
    // Always show the first picture when the page loads.
    //
    showSlide(currentSlide);

}



/* =========================================================
   5. START ALL CAROUSELS
   =========================================================
//
// querySelectorAll() finds EVERY carousel on the page.
//
// That means:
//
//     Before → gets its own controller
//     After  → gets its own controller
//
// This is what makes the two carousels independent.
// ========================================================= */

document
    .querySelectorAll(".gallery-carousel")
    .forEach((carousel) => {

        initializeCarousel(carousel);

    });



// =========================================================
// END OF SCRIPT
// =========================================================
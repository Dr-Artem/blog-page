// Moving string
const scrollers = document.querySelectorAll(".scroller");

// if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
addAnimation();
// }

function addAnimation() {
    scrollers.forEach((scroller) => {
        scroller.setAttribute("data-animated", true);

        const scrollerInner = scroller.querySelector(".scroller__inner");
        const scrollerContent = Array.from(scrollerInner.children);

        scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute("aria-hidden", true);
            scrollerInner.appendChild(duplicatedItem);
        });

        scrollerInner.addEventListener("mouseenter", () => (scrollerInner.style.animationPlayState = "paused"));
        scrollerInner.addEventListener("mouseleave", () => (scrollerInner.style.animationPlayState = "running"));
    });
}

// Button filter
const filterList = document.querySelector(".filter");
const filterButtons = filterList.querySelectorAll(".filter-btn");
const conferences = document.querySelectorAll(".blog-item");

let conferenceIndex = 0;

conferences.forEach((conference) => {
    conference.style.viewTransitionName = `conf-${++conferenceIndex}`;
});

filterButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        let confCategory = e.target.getAttribute("data-filter");

        if (!document.startViewTransition) {
            updateActiveButton(e.target);
            filterEvents(confCategory);
        }

        document.startViewTransition(() => {
            updateActiveButton(e.target);
            filterEvents(confCategory);
        });
    });
});

function updateActiveButton(newButton) {
    filterList.querySelector(".active").classList.remove("active");
    newButton.classList.add("active");
}

function filterEvents(filter) {
    conferences.forEach((conference) => {
        const eventCategory = conference.getAttribute("data-category");
        const categoriesArray = eventCategory.split(" ");

        if (categoriesArray.includes(filter) || filter === "all") {
            conference.removeAttribute("hidden");
        } else {
            conference.setAttribute("hidden", "");
        }
    });
}

// Accordeon
const titleWrappers = document.querySelectorAll(".blog-title-wrapper");

titleWrappers.forEach((title) => {
    title.addEventListener("click", ({ currentTarget }) => {
        const panel = currentTarget.nextElementSibling;

        if (title.classList.contains("open")) {
            title.classList.remove("open");
            panel.style.maxHeight = null;
        } else {
            const titleWithIsOpen = document.querySelectorAll(".open");
            titleWithIsOpen.forEach((titleWithIsOpen) => {
                titleWithIsOpen.classList.remove("open");
                titleWithIsOpen.nextElementSibling.style.maxHeight = null;
            });
            title.classList.add("open");
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
});

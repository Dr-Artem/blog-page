// Moving string
const scrollers = document.querySelectorAll(".scroller");

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
}

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
const blogItems = document.querySelectorAll(".blog-item");

let blogIndex = 0;

blogItems.forEach((blog) => {
    blog.style.viewTransitionName = `conf-${++blogIndex}`;
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
    blogItems.forEach((conference) => {
        const eventCategory = conference.getAttribute("data-category");
        const categoriesArray = eventCategory.split(" ");

        if (categoriesArray.includes(filter) || filter === "all") {
            conference.removeAttribute("hidden");
        } else {
            conference.setAttribute("hidden", "");
        }
    });
}

let previousButton = null;
// Додавання події кліку на кожну кнопку "read more"
blogItems.forEach(function (item) {
    const seeMoreButton = item.querySelector("button");

    seeMoreButton.addEventListener("click", function (event) {
        const isExpanded = item.getAttribute("data-expanded") === "true";

        if (!isExpanded) {
            blogItems.forEach((blog) => {
                blog.setAttribute("data-expanded", "false");
                blog.querySelector(".blog-read-more").textContent = "read more";
                item.classList.remove("close");
            });

            item.setAttribute("data-expanded", "true");
            item.setAttribute("data-prevoius", "true");
            item.classList.remove("close");
            seeMoreButton.textContent = "read less";

            if (previousButton && previousButton !== seeMoreButton) {
                const previousItem = previousButton.closest(".blog-item");
                previousItem.setAttribute("data-prevoius", "false");

                setTimeout(() => {
                    previousItem.removeAttribute("data-prevoius");
                }, 1100);
            }

            previousButton = seeMoreButton;
        } else {
            item.setAttribute("data-expanded", "false");
            // item.setAttribute("data-prevoius", "false");
            item.classList.add("close");
            seeMoreButton.textContent = "read more";
        }
    });
});

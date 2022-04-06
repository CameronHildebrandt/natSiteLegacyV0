const pastEventsCarousels = Array.from(document.querySelectorAll("#pastEventCards"));

function createCarousel(element) {
    const right_arrow = document.createElement('div');
    const left_arrow = document.createElement('div');

    right_arrow.id = "carouselRightArrow";
    left_arrow.id = "carouselLeftArrow";

    element.appendChild(right_arrow)
    element.appendChild(left_arrow)
}

function initializeCarousel(carousels) {
    console.log(carousels)
    if (!carousels.length) {
        return;
    } else {
        carousel = carousels.shift()
        createCarousel(carousel);
        initializeCarousel(carousels);
    }
}

function main() {
    initializeCarousel(pastEventsCarousels);
}

main();
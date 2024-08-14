function addImageCover(element) {
    const overlay = document.createElement('div');
    overlay.classList.add('img-cover'); // Optional: add a class for styling
    overlay.style.position = 'absolute';
    overlay.style.top = '-1px';
    overlay.style.left = '-1px';
    overlay.style.width = 'calc(100% + 2px)';
    overlay.style.height = 'calc(100% + 2px)';
    overlay.style.backgroundColor = 'black';
    overlay.style.opacity = '1'; // Adjust the opacity as needed
    element.appendChild(overlay);
}
function addNameplateCover(element) {
    const overlay = document.createElement('div');
    overlay.classList.add('np-cover'); // Optional: add a class for styling
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.left = '-10%';
    overlay.style.width = '110%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'black';
    overlay.style.opacity = '1'; // Adjust the opacity as needed
    overlay.style.overflow = 'visible';
    element.appendChild(overlay);
}
// Get all children of track and nameplate
const trackChildren = Array.from(track.children);
const nameplateChildren = Array.from(nameplate.children);
const allChildren = [...trackChildren, ...nameplateChildren];

// Apply black overlay to each child
trackChildren.forEach(child => {
    addImageCover(child);
});
nameplateChildren.forEach(child => {
    addNameplateCover(child);
});

// Example of using the array in the future
console.log(allChildren); // This array can be used for further manipulation or event handling

const timeline = gsap.timeline({ defaults: { duration: 1.5, ease: 'smooth' } });
timeline
    .from('.img-cover', { y: '0%', stagger: 0.11 }, 'group1')

    .from('.first:not(.np-cover), .last:not(.np-cover)', { y: '100%', delay: 0.3}, 'group1')
    .from('.np-cover', { y: '0%', height: '100%', delay: 0.3}, 'group1')

    .to('.img-cover', { y: '80vmin', height: '2px', stagger: 0.11 }, 'group1') // Grouping with a label

    .to('.first:not(.np-cover), .last:not(.np-cover)', { y: '0%', delay: 0.3}, 'group1')
    .to('.np-cover', { y: '30vmin', height: '0%', delay: 0.3}, 'group1')

;

const imageContainers = document.querySelectorAll('.image-container');

imageContainers.forEach(container => {
    var isDragging = true;
    var startX = 0;
    container.addEventListener('mousedown', e => {
        isDragging = false;
        startX = e.clientX; // Track initial mouse position
    });

    container.addEventListener('mousemove', e => {
        if (Math.abs(e.clientX - startX) > 5) { // Consider it dragging if the mouse moves more than 5px
            isDragging = true;
        }
    });

    container.addEventListener('mouseup', () => {
        if (!isDragging) {
            const url = container.getAttribute('data-url');
            if (url) {
                const transition_timeline = gsap.timeline({
                    defaults: { duration: 1.5, ease: 'smooth' },
                    onComplete: () => {
                        window.location.href = url;
                        container.querySelectorAll('.clicked')[0].classList.remove('clicked');
                    }
                });
                container.querySelectorAll('.img-cover')[0].classList.add('clicked');
                transition_timeline
                    .from('.img-cover:not(.clicked .img-cover)', { y: '80vmin', height: '2px', delay: 0}, 'group1') // Grouping with a label
                    .from('.img-cover.clicked', { y: '-1vmin', height: '2px', delay: 0}, 'group1')

                    .from('.first:not(.np-cover), .last:not(.np-cover)', { y: '0%', delay: 0.2}, 'group1')
                    .from('.np-cover', { y: '0vmin', height: '0%', delay: 0.2}, 'group1')

                    .to('.img-cover:not(.clicked .img-cover)', { y: '-1vmin', height: '82vmin', delay: 0}, 'group1')
                    .to('.img-cover.clicked', { y: '-1vmin', height: '82vmin', delay: 0}, 'group1')

                    .to('.first:not(.np-cover), .last:not(.np-cover)', { y: '-100%', delay: 0.2}, 'group1')
                    .to('.np-cover', { y: '0vmin', height: '100%', delay: 0.2}, 'group1')
            }
        }
        isDragging = false; // Reset dragging state
    });
});

function resetState() {
    timeline
    .from('.img-cover', { y: '0%', stagger: 0.11 }, 'group1')

    .from('.first:not(.np-cover), .last:not(.np-cover)', { y: '100%', delay: 0.3}, 'group1')
    .from('.np-cover', { y: '0%', height: '100%', delay: 0.3}, 'group1')

    .to('.img-cover', { y: '80vmin', height: '2px', stagger: 0.11 }, 'group1') // Grouping with a label

    .to('.first:not(.np-cover), .last:not(.np-cover)', { y: '0%', delay: 0.3}, 'group1')
    .to('.np-cover', { y: '30vmin', height: '0%', delay: 0.3}, 'group1');
}
window.addEventListener('unload', resetState);
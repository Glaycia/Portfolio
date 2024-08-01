function addImageCover(element) {
    const overlay = document.createElement('div');
    overlay.classList.add('img-cover'); // Optional: add a class for styling
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
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
    .from('.img-cover', { y: '0%', stagger: 0.09 }, 'group1')

    .from('.first:not(.np-cover), .last:not(.np-cover)', { y: '100%', delay: 0.2}, 'group1')
    .from('.np-cover', { y: '0%', height: '100%', delay: 0.2}, 'group1')

    .to('.img-cover', { y: '80vmin', height: '0%', stagger: 0.09 }, 'group1') // Grouping with a label

    .to('.first:not(.np-cover), .last:not(.np-cover)', { y: '0%', delay: 0.2}, 'group1')
    .to('.np-cover', { y: '30vmin', height: '0%', delay: 0.2}, 'group1')

;
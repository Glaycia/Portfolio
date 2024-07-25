document.addEventListener('DOMContentLoaded', () => {

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
                    window.location.href = url;
                }
            }
            isDragging = false; // Reset dragging state
        });
    });


    const track = document.getElementById("image-track");
    const nameplate = document.getElementById("nameplate");

    // Initial setup
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = "0";
    track.dataset.percentage = "0";

    const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

    const handleOnUp = () => {
        track.dataset.mouseDownAt = "0";  
        track.dataset.prevPercentage = track.dataset.percentage;
    }

    const handleOnMove = e => {
        if(track.dataset.mouseDownAt === "0") return;
        
        const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
        const maxDelta = window.innerWidth / 2;
        
        const percentage = (mouseDelta / maxDelta) * -100;
        const nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage;
        const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
        
        track.dataset.percentage = nextPercentage;
        
        // Apply the transformation directly to track
        track.animate({
            transform: `translate(${nextPercentage}%, -50%)`
        }, { duration: 1200, fill: "forwards" });
        nameplate.animate({
            transform: `translate(${0.5*track.offsetWidth*nextPercentage/100-0.04*window.innerHeight-nameplate.offsetWidth}px, -50%)`
        }, { duration: 1200, fill: "forwards" });
        
        for(const image of track.getElementsByClassName("image")) {
            image.animate({
            objectPosition: `${100 + nextPercentage}% center`
            }, { duration: 1200, fill: "forwards" });
        }
    }

    const handleOnResize = () => {
        var nextPercentage = track.dataset.percentage;

        track.style.transform = `translate(${nextPercentage}%, -50%)`;
        nameplate.style.transform = `translate(${0.5 * track.offsetWidth * nextPercentage / 100 - 0.04 * window.innerHeight - nameplate.offsetWidth}px, -50%)`;
        for (const image of track.getElementsByClassName("image")) {
            image.style.objectPosition = `${100 + nextPercentage}% center`;
        }
    }

    // Add event listeners
    window.addEventListener('mousedown', handleOnDown);
    window.addEventListener('touchstart', e => handleOnDown(e.touches[0]));

    window.addEventListener('mouseup', handleOnUp);
    window.addEventListener('touchend', e => handleOnUp(e.touches[0]));

    window.addEventListener('mousemove', handleOnMove);
    window.addEventListener('touchmove', e => handleOnMove(e.touches[0]));

    // window.addEventListener('resize', handleOnResize)
});

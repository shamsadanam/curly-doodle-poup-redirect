// var tl = gsap.timeline();

// tl.from("nav .logo , .main-menu a, .nav-right a, .nav-right button, nav .nav-right #feedbacCta, #mobileToggle", {
//     y: -100,
//     duration: 1,
//     delay: 0.5,
//     stagger: 0.1
// })

// tl.from(".hContent h1", {
//     x: -200,
//     duration: .3,
//     opacity: 0, 
//     stagger: 0.2,
// })

// tl.from(".animateHeading", {
//     y:50,
//     opacity: 0,
// })

// tl.from(".contentBox_front", {
//     x: 100,
//     opacity: 0,
// })

// tl.from(".contentBox_back", {
//     scale: 1, 
//     opacity: 0,
//     duration: 5,
//     rotate: -7,
// });

let data = [
    {
        'star' : 5,
        'count' : 10068
    }, 
    {
        'star' : 4,
        'count': 3356
    },
    {
        'star': 3,
        'count': 945
    }, 
    {
        'star': 2,
        'count': 550
    },
    {
        'star': 1,
        'count': 101
    }
]

let selectedStars = [];

let totalRatting = 0;
data.forEach(ratting => {
    totalRatting += ratting.count;
})

const starElements = document.querySelectorAll('.star_wrapper .start span');
const rattingCountWrapper = document.querySelector('.ratting-count-wrapper');

// Initial rendering of progress bars
data.forEach(ratting => {
    let ratting_progress = `
        <div class="ratting_progress_value">
            <p>${ratting.star} Star</p>
            <div class="progress">
                <div class="bar" style="width:${(ratting.count / totalRatting)*100}%"></div>
            </div>
        </div>
    `;
    rattingCountWrapper.innerHTML += ratting_progress;
});

starElements.forEach((star, index) => {
    star.addEventListener('click', () => {
        // Toggle the selection
        const selectedIndex = index;
        const isSelected = selectedStars.includes(selectedIndex);

        if (isSelected) {
            // Deselect the current star and all subsequent stars
            selectedStars = selectedStars.filter(selIndex => selIndex < selectedIndex);
        } else {
            // Select the current star and all previous stars
            selectedStars = Array.from({ length: selectedIndex + 1 }, (_, i) => i);
        }

        // Update the styles for all stars
        updateStarStyles(isSelected);

        // Update the counts based on the selected stars
        selectedStars.forEach(selectedIndex => {
            let selectedRatting = data.find(r => r.star === (5 - selectedIndex)); // Reverse index for your data
            selectedRatting.count += 1;
            console.log(`Rating ${selectedRatting.star}: Count updated to ${selectedRatting.count}`);
        });

        // Recalculate totalRatting
        totalRatting += selectedStars.length;

        // Update the progress bars
        updateProgressBars();
    });

    star.addEventListener('mouseenter', () => {
        highlightStars(index);
    });

    star.addEventListener('mouseleave', () => {
        updateStarStyles();
    });
});

function updateStarStyles(isSelected = false) {
    starElements.forEach((s, i) => {
        const isSelectedStar = selectedStars.includes(i);
        s.style.color = isSelectedStar ? 'gold' : isSelected ? '#808080' : 'gray';
    });
}

function highlightStars(index) {
    starElements.forEach((s, i) => {
        s.style.color = i <= index ? 'gold' : '#808080';
    });
}

function updateProgressBars() {
    rattingCountWrapper.innerHTML = '';
    data.forEach(ratting => {
        let ratting_progress = `
            <div class="ratting_progress_value">
                <p>${ratting.star} Star</p>
                <div class="progress">
                    <div class="bar" style="width:${(ratting.count / totalRatting)*100}%"></div>
                </div>
            </div>
        `;
        rattingCountWrapper.innerHTML += ratting_progress;
    });
}


var tl = gsap.timeline();

tl.from("nav .logo , .main-menu a, .nav-right a, .nav-right button, nav .nav-right #feedbacCta, #mobileToggle", {
    y: -100,
    duration: 1,
    delay: 0.5,
    stagger: 0.1
})

tl.from(".hContent h1", {
    x: -200,
    duration: .3,
    opacity: 0, 
    stagger: 0.2,
})

tl.from(".animateHeading", {
    y:50,
    opacity: 0,
})

tl.from(".contentBox_front", {
    x: 100,
    opacity: 0,
})

tl.from(".contentBox_back", {
    scale: 1, 
    opacity: 0,
    duration: 5,
    rotate: -7,
});


let data = [
    {
        'star': 5,
        'count': 1001
    },
    {
        'star': 4,
        'count': 80
    },
    {
        'star': 3,
        'count': 33
    },
    {
        'star': 2,
        'count': 13
    },
    {
        'star': 1,
        'count': 0
    }
]

let selectedStars = [];

let totalRatting = data.reduce((total, ratting) => total + ratting.count, 0);

const starElements = document.querySelectorAll('.star_wrapper .start span');
const rattingCountWrapper = document.querySelector('.ratting-count-wrapper');

// Initial rendering of progress bars
data.forEach(ratting => {
    let ratting_progress = `
        <div class="ratting_progress_value">
            <p>${ratting.star} Star</p>
            <div class="progress">
                <div class="bar" style="width:${(ratting.count / totalRatting) * 100}%"></div>
            </div>
        </div>
    `;
    rattingCountWrapper.innerHTML += ratting_progress;
});

starElements.forEach((star, index) => {
    star.addEventListener('click', () => {
        const selectedIndex = index;
        const isSelected = selectedStars.includes(selectedIndex);

        if (isSelected) {
            selectedStars = selectedStars.filter(selIndex => selIndex < selectedIndex);
        } else {
            selectedStars = Array.from({ length: selectedIndex + 1 }, (_, i) => i);
        }

        updateStarStyles(isSelected);
        updateProgressBars();

        // Check the selected rating and take appropriate action
        const selectedRating = 5 - selectedIndex; // Reverse index for your data

        if (selectedRating >= 1 && selectedRating <= 3) {
            openFeedbackForm();
        } else if (selectedRating >= 4 && selectedRating <= 5) {
            redirectToAnotherPage();
        }
    });

    star.addEventListener('mouseenter', () => {
        highlightStars(index);
    });

    star.addEventListener('mouseleave', () => {
        updateStarStyles();
    });
});

function openFeedbackForm() {
    const firstName = window.prompt('Enter your first name:');
    const lastName = window.prompt('Enter your last name:');
    const feedback = window.prompt('Provide your feedback:');
    console.log(`Feedback submitted: ${firstName} ${lastName}, Feedback: ${feedback}`);
}

function redirectToAnotherPage() {
    // Redirect only if there are 4 or 5 stars selected
    const selectedRating = selectedStars.length > 0 ? 5 - selectedStars[selectedStars.length - 1] : 0;

    if (selectedRating >= 4 && selectedRating <= 5) {
        window.location.href = 'https://facebook.com'; // Replace with your desired URL
    }
}

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
                    <div class="bar" style="width:${(ratting.count / totalRatting) * 100}%"></div>
                </div>
            </div>
        `;
        rattingCountWrapper.innerHTML += ratting_progress;
    });
}



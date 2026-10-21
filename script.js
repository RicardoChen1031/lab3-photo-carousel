// Both stories use the same three photographs in different orders.
var stories = {
    home: [
        {
            image: "images/puppy-street.jpg",
            alt: "A puppy resting alone on a street",
            chapter: "BEGINNING",
            title: "Waiting Alone",
            text: "A small puppy waits quietly on the street, unsure where it will sleep tonight."
        },
        {
            image: "images/helping-hand.jpg",
            alt: "A person gently reaching toward a stray dog",
            chapter: "MIDDLE",
            title: "A Kind Stranger",
            text: "Someone stops, reaches out a gentle hand, and gives the frightened puppy a chance."
        },
        {
            image: "images/dog-home.jpg",
            alt: "A dog resting safely on a couch at home",
            chapter: "END",
            title: "Safe at Home",
            text: "That evening, the puppy rests on a soft couch. The street is now only a memory."
        }
    ],
    goodbye: [
        {
            image: "images/dog-home.jpg",
            alt: "A dog resting safely on a couch at home",
            chapter: "BEGINNING",
            title: "A Quiet Morning",
            text: "The dog wakes in the only home it has ever known, not realizing this day will be different."
        },
        {
            image: "images/helping-hand.jpg",
            alt: "A person gently reaching toward a dog",
            chapter: "MIDDLE",
            title: "One Last Goodbye",
            text: "A familiar hand reaches down for one final goodbye before the dog must leave."
        },
        {
            image: "images/puppy-street.jpg",
            alt: "A puppy resting alone on a street",
            chapter: "END",
            title: "Alone Again",
            text: "By nightfall, the dog is alone on the street, waiting for the next part of its story."
        }
    ]
};

var currentStory = "home";
var currentSlide = 0;

var storyImage = document.getElementById("storyImage");
var chapter = document.getElementById("chapter");
var storyName = document.getElementById("storyName");
var counter = document.getElementById("counter");
var storyTitle = document.getElementById("storyTitle");
var storyText = document.getElementById("storyText");
var progressBar = document.getElementById("progressBar");
var photoSide = document.getElementById("photoSide");
var dots = document.querySelectorAll(".dot");

function showSlide() {
    var slide = stories[currentStory][currentSlide];

    storyImage.src = slide.image;
    storyImage.alt = slide.alt;
    chapter.textContent = slide.chapter;
    storyTitle.textContent = slide.title;
    storyText.textContent = slide.text;
    counter.textContent = "0" + (currentSlide + 1) + " / 03";
    progressBar.style.width = ((currentSlide + 1) * 33.33) + "%";

    for (var i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }

    dots[currentSlide].classList.add("active");

    photoSide.classList.remove("animate");
    setTimeout(function () {
        photoSide.classList.add("animate");
    }, 10);
}

function nextSlide() {
    currentSlide = currentSlide + 1;

    if (currentSlide > 2) {
        currentSlide = 0;
    }

    showSlide();
}

function previousSlide() {
    currentSlide = currentSlide - 1;

    if (currentSlide < 0) {
        currentSlide = 2;
    }

    showSlide();
}

function changeStory(storyChoice) {
    currentStory = storyChoice;
    currentSlide = 0;

    document.getElementById("homeButton").classList.remove("active");
    document.getElementById("goodbyeButton").classList.remove("active");

    if (currentStory === "home") {
        document.getElementById("homeButton").classList.add("active");
        storyName.textContent = "STORY A · FINDING A HOME";
    } else {
        document.getElementById("goodbyeButton").classList.add("active");
        storyName.textContent = "STORY B · A DIFFICULT GOODBYE";
    }

    showSlide();
}

document.getElementById("nextButton").addEventListener("click", nextSlide);
document.getElementById("photoButton").addEventListener("click", nextSlide);
document.getElementById("previousButton").addEventListener("click", previousSlide);

document.getElementById("homeButton").addEventListener("click", function () {
    changeStory("home");
});

document.getElementById("goodbyeButton").addEventListener("click", function () {
    changeStory("goodbye");
});

for (var i = 0; i < dots.length; i++) {
    dots[i].addEventListener("click", function () {
        currentSlide = Number(this.getAttribute("data-slide"));
        showSlide();
    });
}

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") {
        nextSlide();
    }

    if (event.key === "ArrowLeft") {
        previousSlide();
    }
});

showSlide();

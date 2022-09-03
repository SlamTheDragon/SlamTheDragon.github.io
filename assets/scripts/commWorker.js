//Profile Commission Loader
window.onload = function() {

    //FIXME add json parser method here
    var parsedValue = 1
    var minComm = 3
    var maxComm = 4
    var infStatus

    let commStatus = parsedValue
    Boolean(commStatus)

    if (commStatus) {
        var parsedTrue = "available!"
        infStatus = parsedTrue
    } else {
        var parsedFalse = "closed"
        infStatus = parsedFalse
    }

    document.getElementById('availabilityStatus').innerHTML = infStatus;
    document.getElementById('minComm').innerHTML = minComm;
    document.getElementById('maxComm').innerHTML = maxComm;

}


//Tab Switcher

function switchTabSketch(evt, Card) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabContent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(Card).style.display = "flex";
    evt.currentTarget.className += " active";
}


//Image Switcher
function switchImage(evt, Card) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("sectionContent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("sectionLinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(Card).style.display = "block";
    evt.currentTarget.className += " active";
}

function switchImage2(evt, Card) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("sectionContent2");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("sectionLinks2");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(Card).style.display = "block";
    evt.currentTarget.className += " active";
}

function switchImage3(evt, Card) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("sectionContent3");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("sectionLinks3");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(Card).style.display = "block";
    evt.currentTarget.className += " active";
}

function switchImage4(evt, Card) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("sectionContent4");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("sectionLinks4");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(Card).style.display = "block";
    evt.currentTarget.className += " active";
}

// image auto slideshow

const buttons = document.querySelectorAll("[data-carousel-button]")

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const offset = button.dataset.carouselButton === "next" ? 1 : -1
        const slides = button
            .closest("[data-carousel]")
            .querySelector("[data-slides]")

        const activeSlide = slides.querySelector("[data-active]")
        let newIndex = [...slides.children].indexOf(activeSlide) + offset
        if (newIndex < 0) newIndex = slides.children.length - 1
        if (newIndex >= slides.children.length) newIndex = 0

        slides.children[newIndex].dataset.active = true
        delete activeSlide.dataset.active
    })
})

document.getElementById("defaultOpen").click();
document.getElementById("defaultOpen2").click();
document.getElementById("defaultOpen3").click();
document.getElementById("defaultOpen4").click();
document.getElementById("defaultOpen5").click();
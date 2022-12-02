// I like functions so much
// I'm way into OOP lmao

// window.onload variables
// parsedval 0 = false
let parsedValue = 0
let minComm = 0
let maxComm = 0
let infStatus
let parsedTrue, parsedFalse

// TODO add json parser method here

let commStatus = parsedValue
Boolean(commStatus)


// function variables
let scroller = 0
let i, tabcontent, tabButtons;
let panelBool = Boolean(true);
const focus = document.getElementById("commissionSheet");
const panel1 = document.getElementById("commSelectionPanel");
const panelBtnText = document.getElementsByClassName('panelBtnText');
const cardOpen = document.getElementById("profileContactA");
const cardClose = document.getElementById("profileContactB");
const cardLoading = document.getElementById("profileContact");
const headshotCardA = document.getElementsByClassName("portraitNoBackground");
const headshotCardB = document.getElementsByClassName("portraitBackground");
const containerSelectionBar = document.getElementById("contentSelectionBar");
const backgroundContentBtnA = document.getElementById("backgroundBtnA");
const backgroundContentBtnB = document.getElementById("backgroundBtnB");

const boxesA = Array.from(
    document.getElementsByClassName('portraitNoBackground')
);
const boxesB = Array.from(
    document.getElementsByClassName('portraitBackground')
);

// checks if device is tablet
const userAgent = navigator.userAgent.toLowerCase();
const isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent);
console.log(userAgent);
console.log(isTablet);


// ###      FUNCTIONS       ###
// Profile Commission Loader

window.onload = function () {

    if (commStatus) {
        parsedTrue = "open!"
        infStatus = parsedTrue
        cardOpen.style.display = "flex";
        cardClose.style.display = "none";
        cardLoading.style.display = "none";
    } else {
        parsedFalse = "closed"
        infStatus = parsedFalse
        cardOpen.style.display = "none";
        cardClose.style.display = "flex";
        cardLoading.style.display = "none";
    }

    document.getElementById('commissionStatusContainer').innerHTML = infStatus;
    // document.getElementById('minComm').innerHTML = minComm;
    // document.getElementById('maxComm').innerHTML = maxComm;
}


// Selection Panel Width Toggle

function panelToggle() {
    if (panelBool) {
        panelBool = Boolean(false)
        panel1.style.width = "82px";
        
        for (let i = 0; i < panelBtnText.length; i += 1) {
            panelBtnText[i].style.display = 'none';
        }
    } else {
        panelBool = Boolean(true)
        panel1.style.width = "250px";

        for (let i = 0; i < panelBtnText.length; i += 1) {
            panelBtnText[i].style.display = 'flex';
        }   
    }
}


// focus scroll

function focusScroll(jump) {
    window.location.href = jump

    if (jump === "#commissionSheet") {
        document.getElementById("scrollOpen").click();
    }
}


// scrolling refocus event

window.addEventListener('scroll', () => {
    scroller = document.documentElement.scrollTop
});

function check() { 
    if (scroller <= 500) {
        return;
    }
    if (scroller <= 1000) {
        focus.scrollIntoView();
    }
}

function focusWorker() {
    focus.scrollIntoView();
}


// tab selection

function mainTabClicker(evt, tabName) {
    
    // get and assign divs called mainTabContent
    tabcontent = document.getElementsByClassName("mainTabContent");

    for (i = 0; i < tabcontent.length; i++)
    {
        // disable shown contents
        tabcontent[i].style.display = "none";
    }


    // get and change button style, otherwise replace
    tabButtons = document.getElementsByClassName("tabButtons");

    for (i = 0; i < tabButtons.length; i++)
    {
        tabButtons[i].className = tabButtons[i].className.replace(" active", "");
    }

    // assign and show tabs by parameter
    document.getElementById(tabName).style.display = "flex";
    evt.currentTarget.className += " active";

}


// btn bar selection

function barBtnClicker(evt, targetCard, classElementA, classElementB) {

    // get and assign divs called mainTabContent
    // basically clears all existing tabs
    const elementA = document.getElementsByClassName(classElementA);
    forAssignElementA(elementA);

    // get and change button style, otherwise replace
    
    const elementB = document.getElementsByClassName(classElementB);
    forAssignElementB(elementB)

    // assign and show tabs by parameter
    document.getElementById(targetCard).style.display = "flex";
    evt.currentTarget.className += " active";

}

function forAssignElementA(elementA) {
    for (i = 0; i < elementA.length; i++) {
        // disable shown contents
        elementA[i].style.display = "none";
    }
}

function forAssignElementB(elementB) {
    for (i = 0; i < elementB.length; i++) {
        // replace button style
        elementB[i].className = elementB[i].className.replace(" active", "");
    }
}


// commission content selection

function contentSelectionTab (buttonSet) {
    
    // show button bar
    containerSelectionBar.style.display = "flex"
    
    switch (buttonSet) {
        case "buttonSetPortrait":
            document.getElementById(buttonSet).style.display = "flex"
            backgroundSelector("B")
            document.getElementById("buttonSetIllustration").style.display = "none"
            break;
        
        case "buttonSetIllustration":
            document.getElementById(buttonSet).style.display = "flex"
            document.getElementById("buttonSetPortrait").style.display = "none"
            break;

        default:
            contentSelectionTabClear()
            break;
    }
}


// clear button bar
function contentSelectionTabClear() {
    const container = document.getElementById("contentSelectionBar");
    container.style.display = "none"
}

// please build const for profiles
function backgroundSelector(buttonItem) {
    switch (buttonItem) {
        case "A":
            backgroundSwitcher("A");
            backgroundContentBtnB.style.display = "flex"
            backgroundContentBtnA.style.display = "none"
            break;
        case "B":
            backgroundSwitcher("B");
            backgroundContentBtnA.style.display = "flex"
            backgroundContentBtnB.style.display = "none"
            break;
    
        default:
            hideBackgroundSelectors()
            break;
    }
}

function backgroundSwitcher(switchID) {

    boxesA.forEach(box => {
        box.style.display = 'none';
    });
    boxesB.forEach(box => {
        box.style.display = 'none';
    });

    switch (switchID) {
        case "A":
            boxesB.forEach(box => {
                box.style.display = 'flex';
            });
            boxesA.forEach(box => {
                box.style.display = 'none';
            });
            break;
        case "B":
            boxesB.forEach(box => {
                box.style.display = 'none';
            });
            boxesA.forEach(box => {
                box.style.display = 'flex';
            });
            break;
        default:
            break;
    }
}

function hideBackgroundSelectors() {
    backgroundContentBtnA.style.display = "none"
    backgroundContentBtnB.style.display = "none"
}

// ### finalize DOM load ###

if (isTablet) {
    panelToggle();
}

hideBackgroundSelectors();

// finalize default toggle tabs
document.getElementById("defaultOpen").click();
// document.getElementById("destructableDebug").click()
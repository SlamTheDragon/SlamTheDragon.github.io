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

document.getElementById("defaultOpen").click();
document.getElementById("defaultOpen2").click();
document.getElementById("defaultOpen3").click();
document.getElementById("defaultOpen4").click();
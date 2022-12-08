let root = document.querySelector(':root');

// detect device theme here

// this sets the theme if the user changed to dark the last time
if (localStorage.getItem("theme") == "dark") root.id = "dark";

// event for theme change

function themeChanger() {
    root.id = root.id == "dark" ? null : "dark";
    localStorage.setItem("theme", root.id);
}

// destroy element button

function destroyElement(destructable) {
    const destroyObject = document.getElementById(destructable);
    destroyObject.className += " active";
    setTimeout(function () {
        destroyObject.remove();
    }, 299);
}

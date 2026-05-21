function openDrawer() {
    document.getElementById("drawer").classList.add("open");
    document.getElementById("overlay").classList.add("show");
}

function closeDrawer() {
    document.getElementById("drawer").classList.remove("open");
    document.getElementById("overlay").classList.remove("show");
}
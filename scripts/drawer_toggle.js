export function drawer_toggle() {

const drawer_button = document.getElementById("drawer_button");
const overlay = document.getElementById("overlay");

function openDrawer() {
    document.getElementById("drawer").classList.add("open");
    document.getElementById("overlay").classList.add("show");
}

function closeDrawer() {
    document.getElementById("drawer").classList.remove("open");
    document.getElementById("overlay").classList.remove("show");
}


drawer_button.addEventListener("click", openDrawer);
overlay.addEventListener("click", closeDrawer);


}
export function drawer_toggle() {

const drawer_button = document.getElementById("drawer_button");
const overlay = document.getElementById("overlay");
const drawer_close_button = document.getElementById("drawer_close_button");
const spielplanDiscover = document.getElementById("spielplanDiscover");

function openDrawer() {
    document.getElementById("drawer").classList.add("open"); 
    document.getElementById("overlay").classList.add("show");
}

function closeDrawer() {
    document.getElementById("drawer").classList.remove("open");
    document.getElementById("overlay").classList.remove("show");
}

function navigate(x) {
    window.location.href = x;
}

function activeMenuSet(x) {
    localStorage.setItem("activeMenu", x);
}

const drawer = document.getElementById("drawer");
const menus = drawer.querySelectorAll("a");
const headerActiveMenuText = document.getElementById("activeMenuText");

menus.forEach(element => {
    const attribute = element.getAttribute("data-menu");
    if(attribute == localStorage.getItem("activeMenu")) {element.classList.add("active"); headerActiveMenuText.innerText = attribute;}
    else if (localStorage.getItem("activeMenu") == null && attribute == "home") element.classList.add("active"); 
    else element.classList.remove("active");
    element.addEventListener("click", () => activeMenuSet(attribute));
});

drawer_button.addEventListener("click", openDrawer);
overlay.addEventListener("click", closeDrawer);
drawer_close_button.addEventListener("click", closeDrawer);
//spielplanDiscover.addEventListener("click", () => navigate("/Spielplan.html"));

}
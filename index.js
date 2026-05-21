import { drawer_toggle } from "./scripts/drawer_toggle.js";

document.addEventListener("DOMContentLoaded", async () => {

    const res = await fetch("./header.html");
    const html = await res.text();

    document.getElementById("header").innerHTML = html;

    lucide.createIcons();

    drawer_toggle();
});
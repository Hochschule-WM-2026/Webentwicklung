//Ist für Light- und DarkMode

function setTheme(x) {
    document.documentElement.dataset.theme =
    x.matches ? "dark" : "light";
}
const media = window.matchMedia("(prefers-color-scheme: dark)");
setTheme(media);
media.addEventListener("change", setTheme);
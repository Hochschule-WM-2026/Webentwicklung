function initDrawer() {
  const menueKnopf = document.getElementById("menueKnopf");
  const schliessenKnopf = document.getElementById("schliessenKnopf");
  const seitenleiste = document.getElementById("seitenleiste");
  const hintergrund = document.getElementById("seitenleisteHintergrund");

  if (!menueKnopf || !schliessenKnopf || !seitenleiste || !hintergrund) {
    console.error("Drawer elements not found");
    return;
  }

  menueKnopf.addEventListener("click", () => {
    seitenleiste.classList.add("offen");
    hintergrund.classList.add("offen");
  });

  schliessenKnopf.addEventListener("click", () => {
    seitenleiste.classList.remove("offen");
    hintergrund.classList.remove("offen");
  });

  hintergrund.addEventListener("click", () => {
    seitenleiste.classList.remove("offen");
    hintergrund.classList.remove("offen");
  });
}
const btn = document.getElementById("start_quiz");
const container = document.getElementById("quiz_body");

async function verschwenden(){
        container.classList.add("start");
        const res = await fetch("/scripts/test.html");
        container.innerHTML = await res.text();
        let sec = 0;
        const loader = document.getElementById("load");
        setInterval(() => {
                sec++;
                loader.style.width = (sec/10) + "%";
                if(sec == 1000)  {loader.style.width = "0"; sec = 0;}
        }, 20)
}
btn.addEventListener("click",verschwenden);

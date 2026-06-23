// Deklaration von Variablen
const btn_start = document.getElementById("start_quiz");
const body = document.getElementById("quiz_body");

const questions = [
  { 
    frage:"Wer ist Gastgeber der WM 2026?",
    antwort:["USA,Mexico und Canada","Kamerun","Deutschland","Japan"],
    correct: 0
  },
  {
    frage:"Wer ist der stärkste Fussballspieler der Welt?",
    antwort:["CR7","Messi","Mbappe","Lamine Yamal"],
    correct: 2   
  },
  {
    frage: "Wie viele Spieler hat eine Fußballmannschaft auf dem Feld?",
    antwort: ["9", "10", "11", "12"],
    correct: 2
  },
  {
    frage: "Welches Land hat die meisten WM-Titel gewonnen?",
    antwort: ["Deutschland", "Brasilien", "Argentinien", "Frankreich"],
    correct: 1
  },
  {
    frage: "Wie lange dauert ein reguläres Fußballspiel?",
    antwort: ["60 Minuten", "90 Minuten", "80 Minuten", "100 Minuten"],
    correct: 1
  },
  {
    frage: "Wie nennt man das entscheidende Spiel einer WM?",
    antwort: ["Halbfinale", "Achtelfinale", "Finale", "Vorrunde"],
    correct: 2
  },
  {
    frage: "Welcher Spieler wird oft 'La Pulga' genannt?",
    antwort: ["Cristiano Ronaldo", "Lionel Messi", "Neymar", "Luka Modrić"],
    correct: 1
  },
  {
    frage: "Wie heißt der wichtigste internationale Fußballverband?",
    antwort: ["UEFA", "FIFA", "DFB", "CAF"],
    correct: 1
  },
  {
    frage: "Welches Land war Gastgeber der WM 2014?",
    antwort: ["Brasilien", "Deutschland", "Südafrika", "Russland"],
    correct: 0
  },
  {
    frage: "Wie viele Gruppen gibt es normalerweise bei einer WM?",
    antwort: ["4", "6", "8", "10"],
    correct: 2
  }
];

let index = 0;
let score = 0;
let timer = null;

btn_start.addEventListener("click", () => {
  body.classList.add("start");
  body.innerHTML = `
    <div id="frage"></div>
    <div id="slider"><div id="load"></div></div>
    <div id="antworten">
    
    </div>
  `;
  showQuestion();
});

function showQuestion() {
  if (index >= questions.length) {
    document.getElementById("quiz_body").innerHTML = `
      <h2>Fertig!</h2>
      <p>Du hast ${score} von ${questions.length} richtig.</p>
    `;
    return;
  }

  const q = questions[index];
  document.getElementById("frage").textContent = q.frage; // Frage Lücke beffülen

  const antwortenDiv = document.getElementById("antworten");
  antwortenDiv.innerHTML = "";  // vershiedene Antworten erstmal entleeren.

  const ld = document.getElementById("load");
  let yx = 0;
  ld.style.width = "0%";

  if (timer !== null) {
    clearInterval(timer);
  }

  timer = setInterval(() => {
    yx++;
    ld.style.width = (yx / 10) + "%";
    if (yx >= 1000) {
      clearInterval(timer);
      index++;
      showQuestion();
    }
  }, 10);

  q.antwort.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.className = "button1";
    btn.textContent = text;

    btn.addEventListener("click", () => {
      checkAnswer(i, btn);
    });

    antwortenDiv.appendChild(btn);
  });
}

function checkAnswer(i, btn) {
  if (timer !== null) {
    clearInterval(timer);
  }

  if (i === questions[index].correct) {
    btn.style.background = "green";
    score++;
    
  } else {
    btn.style.background = "red";
     
  }

  setTimeout(() => {
    index++;
    showQuestion();
  }, 400);
} 

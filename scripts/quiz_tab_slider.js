
const btn_start = document.getElementById("start_quiz");
const body = document.getElementById("quiz_body");
const antwortenDiv = document.getElementById("antworten");
btn_start.addEventListener("click" ,() =>{
       body.classList.add("start");
       body.innerHTML = `
       <div id="frage"></div>
       <div id="slider">
       <div id="load"></div>
          </div>
       <div id="antworten"></div> 
       `
       showQuestion(); // dann die Frage anzeigen.
})


const questions = [
       { 
        frage:"Wer ist Gastgeber der WM 2026?",
        antwort:["USA,Mexico und Canada","Kamerun","Deutschland","Japan"], // antwort ist auch eine Tabelle mit mehrere Elemeten (bzw mögliche Antworten)
        correct: 0
        },
       {
        frage:"Wer ist der stärkste Fussballspieler der Welt?",
        antwort:["CR7","Messi","Mbappe","Lamine Yamal"],
        correct:2
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
  let index = 0;  // um die verschieden Frage ein Index zu geben
  let correctAnswers = 0;  // Zähler für richtige Antworten
  let timer;  // Timer Variable
  
  function showQuestion(){
      // Quiz beenden wenn alle Fragen gestellt wurden
      if (index >= questions.length) {
        showResults();
        return;
      }
      
      let q = questions[index];
      document.getElementById("frage").textContent = q.frage;
      
       const antwortenDiv = document.getElementById("antworten");
        antwortenDiv.innerHTML = "";
       q.antwort.forEach((text, i) => { // für alle Elemente der Tabelle antwort. speichert als text und index.
       const btn = document.createElement("button");  // erschaffen ein Button
       btn.className = "button1";   
       btn.textContent = text;

       btn.addEventListener("click", () => {
        checkAnswer(i, btn);
       });
        antwortenDiv.appendChild(btn);  // u btn in appendChild hinzufügen
       });
       let ld = document.getElementById("load");
       let yx = 0;
       clearInterval(timer);  // Alten Timer löschen falls noch aktiv
       timer = setInterval(()=>{
       yx++;
       ld.style.width = (yx/10) +"%";   
       if (yx >= 1000) {
        clearInterval(timer);
        index++;
        showQuestion();
       
       }
       },10);
}

       function checkAnswer(i){
         if (i === questions[index].correct) {
         btn.style.background="green";
        a++;
         } else {
        console.log("Mauvaise réponse");
         }
        
        index++;
        showQuestion();
 
  }

 
       
      




  // ich stelle eine Tabelle von Objekten(bzw Fragen) her

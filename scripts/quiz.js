const quizData = [
  {
    question: "In welchen drei Ländern findet die WM 2026 statt?",
    answers: ["USA, Mexiko, Kanada", "Brasilien, Argentinien, Chile", "Spanien, Portugal, Marokko", "Deutschland, Frankreich, Italien"],
    correct: 0
  },
  {
    question: "Wie viele Teams nehmen zum ersten Mal an der WM 2026 teil?",
    answers: ["32 Teams", "48 Teams", "64 Teams", "16 Teams"],
    correct: 1
  },
  {
    question: "Wer war Weltmeister im Jahr 2022?",
    answers: ["Frankreich", "Brasilien", "Argentinien", "Kroatien"],
    correct: 2
  },
  {
    question: "Welches Land hat historisch die meisten WM-Titel gewonnen?",
    answers: ["Deutschland", "Italien", "Argentinien", "Brasilien"],
    correct: 3
  },
  {
    question: "Wo findet das Finale der Weltmeisterschaft 2026 statt?",
    answers: ["Los Angeles", "New York (New Jersey)", "Mexiko-Stadt", "Toronto"],
    correct: 1
  }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timerInterval;
const timeLimit = 15;

const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const resultScreen = document.getElementById("resultScreen");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const questionCounter = document.getElementById("questionCounter");
const timerText = document.getElementById("timerText");
const timerBar = document.getElementById("timerBar");
const questionText = document.getElementById("questionText");
const answersGrid = document.getElementById("answersGrid");

const finalScore = document.getElementById("finalScore");
const resultFeedback = document.getElementById("resultFeedback");

startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", startQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  startScreen.classList.add("versteckt");
  resultScreen.classList.add("versteckt");
  gameScreen.classList.remove("versteckt");
  showQuestion();
}

function showQuestion() {
  clearInterval(timerInterval);
  timeLeft = timeLimit;
  timerText.textContent = `${timeLeft}s`;
  timerBar.style.width = "100%";

  const currentQuestion = quizData[currentQuestionIndex];
  questionCounter.textContent = `Frage ${currentQuestionIndex + 1} von ${quizData.length}`;
  questionText.textContent = currentQuestion.question;

  answersGrid.innerHTML = "";
  currentQuestion.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "antwortKnopf";
    button.textContent = answer;
    button.addEventListener("click", () => selectAnswer(index));
    answersGrid.appendChild(button);
  });

  startTimer();
}

function startTimer() {
  const step = 0.1;
  let elapsed = 0;
  
  timerInterval = setInterval(() => {
    elapsed += step;
    timeLeft = timeLimit - elapsed;
    
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerText.textContent = "0s";
      timerBar.style.width = "0%";
      selectAnswer(-1);
    } else {
      timerText.textContent = `${Math.ceil(timeLeft)}s`;
      const percentage = (timeLeft / timeLimit) * 100;
      timerBar.style.width = `${percentage}%`;
    }
  }, step * 1000);
}

function selectAnswer(selectedIndex) {
  clearInterval(timerInterval);
  const currentQuestion = quizData[currentQuestionIndex];
  const buttons = answersGrid.querySelectorAll(".antwortKnopf");

  buttons.forEach(btn => btn.disabled = true);

  if (selectedIndex === currentQuestion.correct) {
    buttons[selectedIndex].classList.add("richtig");
    score++;
  } else {
    if (selectedIndex !== -1) {
      buttons[selectedIndex].classList.add("falsch");
    }
    buttons[currentQuestion.correct].classList.add("richtig");
  }

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1500);
}

function showResults() {
  gameScreen.classList.add("versteckt");
  resultScreen.classList.remove("versteckt");
  
  finalScore.textContent = `${score} / ${quizData.length}`;
  
  if (score === quizData.length) {
    resultFeedback.textContent = "Perfekt! Du bist ein echter WM-Experte! 🏆";
  } else if (score >= quizData.length / 2) {
    resultFeedback.textContent = "Gute Leistung! Da ist aber noch Luft nach oben. ⚽";
  } else {
    resultFeedback.textContent = "Das geht besser! Schau dir am besten nochmal den Spielplan an. 📋";
  }
}

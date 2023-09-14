"use scrict";
const quizText = document.getElementById("main");
const showScoreBtn = document.querySelector(".show-score-btn");
const startQuizBtn = document.querySelector(".start-quiz-btn");
const startOverBtn = document.querySelector(".start-over-btn");
const answerBtns = document.querySelector(".answer-btns");
const time = document.querySelector(".time");
const displayScores = document.querySelector(".scores");
const submitUsername = document.querySelector(".submit-name");
const nameInput = document.querySelector(".name-input");

// Variables
let score = 0;
let counter = 0;
let display;
let timer = 60;

// Questions array with question objects for quiz
const quizQuestions = [
  {
    question: "In what year was the Nintendo 64 officially released?",
    options: ["1996", "1997", "2000", "1995"],
    answer: "1996",
  },
  {
    question:
      "What is the most popular best-selling Nintendo exclusive game of all time?",
    options: [
      "Smash Bros Brawl",
      "Mario Party",
      "Mario Kart 8 Deluxe",
      "Kirby",
    ],
    answer: "Mario Kart 8 Deluxe",
  },
  {
    question:
      "What is the name of the princess that Mario is always trying to save in the Super Mario series?",
    options: ["Princess Peach", "Diasy", "Yoshi", "Princess Ariel"],
    answer: "Princess Peach",
  },
  {
    question: "Who is the titular princess of The Legend of Zelda?",
    options: [
      "Princess Peach",
      "Princess Zelda",
      "Princess Daisy",
      "Pricess Kora",
    ],
    answer: "Princess Zelda",
  },
  {
    question:
      "What was the first console video game that allowed the game to be saved?",
    options: [
      "The Legend of Zelda",
      "Super Mario World",
      "Animal Crossing",
      "Pokemon",
    ],
    answer: "Super Mario World",
  },
  {
    question:
      "What is the name of the fictional city in which the Animal Crossing series takes place?",
    options: ["New Horizons", "Brawl", "Ambiio Festival", "Wild World"],
    answer: "New Horizons",
  },
  {
    question:
      "Which classic Nintendo game involves a plumber named Mario who must save a princess from a giant turtle named Bowser?",
    options: [
      "Twilight Princess",
      "Super Smash Bros",
      "Game and Watch",
      "Super Mario Bros.",
    ],
    answer: "Super Mario Bros.",
  },
  {
    question:
      "What is the name of the villainous team that tries to steal Pokémon in the game series?",
    options: ["Team Rocket", "Team Plasma", "Team Magma", "Team Aqua"],
    answer: "Team Rocket",
  },
  {
    question:
      "Which popular Nintendo series features battles between various characters from the company's games?",
    options: ["Zelda", "Marvel vs Capcom", "Super Smash Bros.", "Megaman"],
    answer: "Super Smash Bros.",
  },
];

// Clears the answer buttons... While there are still button children as the firstChild in the "answerBtns" then keep removing.
function clearAnswerButtons() {
  while (answerBtns.firstChild) {
    answerBtns.removeChild(answerBtns.firstChild);
  }
}

// Function to get the answers
function getAnswers() {
  const options = quizQuestions[counter].options;

  // For loop to loop through the length of the answer options then creates a respective button for each answer option.
  // Appends the children into the answerBtns div.

  for (let i = 0; i < options.length; i++) {
    const option = document.createElement("button");
    const optionText = document.createTextNode(options[i]);
    option.appendChild(optionText);
    answerBtns.appendChild(option);

    // Eventlistener for handling answer button responsivity.
    option.addEventListener("click", function handleAnswer() {
      const selectedAnswer = option.textContent;
      const correctAnswer = quizQuestions[counter].answer;
      if (selectedAnswer === correctAnswer) {
        score++;
        counter++;
        console.log("yes");
      } else {
        counter++;
        console.log("no");
      }

      clearAnswerButtons();

      // IF statement to detect if there are more questions.
      // If there are then get the next set of question answers.

      if (counter < quizQuestions.length) {
        display = quizQuestions[counter].question;
        quizText.textContent = display;
        getAnswers();
      } else {
        quizText.textContent = `Quiz completed! Your score: ${score} out of ${quizQuestions.length}`;
        startOverBtn.style.display = "block";
        time.style.display = "none";
      }
    });
  }
}

// Starts the quiz.
// Changes "START" buttons display to none when clicked.

startQuizBtn.addEventListener("click", function () {
  display = quizQuestions[counter].question;
  quizText.textContent = display;
  getAnswers();

  startCountdown();
  startQuizBtn.style.display = "none";
});

// Starts the quiz over... Resets scores and counter...
startOverBtn.addEventListener("click", function () {
  score = 0;
  counter = 0;
  timer = 60;
  startOverBtn.style.display = "none";
  display = quizQuestions[counter].question;
  quizText.textContent = display;
  getAnswers();

  startCountdown();
});

// Function to update the timer display
function updateTimerDisplay() {
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  time.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// Function to start the countdown
function startCountdown() {
  // Update the timer display initially
  updateTimerDisplay();

  // Decrease timeInSeconds every second
  const countdownInterval = setInterval(() => {
    timer--;

    // Update the timer display
    updateTimerDisplay();

    // Check if the timer has reached 0
    if (timer === 0) {
      clearInterval(countdownInterval); // Stop the countdown
      alert("Time's up!"); // You can replace this with any action you want to take when the timer reaches 0
    }
  }, 1000); // Update the timer every 1000 milliseconds (1 second)
}

showScoreBtn.addEventListener("click", function () {
  const storedScore = JSON.parse(localStorage.getItem("userScores"));
  if (storedScore) {
    displayScores.textContent = storedScore;
  }
});

submitUsername.addEventListener("click", function (e) {
  e.preventDefault();
  const username = nameInput.value;
  const storedData = JSON.parse(localStorage.getItem("userScores")) || {};

  storedData[username] = score;

  localStorage.setItem("userScores", JSON.stringify(storedData));
});

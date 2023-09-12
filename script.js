"use scrict";
const quizText = document.getElementById("main");
const nextQuestionBtn = document.querySelector(".next-question-btn");
const startQuizBtn = document.querySelector(".start-quiz-btn");
const startOverBtn = document.querySelector(".start-over-btn");
const answerBtns = document.querySelector(".answer-btns");

let score = 0;
let counter = 0;
let display;

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
      "Mario Kart 8 Deluxe",
      "Smash Bros Brawl",
      "Mario Party",
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
      "Princess Zelda",
      "Princess Peach",
      "Princess Daisy",
      "Pricess Kora",
    ],
    answer: "Princess Zelda",
  },
  {
    question:
      "What was the first console video game that allowed the game to be saved?",
    options: [
      "Super Mario World",
      "The Legend of Zelda",
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
      "Super Mario Bros.",
      "Twilight Princess",
      "Super Smash Bros",
      "Game and Watch",
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
    options: ["Super Smash Bros.", "Zelda", "Marvel vs Capcom", "Megaman"],
    answer: "Super Smash Bros.",
  },
];

function clearAnswerButtons() {
  while (answerBtns.firstChild) {
    answerBtns.removeChild(answerBtns.firstChild);
  }
}

function getAnswers() {
  const options = quizQuestions[counter].options;
  for (let i = 0; i < options.length; i++) {
    const option = document.createElement("button");
    const optionText = document.createTextNode(options[i]);
    option.appendChild(optionText);
    answerBtns.appendChild(option);

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

      if (counter < quizQuestions.length) {
        display = quizQuestions[counter].question;
        quizText.textContent = display;
        getAnswers();
      } else {
        // No more questions, display the score or do something else
        quizText.textContent = `Quiz completed! Your score: ${score} out of ${quizQuestions.length}`;
      }
    });
  }
}

startQuizBtn.addEventListener("click", function () {
  display = quizQuestions[counter].question;
  quizText.textContent = display;
  getAnswers();
});

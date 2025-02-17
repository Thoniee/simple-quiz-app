const questions = [
    {
        question: "How many countries are in West Africa?",
        answers: [
            { text: "10", correct: false },
            { text: "16", correct: true },
            { text: "12", correct: false },
            { text: "30", correct: false }
        ]
    },
    {
        question: "Where is Genesys Tech hub situated?",
        answers: [
            { text: "Anambra", correct: false },
            { text: "Lagos", correct: false },
            { text: "Enugu", correct: true },
            { text: "Owerri", correct: false }
        ]
    },
    {
        question: "Name of the tallest building in the world?",
        answers: [
            { text: "White House", correct: false },
            { text: "Burj Khalifa", correct: true },
            { text: "Shanghai Tower ", correct: false },
            { text: "Eiffel Tower", correct: false }
        ]
    },
    {
        question: "Name of the fastest terrestial animal in the world?",
        answers: [
            { text: "Antelope", correct: false },
            { text: "Horse", correct: false },
            { text: "Camel ", correct: false },
            { text: "Cheetah", correct: true }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

const questionElement = document.getElementById("question-text");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");
const progressElement = document.getElementById("progress");
const scoreElement = document.getElementById("score");
const scoreContainer = document.getElementById("score-container");
const questionContainer = document.getElementById("question-container");
const controlsContainer = document.getElementById("controls");

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtonsElement.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", () => selectAnswer(index));
    });

    progressElement.innerHTML = `Question ${questionNo} of ${questions.length}`;
    updateButtonStates();
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(selectedIndex) {
    const buttons = answerButtonsElement.children;
    for (let button of buttons) {
        button.disabled = true;
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
    }

    if (questions[currentQuestionIndex].answers[selectedIndex].correct) {
        buttons[selectedIndex].classList.add("correct");
        score++;
    } else {
        buttons[selectedIndex].classList.add("incorrect");
    }

    userAnswers[currentQuestionIndex] = selectedIndex;
    updateButtonStates();
}

function showScore() {
    resetState();
    questionElement.innerHTML = "You have completed the quiz!";
    progressElement.innerHTML = `Your score: ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Restart";
    prevButton.style.display = "none";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function handlePrevButton() {
    currentQuestionIndex--;
    showQuestion();
}

function updateButtonStates() {
    nextButton.style.display = "block";
    prevButton.style.display = currentQuestionIndex > 0 ? "block" : "none";
    
    if (currentQuestionIndex === questions.length - 1) {
        nextButton.innerHTML = "Finish";
    } else {
        nextButton.innerHTML = "Next";
    }

    nextButton.disabled = userAnswers[currentQuestionIndex] === undefined;
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

prevButton.addEventListener("click", handlePrevButton);

startQuiz();
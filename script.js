// Quiz questions
const questions = [
    {
        question: 'Which planet is known as the Red Planet?',
        answers: [
            { text: 'Venus', correct: false },
            { text: 'Mars', correct: true },
            { text: 'Jupiter', correct: false },
            { text: 'Saturn', correct: false }
        ]
    },
    {
        question: 'What is the largest ocean on Earth?',
        answers: [
            { text: 'Atlantic Ocean', correct: false },
            { text: 'Indian Ocean', correct: false },
            { text: 'Arctic Ocean', correct: false },
            { text: 'Pacific Ocean', correct: true }
        ]
    },
    {
        question: 'Which country is home to the kangaroo?',
        answers: [
            { text: 'New Zealand', correct: false },
            { text: 'South Africa', correct: false },
            { text: 'Australia', correct: true },
            { text: 'Brazil', correct: false }
        ]
    },
    {
        question: 'What is the chemical symbol for gold?',
        answers: [
            { text: 'Go', correct: false },
            { text: 'Gd', correct: false },
            { text: 'Au', correct: true },
            { text: 'Ag', correct: false }
        ]
    },
    {
        question: 'Which is the tallest mountain in the world?',
        answers: [
            { text: 'K2', correct: false },
            { text: 'Mount Everest', correct: true },
            { text: 'Kangchenjunga', correct: false },
            { text: 'Makalu', correct: false }
        ]
    },
    {
        question: 'Who wrote "Romeo and Juliet"?',
        answers: [
            { text: 'Charles Dickens', correct: false },
            { text: 'Jane Austen', correct: false },
            { text: 'William Shakespeare', correct: true },
            { text: 'Mark Twain', correct: false }
        ]
    },
    {
        question: 'What is the capital of Japan?',
        answers: [
            { text: 'Beijing', correct: false },
            { text: 'Seoul', correct: false },
            { text: 'Tokyo', correct: true },
            { text: 'Bangkok', correct: false }
        ]
    },
    {
        question: 'Which element has the chemical symbol "O"?',
        answers: [
            { text: 'Osmium', correct: false },
            { text: 'Oxygen', correct: true },
            { text: 'Oganesson', correct: false },
            { text: 'Octane', correct: false }
        ]
    },
    {
        question: 'How many continents are there on Earth?',
        answers: [
            { text: '5', correct: false },
            { text: '6', correct: false },
            { text: '7', correct: true },
            { text: '8', correct: false }
        ]
    },
    {
        question: 'Which is the smallest prime number?',
        answers: [
            { text: '0', correct: false },
            { text: '1', correct: false },
            { text: '2', correct: true },
            { text: '3', correct: false }
        ]
    }
];

// DOM Elements
const homeScreen = document.getElementById('home-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionElement = document.getElementById('question-text');
const answerButtonsElement = document.getElementById('answer-buttons');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const questionNumElement = document.getElementById('question-num');
const finalScoreElement = document.getElementById('final-score');
const questionsAnsweredElement = document.getElementById('questions-answered');
const accuracyElement = document.getElementById('accuracy');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restart-btn');

// Game variables
let shuffledQuestions, currentQuestionIndex, timer, timeLeft;
let score = 0;
let questionsAnswered = 0;
let correctAnswers = 0;
let quizCompleted = false;

// Event Listeners
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});
restartButton.addEventListener('click', () => {
    resultsScreen.classList.add('hide');
    homeScreen.classList.remove('hide');
});

// Start the game
function startGame() {
    homeScreen.classList.add('hide');
    quizScreen.classList.remove('hide');
    
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    questionsAnswered = 0;
    correctAnswers = 0;
    quizCompleted = false;
    scoreElement.textContent = score;
    
    startTimer();
    setNextQuestion();
}

// Start the timer
function startTimer() {
    timeLeft = 60; // 60 seconds for the quiz
    timerElement.textContent = timeLeft;
    
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            showResults();
        }
    }, 1000);
}

// Set up the next question
function setNextQuestion() {
    resetState();
    if (currentQuestionIndex < shuffledQuestions.length) {
        showQuestion(shuffledQuestions[currentQuestionIndex]);
        questionNumElement.textContent = `${currentQuestionIndex + 1}/${shuffledQuestions.length}`;
    } else {
        showResults();
    }
}

// Display the current question
function showQuestion(question) {
    questionElement.textContent = question.question;
    
    // Shuffle answers
    const shuffledAnswers = [...question.answers].sort(() => Math.random() - 0.5);
    
    shuffledAnswers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('answer-btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

// Reset the answer buttons
function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

// Handle answer selection
function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    
    questionsAnswered++;
    
    if (correct) {
        correctAnswers++;
        score += 10; // 10 points per correct answer
        scoreElement.textContent = score;
    }
    
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
        button.disabled = true;
    });
    
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
        nextButton.classList.remove('hide');
    } else {
        // If this is the last question, show a "Finish" button
        nextButton.textContent = "Finish";
        nextButton.classList.remove('hide');
        nextButton.addEventListener('click', showResults, { once: true });
    }
}

// Set the button classes based on correctness
function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

// Clear the status classes
function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

// Show results only when quiz is completed
function showResults() {
    // Prevent showing results multiple times
    if (quizCompleted) return;
    quizCompleted = true;
    
    clearInterval(timer);
    quizScreen.classList.add('hide');
    resultsScreen.classList.remove('hide');
    
    finalScoreElement.textContent = score;
    questionsAnsweredElement.textContent = questionsAnswered;
    
    const accuracy = questionsAnswered > 0 ? Math.round((correctAnswers / questionsAnswered) * 100) : 0;
    accuracyElement.textContent = accuracy;
    
    // Set appropriate message based on score
    if (score >= 80) {
        messageElement.textContent = "Excellent! You're a quiz master!";
    } else if (score >= 50) {
        messageElement.textContent = "Good job! You know your stuff!";
    } else {
        messageElement.textContent = "Keep practicing! You'll get better!";
    }
    
    // Reset button text for next game
    nextButton.textContent = "Next";
}

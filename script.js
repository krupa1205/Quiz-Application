//Quiz - script.js//

const quizData = [
    {
        question: "Which is the national animal of India?",
        answers: ["Lion", "Elephant", "Royal Bengal Tiger", "Peacock"],
        correct: 2
    },
    {
        question: "The Indian national anthem was written by?",
        answers: ["Rabindranath Tagore", "Bankim Chandra Chatterjee", "Sarojini Naidu", "Mahatma Gandhi"],
        correct: 0
    },
    {
        question: "Which river is considered the most sacred in India?",
        answers: ["Yamuna", "Godavari", "Ganga", "Brahmaputra"],
        correct: 2
    },
    {
        question: "The Red Fort is located in which Indian city?",
        answers: ["Mumbai", "Kolkata", "Chennai", "Delhi"],
        correct: 3
    },
    {
        question: "Which festival is known as the 'Festival of Lights' in India?",
        answers: ["Holi", "Diwali", "Dussehra", "Navratri"],
        correct: 1
    },
    {
        question: "Who was the first Prime Minister of India?",
        answers: ["Mahatma Gandhi", "Jawaharlal Nehru", "Indira Gandhi", "Sardar Patel"],
        correct: 1
    },
    {
        question: "Which Indian state is known as the 'Land of Five Rivers'?",
        answers: ["Punjab", "Haryana", "Uttar Pradesh", "Rajasthan"],
        correct: 0
    },
    {
        question: "The famous 'Konark Sun Temple' is located in which state?",
        answers: ["Tamil Nadu", "Odisha", "Karnataka", "Andhra Pradesh"],
        correct: 1
    },
    {
        question: "Which dance form originated in Kerala?",
        answers: ["Bharatanatyam", "Kathak", "Kathakali", "Kuchipudi"],
        correct: 2
    },
    {
        question: "The Indian Space Research Organisation (ISRO) is headquartered in?",
        answers: ["Mumbai", "Chennai", "Bangalore", "Hyderabad"],
        correct: 2
    }
];

// DOM Elements
const questionEl = document.querySelector('.question-text');
const answerOptionsEl = document.querySelector('.answer-options');
const submitBtn = document.getElementById('submit-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.querySelector('.progress-bar');
const questionCounter = document.querySelector('.question-counter');
const scoreDisplay = document.querySelector('.score-display');

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let quizCompleted = false;


function loadQuestion() {
    const currentQuizData = quizData[currentQuestion];
    

    questionEl.textContent = currentQuizData.question;
    

    answerOptionsEl.innerHTML = '';
 
    currentQuizData.answers.forEach((answer, index) => {
        const answerEl = document.createElement('div');
        answerEl.classList.add('answer-option');
        answerEl.textContent = answer;
        answerEl.addEventListener('click', () => selectAnswer(index));
        answerOptionsEl.appendChild(answerEl);
    });
    
   
    progressBar.style.width = `${progress}%`;
    questionCounter.textContent = `Question ${currentQuestion + 1}/${quizData.length}`;
    

    submitBtn.disabled = true;
    nextBtn.disabled = true;
    

    if (currentQuestion === quizData.length - 1) {
        nextBtn.textContent = 'View Results';
    } else {
        nextBtn.textContent = 'Next';
    }
}

function selectAnswer(index) {
  
    const options = document.querySelectorAll('.answer-option');
    options.forEach(option => option.classList.remove('selected'));
    

    options[index].classList.add('selected');
    selectedAnswer = index;
    submitBtn.disabled = false;
}


function checkAnswer() {
    const options = document.querySelectorAll('.answer-option');
    const correctIndex = quizData[currentQuestion].correct;
  
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });

    options.forEach((option, index) => {
        if (index === correctIndex) {
            option.classList.add('correct');
        } else if (index === selectedAnswer && selectedAnswer !== correctIndex) {
            option.classList.add('incorrect');
        }
    });
    
 
    if (selectedAnswer === correctIndex) {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
    }

    nextBtn.disabled = false;
    submitBtn.disabled = true;
}


function showResults() {
    quizCompleted = true;
    const percentage = Math.round((score / quizData.length) * 100);
    
    document.querySelector('.quiz-container').innerHTML = `
        <div class="results-container glass-effect">
            <h2>Quiz Completed!</h2>
            <div class="score-circle">
                <span class="score-value">${score}/${quizData.length}</span>
            </div>
            <p>You scored ${percentage}%</p>
            <button class="btn restart-btn" id="restart-btn">Restart Quiz</button>
        </div>
    `;
    

    const circle = document.querySelector('.score-circle');
    circle.style.background = `conic-gradient(var(--secondary) ${percentage}%, transparent ${percentage}%)`;
    
  
    document.getElementById('restart-btn').addEventListener('click', () => {
        location.reload();
    });
}


submitBtn.addEventListener('click', checkAnswer);

nextBtn.addEventListener('click', () => {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        selectedAnswer = null;
        loadQuestion();
    } else {
        showResults();
    }
});


loadQuestion();
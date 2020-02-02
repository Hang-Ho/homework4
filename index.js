const countDown = document.getElementById("count-down");
const startBtn = document.getElementById("start-btn");
const questionArea = document.getElementById("question-area");
const choiceList = document.getElementById("choice-list");
const $score = document.getElementById("score");
const scoreList = document.getElementById("score-list");
const submitBtn = document.getElementById("submit");
const inputBox = document.getElementById("initials");
let rightWrong = document.getElementById("right-wrong");
const finishBox = document.getElementById("finish-box");
const highscoreBox = document.getElementById("highscore-box");
const goBackBtn = document.getElementById("go-back");
const clearScores = document.getElementById("clear-highscore");
const img = document.querySelector('img');

let currentQuestion = 0;
const audio = document.createElement('audio');
const question = [
    {
        title: "Divide 50 by half and add 10.",
        choices: ["10", "25", "40", "None"],
        answer: "None"
    },
    {
        title: "How often do you smile?",
        choices: ["Always", "Sometimes", "Usually", "Rarely"],
        answer: "Usually"
    },
    {
        title: "Who is the nicest person in the world?",
        choices: ["You", "Your neighboor", "Your ex", "Does not exist"],
        answer: "You"
    },
    {
        title: "How many month have 28 days?",
        choices: ["2", "1", "None", "Depends if it's a leaf year or not"],
        answer: "Depends if it's a leaf year or not"
    }
]
var timeLeft;

function setTime() {
    timeLeft = question.length * 15;
    let timeInterval = setInterval(function () {
        if (currentQuestion < question.length) {
            timeLeft--;
        }
        if (timeLeft < 0) {
            timeLeft = 0;
        }
        countDown.textContent = timeLeft;
        if (timeLeft <= 0) {
            choiceList.innerHTML = "";
            questionArea.innerHTML = "";
            $score.textContent = "0";
            finishBox.style.display = "block";
            img.setAttribute('src', 'assets/IMG_7502.JPG');
            clearInterval(timeInterval);
        }
    }, 1000);
}

goBackBtn.addEventListener('click', function(event) {
    event.preventDefault();
    questionArea.textContent = "Try to answer the following questions within one minute. Keep in mind that incorrect answers will penalize your time/score by 15 seconds.";
    startBtn.style.display = "block";
    choiceList.innerHTML = "";
    highscoreBox.style.display = "none";
})

startBtn.addEventListener('click', function (event) {
    event.preventDefault();
    currentQuestion = 0;
    setTime();
    startBtn.style.display = "none";
    showQuestion();
})

function isCorrect() {
    let answer = this.getAttribute("data-answer");
    let playerChoice = this.textContent;
    if (answer === playerChoice) {
        rightWrong.textContent = "Correct";
        audio.setAttribute('src', 'assets/correct.mp3');
        audio.play();
    } else {
        timeLeft = timeLeft - 15;
        rightWrong.textContent = "Wrong";
        audio.setAttribute('src', 'assets/wrong.mp3');
        audio.play();
    }
    currentQuestion++;
    showQuestion();
}

function showQuestion() {
    choiceList.innerHTML = "";
    questionArea.innerHTML = "";
    if (currentQuestion < question.length) {
        questionArea.textContent = question[currentQuestion].title;
        question[currentQuestion].choices.forEach(choice => {
            const $choiceli = document.createElement('li');
            $choiceli.textContent = choice;
            $choiceli.setAttribute("class", "li rounded shadow");
            $choiceli.setAttribute("data-answer", question[currentQuestion].answer);
            choiceList.appendChild($choiceli);
            $choiceli.addEventListener("click", isCorrect);
        })
    }
    if (currentQuestion === question.length){
        $score.textContent = timeLeft;
        finishBox.style.display = "block";
        img.setAttribute('src', 'assets/chopper.gif');
        rightWrong.textContent = "";
    }
}

var highscoreList = [];

submit.addEventListener('click', function (event) {
    event.preventDefault();
    const name = initials.value.trim();
    while (name === ""){
        alert("Enter your initial");
        name = initials.value.trim();}
    finishBox.style.display = "none";
    highscoreBox.style.display = "block";
    const $scoreli = document.createElement('li');
    $scoreli.id = highscoreList.length + 1;
    $scoreli.innerHTML = $scoreli.id + ". " + name + " - " + timeLeft;
    scoreList.appendChild($scoreli);
    highscoreList.push({name: name, score: timeLeft});
    var strScoreList = JSON.stringify(highscoreList);
    localStorage.setItem("highscore", strScoreList);
})

clearScores.addEventListener('click', function(event) {
    event.preventDefault();
    highscoreList = [];
    $('#score-list').empty();
    
})
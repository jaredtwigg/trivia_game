// select all elements
const player = document.getElementById("player");
const points = document.getElementById("points");
const start = document.getElementById("start");
const form = document.getElementsByClassName("form")[0];
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");


// create our questions
let questions = [
    {
        question : "WHICH CITY IS THE FOCAL POINT OF 'CITY OF THE LIVING DEAD'?",
        choiceA : "SALEM",
        choiceB : "NEW YORK",
        choiceC : "DUNWICH",
        correct : "C"
    },
	{
        question : "WHAT NAME IS DR. LOGAN ALTERNATELY KNOWN AS IN 'DAY OF THE DEAD'?",
        choiceA : "DRACULA",
        choiceB : "BUTCHER",
        choiceC : "FRANKENSTEIN",
        correct : "C"
    },
	{
        question : "WHO WAS THE KILLER IN 'MY BLOODY VALENTINE' (81) AFTER THE HARRY WARDEN MURDERS?",
        choiceA : "T.J.",
        choiceB : "AXEL",
        choiceC : "HOWARD",
        correct : "B"
    },
	{
        question : "WHO WAS THE VOICE OF CHUCKY IN THE ORIGINAL CHILDS PLAY?",
        choiceA : "BRAD DOURIF",
        choiceB : "LUCIO FULCI",
        choiceC : "KANE HODDER",
        correct : "A"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 115; // 115px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
	let playerName = form.name.value;
	console.log(playerName);
    start.style.display = "none";
	form.style.display = "none";
	renderPlayscore();
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render player and score elements
function renderPlayscore(){
	let playerName = form.name.value;
	playscore.style.display = "block";
	player.innerHTML = `<p>PLAYER: ${playerName}</p>`;
	points.innerHTML = "<p>SCORE: 00</p>";
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        //counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
	quiz.style.display = "none";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    
    //scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>YOU GOT:" + scorePerCent +"%</p>";
}






















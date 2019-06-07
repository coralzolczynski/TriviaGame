$(document).ready(function () {
    //create Game Start button
    function createStart() {
        var startPage = $("<button class='startButton btn text-center' type='button'>Game Start!</button>");
        $(".body").html(startPage);
    };


    createStart();
    game();

    

var questions= [
    "How many rings of power were forged in the second age?",
    "In Fellowship of the Ring, what gift does Lady Galadriel give Gimli before the fellowship leave Lothlorien?",
    "Who said: I don't know half of you half as well as I should like, and I like less than half of you half as well as you deserve.",
    "Who is Shelob",
    "The movie does not mention it, but Bilbo shares his birthday with which hobbit?",
    "Hobbits eat seven meals a day. What comes directly after elevensies?",
    "Denethor is the 26th what?",
    "Who became King of Rohan after Theoden met his demise?",
    "How many wizards are there in Middle Earth?",
    "What is the name of the volcano that the Ring is thrown into?",
    "What is the name of the remade version of the sword that is broken?"
];

var answers= [
    ["1", "13", "19", "20"],
    ["Elvish rope", "Three strands of her hair", "a drinking horn crafted from wood", "a dagger"],
    ["Bilbo Baggins", "Frodo", "Gandalf", "Pippin"],
    ["An ent that befriends Pippin and Merry", "A beastly spider that tries to eat Frodo and Sam", "An elf queen", "Uruk-hai leader"],
    ["Pippin", "Smeagol", "Frodo", "Belladonna Took Baggins"],
    ["Afternoon tea", "Dinner", "Supper", "Luncheon"],
    ["King of Gondor", "Stewart of Gondor", "Stewart of Rohan", "King of Arnor"],
    ["Eowyn", "Grima", "Eorl", "Eomer"],
    ["3", "5", "9", "17"],
    ["Barad Dur", "Osgiliath", "Cirith Ungol", "Minas Tirith"],
    ["Sting", "Anduril", "Narsil", "Glamdring"]
];

var correctAns= [
    "20", 
    "Three strands of her hair",
    "Bilbo Baggins",
    "A beastly spider that tries to eat Frodo and Sam",
    "Frodo",
    "Luncheon",
    "Stewart of Gondon",
    "Eomer",
    "5",
    "Barad Dur",
    "Anduril"
];

var questionCount = 0;
var counter = 30;
var time;
var correct = 0;
var wrong = 0;
var unanswer = 0;
var timeout;
var box;

function countdown(){
    if (counter > 0) {
        counter--;
    }

    if (counter === 0) {
        clearInterval(time);
        ifOutOfTime();
    }
    $(".timer").html(counter);
};

function timeOut() {
    time = setInterval(countdown, 1000);
};

function createTrivia() {
    var main = $("<div class='main'></div>");
    var timer = $("<div class='remain'>Time remaining is : <span class='timer'>30</span></div>");
    box = $("<div class='box'></div>");

    var question = $("<div class='question'>question</div>");
    var answersChoice = $("<div class='answerChoice'>Choose your answer from below:</div>");
    var firstAnswer = $("<div class='ans firstAnswer'>1stanswer</div>");
    var secondAnswer = $("<div class='ans secondAnswer'>2ndanswer</div>");
    var thirdAnswer = $("<div class='ans thirdAnswer'>3ndanswer</div>");
    var fourthAnswer = $("<div class='ans fourthAnswer'>4thanswer</div>");
    box = $("<div class='box'></div>");

    main.append(timer).append(box);
    box.html(question).append(answersChoice);
    answersChoice.append(firstAnswer).append(secondAnswer).append(thirdAnswer).append(fourthAnswer);
    $(".body").html(main);
};

function start() {
    createTrivia();
    timeOut();
    assignData();
    pickAns();
  };

  function game() {
      $(".startButton").on("click", function (){
          start();
      });
  };

function assignData() {
    $(".question").text(question[questionCount]);
    $(".firstAnswer").text(answers[questioncount][0]);
    $(".secondAnswer").text(answers[questionCount][1]);
    $(".thirdAnswer").text(answers[questionCount][2]);
    $(".fourthAnswer").text(answers[questionCount][3]);

};

function pickAns() {
    if (this.innerHTML === correctAns[questionCount]) {
        ifCorrect();
    } else {
        ifIncorrect();
    }
};

function ifCorrect() {
    correct++;
    var correctAnswer = $("<div class='correctAnswer'>Correct! The answer is: <span>" + correctAns[questionCount] + " </span></div>");
    $(".box").html(correctAnswer);
    clearInterval(time);
    next();
    end();
};

function ifIncorrect() {
    wrong++;
    var correctAnswer = $("<div class='correctAnswer'>Wrong! The answer is: <span>" + correctAns[questionCount] + " </span></div>");
    $(".box").html(correctAnswer);
    clearInterval(time);
    next();
    end();
};

function ifOutOfTime() {
    unanswer++;
    var correctAnswer = $("<div class='correctAnswer'>Wrong! The answer is: <span>" + correctAns[questionCount] + " </span></div>");
    $(".box").html(correctAnswer);
    clearInterval();
    next();
    end();
};

function next() {
    timeout = setTimeout(function () {
        questionCount++;
        counter = 30;
        timeOut();
        createTrivia();
        assignData();
        pickAns();
    }, 4000);
};

function end() {

    if (questionCount === question.length - 1) {
        setTimeout(function () {
            var endline = $("<div>All done, here's how you did!</div>")
            var correctAns = $("<div>Correct Answers: <span>" + correct + "</span></div>")
            var wrongAns = $("<div>Wrong Answers: <span>" + wrong + "</span></div>")
            var unAns = $("<div>Unanswered: <span>" + unanswer + "</span></div>")
            var reset = $("<button class='resetButton btn text-center' type='button'>Restart the Game!</button>");
            $(".box").html(endline).append(correctAns).append(wrongAns).append(unAns).append(reset);
            resetpage();
        }, 4000);

        clearTimeout(timeout);
    }
};


function resetpage() {
    $(".resetButton").on("click", function () {
        questionCount = 0;
        counter = 30;
        correct = 0;
        wrong = 0;
        unanswer = 0;
        start();

    })
};
});
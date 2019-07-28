var card = $("#quiz-area");

var questions= [
    {
        question:"How many rings of power were forged in the second age?",
        answers:["1", "13", "19", "20"],
        correctAns:"20"
    },
    {
        question: "In Fellowship of the Ring, what gift does Lady Galadriel give Gimli before the fellowship leave Lothlorien?",
        answers: ["Elvish rope", "Three strands of her hair", "a drinking horn crafted from wood", "a dagger"],
        correctAns: "Three strands of her hair"
    },
    {
        question: "Who said: I don't know half of you half as well as I should like, and I like less than half of you half as well as you deserve.",
        answers: ["Bilbo Baggins", "Frodo", "Gandalf", "Pippin"],
        correctAns: "Bilbo Baggins"
    },
    {
        question: "Who is Shelob",
        answers: ["An ent that befriends Pippin and Merry", "A beastly spider that tries to eat Frodo and Sam", "An elf queen", "Uruk-hai leader"],
        correctAns: "A beastly spider that tries to eat Frodo and Sam"
    },
    {
        question: "The movie does not mention it, but Bilbo shares his birthday with which hobbit?",
        answers:  ["Pippin", "Smeagol", "Frodo", "Belladonna Took Baggins"],
        correctAns:  "Frodo"
    },
    {
        question: "Hobbits eat seven meals a day. What comes directly after elevensies?",
        answers: ["Afternoon tea", "Dinner", "Supper", "Luncheon"],
        correctAns: "Luncheon"
    },
    {
        question: "Denethor is the 26th what?",
        answers: ["King of Gondor", "Stewart of Gondor", "Stewart of Rohan", "King of Arnor"],
        correctAns: "Stewart of Gondor"
    },
    {
        question: "Who became King of Rohan after Theoden met his demise?",
        answers:  ["Eowyn", "Grima", "Eorl", "Eomer"],
        correctAns: "Eomer"
    },
    {
        question: "How many wizards are there in Middle Earth?",
        answers: ["3", "5", "9", "17"],
        correctAns: "5"
    },
    {
        question: "What is the name of the volcano that the Ring is thrown into?",
        answers: ["Barad Dur", "Osgiliath", "Cirith Ungol", "Minas Tirith"],
        correctAns: "Barad Dur"
    },
    {
        question: "What is the name of the remade version of the sword that is broken?",
        answers: ["Sting", "Anduril", "Narsil", "Glamdring"],
        correctAns: "Anduril"
    }
];

var timer;

var game = {
    correct: 0, 
    incorrect: 0,
    counter: 120,

    countdown: function() {
        game.counter--;
        $("#counter-number").html(game.counter);
        if (game.counter === 0) {
            console.log("Time is up!");
            game.done();
        }
    },

    start: function() {
        timer = setInterval(game.countdown, 1000);

        $("#sub-wrapper").prepend(
            "<h2>Time Remaining: <span id='counter-number'>120</span> Seconds</h2>"
        );

        $("#start").remove();

        for (var i = 0; i < questions.length; i++) {
            card.append("<h2>" + questions[i].question + "</h2>");
            for (var j = 0; j < questions[i].answers.length; j++) {
                card.append("<input type='radio' name='question-" + i +
                "'value='" + questions[i].answers[j] + "''>" + questions[i].answers[j]);
            }
        }
        card.append("<button id='done'>Done</button>");
    },

    done: function() {
        var inputs = card.children("input:checked");
        for (var i = 0; i < inputs.length; i++) {
            if ($(inputs[i]).val() === questions[i].correctAns) {
                game.correct++;
            } else {
                game.incorrect++;
            }
        }
        this.result();
    },
    
    result: function() {
        clearInterval(timer);

        $("#sub-wrapper h2").remove();

        card.html("<h2>All Done!</h2>");
        card.append("<h3>Correct Answers: " + this.correct + "</h3>");
        card.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
    }

}

$(document).on("click", "#start", function(){
    game.start();
});

$(document).on("click", "#done", function(){
    game.done();
});
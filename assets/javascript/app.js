var q = 0;
var correct = 0;
var time = 60;
var intervalID;

var game = {
    //Questions the game will go through starting at [0] and going through [9] (10 Question Game)
    question: ["What does PC stand for?",
        'Who originated the concept of a programmable computer and is considered to be the "Father of the Computer"?',
        "This computer used more than 300 vacuum tubes for digital computation, including binary math and boolean logic.",
        "This 4-bit central processing unit (CPU) was the first commercially available microprocessor released by Intel.",
        "This was the first graphics processing unit (GPU), which was capable of processing a minimum of 10 million polygons per second.",
        "On this date in history, ARPANET adopted TCP/IP which became the modern Internet.",
        "This game was the first of it's kind to use the TCP/IP protocol.",
        "This American microprocessor maker is Intel's biggest compeitor and released the Athlon Processor in year 2000.",
        "In the early 2000s, these two strings were the most commonly used passwords.",
        "The first known computer virus was written in 1981 on this computer."],

    //Makes it simpler to check for correct answer instead of comparing string (could do string comparison if it put answers in random order)
    correctAnswer: [1, 0, 2, 3, 1, 0, 2, 0, 1, 3],

    imagePath: ["q1.jpg",                                     //Images for answers
        "q2.jpeg",
        "q3.jpg",
        "q4.jpg",
        "q5.jpg",
        "q6.png",
        "q7.jpg",
        "q8.jpg",
        "q9.jpg",
        "q10.jpeg"],

    clockRunning: false,

    //Answers all in order.  Calling them will start at question * 4
    answers: ["Politically Correct", "Personal Computer", "Point & Click", "Personal Computator",
        "Charles babbage", "John backus", "David bader", "Charles bachman",
        "Mcom", "XYZ", "ABC", "ZFZ",
        "AMD Athlon", "Intel i2", "IBM Core", "Intel 4004",
        "AMD Radeon", "Geforce 256", "Intel IGX", "Nvidia Quadro",
        "January 1 1983", "February 9 1980", "October 31 1983", "December 5 1981",
        "Tetris", "Dig Dug", "SGI Dogfight", "Dungeons and Dragons",
        "AMD", "GFX", "IBM", "Sun",
        "eggs and ham", "password and 123456", "letmein and pleaseletmein", "abcdefg and 987654",
        "IBM XT", "Sun Solaris", "Altair 8800", "Apple ii"],

    startTimer: function () {                                //STARTS TIMER
        if (!game.clockRunning) {
            intervalID = setInterval(game.countDown, 1000);
            game.clockRunning = true;
        }
    },

    stopTimer: function () {                                 //STOPS TIMER
        clearInterval(intervalID);
        game.clockRunning = false;
    },

    countDown: function () {                                 //COUNTS DOWN 1
        $("#timerDiv").text("Time remaining: " + time);
        time--;

        if (time === -1) {
            game.endGame();                                  //When timer hits below 0, end game
        }
    },

    drawData: function () {

        var index = 0;
        //Updates screen with current question and clears the choices Div
        $("#questionDiv").text(game.question[q]);           //Updates Question
        $("#choicesDiv").empty();                           //Empties answers
        $("#startButton").hide();                           //Hides the start button

        //Starts at the cooresponding answer depending on what question you're on. Ex: Qestion 1 (0-3) Question 2 (4-7)... Adds new Div so it can be highlighted and clicked on
        for (var i = q * 4; i < (q * 4) + 4; i++) {
            var newDiv = $("<div>");
            newDiv.text(game.answers[i]);
            newDiv.attr("class", "answer");
            newDiv.attr("choiceIndex", index);
            $("#choicesDiv").append(newDiv);
            index++;                                         //Index for simply adding 0,1,2 or 3 to the newDiv attr
        }
        game.startTimer();
    },

    drawAnswer: function (result) {

        $("#questionDiv").empty();                           //Clears question
        $("#choicesDiv").empty();                            //Clears choices

        game.stopTimer();

        switch (result) {
            case true: {
                $("#questionDiv").text("Correct!");
                break;
            }
            case false: {
                $("#questionDiv").text("Incorrect, the correct answer is " + game.answers[(q * 4) + game.correctAnswer[q]] + ".");
                break;
            }
        }
        //Output image of answer
        $("#choicesDiv").html("<img src='assets/images/" + game.imagePath[q] + "'/>");
    },

    //Checks the correctAnswer string to see if it matches the choiceIndex of what you're clicking on
    checkifCorrect: function () {

        if ($(this).attr("choiceIndex") == game.correctAnswer[q]) {
            correct++;
            game.drawAnswer(true);                           //Draws the answer on the screen
        }
        else {
            game.drawAnswer(false);
        }

        q++;                                                 //Goes to next Question index

        if (q === game.question.length) {
            setTimeout(game.endGame,5000);
        }
        else {
            setTimeout(game.drawData,5000);                 //Waits 7 seconds before drawing new question
        }
    },

    endGame: function () {

        game.stopTimer();

        $("#questionDiv").empty();                           //Clears question
        $("#choicesDiv").empty();                            //Clears choices
        $("#startButton").show();
        $("#timerDiv").empty();

        if (time === -1) {
            $("#questionDiv").text("Sorry, but you ran out of time! Better luck Next Time!");
        }
        else {
            $("#questionDiv").text("Game complete! " + "You answered " + correct + " out of 10 questions correctly!");
        }

        correct = 0;                                         //resetting values for new game
        time = 60;
        q = 0;
    }
};

$(document).on("click", ".answer", game.checkifCorrect);     //When answer selection is clicked, first check to see if it's correct
$(document).on("click", "#startButton", game.drawData);      //When Start button is clicked, start the game with drawData function
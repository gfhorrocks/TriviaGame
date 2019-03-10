var q = 0;
var correct = 0;
var clockRunning = false;
var time = 30;

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

    //Answers all in order.  Calling them will start at question * 4
    answers: ["politically correct", "personal computer", "point & click", "personal computator",
        "charles babbage", "john backus", "david bader", "charles bachman",
        "mcom", "xyz", "abc", "zfz",
        "amd athlon", "intel i2", "ibm core", "intel 4004",
        "amd radeon", "geforce 256", "intel igx", "nvidia quadro",
        "january 1 1983", "february 9 1980", "october 31 1983", "december 5 1981",
        "tetris", "dig dug", "sgi dogfight", "dungeons and dragons",
        "amd", "gfx", "ibm", "sun",
        "eggs, ham", "password, 123456", "letmein, pleaseletmein", "abcdefg, 987654",
        "ibm xt", "sun solaris", "altair 8800", "apple ii"],

    drawData: function () {

        var index = 0;

        //Updates screen with current question and clears the choices Div
        $("#questionDiv").text(game.question[q]); //Updates Question
        $("#choicesDiv").empty();                 //Empties answers
        $("#startButton").hide();                 //Hides the start button


        //Starts at the cooresponding answer depending on what question you're on. Ex: Qestion 1 (0-3) Question 2 (4-7)... Adds new Div so it can be highlighted and clicked on
        for (var i = q * 4; i < (q * 4) + 4; i++) {
            var newDiv = $("<div>");
            newDiv.text(game.answers[i]);
            newDiv.attr("class", "answer");
            newDiv.attr("choiceIndex", index);
            $("#choicesDiv").append(newDiv);
            index++;                              //Index for simply adding 0,1,2 or 3 to the newDiv attr

        }
    },

    drawAnswer: function (result) {
        $("#questionDiv").empty();                           //Clears question
        $("#choicesDiv").empty();                            //Clears choices

        switch (result) {
            case true: {
                $("#questionDiv").text("Correct!");
                alert(result);
                break;
            }
            case false: {
                $("#questionDiv").text("Incorrect, the correct answer is " + game.answers[(q * 4) + game.correctAnswer[q]]);
                $("#answerDiv").html("<img src='../images/background.jpg'>");
                alert(result);
                break;
            }
        }
    },

    //Checks the correctAnswer string to see if it matches the choiceIndex of what you're clicking on
    checkifCorrect: function () {
        if ($(this).attr("choiceIndex") == game.correctAnswer[q]) {
            q++;                                             //Goes to "next" question
            correct++;
            game.drawAnswer(true);                           //Draws the answer on the screen
            game.drawData();                                 //Draws the new question and answers on the screen
        }
        else {
            q++;
            game.drawAnswer(false);
            game.drawData();
        }
    },

    timerStart: function(){
        if (!clockRunning) {
            intervalId = setInterval(time, 1000);
            clockRunning = true;
          }
    }
};

$(document).on("click", ".answer", game.checkifCorrect);           //When answer selection is clicked, first check to see if it's correct
$(document).on("click", "#startButton", game.drawData);            //When Start button is clicked, start the game with drawData function



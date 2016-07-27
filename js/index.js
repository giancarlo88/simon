/* Cool sounds were generated using Bfxr (www.bfxr.net) */
var colorOrder = [];
var clicks = 0;
var intervalLength = 800;
var i;
var livesLeft;
var numberOfLives = 2;
var highScore = 0;
var steps = 0;
var infinityMode = false; //To be implemented later
"use strict";
$(document).on("ready", function () {
    livesLeft = numberOfLives;
    $(".lives").html(livesLeft);
    $(".gameButton").css("pointer-events", "none");
    computerTurn();
});

function computerTurn() {
    clicks = 0;
    $.when(addRandomColor()).then(showColorOrder());
}

function addRandomColor() {
    var randomChoice = Math.floor(Math.random() * 4);
    switch (randomChoice) {
    case 0:
        colorOrder.push("red");
        break;
    case 1:
        colorOrder.push("blue");
        break;
    case 2:
        colorOrder.push("green");
        break;
    case 3:
        colorOrder.push("yellow");
        break;
    }
}

function showColorOrder() {
    i = 0;
    var flashColors = setInterval(function () {
        var colorToFlash = "." + colorOrder[i];
        var soundToPlay = "#" + colorOrder[i] + "Sound";
        $.when(i++).then($(colorToFlash).fadeOut(200)).then($(soundToPlay)[0].play()).then($(colorToFlash).fadeIn(200));
        if (i >= colorOrder.length) {
            clearInterval(flashColors);
            setTimeout(function () {
                $(".gameButton").css("pointer-events", "auto");
            }, 500);
        }
    }, intervalLength);
}

$(".gameButton").on("click", function () {
    var clickedButton = $(this).attr("id");
    $(this).fadeOut(100).fadeIn(100);
    $.when(clicks++).then(function () {
        var soundToPlay = "#" + clickedButton + "Sound";
        if (clickedButton !== colorOrder[clicks - 1]) { //User presses the wrong color
            $(".messageWindow").html("INCORRECT!!").fadeTo(5000, 0);
            livesLeft--;
            $(".lives").html(livesLeft);
            if (livesLeft === 0) {
                if (steps > highScore) {
                    highScore = steps;
                }
                return gameOver(showModal);
            } else {
                soundToPlay = $('#whoops');
                showColorOrder();
                clicks = 0;
            }
        }
                else if (clicks === (colorOrder.length)) { //User has keyed sequence correctly
            if (clicks === 20 && !infinityMode) {
                return youWin();
            }
            steps++;
            setTimeout(function () {
                $(".gameButton").css("pointer-events", "none");
                $(".steps").html(steps);
                computerTurn();
            }, 500);
        }
        $(soundToPlay)[0].play();
    });
});

function youWin() {
    $("#win")[0].play();
    $("#youWinModal").modal("show");
}

function gameOver(callback) {
    $("#gameOver")[0].play();
    $(".highScore").html(highScore);
    callback(); //Used with showModal() to ensure it executes last.
}

function playAgain(callback) {
    clicks = 0;
    steps = 0;
    livesLeft = numberOfLives;
    $(".steps").html("0");
    $(".lives").html(livesLeft);
    colorOrder = [];
    callback(); //Used with computerTurn() to ensure it executes last.
}

function showModal() {
    $("#gameOverModal").modal("show");
}
$(".playAgain").on("click", function () {   //Used by both the Game Over and Winning modals
    playAgain(computerTurn);                //to start a new game.
    $(".modal").modal("hide");
});
$(".strictToggle").on("click", function () {
    $("#strictModeModal").modal("show");
    $(".yesReset").on("click", function () {
        if ($(this).attr("id") === "strictOn") {
            numberOfLives = 1;
        } else {
            numberOfLives = 2;
        }
        livesLeft = numberOfLives; //Updates the display to show the new number of lives.
        $(".lives").html(livesLeft);
        $("#strictModeModal").modal("hide");
        playAgain(computerTurn);
    });
});
$(".dontReset").on("click", function () {
    $(".modal").modal("hide");
});
$(".reset").on("click", function () {
    $("#resetModal").modal("show");
});
$(function () {
    $("[data-toggle = 'tooltip']").tooltip(); //Used by Bootstrap to make the "strict" tooltip works.
});
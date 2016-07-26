var colorOrder = [];
var intervalLength = 1000;
var strictMode = false;
var lastChance = false;
var i
var livesLeft
var numberOfLives = 2

//
//$(".gameButton").on("click", function(){
//    addRandomColor();
//    setTimeout(function(){
//        $(".messageWindow").html(colorOrder)},  
//               0)
//    console.log(colorOrder)
//})

function addRandomColor(){
    var randomChoice = Math.floor(Math.random() * 4)
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


function showColorOrder (){
    i = 0
    var flashColors  = setInterval(function(){
        var colorToFlash = "."+colorOrder[i];
        var soundToPlay = "#"+colorOrder[i]+"Sound"
        $.when(i++).then($(colorToFlash).fadeOut(200)).then($(soundToPlay)[0].play()).then($(colorToFlash).fadeIn(200));
        if (i >= colorOrder.length){
        clearInterval(flashColors);
        setTimeout(function(){
            $(".gameButton").attr("disabled", false)}, 1000)
        }
    }, intervalLength)   
    
    }



     
var clicks = 0;
$(".gameButton").on("click", function(){
        var clickedButton = $(this).attr("id")
        $.when(clicks++).then(function(){
        console.log(clicks);        
        var soundToPlay = "#" + clickedButton +"Sound";    

        if (clickedButton !== colorOrder[clicks-1]){
            $(".messageWindow").html("Incorrect!").fadeOut(2000);
            livesLeft--;
            if (livesLeft === 0){
                return gameOver();    
            } else {
                soundToPlay = $('#whoops')    
                showColorOrder();
                clicks = 0;
                }
        }
            
         else if (clicks === (colorOrder.length)){
            if (clicks === 20 && !infinityMode){
                return youWin();
            }
             setTimeout(function(){
                $(".gameButton").attr("disabled", true);
                $(".steps").html(clicks)
                computerTurn()}, 1000);
         
         } 
            $(soundToPlay)[0].play();
            })   
})


function youWin(){
    alert("You Win!")
}

function gameOver(){
    $("#gameOver")[0].play();
    $.when(alert("Game Over!")).then(playAgain(computerTurn))
}

function playAgain(callback){
        clicks = 0; 
        colorOrder = [];
        livesLeft = numberOfLives
//setTimeout(computerTurn(), 0)
        callback();
}


$(".strictToggle").on("click", function(){
    if ($(this).attr("id")==="strictOn"){
        numberOfLives = 1
    } else {
        numberOfLives = 2;
    }
    livesLeft = numberOfLives
})

function computerTurn(){
clicks = 0     
$.when(addRandomColor()).then(showColorOrder())
}   

$(document).on("ready", function(){
    $(".gameButton").attr("disabled", true )
    livesLeft = numberOfLives;
    computerTurn();
});

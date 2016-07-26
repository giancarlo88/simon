var colorOrder = [];
var intervalLength = 1000;
var strictMode = false;
var lastChance = false;
var i


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

        if (clickedButton !== colorOrder[clicks-1] && !strictMode){
            $(".messageWindow").html("wrong");
            if (strictMode || lastChance){
                gameOver();}
             else if (!strictMode && !lastChance) {
                soundToPlay = $('#whoops')    
                showColorOrder();
                clicks = 0;
                lastChance = true;}
        }
            
         else if (clicks === (colorOrder.length)){
            setTimeout(function(){
                $(".gameButton").attr("disabled", true )
                computerTurn()}, 1000);
        } 
            $(soundToPlay)[0].play();
            })   
})




function gameOver(){
    $("#gameOver")[0].play();
    $.when(alert("Game Over!"))
}


$(".strictToggle").on("click", function(){
    if ($(this).attr("id")==="strictOn"){
        strictMode = true;
    } else {
        strictMode = false;
    }
})

function computerTurn(){


clicks = 0     
$.when(addRandomColor()).then(showColorOrder())
}   

$(document).on("ready", function(){
                $(".gameButton").attr("disabled", true )

    computerTurn();
});

// alert("JS Applied.");
var gamePattern = [];
var buttonColors = ["green", "red", "yellow", "blue"];
var userClickedPattern = [];

var started = false, level = 0;

$(document).keydown(function(){
    if(!started){
        started = true;
        nextSequence();
        $("#title").text("Level " + level);
    }
});

$(".btn").click(function(){
    var colorClicked = $(this).attr("id");
    userClickedPattern.push(colorClicked);
    
    animatePress(colorClicked);
    playSound(colorClicked);

    // console.log(userClickedPattern);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length == gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        wrongAnswer();
    }
}

function nextSequence(){
    userClickedPattern = [];

    level++;

    $("#title").text("Level " + level);

    var randomChosenColour =  buttonColors[Math.floor(Math.random()*4)];
    gamePattern.push(randomChosenColour);

    // console.log(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    // $("*").addEventListener("mousemove", function(){
    
    // });
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// nextSequence();

function animatePress(currentColor){
    $("." + currentColor).addClass("pressed");
    
    setTimeout(function(){
        $("." + currentColor).removeClass("pressed");
    }, 100);
}

function wrongAnswer(){
    playSound("wrong");
    
    $("body").addClass("gameOver");
    
    setTimeout(function(){
        $("body").removeClass("gameOver");
    }, 100);

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
}

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
    userClickedPattern = [];
}
var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=1;

const aEvent={
    key:'a'
};

function nextSequence(event) {
    if (event.key === 'a' || event.key === 'A') {
      $("h1").text("Level " + level);
      for (var i = 0; i < level; i++) {
        var randomNumber = Math.floor(Math.random() * 4);
        var randomChosenColour = buttonColours[randomNumber];
        gamePattern.push(randomChosenColour);
  
        // Introduce a closure to capture the correct index
        (function(index) {
          setTimeout(function() {
            $('#' + gamePattern[index]).animate({ opacity: 0.2 }, 200).animate({ opacity: 1 });
          }, 300 * (index + 1)); // Delay each animation by 100ms
        })(i); // Pass the current index to the closure
      }
    }
  }
$(document).keydown(function (event) {
    nextSequence(event);
  });

$(".btn").click(function handler(){
    var userChosenColour=this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    
    checkAnswer(userClickedPattern.length-1);
 
});
function playSound(name){
    var audio = new Audio('./sounds/'+name+'.mp3');
    audio.play();
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length===gamePattern.length){
            level++;
            gamePattern=[];
            userClickedPattern=[];
            setTimeout(function(){
                nextSequence(aEvent);
            },1000);
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press A to Restart");
        level=1;
        gamePattern=[];
        userClickedPattern=[];
    }
}

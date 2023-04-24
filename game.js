// array called buttonColours is holding the sequence "red", "blue", "green", "yellow" .
const buttonColors = ["red","blue","green","yellow"];

let gamePattern = [];
let userClickedPattern = [];

let started = false;

let level = 0;

$(document).keypress(function(){
   if(!started){
      $("#level-title").text("Level" + " " +level);
      nextSequence();
      started = true;
   }

});

// jquery to detect which buttons are clicked and triggered function

$(".btn").click(function(){
   var userChosenColor = $(this).attr('id');

   // add which button is clicked in array 
   userClickedPattern.push(userChosenColor);

   playSound(userChosenColor);
   animatePress(userChosenColor);
   checkAnswer(userClickedPattern.length-1);

});



function checkAnswer(currentLevel){
   if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){

      if(userClickedPattern.length === gamePattern.length){
         setTimeout(function() {
            nextSequence();
         }, 500);
      }

   } else {

      playSound("wrong");

      $("body").addClass("game-over");
      setTimeout(function() {
         $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to restart");
      startOver();
   }

}


 function nextSequence(){

         userClickedPattern=[];

          level+=1;

         $("#level-title").text("level" + " " + level);

       // new random number between 0 and 3, and stores it in a variable called randomNumber

           var randomNumber = Math.floor(Math.random()*4);

        //    Creating a new variable called randomChosenColor to select a random colour from the buttonColours array.

           var randomChosenColor = buttonColors[randomNumber];
        //    Add the new randomChosenColor generated at the end of the gamePattern.

           gamePattern.push(randomChosenColor);

           $("#" +randomChosenColor).fadeIn(300).fadeOut(300).fadeIn(300);

           playSound(randomChosenColor);
           
 }
 

function playSound(name){
   var audio = new Audio("sounds/"+ name + ".mp3")
    audio.play();

}

function animatePress(currentColor){
   $("#" + currentColor).addClass("pressed");
   setTimeout(function(){
      $("#" + currentColor).removeClass('pressed');
   },100);
}

function startOver(){
   level = 0;
   gamePattern = [];
   started = false;
}

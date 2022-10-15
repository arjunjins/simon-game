var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var randomNumber = 0;
var userClickedPattern = [];
var level = 0;

function playSound(name) {
  var path = "/sounds/" + name + ".mp3";
  var audio = new Audio(path);
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColour).removeClass("pressed");
  }, 90);
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (currentLevel + 1 === level) {
      userClickedPattern = [];
      setTimeout(() => {
        nextSequence();
      }, 2000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
function nextSequence() {
  level++;
  $("h1").text("Level " + level);
  randomNumber = Math.floor(Math.random() * 4);
  console.log(randomNumber);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
}

$(document).keydown(function (e) {
  if (level === 0) {
    nextSequence();
  }
});

$(".btn").click(function (ev) {
  var userChosenColour = ev.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

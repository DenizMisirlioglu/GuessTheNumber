

// Random number generator
var n = Math.floor(Math.random() * 10 + 1);
var guess = 0;

// Confetti background animation for winner
function confettiAnimation() {

var confettiSettings = {
  target: 'confetti-canvas'
};
var confetti = new ConfettiGenerator(confettiSettings);
confetti.render();
}


// GUESSING

// Guess checker for player 1

function player1() {
  var player1Guess = document.getElementById("number-field-player1").value;

  if (player1Guess == n) {
    document.getElementById("error-box-player1").style.visibility = "visible";
    document.getElementById("error-box-player1").innerHTML = "Bingo!";
    document.getElementById("button-player2").disabled = true;
    document.getElementById("button-player3").disabled = true;
// Page timer
    setTimeout(function() {
      location.reload();
    }, 8000);
// Confetti
confettiAnimation()

  } else if (player1Guess > n) {
    guess++;
    document.getElementById("error-box-player1").style.visibility = "visible";
    document.getElementById("error-box-player1").innerHTML = "Try Lower Number";
  } else {
    guess++;
    document.getElementById("error-box-player1").style.visibility = "visible";
    document.getElementById("error-box-player1").innerHTML = "Try Higher Number";
  }
}

// Guess checker for player 2

function player2() {
  var player2Guess = document.getElementById("number-field-player2").value;

  if (player2Guess == n) {
    document.getElementById("error-box-player2").style.visibility = "visible";
    document.getElementById("error-box-player2").innerHTML = "Bingo!";
    document.getElementById("button-player2").disabled = true;
    document.getElementById("button-player3").disabled = true;
// Page timer
    setTimeout(function() {
      location.reload();
    }, 8000);
// Confetti
    confettiAnimation()

  } else if (player2Guess > n) {
    guess++;
    document.getElementById("error-box-player2").style.visibility = "visible";
    document.getElementById("error-box-player2").innerHTML = "Try Lower Number";
  } else {
    guess++;
    document.getElementById("error-box-player2").style.visibility = "visible";
    document.getElementById("error-box-player2").innerHTML = "Try Higher Number";
  }
}

// Guess checker for player 3
function player3() {
  var player3Guess = document.getElementById("number-field-player3").value;

  if (player3Guess == n) {
    document.getElementById("error-box-player3").style.visibility = "visible";
    document.getElementById("error-box-player3").innerHTML = "Bingo!";
    document.getElementById("button-player1").disabled = true;
    document.getElementById("button-player2").disabled = true;
// Page timer
    setTimeout(function() {
      location.reload();
    }, 8000);
// Confetti
    confettiAnimation()

  } else if (player3Guess > n) {
    guess++;
    document.getElementById("error-box-player3").style.visibility = "visible";
    document.getElementById("error-box-player3").innerHTML = "Try Lower Number";
  } else {
    guess++;
    document.getElementById("error-box-player3").style.visibility = "visible";
    document.getElementById("error-box-player3").innerHTML = "Try Higher Number";
  }

}

var PLAYER_WINS = 0;
var AI_WINS = 0;
var TIE = 0;


// Delay inbetween plays
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


function decideWinner(user_choise, ai_choise){
    // TIE situation
    if (user_choise == ai_choise) return 0;

    if (user_choise == "rock" && ai_choise == "paper") return 2;
    if (user_choise == "rock" && ai_choise == "scissors") return 1;


}

// main function
function rpsGame(userInput){

    var choises = ["scissors", "rock", "paper"];
    var user_choise = document.getElementById(userInput.id).id;

    var decision = ["WIN", "LOSE", "TIE"];
    const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
    var ai_choise = choises[random(0, 3)];
    var winner = decideWinner(user_choise, ai_choise)
    console.log(user_choise, ai_choise)
    console.log(decision[winner]);


    // var choise = document.getElementById(yourChoise.id).id
    // document.getElementById("user_play").src = "static/images/rest.png"
    // sleep(100).then(() => { document.getElementById("user_play").src = "static/images/" + choise + ".png"; });
    
    // var ai_choises = ["scissors_ai", "rock_ai", "paper_ai"];
    
    // var ai_random_choises = ai_choises[random(0, 3)];

    // // document.getElementById("ai_play").src = "static/images/" + ai_random_choises + ".png";
    // document.getElementById("ai_play").src = "static/images/rest_ai.png"
    // sleep(100).then(() => { document.getElementById("ai_play").src = "static/images/" + ai_random_choises + ".png"; });
}
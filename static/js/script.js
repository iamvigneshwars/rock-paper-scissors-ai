var SCORES = {
    "WIN" : 0,
    "TIE" : 0, 
    "LOSE" : 0 
}

var ROUND = 0;

// Delay inbetween plays
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


function decideWinner(user_choise, ai_choise){
    // TIE situation
    if (user_choise == ai_choise) return 0;

    // Player win situations
    if (user_choise == "rock" && ai_choise == "scissors") return 1;
    if (user_choise == "paper" && ai_choise == "rock") return 1;
    if (user_choise == "scissors" && ai_choise == "paper") return 1;

    // Player lose situations

    if (user_choise == "scissors" && ai_choise == "rock") return 2;
    if (user_choise == "rock" && ai_choise == "paper") return 2;
    if (user_choise == "paper" && ai_choise == "scissors") return 2;

}

// main function
function rpsGame(userInput){

    // Choises that the user and AI can make
    var choises = ["scissors", "rock", "paper"];
    // Get the user choise from the button clicked
    var user_choise = document.getElementById(userInput.id).id;

    var decision = ["TIE", "WIN", "LOSE"];
    // Generate a random choise for the AI 
    const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
    var ai_choise = choises[random(0, 3)];

    // Decide the winner based on the choises (0: TIE, 1: WIN, 2: LOSE)
    var winner = decideWinner(user_choise, ai_choise)
    // Increament the score with corresponding result
    SCORES[decision[winner]]++;


    console.log(user_choise, ai_choise)
    console.log(decision[winner]);
    console.log("Score: ", decision[winner], SCORES[decision[winner]]);


    // Update Round 
    ROUND++;
    document.getElementById("round").innerHTML = "ROUND " + ROUND;

    // Update Scores
    document.getElementById("player_score").innerHTML = SCORES.WIN;
    document.getElementById("tie").innerHTML = SCORES.TIE;
    document.getElementById("ai_score").innerHTML = SCORES.LOSE;


    // Update Player image
    document.getElementById("user_play").src = "static/images/rest.png"
    sleep(100).then(() => { document.getElementById("user_play").src = "static/images/" + user_choise + ".png"; });

    // Update AI image
    document.getElementById("ai_play").src = "static/images/rest_ai.png";
    sleep(100).then(() => { document.getElementById("ai_play").src = "static/images/" + ai_choise +"_ai" + ".png"; });
}
// Choises that the user and AI can make
const CHOICES = ["scissor", "rock", "paper"];
// Store the scores of all the rounds.
const SCORES = {"TIE" : 0, "WIN" : 0, "LOSE" : 0};
// Store all the results throught out the game. 
const RESULTS = [];
// store all the moves player makes.
const PLAYER_MOVES = [];
// Store all the moves AI makes.
const AI_MOVES = [];
// Keep track of round.
var ROUND = 0;

// Frequency distribution of player choosing next move,
// if the player had won the previous round.
const FREQ_WIN = {
    'rockrock' : 1,
    'rockpaper' : 1,
    'rockscissor' : 1,
    'paperrock' : 1,
    'paperpaper' : 1,
    'paperscissor' : 1,
    'scissorrock' : 1, 
    'scissorpaper' : 1, 
    'scissorscissor' : 1, 
}

// Frequency distribution of player choosing next move,
// if the player had lost the previous round.
const FREQ_LOSE = {
    'rockrock' : 1,
    'rockpaper' : 1,
    'rockscissor' : 1,
    'paperrock' : 1,
    'paperpaper' : 1,
    'paperscissor' : 1,
    'scissorrock' : 1, 
    'scissorpaper' : 1, 
    'scissorscissor' : 1, 
}

// Frequency distribution of player choosing next move,
// if the previous round was a tie.
const FREQ_TIE = {
    'rockrock' : 1,
    'rockpaper' : 1,
    'rockscissor' : 1,
    'paperrock' : 1,
    'paperpaper' : 1,
    'paperscissor' : 1,
    'scissorrock' : 1, 
    'scissorpaper' : 1, 
    'scissorscissor' : 1, 
}


// Transition Probablities
//     r  p  s
//  r [0, 0, 0]
//  p [0, 0, 0]  
//  s [0, 0, 0]

// The transition probablities of states if the player had won the previous round.
const TRANSITION_WIN = [ 
    [0, 0, 0], 
    [0, 0, 0],
    [0, 0, 0]
];
// The transition probablities of states if the player had lost the previous round.
const TRANSITION_LOSE = [
    [0, 0, 0], 
    [0, 0, 0],
    [0, 0, 0]
];
// The transition probablities of states if previous round was a tie.
const TRANSITION_TIE = [
    [0, 0, 0], 
    [0, 0, 0],
    [0, 0, 0]
];

// Delay inbetween plays
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

// This function checks player choice and AI choice, and returns the winner.
function decideWinner(player_choice, ai_choice){
    // TIE situation
    if (player_choice == ai_choice) return "TIE";

    // Player win situations
    if (player_choice == "rock" && ai_choice == "scissor") return "WIN";
    if (player_choice == "paper" && ai_choice == "rock") return "WIN";
    if (player_choice == "scissor" && ai_choice == "paper") return "WIN";

    // Player lose situations
    if (player_choice == "scissor" && ai_choice == "rock") return "LOSE";
    if (player_choice == "rock" && ai_choice == "paper") return "LOSE";
    if (player_choice == "paper" && ai_choice == "scissor") return "LOSE";

}


function updateFreqDist(previous_choice, current_choice, previous_result){


    // If the player had won, lost or tied the previous round, update the 
    // frequence of 
    if (previous_result == "WIN"){
        FREQ_WIN[previous_choice + current_choice]++;
    }

    if (previous_result == "LOSE"){
        FREQ_LOSE[previous_choice + current_choice]++;
    }

    if (previous_result == "TIE"){
        FREQ_TIE[previous_choice + current_choice]++;
    }
}

function updateTransitionTable(previous_result){


}


// main function
function rpsGame(userInput){

    // Get the user choice from the button clicked
    var player_choice = document.getElementById(userInput.id).id;

    // Generate a random choice for the AI 
    const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
    var ai_choice = CHOICES[random(0, 3)];

    // Decide the winner based on the CHOICES (0: TIE, 1: WIN, 2: LOSE)
    var decision = decideWinner(player_choice, ai_choice)
    // Increament the score with corresponding result. 
    SCORES[decision]++;


    // console.log(decision);

    if (PLAYER_MOVES.length > 0){

        let previous_choice = PLAYER_MOVES.slice(-1)[0];
        let previous_result = RESULTS.slice(-1)[0];
        updateFreqDist(previous_choice, player_choice, previous_result);
        updateTransitionTable(previous_result);
    }

    RESULTS.push(decision);
    console.log("WIN" , FREQ_WIN);
    console.log("LOSE" , FREQ_LOSE);
    console.log("TIE" , FREQ_TIE);
    console.log("--------------------") 

    //------------------- UPDATE FRONTEND --------------------//
    // Update Last Five moves.
    for (let i = 1; i <= PLAYER_MOVES.length && i <= 5; i++){
        document.getElementById("last_" + i).innerHTML = PLAYER_MOVES[PLAYER_MOVES.length -i].toUpperCase() 
                                                        + "  vs  " 
                                                        + AI_MOVES[AI_MOVES.length - i].toUpperCase();
    }

    PLAYER_MOVES.push(player_choice);
    AI_MOVES.push(ai_choice);

    // Update Round 
    ROUND++;
    document.getElementById("round").innerHTML = "ROUND " + ROUND;

    // Update Scores
    document.getElementById("player_score").innerHTML = SCORES.WIN;
    document.getElementById("tie").innerHTML = SCORES.TIE;
    document.getElementById("ai_score").innerHTML = SCORES.LOSE;


    // Update Player image
    document.getElementById("user_play").src = "static/images/rest.png"
    sleep(100).then(() => { document.getElementById("user_play").src = "static/images/" + player_choice + ".png"; });

    // Update AI image
    document.getElementById("ai_play").src = "static/images/rest_ai.png";
    sleep(100).then(() => { document.getElementById("ai_play").src = "static/images/" + ai_choice +"_ai" + ".png"; });

    // Update Result message
    if (decision == "WIN"){
        document.getElementById("result_message").innerHTML = "You Won!";
        document.getElementById("result_message").style = "color:#51ff00";
    }

    if (decision == "LOSE"){
        document.getElementById("result_message").innerHTML = "You Lost!";
        document.getElementById("result_message").style = "color:#ff0000";

    }

    if (decision == "TIE"){
        document.getElementById("result_message").innerHTML = "Ahh! that's a Tie";
        document.getElementById("result_message").style = "color:#ffee00";

    }


}



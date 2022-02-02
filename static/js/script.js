



// Choises that the user and AI can make
const CHOICES = ["scissor", "rock", "paper"];
// Possible game results.
const DECISION = ["TIE", "WIN", "LOSE"];
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

// Delay inbetween plays
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

// This function checks player choice and AI choice, and returns the winner.
// (0: TIE, 1: WIN, 2: LOSE)
function decideWinner(player_choice, ai_choice){
    // TIE situation
    if (player_choice == ai_choice) return 0;

    // Player win situations
    if (player_choice == "rock" && ai_choice == "scissor") return 1;
    if (player_choice == "paper" && ai_choice == "rock") return 1;
    if (player_choice == "scissor" && ai_choice == "paper") return 1;

    // Player lose situations
    if (player_choice == "scissor" && ai_choice == "rock") return 2;
    if (player_choice == "rock" && ai_choice == "paper") return 2;
    if (player_choice == "paper" && ai_choice == "scissor") return 2;

}

// main function
function rpsGame(userInput){

    // Get the user choice from the button clicked
    var player_choice = document.getElementById(userInput.id).id;

    // Generate a random choice for the AI 
    const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
    var ai_choice = CHOICES[random(0, 3)];

    // Decide the winner based on the CHOICES (0: TIE, 1: WIN, 2: LOSE)
    var winner = decideWinner(player_choice, ai_choice)

    console.log(winner);


    // Increament the score with corresponding result
    SCORES[DECISION[winner]]++;


    // console.log("PLAYER: " , player_choice,"AI: " , ai_choice)
    // console.log("Decision: ", DECISION[winner]);
    // console.log("Score: ", SCORES[DECISION[winner]]);

    // Store player and AI CHOICES
    // if (PLAYER_MOVES.length >= 1){

    //         console.log("Last Move: ", PLAYER_MOVES.slice(-1)[0])
    //     }

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
    if (winner == 1){
        document.getElementById("result_message").innerHTML = "You Won!";
        document.getElementById("result_message").style = "color:#51ff00";
    }

    if (winner == 2){
        document.getElementById("result_message").innerHTML = "You Lost!";
        document.getElementById("result_message").style = "color:#ff0000";

    }

    if (winner == 0){
        document.getElementById("result_message").innerHTML = "Ahh! that's a Tie";
        document.getElementById("result_message").style = "color:#ffee00";

    }

    

}


// freq_dist_win = { 'rr': 1, 'rp': 1, 'rs': 1, 'pr': 1, 'pp': 1, 'ps': 1, 'sr': 1, 'sp': 1, 'ss': 1 }
// freq_dist_lose = { 'rr': 1, 'rp': 1, 'rs': 1, 'pr': 1, 'pp': 1, 'ps': 1, 'sr': 1, 'sp': 1, 'ss': 1 }
// freq_dist_tie = { 'rr': 1, 'rp': 1, 'rs': 1, 'pr': 1, 'pp': 1, 'ps': 1, 'sr': 1, 'sp': 1, 'ss': 1 }

// transition_win = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
// transition_lose = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
// transition_tie = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

// console.log(transition_lose);
// Choises that the user and AI can make
const CHOICES = ["rock", "paper", "scissor"];
// Store the scores of all the rounds.
const SCORES = {"TIE" : 0, "WIN" : 0, "LOSE" : 0};
// Store the results of all rounds.
const RESULTS = [];
// store all the moves player makes.
const PLAYER_MOVES = [];
// Store all the moves AI makes.
const AI_MOVES = [];
// Keep track of round.
var ROUND = 0;

// Frequency distribution of player choosing next move,
// if the player had won the previous round.
const FREQ_DIST_WIN = {
    'rockrock'   : 1, 'rockpaper'   : 1, 'rockscissor'   : 1,
    'paperrock'  : 1, 'paperpaper'  : 1, 'paperscissor'  : 1, 
    'scissorrock': 1, 'scissorpaper': 1, 'scissorscissor': 1, 
}

// Frequency distribution of player choosing next move,
// if the player had lost the previous round.
const FREQ_DIST_LOSE = {
    'rockrock'   : 1, 'rockpaper'   : 1, 'rockscissor'   : 1,
    'paperrock'  : 1, 'paperpaper'  : 1, 'paperscissor'  : 1,
    'scissorrock': 1, 'scissorpaper': 1, 'scissorscissor': 1, 
}

// Frequency distribution of player choosing next move,
// if the previous round was a tie.
const FREQ_DIST_TIE = {
    'rockrock'   : 1, 'rockpaper'   : 1, 'rockscissor'   : 1,
    'paperrock'  : 1, 'paperpaper'  : 1, 'paperscissor'  : 1,
    'scissorrock': 1, 'scissorpaper': 1, 'scissorscissor': 1, 
}

// Index of choise. Will be helpful later on.
const INDEX = {
    "rock" : 0,
    "paper" : 1,
    "scissor" : 2
}

// Transition Probablities gives the probablity of transition
// from one state to the other state. In this case, the probablity
// of player choosing next more based on the previous move.
//     r  p  s
//  r [0, 0, 0]
//  p [0, 0, 0]  
//  s [0, 0, 0]

// The transition probablities of states if the player had won the previous round.
var TRANSITION_WIN = [ 
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


function updateFreqDist(previous_choice, current_choice, previous_result){

    // If the player had won, lost or tied the previous round,
    // increment the frequency of subsequent player moves. 
    if (previous_result == "WIN"){
        FREQ_DIST_WIN[previous_choice + current_choice]++;
    }

    if (previous_result == "LOSE"){
        FREQ_DIST_LOSE[previous_choice + current_choice]++;
    }

    if (previous_result == "TIE"){
        FREQ_DIST_TIE[previous_choice + current_choice]++;
    }
}

function updateTransitionTable(previous_result){
    // Build transition table if player won the previous round.
    if (previous_result == "WIN"){
        let rock = FREQ_DIST_WIN['rockrock'] + FREQ_DIST_WIN['rockpaper'] + FREQ_DIST_WIN['rockscissor'];
        let paper = FREQ_DIST_WIN['paperrock'] + FREQ_DIST_WIN['paperpaper'] + FREQ_DIST_WIN['paperscissor'];
        let scissor = FREQ_DIST_WIN['scissorrock'] + FREQ_DIST_WIN['scissorpaper'] + FREQ_DIST_WIN['scissorscissor'];
        for (let row = 0; row < 3; row++){
            for (let col = 0; col < 3; col++){
                let current_freq = FREQ_DIST_WIN[CHOICES[row] + CHOICES[col]];
                if (row == 0)
                    TRANSITION_WIN[row][col] = current_freq / rock;

                if (row == 1)
                    TRANSITION_WIN[row][col] = current_freq / paper;

                if (row == 2)
                    TRANSITION_WIN[row][col] = current_freq / scissor;
            }
        }
        // return TRANSITION_WIN;
    }
    
    // Build transition table if player lost the previous round.
    else if (previous_result == "LOSE"){
        let rock = FREQ_DIST_LOSE['rockrock'] + FREQ_DIST_LOSE['rockpaper'] + FREQ_DIST_LOSE['rockscissor'];
        let paper = FREQ_DIST_LOSE['paperrock'] + FREQ_DIST_LOSE['paperpaper'] + FREQ_DIST_LOSE['paperscissor'];
        let scissor = FREQ_DIST_LOSE['scissorrock'] + FREQ_DIST_LOSE['scissorpaper'] + FREQ_DIST_LOSE['scissorscissor'];
        for (let row = 0; row < 3; row++){
            for (let col = 0; col < 3; col++){
                let current_freq = FREQ_DIST_LOSE[CHOICES[row] + CHOICES[col]];
                if (row == 0)
                    TRANSITION_LOSE[row][col] = current_freq / rock;

                if (row == 1)
                    TRANSITION_LOSE[row][col] = current_freq / paper;

                if (row == 2)
                    TRANSITION_LOSE[row][col] = current_freq / scissor;
            }
        }
        // return TRANSITION_LOSE;
    }
    
    // Build transition table if previous result was a tie.
    else {
        let rock = FREQ_DIST_TIE['rockrock'] + FREQ_DIST_TIE['rockpaper'] + FREQ_DIST_TIE['rockscissor'];
        let paper = FREQ_DIST_TIE['paperrock'] + FREQ_DIST_TIE['paperpaper'] + FREQ_DIST_TIE['paperscissor'];
        let scissor = FREQ_DIST_TIE['scissorrock'] + FREQ_DIST_TIE['scissorpaper'] + FREQ_DIST_TIE['scissorscissor'];
        for (let row = 0; row < 3; row++){
            for (let col = 0; col < 3; col++){
                let current_freq = FREQ_DIST_TIE[CHOICES[row] + CHOICES[col]];
                if (row == 0)
                    TRANSITION_TIE[row][col] = current_freq / rock;

                if (row == 1)
                    TRANSITION_TIE[row][col] = current_freq / paper;

                if (row == 2)
                    TRANSITION_TIE[row][col] = current_freq / scissor;
            }
        }
        // return TRANSITION_TIE;
    }
}

// Check the player and AI choice and decide the winner.
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

// Delay inbetween plays
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

// main function
function gamePlay(userInput){

    // Get the player choice from the button clicked
    var player_choice = document.getElementById(userInput.id).id;
    var ai_choice;
    var decision;
    var transition_table = FREQ_DIST_LOSE
    var predicted_probablities ;
    

    // For first round, generate a random choice for AI.

    if (PLAYER_MOVES.length == 0){
        const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
        ai_choice = CHOICES[random(0, 3)];
        decision = decideWinner(player_choice, ai_choice);
    }

    // For later rounds, predict the player choice and play the move that counteracts the player choice..
    if (PLAYER_MOVES.length > 0){

        let previous_choice = PLAYER_MOVES.slice(-1)[0];
        let previous_result = RESULTS.slice(-1)[0];
        if (PLAYER_MOVES.length == 1)
            var predicted_probablities = [1/3, 1/3, 1/3]; // Equal probablities

        // Predicted next moves based on the previous move. (Markov Property)
        else if (previous_result == "WIN")
            predicted_probablities = TRANSITION_WIN[INDEX[previous_choice]];
        else if (previous_result == "LOSE")
            predicted_probablities = TRANSITION_LOSE[INDEX[previous_choice]];
        else 
            predicted_probablities = TRANSITION_TIE[INDEX[previous_choice]];

        // Get the index of move with highest probablity
        var predicted_move = predicted_probablities.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
        // If the predicted move is ROCK, play PAPER to counteract
        if (predicted_move == 0)
            ai_choice = 'paper';
        // If the predicted move is PAPER, play SCISSOR to counteract
        else if (predicted_move == 1)
            ai_choice = 'scissor';
        // If the predicted move is SCISSOR, play ROCK to counteract
        else
            ai_choice = 'rock';

        // Decide the winner.
        decision = decideWinner(player_choice, ai_choice)

        // Update the Frequency distribution table.
        // EX: When previous result was WIN and previous player choice
        // was rock, then update what the player chose to play for current move.
        updateFreqDist(previous_choice, player_choice, previous_result);
        // Update the transition probablities. 
        transition_table = updateTransitionTable(previous_result);
        // console.log(predicted_probablities)

    }

    // Increament the score with corresponding result. 
    SCORES[decision]++;
    RESULTS.push(decision);


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
        document.getElementById("result_message").innerHTML = "You Lost, AI Won!";
        document.getElementById("result_message").style = "color:#ff0000";

    }

    if (decision == "TIE"){
        document.getElementById("result_message").innerHTML = "Ahh! that's a Tie";
        document.getElementById("result_message").style = "color:#ffee00";

    }

    var win_precentage = SCORES.WIN / (SCORES.WIN + SCORES.LOSE + SCORES.TIE);
    var lose_precentage = SCORES.LOSE / (SCORES.WIN + SCORES.LOSE + SCORES.TIE);
    var tie_precentage = SCORES.TIE / (SCORES.WIN + SCORES.LOSE + SCORES.TIE);

}

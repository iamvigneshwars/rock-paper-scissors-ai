# rock-paper-scissors

This AI is built using Markov Chain model. It predicts your next move and plays the move that counteracts your move. The prediction of your next move is only bases on your last move (markov property). The AI keeps track of three transition tables, WIN, LOSE and TIE. Each table records your moves based on your previous round result and previous move, i.e, if you have won the previous round, and your current move is rock, then the frequency of rockrock will be updated in WIN transition table. In simple terms this means you played rock in previous round, you won previous round and you chose to play rock as current move. 

To make predictions, the AI can simply look up the transition tables based on your last move and last round result and return the probablities. If the predicted probablity for your next move is high for rock, then the AI plays paper, if the probablity is high for paper, then the the AI plays scissors, if the probablity is high go scissors, then the AI plays rock. The AI gets better as you play more rounds with it (AI has to learn your pattern). Give it a try, you will be amazed! 

## Demo

<p align="center">
    <img src = '/static/images/rsp.gif' alt='animated' />
</p>

[Play the Game](https://iamvigneshwars.github.io/rock-paper-scissors/)
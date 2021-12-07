'use strict';


// Selecting Elements 
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');

//Player Elements
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')
const player0Score = document.getElementById('score--0');
const player1Score = document.getElementById('score--1');




// Button Elements
const btnNewEl = document.querySelector('.btn--new')
const btnRollEl = document.querySelector('.btn--roll')
const btnholdEl = document.querySelector('.btn--hold')

//Starting Conditions
score0El.textContent = 0;
score1El.textContent = 0; 
diceEl.classList.add('hidden');

let scores = [0,0];
let currentTotal = 0;
let activePlayer = 0;
let playing = true;

// Reset Game
const resetGame = () => {
    playing = true;
    player0Score.textContent = 0;
    player1Score.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    diceEl.classList.add('hidden');
    currentTotal = 0;
    scores = [0,0];
};
// Switch player 
const switchPlayer = () => {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentTotal = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

// Check Winner
const checkWinner = () => {
    if (playing){
        // Add current score to global score of active player
        scores[activePlayer] += currentTotal;
        console.log(scores[activePlayer], 'total scores');
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        // Check Score if > 100; then, end game else; switch palyer
        if (scores[activePlayer] >= 20) {
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }
        else {
            switchPlayer();
        }
    }
};

// Roll Dice
const rollDice = () => {
    if (playing) {
        //Generating a random Dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
    
        //Display dice
        diceEl.classList.remove ('hidden');
        diceEl.src = `dice-${dice}.png`;
    
        if (dice !== 1) {
            currentTotal += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentTotal;
            console.log('Player:', activePlayer, 'with', currentTotal);
        }
        else {
            // Switch Player
            switchPlayer();
        }
    }
}


//Rolling Dice Functionality 
btnRollEl.addEventListener('click', () => {
    rollDice();
});

// Hold Dice Funcationality
btnholdEl.addEventListener('click', () => {
    checkWinner();
});

//Reseting the game
btnNewEl.addEventListener('click', () => {
    resetGame();
});
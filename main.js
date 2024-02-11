
// object of images
const pickEmoji = {
    rock: 'images/rock-emoji.png',
    paper: 'images/paper-emoji.png',
    scissors: 'images/scissors-emoji.png',
};

//const pickEmoji = ['images/rock-emoji.png', 'images/paper-emoji.png', 'images/scissors-emoji.png'];

// A scoreboard object
let scoreBoard = JSON.parse(localStorage.getItem('scoreboard')) || {
    playerScore: 0,
    computerScore: 0,
    gameCount: 0,
    ties: 0,
};

// TESTING LOCAL STORAGE
// console.log(JSON.parse(localStorage.getItem('scoreboard')));

// NOTE: USEFUL FOR LOCAL STORAGE IF IT EXIST
// Updates a scoreboard
updateScoreboard();

// A function that returns a pick from the computer
function computerPick() {

    const randomNumber = Math.random();
    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = "rock";
      } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = "paper";
      } else if (randomNumber > 2 / 3 && randomNumber < 1) {
        computerMove = "scissors";
      }

    return computerMove;

}

// A function that returns true if the player won otherwise false
function checkIfPlayerWon(playerPick, computerPick) {

    let playerPickImage = document.querySelector('.js-player-pick');
    let computerPickImage = document.querySelector('.js-computer-pick');

    let isPlayerWin = true;

    // game logic
    if(playerPick === 'rock') {
        if(computerPick === 'paper') {
            scoreBoard.computerScore += 1;
            isPlayerWin = false;
        }
        else if(computerPick === 'scissors') {
            scoreBoard.playerScore += 1;
        }

        else {
            scoreBoard.ties++;
        }
    }

    else if(playerPick === 'paper') {
        if(computerPick === 'scissors') {
            scoreBoard.computerScore += 1;
            isPlayerWin = false;
        }

        else if(computerPick === 'rock') {
            scoreBoard.playerScore += 1;
        }

        else {
            scoreBoard.ties++;
        }
    }

    else {
        if(computerPick === 'rock') {
            scoreBoard.computerScore += 1;
            isPlayerWin = false;
        }
        
        else if(computerPick === 'paper') {
            scoreBoard.playerScore += 1;
        }

        else {
            scoreBoard.ties++;
        }
    }

    // Updates the Pick Emoji Image
    playerPickImage.setAttribute('src', pickEmoji[playerPick]);
    computerPickImage.setAttribute('src', pickEmoji[computerPick]);

    return isPlayerWin; // Returns a boolean result

}

// A function to play the game
function playGame(playerPick) {

    const computerResult = computerPick();
    const isPlayerWin = checkIfPlayerWon(playerPick, computerResult);

    // open result element
    const resultElement = document.querySelector('.js-results');

    console.log(playerPick);
    console.log(computerResult);

    if(isPlayerWin) {
        resultElement.innerHTML = 'Player won';
    }

    else {
        resultElement.innerHTML = 'Computer won';
    }

    // Counts the game
    scoreBoard.gameCount++;

    // Save scoreboard to local storage
    localStorage.setItem('scoreboard', JSON.stringify(scoreBoard));

    // Update the scoreboard
    updateScoreboard();

}

// A function that updates the scoreboard
function updateScoreboard() {
    const playerScoreElement = document.querySelector('.js-player-score');
    const computerScoreElement = document.querySelector('.js-computer-score');
    const tieCountElement = document.querySelector('.js-tie');
    const gameCountElement = document.querySelector('.js-game-count');
    

    playerScoreElement.innerHTML = `Player Score: ${scoreBoard.playerScore}`;
    computerScoreElement.innerHTML = `Computer Score: ${scoreBoard.computerScore}`;
    tieCountElement.innerHTML = `Ties: ${scoreBoard.ties}`;
    gameCountElement.innerHTML = `Game: ${scoreBoard.gameCount}`;
    
}

// A function that resets the game
function resetGame() {

    // Resets scoreboard
    const resultElement = document.querySelector('.js-results');
    scoreBoard.playerScore = 0;
    scoreBoard.computerScore = 0;
    scoreBoard.gameCount = 0;
    scoreBoard.ties = 0;

    resultElement.innerHTML = "";


    // Remove the item from the local storage
    localStorage.removeItem('scoreboard');

    // Update the scoreboard
     updateScoreboard();
}
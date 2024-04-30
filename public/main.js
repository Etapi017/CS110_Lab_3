//DOM Elements
const statusMessage = document.getElementById('statusMessage'); // Element to display game status
const cells = document.querySelectorAll('.cell'); // All cells of the game board
const scoreXElement = document.getElementById('scoreX'); // Element to display X player's score
const scoreOElement = document.getElementById('scoreO'); // Element to display O player's score

let currentPlayer = 'X';
let gameActive = true;// Game activity indicator
let gameState = Array(9).fill('');//Game board
let scoreX = 0;//Score for X
let scoreO = 0;//Score for O

//Display when a cell is clicked
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    clickedCell.classList.add(currentPlayer);
}

//To switch the player and check if it's the computer's turn
function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';//Switch player
    statusMessage.innerText = `It's ${currentPlayer}'s turn`;
    if (currentPlayer === 'O' && gameActive) {
        setTimeout(computerMove, 500); //Delay for computer move
    }
}

//Checks if there is a winner or the game is a draw
function checkWin() {
    const winConditions = [//Winning combinations
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    
    let roundWon = false;
    for (const condition of winConditions) {//Checks winning condition
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true; //Winner
            break;
        }
    }

    if (roundWon) {//If there is a winner
        statusMessage.innerText = `${currentPlayer} Wins!`;
        updateScores();//Updates scores
        gameActive = false;// Game stops
        return;
    }

    if (!gameState.includes('')) {//If all cells are full
        statusMessage.innerText = 'Game ended in a draw!';
        gameActive = false;//Game stops
        return;
    }

    handlePlayerChange();//Switching player's turn
}

// AI chooses a random move
function computerMove() {
    let availableCells = gameState.map((val, idx) => val === '' ? idx : null).filter(val => val !== null);//Get available spaces
    
    if (availableCells.length > 0) {//If there are open spaces
        const randomCellIndex = availableCells[Math.floor(Math.random() * availableCells.length)];// Randomly choose a cell
        handleCellPlayed(cells[randomCellIndex], randomCellIndex);
        checkWin(); // Check if there is a winner
    }
}

//Cell click
cells.forEach((cell, index) => {
    cell.addEventListener('click', function() {
        if (gameState[index] !== '' || !gameActive || currentPlayer === 'O') {
            return; // Do nothing if space is taken, game is over, or it's the computer's turn
        }
        handleCellPlayed(cell, index);
        checkWin();//Check if there is a winner
    });
});

//Reset the game
function resetGame() {
    gameState.fill('');//Clears game board
    cells.forEach(cell => {
        cell.innerHTML = ''; // Clear display
        cell.classList.remove('X', 'O');
    });
    gameActive = true; //Game goes active
    currentPlayer = 'X';
    statusMessage.innerText = "It's X's turn";
    if (currentPlayer === 'O') {
        setTimeout(computerMove, 500);//If it's computer's turn, delay
    }
}

// Update player scores
function updateScores() {
    if (currentPlayer === 'X') {
        scoreX++;//Add 1 to X player's score
    } else {
        scoreO++;//Add 1 to O player's score
    }
    scoreXElement.innerText = scoreX;//Update X score
    scoreOElement.innerText = scoreO;//Update O score
}

//Start a new game
function newGame() {
    gameActive = true;//Game goes active
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusMessage.innerText = `It's ${currentPlayer}'s turn`;//Update status message
    cells.forEach(cell => cell.innerHTML = '');//Clear board
}

document.getElementById('newGame').addEventListener('click', newGame); // New game button
document.getElementById('resetGame').addEventListener('click', resetGame); // Reset game button

//Initialize a new game when the page loads
newGame();//Initializes the game

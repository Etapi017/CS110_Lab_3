const statusMessage = document.getElementById('statusMessage');
const gameBoard = document.getElementById('gameBoard');
const cells = document.querySelectorAll('.cell');
const scoreXElement = document.getElementById('scoreX');
const scoreOElement = document.getElementById('scoreO');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];
let scoreX = 0;
let scoreO = 0;

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusMessage.innerText = `It's ${currentPlayer}'s turn`;
}

function updateScore() {
    scoreXElement.textContent = scoreX;
    scoreOElement.textContent = scoreO;
}

function handleWin(player) {
    statusMessage.innerText = `${player} wins!`;
    if (player === 'X') {
        scoreX++;
    } else {
        scoreO++;
    }
    updateScore();
    gameActive = false;
}

function checkWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    let roundWon = false;
    for (let i = 0; i < winConditions.length; i++) {
        const winCondition = winConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if ([a, b, c].includes('')) continue;
        if (a === b && b === c) {
            roundWon = true;
            handleWin(currentPlayer);
            break;
        }
    }
    if (!roundWon && !gameState.includes('')) {
        statusMessage.innerText = `Game ended in a draw!`;
        gameActive = false;
    }
    if (!roundWon && gameActive) {
        handlePlayerChange();
    }
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }
    handleCellPlayed(clickedCell, clickedCellIndex);
    checkWin();
}

function newGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusMessage.innerText = `It's ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.innerHTML = '');
}

function resetGame() {
    newGame();
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
updateScore();
newGame();

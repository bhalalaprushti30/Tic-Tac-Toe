const board = document.getElementById("board");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let scores = { X: 0, O: 0 };

const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function createBoard() {
    board.innerHTML = "";
    gameBoard.forEach((value, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = index;
        cell.textContent = value;
        cell.addEventListener("click", handleMove);
        board.appendChild(cell);
    });
}

function handleMove(event) {
    const index = event.target.dataset.index;
    if (gameBoard[index] !== "" || checkWinner()) return;
    gameBoard[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add("taken");
    if (checkWinner()) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        scores[currentPlayer]++;
        updateScores();
    } else if (gameBoard.every(cell => cell !== "")) {
        statusText.textContent = "It's a draw!";
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    return winningCombos.some(combo => {
        const [a, b, c] = combo;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function updateScores() {
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
}

resetButton.addEventListener("click", () => {
    gameBoard.fill("");
    currentPlayer = "X";
    statusText.textContent = "Player X's turn";
    createBoard();
});

createBoard();

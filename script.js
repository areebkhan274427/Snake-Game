// Constants for the number of rows and columns in the game board
const numRows = 10;
const numCols = 10;

// Initialize the snake with its starting position (bottom-left corner)
let snake = [
    { row: numRows - 1, col: 0 },
    { row: numRows - 2, col: 0 },
    { row: numRows - 3, col: 0 },
    { row: numRows - 4, col: 0 },
    { row: numRows - 5, col: 0 }
];

// Generate the initial position for the food
function generateFood() {
    let foodRow, foodCol;
    do {
        foodRow = Math.floor(Math.random() * numRows);
        foodCol = Math.floor(Math.random() * numCols);
    } while (snake.some(segment => segment.row === foodRow && segment.col === foodCol));

    return { row: foodRow, col: foodCol };
}

let food = generateFood();

// Initialize the snake's direction
let direction = 'right';

// Create the game board grid by adding cells to the 'game-board' div
function createGameBoard() {
    const gameBoard = document.getElementById('game-board');
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            gameBoard.appendChild(cell);
        }
    }
}

// Update the game state (move the snake, check for collisions, etc.)
function updateGame() {
    let head = { ...snake[0] };
    switch (direction) {
        case 'up':
            head.row--;
            break;
        case 'down':
            head.row++;
            break;
        case 'left':
            head.col--;
            break;
        case 'right':
            head.col++;
            break;
    }

    // Check if the snake eats the food
    if (head.row === food.row && head.col === food.col) {
        // Generate new food in a random location
        food = generateFood();
        // Increase the snake's length
        snake = [head, ...snake];
    } else {
        // Move the snake
        snake = [head, ...snake.slice(0, -1)];
    }

    // Check for collisions with walls or itself
    if (
        head.row < 0 ||
        head.row >= numRows ||
        head.col < 0 ||
        head.col >= numCols ||
        snake.slice(1).some(segment => segment.row === head.row && segment.col === head.col)
    ) {
        clearInterval(gameInterval); // End the game
        alert('Game over!');
    }

    renderGame();
}

// Render the game board (snake, food, and cells)
function renderGame() {
    const gameBoard = document.getElementById('game-board');
    const cells = gameBoard.querySelectorAll('.cell');

    // Clear previous state by removing CSS classes
    cells.forEach(cell => cell.classList.remove('food', 'snake'));

    // Apply CSS classes to cells to display the snake and food
    snake.forEach(segment => {
        const cell = cells[segment.row * numCols + segment.col];
        cell.classList.add('snake');
    });

    const foodCell = cells[food.row * numCols + food.col];
    foodCell.classList.add('food');
}

// Create the game board and start the game loop
createGameBoard();
const gameInterval = setInterval(updateGame, 500);

// Handle player input using event listeners (arrow keys)
document.addEventListener('keydown', event => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction !== 'down') direction = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up') direction = 'down';
            break;
        case 'ArrowLeft':
            if (direction !== 'right') direction = 'left';
            break;
        case 'ArrowRight':
            if (direction !== 'left') direction = 'right';
            break;
    }
});

// reload page
const reload = document.querySelector(".button");
reload.addEventListener("click",()=>{
    location.reload();
})
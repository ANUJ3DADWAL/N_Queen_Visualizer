let animationSpeed = 100;
let solving = false;

async function solveNQueens() {
    if (solving) return;

    const nInput = document.getElementById('nValue');
    const speedInput = document.getElementById('speedValue');
    const n = parseInt(nInput.value);
    const speed = parseInt(speedInput.value);

    // Input validation
    if (isNaN(n) || n <= 0) {
        alert('Please enter a positive integer for N.');
        return;
    }
    if (isNaN(speed) || speed <= 0) {
        alert('Please enter a positive integer for speed.');
        return;
    }

    solving = true;
    animationSpeed = speed;
    const board = Array.from({ length: n }, () => Array(n).fill(0));
    const boardContainer = document.getElementById('board');
    boardContainer.innerHTML = '';
    boardContainer.style.gridTemplateColumns = `repeat(${n}, 50px)`;

    if (await placeQueens(board, 0, n)) {
        console.log('Solved');
    } else {
        alert('No solution found');
    }
    
    solving = false;
}

function isSafe(board, row, col, n) {
    for (let i = 0; i < col; i++) {
        if (board[row][i] === 1) return false;
    }

    // Diagonal Checks.... from top left
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] === 1) return false;
    }

    // Checks from  Bottom left diagonal from the current position  
    for (let i = row, j = col; i < n && j >= 0; i++, j--) {
        if (board[i][j] === 1) return false;
    }

    return true;
}

async function placeQueens(board, col, n) {
    if (col >= n) return true;

    for (let i = 0; i < n; i++) {
        if (isSafe(board, i, col, n)) {
            board[i][col] = 1;
            renderBoard(board);
            await sleep(animationSpeed);

            if (await placeQueens(board, col + 1, n)) {
                return true;
            }

            board[i][col] = 0;
            renderBoard(board);
            await sleep(animationSpeed);
        }
    }

    return false;
}

function renderBoard(board) {
    const n = board.length;
    const boardContainer = document.getElementById('board');
    boardContainer.innerHTML = '';

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if ((i + j) % 2 === 0) {
                cell.classList.add('white');
            } else {
                cell.classList.add('black');
            }
            if (board[i][j] === 1) {
                cell.classList.add('queen');
            }
            boardContainer.appendChild(cell);
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function resetBoard() {
    if (solving) return;
    const boardContainer = document.getElementById('board');
    boardContainer.innerHTML = '';
}

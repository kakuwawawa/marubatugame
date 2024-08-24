const cells = document.querySelectorAll('.cell');
let currentPlayer = '○';
const moves = {'○': [], '×': []};
const maxMoves = 3;
const boardState = Array(9).fill(null);
const messageElement = document.getElementById('message');
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWin(player) {
    return winPatterns.some(pattern => 
        pattern.every(index => boardState[index] === player)
    );
}

function handleClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (boardState[index] !== null) {
        return; // 既に埋まっている場合は何もしない
    }

    if (moves[currentPlayer].length < maxMoves) {
        // マークを置く
        cell.textContent = currentPlayer;
        boardState[index] = currentPlayer;
        moves[currentPlayer].push(index);
    } else {
        // 最も古いマークを消す
        const oldIndex = moves[currentPlayer].shift();
        document.querySelector(`.cell[data-index='${oldIndex}']`).textContent = '';
        boardState[oldIndex] = null;

        // 新しいマークを置く
        cell.textContent = currentPlayer;
        boardState[index] = currentPlayer;
        moves[currentPlayer].push(index);
    }

    // 勝敗判定
    if (checkWin(currentPlayer)) {
        messageElement.textContent = `${currentPlayer} の勝ち!`;
        cells.forEach(cell => cell.removeEventListener('click', handleClick)); // 勝者が決まったらクリックを無効化
        return;
    }

    // 引き分け判定（すべてのセルが埋まっている場合）
    if (boardState.every(cell => cell !== null)) {
        messageElement.textContent = "引き分けです!";
        return;
    }

    // 次のプレイヤーに交代
    currentPlayer = currentPlayer === '○' ? '×' : '○';
}

function resetGame() {
    boardState.fill(null);
    moves['○'] = [];
    moves['×'] = [];
    currentPlayer = '○';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleClick);
    });
    messageElement.textContent = '';
}

// 初期化
cells.forEach(cell => cell.addEventListener('click', handleClick));

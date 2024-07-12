const cells = document.querySelectorAll('.cell');
let currentPlayer = '○';
const moves = {'○': [], '×': []};
const maxMoves = 3;
const boardState = Array(9).fill(null);

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

    // 次のプレイヤーに交代
    currentPlayer = currentPlayer === '○' ? '×' : '○';
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
cell.textContent

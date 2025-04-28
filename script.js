function createPlayer(name) {
    return { "name": name };
}
const createBoard = (function () {
    const board = ["x", "x", "x", "", "", "", "", "", ""];
    return {
        board: board,
        mark: function (index, mark) {
            if (board[index] == "") {
                board[index] = mark;
            }
        }
    };
})();

const checkForWin = (function () {
    const winStatus = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8]];
    return {
        checkWin: function (board) {
            for (const outer of winStatus) {
                let [a, b, c] = outer;
                if (board[a] == "" || board[b] == "" || board[c] == "")
                    continue;
                if (board[a] == board[b] && board[b] == board[c]) {
                    return (`${board[a]} is winner`);
                }
            }
            return null;
        }
    }
})();
console.log("works")
const gameboard = createBoard;
const checker = checkForWin;
console.log(checkForWin.checkWin(gameboard.board));
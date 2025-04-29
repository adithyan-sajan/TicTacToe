
const createBoard = (function () {
    const board = ["", "", "", "", "", "", "", "", ""];
    return {
        board: board,
        ongoing: true,
        mark: function (index, symbol) {
            if (board[index] == "") {
                board[index] = symbol;
                return true;
            }
            else
                return false;
        },
        gameEnd: function () {
            this.ongoing = false;
        }
    };
})();

const checkForWin = (function () {
    const winStatus = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [1, 4, 8], [2, 4, 6]];
    return {
        checkWin: function (gameboard) {
            var boardHasEmpty = 0;
            for (const outer of winStatus) {
                let [a, b, c] = outer;
                // console.log(outer)
                if (gameboard.board[a] == "" || gameboard.board[b] == "" || gameboard.board[c] == "") {
                    boardHasEmpty = 1;
                    continue;
                }

                else if (gameboard.board[a] == gameboard.board[b] && gameboard.board[b] == gameboard.board[c]) {
                    // console.log(gameboard.board[a], gameboard.board[b], gameboard.board[c]);
                    gameboard.gameEnd();
                    return (`${gameboard.board[a]} is winner`);
                }
            }
            if (boardHasEmpty == 0) {
                gameboard.gameEnd();
                return "it is a tie";
            }
        }
    }
})();
function createPlayer(name, symbol) {
    return {
        "name": name,
        "symbol": symbol
    };
}

const gameboard = createBoard;
const checker = checkForWin;

const p1name = prompt("Enter player1 name");
const p1SymbolChoice = prompt("Choose X=1 0=2");
const p2name = prompt("Enter player2 name");

if (p1SymbolChoice == 1) {
    p1Symbol = "X";
    var p2Symbol = "O"
}
else {
    p1Symbol = "O";
    var p2Symbol = "X";
}
player1 = createPlayer(p1name, p1Symbol);
player2 = createPlayer(p2name, p2Symbol);
currentTurn = player1.symbol;

function getPlayerMove() {
    let validMove = false;
    while (!validMove) {
        var index = parseInt(prompt(`${currentTurn} choose your index`));

        if (index < 0 || index > 8) {
            alert("Choose between 0-8");
        }
        else if (gameboard.board[index] !== "") {
            alert("Choose unoccupied square");
        }
        else
            validMove = true;
    }
    return index;
}



while (gameboard.ongoing) {
    // let index = parseInt(prompt(`${currentTurn} choose your index`));
    gameboard.mark(getPlayerMove(), currentTurn);
    currentTurn == "X" ? currentTurn = "O" : currentTurn = "X";
    checker.checkWin(gameboard);
}
console.log(gameboard.board);
console.log(checker.checkWin(gameboard));
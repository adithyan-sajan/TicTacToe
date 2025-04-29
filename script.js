
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
        },
        resetBoard: function () {
            for (let i = 0; i < 9; i++) {
                this.board[i] = "";
            }
        }
    };
})();

const checkForWin = (function () {
    const winStatus = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]];
    return {
        checkWin: function (gameboard) {
            var boardHasEmpty = 0;
            console.log(gameboard.board);
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
                    console.log(outer);
                    return (`${gameboard.board[a]} is winner`);
                }
            }
            if (boardHasEmpty == 0) {
                gameboard.gameEnd();
                return "it is a tie";
            }
            else
                return false;
        }
    }
})();
function createPlayer(name, symbol) {
    return {
        "name": name,
        "symbol": symbol
    };
}

const displayController = (function () {
    return {
        addListener: function (symbol) {
            function handleClick(event) {
                if (event.target.classList.contains('empty')) {
                    console.log(symbol);
                    event.target.textContent = symbol;
                    let index = event.target.dataset.index;
                    gameboard.mark(index, symbol);
                    event.target.classList.remove("empty");
                    gridContainerEL.removeEventListener("click", handleClick);

                    console.log(gameboard.board)
                    result = checker.checkWin(gameboard);


                    if (result !== false) {
                        console.log(checker.checkWin(gameboard));
                        alert(checker.checkWin(gameboard));
                    }
                    else
                        gameState.playRound();
                }
            }
            const gridContainerEL = document.querySelector(".grid-container");
            gridContainerEL.addEventListener("click", handleClick);
        },
        clearGrids: function () {
            const boxes = document.querySelectorAll(".grid-element");
            boxes.forEach((item) => {
                item.textContent = "";
                item.classList.add("empty");
            })
        }
    }
}
)();
const stateManager = (function () {
    let symbol;
    return {
        setSymbol: function (symbol) {
            this.symbol = symbol
        },
        getSymbol: function () {
            return this.symbol;
        },
        playRound: function () {
            console.log(symbol);
            displayControl.addListener(this.symbol);
            this.symbol == "X" ? this.symbol = "O" : this.symbol = "X";
        }
    }

})()

// const gameboard = createBoard;
// const checker = checkForWin;
// const displayControl = displayController;
// const p1name = prompt("Enter player1 name");
// const p1SymbolChoice = prompt("Choose X=1 0=2");
// const p2name = prompt("Enter player2 name");

if (p1SymbolChoice == 1) {
    var p1Symbol = "X";
    var p2Symbol = "O"
}
else {
    var p1Symbol = "O";
    var p2Symbol = "X";
}
player1 = createPlayer(p1name, p1Symbol);
player2 = createPlayer(p2name, p2Symbol);
currentTurn = player1.symbol;

const gameState = stateManager;
console.log(currentTurn);
gameState.setSymbol(currentTurn);
gameState.playRound();

function newGame() {
    gameboard.resetBoard();
    displayControl.clearGrids();
    gameState.playRound();
    console.log("newGame");
}
const newGameButton = document.querySelector(".new-game")
newGameButton.addEventListener("click", newGame);
console.log("newGame");









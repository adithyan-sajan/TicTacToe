
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

                    return (gameboard.board[a]);
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
    var score = 0;
    return {
        "name": name,
        "symbol": symbol,
        addScore: function () {
            score = score + 1;
        },
        getScore: function () {
            return score;
        }
    };
}

const displayController = (function () {
    return {
        addListener: function (symbol) {
            function handleClick(event) {
                if (event.target.classList.contains('empty')) {

                    event.target.textContent = symbol;
                    let index = event.target.dataset.index;
                    gameboard.mark(index, symbol);
                    event.target.classList.remove("empty");
                    gridContainerEL.removeEventListener("click", handleClick);


                    result = checker.checkWin(gameboard);


                    if (result !== false) {
                        if (result === player1.symbol) {
                            player1.addScore();
                            setTimeout(() => {
                                alert(`${player1.name} wins`)
                            }, 0);
                        }

                        else if (result === player2.symbol) {
                            player2.addScore();
                            setTimeout(() => {
                                alert(`${player2.name} wins`);
                            }, 0);
                        }
                        else {
                            setTimeout(() => {
                                alert(`Tie`);
                            }, 0);

                        }
                        // console.log(checker.checkWin(gameboard));
                        displayControl.updateScore(player1.getScore(), player2.getScore())


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
        },
        addScorecardName: function (player1name, player2name) {
            const player1 = document.querySelector(".player1");
            player1.textContent = player1name;
            const player2 = document.querySelector(".player2");
            player2.textContent = player2name;
        },
        updateScore: function (player1Score, player2Score) {
            console.log(player1Score);
            const player1ScoreGrid = document.querySelector(".player1-score");
            player1ScoreGrid.textContent = player1Score;
            const player2ScoreGrid = document.querySelector(".player2-score");
            player2ScoreGrid.textContent = player2Score;
        }
    }
}
)();
const stateManager = (function () {
    // let symbol;
    return {
        setSymbol: function (symbol) {
            this.symbol = symbol
        },
        getSymbol: function () {
            return this.symbol;
        },
        playRound: function () {
            displayControl.addListener(this.symbol);
            this.symbol == player1.symbol ? this.symbol = player2.symbol : this.symbol = player1.symbol;
        }
    }

})()

const gameboard = createBoard;
const checker = checkForWin;
const displayControl = displayController;

const p1name = prompt("Enter player1 name");
const p1SymbolChoice = prompt("Choose X=1 0=2");
const p2name = prompt("Enter player2 name");
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


const gameState = stateManager;
gameState.setSymbol(player1.symbol);
displayControl.addScorecardName(player1.name, player2.name);
// displayControl.updateScore(player1.getScore(), player2.getScore())
gameState.playRound();

function newGame() {
    gameboard.resetBoard();
    displayControl.clearGrids();
    gameState.playRound();

}
const newGameButton = document.querySelector(".new-game")
newGameButton.addEventListener("click", newGame);










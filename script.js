console.log("welcome to tic tac toe");


// Audio files for sound effects
let clickSound = new Audio("ting.mp3");
let drawSound=new Audio("drawSound.wav");
let winSound=new Audio("winsound.wav");
let bgMusic=new Audio("bgmusic.mp3");
    bgMusic.play();


// Setting up the game variables
let turn = "X";
let isGameOver = false;

// Function to change the player turn
const changeTurn = () => {
    return turn === "X" ? "O" : "X";
}

// Function to check for a winner
const checkWin = () => {
    let boxes = document.getElementsByClassName("cells");
    let board = Array.from(boxes).map((box) => box.children[0].innerHTML);

    // Winning conditions
    let conditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    // Check if any winning condition has been met
    for (let i = 0; i < conditions.length; i++) {
        let [a, b, c] = conditions[i];
        if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
            return board[a];
        }
    }

    // Check for draw condition
    let emptyBoxes = Array.from(boxes).filter((box) => box.children[0].innerHTML === "");
    if (emptyBoxes.length === 0) {
        return "draw";
    }

    // If no winning or draw condition, return null
    return null;
}

// Function to show the game result
const showResult = (result) => {
    let winningText = document.querySelector(".winning-text");
    let btn = document.querySelector(".btn");

    if (result === "draw") {
        winningText.innerText = "Game Drawn!";
        drawSound.play();
    } else {
        winningText.innerText = `${result} wins!`;
        winSound.play();
    }

    // Show the result screen
    winningText.style.display = "block";

    // Restart the game after 10 seconds
    setTimeout(() => {
        location.reload();
    }, 10000);

    // Add event listener to restart button
    btn.addEventListener("click", () => {
        location.reload();
    });
}

// The main logic of the game
let boxes = document.getElementsByClassName("cells");
Array.from(boxes).forEach((box) => {
    
    let boxText = box.children[0];
    box.addEventListener("click", () => {
        if (!isGameOver && boxText.innerHTML === "") {
            boxText.innerHTML = turn;
            clickSound.play();
            let result = checkWin();
            if (result !== null) {
                isGameOver = true;
                showResult(result);
            } else {
                turn = changeTurn();
                document.querySelector(".info").innerText = `Turn for ${turn}`;
            }
        }
    });
});



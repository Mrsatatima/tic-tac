//engine for TIC TAC

const playerOneEditButton = document.querySelector("#player-1 button");
const playerTwoEditButton = document.querySelector("#player-2 button");
const submitInputName = document.querySelector(".name-input #submit");
const cancelInputName = document.querySelector(".name-input #cancel");
const startGameButton = document.querySelector("#start");
const resetGameButton = document.querySelector(".reset");
const restartGameButton = document.querySelector("#restart");
const playerModeButton = document.querySelector("#player");
const computerModeButton = document.querySelector("#computer");
let playerOneTurn = true;
let computerMode = false;
let gameWin = false;
let gameDraw = false;
let nameofPlayerOne = "Player 1";
let nameofPlayerTwo = "Player 2";
const boardBox = document.querySelector(".board");
const playerScoreBoard = document.querySelector(".player-names");
let randomSelected = [];

const winStructure = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function randomBox(selected) {
  let number = Math.floor(Math.random * 6);
  if (selected.includes(number) || boardBox.children[number].textContent) {
    return randomBox(selected);
  }
  return number;
}
function checkGameWin() {
  for (const win of winStructure) {
    if (
      boardBox.children[win[0]].textContent &&
      boardBox.children[win[1]].textContent &&
      boardBox.children[win[2]].textContent
    ) {
      if (
        boardBox.children[win[0]].children[0].textContent ==
          boardBox.children[win[1]].children[0].textContent &&
        boardBox.children[win[1]].children[0].textContent ==
          boardBox.children[win[2]].children[0].textContent
      ) {
        gameWin = true;
      }
    }
  }
}
function checkDraw() {
  if (gameWin) {
    return false;
  }
  const boardContents = document.querySelectorAll(".board li");
  for (const box of boardContents) {
    if (!box.textContent) {
      return false;
    }
  }
  return true;
}

function startGame() {
  const chooseModePopup = document.querySelector(".mode");
  console.log(chooseModePopup);
  chooseModePopup.classList.add("display-mode");
}

function vsPlayer(event) {
  const playerTwo = document.getElementById("player-2");
  playerTwo.children[1].textContent = "Player name";
  playerTwo.children[3].style.display = "block";
  const vsPlayertarget = event.target;
  const targetParent = vsPlayertarget.parentElement.parentElement;
  playerScoreBoard.classList.add("display-player-names");
  resetGameButton.classList.add("display-reset");
  targetParent.classList.remove("display-mode");
}

function vsComputer(event) {
  computerMode = true;
  const vsPlayertarget = event.target;
  const targetParent = vsPlayertarget.parentElement.parentElement;
  const playerTwo = document.getElementById("player-2");
  playerScoreBoard.classList.add("display-player-names");
  resetGameButton.classList.add("display-reset");
  playerTwo.children[1].textContent = "Computer";
  playerTwo.children[3].style.display = "none";
  targetParent.classList.remove("display-mode");
}

function openInputNamePopup(event) {
  const eventParentID = event.target.parentElement.id;
  const erroMessage = document.getElementById("error-message");

  const InputNamePopup = document.querySelector(".name-input");
  InputNamePopup.classList.add(eventParentID, "display-popup");
  erroMessage.textContent = "";
}

function closeInputNamePopup(event) {
  const inputNamePopup = event.target.parentElement.parentElement;
  const inputField = document.getElementById("player-name");
  inputNamePopup.classList.remove("display-popup", "player-1", "player-2");
}

function addPlayerName(event) {
  const inputNamePopup = event.target.parentElement.parentElement;
  const listOfClass = inputNamePopup.classList;
  const inputField = document.getElementById("player-name");
  const erroMessage = document.getElementById("error-message");
  const playerName = inputField.value;
  const playerOneName = document.querySelector("#player-1 .name");
  const playerTwoName = document.querySelector("#player-2 .name");

  if (!playerName) {
    inputField.required = true;
    erroMessage.textContent = "Input your Name";
  } else {
    console.dir(listOfClass);

    console.log(listOfClass);
    if (listOfClass.contains("player-1")) {
      playerOneName.textContent = playerName;
      nameofPlayerOne = playerName;
    } else {
      playerTwoName.textContent = playerName;
      nameofPlayerTwo = playerName;
    }
    inputNamePopup.classList.remove("display-popup", "player-1", "player-2");
    inputField.value = "";
  }
}

function resetGame(event) {
  const targetButton = event.target;
  const gameBoard = targetButton.parentElement.nextElementSibling;
  const listofBox = gameBoard.querySelectorAll("li");
  for (const box of listofBox) {
    box.textContent = "";
    box.classList.remove("clicked-box");
  }
  gameBoard.classList.add("display-gameboard");
  targetButton.textContent = "Reset Board";
  playerOneTurn = true;
  gameWin = false;
  gameDraw = false;
}

function restartGame(event) {
  const targetButton = event.target;
  const gameBoard = document.querySelector("#game-board");
  const listofBox = gameBoard.querySelectorAll("li");
  const grandParentElement = targetButton.parentElement.parentElement;
  for (const box of listofBox) {
    box.textContent = "";
    box.classList.remove("clicked-box");
  }
  grandParentElement.classList.remove("display-win");
  playerOneTurn = true;
  gameWin = false;
  gameDraw = false;
}

function playerBoardInput(event) {
  boxClicked = event.target;
  const newPElement = document.createElement("p");

  if (!boxClicked.textContent) {
    if (playerOneTurn) {
      newPElement.textContent = "X";
      boxClicked.classList.add("clicked-box");
      boxClicked.append(newPElement);
      playerOneTurn = false;
    } else {
      newPElement.textContent = "O";
      boxClicked.classList.add("clicked-box");
      boxClicked.append(newPElement);
      playerOneTurn = true;
    }
  }
  if (computerMode && !playerOneTurn) {
    console.log(computerMode);
    indx = randomBox(randomSelected);
    boardBox.children[indx].click();
    randomSelected.append(indx)
  }
  checkGameWin();
  if (gameWin) {
    const winDropDown = document.querySelector(".win");
    const winText = document.querySelector(".end-game h4");

    if (playerOneTurn) {
      let congratstext = nameofPlayerTwo + " wins";
      winText.textContent = congratstext;
    } else {
      let congratstext = nameofPlayerOne + " wins";
      winText.textContent = congratstext;
    }
    winDropDown.classList.add("display-win");
  }
  gameDraw = checkDraw();
  if (gameDraw) {
    const winDropDown = document.querySelector(".win");
    const winText = document.querySelector(".end-game h4");
    winText.textContent = "Its a Draw...";
    winDropDown.classList.add("display-win");
  }
}

playerModeButton.addEventListener("click", vsPlayer);
computerModeButton.addEventListener("click", vsComputer);
playerOneEditButton.addEventListener("click", openInputNamePopup);
playerTwoEditButton.addEventListener("click", openInputNamePopup);
cancelInputName.addEventListener("click", closeInputNamePopup);
submitInputName.addEventListener("click", addPlayerName);
startGameButton.addEventListener("click", startGame);
resetGameButton.addEventListener("click", resetGame);
restartGameButton.addEventListener("click", restartGame);
boardBox.addEventListener("click", playerBoardInput);

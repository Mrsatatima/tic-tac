//engine for TIC TAC

const playerOneEditButton = document.querySelector("#player-1 button");
const playerTwoEditButton = document.querySelector("#player-2 button");
const submitInputName = document.querySelector(".name-input #submit");
const cancelInputName = document.querySelector(".name-input #cancel");
const startGameButton = document.querySelector("#game-board button");
let playerOneTurn = true;
let gameWin = false
let gameDraw = false
const boardBox = document.querySelector(".board") 

const winStructure = [[0,1,2],[3,4,5],
                      [6,7,8],[0,3,6],
                      [1,4,7],[2,5,8],
                      [0,4,8],[2,4,6]]

function checkGameWin(){
    for (const win of winStructure) {
        if (boardBox.children[win[0]] && boardBox.children[win[1]] && boardBox.children[win[2]]){
            gameWin = boardBox.children[win[0]].children[0]==boardBox.children[win[1]].children[0]==boardBox.children[win[2]].children[0]
        }   
    }
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
    } else {
      playerTwoName.textContent = playerName;
    }
    inputNamePopup.classList.remove("display-popup", "player-1", "player-2");
    inputField.value = "";
  }
}

function startGame(event) {
  const targetButton = event.target;
  console.dir(targetButton);
  const gameBoard = targetButton.nextElementSibling;
  const listofBox = gameBoard.querySelectorAll("li")
  for (const box of listofBox){
      box.textContent =""
      box.classList.remove("clicked-box")
  }
  gameBoard.classList.add("display-gameboard");
}

function playerBoardInput(event){
    boxClicked = event.target
    const newPElement = document.createElement("p")
    if (gameWin){
        winDropDown = document.querySelector(".win")
        winDropDown.classList.add("display-win")
    }
    if (!boxClicked.textContent){

        if (playerOneTurn){
            newPElement.textContent = "X"
            boxClicked.classList.add("clicked-box")
            boxClicked.append(newPElement)
            playerOneTurn = false
        }else{
            newPElement.textContent = "O"
            boxClicked.classList.add("clicked-box")
            boxClicked.append(newPElement)
            playerOneTurn = true
            
        }
    }
}
playerOneEditButton.addEventListener("click", openInputNamePopup);
playerTwoEditButton.addEventListener("click", openInputNamePopup);
cancelInputName.addEventListener("click", closeInputNamePopup);
submitInputName.addEventListener("click", addPlayerName);
startGameButton.addEventListener("click", startGame);

boardBox.addEventListener("click", playerBoardInput)

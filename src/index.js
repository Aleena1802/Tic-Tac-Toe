function Player(name, symbol) {
  let score = 0;
  const getScore = () => score;
  const incrementScore = () => score++;
  return { name, symbol, getScore, incrementScore };
}

const Game = (function () {
  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  const player1 = Player("alina", "X");
  const player2 = Player("zara", "O");

  function player1MarkPosition(position) {
    if (gameBoard[position] == "") {
      this.gameBoard.splice(position, 1, "X"); //remove available position from board
      return true; //ensure that choice is made on empty cell
    }
  }

  function player2MarkPosition(position) {
    if (gameBoard[position] == "") {
      this.gameBoard.splice(position, 1, "O"); //remove available position from board
      return true;
    }
  }

  //2d matrix of all the winning positions
  const correctPositions = [
    [0, 4, 8],
    [0, 1, 2],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];

  function checkWinner() {
    for (let i = 0; i < correctPositions.length; i++) {
      var player1Counter = 0;        //no. of times a player chooses a position
      var player2Counter = 0;
      for (let j = 0; j < correctPositions[i].length; j++) {
        let index = correctPositions[i][j];
        if (this.gameBoard[index] == "X") {
          player1Counter++; //if player matches the position their count increments
          console.log("index: " + index + " counter: "+ player1Counter);
        } else if (this.gameBoard[index] == "O") {
          player2Counter++;
        }
      }
      if(player1Counter==3){
        break;
      }
      else if(player2Counter==3){
        break;
    }
    }
    if (player1Counter == 3) {
      //if player matches all three positions in one array they win
      return player1.name;
    } else if (player2Counter == 3) {
      return player2.name;
    } else{
      return "tie";
    }
  }

  return {
    gameBoard,
    player1,
    player2,
    player1MarkPosition,
    player2MarkPosition,
    checkWinner,
  };
})();

//allows players to take turns
let player1_turn = true;
let player2_turn=true;

function displayChoice(e) {
  if (player1_turn) {
    if(Game.player1MarkPosition(e.target.id)){ //until choice is not made cannot change status of turns
    player1_turn=false;
    player2_turn=true;
    }
  }
  if(player2_turn){
    if(Game.player2MarkPosition(e.target.id)){
    player2_turn=false;
    player1_turn=true;
    }
  }

  const grid = Array.from(document.querySelectorAll(".div"));
  const board = Game.gameBoard;
  for (let i = 0; i < grid.length; i++) {
    grid[i].innerText = board[i];
  }
  console.log(board);
  const array_of_results=[];
  array_of_results.push(Game.checkWinner());
  const result=document.querySelector('.result');

  //check for winner after every turn
  displayWinner(array_of_results, result);

  //display tie if no winner
  if (!grid.some(elem => elem.innerText === "")) {
    result.innerText = "tie";
}


  
}

//gets all the divs in grid and attaches displayChoice function to display symbols for each player
const buttons = Array.from(document.querySelectorAll(".div"));
buttons.forEach((elem) => {
  elem.addEventListener("click", displayChoice);
});

function displayWinner(array_of_results, result){
    if(array_of_results.includes(Game.player1.name)||array_of_results.includes(Game.player2.name)){
        buttons.forEach((elem)=>{
            elem.removeEventListener('click', displayChoice); //once winner found stop the game
        })
    }
    if(array_of_results.includes(Game.player1.name)){
        Game.player1.incrementScore();
      result.innerText="Winner is "+Game.player1.name + " " + Game.player1.getScore();
    }
    else if(array_of_results.includes(Game.player2.name)){
        Game.player2.incrementScore();
      result.innerText="Winner is "+Game.player2.name+" " + Game.player2.getScore();
    }
 
}


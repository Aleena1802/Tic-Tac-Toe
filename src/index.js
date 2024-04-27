function Player(name, symbol) {
  let score = 0;
  const getScore = () => score;
  const incrementScore = () => score++;
  return { name, symbol, getScore, incrementScore };
}

const Game = (function () {
  let gameBoard = ['X','O','O','O','O','X','X','X','X'];
  const player1 = Player("alina", 'X');
  const player2 = Player("zara", 'O');

  function player1MarkPosition(position) {
    this.gameBoard.splice(position, 1,'X'); //remove available position from board
  }

  function player2MarkPosition(position) {
    this.gameBoard.splice(position, 1,'O'); //remove available position from board
  }

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
    for(let i=0; i<correctPositions.length; i++){
        var player1Counter=0;
        var player2Counter = 0;
        for(let j=0; j<correctPositions[i].length; j++){
            let index=correctPositions[i][j];
            if(this.gameBoard[index]=='X'){
                player1Counter++;
                console.log("player1Counter: "+ player1Counter);
                console.log("index: "+ index);
            }
            else if(this.gameBoard[index]=='O'){
                player2Counter++;
                console.log("player2counter: "+ player2Counter);
                console.log("index: "+ index);
            }
        }
        
    }
    if(player1Counter==3){
        return player1.name;
    }
    else if(player2Counter==3){
        return player2.name;
    }
    else if(player1Counter==player2Counter){
        return "tie";
    }
  }

 

  return {
    gameBoard,
    player1,
    player2,
    checkWinner
  };
})();

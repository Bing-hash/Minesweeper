class Cell {
  constructor(gameboard, x, y) {
    this.gameboard = gameboard;
    this.x = x;
    this.y = y;
    this.value = gameboard[x][y];
  }
  
  checkMines() {
    if(this.value==1) {
      return 9;
    }
    return countMines(this.gameboard, this.x, this.y);
    
  }
}

function countMines(gameboard, x, y){
  let total=0;
  
  //Top left + Top + Left

  if(x-1 >= 0 && y-1 >= 0) {
    if(gameboard[x-1][y-1] == 1) {
      total++;
    }
    if(gameboard[x][y-1] == 1) {
      total++;
    }
    if(gameboard[x-1][y] == 1) {
      total++;
    }
  }
  
  //Bottom right + Bottom + Right
  if(x+1 < gameboard[0].length && y+1 < gameboard.length) {
    if(gameboard[x+1][y+1] == 1) {
      total++;
    }
    if(gameboard[x][y+1] == 1) {
      total++;
    }
    if(gameboard[x+1][y] == 1) {
      total++;
    }
  }

  
  //Top right
  if(x+1 < gameboard[0].length && y-1 >= 0) {
    if(gameboard[x+1][y-1]){
      total++;
    }
  }
  
  //Bottom left
  if(x-1 >= 0 && y+1 < gameboard.length) {
    if(gameboard[x+1][y-1]){
      total++;
    }
  }
  
  return total
}
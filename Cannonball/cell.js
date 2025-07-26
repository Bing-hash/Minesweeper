class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    // this.cellWidth = cellWidth;
    this.mine = false;
    this.neighborCount = 0;
    this.revealed = false;
    this.flagged = false;
    
  }

  mouseOver(mouseOverX,mouseOverY) {
    return this.x == mouseOverX && this.y == mouseOverY;
  }

  reveal() {
    this.revealed = true;
  }

  flag() {
    if (this.flagged) {
      this.flagged = false;
    } else {
      this.flagged = true;
    }
  }
}

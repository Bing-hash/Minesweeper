class Cell {
  constructor(x, y, cellWidth, painting) {
    this.x = x;
    this.y = y;
    this.cellWidth = cellWidth;
    this.mine = false;
    this.neighborCount = 0;
    this.revealed = false;
    this.flagged = false;
    
    this.painting = painting;
  }

  display() {
    // If the mine is revealed.
    if (this.revealed) {
      // If the cell contains a mine.
      if (this.mine) {
        this.painting.fill("white");
        this.painting.square(
          this.x * this.cellWidth,
          this.y * this.cellWidth,
          this.cellWidth
        );
        this.painting.ellipse(
          this.x * this.cellWidth + this.cellWidth / 2,
          this.y * this.cellWidth + this.cellWidth / 2,
          this.cellWidth / 2
        );
        // If the mine contains no mines, and is neighboring 0 mines.
      } else if (this.neighborCount == 0) {
        this.painting.fill("white");
        this.painting.square(
          this.x * this.cellWidth,
          this.y * this.cellWidth,
          this.cellWidth
        );
        this.painting.fill("black");
        // If the mine contains no mines.
      } else {
        this.painting.fill("white");
        this.painting.square(
          this.x * this.cellWidth,
          this.y * this.cellWidth,
          this.cellWidth
        );
        this.painting.fill("black");
        this.painting.text(
          this.neighborCount,
          this.x * this.cellWidth + this.cellWidth / 2,
          this.y * this.cellWidth + this.cellWidth / 2
        );
      }
      // If the mine is not revealed.
    } else {
      if (this.flagged) {
        this.painting.fill("gray");
        this.painting.square(
          this.x * this.cellWidth,
          this.y * this.cellWidth,
          this.cellWidth
        );

        this.painting.fill("black");
        this.painting.line(
          this.x * this.cellWidth + this.cellWidth / 2,
          this.y * this.cellWidth,
          this.x * this.cellWidth + this.cellWidth / 2,
          this.y * this.cellWidth + this.cellWidth
        );
      } else {
        this.painting.fill("gray");
        this.painting.square(
          this.x * this.cellWidth,
          this.y * this.cellWidth,
          this.cellWidth
        );
      }
    }
  }

  mouseOver(mouseOverX,mouseOverY) {
    console.log(this.x + ' ' + this.y);
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

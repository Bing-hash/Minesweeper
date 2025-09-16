class Cell {
  constructor(x, y, cellWidth) {
    this.x = x;
    this.y = y;
    this.cellWidth = cellWidth;
    this.mine = false;
    this.neighborCount = 0;
    this.revealed = false;
    this.flagged = false;
  }

  display() {
    // If the mine is revealed.
    if (this.revealed) {
      // If the cell contains a mine.
      if (this.mine) {
        fill("white");
        square(
          this.x * this.cellWidth,
          this.y * this.cellWidth,
          this.cellWidth
        );
        ellipse(
          this.x * this.cellWidth + this.cellWidth / 2,
          this.y * this.cellWidth + this.cellWidth / 2,
          this.cellWidth / 2
        );
        // If the mine contains no mines, and is neighboring 0 mines.
      } else if (this.neighborCount == 0) {
        fill("white");
        square(
          this.x * this.cellWidth,
          this.y * this.cellWidth,
          this.cellWidth
        );
        fill("black");
        // If the mine contains no mines.
      } else {
        fill("white");
        square(
          this.x * this.cellWidth,
          this.y * this.cellWidth,
          this.cellWidth
        );
        fill("black");
        text(
          this.neighborCount,
          this.x * this.cellWidth + this.cellWidth / 2,
          this.y * this.cellWidth + this.cellWidth / 2
        );
      }
      // If the mine is not revealed.
    } else {
      if (this.flagged) {
        fill("gray");
        square(
          this.x * this.cellWidth,
          this.y * this.cellWidth,
          this.cellWidth
        );

        fill("black");
        line(
          this.x * this.cellWidth + this.cellWidth / 2,
          this.y * this.cellWidth,
          this.x * this.cellWidth + this.cellWidth / 2,
          this.y * this.cellWidth + this.cellWidth
        );
      } else {
        fill("gray");
        square(
          this.x * this.cellWidth,
          this.y * this.cellWidth,
          this.cellWidth
        );
      }
    }
  }

  mouseOver() {
    return (
      mouseX > this.x * this.cellWidth &&
      mouseX < this.x * this.cellWidth + this.cellWidth &&
      mouseY > this.y * this.cellWidth &&
      mouseY < this.y * this.cellWidth + this.cellWidth
    );
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

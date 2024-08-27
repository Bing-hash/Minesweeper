class Cell {
  constructor(x, y, cellWidth) {
    this.x = x;
    this.y = y;
    this.cellWidth = cellWidth;
    this.mine = false;
    this.neighborCount = 0;
    this.revealed = false;
  }

  display() {
    if (this.revealed) {
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
      } else if (this.neighborCount == 0) {
        fill("white");
        square(
          this.x * this.cellWidth,
          this.y * this.cellWidth,
          this.cellWidth
        );
        fill("black");
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
    } else {
      fill("gray");
      square(this.x * this.cellWidth, this.y * this.cellWidth, this.cellWidth);
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
}

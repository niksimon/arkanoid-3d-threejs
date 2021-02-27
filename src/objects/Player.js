export class Player {
  constructor(speed, width, height, depth, position) {
    this.speed = speed;
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.position = position;
    this.isMovingLeft = false;
    this.isMovingRight = false;
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
  }

  move() {
    if (this.isMovingLeft) {
      this.position.x -= this.speed;
    }
    if (this.isMovingRight) {
      this.position.x += this.speed;
    }
  }

  handleKeyDown(e) {
    if (e.code === "ArrowLeft" || e.key === "ArrowLeft") {
      this.moveLeft = true;
    }
    if (e.code === "ArrowRight" || e.key === "ArrowRight") {
      this.moveRight = true;
    }
  }

  handleKeyUp(e) {
    if (e.code === "ArrowLeft" || e.key === "ArrowLeft") {
      this.moveLeft = false;
    }
    if (e.code === "ArrowRight" || e.key === "ArrowRight") {
      this.moveRight = false;
    }
  }
}

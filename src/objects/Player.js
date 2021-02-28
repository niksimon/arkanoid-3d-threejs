export class Player {
  constructor(speed, width, height, depth, position) {
    this.speed = speed;
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.position = position;
    this.moveLeft = false;
    this.moveRight = false;
    this._obj = null;
  }

  get isMovingLeft() {
    return this.moveLeft;
  }

  get isMovingRight() {
    return this.moveRight;
  }

  set isMovingLeft(moveLeft) {
    this.moveLeft = moveLeft;
  }

  set isMovingRight(moveRight) {
    this.moveRight = moveRight;
  }
}

import * as THREE from "three";
import * as SETUP from "./constants";
import { Player } from "./objects/Player";

// Scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  150
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Player
const player = new Player(0.2, 3, 1, 1, { x: SETUP.SCREEN_MID, y: 0, z: 16 });
const playerObj = new THREE.Mesh(
  new THREE.BoxGeometry(player.width, player.height, player.depth),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
playerObj.position.set(player.position.x, player.position.y, player.position.z);

// Player move handle
const movePlayer = () => {
  if (player.moveLeft) {
    playerObj.position.setX(playerObj.position.x - player.speed);
  }
  if (player.moveRight) {
    playerObj.position.setX(playerObj.position.x + player.speed);
  }
};

const handleKeyDown = (e) => {
  if (e.code === "ArrowLeft" || e.key === "ArrowLeft") {
    player.isMovingLeft = true;
  }
  if (e.code === "ArrowRight" || e.key === "ArrowRight") {
    player.isMovingRight = true;
  }
};

const handleKeyUp = (e) => {
  if (e.code === "ArrowLeft" || e.key === "ArrowLeft") {
    player.isMovingLeft = false;
  }
  if (e.code === "ArrowRight" || e.key === "ArrowRight") {
    player.isMovingRight = false;
  }
};

document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);

// Add player to scene
scene.add(playerObj);

// Bricks
let bricks = [];
const brickGeometry = new THREE.BoxGeometry(
  SETUP.BRICK_WIDTH,
  SETUP.BRICK_HEIGHT,
  SETUP.BRICK_DEPTH
);
const brickMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

for (let i = 0; i < SETUP.BRICKS_ROWS; i++) {
  for (let j = 0; j < SETUP.BRICKS_COLS; j++) {
    const brickObj = new THREE.Mesh(brickGeometry, brickMaterial);
    brickObj.position.set(
      j * (SETUP.BRICK_WIDTH + SETUP.BRICK_PADDING),
      0,
      i * (SETUP.BRICK_DEPTH + SETUP.BRICK_PADDING)
    );
    bricks.push(brickObj);
    scene.add(brickObj);
  }
}

// Ball
const ballGeometry = new THREE.SphereGeometry(0.5, 20, 20);
const ballMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff });
const ball = new THREE.Mesh(ballGeometry, ballMaterial);
ball.position.set(player.position.x, 0, player.position.z - 2);
scene.add(ball);

const ballSpeed = {
  x: 0.15,
  z: -0.15,
};

const moveBall = () => {
  ball.position.setX(ball.position.x + ballSpeed.x);
  ball.position.setZ(ball.position.z + ballSpeed.z);
};

const changeBallXDirection = () => {
  ballSpeed.x = -ballSpeed.x;
};

const changeBallZDirection = () => {
  ballSpeed.z = -ballSpeed.z;
};

// Camera position
camera.position.x = SETUP.SCREEN_MID;
camera.position.y = 10;
camera.position.z = 26;

camera.rotation.x = -0.6;
camera.rotation.y = 0;
camera.rotation.z = 0;

const animate = function () {
  requestAnimationFrame(animate);

  // Move player with arrow keys
  if (
    (player.isMovingLeft && playerObj.position.x >= SETUP.BOUNDARY_LEFT) ||
    (player.isMovingRight &&
      playerObj.position.x <=
        SETUP.BOUNDARY_RIGHT - player.width + SETUP.BRICK_PADDING)
  ) {
    movePlayer();
  }

  // Move ball
  moveBall();

  // Check if ball is colliding with bricks
  for (let i = 0; i < bricks.length; i++) {
    let brick = bricks[i];
    if (
      ball.position.x <= brick.position.x + SETUP.BRICK_WIDTH &&
      ball.position.x + 1 >= brick.position.x &&
      ball.position.z <= brick.position.z + SETUP.BRICK_HEIGHT &&
      ball.position.z + 1 >= brick.position.z
    ) {
      changeBallZDirection();
      bricks.splice(i, 1);
      scene.remove(brick);
    }
  }

  renderer.render(scene, camera);
};

animate();

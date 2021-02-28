import * as THREE from "three";
import * as SETUP from "./constants";
import { Player } from "./objects/Player";

// Scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 150);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Player
const player = new Player(0.2, 3, 1, 1, { x: SETUP.SCREEN_MID, y: 0, z: 15 });
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
const brickGeometry = new THREE.BoxGeometry(SETUP.BRICK_WIDTH, SETUP.BRICK_HEIGHT, SETUP.BRICK_DEPTH);
const brickMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

for (let i = 0; i < SETUP.BRICKS_ROWS; i++) {
  for (let j = 0; j < SETUP.BRICKS_COLS; j++) {
    const brick = new THREE.Mesh(brickGeometry, brickMaterial);
    brick.position.set(j * (SETUP.BRICK_WIDTH + SETUP.BRICK_PADDING), 0, i * (SETUP.BRICK_DEPTH + SETUP.BRICK_PADDING));
    scene.add(brick);
  }
}

camera.position.x = SETUP.SCREEN_MID;
camera.position.y = 10;
camera.position.z = 26;

camera.rotation.x = -0.6;
camera.rotation.y = 0;
camera.rotation.z = 0;

const animate = function () {
  requestAnimationFrame(animate);

  if (
    (player.isMovingLeft && playerObj.position.x >= SETUP.BOUNDARY_LEFT) ||
    (player.isMovingRight && playerObj.position.x <= SETUP.BOUNDARY_RIGHT - player.width + SETUP.BRICK_PADDING)
  ) {
    movePlayer();
  }

  renderer.render(scene, camera);
};

animate();

import * as THREE from "three";
import * as SETUP from "./constants";
import { Player } from "./objects/Player";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 150);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(SETUP.BRICK_WIDTH, SETUP.BRICK_HEIGHT, SETUP.BRICK_DEPTH);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

// Player
const player = new Player(0.1, 3, 1, 1, { x: 0, y: 0, z: 0 });

// Bricks
for (let i = 0; i < SETUP.BRICKS_ROWS; i++) {
  for (let j = 0; j < SETUP.BRICKS_COLS; j++) {
    const brick = new THREE.Mesh(geometry, material);
    brick.position.set(j * (SETUP.BRICK_WIDTH + SETUP.BRICK_PADDING), 0, i * (SETUP.BRICK_DEPTH + SETUP.BRICK_PADDING));
    scene.add(brick);
  }
}

camera.position.x =
  (SETUP.BRICKS_COLS * SETUP.BRICK_WIDTH + SETUP.BRICKS_COLS * BRICK_PADDING) / 2 -
  SETUP.BRICK_WIDTH / 2 -
  SETUP.BRICK_PADDING / 2;
camera.position.y = 5;
camera.position.z = 20;

camera.rotation.x = -0.5;
camera.rotation.y = 0;
camera.rotation.z = 0;

const animate = function () {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
};

animate();

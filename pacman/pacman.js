// Home Page button logic
document.getElementById("home-page-btn").addEventListener("click", function(){
  window.location.href = "../index.html"; // Redirect to index.html
});

// -----------------------------------------------------------
// PACMAN GAME LOGIC
// -----------------------------------------------------------

const atlas = {
  1: {x:0, y:0},
  2: {x:8, y:0},
  3: {x:16, y:0},
  4: {x:24, y:0},
  5: {x:32, y:0},
  6: {x:40, y:0},
  7: {x:0, y:8},
  8: {x:8, y:8},
  9: {x:16, y:8},
  10: {x:24, y:8},
  11: {x:32, y:8},
  12: {x:40, y:8},
  13: {x:0, y:16},
  14: {x:8, y:16},
  15: {x:16, y:16},
  16: {x:24, y:16},
  17: {x:32, y:16},
  18: {x:40, y:16},
  19: {x:0, y:24},
  20: {x:8, y:24},
  21: {x:16, y:24},
  22: {x:24, y:24},
  23: {x:32, y:24},
  24: {x:40, y:24},
  25: {x:0, y:32},
  26: {x:8, y:32},
  27: {x:16, y:32},
  28: {x:24, y:32},
  29: {x:32, y:32},
  30: {x:40, y:32},
  31: {x:0, y:40},
  32: {x:8, y:40},
  33: {x:16, y:40},
  34: {x:24, y:40},
  35: {x:32, y:40},
  36: {x:40, y:40},
  37: {x:0, y:48},
  38: {x:8, y:48},
  39: {x:16, y:48},
  40: {x:24, y:48}
}

// Important variables [Add more if needed]
let is_alive = true;
let score = 0;
let lives = 3;
 
// Get canvas context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 960;
canvas.height = 992;
ctx.imageSmoothingEnabled = false;

const spriteSheet = new Image();
spriteSheet.src = "../src/pacman/map-frames.png";

// Define the wall map
// 41 - Empty Space 
// 42 - Small Point
// 43 - Big Point
// 44 - Inaccessible
// 45 - Ghosts cage bars
// 46 - Spawn/Fruits

const wallMap = [ 
  [ 2, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 40, 39, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,  1],
  [ 4, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 22, 21, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42,  3],
  [ 4, 42, 20, 13, 13, 19, 42, 20, 13, 13, 13, 19, 42, 22, 21, 42, 20, 13, 13, 13, 19, 42, 20, 13, 13, 19, 42,  3],
  [ 4, 43, 22, 44, 44, 21, 42, 22, 44, 44, 44, 21, 42, 22, 21, 42, 22, 44, 44, 44, 21, 42, 22, 44, 44, 21, 43,  3],
  [ 4, 42, 24, 18, 18, 23, 42, 24, 18, 18, 18, 23, 42, 24, 23, 42, 24, 18, 18, 18, 23, 42, 24, 18, 18, 23, 42,  3],
  [ 4, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42,  3],
  [ 4, 42, 20, 13, 13, 19, 42, 20, 19, 42, 20, 13, 13, 13, 13, 13, 13, 19, 42, 20, 19, 42, 20, 13, 13, 19, 42,  3],
  [ 4, 42, 24, 18, 18, 23, 42, 22, 21, 42, 24, 18, 18, 32, 31, 18, 18, 23, 42, 22, 21, 42, 24, 18, 18, 23, 42,  3],
  [ 4, 42, 42, 42, 42, 42, 42, 22, 21, 42, 42, 42, 42, 22, 21, 42, 42, 42, 42, 22, 21, 42, 42, 42, 42, 42, 42,  3],
  [ 6, 12, 12, 12, 12, 19, 42, 22, 33, 13, 13, 19, 41, 22, 21, 41, 20, 13, 13, 34, 21, 42, 20, 12, 12, 12, 12,  5],
  [44, 44, 44, 44, 44,  4, 42, 22, 31, 18, 18, 23, 41, 24, 23, 41, 24, 18, 18, 32, 21, 42,  3, 44, 44, 44, 44, 44],
  [44, 44, 44, 44, 44,  4, 42, 22, 21, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 22, 21, 42,  3, 44, 44, 44, 44, 44],
  [44, 44, 44, 44, 44,  4, 42, 22, 21, 41, 26, 12, 30, 45, 45, 29, 12, 25, 41, 22, 21, 42,  3, 44, 44, 44, 44, 44],
  [11, 11, 11, 11, 11, 23, 42, 24, 23, 41,  3, 44, 44, 44, 44, 44, 44,  4, 41, 24, 23, 42, 24, 11, 11, 11, 11, 11],
  [41, 41, 41, 41, 41, 41, 42, 41, 41, 41,  3, 44, 44, 44, 44, 44, 44,  4, 41, 41, 41, 42, 41, 41, 41, 41, 41, 41],
  [12, 12, 12, 12, 12, 19, 42, 20, 19, 41,  3, 44, 44, 44, 44, 44, 44,  4, 41, 20, 19, 42, 20, 12, 12, 12, 12, 12],
  [44, 44, 44, 44, 44,  4, 42, 22, 21, 41, 28, 11, 11, 11, 11, 11, 11, 27, 41, 22, 21, 42,  3, 44, 44, 44, 44, 44],
  [44, 44, 44, 44, 44,  4, 42, 22, 21, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 22, 21, 42,  3, 44, 44, 44, 44, 44],
  [44, 44, 44, 44, 44,  4, 42, 22, 21, 41, 20, 13, 13, 13, 13, 13, 13, 19, 41, 22, 21, 42,  3, 44, 44, 44, 44, 44],
  [ 2, 11, 11, 11, 11, 23, 42, 24, 23, 41, 24, 18, 18, 32, 31, 18, 18, 23, 41, 24, 23, 42, 24, 11, 11, 11, 11,  1],
  [ 4, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 22, 21, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42,  3],
  [ 4, 42, 20, 13, 13, 19, 42, 20, 13, 13, 13, 19, 42, 22, 21, 42, 20, 13, 13, 13, 19, 42, 20, 13, 13, 19, 42,  3],
  [ 4, 42, 24, 18, 32, 21, 42, 24, 18, 18, 18, 23, 42, 24, 23, 42, 24, 18, 18, 18, 23, 42, 22, 31, 18, 23, 42,  3],
  [ 4, 43, 42, 42, 22, 21, 42, 42, 42, 42, 42, 42, 42, 46, 46, 42, 42, 42, 42, 42, 42, 42, 22, 21, 42, 42, 43,  3],
  [ 8, 13, 19, 42, 22, 21, 42, 20, 19, 42, 20, 13, 13, 13, 13, 13, 13, 19, 42, 20, 19, 42, 22, 21, 42, 20, 13,  7],
  [10, 18, 23, 42, 24, 23, 42, 22, 21, 42, 24, 18, 18, 32, 31, 18, 18, 23, 42, 22, 21, 42, 24, 23, 42, 24, 18,  9],
  [ 4, 42, 42, 42, 42, 42, 42, 22, 21, 42, 42, 42, 42, 22, 21, 42, 42, 42, 42, 22, 21, 42, 42, 42, 42, 42, 42,  3],
  [ 4, 42, 20, 13, 13, 13, 13, 34, 33, 13, 13, 19, 42, 22, 21, 42, 20, 13, 13, 34, 33, 13, 13, 13, 13, 19, 42,  3],
  [ 4, 42, 24, 18, 18, 18, 18, 18, 18, 18, 18, 23, 42, 24, 23, 42, 24, 18, 18, 18, 18, 18, 18, 18, 18, 23, 42,  3],
  [ 4, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42,  3], 
  [ 6, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,  5],
];

const blockSize = 32; // Block size in pixels
const lines = wallMap.length; // Number of rows
const columns = wallMap[0].length; // Number of columns

// Define the map dimensions and offsets for centering
const mapWidth = columns * blockSize; // Total width of the map
const mapHeight = lines * blockSize; // Total height of the map

const offsetX = (canvas.width - mapWidth) / 2; // X offset to center the map
const offsetY = (canvas.height - mapHeight) / 2; // Y offset to center the map

let gameState = "menu"; // Possible states: "menu", "playing", "paused", "gameover", "win"

function drawGame() {
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i=0; i < lines; i++) {
    for (let j = 0; j < columns; j++) {
      const idBlock = wallMap[i][j];
      if (atlas[idBlock] !== undefined) {
        const snippetX = atlas[idBlock].x;
        const snippetY = atlas[idBlock].y;

        const posX = offsetX + (j * blockSize);
        const posY = offsetY + (i * blockSize);

        ctx.drawImage(
          spriteSheet,
          snippetX, snippetY,
          8, 8,
          posX, posY,
          blockSize, blockSize
        )
      }
    }
  }
}

function drawMenu() {
  // 
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#FFFF00';
  ctx.font = '40px "Press Start 2P"';
  ctx.textAlign = 'center';
  ctx.fillText('Press Enter to Start', canvas.width / 2, canvas.height / 2 - 50);
}

function drawPauseMenu() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'; // Transparent Overlay
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#FFFF00';
  ctx.font = '48px "Press Start 2P"';
  ctx.textAlign = 'center';
  ctx.fillText('Game Paused', canvas.width / 2, canvas.height / 2 - 110);

  ctx.font = '24px "Press Start 2P"';
  ctx.fillText('Press Enter to Resume', canvas.width / 2, canvas.height / 2);
  ctx.fillText('Press Esc to quit', canvas.width / 2, canvas.height / 2 + 50);
}

// Start the game by drawing the menu first
// Wait for the font to load before drawing the menu
document.fonts.ready.then(function() {
  drawMenu();
});

// Listen for keydown events to start/pause/resume the game
window.addEventListener("keydown", function(event) {
  // Menu Options
  if (gameState === "menu") {
    if (event.key === "Enter") {
      gameState = "playing";
      drawGame();
    }
  }
  // Playing Options
  else if (gameState === "playing") {
    if (event.key === "Escape") {
      gameState = "paused";
      drawPauseMenu();
    }
    // TODO: Add motion controls for pacman here (WASD or Arrow Keys)
  }
  // Pause Options
  else if (gameState === "paused") {
    if (event.key === "Escape") {
      gameState = "menu";
      drawMenu();
    }
    else if (event.key === "Enter") {
      gameState = "playing";
      drawGame();
    }
  }
  // Add more if needed
});
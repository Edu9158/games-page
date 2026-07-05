// Home Page button logic
document.getElementById("home-page-btn").addEventListener("click", function(){
  window.location.href = "../index.html"; // Redirect to index.html
});

// -----------------------------------------------------------
// PACMAN GAME LOGIC
// -----------------------------------------------------------

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

// Define the wall map
const wallMap = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
  [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
  [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1],
  [1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1],
  [1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1],
  [0,0,0,0,0,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0],
  [0,0,0,0,0,1,0,1,1,0,1,1,1,3,3,1,1,1,0,1,1,0,1,0,0,0,0,0],
  [1,1,1,1,1,1,0,1,1,0,1,3,3,3,3,3,3,1,0,1,1,0,1,1,1,1,1,1],
  [0,0,0,0,0,0,0,0,0,0,1,3,3,3,3,3,3,1,0,0,0,0,0,0,0,0,0,0],
  [1,1,1,1,1,1,0,1,1,0,1,3,3,3,3,3,3,1,0,1,1,0,1,1,1,1,1,1],
  [0,0,0,0,0,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,0,0,0,0,0],
  [0,0,0,0,0,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0],
  [1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
  [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
  [1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1],
  [1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1],
  [1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1],
  [1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1],
  [1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
  [1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
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
  // TODO: Leave some comments explaining this function better
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < lines; i++) {
    for (let j = 0; j < columns; j++) {
      
      if (wallMap[i][j] === 1) {
        ctx.fillStyle = '#2121DE';
        
        const posX = offsetX + (j * blockSize);
        const posY = offsetY + (i * blockSize);

        ctx.fillRect(posX, posY, blockSize, blockSize);
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
      // TODO: Check if the game will resume from the same state or reset 
      // If it reset do something to fix it
      drawGame();
    }
  }
  // Add more if needed
});
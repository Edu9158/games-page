// Back button logic
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
canvas.height = 720;
ctx.imageSmoothingEnabled = false;

// Define the wall map (temporary one for testing purposes)
// TODO: Change this to the original map latter 
const wallMap = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 0, 1, 1, 0, 1],
    [1, 0, 1, 1, 0, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]

const blockSize = 40; // Block size in pixels
const lines = wallMap.length; // Number of rows
const columns = wallMap[0].length; // Number of columns

// Define the map dimensions and offsets for centering
const mapWidth = columns * blockSize; // Total width of the map
const mapHeight = lines * blockSize; // Total height of the map

const offsetX = (canvas.width - mapWidth) / 2; // X offset to center the map
const offsetY = (canvas.height - mapHeight) / 2; // Y offset to center the map


function gameStart() {
  // TODO: Leave some comments explaining this function better
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < lines; i++) {
    for (let j = 0; j < columns; j++) {
      
      if (wallMap[i][j] === 1) {
        ctx.fillStyle = '#2121DE';
        
        const posX = offsetX + (j * blockSize);
        const posY = offsetY + (i * blockSize);
        
        ctx.fillRect(posX, posY, blockWidth, blockHeight);
      }
      
    }
  }
}

gameStart();

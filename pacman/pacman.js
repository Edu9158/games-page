// Home Page button logic
document.getElementById("home-page-btn").addEventListener("click", function(){
  window.location.href = "../index.html"; // Redirect to index.html
});

// -----------------------------------------------------------
// PACMAN GAME LOGIC
// -----------------------------------------------------------

const mapSprite = new Image();
mapSprite.src = "../src/pacman/map-frames.png";

const pointsSprite = new Image();
pointsSprite.src = "../src/pacman/points/points.png"

const pacmanSprite = new Image();
pacmanSprite.src = "../src/pacman/pacman/pacman.png"

const deadPacmanSprite = new Image();
deadPacmanSprite.src = "../src/pacman/pacman-death.png"

const atlasMap = {
  // Walls
   1: {img: mapSprite, x: 0, y: 0},
   2: {img: mapSprite, x: 8, y: 0},
   3: {img: mapSprite, x:16, y: 0},
   4: {img: mapSprite, x:24, y: 0},
   5: {img: mapSprite, x:32, y: 0},
   6: {img: mapSprite, x:40, y: 0},
   7: {img: mapSprite, x: 0, y: 8},
   8: {img: mapSprite, x: 8, y: 8},
   9: {img: mapSprite, x:16, y: 8},
  10: {img: mapSprite, x:24, y: 8},
  11: {img: mapSprite, x:32, y: 8},
  12: {img: mapSprite, x:40, y: 8},
  13: {img: mapSprite, x: 0, y:16},
  14: {img: mapSprite, x: 8, y:16},
  15: {img: mapSprite, x:16, y:16},
  16: {img: mapSprite, x:24, y:16},
  17: {img: mapSprite, x:32, y:16},
  18: {img: mapSprite, x:40, y:16},
  19: {img: mapSprite, x: 0, y:24},
  20: {img: mapSprite, x: 8, y:24},
  21: {img: mapSprite, x:16, y:24},
  22: {img: mapSprite, x:24, y:24},
  23: {img: mapSprite, x:32, y:24},
  24: {img: mapSprite, x:40, y:24},
  25: {img: mapSprite, x: 0, y:32},
  26: {img: mapSprite, x: 8, y:32},
  27: {img: mapSprite, x:16, y:32},
  28: {img: mapSprite, x:24, y:32},
  29: {img: mapSprite, x:32, y:32},
  30: {img: mapSprite, x:40, y:32},
  31: {img: mapSprite, x: 0, y:40},
  32: {img: mapSprite, x: 8, y:40},
  33: {img: mapSprite, x:16, y:40},
  34: {img: mapSprite, x:24, y:40},
  35: {img: mapSprite, x:32, y:40},
  36: {img: mapSprite, x:40, y:40},
  37: {img: mapSprite, x: 0, y:48},
  38: {img: mapSprite, x: 8, y:48},
  39: {img: mapSprite, x:16, y:48},
  40: {img: mapSprite, x:24, y:48},

  // Points
  42: {img: pointsSprite, x: 0, y: 0},
  43: {img: pointsSprite, x: 0, y: 8}
}

// Important variables [Add more if needed]
let is_alive = true;
let score = 0;
let lives = 3;
 
// Get canvas context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 960;
canvas.height = 1120;
ctx.imageSmoothingEnabled = false;

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

const pacman = {
  x: 13.5,
  y: 23.5,
  speed: 0.15, 
  dirX: 0,
  dirY: 0,
  nextDirX: 0,
  nextDirY: 0,
  frame: 0,
  animDelay: 0,
  angle: 0
}

const pacmanAnim = [
  {img: pacmanSprite, x: 0, y: 0 },   
  {img: pacmanSprite, x: 16, y: 0 },  
  {img: pacmanSprite, x: 0, y: 16 }   
];

let gameState = "menu"; // Possible states: "menu", "playing", "paused", "gameover", "win"

function canWalk(nextX, nextY) {
  const r = 0.41; 

  // Get the grid coordinates for pacman's four corners
  const left = Math.floor(nextX - r);
  const right = Math.floor(nextX + r);
  const top = Math.floor(nextY - r);
  const bottom = Math.floor(nextY + r);

  // Checks if a specific block is a wall or a inacessible area
  function isWall(gX, gY) {
    if (gY < 0 || gY >= lines || gX < 0 || gX >= columns) return true;
    
    const idBlock = wallMap[gY][gX];
    return (idBlock <= 40 || idBlock === 44); 
  }

  // Check the four extremities of the Pac-Man body [HitBox]
  if (isWall(left, top)) return false;      
  if (isWall(right, top)) return false;    
  if (isWall(left, bottom)) return false;  
  if (isWall(right, bottom)) return false;  

  return true; 
}

function update() {
  // Try to turn in the desired direction
  if (pacman.nextDirX !== 0 || pacman.nextDirY !== 0) {
    
    // Rule 1 -> U-turn always permited
    if ((pacman.nextDirX === -pacman.dirX && pacman.dirX !== 0) || 
        (pacman.nextDirY === -pacman.dirY && pacman.dirY !== 0)) {
      pacman.dirX = pacman.nextDirX;
      pacman.dirY = pacman.nextDirY;
    } 
    // Rule 2 -> 90 degree turns (only turn if you are in line with the corridor)
    else {
      // Find out how far Pac-Man is from the exact center of the block
      const distCentroX = Math.abs((pacman.x % 1) - 0.5);
      const distCentroY = Math.abs((pacman.y % 1) - 0.5);
      const margemErro = pacman.speed; 

      // Do you want to turn VERTICAL (you need to be aligned on the X axis to enter the corridor)
      if (pacman.nextDirY !== 0 && distCentroX <= margemErro) {
        const checkY = pacman.y + (pacman.nextDirY * pacman.speed);
        if (canWalk(pacman.x, checkY)) {
          pacman.x = Math.floor(pacman.x) + 0.5; // Align and attach it to the X rail
          pacman.dirX = 0;
          pacman.dirY = pacman.nextDirY;
        }
      }
      // Do you want to turn HORIZONTAL (you need to be aligned on the Y axis to enter the corridor)
      else if (pacman.nextDirX !== 0 && distCentroY <= margemErro) {
        const checkX = pacman.x + (pacman.nextDirX * pacman.speed);
        if (canWalk(checkX, pacman.y)) {
          pacman.y = Math.floor(pacman.y) + 0.5; // Align and attach it to the Y rail
          pacman.dirX = pacman.nextDirX;
          pacman.dirY = 0;
        }
      }
    }
  }

  // Execute the movement
  const nextX = pacman.x + (pacman.dirX * pacman.speed);
  const nextY = pacman.y + (pacman.dirY * pacman.speed);

  if (canWalk(nextX, nextY)) {
    pacman.x = nextX;
    pacman.y = nextY;
  } else {
    // If he hits a wall head on, he stops walking completely
    pacman.dirX = 0;
    pacman.dirY = 0;
  }

  // Only move your mouth if it's actually moving
  if (pacman.dirX !== 0 || pacman.dirY !== 0) {
    
    // Update pacman direction based on the angle (strangely, it is measured in radians)
    if (pacman.dirX === 1) pacman.angle = 0;                           
    else if (pacman.dirY === 1) pacman.angle = Math.PI / 2;            
    else if (pacman.dirX === -1) pacman.angle = Math.PI;               
    else if (pacman.dirY === -1) pacman.angle = -Math.PI / 2;

    pacman.animDelay++;
    
    if (pacman.animDelay > 8) { // Animation speed is actually one image for each 8 frames of the game
      pacman.frame++;
      
      if (pacman.frame > 2) { 
        pacman.frame = 0; 
      }
      pacman.animDelay = 0;
    }
  } else {
    // Personally I've decided to keep his mouth closed when he stops
    pacman.frame = 0;
  }
}

function gameLoop() {
  if (gameState === "playing") {
    update();
    drawGame();

    requestAnimationFrame(gameLoop);
  }
}

function drawGame() {
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i=0; i < lines; i++) {
    for (let j = 0; j < columns; j++) {
      const idBlock = wallMap[i][j];
      if (atlasMap[idBlock] !== undefined) {
        const mapImage = atlasMap[idBlock].img;  
        
        const snippetX = atlasMap[idBlock].x;
        const snippetY = atlasMap[idBlock].y;

        const posX = offsetX + (j * blockSize);
        const posY = offsetY + (i * blockSize);

        ctx.drawImage(
          mapImage,
          snippetX, snippetY,
          8, 8,
          posX, posY,
          blockSize, blockSize
        )
      }
    }
  }

  drawPacman()
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

function drawPacman() {
  const centerX = offsetX + (pacman.x * blockSize);
  const centerY = offsetY + (pacman.y * blockSize);

  const snippetX = pacmanAnim[pacman.frame].x;
  const snippetY = pacmanAnim[pacman.frame].y;

  const pacmanSize = blockSize * 2; 

  // This part of the function is strange, but it needs to be done because
  // actually, if I decided to move the pacman sprite in any direction, the entire
  // page would rotate as well
  ctx.save(); 
  
  ctx.translate(centerX, centerY); 
  
  ctx.rotate(pacman.angle); 

  ctx.drawImage(
    pacmanSprite,
    snippetX, snippetY,
    16, 16,             
    -pacmanSize / 2, -pacmanSize / 2, 
    pacmanSize, pacmanSize
  );

  ctx.restore(); 
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
      
      gameLoop();
    }
  }
  // Playing Options
  else if (gameState === "playing") {
    if (event.key === "Escape") {
      gameState = "paused";
      drawPauseMenu();
    }
    // Pacman Controllers [WASD or Arrow keys]
    if (event.key === "w" || event.key === "ArrowUp") {
      pacman.nextDirX = 0; pacman.nextDirY = -1;
    } else if (event.key === "s" || event.key === "ArrowDown") {
      pacman.nextDirX = 0; pacman.nextDirY = 1;
    } else if (event.key === "a" || event.key === "ArrowLeft") {
      pacman.nextDirX = -1; pacman.nextDirY = 0;
    } else if (event.key === "d" || event.key === "ArrowRight") {
      pacman.nextDirX = 1; pacman.nextDirY = 0;
    }

  }

  // Pause Options
  else if (gameState === "paused") {
    if (event.key === "Escape") {
      gameState = "menu";
      drawMenu();
    }
    else if (event.key === "Enter") {
      gameState = "playing";
      gameLoop();
    }
  }
  // Add more if needed
});
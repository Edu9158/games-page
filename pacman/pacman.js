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


function desenharJogo() {
  // 1. Pinta a tela inteira de preto
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. Percorre o nosso mapa (A lógica da sua primeira imagem!)
  for (let i = 0; i < linhas; i++) {
    for (let j = 0; j < colunas; j++) {
      
      if (wallMap[i][j] === 1) {
        // Se for 1, é parede. Preparamos a tinta azul clássica!
        ctx.fillStyle = '#2121DE';
        
        // Calcula a posição exata somando as margens (offset)
        // j é o eixo X (colunas) e i é o eixo Y (linhas)
        const posX = offsetX + (j * tamanhoBloco);
        const posY = offsetY + (i * tamanhoBloco);
        
        // Desenha o quadrado da parede
        ctx.fillRect(posX, posY, tamanhoBloco, tamanhoBloco);
      }
      
      // Obs: Se for 0, não fazemos nada, deixando o fundo preto aparecer!
    }
  }
}

// Roda a função pela primeira vez
desenharJogo();
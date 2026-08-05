const ghostSprite = new Image();
ghostSprite.src = "../src/pacman/ghosts/blinky/blinky.png"

const ghost = {
    x: 14,
    y: 14.5,

    speed: 0.1,

    dirX: 0,
    dirY: 0,

    animDelay: 0,
    frame: 0
}

function updateGhosts() {
    ghost.animDelay++;

    if (ghost.animDelay >= 10) {
        ghost.frame++;

        if (ghost.frame > 1) {
            ghost.frame = 0;
        }
    
        ghost.animDelay = 0;
    }

}

function drawGhost() {

    const centerX = offsetX + (ghost.x * blockSize);
    const centerY = offsetY + (ghost.y * blockSize);

    let row = 0;

    if (ghost.dirX === 1) {
        row = 0;
    }
    else if (ghost.dirX === -1) {
        row = 1;
    }
    else if (ghost.dirY === -1) {
        row = 2;
    }
    else if (ghost.dirY === 1) {
        row = 3;
    }

    const snippetX = ghost.frame * 16;
    const snippetY = row * 16;

    const ghostSize = blockSize * 2;

    ctx.drawImage(
        ghostSprite,
        snippetX,
        snippetY,
        16,
        16,
        centerX - (ghostSize / 2),
        centerY - (ghostSize / 2),
        ghostSize,
        ghostSize
    );
}

function ghostWalk() {
    if (canWalk) {
        ghost.dirY = 1;
    }
}

ghostWalk();
const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20, 20);

const arena = createMatrix(12, 20);

let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;

const player = {
  pos: {x: 0, y: 0},
  matrix: null,
  score: 0
}

const t = [
  [0,0,0],
  [1,1,1],
  [0,1,0]
]

function createMatrix(w, h) {
  const matrix = [];
  while (h--) {
    matrix.push(new Array(w).fill(0));
  }
  return matrix;
}

function draw() {
  context.fillStyle = '#000';
  context.fillRect(0, 0, canvas.width, canvas.height);

  drawMatrix(arena, {x: 0, y: 0});
  drawMatrix(t, player.pos);
}

function drawMatrix(matrix, offset) {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value != 0) {
        context.fillStyle = 'red';
        context.fillRect(x + offset.x, y + offset.y, 1, 1);
        context.strokeStyle = '#fff';
        context.lineWidth = 0.05;
        context.strokeRect(x + offset.x, y + offset.y, 1, 1);
      }
    });
  });
}

function update(time = 0) {
  const deltaTime = time - lastTime;
  lastTime = time;

  dropCounter += deltaTime;
  if (dropCounter > dropInterval) {
    playerDrop();
  }

  draw();
  requestAnimationFrame(update);
}

function playerDrop() {
  player.pos.y++;

  dropCounter = 0;
}

function playerMove(dir) {
  player.pos.x += dir;

}

document.addEventListener('keydown', event => {
  if (event.keyCode == 37) {
    playerMove(-1);
  } else if (event.keyCode == 39) {
    playerMove(1);
  } else if (event.keyCode == 40) {
    playerDrop();
  } else if (event.keyCode == 38) {
    playerRotate(1);
  }
});

function playerRotate(dir) {
  const pos = player.pos.x;
  let offset = 1;
  rotate(t, 1);
}

function rotate(matrix, dir) {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < y; x++) {
      [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
    }
  }

  if (dir > 0) matrix.forEach(row => row.reverse());
}

window.context = context;

update();

const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

window.context = context;

const arena = createMatrix(12, 20);

function createMatrix(w, h) {
  const matrix = [];
  while (h--) {
    matrix.push(new Array(w).fill(0));
  }
  return matrix;
}

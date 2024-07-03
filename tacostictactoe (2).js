/*
@title: Tic Tac Toe
@author: taco
@tags: [tacostictactoe.js]
@addedOn: 2024-7-3
*/

// bitmaps
const x = "x";
const o = "o";
const e = "e";
const a = "a"; // y axis
const b = "b"; // x axis
setLegend(
  [x, bitmap`
................
................
................
....00....00....
.....00..00.....
......0000......
.......00.......
.......00.......
......0000......
.....00..00.....
....00....00....
................
................
................
................
................`],
  [o, bitmap`
................
................
................
......0000......
....00....00....
...0........0...
...0........0...
...0........0...
...0........0...
...0........0...
....00....00....
......0000......
................
................
................
................`],
  [e, bitmap`
0000000000000000
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0000000000000000`],
  [a, bitmap`
................
................
................
................
................
................
......6.........
.....6666666....
....66666666....
.....6666666....
......6.........
................
................
................
................
................`],
  [b, bitmap`
................
................
................
................
.......666......
.......666......
.......666......
.......666......
......66666.....
.......666......
........6.......
................
................
................
................
................`]
);

let currentTurn = x; // current turn tracker
let gameOver = false; // game over flag

// the board (logical)
let board = [
  [e, e, e],
  [e, e, e],
  [e, e, e]
];

// the map (visual)
const displayBoard = map`
.b...
.eeea
.eee.
.eee.
.....`;

setMap(displayBoard);

// update the visual of the board
function updateBoard() {
  let mapString = ".b...\n";
  for (let y = 0; y < board.length; y++) {
    mapString += ".";
    for (let x = 0; x < board[y].length; x++) {
      mapString += board[y][x];
    }
    if (y === 0) {
      mapString += "a\n";
    } else {
      mapString += ".\n";
    }
  }
  mapString += ".....";
  setMap(map`${mapString}`);
}

// check and (display) the intersection coordinates
function checkIntersection() {
  const aSprite = getFirst(a);
  const bSprite = getFirst(b);

  const xCoord = bSprite.x - 1; 
  const yCoord = aSprite.y - 1;

  clearText();
//  addText(`X: ${xCoord}, Y: ${yCoord}`, { x: 1, y: 5, color: color`3` }); // display intersection coordinates
}

// move "a" arrow up and down with 'w' and 's'
onInput("w", () => {
  const aSprite = getFirst(a);
  if (aSprite.y > 1) { // prevent it going into the white gaps on y axis
    aSprite.y -= 1;
  }
  checkIntersection();
});

onInput("s", () => {
  const aSprite = getFirst(a);
  if (aSprite.y < 3) {
    aSprite.y += 1;
  }
  checkIntersection();
});

// move "b" arrow left and right with 'a' and 'd'
onInput("a", () => {
  const bSprite = getFirst(b);
  if (bSprite.x > 1) { // prevent it going into the white gaps on x axis
    bSprite.x -= 1;
  }
  checkIntersection();
});

onInput("d", () => {
  const bSprite = getFirst(b);
  if (bSprite.x < 3) {
    bSprite.x += 1;
  }
  checkIntersection();
});

checkIntersection();
//placing the X or O
onInput("i", () => {
  if (gameOver) return;

  const aSprite = getFirst(a);
  const bSprite = getFirst(b);

  const xCoord = bSprite.x - 1; 
  const yCoord = aSprite.y - 1;

  // place the X or O if the cell is empty
  if (board[yCoord][xCoord] === e) {
    board[yCoord][xCoord] = currentTurn;

    // update visual
    updateBoard();

    // check for a win or tie
    if (checkWin(board, currentTurn)) {
      clearText();
      addText(`${currentTurn.toUpperCase()} wins!`, { x: 3, y: 13, color: color`3` });
      gameOver = true;
    } else if (checkTie(board)) {
      clearText();
      addText(`It's a tie!`, { x: 3, y: 13, color: color`3` });
      gameOver = true;
    } else {
      // switch turns
      currentTurn = currentTurn === x ? o : x;
      checkIntersection();
    }
  }
});

// restart game on input "j"
onInput("j", () => {
  // revert variables
  gameOver = false;
  currentTurn = x;
  board = [
    [e, e, e],
    [e, e, e],
    [e, e, e]
  ];
  clearText();
  updateBoard();
  checkIntersection();
});

// check for a win
function checkWin(board, symbol) {
  // rows
  for (let y = 0; y < board.length; y++) {
    if (board[y].every(cell => cell === symbol)) {
      return true;
    }
  }

  // columns
  for (let x = 0; x < board[0].length; x++) {
    if (board.every(row => row[x] === symbol)) {
      return true;
    }
  }

  // diagonals
  if (board[0][0] === symbol && board[1][1] === symbol && board[2][2] === symbol) {
    return true;
  }
  if (board[0][2] === symbol && board[1][1] === symbol && board[2][0] === symbol) {
    return true;
  }

  return false;
}

// check for tie
function checkTie(board) {
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      if (board[y][x] === e) {
        return false;
      }
    }
  }
  return true;
}

updateBoard();
checkIntersection();
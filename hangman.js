/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: hangman numbers
@author: taco
@tags: [beginner]
@addedOn: 2024-6-20
*/

// initial variables
let number;
let numberGuess;
let a;
let b;

// defining the map/background and setting it
const bg = map`
.....
.....
.....
.....
.....`;
setMap(bg);

// defining the test letters
setLegend(
  ['a', bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
  ['b', bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
`]
);

// starting a new game and setting a random number 
function newGame() {
  number = Math.floor(Math.random() * 100) + 1; 
  addText("Guess a number \nbetween \n1 and 100.", { x: 3, y: 1, color: color`3`});
 

}

// call newgame to start a new game
//newGame();
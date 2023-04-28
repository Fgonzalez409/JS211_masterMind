'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

//as name states, print the board
const printBoard = () =>  {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

//function to randomly generate a 4 letter solution for the letters array, ranging from index 0 - 7
const generateSolution = () =>  {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

//function to get a random number
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateHint = (guess) =>  {
  // your code here
  let hints = 0;
  let hints2 = 0;


  let guessArray = guess.split('');
  let solutionArray = solution.split('');

  //this loop finds the matching elements in guessArray and solutionArray
  //removes the matching elements and increments hints variable
  guessArray.forEach(function(letter, i){
      if(guessArray[i] == solutionArray[i]){
      hints++; 
      guessArray[i] = 0;//this is to prevent the same letters from being matched again in the remaining loops
      solutionArray[i] = 1;
    }
  })

  //this loop iterates over the remaining elements and increments the hints2 
  //variable for elementss in the array but not in correct position
  guessArray.forEach(function(guessLetter, index1){
    solutionArray.forEach(function(solutionLetter, index2){
      if(guessLetter == solutionLetter){
        hints2++;
        guessArray[index1] = 0;
        solutionArray[index2] = 1;
      }
    })
  })
  return hints + "-" + hints2
}

const mastermind = (guess) => {
  solution = 'abcd'; // Comment this out to generate a random solution
  // your code here
  if(typeof guess !== 'string' || guess.length !== 4){
    console.log('Guess must be 4 letters long using only letters A-H'); 
    return false; 
  }

  guess = guess.toLowerCase().trim(); 

  if(guess == solution){
    board = [];
    console.log("You guessed it!")
    return "You guessed it!"; 
  }else if(board.length === 10){
    console.log("You lost! The solution was " + solution);
    board = [];
    generateSolution();
  }else{
    board.push(guess)
    console.log(generateHint(guess))
  }
}


const getPrompt = () =>  {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}
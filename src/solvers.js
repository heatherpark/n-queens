// n === 0
// ['']

// n === 1
// ['0']

// n === 2
// ['10', '01', ...]

// n === 3
// ['012', '201',..., ]

// For n === 3, we'd use the 'alphabet' ['0', '1', '2']

/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n) {
  //var answer = window.makeBoardStrings(8);
  //console.log(answer.length);

  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solution = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

window.makeBoardStrings = function(n, alphabet) {
  alphabet = alphabet || _.range(n);

  if (n === 0) {
    return [''];
  }

  var previousBoardStrings = window.makeBoardStrings(n - 1, alphabet);
  var currentBoardStrings = [];

  for (var i = 0; i < previousBoardStrings.length; i++) {
    for (var j = 0; j < alphabet.length; j++) {
      var boardString = previousBoardStrings[i] + alphabet[j];
      var board = window.createBoard(boardString, alphabet.length);

      if (!board.hasAnyRooksConflicts()) {
        currentBoardStrings.push(boardString);
      }
    }
  }

  return currentBoardStrings;
};

window.createBoard = function(boardString, boardSize) {
  var board = new Board({n: boardSize});

  for (var i = 0; i < boardString.length; i++) {
    board.togglePiece(i, +boardString.charAt(i));
  }

  return board;
};

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
// Time Complexity: O(n^2) (disregarding the console.log)
window.findNRooksSolution = function(n) {
  // For all n, it's fast (and enough) to just line up the rooks on the diagonal
  var board = new Board({n: n});
  for (var i = 0; i < n; i++) {
    board.togglePiece(i, i);
  }
  var solution = board.rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
// Time Complexity: O(n) (disregarding the console.log)
window.countNRooksSolutions = function(n) {
  // There are n! ways to place the Rooks (why?)
  var solutionCounter = function(n) {
    if (n === 0) {
      return 1;
    }

    return n * solutionCounter(n-1);
  };

  var solution = solutionCounter(n);

  console.log('Number of solutions for ' + n + ' rooks:', solution);
  return solution;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
// Time Complexity: O(n! * n^2) (disregarding the console.log)
// (alternatively, O(n! * n^2) = O(n! * n * n) = O(n! * (n+1) * (n+2)) = O((n+2)!))
window.findNQueensSolution = function(n) {
  // Find the "queen board strings" (and prune!)
  var boardStrings = window.makeQueenBoardStrings(n); // O(n! * n^2)

  // Make a "boardified" copy of the first string
  var boardification = window.createBoard(boardStrings[0], n).rows();

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(boardification));
  return boardification;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
// Time Complexity: O(n! * n^2) (disregarding the console.log)
// (alternatively, O(n! * n^2) = O(n! * n * n) = O(n! * (n+1) * (n+2)) = O((n+2)!))
window.countNQueensSolutions = function(n) {
  // Find the "queen board strings" (and prune!)
  var boardStrings = window.makeQueenBoardStrings(n); // O(n! * n^2)

  console.log('Number of solutions for ' + n + ' queens:', boardStrings.length);
  return boardStrings.length;
};

// Time Complexity: O(n! * n^2)
// A 'board string' is a numerical representation of which
// column the queen in each row is to be placed
// For example: '102' would represent:
// In the 0th row, the queen lies in column 1
// In the 1st row, the queen lies in column 0
// In the 2nd row, the queen lies in column 2
// This method recursively generates all the board strings
// of a given length 'n' and 'alphabet' (possible column positions)
window.makeQueenBoardStrings = function(n, alphabet) {
  alphabet = alphabet || _.range(n);

  if (n === 0) {
    return [''];
  }

  var previousBoardStrings = window.makeQueenBoardStrings(n - 1, alphabet);
  var currentBoardStrings = [];

  // Time Complexity of entire loop: O( (n-1)! * n * n^2 ) = O( n! * n^2 )
  for (var i = 0; i < previousBoardStrings.length; i++) {
    for (var j = 0; j < alphabet.length; j++) {
      var boardString = previousBoardStrings[i] + alphabet[j];
      var board = window.createBoard(boardString, alphabet.length);

      if (!board.hasAnyQueensConflicts()) {
        currentBoardStrings.push(boardString);
      }
    }
  }

  return currentBoardStrings;
};

// This method returns the board represented by the board string
window.createBoard = function(boardString, boardSize) {
  var board = new Board({n: boardSize});

  if (boardString !== undefined) {
    for (var i = 0; i < boardString.length; i++) {
      board.togglePiece(i, +boardString.charAt(i));
    }
  }

  return board;
};

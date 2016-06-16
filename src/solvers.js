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
// Time Complexity: O(n^2) (disregarding the console.log)
window.findNRooksSolution = function(n) {
  // make a new Board
  // start at (0,0) - place a rook...
  // go to (1, 1) - place a rook...
  // ...
  // end at (n-1, n-1) - place a rook

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
  // First rook: n
  // Second rook: n - 1
  // ...
  // (keep going until there are no choices)

  // recursion?
    // base: n === 0 (return 1)
    // recursive: return n * countNRooksBlahBlahBlah(n-1)

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
window.findNQueensSolution = function(n) {
  // Find the "queen board strings" (and prune!)
  // Return a "boardified" copy of the first string

  var boardStrings = window.makeBoardStrings(n); // O(n! * n^2)
  var boardification = window.createBoard(boardStrings[0], n).rows();

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(boardification));
  return boardification;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
// Time Complexity: O(n! * n^2) (disregarding the console.log)
window.countNQueensSolutions = function(n) {
  // Find the "queen board strings" (and prune!)
  // Return the length of the strings array

  var boardStrings = window.makeBoardStrings(n); // O(n! * n^2)

  console.log('Number of solutions for ' + n + ' queens:', boardStrings.length);
  return boardStrings.length;
};

// Time Complexity: O(n! * n^2)
window.makeBoardStrings = function(n, alphabet) {
  alphabet = alphabet || _.range(n);

  if (n === 0) {
    return [''];
  }

  var previousBoardStrings = window.makeBoardStrings(n - 1, alphabet);
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

window.createBoard = function(boardString, boardSize) {
  var board = new Board({n: boardSize});

  if (boardString !== undefined) {
    for (var i = 0; i < boardString.length; i++) {
      board.togglePiece(i, +boardString.charAt(i));
    }
  }

  return board;
};

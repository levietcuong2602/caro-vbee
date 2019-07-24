/**
 *
 * @param {*} squares
 * @param rules
 */
export default function calculateWinner(squares, rules) {
  // Check win X
  let winnerLocation =
    checkWinWithRow(squares, rules, "X") ||
    checkWinWithColum(squares, rules, "X") ||
    checkWinWithdiagonalLeftToRight(squares, rules, "X") ||
    checkWinWithdiagonalRightToLeft(squares, rules, "X");

  console.log("winnerLocationX: ", winnerLocation);
  if (winnerLocation) {
    return {
      winnerPlayer: "X",
      winnerLocation
    };
  }

  // Check Win Y
  winnerLocation =
    checkWinWithRow(squares, rules, "Y") ||
    checkWinWithColum(squares, rules, "Y") ||
    checkWinWithdiagonalLeftToRight(squares, rules, "Y") ||
    checkWinWithdiagonalRightToLeft(squares, rules, "Y");

  console.log("winnerLocationY: ", winnerLocation);
  if (winnerLocation) {
    return {
      winnerPlayer: "Y",
      winnerLocation
    };
  }

  return;
}

/**
 * @param squares
 * @param rules
 * @param player
 * @returns true|false
 */
var checkWinWithRow = function(squares, rules, player) {
  const length = squares.length;
  const gameSize = Math.floor(Math.sqrt(length));

  for (let index = 0; index < length; index++) {
    if (
      Math.floor(index / gameSize) ===
        Math.floor((index + rules - 1) / gameSize) &&
      squares[index] === player
    ) {
      const arrayCheck = squares.slice(index, index + rules);
      if (arrayCheck.every(e => e === player)) {
        return [...Array(rules).fill(index)].map((e, i) => e + i);
      }
    }
  }
  return false;
};

/**
 * @param squares
 * @param rules
 * @param player
 * @returns true|false
 */
var checkWinWithColum = function(squares, rules, player) {
  const length = squares.length;
  const gameSize = Math.floor(Math.sqrt(length));

  for (let index = 0; index < length; index++) {
    if (index + gameSize * (rules - 1) < length && squares[index] === player) {
      const arrayTemp = [];
      for (let j = 0; j < rules; j++) {
        arrayTemp.push(squares[index + gameSize * j]);
      }
      if (arrayTemp.every(e => e === player)) {
        return [...Array(rules).fill(index)].map((e, i) => e + i * gameSize);
      }
    }
  }
  return false;
};

/**
 * @param squares
 * @param rules
 * @param player
 * @returns true|false
 */
var checkWinWithdiagonalLeftToRight = function(squares, rules, player) {
  const length = squares.length;
  const gameSize = Math.floor(Math.sqrt(length));

  for (let index = 0; index < length; index++) {
    if (
      index + (gameSize + 1) * (rules - 1) < length &&
      squares[index] === player
    ) {
      const arrayTemp = [];
      for (let j = 0; j < rules; j++) {
        arrayTemp.push(squares[index + gameSize * j + j]);
      }
      if (arrayTemp.every(e => e === player)) {
        return [...Array(rules).fill(index)].map(
          (e, i) => e + gameSize * i + i
        );
      }
    }
  }
  return false;
};

/**
 * @param squares
 * @param rules
 * @param player
 * @returns true|false
 */
var checkWinWithdiagonalRightToLeft = function(squares, rules, player) {
  const length = squares.length;
  const gameSize = Math.floor(Math.sqrt(length));

  for (let index = 0; index < length; index++) {
    if (
      Math.floor((index + (gameSize - 1) * (rules - 1)) / gameSize) -
        Math.floor(index / gameSize) ===
        rules - 1 &&
      squares[index] === player
    ) {
      const arrayTemp = [];
      for (let j = 0; j < rules; j++) {
        arrayTemp.push(squares[index + gameSize * j - j]);
      }
      if (arrayTemp.every(e => e === player)) {
        return [...Array(rules).fill(index)].map(
          (e, i) => e + gameSize * i - i
        );
      }
    }
  }
  return false;
};

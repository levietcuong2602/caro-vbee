import { makeArrayWithSize } from "../utils/makeArrayWithSize";
/**
 *
 * @param {*} squares
 * @param rules
 */
export default function calculateWinner(squares, rules = 3) {
  // Check win X
  let winnerLocation =
    checkWinWithRow(squares, rules, "X") ||
    checkWinWithColum(squares, rules, "X") ||
    checkWinWithdiagonalLeftToRight(squares, rules, "X") ||
    checkWinWithdiagonalRightToLeft(squares, rules, "X");
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
  const endLoop = length - rules + 1;

  for (let index = 0; index < endLoop; index++) {
    const endIndex = parseInt(index + rules - 1);

    if (
      Math.floor(index / gameSize) === Math.floor(endIndex / gameSize) &&
      squares[index] === player
    ) {
      const arrayCheck = [];
      for (let j = 0; j < rules; j++) {
        arrayCheck.push(squares[index + j]);
      }
      if (arrayCheck.every(e => e === player)) {
        return [...makeArrayWithSize(rules).fill(index)].map((e, i) => e + i);
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
  const endLoop = length - gameSize * (rules - 1);

  for (let index = 0; index < endLoop; index++) {
    const endIndex = parseInt(index + gameSize * (rules - 1));

    if (endIndex < length && squares[index] === player) {
      const arrayTemp = [];
      for (let j = 0; j < rules; j++) {
        arrayTemp.push(squares[index + gameSize * j]);
      }
      if (arrayTemp.every(e => e === player)) {
        return [...makeArrayWithSize(rules).fill(index)].map(
          (e, i) => e + i * gameSize
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
var checkWinWithdiagonalLeftToRight = function(squares, rules, player) {
  const length = squares.length;
  const gameSize = Math.floor(Math.sqrt(length));

  for (let index = 0; index < length; index++) {
    const endIndex = parseInt(index + (gameSize + 1) * (rules - 1));

    if (endIndex < length && squares[index] === player) {
      const arrayTemp = [];
      for (let j = 0; j < rules; j++) {
        arrayTemp.push(squares[index + gameSize * j + j]);
      }
      if (arrayTemp.every(e => e === player)) {
        return [...makeArrayWithSize(rules).fill(index)].map(
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
  const endLoop = length - gameSize * (rules - 1) + 1;

  for (let index = 0; index < endLoop; index++) {
    const endIndex = parseInt(index + (gameSize - 1) * (rules - 1));

    if (
      Math.floor(endIndex / gameSize) - Math.floor(index / gameSize) ===
        rules - 1 &&
      squares[index] === player
    ) {
      const arrayTemp = [];
      for (let j = 0; j < rules; j++) {
        arrayTemp.push(squares[index + gameSize * j - j]);
      }
      if (arrayTemp.every(e => e === player)) {
        return [...makeArrayWithSize(rules).fill(index)].map(
          (e, i) => e + gameSize * i - i
        );
      }
    }
  }
  return false;
};

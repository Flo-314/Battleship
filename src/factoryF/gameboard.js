const helperMethods = (() => {
  const cordsToIndex = (cord1, cord2) => cord1 + (cord2 - 1) * 10 - 1;

  const checkIfPositionIsUsed = (ship, cord1, cord2, cords, board) => {
    let condition = true;

    if (cords) {
      for (let i = 0; i < ship.length; i += 1) {
        if (board[cords + i] !== '') {
          condition = false;
        }
      }
    } else {
      for (let i = 0; i < ship.length; i += 1) {
        if (board[cordsToIndex(cord1, cord2) + i] !== '') {
          condition = false;
        }
      }
    }
    return condition;
  };

  const checkIfPositionIsntBorder = (ship, cord1, cord2, cords) => {
    let cordinates = cordsToIndex(cord1, cord2) - 1;

    if (cords) {
      cordinates = cords - 1;
    }
    let expectedCordinates = cordinates + ship.length;
    console.log(expectedCordinates, cordinates);

    expectedCordinates = expectedCordinates.toString() - 1;

    cordinates = cordinates.toString();

    if (cordinates.length === 1) {
      if (expectedCordinates < 10) {
        return true;
      }
    } else if (expectedCordinates.toString()[0] === cordinates[0]) {
      return true;
    }
    return false;
  };

  const checkValidPosition = (ship, cord1, cord2, cords, board) => {
    // eslint-disable-next-line max-len
    if (checkIfPositionIsUsed(ship, cord1, cord2, cords, board) && checkIfPositionIsntBorder(ship, cord1, cord2, cords)) {
      return true;
    }
    return false;
  };

  return { cordsToIndex, checkValidPosition };
})();

const GameboardFactory = () => {
  const board = Array(100).fill('');
  const shipArray = [];
  const { cordsToIndex } = helperMethods;
  const { checkValidPosition } = helperMethods;

  const putShip = (ship, cord1, cord2, cordinates) => {
    let cords = cordsToIndex(cord1, cord2);

    if (cordinates) {
      cords = cordinates;
    }

    if (checkValidPosition(ship, cord1, cord2, cords, board)) {
      for (let i = 0; i < ship.length; i += 1) {
        board[cords + i] = ship;
        const infoObject = { position: 1 + i, cord: cords + i };
        ship.index.unshift(infoObject);
      }

      shipArray.unshift(ship);
      return true;
    }
    return false;
  };

  const receiveAttack = (cord1, cord2, cordinates) => {
    let cords = cordsToIndex(cord1, cord2);
    if (cordinates) {
      cords = cordinates;
    }
    /*     console.log(cords);
 */ if (typeof board[cords] === 'object') {
      const ship = board[cords];
      const position = ship.index.find((cord) => cord.cord === cords);
      ship.hit(position.position);
      board[cords] = 'X';
      return true;
    }
    if (board[cords] !== 'X') {
      board[cords] = 'X';
      return true;
    }
    return false;
  };

  const allSunked = () => {
    let isSunked = true;
    for (let index = 0; index < shipArray.length; index += 1) {
      const ship = shipArray[index];
      if (!ship.isSunk()) {
        isSunked = false;
      }
    }
    return isSunked;
  };

  return {
    board, putShip, receiveAttack, allSunked, shipArray,
  };
};

export default GameboardFactory;

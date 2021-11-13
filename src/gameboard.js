const helperMethods = (() => {
  const cordsToIndex = (cord1, cord2) => cord1 + (cord2 - 1) * 10 - 1;

  const checkValidPosition = (ship, cord1, cord2, board) => {
    let condition = true;
    for (let i = 0; i < ship.length; i += 1) {
      if (board[cordsToIndex(cord1, cord2) + i] !== '') {
        condition = false;
      }
    }
    return condition;
  };
  return { cordsToIndex, checkValidPosition };
})();

const GameboardFactory = () => {
  const board = Array(100).fill('');

  const { cordsToIndex } = helperMethods;
  const { checkValidPosition } = helperMethods;

  const putShip = (ship, cord1, cord2) => {
    const cords = cordsToIndex(cord1, cord2);
    if (checkValidPosition(ship, cord1, cord2, board)) {
      for (let i = 0; i < ship.length; i += 1) {
        board[cords + i] = ship;
        const infoObject = { position: 1 + i, cord: cords + i };
        ship.index.unshift(infoObject);
      }
    }
  };

  const receiveAttack = (cord1, cord2) => {
    const cords = cordsToIndex(cord1, cord2);
    if (typeof board[cords] === 'object') {
      const ship = board[cords];
      const position = ship.index.find((cord) => cord.cord === cords);
      ship.hit(position.position);
      board[cords] = 'X';
    }
  };

  return { board, putShip, receiveAttack };
};

export default GameboardFactory;

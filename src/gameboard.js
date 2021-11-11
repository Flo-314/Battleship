const GameboardFactory = () => {
  const board = Array(100).fill('');
  const cordsToIndex = (cord1, cord2) => cord1 + (cord2 - 1) * 10 - 1;
  const putShip = (ship, cord1, cord2) => {
    for (let i = 0; i < ship.length; i += 1) {
      board[cordsToIndex(cord1, cord2) + i] = ship;
    }
  };
  const receiveAttack = (cord1, cord2) => {
    if (typeof board[cordsToIndex(cord1, cord2)] === 'object') {
      board[cordsToIndex(cord1, cord2)].hit(1);
    }
  };
  /*   const getShipIndex = () => {};
 */
  return { board, putShip, receiveAttack };
};

export default GameboardFactory;

const shipFactory = (length) => {
  const shipBoard = [];
  const hit = (position) => {
    shipBoard[position - 1] = 'X';
  };
  const isSunk = () => {
    if (shipBoard.length === length) {
      return true;
    }
    return false;
  };
  return { length, hit, isSunk };
};

export default shipFactory;

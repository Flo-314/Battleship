const shipFactory = (length) => {
  const shipBoard = [];
  const index = [];
  for (let i = 0; i < length; i += 1) {
    shipBoard[i] = '';
  }
  const hit = (position) => {
    shipBoard[position - 1] = 'X';
  };

  const checkforX = (value) => value === 'X';

  const isSunk = () => {
    if (shipBoard.every(checkforX)) {
      return true;
    }
    return false;
  };
  return {
    length, hit, isSunk, shipBoard, index,
  };
};

export default shipFactory;

const gameboardMethods = (() => {
  const createGameboard = (player) => {
    const main = document.querySelector('main');
    const gameboard = document.createElement('div');
    gameboard.classList.add('gameboard');
    gameboard.classList.add(player.name);
    main.append(gameboard);
    for (let i = 0; i < player.board.length; i += 1) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      gameboard.appendChild(cell);
    }
  };

  return {
    createGameboard,
  };
})();

const cellListeners = (() => {
  const printHit = (playerName, position) => {
    const cellArray = document.querySelector(`.${playerName}`).children;
    cellArray[position].textContent = 'X';
  };

  const hitListener = (ia, cordinates, player) => {
    ia.playerGameboard.receiveAttack(1, 1, cordinates);
    printHit('ia', cordinates);
    printHit('player', ia.iaAttack(player));
  };

  const addHitListener = (ia, player) => {
    const cellNodes = document.querySelector('.ia').children;
    for (let index = 0; index < cellNodes.length; index += 1) {
      const cell = cellNodes[index];
      cell.addEventListener('click', () => {
        hitListener(ia, index, player);
      });
    }
  };

  const printShip = (ship, cordinates) => {
    const cellArray = document.querySelector(`.${'player'}`).children;
    for (let index = 0; index < ship.length; index += 1) {
      const cell = cellArray[index + cordinates - 1];
      cell.textContent = 'O';
    }
  };

  const shipListener = (player, ship, cordinates) => {
    if (player.playerGameboard.putShip(ship, 1, 1, cordinates)) {
      printShip(ship, cordinates);
    }
  };
  const addShipListener = (player, ship) => {
    const cellNodes = document.querySelector(`.${player.name}`).children;
    for (let index = 0; index < cellNodes.length; index += 1) {
      const cell = cellNodes[index];
      cell.addEventListener('click', () => {
        shipListener(player, ship, index + 1);
      });
    }
  };

  return { addHitListener, addShipListener, printShip };
})();

export { gameboardMethods, cellListeners };

import ShipFactory from '../factoryF/ship';

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
  let shipCount = 0;

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
  const checkIfPreparationStateEnds = (countShip, ia, player) => {
    if (countShip >= 7) {
      addHitListener(ia, player);
    }
  };
  const createShipList = () => {
    const carrier = ShipFactory(5);
    const battleship = ShipFactory(4);
    const cruiser = ShipFactory(3);
    const submarine = ShipFactory(3);
    const destroyer = ShipFactory(2);
    const patrolBoat = ShipFactory(1);
    const ferry = ShipFactory(1);
    const shipList = [carrier, battleship, cruiser, submarine, destroyer, patrolBoat, ferry];
    return shipList;
  };
  const printShip = (ship, cordinates) => {
    const cellArray = document.querySelector(`.${'player'}`).children;
    for (let index = 0; index < ship.length; index += 1) {
      const cell = cellArray[index + cordinates - 1];
      cell.textContent = 'O';
    }
  };

  const shipListener = (player, cordinates, ia) => {
    const shipList = createShipList();
    checkIfPreparationStateEnds(shipCount, ia, player);
    // eslint-disable-next-line max-len
    if (shipList[shipCount] && player.playerGameboard.putShip(shipList[shipCount], 1, 1, cordinates)) {
      printShip(shipList[shipCount], cordinates);
      shipCount += 1;
    }
  };
  const addShipListener = (player, ia) => {
    const cellNodes = document.querySelector(`.${player.name}`).children;
    for (let index = 0; index < cellNodes.length; index += 1) {
      const cell = cellNodes[index];
      cell.addEventListener('click', () => {
        shipListener(player, index + 1, ia);
      });
    }
  };

  return { addHitListener, addShipListener, printShip };
})();

export { gameboardMethods, cellListeners };

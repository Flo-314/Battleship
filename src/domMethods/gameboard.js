/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
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

  const checkForWin = (player, ia) => {
    if (player.playerGameboard.allSunked() === true) {
      prompt('computer wins');
      location.reload();
    } else if (ia.playerGameboard.allSunked() === true) {
      prompt('player wins');
      location.reload();
    }
  };

  const printHit = (playerName, position) => {
    const cellArray = document.querySelector(`.${playerName}`).children;
    cellArray[position].textContent = 'X';
  };

  const hitListener = (ia, cordinates, player) => {
    ia.playerGameboard.receiveAttack(1, 1, cordinates);
    checkForWin(player, ia);
    printHit('ia', cordinates);
    printHit('player', ia.iaAttack(player));
    checkForWin(player, ia);
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
      // eslint-disable-next-line no-use-before-define
      getRandomIaShips(ia);
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
  const getRandomIaShips = (ia) => {
    const shipList = createShipList();
    let cords = Math.floor(Math.random() * 100) + 1;

    for (let index = 0; index < shipList.length; index += 1) {
      const ship = shipList[index];
      // eslint-disable-next-line max-len
      while (ia.playerGameboard.putShip(ship, 1, 1, cords) !== true) {
        cords = Math.floor(Math.random() * 100) + 1;
      }
      ia.playerGameboard.putShip(ship, 1, 1, cords);
      index += 1;
    }
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
    // eslint-disable-next-line max-len
    if (shipList[shipCount] && player.playerGameboard.putShip(shipList[shipCount], 1, 1, cordinates)) {
      printShip(shipList[shipCount], cordinates);
      shipCount += 1;
      checkIfPreparationStateEnds(shipCount, ia, player);
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

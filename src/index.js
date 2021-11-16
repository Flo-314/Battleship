import PlayerFactory from './factoryF/player';

const gameboardMethods = (() => {
  const createGameboard = (playerGameboard) => {
    const main = document.querySelector('main');
    const gameboard = document.createElement('div');
    main.append(gameboard);
    for (let i = 0; i < playerGameboard.length; i += 1) {
      gameboard.classList.add('gameboard');
      const cell = document.createElement('div');
      cell.classList.add('cell');
      gameboard.appendChild(cell);
    }
  };

  const printHit = (playerName, position) => {
    const cellArray = document.querySelector(`#${playerName}`).children;
    cellArray[position].textContent = 'X';
  };

  const printShip = (ship, cordinates) => {
    const cellArray = document.querySelector(`#${'player'}`).children;
    for (let index = cordinates; index < ship.length; index += 1) {
      const cell = cellArray[index];
      cell.textContent = 'O';
    }
  };

  const shipListener = (player, ship, cordinates) => {
    player.putShip(ship, 1, 1, cordinates);
    printShip(ship, cordinates);
  };
  const addShipListener = (player, ship) => {
    const cellNodes = document.querySelectorAll('.gameboard')[1].children;
    for (let index = 0; index < cellNodes.length; index += 1) {
      const cell = cellNodes[index];
      cell.addEventListener('click', () => {
        shipListener(player, ship, index + 1);
      });
    }
  };

  const hitListener = (ia, cordinates) => {
    ia.receiveAttack(1, 1, cordinates);
    printHit('ia', cordinates);
    printHit('player', ia.iaAttack());
  };

  const addHitListener = (ia) => {
    const cellNodes = document.querySelectorAll('.gameboard')[1].children;
    for (let index = 0; index < cellNodes.length; index += 1) {
      const cell = cellNodes[index];
      cell.addEventListener('click', () => {
        hitListener(ia, index + 1);
      });
    }
  };

  return { createGameboard, addHitListener, addShipListener };
})();
const gameMethods = (() => {
  const newGame = () => {
    const player = PlayerFactory('player');
    const ia = PlayerFactory('ia');
    ia.iaAttack();
    gameboardMethods.createGameboard(player.board);
    gameboardMethods.createGameboard(ia.board);
  };
  const checkForWin = (player, ia) => {
    if (player.gameboard.allSunked()) { prompt('computer wins'); } else if (ia.gameboard.allSunked()) { prompt('player'); }
  };
  return { checkForWin, newGame };
})();

gameMethods.newGame();

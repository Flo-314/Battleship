/* eslint-disable no-param-reassign */
import GameboardFactory from './gameboard';

const PlayerFactory = (name) => {
  let turn;
  if (name === 'player') { turn = true; } else { turn = false; }

  const playerGameboard = GameboardFactory();

  const { board } = playerGameboard;

  const attack = (cord1, cord2, player) => {
    if (player.playerGameboard.receiveAttack(cord1, cord2)) {
      turn = false;
      player.turn = true;
      return true;
    }
    return false;
  };
  // eslint-disable-next-line consistent-return
  const iaAttack = (player) => {
    let cord1 = Math.floor(Math.random() * (11 - 1)) + 1;
    let cord2 = Math.floor(Math.random() * (11 - 1)) + 1;
    while (player.playerGameboard.receiveAttack(cord1, cord2) !== true) {
      cord1 = Math.floor(Math.random() * (11 - 1)) + 1;
      cord2 = Math.floor(Math.random() * (11 - 1)) + 1;
    }
    player.playerGameboard.receiveAttack(cord1, cord2);
    turn = false;
    player.turn = true;
    return cord1 + (cord2 - 1) * 10 - 1;
  };

  return {
    playerGameboard, attack, board, turn, iaAttack, name,
  };
};

export default PlayerFactory;

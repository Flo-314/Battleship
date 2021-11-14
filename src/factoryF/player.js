/* eslint-disable no-param-reassign */
import GameboardFactory from './gameboard';

const PlayerFactory = (playerName) => {
  let turn;
  if (playerName === 'player') { turn = true; } else { turn = false; }

  const playerGameboard = GameboardFactory();

  const { board } = playerGameboard;

  const attack = (cord1, cord2, player) => {
    if (player.playerGameboard.receiveAttack(cord1, cord2)) {
      turn = false;
      player.turn = true;
    }
  };
  const iaAttack = (player) => {
    const cord1 = Math.floor(Math.random() * (10 - 1)) + 1;
    const cord2 = Math.floor(Math.random() * (10 - 1)) + 1;
    if (player.playerGameboard.receiveAttack(cord1, cord2)) {
      turn = false;
      player.turn = true;
    }
  };
  return {
    playerGameboard, attack, board, turn, iaAttack,
  };
};

export default PlayerFactory;

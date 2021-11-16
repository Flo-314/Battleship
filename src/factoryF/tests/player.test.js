/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-undef */
import GameboardFactory from '../gameboard';
import ShipFactory from '../ship';
import PlayerFactory from '../player';

const ia = PlayerFactory('ia');
const player = PlayerFactory('player');
player.attack(3, 4, ia);
ia.iaAttack(player);
test('check if playerturn is always true', () => {
  expect(player.turn).toBe(true);
});

test('check if player attack works', () => {
  expect(ia.playerGameboard.board[32]).toBe('X');
});
test('check if iarandom atack works', () => {
  expect(ia.turn).toBe(true);
});

test('check if iarandom atack works', () => {
  expect(player.board.includes('X')).toBe(true);
});
test('check if iarandom atack works', () => {
  expect(player.board.includes('X')).toBe(true);
});

/*

    Players can take turns playing the game by attacking the enemy Gameboard.

    The game is played against the computer, so make ‘computer’ players capable of making random plays.
     The AI does not have to be smart, but it should know whether or not a given move is legal.
     (i.e. it shouldn’t shoot the same coordinate twice).

 */

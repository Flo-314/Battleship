/* eslint-disable max-len */
/* eslint-disable no-undef */
import GameboardFactory from '../gameboard';
import shipFactory from '../ship';

const gameboard = GameboardFactory();

const normalShip = shipFactory(3);
gameboard.putShip(normalShip, 10, 2);
gameboard.receiveAttack(10, 2);

const smallShip = shipFactory(1);
gameboard.putShip(smallShip, 4, 4);
gameboard.receiveAttack(4, 4);

const mediumShip = shipFactory(2);
gameboard.putShip(mediumShip, 5, 1);
gameboard.receiveAttack(5, 1);
gameboard.receiveAttack(5, 2);
gameboard.receiveAttack(5, 3);

// receive attack of
const bugship = shipFactory(2);
gameboard.putShip(bugship, 4, 4);

test('putShip in the exact cordinates', () => {
  expect(gameboard.board[20]).toBe(normalShip);
});
test('putShip using the lenght of the ship', () => {
  expect(gameboard.board[19] + gameboard.board[20] + gameboard.board[21]).toBe(normalShip + normalShip + normalShip);
});
test('putShip in a not empty space', () => {
  expect(gameboard.board[33]).toBe(smallShip);
});
test('receiveAttack and sunk a 1length ship', () => {
  expect(smallShip.isSunk()).toBe(true);
});
test('receiveAttack check if the sunk of larger is bug', () => {
  expect(normalShip.isSunk()).toBe(false);
});
test('receiveAttack in a medium sunk boat', () => {
  expect(mediumShip.isSunk()).toBe(true);
});

/*
Note that we have not yet created any User Interface.
We should know our code is coming together by running the tests.
You shouldn’t be relying on console.logs or DOM methods
to make sure your code is doing what you expect it to

Gameboards should be able to place ships at specific
coordinates by calling the ship factory function.

Gameboards should have a receiveAttack function that takes a pair of coordinates,
determines whether or not the attack hit a ship and then sends the ‘hit’ function to the
correct ship, or records the coordinates of the missed shot.

Gameboards should keep track of missed attacks so they can display them properly.

Gameboards should be able to report whether or not all of their ships have been sunk.
 */

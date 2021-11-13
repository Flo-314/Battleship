/* eslint-disable max-len */
/* eslint-disable no-undef */
import GameboardFactory from '../gameboard';
import ShipFactory from '../ship';

// mock for putship and receiveattack
const gameboard = GameboardFactory();
const normalShip = ShipFactory(3);
gameboard.putShip(normalShip, 10, 2);
gameboard.receiveAttack(1, 3);
const smallShip = ShipFactory(1);
gameboard.putShip(smallShip, 4, 4);
gameboard.receiveAttack(4, 4);
const mediumShip = ShipFactory(3);
gameboard.putShip(mediumShip, 7, 7);
gameboard.receiveAttack(7, 7);
gameboard.receiveAttack(8, 7);
gameboard.receiveAttack(9, 7);
// mock for putting in a used space
const bugship = ShipFactory(2);
gameboard.putShip(bugship, 10, 2);

// mock for gameboard allSunked?
const sunkGameboard = GameboardFactory();
const sunkedship = ShipFactory(1);
sunkGameboard.putShip(sunkedship, 1, 1);
const SunkedShip2 = ShipFactory(2);
sunkGameboard.putShip(SunkedShip2, 2, 1);
sunkGameboard.receiveAttack(1, 1);
sunkGameboard.receiveAttack(2, 1);
sunkGameboard.receiveAttack(3, 1);

test('putShip in the exact cordinates', () => {
  expect(gameboard.board[19]).toBe(normalShip);
});
test('putShip using the lenght of the ship', () => {
  expect(gameboard.board[19] + gameboard.board[20] + gameboard.board[21]).toBe(normalShip + normalShip + normalShip);
});
test('putShip in a not empty space', () => {
  expect(gameboard.board[19]).toBe(normalShip);
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

test('check withouth all the boats sunked', () => {
  expect(gameboard.allSunked()).toBe(false);
});
test('check with all the boats sunked', () => {
  expect(sunkGameboard.allSunked()).toBe(true);
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

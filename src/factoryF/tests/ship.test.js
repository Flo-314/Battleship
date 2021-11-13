/* eslint-disable no-undef */

import shipFactory from '../ship';

const normalShip = shipFactory(3);
const smallShip = shipFactory(1);
smallShip.hit(1);
normalShip.hit(3);

test('Check ShipFactory Length', () => {
  expect(normalShip.length).toBe(3);
});
test('Check if hits works', () => {
  expect(smallShip.isSunk()).toBe(true);
});
test('Check that every position necesita ser hiteada', () => {
  expect(normalShip.isSunk()).toBe(false);
});
test('check that it sunks', () => {
  expect(smallShip.isSunk()).toBe(true);
});

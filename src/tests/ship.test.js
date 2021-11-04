/* eslint-disable no-undef */

import shipFactory from '../ship';

const normalShip = shipFactory(3);
const smallShip = shipFactory(1);
smallShip.hit(1);

test('Check ShipFactory Length', () => {
  expect(normalShip.length).toBe(3);
});
test('Check if hits works', () => {
  expect(normalShip.isSunk()).toBe(true);
});

/*
Begin your app by creating the Ship factory function.

    Your ‘ships’ will be objects that include their length,
     where they’ve been hit and whether or not they’ve been sunk.

    REMEMBER you only have to test your object’s public interface.
     Only methods or properties that are used outside of your ‘ship’ object need unit tests.

    Ships should have a hit() function that takes a number and then marks that position
     as ‘hit’.

    isSunk() should be a function that calculates
    it based on their length and whether all of their positions are ‘hit’.

 */

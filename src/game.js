import PlayerFactory from './factoryF/player';
import ShipFactory from './factoryF/ship';
import { gameboardMethods, cellListeners } from './gameboard';

/* To do :

*Create a loop for putting ships and random ships for ia
*PUtting the CHeckFORWIN every hit of ia or player.
*beautify the css
 */

const gameMethods = (() => {
  const newGame = () => {
    const player = PlayerFactory('player');
    const ia = PlayerFactory('ia');
    gameboardMethods.createGameboard(player);
    gameboardMethods.createGameboard(ia);
    const bugship = ShipFactory(2);
    cellListeners.addHitListener(ia, player);
    /*     cellListeners.addShipListener(player, bugship);
   */ };
  const checkForWin = (player, ia) => {
    if (player.gameboard.allSunked()) { prompt('computer wins'); } else if (ia.gameboard.allSunked()) { prompt('player'); }
  };
  return { checkForWin, newGame };
})();

export default gameMethods;

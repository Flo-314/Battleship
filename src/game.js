import PlayerFactory from './factoryF/player';
import { gameboardMethods, cellListeners } from './domMethods/gameboard';

/* To do :

*Create a loop for putting ships and random ships for ia
*PUtting the CHeckFORWIN every hit of ia or player.
*beautify the css
 */

/*

*Un meter barcos state

*Cada vez q metes un barco  se suma un I
*SI I ES = 5 se termina el barco staate, IAPutSHips()

* se inicia el  war State

*cada tiro que checkie for win.

** si  alguien winnea que tire un prompt horrible y que recargue la pagina.

*/

const gameMethods = (() => {
  const newGame = () => {
    const player = PlayerFactory('player');
    const ia = PlayerFactory('ia');
    gameboardMethods.createGameboard(player);
    gameboardMethods.createGameboard(ia);
    /*     cellListeners.addHitListener(ia, player);
 */ cellListeners.addShipListener(player);
  };
  const checkForWin = (player, ia) => {
    if (player.gameboard.allSunked()) { prompt('computer wins'); } else if (ia.gameboard.allSunked()) { prompt('player'); }
  };
  return { checkForWin, newGame };
})();

export default gameMethods;

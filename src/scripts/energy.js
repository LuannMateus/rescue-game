import { gameOver } from './game.js';

export function showEnergy(energy) {
  if (energy == 3) {
    $('#energy').css('background-image', 'url(assets/imgs/energia3.png)');
  }

  if (energy == 2) {
    $('#energy').css('background-image', 'url(assets/imgs/energia2.png)');
  }

  if (energy == 1) {
    $('#energy').css('background-image', 'url(assets/imgs/energia1.png)');
  }

  if (energy == 0) {
    $('#energy').css('background-image', 'url(assets/imgs/energia0.png)');
    gameOver();
  }
}

import { songs } from './gameSongs.js';

let shootInterval = null;

export function shoot(game) {
  if (game.canShoot) {
    songs.shootSong.play();
    game.canShoot = false;

    const playerPositionTop = parseInt($('#player').css('top'));
    const playerPositionX = parseInt($('#player').css('left'));

    const shootPositionTop = playerPositionTop + 52;
    const shootPositionX = playerPositionX + 190;

    $('#gameBackground').append('<div id="shoot"></div>');

    $('#shoot').css('top', shootPositionTop);
    $('#shoot').css('left', shootPositionX);

    shootInterval = setInterval(() => executeShooting(game), 30);
  }
}

function executeShooting(game) {
  const shootPositionX = parseInt($('#shoot').css('left'));

  $('#shoot').css('left', shootPositionX + 15);

  if (shootPositionX > 900) {
    clearInterval(shootInterval);
    shootInterval = null;

    $('#shoot').remove();

    game.canShoot = true;
  }
}

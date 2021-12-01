import { keydown, keyup, movePlayer } from './playerMovements.js';
import {
  moveApacheEnemy,
  moveTruckEnemy,
  moveFriend,
} from './enemiesAndFriendMovements.js';
import { collision } from './collision.js';
import { showEnergy } from './energy.js';
import { songs } from './gameSongs.js';

export const game = {
  press: {
    w: false,
    s: false,
    d: false,
  },
  canShoot: true,
  endGame: false,
  points: 0,
  saved: 0,
  lost: 0,
  energy: 3,
  speed: 5,
  timer: null,
};

(function main() {
  $('#start').on('click', start);

  $(document).on('keydown', (event) => keydown(event, game));
  $(document).on('keyup', (event) => keyup(event, game));
})();

function start() {
  $('#start').remove();

  game.timer = setInterval(loop, 30);

  $('#gameBackground').append('<div id="energy"></div>');

  $('#gameBackground').append('<div id="score"></div>');

  $('#gameBackground').append(
    '<div id="player" class="player__animation"></div>'
  );

  $('#gameBackground').append(
    '<div id="enemy1" class="enemy-apache__animation "></div>'
  );

  $('#gameBackground').append('<div id="enemy2"></div>');

  $('#gameBackground').append(
    '<div id="friend" class="friend__animation"></div>'
  );

  songs.music.addEventListener(
    'ended',
    function () {
      songs.music.currentTime = 0;
      songs.music.play();
    },
    false
  );
  songs.music.play();
}

function moveBackground() {
  const leftBackgroundPosition = parseInt(
    $('#gameBackground').css('background-position')
  );

  $('#gameBackground').css('background-position', leftBackgroundPosition - 1);
}

function score() {
  $('#score').html(
    `<h2> Pontos:
      ${game.points}
      Salvos:
      ${game.saved}
       Perdidos:
      ${game.lost}
      </h2>`
  );
}

export function gameOver() {
  game.endGame = true;
  songs.music.pause();
  songs.gameOverSong.play();

  $('#player').remove();
  $('#enemy1').remove();
  $('#enemy2').remove();
  $('#friend').remove();
  $('#energy').remove();
  $('#explosion__one').remove();
  $('#score').remove();

  clearInterval(game.timer);
  game.timer = null;

  $('#gameBackground').append('<div id="gameOver"></div>');

  $('#gameOver').html(
    `<h1> Game Over </h1><p>Sua pontuação foi: ${game.points} </p>
    <div id="restart"><h3>Jogar Novamente</h3></div>`
  );

  $('#restart').on('click', restartGame);
}

function restartGame() {
  $('#restart').off('click');

  songs.gameOverSong.pause();
  $('#gameOver').remove();

  game.energy = 3;
  game.points = 0;
  game.saved = 0;
  game.lost = 0;
  game.speed = 5;
  game.canShoot = true;
  game.endGame = false;

  start();
}

function loop() {
  moveBackground();
  movePlayer(game);
  moveApacheEnemy();
  moveTruckEnemy();
  moveFriend();
  collision(game);
  score();
  showEnergy(game.energy);
}

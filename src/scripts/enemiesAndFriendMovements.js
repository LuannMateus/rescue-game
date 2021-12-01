import { game } from './game.js';

let positionY = parseInt(Math.random() * 334);

export function moveApacheEnemy(newPositionY) {
  let positionX = parseInt($('#enemy1').css('left'));

  if (!!newPositionY) {
    positionY = newPositionY;
    $('#enemy1').css('left', 634);

    return;
  }

  $('#enemy1').css('left', positionX - game.speed);
  $('#enemy1').css('top', positionY);

  if (positionX <= 0) {
    positionY = parseInt(Math.random() * 334);

    $('#enemy1').css('left', 694);
    $('#enemy1').css('top', positionY);
  }
}

export function moveTruckEnemy() {
  const positionX = parseInt($('#enemy2').css('left'));

  $('#enemy2').css('left', positionX - 3);

  if (positionX <= 0) {
    $('#enemy2').css('left', 775);
  }
}

export function moveFriend() {
  const positionX = parseInt($('#friend').css('left'));

  $('#friend').css('left', positionX + 1);

  if (positionX > 906) {
    $('#friend').css('left', 0);
  }
}

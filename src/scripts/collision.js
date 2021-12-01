import { moveApacheEnemy } from './enemiesAndFriendMovements.js';
import { songs } from './gameSongs.js';

const collisionsStrategy = {
  collisionBetweenPlayerAndEnemy1: (game) => {
    const enemy1PositionX = $('#enemy1').css('left');
    const enemy1PositionY = $('#enemy1').css('top');

    explosion(enemy1PositionX, enemy1PositionY);
    game.energy--;

    const enemyNewPositionY = parseInt(Math.random() * 334);
    moveApacheEnemy(enemyNewPositionY);
  },
  collisionBetweenPlayerAndEnemy2: (game) => {
    const enemy2PositionX = $('#enemy2').css('left');
    const enemy2PositionY = $('#enemy2').css('top');

    explosion(enemy2PositionX, enemy2PositionY);
    game.energy--;

    $('#enemy2').remove();

    setTimeout(() => {
      if (game.endGame === false) {
        $('#gameBackground').append('<div id="enemy2"></div>');
      }
    }, 5000);
  },
  collisionBetweenShootAndEnemy1: (game) => {
    const enemy1PositionX = parseInt($('#enemy1').css('left'));
    const enemy1PositionY = parseInt($('#enemy1').css('top'));

    explosion(enemy1PositionX, enemy1PositionY);

    game.points += 100;
    game.speed += 0.3;

    $('#shoot').css('left', 950);

    const newPositionY = parseInt(Math.random() * 334);
    moveApacheEnemy(newPositionY);
  },
  collisionBetweenShootAndEnemy2: (game) => {
    const enemy2PositionX = $('#enemy2').css('left');
    const enemy2PositionY = $('#enemy2').css('top');

    explosion(enemy2PositionX, enemy2PositionY);

    game.points += 50;

    $('#shoot').css('left', 950);

    $('#enemy2').remove();

    setTimeout(() => {
      if (game.endGame === false) {
        $('#gameBackground').append('<div id="enemy2"></div>');
      }
    }, 5000);
  },
  collisionBetweenPlayerAndFriend: (game) => {
    songs.rescueSong.play();

    $('#friend').remove();

    game.saved++;

    setTimeout(() => {
      if (game.endGame === false) {
        $('#gameBackground').append(
          "<div id='friend' class='friend__animation'></div>"
        );
      }
    }, 6000);
  },
  collisionBetweenEnemy2AndFriend: (game) => {
    const friendPositionX = parseInt($('#friend').css('left'));
    const friendPositionY = parseInt($('#friend').css('top'));

    friendExplosion(friendPositionX, friendPositionY);

    game.lost++;

    $('#friend').remove();

    setTimeout(() => {
      if (game.endGame === false) {
        $('#gameBackground').append(
          "<div id='friend' class='friend__animation'></div>"
        );
      }
    }, 6000);
  },
};

export function collision(game) {
  const existsCollisionBetweenPlayerAndEnemy1 = $('#player').collision(
    $('#enemy1')
  );
  const existsCollisionBetweenPlayerAndEnemy2 = $('#player').collision(
    $('#enemy2')
  );
  const existsCollisionBetweenShootAndEnemy1 = $('#shoot').collision(
    $('#enemy1')
  );
  const existsCollisionBetweenShootAndEnemy2 = $('#shoot').collision(
    $('#enemy2')
  );
  const existsCollisionBetweenPlayerAndFriend = $('#player').collision(
    $('#friend')
  );
  const existsCollisionBetweenEnemy2AndFriend = $('#enemy2').collision(
    $('#friend')
  );

  if (existsCollisionBetweenPlayerAndEnemy1.length > 0) {
    collisionsStrategy.collisionBetweenPlayerAndEnemy1(game);
  }

  if (existsCollisionBetweenPlayerAndEnemy2.length > 0) {
    collisionsStrategy.collisionBetweenPlayerAndEnemy2(game);
  }

  if (existsCollisionBetweenShootAndEnemy1.length > 0) {
    collisionsStrategy.collisionBetweenShootAndEnemy1(game);
  }

  if (existsCollisionBetweenShootAndEnemy2.length > 0) {
    collisionsStrategy.collisionBetweenShootAndEnemy2(game);
  }

  if (existsCollisionBetweenPlayerAndFriend.length > 0) {
    collisionsStrategy.collisionBetweenPlayerAndFriend(game);
  }

  if (existsCollisionBetweenEnemy2AndFriend.length > 0) {
    collisionsStrategy.collisionBetweenEnemy2AndFriend(game);
  }
}

function explosion(positionX, positionY) {
  songs.explosionSong.play();
  const explosionOne = $('#explosion__one');

  $('#gameBackground').append("<div id='explosion__one'></div");
  explosionOne.css('background-image', 'url(assets/imgs/explosao.png)');

  explosionOne.css('top', positionY);
  explosionOne.css('left', positionX);

  explosionOne.animate({ width: 200, opacity: 0 }, 'slow');

  setTimeout(() => removeExplosion(explosionOne), 1000);
}

function removeExplosion(explosionOne) {
  explosionOne.remove();
}

function friendExplosion(positionX, positionY) {
  songs.lostSong.play();

  $('#gameBackground').append(
    '<div id="explosion__friend" class="friend-explosion__animation"></div>'
  );

  const explosionFriend = $('#explosion__friend');

  explosionFriend.css('top', positionY);
  explosionFriend.css('left', positionX);

  console.log(explosionFriend);

  setTimeout(() => explosionFriend.remove(), 1000);
}

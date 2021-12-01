import { shoot } from './shoot.js';

export const keyboard = {
  W: 87,
  S: 83,
  D: 68,
};

export const playerMovements = {
  w: () => {
    const top = parseInt($('#player').css('top'));

    if (top <= 0) return;

    $('#player').css('top', top - 10);
  },
  s: () => {
    const top = parseInt($('#player').css('top'));

    if (top >= 434) return;

    $('#player').css('top', top + 10);
  },
  d: (game) => shoot(game),
};

export function keydown(event, game) {
  if (!Object.values(keyboard).includes(event.keyCode)) {
    return;
  }

  game.press[event.key] = true;
}

export function keyup(event, game) {
  if (!Object.values(keyboard).includes(event.keyCode)) {
    return;
  }

  game.press[event.key] = false;
}

export function movePlayer(game) {
  if (game.press['w']) playerMovements['w']();

  if (game.press['s']) playerMovements['s']();

  if (game.press['d']) playerMovements['d'](game);
}

import { assetList } from './assetList';
import { config } from './config';

export const BIRD_SPEED = {
  UP: 550,
  DOWN: 1400,
  FORWARD: 240
};
/** Задержка (в мс) после взмаха, после которой птица начнет падать вниз */
export const BIRD_FALLING_DELAY = 400;

/** Расстояние между участками труб */
export const PIPE_DISTANCE = 500;
/**
 * Количество долей от высоты экрана, которые могут занимать трубы.
 * Выше значение - больше вариативности в спавне дыр между трубами.
 */
export const PIPE_CELLS = 8;
/** Количество клеток, которые занимает дырка */
export const HOLE_CELLS = 2;
export const CELL_HEIGHT = (config.height - assetList.ground.sizes.height) / PIPE_CELLS;
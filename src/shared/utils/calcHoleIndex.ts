import random from 'random';
import { HOLE_CELLS, PIPE_CELLS } from 'shared/vars';

export const calcHoleIndex = (lastIndex: number | null) => {
  switch (lastIndex) {
    case 0:
    case PIPE_CELLS - HOLE_CELLS:
      throw new Error(`Запредельное значение. Допустимые значения от 1 до ${PIPE_CELLS - 1 - HOLE_CELLS}`);

    case 1:
      return 2;

    case PIPE_CELLS - 1 - HOLE_CELLS:
      return PIPE_CELLS - 2 - HOLE_CELLS;

    case null:
      return random.int(0 + 1, PIPE_CELLS - 1 - HOLE_CELLS);

    default:
      return random.bool() ? random.int(0 + 1, lastIndex - 1) : random.int(lastIndex + 1, PIPE_CELLS - 1 - HOLE_CELLS);
  }
};
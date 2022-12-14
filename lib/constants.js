export const GRID_WIDTH = 14
export const GRID_HEIGHT = 7
export const HEX_WIDTH_RATIO = 1.7321
export const HEX_HEIGHT_RATIO = 1.582
export const ABSOLUTE_TILE_SIZE = 225
export const HEX_SPRITE_WIDTH = 392
export const HEX_SPRITE_HEIGHT = 452
export const WIDTH = 1280
export const HEIGHT = 800
export const TICK_RATE = 200
export const TILE_SIZE = WIDTH / ((GRID_WIDTH - 1.1) * HEX_WIDTH_RATIO)
export const TILE_HEIGHT = TILE_SIZE * HEX_HEIGHT_RATIO

export const UNITS = [
  { gridX: 3, gridY: 2, team: 0 },
  { gridX: 3, gridY: 1, team: 0 },
  { gridX: 2, gridY: 3, team: 0 },
  { gridX: 9, gridY: 1, team: 1 },
  { gridX: 10, gridY: 2, team: 1 },
  { gridX: 10, gridY: 3, team: 1 },
]
export const MAP = [
  // left base
  [1, 0, 4],
  [2, 0, 4],
  [0, 1, 4],
  [1, 1, 4],
  [2, 1, 4],
  [1, 2, 4],
  [2, 2, 4],

  // left rocks
  [0, 0, 1],
  [0, 2, 1],
  [0, 4, 1],
  [0, 6, 1],
  [1, 4, 1],
  [1, 5, 1],
  [1, 6, 1],
  [0, 3, 1],
  [0, 5, 1],
  [2, 6, 1],

  // right base
  [11, 0, 4],
  [12, 0, 4],
  [10, 1, 4],
  [11, 1, 4],
  [12, 1, 4],
  [11, 2, 4],
  [12, 2, 4],

  // right rocks
  [13, 0, 1],
  [13, 2, 1],
  [13, 4, 1],
  [13, 6, 1],
  [12, 3, 1],
  [12, 4, 1],
  [11, 5, 1],
  [12, 5, 1],
  [11, 6, 1],
  [12, 6, 1],

  // middle rocks
  [4, 2, 1],
  [3, 3, 1],
  [6, 3, 1],
  [6, 5, 1],
  [9, 2, 1],
  [9, 3, 1],

  // resources
  [4, 5, 2],
  [3, 5, 2],
  [4, 6, 2],
  [5, 6, 2],
  [9, 5, 2],
  [8, 5, 2],
  [9, 6, 2],
  [8, 6, 2],

  // pads
  [5, 3, 3],
  [4, 3, 3],
  [5, 2, 3],
  [8, 3, 3],
  [7, 3, 3],
  [8, 2, 3],
]

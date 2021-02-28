export const BRICKS_ROWS = 4;
export const BRICKS_COLS = 7;

export const BRICK_WIDTH = 2;
export const BRICK_HEIGHT = 1;
export const BRICK_DEPTH = 1;

export const BRICK_PADDING = 0.5;

export const SCREEN_MID =
  (BRICKS_COLS * BRICK_WIDTH + BRICKS_COLS * BRICK_PADDING) / 2 - BRICK_WIDTH / 2 - BRICK_PADDING / 2;

export const BOUNDARY_LEFT = 0;
export const BOUNDARY_RIGHT = BRICKS_COLS * BRICK_WIDTH + BRICKS_COLS * BRICK_PADDING;

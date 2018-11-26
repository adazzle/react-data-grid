// CellMasks should render in front of the cells
// Unfrozen cells do not have a zIndex specifed
export const CELL_MASK = 1;

// Frozen cells have a zIndex value of 2 so CELL_MASK should have a higher value
export const FROZEN_CELL_MASK = 3;

// EditorContainer is rendered ouside the grid and it should have zIndex
// equal or higher that the zIndex of the frozen cells
// Frozen cells have a zIndex value of 2
export const EDITOR_CONTAINER = 2;

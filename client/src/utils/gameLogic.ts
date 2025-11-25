import { CellValue, Winner } from '../types/game.types';

/**
 * Check if there's a winner on the board
 * Works for any board size (3x3 to 15x15)
 */
export const checkWinner = (cells: CellValue[], boardSize: number): Winner => {
	const rows = Array.from({ length: boardSize }, () => new Set<CellValue>());
	const cols = Array.from({ length: boardSize }, () => new Set<CellValue>());
	const mainDiag = new Set<CellValue>();
	const antiDiag = new Set<CellValue>();

	let filledCells = 0;

	for (let r = 0; r < boardSize; r++) {
		for (let c = 0; c < boardSize; c++) {
			const cell = cells[r * boardSize + c];
			if (cell) filledCells++;

			// Track rows + columns
			rows[r].add(cell);
			cols[c].add(cell);

			// Main diag
			if (r === c) mainDiag.add(cell);

			// Anti-diag
			if (c === boardSize - 1 - r) antiDiag.add(cell);
		}
	}

	// Row or column win
	for (let i = 0; i < boardSize; i++) {
		if (rows[i].size === 1 && !rows[i].has(null)) return [...rows[i]][0]!;
		if (cols[i].size === 1 && !cols[i].has(null)) return [...cols[i]][0]!;
	}

	// Main diagonal win
	if (mainDiag.size === 1 && !mainDiag.has(null)) {
		return [...mainDiag][0]!;
	}

	// Anti diagonal win
	if (antiDiag.size === 1 && !antiDiag.has(null)) {
		return [...antiDiag][0]!;
	}

	// Draw
	if (filledCells === boardSize * boardSize) return 'draw';

	return null;
};

/**
 * Calculate cell size based on board size for responsive design
 */
export const calculateCellSize = (boardSize: number): number => {
	return Math.max(60, Math.min(100, 400 / boardSize));
};

/**
 * Create an empty board
 */
export const createEmptyBoard = (boardSize: number): CellValue[] => {
	return Array(boardSize * boardSize).fill(null);
};

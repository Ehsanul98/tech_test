import {
	checkWinner,
	createEmptyBoard,
	calculateCellSize,
} from '../utils/gameLogic';
import { CellValue } from '../types/game.types';

describe('checkWinner', () => {
	test('should detect horizontal win', () => {
		const board: CellValue[] = [
			'X',
			'X',
			'X',
			null,
			'O',
			null,
			'O',
			null,
			null,
		];
		expect(checkWinner(board, 3)).toBe('X');
	});

	test('should detect vertical win', () => {
		const board: CellValue[] = [
			'X',
			'O',
			null,
			'X',
			'O',
			null,
			'X',
			null,
			null,
		];
		expect(checkWinner(board, 3)).toBe('X');
	});

	test('should detect main diagonal win', () => {
		const board: CellValue[] = [
			'X',
			'O',
			null,
			null,
			'X',
			'O',
			null,
			null,
			'X',
		];
		expect(checkWinner(board, 3)).toBe('X');
	});

	test('should detect anti-diagonal win', () => {
		const board: CellValue[] = ['O', null, 'X', null, 'X', 'O', 'X', null, 'O'];
		expect(checkWinner(board, 3)).toBe('X');
	});

	test('should return null when no winner yet', () => {
		const board: CellValue[] = [
			'X',
			'O',
			null,
			null,
			'X',
			null,
			'O',
			null,
			null,
		];
		expect(checkWinner(board, 3)).toBeNull();
	});

	test('should detect draw', () => {
		const board: CellValue[] = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
		expect(checkWinner(board, 3)).toBe('draw');
	});

	test('should work with larger board (5x5)', () => {
		const board: CellValue[] = [
			'O',
			null,
			null,
			null,
			null,
			null,
			'O',
			null,
			null,
			null,
			null,
			null,
			'O',
			null,
			null,
			null,
			null,
			null,
			'O',
			null,
			null,
			null,
			null,
			null,
			'O',
		];
		expect(checkWinner(board, 5)).toBe('O');
	});
});

describe('createEmptyBoard', () => {
	test('should create board with correct size', () => {
		const board = createEmptyBoard(3);
		expect(board).toHaveLength(9);
		expect(board.every((cell) => cell === null)).toBe(true);
	});

	test('should work with different sizes', () => {
		expect(createEmptyBoard(5)).toHaveLength(25);
		expect(createEmptyBoard(10)).toHaveLength(100);
	});
});

describe('calculateCellSize', () => {
	test('should return 100 for small boards', () => {
		expect(calculateCellSize(3)).toBe(100);
	});

	test('should return smaller size for large boards', () => {
		expect(calculateCellSize(10)).toBeLessThan(100);
	});

	test('should never go below minimum', () => {
		expect(calculateCellSize(15)).toBeGreaterThanOrEqual(60);
	});
});

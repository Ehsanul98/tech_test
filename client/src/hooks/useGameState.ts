import { useState, useCallback } from 'react';
import { CellValue, Player, Winner } from '../types/game.types';
import { checkWinner, createEmptyBoard } from '../utils/gameLogic';

interface UseGameStateReturn {
	board: CellValue[];
	currentPlayer: Player;
	winner: Winner;
	boardSize: number;
	makeMove: (index: number) => void;
	resetGame: () => void;
	setBoardSize: (size: number) => void;
}

/**
 * Custom hook for managing game state
 */
export const useGameState = ({
	initialBoardSize = 3,
}: {
	initialBoardSize?: number;
}): UseGameStateReturn => {
	const [boardSize, setBoardSizeState] = useState(initialBoardSize);
	const [board, setBoard] = useState<CellValue[]>(
		createEmptyBoard(initialBoardSize)
	);
	const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
	const [winner, setWinner] = useState<Winner>(null);

	/**
	 * Make a move on the board
	 */
	const makeMove = useCallback(
		(index: number) => {
			// Update board with current player's move
			const newBoard = [...board];
			newBoard[index] = currentPlayer;
			setBoard(newBoard);

			// Check for winner
			const gameWinner = checkWinner(newBoard, boardSize);
			if (gameWinner) {
				setWinner(gameWinner);
			}

			// Switch player
			setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
		},
		[board, currentPlayer, winner, boardSize]
	);

	/**
	 * Reset the game to initial state
	 */
	const resetGame = useCallback(() => {
		setBoard(createEmptyBoard(boardSize));
		setCurrentPlayer('X');
		setWinner(null);
	}, [boardSize]);

	/**
	 * Change board size and reset game
	 */
	const setBoardSize = useCallback((size: number) => {
		setBoardSizeState(size);
		setBoard(createEmptyBoard(size));
		setCurrentPlayer('X');
		setWinner(null);
	}, []);

	return {
		board,
		currentPlayer,
		winner,
		boardSize,
		makeMove,
		resetGame,
		setBoardSize,
	};
};

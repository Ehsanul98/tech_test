import React, { useEffect } from 'react';
import { useGameState } from '../../hooks/useGameState';
import { useStats } from '../../hooks/useStats';
import Board from '../Board/Board';
import GameStatus from '../GameStatus/GameStatus';
import Stats from '../Stats/Stats';
import BoardSizeControl from '../Controls/BoardSizeControl';
import Button from '../atoms/Button';

const Game: React.FC = () => {
	const {
		board,
		currentPlayer,
		winner,
		boardSize,
		makeMove,
		resetGame,
		setBoardSize,
	} = useGameState({ initialBoardSize: 3 });

	const { stats, isLoading, saveGameResult, error: statsError } = useStats();

	// Save game result when there's a winner
	useEffect(() => {
		if (winner) {
			saveGameResult(winner, boardSize);
		}
	}, [winner, boardSize, saveGameResult]);

	return (
		<div className='flex items-center justify-center min-h-screen p-8'>
			<div className='bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full'>
				<h1 className='text-4xl font-bold text-center mb-8 text-indigo-900'>
					Tic-Tac-Toe
				</h1>

				<BoardSizeControl boardSize={boardSize} onSizeChange={setBoardSize} />

				<GameStatus currentPlayer={currentPlayer} winner={winner} />

				<div className='flex justify-center mb-6'>
					<Board
						cells={board}
						boardSize={boardSize}
						onCellClick={makeMove}
						winner={winner}
					/>
				</div>

				<div className='flex justify-center mb-8'>
					<Button onClick={resetGame} disabled={isLoading}>
						{isLoading ? 'Saving...' : 'New Game'}
					</Button>
				</div>
				{statsError && (
					<h3 className='text-4xl font-bold text-center mb-8 text-indigo-900'>
						{statsError}
					</h3>
				)}
				<Stats stats={stats} isLoading={isLoading} />
			</div>
		</div>
	);
};

export default Game;

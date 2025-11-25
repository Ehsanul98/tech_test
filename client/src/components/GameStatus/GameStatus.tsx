import React from 'react';
import { GameStatusProps } from '../../types/game.types';

const GameStatus: React.FC<GameStatusProps> = ({ currentPlayer, winner }) => {
	const getMessage = () => {
		if (winner === 'draw') return 'Game ended in a draw!';
		if (winner) return `Winner: ${winner}`;
		return `Next player: ${currentPlayer}`;
	};

	const getColorClass = () => {
		if (winner) return 'text-green-600';
		return 'text-indigo-700';
	};

	return (
		<div className='text-center mb-6'>
			<p className={`text-2xl font-bold ${getColorClass()}`}>{getMessage()}</p>
		</div>
	);
};

export default GameStatus;

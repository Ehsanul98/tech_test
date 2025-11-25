import React from 'react';
import { BoardProps } from '../../types/game.types';
import { calculateCellSize } from '../../utils/gameLogic';
import Cell from './Cell';

const Board: React.FC<BoardProps> = ({
	cells,
	boardSize,
	onCellClick,
	winner,
}) => {
	const cellSize = calculateCellSize(boardSize);
	return (
		<div
			className='inline-grid gap-2 p-4 bg-gray-100 rounded-xl'
			style={{
				gridTemplateColumns: `repeat(${boardSize}, ${cellSize}px)`,
			}}
		>
			{cells.map((cell, index) => (
				<Cell
					key={index}
					value={cell}
					size={cellSize}
					onClick={() => onCellClick(index)}
					disabled={!!winner || !!cell}
				/>
			))}
		</div>
	);
};

export default Board;

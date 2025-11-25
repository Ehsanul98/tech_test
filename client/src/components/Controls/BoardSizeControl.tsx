import React from 'react';
import { BoardSizeControlProps } from '../../types/game.types';

const BoardSizeControl: React.FC<BoardSizeControlProps> = ({
	boardSize,
	onSizeChange,
}) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const size = parseInt(e.target.value);
		if (size >= 3 && size <= 15) {
			onSizeChange(size);
		}
	};

	return (
		<div className='mb-6 flex items-center justify-center gap-4'>
			<label
				htmlFor='board-size'
				className='text-lg font-semibold text-gray-700'
			>
				Board Size:
			</label>
			<input
				id='board-size'
				type='number'
				min='3'
				max='15'
				value={boardSize}
				onChange={handleChange}
				className='w-20 px-3 py-2 border-2 border-indigo-300 rounded-lg focus:outline-none focus:border-indigo-500 text-center font-semibold'
			/>
			<span className='text-gray-600'>
				({boardSize}×{boardSize})
			</span>
		</div>
	);
};

export default BoardSizeControl;

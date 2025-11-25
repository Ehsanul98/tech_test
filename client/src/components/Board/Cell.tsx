import React from 'react';
import { CellValue } from '../../types/game.types';

interface CellProps {
	value: CellValue;
	size: number;
	onClick: () => void;
	disabled: boolean;
}

const Cell: React.FC<CellProps> = ({ value, size, onClick, disabled }) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`
        bg-white rounded-lg font-bold text-3xl
        transition-all duration-200
        ${
					!value && !disabled
						? 'hover:bg-indigo-50 hover:scale-105 cursor-pointer'
						: ''
				}
        ${value === 'X' ? 'text-blue-600' : ''}
        ${value === 'O' ? 'text-red-600' : ''}
        ${disabled && !value ? 'opacity-50' : ''}
        shadow-md hover:shadow-lg
        disabled:cursor-not-allowed
      `}
			style={{
				width: `${size}px`,
				height: `${size}px`,
			}}
		>
			{value}
		</button>
	);
};

export default Cell;

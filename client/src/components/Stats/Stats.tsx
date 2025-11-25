import React from 'react';
import { StatsProps } from '../../types/game.types';

const Stats: React.FC<StatsProps> = ({ stats, isLoading }) => {
	return (
		<div className='border-t-2 border-gray-200 pt-6'>
			<h2 className='text-2xl font-bold text-center mb-4 text-gray-800'>
				Game Statistics
			</h2>

			{isLoading && (
				<div className='text-center text-gray-500 mb-2'>
					<p className='text-sm'>Updating...</p>
				</div>
			)}

			<div className='grid grid-cols-3 gap-4 text-center'>
				<div className='bg-blue-50 rounded-lg p-4'>
					<p className='text-3xl font-bold text-blue-600'>{stats.xWins}</p>
					<p className='text-sm font-semibold text-gray-700'>X Wins</p>
				</div>
				<div className='bg-red-50 rounded-lg p-4'>
					<p className='text-3xl font-bold text-red-600'>{stats.oWins}</p>
					<p className='text-sm font-semibold text-gray-700'>O Wins</p>
				</div>
				<div className='bg-gray-50 rounded-lg p-4'>
					<p className='text-3xl font-bold text-gray-600'>{stats.draws}</p>
					<p className='text-sm font-semibold text-gray-700'>Draws</p>
				</div>
			</div>
		</div>
	);
};

export default Stats;

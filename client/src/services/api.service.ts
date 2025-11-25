import { GameStats, GameResult } from '../types/game.types';

const API_BASE_URL = 'http://localhost:3002/api';

/**
 * API service for communicating with the backend
 */
export const gameApi = {
	/**
	 * Save a game result to the database
	 */
	saveGame: async (
		result: GameResult
	): Promise<{ id: number; message: string }> => {
		const response = await fetch(`${API_BASE_URL}/games`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				winner: result.winner,
				boardSize: result.boardSize,
			}),
		});

		if (!response.ok) {
			throw new Error('Failed to save game');
		}

		return response.json();
	},

	/**
	 * Fetch overall game statistics
	 */
	getStats: async (): Promise<GameStats> => {
		const response = await fetch(`${API_BASE_URL}/stats`);

		if (!response.ok) {
			throw new Error('Failed to fetch statistics');
		}

		return response.json();
	},
};

import { useState, useEffect, useCallback } from 'react';
import { GameStats, Winner } from '../types/game.types';
import { gameApi } from '../services/api.service';

interface UseStatsReturn {
	stats: GameStats;
	isLoading: boolean;
	error: string | null;
	saveGameResult: (winner: Winner, boardSize: number) => Promise<void>;
}

/**
 * Custom hook for managing game statistics
 */
export const useStats = (): UseStatsReturn => {
	const [stats, setStats] = useState<GameStats>({
		xWins: 0,
		oWins: 0,
		draws: 0,
	});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	/**
	 * Fetch statistics from the API
	 */
	const refreshStats = useCallback(async () => {
		try {
			setError(null);
			const data = await gameApi.getStats();
			setStats(data);
		} catch (err) {
			console.error('Failed to fetch stats:', err);
			setError('Could not load statistics');
			// Keep existing stats on error
		}
	}, []);

	/**
	 * Save game result and refresh stats
	 */
	const saveGameResult = useCallback(
		async (winner: Winner, boardSize: number) => {
			if (!winner || winner === null) return;

			setIsLoading(true);
			setError(null);

			try {
				await gameApi.saveGame({ winner, boardSize });
				await refreshStats();
			} catch (err) {
				console.error('Failed to save game:', err);
				setError('Could not save game result');
			} finally {
				setIsLoading(false);
			}
		},
		[refreshStats]
	);

	// Load stats on mount
	useEffect(() => {
		refreshStats();
	}, [refreshStats]);

	return {
		stats,
		isLoading,
		error,
		saveGameResult,
	};
};

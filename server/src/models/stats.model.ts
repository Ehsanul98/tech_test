import { getDatabase } from '../database/connection';
import { GameStats } from '../types';

export const getOverallStats = (): Promise<GameStats> => {
	return new Promise((resolve, reject) => {
		const db = getDatabase();
		const query = `
      SELECT 
        COUNT(CASE WHEN winner_id = 1 THEN 1 END) as xWins,
        COUNT(CASE WHEN winner_id = 2 THEN 1 END) as oWins,
        COUNT(CASE WHEN is_draw = 1 THEN 1 END) as draws,
        COUNT(*) as totalGames
      FROM games
    `;

		db.get(query, [], (err, row: any) => {
			if (err) reject(err);
			else
				resolve({
					xWins: row?.xWins || 0,
					oWins: row?.oWins || 0,
					draws: row?.draws || 0,
					totalGames: row?.totalGames || 0,
				});
		});
	});
};

import { getDatabase } from '../database/connection';
import { Game } from '../types';

export const createGame = async (game: Game): Promise<number> => {
	const db = getDatabase();

	// Get player IDs (X is always id 1, O is always id 2)
	const playerXId = 1;
	const playerOId = 2;

	let winnerId = null;
	let isDraw = 0;

	if (game.winner === 'draw') {
		isDraw = 1;
	} else if (game.winner === 'X') {
		winnerId = 1;
	} else if (game.winner === 'O') {
		winnerId = 2;
	}

	return new Promise((resolve, reject) => {
		const query = `
      INSERT INTO games (board_size, player_x_id, player_o_id, winner_id, is_draw) 
      VALUES (?, ?, ?, ?, ?)
    `;

		db.run(
			query,
			[game.board_size, playerXId, playerOId, winnerId, isDraw],
			function (err) {
				if (err) reject(err);
				else resolve(this.lastID);
			}
		);
	});
};

import { getDatabase } from './connection';

export const initializeDatabase = (): void => {
	const db = getDatabase();

	db.serialize(() => {
		// Players table
		db.run(`
      CREATE TABLE IF NOT EXISTS players (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

		// Games table with foreign keys to players
		db.run(`
      CREATE TABLE IF NOT EXISTS games (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        board_size INTEGER NOT NULL,
        player_x_id INTEGER NOT NULL,
        player_o_id INTEGER NOT NULL,
        winner_id INTEGER,
        is_draw BOOLEAN DEFAULT 0,
        played_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (player_x_id) REFERENCES players(id),
        FOREIGN KEY (player_o_id) REFERENCES players(id),
        FOREIGN KEY (winner_id) REFERENCES players(id)
      )
    `);

		// Seed players
		db.run(`INSERT OR IGNORE INTO players (name) VALUES ('X')`);
		db.run(`INSERT OR IGNORE INTO players (name) VALUES ('O')`);

		console.log('Database initialized');
	});
};

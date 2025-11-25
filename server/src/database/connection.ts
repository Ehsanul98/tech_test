import sqlite3 from 'sqlite3';
import { Database } from 'sqlite3';
import fs from 'fs';

let db: Database | null = null;

const DB_PATH =
	process.env.NODE_ENV === 'test' ? './test-tictactoe.db' : './tictactoe.db';

export const getDatabase = (): Database => {
	if (!db) {
		db = new sqlite3.Database(DB_PATH, (err) => {
			if (err) {
				console.error('Database connection error:', err);
				throw err;
			}
			console.log('Connected to SQLite database');
		});
	}
	return db;
};

export const closeDatabase = (): Promise<void> => {
	return new Promise((resolve, reject) => {
		if (db) {
			db.close((err) => {
				if (err) reject(err);
				else {
					db = null;
					resolve();
				}
			});
		} else {
			resolve();
		}
	});
};

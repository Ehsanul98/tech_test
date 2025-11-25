import request from 'supertest';
import express from 'express';
import cors from 'cors';
import { gameRouter } from '../routes/game.routes';
import { statsRouter } from '../routes/stats.routes';
import { initializeDatabase } from '../database/init';
import { getDatabase } from '../database/connection';
import fs from 'fs';

// Create test app
const app = express();
app.use(cors());
app.use(express.json());

// Use a test database
const TEST_DB_PATH = './test-tictactoe.db';

// Setup before tests
beforeAll(() => {
	// Remove existing test database
	if (fs.existsSync(TEST_DB_PATH)) {
		fs.unlinkSync(TEST_DB_PATH);
	}

	// Initialize test database
	initializeDatabase();

	// Setup routes
	app.use('/api/games', gameRouter);
	app.use('/api/stats', statsRouter);
});

// Cleanup after tests
afterAll(() => {
	const db = getDatabase();
	db.close();

	// Remove test database
	if (fs.existsSync(TEST_DB_PATH)) {
		fs.unlinkSync(TEST_DB_PATH);
	}
});

describe('Tic-Tac-Toe API Tests', () => {
	describe('POST /api/games', () => {
		it('should create a game where X wins', async () => {
			const response = await request(app)
				.post('/api/games')
				.send({ winner: 'X', boardSize: 3 })
				.expect(201);

			expect(response.body).toHaveProperty('id');
			expect(response.body.message).toBe('Game saved');
		});

		it('should create a game where O wins', async () => {
			const response = await request(app)
				.post('/api/games')
				.send({ winner: 'O', boardSize: 4 })
				.expect(201);

			expect(response.body).toHaveProperty('id');
		});

		it('should create a game that ends in draw', async () => {
			const response = await request(app)
				.post('/api/games')
				.send({ winner: 'draw', boardSize: 3 })
				.expect(201);

			expect(response.body).toHaveProperty('id');
		});

		it('should reject invalid winner', async () => {
			const response = await request(app)
				.post('/api/games')
				.send({ winner: 'Z', boardSize: 3 })
				.expect(400);

			expect(response.body.error).toContain('Invalid winner');
		});

		it('should reject invalid board size (too small)', async () => {
			const response = await request(app)
				.post('/api/games')
				.send({ winner: 'X', boardSize: 2 })
				.expect(400);

			expect(response.body.error).toContain('Invalid board size');
		});

		it('should reject invalid board size (too large)', async () => {
			const response = await request(app)
				.post('/api/games')
				.send({ winner: 'X', boardSize: 16 })
				.expect(400);

			expect(response.body.error).toContain('Invalid board size');
		});

		it('should reject missing winner', async () => {
			const response = await request(app)
				.post('/api/games')
				.send({ boardSize: 3 })
				.expect(400);

			expect(response.body.error).toContain('Missing required fields');
		});

		it('should reject missing boardSize', async () => {
			const response = await request(app)
				.post('/api/games')
				.send({ winner: 'X' })
				.expect(400);

			expect(response.body.error).toContain('Missing required fields');
		});
	});

	describe('GET /api/stats', () => {
		it('should return stats with correct structure', async () => {
			const response = await request(app).get('/api/stats').expect(200);

			expect(response.body).toHaveProperty('xWins');
			expect(response.body).toHaveProperty('oWins');
			expect(response.body).toHaveProperty('draws');
			expect(response.body).toHaveProperty('totalGames');
		});

		it('should calculate stats correctly', async () => {
			// We created: 1 X win, 1 O win, 1 draw in previous tests
			const response = await request(app).get('/api/stats').expect(200);

			expect(response.body.xWins).toBeGreaterThanOrEqual(1);
			expect(response.body.oWins).toBeGreaterThanOrEqual(1);
			expect(response.body.draws).toBeGreaterThanOrEqual(1);
			expect(response.body.totalGames).toBeGreaterThanOrEqual(3);
		});

		it('should have totalGames equal to sum of wins and draws', async () => {
			const response = await request(app).get('/api/stats').expect(200);

			const { xWins, oWins, draws, totalGames } = response.body;
			expect(totalGames).toBe(xWins + oWins + draws);
		});
	});
});

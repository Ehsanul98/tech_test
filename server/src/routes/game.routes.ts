import { Router, Request, Response } from 'express';
import { createGame } from '../models/game.model';

export const gameRouter = Router();

gameRouter.post('/', async (req: Request, res: Response) => {
	try {
		const { winner, boardSize } = req.body;

		if (!winner || !boardSize) {
			return res.status(400).json({ error: 'Missing required fields' });
		}

		if (!['X', 'O', 'draw'].includes(winner)) {
			return res.status(400).json({ error: 'Invalid winner' });
		}

		if (boardSize < 3 || boardSize > 15) {
			return res.status(400).json({ error: 'Invalid board size' });
		}

		const gameId = await createGame({ board_size: boardSize, winner });

		res.status(201).json({ id: gameId, message: 'Game saved' });
	} catch (error) {
		console.error('Error creating game:', error);
		res.status(500).json({ error: 'Failed to save game' });
	}
});

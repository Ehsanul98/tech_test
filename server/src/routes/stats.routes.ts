import { Router, Request, Response } from 'express';
import { getOverallStats } from '../models/stats.model';

export const statsRouter = Router();

statsRouter.get('/', async (req: Request, res: Response) => {
	try {
		const stats = await getOverallStats();
		res.json(stats);
	} catch (error) {
		console.error('Error fetching stats:', error);
		res.status(500).json({ error: 'Failed to fetch statistics' });
	}
});

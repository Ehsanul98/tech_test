import express, { Express } from 'express';
import cors from 'cors';
import { gameRouter } from './routes/game.routes';
import { statsRouter } from './routes/stats.routes';
import { initializeDatabase } from './database/init';

const app: Express = express();
const PORT: number = Number(process.env.PORT) || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database
initializeDatabase();

// Routes
app.use('/api/games', gameRouter);
app.use('/api/stats', statsRouter);

// Health check
app.get('/health', (req, res) => {
	res.json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});

export default app;

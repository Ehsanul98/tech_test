export interface Game {
	id?: number;
	board_size: number;
	winner: 'X' | 'O' | 'draw';
	played_at?: string;
}

export interface GameStats {
	xWins: number;
	oWins: number;
	draws: number;
	totalGames: number;
}

export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type Winner = Player | 'draw' | null;

export interface GameStats {
	xWins: number;
	oWins: number;
	draws: number;
	totalGames?: number;
}

export interface GameResult {
	winner: Winner;
	boardSize: number;
}

export interface BoardProps {
	cells: CellValue[];
	boardSize: number;
	onCellClick: (index: number) => void;
	winner: Winner;
}

export interface GameStatusProps {
	currentPlayer: Player;
	winner: Winner;
}

export interface StatsProps {
	stats: GameStats;
	isLoading: boolean;
}

export interface BoardSizeControlProps {
	boardSize: number;
	onSizeChange: (size: number) => void;
}

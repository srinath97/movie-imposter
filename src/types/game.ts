export type GamePhase = 'howToPlay' | 'setup' | 'reveal' | 'end';

export interface Player {
  id: string;
  name: string;
  movie: string;
  isImposter: boolean;
}

export interface GameState {
  phase: GamePhase;
  players: Player[];
  currentPlayerIndex: number;
  actualMovie: string;
  imposterMovie: string;
}

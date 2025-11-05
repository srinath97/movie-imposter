export type GamePhase = 'setup' | 'reveal' | 'clues' | 'voting' | 'results';

export interface Player {
  id: string;
  name: string;
  movie: string;
  isImposter: boolean;
  clue?: string;
  votedFor?: string;
}

export interface GameState {
  phase: GamePhase;
  players: Player[];
  currentPlayerIndex: number;
  actualMovie: string;
  imposterMovie: string;
  imposterGuess?: string;
}

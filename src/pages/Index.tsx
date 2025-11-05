import { useState } from 'react';
import { GameState, Player } from '@/types/game';
import { getRandomMovies } from '@/data/movies';
import { GameSetup } from '@/components/GameSetup';
import { MovieReveal } from '@/components/MovieReveal';
import { CluePhase } from '@/components/CluePhase';
import { VotingPhase } from '@/components/VotingPhase';
import { GameResults } from '@/components/GameResults';

const Index = () => {
  const [gameState, setGameState] = useState<GameState>({
    phase: 'setup',
    players: [],
    currentPlayerIndex: 0,
    actualMovie: '',
    imposterMovie: '',
  });

  const startGame = (playerNames: string[]) => {
    const [actualMovie, imposterMovie] = getRandomMovies(2);
    const imposterIndex = Math.floor(Math.random() * playerNames.length);
    
    const players: Player[] = playerNames.map((name, index) => ({
      id: `player-${index}`,
      name,
      movie: index === imposterIndex ? imposterMovie : actualMovie,
      isImposter: index === imposterIndex,
    }));

    setGameState({
      phase: 'reveal',
      players,
      currentPlayerIndex: 0,
      actualMovie,
      imposterMovie,
    });
  };

  const nextReveal = () => {
    if (gameState.currentPlayerIndex < gameState.players.length - 1) {
      setGameState(prev => ({
        ...prev,
        currentPlayerIndex: prev.currentPlayerIndex + 1,
      }));
    } else {
      setGameState(prev => ({
        ...prev,
        phase: 'clues',
        currentPlayerIndex: 0,
      }));
    }
  };

  const submitClue = (clue: string) => {
    const updatedPlayers = [...gameState.players];
    updatedPlayers[gameState.currentPlayerIndex].clue = clue;

    if (gameState.currentPlayerIndex < gameState.players.length - 1) {
      setGameState({
        ...gameState,
        players: updatedPlayers,
        currentPlayerIndex: gameState.currentPlayerIndex + 1,
      });
    } else {
      setGameState({
        ...gameState,
        players: updatedPlayers,
        phase: 'voting',
        currentPlayerIndex: 0,
      });
    }
  };

  const submitVote = (votedPlayerId: string, imposterGuess?: string) => {
    const updatedPlayers = [...gameState.players];
    updatedPlayers[gameState.currentPlayerIndex].votedFor = votedPlayerId;

    if (gameState.currentPlayerIndex < gameState.players.length - 1) {
      setGameState({
        ...gameState,
        players: updatedPlayers,
        currentPlayerIndex: gameState.currentPlayerIndex + 1,
        imposterGuess: imposterGuess || gameState.imposterGuess,
      });
    } else {
      setGameState({
        ...gameState,
        players: updatedPlayers,
        phase: 'results',
        imposterGuess: imposterGuess || gameState.imposterGuess,
      });
    }
  };

  const playAgain = () => {
    setGameState({
      phase: 'setup',
      players: [],
      currentPlayerIndex: 0,
      actualMovie: '',
      imposterMovie: '',
    });
  };

  return (
    <>
      {gameState.phase === 'setup' && <GameSetup onStartGame={startGame} />}
      {gameState.phase === 'reveal' && (
        <MovieReveal
          players={gameState.players}
          currentPlayerIndex={gameState.currentPlayerIndex}
          onNext={nextReveal}
        />
      )}
      {gameState.phase === 'clues' && (
        <CluePhase
          players={gameState.players}
          currentPlayerIndex={gameState.currentPlayerIndex}
          onSubmitClue={submitClue}
        />
      )}
      {gameState.phase === 'voting' && (
        <VotingPhase
          players={gameState.players}
          currentPlayerIndex={gameState.currentPlayerIndex}
          onVote={submitVote}
          actualMovie={gameState.actualMovie}
        />
      )}
      {gameState.phase === 'results' && (
        <GameResults
          players={gameState.players}
          actualMovie={gameState.actualMovie}
          imposterMovie={gameState.imposterMovie}
          imposterGuess={gameState.imposterGuess}
          onPlayAgain={playAgain}
        />
      )}
    </>
  );
};

export default Index;

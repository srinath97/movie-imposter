import { GameEnd } from '@/components/GameEnd';
import { GameSetup } from '@/components/GameSetup';
import { MovieReveal } from '@/components/MovieReveal';
import { getRandomMovies } from '@/data/movies';
import { GameState, Player } from '@/types/game';
import { useState } from 'react';

const Index = () => {
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [gameState, setGameState] = useState<GameState>({
    phase: 'setup',
    players: [],
    currentPlayerIndex: 0,
    actualMovie: '',
    imposterMovie: '',
  });

  const startGame = (names: string[]) => {
    setPlayerNames(names);
    startNewGame(names);
  };

  const startNewGame = (names: string[]) => {
    const [actualMovie, imposterMovie] = getRandomMovies(2);
    const imposterIndex = Math.floor(Math.random() * names.length);
    
    const players: Player[] = names.map((name, index) => ({
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
        phase: 'end',
      }));
    }
  };

  const restartGame = () => {
    startNewGame(playerNames);
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
      {gameState.phase === 'end' && (
        <GameEnd
          players={gameState.players}
          actualMovie={gameState.actualMovie}
          imposterMovie={gameState.imposterMovie}
          onRestartGame={restartGame}
        />
      )}
    </>
  );
};

export default Index;

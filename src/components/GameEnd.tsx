import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Player } from '@/types/game';
import { Film, Flag, RotateCcw, Trophy, Users } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

interface GameEndProps {
  players: Player[];
  actualMovie: string;
  imposterMovie: string;
  onRestartGame: () => void;
}

export const GameEnd = ({ 
  players, 
  actualMovie, 
  imposterMovie, 
  onRestartGame 
}: GameEndProps) => {
  const [showStats, setShowStats] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const imposter = players.find(p => p.isImposter)!;
  
  // Select a random player once when component mounts
  const randomPlayer = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * players.length);
    return players[randomIndex];
  }, [players]);

  // 30 second countdown timer
  useEffect(() => {
    if (showStats || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showStats, timeLeft]);

  if (!showStats) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-muted">
        <Card className="w-full max-w-2xl p-8 shadow-2xl text-center">
          <Users className="w-16 h-16 mx-auto mb-4 text-primary" />
          
          <h2 className="text-4xl font-bold mb-2">
            All Movies Revealed!
          </h2>

          <div className="flex flex-col items-center justify-center mx-auto mb-6">
            {/* <Clock className={`w-8 h-8 mb-2 ${timeLeft <= 10 ? 'text-destructive animate-pulse' : 'text-primary'}`} /> */}
            <p className="text-sm text-muted-foreground mb-1">Time to think</p>
            <p className={`text-4xl font-bold ${timeLeft <= 10 ? 'text-destructive' : 'text-primary'}`}>
              {timeLeft}
            </p>
          </div>
          <p className="text-muted-foreground mb-6 text-lg">
            Here's the randomly selected player to start the game
          </p>
        
          <div className="bg-secondary/20 border-2 border-secondary p-8 rounded-lg mb-8">
            <p className="text-4xl font-bold">{randomPlayer.name}</p>
          </div>

          <Button
            onClick={() => setShowStats(true)}
            className="w-full"
            size="lg"
          >
            <Flag className="w-5 h-5 mr-2" />
            End Game
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-muted">
      <Card className="w-full max-w-2xl p-8 shadow-2xl">
        <Trophy className="w-16 h-16 mx-auto mb-4 text-primary" />
        
        <h2 className="text-4xl font-bold mb-2 text-center">
          Game Stats
        </h2>
        <p className="text-muted-foreground mb-8 text-center text-lg">
          Here's what happened
        </p>

        <div className="space-y-6 mb-8">
          <div className="bg-primary/10 border-2 border-primary p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Film className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-lg">The Movies</h3>
            </div>
            <div className="space-y-2">
              <p><span className="font-semibold">Actual Movie:</span> {actualMovie}</p>
              <p><span className="font-semibold">Imposter's Movie:</span> {imposterMovie}</p>
            </div>
          </div>

          <div className="bg-destructive/10 border-2 border-destructive p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-3">The Imposter Was...</h3>
            <p className="text-2xl font-bold text-destructive">{imposter.name}</p>
          </div>

          <div className="bg-muted/50 p-6 rounded-lg">
            <h3 className="font-semibold mb-4">All Players:</h3>
            <div className="space-y-2">
              {players.map(player => (
                <div key={player.id} className="bg-background p-3 rounded flex justify-between items-center">
                  <span className="font-semibold">{player.name}</span>
                  <span className={`text-sm ${player.isImposter ? 'text-destructive' : 'text-muted-foreground'}`}>
                    {player.isImposter ? '🎭 Imposter' : '🎬 Regular'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Button
          onClick={onRestartGame}
          className="w-full"
          size="lg"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Restart Game
        </Button>
      </Card>
    </div>
  );
};


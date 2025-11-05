import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trophy, RotateCcw, Film } from 'lucide-react';
import { Player } from '@/types/game';

interface GameResultsProps {
  players: Player[];
  actualMovie: string;
  imposterMovie: string;
  imposterGuess?: string;
  onPlayAgain: () => void;
}

export const GameResults = ({ 
  players, 
  actualMovie, 
  imposterMovie, 
  onPlayAgain 
}: GameResultsProps) => {
  const imposter = players.find(p => p.isImposter)!;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-muted">
      <Card className="w-full max-w-2xl p-8 shadow-2xl">
        <Trophy className="w-16 h-16 mx-auto mb-4 text-primary" />
        
        <h2 className="text-4xl font-bold mb-2 text-center">
          Game Over!
        </h2>
        <p className="text-muted-foreground mb-8 text-center text-lg">
          Review all the clues and reveal the imposter!
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
            <h3 className="font-semibold mb-4">All Clues:</h3>
            <div className="space-y-2">
              {players.map(player => (
                <div key={player.id} className="bg-background p-3 rounded">
                  <span className="font-semibold">{player.name}:</span>{' '}
                  <span className="text-muted-foreground">{player.clue}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Button
          onClick={onPlayAgain}
          className="w-full"
          size="lg"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Play Again
        </Button>
      </Card>
    </div>
  );
};

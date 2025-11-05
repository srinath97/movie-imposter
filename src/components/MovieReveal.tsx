import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Player } from '@/types/game';
import { Eye, EyeOff, Film } from 'lucide-react';
import { useState } from 'react';

interface MovieRevealProps {
  players: Player[];
  currentPlayerIndex: number;
  onNext: () => void;
}

export const MovieReveal = ({ players, currentPlayerIndex, onNext }: MovieRevealProps) => {
  const [revealed, setRevealed] = useState(false);
  const currentPlayer = players[currentPlayerIndex];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-muted">
      <Card className="w-full max-w-2xl p-8 shadow-2xl text-center">
        <Film className="w-16 h-16 mx-auto mb-4 text-primary" />
        
        <h2 className="text-3xl font-bold mb-2">{currentPlayer.name}'s Turn</h2>
        <p className="text-muted-foreground mb-8">
          {revealed 
            ? "Remember your movie"
            : "Pass the device to the next player"
          }
        </p>

        {!revealed ? (
          <Button
            size="lg"
            onClick={() => setRevealed(true)}
            className="w-full"
          >
            <Eye className="w-5 h-5 mr-2" />
            Reveal My Movie
          </Button>
        ) : (
          <div className="space-y-6">
            <div className="p-8 rounded-lg bg-primary/10 border-2 border-primary">
              <p className="text-sm font-semibold mb-2 uppercase tracking-wider">
                🎬 Your Movie
              </p>
              <p className="text-3xl font-bold">{currentPlayer.movie}</p>
            </div>

            <Button
              size="lg"
              onClick={() => {
                setRevealed(false);
                onNext();
              }}
              className="w-full"
            >
              <EyeOff className="w-5 h-5 mr-2" />
              Hide & Continue
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

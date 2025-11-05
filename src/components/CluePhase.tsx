import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageSquare, Send } from 'lucide-react';
import { Player } from '@/types/game';

interface CluePhaseProps {
  players: Player[];
  currentPlayerIndex: number;
  onSubmitClue: (clue: string) => void;
}

export const CluePhase = ({ players, currentPlayerIndex, onSubmitClue }: CluePhaseProps) => {
  const [clue, setClue] = useState('');
  const currentPlayer = players[currentPlayerIndex];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-muted">
      <Card className="w-full max-w-2xl p-8 shadow-2xl">
        <MessageSquare className="w-16 h-16 mx-auto mb-4 text-primary" />
        
        <h2 className="text-3xl font-bold mb-2 text-center">{currentPlayer.name}'s Clue</h2>
        <p className="text-muted-foreground mb-8 text-center">
          Give a vague clue about your movie (don't be too obvious!)
        </p>

        <div className="space-y-6">
          <div className="bg-muted/50 p-6 rounded-lg">
            <h3 className="font-semibold mb-4">Previous Clues:</h3>
            {players.filter(p => p.clue).length === 0 ? (
              <p className="text-muted-foreground text-sm">No clues yet</p>
            ) : (
              <div className="space-y-2">
                {players.map(player => 
                  player.clue ? (
                    <div key={player.id} className="bg-background p-3 rounded">
                      <span className="font-semibold">{player.name}:</span>{' '}
                      <span className="text-muted-foreground">{player.clue}</span>
                    </div>
                  ) : null
                )}
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Enter your clue..."
              value={clue}
              onChange={(e) => setClue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && clue.trim() && onSubmitClue(clue.trim())}
              className="flex-1"
            />
            <Button
              onClick={() => onSubmitClue(clue.trim())}
              disabled={!clue.trim()}
            >
              <Send className="w-4 h-4 mr-2" />
              Submit
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

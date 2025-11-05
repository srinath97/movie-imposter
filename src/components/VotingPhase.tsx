import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Vote, Search } from 'lucide-react';
import { Player } from '@/types/game';

interface VotingPhaseProps {
  players: Player[];
  currentPlayerIndex: number;
  onVote: (votedPlayerId: string, imposterGuess?: string) => void;
  actualMovie: string;
}

export const VotingPhase = ({ players, currentPlayerIndex, onVote, actualMovie }: VotingPhaseProps) => {
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>('');
  const [movieGuess, setMovieGuess] = useState('');
  const currentPlayer = players[currentPlayerIndex];

  const handleVote = () => {
    if (currentPlayer.isImposter && movieGuess.trim()) {
      onVote(selectedPlayerId, movieGuess.trim());
    } else if (!currentPlayer.isImposter && selectedPlayerId) {
      onVote(selectedPlayerId);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-muted">
      <Card className="w-full max-w-2xl p-8 shadow-2xl">
        <Vote className="w-16 h-16 mx-auto mb-4 text-primary" />
        
        <h2 className="text-3xl font-bold mb-2 text-center">{currentPlayer.name}'s Vote</h2>
        <p className="text-muted-foreground mb-8 text-center">
          {currentPlayer.isImposter 
            ? "Guess the actual movie to win!" 
            : "Who do you think is the imposter?"
          }
        </p>

        <div className="space-y-6">
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

          {currentPlayer.isImposter ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  <Search className="w-4 h-4 inline mr-2" />
                  Guess the actual movie:
                </label>
                <Input
                  placeholder="Enter movie name..."
                  value={movieGuess}
                  onChange={(e) => setMovieGuess(e.target.value)}
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-semibold mb-3">
                Who is the imposter?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {players.filter(p => p.id !== currentPlayer.id).map(player => (
                  <Button
                    key={player.id}
                    variant={selectedPlayerId === player.id ? 'default' : 'outline'}
                    onClick={() => setSelectedPlayerId(player.id)}
                    className="h-auto py-4"
                  >
                    {player.name}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <Button
            onClick={handleVote}
            disabled={currentPlayer.isImposter ? !movieGuess.trim() : !selectedPlayerId}
            className="w-full"
            size="lg"
          >
            Submit Vote
          </Button>
        </div>
      </Card>
    </div>
  );
};

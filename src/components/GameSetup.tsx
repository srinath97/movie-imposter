import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Film, UserPlus, Play } from 'lucide-react';

interface GameSetupProps {
  onStartGame: (playerNames: string[]) => void;
}

export const GameSetup = ({ onStartGame }: GameSetupProps) => {
  const [playerNames, setPlayerNames] = useState<string[]>(['', '', '']);

  const addPlayer = () => {
    if (playerNames.length < 10) {
      setPlayerNames([...playerNames, '']);
    }
  };

  const removePlayer = (index: number) => {
    if (playerNames.length > 3) {
      setPlayerNames(playerNames.filter((_, i) => i !== index));
    }
  };

  const updatePlayerName = (index: number, name: string) => {
    const updated = [...playerNames];
    updated[index] = name;
    setPlayerNames(updated);
  };

  const canStart = playerNames.filter(name => name.trim()).length >= 3;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-muted">
      <Card className="w-full max-w-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <Film className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-bold mb-2">Movie Imposter</h1>
          <p className="text-muted-foreground">Find the imposter among you</p>
        </div>

        <div className="space-y-4 mb-6">
          <h2 className="text-xl font-semibold">Add Players (3-10)</h2>
          {playerNames.map((name, index) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder={`Player ${index + 1} name`}
                value={name}
                onChange={(e) => updatePlayerName(index, e.target.value)}
                className="flex-1"
              />
              {playerNames.length > 3 && (
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => removePlayer(index)}
                >
                  ×
                </Button>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          {playerNames.length < 10 && (
            <Button
              variant="outline"
              onClick={addPlayer}
              className="flex-1"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Add Player
            </Button>
          )}
          <Button
            onClick={() => onStartGame(playerNames.filter(n => n.trim()))}
            disabled={!canStart}
            className="flex-1"
          >
            <Play className="w-4 h-4 mr-2" />
            Start Game
          </Button>
        </div>
      </Card>
    </div>
  );
};

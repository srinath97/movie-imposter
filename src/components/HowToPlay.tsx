import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Eye, Film, MessageSquare, Target, Trophy, Users } from 'lucide-react';

interface HowToPlayProps {
  onStartSetup: () => void;
}

export const HowToPlay = ({ onStartSetup }: HowToPlayProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-4 bg-gradient-to-br from-background via-background to-muted">
      <Card className="w-full max-w-3xl p-4 sm:p-6 md:p-8 shadow-2xl">
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <Film className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-2 sm:mb-3 md:mb-4 text-primary" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">Movie Imposter</h1>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg">Find the imposter among you</p>
        </div>

        <div className="space-y-4 sm:space-y-5 md:space-y-6 mb-6 sm:mb-7 md:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-center">How to Play</h2>
          
          <div className="space-y-3 sm:space-y-4">
            <div className="flex gap-3 sm:gap-4 items-start">
              <div className="p-2 sm:p-2.5 md:p-3 rounded-full bg-primary/10 shrink-0">
                <Users className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-base sm:text-lg mb-0.5 sm:mb-1">The Setup</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  All players will receive a movie title, but one player (the imposter) gets a different movie. 
                  The imposter won't know they're the imposter!
                </p>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4 items-start">
              <div className="p-2 sm:p-2.5 md:p-3 rounded-full bg-primary/10 shrink-0">
                <Eye className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-base sm:text-lg mb-0.5 sm:mb-1">Check Your Movie</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Each player will check their assigned movie and then pass the device to the next player. 
                  Keep your movie secret!
                </p>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4 items-start">
              <div className="p-2 sm:p-2.5 md:p-3 rounded-full bg-primary/10 shrink-0">
                <MessageSquare className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-base sm:text-lg mb-0.5 sm:mb-1">Give Clues</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  A random player will start. Everyone takes turns giving vague clues about their movie. 
                  Be careful not to be too specific or too vague!
                </p>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4 items-start">
              <div className="p-2 sm:p-2.5 md:p-3 rounded-full bg-primary/10 shrink-0">
                <Target className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-base sm:text-lg mb-0.5 sm:mb-1">Find the Imposter</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Vote at any time if the majority of players want to eliminate someone. 
                  You only get 1 chance to eliminate someone, so choose wisely!
                </p>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4 items-start">
              <div className="p-2 sm:p-2.5 md:p-3 rounded-full bg-primary/10 shrink-0">
                <Trophy className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-base sm:text-lg mb-0.5 sm:mb-1">Win Condition</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  If the imposter is eliminated, the regular players win. 
                  If the imposter survives, the imposter wins!
                </p>
              </div>
            </div>
          </div>
        </div>

        <Button 
          onClick={onStartSetup}
          className="w-full py-5 sm:py-6 text-base sm:text-lg"
          size="lg"
        >
          Play Game
        </Button>
      </Card>
    </div>
  );
};


import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { shuffleArray } from "@/lib/utils";
import { usePremium } from '@/contexts/PremiumContext';
import AICompanion from "@/components/AICompanion";

interface MatchingGameProps {
  items: {
    id: number;
    image: string;
    matchId: number | string;
    size?: string;
  }[];
  onComplete?: () => void;
  hideCompletionUI?: boolean; // ADD THIS NEW PROP
}

const MatchingGame = ({ items, onComplete, hideCompletionUI = false }: MatchingGameProps) => {
  const shuffledItems = useMemo(() => {
    return shuffleArray(items);
  }, [items]);

  const { isPremium, studentPhoto } = usePremium();

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  // AI Companion states
  const [showCompanion, setShowCompanion] = useState(false);
  const [companionContext, setCompanionContext] = useState('');
  const [companionType, setCompanionType] = useState<'encouragement' | 'correction' | 'celebration' | 'focus'>('encouragement');
  const [studentName] = useState(localStorage.getItem('ethiostem-student-name') || 'Student');

  const handleItemClick = (item: typeof shuffledItems[0]) => {
    if (matchedPairs.includes(item.id) || selectedItems.includes(item.id) || isProcessing) {
      return;
    }

    const newSelected = [...selectedItems, item.id];
    setSelectedItems(newSelected);

    if (newSelected.length === 2) {
      setIsProcessing(true);
      setAttempts(attempts + 1);
      const [first, second] = newSelected;
      const firstItem = shuffledItems.find(i => i.id === first);
      const secondItem = shuffledItems.find(i => i.id === second);

      if (firstItem?.matchId === secondItem?.matchId) {
        // Match found!
        setMatchedPairs([...matchedPairs, first, second]);

        // Show AI companion celebration
        setCompanionContext('The student just matched two objects correctly!');
        setCompanionType('celebration');
        setShowCompanion(true);
        setTimeout(() => setShowCompanion(false), 5000);
        
        setTimeout(() => {
          setSelectedItems([]);
          setIsProcessing(false);
          // Check if all pairs are matched
          if (matchedPairs.length + 2 === shuffledItems.length) {
            onComplete?.();
          }
        }, 800);
      } else {
        // No match

        // Show AI companion correction
        setCompanionContext('The student tried to match objects but they were different. Encourage them to look more carefully at the colors, shapes, and sizes.');
        setCompanionType('correction');
        setShowCompanion(true);
        setTimeout(() => setShowCompanion(false), 5000);

        setTimeout(() => {
          setSelectedItems([]);
          setIsProcessing(false);
        }, 1200);
      }
    }
  };

  const isSelected = (id: number) => selectedItems.includes(id);
  const isMatched = (id: number) => matchedPairs.includes(id);
  const allMatched = matchedPairs.length === shuffledItems.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Attempts: <span className="font-semibold text-foreground">{attempts}</span>
        </div>
        <div className="text-sm text-muted-foreground">
          Matched: <span className="font-semibold text-foreground">{matchedPairs.length / 2}</span> / {shuffledItems.length / 2}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {shuffledItems.map((item) => (
          <Card
            key={item.id}
            onClick={() => handleItemClick(item)}
            className={`
              relative aspect-square cursor-pointer transition-all duration-300
              ${isMatched(item.id) ? 'opacity-50 border-success border-4' : ''}
              ${isSelected(item.id) ? 'border-primary border-4 scale-105' : ''}
              ${!isMatched(item.id) && !isSelected(item.id) ? 'hover:scale-105 hover:shadow-playful' : ''}
            `}
          >
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <img 
                src={item.image} 
                alt="Match item" 
                className={`object-contain transition-all ${
                  item.size === 'large' ? 'w-36 h-36' : item.size === 'small' ? 'w-20 h-20' : 'w-full h-full'
                }`}
              />
            </div>
            {isMatched(item.id) && (
              <div className="absolute top-2 right-2">
                <CheckCircle2 className="w-8 h-8 text-success fill-success/20" />
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* CONDITIONALLY RENDER THE COMPLETION UI */}
      {allMatched && !hideCompletionUI && (
        <Card className="p-8 text-center bg-gradient-to-br from-success/10 to-primary/10 border-2 border-success">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold mb-2 text-foreground">Amazing Job!</h3>
          <p className="text-muted-foreground mb-4">
            You matched all the objects! You completed it in {attempts} attempts.
          </p>
          <Button size="lg" onClick={onComplete} className="shadow-playful">
            Continue Learning
          </Button>
        </Card>
      )}

      {/* AI Companion */}
      {isPremium && (
        <AICompanion
          studentName={studentName}
          studentPhoto={studentPhoto || undefined}
          context={companionContext}
          type={companionType}
          show={showCompanion}
          onClose={() => setShowCompanion(false)}
        />
      )}
    </div>
  );
};

export default MatchingGame;
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

interface MatchingGameProps {
  items: {
    id: number;
    image: string;
    matchId: number;
  }[];
  onComplete?: () => void;
}

const MatchingGame = ({ items, onComplete }: MatchingGameProps) => {
  const shuffledItems = useMemo(() => {
    return [...items].sort(() => Math.random() - 0.5);
  }, [items]);
  
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [attempts, setAttempts] = useState(0);

  const handleItemClick = (item: typeof shuffledItems[0]) => {
    if (matchedPairs.includes(item.id) || selectedItems.includes(item.id)) {
      return;
    }

    const newSelected = [...selectedItems, item.id];
    setSelectedItems(newSelected);

    if (newSelected.length === 2) {
      setAttempts(attempts + 1);
      const [first, second] = newSelected;
      const firstItem = shuffledItems.find(i => i.id === first);
      const secondItem = shuffledItems.find(i => i.id === second);

      if (firstItem?.matchId === secondItem?.matchId) {
        // Match found!
        setMatchedPairs([...matchedPairs, first, second]);
        toast.success("Great match! 🎉", {
          description: "You found two that are exactly the same!",
        });
        
        setTimeout(() => {
          setSelectedItems([]);
          // Check if all pairs are matched
          if (matchedPairs.length + 2 === shuffledItems.length) {
            onComplete?.();
          }
        }, 1000);
      } else {
        // No match
        toast.error("Not quite! Try again 💪", {
          description: "Look carefully - are they exactly the same?",
        });
        setTimeout(() => {
          setSelectedItems([]);
        }, 1500);
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
                className="w-full h-full object-contain"
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

      {allMatched && (
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
    </div>
  );
};

export default MatchingGame;
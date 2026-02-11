import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Volume2, RotateCcw, Star, Flag } from "lucide-react";

interface CircleItem {
  id: number;
  emoji: string;
  angle: number;
  counted: boolean;
}

interface CircleCard {
  emoji: string;
  count: number;
  name: string;
}

const circleCards: CircleCard[] = [
  { emoji: "🐿️", count: 6, name: "squirrels" },
  { emoji: "🐻", count: 7, name: "bears" },
  { emoji: "🍓", count: 6, name: "strawberries" },
  { emoji: "🌸", count: 7, name: "flowers" },
  { emoji: "🦋", count: 6, name: "butterflies" },
  { emoji: "🐝", count: 7, name: "bees" },
];

const CircleCount8 = () => {
  const navigate = useNavigate();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [items, setItems] = useState<CircleItem[]>([]);
  const [markedStart, setMarkedStart] = useState<number | null>(null);
  const [countedItems, setCountedItems] = useState<number[]>([]);
  const [currentCount, setCurrentCount] = useState(0);
  const [showNumerals, setShowNumerals] = useState(false);
  const [selectedNumeral, setSelectedNumeral] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [phase, setPhase] = useState<"mark" | "count" | "match">("mark");
  const [completedCards, setCompletedCards] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const currentCard = circleCards[currentCardIndex];

  useEffect(() => {
    generateCircleItems();
  }, [currentCardIndex]);

  const generateCircleItems = () => {
    const card = circleCards[currentCardIndex];
    const newItems: CircleItem[] = [];
    
    for (let i = 0; i < card.count; i++) {
      const angle = (i * 360) / card.count - 90;
      newItems.push({
        id: i,
        emoji: card.emoji,
        angle,
        counted: false,
      });
    }
    
    setItems(newItems);
    setMarkedStart(null);
    setCountedItems([]);
    setCurrentCount(0);
    setShowNumerals(false);
    setSelectedNumeral(null);
    setIsCorrect(null);
    setPhase("mark");
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1.1;
    speechSynthesis.speak(utterance);
  };

  const handleMarkStart = (id: number) => {
    if (phase !== "mark") return;
    
    setMarkedStart(id);
    speak("Great! You marked where to start counting. Now tap each one to count!");
    setPhase("count");
  };

  const handleCountItem = (id: number) => {
    if (phase !== "count") return;
    if (markedStart === null) return;
    
    // If already counted, ignore
    if (countedItems.includes(id)) {
      speak("You already counted that one!");
      return;
    }
    
    // Check if trying to count in order (starting from marked)
    const expectedOrder = getExpectedOrder();
    const nextExpectedIndex = countedItems.length;
    
    if (expectedOrder[nextExpectedIndex] !== id) {
      speak("Try counting from your starting point, going around the circle!");
      return;
    }
    
    const newCount = currentCount + 1;
    setCountedItems([...countedItems, id]);
    setCurrentCount(newCount);
    
    // Speak the count with emphasis on 5
    if (newCount === 5) {
      speak("Fiiiiive!");
    } else {
      speak(newCount.toString());
    }
    
    // Check if all items counted
    if (newCount === currentCard.count) {
      setTimeout(() => {
        speak(`${currentCard.count} ${currentCard.name}! Now find the number that shows how many.`);
        setShowNumerals(true);
        setPhase("match");
      }, 500);
    }
  };

  const getExpectedOrder = (): number[] => {
    if (markedStart === null) return [];
    
    const order: number[] = [];
    for (let i = 0; i < currentCard.count; i++) {
      order.push((markedStart + i) % currentCard.count);
    }
    return order;
  };

  const handleNumeralSelect = (num: number) => {
    if (phase !== "match") return;
    
    setSelectedNumeral(num);
    
    if (num === currentCard.count) {
      setIsCorrect(true);
      speak(`Yes! ${num}! That's right!`);
      
      const newCompleted = completedCards + 1;
      setCompletedCards(newCompleted);
      
      if (newCompleted >= circleCards.length) {
        setTimeout(() => {
          setShowCelebration(true);
          speak("Amazing! You counted all the circles perfectly!");
        }, 1000);
      }
    } else {
      setIsCorrect(false);
      speak(`Hmm, try again. Count the ${currentCard.name} one more time.`);
      setTimeout(() => {
        setSelectedNumeral(null);
        setIsCorrect(null);
      }, 1500);
    }
  };

  const nextCard = () => {
    if (currentCardIndex < circleCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const getItemPosition = (angle: number) => {
    const radius = 120;
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;
    return { x, y };
  };

  const getPhaseInstruction = () => {
    switch (phase) {
      case "mark":
        return "Tap one item to mark where you'll start counting!";
      case "count":
        return "Now tap each item going around the circle to count!";
      case "match":
        return "Which number shows how many?";
      default:
        return "";
    }
  };

  if (showCelebration) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-400 via-pink-300 to-yellow-200 flex flex-col items-center justify-center p-4">
        <div className="text-center animate-bounce">
          <div className="text-8xl mb-6">🎉</div>
          <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
            Circle Counting Champion!
          </h1>
          <p className="text-2xl text-white/90 mb-8">
            You learned to count objects in circles!
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            {circleCards.map((card, i) => (
              <span key={i} className="text-4xl animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>
                {card.emoji}
              </span>
            ))}
          </div>
        </div>
        <div className="flex gap-4 mt-8">
          <Button
            onClick={() => {
              setCurrentCardIndex(0);
              setCompletedCards(0);
              setShowCelebration(false);
              generateCircleItems();
            }}
            className="bg-white text-purple-600 hover:bg-purple-100 text-xl px-8 py-6"
          >
            <RotateCcw className="w-6 h-6 mr-2" />
            Play Again
          </Button>
          <Button
            onClick={() => navigate("/")}
            className="bg-purple-600 text-white hover:bg-purple-700 text-xl px-8 py-6"
          >
            <ArrowLeft className="w-6 h-6 mr-2" />
            Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 via-emerald-300 to-lime-200 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="text-white hover:bg-white/20"
        >
          <ArrowLeft className="w-6 h-6 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
          Count in Circles! 🔵
        </h1>
        <Button
          variant="ghost"
          onClick={() => speak(getPhaseInstruction())}
          className="text-white hover:bg-white/20"
        >
          <Volume2 className="w-6 h-6" />
        </Button>
      </div>

      {/* Progress */}
      <div className="flex justify-center gap-2 mb-4">
        {circleCards.map((_, i) => (
          <div
            key={i}
            className={`w-4 h-4 rounded-full transition-all ${
              i < completedCards
                ? "bg-yellow-400 shadow-lg"
                : i === currentCardIndex
                ? "bg-white"
                : "bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Instruction */}
      <Card className="max-w-2xl mx-auto mb-6 p-4 bg-white/90 backdrop-blur">
        <p className="text-center text-xl font-medium text-gray-700">
          {getPhaseInstruction()}
        </p>
        {phase === "mark" && (
          <p className="text-center text-sm text-gray-500 mt-2">
            💡 Tip: Mark a starting point so you know where to stop!
          </p>
        )}
      </Card>

      {/* Circle Display */}
      <div className="flex justify-center mb-6">
        <div className="relative w-80 h-80 flex items-center justify-center">
          {/* Circle path indicator */}
          <div className="absolute w-64 h-64 rounded-full border-4 border-dashed border-white/50" />
          
          {/* Items in circle */}
          {items.map((item) => {
            const pos = getItemPosition(item.angle);
            const isCounted = countedItems.includes(item.id);
            const isMarked = markedStart === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => phase === "mark" ? handleMarkStart(item.id) : handleCountItem(item.id)}
                className={`absolute transition-all duration-300 ${
                  phase === "mark" 
                    ? "hover:scale-125 cursor-pointer" 
                    : phase === "count" && !isCounted
                    ? "hover:scale-110 cursor-pointer"
                    : ""
                }`}
                style={{
                  transform: `translate(${pos.x}px, ${pos.y}px)`,
                }}
                disabled={phase === "match"}
              >
                <div className="relative">
                  <span 
                    className={`text-5xl transition-all ${
                      isCounted ? "opacity-50 grayscale" : ""
                    }`}
                  >
                    {item.emoji}
                  </span>
                  
                  {/* Start marker */}
                  {isMarked && (
                    <div className="absolute -top-2 -right-2 animate-bounce">
                      <Flag className="w-6 h-6 text-red-500 fill-red-500" />
                    </div>
                  )}
                  
                  {/* Count badge */}
                  {isCounted && (
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg animate-pop">
                      {countedItems.indexOf(item.id) + 1}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
          
          {/* Center count display */}
          <div className="absolute flex flex-col items-center justify-center">
            <div className="text-6xl font-bold text-white drop-shadow-lg">
              {currentCount}
            </div>
            <div className="text-sm text-white/80">
              {currentCard.name}
            </div>
          </div>
        </div>
      </div>

      {/* Numeral Selection */}
      {showNumerals && (
        <div className="max-w-md mx-auto">
          <Card className="p-6 bg-white/90 backdrop-blur">
            <p className="text-center text-lg font-medium text-gray-700 mb-4">
              How many {currentCard.name}?
            </p>
            <div className="flex justify-center gap-4">
              {[5, 6, 7, 8].map((num) => (
                <button
                  key={num}
                  onClick={() => handleNumeralSelect(num)}
                  disabled={isCorrect === true}
                  className={`w-16 h-20 rounded-xl text-3xl font-bold transition-all ${
                    selectedNumeral === num
                      ? isCorrect
                        ? "bg-green-500 text-white scale-110 ring-4 ring-green-300"
                        : isCorrect === false
                        ? "bg-red-400 text-white animate-shake"
                        : "bg-blue-500 text-white"
                      : "bg-gradient-to-b from-yellow-300 to-orange-400 text-white hover:scale-105 hover:shadow-lg"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
            
            {isCorrect && (
              <div className="mt-6 text-center">
                <div className="flex justify-center gap-2 mb-4">
                  {[...Array(3)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-8 h-8 text-yellow-500 fill-yellow-500 animate-bounce"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
                {currentCardIndex < circleCards.length - 1 ? (
                  <Button
                    onClick={nextCard}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xl px-8 py-4"
                  >
                    Next Circle! →
                  </Button>
                ) : (
                  <Button
                    onClick={() => setShowCelebration(true)}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl px-8 py-4"
                  >
                    Finish! 🎉
                  </Button>
                )}
              </div>
            )}
          </Card>
        </div>
      )}

      {/* Reset Button */}
      <div className="flex justify-center mt-6">
        <Button
          variant="outline"
          onClick={generateCircleItems}
          className="bg-white/80 hover:bg-white"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      </div>

      <style>{`
        @keyframes pop {
          0% { transform: scale(0); }
          50% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
        .animate-pop {
          animation: pop 0.3s ease-out;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default CircleCount8;

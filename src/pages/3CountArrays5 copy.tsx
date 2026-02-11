import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Volume2, Home, Shuffle } from "lucide-react";
import { Link } from "react-router-dom";

type ItemType = "sock" | "shirt" | "shoe";

interface ArrayItem {
  id: number;
  type: ItemType;
  color: string;
  counted: boolean;
}

const COLORS = {
  sock: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD"],
  shirt: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"],
  shoe: ["#8B4513", "#2F4F4F", "#4A4A4A", "#1E3A5F"],
};

const SockSVG = ({ color, size = 60 }: { color: string; size?: number }) => (
  <svg width={size} height={size * 1.2} viewBox="0 0 60 72" className="drop-shadow-md">
    <path
      d="M15 5 L15 35 Q15 45 25 50 L45 50 Q55 50 55 40 L55 35 Q55 30 50 30 L35 30 L35 5 Q35 2 25 2 Q15 2 15 5"
      fill={color}
      stroke={`${color}88`}
      strokeWidth="2"
    />
    <path d="M15 20 L35 20" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
    <path d="M15 25 L35 25" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
  </svg>
);

const ShirtSVG = ({ color, size = 70 }: { color: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 70 70" className="drop-shadow-md">
    <path
      d="M20 10 L15 5 L5 15 L12 22 L12 60 L58 60 L58 22 L65 15 L55 5 L50 10 Q45 15 35 15 Q25 15 20 10"
      fill={color}
      stroke={`${color}88`}
      strokeWidth="2"
    />
    <path d="M28 15 L28 25" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
    <path d="M35 15 L35 25" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
    <path d="M42 15 L42 25" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
  </svg>
);

const ShoeSVG = ({ color, size = 70 }: { color: string; size?: number }) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 70 42" className="drop-shadow-md">
    <path
      d="M10 30 L10 15 Q10 5 20 5 L30 5 L30 15 Q35 12 45 12 L60 15 Q68 18 68 28 L68 35 Q68 40 60 40 L15 40 Q10 40 10 35 Z"
      fill={color}
      stroke={`${color}88`}
      strokeWidth="2"
    />
    <ellipse cx="25" cy="38" rx="10" ry="3" fill="#333" opacity="0.3" />
  </svg>
);

const ItemDisplay = ({ item, size }: { item: ArrayItem; size?: number }) => {
  switch (item.type) {
    case "sock":
      return <SockSVG color={item.color} size={size} />;
    case "shirt":
      return <ShirtSVG color={item.color} size={size} />;
    case "shoe":
      return <ShoeSVG color={item.color} size={size} />;
  }
};

const CountArrays5 = () => {
  const [items, setItems] = useState<ArrayItem[]>([]);
  const [countedOrder, setCountedOrder] = useState<number[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<"pairs" | "counting" | "done">("pairs");
  const [selectedSet, setSelectedSet] = useState<"socks" | "shirts" | "shoes" | null>(null);

  const countedCount = countedOrder.length;

  const generatePairs = (type: ItemType, count: number): ArrayItem[] => {
    const colors = COLORS[type];
    const pairs: ArrayItem[] = [];
    for (let i = 0; i < count; i++) {
      const color = colors[i % colors.length];
      pairs.push({ id: i * 2, type, color, counted: false });
      pairs.push({ id: i * 2 + 1, type, color, counted: false });
    }
    return pairs;
  };

  const initializeSocks = () => {
    setItems(generatePairs("sock", 3));
    setSelectedSet("socks");
    setCurrentPhase("counting");
    setCountedOrder([]);
    setShowCelebration(false);
  };

  const initializeShirts = () => {
    setItems(generatePairs("shirt", 3));
    setSelectedSet("shirts");
    setCurrentPhase("counting");
    setCountedOrder([]);
    setShowCelebration(false);
  };

  const initializeShoes = () => {
    setItems(generatePairs("shoe", 3));
    setSelectedSet("shoes");
    setCurrentPhase("counting");
    setCountedOrder([]);
    setShowCelebration(false);
  };

  const handleItemClick = (index: number) => {
    if (items[index].counted) return;

    const newItems = [...items];
    newItems[index].counted = true;
    setItems(newItems);
    setCountedOrder([...countedOrder, index]);
    speakNumber(countedOrder.length + 1);
  };

  const speakNumber = (num: number) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(num.toString());
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      window.speechSynthesis.speak(utterance);
    }
  };

  const resetGame = () => {
    setItems([]);
    setCountedOrder([]);
    setShowCelebration(false);
    setCurrentPhase("pairs");
    setSelectedSet(null);
  };

  const shuffleItems = () => {
    const shuffled = [...items].sort(() => Math.random() - 0.5).map(item => ({ ...item, counted: false }));
    setItems(shuffled);
    setCountedOrder([]);
  };

  useEffect(() => {
    if (countedCount === 6 && items.length === 6) {
      setShowCelebration(true);
      setCurrentPhase("done");
      if ("speechSynthesis" in window) {
        setTimeout(() => {
          const utterance = new SpeechSynthesisUtterance("Great job! You counted 6 objects!");
          utterance.rate = 0.9;
          utterance.pitch = 1.1;
          window.speechSynthesis.speak(utterance);
        }, 500);
      }
    }
  }, [countedCount, items.length]);

  return (
    <div className="min-h-screen gradient-sky overflow-hidden relative">
      {/* Clouds */}
      <div className="absolute top-8 left-10 w-20 h-10 bg-white/60 rounded-full blur-sm animate-float" />
      <div className="absolute top-16 right-20 w-28 h-12 bg-white/50 rounded-full blur-sm animate-float" style={{ animationDelay: "1s" }} />

      {/* Sun */}
      <div className="absolute top-6 right-8 w-16 h-16 bg-primary rounded-full shadow-lg flex items-center justify-center">
        <div className="w-12 h-12 bg-primary/80 rounded-full" />
      </div>

      <div className="container mx-auto px-4 py-6 relative z-10">
        <header className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground mb-2 font-nunito text-sm">
            <Home className="w-4 h-4" /> Back to Lessons
          </Link>
          <h1 className="font-fredoka text-3xl md:text-4xl text-foreground text-shadow-playful mb-2">🧦 Counting in Arrays! 🧦</h1>
          <p className="font-nunito text-lg text-foreground/80">Lesson 5: Count 6 objects in array configurations</p>
        </header>

        {currentPhase === "pairs" && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-card/90 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-soft">
              <h2 className="font-fredoka text-2xl text-foreground mb-4 text-center">Choose what to count!</h2>
              <p className="font-nunito text-center text-muted-foreground mb-6">
                Each item comes in pairs. Let's count 3 pairs to make 6!
              </p>
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={initializeSocks}
                  className="bg-card hover:bg-accent rounded-2xl p-6 transition-all hover:scale-105 shadow-soft flex flex-col items-center gap-3"
                >
                  <SockSVG color="#FF6B6B" size={50} />
                  <span className="font-fredoka text-lg text-foreground">Socks</span>
                </button>
                <button
                  onClick={initializeShirts}
                  className="bg-card hover:bg-accent rounded-2xl p-6 transition-all hover:scale-105 shadow-soft flex flex-col items-center gap-3"
                >
                  <ShirtSVG color="#4ECDC4" size={50} />
                  <span className="font-fredoka text-lg text-foreground">Shirts</span>
                </button>
                <button
                  onClick={initializeShoes}
                  className="bg-card hover:bg-accent rounded-2xl p-6 transition-all hover:scale-105 shadow-soft flex flex-col items-center gap-3"
                >
                  <ShoeSVG color="#8B4513" size={50} />
                  <span className="font-fredoka text-lg text-foreground">Shoes</span>
                </button>
              </div>
            </div>

            {/* Demo Array */}
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft">
              <h3 className="font-fredoka text-xl text-foreground mb-4 text-center">What is an Array?</h3>
              <p className="font-nunito text-center text-muted-foreground mb-4">
                Objects arranged in rows and columns! Count left to right, top to bottom.
              </p>
              <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <div key={num} className="bg-accent/50 rounded-xl p-3 flex items-center justify-center">
                    <span className="font-fredoka text-2xl text-primary">{num}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentPhase === "counting" && (
          <>
            <div className="bg-card/90 backdrop-blur-sm rounded-2xl p-4 mb-6 max-w-2xl mx-auto shadow-soft">
              <p className="font-nunito text-center text-foreground">
                <span className="font-bold text-primary">Tap each {selectedSet?.slice(0, -1)}</span> to count them! Go left to right, top to bottom.
              </p>
            </div>

            {/* Count Display */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-3 bg-card rounded-full px-6 py-3 shadow-soft">
                <span className="font-nunito text-foreground">Counted:</span>
                <span className="font-fredoka text-4xl text-primary">{countedCount}</span>
                <span className="font-nunito text-foreground">/ 6</span>
              </div>
            </div>

            {/* Array Display - 3 rows x 2 columns */}
            <div className="max-w-md mx-auto bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft mb-6">
              <div className="grid grid-cols-2 gap-6">
                {items.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(index)}
                    disabled={item.counted}
                    className={`relative p-4 rounded-xl transition-all ${
                      item.counted
                        ? "bg-accent/50 scale-95"
                        : "bg-card hover:bg-accent hover:scale-105 cursor-pointer"
                    } shadow-soft flex items-center justify-center`}
                  >
                    <ItemDisplay item={item} />
                    {item.counted && (
                      <div className="absolute top-2 right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center animate-chick-bounce">
                        <span className="font-fredoka text-primary-foreground text-sm">
                          {countedOrder.indexOf(index) + 1}
                        </span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={resetGame} className="font-nunito gap-2">
                <RotateCcw className="w-4 h-4" /> Choose Different
              </Button>
              <Button variant="secondary" onClick={shuffleItems} className="font-nunito gap-2" disabled={countedCount > 0}>
                <Shuffle className="w-4 h-4" /> Shuffle
              </Button>
              <Button variant="secondary" onClick={() => speakNumber(countedCount)} className="font-nunito gap-2">
                <Volume2 className="w-4 h-4" /> Hear Count
              </Button>
            </div>
          </>
        )}

        {/* Celebration */}
        {showCelebration && (
          <div className="fixed inset-0 flex items-center justify-center bg-foreground/20 backdrop-blur-sm z-50">
            <div className="bg-card rounded-3xl p-8 text-center shadow-lg max-w-md mx-4 animate-celebrate">
              <div className="text-6xl mb-4">🎉🧦🎉</div>
              <h2 className="font-fredoka text-3xl text-primary mb-2">Great Job!</h2>
              <p className="font-nunito text-lg text-foreground mb-6">
                You counted <span className="font-bold text-primary">6</span> {selectedSet}!<br />
                3 pairs make 6!
              </p>
              <div className="flex gap-3 justify-center flex-wrap">
                <Button onClick={resetGame} size="lg" className="font-fredoka text-lg gap-2">
                  <RotateCcw className="w-5 h-5" /> Try Another!
                </Button>
                <Link to="/">
                  <Button variant="outline" size="lg" className="font-fredoka text-lg gap-2">
                    <Home className="w-5 h-5" /> More Lessons
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Grass at bottom */}
        <div className="fixed bottom-0 left-0 right-0 h-16 gradient-grass z-0">
          <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full">
            {[...Array(30)].map((_, i) => (
              <path
                key={i}
                d={`M${i * 3.5} 20 Q${i * 3.5 + 1} 10 ${i * 3.5 + 1.5} ${5 + Math.random() * 5} Q${i * 3.5 + 2} 10 ${i * 3.5 + 3} 20`}
                className="fill-grass-dark/60 grass-blade"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CountArrays5;

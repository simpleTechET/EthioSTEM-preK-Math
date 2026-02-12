import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Volume2, Home } from "lucide-react";
import { Link } from "react-router-dom";

interface EggProps {
  index: number;
  isHatched: boolean;
  onHatch: () => void;
}

const Egg = ({ index, isHatched, onHatch }: EggProps) => {
  const [isWiggling, setIsWiggling] = useState(false);

  const handleClick = () => {
    if (!isHatched) {
      setIsWiggling(true);
      setTimeout(() => {
        setIsWiggling(false);
        onHatch();
      }, 300);
    }
  };

  return (
    <div className="relative flex flex-col items-center cursor-pointer">
      <div className="absolute -top-6 text-lg font-fredoka font-bold text-foreground/70">
        {index + 1}
      </div>

      <div
        onClick={handleClick}
        className={`relative transition-all duration-300 ${
          isWiggling ? "animate-wiggle" : ""
        } ${!isHatched ? "hover:scale-105 active:scale-95" : ""}`}
      >
        {!isHatched ? (
          <svg width="60" height="75" viewBox="0 0 60 75" className="drop-shadow-lg">
            <ellipse cx="30" cy="42" rx="26" ry="32" className="fill-egg-cream stroke-egg-shadow" strokeWidth="2" />
            <ellipse cx="22" cy="35" rx="6" ry="10" className="fill-white/40" />
          </svg>
        ) : (
          <div className="chick">
            <svg width="70" height="80" viewBox="0 0 70 80" className="drop-shadow-lg">
              <path d="M10 55 Q15 70 35 72 Q55 70 60 55 L55 50 Q50 55 45 48 Q40 52 35 47 Q30 52 25 48 Q20 55 15 50 Z" className="fill-egg-cream stroke-egg-shadow" strokeWidth="1.5" />
              <ellipse cx="35" cy="38" rx="22" ry="24" className="fill-chick-yellow" />
              <circle cx="35" cy="20" r="16" className="fill-chick-yellow" />
              <circle cx="29" cy="18" r="4" className="fill-foreground" />
              <circle cx="30" cy="17" r="1.5" className="fill-white" />
              <circle cx="41" cy="18" r="4" className="fill-foreground" />
              <circle cx="42" cy="17" r="1.5" className="fill-white" />
              <path d="M35 22 L30 28 L35 26 L40 28 Z" className="fill-chick-orange" />
              <ellipse cx="18" cy="40" rx="6" ry="10" className="fill-chick-orange/60" transform="rotate(-15 18 40)" />
              <ellipse cx="52" cy="40" rx="6" ry="10" className="fill-chick-orange/60" transform="rotate(15 52 40)" />
              <path d="M32 6 Q35 0 38 6" className="stroke-chick-orange fill-none" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        )}
      </div>

      {!isHatched && (
        <div className="mt-2 text-xs font-nunito text-foreground/50 animate-pulse">
          Tap me!
        </div>
      )}
    </div>
  );
};

interface FingerCounterProps {
  count: number;
  maxCount?: number;
}

const FingerCounter = ({ count, maxCount = 7 }: FingerCounterProps) => {
  const fingers = [
    { hand: "left", name: "pinky", position: 0 },
    { hand: "left", name: "ring", position: 1 },
    { hand: "left", name: "middle", position: 2 },
    { hand: "left", name: "index", position: 3 },
    { hand: "left", name: "thumb", position: 4 },
    { hand: "right", name: "thumb", position: 5 },
    { hand: "right", name: "index", position: 6 },
  ];

  return (
    <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 shadow-soft">
      <div className="text-center mb-3">
        <h3 className="font-fredoka text-lg text-foreground">Count with your fingers!</h3>
        <p className="text-sm text-muted-foreground font-nunito">Left to right, the Math Way</p>
      </div>

      <div className="flex justify-center items-end gap-1">
        <div className="flex items-end gap-1 mr-4">
          {fingers.slice(0, 5).map((finger, idx) => {
            const isActive = idx < count;
            const heights = [32, 40, 48, 44, 36];
            return (
              <div key={`left-${finger.name}`} className="flex flex-col items-center">
                <div
                  className={`finger-dot w-6 rounded-t-full transition-all duration-300 ${isActive ? "bg-primary finger-dot active" : "bg-muted"}`}
                  style={{ height: `${heights[idx]}px` }}
                />
                {isActive && <span className="text-xs font-bold text-primary mt-1">{idx + 1}</span>}
              </div>
            );
          })}
        </div>

        <div className="w-px h-12 bg-border mx-2" />

        <div className="flex items-end gap-1 ml-4">
          {fingers.slice(5, maxCount).map((finger, idx) => {
            const actualIdx = idx + 5;
            const isActive = actualIdx < count;
            const heights = [36, 44];
            return (
              <div key={`right-${finger.name}`} className="flex flex-col items-center">
                <div
                  className={`finger-dot w-6 rounded-t-full transition-all duration-300 ${isActive ? "bg-primary finger-dot active" : "bg-muted"}`}
                  style={{ height: `${heights[idx]}px` }}
                />
                {isActive && <span className="text-xs font-bold text-primary mt-1">{actualIdx + 1}</span>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center gap-16 mt-2 text-xs text-muted-foreground font-nunito">
        <span>Left hand</span>
        <span>Right hand</span>
      </div>
    </div>
  );
};

const CountEggs4 = () => {
  const [hatchedEggs, setHatchedEggs] = useState<boolean[]>(new Array(7).fill(false));
  const [showCelebration, setShowCelebration] = useState(false);

  const hatchedCount = hatchedEggs.filter(Boolean).length;

  const handleHatch = (index: number) => {
    const expectedIndex = hatchedEggs.findIndex((hatched) => !hatched);
    if (index === expectedIndex) {
      const newHatched = [...hatchedEggs];
      newHatched[index] = true;
      setHatchedEggs(newHatched);
      speakNumber(index + 1);
    }
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
    setHatchedEggs(new Array(7).fill(false));
    setShowCelebration(false);
  };

  useEffect(() => {
    if (hatchedCount === 7) {
      setShowCelebration(true);
      if ("speechSynthesis" in window) {
        setTimeout(() => {
          const utterance = new SpeechSynthesisUtterance("Wonderful! You counted to seven!");
          utterance.rate = 0.9;
          utterance.pitch = 1.1;
          window.speechSynthesis.speak(utterance);
        }, 500);
      }
    }
  }, [hatchedCount]);

  return (
    <div className="min-h-screen gradient-sky overflow-hidden relative">
      {/* Clouds */}
      <div className="absolute top-8 left-10 w-20 h-10 bg-white/60 rounded-full blur-sm animate-float" />
      <div className="absolute top-16 right-20 w-28 h-12 bg-white/50 rounded-full blur-sm animate-float" style={{ animationDelay: "1s" }} />
      <div className="absolute top-24 left-1/3 w-16 h-8 bg-white/40 rounded-full blur-sm animate-float" style={{ animationDelay: "0.5s" }} />

      {/* Sun */}
      <div className="absolute top-6 right-8 w-16 h-16 bg-primary rounded-full shadow-lg flex items-center justify-center">
        <div className="w-12 h-12 bg-primary/80 rounded-full" />
      </div>

      <div className="container mx-auto px-4 py-6 relative z-10">
        <header className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground mb-2 font-nunito text-sm">
            <Home className="w-4 h-4" /> Back to Lessons
          </Link>
          <h1 className="font-fredoka text-3xl md:text-4xl text-foreground text-shadow-playful mb-2">🐣 Counting Chicks! 🐣</h1>
          <p className="font-nunito text-lg text-foreground/80">Lesson 4: Count to 6 and 7 with your fingers</p>
        </header>

        <div className="bg-card/90 backdrop-blur-sm rounded-2xl p-4 mb-6 max-w-2xl mx-auto shadow-soft">
          <p className="font-nunito text-center text-foreground">
            <span className="font-bold text-primary">Tap the eggs</span> from left to right to hatch the baby chicks! 🐥
          </p>
          <p className="font-nunito text-center text-muted-foreground text-sm mt-1">
            Count each chick as it hatches, starting with your left pinky finger.
          </p>
        </div>

        <div className="max-w-md mx-auto mb-6">
          <FingerCounter count={hatchedCount} />
        </div>

        <div className={`text-center mb-6 ${showCelebration ? "animate-celebrate" : ""}`}>
          <div className="inline-flex items-center gap-3 bg-card rounded-full px-6 py-3 shadow-soft">
            <span className="font-nunito text-foreground">Chicks hatched:</span>
            <span className="font-fredoka text-4xl text-primary">{hatchedCount}</span>
            <span className="font-nunito text-foreground">/ 7</span>
          </div>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl">
            <svg viewBox="0 0 400 80" className="w-full">
              <ellipse cx="200" cy="50" rx="190" ry="30" className="fill-nest-brown" />
              <ellipse cx="200" cy="45" rx="180" ry="25" className="fill-nest-light" />
              {[...Array(20)].map((_, i) => (
                <line key={i} x1={30 + i * 18} y1={35 + Math.sin(i) * 5} x2={35 + i * 18} y2={55 + Math.cos(i) * 3} className="stroke-nest-brown/50" strokeWidth="2" />
              ))}
            </svg>
          </div>

          <div className="relative z-10 flex justify-center items-end gap-3 md:gap-5 pb-8 pt-12">
            {hatchedEggs.map((isHatched, index) => (
              <Egg key={index} index={index} isHatched={isHatched} onHatch={() => handleHatch(index)} />
            ))}
          </div>
        </div>

        {showCelebration && (
          <div className="fixed inset-0 flex items-center justify-center bg-foreground/20 backdrop-blur-sm z-50">
            <div className="bg-card rounded-3xl p-8 text-center shadow-lg max-w-md mx-4 animate-celebrate">
              <div className="text-6xl mb-4">🎉🐣🎉</div>
              <h2 className="font-fredoka text-3xl text-primary mb-2">Wonderful!</h2>
              <p className="font-nunito text-lg text-foreground mb-6">
                You counted to <span className="font-bold text-primary">7</span>!<br />All the baby chicks have hatched!
              </p>
              <div className="flex gap-3 justify-center">
                <Button onClick={resetGame} size="lg" className="font-fredoka text-lg gap-2">
                  <RotateCcw className="w-5 h-5" /> Play Again!
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

        <div className="flex justify-center gap-4 mt-8">
          <Button variant="outline" onClick={resetGame} className="font-nunito gap-2">
            <RotateCcw className="w-4 h-4" /> Start Over
          </Button>
          <Button variant="secondary" onClick={() => speakNumber(hatchedCount)} className="font-nunito gap-2">
            <Volume2 className="w-4 h-4" /> Hear Count
          </Button>
        </div>

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

export default CountEggs4;

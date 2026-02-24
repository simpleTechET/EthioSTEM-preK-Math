import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RefreshCw } from "lucide-react";

const CircleCount8 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [currentStep, setCurrentStep] = useState<'count' | 'celebrate'>('count');
  const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [themeIdx, setThemeIdx] = useState(0);
  const [clickedCount, setClickedCount] = useState(0);

  const themes = [
    { emoji: "🐿️", count: 6, name: "Squirrels", color: "bg-amber-500" },
    { emoji: "🐻", count: 7, name: "Bears", color: "bg-orange-600" },
    { emoji: "🦋", count: 7, name: "Butterflies", color: "bg-blue-400" }
  ];

  const markLessonComplete = () => {
    const saved = localStorage.getItem("ethio-stem-m3-completed");
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes("lesson-8")) {
      completed.push("lesson-8");
      localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
    }
  };

  const nextStep = () => {
    setShowFeedback(null);
    setClickedCount(0);
    if (themeIdx < themes.length - 1) {
      setThemeIdx(prev => prev + 1);
    } else {
      markLessonComplete();
      setCurrentStep('celebrate');
    }
  };

  const resetActivity = () => {
    setShowGame(false);
    setCurrentStep('count');
    setThemeIdx(0);
    setShowFeedback(null);
    setClickedCount(0);
  };

  const currentTheme = themes[themeIdx];

  const handleItemClick = (index: number) => {
    if (index === clickedCount) {
      const newCount = clickedCount + 1;
      setClickedCount(newCount);
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(newCount.toString());
        utterance.rate = 0.8;
        utterance.pitch = 1.2;
        window.speechSynthesis.speak(utterance);
      }
      if (newCount === currentTheme.count) {
        setTimeout(() => setShowFeedback('correct'), 400);
      }
    }
  };

  useEffect(() => {
    if (showFeedback === 'correct') {
      const timer = setTimeout(() => { nextStep(); }, 1200);
      return () => clearTimeout(timer);
    }
  }, [showFeedback]);

  const renderCircle = (count: number, emoji: string, color: string) => {
    const radius = 140;

    return (
      <div className="relative w-[340px] h-[340px] mx-auto flex items-center justify-center bg-white/40 rounded-full border-8 border-white shadow-inner mb-8">
        <div className="absolute w-64 h-64 rounded-full border-4 border-dashed border-indigo-200" />
        <div className="text-center">
          <span className="font-fredoka text-6xl text-indigo-600 font-bold">{clickedCount}</span>
          <p className="text-sm text-indigo-400 font-nunito">counted</p>
        </div>
        {Array.from({ length: count }).map((_, i) => {
          const angle = (i * 360) / count - 90;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;
          const isClicked = i < clickedCount;
          const isNext = i === clickedCount;
          return (
            <div
              key={i}
              onClick={() => handleItemClick(i)}
              className={`absolute flex flex-col items-center transition-all duration-300 ${isNext ? 'cursor-pointer hover:scale-110' : isClicked ? '' : 'opacity-60 grayscale'}`}
              style={{
                left: `calc(50% + ${x}px - 2rem)`,
                top: `calc(50% + ${y}px - 2rem)`,
              }}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-lg border-2 ${isClicked ? `${color} border-white ring-4 ring-yellow-300` : isNext ? `${color} border-yellow-400 animate-pulse` : `bg-gray-200 border-gray-300`}`}>
                {emoji}
                {i === 0 && (
                  <div className="absolute -top-4 -right-2 text-2xl animate-bounce">🚩</div>
                )}
              </div>
              {isClicked && (
                <span className="text-2xl font-bold mt-1 text-indigo-900 font-fredoka animate-in zoom-in duration-200">{i + 1}</span>
              )}
              {isNext && !isClicked && (
                <span className="text-xs font-nunito text-indigo-400 mt-1 animate-pulse">Tap!</span>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white p-4 font-fredoka overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=lesson-8")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
            <ArrowLeft className="w-5 h-5 text-indigo-600" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full uppercase tracking-widest font-nunito">
                Lesson 8
              </span>
              <h1 className="text-2xl font-bold text-indigo-900 uppercase tracking-wide">Circle Counting!</h1>
            </div>
          </div>
        </div>

        {!showGame ? (
          <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] overflow-hidden text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700 relative">
            <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-indigo-500 to-blue-500 rounded-3xl flex items-center justify-center mb-6 rotate-3 shadow-lg">
              <RefreshCw className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-5xl text-indigo-900 leading-tight">Around the Circle!</h2>
            <p className="text-2xl text-indigo-800 font-nunito leading-relaxed max-w-2xl mx-auto">
              It's tricky to count in a circle!
              <br />
              Let's use a flag to mark where we start and count all around!
            </p>
            <Button
              onClick={() => setShowGame(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 border-b-8 border-indigo-800"
            >
              Play! 🎡
            </Button>
            <p className="text-sm text-indigo-400 font-bold uppercase tracking-widest pt-4 font-nunito">Topic B: Numeral Matching to 7</p>
          </Card>
        ) : (
          <div className="space-y-6">
            {currentStep !== 'celebrate' && (
              <div className="flex justify-center gap-3 mb-4">
                {themes.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-3 rounded-full transition-all ${themeIdx >= idx
                      ? 'bg-indigo-500 w-12 shadow-sm'
                      : 'bg-indigo-100 w-3'
                      }`}
                  />
                ))}
              </div>
            )}

            {currentStep === 'count' && (
              <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-8 animate-in slide-in-from-bottom-8">
                <h3 className="text-4xl text-indigo-700">Tap each {currentTheme.name.toLowerCase().slice(0, -1)} starting from the 🚩!</h3>

                {renderCircle(currentTheme.count, currentTheme.emoji, currentTheme.color)}

                {clickedCount === currentTheme.count && (
                  <div className="bg-indigo-50 p-8 rounded-[2.5rem] border-4 border-white shadow-inner max-w-xl mx-auto animate-in zoom-in duration-300">
                    <p className="text-4xl text-indigo-800 font-nunito leading-relaxed">
                      You counted <span className="font-fredoka text-6xl text-indigo-600 drop-shadow-sm font-bold">{currentTheme.count}</span> {currentTheme.name.toLowerCase()}!
                    </p>
                  </div>
                )}
              </Card>
            )}

            {currentStep === 'celebrate' && (
              <Card className="bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600 shadow-2xl rounded-[4rem] overflow-hidden p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                <div className="text-9xl animate-bounce">🎡</div>
                <h2 className="text-7xl drop-shadow-xl">Circle Star!</h2>
                <p className="text-3xl font-nunito max-w-2xl mx-auto leading-relaxed">
                  You can count things in a circle without getting lost!
                  You counted all the way to <span className="font-fredoka text-5xl text-yellow-300">7</span>.
                </p>
                <div className="flex gap-4 w-full pt-8">
                  <Button onClick={resetActivity} className="h-24 flex-1 bg-white/10 hover:bg-white/20 text-white text-3xl rounded-[2rem] border-4 border-white/20">
                    Again! 🔄
                  </Button>
                  <Button onClick={() => navigate("/activities/module-3?last=lesson-8")} className="h-24 flex-1 bg-white text-indigo-600 hover:bg-indigo-50 text-3xl rounded-[2rem] shadow-2xl">
                    Yay! ✨
                  </Button>
                </div>
              </Card>
            )}

            {showFeedback && (
              <div className="fixed top-24 right-6 z-[100] animate-in slide-in-from-right-4 fade-in duration-300">
                <Card className={`flex items-center gap-4 px-6 py-4 shadow-2xl rounded-2xl border-4 ${showFeedback === 'correct' ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'}`}>
                  <span className="text-4xl">{showFeedback === 'correct' ? '🌟' : '🧐'}</span>
                  <span className={`text-2xl font-fredoka font-bold ${showFeedback === 'correct' ? 'text-green-700' : 'text-red-700'}`}>
                    {showFeedback === 'correct' ? 'Great!' : 'Try Again!'}
                  </span>
                  {showFeedback !== 'correct' && (
                    <Button onClick={() => setShowFeedback(null)} className="ml-2 px-5 py-3 text-xl font-fredoka rounded-xl border-b-4 bg-red-500 hover:bg-red-600 border-red-700 text-white">
                      OK 👍
                    </Button>
                  )}
                </Card>
              </div>
            )}

            {currentStep !== 'celebrate' && (
              <Button onClick={() => { setShowGame(false); setClickedCount(0); }} variant="ghost" className="text-indigo-400 hover:text-indigo-600 w-full py-2 font-bold font-nunito">
                ← Back to Instructions
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CircleCount8;

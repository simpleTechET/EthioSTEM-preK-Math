import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RefreshCw, Home, Star, Sparkles, Smile, Flag, Waves } from "lucide-react";

const CircularCount17 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [currentStep, setCurrentStep] = useState<'mark' | 'count' | 'complete'>('mark');
  const [markedIndex, setMarkedIndex] = useState<number | null>(null);
  const [count, setCount] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const markLessonComplete = () => {
    const saved = localStorage.getItem("ethio-stem-m3-completed");
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes("3-circular-count-17")) {
      completed.push("3-circular-count-17");
      localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
    }
  };

  const handleMark = (index: number) => {
    setMarkedIndex(index);
    setShowFeedback('correct');
  };

  const handleCount = () => {
    if (count < 8) {
      setCount(prev => prev + 1);
    } else {
      setShowFeedback('correct');
    }
  };

  const nextStep = () => {
    setShowFeedback(null);
    if (currentStep === 'mark') setCurrentStep('count');
    else if (currentStep === 'count') {
      markLessonComplete();
      setCurrentStep('complete');
    }
  };

  const resetActivity = () => {
    setShowGame(false);
    setCurrentStep('mark');
    setMarkedIndex(null);
    setCount(0);
    setShowFeedback(null);
  };

  const renderCircle = (visibleCount: number, marking: boolean) => {
    const radius = 120;
    return (
      <div className="relative w-full max-w-md mx-auto h-[400px] flex items-center justify-center bg-orange-100/30 rounded-[4rem] border-8 border-white shadow-inner mb-8 overflow-hidden group">
        <div className="absolute inset-0 bg-orange-400/10 opacity-20 pointer-events-none" />

        {/* Decorative Plate */}
        <div className="absolute w-64 h-64 border-8 border-white/50 rounded-full bg-white/20 shadow-xl" />

        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 360) / 8 - 90;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;

          const isMarked = markedIndex === i;
          const isCounted = i < visibleCount;

          return (
            <button
              key={i}
              onClick={() => marking ? handleMark(i) : null}
              className={`absolute flex flex-col items-center transition-all duration-500 ${marking ? 'hover:scale-125 cursor-pointer' : ''} ${!marking && !isCounted ? 'opacity-40 grayscale-0' : ''}`}
              style={{
                left: `calc(50% + ${x * 1.3}px)`,
                top: `calc(50% + ${y * 1.3}px)`,
                transform: 'translate(-50%, -50%)',
                animationDelay: `${i * 0.1}s`
              }}
              disabled={!marking}
            >
              <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-4xl shadow-lg border-4 border-white bg-white transition-all ${isMarked ? 'ring-8 ring-amber-400' : ''}`}>
                🍎
              </div>
              {isMarked && (
                <div className="absolute -top-6 -right-2 text-3xl animate-bounce">🚩</div>
              )}
              {!marking && isCounted && (
                <span className="absolute -bottom-2 bg-emerald-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl border-2 border-white shadow-lg animate-in zoom-in">
                  {i + 1}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-white p-4 font-fredoka overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=3-circular-count-17")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
            <ArrowLeft className="w-5 h-5 text-orange-600" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full uppercase tracking-widest font-nunito">
                Lesson 17
              </span>
              <h1 className="text-2xl font-bold text-orange-900 uppercase">Apple Ring!</h1>
            </div>
          </div>
        </div>

        {!showGame ? (
          <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] overflow-hidden text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700 relative">
            <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-orange-500 to-amber-500 rounded-3xl flex items-center justify-center mb-6 rotate-3 shadow-lg">
              <span className="text-5xl text-white">🍎</span>
            </div>
            <h2 className="text-5xl text-orange-900 leading-tight">Count in a Circle!</h2>
            <p className="text-2xl text-orange-800 font-nunito leading-relaxed max-w-2xl mx-auto">
              When things are in a circle, we need to mark where we start!
              <br />
              We'll use a flag to help us count all 8 apples.
            </p>
            <Button
              onClick={() => setShowGame(true)}
              className="bg-orange-600 hover:bg-orange-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 border-b-8 border-orange-800"
            >
              Play! 🚩
            </Button>
            <p className="text-sm text-orange-400 font-bold uppercase tracking-widest pt-4 font-nunito">Topic D: Matching Numerals to 8</p>
          </Card>
        ) : (
          <div className="space-y-6">
            {currentStep !== 'complete' && (
              <div className="flex justify-center gap-3 mb-4">
                {['mark', 'count'].map((step, idx) => (
                  <div
                    key={step}
                    className={`h-3 rounded-full transition-all ${['mark', 'count'].indexOf(currentStep) >= idx
                      ? 'bg-orange-500 w-12 shadow-sm'
                      : 'bg-orange-100 w-3'
                      }`}
                  />
                ))}
              </div>
            )}

            {currentStep !== 'complete' && (
              <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-bottom-8">
                <h3 className="text-4xl text-orange-700 uppercase tracking-widest">
                  {currentStep === 'mark' ? "Mark your start!" : "Count them all!"}
                </h3>

                {renderCircle(count, currentStep === 'mark')}

                <div className="bg-orange-50 p-8 rounded-[2.5rem] border-4 border-white shadow-inner max-w-2xl mx-auto font-nunito">
                  <p className="text-4xl text-orange-800 leading-relaxed font-bold">
                    {currentStep === 'mark' ? "Tap an apple for the flag!" : "Keep going until you see the flag!"}
                  </p>
                  {currentStep === 'count' && (
                    <p className="text-8xl font-fredoka text-orange-600 mt-4 font-bold drop-shadow-sm">{count}</p>
                  )}
                </div>

                {currentStep === 'count' && (
                  <Button
                    onClick={handleCount}
                    className="bg-orange-600 hover:bg-orange-700 text-white py-12 px-16 text-4xl rounded-[2rem] shadow-xl border-b-8 border-orange-800 transition-all active:scale-95"
                  >
                    {count < 8 ? 'One More! ➡️' : 'Finish! ✅'}
                  </Button>
                )}
              </Card>
            )}

            {currentStep === 'complete' && (
              <Card className="bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-600 shadow-2xl rounded-[4rem] overflow-hidden p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                <div className="text-9xl animate-bounce">🍎</div>
                <h2 className="text-7xl drop-shadow-xl">Circle Boss!</h2>
                <p className="text-3xl font-nunito max-w-2xl mx-auto leading-relaxed">
                  You can count in a circle like a pro!
                  <br />
                  You know how to use a flag to count to 8!
                </p>
                <div className="flex gap-4 w-full pt-8">
                  <Button onClick={resetActivity} className="h-24 flex-1 bg-white/10 hover:bg-white/20 text-white text-3xl rounded-[2rem] border-4 border-white/20">
                    Again! 🔄
                  </Button>
                  <Button onClick={() => navigate("/activities/module-3?last=3-circular-count-17")} className="h-24 flex-1 bg-white text-orange-600 hover:bg-orange-50 text-3xl rounded-[2rem] shadow-2xl">
                    Yay! ✨
                  </Button>
                </div>
              </Card>
            )}

            {showFeedback && (
              <div className="fixed bottom-[33%] right-[25%] z-[100] animate-in slide-in-from-right-4 fade-in duration-300">
                <Card className={`flex items-center gap-4 px-6 py-4 shadow-2xl rounded-2xl border-4 ${showFeedback === 'correct' ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'}`}>
                  <span className="text-4xl">{showFeedback === 'correct' ? '🌟' : '🧐'}</span>
                  <h4 className={`text-2xl font-fredoka ${showFeedback === 'correct' ? 'text-green-700' : 'text-red-700'}`}>
                    {showFeedback === 'correct' ? 'Great!' : 'Try Again!'}
                  </h4>
                  <Button onClick={nextStep} size="sm" className={`ml-2 rounded-xl text-lg px-4 py-2 ${showFeedback === 'correct' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}>
                    {currentStep === 'mark' ? 'Start! ➡️' : 'Finish! ➡️'}
                  </Button>
                </Card>
              </div>
            )}

            {currentStep !== 'complete' && (
              <Button onClick={() => setShowGame(false)} variant="ghost" className="text-orange-400 hover:text-orange-600 w-full py-2 font-bold font-nunito">
                ← Back to Instructions
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CircularCount17;

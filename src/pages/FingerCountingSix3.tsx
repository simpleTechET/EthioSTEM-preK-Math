import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RefreshCw, Home, Star, Sparkles, Smile, Hand, Heart } from "lucide-react";

const FingerCounting6 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [currentStep, setCurrentStep] = useState<'hatch1' | 'hatch5' | 'hatch6' | 'complete'>('hatch1');
  const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const markLessonComplete = () => {
    const saved = localStorage.getItem("ethio-stem-m3-completed");
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes("3-finger-counting-6-lesson-3")) {
      completed.push("3-finger-counting-6-lesson-3");
      localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
    }
  };

  const nextStep = () => {
    setShowFeedback(null);
    if (currentStep === 'hatch1') setCurrentStep('hatch5');
    else if (currentStep === 'hatch5') setCurrentStep('hatch6');
    else if (currentStep === 'hatch6') {
      markLessonComplete();
      setCurrentStep('complete');
    }
  };

  const resetActivity = () => {
    setShowGame(false);
    setCurrentStep('hatch1');
    setShowFeedback(null);
  };

  const renderHands = (count: number) => {
    const leftCount = Math.min(count, 5);
    const rightCount = Math.max(0, count - 5);

    return (
      <div className="flex justify-center gap-12 my-8 py-8 bg-amber-50 rounded-[3rem] border-4 border-white shadow-inner relative overflow-hidden">
        {/* Hand 1 (Left) */}
        <div className="flex flex-col items-center">
          <p className="text-sm font-bold text-amber-400 uppercase tracking-widest mb-4">Left Hand</p>
          <div className="flex gap-2 items-end h-32">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className={`w-8 rounded-t-full transition-all duration-500 origin-bottom border-2 border-white shadow-sm flex items-center justify-center ${i < leftCount ? 'h-24 bg-yellow-400' : 'h-8 bg-gray-200 opacity-40'}`}>
                {i < leftCount && <span className="text-xl animate-in zoom-in">🐣</span>}
              </div>
            ))}
          </div>
        </div>
        {/* Hand 2 (Right) */}
        <div className="flex flex-col items-center">
          <p className="text-sm font-bold text-amber-400 uppercase tracking-widest mb-4">Right Hand</p>
          <div className="flex gap-2 items-end h-32">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className={`w-8 rounded-t-full transition-all duration-500 origin-bottom border-2 border-white shadow-sm flex items-center justify-center ${i < rightCount ? 'h-24 bg-yellow-400' : 'h-8 bg-gray-200 opacity-40'}`}>
                {i < rightCount && <span className="text-xl animate-in zoom-in">🐣</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-white p-4 font-nunito overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=3-finger-counting-6-lesson-3")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-amber-600 bg-amber-100 px-3 py-1 rounded-full font-fredoka">
                Lesson 3
              </span>
              <h1 className="text-2xl font-bold text-foreground font-fredoka uppercase tracking-wide">Finger Chicks!</h1>
            </div>
          </div>
        </div>

        {!showGame ? (
          <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] overflow-hidden text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700 relative">
            <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-yellow-500 to-amber-500 rounded-3xl flex items-center justify-center mb-6 rotate-3 shadow-lg">
              <Hand className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-5xl font-fredoka text-amber-900 leading-tight">Count with Your Hands!</h2>
            <p className="text-2xl text-amber-800 font-nunito leading-relaxed max-w-2xl mx-auto">
              Your fingers are little baby chicks hatching from eggs! 🐣
              <br />
              Let's count them one by one, starting from the left!
            </p>
            <Button
              onClick={() => setShowGame(true)}
              className="bg-amber-600 hover:bg-amber-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl font-fredoka transition-all hover:scale-105 active:scale-95 border-b-8 border-amber-800"
            >
              Play! 🐣
            </Button>
            <p className="text-sm text-amber-400 font-bold uppercase tracking-widest pt-4">Topic A: Count up to 7</p>
          </Card>
        ) : (
          <div className="space-y-6">
            {currentStep !== 'complete' && (
              <div className="flex justify-center gap-3 mb-4">
                {['hatch1', 'hatch5', 'hatch6'].map((step, idx) => (
                  <div
                    key={step}
                    className={`h-3 rounded-full transition-all ${['hatch1', 'hatch5', 'hatch6'].indexOf(currentStep) >= idx
                      ? 'bg-amber-500 w-12 shadow-sm'
                      : 'bg-amber-100 w-3'
                      }`}
                  />
                ))}
              </div>
            )}

            {currentStep === 'hatch1' && (
              <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-bottom-8">
                <h3 className="text-4xl font-fredoka text-amber-700">One Chick!</h3>
                {renderHands(1)}
                <div className="bg-amber-50 p-8 rounded-[2.5rem] border-4 border-white shadow-inner max-w-md mx-auto">
                  <p className="text-4xl font-fredoka text-amber-800">
                    Count: <span className="text-6xl text-amber-600 drop-shadow-sm">1</span>
                  </p>
                </div>
                <Button onClick={() => setShowFeedback('correct')} className="bg-amber-600 hover:bg-amber-700 text-white py-12 px-12 text-4xl font-fredoka rounded-[2rem] shadow-xl border-b-8 border-amber-800 transition-all active:scale-95">
                  Hatch More! 🐥
                </Button>
              </Card>
            )}

            {currentStep === 'hatch5' && (
              <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in zoom-in-95">
                <h3 className="text-4xl font-fredoka text-yellow-700">Five Chicks!</h3>
                {renderHands(5)}
                <div className="p-8 bg-yellow-50 border-4 border-yellow-100 rounded-[2.5rem] shadow-inner max-w-lg mx-auto">
                  <p className="text-3xl font-fredoka text-yellow-800 leading-relaxed">
                    All the chicks in the left nest have hatched!
                    <br />
                    <span className="text-6xl text-yellow-600 font-bold block mt-4">5 Chicks!</span>
                  </p>
                </div>
                <Button
                  onClick={() => setShowFeedback('correct')}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-12 px-16 text-4xl font-fredoka rounded-[2rem] shadow-xl border-b-8 border-yellow-800 transition-all active:scale-95"
                >
                  Next Nest! 🪺
                </Button>
              </Card>
            )}

            {currentStep === 'hatch6' && (
              <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-right-8">
                <h3 className="text-4xl font-fredoka text-amber-700">Six Chicks!</h3>
                {renderHands(6)}
                <div className="bg-amber-50 p-8 rounded-[2.5rem] border-4 border-white shadow-inner max-w-lg mx-auto">
                  <p className="text-4xl font-fredoka text-amber-800">
                    5 and 1 more is... <span className="text-6xl text-amber-600 drop-shadow-sm font-bold">6</span>!
                  </p>
                </div>
                <Button onClick={() => setShowFeedback('correct')} className="bg-amber-600 hover:bg-amber-700 text-white py-12 px-12 text-4xl font-fredoka rounded-[2rem] shadow-xl border-b-8 border-amber-800 transition-all active:scale-95">
                  All Done! ✨
                </Button>
              </Card>
            )}

            {currentStep === 'complete' && (
              <Card className="bg-gradient-to-br from-amber-600 via-yellow-600 to-orange-600 shadow-2xl rounded-[4rem] overflow-hidden p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                <div className="text-9xl animate-bounce">🐣</div>
                <h2 className="text-7xl font-fredoka drop-shadow-xl">Finger Master!</h2>
                <p className="text-3xl font-nunito max-w-2xl mx-auto leading-relaxed">
                  You can count to <span className="font-fredoka text-5xl text-yellow-300">6</span> on your fingers perfectly!
                  Remember: 5 and 1 more is 6.
                </p>
                <div className="flex gap-4 w-full pt-8">
                  <Button onClick={resetActivity} className="h-24 flex-1 bg-white/10 hover:bg-white/20 text-white text-3xl font-fredoka rounded-[2rem] border-4 border-white/20">
                    Again! 🔄
                  </Button>
                  <Button onClick={() => navigate("/activities/module-3?last=3-finger-counting-6-lesson-3")} className="h-24 flex-1 bg-white text-amber-600 hover:bg-amber-50 text-3xl font-fredoka rounded-[2rem] shadow-2xl">
                    Yay! ✨
                  </Button>
                </div>
              </Card>
            )}

            {showFeedback && (
              <div className="fixed bottom-6 right-6 z-[100] animate-in slide-in-from-right-4 fade-in duration-300">
                <Card className={`flex items-center gap-4 px-6 py-4 shadow-2xl rounded-2xl border-4 ${showFeedback === 'correct' ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'}`}>
                  <span className="text-4xl">{showFeedback === 'correct' ? '🌟' : '🧐'}</span>
                  <div className="flex flex-col">
                    <span className={`text-2xl font-fredoka font-bold ${showFeedback === 'correct' ? 'text-green-700' : 'text-red-700'}`}>
                      {showFeedback === 'correct' ? 'Amazing!' : 'Try Again!'}
                    </span>
                  </div>
                  <Button
                    onClick={showFeedback === 'correct' ? nextStep : () => setShowFeedback(null)}
                    className={`ml-2 px-5 py-3 text-xl font-fredoka rounded-xl border-b-4 ${showFeedback === 'correct' ? 'bg-green-600 hover:bg-green-700 border-green-800 text-white' : 'bg-red-500 hover:bg-red-600 border-red-700 text-white'}`}
                  >
                    {showFeedback === 'correct' ? 'Next ➡️' : 'OK 👍'}
                  </Button>
                </Card>
              </div>
            )}

            {currentStep !== 'complete' && (
              <Button onClick={() => setShowGame(false)} variant="ghost" className="text-amber-400 hover:text-amber-600 w-full py-2 font-bold font-nunito">
                ← Back to Instructions
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FingerCounting6;

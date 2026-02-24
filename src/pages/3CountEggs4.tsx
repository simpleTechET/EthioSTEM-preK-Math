import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RefreshCw, Home, Star, Sparkles, Smile, Egg, Bird } from "lucide-react";

const CountEggs4 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [currentStep, setCurrentStep] = useState<'hatch5' | 'hatch6' | 'hatch7' | 'complete'>('hatch5');
  const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const markLessonComplete = () => {
    const saved = localStorage.getItem("ethio-stem-m3-completed");
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes("lesson-4")) {
      completed.push("lesson-4");
      localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
    }
  };

  const nextStep = () => {
    setShowFeedback(null);
    if (currentStep === 'hatch5') setCurrentStep('hatch6');
    else if (currentStep === 'hatch6') setCurrentStep('hatch7');
    else if (currentStep === 'hatch7') {
      markLessonComplete();
      setCurrentStep('complete');
    }
  };

  const resetActivity = () => {
    setShowGame(false);
    setCurrentStep('hatch5');
    setShowFeedback(null);
  };

  const renderEggs = (count: number) => (
    <div className="flex flex-wrap justify-center gap-6 my-8 py-12 bg-amber-100/30 rounded-[4rem] border-8 border-white shadow-inner relative overflow-hidden max-w-3xl mx-auto">
      <div className="absolute inset-0 opacity-10 pointer-events-none grid grid-cols-6 gap-4 p-4 grayscale">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="text-4xl">🌾</span>
        ))}
      </div>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col items-center animate-in zoom-in duration-300 relative z-10" style={{ animationDelay: `${i * 0.1}s` }}>
          <div className={`w-24 h-24 rounded-full flex items-center justify-center text-5xl shadow-lg border-4 border-white transform hover:scale-110 transition-transform ${i < 5 ? 'bg-amber-400' : i === 5 ? 'bg-orange-400' : 'bg-rose-400'} text-white`}>
            <span className="font-fredoka">{i < count ? '🐣' : '🥚'}</span>
          </div>
          <span className="text-3xl font-bold mt-3 text-amber-900 font-fredoka drop-shadow-sm">{i + 1}</span>
        </div>
      ))}
    </div>
  );

  useEffect(() => {
    if (showFeedback === 'correct') {
      const timer = setTimeout(() => { nextStep(); }, 1200);
      return () => clearTimeout(timer);
    }
  }, [showFeedback]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-white p-4 font-nunito overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=lesson-4")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-amber-600 bg-amber-100 px-3 py-1 rounded-full font-fredoka">
                Lesson 4
              </span>
              <h1 className="text-2xl font-bold text-foreground font-fredoka uppercase tracking-wide">Egg Counting!</h1>
            </div>
          </div>
        </div>

        {!showGame ? (
          <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] overflow-hidden text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700 relative">
            <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-amber-500 to-orange-500 rounded-3xl flex items-center justify-center mb-6 rotate-3 shadow-lg">
              <Bird className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-5xl font-fredoka text-amber-900 leading-tight">Count the Nest!</h2>
            <p className="text-2xl text-amber-800 font-nunito leading-relaxed max-w-2xl mx-auto">
              How many baby chicks are hatching today?
              <br />
              Let's count them and see how big our family gets!
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
                {['hatch5', 'hatch6', 'hatch7'].map((step, idx) => (
                  <div
                    key={step}
                    className={`h-3 rounded-full transition-all ${['hatch5', 'hatch6', 'hatch7'].indexOf(currentStep) >= idx
                      ? 'bg-amber-500 w-12 shadow-sm'
                      : 'bg-amber-100 w-3'
                      }`}
                  />
                ))}
              </div>
            )}

            {currentStep === 'hatch5' && (
              <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-bottom-8">
                <h3 className="text-4xl font-fredoka text-amber-700">Five Little Chicks!</h3>
                {renderEggs(5)}
                <div className="bg-amber-50 p-8 rounded-[2.5rem] border-4 border-white shadow-inner max-w-md mx-auto">
                  <p className="text-4xl font-fredoka text-amber-800">
                    We have <span className="text-6xl text-amber-600 drop-shadow-sm font-bold">5</span> chicks!
                  </p>
                </div>
                <Button onClick={() => setShowFeedback('correct')} className="bg-amber-600 hover:bg-amber-700 text-white py-12 px-12 text-4xl font-fredoka rounded-[2rem] shadow-xl border-b-8 border-amber-800 transition-all active:scale-95">
                  Another Hatch? 🥚
                </Button>
              </Card>
            )}

            {(currentStep === 'hatch6' || currentStep === 'hatch7') && (
              <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in zoom-in-95">
                <h3 className="text-4xl font-fredoka text-orange-700">{currentStep === 'hatch6' ? 'Six Little Chicks!' : 'Seven Little Chicks!'}</h3>
                {renderEggs(currentStep === 'hatch6' ? 6 : 7)}
                <div className="p-8 bg-orange-50 border-4 border-orange-100 rounded-[2.5rem] shadow-inner max-w-2xl mx-auto">
                  <p className="text-3xl font-fredoka text-orange-800">
                    {currentStep === 'hatch6' ? '5 and 1 more is...' : '6 and 1 more is...'}
                    <span className="text-6xl text-orange-600 font-bold block mt-4">{currentStep === 'hatch6' ? '6' : '7'}!</span>
                  </p>
                </div>
                <Button
                  onClick={() => setShowFeedback('correct')}
                  className="bg-orange-500 hover:bg-orange-600 text-white py-12 px-16 text-4xl font-fredoka rounded-[2rem] shadow-xl border-b-8 border-orange-800 transition-all active:scale-95"
                >
                  {currentStep === 'hatch6' ? 'Wait, One More? 🥚' : 'Finish Counting! ✨'}
                </Button>
              </Card>
            )}

            {currentStep === 'complete' && (
              <Card className="bg-gradient-to-br from-amber-600 via-orange-600 to-rose-600 shadow-2xl rounded-[4rem] overflow-hidden p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                <div className="text-9xl animate-bounce">🐣</div>
                <h2 className="text-7xl font-fredoka drop-shadow-xl">Egg Expert!</h2>
                <p className="text-3xl font-nunito max-w-2xl mx-auto leading-relaxed">
                  You successfully counted all <span className="font-fredoka text-5xl text-yellow-300">7</span> chicks!
                  <br />
                  You know that 6 and 1 more is 7. You're amazing!
                </p>
                <div className="flex gap-4 w-full pt-8">
                  <Button onClick={resetActivity} className="h-24 flex-1 bg-white/10 hover:bg-white/20 text-white text-3xl font-fredoka rounded-[2rem] border-4 border-white/20">
                    Again! 🔄
                  </Button>
                  <Button onClick={() => navigate("/activities/module-3?last=lesson-4")} className="h-24 flex-1 bg-white text-amber-600 hover:bg-amber-50 text-3xl font-fredoka rounded-[2rem] shadow-2xl">
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

export default CountEggs4;

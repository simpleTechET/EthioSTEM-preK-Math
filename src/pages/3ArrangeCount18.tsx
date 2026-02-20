import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RefreshCw, Home, Star, Sparkles, Smile, Flower2, Waves } from "lucide-react";

const ArrangeCount18 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [currentStep, setCurrentStep] = useState<'line' | 'array' | 'circle' | 'complete'>('line');
  const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const markLessonComplete = () => {
    const saved = localStorage.getItem("ethio-stem-m3-completed");
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes("3-arrange-count-18")) {
      completed.push("3-arrange-count-18");
      localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
    }
  };

  const nextStep = () => {
    setShowFeedback(null);
    if (currentStep === 'line') setCurrentStep('array');
    else if (currentStep === 'array') setCurrentStep('circle');
    else if (currentStep === 'circle') {
      markLessonComplete();
      setCurrentStep('complete');
    }
  };

  const resetActivity = () => {
    setShowGame(false);
    setCurrentStep('line');
    setShowFeedback(null);
  };

  const renderSeeds = (config: 'line' | 'array' | 'circle') => {
    const radius = 100;
    return (
      <div className="relative w-full max-w-xl mx-auto h-[400px] flex items-center justify-center bg-emerald-100/30 rounded-[4rem] border-8 border-white shadow-inner mb-8 overflow-hidden group">
        <div className="absolute inset-0 bg-emerald-400/10 opacity-20 pointer-events-none" />

        {/* Garden Soil */}
        <div className="absolute w-80 h-80 bg-stone-700/20 rounded-[3rem] blur-xl" />

        {Array.from({ length: 8 }).map((_, i) => {
          let x = 0;
          let y = 0;

          if (config === 'line') {
            x = (i - 3.5) * 60;
            y = 0;
          } else if (config === 'array') {
            x = (i % 4 - 1.5) * 80;
            y = (Math.floor(i / 4) - 0.5) * 80;
          } else if (config === 'circle') {
            const angle = (i * 360) / 8 - 90;
            x = Math.cos((angle * Math.PI) / 180) * radius;
            y = Math.sin((angle * Math.PI) / 180) * radius;
          }

          return (
            <div
              key={i}
              className={`absolute flex flex-col items-center animate-in zoom-in duration-500`}
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)',
                animationDelay: `${i * 0.05}s`
              }}
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-3xl shadow-lg border-4 border-white bg-white">
                🌱
              </div>
              <span className="text-xl font-bold mt-1 text-emerald-900 font-fredoka drop-shadow-sm">
                {i + 1}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-lime-50 to-white p-4 font-fredoka overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=3-arrange-count-18")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
            <ArrowLeft className="w-5 h-5 text-emerald-600" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-widest font-nunito">
                Lesson 18
              </span>
              <h1 className="text-2xl font-bold text-emerald-900 uppercase">Garden Magic!</h1>
            </div>
          </div>
        </div>

        {!showGame ? (
          <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] overflow-hidden text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700 relative">
            <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-emerald-500 to-lime-500 rounded-3xl flex items-center justify-center mb-6 rotate-3 shadow-lg">
              <Flower2 className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-5xl text-emerald-900 leading-tight">Many Ways to 8!</h2>
            <p className="text-2xl text-emerald-800 font-nunito leading-relaxed max-w-2xl mx-auto">
              We're planting 8 seeds today!
              <br />
              Watch how they look in a line, an array, and even a circle!
            </p>
            <Button
              onClick={() => setShowGame(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 border-b-8 border-emerald-800"
            >
              Play! 🌱
            </Button>
            <p className="text-sm text-emerald-400 font-bold uppercase tracking-widest pt-4 font-nunito">Topic D: Matching Numerals to 8</p>
          </Card>
        ) : (
          <div className="space-y-6">
            {currentStep !== 'complete' && (
              <div className="flex justify-center gap-3 mb-4">
                {['line', 'array', 'circle'].map((step, idx) => (
                  <div
                    key={step}
                    className={`h-3 rounded-full transition-all ${['line', 'array', 'circle'].indexOf(currentStep) >= idx
                      ? 'bg-emerald-500 w-12 shadow-sm'
                      : 'bg-emerald-100 w-3'
                      }`}
                  />
                ))}
              </div>
            )}

            {currentStep !== 'complete' && (
              <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-bottom-8">
                <h3 className="text-4xl text-emerald-700 uppercase tracking-widest">
                  {currentStep === 'line' ? "Seed Line" :
                    currentStep === 'array' ? "Seed Array" :
                      "Seed Circle"}
                </h3>

                {renderSeeds(currentStep)}

                <div className="bg-emerald-50 p-8 rounded-[2.5rem] border-4 border-white shadow-inner max-w-2xl mx-auto font-nunito">
                  <p className="text-4xl text-emerald-800 leading-relaxed font-bold">
                    No matter how we plant them...
                  </p>
                  <p className="text-8xl font-fredoka text-emerald-600 mt-4 font-bold drop-shadow-sm">8</p>
                  <p className="text-2xl text-emerald-600 mt-2">There are still 8!</p>
                </div>

                <Button
                  onClick={() => setShowFeedback('correct')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white py-12 px-16 text-4xl rounded-[2rem] shadow-xl border-b-8 border-emerald-800 transition-all active:scale-95"
                >
                  Check! ✅
                </Button>
              </Card>
            )}

            {currentStep === 'complete' && (
              <Card className="bg-gradient-to-br from-emerald-600 via-lime-600 to-green-600 shadow-2xl rounded-[4rem] overflow-hidden p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                <div className="text-9xl animate-bounce">🌻</div>
                <h2 className="text-7xl drop-shadow-xl">Master Gardener!</h2>
                <p className="text-3xl font-nunito max-w-2xl mx-auto leading-relaxed">
                  You know that 8 is still 8...
                  <br />
                  In a line, a row, or a circle. Amazing!
                </p>
                <div className="flex gap-4 w-full pt-8">
                  <Button onClick={resetActivity} className="h-24 flex-1 bg-white/10 hover:bg-white/20 text-white text-3xl rounded-[2rem] border-4 border-white/20">
                    Again! 🔄
                  </Button>
                  <Button onClick={() => navigate("/activities/module-3?last=3-arrange-count-18")} className="h-24 flex-1 bg-white text-emerald-600 hover:bg-emerald-50 text-3xl rounded-[2rem] shadow-2xl">
                    Yay! ✨
                  </Button>
                </div>
              </Card>
            )}

            {showFeedback && (
              <div className="fixed bottom-6 right-6 z-[100] animate-in slide-in-from-right-4 fade-in duration-300">
                <Card className={`flex items-center gap-4 px-6 py-4 shadow-2xl rounded-2xl border-4 ${showFeedback === 'correct' ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'}`}>
                  <span className="text-4xl">{showFeedback === 'correct' ? '🌟' : '🧐'}</span>
                  <h4 className={`text-2xl font-fredoka ${showFeedback === 'correct' ? 'text-green-700' : 'text-red-700'}`}>
                    {showFeedback === 'correct' ? 'Perfect!' : 'Try Again!'}
                  </h4>
                  <Button onClick={nextStep} size="sm" className={`ml-2 rounded-xl text-lg px-4 py-2 ${showFeedback === 'correct' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}>
                    {currentStep === 'circle' ? 'Finish! ➡️' : 'Next! ➡️'}
                  </Button>
                </Card>
              </div>
            )}

            {currentStep !== 'complete' && (
              <Button onClick={() => setShowGame(false)} variant="ghost" className="text-emerald-400 hover:text-emerald-600 w-full py-2 font-bold font-nunito">
                ← Back to Instructions
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArrangeCount18;

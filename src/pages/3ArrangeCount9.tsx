import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RefreshCw, Home, Star, Sparkles, Smile, Fish, Waves } from "lucide-react";

const ArrangeCount9 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [currentStep, setCurrentStep] = useState<'line' | 'circle' | 'array' | 'complete'>('line');
  const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const markLessonComplete = () => {
    const saved = localStorage.getItem("ethio-stem-m3-completed");
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes("3-arrange-count-9")) {
      completed.push("3-arrange-count-9");
      localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
    }
  };

  const nextStep = () => {
    setShowFeedback(null);
    if (currentStep === 'line') setCurrentStep('circle');
    else if (currentStep === 'circle') setCurrentStep('array');
    else if (currentStep === 'array') {
      markLessonComplete();
      setCurrentStep('complete');
    }
  };

  const resetActivity = () => {
    setShowGame(false);
    setCurrentStep('line');
    setShowFeedback(null);
  };

  const renderFish = (count: number, config: 'line' | 'circle' | 'array') => {
    const radius = 120;
    return (
      <div className={`relative w-full max-w-2xl mx-auto h-80 flex items-center justify-center bg-blue-100/30 rounded-[4rem] border-8 border-white shadow-inner mb-8 overflow-hidden`}>
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <Waves className="w-full h-full text-blue-400" />
        </div>

        {Array.from({ length: count }).map((_, i) => {
          let style = {};
          if (config === 'line') {
            style = { left: `${(i + 1) * (100 / (count + 1))}%`, top: '50%', transform: 'translate(-50%, -50%)' };
          } else if (config === 'circle') {
            const angle = (i * 360) / count - 90;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;
            style = { left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`, transform: 'translate(-50%, -50%)' };
          } else {
            const cols = 4;
            const row = Math.floor(i / cols);
            const col = i % cols;
            style = { left: `${(col + 1) * 20 + 10}%`, top: `${(row + 1) * 30 + 10}%`, transform: 'translate(-50%, -50%)' };
          }

          return (
            <div
              key={i}
              className="absolute flex flex-col items-center animate-in zoom-in duration-300"
              style={{ ...style, animationDelay: `${i * 0.1}s` }}
            >
              <div className={`w-20 h-20 rounded-full flex items-center justify-center text-5xl shadow-lg border-4 border-white ${i < 5 ? 'bg-orange-500' : 'bg-yellow-500'} text-white`}>
                <Fish className="w-12 h-12" />
              </div>
              <span className="text-3xl font-bold mt-2 text-blue-900 font-fredoka drop-shadow-sm">{i + 1}</span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white p-4 font-fredoka overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=3-arrange-count-9")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
            <ArrowLeft className="w-5 h-5 text-blue-600" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full uppercase tracking-widest font-nunito">
                Lesson 9
              </span>
              <h1 className="text-2xl font-bold text-blue-900 uppercase">Fish Shapes!</h1>
            </div>
          </div>
        </div>

        {!showGame ? (
          <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] overflow-hidden text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700 relative">
            <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center mb-6 rotate-3 shadow-lg">
              <Fish className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-5xl text-blue-900 leading-tight">Count the School!</h2>
            <p className="text-2xl text-blue-800 font-nunito leading-relaxed max-w-2xl mx-auto">
              Fish love to swim together in schools!
              <br />
              They switch shapes, but the number of fish stays the same!
            </p>
            <Button
              onClick={() => setShowGame(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 border-b-8 border-blue-800"
            >
              Play! 🐠
            </Button>
            <p className="text-sm text-blue-400 font-bold uppercase tracking-widest pt-4 font-nunito">Topic B: Numeral Matching to 7</p>
          </Card>
        ) : (
          <div className="space-y-6">
            {currentStep !== 'complete' && (
              <div className="flex justify-center gap-3 mb-4">
                {['line', 'circle', 'array'].map((step, idx) => (
                  <div
                    key={step}
                    className={`h-3 rounded-full transition-all ${['line', 'circle', 'array'].indexOf(currentStep) >= idx
                      ? 'bg-blue-500 w-12 shadow-sm'
                      : 'bg-blue-100 w-3'
                      }`}
                  />
                ))}
              </div>
            )}

            {currentStep !== 'complete' && (
              <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-bottom-8">
                <h3 className="text-4xl text-blue-700">
                  {currentStep === 'line' ? 'Swimming in a line!' : currentStep === 'circle' ? 'Swimming in a circle!' : 'Swimming in a group!'}
                </h3>

                {renderFish(7, currentStep)}

                <div className="bg-blue-50 p-8 rounded-[2.5rem] border-4 border-white shadow-inner max-w-xl mx-auto font-nunito">
                  <p className="text-4xl text-blue-800 leading-relaxed">
                    There are <span className="font-fredoka text-6xl text-blue-600 drop-shadow-sm font-bold">7</span> fish!
                  </p>
                </div>

                <Button onClick={() => setShowFeedback('correct')} className="bg-blue-600 hover:bg-blue-700 text-white py-12 px-16 text-4xl rounded-[2rem] shadow-xl border-b-8 border-blue-800 transition-all active:scale-95">
                  Still 7? ✅
                </Button>
              </Card>
            )}

            {currentStep === 'complete' && (
              <Card className="bg-gradient-to-br from-blue-600 via-cyan-600 to-indigo-600 shadow-2xl rounded-[4rem] overflow-hidden p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                <div className="text-9xl animate-bounce">🐬</div>
                <h2 className="text-7xl drop-shadow-xl">Ocean Master!</h2>
                <p className="text-3xl font-nunito max-w-2xl mx-auto leading-relaxed">
                  You know that 7 is always 7,
                  no matter how they swim! You are a brilliant mathematician!
                </p>
                <div className="flex gap-4 w-full pt-8">
                  <Button onClick={resetActivity} className="h-24 flex-1 bg-white/10 hover:bg-white/20 text-white text-3xl rounded-[2rem] border-4 border-white/20">
                    Again! 🔄
                  </Button>
                  <Button onClick={() => navigate("/activities/module-3?last=3-arrange-count-9")} className="h-24 flex-1 bg-white text-blue-600 hover:bg-blue-50 text-3xl rounded-[2rem] shadow-2xl">
                    Finish! ✨
                  </Button>
                </div>
              </Card>
            )}

            {showFeedback && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-md animate-in fade-in duration-300">
                <Card className={`max-w-md w-full p-12 text-center shadow-[0_0_50px_rgba(0,0,0,0.3)] rounded-[4rem] border-8 animate-in zoom-in duration-300 ${showFeedback === 'correct' ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
                  }`}>
                  <div className="text-9xl mb-8">
                    {showFeedback === 'correct' ? '🌟' : '🧐'}
                  </div>
                  <h4 className={`text-6xl font-fredoka mb-8 ${showFeedback === 'correct' ? 'text-green-700' : 'text-red-700'
                    }`}>
                    {showFeedback === 'correct' ? 'Correct!' : 'Try Again!'}
                  </h4>
                  <Button
                    onClick={showFeedback === 'correct' ? nextStep : () => setShowFeedback(null)}
                    className={`w-full py-12 text-4xl rounded-[2rem] shadow-xl border-b-8 ${showFeedback === 'correct' ? 'bg-green-600 hover:bg-green-700 border-green-800 text-white' : 'bg-red-600 hover:bg-red-700 border-red-800 text-white'
                      }`}
                  >
                    {showFeedback === 'correct' ? 'NextWay! ➡️' : 'OK! 👍'}
                  </Button>
                </Card>
              </div>
            )}

            {currentStep !== 'complete' && (
              <Button onClick={() => setShowGame(false)} variant="ghost" className="text-blue-400 hover:text-blue-600 w-full py-2 font-bold font-nunito">
                ← Back to Instructions
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArrangeCount9;

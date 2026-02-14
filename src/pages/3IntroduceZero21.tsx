import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RefreshCw, Home, Star, Sparkles, Smile, Ghost, Waves } from "lucide-react";

const IntroduceZero21 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [currentStep, setCurrentStep] = useState<'balloons' | 'gone' | 'complete'>('balloons');
  const [balloons, setBalloons] = useState(3);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const markLessonComplete = () => {
    const saved = localStorage.getItem("ethio-stem-m3-completed");
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes("3-introduce-zero-21")) {
      completed.push("3-introduce-zero-21");
      localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
    }
  };

  const popBalloon = () => {
    if (balloons > 0) {
      setBalloons(prev => prev - 1);
    } else {
      setShowFeedback('correct');
    }
  };

  const nextStep = () => {
    setShowFeedback(null);
    if (currentStep === 'balloons') setCurrentStep('gone');
    else if (currentStep === 'gone') {
      markLessonComplete();
      setCurrentStep('complete');
    }
  };

  const resetActivity = () => {
    setShowGame(false);
    setCurrentStep('balloons');
    setBalloons(3);
    setShowFeedback(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-white p-4 font-fredoka overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=3-introduce-zero-21")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
            <ArrowLeft className="w-5 h-5 text-indigo-600" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full uppercase tracking-widest font-nunito">
                Lesson 21
              </span>
              <h1 className="text-2xl font-bold text-indigo-900 uppercase">A Lot of None!</h1>
            </div>
          </div>
        </div>

        {!showGame ? (
          <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] overflow-hidden text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700 relative">
            <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-3xl flex items-center justify-center mb-6 rotate-3 shadow-lg">
              <span className="text-5xl text-white">🎈</span>
            </div>
            <h2 className="text-5xl text-indigo-900 leading-tight">Meet Zero!</h2>
            <p className="text-2xl text-indigo-800 font-nunito leading-relaxed max-w-2xl mx-auto">
              What happens when all the balloons fly away?
              <br />
              We'll learn about a special number that means "none".
            </p>
            <Button
              onClick={() => setShowGame(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 border-b-8 border-indigo-800"
            >
              Play! 🎈
            </Button>
            <p className="text-sm text-indigo-400 font-bold uppercase tracking-widest pt-4 font-nunito">Topic E: Zero and 9</p>
          </Card>
        ) : (
          <div className="space-y-6">
            {currentStep !== 'complete' && (
              <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-bottom-8">
                <h3 className="text-4xl text-indigo-700 uppercase tracking-widest">
                  {currentStep === 'balloons' ? "Pop the balloons!" : "Where are they?"}
                </h3>

                <div className="flex justify-center gap-8 py-12 bg-indigo-100/30 rounded-[3rem] border-8 border-white shadow-inner min-h-[300px] items-end px-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-indigo-400/5 opacity-20 pointer-events-none" />

                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className={`text-8xl transition-all duration-700 ${i < balloons ? 'translate-y-0 opacity-100 scale-100 animate-bounce' : '-translate-y-[500px] opacity-0 scale-50'}`} style={{ animationDelay: `${i * 0.2}s` }}>
                      {['🎈', '🎈', '🎈'][i]}
                    </div>
                  ))}

                  {balloons === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center animate-in zoom-in duration-1000">
                      <div className="text-[15rem] font-black text-indigo-600/10 select-none">0</div>
                    </div>
                  )}
                </div>

                <div className="bg-indigo-50 p-8 rounded-[2.5rem] border-4 border-white shadow-inner max-w-2xl mx-auto font-nunito">
                  <p className="text-4xl text-indigo-800 leading-relaxed font-bold">
                    {balloons > 0 ? `Balloons left: ${balloons}` : "None left!"}
                  </p>
                  <p className="text-8xl font-fredoka text-indigo-600 mt-4 font-bold drop-shadow-sm">
                    {balloons === 0 ? '0' : balloons}
                  </p>
                  {balloons === 0 && (
                    <p className="text-3xl text-indigo-500 mt-4 font-bold">This is ZERO!</p>
                  )}
                </div>

                <Button
                  onClick={balloons > 0 ? popBalloon : () => setShowFeedback('correct')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white py-12 px-16 text-4xl rounded-[2rem] shadow-xl border-b-8 border-indigo-800 transition-all active:scale-95"
                >
                  {balloons > 0 ? 'Let go! 🎈' : 'Check! ✅'}
                </Button>
              </Card>
            )}

            {currentStep === 'complete' && (
              <Card className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 shadow-2xl rounded-[4rem] overflow-hidden p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                <div className="text-[12rem] font-black animate-bounce leading-none">0</div>
                <h2 className="text-7xl drop-shadow-xl">Hero of Zero!</h2>
                <p className="text-3xl font-nunito max-w-2xl mx-auto leading-relaxed">
                  You learned that 0 means "none".
                  <br />
                  You're ready for more numbers!
                </p>
                <div className="flex gap-4 w-full pt-8">
                  <Button onClick={resetActivity} className="h-24 flex-1 bg-white/10 hover:bg-white/20 text-white text-3xl rounded-[2rem] border-4 border-white/20">
                    Again! 🔄
                  </Button>
                  <Button onClick={() => navigate("/activities/module-3?last=3-introduce-zero-21")} className="h-24 flex-1 bg-white text-indigo-600 hover:bg-rose-50 text-3xl rounded-[2rem] shadow-2xl">
                    Yay! ✨
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
                    {showFeedback === 'correct' ? 'Perfect!' : 'Try Again!'}
                  </h4>
                  <Button
                    onClick={nextStep}
                    className={`w-full py-12 text-4xl rounded-[2rem] shadow-xl border-b-8 ${showFeedback === 'correct' ? 'bg-green-600 hover:bg-green-700 border-green-800 text-white' : 'bg-red-600 hover:bg-red-700 border-red-800 text-white'
                      }`}
                  >
                    Finish! ➡️
                  </Button>
                </Card>
              </div>
            )}

            {currentStep !== 'complete' && (
              <Button onClick={() => setShowGame(false)} variant="ghost" className="text-indigo-400 hover:text-indigo-600 w-full py-2 font-bold font-nunito">
                ← Back to Instructions
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default IntroduceZero21;

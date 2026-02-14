import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RefreshCw, Home, Star, Sparkles, Smile, Puzzle, Waves } from "lucide-react";

const Compose8Lesson16 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [currentStep, setCurrentStep] = useState<'compose' | 'break' | 'complete'>('compose');
  const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const markLessonComplete = () => {
    const saved = localStorage.getItem("ethio-stem-m3-completed");
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes("3-compose-8-16")) {
      completed.push("3-compose-8-16");
      localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
    }
  };

  const nextStep = () => {
    setShowFeedback(null);
    if (currentStep === 'compose') setCurrentStep('break');
    else if (currentStep === 'break') {
      markLessonComplete();
      setCurrentStep('complete');
    }
  };

  const resetActivity = () => {
    setShowGame(false);
    setCurrentStep('compose');
    setShowFeedback(null);
  };

  const renderCubes = (left: number, right: number, isComposed: boolean) => (
    <div className="flex justify-center items-end gap-2 p-12 bg-rose-100/30 rounded-[4rem] border-8 border-white shadow-inner max-w-2xl mx-auto transition-all duration-700 h-[450px]">
      <div className={`flex flex-col gap-2 transition-all duration-500 ${isComposed ? 'translate-y-0' : '-translate-x-8'}`}>
        {Array.from({ length: left }).map((_, i) => (
          <div key={i} className={`w-16 h-16 rounded-xl border-4 border-white shadow-lg animate-in zoom-in bg-rose-500`} style={{ animationDelay: `${i * 0.1}s` }} />
        ))}
      </div>
      <div className={`flex flex-col gap-2 transition-all duration-500 ${isComposed ? 'translate-y-0' : 'translate-x-8'}`}>
        {Array.from({ length: right }).map((_, i) => (
          <div key={i} className={`w-16 h-16 rounded-xl border-4 border-white shadow-lg animate-in zoom-in bg-orange-500`} style={{ animationDelay: `${(left + i) * 0.1}s` }} />
        ))}
      </div>
      {isComposed && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl font-bold text-white/20 pointer-events-none select-none">
          8
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-white p-4 font-fredoka overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=3-compose-8-16")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
            <ArrowLeft className="w-5 h-5 text-rose-600" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-rose-600 bg-rose-100 px-3 py-1 rounded-full uppercase tracking-widest font-nunito">
                Lesson 16
              </span>
              <h1 className="text-2xl font-bold text-rose-900 uppercase">Partner Puzzle!</h1>
            </div>
          </div>
        </div>

        {!showGame ? (
          <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] overflow-hidden text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700 relative">
            <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-rose-500 to-pink-500 rounded-3xl flex items-center justify-center mb-6 rotate-3 shadow-lg">
              <Puzzle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-5xl text-rose-900 leading-tight">Partner Pairs!</h2>
            <p className="text-2xl text-rose-800 font-nunito leading-relaxed max-w-2xl mx-auto">
              Let's put blocks together to make 8!
              <br />
              We'll also see that we can break 8 into different parts.
            </p>
            <Button
              onClick={() => setShowGame(true)}
              className="bg-rose-600 hover:bg-rose-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 border-b-8 border-rose-800"
            >
              Play! 🧩
            </Button>
            <p className="text-sm text-rose-400 font-bold uppercase tracking-widest pt-4 font-nunito">Topic D: Matching Numerals to 8</p>
          </Card>
        ) : (
          <div className="space-y-6">
            {currentStep !== 'complete' && (
              <div className="flex justify-center gap-3 mb-4">
                {['compose', 'break'].map((step, idx) => (
                  <div
                    key={step}
                    className={`h-3 rounded-full transition-all ${['compose', 'break'].indexOf(currentStep) >= idx
                      ? 'bg-rose-500 w-12 shadow-sm'
                      : 'bg-rose-100 w-3'
                      }`}
                  />
                ))}
              </div>
            )}

            {currentStep !== 'complete' && (
              <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-bottom-8 relative overflow-hidden">
                {currentStep === 'compose' && (
                  <div className="absolute top-10 right-10 animate-spin-slow opacity-20">
                    <Sparkles className="w-20 h-20 text-rose-400" />
                  </div>
                )}

                <h3 className="text-4xl text-rose-700 uppercase tracking-widest">
                  {currentStep === 'compose' ? "Put them together!" : "Break them apart!"}
                </h3>

                {renderCubes(currentStep === 'compose' ? 4 : 5, currentStep === 'compose' ? 4 : 3, currentStep === 'compose')}

                <div className="bg-rose-50 p-8 rounded-[2.5rem] border-4 border-white shadow-inner max-w-2xl mx-auto font-nunito">
                  <p className="text-4xl text-rose-800 leading-relaxed font-bold">
                    {currentStep === 'compose' ? "4 and 4 make..." : "8 can be 5 and..."}
                  </p>
                  <p className="text-8xl font-fredoka text-rose-600 mt-4 font-bold drop-shadow-sm">
                    {currentStep === 'compose' ? '8' : '3'}
                  </p>
                </div>

                <Button
                  onClick={() => setShowFeedback('correct')}
                  className="bg-rose-600 hover:bg-rose-700 text-white py-12 px-16 text-4xl rounded-[2rem] shadow-xl border-b-8 border-rose-800 transition-all active:scale-95"
                >
                  Check! ✅
                </Button>
              </Card>
            )}

            {currentStep === 'complete' && (
              <Card className="bg-gradient-to-br from-rose-600 via-pink-600 to-orange-600 shadow-2xl rounded-[4rem] overflow-hidden p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                <div className="text-9xl animate-bounce"> puzzle </div>
                <h2 className="text-7xl drop-shadow-xl">Puzzle Pro!</h2>
                <p className="text-3xl font-nunito max-w-2xl mx-auto leading-relaxed">
                  You found the partners of 8!
                  <br />
                  You are getting so good at this!
                </p>
                <div className="flex gap-4 w-full pt-8">
                  <Button onClick={resetActivity} className="h-24 flex-1 bg-white/10 hover:bg-white/20 text-white text-3xl rounded-[2rem] border-4 border-white/20">
                    Again! 🔄
                  </Button>
                  <Button onClick={() => navigate("/activities/module-3?last=3-compose-8-16")} className="h-24 flex-1 bg-white text-rose-600 hover:bg-rose-50 text-3xl rounded-[2rem] shadow-2xl">
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
                    onClick={showFeedback === 'correct' ? nextStep : () => setShowFeedback(null)}
                    className={`w-full py-12 text-4xl rounded-[2rem] shadow-xl border-b-8 ${showFeedback === 'correct' ? 'bg-green-600 hover:bg-green-700 border-green-800 text-white' : 'bg-red-600 hover:bg-red-700 border-red-800 text-white'
                      }`}
                  >
                    {showFeedback === 'correct' ? 'Next! ➡️' : 'OK! 👍'}
                  </Button>
                </Card>
              </div>
            )}

            {currentStep !== 'complete' && (
              <Button onClick={() => setShowGame(false)} variant="ghost" className="text-rose-400 hover:text-rose-600 w-full py-2 font-bold font-nunito">
                ← Back to Instructions
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Compose8Lesson16;

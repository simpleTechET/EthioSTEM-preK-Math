import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RefreshCw, Home, Star, Sparkles, Smile, Shirt, Boxes } from "lucide-react";

const CountArrays5 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [currentStep, setCurrentStep] = useState<'intro' | 'count6' | 'complete'>('intro');
  const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const markLessonComplete = () => {
    const saved = localStorage.getItem("ethio-stem-m3-completed");
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes("lesson-5")) {
      completed.push("lesson-5");
      localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
    }
  };

  const nextStep = () => {
    setShowFeedback(null);
    if (currentStep === 'intro') setCurrentStep('count6');
    else if (currentStep === 'count6') {
      markLessonComplete();
      setCurrentStep('complete');
    }
  };

  const resetActivity = () => {
    setShowGame(false);
    setCurrentStep('intro');
    setShowFeedback(null);
  };

  const renderArray = (count: number) => (
    <div className="grid grid-cols-3 gap-6 my-8 py-12 bg-indigo-100/30 rounded-[4rem] border-8 border-white shadow-inner relative overflow-hidden max-w-2xl mx-auto">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col items-center animate-in zoom-in duration-300 relative z-10" style={{ animationDelay: `${i * 0.1}s` }}>
          <div className={`w-28 h-28 rounded-[2rem] flex items-center justify-center text-5xl shadow-lg border-4 border-white transform hover:scale-110 transition-transform bg-indigo-500 text-white`}>
            <Shirt className="w-14 h-14" />
          </div>
          <span className="text-3xl font-bold mt-4 text-indigo-900 font-fredoka drop-shadow-sm">{i + 1}</span>
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-white p-4 font-nunito overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=lesson-5")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full font-fredoka">
                Lesson 5
              </span>
              <h1 className="text-2xl font-bold text-foreground font-fredoka uppercase tracking-wide">Array Counting!</h1>
            </div>
          </div>
        </div>

        {!showGame ? (
          <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] overflow-hidden text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700 relative">
            <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-indigo-500 to-blue-500 rounded-3xl flex items-center justify-center mb-6 rotate-3 shadow-lg">
              <Boxes className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-5xl font-fredoka text-indigo-900 leading-tight">Rows and Columns!</h2>
            <p className="text-2xl text-indigo-800 font-nunito leading-relaxed max-w-2xl mx-auto">
              Sometimes things are lined up in neat rows!
              <br />
              Let's count our shirts from left to right.
            </p>
            <Button
              onClick={() => setShowGame(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl font-fredoka transition-all hover:scale-105 active:scale-95 border-b-8 border-indigo-800"
            >
              Play! 👕
            </Button>
            <p className="text-sm text-indigo-400 font-bold uppercase tracking-widest pt-4">Topic A: Count up to 7</p>
          </Card>
        ) : (
          <div className="space-y-6">
            {currentStep !== 'complete' && (
              <div className="flex justify-center mb-4">
                <div className="h-3 rounded-full bg-indigo-500 w-24 shadow-sm" />
              </div>
            )}

            {currentStep === 'intro' && (
              <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-bottom-8">
                <h3 className="text-4xl font-fredoka text-indigo-700">The Array!</h3>
                <div className="grid grid-cols-3 gap-6 max-w-xl mx-auto py-12 bg-indigo-50 rounded-[3rem]">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="w-24 h-24 mx-auto bg-indigo-200 rounded-2xl flex items-center justify-center text-3xl font-bold text-indigo-700 shadow-sm border-2 border-white">?</div>
                  ))}
                </div>
                <div className="p-8 bg-indigo-50 border-4 border-white rounded-[2.5rem] shadow-inner max-w-xl mx-auto">
                  <p className="text-3xl font-fredoka text-indigo-800">
                    Count from left to right, then go to the next row!
                  </p>
                </div>
                <Button onClick={() => setShowFeedback('correct')} className="bg-indigo-600 hover:bg-indigo-700 text-white py-12 px-16 text-4xl font-fredoka rounded-[2rem] shadow-xl border-b-8 border-indigo-800 transition-all active:scale-95">
                  I'm Ready! ➡️
                </Button>
              </Card>
            )}

            {currentStep === 'count6' && (
              <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in zoom-in-95">
                <h3 className="text-4xl font-fredoka text-indigo-700">Count the Array!</h3>
                {renderArray(6)}
                <div className="p-8 bg-indigo-50 border-4 border-white rounded-[2.5rem] shadow-inner max-w-2xl mx-auto">
                  <p className="text-4xl font-fredoka text-indigo-800 font-bold">
                    There are <span className="text-7xl text-indigo-600 drop-shadow-sm">6</span> shirts!
                  </p>
                </div>
                <Button
                  onClick={() => setShowFeedback('correct')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white py-12 px-16 text-4xl font-fredoka rounded-[2rem] shadow-xl border-b-8 border-indigo-800 transition-all active:scale-95"
                >
                  Finish! ✨
                </Button>
              </Card>
            )}

            {currentStep === 'complete' && (
              <Card className="bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600 shadow-2xl rounded-[4rem] overflow-hidden p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                <div className="text-9xl animate-bounce">🎖️</div>
                <h2 className="text-7xl font-fredoka drop-shadow-xl">Array Hero!</h2>
                <p className="text-3xl font-nunito max-w-2xl mx-auto leading-relaxed">
                  You can count things in rows and columns!
                  <br />
                  You counted <span className="font-fredoka text-5xl text-yellow-300">6</span> items. You're a math star! 🌟
                </p>
                <div className="flex gap-4 w-full pt-8">
                  <Button onClick={resetActivity} className="h-24 flex-1 bg-white/10 hover:bg-white/20 text-white text-3xl font-fredoka rounded-[2rem] border-4 border-white/20">
                    Again! 🔄
                  </Button>
                  <Button onClick={() => navigate("/activities/module-3?last=lesson-5")} className="h-24 flex-1 bg-white text-indigo-600 hover:bg-indigo-50 text-3xl font-fredoka rounded-[2rem] shadow-2xl">
                    Topic Complete! ✨
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

export default CountArrays5;

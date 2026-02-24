import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Footprints, Waves } from "lucide-react";

const speakNumber = (num: number) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(num.toString());
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);
  }
};

const LinearCount13 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [currentStep, setCurrentStep] = useState<'intro' | 'adventure' | 'complete'>('intro');
  const [rockCount, setRockCount] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const markLessonComplete = () => {
    const saved = localStorage.getItem("ethio-stem-m3-completed");
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes("lesson-13")) {
      completed.push("lesson-13");
      localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
    }
  };

  const handleRockClick = (index: number) => {
    if (index === rockCount && rockCount < 8) {
      const next = rockCount + 1;
      setRockCount(next);
      speakNumber(next);
      if (next === 8) {
        setTimeout(() => {
          setShowFeedback('correct');
          markLessonComplete();
        }, 500);
      }
    }
  };

  const nextStep = () => {
    setShowFeedback(null);
    setCurrentStep('complete');
  };

  const resetActivity = () => {
    setShowGame(false);
    setCurrentStep('intro');
    setRockCount(0);
    setShowFeedback(null);
  };

  useEffect(() => {
    if (showFeedback === 'correct') {
      const timer = setTimeout(() => { nextStep(); }, 1200);
      return () => clearTimeout(timer);
    }
  }, [showFeedback]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-emerald-50 to-white p-4 font-fredoka overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=lesson-13")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
            <ArrowLeft className="w-5 h-5 text-emerald-600" />
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full uppercase tracking-widest font-nunito">Lesson 13</span>
            <h1 className="text-lg font-bold text-emerald-900 uppercase">Creek Crossing!</h1>
          </div>
        </div>

        {!showGame ? (
          <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden text-center p-5 lg:p-8 space-y-4 animate-in fade-in zoom-in duration-700 relative">
            <div className="mx-auto w-14 h-14 bg-gradient-to-tr from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center rotate-3 shadow-lg">
              <Footprints className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl lg:text-3xl text-emerald-900 leading-tight">Help the Explorer!</h2>
            <p className="text-base lg:text-lg text-emerald-800 font-nunito leading-relaxed max-w-xl mx-auto">
              Tap each rock from left to right to count to 8!
            </p>
            <Button
              onClick={() => { setShowGame(true); setCurrentStep('adventure'); }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xl px-10 py-5 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 border-b-4 border-emerald-800"
            >
              Play! 🧗‍♀️
            </Button>
            <p className="text-xs text-emerald-400 font-bold uppercase tracking-widest font-nunito">Topic C: How Many with 8 Objects</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {currentStep !== 'complete' && (
              <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-2xl p-4 lg:p-6 text-center space-y-3 animate-in slide-in-from-bottom-8">
                <h3 className="text-lg lg:text-2xl text-emerald-700">Tap the rocks to count!</h3>

                <div className="relative w-full max-w-2xl mx-auto h-40 lg:h-48 flex items-center justify-between px-8 bg-blue-400/20 rounded-2xl border-4 border-white shadow-inner overflow-hidden">
                  <div className="absolute inset-0 bg-blue-400/30 opacity-40 pointer-events-none">
                    <Waves className="w-full h-full text-blue-200" />
                  </div>
                  <div className="absolute left-0 top-0 bottom-0 w-10 bg-emerald-600 rounded-l-xl border-r-2 border-white/20 z-10" />
                  <div className="absolute right-0 top-0 bottom-0 w-10 bg-emerald-600 rounded-r-xl border-l-2 border-white/20 z-10" />

                  <div className="flex-1 flex justify-center gap-2 lg:gap-3 z-20">
                    {Array.from({ length: 8 }).map((_, i) => {
                      const isClicked = i < rockCount;
                      const isNext = i === rockCount;
                      return (
                        <div
                          key={i}
                          onClick={() => handleRockClick(i)}
                          className={`relative flex flex-col items-center cursor-pointer transition-all duration-300 ${isClicked ? '' : isNext ? 'animate-pulse hover:scale-110' : 'opacity-30'}`}
                        >
                          <div className={`w-12 h-10 lg:w-14 lg:h-12 rounded-full flex items-center justify-center text-xl shadow-lg border-2 border-white ${isClicked ? (i < 5 ? 'bg-zinc-600 ring-3 ring-yellow-300' : 'bg-amber-600 ring-3 ring-yellow-300') : 'bg-zinc-400'} text-white`}>
                            {isClicked ? '🪨' : '?'}
                          </div>
                          {isClicked && (
                            <span className="text-sm font-bold mt-1 text-blue-900 font-fredoka drop-shadow-sm">{i + 1}</span>
                          )}
                          {isNext && !isClicked && (
                            <span className="text-[10px] font-bold mt-0.5 text-emerald-400 animate-pulse">Tap!</span>
                          )}
                          {isClicked && i === rockCount - 1 && (
                            <div className="absolute -top-8 text-2xl lg:text-3xl animate-bounce">🧗‍♀️</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-emerald-50 p-3 lg:p-4 rounded-2xl border-4 border-white shadow-inner max-w-lg mx-auto font-nunito">
                  <p className="text-lg lg:text-xl text-emerald-800">
                    {rockCount === 0 ? "Tap the first rock!" :
                      rockCount === 8 ? "All 8 rocks! She can cross! 🎉" :
                        `${rockCount} rocks so far!`}
                  </p>
                  <p className="text-4xl lg:text-5xl font-fredoka text-emerald-600 mt-1 font-bold drop-shadow-sm">{rockCount}</p>
                </div>
              </Card>
            )}

            {currentStep === 'complete' && (
              <Card className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 shadow-2xl rounded-2xl overflow-hidden p-6 lg:p-10 text-center text-white space-y-4 animate-in zoom-in-95 duration-700">
                <div className="text-6xl animate-bounce">🏞️</div>
                <h2 className="text-3xl lg:text-4xl drop-shadow-xl">Travel Guide!</h2>
                <p className="text-base lg:text-lg font-nunito max-w-xl mx-auto leading-relaxed">
                  You helped the explorer cross the creek! You counted all 8 rocks!
                </p>
                <div className="flex gap-3 w-full pt-2">
                  <Button onClick={resetActivity} className="h-12 flex-1 bg-white/10 hover:bg-white/20 text-white text-lg rounded-2xl border-2 border-white/20">
                    Again! 🔄
                  </Button>
                  <Button onClick={() => navigate("/activities/module-3?last=lesson-13")} className="h-24 flex-1 bg-white text-emerald-600 hover:bg-emerald-50 text-3xl rounded-[2rem] shadow-2xl">
                    Yay! ✨
                  </Button>
                </div>
              </Card >
            )}

            {
              showFeedback && (
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
              )
            }

            {
              currentStep !== 'complete' && (
                <Button onClick={() => setShowGame(false)} variant="ghost" className="text-emerald-400 hover:text-emerald-600 w-full py-1 text-sm font-bold font-nunito">
                  ← Back to Instructions
                </Button>
              )
            }
          </div >
        )}
      </div >
    </div >
  );
};

export default LinearCount13;
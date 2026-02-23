import { useState, useEffect } from "react";
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

  const markLessonComplete = () => {
    const saved = localStorage.getItem("ethio-stem-m3-completed");
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes("3-linear-count-13")) {
      completed.push("3-linear-count-13");
      localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
    }
  };

  const handleRockClick = (index: number) => {
    if (index === rockCount && rockCount < 8) {
      const next = rockCount + 1;
      setRockCount(next);
      speakNumber(next);
    }
  };

  useEffect(() => {
    if (rockCount === 8) {
      const timer = setTimeout(() => {
        markLessonComplete();
        setCurrentStep('complete');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [rockCount]);

  const resetActivity = () => {
    setShowGame(false);
    setCurrentStep('intro');
    setRockCount(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-emerald-50 to-white p-4 font-fredoka overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=3-linear-count-13")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
            <ArrowLeft className="w-5 h-5 text-emerald-600" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-widest font-nunito">
                Lesson 13
              </span>
              <h1 className="text-2xl font-bold text-emerald-900 uppercase">Creek Crossing!</h1>
            </div>
          </div>
        </div>

        {!showGame ? (
          <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] overflow-hidden text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700 relative">
            <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center mb-6 rotate-3 shadow-lg">
              <Footprints className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-5xl text-emerald-900 leading-tight">Help the Explorer!</h2>
            <p className="text-2xl text-emerald-800 font-nunito leading-relaxed max-w-2xl mx-auto">
              The traveler needs to step on rocks to cross the water.
              <br />
              Tap each rock from left to right to count to 8!
            </p>
            <Button
              onClick={() => { setShowGame(true); setCurrentStep('adventure'); }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 border-b-8 border-emerald-800"
            >
              Play! 🧗‍♀️
            </Button>
            <p className="text-sm text-emerald-400 font-bold uppercase tracking-widest pt-4 font-nunito">Topic C: How Many with 8 Objects</p>
          </Card>
        ) : (
          <div className="space-y-6">
            {currentStep !== 'complete' && (
              <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-bottom-8">
                <h3 className="text-4xl text-emerald-700">
                  Tap the rocks to count!
                </h3>

                <div className="relative w-full max-w-4xl mx-auto h-64 flex items-center justify-between px-12 bg-blue-400/20 rounded-[4rem] border-8 border-white shadow-inner mb-8 overflow-hidden">
                  <div className="absolute inset-0 bg-blue-400/30 opacity-40 pointer-events-none">
                    <Waves className="w-full h-full text-blue-200" />
                  </div>
                  <div className="absolute left-0 top-0 bottom-0 w-16 bg-emerald-600 rounded-l-[3.5rem] border-r-4 border-white/20 z-10" />
                  <div className="absolute right-0 top-0 bottom-0 w-16 bg-emerald-600 rounded-r-[3.5rem] border-l-4 border-white/20 z-10" />

                  <div className="flex-1 flex justify-center gap-4 z-20">
                    {Array.from({ length: 8 }).map((_, i) => {
                      const isClicked = i < rockCount;
                      const isNext = i === rockCount;
                      return (
                        <div
                          key={i}
                          onClick={() => handleRockClick(i)}
                          className={`relative flex flex-col items-center cursor-pointer transition-all duration-300 ${isClicked ? '' : isNext ? 'animate-pulse hover:scale-110' : 'opacity-30'}`}
                        >
                          <div className={`w-20 h-16 rounded-full flex items-center justify-center text-3xl shadow-lg border-4 border-white ${isClicked ? (i < 5 ? 'bg-zinc-600 ring-4 ring-yellow-300' : 'bg-amber-600 ring-4 ring-yellow-300') : 'bg-zinc-400'} text-white`}>
                            {isClicked ? '🪨' : '?'}
                          </div>
                          {isClicked && (
                            <span className="text-2xl font-bold mt-2 text-blue-900 font-fredoka drop-shadow-sm">{i + 1}</span>
                          )}
                          {isNext && !isClicked && (
                            <span className="text-xs font-bold mt-1 text-emerald-400 animate-pulse">Tap!</span>
                          )}
                          {isClicked && i === rockCount - 1 && (
                            <div className="absolute -top-12 text-5xl animate-bounce">🧗‍♀️</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-emerald-50 p-8 rounded-[2.5rem] border-4 border-white shadow-inner max-w-2xl mx-auto font-nunito">
                  <p className="text-4xl text-emerald-800 leading-relaxed">
                    {rockCount === 0 ? "Tap the first rock!" :
                      rockCount === 8 ? "All 8 rocks! She can cross! 🎉" :
                        `${rockCount} rocks so far!`}
                  </p>
                  <p className="text-8xl font-fredoka text-emerald-600 mt-4 font-bold drop-shadow-sm">{rockCount}</p>
                </div>
              </Card>
            )}

            {currentStep === 'complete' && (
              <Card className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 shadow-2xl rounded-[4rem] overflow-hidden p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                <div className="text-9xl animate-bounce">🏞️</div>
                <h2 className="text-7xl drop-shadow-xl">Travel Guide!</h2>
                <p className="text-3xl font-nunito max-w-2xl mx-auto leading-relaxed">
                  You helped the explorer cross the creek!
                  <br />
                  You counted all 8 rocks!
                </p>
                <div className="flex gap-4 w-full pt-8">
                  <Button onClick={resetActivity} className="h-24 flex-1 bg-white/10 hover:bg-white/20 text-white text-3xl rounded-[2rem] border-4 border-white/20">
                    Again! 🔄
                  </Button>
                  <Button onClick={() => navigate("/activities/module-3?last=3-linear-count-13")} className="h-24 flex-1 bg-white text-emerald-600 hover:bg-emerald-50 text-3xl rounded-[2rem] shadow-2xl">
                    Yay! ✨
                  </Button>
                </div>
              </Card>
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

export default LinearCount13;

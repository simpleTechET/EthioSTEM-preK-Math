import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RefreshCw, Home, Star, Sparkles, Smile, Coffee, Waves } from "lucide-react";

const speakNumber = (num: number) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(num.toString());
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);
  }
};

const Tally19 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [currentStep, setCurrentStep] = useState<'seat' | 'tally' | 'complete'>('seat');
  const [beesSeated, setBeesSeated] = useState(0);
  const [tallies, setTallies] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const markLessonComplete = () => {
    const saved = localStorage.getItem("ethio-stem-m3-completed");
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes("lesson-19")) {
      completed.push("lesson-19");
      localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
    }
  };

  useEffect(() => {
    if (currentStep === 'seat' && beesSeated === 8) {
      const timer = setTimeout(() => setCurrentStep('tally'), 1200);
      return () => clearTimeout(timer);
    }
  }, [beesSeated, currentStep]);

  useEffect(() => {
    if (currentStep === 'tally' && tallies === 8) {
      const timer = setTimeout(() => {
        markLessonComplete();
        setCurrentStep('complete');
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [tallies, currentStep]);

  const handleSeatClick = (index: number) => {
    if (index === beesSeated && beesSeated < 8) {
      const next = beesSeated + 1;
      setBeesSeated(next);
      speakNumber(next);
      if (next === 8) {
        setShowFeedback('correct');
      }
    }
  };

  const nextStep = () => {
    setShowFeedback(null);
    if (currentStep === 'seat') setCurrentStep('tally');
    else if (currentStep === 'tally') {
      markLessonComplete();
      setCurrentStep('complete');
    }
  };

  useEffect(() => {
    if (showFeedback === 'correct') {
      const timer = setTimeout(() => { nextStep(); }, 1200);
      return () => clearTimeout(timer);
    }
  }, [showFeedback]);

  const handleTallyClick = () => {
    if (tallies < 8) {
      const next = tallies + 1;
      setTallies(next);
      speakNumber(next);
      if (next === 8) {
        setShowFeedback('correct');
      }
    }
  };

  const resetActivity = () => {
    setShowGame(false);
    setCurrentStep('seat');
    setBeesSeated(0);
    setTallies(0);
  };

  const renderTallies = (count: number) => {
    const bundles = Math.floor(count / 5);
    const remaining = count % 5;

    return (
      <div onClick={handleTallyClick} className="flex gap-8 items-center justify-center h-24 cursor-pointer hover:bg-amber-100/50 rounded-2xl transition-all active:scale-[0.98] min-w-[160px]">
        {count === 0 ? (
          <p className="text-lg text-amber-300 font-fredoka animate-pulse">Tap to tally!</p>
        ) : (
          <>
            {Array.from({ length: bundles }).map((_, b) => (
              <div key={b} className="relative flex gap-1.5">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="w-1.5 h-12 bg-amber-800 rounded-full" />
                ))}
                <div className="absolute top-1/2 left-0 w-[120%] h-1.5 bg-amber-800 rounded-full -rotate-45 -translate-y-1/2" />
              </div>
            ))}
            {remaining > 0 && (
              <div className="flex gap-1.5">
                {Array.from({ length: remaining }).map((_, i) => (
                  <div key={i} className="w-1.5 h-12 bg-amber-800 rounded-full animate-in slide-in-from-top-4" />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-white p-4 font-fredoka overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=lesson-19")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
            <ArrowLeft className="w-5 h-5 text-amber-600" />
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full uppercase tracking-widest font-nunito">Lesson 19</span>
            <h1 className="text-lg font-bold text-amber-900 uppercase">Pollen Café!</h1>
          </div>
        </div>

        {!showGame ? (
          <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden text-center p-5 lg:p-8 space-y-4 animate-in fade-in zoom-in duration-700 relative">
            <div className="mx-auto w-14 h-14 bg-gradient-to-tr from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center rotate-3 shadow-lg">
              <span className="text-3xl text-white">🐝</span>
            </div>
            <h2 className="text-2xl lg:text-3xl text-amber-900 leading-tight">Cafe Worker!</h2>
            <p className="text-base lg:text-lg text-amber-800 font-nunito leading-relaxed max-w-xl mx-auto">
              Help seat the bees in the cafe! We'll use tally marks to keep track.
            </p>
            <Button onClick={() => setShowGame(true)} className="bg-amber-600 hover:bg-amber-700 text-white text-xl px-10 py-5 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 border-b-4 border-amber-800">
              Play! ☕
            </Button>
            <p className="text-xs text-amber-400 font-bold uppercase tracking-widest font-nunito">Topic D: Matching Numerals to 8</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {currentStep !== 'complete' && (
              <div className="flex justify-center gap-2 mb-1">
                {['seat', 'tally'].map((step, idx) => (
                  <div key={step} className={`h-2 rounded-full transition-all ${['seat', 'tally'].indexOf(currentStep) >= idx ? 'bg-amber-500 w-10 shadow-sm' : 'bg-amber-100 w-2'}`} />
                ))}
              </div>
            )}

            {currentStep !== 'complete' && (
              <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-2xl p-4 lg:p-6 text-center space-y-3 animate-in slide-in-from-bottom-8">
                <h3 className="text-lg lg:text-2xl text-amber-700 uppercase tracking-wider">
                  {currentStep === 'seat' ? "Tap each seat!" : "Tap to tally!"}
                </h3>

                <div className="flex justify-center gap-3 py-3 bg-amber-100/30 rounded-2xl border-4 border-white shadow-inner items-center px-4">
                  {currentStep === 'seat' ? (
                    <div className="flex flex-wrap justify-center gap-2">
                      {Array.from({ length: 8 }).map((_, i) => {
                        const isSeated = i < beesSeated;
                        const isNext = i === beesSeated;
                        return (
                          <div key={i} onClick={() => handleSeatClick(i)}
                            className={`relative w-12 h-14 rounded-xl border-2 border-white shadow-lg flex items-center justify-center text-2xl transition-all cursor-pointer ${isSeated ? 'bg-yellow-400 ring-3 ring-yellow-300' : isNext ? 'bg-white animate-pulse hover:scale-110' : 'bg-white opacity-40'}`}>
                            {isSeated ? '🐝' : '🪑'}
                            {isSeated && (
                              <span className="absolute -top-1.5 -right-1.5 bg-amber-600 text-white w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold border border-white">{i + 1}</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    renderTallies(tallies)
                  )}
                </div>

                <div className="bg-amber-50 p-3 lg:p-4 rounded-2xl border-4 border-white shadow-inner max-w-lg mx-auto font-nunito">
                  <p className="text-lg lg:text-xl text-amber-800 font-bold">
                    {currentStep === 'seat' ? `Seated: ${beesSeated} / 8` : `Tallied: ${tallies} / 8`}
                  </p>
                  <p className="text-4xl lg:text-5xl font-fredoka text-amber-600 mt-1 font-bold drop-shadow-sm">
                    {currentStep === 'seat' ? beesSeated : tallies}
                  </p>
                </div>
              </Card>
            )}

            {currentStep === 'complete' && (
              <Card className="bg-gradient-to-br from-amber-600 via-yellow-600 to-orange-600 shadow-2xl rounded-2xl overflow-hidden p-6 lg:p-10 text-center text-white space-y-4 animate-in zoom-in-95 duration-700">
                <div className="text-6xl animate-bounce">☕</div>
                <h2 className="text-3xl lg:text-4xl drop-shadow-xl">Super Server!</h2>
                <p className="text-base lg:text-lg font-nunito max-w-xl mx-auto leading-relaxed">
                  The Pollen Café is humming! You used tally marks to count all 8 bees!
                </p>
                <div className="flex gap-4 w-full pt-8">
                  <Button onClick={resetActivity} className="h-24 flex-1 bg-white/10 hover:bg-white/20 text-white text-3xl rounded-[2rem] border-4 border-white/20">
                    Again! 🔄
                  </Button>
                  <Button onClick={() => navigate("/activities/module-3?last=lesson-19")} className="h-24 flex-1 bg-white text-amber-600 hover:bg-amber-50 text-3xl rounded-[2rem] shadow-2xl">
                    Yay! ✨
                  </Button>
                </div>
              </Card>
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
                <Button onClick={() => setShowGame(false)} variant="ghost" className="text-amber-400 hover:text-amber-600 w-full py-1 text-sm font-bold font-nunito">← Back to Instructions</Button>
              )
            }
          </div >
        )}
      </div >
    </div >
  );
};

export default Tally19;

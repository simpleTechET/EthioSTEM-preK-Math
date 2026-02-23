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

  const markLessonComplete = () => {
    const saved = localStorage.getItem("ethio-stem-m3-completed");
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes("3-tally-19")) {
      completed.push("3-tally-19");
      localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
    }
  };

  // Auto-advance when seating complete
  useEffect(() => {
    if (currentStep === 'seat' && beesSeated === 8) {
      const timer = setTimeout(() => setCurrentStep('tally'), 1200);
      return () => clearTimeout(timer);
    }
  }, [beesSeated, currentStep]);

  // Complete when tallying done
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
    }
  };

  const handleTallyClick = () => {
    if (tallies < 8) {
      const next = tallies + 1;
      setTallies(next);
      speakNumber(next);
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
      <div
        onClick={handleTallyClick}
        className="flex gap-12 items-center justify-center h-32 cursor-pointer hover:bg-amber-100/50 rounded-3xl transition-all active:scale-[0.98] min-w-[200px]"
      >
        {count === 0 ? (
          <p className="text-2xl text-amber-300 font-fredoka animate-pulse">Tap to tally!</p>
        ) : (
          <>
            {Array.from({ length: bundles }).map((_, b) => (
              <div key={b} className="relative flex gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="w-2 h-16 bg-amber-800 rounded-full" />
                ))}
                <div className="absolute top-1/2 left-0 w-[120%] h-2 bg-amber-800 rounded-full -rotate-45 -translate-y-1/2" />
              </div>
            ))}
            {remaining > 0 && (
              <div className="flex gap-2">
                {Array.from({ length: remaining }).map((_, i) => (
                  <div key={i} className="w-2 h-16 bg-amber-800 rounded-full animate-in slide-in-from-top-4" />
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
          <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=3-tally-19")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
            <ArrowLeft className="w-5 h-5 text-amber-600" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-amber-600 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-widest font-nunito">
                Lesson 19
              </span>
              <h1 className="text-2xl font-bold text-amber-900 uppercase">Pollen Café!</h1>
            </div>
          </div>
        </div>

        {!showGame ? (
          <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] overflow-hidden text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700 relative">
            <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-amber-500 to-yellow-500 rounded-3xl flex items-center justify-center mb-6 rotate-3 shadow-lg">
              <span className="text-5xl text-white">🐝</span>
            </div>
            <h2 className="text-5xl text-amber-900 leading-tight">Cafe Worker!</h2>
            <p className="text-2xl text-amber-800 font-nunito leading-relaxed max-w-2xl mx-auto">
              Help seat the bees in the cafe!
              <br />
              We'll use tally marks to keep track of their orders.
            </p>
            <Button
              onClick={() => setShowGame(true)}
              className="bg-amber-600 hover:bg-amber-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 border-b-8 border-amber-800"
            >
              Play! ☕
            </Button>
            <p className="text-sm text-amber-400 font-bold uppercase tracking-widest pt-4 font-nunito">Topic D: Matching Numerals to 8</p>
          </Card>
        ) : (
          <div className="space-y-6">
            {currentStep !== 'complete' && (
              <div className="flex justify-center gap-3 mb-4">
                {['seat', 'tally'].map((step, idx) => (
                  <div
                    key={step}
                    className={`h-3 rounded-full transition-all ${['seat', 'tally'].indexOf(currentStep) >= idx
                      ? 'bg-amber-500 w-12 shadow-sm'
                      : 'bg-amber-100 w-3'
                      }`}
                  />
                ))}
              </div>
            )}

            {currentStep !== 'complete' && (
              <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-bottom-8">
                <h3 className="text-4xl text-amber-700 uppercase tracking-widest">
                  {currentStep === 'seat' ? "Tap each seat!" : "Tap to tally!"}
                </h3>

                <div className="flex justify-center gap-4 py-8 bg-amber-100/30 rounded-[3rem] border-8 border-white shadow-inner min-h-[250px] items-center px-8">
                  {currentStep === 'seat' ? (
                    <div className="flex flex-wrap justify-center gap-4">
                      {Array.from({ length: 8 }).map((_, i) => {
                        const isSeated = i < beesSeated;
                        const isNext = i === beesSeated;
                        return (
                          <div
                            key={i}
                            onClick={() => handleSeatClick(i)}
                            className={`w-16 h-20 rounded-2xl border-4 border-white shadow-lg flex items-center justify-center text-4xl transition-all cursor-pointer ${isSeated ? 'bg-yellow-400 ring-4 ring-yellow-300' : isNext ? 'bg-white animate-pulse hover:scale-110' : 'bg-white opacity-40'}`}
                          >
                            {isSeated ? '🐝' : isNext ? '🪑' : '🪑'}
                            {isSeated && (
                              <span className="absolute -top-2 -right-2 bg-amber-600 text-white w-7 h-7 rounded-full text-sm flex items-center justify-center font-bold border-2 border-white">
                                {i + 1}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    renderTallies(tallies)
                  )}
                </div>

                <div className="bg-amber-50 p-8 rounded-[2.5rem] border-4 border-white shadow-inner max-w-2xl mx-auto font-nunito">
                  <p className="text-4xl text-amber-800 leading-relaxed font-bold">
                    {currentStep === 'seat' ? `Seated: ${beesSeated} / 8` : `Tallied: ${tallies} / 8`}
                  </p>
                  <p className="text-8xl font-fredoka text-amber-600 mt-4 font-bold drop-shadow-sm">
                    {currentStep === 'seat' ? beesSeated : tallies}
                  </p>
                </div>
              </Card>
            )}

            {currentStep === 'complete' && (
              <Card className="bg-gradient-to-br from-amber-600 via-yellow-600 to-orange-600 shadow-2xl rounded-[4rem] overflow-hidden p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                <div className="text-9xl animate-bounce">☕</div>
                <h2 className="text-7xl drop-shadow-xl">Super Server!</h2>
                <p className="text-3xl font-nunito max-w-2xl mx-auto leading-relaxed">
                  The Pollen Café is humming!
                  <br />
                  You used tally marks to count all 8 bees!
                </p>
                <div className="flex gap-4 w-full pt-8">
                  <Button onClick={resetActivity} className="h-24 flex-1 bg-white/10 hover:bg-white/20 text-white text-3xl rounded-[2rem] border-4 border-white/20">
                    Again! 🔄
                  </Button>
                  <Button onClick={() => navigate("/activities/module-3?last=3-tally-19")} className="h-24 flex-1 bg-white text-amber-600 hover:bg-amber-50 text-3xl rounded-[2rem] shadow-2xl">
                    Yay! ✨
                  </Button>
                </div>
              </Card>
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

export default Tally19;

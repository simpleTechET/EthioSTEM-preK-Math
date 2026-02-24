import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const speakNumber = (num: number) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(num.toString());
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);
  }
};

const FingerCount14 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [currentStep, setCurrentStep] = useState<'hatch5' | 'hatch3' | 'complete'>('hatch5');
  const [hatched, setHatched] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const markLessonComplete = () => {
    const saved = localStorage.getItem("ethio-stem-m3-completed");
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes("lesson-14")) {
      completed.push("lesson-14");
      localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
    }
  };

  const handleEggClick = (index: number) => {
    if (index === hatched) {
      const next = hatched + 1;
      setHatched(next);
      speakNumber(next);

      if (next === 5 && currentStep === 'hatch5') {
        setTimeout(() => setShowFeedback('correct'), 500);
      } else if (next === 8 && currentStep === 'hatch3') {
        setTimeout(() => {
          setShowFeedback('correct');
          markLessonComplete();
        }, 500);
      }
    }
  };

  const nextStep = () => {
    setShowFeedback(null);
    if (currentStep === 'hatch5') {
      setCurrentStep('hatch3');
    } else {
      setCurrentStep('complete');
    }
  };

  const resetActivity = () => {
    setShowGame(false);
    setHatched(0);
    setCurrentStep('hatch5');
    setShowFeedback(null);
  };

  useEffect(() => {
    if (showFeedback === 'correct') {
      const timer = setTimeout(() => {
        nextStep();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [showFeedback]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-white p-4 font-fredoka overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=lesson-14")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
            <ArrowLeft className="w-5 h-5 text-amber-600" />
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full uppercase tracking-widest font-nunito">Lesson 14</span>
            <h1 className="text-lg font-bold text-amber-900 uppercase">Finger Chicks!</h1>
          </div>
        </div>

        {!showGame ? (
          <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden text-center p-5 lg:p-8 space-y-4 animate-in fade-in zoom-in duration-700 relative">
            <div className="mx-auto w-14 h-14 bg-gradient-to-tr from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center rotate-3 shadow-lg">
              <span className="text-3xl text-white">🐣</span>
            </div>
            <h2 className="text-2xl lg:text-3xl text-amber-900 leading-tight">Hatch the Fingers!</h2>
            <p className="text-base lg:text-lg text-amber-800 font-nunito leading-relaxed max-w-xl mx-auto">
              Tap each egg to hatch them — 5 in one nest, 3 more in the other!
            </p>
            <Button onClick={() => setShowGame(true)} className="bg-amber-600 hover:bg-amber-700 text-white text-xl px-10 py-5 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 border-b-4 border-amber-800">
              Play! 🐥
            </Button>
            <p className="text-xs text-amber-400 font-bold uppercase tracking-widest font-nunito">Topic C: How Many with 8 Objects</p>
          </Card>
        ) : (
          <div className="space-y-6">
            {currentStep !== 'complete' && (
              <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-bottom-8">
                <h3 className="text-4xl text-amber-700">
                  {currentStep === 'hatch5' ? "Hatch Nest 1!" : "Hatch Nest 2!"}
                </h3>

                <div className="flex justify-center gap-6 lg:gap-8 py-3 bg-yellow-100/30 rounded-2xl border-4 border-white shadow-inner max-w-2xl mx-auto items-end px-4 overflow-hidden">
                  {/* Nest 1 */}
                  <div className={`flex flex-col items-center gap-4 transition-all duration-500 ${currentStep === 'hatch3' ? 'opacity-50 scale-90' : 'scale-110'}`}>
                    <div className="flex gap-3 items-end h-48">
                      {[0, 1, 2, 3, 4].map((i) => {
                        const isHatched = i < hatched;
                        const isNext = i === hatched && currentStep === 'hatch5';
                        return (
                          <div key={i} onClick={() => handleEggClick(i)} className={`flex flex-col items-center ${isNext ? 'cursor-pointer' : ''}`}>
                            <div className={`w-14 h-32 rounded-t-full border-4 border-white shadow-lg transition-all duration-300 flex flex-col items-center justify-center gap-1 ${isHatched ? 'bg-yellow-400' : isNext ? 'bg-yellow-200 animate-pulse hover:scale-110 border-amber-400' : 'bg-yellow-200 opacity-40'}`}>
                              {isHatched ? (
                                <>
                                  <span className="text-xl animate-bounce">🐥</span>
                                  <span className="text-sm font-bold text-amber-900">{i + 1}</span>
                                </>
                              ) : (
                                <span className="text-lg">{isNext ? '👆' : '🥚'}</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="text-3xl">✋</div>
                    <div className="text-sm font-bold text-amber-700 bg-amber-100 px-3 py-0.5 rounded-full border border-white shadow-sm">Nest 1</div>
                  </div>

                  {/* Nest 2 */}
                  <div className={`flex flex-col items-center gap-4 transition-all duration-500 ${currentStep === 'hatch5' ? 'opacity-50 scale-90' : 'scale-110'}`}>
                    <div className="flex gap-3 items-end h-48">
                      {[5, 6, 7].map((i) => {
                        const isHatched = i < hatched;
                        const isNext = i === hatched && currentStep === 'hatch3';
                        return (
                          <div key={i} onClick={() => handleEggClick(i)} className={`flex flex-col items-center ${isNext ? 'cursor-pointer' : ''}`}>
                            <div className={`w-14 h-32 rounded-t-full border-4 border-white shadow-lg transition-all duration-300 flex flex-col items-center justify-center gap-1 ${isHatched ? 'bg-orange-400' : isNext ? 'bg-orange-200 animate-pulse hover:scale-110 border-orange-400' : 'bg-orange-200 opacity-40'}`}>
                              {isHatched ? (
                                <>
                                  <span className="text-xl animate-bounce">🐥</span>
                                  <span className="text-sm font-bold text-orange-900">{i + 1}</span>
                                </>
                              ) : (
                                <span className="text-lg">{isNext ? '👆' : '🥚'}</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="text-3xl">🤚</div>
                    <div className="text-sm font-bold text-orange-700 bg-orange-100 px-3 py-0.5 rounded-full border border-white shadow-sm">Nest 2</div>
                  </div>
                </div>

                <div className="bg-amber-50 p-3 lg:p-4 rounded-2xl border-4 border-white shadow-inner max-w-lg mx-auto font-nunito">
                  <p className="text-lg lg:text-xl text-amber-800 font-bold">
                    {hatched === 0 ? "Tap the first egg!" : hatched === 8 ? "All 8 chicks hatched! 🎉" : `Hatched: ${hatched}`}
                  </p>
                  <p className="text-4xl lg:text-5xl font-fredoka text-amber-600 mt-1 font-bold drop-shadow-sm">{hatched}</p>
                </div>
              </Card>
            )}

            {currentStep === 'complete' && (
              <Card className="bg-gradient-to-br from-amber-600 via-orange-600 to-yellow-600 shadow-2xl rounded-[4rem] overflow-hidden p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                <div className="text-9xl animate-bounce">🐥</div>
                <h2 className="text-7xl drop-shadow-xl">Finger Star!</h2>
                <p className="text-3xl font-nunito max-w-2xl mx-auto leading-relaxed">
                  You counted all 8 fingers!
                  <br />
                  5 and 3 more is 8. You are a math genius!
                </p>
                <div className="flex gap-4 w-full pt-8">
                  <Button onClick={resetActivity} className="h-24 flex-1 bg-white/10 hover:bg-white/20 text-white text-3xl rounded-[2rem] border-4 border-white/20">
                    Again! 🔄
                  </Button>
                  <Button onClick={() => navigate("/activities/module-3?last=lesson-14")} className="h-24 flex-1 bg-white text-amber-600 hover:bg-amber-50 text-3xl rounded-[2rem] shadow-2xl">
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

export default FingerCount14;
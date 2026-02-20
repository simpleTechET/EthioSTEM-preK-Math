import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RefreshCw, Home, Star, Sparkles, Smile, Hand, Waves } from "lucide-react";

const FingerCount14 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [currentStep, setCurrentStep] = useState<'hatch5' | 'hatch3' | 'complete'>('hatch5');
  const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const markLessonComplete = () => {
    const saved = localStorage.getItem("ethio-stem-m3-completed");
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes("3-finger-count-14")) {
      completed.push("3-finger-count-14");
      localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
    }
  };

  const nextStep = () => {
    setShowFeedback(null);
    if (currentStep === 'hatch5') setCurrentStep('hatch3');
    else if (currentStep === 'hatch3') {
      markLessonComplete();
      setCurrentStep('complete');
    }
  };

  const resetActivity = () => {
    setShowGame(false);
    setCurrentStep('hatch5');
    setShowFeedback(null);
  };

  const renderHands = (count: number, activeNest: 1 | 2) => {
    return (
      <div className="flex justify-center gap-12 my-8 py-12 bg-yellow-100/30 rounded-[4rem] border-8 border-white shadow-inner max-w-4xl mx-auto items-end px-12 overflow-hidden">
        {/* Nest 1 (Left Hand) */}
        <div className={`flex flex-col items-center gap-4 transition-all duration-500 ${activeNest === 2 ? 'opacity-40 scale-90' : 'scale-110'}`}>
          <div className="flex gap-3 items-end h-48">
            {[1, 2, 3, 4, 5].map((i) => {
              const isVisible = (activeNest === 1 && i <= count) || activeNest === 2;
              return (
                <div key={i} className="flex flex-col items-center">
                  <div className={`w-14 h-32 rounded-t-full border-4 border-white shadow-lg transition-all duration-300 flex flex-col items-center justify-center gap-1 ${isVisible ? 'bg-yellow-400' : 'bg-yellow-200'}`}>
                    {isVisible ? (
                      <>
                        <span className="text-3xl animate-bounce">🐥</span>
                        <span className="text-xl font-bold text-amber-900">{i}</span>
                      </>
                    ) : (
                      <span className="text-2xl opacity-50">🥚</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-5xl">✋</div>
          <div className="text-xl font-bold text-amber-700 bg-amber-100 px-4 py-1 rounded-full border-2 border-white shadow-sm">Nest 1</div>
        </div>

        {/* Nest 2 (Right Hand) */}
        <div className={`flex flex-col items-center gap-4 transition-all duration-500 ${activeNest === 1 ? 'opacity-40 scale-90' : 'scale-110'}`}>
          <div className="flex gap-3 items-end h-48">
            {[6, 7, 8].map((i) => {
              const isVisible = activeNest === 2 && i <= (5 + count);
              return (
                <div key={i} className="flex flex-col items-center">
                  <div className={`w-14 h-32 rounded-t-full border-4 border-white shadow-lg transition-all duration-300 flex flex-col items-center justify-center gap-1 ${isVisible ? 'bg-orange-400' : 'bg-orange-200'}`}>
                    {isVisible ? (
                      <>
                        <span className="text-3xl animate-bounce">🐥</span>
                        <span className="text-xl font-bold text-orange-900">{i}</span>
                      </>
                    ) : (
                      <span className="text-2xl opacity-50">🥚</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-5xl">🤚</div>
          <div className="text-xl font-bold text-orange-700 bg-orange-100 px-4 py-1 rounded-full border-2 border-white shadow-sm">Nest 2</div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-white p-4 font-fredoka overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=3-finger-count-14")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
            <ArrowLeft className="w-5 h-5 text-amber-600" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-amber-600 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-widest font-nunito">
                Lesson 14
              </span>
              <h1 className="text-2xl font-bold text-amber-900 uppercase">Finger Chicks!</h1>
            </div>
          </div>
        </div>

        {!showGame ? (
          <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] overflow-hidden text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700 relative">
            <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-yellow-500 to-orange-500 rounded-3xl flex items-center justify-center mb-6 rotate-3 shadow-lg">
              <span className="text-5xl text-white">🐣</span>
            </div>
            <h2 className="text-5xl text-amber-900 leading-tight">Hatch the Fingers!</h2>
            <p className="text-2xl text-amber-800 font-nunito leading-relaxed max-w-2xl mx-auto">
              Pretend your fingers are chicks in nests.
              <br />
              We'll hatch 5 in one nest and 3 more in the other!
            </p>
            <Button
              onClick={() => setShowGame(true)}
              className="bg-amber-600 hover:bg-amber-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 border-b-8 border-amber-800"
            >
              Play! 🐥
            </Button>
            <p className="text-sm text-amber-400 font-bold uppercase tracking-widest pt-4 font-nunito">Topic C: How Many with 8 Objects</p>
          </Card>
        ) : (
          <div className="space-y-6">
            {currentStep !== 'complete' && (
              <div className="flex justify-center gap-3 mb-4">
                {['hatch5', 'hatch3'].map((step, idx) => (
                  <div
                    key={step}
                    className={`h-3 rounded-full transition-all ${['hatch5', 'hatch3'].indexOf(currentStep) >= idx
                      ? 'bg-amber-500 w-12 shadow-sm'
                      : 'bg-amber-100 w-3'
                      }`}
                  />
                ))}
              </div>
            )}

            {currentStep !== 'complete' && (
              <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-bottom-8">
                <h3 className="text-4xl text-amber-700">
                  {currentStep === 'hatch5' ? "Hatch Nest 1!" : "Hatch Nest 2!"}
                </h3>

                {renderHands(currentStep === 'hatch5' ? 5 : 3, currentStep === 'hatch5' ? 1 : 2)}

                <div className="bg-amber-50 p-8 rounded-[2.5rem] border-4 border-white shadow-inner max-w-2xl mx-auto font-nunito">
                  <p className="text-4xl text-amber-800 leading-relaxed font-bold">
                    {currentStep === 'hatch5' ? "I hatched 5 chicks!" : "I hatched 3 more!"}
                  </p>
                  <p className="text-8xl font-fredoka text-amber-600 mt-4 font-bold drop-shadow-sm">
                    {currentStep === 'hatch5' ? '5' : '8'}
                  </p>
                </div>

                <Button
                  onClick={() => setShowFeedback('correct')}
                  className="bg-amber-600 hover:bg-amber-700 text-white py-12 px-16 text-4xl rounded-[2rem] shadow-xl border-b-8 border-amber-800 transition-all active:scale-95"
                >
                  Check! ✅
                </Button>
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
                  <Button onClick={() => navigate("/activities/module-3?last=3-finger-count-14")} className="h-24 flex-1 bg-white text-amber-600 hover:bg-amber-50 text-3xl rounded-[2rem] shadow-2xl">
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
                    {showFeedback === 'correct' ? 'Great!' : 'Try Again!'}
                  </h4>
                  <Button onClick={showFeedback === 'correct' ? nextStep : () => setShowFeedback(null)} size="sm" className={`ml-2 rounded-xl text-lg px-4 py-2 ${showFeedback === 'correct' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}>
                    {showFeedback === 'correct' ? 'Next! ➡️' : 'OK! 👍'}
                  </Button>
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

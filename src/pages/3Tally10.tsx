import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RefreshCw, Home, Star, Sparkles, Smile, Pencil, Tractor } from "lucide-react";

const Tally10 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [currentStep, setCurrentStep] = useState<'learn5' | 'learn6' | 'learn7' | 'complete'>('learn5');
  const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const markLessonComplete = () => {
    const saved = localStorage.getItem("ethio-stem-m3-completed");
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes("3-tally-10")) {
      completed.push("3-tally-10");
      localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
    }
  };

  const nextStep = () => {
    setShowFeedback(null);
    if (currentStep === 'learn5') setCurrentStep('learn6');
    else if (currentStep === 'learn6') setCurrentStep('learn7');
    else if (currentStep === 'learn7') {
      markLessonComplete();
      setCurrentStep('complete');
    }
  };

  const resetActivity = () => {
    setShowGame(false);
    setCurrentStep('learn5');
    setShowFeedback(null);
  };

  const renderTallies = (count: number) => {
    const bundle = count >= 5;
    const remainder = count - 5;
    return (
      <div className="flex justify-center gap-12 my-8 py-12 bg-amber-100/30 rounded-[4rem] border-8 border-white shadow-inner max-w-2xl mx-auto items-center">
        {bundle && (
          <div className="relative w-32 h-44 flex items-center justify-center animate-in zoom-in duration-500">
            {/* 4 Vertical lines */}
            <div className="flex gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-3 h-40 bg-amber-800 rounded-full shadow-sm" />
              ))}
            </div>
            {/* Diagonal line */}
            <div className="absolute w-44 h-4 bg-amber-900/80 rounded-full shadow-md -rotate-[25deg] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white/20" />
          </div>
        )}
        {!bundle && (
          <div className="flex gap-4">
            {Array.from({ length: count }).map((_, i) => (
              <div key={i} className="w-3 h-40 bg-amber-800 rounded-full shadow-sm animate-in slide-in-from-top-4" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
        )}
        {bundle && remainder > 0 && (
          <div className="flex gap-4">
            {Array.from({ length: remainder }).map((_, i) => (
              <div key={i} className="w-3 h-40 bg-emerald-700 rounded-full shadow-sm animate-in slide-in-from-top-4" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-white p-4 font-fredoka overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=3-tally-10")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
            <ArrowLeft className="w-5 h-5 text-amber-600" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-amber-600 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-widest font-nunito">
                Lesson 10
              </span>
              <h1 className="text-2xl font-bold text-amber-900 uppercase">Farm Tallies!</h1>
            </div>
          </div>
        </div>

        {!showGame ? (
          <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] overflow-hidden text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700 relative">
            <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-amber-500 to-orange-500 rounded-3xl flex items-center justify-center mb-6 rotate-3 shadow-lg">
              <Tractor className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-5xl text-amber-900 leading-tight">Count with Tallies!</h2>
            <p className="text-2xl text-amber-800 font-nunito leading-relaxed max-w-2xl mx-auto">
              Old MacDonald needs to count his animals!
              <br />
              Let's use tally marks. They're like little sticks that help us remember!
            </p>
            <Button
              onClick={() => setShowGame(true)}
              className="bg-amber-600 hover:bg-amber-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 border-b-8 border-amber-800"
            >
              Play! 🚜
            </Button>
            <p className="text-sm text-amber-400 font-bold uppercase tracking-widest pt-4 font-nunito">Topic B: Numeral Matching to 7</p>
          </Card>
        ) : (
          <div className="space-y-6">
            {currentStep !== 'complete' && (
              <div className="flex justify-center gap-3 mb-4">
                {['learn5', 'learn6', 'learn7'].map((step, idx) => (
                  <div
                    key={step}
                    className={`h-3 rounded-full transition-all ${['learn5', 'learn6', 'learn7'].indexOf(currentStep) >= idx
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
                  {currentStep === 'learn5' ? 'The Secret of 5!' : currentStep === 'learn6' ? 'Six Little Sheep!' : 'Seven Big Horses!'}
                </h3>

                {renderTallies(currentStep === 'learn5' ? 5 : currentStep === 'learn6' ? 6 : 7)}

                <div className="bg-amber-50 p-8 rounded-[2.5rem] border-4 border-white shadow-inner max-w-2xl mx-auto font-nunito">
                  <p className="text-4xl text-amber-800 leading-relaxed">
                    {currentStep === 'learn5' ? 'When we have 5, we bundle them!' :
                      currentStep === 'learn6' ? '6 is a bundle of 5 and 1 more!' :
                        '7 is a bundle of 5 and 2 more!'}
                  </p>
                  <p className="text-7xl font-fredoka text-amber-600 drop-shadow-sm font-bold mt-4">
                    {currentStep === 'learn5' ? '5' : currentStep === 'learn6' ? '6' : '7'}
                  </p>
                </div>

                <Button onClick={() => setShowFeedback('correct')} className="bg-amber-600 hover:bg-amber-700 text-white py-12 px-16 text-4xl rounded-[2rem] shadow-xl border-b-8 border-amber-800 transition-all active:scale-95">
                  Got it! ✅
                </Button>
              </Card>
            )}

            {currentStep === 'complete' && (
              <Card className="bg-gradient-to-br from-amber-600 via-orange-600 to-rose-600 shadow-2xl rounded-[4rem] overflow-hidden p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                <div className="text-9xl animate-bounce">✏️</div>
                <h2 className="text-7xl drop-shadow-xl">Tally Master!</h2>
                <p className="text-3xl font-nunito max-w-2xl mx-auto leading-relaxed">
                  You can count with bundles of 5!
                  <br />
                  You're ready to help Old MacDonald every day!
                </p>
                <div className="flex gap-4 w-full pt-8">
                  <Button onClick={resetActivity} className="h-24 flex-1 bg-white/10 hover:bg-white/20 text-white text-3xl rounded-[2rem] border-4 border-white/20">
                    Again! 🔄
                  </Button>
                  <Button onClick={() => navigate("/activities/module-3?last=3-tally-10")} className="h-24 flex-1 bg-white text-amber-600 hover:bg-amber-50 text-3xl rounded-[2rem] shadow-2xl">
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
                    {showFeedback === 'correct' ? 'Amazing!' : 'Try Again!'}
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

export default Tally10;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RefreshCw, Home, Star, Sparkles, Smile, Pencil, Tractor } from "lucide-react";

const speakNumber = (num: number) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(num.toString());
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);
  }
};

const Tally10 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [currentStep, setCurrentStep] = useState<'learn5' | 'learn6' | 'learn7' | 'complete'>('learn5');
  const [tallyCount, setTallyCount] = useState(0);

  const targetCount = currentStep === 'learn5' ? 5 : currentStep === 'learn6' ? 6 : 7;

  const markLessonComplete = () => {
    const saved = localStorage.getItem("ethio-stem-m3-completed");
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes("lesson-10")) {
      completed.push("lesson-10");
      localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
    }
  };

  const handleTallyClick = () => {
    if (tallyCount < targetCount) {
      const next = tallyCount + 1;
      setTallyCount(next);
      speakNumber(next);
    }
  };

  useEffect(() => {
    if (tallyCount === targetCount && tallyCount > 0) {
      const timer = setTimeout(() => {
        if (currentStep === 'learn5') {
          setCurrentStep('learn6');
          setTallyCount(0);
        } else if (currentStep === 'learn6') {
          setCurrentStep('learn7');
          setTallyCount(0);
        } else if (currentStep === 'learn7') {
          markLessonComplete();
          setCurrentStep('complete');
        }
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [tallyCount, targetCount, currentStep]);

  const resetActivity = () => {
    setShowGame(false);
    setCurrentStep('learn5');
    setTallyCount(0);
  };

  const renderTallies = (count: number, target: number) => {
    const bundle = count >= 5;
    const remainder = count - 5;


    return (
      <div
        onClick={handleTallyClick}
        className={`flex justify-center gap-8 py-4 lg:py-6 bg-amber-100/30 rounded-2xl lg:rounded-[3rem] border-4 border-white shadow-inner max-w-xl mx-auto items-center min-h-[120px] lg:min-h-[160px] cursor-pointer transition-all hover:bg-amber-100/50 active:scale-[0.98] ${count < target ? 'border-dashed' : ''}`}
      >
        {count === 0 ? (
          <div className="text-amber-300 flex flex-col items-center gap-2 animate-pulse">
            <Pencil className="w-10 h-10" />
            <p className="text-base lg:text-lg font-fredoka uppercase tracking-widest">Tap to add a tally!</p>
          </div>
        ) : (
          <>
            {bundle && (
              <div className="relative w-24 h-28 lg:h-32 flex items-center justify-center animate-in zoom-in duration-500">
                <div className="flex gap-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-2 h-24 lg:h-28 bg-amber-800 rounded-full shadow-sm" />
                  ))}
                </div>
                <div className="absolute w-32 h-3 bg-amber-900/80 rounded-full shadow-md -rotate-[25deg] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white/20" />
              </div>
            )}
            {!bundle && (
              <div className="flex gap-3">
                {Array.from({ length: count }).map((_, i) => (
                  <div key={i} className="w-2 h-24 lg:h-28 bg-amber-800 rounded-full shadow-sm animate-in slide-in-from-top-4" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
            )}
            {bundle && remainder > 0 && (
              <div className="flex gap-3">
                {Array.from({ length: remainder }).map((_, i) => (
                  <div key={i} className="w-2 h-24 lg:h-28 bg-emerald-700 rounded-full shadow-sm animate-in slide-in-from-top-4" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-white p-4 font-fredoka overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=lesson-10")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
            <ArrowLeft className="w-5 h-5 text-amber-600" />
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full uppercase tracking-widest font-nunito">Lesson 10</span>
            <h1 className="text-lg font-bold text-amber-900 uppercase">Farm Tallies!</h1>
          </div>
        </div>

        {!showGame ? (
          <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-2xl lg:rounded-[2rem] overflow-hidden text-center p-5 lg:p-8 space-y-4 animate-in fade-in zoom-in duration-700 relative">
            <div className="mx-auto w-14 h-14 bg-gradient-to-tr from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center rotate-3 shadow-lg">
              <Tractor className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl lg:text-3xl text-amber-900 leading-tight">Count with Tallies!</h2>
            <p className="text-base lg:text-lg text-amber-800 font-nunito leading-relaxed max-w-xl mx-auto">
              Old MacDonald needs to count his animals! Let's use tally marks.
            </p>
            <Button
              onClick={() => setShowGame(true)}
              className="bg-amber-600 hover:bg-amber-700 text-white text-xl px-10 py-5 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 border-b-4 border-amber-800"
            >
              Play! 🚜
            </Button>
            <p className="text-xs text-amber-400 font-bold uppercase tracking-widest font-nunito">Topic B: Numeral Matching to 7</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {currentStep !== 'complete' && (
              <div className="flex justify-center gap-2 mb-1">
                {['learn5', 'learn6', 'learn7'].map((step, idx) => (
                  <div key={step} className={`h-2 rounded-full transition-all ${['learn5', 'learn6', 'learn7'].indexOf(currentStep) >= idx ? 'bg-amber-500 w-10 shadow-sm' : 'bg-amber-100 w-2'}`} />
                ))}
              </div>
            )}

            {currentStep !== 'complete' && (
              <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-2xl lg:rounded-[2rem] p-4 lg:p-6 text-center space-y-3 animate-in slide-in-from-bottom-8">
                <h3 className="text-lg lg:text-2xl text-amber-700">
                  {currentStep === 'learn5' ? 'Tally to 5!' : currentStep === 'learn6' ? 'Now tally to 6!' : 'Tally to 7!'}
                </h3>

                {renderTallies(tallyCount, targetCount)}

                <div className="bg-amber-50 p-3 lg:p-4 rounded-2xl border-4 border-white shadow-inner max-w-lg mx-auto font-nunito">
                  <p className="text-lg lg:text-xl text-amber-800">
                    {tallyCount === 0 ? 'Tap the area to start tallying!' :
                      tallyCount === targetCount ? (currentStep === 'learn5' ? 'Bundle of 5! 🎉' : `${targetCount} tallies! 🎉`) :
                        `Keep going! ${tallyCount} of ${targetCount}`}
                  </p>
                  <p className="text-4xl lg:text-5xl font-fredoka text-amber-600 drop-shadow-sm font-bold mt-1">{tallyCount}</p>
                </div>
              </Card>
            )}

            {currentStep === 'complete' && (
              <Card className="bg-gradient-to-br from-amber-600 via-orange-600 to-rose-600 shadow-2xl rounded-2xl lg:rounded-[3rem] overflow-hidden p-6 lg:p-10 text-center text-white space-y-4 animate-in zoom-in-95 duration-700">
                <div className="text-6xl animate-bounce">✏️</div>
                <h2 className="text-3xl lg:text-4xl drop-shadow-xl">Tally Master!</h2>
                <p className="text-base lg:text-lg font-nunito max-w-xl mx-auto leading-relaxed">
                  You can count with bundles of 5! You're ready to help Old MacDonald every day!
                </p>
                <div className="flex gap-3 w-full pt-2">
                  <Button onClick={resetActivity} className="h-12 flex-1 bg-white/10 hover:bg-white/20 text-white text-lg rounded-2xl border-2 border-white/20">
                    Again! 🔄
                  </Button>
                  <Button onClick={() => navigate("/activities/module-3?last=lesson-10")} className="h-24 flex-1 bg-white text-amber-600 hover:bg-emerald-50 text-3xl rounded-[2rem] shadow-2xl">
                    Yay! ✨
                  </Button>
                </div>
              </Card >
            )}


            {
              currentStep !== 'complete' && (
                <Button onClick={() => setShowGame(false)} variant="ghost" className="text-amber-400 hover:text-amber-600 w-full py-1 text-sm font-bold font-nunito">
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

export default Tally10;
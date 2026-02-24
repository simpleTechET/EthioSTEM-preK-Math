import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Bug } from "lucide-react";

const speakNumber = (num: number) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(num.toString());
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);
  }
};

const ArrayCount15 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [currentStep, setCurrentStep] = useState<'ant' | 'spider' | 'complete'>('ant');
  const [clickedCount, setClickedCount] = useState(0);

  const targetCount = currentStep === 'ant' ? 6 : 8;

  const markLessonComplete = () => {
    const saved = localStorage.getItem("ethio-stem-m3-completed");
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes("3-array-count-15")) {
      completed.push("3-array-count-15");
      localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
    }
  };

  const handleLegClick = (index: number) => {
    if (index === clickedCount && clickedCount < targetCount) {
      const next = clickedCount + 1;
      setClickedCount(next);
      speakNumber(next);
    }
  };

  useEffect(() => {
    if (clickedCount === targetCount && clickedCount > 0) {
      const timer = setTimeout(() => {
        if (currentStep === 'ant') {
          setCurrentStep('spider');
          setClickedCount(0);
        } else {
          markLessonComplete();
          setCurrentStep('complete');
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [clickedCount, targetCount, currentStep]);

  const resetActivity = () => {
    setShowGame(false);
    setCurrentStep('ant');
    setClickedCount(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 via-emerald-50 to-white p-3 font-fredoka overflow-x-hidden">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=3-array-count-15")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
            <ArrowLeft className="w-4 h-4 text-emerald-600" />
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full uppercase tracking-widest font-nunito">Lesson 15</span>
            <h1 className="text-lg font-bold text-emerald-900 uppercase">Bug Arrays!</h1>
          </div>
        </div>

        {!showGame ? (
          <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden text-center p-5 lg:p-8 space-y-4 animate-in fade-in zoom-in duration-700 relative">
            <div className="mx-auto w-14 h-14 bg-gradient-to-tr from-emerald-500 to-lime-500 rounded-2xl flex items-center justify-center rotate-3 shadow-lg">
              <Bug className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl lg:text-3xl text-emerald-900 leading-tight">Count the Legs!</h2>
            <p className="text-base lg:text-lg text-emerald-800 font-nunito leading-relaxed max-w-xl mx-auto">
              Insects and spiders have legs in arrays! Tap each leg to count them.
            </p>
            <Button onClick={() => setShowGame(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xl px-10 py-5 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 border-b-4 border-emerald-800">
              Play! 🕷️
            </Button>
            <p className="text-xs text-emerald-400 font-bold uppercase tracking-widest font-nunito">Topic C: How Many with 8 Objects</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {currentStep !== 'complete' && (
              <div className="flex justify-center gap-2 mb-1">
                {['ant', 'spider'].map((step, idx) => (
                  <div key={step} className={`h-2 rounded-full transition-all ${['ant', 'spider'].indexOf(currentStep) >= idx ? 'bg-emerald-500 w-10 shadow-sm' : 'bg-emerald-100 w-2'}`} />
                ))}
              </div>
            )}

            {currentStep !== 'complete' && (
              <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-2xl p-4 lg:p-6 text-center space-y-3 animate-in slide-in-from-bottom-8">
                <h3 className="text-lg lg:text-2xl text-emerald-700 uppercase tracking-wide">
                  {currentStep === 'ant' ? "Ansel Ant's Legs" : "Spencer Spider's Legs"}
                </h3>

                <div className="text-5xl lg:text-6xl animate-pulse">
                  {currentStep === 'ant' ? '🐜' : '🕷️'}
                </div>

                <div className="flex justify-center py-3 bg-lime-100/30 rounded-2xl border-4 border-white shadow-inner max-w-xl mx-auto items-center px-4">
                  <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                    {Array.from({ length: targetCount }).map((_, i) => {
                      const isClicked = i < clickedCount;
                      const isNext = i === clickedCount;
                      const color = currentStep === 'ant' ? 'bg-amber-800' : 'bg-zinc-800';
                      return (
                        <div key={i} onClick={() => handleLegClick(i)}
                          className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${isClicked ? '' : isNext ? 'animate-pulse hover:scale-110' : 'opacity-30'}`}>
                          <div className={`w-20 h-5 rounded-full border-2 border-white shadow-lg transition-all duration-300 ${isClicked ? `${color} ring-3 ring-yellow-300` : isNext ? `${color} opacity-60` : 'bg-gray-300'} ${i % 2 === 0 ? '-rotate-12' : 'rotate-12'}`} />
                          {isClicked && (
                            <span className="text-sm font-bold mt-1 text-emerald-900 font-fredoka drop-shadow-sm">{i + 1}</span>
                          )}
                          {isNext && !isClicked && (
                            <span className="text-[10px] font-bold mt-0.5 text-emerald-400 animate-pulse">Tap!</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-emerald-50 p-3 lg:p-4 rounded-2xl border-4 border-white shadow-inner max-w-lg mx-auto font-nunito">
                  <p className="text-lg lg:text-xl text-emerald-800">
                    {clickedCount === targetCount ? `${targetCount} legs! 🎉` : `Legs counted: ${clickedCount} / ${targetCount}`}
                  </p>
                  <p className="text-4xl lg:text-5xl font-fredoka text-emerald-600 mt-1 font-bold drop-shadow-sm">{clickedCount}</p>
                </div>
              </Card>
            )}

            {currentStep === 'complete' && (
              <Card className="bg-gradient-to-br from-emerald-600 via-lime-600 to-green-600 shadow-2xl rounded-2xl overflow-hidden p-6 lg:p-10 text-center text-white space-y-4 animate-in zoom-in-95 duration-700">
                <div className="text-6xl animate-bounce">🕸️</div>
                <h2 className="text-3xl lg:text-4xl drop-shadow-xl">Bug Expert!</h2>
                <p className="text-base lg:text-lg font-nunito max-w-xl mx-auto leading-relaxed">
                  You can count legs in arrays! A spider has 8 legs and an ant has 6.
                </p>
                <div className="flex gap-3 w-full pt-2">
                  <Button onClick={resetActivity} className="h-12 flex-1 bg-white/10 hover:bg-white/20 text-white text-lg rounded-2xl border-2 border-white/20">Again! 🔄</Button>
                  <Button onClick={() => navigate("/activities/module-3?last=3-array-count-15")} className="h-12 flex-1 bg-white text-emerald-600 hover:bg-emerald-50 text-lg rounded-2xl shadow-2xl">Yay! ✨</Button>
                </div>
              </Card>
            )}

            {currentStep !== 'complete' && (
              <Button onClick={() => setShowGame(false)} variant="ghost" className="text-emerald-400 hover:text-emerald-600 w-full py-1 text-sm font-bold font-nunito">← Back to Instructions</Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArrayCount15;
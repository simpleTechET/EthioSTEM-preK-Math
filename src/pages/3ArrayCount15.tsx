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
    <div className="min-h-screen bg-gradient-to-br from-lime-50 via-emerald-50 to-white p-4 font-fredoka overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=3-array-count-15")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
            <ArrowLeft className="w-5 h-5 text-emerald-600" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-widest font-nunito">
                Lesson 15
              </span>
              <h1 className="text-2xl font-bold text-emerald-900 uppercase">Bug Arrays!</h1>
            </div>
          </div>
        </div>

        {!showGame ? (
          <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] overflow-hidden text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700 relative">
            <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-emerald-500 to-lime-500 rounded-3xl flex items-center justify-center mb-6 rotate-3 shadow-lg">
              <Bug className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-5xl text-emerald-900 leading-tight">Count the Legs!</h2>
            <p className="text-2xl text-emerald-800 font-nunito leading-relaxed max-w-2xl mx-auto">
              Insects and spiders have legs in arrays!
              <br />
              Tap each leg to count them in order.
            </p>
            <Button
              onClick={() => setShowGame(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 border-b-8 border-emerald-800"
            >
              Play! 🕷️
            </Button>
            <p className="text-sm text-emerald-400 font-bold uppercase tracking-widest pt-4 font-nunito">Topic C: How Many with 8 Objects</p>
          </Card>
        ) : (
          <div className="space-y-6">
            {currentStep !== 'complete' && (
              <div className="flex justify-center gap-3 mb-4">
                {['ant', 'spider'].map((step, idx) => (
                  <div
                    key={step}
                    className={`h-3 rounded-full transition-all ${['ant', 'spider'].indexOf(currentStep) >= idx
                      ? 'bg-emerald-500 w-12 shadow-sm'
                      : 'bg-emerald-100 w-3'
                      }`}
                  />
                ))}
              </div>
            )}

            {currentStep !== 'complete' && (
              <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-bottom-8">
                <h3 className="text-4xl text-emerald-700 uppercase tracking-wide">
                  {currentStep === 'ant' ? "Ansel Ant's Legs" : "Spencer Spider's Legs"}
                </h3>

                <div className="text-9xl animate-pulse">
                  {currentStep === 'ant' ? '🐜' : '🕷️'}
                </div>

                <div className="flex flex-wrap justify-center gap-8 my-8 py-12 bg-lime-100/30 rounded-[4rem] border-8 border-white shadow-inner max-w-4xl mx-auto items-center px-12 overflow-hidden">
                  <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                    {Array.from({ length: targetCount }).map((_, i) => {
                      const isClicked = i < clickedCount;
                      const isNext = i === clickedCount;
                      const color = currentStep === 'ant' ? 'bg-amber-800' : 'bg-zinc-800';
                      return (
                        <div
                          key={i}
                          onClick={() => handleLegClick(i)}
                          className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${isClicked ? '' : isNext ? 'animate-pulse hover:scale-110' : 'opacity-30'}`}
                        >
                          <div className={`w-28 h-8 rounded-full border-4 border-white shadow-lg transition-all duration-300 ${isClicked ? `${color} ring-4 ring-yellow-300` : isNext ? `${color} opacity-60` : 'bg-gray-300'} ${i % 2 === 0 ? '-rotate-12' : 'rotate-12'}`} />
                          {isClicked && (
                            <span className="text-2xl font-bold mt-2 text-emerald-900 font-fredoka drop-shadow-sm">{i + 1}</span>
                          )}
                          {isNext && !isClicked && (
                            <span className="text-xs font-bold mt-1 text-emerald-400 animate-pulse">Tap!</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-emerald-50 p-8 rounded-[2.5rem] border-4 border-white shadow-inner max-w-2xl mx-auto font-nunito">
                  <p className="text-4xl text-emerald-800 leading-relaxed">
                    {clickedCount === targetCount ? `${targetCount} legs! 🎉` :
                      `Legs counted: ${clickedCount} / ${targetCount}`}
                  </p>
                  <p className="text-8xl font-fredoka text-emerald-600 mt-4 font-bold drop-shadow-sm">{clickedCount}</p>
                </div>
              </Card>
            )}

            {currentStep === 'complete' && (
              <Card className="bg-gradient-to-br from-emerald-600 via-lime-600 to-green-600 shadow-2xl rounded-[4rem] overflow-hidden p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                <div className="text-9xl animate-bounce">🕸️</div>
                <h2 className="text-7xl drop-shadow-xl">Bug Expert!</h2>
                <p className="text-3xl font-nunito max-w-2xl mx-auto leading-relaxed">
                  You can count legs in arrays!
                  <br />
                  You know that a spider has 8 legs and an ant has 6.
                </p>
                <div className="flex gap-4 w-full pt-8">
                  <Button onClick={resetActivity} className="h-24 flex-1 bg-white/10 hover:bg-white/20 text-white text-3xl rounded-[2rem] border-4 border-white/20">
                    Again! 🔄
                  </Button>
                  <Button onClick={() => navigate("/activities/module-3?last=3-array-count-15")} className="h-24 flex-1 bg-white text-emerald-600 hover:bg-emerald-50 text-3xl rounded-[2rem] shadow-2xl">
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

export default ArrayCount15;

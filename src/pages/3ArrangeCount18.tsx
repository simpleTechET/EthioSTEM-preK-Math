import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Flower2 } from "lucide-react";

const speakNumber = (num: number) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(num.toString());
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);
  }
};

const ArrangeCount18 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [currentStep, setCurrentStep] = useState<'line' | 'array' | 'circle' | 'complete'>('line');
  const [clickedCount, setClickedCount] = useState(0);

  const markLessonComplete = () => {
    const saved = localStorage.getItem("ethio-stem-m3-completed");
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes("3-arrange-count-18")) {
      completed.push("3-arrange-count-18");
      localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
    }
  };

  const handleItemClick = (index: number) => {
    if (index === clickedCount && clickedCount < 8) {
      const next = clickedCount + 1;
      setClickedCount(next);
      speakNumber(next);
    }
  };

  useEffect(() => {
    if (clickedCount === 8) {
      const timer = setTimeout(() => {
        if (currentStep === 'line') { setCurrentStep('array'); setClickedCount(0); }
        else if (currentStep === 'array') { setCurrentStep('circle'); setClickedCount(0); }
        else if (currentStep === 'circle') { markLessonComplete(); setCurrentStep('complete'); }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [clickedCount, currentStep]);

  const resetActivity = () => {
    setShowGame(false);
    setCurrentStep('line');
    setClickedCount(0);
  };

  const renderSeeds = (config: 'line' | 'array' | 'circle') => {
    const radius = 100;
    return (
      <div className="relative w-full max-w-xl mx-auto h-[400px] flex items-center justify-center bg-emerald-100/30 rounded-[4rem] border-8 border-white shadow-inner mb-8 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => {
          let x = 0, y = 0;
          if (config === 'line') { x = (i - 3.5) * 60; y = 0; }
          else if (config === 'array') { x = (i % 4 - 1.5) * 80; y = (Math.floor(i / 4) - 0.5) * 80; }
          else { const angle = (i * 360) / 8 - 90; x = Math.cos((angle * Math.PI) / 180) * radius; y = Math.sin((angle * Math.PI) / 180) * radius; }

          const isClicked = i < clickedCount;
          const isNext = i === clickedCount;

          return (
            <div key={i} onClick={() => handleItemClick(i)}
              className={`absolute flex flex-col items-center cursor-pointer transition-all duration-300 ${isClicked ? '' : isNext ? 'animate-pulse hover:scale-110' : 'opacity-30 grayscale'}`}
              style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`, transform: 'translate(-50%, -50%)' }}
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-3xl shadow-lg border-4 border-white bg-white ${isClicked ? 'ring-4 ring-yellow-300' : ''}`}>🌱</div>
              {isClicked && <span className="text-xl font-bold mt-1 text-emerald-900 font-fredoka">{i + 1}</span>}
              {isNext && !isClicked && <span className="text-xs font-bold mt-1 text-emerald-400 animate-pulse">Tap!</span>}
              {config === 'circle' && i === 0 && <div className="absolute -top-5 -right-1 text-2xl">🚩</div>}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-lime-50 to-white p-4 font-fredoka overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=3-arrange-count-18")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
            <ArrowLeft className="w-5 h-5 text-emerald-600" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-widest font-nunito">Lesson 18</span>
              <h1 className="text-2xl font-bold text-emerald-900 uppercase">Garden Magic!</h1>
            </div>
          </div>
        </div>

        {!showGame ? (
          <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] overflow-hidden text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700">
            <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-emerald-500 to-lime-500 rounded-3xl flex items-center justify-center mb-6 rotate-3 shadow-lg">
              <Flower2 className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-5xl text-emerald-900 leading-tight">Many Ways to 8!</h2>
            <p className="text-2xl text-emerald-800 font-nunito leading-relaxed max-w-2xl mx-auto">
              We're planting 8 seeds! Tap each one to count — in a line, an array, and a circle!
            </p>
            <Button onClick={() => setShowGame(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 border-b-8 border-emerald-800">Play! 🌱</Button>
          </Card>
        ) : (
          <div className="space-y-6">
            {currentStep !== 'complete' && (
              <>
                <div className="flex justify-center gap-3 mb-4">
                  {['line', 'array', 'circle'].map((step, idx) => (
                    <div key={step} className={`h-3 rounded-full transition-all ${['line', 'array', 'circle'].indexOf(currentStep) >= idx ? 'bg-emerald-500 w-12 shadow-sm' : 'bg-emerald-100 w-3'}`} />
                  ))}
                </div>
                <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-bottom-8">
                  <h3 className="text-4xl text-emerald-700 uppercase tracking-widest">
                    {currentStep === 'line' ? "Seed Line" : currentStep === 'array' ? "Seed Array" : "Seed Circle"}
                  </h3>
                  {renderSeeds(currentStep)}
                  <div className="bg-emerald-50 p-8 rounded-[2.5rem] border-4 border-white shadow-inner max-w-2xl mx-auto font-nunito">
                    <p className="text-4xl text-emerald-800 font-bold">{clickedCount === 8 ? "Still 8! 🎉" : `Counted: ${clickedCount} / 8`}</p>
                    <p className="text-8xl font-fredoka text-emerald-600 mt-4 font-bold drop-shadow-sm">{clickedCount}</p>
                  </div>
                </Card>
              </>
            )}

            {currentStep === 'complete' && (
              <Card className="bg-gradient-to-br from-emerald-600 via-lime-600 to-green-600 shadow-2xl rounded-[4rem] overflow-hidden p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                <div className="text-9xl animate-bounce">🌻</div>
                <h2 className="text-7xl drop-shadow-xl">Master Gardener!</h2>
                <p className="text-3xl font-nunito max-w-2xl mx-auto leading-relaxed">You know that 8 is still 8...<br />In a line, a row, or a circle. Amazing!</p>
                <div className="flex gap-4 w-full pt-8">
                  <Button onClick={resetActivity} className="h-24 flex-1 bg-white/10 hover:bg-white/20 text-white text-3xl rounded-[2rem] border-4 border-white/20">Again! 🔄</Button>
                  <Button onClick={() => navigate("/activities/module-3?last=3-arrange-count-18")} className="h-24 flex-1 bg-white text-emerald-600 hover:bg-emerald-50 text-3xl rounded-[2rem] shadow-2xl">Yay! ✨</Button>
                </div>
              </Card>
            )}

            {currentStep !== 'complete' && (
              <Button onClick={() => setShowGame(false)} variant="ghost" className="text-emerald-400 hover:text-emerald-600 w-full py-2 font-bold font-nunito">← Back to Instructions</Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArrangeCount18;

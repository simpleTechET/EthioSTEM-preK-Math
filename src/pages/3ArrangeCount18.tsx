import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Flower2 } from "lucide-react";

const speakNumber = (num: number) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(num.toString());
    utterance.rate = 0.8; utterance.pitch = 1.2;
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
    if (!completed.includes("3-arrange-count-18")) { completed.push("3-arrange-count-18"); localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed)); }
  };

  const handleItemClick = (index: number) => {
    if (index === clickedCount && clickedCount < 8) { const next = clickedCount + 1; setClickedCount(next); speakNumber(next); }
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

  const resetActivity = () => { setShowGame(false); setCurrentStep('line'); setClickedCount(0); };

  const renderSeeds = (config: 'line' | 'array' | 'circle') => {
    const radius = 80;
    return (
      <div className="relative w-full max-w-lg mx-auto h-[220px] lg:h-[260px] flex items-center justify-center bg-emerald-100/30 rounded-2xl border-4 border-white shadow-inner overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => {
          let x = 0, y = 0;
          if (config === 'line') { x = (i - 3.5) * 50; y = 0; }
          else if (config === 'array') { x = (i % 4 - 1.5) * 60; y = (Math.floor(i / 4) - 0.5) * 60; }
          else { const angle = (i * 360) / 8 - 90; x = Math.cos((angle * Math.PI) / 180) * radius; y = Math.sin((angle * Math.PI) / 180) * radius; }
          const isClicked = i < clickedCount;
          const isNext = i === clickedCount;
          return (
            <div key={i} onClick={() => handleItemClick(i)}
              className={`absolute flex flex-col items-center cursor-pointer transition-all duration-300 ${isClicked ? '' : isNext ? 'animate-pulse hover:scale-110' : 'opacity-30 grayscale'}`}
              style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`, transform: 'translate(-50%, -50%)' }}>
              <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center text-xl shadow-lg border-2 border-white bg-white ${isClicked ? 'ring-3 ring-yellow-300' : ''}`}>🌱</div>
              {isClicked && <span className="text-sm font-bold mt-0.5 text-emerald-900 font-fredoka">{i + 1}</span>}
              {isNext && !isClicked && <span className="text-[10px] font-bold mt-0.5 text-emerald-400 animate-pulse">Tap!</span>}
              {config === 'circle' && i === 0 && <div className="absolute -top-4 -right-1 text-lg">🚩</div>}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-lime-50 to-white p-3 font-fredoka overflow-x-hidden">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=3-arrange-count-18")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
            <ArrowLeft className="w-4 h-4 text-emerald-600" />
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full uppercase tracking-widest font-nunito">Lesson 18</span>
            <h1 className="text-lg font-bold text-emerald-900 uppercase">Garden Magic!</h1>
          </div>
        </div>

        {!showGame ? (
          <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden text-center p-5 lg:p-8 space-y-4 animate-in fade-in zoom-in duration-700">
            <div className="mx-auto w-14 h-14 bg-gradient-to-tr from-emerald-500 to-lime-500 rounded-2xl flex items-center justify-center rotate-3 shadow-lg">
              <Flower2 className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl lg:text-3xl text-emerald-900 leading-tight">Many Ways to 8!</h2>
            <p className="text-base lg:text-lg text-emerald-800 font-nunito leading-relaxed max-w-xl mx-auto">Tap each seed to count — in a line, an array, and a circle!</p>
            <Button onClick={() => setShowGame(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xl px-10 py-5 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 border-b-4 border-emerald-800">Play! 🌱</Button>
          </Card>
        ) : (
          <div className="space-y-3">
            {currentStep !== 'complete' && (
              <>
                <div className="flex justify-center gap-2 mb-1">
                  {['line', 'array', 'circle'].map((step, idx) => (
                    <div key={step} className={`h-2 rounded-full transition-all ${['line', 'array', 'circle'].indexOf(currentStep) >= idx ? 'bg-emerald-500 w-10 shadow-sm' : 'bg-emerald-100 w-2'}`} />
                  ))}
                </div>
                <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-2xl p-4 lg:p-6 text-center space-y-3 animate-in slide-in-from-bottom-8">
                  <h3 className="text-lg lg:text-2xl text-emerald-700 uppercase tracking-wider">
                    {currentStep === 'line' ? "Seed Line" : currentStep === 'array' ? "Seed Array" : "Seed Circle"}
                  </h3>
                  {renderSeeds(currentStep)}
                  <div className="bg-emerald-50 p-3 lg:p-4 rounded-2xl border-4 border-white shadow-inner max-w-lg mx-auto font-nunito">
                    <p className="text-lg lg:text-xl text-emerald-800 font-bold">{clickedCount === 8 ? "Still 8! 🎉" : `Counted: ${clickedCount} / 8`}</p>
                    <p className="text-4xl lg:text-5xl font-fredoka text-emerald-600 mt-1 font-bold drop-shadow-sm">{clickedCount}</p>
                  </div>
                </Card>
              </>
            )}

            {currentStep === 'complete' && (
              <Card className="bg-gradient-to-br from-emerald-600 via-lime-600 to-green-600 shadow-2xl rounded-2xl overflow-hidden p-6 lg:p-10 text-center text-white space-y-4 animate-in zoom-in-95 duration-700">
                <div className="text-6xl animate-bounce">🌻</div>
                <h2 className="text-3xl lg:text-4xl drop-shadow-xl">Master Gardener!</h2>
                <p className="text-base lg:text-lg font-nunito max-w-xl mx-auto leading-relaxed">8 is still 8 — in a line, a row, or a circle!</p>
                <div className="flex gap-3 w-full pt-2">
                  <Button onClick={resetActivity} className="h-12 flex-1 bg-white/10 hover:bg-white/20 text-white text-lg rounded-2xl border-2 border-white/20">Again! 🔄</Button>
                  <Button onClick={() => navigate("/activities/module-3?last=3-arrange-count-18")} className="h-12 flex-1 bg-white text-emerald-600 hover:bg-emerald-50 text-lg rounded-2xl shadow-2xl">Yay! ✨</Button>
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

export default ArrangeCount18;
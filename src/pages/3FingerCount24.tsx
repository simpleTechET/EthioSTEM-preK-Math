import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Bird } from "lucide-react";

const speakNumber = (num: number) => {
  if ("speechSynthesis" in window) { const u = new SpeechSynthesisUtterance(num.toString()); u.rate = 0.8; u.pitch = 1.2; window.speechSynthesis.speak(u); }
};

const FingerCount24 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [hatched, setHatched] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const markLessonComplete = () => {
    const saved = localStorage.getItem("ethio-stem-m3-completed");
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes("3-finger-count-24")) { completed.push("3-finger-count-24"); localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed)); }
  };

  const handleEggClick = (index: number) => {
    if (index === hatched && hatched < 9) { const next = hatched + 1; setHatched(next); speakNumber(next); }
  };

  useEffect(() => {
    if (hatched === 9) { const timer = setTimeout(() => { markLessonComplete(); setIsComplete(true); }, 1500); return () => clearTimeout(timer); }
  }, [hatched]);

  const resetActivity = () => { setShowGame(false); setHatched(0); setIsComplete(false); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-white p-3 font-fredoka overflow-x-hidden">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=3-finger-count-24")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
            <ArrowLeft className="w-4 h-4 text-orange-600" />
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full uppercase tracking-widest font-nunito">Lesson 24</span>
            <h1 className="text-lg font-bold text-orange-900 uppercase">Finger Chicks!</h1>
          </div>
        </div>

        {!showGame ? (
          <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden text-center p-5 lg:p-8 space-y-4 animate-in fade-in zoom-in duration-700">
            <div className="mx-auto w-14 h-14 bg-gradient-to-tr from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center rotate-3 shadow-lg">
              <Bird className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl lg:text-3xl text-orange-900 leading-tight">Hatch & Count!</h2>
            <p className="text-base lg:text-lg text-orange-800 font-nunito leading-relaxed max-w-xl mx-auto">Tap each egg to hatch 9 chicks! 5 on one hand and 4 on the other.</p>
            <Button onClick={() => setShowGame(true)} className="bg-orange-600 hover:bg-orange-700 text-white text-xl px-10 py-5 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 border-b-4 border-orange-800">Start! 🐣</Button>
          </Card>
        ) : (
          <div className="space-y-3">
            {!isComplete && (
              <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-2xl p-4 lg:p-6 text-center space-y-3 animate-in slide-in-from-bottom-8">
                <h3 className="text-lg lg:text-2xl text-orange-700 uppercase tracking-wider">{hatched < 5 ? "Hatch 5 Chicks!" : "Hatch 4 More!"}</h3>
                <div className="flex justify-center gap-4 lg:gap-6 py-3 bg-orange-100/30 rounded-2xl border-4 border-white shadow-inner items-end px-4 relative overflow-hidden">
                  <div className={`flex gap-1 p-3 bg-white/50 rounded-2xl border-2 border-white shadow-lg relative ${hatched >= 5 ? 'opacity-50 scale-90' : ''} transition-all`}>
                    <div className="absolute -top-5 left-2 text-[10px] font-bold text-orange-600 uppercase">Nest 1 (5)</div>
                    {Array.from({ length: 5 }).map((_, i) => {
                      const isHatched = i < hatched;
                      const isNext = i === hatched && hatched < 5;
                      return (
                        <div key={i} onClick={() => handleEggClick(i)} className={`relative w-10 h-14 lg:w-11 lg:h-16 rounded-t-full border-2 border-white shadow-lg flex items-center justify-center text-xl transition-all cursor-pointer ${isHatched ? 'bg-yellow-400 -translate-y-2' : isNext ? 'bg-stone-300 animate-pulse hover:scale-110' : 'bg-stone-300 opacity-40'}`}>
                          {isHatched ? '🐤' : isNext ? '👆' : '🥚'}
                          {isHatched && <span className="absolute -bottom-4 text-xs font-bold text-orange-800">{i + 1}</span>}
                        </div>
                      );
                    })}
                  </div>
                  <div className={`flex gap-1 p-3 bg-white/50 rounded-2xl border-2 border-white shadow-lg relative ${hatched < 5 ? 'opacity-50 scale-90' : ''} transition-all`}>
                    <div className="absolute -top-5 left-2 text-[10px] font-bold text-red-600 uppercase">Nest 2 (4)</div>
                    {Array.from({ length: 4 }).map((_, i) => {
                      const idx = i + 5;
                      const isHatched = idx < hatched;
                      const isNext = idx === hatched && hatched >= 5;
                      return (
                        <div key={idx} onClick={() => handleEggClick(idx)} className={`relative w-10 h-14 lg:w-11 lg:h-16 rounded-t-full border-2 border-white shadow-lg flex items-center justify-center text-xl transition-all cursor-pointer ${isHatched ? 'bg-yellow-400 -translate-y-2' : isNext ? 'bg-stone-300 animate-pulse hover:scale-110' : 'bg-stone-300 opacity-40'}`}>
                          {isHatched ? '🐤' : isNext ? '👆' : '🥚'}
                          {isHatched && <span className="absolute -bottom-4 text-xs font-bold text-orange-800">{idx + 1}</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="bg-orange-50 p-3 lg:p-4 rounded-2xl border-4 border-white shadow-inner max-w-lg mx-auto font-nunito">
                  <p className="text-lg lg:text-xl text-orange-800 font-bold">{hatched === 9 ? "9 Chicks! 🎉" : `Hatched: ${hatched}`}</p>
                  <p className="text-4xl lg:text-5xl font-fredoka text-orange-600 mt-1 font-bold drop-shadow-sm">{hatched}</p>
                </div>
              </Card>
            )}

            {isComplete && (
              <Card className="bg-gradient-to-br from-orange-600 via-yellow-600 to-red-600 shadow-2xl rounded-2xl overflow-hidden p-6 lg:p-10 text-center text-white space-y-4 animate-in zoom-in-95 duration-700">
                <div className="text-5xl lg:text-6xl font-black animate-bounce leading-none">9</div>
                <h2 className="text-3xl lg:text-4xl drop-shadow-xl">Chicken Master!</h2>
                <p className="text-base lg:text-lg font-nunito max-w-xl mx-auto leading-relaxed">5 on one hand and 4 on the other makes 9!</p>
                <div className="flex gap-3 w-full pt-2">
                  <Button onClick={resetActivity} className="h-12 flex-1 bg-white/10 hover:bg-white/20 text-white text-lg rounded-2xl border-2 border-white/20">Again! 🔄</Button>
                  <Button onClick={() => navigate("/activities/module-3?last=3-finger-count-24")} className="h-12 flex-1 bg-white text-orange-600 hover:bg-rose-50 text-lg rounded-2xl shadow-2xl">Yay! ✨</Button>
                </div>
              </Card>
            )}

            {!isComplete && (
              <Button onClick={() => setShowGame(false)} variant="ghost" className="text-orange-400 hover:text-orange-600 w-full py-1 text-sm font-bold font-nunito">← Back to Instructions</Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FingerCount24;
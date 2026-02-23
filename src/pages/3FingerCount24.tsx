import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Bird } from "lucide-react";

const speakNumber = (num: number) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(num.toString());
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);
  }
};

const FingerCount24 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [hatched, setHatched] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const markLessonComplete = () => {
    const saved = localStorage.getItem("ethio-stem-m3-completed");
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes("3-finger-count-24")) {
      completed.push("3-finger-count-24");
      localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
    }
  };

  const handleEggClick = (index: number) => {
    if (index === hatched && hatched < 9) {
      const next = hatched + 1;
      setHatched(next);
      speakNumber(next);
    }
  };

  useEffect(() => {
    if (hatched === 9) {
      const timer = setTimeout(() => { markLessonComplete(); setIsComplete(true); }, 1500);
      return () => clearTimeout(timer);
    }
  }, [hatched]);

  const resetActivity = () => { setShowGame(false); setHatched(0); setIsComplete(false); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-white p-4 font-fredoka overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=3-finger-count-24")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
            <ArrowLeft className="w-5 h-5 text-orange-600" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full uppercase tracking-widest font-nunito">Lesson 24</span>
              <h1 className="text-2xl font-bold text-orange-900 uppercase">Finger Chicks!</h1>
            </div>
          </div>
        </div>

        {!showGame ? (
          <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] overflow-hidden text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700">
            <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-orange-500 to-yellow-500 rounded-3xl flex items-center justify-center mb-6 rotate-3 shadow-lg">
              <Bird className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-5xl text-orange-900 leading-tight">Hatch & Count!</h2>
            <p className="text-2xl text-orange-800 font-nunito leading-relaxed max-w-2xl mx-auto">Tap each egg to hatch 9 chicks!<br />5 on one hand and 4 on the other.</p>
            <Button onClick={() => setShowGame(true)} className="bg-orange-600 hover:bg-orange-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 border-b-8 border-orange-800">Start! 🐣</Button>
          </Card>
        ) : (
          <div className="space-y-6">
            {!isComplete && (
              <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-bottom-8">
                <h3 className="text-4xl text-orange-700 uppercase tracking-widest">{hatched < 5 ? "Hatch 5 Chicks!" : "Hatch 4 More!"}</h3>
                <div className="flex justify-center gap-12 py-12 bg-orange-100/30 rounded-[3rem] border-8 border-white shadow-inner min-h-[350px] items-end px-8 relative overflow-hidden">
                  <div className={`flex gap-2 p-6 bg-white/50 rounded-3xl border-4 border-white shadow-lg relative ${hatched >= 5 ? 'opacity-50 scale-90' : 'scale-105'} transition-all`}>
                    <div className="absolute -top-8 left-4 text-xs font-bold text-orange-600 uppercase">Nest 1 (5)</div>
                    {Array.from({ length: 5 }).map((_, i) => {
                      const isHatched = i < hatched;
                      const isNext = i === hatched && hatched < 5;
                      return (
                        <div key={i} onClick={() => handleEggClick(i)} className={`w-14 h-20 rounded-t-full border-4 border-white shadow-lg flex items-center justify-center text-3xl transition-all cursor-pointer ${isHatched ? 'bg-yellow-400 -translate-y-4' : isNext ? 'bg-stone-300 animate-pulse hover:scale-110' : 'bg-stone-300 opacity-40'}`}>
                          {isHatched ? '🐤' : isNext ? '👆' : '🥚'}
                          {isHatched && <span className="absolute -bottom-6 text-lg font-bold text-orange-800">{i + 1}</span>}
                        </div>
                      );
                    })}
                  </div>
                  <div className={`flex gap-2 p-6 bg-white/50 rounded-3xl border-4 border-white shadow-lg relative ${hatched < 5 ? 'opacity-50 scale-90' : 'scale-105'} transition-all`}>
                    <div className="absolute -top-8 left-4 text-xs font-bold text-red-600 uppercase">Nest 2 (4)</div>
                    {Array.from({ length: 4 }).map((_, i) => {
                      const idx = i + 5;
                      const isHatched = idx < hatched;
                      const isNext = idx === hatched && hatched >= 5;
                      return (
                        <div key={idx} onClick={() => handleEggClick(idx)} className={`w-14 h-20 rounded-t-full border-4 border-white shadow-lg flex items-center justify-center text-3xl transition-all cursor-pointer ${isHatched ? 'bg-yellow-400 -translate-y-4' : isNext ? 'bg-stone-300 animate-pulse hover:scale-110' : 'bg-stone-300 opacity-40'}`}>
                          {isHatched ? '🐤' : isNext ? '👆' : '🥚'}
                          {isHatched && <span className="absolute -bottom-6 text-lg font-bold text-orange-800">{idx + 1}</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="bg-orange-50 p-8 rounded-[2.5rem] border-4 border-white shadow-inner max-w-2xl mx-auto font-nunito">
                  <p className="text-4xl text-orange-800 font-bold">{hatched === 9 ? "9 Chicks! 🎉" : `Hatched: ${hatched}`}</p>
                  <p className="text-8xl font-fredoka text-orange-600 mt-4 font-bold drop-shadow-sm">{hatched}</p>
                </div>
              </Card>
            )}

            {isComplete && (
              <Card className="bg-gradient-to-br from-orange-600 via-yellow-600 to-red-600 shadow-2xl rounded-[4rem] overflow-hidden p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                <div className="text-[12rem] font-black animate-bounce leading-none">9</div>
                <h2 className="text-7xl drop-shadow-xl">Chicken Master!</h2>
                <p className="text-3xl font-nunito max-w-2xl mx-auto leading-relaxed">5 on one hand and 4 on the other makes 9!<br />You're a counting pro!</p>
                <div className="flex gap-4 w-full pt-8">
                  <Button onClick={resetActivity} className="h-24 flex-1 bg-white/10 hover:bg-white/20 text-white text-3xl rounded-[2rem] border-4 border-white/20">Again! 🔄</Button>
                  <Button onClick={() => navigate("/activities/module-3?last=3-finger-count-24")} className="h-24 flex-1 bg-white text-orange-600 hover:bg-rose-50 text-3xl rounded-[2rem] shadow-2xl">Yay! ✨</Button>
                </div>
              </Card>
            )}

            {!isComplete && (
              <Button onClick={() => setShowGame(false)} variant="ghost" className="text-orange-400 hover:text-orange-600 w-full py-2 font-bold font-nunito">← Back to Instructions</Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FingerCount24;

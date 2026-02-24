import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, BookOpen } from "lucide-react";

const speakNumber = (num: number) => {
  if ("speechSynthesis" in window) { const u = new SpeechSynthesisUtterance(num.toString()); u.rate = 0.8; u.pitch = 1.2; window.speechSynthesis.speak(u); }
};

const ArrayCount25 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [placed, setPlaced] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const animals = [
    { emoji: '🐭', color: 'bg-stone-200' }, { emoji: '🐭', color: 'bg-stone-200' }, { emoji: '🐭', color: 'bg-stone-200' },
    { emoji: '🐷', color: 'bg-pink-100' }, { emoji: '🐷', color: 'bg-pink-100' }, { emoji: '🐷', color: 'bg-pink-100' },
    { emoji: '🐱', color: 'bg-orange-100' }, { emoji: '🐱', color: 'bg-orange-100' }, { emoji: '🐱', color: 'bg-orange-100' },
  ];

  const markLessonComplete = () => {
    const saved = localStorage.getItem("ethio-stem-m3-completed");
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes("3-array-count-25")) { completed.push("3-array-count-25"); localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed)); }
  };

  const handleSlotClick = (index: number) => {
    if (index === placed && placed < 9) { const next = placed + 1; setPlaced(next); speakNumber(next); }
  };

  useEffect(() => {
    if (placed === 9) { const timer = setTimeout(() => { markLessonComplete(); setIsComplete(true); }, 1500); return () => clearTimeout(timer); }
  }, [placed]);

  const resetActivity = () => { setShowGame(false); setPlaced(0); setIsComplete(false); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-violet-50 to-white p-3 font-fredoka overflow-x-hidden">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=3-array-count-25")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
            <ArrowLeft className="w-4 h-4 text-indigo-600" />
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full uppercase tracking-widest font-nunito">Lesson 25</span>
            <h1 className="text-lg font-bold text-indigo-900 uppercase">Storybook Array!</h1>
          </div>
        </div>

        {!showGame ? (
          <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden text-center p-5 lg:p-8 space-y-4 animate-in fade-in zoom-in duration-700">
            <div className="mx-auto w-14 h-14 bg-gradient-to-tr from-indigo-500 to-violet-500 rounded-2xl flex items-center justify-center rotate-3 shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl lg:text-3xl text-indigo-900 leading-tight">Story Square!</h2>
            <p className="text-base lg:text-lg text-indigo-800 font-nunito leading-relaxed max-w-xl mx-auto">Tap each spot to invite animals to the party! We'll make a 3×3 array of 9.</p>
            <Button onClick={() => setShowGame(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white text-xl px-10 py-5 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 border-b-4 border-indigo-800">Open Book! 📖</Button>
          </Card>
        ) : (
          <div className="space-y-3">
            {!isComplete && (
              <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-2xl p-4 lg:p-6 text-center space-y-3 animate-in slide-in-from-bottom-8">
                <h3 className="text-lg lg:text-2xl text-indigo-700 uppercase tracking-wider">Tap to fill the 3×3 grid!</h3>
                <div className="flex justify-center items-center py-3 bg-indigo-100/30 rounded-2xl border-4 border-white shadow-inner">
                  <div className="grid grid-cols-3 gap-2 lg:gap-3">
                    {Array.from({ length: 9 }).map((_, i) => {
                      const isPlaced = i < placed;
                      const isNext = i === placed;
                      return (
                        <div key={i} onClick={() => handleSlotClick(i)}
                          className={`relative w-14 h-14 lg:w-16 lg:h-16 rounded-xl border-2 border-white shadow-xl flex items-center justify-center text-2xl transition-all cursor-pointer ${isPlaced ? `${animals[i].color} ring-3 ring-yellow-300` : isNext ? 'bg-white/80 animate-pulse hover:scale-110 border-dashed border-indigo-300' : 'bg-white/50 opacity-40 border-dashed border-indigo-200'}`}>
                          {isPlaced ? animals[i].emoji : isNext ? '👆' : ''}
                          {isPlaced && <span className="absolute -bottom-0.5 -right-0.5 bg-indigo-500 text-white w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold border border-white">{i + 1}</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="bg-indigo-50 p-3 lg:p-4 rounded-2xl border-4 border-white shadow-inner max-w-lg mx-auto font-nunito">
                  <p className="text-lg lg:text-xl text-indigo-800 font-bold">{placed === 9 ? "All 9 friends! 🎉" : `Invited: ${placed} / 9`}</p>
                  <p className="text-4xl lg:text-5xl font-fredoka text-indigo-600 mt-1 font-bold drop-shadow-sm">{placed}</p>
                </div>
              </Card>
            )}

            {isComplete && (
              <Card className="bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-600 shadow-2xl rounded-2xl overflow-hidden p-6 lg:p-10 text-center text-white space-y-4 animate-in zoom-in-95 duration-700">
                <div className="text-6xl animate-bounce">🎆</div>
                <h2 className="text-3xl lg:text-4xl drop-shadow-xl">Array Expert!</h2>
                <p className="text-base lg:text-lg font-nunito max-w-xl mx-auto leading-relaxed">You made a perfect square of 9! 3 rows × 3 columns.</p>
                <div className="flex gap-3 w-full pt-2">
                  <Button onClick={resetActivity} className="h-12 flex-1 bg-white/10 hover:bg-white/20 text-white text-lg rounded-2xl border-2 border-white/20">Again! 🔄</Button>
                  <Button onClick={() => navigate("/activities/module-3?last=3-array-count-25")} className="h-12 flex-1 bg-white text-indigo-600 hover:bg-rose-50 text-lg rounded-2xl shadow-2xl">Yay! ✨</Button>
                </div>
              </Card>
            )}

            {!isComplete && (
              <Button onClick={() => setShowGame(false)} variant="ghost" className="text-indigo-400 hover:text-indigo-600 w-full py-1 text-sm font-bold font-nunito">← Back to Instructions</Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArrayCount25;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Utensils } from "lucide-react";

const speakNumber = (num: number) => {
  if ("speechSynthesis" in window) { const u = new SpeechSynthesisUtterance(num.toString()); u.rate = 0.8; u.pitch = 1.2; window.speechSynthesis.speak(u); }
};

const CountOut20 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [flowers, setFlowers] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const markLessonComplete = () => {
    const saved = localStorage.getItem("ethio-stem-m3-completed");
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes("3-count-out-20")) { completed.push("3-count-out-20"); localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed)); }
  };

  const handleSlotClick = (index: number) => {
    if (index === flowers && flowers < 8) { const next = flowers + 1; setFlowers(next); speakNumber(next); }
  };

  useEffect(() => {
    if (flowers === 8) { const timer = setTimeout(() => { markLessonComplete(); setIsComplete(true); }, 1500); return () => clearTimeout(timer); }
  }, [flowers]);

  const resetActivity = () => { setShowGame(false); setFlowers(0); setIsComplete(false); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-white p-3 font-fredoka overflow-x-hidden">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=3-count-out-20")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
            <ArrowLeft className="w-4 h-4 text-rose-600" />
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-rose-600 bg-rose-100 px-2 py-0.5 rounded-full uppercase tracking-widest font-nunito">Lesson 20</span>
            <h1 className="text-lg font-bold text-rose-900 uppercase">Chef's Special!</h1>
          </div>
        </div>

        {!showGame ? (
          <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden text-center p-5 lg:p-8 space-y-4 animate-in fade-in zoom-in duration-700">
            <div className="mx-auto w-14 h-14 bg-gradient-to-tr from-rose-500 to-pink-500 rounded-2xl flex items-center justify-center rotate-3 shadow-lg">
              <Utensils className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl lg:text-3xl text-rose-900 leading-tight">Count to 8!</h2>
            <p className="text-base lg:text-lg text-rose-800 font-nunito leading-relaxed max-w-xl mx-auto">Tap each spot on the tray to place a flower!</p>
            <Button onClick={() => setShowGame(true)} className="bg-rose-600 hover:bg-rose-700 text-white text-xl px-10 py-5 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 border-b-4 border-rose-800">Start Cooking! 👨‍🍳</Button>
          </Card>
        ) : (
          <div className="space-y-3">
            {!isComplete && (
              <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-2xl p-4 lg:p-6 text-center space-y-3 animate-in slide-in-from-bottom-8">
                <h3 className="text-lg lg:text-2xl text-rose-700 uppercase tracking-wider">Tap each spot!</h3>
                <div className="grid grid-cols-4 gap-2 p-3 bg-stone-100 rounded-2xl border-4 border-white shadow-inner items-center relative">
                  <div className="absolute top-1 right-3 text-[10px] font-bold text-stone-400 uppercase tracking-widest">Bee Tray</div>
                  {Array.from({ length: 8 }).map((_, i) => {
                    const isPlaced = i < flowers;
                    const isNext = i === flowers;
                    return (
                      <div key={i} onClick={() => handleSlotClick(i)}
                        className={`w-14 h-14 lg:w-16 lg:h-16 rounded-xl border-2 border-white shadow-lg flex items-center justify-center text-2xl transition-all cursor-pointer relative ${isPlaced ? 'bg-pink-400 ring-3 ring-yellow-300' : isNext ? 'bg-white/80 animate-pulse hover:scale-110 border-dashed border-rose-300' : 'bg-white/50 opacity-40 border-dashed border-stone-300'}`}>
                        {isPlaced ? '🌸' : isNext ? '👆' : ''}
                        {isPlaced && <span className="absolute -bottom-0.5 -right-0.5 bg-rose-500 text-white w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold border border-white">{i + 1}</span>}
                      </div>
                    );
                  })}
                </div>
                <div className="bg-rose-50 p-3 lg:p-4 rounded-2xl border-4 border-white shadow-inner max-w-lg mx-auto font-nunito">
                  <p className="text-lg lg:text-xl text-rose-800 font-bold">{flowers === 8 ? "8 flowers served! 🎉" : `Flowers: ${flowers} / 8`}</p>
                  <p className="text-4xl lg:text-5xl font-fredoka text-rose-600 font-bold drop-shadow-sm">{flowers}</p>
                </div>
              </Card>
            )}

            {isComplete && (
              <Card className="bg-gradient-to-br from-rose-600 via-pink-600 to-orange-600 shadow-2xl rounded-2xl overflow-hidden p-6 lg:p-10 text-center text-white space-y-4 animate-in zoom-in-95 duration-700">
                <div className="text-6xl animate-bounce">🍴</div>
                <h2 className="text-3xl lg:text-4xl drop-shadow-xl">Five Star Chef!</h2>
                <p className="text-base lg:text-lg font-nunito max-w-xl mx-auto leading-relaxed">You served exactly 8 flowers! The bees are so happy.</p>
                <div className="flex gap-3 w-full pt-2">
                  <Button onClick={resetActivity} className="h-12 flex-1 bg-white/10 hover:bg-white/20 text-white text-lg rounded-2xl border-2 border-white/20">Again! 🔄</Button>
                  <Button onClick={() => navigate("/activities/module-3?last=3-count-out-20")} className="h-12 flex-1 bg-white text-rose-600 hover:bg-rose-50 text-lg rounded-2xl shadow-2xl">Yay! ✨</Button>
                </div>
              </Card>
            )}

            {!isComplete && (
              <Button onClick={() => setShowGame(false)} variant="ghost" className="text-rose-400 hover:text-rose-600 w-full py-1 text-sm font-bold font-nunito">← Back to Instructions</Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CountOut20;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Flag } from "lucide-react";

const speakNumber = (num: number) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(num.toString());
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);
  }
};

const CircularCount17 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [clickedCount, setClickedCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const markLessonComplete = () => {
    const saved = localStorage.getItem("ethio-stem-m3-completed");
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes("3-circular-count-17")) {
      completed.push("3-circular-count-17");
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
        markLessonComplete();
        setIsComplete(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [clickedCount]);

  const resetActivity = () => {
    setShowGame(false);
    setClickedCount(0);
    setIsComplete(false);
  };

  const radius = 120;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-white p-4 font-fredoka overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=3-circular-count-17")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
            <ArrowLeft className="w-5 h-5 text-orange-600" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full uppercase tracking-widest font-nunito">Lesson 17</span>
              <h1 className="text-2xl font-bold text-orange-900 uppercase">Apple Ring!</h1>
            </div>
          </div>
        </div>

        {!showGame ? (
          <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] overflow-hidden text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700 relative">
            <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-orange-500 to-amber-500 rounded-3xl flex items-center justify-center mb-6 rotate-3 shadow-lg">
              <span className="text-5xl text-white">🍎</span>
            </div>
            <h2 className="text-5xl text-orange-900 leading-tight">Count in a Circle!</h2>
            <p className="text-2xl text-orange-800 font-nunito leading-relaxed max-w-2xl mx-auto">
              When things are in a circle, start at the flag!
              <br />
              Tap each apple to count all 8.
            </p>
            <Button onClick={() => setShowGame(true)} className="bg-orange-600 hover:bg-orange-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 border-b-8 border-orange-800">
              Play! 🚩
            </Button>
            <p className="text-sm text-orange-400 font-bold uppercase tracking-widest pt-4 font-nunito">Topic D: Matching Numerals to 8</p>
          </Card>
        ) : (
          <div className="space-y-6">
            {!isComplete && (
              <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-bottom-8">
                <h3 className="text-4xl text-orange-700 uppercase tracking-widest">Tap from the flag! 🚩</h3>

                <div className="relative w-full max-w-md mx-auto h-[400px] flex items-center justify-center bg-orange-100/30 rounded-[4rem] border-8 border-white shadow-inner mb-8 overflow-hidden">
                  <div className="absolute w-64 h-64 border-8 border-white/50 rounded-full bg-white/20 shadow-xl" />
                  {Array.from({ length: 8 }).map((_, i) => {
                    const angle = (i * 360) / 8 - 90;
                    const x = Math.cos((angle * Math.PI) / 180) * radius;
                    const y = Math.sin((angle * Math.PI) / 180) * radius;
                    const isClicked = i < clickedCount;
                    const isNext = i === clickedCount;
                    return (
                      <button key={i} onClick={() => handleItemClick(i)}
                        className={`absolute flex flex-col items-center transition-all duration-500 ${isNext ? 'hover:scale-125 cursor-pointer animate-pulse' : isClicked ? '' : 'opacity-40 grayscale cursor-default'}`}
                        style={{ left: `calc(50% + ${x * 1.3}px)`, top: `calc(50% + ${y * 1.3}px)`, transform: 'translate(-50%, -50%)' }}
                        disabled={!isNext}
                      >
                        <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-4xl shadow-lg border-4 border-white bg-white transition-all ${isClicked ? 'ring-4 ring-yellow-300' : ''}`}>
                          🍎
                        </div>
                        {i === 0 && <div className="absolute -top-6 -right-2 text-3xl">🚩</div>}
                        {isClicked && (
                          <span className="absolute -bottom-2 bg-emerald-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl border-2 border-white shadow-lg animate-in zoom-in">{i + 1}</span>
                        )}
                        {isNext && !isClicked && <span className="text-xs font-bold mt-1 text-orange-400">Tap!</span>}
                      </button>
                    );
                  })}
                </div>

                <div className="bg-orange-50 p-8 rounded-[2.5rem] border-4 border-white shadow-inner max-w-2xl mx-auto font-nunito">
                  <p className="text-4xl text-orange-800 leading-relaxed font-bold">
                    {clickedCount === 0 ? "Start at the flag!" : clickedCount === 8 ? "All 8 apples! 🎉" : `Counted: ${clickedCount} / 8`}
                  </p>
                  <p className="text-8xl font-fredoka text-orange-600 mt-4 font-bold drop-shadow-sm">{clickedCount}</p>
                </div>
              </Card>
            )}

            {isComplete && (
              <Card className="bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-600 shadow-2xl rounded-[4rem] overflow-hidden p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                <div className="text-9xl animate-bounce">🍎</div>
                <h2 className="text-7xl drop-shadow-xl">Circle Boss!</h2>
                <p className="text-3xl font-nunito max-w-2xl mx-auto leading-relaxed">You can count in a circle like a pro!<br />You know how to use a flag to count to 8!</p>
                <div className="flex gap-4 w-full pt-8">
                  <Button onClick={resetActivity} className="h-24 flex-1 bg-white/10 hover:bg-white/20 text-white text-3xl rounded-[2rem] border-4 border-white/20">Again! 🔄</Button>
                  <Button onClick={() => navigate("/activities/module-3?last=3-circular-count-17")} className="h-24 flex-1 bg-white text-orange-600 hover:bg-orange-50 text-3xl rounded-[2rem] shadow-2xl">Yay! ✨</Button>
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

export default CircularCount17;

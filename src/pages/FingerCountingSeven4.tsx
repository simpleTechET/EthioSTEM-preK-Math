import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Hand } from "lucide-react";

const FingerCountingSeven4 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [count, setCount] = useState(0);
  const [justAdded, setJustAdded] = useState(false);

  const markLessonComplete = () => {
    const saved = localStorage.getItem("ethio-stem-m3-completed");
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes("3-finger-counting-7-lesson-4")) {
      completed.push("3-finger-counting-7-lesson-4");
      localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
    }
  };

  const hatchOne = () => {
    if (count < 7) {
      setJustAdded(true);
      setCount((c) => c + 1);
      setTimeout(() => setJustAdded(false), 1200);
    }
    if (count === 6) {
      markLessonComplete();
    }
  };

  const resetActivity = () => {
    setShowGame(false);
    setCount(0);
    setJustAdded(false);
  };

  const isComplete = count >= 7;

  const renderHands = () => {
    const leftCount = Math.min(count, 5);
    const rightCount = Math.max(0, count - 5);

    return (
      <div className="flex justify-center gap-8 md:gap-16 my-4">
        {/* Left hand */}
        <div className="flex flex-col items-center">
          <p className="text-sm font-bold text-green-500 uppercase tracking-widest mb-3 font-fredoka">Left Hand</p>
          <div className="flex gap-1.5 items-end h-36">
            {[0, 1, 2, 3, 4].map((i) => {
              const isUp = i < leftCount;
              const isNew = justAdded && i === count - 1 && count <= 5;
              return (
                <div key={i} className={`relative w-10 rounded-t-full transition-all duration-500 origin-bottom border-2 border-white shadow-sm flex flex-col items-center justify-start pt-1
                  ${isUp ? (isNew ? 'h-28 bg-yellow-400 ring-4 ring-yellow-300 ring-offset-1 scale-110' : 'h-28 bg-emerald-400') : 'h-10 bg-gray-200 opacity-40'}`}>
                  {isUp && <span className={`text-xl ${isNew ? 'animate-bounce' : ''}`}>🐥</span>}
                </div>
              );
            })}
          </div>
          <div className="flex gap-1.5 mt-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} className={`w-10 text-center text-lg font-bold font-fredoka transition-all ${i < leftCount ? (justAdded && i === count - 1 && count <= 5 ? 'text-yellow-600 scale-125' : 'text-emerald-700') : 'text-gray-300'}`}>
                {i < leftCount ? i + 1 : ''}
              </span>
            ))}
          </div>
        </div>

        {/* Right hand */}
        <div className="flex flex-col items-center">
          <p className="text-sm font-bold text-green-500 uppercase tracking-widest mb-3 font-fredoka">Right Hand</p>
          <div className="flex gap-1.5 items-end h-36">
            {[0, 1, 2, 3, 4].map((i) => {
              const isUp = i < rightCount;
              const isNew = justAdded && count > 5 && i === count - 6;
              return (
                <div key={i} className={`relative w-10 rounded-t-full transition-all duration-500 origin-bottom border-2 border-white shadow-sm flex flex-col items-center justify-start pt-1
                  ${isUp ? (isNew ? 'h-28 bg-yellow-400 ring-4 ring-yellow-300 ring-offset-1 scale-110' : 'h-28 bg-emerald-400') : 'h-10 bg-gray-200 opacity-40'}`}>
                  {isUp && <span className={`text-xl ${isNew ? 'animate-bounce' : ''}`}>🐥</span>}
                </div>
              );
            })}
          </div>
          <div className="flex gap-1.5 mt-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} className={`w-10 text-center text-lg font-bold font-fredoka transition-all ${i < rightCount ? (justAdded && count > 5 && i === count - 6 ? 'text-yellow-600 scale-125' : 'text-emerald-700') : 'text-gray-300'}`}>
                {i < rightCount ? 5 + i + 1 : ''}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-white p-4 font-nunito overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <span className="text-sm font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full font-fredoka">Lesson 4</span>
            <h1 className="text-2xl font-bold text-foreground font-fredoka uppercase tracking-wide mt-1">Count to 7!</h1>
          </div>
        </div>

        {!showGame ? (
          <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700">
            <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-emerald-500 to-green-500 rounded-3xl flex items-center justify-center rotate-3 shadow-lg">
              <Hand className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl font-fredoka text-emerald-900">All 7 Chicks!</h2>
            <p className="text-2xl text-emerald-800 font-nunito leading-relaxed max-w-xl mx-auto">
              Last time we hatched 6. Now let's go to <strong>7</strong>! 🐥
              <br />That means <strong>2 chicks</strong> on the right hand!
            </p>
            <div className="space-y-3">
              <p className="text-lg font-bold text-emerald-500">🎯 Learning Goal</p>
              <p className="text-base text-emerald-600">Count to <strong>7</strong> on your fingers using the Math Way (left to right).</p>
            </div>
            <Button onClick={() => setShowGame(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl font-fredoka border-b-8 border-emerald-800 transition-all hover:scale-105 active:scale-95">
              Start Hatching! 🐥
            </Button>
          </Card>
        ) : isComplete ? (
          <Card className="bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 shadow-2xl rounded-[4rem] p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
            <div className="text-9xl animate-bounce">🐥</div>
            <h2 className="text-6xl font-fredoka drop-shadow-xl">Super Counter!</h2>
            <p className="text-2xl font-nunito max-w-2xl mx-auto leading-relaxed">
              You counted to <span className="font-fredoka text-5xl text-yellow-300">7</span> on your fingers!
              <br />5 on the left hand, 2 on the right!
            </p>
            <div className="flex gap-4 w-full pt-8">
              <Button onClick={resetActivity} className="h-20 flex-1 bg-white/10 hover:bg-white/20 text-white text-2xl font-fredoka rounded-[2rem] border-4 border-white/20">
                Again! 🔄
              </Button>
              <Button onClick={() => navigate("/activities/module-3")} className="h-20 flex-1 bg-white text-emerald-600 hover:bg-emerald-50 text-2xl font-fredoka rounded-[2rem] shadow-2xl">
                Done! ✨
              </Button>
            </div>
          </Card>
        ) : (
          <div className="space-y-8">
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                <div key={n} className={`h-3 rounded-full transition-all duration-500 ${count >= n ? 'bg-emerald-500 w-6' : 'bg-emerald-100 w-3'}`} />
              ))}
            </div>

            <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-8 md:p-10 text-center space-y-6">
              <h3 className="text-3xl font-fredoka text-emerald-700">
                {count === 0
                  ? "All eggs in the nest! 🪺"
                  : count < 5
                    ? `${count} chick${count > 1 ? 's' : ''} hatched!`
                    : count === 5
                      ? "Left hand full! Move to the right!"
                      : `${count} chicks — ${count - 5} on the right hand!`}
              </h3>

              <div className="bg-emerald-50/50 rounded-[2.5rem] border-4 border-white shadow-inner p-6">
                {renderHands()}
              </div>

              <div className={`p-6 rounded-[2rem] border-4 border-white shadow-inner max-w-sm mx-auto transition-all duration-500 ${justAdded ? 'bg-yellow-50 scale-105' : 'bg-emerald-50'}`}>
                <p className="text-3xl font-fredoka text-emerald-800">
                  {count === 0 ? (
                    "Ready to hatch!"
                  ) : (
                    <>Count: <span className={`text-6xl drop-shadow-sm font-bold transition-all duration-300 ${justAdded ? 'text-yellow-600 scale-110 inline-block' : 'text-emerald-600'}`}>{count}</span></>
                  )}
                </p>
              </div>

              <Button onClick={hatchOne} className="bg-green-500 hover:bg-green-600 text-white py-10 px-14 text-3xl font-fredoka rounded-[2rem] shadow-xl border-b-8 border-green-700 transition-all active:scale-95 hover:scale-105">
                {count === 0 ? "Hatch First Chick! 🐥" : "Hatch 1 More! 🐥"}
              </Button>
            </Card>

            <Button onClick={() => setShowGame(false)} variant="ghost" className="text-emerald-400 hover:text-emerald-600 w-full py-2 font-bold font-nunito">
              ← Back to Instructions
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FingerCountingSeven4;

import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Mountain } from "lucide-react";

const CountingToSeven2 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [count, setCount] = useState(5);
  const [justAdded, setJustAdded] = useState(false);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const markLessonComplete = () => {
    const saved = localStorage.getItem("ethio-stem-m3-completed");
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes("lesson-2")) {
      completed.push("lesson-2");
      localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
    }
  };

  const addOne = () => {
    if (count < 7) {
      setJustAdded(true);
      const newCount = count + 1;
      setCount(newCount);
      setTimeout(() => setJustAdded(false), 1200);

      if (newCount === 7) {
        setTimeout(() => {
          setShowFeedback('correct');
          markLessonComplete();
        }, 1000);
      }
    }
  };

  const resetActivity = () => {
    setShowGame(false);
    setCount(5);
    setJustAdded(false);
    setShowFeedback(null);
  };

  const isComplete = count >= 7 && showFeedback === null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white p-4 font-nunito overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=lesson-2")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <span className="text-sm font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full font-fredoka">Lesson 2</span>
            <h1 className="text-2xl font-bold text-foreground font-fredoka uppercase tracking-wide mt-1">Creek Crossing!</h1>
          </div>
        </div>

        {!showGame ? (
          <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700">
            <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center rotate-3 shadow-lg">
              <Mountain className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl font-fredoka text-blue-900">Help the Explorer!</h2>
            <p className="text-2xl text-blue-800 font-nunito leading-relaxed max-w-xl mx-auto">
              We need <span className="font-fredoka text-4xl text-blue-600">5</span> stepping stones to start crossing.
              <br />But the creek is wide — we need <strong>more stones</strong>!
            </p>
            <div className="space-y-3">
              <p className="text-lg font-bold text-blue-500">🎯 Learning Goal</p>
              <p className="text-base text-blue-600">Count 6 and 7 stones in a line. See how each is 1 more.</p>
            </div>
            <Button onClick={() => setShowGame(true)} className="bg-blue-600 hover:bg-blue-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl font-fredoka border-b-8 border-blue-800 transition-all hover:scale-105 active:scale-95">
              Start Adventure! 🏞️
            </Button>
          </Card>
        ) : isComplete ? (
          <Card className="bg-gradient-to-br from-blue-600 via-cyan-600 to-emerald-600 shadow-2xl rounded-[4rem] p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
            <div className="text-9xl animate-bounce">🧑‍🎒</div>
            <h2 className="text-6xl font-fredoka drop-shadow-xl">Explorer Hero!</h2>
            <p className="text-2xl font-nunito max-w-2xl mx-auto leading-relaxed">
              You placed <span className="font-fredoka text-5xl text-yellow-300">7</span> stepping stones!
              <br />5 and 1 more is 6. 6 and 1 more is 7.
            </p>
            <div className="flex gap-4 w-full pt-8">
              <Button onClick={resetActivity} className="h-20 flex-1 bg-white/10 hover:bg-white/20 text-white text-2xl font-fredoka rounded-[2rem] border-4 border-white/20">
                Again! 🔄
              </Button>
              <Button onClick={() => navigate("/activities/module-3?last=lesson-2")} className="h-20 flex-1 bg-white text-blue-600 hover:bg-blue-50 text-2xl font-fredoka rounded-[2rem] shadow-2xl">
                Done! ✨
              </Button>
            </div>
          </Card>
        ) : (
          <div className="space-y-8">
            <div className="flex justify-center gap-2">
              {[5, 6, 7].map((n) => (
                <div key={n} className={`h-3 rounded-full transition-all duration-500 ${count >= n ? 'bg-blue-500 w-12' : 'bg-blue-100 w-3'}`} />
              ))}
            </div>

            <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-8 md:p-10 text-center space-y-8">
              <h3 className="text-3xl font-fredoka text-blue-700">
                {count === 5 ? "Count the stones!" : `${count - 1} and 1 more is...`}
              </h3>

              {/* Creek scene with rocks in a line */}
              <div className="relative bg-blue-100/50 p-8 rounded-[2.5rem] border-4 border-dashed border-blue-200 shadow-inner max-w-3xl mx-auto overflow-hidden">
                {/* Water effect */}
                <div className="absolute inset-0 opacity-10 pointer-events-none flex justify-around items-end text-3xl pb-2">
                  <span>🌊</span><span>🌊</span><span>🌊</span><span>🌊</span>
                </div>
                <div className="flex justify-center gap-3 relative z-10">
                  {Array.from({ length: count }).map((_, i) => {
                    const isNew = justAdded && i === count - 1;
                    return (
                      <div key={i} className={`flex flex-col items-center transition-all duration-500 ${isNew ? 'animate-in zoom-in-50 duration-500' : ''}`}>
                        <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-3xl shadow-lg border-4 border-white transition-all duration-500
                          ${isNew ? 'bg-yellow-400 ring-4 ring-yellow-300 ring-offset-2 scale-110' : i < 5 ? 'bg-gray-500' : 'bg-rose-500'} text-white`}>
                          🪨
                        </div>
                        <span className={`text-xl font-bold mt-2 font-fredoka transition-all ${isNew ? 'text-yellow-600 scale-125' : 'text-blue-900'}`}>
                          {i + 1}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className={`p-6 rounded-[2rem] border-4 border-white shadow-inner max-w-sm mx-auto transition-all duration-500 ${justAdded ? 'bg-yellow-50 scale-105' : 'bg-blue-50'}`}>
                <p className="text-3xl font-fredoka text-blue-800">
                  We have <span className={`text-6xl drop-shadow-sm font-bold transition-all duration-300 ${justAdded ? 'text-yellow-600 scale-110 inline-block' : 'text-blue-600'}`}>{count}</span> stones!
                </p>
                <div className="flex gap-4 w-full pt-8">
                  <Button onClick={resetActivity} className="h-24 flex-1 bg-white/10 hover:bg-white/20 text-white text-3xl font-fredoka rounded-[2rem] border-4 border-white/20">
                    Again! 🔄
                  </Button>
                  <Button onClick={() => navigate("/activities/module-3?last=lesson-2")} className="h-24 flex-1 bg-white text-blue-600 hover:bg-blue-50 text-3xl font-fredoka rounded-[2rem] shadow-2xl">
                    Yay! ✨
                  </Button>
                </div>
              </div>

              <Button onClick={addOne} disabled={count >= 7} className="bg-rose-500 hover:bg-rose-600 text-white py-10 px-14 text-3xl font-fredoka rounded-[2rem] shadow-xl border-b-8 border-rose-700 transition-all active:scale-95 hover:scale-105">
                Drop 1 More Stone! ➕
              </Button>
            </Card>

            <Button onClick={() => setShowGame(false)} variant="ghost" className="text-blue-400 hover:text-blue-600 w-full py-2 font-bold font-nunito">
              ← Back to Instructions
            </Button>
          </div>
        )}

        {showFeedback && (
          <div className="fixed top-24 right-6 z-[100] animate-in slide-in-from-right-4 fade-in duration-300">
            <Card className={`flex items-center gap-4 px-6 py-4 shadow-2xl rounded-2xl border-4 ${showFeedback === 'correct' ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'}`}>
              <span className="text-4xl">{showFeedback === 'correct' ? '🌟' : '🧐'}</span>
              <span className={`text-2xl font-fredoka font-bold ${showFeedback === 'correct' ? 'text-green-700' : 'text-red-700'}`}>
                {showFeedback === 'correct' ? 'Great!' : 'Try Again!'}
              </span>
              {showFeedback !== 'correct' && (
                <Button onClick={() => setShowFeedback(null)} className="ml-2 px-5 py-3 text-xl font-fredoka rounded-xl border-b-4 bg-red-500 hover:bg-red-600 border-red-700 text-white">
                  OK 👍
                </Button>
              )}
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountingToSeven2;

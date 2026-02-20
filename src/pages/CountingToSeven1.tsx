import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Users } from "lucide-react";

const CountingToSeven1 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [count, setCount] = useState(5);
  const [justAdded, setJustAdded] = useState(false);

  const markLessonComplete = () => {
    const saved = localStorage.getItem("ethio-stem-m3-completed");
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes("3-introduce-6-7-lesson-1")) {
      completed.push("3-introduce-6-7-lesson-1");
      localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
    }
  };

  const addOne = () => {
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
    setCount(5);
    setJustAdded(false);
  };

  const isComplete = count >= 7;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-white p-4 font-nunito overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <span className="text-sm font-bold text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full font-fredoka">Lesson 1</span>
            <h1 className="text-2xl font-bold text-foreground font-fredoka uppercase tracking-wide mt-1">Soccer Team!</h1>
          </div>
        </div>

        {!showGame ? (
          /* Intro Screen */
          <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700">
            <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-indigo-500 to-blue-500 rounded-3xl flex items-center justify-center rotate-3 shadow-lg">
              <Users className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl font-fredoka text-indigo-900">The Big Team!</h2>
            <p className="text-2xl text-indigo-800 font-nunito leading-relaxed max-w-xl mx-auto">
              We have <span className="font-fredoka text-4xl text-indigo-600">5</span> soccer players.
              <br />What happens when <strong>one more</strong> joins?
            </p>
            <div className="space-y-3">
              <p className="text-lg font-bold text-indigo-500">🎯 Learning Goal</p>
              <p className="text-base text-indigo-600">5 and 1 more is <strong>6</strong>. 6 and 1 more is <strong>7</strong>.</p>
            </div>
            <Button onClick={() => setShowGame(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl font-fredoka border-b-8 border-indigo-800 transition-all hover:scale-105 active:scale-95">
              Let's Play! ⚽
            </Button>
          </Card>
        ) : isComplete ? (
          /* Completion Screen */
          <Card className="bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600 shadow-2xl rounded-[4rem] p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
            <div className="text-9xl animate-bounce">🏆</div>
            <h2 className="text-6xl font-fredoka drop-shadow-xl">Team Manager!</h2>
            <p className="text-2xl font-nunito max-w-2xl mx-auto leading-relaxed">
              You counted to <span className="font-fredoka text-5xl text-yellow-300">7</span>!
              <br />5 and 1 more is 6. 6 and 1 more is 7.
            </p>
            <div className="flex gap-4 w-full pt-8">
              <Button onClick={resetActivity} className="h-20 flex-1 bg-white/10 hover:bg-white/20 text-white text-2xl font-fredoka rounded-[2rem] border-4 border-white/20">
                Again! 🔄
              </Button>
              <Button onClick={() => navigate("/activities/module-3")} className="h-20 flex-1 bg-white text-indigo-600 hover:bg-indigo-50 text-2xl font-fredoka rounded-[2rem] shadow-2xl">
                Done! ✨
              </Button>
            </div>
          </Card>
        ) : (
          /* Main Activity */
          <div className="space-y-8">
            {/* Progress dots */}
            <div className="flex justify-center gap-2">
              {[5, 6, 7].map((n) => (
                <div key={n} className={`h-3 rounded-full transition-all duration-500 ${count >= n ? 'bg-indigo-500 w-12' : 'bg-indigo-100 w-3'}`} />
              ))}
            </div>

            <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-8 md:p-10 text-center space-y-8">
              {/* Prompt */}
              <div className="space-y-2">
                <h3 className="text-3xl font-fredoka text-indigo-700">
                  {count === 5 ? "Count the team!" : `${count - 1} and 1 more is...`}
                </h3>
              </div>

              {/* Players grid */}
              <div className="flex flex-wrap justify-center gap-4 my-4 max-w-2xl mx-auto">
                {Array.from({ length: count }).map((_, i) => {
                  const isNew = justAdded && i === count - 1;
                  return (
                    <div
                      key={i}
                      className={`flex flex-col items-center transition-all duration-500 ${isNew ? 'animate-in zoom-in-50 duration-500' : ''}`}
                    >
                      <div
                        className={`w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shadow-lg border-4 border-white transition-all duration-500
                          ${isNew ? 'bg-yellow-400 ring-4 ring-yellow-300 ring-offset-2 scale-110' : i < 5 ? 'bg-indigo-500' : 'bg-orange-500'}
                          text-white`}
                      >
                        <Users className="w-10 h-10" />
                      </div>
                      <span className={`text-2xl font-bold mt-2 font-fredoka transition-all ${isNew ? 'text-yellow-600 scale-125' : 'text-indigo-900'}`}>
                        {i + 1}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Current count display */}
              <div className={`p-6 rounded-[2rem] border-4 border-white shadow-inner max-w-sm mx-auto transition-all duration-500 ${justAdded ? 'bg-yellow-50 scale-105' : 'bg-indigo-50'}`}>
                <p className="text-3xl font-fredoka text-indigo-800">
                  We have <span className={`text-6xl drop-shadow-sm font-bold transition-all duration-300 ${justAdded ? 'text-yellow-600 scale-110 inline-block' : 'text-indigo-600'}`}>{count}</span> players!
                </p>
              </div>

              {/* Add button */}
              <Button
                onClick={addOne}
                className="bg-orange-500 hover:bg-orange-600 text-white py-10 px-14 text-3xl font-fredoka rounded-[2rem] shadow-xl border-b-8 border-orange-700 transition-all active:scale-95 hover:scale-105"
              >
                Add 1 More Player! ➕
              </Button>
            </Card>

            <Button onClick={() => setShowGame(false)} variant="ghost" className="text-indigo-400 hover:text-indigo-600 w-full py-2 font-bold font-nunito">
              ← Back to Instructions
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountingToSeven1;

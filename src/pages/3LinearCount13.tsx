import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RefreshCw, Home, Star, Sparkles, Smile, Footprints, Waves } from "lucide-react";

const LinearCount13 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [currentStep, setCurrentStep] = useState<'intro' | 'adventure' | 'complete'>('intro');
  const [rockCount, setRockCount] = useState(5);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const markLessonComplete = () => {
    const saved = localStorage.getItem("ethio-stem-m3-completed");
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes("3-linear-count-13")) {
      completed.push("3-linear-count-13");
      localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
    }
  };

  const nextStep = () => {
    setShowFeedback(null);
    if (rockCount < 8) {
      setRockCount(prev => prev + 1);
    } else {
      markLessonComplete();
      setCurrentStep('complete');
    }
  };

  const resetActivity = () => {
    setShowGame(false);
    setCurrentStep('intro');
    setRockCount(5);
    setShowFeedback(null);
  };

  const renderCreek = (count: number) => (
    <div className="relative w-full max-w-4xl mx-auto h-64 flex items-center justify-between px-12 bg-blue-400/20 rounded-[4rem] border-8 border-white shadow-inner mb-8 overflow-hidden group">
      <div className="absolute inset-0 bg-blue-400/30 opacity-40 pointer-events-none">
        <Waves className="w-full h-full text-blue-200" />
      </div>

      {/* Banks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-emerald-600 rounded-l-[3.5rem] border-r-4 border-white/20 z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-emerald-600 rounded-r-[3.5rem] border-l-4 border-white/20 z-10" />

      <div className="flex-1 flex justify-center gap-4 z-20">
        {Array.from({ length: 8 }).map((_, i) => {
          const isVisible = i < count;
          return (
            <div
              key={i}
              className={`relative flex flex-col items-center animate-in zoom-in duration-500 ${!isVisible ? 'opacity-20 scale-75 blur-[1px]' : ''}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className={`w-20 h-16 rounded-full flex items-center justify-center text-3xl shadow-lg border-4 border-white ${isVisible ? (i < 5 ? 'bg-zinc-600' : 'bg-amber-600') : 'bg-zinc-400'} text-white`}>
                {isVisible ? '🪨' : '?'}
              </div>
              {isVisible && (
                <span className="text-2xl font-bold mt-2 text-blue-900 font-fredoka drop-shadow-sm">
                  {i + 1}
                </span>
              )}
              {isVisible && i === count - 1 && (
                <div className="absolute -top-12 text-5xl animate-bounce">🧗‍♀️</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-emerald-50 to-white p-4 font-fredoka overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=3-linear-count-13")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
            <ArrowLeft className="w-5 h-5 text-emerald-600" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-widest font-nunito">
                Lesson 13
              </span>
              <h1 className="text-2xl font-bold text-emerald-900 uppercase">Creek Crossing!</h1>
            </div>
          </div>
        </div>

        {!showGame ? (
          <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] overflow-hidden text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700 relative">
            <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center mb-6 rotate-3 shadow-lg">
              <Footprints className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-5xl text-emerald-900 leading-tight">Help the Explorer!</h2>
            <p className="text-2xl text-emerald-800 font-nunito leading-relaxed max-w-2xl mx-auto">
              The traveler needs to step on rocks to cross the water.
              <br />
              We have 5 rocks, but we need more to reach the other side!
            </p>
            <Button
              onClick={() => setShowGame(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 border-b-8 border-emerald-800"
            >
              Play! 🧗‍♀️
            </Button>
            <p className="text-sm text-emerald-400 font-bold uppercase tracking-widest pt-4 font-nunito">Topic C: How Many with 8 Objects</p>
          </Card>
        ) : (
          <div className="space-y-6">
            {currentStep !== 'complete' && (
              <div className="flex justify-center gap-3 mb-4">
                {[5, 6, 7, 8].map((num) => (
                  <div
                    key={num}
                    className={`h-3 rounded-full transition-all ${rockCount >= num
                      ? 'bg-emerald-500 w-12 shadow-sm'
                      : 'bg-emerald-100 w-3'
                      }`}
                  />
                ))}
              </div>
            )}

            {currentStep !== 'complete' && (
              <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-bottom-8">
                <h3 className="text-4xl text-emerald-700">
                  {rockCount < 8 ? "Keep adding rocks!" : "She can cross now!"}
                </h3>

                {renderCreek(rockCount)}

                <div className="bg-emerald-50 p-8 rounded-[2.5rem] border-4 border-white shadow-inner max-w-2xl mx-auto font-nunito">
                  <p className="text-4xl text-emerald-800 leading-relaxed">
                    {rockCount === 5 ? "We have 5 rocks." :
                      rockCount < 8 ? `Now we have ${rockCount} rocks!` :
                        "We finally have 8!"}
                  </p>
                  <p className="text-8xl font-fredoka text-emerald-600 mt-4 font-bold drop-shadow-sm">{rockCount}</p>
                </div>

                <Button
                  onClick={() => setShowFeedback('correct')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white py-12 px-16 text-4xl rounded-[2rem] shadow-xl border-b-8 border-emerald-800 transition-all active:scale-95"
                >
                  {rockCount < 8 ? 'Add 1 More! ➕' : 'Cross Now! ✅'}
                </Button>
              </Card>
            )}

            {currentStep === 'complete' && (
              <Card className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 shadow-2xl rounded-[4rem] overflow-hidden p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                <div className="text-9xl animate-bounce">🏞️</div>
                <h2 className="text-7xl drop-shadow-xl">Travel Guide!</h2>
                <p className="text-3xl font-nunito max-w-2xl mx-auto leading-relaxed">
                  You helped the explorer cross the creek!
                  <br />
                  You know that 5 and 3 more makes 8!
                </p>
                <div className="flex gap-4 w-full pt-8">
                  <Button onClick={resetActivity} className="h-24 flex-1 bg-white/10 hover:bg-white/20 text-white text-3xl rounded-[2rem] border-4 border-white/20">
                    Again! 🔄
                  </Button>
                  <Button onClick={() => navigate("/activities/module-3?last=3-linear-count-13")} className="h-24 flex-1 bg-white text-emerald-600 hover:bg-emerald-50 text-3xl rounded-[2rem] shadow-2xl">
                    Yay! ✨
                  </Button>
                </div>
              </Card>
            )}

            {showFeedback && (
              <div className="fixed bottom-6 right-6 z-[100] animate-in slide-in-from-right-4 fade-in duration-300">
                <Card className={`flex items-center gap-4 px-6 py-4 shadow-2xl rounded-2xl border-4 ${showFeedback === 'correct' ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'}`}>
                  <span className="text-4xl">{showFeedback === 'correct' ? '🌟' : '🧐'}</span>
                  <h4 className={`text-2xl font-fredoka ${showFeedback === 'correct' ? 'text-green-700' : 'text-red-700'}`}>
                    {showFeedback === 'correct' ? 'Awesome!' : 'Try Again!'}
                  </h4>
                  <Button onClick={showFeedback === 'correct' ? nextStep : () => setShowFeedback(null)} size="sm" className={`ml-2 rounded-xl text-lg px-4 py-2 ${showFeedback === 'correct' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}>
                    {showFeedback === 'correct' ? (rockCount < 8 ? 'One More! ➡️' : 'Finish! ➡️') : 'OK! 👍'}
                  </Button>
                </Card>
              </div>
            )}

            {currentStep !== 'complete' && (
              <Button onClick={() => setShowGame(false)} variant="ghost" className="text-emerald-400 hover:text-emerald-600 w-full py-2 font-bold font-nunito">
                ← Back to Instructions
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LinearCount13;

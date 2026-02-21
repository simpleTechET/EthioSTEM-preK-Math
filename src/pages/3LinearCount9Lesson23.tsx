import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RefreshCw, Home, Star, Sparkles, Smile, Mountain, Waves } from "lucide-react";

const LinearCount9Lesson23 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [currentStep, setCurrentStep] = useState<'rocks' | 'cross' | 'complete'>('rocks');
  const [rocks, setRocks] = useState(5);
  const [explorerPos, setExplorerPos] = useState(-1);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const markLessonComplete = () => {
    const saved = localStorage.getItem("ethio-stem-m3-completed");
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes("3-linear-count-9-lesson-23")) {
      completed.push("3-linear-count-9-lesson-23");
      localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
    }
  };

  const addRock = () => {
    if (rocks < 9) {
      setRocks(prev => prev + 1);
    } else {
      setCurrentStep('cross');
    }
  };

  const startCrossing = () => {
    let pos = 0;
    const interval = setInterval(() => {
      setExplorerPos(pos);
      pos++;
      if (pos > rocks) {
        clearInterval(interval);
        setShowFeedback('correct');
      }
    }, 500);
  };

  const nextStep = () => {
    setShowFeedback(null);
    markLessonComplete();
    setCurrentStep('complete');
  };

  const resetActivity = () => {
    setShowGame(false);
    setCurrentStep('rocks');
    setRocks(5);
    setExplorerPos(-1);
    setShowFeedback(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-white p-4 font-fredoka overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=3-linear-count-9-lesson-23")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
            <ArrowLeft className="w-5 h-5 text-emerald-600" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-widest font-nunito">
                Lesson 23
              </span>
              <h1 className="text-2xl font-bold text-emerald-900 uppercase">Rock Path!</h1>
            </div>
          </div>
        </div>

        {!showGame ? (
          <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] overflow-hidden text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700 relative">
            <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center mb-6 rotate-3 shadow-lg">
              <Mountain className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-5xl text-emerald-900 leading-tight">Creek Crosser!</h2>
            <p className="text-2xl text-emerald-800 font-nunito leading-relaxed max-w-2xl mx-auto">
              Help the explorer cross the creek!
              <br />
              We have 5 rocks. Add more until we have 9 to reach the other side!
            </p>
            <Button
              onClick={() => setShowGame(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 border-b-8 border-emerald-800"
            >
              Start Hike! 🥾
            </Button>
            <p className="text-sm text-emerald-400 font-bold uppercase tracking-widest pt-4 font-nunito">Topic E: Zero and 9</p>
          </Card>
        ) : (
          <div className="space-y-6">
            {currentStep !== 'complete' && (
              <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-bottom-8">
                <h3 className="text-4xl text-emerald-700 uppercase tracking-widest">
                  {currentStep === 'rocks' ? "Add rocks to 9!" : "Watch the explorer!"}
                </h3>

                <div className="flex justify-center items-center py-12 bg-sky-100/30 rounded-[3rem] border-8 border-white shadow-inner min-h-[350px] relative overflow-hidden">
                  <Waves className="absolute bottom-0 left-0 w-full h-24 text-sky-200/50" />
                  <div className="flex gap-4 items-center z-10 px-8">
                    <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white font-bold">Start</div>
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div key={i} className={`w-16 h-16 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-2xl transition-all relative ${i < rocks ? (i < 5 ? 'bg-stone-500 text-white' : 'bg-emerald-400 text-white scale-110') : 'bg-white opacity-20 border-dashed border-stone-300'}`}>
                        {i < rocks && i + 1}
                        {explorerPos === i && (
                          <div className="absolute -top-16 text-5xl animate-bounce">🧭</div>
                        )}
                      </div>
                    ))}
                    <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white font-bold">End</div>
                    {explorerPos === 9 && (
                      <div className="text-5xl animate-bounce">🧭</div>
                    )}
                  </div>
                </div>

                <div className="bg-emerald-50 p-8 rounded-[2.5rem] border-4 border-white shadow-inner max-w-2xl mx-auto font-nunito">
                  <p className="text-4xl text-emerald-800 leading-relaxed font-bold">
                    {rocks < 9 ? `5 and ${rocks - 5} more is...` : "9 rocks! Let's Go!"}
                  </p>
                  <p className="text-8xl font-fredoka text-emerald-600 mt-4 font-bold drop-shadow-sm">
                    {rocks}
                  </p>
                </div>

                <Button
                  onClick={rocks < 9 ? addRock : startCrossing}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white py-12 px-16 text-4xl rounded-[2rem] shadow-xl border-b-8 border-emerald-800 transition-all active:scale-95 disabled:opacity-50"
                  disabled={explorerPos !== -1 && explorerPos < 9}
                >
                  {rocks < 9 ? `Add Rock #${rocks + 1}! 🪨` : 'Cross the Creek! 🧭'}
                </Button>
              </Card>
            )}

            {currentStep === 'complete' && (
              <Card className="bg-gradient-to-br from-emerald-600 via-teal-600 to-sky-600 shadow-2xl rounded-[4rem] overflow-hidden p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                <div className="text-9xl animate-bounce">🏔️</div>
                <h2 className="text-7xl drop-shadow-xl">Master Explorer!</h2>
                <p className="text-3xl font-nunito max-w-2xl mx-auto leading-relaxed">
                  You used 9 rocks to cross the water!
                  <br />
                  Counting by adding 1 more is super smart!
                </p>
                <div className="flex gap-4 w-full pt-8">
                  <Button onClick={resetActivity} className="h-24 flex-1 bg-white/10 hover:bg-white/20 text-white text-3xl rounded-[2rem] border-4 border-white/20">
                    Again! 🔄
                  </Button>
                  <Button onClick={() => navigate("/activities/module-3?last=3-linear-count-9-lesson-23")} className="h-24 flex-1 bg-white text-emerald-600 hover:bg-rose-50 text-3xl rounded-[2rem] shadow-2xl">
                    Yay! ✨
                  </Button>
                </div>
              </Card>
            )}

            {showFeedback && (
              <div className="fixed bottom-[33%] right-[25%] z-[100] animate-in slide-in-from-right-4 fade-in duration-300">
                <Card className={`flex items-center gap-4 px-6 py-4 shadow-2xl rounded-2xl border-4 ${showFeedback === 'correct' ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'}`}>
                  <span className="text-4xl">{showFeedback === 'correct' ? '🌟' : '🧐'}</span>
                  <h4 className={`text-2xl font-fredoka ${showFeedback === 'correct' ? 'text-green-700' : 'text-red-700'}`}>
                    {showFeedback === 'correct' ? 'Awesome!' : 'Try Again!'}
                  </h4>
                  <Button onClick={nextStep} size="sm" className={`ml-2 rounded-xl text-lg px-4 py-2 ${showFeedback === 'correct' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}>
                    Finish! ➡️
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

export default LinearCount9Lesson23;

import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RefreshCw, Home, Star, Sparkles, Smile, Utensils, Waves } from "lucide-react";

const Introduce9Lesson22 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [currentStep, setCurrentStep] = useState<'grapes' | 'blueberry' | 'complete'>('grapes');
  const [grapes, setGrapes] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const markLessonComplete = () => {
    const saved = localStorage.getItem("ethio-stem-m3-completed");
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes("lesson-22")) {
      completed.push("lesson-22");
      localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
    }
  };

  const addGrape = () => {
    if (grapes < 8) {
      setGrapes(prev => prev + 1);
    } else if (grapes === 8 && currentStep === 'grapes') {
      setCurrentStep('blueberry');
    }
  };

  const addBlueberry = () => {
    setShowFeedback('correct');
  };

  const nextStep = () => {
    setShowFeedback(null);
    markLessonComplete();
    setCurrentStep('complete');
  };

  const resetActivity = () => {
    setShowGame(false);
    setCurrentStep('grapes');
    setGrapes(0);
    setShowFeedback(null);
  };

  useEffect(() => {
    if (showFeedback === 'correct') {
      const timer = setTimeout(() => { nextStep(); }, 1200);
      return () => clearTimeout(timer);
    }
  }, [showFeedback]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-white p-4 font-fredoka overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=lesson-22")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
            <ArrowLeft className="w-5 h-5 text-purple-600" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-purple-600 bg-purple-100 px-3 py-1 rounded-full uppercase tracking-widest font-nunito">
                Lesson 22
              </span>
              <h1 className="text-2xl font-bold text-purple-900 uppercase">Fruit Snack!</h1>
            </div>
          </div>
        </div>

        {!showGame ? (
          <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] overflow-hidden text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700 relative">
            <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-purple-500 to-indigo-500 rounded-3xl flex items-center justify-center mb-6 rotate-3 shadow-lg">
              <span className="text-5xl text-white">🍇</span>
            </div>
            <h2 className="text-5xl text-purple-900 leading-tight">One More!</h2>
            <p className="text-2xl text-purple-800 font-nunito leading-relaxed max-w-2xl mx-auto">
              Let's make a snack with 8 grapes.
              <br />
              Then we'll add 1 more to see what we get!
            </p>
            <Button
              onClick={() => setShowGame(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 border-b-8 border-purple-800"
            >
              Play! 🍽️
            </Button>
            <p className="text-sm text-purple-400 font-bold uppercase tracking-widest pt-4 font-nunito">Topic E: Zero and 9</p>
          </Card>
        ) : (
          <div className="space-y-6">
            {currentStep !== 'complete' && (
              <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-bottom-8">
                <h3 className="text-4xl text-purple-700 uppercase tracking-widest">
                  {currentStep === 'grapes' ? "Add 8 Grapes!" : "Add 1 More!"}
                </h3>

                <div className="flex justify-center items-center py-12 bg-indigo-100/30 rounded-[3rem] border-8 border-white shadow-inner min-h-[350px] relative">
                  <div className="w-[300px] h-[300px] bg-white rounded-full border-8 border-indigo-200 shadow-xl flex flex-wrap items-center justify-center p-8 gap-4">
                    {Array.from({ length: grapes }).map((_, i) => (
                      <div key={i} className="text-5xl animate-in zoom-in duration-300">🍇</div>
                    ))}
                    {currentStep === 'blueberry' && (
                      <div className="text-5xl animate-bounce">🫐</div>
                    )}
                  </div>
                </div>

                <div className="bg-purple-50 p-8 rounded-[2.5rem] border-4 border-white shadow-inner max-w-2xl mx-auto font-nunito">
                  <p className="text-4xl text-purple-800 leading-relaxed font-bold">
                    {currentStep === 'grapes' ? `Grapes: ${grapes}` : "8 grapes and 1 more!"}
                  </p>
                  <p className="text-8xl font-fredoka text-purple-600 mt-4 font-bold drop-shadow-sm">
                    {currentStep === 'grapes' ? grapes : '9'}
                  </p>
                </div>

                {currentStep === 'grapes' ? (
                  <Button
                    onClick={grapes < 8 ? addGrape : () => setCurrentStep('blueberry')}
                    className="bg-purple-600 hover:bg-purple-700 text-white py-12 px-16 text-4xl rounded-[2rem] shadow-xl border-b-8 border-purple-800 transition-all active:scale-95"
                  >
                    {grapes < 8 ? `Add #${grapes + 1}! 🍇` : 'Ready for More? 🫐'}
                  </Button>
                ) : (
                  <Button
                    onClick={addBlueberry}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white py-12 px-16 text-4xl rounded-[2rem] shadow-xl border-b-8 border-indigo-800 transition-all active:scale-95"
                  >
                    Add Blueberry! 🫐
                  </Button>
                )}
              </Card>
            )}

            {currentStep === 'complete' && (
              <Card className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 shadow-2xl rounded-[4rem] overflow-hidden p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                <div className="text-[12rem] font-black animate-bounce leading-none">9</div>
                <h2 className="text-7xl drop-shadow-xl">Number Nine!</h2>
                <p className="text-3xl font-nunito max-w-2xl mx-auto leading-relaxed">
                  8 and 1 more is 9!
                  <br />
                  Now we can count even higher!
                </p>
                <div className="flex gap-4 w-full pt-8">
                  <Button onClick={resetActivity} className="h-24 flex-1 bg-white/10 hover:bg-white/20 text-white text-3xl rounded-[2rem] border-4 border-white/20">
                    Again! 🔄
                  </Button>
                  <Button onClick={() => navigate("/activities/module-3?last=lesson-22")} className="h-24 flex-1 bg-white text-purple-600 hover:bg-rose-50 text-3xl rounded-[2rem] shadow-2xl">
                    Yay! ✨
                  </Button>
                </div>
              </Card>
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

            {currentStep !== 'complete' && (
              <Button onClick={() => setShowGame(false)} variant="ghost" className="text-purple-400 hover:text-purple-600 w-full py-2 font-bold font-nunito">
                ← Back to Instructions
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Introduce9Lesson22;

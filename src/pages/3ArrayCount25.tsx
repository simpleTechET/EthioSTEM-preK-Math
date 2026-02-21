import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RefreshCw, Home, Star, Sparkles, Smile, BookOpen, Waves } from "lucide-react";

const ArrayCount25 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [currentStep, setCurrentStep] = useState<'build' | 'verify' | 'complete'>('build');
  const [placed, setPlaced] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const markLessonComplete = () => {
    const saved = localStorage.getItem("ethio-stem-m3-completed");
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes("3-array-count-25")) {
      completed.push("3-array-count-25");
      localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
    }
  };

  const animals = [
    { emoji: '🐭', color: 'bg-stone-200' },
    { emoji: '🐭', color: 'bg-stone-200' },
    { emoji: '🐭', color: 'bg-stone-200' },
    { emoji: '🐷', color: 'bg-pink-100' },
    { emoji: '🐷', color: 'bg-pink-100' },
    { emoji: '🐷', color: 'bg-pink-100' },
    { emoji: '🐱', color: 'bg-orange-100' },
    { emoji: '🐱', color: 'bg-orange-100' },
    { emoji: '🐱', color: 'bg-orange-100' },
  ];

  const handlePlace = () => {
    if (placed < 9) {
      setPlaced(prev => prev + 1);
      if (placed === 8) setShowFeedback('correct');
    }
  };

  const nextStep = () => {
    setShowFeedback(null);
    markLessonComplete();
    setCurrentStep('complete');
  };

  const resetActivity = () => {
    setShowGame(false);
    setCurrentStep('build');
    setPlaced(0);
    setShowFeedback(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-violet-50 to-white p-4 font-fredoka overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=3-array-count-25")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
            <ArrowLeft className="w-5 h-5 text-indigo-600" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full uppercase tracking-widest font-nunito">
                Lesson 25
              </span>
              <h1 className="text-2xl font-bold text-indigo-900 uppercase">Storybook Array!</h1>
            </div>
          </div>
        </div>

        {!showGame ? (
          <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] overflow-hidden text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700 relative">
            <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-indigo-500 to-violet-500 rounded-3xl flex items-center justify-center mb-6 rotate-3 shadow-lg">
              <BookOpen className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-5xl text-indigo-900 leading-tight">Story Square!</h2>
            <p className="text-2xl text-indigo-800 font-nunito leading-relaxed max-w-2xl mx-auto">
              Bring the nursery rhyme friends to the party!
              <br />
              We'll make a 3 by 3 array of 9 animals.
            </p>
            <Button
              onClick={() => setShowGame(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 border-b-8 border-indigo-800"
            >
              Open Book! 📖
            </Button>
            <p className="text-sm text-indigo-400 font-bold uppercase tracking-widest pt-4 font-nunito">Topic E: Zero and 9</p>
          </Card>
        ) : (
          <div className="space-y-6">
            {currentStep !== 'complete' && (
              <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-bottom-8">
                <h3 className="text-4xl text-indigo-700 uppercase tracking-widest">
                  Fill the 3x3 Grid!
                </h3>

                <div className="flex justify-center items-center py-12 bg-indigo-100/30 rounded-[3rem] border-8 border-white shadow-inner min-h-[400px]">
                  <div className="grid grid-cols-3 gap-6">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div key={i} className={`w-24 h-24 rounded-3xl border-4 border-white shadow-xl flex items-center justify-center text-5xl transition-all ${i < placed ? `${animals[i].color} scale-100` : 'bg-white/50 scale-90 border-dashed border-indigo-200'}`}>
                        {i < placed ? animals[i].emoji : ''}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-indigo-50 p-8 rounded-[2.5rem] border-4 border-white shadow-inner max-w-2xl mx-auto font-nunito">
                  <p className="text-4xl text-indigo-800 leading-relaxed font-bold">
                    {placed < 9 ? `Invitations sent: ${placed}` : "All 9 friends are here!"}
                  </p>
                  <p className="text-8xl font-fredoka text-indigo-600 mt-4 font-bold drop-shadow-sm">
                    {placed}
                  </p>
                </div>

                <Button
                  onClick={handlePlace}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white py-12 px-16 text-4xl rounded-[2rem] shadow-xl border-b-8 border-indigo-800 transition-all active:scale-95"
                >
                  {placed < 9 ? `Invite #${placed + 1}! 💌` : 'Check! ✅'}
                </Button>
              </Card>
            )}

            {currentStep === 'complete' && (
              <Card className="bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-600 shadow-2xl rounded-[4rem] overflow-hidden p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                <div className="text-9xl animate-bounce">🎆</div>
                <h2 className="text-7xl drop-shadow-xl">Array Expert!</h2>
                <p className="text-3xl font-nunito max-w-2xl mx-auto leading-relaxed">
                  You made a perfect square of 9!
                  <br />
                  3 rows and 3 columns make 9 animals total.
                </p>
                <div className="flex gap-4 w-full pt-8">
                  <Button onClick={resetActivity} className="h-24 flex-1 bg-white/10 hover:bg-white/20 text-white text-3xl rounded-[2rem] border-4 border-white/20">
                    Again! 🔄
                  </Button>
                  <Button onClick={() => navigate("/activities/module-3?last=3-array-count-25")} className="h-24 flex-1 bg-white text-indigo-600 hover:bg-rose-50 text-3xl rounded-[2rem] shadow-2xl">
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
                    {showFeedback === 'correct' ? 'Wonderful!' : 'Try Again!'}
                  </h4>
                  <Button onClick={nextStep} size="sm" className={`ml-2 rounded-xl text-lg px-4 py-2 ${showFeedback === 'correct' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}>
                    {showFeedback === 'correct' ? 'Finish! ➡️' : 'OK! 👍'}
                  </Button>
                </Card>
              </div>
            )}

            {currentStep !== 'complete' && (
              <Button onClick={() => setShowGame(false)} variant="ghost" className="text-indigo-400 hover:text-indigo-600 w-full py-2 font-bold font-nunito">
                ← Back to Instructions
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArrayCount25;

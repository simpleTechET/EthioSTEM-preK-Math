import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RefreshCw, Home, Star, Sparkles, Smile, Utensils, Waves } from "lucide-react";

const CountOut20 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [currentStep, setCurrentStep] = useState<'count' | 'verify' | 'complete'>('count');
  const [flowers, setFlowers] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const markLessonComplete = () => {
    const saved = localStorage.getItem("ethio-stem-m3-completed");
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes("3-count-out-20")) {
      completed.push("3-count-out-20");
      localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
    }
  };

  const handleAdd = () => {
    if (flowers < 8) {
      setFlowers(prev => prev + 1);
    } else {
      setShowFeedback('incorrect');
    }
  };

  const handleRemove = () => {
    if (flowers > 0) setFlowers(prev => prev - 1);
  };

  const checkOrder = () => {
    if (flowers === 8) {
      setShowFeedback('correct');
    } else {
      setShowFeedback('incorrect');
    }
  };

  const nextStep = () => {
    setShowFeedback(null);
    markLessonComplete();
    setCurrentStep('complete');
  };

  const resetActivity = () => {
    setShowGame(false);
    setCurrentStep('count');
    setFlowers(0);
    setShowFeedback(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-white p-4 font-fredoka overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=3-count-out-20")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
            <ArrowLeft className="w-5 h-5 text-rose-600" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-rose-600 bg-rose-100 px-3 py-1 rounded-full uppercase tracking-widest font-nunito">
                Lesson 20
              </span>
              <h1 className="text-2xl font-bold text-rose-900 uppercase">Chef's Special!</h1>
            </div>
          </div>
        </div>

        {!showGame ? (
          <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] overflow-hidden text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700 relative">
            <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-rose-500 to-pink-500 rounded-3xl flex items-center justify-center mb-6 rotate-3 shadow-lg">
              <Utensils className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-5xl text-rose-900 leading-tight">Count to 8!</h2>
            <p className="text-2xl text-rose-800 font-nunito leading-relaxed max-w-2xl mx-auto">
              Can you count out exactly 8 flowers for the bees?
              <br />
              Be careful not to give too many! Stop when you reach 8.
            </p>
            <Button
              onClick={() => setShowGame(true)}
              className="bg-rose-600 hover:bg-rose-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 border-b-8 border-rose-800"
            >
              Start Cooking! 👨‍🍳
            </Button>
            <p className="text-sm text-rose-400 font-bold uppercase tracking-widest pt-4 font-nunito">Topic D: Matching Numerals to 8</p>
          </Card>
        ) : (
          <div className="space-y-6">
            {currentStep !== 'complete' && (
              <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-bottom-8">
                <h3 className="text-4xl text-rose-700 uppercase tracking-widest">
                  Put 8 on the tray!
                </h3>

                <div className="grid grid-cols-4 gap-4 p-8 bg-stone-100 rounded-[3rem] border-8 border-white shadow-inner min-h-[300px] items-center px-8 relative">
                  <div className="absolute top-2 right-6 text-sm font-bold text-stone-400 uppercase tracking-widest">Bee Tray</div>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className={`w-20 h-20 rounded-3xl border-4 border-white shadow-lg flex items-center justify-center text-5xl transition-all ${i < flowers ? 'bg-pink-400 scale-100' : 'bg-white/50 scale-90 border-dashed border-stone-300'}`}>
                      {i < flowers ? '🌸' : ''}
                    </div>
                  ))}
                </div>

                <div className="bg-rose-50 p-8 rounded-[2.5rem] border-4 border-white shadow-inner max-w-2xl mx-auto font-nunito flex items-center justify-between px-16">
                  <Button onClick={handleRemove} variant="outline" className="w-20 h-20 rounded-full border-4 border-rose-200 text-4xl text-rose-600 hover:bg-rose-100">-</Button>
                  <div>
                    <p className="text-8xl font-fredoka text-rose-600 font-bold drop-shadow-sm">{flowers}</p>
                    <p className="text-xl text-rose-400 font-bold uppercase">Flowers</p>
                  </div>
                  <Button onClick={handleAdd} variant="outline" className="w-20 h-20 rounded-full border-4 border-rose-200 text-4xl text-rose-600 hover:bg-rose-100">+</Button>
                </div>

                <Button
                  onClick={checkOrder}
                  className="bg-rose-600 hover:bg-rose-700 text-white py-12 px-16 text-4xl rounded-[2rem] shadow-xl border-b-8 border-rose-800 transition-all active:scale-95"
                >
                  Serve! ✅
                </Button>
              </Card>
            )}

            {currentStep === 'complete' && (
              <Card className="bg-gradient-to-br from-rose-600 via-pink-600 to-orange-600 shadow-2xl rounded-[4rem] overflow-hidden p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                <div className="text-9xl animate-bounce">🍴</div>
                <h2 className="text-7xl drop-shadow-xl">Five Star Chef!</h2>
                <p className="text-3xl font-nunito max-w-2xl mx-auto leading-relaxed">
                  You served exactly 8 flowers!
                  <br />
                  The bees are so happy with your counting.
                </p>
                <div className="flex gap-4 w-full pt-8">
                  <Button onClick={resetActivity} className="h-24 flex-1 bg-white/10 hover:bg-white/20 text-white text-3xl rounded-[2rem] border-4 border-white/20">
                    Again! 🔄
                  </Button>
                  <Button onClick={() => navigate("/activities/module-3?last=3-count-out-20")} className="h-24 flex-1 bg-white text-rose-600 hover:bg-rose-50 text-3xl rounded-[2rem] shadow-2xl">
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
                    {showFeedback === 'correct' ? 'Perfect!' : 'Not Quite!'}
                  </h4>
                  <Button onClick={showFeedback === 'correct' ? nextStep : () => setShowFeedback(null)} size="sm" className={`ml-2 rounded-xl text-lg px-4 py-2 ${showFeedback === 'correct' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}>
                    {showFeedback === 'correct' ? 'Finish! ➡️' : 'Try Again! 👍'}
                  </Button>
                </Card>
              </div>
            )}

            {currentStep !== 'complete' && (
              <Button onClick={() => setShowGame(false)} variant="ghost" className="text-rose-400 hover:text-rose-600 w-full py-2 font-bold font-nunito">
                ← Back to Instructions
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CountOut20;

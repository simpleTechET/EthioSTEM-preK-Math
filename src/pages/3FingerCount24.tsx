import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RefreshCw, Home, Star, Sparkles, Smile, Bird, Waves } from "lucide-react";

const FingerCount24 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [currentStep, setCurrentStep] = useState<'nest1' | 'nest2' | 'complete'>('nest1');
  const [hatched, setHatched] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const markLessonComplete = () => {
    const saved = localStorage.getItem("ethio-stem-m3-completed");
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes("3-finger-count-24")) {
      completed.push("3-finger-count-24");
      localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
    }
  };

  const hatchEgg = () => {
    if (currentStep === 'nest1') {
      if (hatched < 5) setHatched(prev => prev + 1);
      if (hatched === 4) setCurrentStep('nest2');
    } else if (currentStep === 'nest2') {
      if (hatched < 9) setHatched(prev => prev + 1);
      if (hatched === 8) setShowFeedback('correct');
    }
  };

  const nextStep = () => {
    setShowFeedback(null);
    markLessonComplete();
    setCurrentStep('complete');
  };

  const resetActivity = () => {
    setShowGame(false);
    setCurrentStep('nest1');
    setHatched(0);
    setShowFeedback(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-white p-4 font-fredoka overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=3-finger-count-24")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
            <ArrowLeft className="w-5 h-5 text-orange-600" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full uppercase tracking-widest font-nunito">
                Lesson 24
              </span>
              <h1 className="text-2xl font-bold text-orange-900 uppercase">Finger Chicks!</h1>
            </div>
          </div>
        </div>

        {!showGame ? (
          <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] overflow-hidden text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700 relative">
            <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-orange-500 to-yellow-500 rounded-3xl flex items-center justify-center mb-6 rotate-3 shadow-lg">
              <Bird className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-5xl text-orange-900 leading-tight">Hatch & Count!</h2>
            <p className="text-2xl text-orange-800 font-nunito leading-relaxed max-w-2xl mx-auto">
              Show 9 chicks hatching!
              <br />
              We'll use 5 fingers on one hand and 4 on the other.
            </p>
            <Button
              onClick={() => setShowGame(true)}
              className="bg-orange-600 hover:bg-orange-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 border-b-8 border-orange-800"
            >
              Start! 🐣
            </Button>
            <p className="text-sm text-orange-400 font-bold uppercase tracking-widest pt-4 font-nunito">Topic E: Zero and 9</p>
          </Card>
        ) : (
          <div className="space-y-6">
            {currentStep !== 'complete' && (
              <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-bottom-8">
                <h3 className="text-4xl text-orange-700 uppercase tracking-widest">
                  {currentStep === 'nest1' ? "Hatch 5 Chicks!" : "Hatch 4 More!"}
                </h3>

                <div className="flex justify-center gap-12 py-12 bg-orange-100/30 rounded-[3rem] border-8 border-white shadow-inner min-h-[350px] items-end px-8 relative overflow-hidden">
                  {/* Left Hand / Nest 1 */}
                  <div className="flex gap-2 p-6 bg-white/50 rounded-3xl border-4 border-white shadow-lg relative">
                    <div className="absolute -top-8 left-4 text-xs font-bold text-orange-600 uppercase">Nest 1 (5)</div>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className={`w-14 h-20 rounded-t-full border-4 border-white shadow-lg flex items-center justify-center text-3xl transition-all ${i < hatched ? 'bg-yellow-400 -translate-y-4' : 'bg-stone-300 opacity-40'}`}>
                        {i < hatched ? '🐤' : '🥚'}
                      </div>
                    ))}
                  </div>

                  {/* Right Hand / Nest 2 */}
                  <div className="flex gap-2 p-6 bg-white/50 rounded-3xl border-4 border-white shadow-lg relative">
                    <div className="absolute -top-8 left-4 text-xs font-bold text-red-600 uppercase">Nest 2 (4)</div>
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i + 5} className={`w-14 h-20 rounded-t-full border-4 border-white shadow-lg flex items-center justify-center text-3xl transition-all ${i < hatched - 5 ? 'bg-yellow-400 -translate-y-4' : 'bg-stone-300 opacity-40'}`}>
                        {i < hatched - 5 ? '🐤' : '🥚'}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-orange-50 p-8 rounded-[2.5rem] border-4 border-white shadow-inner max-w-2xl mx-auto font-nunito">
                  <p className="text-4xl text-orange-800 leading-relaxed font-bold">
                    {hatched < 9 ? `Hatched: ${hatched}` : "9 Chicks! Happy Birthday!"}
                  </p>
                  <p className="text-8xl font-fredoka text-orange-600 mt-4 font-bold drop-shadow-sm">
                    {hatched}
                  </p>
                </div>

                <Button
                  onClick={hatched < 9 ? hatchEgg : () => setShowFeedback('correct')}
                  className="bg-orange-600 hover:bg-orange-700 text-white py-12 px-16 text-4xl rounded-[2rem] shadow-xl border-b-8 border-orange-800 transition-all active:scale-95"
                >
                  {hatched < 9 ? `Hatch One! 🐣` : 'Check! ✅'}
                </Button>
              </Card>
            )}

            {currentStep === 'complete' && (
              <Card className="bg-gradient-to-br from-orange-600 via-yellow-600 to-red-600 shadow-2xl rounded-[4rem] overflow-hidden p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                <div className="text-[12rem] font-black animate-bounce leading-none">9</div>
                <h2 className="text-7xl drop-shadow-xl">Chicken Master!</h2>
                <p className="text-3xl font-nunito max-w-2xl mx-auto leading-relaxed">
                  5 on one hand and 4 on the other makes 9!
                  <br />
                  You're a counting pro!
                </p>
                <div className="flex gap-4 w-full pt-8">
                  <Button onClick={resetActivity} className="h-24 flex-1 bg-white/10 hover:bg-white/20 text-white text-3xl rounded-[2rem] border-4 border-white/20">
                    Again! 🔄
                  </Button>
                  <Button onClick={() => navigate("/activities/module-3?last=3-finger-count-24")} className="h-24 flex-1 bg-white text-orange-600 hover:bg-rose-50 text-3xl rounded-[2rem] shadow-2xl">
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
                    {showFeedback === 'correct' ? 'Correct!' : 'Try Again!'}
                  </h4>
                  <Button onClick={nextStep} size="sm" className={`ml-2 rounded-xl text-lg px-4 py-2 ${showFeedback === 'correct' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}>
                    Finish! ➡️
                  </Button>
                </Card>
              </div>
            )}

            {currentStep !== 'complete' && (
              <Button onClick={() => setShowGame(false)} variant="ghost" className="text-orange-400 hover:text-orange-600 w-full py-2 font-bold font-nunito">
                ← Back to Instructions
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FingerCount24;

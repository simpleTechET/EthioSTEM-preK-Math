import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RefreshCw, Home, Star, Sparkles, Smile, Mountain, Map as MapIcon } from "lucide-react";

const CountingTo7Linear = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [currentStep, setCurrentStep] = useState<'rocks5' | 'add6' | 'rocks6' | 'add7' | 'rocks7' | 'complete'>('rocks5');
  const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const markLessonComplete = () => {
    const saved = localStorage.getItem("ethio-stem-m3-completed");
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes("3-crossing-creek-lesson-2")) {
      completed.push("3-crossing-creek-lesson-2");
      localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
    }
  };

  const nextStep = () => {
    setShowFeedback(null);
    if (currentStep === 'rocks5') setCurrentStep('add6');
    else if (currentStep === 'add6') setCurrentStep('rocks6');
    else if (currentStep === 'rocks6') setCurrentStep('add7');
    else if (currentStep === 'add7') setCurrentStep('rocks7');
    else if (currentStep === 'rocks7') {
      markLessonComplete();
      setCurrentStep('complete');
    }
  };

  const resetActivity = () => {
    setShowGame(false);
    setCurrentStep('rocks5');
    setShowFeedback(null);
  };

  const renderRocks = (count: number) => (
    <div className="flex flex-wrap justify-center gap-4 my-8 max-w-2xl mx-auto bg-blue-100/50 p-8 rounded-[3rem] border-4 border-dashed border-blue-200 shadow-inner relative overflow-hidden">
      {/* Wave pattern overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none flex justify-around items-center text-4xl">
        <span>🌊</span><span>🌊</span><span>🌊</span>
      </div>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col items-center animate-in zoom-in duration-300 relative z-10" style={{ animationDelay: `${i * 0.1}s` }}>
          <div className={`w-20 h-20 rounded-[1.5rem] flex items-center justify-center text-4xl shadow-lg border-4 border-white transform hover:scale-110 transition-transform ${i < 5 ? 'bg-gray-600' : 'bg-rose-500'} text-white`}>
            <span className="font-fredoka">🪨</span>
          </div>
          <span className="text-2xl font-bold mt-2 text-blue-900 font-fredoka">{i + 1}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white p-4 font-nunito overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=3-crossing-creek-lesson-2")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full font-fredoka">
                Lesson 2
              </span>
              <h1 className="text-2xl font-bold text-foreground font-fredoka uppercase tracking-wide">Creek Crossing!</h1>
            </div>
          </div>
        </div>

        {!showGame ? (
          <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] overflow-hidden text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700 relative">
            <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center mb-6 rotate-3 shadow-lg">
              <Mountain className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-5xl font-fredoka text-blue-900 leading-tight">Help the Explorer!</h2>
            <p className="text-2xl text-blue-800 font-nunito leading-relaxed max-w-2xl mx-auto">
              We need to cross the creek!
              <br />
              Let's count the stepping stones. We'll start with <span className="font-fredoka text-4xl text-blue-600">5</span> stones!
            </p>
            <Button
              onClick={() => setShowGame(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl font-fredoka transition-all hover:scale-105 active:scale-95 border-b-8 border-blue-800"
            >
              Start Adventure! 🏞️
            </Button>
            <p className="text-sm text-blue-400 font-bold uppercase tracking-widest pt-4">Topic A: Count up to 7</p>
          </Card>
        ) : (
          <div className="space-y-6">
            {currentStep !== 'complete' && (
              <div className="flex justify-center gap-3 mb-4">
                {['rocks5', 'add6', 'rocks6', 'add7', 'rocks7'].map((step, idx) => (
                  <div
                    key={step}
                    className={`h-3 rounded-full transition-all ${['rocks5', 'add6', 'rocks6', 'add7', 'rocks7'].indexOf(currentStep) >= idx
                      ? 'bg-blue-500 w-12 shadow-sm'
                      : 'bg-blue-100 w-3'
                      }`}
                  />
                ))}
              </div>
            )}

            {currentStep === 'rocks5' && (
              <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-bottom-8">
                <h3 className="text-4xl font-fredoka text-blue-700">Count the Stones!</h3>
                {renderRocks(5)}
                <div className="bg-blue-50 p-8 rounded-[2.5rem] border-4 border-white shadow-inner max-w-md mx-auto">
                  <p className="text-4xl font-fredoka text-blue-800">
                    We have <span className="text-6xl text-blue-600 drop-shadow-sm">5</span> stones!
                  </p>
                </div>
                <Button onClick={() => setShowFeedback('correct')} className="bg-blue-600 hover:bg-blue-700 text-white py-12 px-12 text-4xl font-fredoka rounded-[2rem] shadow-xl border-b-8 border-blue-800 transition-all active:scale-95">
                  Need More? 🥾
                </Button>
              </Card>
            )}

            {(currentStep === 'add6' || currentStep === 'add7') && (
              <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in zoom-in-95">
                <h3 className="text-4xl font-fredoka text-rose-700">Add a Stone! 💎</h3>
                {renderRocks(currentStep === 'add6' ? 5 : 6)}
                <div className="p-8 bg-rose-50 border-4 border-rose-100 rounded-[2.5rem] shadow-inner max-w-2xl mx-auto">
                  <p className="text-3xl font-fredoka text-rose-800">
                    The creek is too wide!
                    <br />
                    {currentStep === 'add6' ? '5 and 1 more is...' : '6 and 1 more is...'}
                  </p>
                </div>
                <Button
                  onClick={() => setShowFeedback('correct')}
                  className="bg-rose-500 hover:bg-rose-600 text-white py-12 px-16 text-4xl font-fredoka rounded-[2rem] shadow-xl border-b-8 border-rose-800 transition-all active:scale-95"
                >
                  Drop Stone! ➕
                </Button>
              </Card>
            )}

            {(currentStep === 'rocks6' || currentStep === 'rocks7') && (
              <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-right-8">
                <h3 className="text-4xl font-fredoka text-blue-700">Count Again!</h3>
                {renderRocks(currentStep === 'rocks6' ? 6 : 7)}
                <div className="bg-blue-50 p-8 rounded-[2.5rem] border-4 border-white shadow-inner max-w-lg mx-auto">
                  <p className="text-4xl font-fredoka text-blue-800">
                    Now we have <span className="text-6xl text-blue-600 drop-shadow-sm">{currentStep === 'rocks6' ? '6' : '7'}</span>!
                  </p>
                </div>
                <Button onClick={() => setShowFeedback('correct')} className="bg-blue-600 hover:bg-blue-700 text-white py-12 px-12 text-4xl font-fredoka rounded-[2rem] shadow-xl border-b-8 border-blue-800 transition-all active:scale-95">
                  {currentStep === 'rocks6' ? 'One More? ➡️' : 'Cross Now! 🏞️'}
                </Button>
              </Card>
            )}

            {currentStep === 'complete' && (
              <Card className="bg-gradient-to-br from-blue-600 via-cyan-600 to-emerald-600 shadow-2xl rounded-[4rem] overflow-hidden p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                <div className="text-9xl animate-bounce">🧑‍🎒</div>
                <h2 className="text-7xl font-fredoka drop-shadow-xl">Explorer Hero!</h2>
                <p className="text-3xl font-nunito max-w-2xl mx-auto leading-relaxed">
                  You helped the explorer reach home by counting <span className="font-fredoka text-5xl text-yellow-300">7</span> stones!
                  You know that 5 and 1 more is 6, and 6 and 1 more is 7.
                </p>
                <div className="flex gap-4 w-full pt-8">
                  <Button onClick={resetActivity} className="h-24 flex-1 bg-white/10 hover:bg-white/20 text-white text-3xl font-fredoka rounded-[2rem] border-4 border-white/20">
                    Again! 🔄
                  </Button>
                  <Button onClick={() => navigate("/activities/module-3?last=3-crossing-creek-lesson-2")} className="h-24 flex-1 bg-white text-blue-600 hover:bg-blue-50 text-3xl font-fredoka rounded-[2rem] shadow-2xl">
                    Yay! ✨
                  </Button>
                </div>
              </Card>
            )}

            {showFeedback && (
              <div className="fixed bottom-6 right-6 z-[100] animate-in slide-in-from-right-4 fade-in duration-300">
                <Card className={`flex items-center gap-4 px-6 py-4 shadow-2xl rounded-2xl border-4 ${showFeedback === 'correct' ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'}`}>
                  <span className="text-4xl">{showFeedback === 'correct' ? '🌟' : '🧐'}</span>
                  <div className="flex flex-col">
                    <span className={`text-2xl font-fredoka font-bold ${showFeedback === 'correct' ? 'text-green-700' : 'text-red-700'}`}>
                      {showFeedback === 'correct' ? 'Perfect!' : 'Try Again!'}
                    </span>
                  </div>
                  <Button
                    onClick={showFeedback === 'correct' ? nextStep : () => setShowFeedback(null)}
                    className={`ml-2 px-5 py-3 text-xl font-fredoka rounded-xl border-b-4 ${showFeedback === 'correct' ? 'bg-green-600 hover:bg-green-700 border-green-800 text-white' : 'bg-red-500 hover:bg-red-600 border-red-700 text-white'}`}
                  >
                    {showFeedback === 'correct' ? 'Next ➡️' : 'OK 👍'}
                  </Button>
                </Card>
              </div>
            )}

            {currentStep !== 'complete' && (
              <Button onClick={() => setShowGame(false)} variant="ghost" className="text-blue-400 hover:text-blue-600 w-full py-2 font-bold font-nunito">
                ← Back to Instructions
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CountingTo7Linear;

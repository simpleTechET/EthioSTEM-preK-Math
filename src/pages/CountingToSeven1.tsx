import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Users, Circle, Star, Sparkles, Home, RefreshCw } from "lucide-react";

const CountingTo7Intro = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [currentStep, setCurrentStep] = useState<'count5' | 'add6' | 'count6' | 'add7' | 'count7' | 'complete'>('count5');
  const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const markLessonComplete = () => {
    const saved = localStorage.getItem("ethio-stem-m3-completed");
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes("3-introduce-6-7-lesson-1")) {
      completed.push("3-introduce-6-7-lesson-1");
      localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
    }
  };

  const nextStep = () => {
    setShowFeedback(null);
    if (currentStep === 'count5') setCurrentStep('add6');
    else if (currentStep === 'add6') setCurrentStep('count6');
    else if (currentStep === 'count6') setCurrentStep('add7');
    else if (currentStep === 'add7') setCurrentStep('count7');
    else if (currentStep === 'count7') {
      markLessonComplete();
      setCurrentStep('complete');
    }
  };

  const resetActivity = () => {
    setShowGame(false);
    setCurrentStep('count5');
    setShowFeedback(null);
  };

  const renderPlayers = (count: number) => (
    <div className="flex flex-wrap justify-center gap-4 my-8 max-w-2xl mx-auto">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col items-center animate-in zoom-in duration-300" style={{ animationDelay: `${i * 0.1}s` }}>
          <div className={`w-20 h-20 rounded-[1.5rem] flex items-center justify-center text-4xl shadow-lg border-4 border-white transform hover:scale-110 transition-transform ${i < 5 ? 'bg-indigo-500 text-white' : i === 5 ? 'bg-orange-500 text-white' : 'bg-pink-500 text-white'}`}>
            <Users className="w-10 h-10" />
          </div>
          <span className="text-2xl font-bold mt-2 text-indigo-900 font-fredoka">{i + 1}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-white p-4 font-nunito overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=3-introduce-6-7-lesson-1")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full font-fredoka">
                Lesson 1
              </span>
              <h1 className="text-2xl font-bold text-foreground font-fredoka uppercase tracking-wide">Soccer Team!</h1>
            </div>
          </div>
        </div>

        {!showGame ? (
          <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] overflow-hidden text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700 relative">
            <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-indigo-500 to-blue-500 rounded-3xl flex items-center justify-center mb-6 rotate-3 shadow-lg">
              <Users className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-5xl font-fredoka text-indigo-900 leading-tight">The Big Team!</h2>
            <p className="text-2xl text-indigo-800 font-nunito leading-relaxed max-w-2xl mx-auto">
              Let's count our soccer players!
              <br />
              We'll start with <span className="font-fredoka text-4xl text-indigo-600">5</span> and see what happens when more join!
            </p>
            <Button
              onClick={() => setShowGame(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl font-fredoka transition-all hover:scale-105 active:scale-95 border-b-8 border-indigo-800"
            >
              Play! ⚽
            </Button>
            <p className="text-sm text-indigo-400 font-bold uppercase tracking-widest pt-4">Topic A: Count up to 7</p>
          </Card>
        ) : (
          <div className="space-y-6">
            {currentStep !== 'complete' && (
              <div className="flex justify-center gap-3 mb-4">
                {['count5', 'add6', 'count6', 'add7', 'count7'].map((step, idx) => (
                  <div
                    key={step}
                    className={`h-3 rounded-full transition-all ${['count5', 'add6', 'count6', 'add7', 'count7'].indexOf(currentStep) >= idx
                      ? 'bg-indigo-500 w-12 shadow-sm'
                      : 'bg-indigo-100 w-3'
                      }`}
                  />
                ))}
              </div>
            )}

            {currentStep === 'count5' && (
              <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-bottom-8">
                <h3 className="text-4xl font-fredoka text-indigo-700">Count the Team!</h3>
                {renderPlayers(5)}
                <div className="bg-indigo-50 p-8 rounded-[2.5rem] border-4 border-white shadow-inner max-w-md mx-auto">
                  <p className="text-4xl font-fredoka text-indigo-800">
                    We have <span className="text-6xl text-indigo-600 drop-shadow-sm">5</span> players!
                  </p>
                </div>
                <Button onClick={nextStep} className="bg-indigo-600 hover:bg-indigo-700 text-white py-12 px-12 text-4xl font-fredoka rounded-[2rem] shadow-xl border-b-8 border-indigo-800 transition-all active:scale-95">
                  Ready for More? ➡️
                </Button>
              </Card>
            )}

            {(currentStep === 'add6' || currentStep === 'add7') && (
              <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in zoom-in-95">
                <h3 className="text-4xl font-fredoka text-orange-700">A New Friend! 🤩</h3>
                {renderPlayers(currentStep === 'add6' ? 5 : 6)}
                <div className="p-8 bg-orange-50 border-4 border-orange-100 rounded-[2.5rem] shadow-inner max-w-2xl mx-auto">
                  <p className="text-3xl font-fredoka text-orange-800">
                    {currentStep === 'add6' ? '5 and 1 more is...' : '6 and 1 more is...'}
                  </p>
                </div>
                <Button
                  onClick={nextStep}
                  className="bg-orange-500 hover:bg-orange-600 text-white py-12 px-16 text-4xl font-fredoka rounded-[2rem] shadow-xl border-b-8 border-orange-800 transition-all active:scale-95"
                >
                  Add Player! ➕
                </Button>
              </Card>
            )}

            {(currentStep === 'count6' || currentStep === 'count7') && (
              <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-right-8">
                <h3 className="text-4xl font-fredoka text-indigo-700">Count Again!</h3>
                {renderPlayers(currentStep === 'count6' ? 6 : 7)}
                <div className="bg-indigo-50 p-8 rounded-[2.5rem] border-4 border-white shadow-inner max-w-lg mx-auto">
                  <p className="text-4xl font-fredoka text-indigo-800">
                    Now we have <span className="text-6xl text-indigo-600 drop-shadow-sm">{currentStep === 'count6' ? '6' : '7'}</span>!
                  </p>
                </div>
                <Button onClick={nextStep} className="bg-indigo-600 hover:bg-indigo-700 text-white py-12 px-12 text-4xl font-fredoka rounded-[2rem] shadow-xl border-b-8 border-indigo-800 transition-all active:scale-95">
                  Keep Going! ➡️
                </Button>
              </Card>
            )}

            {currentStep === 'complete' && (
              <Card className="bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600 shadow-2xl rounded-[4rem] overflow-hidden p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                <div className="text-9xl animate-bounce">🏆</div>
                <h2 className="text-7xl font-fredoka drop-shadow-xl">Team Manager!</h2>
                <p className="text-3xl font-nunito max-w-2xl mx-auto leading-relaxed">
                  You can count all the way to <span className="font-fredoka text-5xl text-yellow-300">7</span>!
                  You know that 5 and 1 more is 6, and 6 and 1 more is 7.
                </p>
                <div className="flex gap-4 w-full pt-8">
                  <Button onClick={resetActivity} className="h-24 flex-1 bg-white/10 hover:bg-white/20 text-white text-3xl font-fredoka rounded-[2rem] border-4 border-white/20">
                    Again! 🔄
                  </Button>
                  <Button onClick={() => navigate("/activities/module-3?last=3-introduce-6-7-lesson-1")} className="h-24 flex-1 bg-white text-indigo-600 hover:bg-indigo-50 text-3xl font-fredoka rounded-[2rem] shadow-2xl">
                    Yay! ✨
                  </Button>
                </div>
              </Card>
            )}

            {showFeedback && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-md animate-in fade-in duration-300">
                <Card className={`max-w-md w-full p-12 text-center shadow-[0_0_50px_rgba(0,0,0,0.3)] rounded-[4rem] border-8 animate-in zoom-in duration-300 ${showFeedback === 'correct' ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
                  }`}>
                  <div className="text-9xl mb-8">
                    {showFeedback === 'correct' ? '🌟' : '🧐'}
                  </div>
                  <h4 className={`text-6xl font-fredoka mb-8 ${showFeedback === 'correct' ? 'text-green-700' : 'text-red-700'
                    }`}>
                    {showFeedback === 'correct' ? 'Great!' : 'Try Again!'}
                  </h4>
                  <Button
                    onClick={showFeedback === 'correct' ? nextStep : () => setShowFeedback(null)}
                    className={`w-full py-12 text-4xl font-fredoka rounded-[2rem] shadow-xl border-b-8 ${showFeedback === 'correct' ? 'bg-green-600 hover:bg-green-700 border-green-800 text-white' : 'bg-red-600 hover:bg-red-700 border-red-800 text-white'
                      }`}
                  >
                    {showFeedback === 'correct' ? 'Next! ➡️' : 'OK! 👍'}
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

export default CountingTo7Intro;

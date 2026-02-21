import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RefreshCw, Home, Star, Sparkles, Smile, Eye, Waves } from "lucide-react";

const Introduce8Lesson12 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [currentStep, setCurrentStep] = useState<'count7' | 'reveal' | 'count8' | 'complete'>('count7');
  const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const markLessonComplete = () => {
    const saved = localStorage.getItem("ethio-stem-m3-completed");
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes("3-introduce-8-12")) {
      completed.push("3-introduce-8-12");
      localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
    }
  };

  const nextStep = () => {
    setShowFeedback(null);
    if (currentStep === 'count7') setCurrentStep('reveal');
    else if (currentStep === 'reveal') setCurrentStep('count8');
    else if (currentStep === 'count8') {
      markLessonComplete();
      setCurrentStep('complete');
    }
  };

  const resetActivity = () => {
    setShowGame(false);
    setCurrentStep('count7');
    setShowFeedback(null);
  };

  const renderOctopus = (visibleCount: number, highlighting8: boolean = false) => {
    const radius = 100;
    return (
      <div className="relative w-full max-w-md mx-auto h-[400px] flex items-center justify-center bg-blue-100/30 rounded-[4rem] border-8 border-white shadow-inner mb-8 overflow-hidden group">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <Waves className="w-full h-full text-blue-400" />
        </div>

        {/* Octopus Body */}
        <div className="absolute z-20 w-32 h-32 bg-purple-500 rounded-full border-4 border-white shadow-xl flex flex-col items-center justify-center">
          <div className="flex gap-4 mb-2">
            <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-black rounded-full" />
            </div>
            <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-black rounded-full" />
            </div>
          </div>
          <div className="w-8 h-4 bg-purple-600 rounded-full" />
        </div>

        {Array.from({ length: 8 }).map((_, i) => {
          const isVisible = i < visibleCount;
          const is8th = i === 7;
          const angle = (i * 360) / 8 - 90;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;

          if (!isVisible && !highlighting8) return null;

          return (
            <div
              key={i}
              className={`absolute flex flex-col items-center animate-in zoom-in duration-500 ${!isVisible ? 'opacity-20 grayscale scale-75' : ''}`}
              style={{
                left: `calc(50% + ${x * 1.4}px)`,
                top: `calc(50% + ${y * 1.4}px)`,
                transform: 'translate(-50%, -50%)',
                animationDelay: `${i * 0.1}s`
              }}
            >
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shadow-lg border-4 border-white ${is8th ? 'bg-amber-400' : 'bg-purple-400'} text-white`}>
                {is8th && !isVisible ? '?' : '🐙'}
              </div>
              {isVisible && (
                <span className={`text-3xl font-bold mt-2 font-fredoka drop-shadow-sm ${is8th ? 'text-amber-600' : 'text-purple-600'}`}>
                  {i + 1}
                </span>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-white p-4 font-fredoka overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=3-introduce-8-12")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
            <ArrowLeft className="w-5 h-5 text-purple-600" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-purple-600 bg-purple-100 px-3 py-1 rounded-full uppercase tracking-widest font-nunito">
                Lesson 12
              </span>
              <h1 className="text-2xl font-bold text-purple-900 uppercase">Super 8!</h1>
            </div>
          </div>
        </div>

        {!showGame ? (
          <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] overflow-hidden text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700 relative">
            <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-purple-500 to-indigo-500 rounded-3xl flex items-center justify-center mb-6 rotate-3 shadow-lg">
              <span className="text-5xl text-white">🐙</span>
            </div>
            <h2 className="text-5xl text-purple-900 leading-tight">Meet Ollie Octopus!</h2>
            <p className="text-2xl text-purple-800 font-nunito leading-relaxed max-w-2xl mx-auto">
              Ollie has many arms. Let's count them!
              <br />
              We'll find a brand new number hiding in the ocean.
            </p>
            <Button
              onClick={() => setShowGame(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 border-b-8 border-purple-800"
            >
              Play! 🌊
            </Button>
            <p className="text-sm text-purple-400 font-bold uppercase tracking-widest pt-4 font-nunito">Topic C: How Many with 8 Objects</p>
          </Card>
        ) : (
          <div className="space-y-6">
            {currentStep !== 'complete' && (
              <div className="flex justify-center gap-3 mb-4">
                {['count7', 'reveal', 'count8'].map((step, idx) => (
                  <div
                    key={step}
                    className={`h-3 rounded-full transition-all ${['count7', 'reveal', 'count8'].indexOf(currentStep) >= idx
                      ? 'bg-purple-500 w-12 shadow-sm'
                      : 'bg-purple-100 w-3'
                      }`}
                  />
                ))}
              </div>
            )}

            {currentStep !== 'complete' && (
              <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-8 animate-in slide-in-from-bottom-8">
                <h3 className="text-4xl text-purple-700">
                  {currentStep === 'count7' ? "How many arms can you see?" :
                    currentStep === 'reveal' ? "Wait! One more is hiding..." :
                      "Seven and One more is EIGHT!"}
                </h3>

                {renderOctopus(currentStep === 'count7' ? 7 : 8, currentStep === 'reveal')}

                <div className="bg-purple-50 p-8 rounded-[2.5rem] border-4 border-white shadow-inner max-w-2xl mx-auto font-nunito">
                  <p className="text-4xl text-purple-800 leading-relaxed">
                    {currentStep === 'count7' ? "I see 7 arms!" :
                      currentStep === 'reveal' ? "Tap to find the hidden arm!" :
                        "We counted all the way to 8!"}
                  </p>
                  {currentStep === 'count8' && (
                    <p className="text-8xl font-fredoka text-amber-600 animate-bounce mt-4 font-bold drop-shadow-md">8</p>
                  )}
                </div>

                <Button
                  onClick={() => setShowFeedback('correct')}
                  className={`${currentStep === 'reveal' ? 'bg-amber-500 hover:bg-amber-600 border-amber-800' : 'bg-purple-600 hover:bg-purple-700 border-purple-800'} text-white py-12 px-16 text-4xl rounded-[2rem] shadow-xl border-b-8 transition-all active:scale-95`}
                >
                  {currentStep === 'reveal' ? 'Find it! 🔍' : 'Check! ✅'}
                </Button>
              </Card>
            )}

            {currentStep === 'complete' && (
              <Card className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 shadow-2xl rounded-[4rem] overflow-hidden p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                <div className="text-9xl animate-bounce">🐙</div>
                <h2 className="text-7xl drop-shadow-xl">Number 8 Star!</h2>
                <p className="text-3xl font-nunito max-w-2xl mx-auto leading-relaxed">
                  You discovered the number 8 with Ollie!
                  <br />
                  Remember: 7 and 1 more is always 8!
                </p>
                <div className="flex gap-4 w-full pt-8">
                  <Button onClick={resetActivity} className="h-24 flex-1 bg-white/10 hover:bg-white/20 text-white text-3xl rounded-[2rem] border-4 border-white/20">
                    Again! 🔄
                  </Button>
                  <Button onClick={() => navigate("/activities/module-3?last=3-introduce-8-12")} className="h-24 flex-1 bg-white text-purple-600 hover:bg-purple-50 text-3xl rounded-[2rem] shadow-2xl">
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
                    {showFeedback === 'correct' ? 'Correct!' : 'Try Again!'}
                  </h4>
                  <Button onClick={showFeedback === 'correct' ? nextStep : () => setShowFeedback(null)} size="sm" className={`ml-2 rounded-xl text-lg px-4 py-2 ${showFeedback === 'correct' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}>
                    {showFeedback === 'correct' ? 'Next! ➡️' : 'OK! 👍'}
                  </Button>
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

export default Introduce8Lesson12;

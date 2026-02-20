import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RefreshCw, Home, Star, Sparkles, Smile, Bird, Bus } from "lucide-react";

const Compose9Lesson26 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [currentStep, setCurrentStep] = useState<'flaps' | 'bus' | 'complete'>('flaps');
  const [flaps, setFlaps] = useState(0);
  const [busGroups, setBusGroups] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const markLessonComplete = () => {
    const saved = localStorage.getItem("ethio-stem-m3-completed");
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes("3-compose-9-26")) {
      completed.push("3-compose-9-26");
      localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
    }
  };

  const handleFlap = () => {
    if (flaps < 9) {
      setFlaps(prev => prev + 1);
      if (flaps === 8) setShowFeedback('correct');
    }
  };

  const handleBusGroup = () => {
    if (busGroups < 3) {
      setBusGroups(prev => prev + 1);
      if (busGroups === 2) setShowFeedback('correct');
    }
  };

  const nextStep = () => {
    setShowFeedback(null);
    if (currentStep === 'flaps') {
      setCurrentStep('bus');
    } else {
      markLessonComplete();
      setCurrentStep('complete');
    }
  };

  const resetActivity = () => {
    setShowGame(false);
    setCurrentStep('flaps');
    setFlaps(0);
    setBusGroups(0);
    setShowFeedback(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-white p-4 font-fredoka overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=3-compose-9-26")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
            <ArrowLeft className="w-5 h-5 text-blue-600" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full uppercase tracking-widest font-nunito">
                Lesson 26
              </span>
              <h1 className="text-2xl font-bold text-blue-900 uppercase">Partners of 9!</h1>
            </div>
          </div>
        </div>

        {!showGame ? (
          <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] overflow-hidden text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700 relative">
            <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center mb-6 rotate-3 shadow-lg">
              <Bird className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-5xl text-blue-900 leading-tight">Bird Wings & Bus Rows!</h2>
            <p className="text-2xl text-blue-800 font-nunito leading-relaxed max-w-2xl mx-auto">
              Flap like a bird and fill up the bus!
              <br />
              We're going to find all the ways to make 9.
            </p>
            <Button
              onClick={() => setShowGame(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 border-b-8 border-blue-800"
            >
              Play! 🐦
            </Button>
            <p className="text-sm text-blue-400 font-bold uppercase tracking-widest pt-4 font-nunito">Topic F: Matching Numeral to 9</p>
          </Card>
        ) : (
          <div className="space-y-6">
            {currentStep !== 'complete' && (
              <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-bottom-8">
                <h3 className="text-4xl text-blue-700 uppercase tracking-widest">
                  {currentStep === 'flaps' ? "Flap your wings 9 times!" : "Invite 3 groups of 3!"}
                </h3>

                <div className="flex justify-center items-center py-12 bg-blue-100/30 rounded-[3rem] border-8 border-white shadow-inner min-h-[400px] relative overflow-hidden">
                  {currentStep === 'flaps' ? (
                    <div className="flex flex-col items-center">
                      <div className={`text-[12rem] transition-all duration-300 ${flaps % 2 === 0 ? '-rotate-12 translate-y-2' : 'rotate-12 -translate-y-2'}`}>🐦</div>
                      <div className="flex gap-2 mt-8">
                        {Array.from({ length: 9 }).map((_, i) => (
                          <div key={i} className={`w-8 h-8 rounded-full border-2 border-white shadow-sm ${i < flaps ? 'bg-blue-500' : 'bg-white/30'}`} />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-8 w-full px-12">
                      <Bus className="w-24 h-24 text-blue-400 mx-auto opacity-30 absolute top-4 left-4" />
                      <div className="space-y-4">
                        {Array.from({ length: 3 }).map((_, gi) => (
                          <div key={gi} className={`flex gap-4 justify-center p-4 rounded-2xl border-4 transition-all ${gi < busGroups ? 'bg-white border-blue-200' : 'bg-white/20 border-dashed border-blue-100 opacity-50'}`}>
                            {Array.from({ length: 3 }).map((_, fi) => (
                              <div key={fi} className="text-4xl">🧒</div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-blue-50 p-8 rounded-[2.5rem] border-4 border-white shadow-inner max-w-2xl mx-auto font-nunito">
                  <p className="text-4xl text-blue-800 leading-relaxed font-bold">
                    {currentStep === 'flaps' ? `Flaps: ${flaps}` : `Rows of 3: ${busGroups}`}
                  </p>
                  <p className="text-8xl font-fredoka text-blue-600 mt-4 font-bold drop-shadow-sm">
                    {currentStep === 'flaps' ? flaps : busGroups * 3}
                  </p>
                </div>

                <Button
                  onClick={currentStep === 'flaps' ? handleFlap : handleBusGroup}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-12 px-16 text-4xl rounded-[2rem] shadow-xl border-b-8 border-blue-800 transition-all active:scale-95"
                >
                  {currentStep === 'flaps' ? `Flap! 🐦` : `Next Group! 🧒`}
                </Button>
              </Card>
            )}

            {currentStep === 'complete' && (
              <Card className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 shadow-2xl rounded-[4rem] overflow-hidden p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                <div className="text-[12rem] font-black animate-bounce leading-none">9</div>
                <h2 className="text-7xl drop-shadow-xl">Nine Partner!</h2>
                <p className="text-3xl font-nunito max-w-2xl mx-auto leading-relaxed">
                  3 groups of 3 make 9 on the bus!
                  <br />
                  And 9 flaps take you high in the sky!
                </p>
                <div className="flex gap-4 w-full pt-8">
                  <Button onClick={resetActivity} className="h-24 flex-1 bg-white/10 hover:bg-white/20 text-white text-3xl rounded-[2rem] border-4 border-white/20">
                    Again! 🔄
                  </Button>
                  <Button onClick={() => navigate("/activities/module-3?last=3-compose-9-26")} className="h-24 flex-1 bg-white text-blue-600 hover:bg-rose-50 text-3xl rounded-[2rem] shadow-2xl">
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
                    {showFeedback === 'correct' ? (currentStep === 'flaps' ? '9!' : 'Perfect!') : 'Try Again!'}
                  </h4>
                  <Button onClick={nextStep} size="sm" className={`ml-2 rounded-xl text-lg px-4 py-2 ${showFeedback === 'correct' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}>
                    {currentStep === 'flaps' ? 'Next! ➡️' : 'Finish! ➡️'}
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

export default Compose9Lesson26;

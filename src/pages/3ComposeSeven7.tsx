import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RefreshCw, Home, Star, Sparkles, Smile, Boxes, Puzzle } from "lucide-react";

const ComposeSevenLesson = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [currentStep, setCurrentStep] = useState<'build' | 'celebrate'>('build');
  const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [partnerIdx, setPartnerIdx] = useState(0);

  const partners = [
    { left: 6, right: 1, leftColor: 'bg-blue-500', rightColor: 'bg-rose-500' },
    { left: 5, right: 2, leftColor: 'bg-emerald-500', rightColor: 'bg-amber-500' },
    { left: 4, right: 3, leftColor: 'bg-indigo-500', rightColor: 'bg-orange-500' }
  ];

  const markLessonComplete = () => {
    const saved = localStorage.getItem("ethio-stem-m3-completed");
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes("3-compose-seven-7")) {
      completed.push("3-compose-seven-7");
      localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
    }
  };

  const nextStep = () => {
    setShowFeedback(null);
    if (partnerIdx < partners.length - 1) {
      setPartnerIdx(prev => prev + 1);
    } else {
      markLessonComplete();
      setCurrentStep('celebrate');
    }
  };

  const resetActivity = () => {
    setShowGame(false);
    setCurrentStep('build');
    setPartnerIdx(0);
    setShowFeedback(null);
  };

  const currentPartner = partners[partnerIdx];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-white p-4 font-fredoka overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=3-compose-seven-7")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
            <ArrowLeft className="w-5 h-5 text-violet-600" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-violet-600 bg-violet-100 px-3 py-1 rounded-full uppercase tracking-widest">
                Lesson 7
              </span>
              <h1 className="text-2xl font-bold text-violet-900 uppercase">Building 7!</h1>
            </div>
          </div>
        </div>

        {!showGame ? (
          <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] overflow-hidden text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700 relative">
            <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-violet-500 to-purple-500 rounded-3xl flex items-center justify-center mb-6 rotate-3 shadow-lg">
              <Puzzle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-5xl text-violet-900 leading-tight">Partners of 7!</h2>
            <p className="text-2xl text-violet-800 font-nunito leading-relaxed max-w-2xl mx-auto">
              Let's find all the different ways to build 7!
              <br />
              We'll use colorful blocks to find our partners!
            </p>
            <Button
              onClick={() => setShowGame(true)}
              className="bg-violet-600 hover:bg-violet-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 border-b-8 border-violet-800"
            >
              Play! 🧱
            </Button>
            <p className="text-sm text-violet-400 font-bold uppercase tracking-widest pt-4 font-nunito">Topic B: Numeral Matching to 7</p>
          </Card>
        ) : (
          <div className="space-y-6">
            {currentStep !== 'celebrate' && (
              <div className="flex justify-center gap-3 mb-4">
                {partners.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-3 rounded-full transition-all ${partnerIdx >= idx
                      ? 'bg-violet-500 w-12 shadow-sm'
                      : 'bg-violet-100 w-3'
                      }`}
                  />
                ))}
              </div>
            )}

            {currentStep === 'build' && (
              <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-bottom-8">
                <h3 className="text-4xl text-violet-700">Can you see 7?</h3>

                <div className="flex flex-col items-center gap-8">
                  <div className="flex gap-2 p-8 bg-violet-50 rounded-[3rem] border-4 border-white shadow-inner flex-wrap justify-center">
                    {/* Left group */}
                    <div className="flex gap-1">
                      {Array.from({ length: currentPartner.left }).map((_, i) => (
                        <div key={`L-${i}`} className={`w-14 h-14 rounded-xl border-4 border-white shadow-md ${currentPartner.leftColor}`} />
                      ))}
                    </div>
                    <div className="w-1 px-4 self-stretch flex items-center">
                      <span className="text-3xl font-bold text-violet-300 font-nunito">+</span>
                    </div>
                    {/* Right group */}
                    <div className="flex gap-1">
                      {Array.from({ length: currentPartner.right }).map((_, i) => (
                        <div key={`R-${i}`} className={`w-14 h-14 rounded-xl border-4 border-white shadow-md ${currentPartner.rightColor}`} />
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-[2.5rem] border-4 border-violet-100 shadow-sm max-w-xl">
                    <p className="text-4xl text-violet-800 leading-relaxed font-nunito">
                      We have <span className="font-fredoka text-5xl text-violet-600">{currentPartner.left}</span> and <span className="font-fredoka text-5xl text-violet-600">{currentPartner.right}</span>...
                      <br />
                      <span className="font-fredoka text-6xl text-violet-900 block mt-4">That makes 7!</span>
                    </p>
                  </div>
                </div>

                <Button onClick={() => setShowFeedback('correct')} className="bg-violet-600 hover:bg-violet-700 text-white py-12 px-16 text-4xl rounded-[2rem] shadow-xl border-b-8 border-violet-800 transition-all active:scale-95">
                  Matches 7? ✅
                </Button>
              </Card>
            )}

            {currentStep === 'celebrate' && (
              <Card className="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 shadow-2xl rounded-[4rem] overflow-hidden p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                <div className="text-9xl animate-bounce">🏆</div>
                <h2 className="text-7xl drop-shadow-xl">Partner Star!</h2>
                <p className="text-3xl font-nunito max-w-2xl mx-auto leading-relaxed">
                  You found all the partners of <span className="font-fredoka text-5xl text-yellow-300">7</span>!
                  You are becoming a master of numbers!
                </p>
                <div className="flex gap-4 w-full pt-8">
                  <Button onClick={resetActivity} className="h-24 flex-1 bg-white/10 hover:bg-white/20 text-white text-3xl rounded-[2rem] border-4 border-white/20">
                    Again! 🔄
                  </Button>
                  <Button onClick={() => navigate("/activities/module-3?last=3-compose-seven-7")} className="h-24 flex-1 bg-white text-violet-600 hover:bg-violet-50 text-3xl rounded-[2rem] shadow-2xl">
                    Next! ✨
                  </Button>
                </div>
              </Card>
            )}

            {showFeedback && (
              <div className="fixed bottom-6 right-6 z-[100] animate-in slide-in-from-right-4 fade-in duration-300">
                <Card className={`flex items-center gap-4 px-6 py-4 shadow-2xl rounded-2xl border-4 ${showFeedback === 'correct' ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'}`}>
                  <span className="text-4xl">{showFeedback === 'correct' ? '🌟' : '🧐'}</span>
                  <h4 className={`text-2xl font-fredoka ${showFeedback === 'correct' ? 'text-green-700' : 'text-red-700'}`}>
                    {showFeedback === 'correct' ? 'Perfect!' : 'Try Again!'}
                  </h4>
                  <Button onClick={showFeedback === 'correct' ? nextStep : () => setShowFeedback(null)} size="sm" className={`ml-2 rounded-xl text-lg px-4 py-2 ${showFeedback === 'correct' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}>
                    {showFeedback === 'correct' ? 'Next! ➡️' : 'OK! 👍'}
                  </Button>
                </Card>
              </div>
            )}

            {currentStep !== 'celebrate' && (
              <Button onClick={() => setShowGame(false)} variant="ghost" className="text-violet-400 hover:text-violet-600 w-full py-2 font-bold font-nunito">
                ← Back to Instructions
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComposeSevenLesson;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Fish, Waves } from "lucide-react";

const speakNumber = (num: number) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(num.toString());
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);
  }
};

const CountOut11 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [currentStep, setCurrentStep] = useState<'feed6' | 'feed7' | 'complete'>('feed6');
  const [clickedCount, setClickedCount] = useState(0);

  const targetCount = currentStep === 'feed6' ? 6 : 7;

  const markLessonComplete = () => {
    const saved = localStorage.getItem("ethio-stem-m3-completed");
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes("3-count-out-11")) {
      completed.push("3-count-out-11");
      localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
    }
  };

  const handleFishClick = (index: number) => {
    if (index === clickedCount && clickedCount < targetCount) {
      const next = clickedCount + 1;
      setClickedCount(next);
      speakNumber(next);
    }
  };

  useEffect(() => {
    if (clickedCount === targetCount && clickedCount > 0) {
      const timer = setTimeout(() => {
        if (currentStep === 'feed6') {
          setCurrentStep('feed7');
          setClickedCount(0);
        } else {
          markLessonComplete();
          setCurrentStep('complete');
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [clickedCount, targetCount, currentStep]);

  const resetActivity = () => {
    setShowGame(false);
    setCurrentStep('feed6');
    setClickedCount(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-white p-4 font-fredoka overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=3-count-out-11")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
            <ArrowLeft className="w-5 h-5 text-cyan-600" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-cyan-600 bg-cyan-100 px-3 py-1 rounded-full uppercase tracking-widest font-nunito">
                Lesson 11
              </span>
              <h1 className="text-2xl font-bold text-cyan-900 uppercase">Count Out!</h1>
            </div>
          </div>
        </div>

        {!showGame ? (
          <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] overflow-hidden text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700 relative">
            <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-cyan-500 to-blue-500 rounded-3xl flex items-center justify-center mb-6 rotate-3 shadow-lg">
              <Fish className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-5xl text-cyan-900 leading-tight">Feed the Animals!</h2>
            <p className="text-2xl text-cyan-800 font-nunito leading-relaxed max-w-2xl mx-auto">
              The dolphins and seals are hungry!
              <br />
              Tap each fish to count them out!
            </p>
            <Button
              onClick={() => setShowGame(true)}
              className="bg-cyan-600 hover:bg-cyan-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 border-b-8 border-cyan-800"
            >
              Play! 🐬
            </Button>
            <p className="text-sm text-cyan-400 font-bold uppercase tracking-widest pt-4 font-nunito">Topic B: Numeral Matching to 7</p>
          </Card>
        ) : (
          <div className="space-y-6">
            {currentStep !== 'complete' && (
              <div className="flex justify-center gap-3 mb-4">
                {['feed6', 'feed7'].map((step, idx) => (
                  <div
                    key={step}
                    className={`h-3 rounded-full transition-all ${['feed6', 'feed7'].indexOf(currentStep) >= idx
                      ? 'bg-cyan-500 w-12 shadow-sm'
                      : 'bg-cyan-100 w-3'
                      }`}
                  />
                ))}
              </div>
            )}

            {currentStep !== 'complete' && (
              <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-bottom-8">
                <h3 className="text-4xl text-cyan-700">
                  {currentStep === 'feed6' ? 'Tap 6 fish for the dolphin! 🐬' : 'Tap 7 fish for the seal! 🦭'}
                </h3>

                <div className="flex flex-wrap justify-center gap-6 my-8 py-12 bg-cyan-100/30 rounded-[4rem] border-8 border-white shadow-inner relative overflow-hidden max-w-3xl mx-auto">
                  <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <Waves className="w-full h-full text-cyan-400" />
                  </div>
                  {Array.from({ length: targetCount }).map((_, i) => {
                    const isClicked = i < clickedCount;
                    const isNext = i === clickedCount;
                    return (
                      <div
                        key={i}
                        onClick={() => handleFishClick(i)}
                        className={`flex flex-col items-center relative z-10 cursor-pointer transition-all duration-300 ${isClicked ? 'scale-100' : isNext ? 'animate-pulse hover:scale-110' : 'opacity-40 grayscale'}`}
                      >
                        <div className={`w-24 h-24 rounded-full flex items-center justify-center text-5xl shadow-lg border-4 border-white transform transition-transform ${isClicked ? (i < 5 ? 'bg-blue-500 ring-4 ring-yellow-300' : 'bg-orange-500 ring-4 ring-yellow-300') : 'bg-white'} text-white`}>
                          <Fish className="w-12 h-12" />
                        </div>
                        {isClicked && (
                          <span className="text-3xl font-bold mt-3 text-cyan-900 font-fredoka drop-shadow-sm">{i + 1}</span>
                        )}
                        {isNext && !isClicked && (
                          <span className="text-xs font-bold mt-2 text-cyan-400 animate-pulse">Tap!</span>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="bg-cyan-50 p-8 rounded-[2.5rem] border-4 border-white shadow-inner max-w-2xl mx-auto font-nunito">
                  <p className="text-4xl text-cyan-800 leading-relaxed font-bold">
                    {clickedCount === targetCount ? `You counted ${targetCount}! 🎉` : `Fish counted: ${clickedCount} / ${targetCount}`}
                  </p>
                  <p className="text-7xl font-fredoka text-cyan-600 drop-shadow-sm mt-4">{clickedCount}</p>
                </div>
              </Card>
            )}

            {currentStep === 'complete' && (
              <Card className="bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-600 shadow-2xl rounded-[4rem] overflow-hidden p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                <div className="text-9xl animate-bounce">🐬</div>
                <h2 className="text-7xl drop-shadow-xl">Aquarium Star!</h2>
                <p className="text-3xl font-nunito max-w-2xl mx-auto leading-relaxed">
                  You are a great helper!
                  <br />
                  You can count out exactly how many objects you need.
                </p>
                <div className="flex gap-4 w-full pt-8">
                  <Button onClick={resetActivity} className="h-24 flex-1 bg-white/10 hover:bg-white/20 text-white text-3xl rounded-[2rem] border-4 border-white/20">
                    Again! 🔄
                  </Button>
                  <Button onClick={() => navigate("/activities/module-3?last=3-count-out-11")} className="h-24 flex-1 bg-white text-cyan-600 hover:bg-cyan-50 text-3xl rounded-[2rem] shadow-2xl">
                    Yay! ✨
                  </Button>
                </div>
              </Card>
            )}

            {currentStep !== 'complete' && (
              <Button onClick={() => setShowGame(false)} variant="ghost" className="text-cyan-400 hover:text-cyan-600 w-full py-2 font-bold font-nunito">
                ← Back to Instructions
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CountOut11;

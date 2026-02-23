import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const speakNumber = (num: number) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(num.toString());
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);
  }
};

const FingerCount14 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [hatched, setHatched] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const markLessonComplete = () => {
    const saved = localStorage.getItem("ethio-stem-m3-completed");
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes("3-finger-count-14")) {
      completed.push("3-finger-count-14");
      localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
    }
  };

  const handleEggClick = (index: number) => {
    if (index === hatched && hatched < 8) {
      const next = hatched + 1;
      setHatched(next);
      speakNumber(next);
    }
  };

  useEffect(() => {
    if (hatched === 8) {
      const timer = setTimeout(() => {
        markLessonComplete();
        setIsComplete(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [hatched]);

  const resetActivity = () => {
    setShowGame(false);
    setHatched(0);
    setIsComplete(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-white p-4 font-fredoka overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=3-finger-count-14")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
            <ArrowLeft className="w-5 h-5 text-amber-600" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-amber-600 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-widest font-nunito">
                Lesson 14
              </span>
              <h1 className="text-2xl font-bold text-amber-900 uppercase">Finger Chicks!</h1>
            </div>
          </div>
        </div>

        {!showGame ? (
          <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] overflow-hidden text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700 relative">
            <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-yellow-500 to-orange-500 rounded-3xl flex items-center justify-center mb-6 rotate-3 shadow-lg">
              <span className="text-5xl text-white">🐣</span>
            </div>
            <h2 className="text-5xl text-amber-900 leading-tight">Hatch the Fingers!</h2>
            <p className="text-2xl text-amber-800 font-nunito leading-relaxed max-w-2xl mx-auto">
              Pretend your fingers are chicks in nests.
              <br />
              Tap each egg to hatch them — 5 in one nest, 3 more in the other!
            </p>
            <Button
              onClick={() => setShowGame(true)}
              className="bg-amber-600 hover:bg-amber-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 border-b-8 border-amber-800"
            >
              Play! 🐥
            </Button>
            <p className="text-sm text-amber-400 font-bold uppercase tracking-widest pt-4 font-nunito">Topic C: How Many with 8 Objects</p>
          </Card>
        ) : (
          <div className="space-y-6">
            {!isComplete && (
              <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-bottom-8">
                <h3 className="text-4xl text-amber-700">
                  {hatched < 5 ? "Hatch Nest 1!" : "Hatch Nest 2!"}
                </h3>

                <div className="flex justify-center gap-12 py-12 bg-yellow-100/30 rounded-[4rem] border-8 border-white shadow-inner max-w-4xl mx-auto items-end px-12 overflow-hidden">
                  {/* Nest 1 */}
                  <div className={`flex flex-col items-center gap-4 transition-all duration-500 ${hatched >= 5 ? 'opacity-50 scale-90' : 'scale-110'}`}>
                    <div className="flex gap-3 items-end h-48">
                      {[0, 1, 2, 3, 4].map((i) => {
                        const isHatched = i < hatched;
                        const isNext = i === hatched && hatched < 5;
                        return (
                          <div key={i} onClick={() => handleEggClick(i)} className="flex flex-col items-center cursor-pointer">
                            <div className={`w-14 h-32 rounded-t-full border-4 border-white shadow-lg transition-all duration-300 flex flex-col items-center justify-center gap-1 ${isHatched ? 'bg-yellow-400' : isNext ? 'bg-yellow-200 animate-pulse hover:scale-110' : 'bg-yellow-200 opacity-40'}`}>
                              {isHatched ? (
                                <>
                                  <span className="text-3xl animate-bounce">🐥</span>
                                  <span className="text-xl font-bold text-amber-900">{i + 1}</span>
                                </>
                              ) : (
                                <span className="text-2xl">{isNext ? '👆' : '🥚'}</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="text-5xl">✋</div>
                    <div className="text-xl font-bold text-amber-700 bg-amber-100 px-4 py-1 rounded-full border-2 border-white shadow-sm">Nest 1</div>
                  </div>

                  {/* Nest 2 */}
                  <div className={`flex flex-col items-center gap-4 transition-all duration-500 ${hatched < 5 ? 'opacity-50 scale-90' : 'scale-110'}`}>
                    <div className="flex gap-3 items-end h-48">
                      {[5, 6, 7].map((i) => {
                        const isHatched = i < hatched;
                        const isNext = i === hatched && hatched >= 5;
                        return (
                          <div key={i} onClick={() => handleEggClick(i)} className="flex flex-col items-center cursor-pointer">
                            <div className={`w-14 h-32 rounded-t-full border-4 border-white shadow-lg transition-all duration-300 flex flex-col items-center justify-center gap-1 ${isHatched ? 'bg-orange-400' : isNext ? 'bg-orange-200 animate-pulse hover:scale-110' : 'bg-orange-200 opacity-40'}`}>
                              {isHatched ? (
                                <>
                                  <span className="text-3xl animate-bounce">🐥</span>
                                  <span className="text-xl font-bold text-orange-900">{i + 1}</span>
                                </>
                              ) : (
                                <span className="text-2xl">{isNext ? '👆' : '🥚'}</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="text-5xl">🤚</div>
                    <div className="text-xl font-bold text-orange-700 bg-orange-100 px-4 py-1 rounded-full border-2 border-white shadow-sm">Nest 2</div>
                  </div>
                </div>

                <div className="bg-amber-50 p-8 rounded-[2.5rem] border-4 border-white shadow-inner max-w-2xl mx-auto font-nunito">
                  <p className="text-4xl text-amber-800 leading-relaxed font-bold">
                    {hatched === 0 ? "Tap the first egg!" :
                      hatched === 8 ? "All 8 chicks hatched! 🎉" :
                        `Hatched: ${hatched}`}
                  </p>
                  <p className="text-8xl font-fredoka text-amber-600 mt-4 font-bold drop-shadow-sm">{hatched}</p>
                </div>
              </Card>
            )}

            {isComplete && (
              <Card className="bg-gradient-to-br from-amber-600 via-orange-600 to-yellow-600 shadow-2xl rounded-[4rem] overflow-hidden p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                <div className="text-9xl animate-bounce">🐥</div>
                <h2 className="text-7xl drop-shadow-xl">Finger Star!</h2>
                <p className="text-3xl font-nunito max-w-2xl mx-auto leading-relaxed">
                  You counted all 8 fingers!
                  <br />
                  5 and 3 more is 8. You are a math genius!
                </p>
                <div className="flex gap-4 w-full pt-8">
                  <Button onClick={resetActivity} className="h-24 flex-1 bg-white/10 hover:bg-white/20 text-white text-3xl rounded-[2rem] border-4 border-white/20">
                    Again! 🔄
                  </Button>
                  <Button onClick={() => navigate("/activities/module-3?last=3-finger-count-14")} className="h-24 flex-1 bg-white text-amber-600 hover:bg-amber-50 text-3xl rounded-[2rem] shadow-2xl">
                    Yay! ✨
                  </Button>
                </div>
              </Card>
            )}

            {!isComplete && (
              <Button onClick={() => setShowGame(false)} variant="ghost" className="text-amber-400 hover:text-amber-600 w-full py-2 font-bold font-nunito">
                ← Back to Instructions
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FingerCount14;

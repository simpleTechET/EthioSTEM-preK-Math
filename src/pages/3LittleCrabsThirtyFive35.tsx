import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RefreshCw, Home, Waves, Star, Lightbulb } from "lucide-react";

const LittleCrabsThirtyFive35 = () => {
    const navigate = useNavigate();
    const [showGame, setShowGame] = useState(false);
    const [currentStep, setCurrentStep] = useState<'bearsAwake' | 'crabColoring' | 'crabRhyme' | 'complete'>('bearsAwake');

    // States
    const [awakeBears, setAwakeBears] = useState(0);
    const [coloredCrabs, setColoredCrabs] = useState<number[]>([]);
    const [crabCount, setCrabCount] = useState(5);
    const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);

    const markComplete = () => {
        const saved = localStorage.getItem("ethio-stem-m3-completed");
        const completed = saved ? JSON.parse(saved) : [];
        if (!completed.includes("3-crabs-35")) {
            completed.push("3-crabs-35");
            localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
        }
    };

    const handleBearWake = () => {
        if (awakeBears < 5) {
            setAwakeBears(awakeBears + 1);
            if (awakeBears === 4) {
                setShowFeedback("correct");
            }
        }
    };

    const colorCrab = (idx: number) => {
        if (coloredCrabs.length < 4 && !coloredCrabs.includes(idx)) {
            const next = [...coloredCrabs, idx];
            setColoredCrabs(next);
            if (next.length === 4) {
                setShowFeedback("correct");
            }
        }
    };

    const handleCrabScurry = () => {
        if (crabCount > 0) {
            setCrabCount(crabCount - 1);
            if (crabCount === 1) {
                setShowFeedback("correct");
            }
        }
    };

    const nextStep = () => {
        setShowFeedback(null);
        if (currentStep === 'bearsAwake') setCurrentStep('crabColoring');
        else if (currentStep === 'crabColoring') setCurrentStep('crabRhyme');
        else if (currentStep === 'crabRhyme') {
            markComplete();
            setCurrentStep('complete');
        }
    };

    const resetActivity = () => {
        setCurrentStep('bearsAwake');
        setAwakeBears(0);
        setColoredCrabs([]);
        setCrabCount(5);
        setShowFeedback(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-4 font-nunito overflow-x-hidden">
            <style>{`
        @keyframes scurry {
          0% { transform: translateX(0) rotate(0deg); opacity: 1; }
          100% { transform: translateX(200px) rotate(10deg); opacity: 0; }
        }
        .animate-scurry { animation: scurry 0.8s ease-in forwards; }
        
        @keyframes wake {
          0% { transform: scale(0.5); opacity: 0.5; }
          70% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-wake { animation: wake 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
      `}</style>

            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=3-crabs-35")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full font-fredoka">
                                Lesson 35
                            </span>
                            <h1 className="text-2xl font-bold text-foreground font-fredoka uppercase tracking-wide">Crabby Countdown</h1>
                        </div>
                    </div>
                </div>

                {!showGame ? (
                    <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] overflow-hidden text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700 relative">
                        <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-orange-500 to-amber-500 rounded-3xl flex items-center justify-center mb-6 rotate-3 shadow-lg">
                            <Waves className="w-12 h-12 text-white" />
                        </div>
                        <h2 className="text-5xl font-fredoka text-orange-900 leading-tight">Crabs on the Shore!</h2>
                        <p className="text-2xl text-orange-800 font-nunito leading-relaxed max-w-2xl mx-auto">
                            We're going to wake up bears and count
                            <span className="font-fredoka text-4xl text-orange-600 drop-shadow-sm mx-2">5</span>
                            silly crabs scurrying into the sea!
                        </p>
                        <Button
                            onClick={() => setShowGame(true)}
                            className="bg-orange-600 hover:bg-orange-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl font-fredoka transition-all hover:scale-105 active:scale-95 border-b-8 border-orange-800"
                        >
                            Play! 🦀
                        </Button>
                        <p className="text-sm text-orange-400 font-bold uppercase tracking-widest pt-4">Topic H: Counting Back from 5</p>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        <div className="flex justify-center gap-3 mb-4">
                            {['bearsAwake', 'crabColoring', 'crabRhyme'].map((step, idx) => (
                                <div
                                    key={step}
                                    className={`h-3 rounded-full transition-all ${['bearsAwake', 'crabColoring', 'crabRhyme'].indexOf(currentStep) >= idx
                                        ? 'bg-orange-500 w-12 shadow-sm'
                                        : 'bg-orange-100 w-3'
                                        }`}
                                />
                            ))}
                        </div>

                        {currentStep === 'bearsAwake' && (
                            <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-bottom-8">
                                <h3 className="text-4xl font-fredoka text-amber-600">
                                    🐻 5 Sleepy Bears
                                </h3>
                                <div className="flex justify-center flex-wrap gap-6 p-10 bg-orange-50/50 rounded-[3rem] border-4 border-white shadow-inner max-w-2xl mx-auto min-h-48 items-center">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <div key={i} className={`text-7xl transition-all duration-500 ${i < awakeBears ? 'animate-wake' : 'opacity-20 scale-75'}`}>
                                            {i < awakeBears ? "🐻" : "😴"}
                                        </div>
                                    ))}
                                </div>
                                <div className="text-center bg-orange-50 p-8 rounded-[2.5rem] border-4 border-white shadow-inner max-w-lg mx-auto">
                                    <p className="text-3xl font-fredoka text-orange-800 mb-8 leading-tight">
                                        {awakeBears === 0 ? "Wake up 1 bear!" : <span>Now <span className="text-5xl text-orange-600">{awakeBears}</span> are awake! Wake another!</span>}
                                    </p>
                                    <Button onClick={handleBearWake} disabled={awakeBears >= 5 || showFeedback !== null} className="w-full bg-orange-500 hover:bg-orange-600 text-white py-12 text-4xl font-fredoka rounded-[2rem] shadow-xl border-b-8 border-orange-700">
                                        WAKE UP! ☀️
                                    </Button>
                                </div>
                            </Card>
                        )}

                        {currentStep === 'crabColoring' && (
                            <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-right-8">
                                <h3 className="text-4xl font-fredoka text-red-600">
                                    🦀 Color 1 Less than 5
                                </h3>
                                <div className="flex flex-wrap justify-center gap-8 p-10 bg-red-50/50 rounded-[3rem] border-4 border-white shadow-inner">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className={`text-8xl cursor-pointer transition-all hover:scale-110 ${coloredCrabs.includes(i) ? 'drop-shadow-xl saturate-150' : 'grayscale opacity-30 blur-[2px]'}`}
                                            onClick={() => colorCrab(i)}
                                        >
                                            🦀
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-red-50 p-10 rounded-[3rem] border-4 border-white shadow-inner max-w-lg mx-auto">
                                    <p className="text-3xl font-fredoka text-red-800 mb-8">
                                        Color <span className="text-6xl text-red-600">4</span> crabs!
                                        <br /><small className="text-xl opacity-60">(4 is 1 less than 5!)</small>
                                    </p>
                                    <div className="text-4xl font-bold text-red-400 font-fredoka bg-white/50 py-4 rounded-2xl border-2 border-red-100">
                                        {coloredCrabs.length} / 4
                                    </div>
                                </div>
                            </Card>
                        )}

                        {currentStep === 'crabRhyme' && (
                            <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in zoom-in">
                                <h3 className="text-4xl font-fredoka text-blue-600">
                                    🌊 5 Little Crabs
                                </h3>
                                <div className="relative h-48 p-8 bg-blue-100/50 rounded-[3rem] border-8 border-white shadow-inner flex items-center justify-center gap-4 overflow-hidden">
                                    <Waves className="absolute text-blue-200/50 w-full h-full p-4 animate-pulse" />
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className={`text-7xl relative z-10 transition-all ${i < crabCount ? 'scale-100' : 'animate-scurry pointer-events-none'}`}
                                        >
                                            🦀
                                        </div>
                                    ))}
                                    {crabCount === 0 && <p className="text-blue-400 text-3xl font-fredoka uppercase tracking-widest z-10">Empty Shore!</p>}
                                </div>
                                <div className="text-center bg-blue-50 p-8 rounded-[2.5rem] border-4 border-white shadow-inner max-w-2xl mx-auto">
                                    <p className="text-2xl font-fredoka text-blue-900 mb-8 italic">
                                        "{crabCount} little crab{crabCount !== 1 ? 's' : ''} scurrying on the shore, 1 scurried off and then there were {crabCount > 1 ? <b className="text-4xl text-blue-600">{crabCount - 1}</b> : 'no more'}!"
                                    </p>
                                    <Button onClick={handleCrabScurry} disabled={crabCount === 0 || showFeedback !== null} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-12 text-4xl font-fredoka rounded-[2rem] shadow-xl border-b-8 border-blue-700">
                                        SCURRY! 🌊
                                    </Button>
                                </div>
                            </Card>
                        )}

                        {currentStep === 'complete' && (
                            <Card className="bg-gradient-to-br from-orange-600 via-amber-600 to-red-600 shadow-2xl rounded-[4rem] overflow-hidden p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                                <div className="text-9xl animate-bounce">🏖️</div>
                                <h2 className="text-7xl font-fredoka drop-shadow-xl">Beach Champion!</h2>
                                <p className="text-3xl font-nunito max-w-2xl mx-auto leading-relaxed">
                                    You can count from <span className="font-fredoka text-5xl text-yellow-300">5 down to 1</span>!
                                    You're getting so fast at counting back!
                                </p>
                                <div className="flex gap-4 w-full pt-8">
                                    <Button onClick={resetActivity} className="h-24 flex-1 bg-white/10 hover:bg-white/20 text-white text-3xl font-fredoka rounded-[2rem] border-4 border-white/20">
                                        Again! 🔄
                                    </Button>
                                    <Button onClick={() => navigate("/activities/module-3?last=3-crabs-35")} className="h-24 flex-1 bg-white text-orange-600 hover:bg-orange-50 text-3xl font-fredoka rounded-[2rem] shadow-2xl">
                                        Yay! ✨
                                    </Button>
                                </div>
                            </Card>
                        )}

                        {/* Large Feedback Overlays */}
                        {showFeedback && (
                            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-md animate-in fade-in duration-300">
                                <Card className={`max-w-md w-full p-12 text-center shadow-[0_0_50px_rgba(0,0,0,0.3)] rounded-[4rem] border-8 animate-in zoom-in duration-300 ${showFeedback === 'correct' ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
                                    }`}>
                                    <div className="text-9xl mb-8">
                                        {showFeedback === 'correct' ? '🌟' : '🤔'}
                                    </div>
                                    <h4 className={`text-6xl font-fredoka mb-8 ${showFeedback === 'correct' ? 'text-green-700' : 'text-red-700'
                                        }`}>
                                        {showFeedback === 'correct' ? 'Super!' : 'Try Again!'}
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

export default LittleCrabsThirtyFive35;

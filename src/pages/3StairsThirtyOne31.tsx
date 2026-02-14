import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RefreshCw, Home, Layout as StairIcon } from "lucide-react";

const STAIR_COLORS = [
    "bg-[hsl(142,76%,45%)]", // green
    "bg-[hsl(200,90%,54%)]", // blue
    "bg-[hsl(4,90%,58%)]",   // red
    "bg-[hsl(45,93%,58%)]",  // yellow
    "bg-[hsl(280,70%,50%)]", // purple
];

const StairsThirtyOne31 = () => {
    const navigate = useNavigate();
    const [showGame, setShowGame] = useState(false);
    const [currentStep, setCurrentStep] = useState<'plantingSeeds' | 'antsSong' | 'buildingStairs' | 'complete'>('plantingSeeds');

    // States
    const [seedsPlanted, setSeedsPlanted] = useState(0);
    const [verse, setVerse] = useState(1);
    const [stairSteps, setStairSteps] = useState<number[]>([]);
    const [currentGoal, setCurrentGoal] = useState(1);
    const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);

    const markComplete = () => {
        const saved = localStorage.getItem("ethio-stem-m3-completed");
        const completed = saved ? JSON.parse(saved) : [];
        if (!completed.includes("3-stairs-31")) {
            completed.push("3-stairs-31");
            localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
        }
    };

    const handlePlantSeed = () => {
        if (seedsPlanted < 5) {
            setSeedsPlanted(seedsPlanted + 1);
            if (seedsPlanted === 4) {
                setShowFeedback("correct");
            }
        }
    };

    const nextVerse = () => {
        if (verse < 5) {
            setVerse(verse + 1);
        } else {
            setShowFeedback("correct");
        }
    };

    const handleAddBlock = () => {
        if (currentGoal <= 5) {
            setStairSteps([...stairSteps, currentGoal]);
            if (currentGoal === 5) {
                setShowFeedback("correct");
            } else {
                setCurrentGoal(currentGoal + 1);
            }
        }
    };

    const nextStep = () => {
        setShowFeedback(null);
        if (currentStep === 'plantingSeeds') setCurrentStep('antsSong');
        else if (currentStep === 'antsSong') setCurrentStep('buildingStairs');
        else if (currentStep === 'buildingStairs') {
            markComplete();
            setCurrentStep('complete');
        }
    };

    const resetActivity = () => {
        setCurrentStep('plantingSeeds');
        setSeedsPlanted(0);
        setVerse(1);
        setStairSteps([]);
        setCurrentGoal(1);
        setShowFeedback(null);
    };

    const renderStairs = () => (
        <div className="flex items-end justify-center gap-3 min-h-[250px] p-8 bg-white/40 rounded-[3rem] shadow-inner">
            {stairSteps.map((height, idx) => (
                <div key={idx} className="flex flex-col-reverse gap-1 items-center">
                    {Array.from({ length: height }).map((_, i) => (
                        <div
                            key={i}
                            className={`w-14 h-10 ${STAIR_COLORS[idx % 5]} border-4 border-black/10 rounded-xl shadow-md animate-bounce-in`}
                            style={{ animationDelay: `${i * 0.05}s` }}
                        >
                            <div className="w-full h-full flex items-center justify-center opacity-20">
                                <div className="w-4 h-4 bg-white rounded-full" />
                            </div>
                        </div>
                    ))}
                    <span className="text-xl font-fredoka text-indigo-900/40 mt-2">{height}</span>
                </div>
            ))}
            {currentGoal <= 5 && (
                <div className="w-14 h-40 border-4 border-dashed border-indigo-200 rounded-2xl flex flex-col items-center justify-center opacity-40 bg-indigo-50/50">
                    <span className="text-4xl font-fredoka text-indigo-300 animate-pulse">{currentGoal}</span>
                </div>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4 font-nunito overflow-x-hidden">
            <style>{`
        @keyframes bounce-in {
          0% { transform: scale(0); opacity: 0; }
          70% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-bounce-in { animation: bounce-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
      `}</style>

            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=3-stairs-31")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full font-fredoka">
                                Lesson 31
                            </span>
                            <h1 className="text-2xl font-bold text-foreground font-fredoka uppercase tracking-wide">Number Stairs</h1>
                        </div>
                    </div>
                </div>

                {!showGame ? (
                    <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] overflow-hidden text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700 relative">
                        <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center mb-6 -rotate-3 shadow-lg">
                            <StairIcon className="w-12 h-12 text-white" />
                        </div>
                        <h2 className="text-5xl font-fredoka text-emerald-900 leading-tight">Climb the Number Stairs!</h2>
                        <p className="text-2xl text-emerald-800 font-nunito leading-relaxed max-w-2xl mx-auto">
                            We're going to plant
                            <span className="font-fredoka text-4xl text-emerald-600 drop-shadow-sm mx-2">5</span>
                            seeds and build a giant staircase!
                        </p>
                        <Button
                            onClick={() => setShowGame(true)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl font-fredoka transition-all hover:scale-105 active:scale-95 border-b-8 border-emerald-800"
                        >
                            Start! 🌱
                        </Button>
                        <p className="text-sm text-emerald-400 font-bold uppercase tracking-widest pt-4">Topic G: Number Stairs to 5</p>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        <div className="flex justify-center gap-3 mb-4">
                            {['plantingSeeds', 'antsSong', 'buildingStairs'].map((step, idx) => (
                                <div
                                    key={step}
                                    className={`h-3 rounded-full transition-all ${['plantingSeeds', 'antsSong', 'buildingStairs'].indexOf(currentStep) >= idx
                                        ? 'bg-emerald-500 w-12 shadow-sm'
                                        : 'bg-emerald-100 w-3'
                                        }`}
                                />
                            ))}
                        </div>

                        {currentStep === 'plantingSeeds' && (
                            <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-bottom-8">
                                <h3 className="text-4xl font-fredoka text-emerald-600">
                                    🌱 Plant <span className="text-6xl text-emerald-700">5</span> Seeds!
                                </h3>
                                <div className="flex justify-center gap-4 p-10 bg-amber-100/50 rounded-[3rem] border-4 border-white shadow-inner max-w-2xl mx-auto">
                                    {[0, 1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className={`w-24 h-24 rounded-[2rem] flex items-center justify-center transition-all border-4 ${i < seedsPlanted ? 'bg-green-500 border-green-600 shadow-lg scale-110' : 'bg-amber-50/50 border-dashed border-amber-200'
                                                }`}
                                        >
                                            {i < seedsPlanted ? <span className="text-6xl animate-bounce">🌸</span> : null}
                                        </div>
                                    ))}
                                </div>
                                <div className="text-center bg-emerald-50 p-8 rounded-[2.5rem] border-4 border-white shadow-inner max-w-lg mx-auto">
                                    <p className="text-3xl font-fredoka text-emerald-800 mb-8 leading-tight">
                                        {seedsPlanted === 0 ? "Let's plant... 1!" :
                                            seedsPlanted < 5 ? <span>Plant <span className="text-5xl text-emerald-600">1</span> more... now we have <span className="text-5xl text-emerald-600">{seedsPlanted + 1}</span>!</span> :
                                                "Wow! Look at your flowers!"}
                                    </p>
                                    <Button onClick={handlePlantSeed} disabled={seedsPlanted >= 5 || showFeedback !== null} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-12 text-4xl font-fredoka rounded-[2rem] shadow-xl border-b-8 border-emerald-700">
                                        PLANT! 🌱
                                    </Button>
                                </div>
                            </Card>
                        )}

                        {currentStep === 'antsSong' && (
                            <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-8 animate-in slide-in-from-right-8">
                                <h3 className="text-4xl font-fredoka text-amber-600">
                                    🐜 The Ants Go Marching!
                                </h3>
                                <div className="flex justify-center flex-wrap gap-4 h-32 items-end">
                                    {Array.from({ length: verse }).map((_, i) => (
                                        <div key={i} className="text-7xl animate-bounce" style={{ animationDelay: `${i * 0.15}s` }}>🐜</div>
                                    ))}
                                </div>
                                <div className="bg-amber-50 p-10 rounded-[3rem] border-4 border-white shadow-inner max-w-2xl mx-auto">
                                    <p className="text-3xl font-fredoka text-amber-800 italic mb-8 leading-relaxed">
                                        "The ants go marching <span className="text-6xl text-amber-600">{verse}</span> by <span className="text-6xl text-amber-600">{verse}</span>, hurrah!"
                                    </p>
                                    <Button onClick={nextVerse} disabled={verse >= 5 || showFeedback !== null} className="w-full bg-amber-500 hover:bg-amber-600 text-white py-10 text-4xl font-fredoka rounded-[2rem] shadow-xl border-b-8 border-amber-700">
                                        {verse < 5 ? "Next Verse! 🎶" : "Done! ✨"}
                                    </Button>
                                </div>
                            </Card>
                        )}

                        {currentStep === 'buildingStairs' && (
                            <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-8 animate-in slide-in-from-left-8">
                                <h3 className="text-4xl font-fredoka text-indigo-600">
                                    🪜 Build Your Stairs!
                                </h3>
                                {renderStairs()}
                                <div className="flex flex-col gap-6 w-full max-w-sm mx-auto">
                                    <p className="text-3xl font-fredoka text-indigo-800">
                                        {currentGoal === 1 ? "Start with 1!" : <span>Make a tower of <span className="text-5xl text-indigo-600">{currentGoal}</span>!</span>}
                                    </p>
                                    <Button
                                        onClick={handleAddBlock}
                                        disabled={currentGoal > 5 || showFeedback !== null}
                                        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-12 text-4xl font-fredoka rounded-[2rem] shadow-xl border-b-8 border-indigo-700 transform hover:scale-105"
                                    >
                                        Build {currentGoal}! 🔨
                                    </Button>
                                </div>
                            </Card>
                        )}

                        {currentStep === 'complete' && (
                            <Card className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 shadow-2xl rounded-[4rem] overflow-hidden p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                                <div className="text-9xl animate-bounce">🏰</div>
                                <h2 className="text-7xl font-fredoka drop-shadow-xl">Staircase Master!</h2>
                                <p className="text-3xl font-nunito max-w-2xl mx-auto leading-relaxed">
                                    You built a giant staircase from
                                    <span className="font-fredoka text-5xl text-yellow-300 mx-3">1 to 5</span>!
                                    Each step is <span className="font-fredoka text-3xl text-yellow-100">1 more</span> than the last!
                                </p>
                                <div className="flex gap-4 w-full pt-8">
                                    <Button onClick={resetActivity} className="h-24 flex-1 bg-white/10 hover:bg-white/20 text-white text-3xl font-fredoka rounded-[2rem] border-4 border-white/20">
                                        Restart 🔄
                                    </Button>
                                    <Button onClick={() => navigate("/activities/module-3?last=3-stairs-31")} className="h-24 flex-1 bg-white text-emerald-600 hover:bg-emerald-50 text-3xl font-fredoka rounded-[2rem] shadow-2xl">
                                        Finish! ✨
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
                            <Button onClick={() => setShowGame(false)} variant="ghost" className="text-emerald-400 hover:text-emerald-600 w-full py-2 font-bold font-nunito">
                                ← Back to Instructions
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StairsThirtyOne31;

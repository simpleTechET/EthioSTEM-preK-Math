import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RefreshCw, Home, CloudSnow, Hand, Layout as StairIcon } from "lucide-react";

const STAIR_COLORS = [
    "bg-[hsl(280,70%,50%)]", // 1 - purple
    "bg-[hsl(4,90%,58%)]",   // 2 - red
    "bg-[hsl(142,76%,45%)]", // 3 - green
    "bg-[hsl(200,90%,54%)]", // 4 - blue
    "bg-[hsl(45,93%,58%)]",  // 5 - yellow
];

const DescendingStairsThirtyThree33 = () => {
    const navigate = useNavigate();
    const [showGame, setShowGame] = useState(false);
    const [currentStep, setCurrentStep] = useState<'snowball' | 'magicFingers' | 'buildingDown' | 'complete'>('snowball');

    // States
    const [snowballCount, setSnowballCount] = useState(5);
    const [fingersUp, setFingersUp] = useState(5);
    const [stairSteps, setStairSteps] = useState<number[]>([5]);
    const [currentGoal, setCurrentGoal] = useState(4);
    const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);

    const markComplete = () => {
        const saved = localStorage.getItem("ethio-stem-m3-completed");
        const completed = saved ? JSON.parse(saved) : [];
        if (!completed.includes("3-descending-33")) {
            completed.push("3-descending-33");
            localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
        }
    };

    const handleThrow = () => {
        if (snowballCount > 0) {
            setSnowballCount(snowballCount - 1);
            if (snowballCount === 1) {
                setShowFeedback("correct");
            }
        }
    };

    const handleFingerFold = () => {
        if (fingersUp > 1) {
            setFingersUp(fingersUp - 1);
        } else {
            setShowFeedback("correct");
        }
    };

    const handleRemoveBlock = () => {
        if (currentGoal >= 1) {
            setStairSteps([...stairSteps, currentGoal]);
            if (currentGoal === 1) {
                setShowFeedback("correct");
            } else {
                setCurrentGoal(currentGoal - 1);
            }
        }
    };

    const nextStep = () => {
        setShowFeedback(null);
        if (currentStep === 'snowball') setCurrentStep('magicFingers');
        else if (currentStep === 'magicFingers') setCurrentStep('buildingDown');
        else if (currentStep === 'buildingDown') {
            markComplete();
            setCurrentStep('complete');
        }
    };

    const resetActivity = () => {
        setCurrentStep('snowball');
        setSnowballCount(5);
        setFingersUp(5);
        setStairSteps([5]);
        setCurrentGoal(4);
        setShowFeedback(null);
    };

    const renderDescendingStairs = () => (
        <div className="flex items-end justify-center gap-3 min-h-[250px] p-8 bg-white/40 rounded-[3rem] shadow-inner">
            {stairSteps.map((height, idx) => {
                const colorIdx = (height - 1) % 5;
                return (
                    <div key={idx} className="flex flex-col-reverse gap-1 items-center">
                        {Array.from({ length: height }).map((_, i) => (
                            <div
                                key={i}
                                className={`w-14 h-10 ${STAIR_COLORS[colorIdx]} border-4 border-black/10 rounded-xl shadow-md animate-bounce-in`}
                                style={{ animationDelay: `${i * 0.05}s` }}
                            >
                                <div className="w-full h-full flex items-center justify-center opacity-20">
                                    <div className="w-4 h-4 bg-white rounded-full" />
                                </div>
                            </div>
                        ))}
                        <span className="text-xl font-fredoka text-indigo-900/40 mt-2">{height}</span>
                    </div>
                );
            })}
            {currentGoal >= 1 && (
                <div className="w-14 h-40 border-4 border-dashed border-indigo-200 rounded-2xl flex flex-col items-center justify-center opacity-40 bg-indigo-50/50">
                    <span className="text-4xl font-fredoka text-indigo-300 animate-pulse">{currentGoal}</span>
                </div>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 font-nunito overflow-x-hidden">
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
                    <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=3-descending-33")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-purple-600 bg-purple-100 px-3 py-1 rounded-full font-fredoka">
                                Lesson 33
                            </span>
                            <h1 className="text-2xl font-bold text-foreground font-fredoka uppercase tracking-wide">Zooming Down</h1>
                        </div>
                    </div>
                </div>

                {!showGame ? (
                    <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] overflow-hidden text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700 relative">
                        <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-3xl flex items-center justify-center mb-6 rotate-3 shadow-lg">
                            <CloudSnow className="w-12 h-12 text-white" />
                        </div>
                        <h2 className="text-5xl font-fredoka text-indigo-900 leading-tight">Snowball Countdown!</h2>
                        <p className="text-2xl text-indigo-800 font-nunito leading-relaxed max-w-2xl mx-auto">
                            We're going to throw
                            <span className="font-fredoka text-4xl text-indigo-600 drop-shadow-sm mx-2">5</span>
                            snowballs and build stairs that go
                            <span className="font-fredoka text-4xl text-purple-600 drop-shadow-sm mx-2">DOWN</span>!
                        </p>
                        <Button
                            onClick={() => setShowGame(true)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl font-fredoka transition-all hover:scale-105 active:scale-95 border-b-8 border-indigo-800"
                        >
                            Zoom! ❄️
                        </Button>
                        <p className="text-sm text-indigo-400 font-bold uppercase tracking-widest pt-4">Topic G: Down from 5</p>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        <div className="flex justify-center gap-3 mb-4">
                            {['snowball', 'magicFingers', 'buildingDown'].map((step, idx) => (
                                <div
                                    key={step}
                                    className={`h-3 rounded-full transition-all ${['snowball', 'magicFingers', 'buildingDown'].indexOf(currentStep) >= idx
                                        ? 'bg-purple-500 w-12 shadow-sm'
                                        : 'bg-purple-100 w-3'
                                        }`}
                                />
                            ))}
                        </div>

                        {currentStep === 'snowball' && (
                            <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-bottom-8">
                                <h3 className="text-4xl font-fredoka text-blue-600 flex items-center justify-center gap-4">
                                    ❄️ Throw them all!
                                </h3>
                                <div className="flex justify-center flex-wrap gap-4 p-10 bg-blue-50/50 rounded-[3rem] border-4 border-white shadow-inner max-w-2xl mx-auto h-48 items-center">
                                    {Array.from({ length: snowballCount }).map((_, i) => (
                                        <div key={i} className="text-7xl animate-bounce-in drop-shadow-md">❄️</div>
                                    ))}
                                    {snowballCount === 0 && (
                                        <p className="text-blue-300 text-3xl font-fredoka uppercase animate-pulse">All Gone!</p>
                                    )}
                                </div>
                                <div className="text-center bg-blue-50 p-8 rounded-[2.5rem] border-4 border-white shadow-inner max-w-lg mx-auto">
                                    <p className="text-3xl font-fredoka text-blue-800 mb-8 leading-tight">
                                        {snowballCount === 5 ? "You have 5 snowballs!" : <span>Now you have <span className="text-5xl text-blue-500">{snowballCount}</span>! Throw another!</span>}
                                    </p>
                                    <Button onClick={handleThrow} disabled={snowballCount === 0 || showFeedback !== null} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-12 text-4xl font-fredoka rounded-[2rem] shadow-xl border-b-8 border-blue-700 transform active:scale-95">
                                        THROW! ❄️
                                    </Button>
                                </div>
                            </Card>
                        )}

                        {currentStep === 'magicFingers' && (
                            <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-right-8">
                                <h3 className="text-4xl font-fredoka text-purple-600">
                                    🖐️ Magic Countdown
                                </h3>
                                <div className="flex items-end justify-center gap-2 p-10 bg-purple-50/50 rounded-[3rem] border-4 border-white h-48">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div
                                            key={i}
                                            className={`w-12 rounded-t-full transition-all duration-300 border-2 ${i <= fingersUp ? 'bg-amber-200 border-amber-400 h-32' : 'bg-transparent border-transparent h-4'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <div className="bg-purple-50 p-10 rounded-[3rem] border-4 border-white shadow-inner max-w-lg mx-auto">
                                    <p className="text-3xl font-fredoka text-purple-800 mb-8">
                                        <span className="text-6xl text-purple-600">{fingersUp}</span> fingers up!
                                    </p>
                                    <Button onClick={handleFingerFold} disabled={fingersUp < 1 || showFeedback !== null} className="w-full bg-purple-500 hover:bg-purple-600 text-white py-12 text-4xl font-fredoka rounded-[2rem] shadow-xl border-b-8 border-purple-700">
                                        FOLD 1! 🖐️
                                    </Button>
                                </div>
                            </Card>
                        )}

                        {currentStep === 'buildingDown' && (
                            <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-8 animate-in slide-in-from-left-8">
                                <h3 className="text-4xl font-fredoka text-pink-600">
                                    🪜 Building Down
                                </h3>
                                {renderDescendingStairs()}
                                <div className="flex flex-col gap-6 w-full max-w-sm mx-auto">
                                    <p className="text-3xl font-fredoka text-pink-800">
                                        {currentGoal < 5 && <span>1 less than <b>{currentGoal + 1}</b> is <b>{currentGoal}</b>!</span>}
                                    </p>
                                    <Button
                                        onClick={handleRemoveBlock}
                                        disabled={currentGoal < 1 || showFeedback !== null}
                                        className="w-full bg-pink-500 hover:bg-pink-600 text-white py-12 text-4xl font-fredoka rounded-[2rem] shadow-xl border-b-8 border-pink-700 transform hover:scale-105"
                                    >
                                        Build {currentGoal}! 🔨
                                    </Button>
                                </div>
                            </Card>
                        )}

                        {currentStep === 'complete' && (
                            <Card className="bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-600 shadow-2xl rounded-[4rem] overflow-hidden p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                                <div className="text-9xl animate-bounce">☃️</div>
                                <h2 className="text-7xl font-fredoka drop-shadow-xl">Countdown Star!</h2>
                                <p className="text-3xl font-nunito max-w-2xl mx-auto leading-relaxed">
                                    You built stairs from
                                    <span className="font-fredoka text-5xl text-yellow-300 mx-3">5 down to 1</span>!
                                    That's <span className="font-fredoka text-3xl text-yellow-100">1 less</span> every time!
                                </p>
                                <div className="flex gap-4 w-full pt-8">
                                    <Button onClick={resetActivity} className="h-24 flex-1 bg-white/10 hover:bg-white/20 text-white text-3xl font-fredoka rounded-[2rem] border-4 border-white/20">
                                        Restart 🔄
                                    </Button>
                                    <Button onClick={() => navigate("/activities/module-3?last=3-descending-33")} className="h-24 flex-1 bg-white text-purple-600 hover:bg-purple-50 text-3xl font-fredoka rounded-[2rem] shadow-2xl">
                                        Woohoo! ✨
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
                                        {showFeedback === 'correct' ? 'Perfect!' : 'Try Again!'}
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

export default DescendingStairsThirtyThree33;

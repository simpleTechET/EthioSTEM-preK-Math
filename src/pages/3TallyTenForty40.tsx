import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RefreshCw, Home, Star, PenTool, CheckCircle, Smile, HelpCircle } from "lucide-react";

const TallyTenForty40 = () => {
    const navigate = useNavigate();
    const [showGame, setShowGame] = useState(false);
    const [currentStep, setCurrentStep] = useState<'learn5' | 'learn10' | 'practice' | 'complete'>('learn5');
    const [tallyCount, setTallyCount] = useState(0);
    const [targetCount, setTargetCount] = useState(5);
    const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);

    const markComplete = () => {
        const saved = localStorage.getItem("ethio-stem-m3-completed");
        const completed = saved ? JSON.parse(saved) : [];
        if (!completed.includes("3-tally-40")) {
            completed.push("3-tally-40");
            localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
        }
    };

    const handleAddTally = () => {
        if (tallyCount < targetCount) {
            const next = tallyCount + 1;
            setTallyCount(next);
            if (next === targetCount) {
                setShowFeedback("correct");
            }
        }
    };

    const nextStep = () => {
        setShowFeedback(null);
        if (currentStep === 'learn5') {
            setCurrentStep('learn10');
            setTargetCount(10);
            setTallyCount(0);
        } else if (currentStep === 'learn10') {
            setCurrentStep('practice');
            setTargetCount(10);
            setTallyCount(0);
        } else if (currentStep === 'practice') {
            markComplete();
            setCurrentStep('complete');
        }
    };

    const resetActivity = () => {
        setShowGame(false);
        setCurrentStep('learn5');
        setTallyCount(0);
        setTargetCount(5);
        setShowFeedback(null);
    };

    const renderTallies = (count: number) => {
        const bundles = Math.floor(count / 5);
        const remainder = count % 5;

        useEffect(() => {

            if (showFeedback === 'correct') {

                const timer = setTimeout(() => { nextStep(); }, 1200);

                return () => clearTimeout(timer);

            }

        }, [showFeedback]);


        return (
            <div className="flex gap-12 items-end justify-center min-h-[140px]">
                {Array.from({ length: bundles }).map((_, bIdx) => (
                    <div key={`bundle-${bIdx}`} className="relative flex gap-3">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div
                                key={i}
                                className="w-3 h-24 bg-teal-600 rounded-full animate-in slide-in-from-top duration-300"
                                style={{ animationDelay: `${i * 0.1}s` }}
                            />
                        ))}
                        <div
                            className="absolute -left-3 -right-3 top-1/2 h-4 bg-teal-700 rounded-full -rotate-[25deg] shadow-lg animate-in zoom-in-50 duration-500 border-2 border-white/20"
                            style={{ width: 'calc(100% + 24px)', transformOrigin: 'left center' }}
                        />
                    </div>
                ))}
                <div className="flex gap-3">
                    {Array.from({ length: remainder }).map((_, i) => (
                        <div
                            key={i}
                            className="w-3 h-24 bg-teal-500 rounded-full animate-in slide-in-from-top duration-300"
                            style={{ animationDelay: `${i * 0.1}s` }}
                        />
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4 font-nunito overflow-x-hidden">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=3-tally-40")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-teal-600 bg-teal-100 px-3 py-1 rounded-full font-fredoka">
                                Lesson 40
                            </span>
                            <h1 className="text-2xl font-bold text-foreground font-fredoka uppercase tracking-wide">Tally Ninja</h1>
                        </div>
                    </div>
                </div>

                {!showGame ? (
                    <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] overflow-hidden text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700 relative">
                        <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center mb-6 -rotate-3 shadow-lg">
                            <PenTool className="w-12 h-12 text-white" />
                        </div>
                        <h2 className="text-5xl font-fredoka text-teal-900 leading-tight">Master the Tally!</h2>
                        <p className="text-2xl text-teal-800 font-nunito leading-relaxed max-w-2xl mx-auto">
                            Tally marks are a secret counting code! When we reach
                            <span className="font-fredoka text-4xl text-teal-600 drop-shadow-sm mx-2">5</span>
                            we bundle them up. Let's tally to 10!
                        </p>
                        <Button
                            onClick={() => setShowGame(true)}
                            className="bg-teal-600 hover:bg-teal-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl font-fredoka transition-all hover:scale-105 active:scale-95 border-b-8 border-teal-800"
                        >
                            Start Drawing! 🖊️
                        </Button>
                        <p className="text-sm text-teal-400 font-bold uppercase tracking-widest pt-4">Topic H: Tally to 10</p>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        <div className="flex justify-center gap-3 mb-4">
                            {['learn5', 'learn10', 'practice'].map((step, idx) => (
                                <div
                                    key={step}
                                    className={`h-3 rounded-full transition-all ${['learn5', 'learn10', 'practice'].indexOf(currentStep) >= idx
                                        ? 'bg-teal-500 w-12 shadow-sm'
                                        : 'bg-teal-100 w-3'
                                        }`}
                                />
                            ))}
                        </div>

                        {(currentStep === 'learn5' || currentStep === 'learn10' || currentStep === 'practice') && (
                            <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-bottom-8">
                                <div className="space-y-4">
                                    <h3 className="text-4xl font-fredoka text-teal-700">
                                        {currentStep === 'learn5' ? "First, let's tally 5!" : currentStep === 'learn10' ? "Now, let's reach 10!" : "Tally Challenge!"}
                                    </h3>
                                    <p className="text-2xl text-teal-600">Tap the button to add a mark!</p>
                                </div>
                                <div onClick={handleAddTally} className="bg-teal-50/30 w-full max-w-2xl mx-auto rounded-[3rem] p-16 flex flex-col items-center justify-center min-h-[300px] border-4 border-dashed border-teal-100 shadow-inner cursor-pointer hover:bg-teal-50/50 active:scale-[0.98] transition-all">
                                    {tallyCount > 0 ? (
                                        renderTallies(tallyCount)
                                    ) : (
                                        <div className="text-teal-200 flex flex-col items-center gap-4">
                                            <HelpCircle className="w-24 h-24" />
                                            <p className="text-2xl font-fredoka uppercase tracking-widest animate-pulse">Tap here to add a tally!</p>
                                        </div>
                                    )}
                                </div>
                                <div className="text-center bg-teal-50 p-8 rounded-[2.5rem] border-4 border-white shadow-inner max-w-md mx-auto">
                                    <p className="text-4xl font-fredoka text-teal-800">
                                        Total: <span className="text-6xl text-teal-600 drop-shadow-sm">{tallyCount}</span> / {targetCount}
                                    </p>
                                </div>
                            </Card>
                        )}

                        {currentStep === 'complete' && (
                            <Card className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 shadow-2xl rounded-[4rem] overflow-hidden p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                                <div className="text-9xl animate-bounce">🖊️</div>
                                <h2 className="text-7xl font-fredoka drop-shadow-xl">Tally Master!</h2>
                                <p className="text-3xl font-nunito max-w-2xl mx-auto leading-relaxed">
                                    You can count to <span className="font-fredoka text-5xl text-yellow-300">10</span> with tally marks!
                                    Two bundles of 5 make a perfect 10!
                                </p>
                                <div className="flex gap-4 w-full pt-8">
                                    <Button onClick={resetActivity} className="h-24 flex-1 bg-white/10 hover:bg-white/20 text-white text-3xl font-fredoka rounded-[2rem] border-4 border-white/20">
                                        Again! 🔄
                                    </Button>
                                    <Button onClick={() => navigate("/activities/module-3?last=3-tally-40")} className="h-24 flex-1 bg-white text-teal-600 hover:bg-teal-50 text-3xl font-fredoka rounded-[2rem] shadow-2xl">
                                        Awesome! ✨
                                    </Button>
                                </div>
                            </Card>
                        )}

                        {showFeedback && (
                            <div className="fixed top-24 right-6 z-[100] animate-in slide-in-from-right-4 fade-in duration-300">
                                <Card className={`flex items-center gap-4 px-6 py-4 shadow-2xl rounded-2xl border-4 ${showFeedback === 'correct' ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'}`}>
                                    <span className="text-4xl">{showFeedback === 'correct' ? '🌟' : '🧐'}</span>
                                    <span className={`text-2xl font-fredoka font-bold ${showFeedback === 'correct' ? 'text-green-700' : 'text-red-700'}`}>
                                        {showFeedback === 'correct' ? 'Great!' : 'Try Again!'}
                                    </span>
                                    {showFeedback !== 'correct' && (
                                        <Button onClick={() => setShowFeedback(null)} className="ml-2 px-5 py-3 text-xl font-fredoka rounded-xl border-b-4 bg-red-500 hover:bg-red-600 border-red-700 text-white">
                                            OK 👍
                                        </Button>
                                    )}
                                </Card>
                            </div>
                        )}

                        {currentStep !== 'complete' && (
                            <Button onClick={() => setShowGame(false)} variant="ghost" className="text-teal-400 hover:text-teal-600 w-full py-2 font-bold font-nunito">
                                ← Back to Instructions
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TallyTenForty40;

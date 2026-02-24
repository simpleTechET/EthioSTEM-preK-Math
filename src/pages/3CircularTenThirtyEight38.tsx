import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RefreshCw, Home, Smile, Star, CheckCircle2, CircleDot, Info } from "lucide-react";

const OBJECTS = [
    { id: 1, icon: "🐌", label: "Snail" },
    { id: 2, icon: "🌸", label: "Flower" },
    { id: 3, icon: "🐞", label: "Ladybug" },
];

const CIRCLE_RADIUS = 120; // Radius for the circular arrangement

const CircularTenThirtyEight38 = () => {
    const navigate = useNavigate();
    const [showGame, setShowGame] = useState(false);
    const [currentStep, setCurrentStep] = useState<'counting' | 'practice' | 'complete'>('counting');

    // States
    const [counts, setCounts] = useState<number[]>([]);
    const [startIdx, setStartIdx] = useState<number | null>(null);
    const [objectType, setObjectType] = useState(OBJECTS[0]);
    const [practiceCount, setPracticeCount] = useState<number[]>([]);
    const [hasMarkedStart, setHasMarkedStart] = useState(false);
    const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);

    const markComplete = () => {
        const saved = localStorage.getItem("ethio-stem-m3-completed");
        const completed = saved ? JSON.parse(saved) : [];
        if (!completed.includes("3-circular-38")) {
            completed.push("3-circular-38");
            localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
        }
    };

    const handleObjectClick = (idx: number) => {
        if (!counts.includes(idx)) {
            const newCounts = [...counts, idx];
            setCounts(newCounts);
            if (newCounts.length === 10) {
                setShowFeedback("correct");
            }
        }
    };

    const handlePracticeClick = (idx: number) => {
        if (!hasMarkedStart) {
            setStartIdx(idx);
            setHasMarkedStart(true);
            setPracticeCount([idx]);
            return;
        }

        if (!practiceCount.includes(idx)) {
            const next = [...practiceCount, idx];
            setPracticeCount(next);
            if (next.length === 10) {
                setShowFeedback("correct");
            }
        }
    };

    const nextStep = () => {
        setShowFeedback(null);
        if (currentStep === 'counting') setCurrentStep('practice');
        else if (currentStep === 'practice') {
            markComplete();
            setCurrentStep('complete');
        }
    };

    const resetActivity = () => {
        setCurrentStep('counting');
        setCounts([]);
        setStartIdx(null);
        setPracticeCount([]);
        setHasMarkedStart(false);
        setObjectType(OBJECTS[Math.floor(Math.random() * OBJECTS.length)]);
        setShowFeedback(null);
    };

    const getPosition = (index: number, total: number) => {
        const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
        const x = CIRCLE_RADIUS * Math.cos(angle);
        const y = CIRCLE_RADIUS * Math.sin(angle);
        return { x, y };
    };

    useEffect(() => {
        if (showFeedback === 'correct') {
            const timer = setTimeout(() => { nextStep(); }, 1200);
            return () => clearTimeout(timer);
        }
    }, [showFeedback]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 p-4 font-nunito overflow-x-hidden">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=3-circular-38")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full font-fredoka">
                                Lesson 38
                            </span>
                            <h1 className="text-2xl font-bold text-foreground font-fredoka uppercase tracking-wide">Circle Counter</h1>
                        </div>
                    </div>
                </div>

                {!showGame ? (
                    <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] overflow-hidden text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700 relative">
                        <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-teal-500 to-emerald-500 rounded-3xl flex items-center justify-center mb-6 -rotate-3 shadow-lg">
                            <CircleDot className="w-12 h-12 text-white" />
                        </div>
                        <h2 className="text-5xl font-fredoka text-emerald-900 leading-tight">Spin and Count!</h2>
                        <p className="text-2xl text-emerald-800 font-nunito leading-relaxed max-w-2xl mx-auto">
                            Counting in a circle is a special trick! We'll count
                            <span className="font-fredoka text-4xl text-emerald-600 drop-shadow-sm mx-2">10</span>
                            snails without getting dizzy!
                        </p>
                        <Button
                            onClick={() => setShowGame(true)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl font-fredoka transition-all hover:scale-105 active:scale-95 border-b-8 border-emerald-800"
                        >
                            Play! 🐌
                        </Button>
                        <p className="text-sm text-emerald-400 font-bold uppercase tracking-widest pt-4">Topic H: Number 10 Circularly</p>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        <div className="flex justify-center gap-3 mb-4">
                            {['counting', 'practice'].map((step, idx) => (
                                <div
                                    key={step}
                                    className={`h-3 rounded-full transition-all ${['counting', 'practice'].indexOf(currentStep) >= idx
                                        ? 'bg-emerald-500 w-12 shadow-sm'
                                        : 'bg-emerald-100 w-3'
                                        }`}
                                />
                            ))}
                        </div>

                        {currentStep === 'counting' && (
                            <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-bottom-8">
                                <div className="space-y-4">
                                    <h3 className="text-4xl font-fredoka text-emerald-700">Find 10 Snails!</h3>
                                    <p className="text-xl text-emerald-600">Click each one to count around the circle!</p>
                                </div>
                                <div className="relative h-[450px] flex items-center justify-center bg-emerald-50/30 rounded-[3rem] border-4 border-white shadow-inner">
                                    <div className="absolute w-[260px] h-[260px] border-8 border-dashed border-emerald-100/50 rounded-full" />
                                    {Array.from({ length: 10 }).map((_, i) => {
                                        const { x, y } = getPosition(i, 10);
                                        const isCounted = counts.includes(i);
                                        return (
                                            <button
                                                key={i}
                                                onClick={() => handleObjectClick(i)}
                                                style={{ transform: `translate(${x}px, ${y}px)` }}
                                                className={`absolute w-20 h-20 rounded-[1.5rem] flex items-center justify-center text-5xl transition-all duration-300 ${isCounted ? 'bg-emerald-100 border-4 border-emerald-400 scale-90 opacity-60' : 'bg-white border-4 border-emerald-100 shadow-xl hover:scale-110 active:scale-95'}`}
                                            >
                                                {objectType.icon}
                                                {isCounted && (
                                                    <div className="absolute -top-3 -right-3 bg-emerald-600 text-white w-10 h-10 rounded-full text-xl flex items-center justify-center font-fredoka border-4 border-white shadow-lg">
                                                        {counts.indexOf(i) + 1}
                                                    </div>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                                <div className="bg-emerald-50 p-8 rounded-[2.5rem] border-4 border-white shadow-inner max-w-md mx-auto">
                                    <p className="text-4xl font-fredoka text-emerald-800">
                                        Counted: <span className="text-6xl text-emerald-600 drop-shadow-sm">{counts.length}</span> / 10
                                    </p>
                                </div>
                            </Card>
                        )}

                        {currentStep === 'practice' && (
                            <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-right-8">
                                <div className="space-y-4">
                                    <h3 className="text-4xl font-fredoka text-cyan-700">Mark Your START! 📍</h3>
                                    <p className="text-xl text-cyan-600">Pick one to be your start, then count the rest!</p>
                                </div>
                                <div className="relative h-[450px] flex items-center justify-center bg-cyan-50/30 rounded-[3rem] border-4 border-white shadow-inner">
                                    <div className="absolute w-[260px] h-[260px] border-8 border-dashed border-cyan-100/50 rounded-full" />
                                    {Array.from({ length: 10 }).map((_, i) => {
                                        const { x, y } = getPosition(i, 10);
                                        const isStart = startIdx === i;
                                        const isCounted = practiceCount.includes(i);
                                        return (
                                            <button
                                                key={i}
                                                onClick={() => handlePracticeClick(i)}
                                                style={{ transform: `translate(${x}px, ${y}px)` }}
                                                className={`absolute w-20 h-20 rounded-[1.5rem] flex items-center justify-center text-5xl transition-all duration-300 ${isStart ? 'bg-yellow-100 border-8 border-yellow-400 scale-110 z-10 shadow-2xl' : isCounted ? 'bg-cyan-100 border-4 border-cyan-400 opacity-60' : 'bg-white border-4 border-cyan-100 shadow-xl hover:scale-110 active:scale-95'}`}
                                            >
                                                {objectType.icon}
                                                {isStart && (
                                                    <div className="absolute -top-12 bg-yellow-400 text-white px-4 py-2 rounded-xl text-lg font-bold shadow-lg animate-bounce border-2 border-white">
                                                        START!
                                                    </div>
                                                )}
                                                {isCounted && !isStart && (
                                                    <div className="absolute -bottom-2 -right-2 bg-cyan-500 text-white w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                                                        <CheckCircle2 className="w-5 h-5" />
                                                    </div>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                                <div className="bg-cyan-50 p-8 rounded-[2.5rem] border-4 border-white shadow-inner max-w-md mx-auto">
                                    <p className="text-3xl font-fredoka text-cyan-800">
                                        {!hasMarkedStart ? "Click any object to start!" : <span>Counting <span className="text-5xl text-cyan-600">{practiceCount.length}</span> snail!</span>}
                                    </p>
                                </div>
                            </Card>
                        )}

                        {currentStep === 'complete' && (
                            <Card className="bg-gradient-to-br from-teal-600 via-emerald-600 to-cyan-600 shadow-2xl rounded-[4rem] overflow-hidden p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                                <div className="text-9xl animate-bounce">🌀</div>
                                <h2 className="text-7xl font-fredoka drop-shadow-xl">Circle Legend!</h2>
                                <p className="text-3xl font-nunito max-w-2xl mx-auto leading-relaxed">
                                    You can count in a circle perfectly!
                                    <br />
                                    You found all <span className="font-fredoka text-5xl text-yellow-300">10</span> objects!
                                </p>
                                <div className="flex gap-4 w-full pt-8">
                                    <Button onClick={resetActivity} className="h-24 flex-1 bg-white/10 hover:bg-white/20 text-white text-3xl font-fredoka rounded-[2rem] border-4 border-white/20">
                                        Again! 🔄
                                    </Button>
                                    <Button onClick={() => navigate("/activities/module-3?last=3-circular-38")} className="h-24 flex-1 bg-white text-emerald-600 hover:bg-emerald-50 text-3xl font-fredoka rounded-[2rem] shadow-2xl">
                                        Yippee! ✨
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

export default CircularTenThirtyEight38;

import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RefreshCw, Home, Star, LayoutGrid, List, Circle, Sparkles, Smile } from "lucide-react";

type LayoutType = 'line' | 'array' | 'circle';

const VARIATIONS = [
    { id: 'seeds', icon: "🌱", color: "bg-emerald-50 border-emerald-200 text-emerald-700" },
    { id: 'toys', icon: "🧸", color: "bg-blue-50 border-blue-200 text-blue-700" },
    { id: 'stars', icon: "⭐", color: "bg-indigo-50 border-indigo-200 text-indigo-700" },
];

const VariedTenThirtyNine39 = () => {
    const navigate = useNavigate();
    const [showGame, setShowGame] = useState(false);
    const [currentStep, setCurrentStep] = useState<'play' | 'complete'>('play');
    const [layout, setLayout] = useState<LayoutType>('line');
    const [counts, setCounts] = useState<number[]>([]);
    const [variationIdx, setVariationIdx] = useState(0);
    const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);

    const variation = VARIATIONS[variationIdx];

    const markComplete = () => {
        const saved = localStorage.getItem("ethio-stem-m3-completed");
        const completed = saved ? JSON.parse(saved) : [];
        if (!completed.includes("3-varied-39")) {
            completed.push("3-varied-39");
            localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
        }
    };

    const positions = useMemo(() => {
        const coords: { x: number; y: number }[] = [];
        if (layout === 'line') {
            for (let i = 0; i < 10; i++) {
                coords.push({ x: (i - 4.5) * 60, y: 0 });
            }
        } else if (layout === 'array') {
            for (let r = 0; r < 2; r++) {
                for (let c = 0; c < 5; c++) {
                    coords.push({ x: (c - 2) * 80, y: (r - 0.5) * 85 });
                }
            }
        } else if (layout === 'circle') {
            const radius = 120;
            for (let i = 0; i < 10; i++) {
                const angle = (i / 10) * 2 * Math.PI - Math.PI / 2;
                coords.push({ x: radius * Math.cos(angle), y: radius * Math.sin(angle) });
            }
        }
        return coords;
    }, [layout]);

    const handleObjectClick = (idx: number) => {
        if (!counts.includes(idx)) {
            const newCounts = [...counts, idx];
            setCounts(newCounts);
            if (newCounts.length === 10) {
                setShowFeedback("correct");
            }
        }
    };

    const nextStep = () => {
        setShowFeedback(null);
        if (layout === 'line') {
            setLayout('array');
            setCounts([]);
        } else if (layout === 'array') {
            setLayout('circle');
            setCounts([]);
        } else {
            if (variationIdx < VARIATIONS.length - 1) {
                setVariationIdx(variationIdx + 1);
                setLayout('line');
                setCounts([]);
            } else {
                markComplete();
                setCurrentStep('complete');
            }
        }
    };

    const resetActivity = () => {
        setShowGame(false);
        setCurrentStep('play');
        setLayout('line');
        setCounts([]);
        setVariationIdx(0);
        setShowFeedback(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 font-nunito overflow-x-hidden">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=3-varied-39")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full font-fredoka">
                                Lesson 39
                            </span>
                            <h1 className="text-2xl font-bold text-foreground font-fredoka uppercase tracking-wide">10 In Many Ways</h1>
                        </div>
                    </div>
                </div>

                {!showGame ? (
                    <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] overflow-hidden text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700 relative">
                        <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-3xl flex items-center justify-center mb-6 rotate-3 shadow-lg">
                            <LayoutGrid className="w-12 h-12 text-white" />
                        </div>
                        <h2 className="text-5xl font-fredoka text-indigo-900 leading-tight">10 Everywhere!</h2>
                        <p className="text-2xl text-indigo-800 font-nunito leading-relaxed max-w-2xl mx-auto">
                            Did you know
                            <span className="font-fredoka text-4xl text-indigo-600 drop-shadow-sm mx-2">10</span>
                            can look like a line, a box, or a circle? Let's count them all!
                        </p>
                        <Button
                            onClick={() => setShowGame(true)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl font-fredoka transition-all hover:scale-105 active:scale-95 border-b-8 border-indigo-800"
                        >
                            Start Mission! 🚀
                        </Button>
                        <p className="text-sm text-indigo-400 font-bold uppercase tracking-widest pt-4">Topic H: Varied Ten</p>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        <div className="flex justify-center gap-4 flex-wrap">
                            <div className={`px-8 py-3 rounded-full border-4 transition-all flex items-center gap-2 font-fredoka ${layout === 'line' ? 'bg-blue-100 border-blue-400 text-blue-800 scale-105 shadow-md' : 'bg-white/50 opacity-40 grayscale border-white'}`}>
                                <List className="w-6 h-6" /> Line
                            </div>
                            <div className={`px-8 py-3 rounded-full border-4 transition-all flex items-center gap-2 font-fredoka ${layout === 'array' ? 'bg-purple-100 border-purple-400 text-purple-800 scale-105 shadow-md' : 'bg-white/50 opacity-40 grayscale border-white'}`}>
                                <LayoutGrid className="w-6 h-6" /> Array
                            </div>
                            <div className={`px-8 py-3 rounded-full border-4 transition-all flex items-center gap-2 font-fredoka ${layout === 'circle' ? 'bg-indigo-100 border-indigo-400 text-indigo-800 scale-105 shadow-md' : 'bg-white/50 opacity-40 grayscale border-white'}`}>
                                <Circle className="w-6 h-6" /> Circle
                            </div>
                        </div>

                        {currentStep === 'play' && (
                            <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-bottom-8">
                                <div className="space-y-4">
                                    <h3 className="text-4xl font-fredoka text-indigo-700 capitalize">10 {variation.id} in a {layout}!</h3>
                                    <p className="text-2xl text-indigo-600">Tap each one to count to 10.</p>
                                </div>
                                <div className="relative h-[450px] flex items-center justify-center bg-indigo-50/30 rounded-[3rem] border-4 border-white shadow-inner">
                                    {positions.map((pos, i) => {
                                        const isCounted = counts.includes(i);
                                        return (
                                            <button
                                                key={i}
                                                onClick={() => handleObjectClick(i)}
                                                style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
                                                className={`absolute w-20 h-20 rounded-[1.5rem] flex items-center justify-center text-5xl transition-all duration-300 ${isCounted ? 'bg-indigo-100 border-4 border-indigo-400 scale-90 opacity-60' : 'bg-white border-4 border-indigo-100 shadow-xl hover:scale-110 active:scale-95'}`}
                                            >
                                                <span className={isCounted ? 'grayscale' : ''}>{variation.icon}</span>
                                                {isCounted && (
                                                    <div className="absolute -top-3 -right-3 bg-indigo-600 text-white w-10 h-10 rounded-full text-xl flex items-center justify-center font-fredoka border-4 border-white shadow-lg">
                                                        {counts.indexOf(i) + 1}
                                                    </div>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                                <div className="bg-indigo-50 p-8 rounded-[2.5rem] border-4 border-white shadow-inner flex justify-between items-center px-12 mx-auto max-w-2xl">
                                    <div className="text-left">
                                        <p className="text-xl font-bold text-indigo-400 uppercase">Set</p>
                                        <p className="text-4xl font-fredoka text-indigo-600">{variationIdx + 1} / 3</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xl font-bold text-indigo-400 uppercase">Count</p>
                                        <p className="text-5xl font-fredoka text-indigo-800">{counts.length} / 10</p>
                                    </div>
                                </div>
                            </Card>
                        )}

                        {currentStep === 'complete' && (
                            <Card className="bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600 shadow-2xl rounded-[4rem] overflow-hidden p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                                <div className="text-9xl animate-bounce">🌈</div>
                                <h2 className="text-7xl font-fredoka drop-shadow-xl">King of 10!</h2>
                                <p className="text-3xl font-nunito max-w-2xl mx-auto leading-relaxed">
                                    You can count to <span className="font-fredoka text-5xl text-yellow-300">10</span> no matter how the objects are hiding!
                                    You're a counting pro!
                                </p>
                                <div className="flex gap-4 w-full pt-8">
                                    <Button onClick={resetActivity} className="h-24 flex-1 bg-white/10 hover:bg-white/20 text-white text-3xl font-fredoka rounded-[2rem] border-4 border-white/20">
                                        Again! 🔄
                                    </Button>
                                    <Button onClick={() => navigate("/activities/module-3?last=3-varied-39")} className="h-24 flex-1 bg-white text-indigo-600 hover:bg-indigo-50 text-3xl font-fredoka rounded-[2rem] shadow-2xl">
                                        Love it! ✨
                                    </Button>
                                </div>
                            </Card>
                        )}

                        {showFeedback && (
                            <div className="fixed bottom-6 right-6 z-[100] animate-in slide-in-from-right-4 fade-in duration-300">
                                <Card className={`flex items-center gap-4 px-6 py-4 shadow-2xl rounded-2xl border-4 ${showFeedback === 'correct' ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'}`}>
                                    <span className="text-4xl">{showFeedback === 'correct' ? '🌟' : '🧐'}</span>
                                    <h4 className={`text-2xl font-fredoka ${showFeedback === 'correct' ? 'text-green-700' : 'text-red-700'}`}>
                                        {showFeedback === 'correct' ? 'Way to go!' : 'Try Again!'}
                                    </h4>
                                    <Button onClick={showFeedback === 'correct' ? nextStep : () => setShowFeedback(null)} size="sm" className={`ml-2 rounded-xl text-lg px-4 py-2 ${showFeedback === 'correct' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}>
                                        {showFeedback === 'correct' ? 'Next! ➡️' : 'OK! 👍'}
                                    </Button>
                                </Card>
                            </div>
                        )}

                        {currentStep !== 'complete' && (
                            <Button onClick={() => setShowGame(false)} variant="ghost" className="text-indigo-400 hover:text-indigo-600 w-full py-2 font-bold font-nunito">
                                ← Back to Instructions
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default VariedTenThirtyNine39;

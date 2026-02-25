import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Trees, Scale } from "lucide-react";
import { MuteButton } from "@/components/MuteButton";
import { useAudio } from "@/context/AudioContext";

const HeavyLight6 = () => {
    const navigate = useNavigate();
    const [showGame, setShowGame] = useState(false);
    const [currentStep, setCurrentStep] = useState(0); // 0: Elephant vs Feather, 1: Rock vs Leaf
    const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [isComplete, setIsComplete] = useState(false);
    const { isMuted } = useAudio();

    const markLessonComplete = () => {
        const saved = localStorage.getItem("ethio-stem-m4-completed");
        const completed = saved ? JSON.parse(saved) : [];
        if (!completed.includes("lesson-6")) {
            completed.push("lesson-6");
            localStorage.setItem("ethio-stem-m4-completed", JSON.stringify(completed));
        }
    };

    const speak = (text: string) => {
        if (isMuted) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    };

    const handleChoice = (type: 'heavy' | 'light', target: 'heavy' | 'light') => {
        if (type === target) {
            setShowFeedback('correct');
            speak("Wonderful! That is " + target + "!");
            setTimeout(() => {
                setShowFeedback(null);
                if (currentStep < 1) {
                    setCurrentStep(prev => prev + 1);
                } else {
                    setIsComplete(true);
                    markLessonComplete();
                    speak("You are a weight master!");
                }
            }, 1500);
        } else {
            setShowFeedback('incorrect');
            speak("Oops! Try again. Which one is " + target + "?");
        }
    };

    const scenarios = [
        {
            question: "Which one is HEAVY? 🐘",
            target: 'heavy' as const,
            options: [
                { id: 'elephant', label: "Elephant", emoji: "🐘", type: 'heavy' as const, style: "h-64 md:h-80 w-64 md:w-80 bg-slate-200 border-slate-400" },
                { id: 'feather', label: "Feather", emoji: "🪶", type: 'light' as const, style: "h-20 md:h-24 w-20 md:w-24 bg-sky-50 border-sky-200" }
            ]
        },
        {
            question: "Which one is LIGHT? 🍃",
            target: 'light' as const,
            options: [
                { id: 'rock', label: "Large Rock", emoji: "🪨", type: 'heavy' as const, style: "h-56 md:h-64 w-56 md:w-64 bg-stone-200 border-stone-400" },
                { id: 'leaf', label: "Leaf", emoji: "🍃", type: 'light' as const, style: "h-16 md:h-20 w-16 md:w-20 bg-green-50 border-green-200" }
            ]
        }
    ];

    return (
        <div className="min-h-screen gradient-forest p-4 font-nunito overflow-x-hidden">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-4?last=lesson-6")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <MuteButton />
                    <div>
                        <span className="text-sm font-bold text-forest-700 bg-forest-100 px-3 py-1 rounded-full font-fredoka uppercase tracking-wider">Lesson 6</span>
                        <h1 className="text-2xl font-bold text-foreground font-fredoka tracking-wide mt-1">🐘 Heavy or Light?</h1>
                    </div>
                </div>

                {!showGame ? (
                    <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700">
                        <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-orange-400 to-amber-600 rounded-3xl flex items-center justify-center -rotate-3 shadow-lg border-4 border-white/50">
                            <Scale className="w-12 h-12 text-white" />
                        </div>
                        <h2 className="text-4xl font-fredoka text-forest-900 tracking-tight uppercase">Weight Watcher!</h2>
                        <p className="text-2xl text-forest-800 font-nunito leading-relaxed max-w-xl mx-auto">
                            Some things in the forest are <span className="font-black text-amber-700 underline">HEAVY</span>,
                            and some are <span className="font-bold text-sky-500 italic">LIGHT</span>.
                        </p>
                        <div className="flex justify-center items-end gap-16 py-4">
                            <div className="flex flex-col items-center">
                                <span className="text-8xl">🐘</span>
                                <span className="font-fredoka text-xl text-forest-700 mt-2">HEAVY</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-5xl pb-4">🪶</span>
                                <span className="font-fredoka text-xl text-forest-700 mt-2">LIGHT</span>
                            </div>
                        </div>
                        <Button
                            onClick={() => { setShowGame(true); speak("Let's feel the weight! Which is heavy and which is light?"); }}
                            className="bg-amber-600 hover:bg-amber-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl font-fredoka border-b-8 border-amber-800 transition-all hover:scale-105 active:scale-95 w-full md:w-auto uppercase tracking-tighter"
                        >
                            Feel the Weight! ⚖️
                        </Button>
                    </Card>
                ) : isComplete ? (
                    <Card className="bg-gradient-to-br from-orange-500 via-amber-500 to-amber-700 shadow-2xl rounded-[4rem] p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                        <div className="text-9xl animate-bounce">🏆</div>
                        <h2 className="text-6xl font-fredoka drop-shadow-xl tracking-tighter uppercase">Weight Master!</h2>
                        <p className="text-2xl font-nunito max-w-2xl mx-auto leading-relaxed">
                            You can tell what is <span className="font-black">HEAVY</span> and what is <span className="italic">LIGHT</span>.
                        </p>
                        <div className="flex flex-wrap gap-4 w-full pt-8 justify-center">
                            <Button onClick={() => { setCurrentStep(0); setIsComplete(false); speak("Let's play again!"); }} className="h-20 px-12 bg-white/10 hover:bg-white/20 text-white text-2xl font-fredoka rounded-[2rem] border-4 border-white/20 uppercase tracking-tighter">
                                Play Again 🔄
                            </Button>
                            <Button onClick={() => navigate("/activities/module-4")} className="h-20 px-12 bg-white text-amber-700 hover:bg-amber-50 text-2xl font-fredoka rounded-[2rem] shadow-2xl uppercase tracking-tighter">
                                Next Lesson! ✨
                            </Button>
                        </div>
                    </Card>
                ) : (
                    <div className="space-y-8">
                        <div className="flex justify-center gap-2">
                            {[0, 1].map((n) => (
                                <div key={n} className={`h-4 rounded-full transition-all duration-500 ${currentStep >= n ? 'bg-amber-500 w-16 shadow-lg' : 'bg-amber-100 w-4'}`} />
                            ))}
                        </div>

                        <Card className="bg-white/90 border-4 border-white shadow-2xl rounded-[3rem] p-8 md:p-12 text-center space-y-8 min-h-[600px] flex flex-col items-center justify-center relative overflow-hidden">
                            <div className="space-y-4 relative z-10 w-full mb-8">
                                <h3 className="text-4xl md:text-5xl font-fredoka text-forest-800 tracking-tight leading-none">
                                    {scenarios[currentStep].question}
                                </h3>
                                <p className="text-forest-600 font-nunito text-xl">Tap the correct one!</p>
                            </div>

                            <div className="flex items-end justify-center gap-10 md:gap-20 relative z-10 py-10">
                                {scenarios[currentStep].options.map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={() => handleChoice(option.type, scenarios[currentStep].target)}
                                        className="group relative flex flex-col items-center transition-all duration-300 hover:scale-105 active:scale-95"
                                    >
                                        <div className={`${option.style} rounded-[3rem] border-4 flex items-center justify-center text-8xl md:text-9xl shadow-lg group-hover:shadow-2xl transition-all`}>
                                            <span className="group-hover:animate-bounce">{option.emoji}</span>
                                        </div>
                                        <span className="mt-6 font-fredoka text-3xl text-forest-900 bg-white/50 px-8 py-3 rounded-full border-2 border-white shadow-sm uppercase tracking-tighter">
                                            {option.label}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </Card>

                        {showFeedback && (
                            <div className="fixed top-24 right-6 z-[100] animate-in slide-in-from-right-4 fade-in duration-300">
                                <Card className={`flex items-center gap-6 px-10 py-8 shadow-2xl rounded-[2rem] border-4 ${showFeedback === 'correct' ? 'bg-orange-50 border-orange-400' : 'bg-rose-50 border-rose-400'}`}>
                                    <span className="text-6xl">{showFeedback === 'correct' ? '🌟' : '🧐'}</span>
                                    <div className="flex flex-col text-left">
                                        <span className={`text-4xl font-fredoka font-bold ${showFeedback === 'correct' ? 'text-orange-700' : 'text-rose-700'}`}>
                                            {showFeedback === 'correct' ? 'Super Job!' : 'Wait a Minute!'}
                                        </span>
                                        <span className="text-xl font-nunito text-muted-foreground font-semibold">
                                            {showFeedback === 'correct' ? 'You found it!' : 'Think about which is heavier!'}
                                        </span>
                                    </div>
                                    {showFeedback === 'incorrect' && (
                                        <Button onClick={() => setShowFeedback(null)} className="ml-6 px-8 py-5 text-2xl font-fredoka rounded-2xl border-b-8 bg-rose-500 hover:bg-rose-600 border-rose-700 text-white uppercase tracking-tighter">
                                            Try Again
                                        </Button>
                                    )}
                                </Card>
                            </div>
                        )}

                        <Button onClick={() => setShowGame(false)} variant="ghost" className="text-forest-400 hover:text-forest-600 w-full py-4 text-xl font-black font-nunito uppercase tracking-widest">
                            ← Instructions
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HeavyLight6;

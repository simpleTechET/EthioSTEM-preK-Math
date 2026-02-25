import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Trees, Milestone } from "lucide-react";
import { MuteButton } from "@/components/MuteButton";
import { useAudio } from "@/context/AudioContext";

const TallOrShort1 = () => {
    const navigate = useNavigate();
    const [showGame, setShowGame] = useState(false);
    const [currentStep, setCurrentStep] = useState(0); // 0: Giraffe vs Bunny, 1: Tree vs Grass
    const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [isComplete, setIsComplete] = useState(false);
    const { isMuted } = useAudio();

    const markLessonComplete = () => {
        const saved = localStorage.getItem("ethio-stem-m4-completed");
        const completed = saved ? JSON.parse(saved) : [];
        if (!completed.includes("lesson-1")) {
            completed.push("lesson-1");
            localStorage.setItem("ethio-stem-m4-completed", JSON.stringify(completed));
        }
    };

    const speak = (text: string) => {
        if (isMuted) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    };

    const handleChoice = (type: 'tall' | 'short', target: 'tall' | 'short') => {
        if (type === target) {
            setShowFeedback('correct');
            speak("Great job! That is " + target + "!");
            setTimeout(() => {
                setShowFeedback(null);
                if (currentStep < 1) {
                    setCurrentStep(prev => prev + 1);
                } else {
                    setIsComplete(true);
                    markLessonComplete();
                    speak("You are a forest explorer!");
                }
            }, 1500);
        } else {
            setShowFeedback('incorrect');
            speak("Oops! Try again. Which one is " + target + "?");
        }
    };

    const scenarios = [
        {
            question: "Which one is TALL? 🦒",
            target: 'tall' as const,
            options: [
                { id: 'giraffe', label: "Giraffe", emoji: "🦒", type: 'tall' as const, style: "h-64 md:h-80 w-32 md:w-40 bg-orange-100 border-orange-400" },
                { id: 'bunny', label: "Bunny", emoji: "🐰", type: 'short' as const, style: "h-24 md:h-32 w-24 md:w-32 bg-slate-100 border-slate-300" }
            ]
        },
        {
            question: "Which one is SHORT? 🌱",
            target: 'short' as const,
            options: [
                { id: 'tree', label: "Tree", emoji: "🌳", type: 'tall' as const, style: "h-64 md:h-80 w-40 md:w-48 bg-emerald-100 border-emerald-400" },
                { id: 'grass', label: "Grass", emoji: "🌿", type: 'short' as const, style: "h-20 md:h-24 w-20 md:w-24 bg-green-50 border-green-300" }
            ]
        }
    ];

    return (
        <div className="min-h-screen gradient-forest p-4 font-nunito overflow-x-hidden">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-4?last=lesson-1")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <MuteButton />
                    <div>
                        <span className="text-sm font-bold text-forest-700 bg-forest-100 px-3 py-1 rounded-full font-fredoka uppercase tracking-wider">Lesson 1</span>
                        <h1 className="text-2xl font-bold text-foreground font-fredoka tracking-wide mt-1">🦒 Tall or Short?</h1>
                    </div>
                </div>

                {!showGame ? (
                    /* Intro Screen */
                    <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700">
                        <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-emerald-500 to-forest-600 rounded-3xl flex items-center justify-center rotate-3 shadow-lg">
                            <Trees className="w-12 h-12 text-white" />
                        </div>
                        <h2 className="text-4xl font-fredoka text-forest-900">Forest Discovery!</h2>
                        <p className="text-2xl text-forest-800 font-nunito leading-relaxed max-w-xl mx-auto">
                            Some friends in the forest are <span className="font-bold text-forest-600">TALL</span>,
                            and some are <span className="font-bold text-emerald-500">SHORT</span>.
                            <br />Can you find them?
                        </p>
                        <div className="space-y-4">
                            <div className="flex justify-center items-end gap-12 py-4">
                                <div className="flex flex-col items-center">
                                    <span className="text-8xl animate-bounce">🦒</span>
                                    <span className="font-fredoka text-xl text-forest-700">TALL</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-4xl h-12 flex items-center">🐰</span>
                                    <span className="font-fredoka text-xl text-forest-700">SHORT</span>
                                </div>
                            </div>
                        </div>
                        <Button
                            onClick={() => { setShowGame(true); speak("Ready to explore the forest? Let's find who is tall and who is short!"); }}
                            className="bg-forest-600 hover:bg-forest-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl font-fredoka border-b-8 border-forest-800 transition-all hover:scale-105 active:scale-95 w-full md:w-auto"
                        >
                            Start Adventure! 🌲
                        </Button>
                    </Card>
                ) : isComplete ? (
                    /* Completion Screen */
                    <Card className="bg-gradient-to-br from-forest-600 via-emerald-600 to-emerald-800 shadow-2xl rounded-[4rem] p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                        <div className="text-9xl animate-bounce">🌟</div>
                        <h2 className="text-6xl font-fredoka drop-shadow-xl">Forest Explorer!</h2>
                        <p className="text-2xl font-nunito max-w-2xl mx-auto leading-relaxed">
                            You did it! You found the tall and short friends in the forest.
                            <br /><span className="text-yellow-300 font-bold">Tall🦒 and Short🌱!</span>
                        </p>
                        <div className="flex flex-wrap gap-4 w-full pt-8 justify-center">
                            <Button onClick={() => { setCurrentStep(0); setIsComplete(false); speak("Let's explore again!"); }} className="h-20 px-12 bg-white/10 hover:bg-white/20 text-white text-2xl font-fredoka rounded-[2rem] border-4 border-white/20">
                                Play Again! 🔄
                            </Button>
                            <Button onClick={() => navigate("/activities/module-4")} className="h-20 px-12 bg-white text-forest-700 hover:bg-forest-50 text-2xl font-fredoka rounded-[2rem] shadow-2xl">
                                I'm Done! ✨
                            </Button>
                        </div>
                    </Card>
                ) : (
                    /* Main Activity */
                    <div className="space-y-8">
                        <div className="flex justify-center gap-2">
                            {[0, 1].map((n) => (
                                <div key={n} className={`h-3 rounded-full transition-all duration-500 ${currentStep >= n ? 'bg-forest-500 w-12' : 'bg-forest-100 w-3'}`} />
                            ))}
                        </div>

                        <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-8 md:p-10 text-center space-y-12 min-h-[500px] flex flex-col justify-center relative overflow-hidden">
                            {/* Decorative Background Trees */}
                            <div className="absolute bottom-0 left-0 right-0 h-32 flex justify-between px-12 opacity-5 pointer-events-none">
                                <Trees className="w-24 h-24" />
                                <Trees className="w-32 h-32" />
                            </div>

                            <div className="space-y-4 relative z-10">
                                <h3 className="text-4xl font-fredoka text-forest-800 animate-in fade-in slide-in-from-top-4 duration-500">
                                    {scenarios[currentStep].question}
                                </h3>
                                <p className="text-forest-600 font-nunito text-xl">Tap the right one!</p>
                            </div>

                            <div className="flex items-end justify-center gap-10 md:gap-20 mb-8 relative z-10 py-10">
                                {scenarios[currentStep].options.map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={() => handleChoice(option.type, scenarios[currentStep].target)}
                                        className={`group relative flex flex-col items-center transition-all duration-300 hover:scale-105 active:scale-95`}
                                    >
                                        <div className={`${option.style} rounded-[3rem] border-4 flex items-center justify-center text-7xl md:text-8xl shadow-lg group-hover:shadow-2xl transition-all`}>
                                            <span className="group-hover:animate-wiggle">{option.emoji}</span>
                                        </div>
                                        <span className="mt-4 font-fredoka text-2xl text-forest-900 bg-white/50 px-6 py-2 rounded-full border-2 border-white">
                                            {option.label}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </Card>

                        {showFeedback && (
                            <div className="fixed top-24 right-6 z-[100] animate-in slide-in-from-right-4 fade-in duration-300">
                                <Card className={`flex items-center gap-4 px-8 py-6 shadow-2xl rounded-3xl border-4 ${showFeedback === 'correct' ? 'bg-emerald-50 border-emerald-400' : 'bg-rose-50 border-rose-400'}`}>
                                    <span className="text-5xl">{showFeedback === 'correct' ? '🦒' : '🧐'}</span>
                                    <div className="flex flex-col">
                                        <span className={`text-3xl font-fredoka font-bold ${showFeedback === 'correct' ? 'text-emerald-700' : 'text-rose-700'}`}>
                                            {showFeedback === 'correct' ? 'Spectacular!' : 'Not quite!'}
                                        </span>
                                        <span className="text-lg font-nunito text-muted-foreground">
                                            {showFeedback === 'correct' ? 'You found it!' : 'Try the other one!'}
                                        </span>
                                    </div>
                                    {showFeedback === 'incorrect' && (
                                        <Button onClick={() => setShowFeedback(null)} className="ml-4 px-6 py-4 text-xl font-fredoka rounded-2xl border-b-6 bg-rose-500 hover:bg-rose-600 border-rose-700 text-white">
                                            Try Again
                                        </Button>
                                    )}
                                </Card>
                            </div>
                        )}

                        <Button onClick={() => setShowGame(false)} variant="ghost" className="text-forest-400 hover:text-forest-600 w-full py-4 text-lg font-bold font-nunito">
                            ← Instructions
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TallOrShort1;

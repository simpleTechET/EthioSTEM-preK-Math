import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Trees, RotateCw, Flower2 } from "lucide-react";
import { MuteButton } from "@/components/MuteButton";
import { useAudio } from "@/context/AudioContext";

const ABCircularPatterns25 = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0); // 0: Intro, 1: Level 1
    const [selections, setSelections] = useState<string[]>([]);
    const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [isComplete, setIsComplete] = useState(false);
    const { isMuted } = useAudio();

    const targetPattern = ["🍎", "🍐", "🍎", "🍐", "🍎", "🍐"];
    const options = ["🍎", "🍐"];

    const markLessonComplete = () => {
        const saved = localStorage.getItem("ethio-stem-m4-completed");
        const completed = saved ? JSON.parse(saved) : [];
        if (!completed.includes("25")) {
            completed.push("25");
            localStorage.setItem("ethio-stem-m4-completed", JSON.stringify(completed));
        }
    };

    const speak = (text: string) => {
        if (isMuted) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    };

    const handleSelect = (item: string) => {
        if (selections.length >= 6) return;

        const nextTarget = targetPattern[selections.length];
        if (item === nextTarget) {
            const newSelections = [...selections, item];
            setSelections(newSelections);
            speak(item === "🍎" ? "Apple" : "Pear");

            if (newSelections.length === 6) {
                setShowFeedback('correct');
                speak("Wonderful! A perfect pattern around the tree!");
                setTimeout(() => {
                    setShowFeedback(null);
                    setIsComplete(true);
                    markLessonComplete();
                }, 2500);
            }
        } else {
            setShowFeedback('incorrect');
            speak("Not that one. Follow the AB pattern!");
            setTimeout(() => setShowFeedback(null), 1000);
        }
    };

    useEffect(() => {
        if (currentStep === 0) {
            speak("Now let's make a pattern in a circle! Follow the arrow around the tree.");
        } else if (currentStep === 1) {
            speak("Place the apples and pears to make an AB pattern.");
        }
    }, [currentStep, isMuted]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-400 to-green-600 p-4 font-['Inter']">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6 bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/30 shadow-lg">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => navigate("/activities/module-4")}
                            className="text-white hover:bg-white/20 rounded-full"
                        >
                            <ArrowLeft className="w-8 h-8" />
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold text-white drop-shadow-md">Lesson 25</h1>
                            <p className="text-white/80 font-medium tracking-wide">AB Circular Patterns</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <MuteButton />
                        <div className="bg-rose-500 text-white px-4 py-1 rounded-full font-bold shadow-md border-2 border-rose-300">
                            Tree Circle!
                        </div>
                    </div>
                </div>

                <Card className="p-8 bg-white/90 backdrop-blur-sm shadow-2xl border-4 border-green-200 rounded-3xl relative overflow-hidden">
                    {/* Progress Bar */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-green-100">
                        <div
                            className="h-full bg-green-500 transition-all duration-500"
                            style={{ width: `${(selections.length / 6) * 100}%` }}
                        />
                    </div>

                    {currentStep === 0 ? (
                        <div className="text-center space-y-8 py-10">
                            <div className="relative inline-block">
                                <RotateCw className="w-32 h-32 text-rose-500 animate-[spin_5s_linear_infinite]" />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl">🍎</div>
                            </div>
                            <h2 className="text-4xl font-extrabold text-green-800 italic">The Pattern Loop</h2>
                            <p className="text-xl text-green-700 font-medium">Patterns can go around and around! Let's fill the circle.</p>
                            <Button
                                onClick={() => setCurrentStep(1)}
                                className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white text-2xl px-12 py-8 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 border-b-4 border-rose-800 font-bold"
                            >
                                START CIRCLE!
                            </Button>
                        </div>
                    ) : isComplete ? (
                        <div className="text-center space-y-8 py-10 animate-in fade-in zoom-in duration-500">
                            <div className="text-8xl mb-6">🍎🍐⭕</div>
                            <h2 className="text-4xl font-extrabold text-green-800 italic">Tree-mendous!</h2>
                            <p className="text-xl text-green-700 font-medium">You completed the circular pattern!</p>
                            <Button
                                onClick={() => navigate("/activities/module-4")}
                                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-2xl px-12 py-8 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 border-b-4 border-green-800 font-bold"
                            >
                                BACK TO FOREST
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-8 py-4 relative">
                            <h2 className="text-3xl font-bold text-center text-green-800 italic">
                                Fill the circle: Apple, Pear, Apple, Pear...
                            </h2>

                            <div className="relative h-[450px] w-[450px] mx-auto bg-green-50 rounded-full border-8 border-white shadow-2xl flex items-center justify-center">
                                {/* Center Decoration */}
                                <Trees className="w-32 h-32 text-green-600 opacity-20" />

                                {/* Pattern Positions */}
                                {[...Array(6)].map((_, i) => {
                                    const angle = (i * 360) / 6 - 90; // Start at top
                                    const radius = 150;
                                    const x = Math.cos((angle * Math.PI) / 180) * radius;
                                    const y = Math.sin((angle * Math.PI) / 180) * radius;

                                    return (
                                        <div
                                            key={i}
                                            className="absolute w-24 h-24 flex items-center justify-center"
                                            style={{ transform: `translate(${x}px, ${y}px)` }}
                                        >
                                            {selections[i] ? (
                                                <div className="text-7xl animate-in zoom-in spin-in duration-500 drop-shadow-lg">
                                                    {selections[i]}
                                                </div>
                                            ) : (
                                                <div className={`w-16 h-16 rounded-full border-4 border-dashed animate-pulse transition-colors ${i === selections.length ? 'border-rose-400 bg-rose-50' : 'border-gray-200'
                                                    }`} />
                                            )}
                                            {/* Sequence Number */}
                                            <span className="absolute -top-2 -left-2 bg-white/80 w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center border shadow-sm">
                                                {i + 1}
                                            </span>
                                        </div>
                                    );
                                })}

                                {showFeedback && (
                                    <div className="absolute z-50 animate-in zoom-in duration-300">
                                        <div className={`p-10 rounded-full shadow-2xl border-8 ${showFeedback === 'correct' ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'
                                            }`}>
                                            <span className="text-8xl">{showFeedback === 'correct' ? '🌟' : '❌'}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Options */}
                            <div className="flex justify-center gap-12 pt-4">
                                {options.map((option, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleSelect(option)}
                                        className="p-8 bg-white border-b-8 border-rose-200 rounded-3xl shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 text-7xl hover:border-rose-400"
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default ABCircularPatterns25;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Trees, RotateCw, Apple } from "lucide-react";
import { MuteButton } from "@/components/MuteButton";
import { useAudio } from "@/context/AudioContext";

const FirstLastCircular15 = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0); // 0: Intro, 1: First item, 2: Last item
    const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [isComplete, setIsComplete] = useState(false);
    const { isMuted } = useAudio();

    const markLessonComplete = () => {
        const saved = localStorage.getItem("ethio-stem-m4-completed");
        const completed = saved ? JSON.parse(saved) : [];
        if (!completed.includes("15")) {
            completed.push("15");
            localStorage.setItem("ethio-stem-m4-completed", JSON.stringify(completed));
        }
    };

    const speak = (text: string) => {
        if (isMuted) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    };

    const handleAnswer = (isCorrect: boolean) => {
        if (isCorrect) {
            setShowFeedback('correct');
            speak("Wonderful! You found it!");
            setTimeout(() => {
                setShowFeedback(null);
                if (currentStep < 2) {
                    setCurrentStep(currentStep + 1);
                } else {
                    setIsComplete(true);
                    markLessonComplete();
                }
            }, 2000);
        } else {
            setShowFeedback('incorrect');
            speak("Not that one. Follow the arrow!");
            setTimeout(() => setShowFeedback(null), 2000);
        }
    };

    useEffect(() => {
        if (currentStep === 0) {
            speak("Let's look at the animals around the apple tree. Follow the arrow to see where to start!");
        } else if (currentStep === 1) {
            speak("Who is FIRST? Click the animal where the arrow starts.");
        } else if (currentStep === 2) {
            speak("Who is LAST? Click the animal at the end of the circle, right before the arrow.");
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
                            <h1 className="text-2xl font-bold text-white drop-shadow-md">Lesson 15</h1>
                            <p className="text-white/80 font-medium tracking-wide">First & Last (Circular)</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <MuteButton />
                        <div className="bg-red-500 text-white px-4 py-1 rounded-full font-bold shadow-md border-2 border-red-300">
                            Apple Tree!
                        </div>
                    </div>
                </div>

                <Card className="p-8 bg-white/90 backdrop-blur-sm shadow-2xl border-4 border-green-200 rounded-3xl relative overflow-hidden">
                    {/* Progress Bar */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-green-100">
                        <div
                            className="h-full bg-green-500 transition-all duration-500"
                            style={{ width: `${(currentStep / 3) * 100}%` }}
                        />
                    </div>

                    {currentStep === 0 ? (
                        <div className="text-center space-y-8 py-10">
                            <div className="relative inline-block">
                                <div className="absolute inset-0 bg-red-400 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                                <div className="relative border-4 border-red-200 rounded-full p-6 bg-red-50">
                                    <Apple className="w-24 h-24 text-red-600" />
                                </div>
                            </div>
                            <h2 className="text-4xl font-extrabold text-green-800 italic">The Apple Circle</h2>
                            <p className="text-xl text-green-700 font-medium">Animals are waiting for apples to fall!</p>
                            <Button
                                onClick={() => setCurrentStep(1)}
                                className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white text-2xl px-12 py-8 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 border-b-4 border-red-800 font-bold"
                            >
                                START CIRCLE!
                            </Button>
                        </div>
                    ) : isComplete ? (
                        <div className="text-center space-y-8 py-10 animate-in fade-in zoom-in duration-500">
                            <div className="text-7xl mb-6">🍎</div>
                            <h2 className="text-4xl font-extrabold text-green-800 italic">Amazing Work!</h2>
                            <p className="text-xl text-green-700 font-medium">You matched everyone in the circle!</p>
                            <Button
                                onClick={() => navigate("/activities/module-4")}
                                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-2xl px-12 py-8 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 border-b-4 border-green-800 font-bold"
                            >
                                BACK TO FOREST
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-8 relative">
                            <h2 className="text-3xl font-bold text-center text-green-800 italic">
                                {currentStep === 1 ? "Who is FIRST?" : "Who is LAST?"}
                            </h2>

                            <div className="relative h-[450px] bg-green-50 rounded-full border-8 border-green-100 flex items-center justify-center mx-auto w-[450px]">
                                {/* Central Tree */}
                                <div className="flex flex-col items-center z-10">
                                    <div className="w-32 h-32 bg-green-700 rounded-full flex items-center justify-center shadow-lg relative overflow-hidden">
                                        <div className="absolute inset-0 opacity-20">
                                            {[...Array(5)].map((_, i) => (
                                                <Apple key={i} className="w-8 h-8 text-red-400 absolute" style={{
                                                    top: `${Math.random() * 80}%`,
                                                    left: `${Math.random() * 80}%`
                                                }} />
                                            ))}
                                        </div>
                                        <Trees className="w-20 h-20 text-green-100" />
                                    </div>
                                    <div className="w-8 h-12 bg-amber-800 -mt-1 rounded-sm"></div>
                                </div>

                                {/* Circular Arrow Indication */}
                                <div className="absolute inset-0 pointer-events-none">
                                    <RotateCw className="w-16 h-16 text-amber-500 absolute top-4 left-1/2 -translate-x-1/2 animate-[spin_10s_linear_infinite]" />
                                    {/* Start Indicator Arrow */}
                                    <div className="absolute top-[10%] left-[60%] text-amber-600 font-bold flex flex-col items-center animate-pulse">
                                        <div className="text-4xl">⬇️</div>
                                        <div className="bg-white/80 px-2 rounded-lg border border-amber-500">START</div>
                                    </div>
                                </div>

                                {/* Circular Animals */}
                                <div className="absolute inset-0">
                                    {/* Item 1: Bear (First - Top Right) */}
                                    <button
                                        onClick={() => handleAnswer(currentStep === 1)}
                                        className={`absolute top-[15%] right-[25%] text-7xl hover:scale-125 transition-transform duration-300 z-20
                                            ${showFeedback === 'correct' && currentStep === 1 ? 'animate-bounce' : ''}`}
                                        title="Bear"
                                    >
                                        🐻
                                    </button>

                                    {/* Item 2: Owl (Middle - Bottom Right) */}
                                    <button
                                        onClick={() => handleAnswer(false)}
                                        className="absolute bottom-[25%] right-[15%] text-7xl hover:scale-125 transition-transform duration-300 z-20"
                                        title="Owl"
                                    >
                                        🦉
                                    </button>

                                    {/* Item 3: Raccoon (Middle - Bottom Left) */}
                                    <button
                                        onClick={() => handleAnswer(false)}
                                        className="absolute bottom-[15%] left-[25%] text-7xl hover:scale-125 transition-transform duration-300 z-20"
                                        title="Raccoon"
                                    >
                                        🦝
                                    </button>

                                    {/* Item 4: Deer (Last - Top Left) */}
                                    <button
                                        onClick={() => handleAnswer(currentStep === 2)}
                                        className={`absolute top-[25%] left-[15%] text-7xl hover:scale-125 transition-transform duration-300 z-20
                                            ${showFeedback === 'correct' && currentStep === 2 ? 'animate-bounce' : ''}`}
                                        title="Deer"
                                    >
                                        🦌
                                    </button>
                                </div>

                                {showFeedback && (
                                    <div className={`absolute z-30 text-8xl transition-all duration-300 animate-in zoom-in ${showFeedback === 'correct' ? 'scale-150' : 'rotate-12'
                                        }`}>
                                        {showFeedback === 'correct' ? '🍎' : '❌'}
                                    </div>
                                )}
                            </div>

                            <p className="text-center text-green-700 font-medium">
                                {currentStep === 1 ? "Start at the arrow. Click the animal next to it!" : "Go all the way around. Who is at the very END?"}
                            </p>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default FirstLastCircular15;

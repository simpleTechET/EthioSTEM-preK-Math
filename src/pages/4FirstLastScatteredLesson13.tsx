import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Trees, Flag } from "lucide-react";
import { MuteButton } from "@/components/MuteButton";
import { useAudio } from "@/context/AudioContext";

const FirstLastScattered13 = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0); // 0: Intro, 1: First animal, 2: Last animal
    const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [isComplete, setIsComplete] = useState(false);
    const { isMuted } = useAudio();

    const markLessonComplete = () => {
        const saved = localStorage.getItem("ethio-stem-m4-completed");
        const completed = saved ? JSON.parse(saved) : [];
        if (!completed.includes("13")) {
            completed.push("13");
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
            speak("Correct! Well done!");
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
            speak("Not quite, try again!");
            setTimeout(() => setShowFeedback(null), 2000);
        }
    };

    useEffect(() => {
        if (currentStep === 0) {
            speak("Today we will learn about First and Last. Look at the animals racing to the tree!");
        } else if (currentStep === 1) {
            speak("Who is FIRST in the race? Click on the animal closest to the tree.");
        } else if (currentStep === 2) {
            speak("Who is LAST in the race? Click on the animal furthest from the tree.");
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
                            <h1 className="text-2xl font-bold text-white drop-shadow-md">Lesson 13</h1>
                            <p className="text-white/80 font-medium tracking-wide">First & Last (Scattered)</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <MuteButton />
                        <div className="bg-amber-500 text-white px-4 py-1 rounded-full font-bold shadow-md border-2 border-amber-300 animate-bounce">
                            Forest Fun!
                        </div>
                    </div>
                </div>

                <Card className="p-8 bg-white/90 backdrop-blur-sm shadow-2xl border-4 border-green-200 rounded-3xl relative overflow-hidden">
                    {/* Progress Bar */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-green-100">
                        <div
                            className="h-full bg-green-500 transition-all duration-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                            style={{ width: `${(currentStep / 3) * 100}%` }}
                        />
                    </div>

                    {currentStep === 0 ? (
                        <div className="text-center space-y-8 py-10">
                            <div className="relative inline-block group">
                                <div className="absolute -inset-4 bg-green-400/20 rounded-full blur-xl group-hover:bg-green-400/30 transition-all duration-500"></div>
                                <Trees className="w-32 h-32 text-green-600 relative animate-pulse" />
                            </div>
                            <h2 className="text-4xl font-extrabold text-green-800 tracking-tight italic">Who goes where?</h2>
                            <p className="text-xl text-green-700 font-medium">Animals are racing to the big tree!</p>
                            <Button
                                onClick={() => setCurrentStep(1)}
                                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-2xl px-12 py-8 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 border-b-4 border-orange-700 font-bold"
                            >
                                START RACE!
                            </Button>
                        </div>
                    ) : isComplete ? (
                        <div className="text-center space-y-8 py-10 animate-in fade-in zoom-in duration-500">
                            <div className="text-7xl mb-6">🏆</div>
                            <h2 className="text-4xl font-extrabold text-green-800 italic">Fantastic!</h2>
                            <p className="text-xl text-green-700 font-medium">You know who is first and last!</p>
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

                            <div className="relative h-80 bg-green-50 rounded-2xl border-4 border-dashed border-green-200 p-4 flex items-center justify-center overflow-hidden">
                                {/* Race Track / Goals */}
                                <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col items-center">
                                    <Trees className="w-16 h-16 text-green-700" />
                                    <div className="h-40 w-2 bg-green-800/20 rounded-full"></div>
                                </div>

                                {/* Scattered Animals */}
                                <div className="relative w-full h-full">
                                    {/* Animal 1: Rabbit (First) */}
                                    <button
                                        onClick={() => handleAnswer(currentStep === 1)}
                                        className={`absolute right-[30%] top-[40%] text-6xl hover:scale-125 transition-transform duration-300 
                                            ${showFeedback === 'correct' && currentStep === 1 ? 'animate-bounce' : ''}`}
                                        title="Rabbit"
                                    >
                                        🐇
                                        <div className="text-xs font-bold text-green-800 mt-[-10px]">Bunny</div>
                                    </button>

                                    {/* Animal 2: Turtle (Middle) */}
                                    <button
                                        onClick={() => handleAnswer(false)}
                                        className="absolute left-[45%] top-[55%] text-6xl hover:scale-125 transition-transform duration-300"
                                        title="Turtle"
                                    >
                                        🐢
                                        <div className="text-xs font-bold text-green-800 mt-[-10px]">Turtle</div>
                                    </button>

                                    {/* Animal 3: Snail (Last) */}
                                    <button
                                        onClick={() => handleAnswer(currentStep === 2)}
                                        className={`absolute left-[15%] top-[35%] text-6xl hover:scale-125 transition-transform duration-300
                                            ${showFeedback === 'correct' && currentStep === 2 ? 'animate-bounce' : ''}`}
                                        title="Snail"
                                    >
                                        🐌
                                        <div className="text-xs font-bold text-green-800 mt-[-10px]">Snail</div>
                                    </button>
                                </div>

                                {showFeedback && (
                                    <div className={`absolute top-4 right-4 text-4xl p-4 rounded-full animate-in zoom-in duration-300 shadow-lg border-2 ${showFeedback === 'correct' ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'
                                        }`}>
                                        {showFeedback === 'correct' ? '✅' : '❌'}
                                    </div>
                                )}
                            </div>

                            <p className="text-center text-green-700 font-medium">
                                {currentStep === 1 ? "Click the animal closest to the tree!" : "Click the animal furthest from the tree!"}
                            </p>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default FirstLastScattered13;

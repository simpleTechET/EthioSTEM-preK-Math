import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Trees, Footprints } from "lucide-react";
import { MuteButton } from "@/components/MuteButton";
import { useAudio } from "@/context/AudioContext";

const FirstLastLinear14 = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0); // 0: Intro, 1: First item, 2: Last item
    const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [isComplete, setIsComplete] = useState(false);
    const { isMuted } = useAudio();

    const markLessonComplete = () => {
        const saved = localStorage.getItem("ethio-stem-m4-completed");
        const completed = saved ? JSON.parse(saved) : [];
        if (!completed.includes("14")) {
            completed.push("14");
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
            speak("Correct! That's the one!");
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
            speak("Try again! Look at the path.");
            setTimeout(() => setShowFeedback(null), 2000);
        }
    };

    useEffect(() => {
        if (currentStep === 0) {
            speak("Now let's look at the animals in a straight line on the path.");
        } else if (currentStep === 1) {
            speak("Who is FIRST in line? Click on the one at the start of the path.");
        } else if (currentStep === 2) {
            speak("Who is LAST in line? Click on the one at the end of the path.");
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
                            <h1 className="text-2xl font-bold text-white drop-shadow-md">Lesson 14</h1>
                            <p className="text-white/80 font-medium tracking-wide">First & Last (Linear)</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <MuteButton />
                        <div className="bg-emerald-500 text-white px-4 py-1 rounded-full font-bold shadow-md border-2 border-emerald-300">
                            Path Walk!
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
                                <Footprints className="w-32 h-32 text-orange-600 relative animate-bounce" />
                            </div>
                            <h2 className="text-4xl font-extrabold text-green-800 italic">Walking the Path</h2>
                            <p className="text-xl text-green-700 font-medium">The animals are following a trail!</p>
                            <Button
                                onClick={() => setCurrentStep(1)}
                                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-2xl px-12 py-8 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 border-b-4 border-green-800 font-bold"
                            >
                                START WALKING!
                            </Button>
                        </div>
                    ) : isComplete ? (
                        <div className="text-center space-y-8 py-10 animate-in fade-in zoom-in duration-500">
                            <div className="text-7xl mb-6">🐾</div>
                            <h2 className="text-4xl font-extrabold text-green-800 italic">Well Done!</h2>
                            <p className="text-xl text-green-700 font-medium">You found everyone in line!</p>
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

                            <div className="relative h-64 bg-amber-50 rounded-2xl border-4 border-orange-100 p-4 flex items-center justify-center overflow-hidden">
                                {/* Path */}
                                <div className="absolute bottom-10 left-0 w-full h-12 bg-orange-200/50 -rotate-2"></div>

                                {/* Linear Items */}
                                <div className="flex justify-around items-center w-full z-10 px-8">
                                    {/* Item 1: Deer (First) */}
                                    <button
                                        onClick={() => handleAnswer(currentStep === 1)}
                                        className={`group relative flex flex-col items-center transition-all duration-300 hover:scale-125
                                            ${showFeedback === 'correct' && currentStep === 1 ? 'animate-bounce' : ''}`}
                                    >
                                        <div className="text-7xl">🦌</div>
                                        <div className="bg-green-100 px-3 py-1 rounded-full text-xs font-bold text-green-800 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Deer</div>
                                    </button>

                                    {/* Item 2: Fox (Middle) */}
                                    <button
                                        onClick={() => handleAnswer(false)}
                                        className="group relative flex flex-col items-center transition-all duration-300 hover:scale-125"
                                    >
                                        <div className="text-7xl">🦊</div>
                                        <div className="bg-green-100 px-3 py-1 rounded-full text-xs font-bold text-green-800 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Fox</div>
                                    </button>

                                    {/* Item 3: Squirrel (Middle) */}
                                    <button
                                        onClick={() => handleAnswer(false)}
                                        className="group relative flex flex-col items-center transition-all duration-300 hover:scale-125"
                                    >
                                        <div className="text-7xl">🐿️</div>
                                        <div className="bg-green-100 px-3 py-1 rounded-full text-xs font-bold text-green-800 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Squirrel</div>
                                    </button>

                                    {/* Item 4: Hedgehog (Last) */}
                                    <button
                                        onClick={() => handleAnswer(currentStep === 2)}
                                        className={`group relative flex flex-col items-center transition-all duration-300 hover:scale-125
                                            ${showFeedback === 'correct' && currentStep === 2 ? 'animate-bounce' : ''}`}
                                    >
                                        <div className="text-7xl">🦔</div>
                                        <div className="bg-green-100 px-3 py-1 rounded-full text-xs font-bold text-green-800 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Hedgehog</div>
                                    </button>
                                </div>

                                {showFeedback && (
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl p-8 rounded-full animate-in zoom-in duration-300 shadow-2xl z-20">
                                        {showFeedback === 'correct' ? '🌟' : '❌'}
                                    </div>
                                )}
                            </div>

                            <p className="text-center text-green-700 font-medium">
                                {currentStep === 1 ? "The deer is at the START. Click the deer!" : "The hedgehog is at the END. Click the hedgehog!"}
                            </p>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default FirstLastLinear14;

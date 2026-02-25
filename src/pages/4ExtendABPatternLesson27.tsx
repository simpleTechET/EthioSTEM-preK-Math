import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Trees, FastForward, Heart } from "lucide-react";
import { MuteButton } from "@/components/MuteButton";
import { useAudio } from "@/context/AudioContext";

const ExtendABPattern27 = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0); // 0: Intro, 1-3: Patterns
    const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [isComplete, setIsComplete] = useState(false);
    const { isMuted } = useAudio();

    const patterns = [
        { sequence: ["🍄", "🍂", "🍄", "🍂"], next: "🍄", options: ["🍄", "🍂"] },
        { sequence: ["🦊", "🐻", "🦊", "🐻", "🦊"], next: "🐻", options: ["🦊", "🐻"] },
        { sequence: ["🌲", "🌷", "🌲", "🌷", "🌲", "🌷"], next: "🌲", options: ["🌲", "🌷"] }
    ];

    const markLessonComplete = () => {
        const saved = localStorage.getItem("ethio-stem-m4-completed");
        const completed = saved ? JSON.parse(saved) : [];
        if (!completed.includes("27")) {
            completed.push("27");
            localStorage.setItem("ethio-stem-m4-completed", JSON.stringify(completed));
        }
    };

    const speak = (text: string) => {
        if (isMuted) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    };

    const handleChoice = (option: string) => {
        if (option === patterns[currentStep - 1].next) {
            setShowFeedback('correct');
            speak("Yes! That's exactly right!");
            setTimeout(() => {
                setShowFeedback(null);
                if (currentStep < 3) {
                    setCurrentStep(currentStep + 1);
                } else {
                    setIsComplete(true);
                    markLessonComplete();
                }
            }, 2500);
        } else {
            setShowFeedback('incorrect');
            speak("Not quite. Think about the pattern flow.");
            setTimeout(() => setShowFeedback(null), 1000);
        }
    };

    useEffect(() => {
        if (currentStep === 0) {
            speak("Let's keep the pattern going! What comes next?");
        } else if (currentStep > 0 && currentStep <= 3) {
            speak("Which one should we add to the end?");
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
                            <h1 className="text-2xl font-bold text-white drop-shadow-md">Lesson 27</h1>
                            <p className="text-white/80 font-medium tracking-wide">Extend the Pattern</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <MuteButton />
                        <div className="bg-sky-500 text-white px-4 py-1 rounded-full font-bold shadow-md border-2 border-sky-300">
                            Extend it!
                        </div>
                    </div>
                </div>

                <Card className="p-8 bg-white/90 backdrop-blur-sm shadow-2xl border-4 border-green-200 rounded-3xl relative overflow-hidden">
                    {/* Progress Bar */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-green-100">
                        <div
                            className="h-full bg-green-500 transition-all duration-500"
                            style={{ width: `${(currentStep / 4) * 100}%` }}
                        />
                    </div>

                    {currentStep === 0 ? (
                        <div className="text-center space-y-8 py-10">
                            <div className="relative inline-block">
                                <div className="absolute inset-0 bg-sky-200 blur-2xl rounded-full opacity-50 animate-pulse" />
                                <FastForward className="w-32 h-32 text-sky-600 relative" />
                            </div>
                            <h2 className="text-4xl font-extrabold text-green-800 italic">Growing Patterns</h2>
                            <p className="text-xl text-green-700 font-medium">Patterns never stop! Can you predict the next piece?</p>
                            <Button
                                onClick={() => setCurrentStep(1)}
                                className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white text-2xl px-12 py-8 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 border-b-4 border-sky-800 font-bold"
                            >
                                I'M READY!
                            </Button>
                        </div>
                    ) : isComplete ? (
                        <div className="text-center space-y-8 py-10 animate-in fade-in zoom-in duration-500">
                            <div className="text-8xl mb-6">🔮✨🍄</div>
                            <h2 className="text-4xl font-extrabold text-green-800 italic">Pattern Vision!</h2>
                            <p className="text-xl text-green-700 font-medium">You saw exactly what was coming next!</p>
                            <Button
                                onClick={() => navigate("/activities/module-4")}
                                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-2xl px-12 py-8 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 border-b-4 border-green-800 font-bold"
                            >
                                BACK TO FOREST
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-12 py-4 relative">
                            <h2 className="text-3xl font-extrabold text-center text-green-800 italic">
                                What comes next?
                            </h2>

                            <div className="relative min-h-[160px] bg-sky-50/50 p-10 rounded-3xl border-4 border-dashed border-sky-200 shadow-inner flex flex-wrap justify-center items-center gap-4">
                                {patterns[currentStep - 1].sequence.map((item, i) => (
                                    <div key={i} className="text-7xl drop-shadow-md">
                                        {item}
                                    </div>
                                ))}
                                <div className="w-24 h-24 border-4 border-sky-400 border-dashed rounded-3xl bg-white/60 animate-pulse flex items-center justify-center">
                                    <span className="text-5xl text-sky-300">?</span>
                                </div>
                            </div>

                            {/* Options */}
                            <div className="flex justify-center gap-12">
                                {patterns[currentStep - 1].options.map((option, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleChoice(option)}
                                        className="p-8 bg-white border-b-8 border-sky-200 rounded-3xl shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 text-7xl hover:border-sky-500 group"
                                    >
                                        <div className="group-hover:translate-x-2 transition-transform">
                                            {option}
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {showFeedback && (
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 animate-in zoom-in duration-300">
                                    <div className="bg-white p-10 rounded-full shadow-2xl border-8 border-green-400 animate-bounce">
                                        <span className="text-9xl">⭐</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default ExtendABPattern27;

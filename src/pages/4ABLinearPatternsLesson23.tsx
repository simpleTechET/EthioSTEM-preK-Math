import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Trees, Ghost, Heart } from "lucide-react";
import { MuteButton } from "@/components/MuteButton";
import { useAudio } from "@/context/AudioContext";

const ABLinearPatterns23 = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0); // 0: Intro, 1-3: Pattern levels
    const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [isComplete, setIsComplete] = useState(false);
    const { isMuted } = useAudio();

    const patterns = [
        { sequence: ["🍎", "🍐", "🍎", "🍐", "🍎", "🍐"], question: "What comes NEXT?", answer: "🍎", options: ["🍎", "🍐"] },
        { sequence: ["🦊", "🐰", "🦊", "🐰", "🦊", "🐰"], question: "What comes NEXT?", answer: "🦊", options: ["🦊", "🐰"] },
        { sequence: ["🌲", "🌳", "🌲", "🌳", "🌲", "🌳"], question: "What comes NEXT?", answer: "🌲", options: ["🌲", "🌳"] }
    ];

    const markLessonComplete = () => {
        const saved = localStorage.getItem("ethio-stem-m4-completed");
        const completed = saved ? JSON.parse(saved) : [];
        if (!completed.includes("23")) {
            completed.push("23");
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
        const currentPattern = patterns[currentStep - 1];
        if (option === currentPattern.answer) {
            setShowFeedback('correct');
            speak("Correct! You found the pattern!");
            setTimeout(() => {
                setShowFeedback(null);
                if (currentStep < 3) {
                    setCurrentStep(currentStep + 1);
                } else {
                    setIsComplete(true);
                    markLessonComplete();
                }
            }, 2000);
        } else {
            setShowFeedback('incorrect');
            speak("Not that one. Look closely at the order.");
            setTimeout(() => setShowFeedback(null), 2000);
        }
    };

    useEffect(() => {
        if (currentStep === 0) {
            speak("Welcome to the Pattern Path! Today we will learn about AB patterns. They repeat over and over!");
        } else if (currentStep > 0 && currentStep <= 3) {
            speak("Look at the line. What should come next in the pattern?");
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
                            <h1 className="text-2xl font-bold text-white drop-shadow-md">Lesson 23</h1>
                            <p className="text-white/80 font-medium tracking-wide">AB Linear Patterns</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <MuteButton />
                        <div className="bg-emerald-500 text-white px-4 py-1 rounded-full font-bold shadow-md border-2 border-emerald-300">
                            Pattern Power!
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
                            <div className="flex justify-center gap-4 animate-bounce">
                                <div className="text-6xl">🍎</div>
                                <div className="text-6xl">🍐</div>
                                <div className="text-6xl">🍎</div>
                                <div className="text-6xl">🍐</div>
                            </div>
                            <h2 className="text-4xl font-extrabold text-green-800 italic">Repeating Order</h2>
                            <p className="text-xl text-green-700 font-medium">Patterns go A, B, A, B. Can you find what's next?</p>
                            <Button
                                onClick={() => setCurrentStep(1)}
                                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-2xl px-12 py-8 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 border-b-4 border-emerald-800 font-bold"
                            >
                                START PATH!
                            </Button>
                        </div>
                    ) : isComplete ? (
                        <div className="text-center space-y-8 py-10 animate-in fade-in zoom-in duration-500">
                            <div className="text-7xl mb-6">➰✨</div>
                            <h2 className="text-4xl font-extrabold text-green-800 italic">Pattern Master!</h2>
                            <p className="text-xl text-green-700 font-medium">You identified every sequence!</p>
                            <Button
                                onClick={() => navigate("/activities/module-4")}
                                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-2xl px-12 py-8 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 border-b-4 border-green-800 font-bold"
                            >
                                BACK TO FOREST
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-12 relative py-4">
                            <h2 className="text-3xl font-bold text-center text-green-800 italic">
                                {patterns[currentStep - 1].question}
                            </h2>

                            <div className="bg-emerald-50/50 p-10 rounded-3xl border-4 border-dashed border-emerald-200 shadow-inner flex flex-wrap justify-center items-center gap-6 relative">
                                {patterns[currentStep - 1].sequence.map((item, i) => (
                                    <div
                                        key={i}
                                        className="text-7xl animate-in slide-in-from-left duration-500"
                                        style={{ transitionDelay: `${i * 100}ms` }}
                                    >
                                        {item}
                                    </div>
                                ))}
                                <div className="w-20 h-20 border-4 border-emerald-400 border-dashed rounded-2xl bg-white/50 flex items-center justify-center animate-pulse">
                                    <span className="text-4xl text-emerald-400">?</span>
                                </div>
                            </div>

                            <div className="flex justify-center gap-12 pt-8">
                                {patterns[currentStep - 1].options.map((option, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleChoice(option)}
                                        className="p-8 bg-white border-b-8 border-emerald-200 rounded-3xl shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 text-7xl hover:border-emerald-500 group"
                                    >
                                        <div className="group-hover:animate-bounce">
                                            {option}
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {showFeedback && (
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 animate-in zoom-in duration-300">
                                    <div className={`p-10 rounded-full shadow-2xl border-8 ${showFeedback === 'correct' ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'
                                        }`}>
                                        <span className="text-9xl">{showFeedback === 'correct' ? '✅' : '🧐'}</span>
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

export default ABLinearPatterns23;

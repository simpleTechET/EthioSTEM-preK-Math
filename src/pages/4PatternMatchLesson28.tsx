import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Trees, Layers, Heart } from "lucide-react";
import { MuteButton } from "@/components/MuteButton";
import { useAudio } from "@/context/AudioContext";

const PatternMatch28 = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0); // 0: Intro, 1-3: Levels
    const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [isComplete, setIsComplete] = useState(false);
    const { isMuted } = useAudio();

    const levels = [
        {
            target: ["🐝", "🌸", "🐝", "🌸"],
            choices: [
                ["🐝", "🌸", "🐝", "🌸"],
                ["🌸", "🐝", "🌸", "🐝"]
            ],
            answer: 0
        },
        {
            target: ["🌰", "🍂", "🌰", "🍂"],
            choices: [
                ["🍂", "🌰", "🍂", "🌰"],
                ["🌰", "🍂", "🌰", "🍂"]
            ],
            answer: 1
        },
        {
            target: ["🍎", "🍐", "🍎", "🍐"],
            choices: [
                ["🍎", "🍎", "🍐", "🍐"],
                ["🍎", "🍐", "🍎", "🍐"]
            ],
            answer: 1
        }
    ];

    const markLessonComplete = () => {
        const saved = localStorage.getItem("ethio-stem-m4-completed");
        const completed = saved ? JSON.parse(saved) : [];
        if (!completed.includes("28")) {
            completed.push("28");
            localStorage.setItem("ethio-stem-m4-completed", JSON.stringify(completed));
        }
    };

    const speak = (text: string) => {
        if (isMuted) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    };

    const handleChoice = (index: number) => {
        if (index === levels[currentStep - 1].answer) {
            setShowFeedback('correct');
            speak("Snap! That's the matching pattern!");
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
            speak("Try again. Look at the order carefully.");
            setTimeout(() => setShowFeedback(null), 1000);
        }
    };

    useEffect(() => {
        if (currentStep === 0) {
            speak("Let's play Pattern Match! Find the pattern that looks exactly like the target.");
        } else if (currentStep > 0 && currentStep <= 3) {
            speak("Which of these matches the pattern at the top?");
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
                            <h1 className="text-2xl font-bold text-white drop-shadow-md">Lesson 28</h1>
                            <p className="text-white/80 font-medium tracking-wide">Pattern Match</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <MuteButton />
                        <div className="bg-indigo-500 text-white px-4 py-1 rounded-full font-bold shadow-md border-2 border-indigo-300">
                            Snap!
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
                                <Layers className="w-32 h-32 text-indigo-600 animate-pulse" />
                            </div>
                            <h2 className="text-4xl font-extrabold text-green-800 italic">Finding Twins</h2>
                            <p className="text-xl text-green-700 font-medium">Can you spot the pattern that is exactly the same?</p>
                            <Button
                                onClick={() => setCurrentStep(1)}
                                className="bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white text-2xl px-12 py-8 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 border-b-4 border-indigo-800 font-bold"
                            >
                                SHOW ME!
                            </Button>
                        </div>
                    ) : isComplete ? (
                        <div className="text-center space-y-8 py-10 animate-in fade-in zoom-in duration-500">
                            <div className="text-8xl mb-6">🏆👯‍♂️🌈</div>
                            <h2 className="text-4xl font-extrabold text-green-800 italic">Unstoppable!</h2>
                            <p className="text-xl text-green-700 font-medium">You are the Pattern Match Master!</p>
                            <Button
                                onClick={() => navigate("/activities/module-4")}
                                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-2xl px-12 py-8 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 border-b-4 border-green-800 font-bold"
                            >
                                BACK TO FOREST
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-10 py-4 relative">
                            <div className="text-center space-y-4">
                                <h3 className="text-xl font-bold text-amber-600 uppercase tracking-widest">Find the Match:</h3>
                                <div className="flex justify-center gap-4 p-6 bg-white border-4 border-amber-200 rounded-3xl shadow-lg ring-8 ring-amber-50">
                                    {levels[currentStep - 1].target.map((item, i) => (
                                        <div key={i} className="text-6xl">{item}</div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-6">
                                {levels[currentStep - 1].choices.map((choice, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleChoice(i)}
                                        className="w-full p-8 bg-indigo-50 hover:bg-white border-4 border-indigo-100 rounded-3xl shadow-md transition-all duration-300 hover:shadow-xl group flex justify-center gap-6"
                                    >
                                        {choice.map((item, idx) => (
                                            <div key={idx} className="text-6xl group-hover:scale-110 transition-transform">
                                                {item}
                                            </div>
                                        ))}
                                    </button>
                                ))}
                            </div>

                            {showFeedback && (
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 animate-in zoom-in duration-300">
                                    <div className="bg-white p-12 rounded-full shadow-2xl border-8 border-green-500 animate-bounce">
                                        <span className="text-9xl">🎈</span>
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

export default PatternMatch28;

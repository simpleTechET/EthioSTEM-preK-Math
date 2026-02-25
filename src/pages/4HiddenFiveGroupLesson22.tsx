import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Trees, Hand, Eye } from "lucide-react";
import { MuteButton } from "@/components/MuteButton";
import { useAudio } from "@/context/AudioContext";

const HiddenFiveGroup22 = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0); // 0: Intro, 1: 6 (5+1), 2: 7 (5+2), 3: 8 (5+3)
    const [showFiveGroup, setShowFiveGroup] = useState(false);
    const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [isComplete, setIsComplete] = useState(false);
    const { isMuted } = useAudio();

    const levels = [
        { total: 6, part1: 5, part2: 1, icon: "🐞", name: "ladybugs" },
        { total: 7, part1: 5, part2: 2, icon: "🦋", name: "butterflies" },
        { total: 8, part1: 5, part2: 3, icon: "🐜", name: "ants" }
    ];

    const markLessonComplete = () => {
        const saved = localStorage.getItem("ethio-stem-m4-completed");
        const completed = saved ? JSON.parse(saved) : [];
        if (!completed.includes("22")) {
            completed.push("22");
            localStorage.setItem("ethio-stem-m4-completed", JSON.stringify(completed));
        }
    };

    const speak = (text: string) => {
        if (isMuted) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    };

    const handleReveal = () => {
        if (showFiveGroup) return;

        setShowFiveGroup(true);
        const level = levels[currentStep - 1];
        speak(`Look! I see 5 and ${level.part2}. That makes ${level.total}!`);

        setShowFeedback('correct');
        setTimeout(() => {
            setShowFeedback(null);
            setShowFiveGroup(false);
            if (currentStep < 3) {
                setCurrentStep(currentStep + 1);
            } else {
                setIsComplete(true);
                markLessonComplete();
            }
        }, 3000);
    };

    useEffect(() => {
        if (currentStep === 0) {
            speak("Let's look for the hidden 5-group! Some big numbers have a 5-group inside them.");
        } else if (currentStep > 0 && currentStep <= 3) {
            const level = levels[currentStep - 1];
            speak(`Count all the ${level.name}. Can you see the 5-group hiding inside?`);
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
                            <h1 className="text-2xl font-bold text-white drop-shadow-md">Lesson 22</h1>
                            <p className="text-white/80 font-medium tracking-wide">The Hidden 5-Group</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <MuteButton />
                        <div className="bg-blue-500 text-white px-4 py-1 rounded-full font-bold shadow-md border-2 border-blue-300">
                            X-Ray Vision!
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
                                <Eye className="w-32 h-32 text-blue-600 animate-pulse" />
                            </div>
                            <h2 className="text-4xl font-extrabold text-green-800 italic">Hiding in Plain Sight</h2>
                            <p className="text-xl text-green-700 font-medium">Can you find the group of 5 inside big numbers?</p>
                            <Button
                                onClick={() => setCurrentStep(1)}
                                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-2xl px-12 py-8 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 border-b-4 border-blue-800 font-bold"
                            >
                                START SCANNING!
                            </Button>
                        </div>
                    ) : isComplete ? (
                        <div className="text-center space-y-8 py-10 animate-in fade-in zoom-in duration-500">
                            <div className="text-8xl mb-6">🔍🖐️</div>
                            <h2 className="text-4xl font-extrabold text-green-800 italic">Super Spotter!</h2>
                            <p className="text-xl text-green-700 font-medium">You found the hidden 5 in every group!</p>
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
                                How many {levels[currentStep - 1].name}? Can you find 5?
                            </h2>

                            <div className="relative min-h-[350px] bg-slate-50 rounded-3xl border-4 border-blue-100 p-8 flex items-center justify-center overflow-hidden">
                                <div className="grid grid-cols-2 gap-12">
                                    {/* 5-Group Base */}
                                    <div className={`relative p-6 rounded-2xl transition-all duration-500 transform ${showFiveGroup ? 'bg-blue-100 border-2 border-blue-500 scale-105 shadow-xl' : ''
                                        }`}>
                                        <div className="grid grid-cols-3 gap-4">
                                            {[...Array(5)].map((_, i) => (
                                                <div key={i} className={`text-6xl transition-all duration-500 ${showFiveGroup ? 'brightness-110 drop-shadow-lg' : 'opacity-80'
                                                    }`}>
                                                    {levels[currentStep - 1].icon}
                                                </div>
                                            ))}
                                        </div>
                                        {showFiveGroup && (
                                            <div className="absolute -top-4 -left-4 bg-blue-600 text-white font-black px-4 py-1 rounded-full text-xl shadow-lg border-2 border-white animate-bounce">
                                                5
                                            </div>
                                        )}
                                    </div>

                                    {/* Extra Ones */}
                                    <div className="flex flex-col justify-center gap-4">
                                        {[...Array(levels[currentStep - 1].part2)].map((_, i) => (
                                            <div key={i} className="text-6xl animate-in slide-in-from-right duration-500">
                                                {levels[currentStep - 1].icon}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {showFeedback && (
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 animate-in zoom-in duration-500 text-9xl">
                                        🌟
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col items-center gap-6">
                                <Button
                                    onClick={handleReveal}
                                    disabled={showFiveGroup}
                                    className="bg-blue-500 hover:bg-blue-600 text-white text-2xl px-12 py-8 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 border-b-4 border-blue-800 font-bold flex items-center gap-3"
                                >
                                    <Eye className="w-8 h-8" /> REVEAL THE 5-GROUP!
                                </Button>
                                <p className="text-blue-800 font-bold italic animate-pulse">
                                    Click the button to see the hidden 5!
                                </p>
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default HiddenFiveGroup22;

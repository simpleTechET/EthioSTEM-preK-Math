import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Trees, Palette, Sparkles } from "lucide-react";
import { MuteButton } from "@/components/MuteButton";
import { useAudio } from "@/context/AudioContext";

const CreateABPattern26 = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0); // 0: Intro, 1: Create
    const [selections, setSelections] = useState<string[]>([]);
    const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [isComplete, setIsComplete] = useState(false);
    const { isMuted } = useAudio();

    const options = ["🐝", "🐝", "🐞", "🐞", "🐜", "🐜"]; // Just a pool

    const markLessonComplete = () => {
        const saved = localStorage.getItem("ethio-stem-m4-completed");
        const completed = saved ? JSON.parse(saved) : [];
        if (!completed.includes("26")) {
            completed.push("26");
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

        const newSelections = [...selections, item];
        setSelections(newSelections);
        speak("Added!");

        // Check if it's a valid AB pattern after at least 4 items
        if (newSelections.length >= 4) {
            const isPattern = newSelections.every((val, i) => {
                if (i < 2) return true;
                return val === newSelections[i - 2];
            }) && newSelections[0] !== newSelections[1];

            if (isPattern && newSelections.length === 6) {
                setShowFeedback('correct');
                speak("Wow! You made a beautiful repeating pattern!");
                setTimeout(() => {
                    setShowFeedback(null);
                    setIsComplete(true);
                    markLessonComplete();
                }, 2500);
            } else if (!isPattern && newSelections.length >= 4) {
                // Not a pattern - we could warn or let them finish
            }
        }
    };

    const resetSelections = () => {
        setSelections([]);
        setShowFeedback(null);
    };

    useEffect(() => {
        if (currentStep === 0) {
            speak("It's your turn! Can you create your own AB repeating pattern?");
        } else if (currentStep === 1) {
            speak("Choose two things and make them repeat over and over!");
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
                            <h1 className="text-2xl font-bold text-white drop-shadow-md">Lesson 26</h1>
                            <p className="text-white/80 font-medium tracking-wide">Create Your Pattern</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <MuteButton />
                        <div className="bg-amber-500 text-white px-4 py-1 rounded-full font-bold shadow-md border-2 border-amber-300">
                            Creator Mode!
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
                                <Palette className="w-32 h-32 text-amber-600 animate-pulse" />
                                <Sparkles className="absolute -top-4 -right-4 w-12 h-12 text-yellow-400 animate-bounce" />
                            </div>
                            <h2 className="text-4xl font-extrabold text-green-800 italic">Be the Pattern Boss!</h2>
                            <p className="text-xl text-green-700 font-medium">You choose the pieces. You make the pattern!</p>
                            <Button
                                onClick={() => setCurrentStep(1)}
                                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-2xl px-12 py-8 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 border-b-4 border-amber-800 font-bold"
                            >
                                I'M READY!
                            </Button>
                        </div>
                    ) : isComplete ? (
                        <div className="text-center space-y-8 py-10 animate-in fade-in zoom-in duration-500">
                            <div className="text-8xl mb-6">🎨✨🐝</div>
                            <h2 className="text-4xl font-extrabold text-green-800 italic">Incredible!</h2>
                            <p className="text-xl text-green-700 font-medium">You are a pattern-making genius!</p>
                            <Button
                                onClick={() => navigate("/activities/module-4")}
                                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-2xl px-12 py-8 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 border-b-4 border-green-800 font-bold"
                            >
                                BACK TO FOREST
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-12 py-4 relative">
                            <div className="text-center space-y-4">
                                <h2 className="text-3xl font-extrabold text-green-800 italic">
                                    Make a pattern that repeats!
                                </h2>
                                <p className="text-lg font-medium text-amber-700">
                                    A, B, A, B, A, B...
                                </p>
                            </div>

                            {/* Canvas */}
                            <div className="flex justify-center flex-wrap gap-4 min-h-[160px] p-8 bg-amber-50/50 rounded-3xl border-4 border-dashed border-amber-200 shadow-inner items-center">
                                {selections.map((item, i) => (
                                    <div key={i} className="text-7xl animate-in zoom-in slide-in-from-top-4 duration-500 drop-shadow-md">
                                        {item}
                                    </div>
                                ))}
                                {selections.length < 6 && (
                                    <div className="w-20 h-20 bg-white/40 border-2 border-amber-300 rounded-2xl flex items-center justify-center text-amber-300 animate-pulse bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
                                        +
                                    </div>
                                )}
                            </div>

                            {/* Options Pile */}
                            <div className="space-y-6">
                                <div className="flex justify-center gap-6">
                                    {["🐝", "🐞", "🐜"].map((item, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleSelect(item)}
                                            className="p-6 bg-white border-b-4 border-amber-100 rounded-3xl shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 text-7xl hover:border-amber-400 group"
                                        >
                                            <div className="group-hover:animate-bounce">{item}</div>
                                        </button>
                                    ))}
                                </div>

                                <div className="flex justify-center">
                                    <Button
                                        variant="outline"
                                        onClick={resetSelections}
                                        className="text-amber-700 border-amber-300 hover:bg-amber-50 px-8 rounded-xl font-bold italic"
                                    >
                                        RESTART PATTERN
                                    </Button>
                                </div>
                            </div>

                            {showFeedback && (
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 animate-in zoom-in duration-300">
                                    <div className="p-12 bg-white rounded-full shadow-2xl border-8 border-green-400 animate-bounce">
                                        <span className="text-8xl">👑</span>
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

export default CreateABPattern26;

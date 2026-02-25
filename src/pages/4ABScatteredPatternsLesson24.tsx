import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Trees, Ghost, Heart } from "lucide-react";
import { MuteButton } from "@/components/MuteButton";
import { useAudio } from "@/context/AudioContext";

const ABScatteredPatterns24 = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0); // 0: Intro, 1: Level 1
    const [selections, setSelections] = useState<string[]>([]);
    const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [isComplete, setIsComplete] = useState(false);
    const { isMuted } = useAudio();

    const targetPattern = ["🍄", "🍂", "🍄", "🍂"];
    const pool = ["🍄", "🍂", "🍄", "🍂", "🌸", "🌰"];

    const markLessonComplete = () => {
        const saved = localStorage.getItem("ethio-stem-m4-completed");
        const completed = saved ? JSON.parse(saved) : [];
        if (!completed.includes("24")) {
            completed.push("24");
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
        if (selections.length >= 4) return;

        const nextTarget = targetPattern[selections.length];
        if (item === nextTarget) {
            const newSelections = [...selections, item];
            setSelections(newSelections);
            speak(item === "🍄" ? "Mushroom" : "Leaf");

            if (newSelections.length === 4) {
                setShowFeedback('correct');
                speak("Great job! You made a mushroom, leaf, mushroom, leaf pattern!");
                setTimeout(() => {
                    setShowFeedback(null);
                    setIsComplete(true);
                    markLessonComplete();
                }, 2500);
            }
        } else {
            setShowFeedback('incorrect');
            speak("That's not next in our pattern. Try a different one!");
            setTimeout(() => setShowFeedback(null), 1000);
        }
    };

    useEffect(() => {
        if (currentStep === 0) {
            speak("Patterns aren't always in a straight line! Can you find the pieces for a mushroom, leaf pattern from the scattered group?");
        } else if (currentStep === 1) {
            speak("Pick the items to make a Mushroom then Leaf pattern.");
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
                            <h1 className="text-2xl font-bold text-white drop-shadow-md">Lesson 24</h1>
                            <p className="text-white/80 font-medium tracking-wide">AB Scattered Patterns</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <MuteButton />
                        <div className="bg-amber-500 text-white px-4 py-1 rounded-full font-bold shadow-md border-2 border-amber-300">
                            Scattered Patterns!
                        </div>
                    </div>
                </div>

                <Card className="p-8 bg-white/90 backdrop-blur-sm shadow-2xl border-4 border-green-200 rounded-3xl relative overflow-hidden">
                    {/* Progress Bar */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-green-100">
                        <div
                            className="h-full bg-green-500 transition-all duration-500"
                            style={{ width: `${(selections.length / 4) * 100}%` }}
                        />
                    </div>

                    {currentStep === 0 ? (
                        <div className="text-center space-y-8 py-10">
                            <div className="relative text-8xl animate-bounce">
                                🍄 🍂
                            </div>
                            <h2 className="text-4xl font-extrabold text-green-800 italic">Finding the Pieces</h2>
                            <p className="text-xl text-green-700 font-medium">The pattern pieces are all mixed up. Can you find them?</p>
                            <Button
                                onClick={() => setCurrentStep(1)}
                                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-2xl px-12 py-8 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 border-b-4 border-amber-800 font-bold"
                            >
                                LET'S FIND THEM!
                            </Button>
                        </div>
                    ) : isComplete ? (
                        <div className="text-center space-y-8 py-10 animate-in fade-in zoom-in duration-500">
                            <div className="text-8xl mb-6">🎯✨</div>
                            <h2 className="text-4xl font-extrabold text-green-800 italic">Excellent!</h2>
                            <p className="text-xl text-green-700 font-medium">You found the pattern in the pile!</p>
                            <Button
                                onClick={() => navigate("/activities/module-4")}
                                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-2xl px-12 py-8 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 border-b-4 border-green-800 font-bold"
                            >
                                BACK TO FOREST
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-12 py-4">
                            <div className="text-center">
                                <h2 className="text-3xl font-bold text-green-800 italic mb-4">Make the pattern:</h2>
                                <div className="flex justify-center gap-4 bg-white/50 p-4 rounded-3xl inline-flex border-2 border-white shadow-inner">
                                    {targetPattern.map((item, i) => (
                                        <div key={i} className={`text-5xl transition-all duration-500 ${i < selections.length ? 'opacity-100 scale-100' : 'opacity-20 scale-75 blur-[1px]'}`}>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative h-[350px] bg-amber-50/50 rounded-3xl border-4 border-dashed border-amber-200">
                                {/* Pool of Mixed Items */}
                                {pool.map((item, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleSelect(item)}
                                        className="absolute text-7xl hover:scale-125 transition-transform duration-300 hover:rotate-6 active:scale-90"
                                        style={{
                                            top: `${[20, 60, 40, 10, 70, 30][i]}%`,
                                            left: `${[15, 25, 45, 60, 75, 85][i]}%`
                                        }}
                                    >
                                        <div className="relative group">
                                            {item}
                                            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 rounded-full blur-xl transition-colors"></div>
                                        </div>
                                    </button>
                                ))}

                                {showFeedback && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-white/30 backdrop-blur-[1px] rounded-3xl animate-in zoom-in duration-300">
                                        <div className={`p-10 rounded-full shadow-2xl border-8 ${showFeedback === 'correct' ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'
                                            }`}>
                                            <span className="text-8xl">{showFeedback === 'correct' ? '🌟' : '🧐'}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <p className="text-center text-green-800 font-bold animate-pulse text-xl">
                                {selections.length === 0 ? "What's first? Mushroom or Leaf?" : selections.length < 4 ? "What comes NEXT?" : ""}
                            </p>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default ABScatteredPatterns24;

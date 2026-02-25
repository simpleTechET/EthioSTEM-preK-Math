import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Trees, Nut, Squirrel } from "lucide-react";
import { MuteButton } from "@/components/MuteButton";
import { useAudio } from "@/context/AudioContext";

const AreThereEnoughMatching16 = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0); // 0: Intro, 1-3: Matching levels
    const [matches, setMatches] = useState<number[]>([]); // Indices of squirrels that have nuts
    const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [isComplete, setIsComplete] = useState(false);
    const { isMuted } = useAudio();

    const levels = [
        { squirrels: 3, nuts: 3, question: "Is there a nut for EACH squirrel?" },
        { squirrels: 4, nuts: 3, question: "Are there ENOUGH nuts for every squirrel?" },
        { squirrels: 2, nuts: 4, question: "Are there ENOUGH nuts for every squirrel?" }
    ];

    const markLessonComplete = () => {
        const saved = localStorage.getItem("ethio-stem-m4-completed");
        const completed = saved ? JSON.parse(saved) : [];
        if (!completed.includes("16")) {
            completed.push("16");
            localStorage.setItem("ethio-stem-m4-completed", JSON.stringify(completed));
        }
    };

    const speak = (text: string) => {
        if (isMuted) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    };

    const handleMatch = (squirrelIndex: number) => {
        if (matches.includes(squirrelIndex)) return;

        const newMatches = [...matches, squirrelIndex];
        setMatches(newMatches);
        speak("Yum!");

        if (newMatches.length === Math.min(levels[currentStep - 1].squirrels, levels[currentStep - 1].nuts)) {
            // All possible pairs matched, now ask the final question for the level
            speak(levels[currentStep - 1].question);
        }
    };

    const handleChoice = (choice: 'yes' | 'no') => {
        const level = levels[currentStep - 1];
        const isCorrect = (choice === 'yes' && level.nuts >= level.squirrels) ||
            (choice === 'no' && level.nuts < level.squirrels);

        if (isCorrect) {
            setShowFeedback('correct');
            speak("Correct! You figured it out!");
            setTimeout(() => {
                setShowFeedback(null);
                setMatches([]);
                if (currentStep < 3) {
                    setCurrentStep(currentStep + 1);
                } else {
                    setIsComplete(true);
                    markLessonComplete();
                }
            }, 2000);
        } else {
            setShowFeedback('incorrect');
            speak("Take another look. Does everyone have a treat?");
            setTimeout(() => setShowFeedback(null), 2000);
        }
    };

    useEffect(() => {
        if (currentStep === 0) {
            speak("Let's help the squirrels find their nuts! We need to see if there are enough for everyone.");
        } else if (currentStep > 0 && currentStep <= 3) {
            speak("Match the nuts to the squirrels to see if there are enough.");
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
                            <h1 className="text-2xl font-bold text-white drop-shadow-md">Lesson 16</h1>
                            <p className="text-white/80 font-medium tracking-wide">Are There Enough? (Matching)</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <MuteButton />
                        <div className="bg-orange-500 text-white px-4 py-1 rounded-full font-bold shadow-md border-2 border-orange-300">
                            Snack Time!
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
                            <div className="flex justify-center gap-8 animate-bounce">
                                <Squirrel className="w-24 h-24 text-amber-700" />
                                <Nut className="w-24 h-24 text-amber-900" />
                            </div>
                            <h2 className="text-4xl font-extrabold text-green-800 italic">Matching Treats</h2>
                            <p className="text-xl text-green-700 font-medium">Can we give every squirrel a nut?</p>
                            <Button
                                onClick={() => setCurrentStep(1)}
                                className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white text-2xl px-12 py-8 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 border-b-4 border-orange-800 font-bold"
                            >
                                LET'S HELP!
                            </Button>
                        </div>
                    ) : isComplete ? (
                        <div className="text-center space-y-8 py-10 animate-in fade-in zoom-in duration-500">
                            <div className="text-7xl mb-6">🐿️🥜</div>
                            <h2 className="text-4xl font-extrabold text-green-800 italic">Great Job!</h2>
                            <p className="text-xl text-green-700 font-medium">The squirrels are all happy!</p>
                            <Button
                                onClick={() => navigate("/activities/module-4")}
                                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-2xl px-12 py-8 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 border-b-4 border-green-800 font-bold"
                            >
                                BACK TO FOREST
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-8 relative">
                            <h2 className="text-2xl font-bold text-center text-green-800 italic">
                                {levels[currentStep - 1].question}
                            </h2>

                            <div className="grid grid-cols-2 gap-12 p-8 bg-amber-50/50 rounded-3xl border-2 border-dashed border-amber-200 min-h-[400px]">
                                {/* Squirrels Column */}
                                <div className="space-y-4 flex flex-col items-center justify-center">
                                    <h3 className="font-bold text-amber-800 uppercase tracking-tighter text-sm mb-4">Squirrels</h3>
                                    {[...Array(levels[currentStep - 1].squirrels)].map((_, i) => (
                                        <div
                                            key={`s-${i}`}
                                            className={`relative p-4 rounded-2xl transition-all duration-300 border-b-4 ${matches.includes(i) ? 'bg-green-100 border-green-500 scale-110 shadow-lg' : 'bg-white border-amber-200 hover:border-amber-400 cursor-pointer'
                                                }`}
                                            onClick={() => handleMatch(i)}
                                        >
                                            <Squirrel className={`w-16 h-16 ${matches.includes(i) ? 'text-green-600' : 'text-amber-700'}`} />
                                            {matches.includes(i) && (
                                                <div className="absolute -top-2 -right-2 text-2xl">✨</div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Nuts Column */}
                                <div className="space-y-4 flex flex-col items-center justify-center">
                                    <h3 className="font-bold text-amber-800 uppercase tracking-tighter text-sm mb-4">Nuts</h3>
                                    {[...Array(levels[currentStep - 1].nuts)].map((_, i) => (
                                        <div
                                            key={`n-${i}`}
                                            className="p-4 bg-white rounded-full shadow-md border-b-4 border-amber-800 animate-pulse"
                                        >
                                            <Nut className="w-12 h-12 text-amber-900" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Interaction Hint or Selection */}
                            <div className="flex flex-col items-center gap-6">
                                {matches.length < Math.min(levels[currentStep - 1].squirrels, levels[currentStep - 1].nuts) ? (
                                    <p className="text-lg font-medium text-amber-800 animate-bounce">
                                        Click a squirrel to give it a nut!
                                    </p>
                                ) : (
                                    <div className="flex gap-8 animate-in slide-in-from-bottom duration-500">
                                        <Button
                                            onClick={() => handleChoice('yes')}
                                            className="bg-green-500 hover:bg-green-600 text-white text-xl px-10 py-6 rounded-2xl shadow-lg font-bold border-b-4 border-green-700"
                                        >
                                            YES, ENOUGH!
                                        </Button>
                                        <Button
                                            onClick={() => handleChoice('no')}
                                            className="bg-red-500 hover:bg-red-600 text-white text-xl px-10 py-6 rounded-2xl shadow-lg font-bold border-b-4 border-red-700"
                                        >
                                            NO, NOT ENOUGH
                                        </Button>
                                    </div>
                                )}
                            </div>

                            {showFeedback && (
                                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl z-50 animate-in zoom-in duration-300`}>
                                    {showFeedback === 'correct' ? '🥜' : '🐿️'}
                                </div>
                            )}
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default AreThereEnoughMatching16;

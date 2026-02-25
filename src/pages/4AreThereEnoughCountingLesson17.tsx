import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Trees, Ghost, Heart } from "lucide-react";
import { MuteButton } from "@/components/MuteButton";
import { useAudio } from "@/context/AudioContext";

const AreThereEnoughCounting17 = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0); // 0: Intro, 1-3: Counting levels
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);
    const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [isComplete, setIsComplete] = useState(false);
    const { isMuted } = useAudio();

    const levels = [
        { group1: 5, group2: 5, item1: "Birds", item2: "Nests", icon1: "🐦", icon2: "🪹" },
        { group1: 3, group2: 4, item1: "Bees", item2: "Flowers", icon1: "🐝", icon2: "🌸" },
        { group1: 6, group2: 4, item1: "Frogs", item2: "Lilypads", icon1: "🐸", icon2: "🍃" }
    ];

    const markLessonComplete = () => {
        const saved = localStorage.getItem("ethio-stem-m4-completed");
        const completed = saved ? JSON.parse(saved) : [];
        if (!completed.includes("17")) {
            completed.push("17");
            localStorage.setItem("ethio-stem-m4-completed", JSON.stringify(completed));
        }
    };

    const speak = (text: string) => {
        if (isMuted) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    };

    const handleChoice = (choice: 'yes' | 'no') => {
        const level = levels[currentStep - 1];
        const isCorrect = (choice === 'yes' && level.group2 >= level.group1) ||
            (choice === 'no' && level.group2 < level.group1);

        if (isCorrect) {
            setShowFeedback('correct');
            speak("Yes! You counted correctly!");
            setTimeout(() => {
                setShowFeedback(null);
                setCount1(0);
                setCount2(0);
                if (currentStep < 3) {
                    setCurrentStep(currentStep + 1);
                } else {
                    setIsComplete(true);
                    markLessonComplete();
                }
            }, 2000);
        } else {
            setShowFeedback('incorrect');
            speak("Let's count again together.");
            setTimeout(() => setShowFeedback(null), 2000);
        }
    };

    useEffect(() => {
        if (currentStep === 0) {
            speak("Let's count to see if we have enough! Count the first group, then the second group.");
        } else if (currentStep > 0 && currentStep <= 3) {
            const level = levels[currentStep - 1];
            speak(`Are there enough ${level.item2} for the ${level.item1}? Count them and find out!`);
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
                            <h1 className="text-2xl font-bold text-white drop-shadow-md">Lesson 17</h1>
                            <p className="text-white/80 font-medium tracking-wide">Are There Enough? (Counting)</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <MuteButton />
                        <div className="bg-sky-500 text-white px-4 py-1 rounded-full font-bold shadow-md border-2 border-sky-300">
                            Counting Time!
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
                            <div className="text-8xl animate-bounce">🔢</div>
                            <h2 className="text-4xl font-extrabold text-green-800 italic">Counting for Enough</h2>
                            <p className="text-xl text-green-700 font-medium">Use your counting skills to find out!</p>
                            <Button
                                onClick={() => setCurrentStep(1)}
                                className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white text-2xl px-12 py-8 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 border-b-4 border-blue-800 font-bold"
                            >
                                START COUNTING!
                            </Button>
                        </div>
                    ) : isComplete ? (
                        <div className="text-center space-y-8 py-10 animate-in fade-in zoom-in duration-500">
                            <div className="text-7xl mb-6">🎯✅</div>
                            <h2 className="text-4xl font-extrabold text-green-800 italic">Expert Counter!</h2>
                            <p className="text-xl text-green-700 font-medium">You identified all the groups!</p>
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
                                Are there enough {levels[currentStep - 1].item2} for all the {levels[currentStep - 1].item1}?
                            </h2>

                            <div className="grid grid-cols-2 gap-8 p-6 bg-sky-50 rounded-3xl border-4 border-sky-100">
                                {/* Group 1 */}
                                <div className="space-y-4">
                                    <div className="flex flex-wrap gap-4 justify-center min-h-[160px] p-6 bg-white rounded-2xl shadow-inner border-2 border-dashed border-sky-200">
                                        {[...Array(levels[currentStep - 1].group1)].map((_, i) => (
                                            <button
                                                key={`g1-${i}`}
                                                onClick={() => {
                                                    if (i === count1) {
                                                        setCount1(i + 1);
                                                        speak(`${i + 1}`);
                                                    }
                                                }}
                                                className={`text-5xl transition-all duration-300 transform hover:scale-125 ${i < count1 ? 'opacity-100 scale-110 grayscale-0' : 'opacity-40 grayscale blur-[1px]'
                                                    }`}
                                            >
                                                {levels[currentStep - 1].icon1}
                                                {i < count1 && (
                                                    <span className="absolute -top-4 -left-4 bg-sky-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-sm">
                                                        {i + 1}
                                                    </span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="text-center">
                                        <span className="bg-sky-100 text-sky-800 px-6 py-2 rounded-full font-extrabold text-xl border-2 border-sky-200">
                                            {count1} {levels[currentStep - 1].item1}
                                        </span>
                                    </div>
                                </div>

                                {/* Group 2 */}
                                <div className="space-y-4">
                                    <div className="flex flex-wrap gap-4 justify-center min-h-[160px] p-6 bg-white rounded-2xl shadow-inner border-2 border-dashed border-pink-200">
                                        {[...Array(levels[currentStep - 1].group2)].map((_, i) => (
                                            <button
                                                key={`g2-${i}`}
                                                onClick={() => {
                                                    if (i === count2) {
                                                        setCount2(i + 1);
                                                        speak(`${i + 1}`);
                                                    }
                                                }}
                                                className={`text-5xl transition-all duration-300 transform hover:scale-125 ${i < count2 ? 'opacity-100 scale-110 grayscale-0' : 'opacity-40 grayscale blur-[1px]'
                                                    }`}
                                            >
                                                {levels[currentStep - 1].icon2}
                                                {i < count2 && (
                                                    <span className="absolute -top-4 -left-4 bg-pink-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-sm">
                                                        {i + 1}
                                                    </span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="text-center">
                                        <span className="bg-pink-100 text-pink-800 px-6 py-2 rounded-full font-extrabold text-xl border-2 border-pink-200">
                                            {count2} {levels[currentStep - 1].item2}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Question Choice */}
                            <div className="flex flex-col items-center gap-6">
                                {count1 === levels[currentStep - 1].group1 && count2 === levels[currentStep - 1].group2 ? (
                                    <div className="flex gap-8 animate-in slide-in-from-bottom duration-500">
                                        <Button
                                            onClick={() => handleChoice('yes')}
                                            className="bg-green-500 hover:bg-green-600 text-white text-2xl px-12 py-6 rounded-2xl shadow-xl font-bold border-b-4 border-green-700 transition-all hover:-translate-y-1"
                                        >
                                            YES!
                                        </Button>
                                        <Button
                                            onClick={() => handleChoice('no')}
                                            className="bg-red-500 hover:bg-red-600 text-white text-2xl px-12 py-6 rounded-2xl shadow-xl font-bold border-b-4 border-red-700 transition-all hover:-translate-y-1"
                                        >
                                            NO
                                        </Button>
                                    </div>
                                ) : (
                                    <p className="text-lg font-bold text-sky-800 animate-pulse bg-sky-100 px-6 py-2 rounded-full border-2 border-sky-300">
                                        Count all items to answer!
                                    </p>
                                )}
                            </div>

                            {showFeedback && (
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 animate-in zoom-in duration-300">
                                    <div className={`p-8 rounded-full shadow-2xl ${showFeedback === 'correct' ? 'bg-green-100 border-4 border-green-500' : 'bg-red-100 border-4 border-red-500'}`}>
                                        <span className="text-8xl">{showFeedback === 'correct' ? '🌟' : '🧐'}</span>
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

export default AreThereEnoughCounting17;

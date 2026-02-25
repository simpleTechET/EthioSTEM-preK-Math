import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Trees, Minus } from "lucide-react";
import { MuteButton } from "@/components/MuteButton";
import { useAudio } from "@/context/AudioContext";

const OneLess19 = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0); // 0: Intro, 1-3: Challenges
    const [items, setItems] = useState<number>(0);
    const [expectedCount, setExpectedCount] = useState<number>(0);
    const [removedIndex, setRemovedIndex] = useState<number | null>(null);
    const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [isComplete, setIsComplete] = useState(false);
    const { isMuted } = useAudio();

    const levels = [
        { start: 3, icon: "🍂", name: "leaves", bgColor: "bg-amber-50", borderColor: "border-amber-200" },
        { start: 5, icon: "🍄", name: "mushrooms", bgColor: "bg-red-50", borderColor: "border-red-200" },
        { start: 2, icon: "🥨", name: "treats", bgColor: "bg-orange-50", borderColor: "border-orange-200" }
    ];

    const markLessonComplete = () => {
        const saved = localStorage.getItem("ethio-stem-m4-completed");
        const completed = saved ? JSON.parse(saved) : [];
        if (!completed.includes("19")) {
            completed.push("19");
            localStorage.setItem("ethio-stem-m4-completed", JSON.stringify(completed));
        }
    };

    const speak = (text: string) => {
        if (isMuted) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    };

    const handleRemoveItem = (index: number) => {
        if (removedIndex !== null) return;

        setRemovedIndex(index);
        const newCount = items - 1;
        speak(`Gone! Now we have ${newCount}.`);

        setShowFeedback('correct');
        setTimeout(() => {
            setShowFeedback(null);
            setRemovedIndex(null);
            if (currentStep < 3) {
                setCurrentStep(currentStep + 1);
            } else {
                setIsComplete(true);
                markLessonComplete();
            }
        }, 2500);
    };

    useEffect(() => {
        if (currentStep === 0) {
            speak("Welcome! Today we will learn about 'One Less'. Removing one makes a smaller group!");
        } else if (currentStep > 0 && currentStep <= 3) {
            const level = levels[currentStep - 1];
            setItems(level.start);
            setExpectedCount(level.start - 1);
            speak(`Here are ${level.start} ${level.name}. Take ONE AWAY and see how many are left!`);
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
                            <h1 className="text-2xl font-bold text-white drop-shadow-md">Lesson 19</h1>
                            <p className="text-white/80 font-medium tracking-wide">The "One Less" Game</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <MuteButton />
                        <div className="bg-amber-500 text-white px-4 py-1 rounded-full font-bold shadow-md border-2 border-amber-300">
                            Minus One!
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
                                <Minus className="w-32 h-32 text-amber-600 animate-pulse" />
                                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl font-black text-amber-700">1</span>
                            </div>
                            <h2 className="text-4xl font-extrabold text-green-800 italic">Finding One Less</h2>
                            <p className="text-xl text-green-700 font-medium">Take one away and count what's left!</p>
                            <Button
                                onClick={() => setCurrentStep(1)}
                                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-2xl px-12 py-8 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 border-b-4 border-amber-800 font-bold"
                            >
                                START!
                            </Button>
                        </div>
                    ) : isComplete ? (
                        <div className="text-center space-y-8 py-10 animate-in fade-in zoom-in duration-500">
                            <div className="text-7xl mb-6">📉🍂</div>
                            <h2 className="text-4xl font-extrabold text-green-800 italic">Subtraction Star!</h2>
                            <p className="text-xl text-green-700 font-medium">You noticed the group got smaller!</p>
                            <Button
                                onClick={() => navigate("/activities/module-4")}
                                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-2xl px-12 py-8 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 border-b-4 border-green-800 font-bold"
                            >
                                BACK TO FOREST
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-8 relative">
                            <div className="text-center space-y-2">
                                <h2 className="text-3xl font-extrabold text-green-800 italic">
                                    Take ONE {levels[currentStep - 1].icon} away!
                                </h2>
                                <p className="text-xl font-bold text-red-600">
                                    {levels[currentStep - 1].start} - 1 = ?
                                </p>
                            </div>

                            <div className={`relative min-h-[300px] flex items-center justify-center rounded-3xl border-4 border-dashed ${levels[currentStep - 1].borderColor} ${levels[currentStep - 1].bgColor} p-8 transition-colors duration-500`}>
                                {/* Items Area */}
                                <div className="flex flex-wrap gap-10 justify-center max-w-xl">
                                    {[...Array(levels[currentStep - 1].start)].map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleRemoveItem(i)}
                                            disabled={removedIndex !== null}
                                            className={`text-8xl transition-all duration-500 transform hover:scale-110 hover:-rotate-6 active:scale-90 ${removedIndex === i ? 'scale-0 translate-y-20 rotate-45 opacity-0' : 'opacity-100'
                                                } ${removedIndex !== null && removedIndex !== i ? 'scale-110 grayscale-[0.5]' : ''}`}
                                        >
                                            <div className="relative group">
                                                {levels[currentStep - 1].icon}
                                                <div className="absolute -top-4 -left-4 text-sm bg-white/80 px-2 rounded-full font-bold opacity-0 group-hover:opacity-100 transition-opacity">Remove</div>
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                {showFeedback && (
                                    <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px] rounded-3xl flex items-center justify-center animate-in fade-in duration-300">
                                        <div className="bg-white p-12 rounded-full shadow-2xl border-8 border-amber-400 animate-bounce">
                                            <span className="text-9xl font-black text-amber-600">{expectedCount}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col items-center gap-4">
                                <p className="font-bold text-amber-800 animate-pulse text-xl">
                                    {removedIndex === null ? "Tap any item to take it away!" : "Well done!"}
                                </p>
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default OneLess19;

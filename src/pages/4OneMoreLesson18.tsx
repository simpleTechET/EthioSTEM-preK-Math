import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Trees, Plus } from "lucide-react";
import { MuteButton } from "@/components/MuteButton";
import { useAudio } from "@/context/AudioContext";

const OneMore18 = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0); // 0: Intro, 1-3: Challenges
    const [items, setItems] = useState<number>(0);
    const [expectedCount, setExpectedCount] = useState<number>(0);
    const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [isComplete, setIsComplete] = useState(false);
    const { isMuted } = useAudio();

    const levels = [
        { start: 2, icon: "🍎", name: "apples", bgColor: "bg-red-50", borderColor: "border-red-200" },
        { start: 4, icon: "🍐", name: "pears", bgColor: "bg-green-50", borderColor: "border-green-200" },
        { start: 1, icon: "🍊", name: "oranges", bgColor: "bg-orange-50", borderColor: "border-orange-200" }
    ];

    const markLessonComplete = () => {
        const saved = localStorage.getItem("ethio-stem-m4-completed");
        const completed = saved ? JSON.parse(saved) : [];
        if (!completed.includes("18")) {
            completed.push("18");
            localStorage.setItem("ethio-stem-m4-completed", JSON.stringify(completed));
        }
    };

    const speak = (text: string) => {
        if (isMuted) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    };

    const handleAddItem = () => {
        if (items >= expectedCount) return;

        const newCount = items + 1;
        setItems(newCount);
        speak(`${newCount}`);

        if (newCount === expectedCount) {
            setShowFeedback('correct');
            speak(`Correct! ${levels[currentStep - 1].start} and one more makes ${expectedCount}!`);
            setTimeout(() => {
                setShowFeedback(null);
                if (currentStep < 3) {
                    setCurrentStep(currentStep + 1);
                } else {
                    setIsComplete(true);
                    markLessonComplete();
                }
            }, 2500);
        }
    };

    useEffect(() => {
        if (currentStep === 0) {
            speak("Welcome! Today we will learn about 'One More'. Adding one more makes a bigger group!");
        } else if (currentStep > 0 && currentStep <= 3) {
            const level = levels[currentStep - 1];
            setItems(level.start);
            setExpectedCount(level.start + 1);
            speak(`Here are ${level.start} ${level.name}. Add ONE MORE and see how many we have!`);
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
                            <h1 className="text-2xl font-bold text-white drop-shadow-md">Lesson 18</h1>
                            <p className="text-white/80 font-medium tracking-wide">The "One More" Game</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <MuteButton />
                        <div className="bg-red-500 text-white px-4 py-1 rounded-full font-bold shadow-md border-2 border-red-300 animate-pulse">
                            Plus One!
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
                                <Plus className="w-32 h-32 text-red-500 animate-[spin_4s_linear_infinite]" />
                                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl font-black text-red-600">1</span>
                            </div>
                            <h2 className="text-4xl font-extrabold text-green-800 italic">Finding One More</h2>
                            <p className="text-xl text-green-700 font-medium">Add one and see the magic!</p>
                            <Button
                                onClick={() => setCurrentStep(1)}
                                className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white text-2xl px-12 py-8 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 border-b-4 border-red-800 font-bold"
                            >
                                START ADDING!
                            </Button>
                        </div>
                    ) : isComplete ? (
                        <div className="text-center space-y-8 py-10 animate-in fade-in zoom-in duration-500">
                            <div className="text-7xl mb-6">➕🍎🍏</div>
                            <h2 className="text-4xl font-extrabold text-green-800 italic">One More Wizard!</h2>
                            <p className="text-xl text-green-700 font-medium">You know how to grow the group!</p>
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
                                    Put ONE MORE {levels[currentStep - 1].icon} in the basket!
                                </h2>
                                <p className="text-xl font-bold text-amber-600">
                                    {levels[currentStep - 1].start} + 1 = ?
                                </p>
                            </div>

                            <div className={`relative min-h-[300px] flex items-center justify-center rounded-3xl border-4 border-dashed ${levels[currentStep - 1].borderColor} ${levels[currentStep - 1].bgColor} p-8 transition-colors duration-500`}>
                                {/* Basket Content */}
                                <div className="flex flex-wrap gap-6 justify-center max-w-lg">
                                    {[...Array(items)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={`text-7xl transition-all duration-500 transform ${i >= levels[currentStep - 1].start ? 'animate-in zoom-in spin-in shadow-[0_0_20px_rgba(239,68,68,0.4)] rounded-full' : ''
                                                }`}
                                        >
                                            {levels[currentStep - 1].icon}
                                        </div>
                                    ))}
                                </div>

                                {showFeedback && (
                                    <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] rounded-3xl flex items-center justify-center animate-in fade-in duration-300">
                                        <div className="bg-white p-12 rounded-full shadow-2xl border-8 border-green-400 animate-bounce">
                                            <span className="text-9xl font-black text-green-600">{expectedCount}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Addition Button */}
                            <div className="flex flex-col items-center gap-4">
                                <button
                                    onClick={handleAddItem}
                                    disabled={items >= expectedCount}
                                    className={`group relative p-8 rounded-full shadow-2xl transition-all active:scale-95 disabled:opacity-0 disabled:scale-0 duration-500 ${levels[currentStep - 1].bgColor
                                        } border-4 ${levels[currentStep - 1].borderColor}`}
                                >
                                    <Plus className="w-16 h-16 text-red-500 group-hover:rotate-90 transition-transform" />
                                    <div className="absolute -top-4 -right-4 bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl border-2 border-white shadow-md">1</div>
                                </button>
                                <p className="font-bold text-green-700 animate-pulse text-xl">
                                    {items < expectedCount ? "Tap the PLUS to add one more!" : ""}
                                </p>
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default OneMore18;

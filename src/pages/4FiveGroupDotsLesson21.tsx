import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Trees, Loader2, Flower2 } from "lucide-react";
import { MuteButton } from "@/components/MuteButton";
import { useAudio } from "@/context/AudioContext";

const FiveGroupDots21 = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0); // 0: Intro, 1: Find 5 in Circle
    const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
    const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [isComplete, setIsComplete] = useState(false);
    const { isMuted } = useAudio();

    const markLessonComplete = () => {
        const saved = localStorage.getItem("ethio-stem-m4-completed");
        const completed = saved ? JSON.parse(saved) : [];
        if (!completed.includes("21")) {
            completed.push("21");
            localStorage.setItem("ethio-stem-m4-completed", JSON.stringify(completed));
        }
    };

    const speak = (text: string) => {
        if (isMuted) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    };

    const handleDotClick = (index: number) => {
        if (showFeedback === 'correct' || selectedIndices.includes(index)) return;

        const newIndices = [...selectedIndices, index];
        setSelectedIndices(newIndices);
        speak(`${newIndices.length}`);

        if (newIndices.length === 5) {
            setShowFeedback('correct');
            speak("Wonderful! You found the circular 5-group!");
            setTimeout(() => {
                setShowFeedback(null);
                setIsComplete(true);
                markLessonComplete();
            }, 2000);
        }
    };

    useEffect(() => {
        if (currentStep === 0) {
            speak("Look at the flowers in a circle. Can you find a 5-group?");
        } else if (currentStep === 1) {
            speak("Count 5 flowers around the circle. Start anywhere!");
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
                            <h1 className="text-2xl font-bold text-white drop-shadow-md">Lesson 21</h1>
                            <p className="text-white/80 font-medium tracking-wide">5-Group Dots (Circular)</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <MuteButton />
                        <div className="bg-pink-500 text-white px-4 py-1 rounded-full font-bold shadow-md border-2 border-pink-300">
                            Flower Circle!
                        </div>
                    </div>
                </div>

                <Card className="p-8 bg-white/90 backdrop-blur-sm shadow-2xl border-4 border-green-200 rounded-3xl relative overflow-hidden">
                    {/* Progress Bar */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-green-100">
                        <div
                            className="h-full bg-green-500 transition-all duration-500"
                            style={{ width: `${(currentStep / 2) * 100}%` }}
                        />
                    </div>

                    {currentStep === 0 ? (
                        <div className="text-center space-y-8 py-10">
                            <div className="relative inline-block">
                                <Loader2 className="w-32 h-32 text-pink-500 animate-[spin_5s_linear_infinite]" />
                                <Flower2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-pink-600" />
                            </div>
                            <h2 className="text-4xl font-extrabold text-green-800 italic">Flowers in a Round</h2>
                            <p className="text-xl text-green-700 font-medium">It's a circle of 5! Let's count them.</p>
                            <Button
                                onClick={() => setCurrentStep(1)}
                                className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white text-2xl px-12 py-8 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 border-b-4 border-pink-800 font-bold"
                            >
                                START COUNTING!
                            </Button>
                        </div>
                    ) : isComplete ? (
                        <div className="text-center space-y-8 py-10 animate-in fade-in zoom-in duration-500">
                            <div className="text-8xl mb-6">🌸⭕</div>
                            <h2 className="text-4xl font-extrabold text-green-800 italic">Circular Success!</h2>
                            <p className="text-xl text-green-700 font-medium">You found the 5-group circle!</p>
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
                                Count 5 flowers in the circle!
                            </h2>

                            <div className="relative h-[400px] w-[400px] mx-auto bg-pink-50 rounded-full border-8 border-white shadow-inner flex items-center justify-center">
                                {/* Circular Arrangement */}
                                {[...Array(8)].map((_, i) => {
                                    const angle = (i * 360) / 8;
                                    const radius = 140;
                                    const x = Math.cos((angle * Math.PI) / 180) * radius;
                                    const y = Math.sin((angle * Math.PI) / 180) * radius;

                                    return (
                                        <button
                                            key={i}
                                            disabled={showFeedback === 'correct' || (selectedIndices.length >= 5 && !selectedIndices.includes(i))}
                                            onClick={() => handleDotClick(i)}
                                            className={`absolute p-4 text-6xl transition-all duration-300 transform hover:scale-125
                                                ${selectedIndices.includes(i) ? 'scale-110 brightness-110 rounded-full bg-white shadow-lg' : 'opacity-40 grayscale blur-[1px]'}`}
                                            style={{
                                                transform: `translate(${x}px, ${y}px) ${selectedIndices.includes(i) ? 'scale(1.1)' : 'scale(1)'}`
                                            }}
                                        >
                                            <div className="relative">
                                                🌸
                                                {selectedIndices.includes(i) && (
                                                    <span className="absolute -top-4 -left-4 bg-pink-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-md">
                                                        {selectedIndices.indexOf(i) + 1}
                                                    </span>
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}

                                {showFeedback && (
                                    <div className="absolute z-30 animate-in zoom-in spin-in duration-500">
                                        <div className="bg-white p-12 rounded-full shadow-2xl border-8 border-pink-400">
                                            <span className="text-8xl">👑</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-center flex-col items-center gap-4">
                                <p className="text-xl font-bold text-pink-800 italic">
                                    {selectedIndices.length} of 5 flowers found
                                </p>
                                <div className="animate-pulse bg-pink-100 text-pink-700 px-6 py-2 rounded-full border border-pink-300">
                                    Tap 5 flowers to complete the circle!
                                </div>
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default FiveGroupDots21;

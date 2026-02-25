import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Trees, Hand } from "lucide-react";
import { MuteButton } from "@/components/MuteButton";
import { useAudio } from "@/context/AudioContext";

const FiveGroupObjects20 = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0); // 0: Intro, 1: Linear 5, 2: Scattered 5
    const [selectedCount, setSelectedCount] = useState<number>(0);
    const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [isComplete, setIsComplete] = useState(false);
    const { isMuted } = useAudio();

    const markLessonComplete = () => {
        const saved = localStorage.getItem("ethio-stem-m4-completed");
        const completed = saved ? JSON.parse(saved) : [];
        if (!completed.includes("20")) {
            completed.push("20");
            localStorage.setItem("ethio-stem-m4-completed", JSON.stringify(completed));
        }
    };

    const speak = (text: string) => {
        if (isMuted) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    };

    const handleItemClick = (index: number) => {
        if (showFeedback === 'correct') return;

        const newCount = selectedCount + 1;
        setSelectedCount(newCount);
        speak(`${newCount}`);

        if (newCount === 5) {
            setShowFeedback('correct');
            speak("High five! That's a 5-group!");
            setTimeout(() => {
                setShowFeedback(null);
                setSelectedCount(0);
                if (currentStep < 2) {
                    setCurrentStep(currentStep + 1);
                } else {
                    setIsComplete(true);
                    markLessonComplete();
                }
            }, 2000);
        }
    };

    useEffect(() => {
        if (currentStep === 0) {
            speak("Let's find the 5-group! A 5-group is way to see 5 things quickly.");
        } else if (currentStep === 1) {
            speak("Click the berries to make a group of 5 in a line.");
        } else if (currentStep === 2) {
            speak("Now click 5 berries in the scattered group.");
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
                            <h1 className="text-2xl font-bold text-white drop-shadow-md">Lesson 20</h1>
                            <p className="text-white/80 font-medium tracking-wide">The 5-Group Objects</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <MuteButton />
                        <div className="bg-purple-500 text-white px-4 py-1 rounded-full font-bold shadow-md border-2 border-purple-300">
                            Power of 5!
                        </div>
                    </div>
                </div>

                <Card className="p-8 bg-white/90 backdrop-blur-sm shadow-2xl border-4 border-green-200 rounded-3xl relative overflow-hidden">
                    {/* Progress Bar */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-green-100">
                        <div
                            className="h-full bg-green-500 transition-all duration-500"
                            style={{ width: `${(currentStep / 3) * 100}%` }}
                        />
                    </div>

                    {currentStep === 0 ? (
                        <div className="text-center space-y-8 py-10">
                            <div className="relative inline-block">
                                <Hand className="w-32 h-32 text-purple-600 animate-pulse" />
                                <div className="absolute -top-4 -right-4 bg-purple-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-black text-2xl shadow-lg border-2 border-white">5</div>
                            </div>
                            <h2 className="text-4xl font-extrabold text-green-800 italic">5 is a Special Number!</h2>
                            <p className="text-xl text-green-700 font-medium">Let's find groups of 5 in the forest.</p>
                            <Button
                                onClick={() => setCurrentStep(1)}
                                className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white text-2xl px-12 py-8 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 border-b-4 border-purple-800 font-bold"
                            >
                                SHOW ME 5!
                            </Button>
                        </div>
                    ) : isComplete ? (
                        <div className="text-center space-y-8 py-10 animate-in fade-in zoom-in duration-500">
                            <div className="text-8xl mb-6">🖐️🫐</div>
                            <h2 className="text-4xl font-extrabold text-green-800 italic">High Five!</h2>
                            <p className="text-xl text-green-700 font-medium">You found all the 5-groups!</p>
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
                                {currentStep === 1 ? "Make a 5-group in a LINE" : "Find 5 berries in the MUD"}
                            </h2>

                            <div className={`relative min-h-[300px] rounded-3xl border-4 border-dashed border-purple-200 p-8 flex items-center justify-center ${currentStep === 1 ? 'bg-purple-50' : 'bg-amber-100/50'
                                }`}>
                                <div className={`${currentStep === 1 ? 'flex gap-6' : 'relative w-full h-64'}`}>
                                    {[...Array(currentStep === 1 ? 5 : 8)].map((_, i) => (
                                        <button
                                            key={i}
                                            disabled={showFeedback === 'correct' || (selectedCount >= 5 && !itemsSelected[i])}
                                            onClick={() => handleItemClick(i)}
                                            className={`text-6xl transition-all duration-300 transform hover:scale-125 hover:rotate-6 active:scale-90 ${itemsSelected[i] ? 'scale-110 grayscale-0 brightness-110 shadow-2xl rounded-full bg-white/50' : 'grayscale-[0.5] brightness-90'
                                                } ${currentStep === 2 ? 'absolute' : 'relative'}`}
                                            style={currentStep === 2 ? {
                                                top: `${[20, 60, 40, 10, 70, 30, 50, 25][i]}%`,
                                                left: `${[15, 25, 45, 60, 75, 85, 40, 70][i]}%`
                                            } : {}}
                                        >
                                            <div className="relative">
                                                🫐
                                                {itemsSelected[i] && (
                                                    <span className="absolute -top-4 -left-4 bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-md">
                                                        {getItemsSelectedCount(i)}
                                                    </span>
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                {showFeedback && (
                                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/40 backdrop-blur-sm rounded-3xl animate-in fade-in duration-500">
                                        <div className="bg-white p-10 rounded-full shadow-2xl border-8 border-purple-400 rotate-12">
                                            <span className="text-9xl">🌟</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-center flex-col items-center gap-4">
                                <div className="flex gap-2">
                                    {[...Array(5)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={`w-8 h-8 rounded-full border-2 transition-all duration-500 ${i < selectedCount ? 'bg-purple-500 border-purple-700 scale-110 shadow-md' : 'bg-white border-purple-200'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <p className="text-xl font-bold text-purple-800 italic">
                                    {selectedCount} of 5 berries collected
                                </p>
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

// Helper state for selection tracking
const itemsSelected: Record<number, boolean> = {};
const selectionOrder: number[] = [];

const getItemsSelectedCount = (index: number) => {
    return selectionOrder.indexOf(index) + 1;
};

// Override hook-like behavior in plain component for simplicity in this lesson structure
const FiveGroupObjects20Wrapper = () => {
    const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

    // Reset selections on step change
    useEffect(() => {
        setSelectedIndices([]);
    }, []);

    // Passing down state through a hacky but effective way for this single lesson
    return <FiveGroupObjects20_Internal selectedIndices={selectedIndices} setSelectedIndices={setSelectedIndices} />;
};

// Redefining with internal state for correct behavior
const FiveGroupObjects20_Internal = ({ selectedIndices, setSelectedIndices }: any) => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [isComplete, setIsComplete] = useState(false);
    const { isMuted } = useAudio();

    const markLessonComplete = () => {
        const saved = localStorage.getItem("ethio-stem-m4-completed");
        const completed = saved ? JSON.parse(saved) : [];
        if (!completed.includes("20")) {
            completed.push("20");
            localStorage.setItem("ethio-stem-m4-completed", JSON.stringify(completed));
        }
    };

    const speak = (text: string) => {
        if (isMuted) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    };

    const handleItemClick = (index: number) => {
        if (showFeedback === 'correct' || selectedIndices.includes(index)) return;

        const newIndices = [...selectedIndices, index];
        setSelectedIndices(newIndices);
        speak(`${newIndices.length}`);

        if (newIndices.length === 5) {
            setShowFeedback('correct');
            speak("High five! That's a 5-group!");
            setTimeout(() => {
                setShowFeedback(null);
                setSelectedIndices([]);
                if (currentStep < 2) {
                    setCurrentStep(currentStep + 1);
                } else {
                    setIsComplete(true);
                    markLessonComplete();
                }
            }, 2000);
        }
    };

    useEffect(() => {
        if (currentStep === 0) {
            speak("Let's find the 5-group! A 5-group is way to see 5 things quickly.");
        } else if (currentStep === 1) {
            speak("Click the berries to make a group of 5 in a line.");
        } else if (currentStep === 2) {
            speak("Now click 5 berries in the scattered group.");
        }
    }, [currentStep, isMuted]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-400 to-green-600 p-4 font-['Inter']">
            <div className="max-w-4xl mx-auto">
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
                            <h1 className="text-2xl font-bold text-white drop-shadow-md">Lesson 20</h1>
                            <p className="text-white/80 font-medium tracking-wide">The 5-Group Objects</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <MuteButton />
                        <div className="bg-purple-500 text-white px-4 py-1 rounded-full font-bold shadow-md border-2 border-purple-300">
                            Power of 5!
                        </div>
                    </div>
                </div>

                <Card className="p-8 bg-white/90 backdrop-blur-sm shadow-2xl border-4 border-green-200 rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-green-100">
                        <div
                            className="h-full bg-green-500 transition-all duration-500"
                            style={{ width: `${(currentStep / 3) * 100}%` }}
                        />
                    </div>

                    {currentStep === 0 ? (
                        <div className="text-center space-y-8 py-10">
                            <div className="relative inline-block">
                                <Hand className="w-32 h-32 text-purple-600 animate-pulse" />
                                <div className="absolute -top-4 -right-4 bg-purple-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-black text-2xl shadow-lg border-2 border-white">5</div>
                            </div>
                            <h2 className="text-4xl font-extrabold text-green-800 italic">5 is a Special Number!</h2>
                            <p className="text-xl text-green-700 font-medium">Let's find groups of 5 in the forest.</p>
                            <Button
                                onClick={() => setCurrentStep(1)}
                                className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white text-2xl px-12 py-8 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 border-b-4 border-purple-800 font-bold"
                            >
                                SHOW ME 5!
                            </Button>
                        </div>
                    ) : isComplete ? (
                        <div className="text-center space-y-8 py-10 animate-in fade-in zoom-in duration-500">
                            <div className="text-8xl mb-6">🖐️🫐</div>
                            <h2 className="text-4xl font-extrabold text-green-800 italic">High Five!</h2>
                            <p className="text-xl text-green-700 font-medium">You found all the 5-groups!</p>
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
                                {currentStep === 1 ? "Make a 5-group in a LINE" : "Find 5 berries in the MUD"}
                            </h2>

                            <div className={`relative min-h-[300px] rounded-3xl border-4 border-dashed border-purple-200 p-8 flex items-center justify-center ${currentStep === 1 ? 'bg-purple-50' : 'bg-amber-100/50'
                                }`}>
                                <div className={`${currentStep === 1 ? 'flex gap-6' : 'relative w-full h-64'}`}>
                                    {[...Array(currentStep === 1 ? 5 : 8)].map((_, i) => (
                                        <button
                                            key={i}
                                            disabled={showFeedback === 'correct' || (selectedIndices.length >= 5 && !selectedIndices.includes(i))}
                                            onClick={() => handleItemClick(i)}
                                            className={`text-6xl transition-all duration-300 transform hover:scale-125 hover:rotate-6 active:scale-90 ${selectedIndices.includes(i) ? 'scale-110 grayscale-0 brightness-110 shadow-2xl rounded-full bg-white/50' : 'grayscale-[0.5] brightness-90'
                                                } ${currentStep === 2 ? 'absolute' : 'relative'}`}
                                            style={currentStep === 2 ? {
                                                top: `${[20, 60, 40, 10, 70, 30, 50, 25][i]}%`,
                                                left: `${[15, 25, 45, 60, 75, 85, 40, 70][i]}%`
                                            } : {}}
                                        >
                                            <div className="relative">
                                                🫐
                                                {selectedIndices.includes(i) && (
                                                    <span className="absolute -top-4 -left-4 bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-md">
                                                        {selectedIndices.indexOf(i) + 1}
                                                    </span>
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                {showFeedback && (
                                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/40 backdrop-blur-sm rounded-3xl animate-in fade-in duration-500">
                                        <div className="bg-white p-10 rounded-full shadow-2xl border-8 border-purple-400 rotate-12">
                                            <span className="text-9xl">🌟</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-center flex-col items-center gap-4">
                                <div className="flex gap-2">
                                    {[...Array(5)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={`w-8 h-8 rounded-full border-2 transition-all duration-500 ${i < selectedIndices.length ? 'bg-purple-500 border-purple-700 scale-110 shadow-md' : 'bg-white border-purple-200'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <p className="text-xl font-bold text-purple-800 italic">
                                    {selectedIndices.length} of 5 berries collected
                                </p>
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default FiveGroupObjects20_Internal;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Trees, Scale } from "lucide-react";
import { MuteButton } from "@/components/MuteButton";
import { useAudio } from "@/context/AudioContext";

const BalanceScales8 = () => {
    const navigate = useNavigate();
    const [showGame, setShowGame] = useState(false);
    const [currentStep, setCurrentStep] = useState(0); // 0: Heavier (Elephant vs Mouse), 1: Lighter (Bird vs Logs), 2: Equal (Apple vs Apple)
    const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [isComplete, setIsComplete] = useState(false);
    const { isMuted } = useAudio();

    const markLessonComplete = () => {
        const saved = localStorage.getItem("ethio-stem-m4-completed");
        const completed = saved ? JSON.parse(saved) : [];
        if (!completed.includes("lesson-8")) {
            completed.push("lesson-8");
            localStorage.setItem("ethio-stem-m4-completed", JSON.stringify(completed));
        }
    };

    const speak = (text: string) => {
        if (isMuted) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    };

    const handleChoice = (choice: 'left' | 'right' | 'equal', target: 'left' | 'right' | 'equal') => {
        if (choice === target) {
            setShowFeedback('correct');
            speak("Magnificent! The scale shows it well!");
            setTimeout(() => {
                setShowFeedback(null);
                if (currentStep < 2) {
                    setCurrentStep(prev => prev + 1);
                } else {
                    setIsComplete(true);
                    markLessonComplete();
                    speak("You are a balance scale expert!");
                }
            }, 1500);
        } else {
            setShowFeedback('incorrect');
            speak("Look at which side is lower. Lower means heavier!");
        }
    };

    const steps = [
        {
            question: "Which side is HEAVIER? Look at the scale! ⚖️",
            target: 'left' as const,
            left: { emoji: "🐘", label: "Elephant" },
            right: { emoji: "🐭", label: "Mouse" },
            tilt: "-rotate-12",
            yOffset: "translate-y-4"
        },
        {
            question: "Which side is LIGHTER? (Higher side) 🕊️",
            target: 'left' as const,
            left: { emoji: "🐦", label: "Bird" },
            right: { emoji: "🪵", label: "Tree Log" },
            tilt: "rotate-12",
            yOffset: "-translate-y-4"
        },
        {
            question: "Are these the same weight? ⚖️",
            target: 'equal' as const,
            left: { emoji: "🍎", label: "Apple" },
            right: { emoji: "🍎", label: "Apple" },
            tilt: "rotate-0",
            yOffset: "translate-y-0"
        }
    ];

    return (
        <div className="min-h-screen gradient-forest p-4 font-nunito overflow-x-hidden">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-4?last=lesson-8")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <MuteButton />
                    <div>
                        <span className="text-sm font-bold text-forest-700 bg-forest-100 px-3 py-1 rounded-full font-fredoka uppercase tracking-wider">Lesson 8</span>
                        <h1 className="text-2xl font-bold text-foreground font-fredoka tracking-wide mt-1">⚖️ Balance Scales</h1>
                    </div>
                </div>

                {!showGame ? (
                    <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700">
                        <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-amber-500 to-forest-700 rounded-3xl flex items-center justify-center rotate-3 shadow-lg border-4 border-white/50">
                            <Scale className="w-12 h-12 text-white" />
                        </div>
                        <h2 className="text-4xl font-fredoka text-forest-900 uppercase">Scale Explorer!</h2>
                        <p className="text-2xl text-forest-800 font-nunito leading-relaxed max-w-xl mx-auto">
                            A <span className="font-black text-amber-700 underline">Balance Scale</span> shows us what is heavier.
                            <br />The <span className="font-bold underline">Heavier</span> side goes <span className="font-black animate-bounce inline-block">DOWN!</span>
                        </p>
                        <Button
                            onClick={() => { setShowGame(true); speak("Let's use the forest scale! Remember, heavier goes down, lighter stays up!"); }}
                            className="bg-forest-600 hover:bg-forest-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl font-fredoka border-b-8 border-forest-800 transition-all hover:scale-105 active:scale-95 w-full md:w-auto uppercase tracking-tighter"
                        >
                            Start Scaling! ⚖️
                        </Button>
                    </Card>
                ) : isComplete ? (
                    <Card className="bg-gradient-to-br from-forest-600 via-emerald-600 to-emerald-800 shadow-2xl rounded-[4rem] p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                        <div className="text-9xl animate-bounce">⚖️</div>
                        <h2 className="text-6xl font-fredoka drop-shadow-xl uppercase">Scale Master!</h2>
                        <p className="text-2xl font-nunito max-w-2xl mx-auto leading-relaxed">
                            You effectively used the scale to compare forest treasures!
                            <br /><span className="text-yellow-300 font-black text-5xl">TOPIC B COMPLETE!</span>
                        </p>
                        <div className="flex flex-wrap gap-4 w-full pt-8 justify-center">
                            <Button onClick={() => { setCurrentStep(0); setIsComplete(false); speak("Let's scale again!"); }} className="h-20 px-12 bg-white/10 hover:bg-white/20 text-white text-2xl font-fredoka rounded-[2rem] border-4 border-white/20 uppercase tracking-tighter">
                                Play Again 🔄
                            </Button>
                            <Button onClick={() => navigate("/activities/module-4")} className="h-20 px-12 bg-white text-forest-700 hover:bg-forest-50 text-2xl font-fredoka rounded-[2rem] shadow-2xl uppercase tracking-tighter">
                                Module Hub ✨
                            </Button>
                        </div>
                    </Card>
                ) : (
                    <div className="space-y-8">
                        <div className="flex justify-center gap-2">
                            {[0, 1, 2].map((n) => (
                                <div key={n} className={`h-4 rounded-full transition-all duration-500 ${currentStep >= n ? 'bg-forest-500 w-16 shadow-lg' : 'bg-forest-100 w-4'}`} />
                            ))}
                        </div>

                        <Card className="bg-white/90 border-4 border-white shadow-2xl rounded-[3rem] p-8 md:p-12 text-center space-y-12 min-h-[650px] flex flex-col items-center justify-around relative overflow-hidden">
                            <div className="space-y-4 relative z-10 w-full mb-4">
                                <h3 className="text-4xl md:text-5xl font-fredoka text-forest-900 tracking-tighter leading-none">
                                    {steps[currentStep].question}
                                </h3>
                            </div>

                            {/* The Scale Visual */}
                            <div className="relative w-full max-w-2xl h-80 flex items-center justify-center py-20">
                                {/* Base */}
                                <div className="absolute bottom-0 w-16 h-40 bg-amber-800 rounded-t-full border-x-4 border-t-4 border-amber-950 shadow-lg" />

                                {/* The Beam */}
                                <div className={`w-full max-w-lg h-6 bg-amber-700 rounded-full border-4 border-amber-900 shadow-xl transition-all duration-700 relative ${steps[currentStep].tilt}`}>
                                    {/* Left Tray */}
                                    <div className={`absolute left-0 -top-2 w-1 h-24 bg-amber-900 origin-top`}>
                                        <div className={`absolute -bottom-8 -left-16 w-32 h-20 bg-amber-100/80 rounded-b-[3rem] border-4 border-amber-800 flex items-center justify-center shadow-xl transition-all duration-700`}>
                                            <span className="text-6xl">{steps[currentStep].left.emoji}</span>
                                        </div>
                                    </div>

                                    {/* Right Tray */}
                                    <div className={`absolute right-0 -top-2 w-1 h-24 bg-amber-900 origin-top`}>
                                        <div className={`absolute -bottom-8 -left-16 w-32 h-20 bg-amber-100/80 rounded-b-[3rem] border-4 border-amber-800 flex items-center justify-center shadow-xl transition-all duration-700`}>
                                            <span className="text-6xl">{steps[currentStep].right.emoji}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-6 w-full max-w-2xl relative z-20">
                                {currentStep < 2 ? (
                                    <>
                                        <Button
                                            onClick={() => handleChoice('left', steps[currentStep].target)}
                                            className="flex-1 bg-forest-600 hover:bg-forest-700 text-white py-10 text-3xl font-fredoka rounded-[2.5rem] border-b-8 border-forest-800 shadow-2xl transition-all active:scale-95 uppercase tracking-tighter"
                                        >
                                            {steps[currentStep].left.label} 👈
                                        </Button>
                                        <Button
                                            onClick={() => handleChoice('right', steps[currentStep].target)}
                                            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-10 text-3xl font-fredoka rounded-[2.5rem] border-b-8 border-emerald-800 shadow-2xl transition-all active:scale-95 uppercase tracking-tighter"
                                        >
                                            {steps[currentStep].right.label} 👉
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            onClick={() => handleChoice('equal', 'equal')}
                                            className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-10 text-4xl font-fredoka rounded-[2.5rem] border-b-8 border-amber-800 shadow-2xl transition-all active:scale-95 uppercase tracking-tighter"
                                        >
                                            They are EQUAL! 🟰
                                        </Button>
                                    </>
                                )}
                            </div>
                        </Card>

                        {showFeedback && (
                            <div className="fixed top-24 right-6 z-[100] animate-in slide-in-from-right-4 fade-in duration-300">
                                <Card className={`flex items-center gap-6 px-12 py-10 shadow-2xl rounded-[2.5rem] border-4 ${showFeedback === 'correct' ? 'bg-forest-50 border-forest-400' : 'bg-rose-50 border-rose-400'}`}>
                                    <span className="text-7xl">{showFeedback === 'correct' ? '🦉' : '🧐'}</span>
                                    <div className="flex flex-col text-left">
                                        <span className={`text-4xl font-fredoka font-bold ${showFeedback === 'correct' ? 'text-forest-700' : 'text-rose-700'}`}>
                                            {showFeedback === 'correct' ? 'Balanced!' : 'Look at the Scale!'}
                                        </span>
                                        <span className="text-xl font-nunito text-muted-foreground font-bold tracking-tight">
                                            {showFeedback === 'correct' ? 'You understand the scale!' : 'Which side is tilted down?'}
                                        </span>
                                    </div>
                                    {showFeedback === 'incorrect' && (
                                        <Button onClick={() => setShowFeedback(null)} className="ml-8 px-10 py-6 text-2xl font-fredoka rounded-[2rem] border-b-8 bg-rose-500 hover:bg-rose-600 border-rose-700 text-white uppercase tracking-tighter">
                                            Try Again
                                        </Button>
                                    )}
                                </Card>
                            </div>
                        )}

                        <Button onClick={() => setShowGame(false)} variant="ghost" className="text-forest-400 hover:text-forest-600 w-full py-4 text-xl font-black font-nunito uppercase tracking-widest">
                            ← Instructions
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BalanceScales8;

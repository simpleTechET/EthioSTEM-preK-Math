import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Trees, Scale } from "lucide-react";
import { MuteButton } from "@/components/MuteButton";
import { useAudio } from "@/context/AudioContext";

const HeavierLighter7 = () => {
    const navigate = useNavigate();
    const [showGame, setShowGame] = useState(false);
    const [currentStep, setCurrentStep] = useState(0); // 0: Heavier (Rock vs Feather), 1: Lighter (Bird vs Bear)
    const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [isComplete, setIsComplete] = useState(false);
    const { isMuted } = useAudio();

    const markLessonComplete = () => {
        const saved = localStorage.getItem("ethio-stem-m4-completed");
        const completed = saved ? JSON.parse(saved) : [];
        if (!completed.includes("lesson-7")) {
            completed.push("lesson-7");
            localStorage.setItem("ethio-stem-m4-completed", JSON.stringify(completed));
        }
    };

    const speak = (text: string) => {
        if (isMuted) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    };

    const handleChoice = (type: 'heavier' | 'lighter', target: 'heavier' | 'lighter') => {
        if (type === target) {
            setShowFeedback('correct');
            speak("Spot on! That is " + target + "!");
            setTimeout(() => {
                setShowFeedback(null);
                if (currentStep < 1) {
                    setCurrentStep(prev => prev + 1);
                } else {
                    setIsComplete(true);
                    markLessonComplete();
                    speak("You are a weight detective!");
                }
            }, 1500);
        } else {
            setShowFeedback('incorrect');
            speak("Hmm, try again! Which one is " + target + "?");
        }
    };

    const scenarios = [
        {
            question: "Which one is HEAVIER than the other? 🪨",
            target: 'heavier' as const,
            options: [
                { id: 'rock', label: "Big Rock", emoji: "🪨", type: 'heavier' as const, style: "h-64 md:h-80 w-64 md:w-80 bg-stone-200 border-stone-400" },
                { id: 'feather', label: "Feather", emoji: "🪶", type: 'lighter' as const, style: "h-24 md:h-32 w-24 md:w-32 bg-sky-50 border-sky-100 animate-float" }
            ]
        },
        {
            question: "Which one is LIGHTER than the other? 🐦",
            target: 'lighter' as const,
            options: [
                { id: 'bear', label: "Bear", emoji: "🐻", type: 'heavier' as const, style: "h-72 md:h-80 w-72 md:w-80 bg-amber-100 border-amber-300" },
                { id: 'bird', label: "Bird", emoji: "🐦", type: 'lighter' as const, style: "h-24 md:h-32 w-24 md:w-32 bg-sky-100 border-sky-200" }
            ]
        }
    ];

    return (
        <div className="min-h-screen gradient-forest p-4 font-nunito overflow-x-hidden">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-4?last=lesson-7")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <MuteButton />
                    <div>
                        <span className="text-sm font-bold text-forest-700 bg-forest-100 px-3 py-1 rounded-full font-fredoka uppercase tracking-wider">Lesson 7</span>
                        <h1 className="text-2xl font-bold text-foreground font-fredoka tracking-wide mt-1">🎈 Heavier & Lighter</h1>
                    </div>
                </div>

                {!showGame ? (
                    <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700">
                        <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-amber-400 to-orange-600 rounded-3xl flex items-center justify-center rotate-6 shadow-lg border-4 border-white/50">
                            <Scale className="w-12 h-12 text-white" />
                        </div>
                        <h2 className="text-4xl font-fredoka text-forest-900 uppercase tracking-tighter">Comparative Fun!</h2>
                        <p className="text-2xl text-forest-800 font-nunito leading-relaxed max-w-xl mx-auto">
                            When we compare two things, one is <span className="font-black text-amber-800 underline">HEAVIER</span>
                            <br />and the other is <span className="italic text-sky-600 font-bold">LIGHTER</span>.
                        </p>
                        <Button
                            onClick={() => { setShowGame(true); speak("Ready to compare weight? Let's find what is heavier and what is lighter!"); }}
                            className="bg-amber-600 hover:bg-amber-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl font-fredoka border-b-8 border-amber-800 transition-all hover:scale-105 active:scale-95 w-full md:w-auto uppercase tracking-tighter"
                        >
                            Start Comparing! 🎈
                        </Button>
                    </Card>
                ) : isComplete ? (
                    <Card className="bg-gradient-to-br from-amber-600 via-orange-600 to-amber-800 shadow-2xl rounded-[4rem] p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                        <div className="text-9xl animate-bounce">🎈</div>
                        <h2 className="text-6xl font-fredoka drop-shadow-xl tracking-tighter uppercase">Weight Detective!</h2>
                        <p className="text-2xl font-nunito max-w-2xl mx-auto leading-relaxed">
                            You're amazing at comparing weight!
                            <br /><span className="text-yellow-200 font-black text-4xl">GREAT WORK!</span>
                        </p>
                        <div className="flex flex-wrap gap-4 w-full pt-8 justify-center">
                            <Button onClick={() => { setCurrentStep(0); setIsComplete(false); speak("Let's compare again!"); }} className="h-20 px-12 bg-white/10 hover:bg-white/20 text-white text-2xl font-fredoka rounded-[2rem] border-4 border-white/20 uppercase tracking-tighter">
                                Play Again 🔄
                            </Button>
                            <Button onClick={() => navigate("/activities/module-4")} className="h-20 px-12 bg-white text-amber-800 hover:bg-amber-50 text-2xl font-fredoka rounded-[2rem] shadow-2xl uppercase tracking-tighter">
                                Next Discovery! ✨
                            </Button>
                        </div>
                    </Card>
                ) : (
                    <div className="space-y-8">
                        <div className="flex justify-center gap-2">
                            {[0, 1].map((n) => (
                                <div key={n} className={`h-4 rounded-full transition-all duration-500 ${currentStep >= n ? 'bg-amber-500 w-16 shadow-lg' : 'bg-amber-100 w-4'}`} />
                            ))}
                        </div>

                        <Card className="bg-white/95 border-4 border-white shadow-2xl rounded-[3rem] p-8 md:p-12 text-center space-y-12 min-h-[600px] flex flex-col items-center justify-around relative overflow-hidden">
                            <div className="space-y-4 relative z-10 w-full mb-4">
                                <h3 className="text-4xl md:text-5xl font-fredoka text-forest-900 tracking-tighter leading-none">
                                    {scenarios[currentStep].question}
                                </h3>
                                <p className="text-forest-600 font-nunito text-xl font-medium">Compare the two friends!</p>
                            </div>

                            <div className="flex items-end justify-center gap-10 md:gap-24 relative z-10 py-6 min-h-[400px]">
                                {scenarios[currentStep].options.map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={() => handleChoice(option.type, scenarios[currentStep].target)}
                                        className="group relative flex flex-col items-center transition-all duration-300 hover:scale-110 active:scale-95"
                                    >
                                        <div className={`${option.style} rounded-[3rem] border-4 flex items-center justify-center text-8xl md:text-9xl shadow-xl group-hover:shadow-2xl transition-all`}>
                                            <span className="group-hover:rotate-12 group-hover:scale-110 transition-transform">{option.emoji}</span>
                                        </div>
                                        <span className="mt-8 font-fredoka text-3xl text-forest-900 bg-white/70 px-8 py-3 rounded-full border-2 border-white shadow-sm uppercase tracking-tighter group-hover:bg-white transition-colors">
                                            {option.label}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </Card>

                        {showFeedback && (
                            <div className="fixed top-24 right-6 z-[100] animate-in slide-in-from-right-4 fade-in duration-300">
                                <Card className={`flex items-center gap-6 px-12 py-10 shadow-2xl rounded-[2.5rem] border-4 ${showFeedback === 'correct' ? 'bg-amber-50 border-amber-400' : 'bg-rose-50 border-rose-400'}`}>
                                    <span className="text-7xl">{showFeedback === 'correct' ? '🦁' : '🧐'}</span>
                                    <div className="flex flex-col text-left">
                                        <span className={`text-4xl font-fredoka font-bold ${showFeedback === 'correct' ? 'text-amber-700' : 'text-rose-700'}`}>
                                            {showFeedback === 'correct' ? 'Incredible!' : 'Look Closer!'}
                                        </span>
                                        <span className="text-xl font-nunito text-muted-foreground font-bold tracking-tight">
                                            {showFeedback === 'correct' ? 'You compared them perfectly!' : 'Which one feels heavier?'}
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

export default HeavierLighter7;

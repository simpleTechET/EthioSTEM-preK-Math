import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Trees, Container } from "lucide-react";
import { MuteButton } from "@/components/MuteButton";
import { useAudio } from "@/context/AudioContext";

const BigSmallLesson9 = () => {
    const navigate = useNavigate();
    const [showGame, setShowGame] = useState(false);
    const [currentStep, setCurrentStep] = useState(0); // 0: Big Canteen vs Small Cup, 1: Big Bucket vs Small Bowl
    const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [isComplete, setIsComplete] = useState(false);
    const { isMuted } = useAudio();

    const markLessonComplete = () => {
        const saved = localStorage.getItem("ethio-stem-m4-completed");
        const completed = saved ? JSON.parse(saved) : [];
        if (!completed.includes("lesson-9")) {
            completed.push("lesson-9");
            localStorage.setItem("ethio-stem-m4-completed", JSON.stringify(completed));
        }
    };

    const speak = (text: string) => {
        if (isMuted) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    };

    const handleChoice = (type: 'big' | 'small', target: 'big' | 'small') => {
        if (type === target) {
            setShowFeedback('correct');
            speak("Yes! That one is " + target + " and holds " + (target === 'big' ? 'lots' : 'a little bit') + " of water!");
            setTimeout(() => {
                setShowFeedback(null);
                if (currentStep < 1) {
                    setCurrentStep(prev => prev + 1);
                } else {
                    setIsComplete(true);
                    markLessonComplete();
                    speak("You found all the big and small containers!");
                }
            }, 1500);
        } else {
            setShowFeedback('incorrect');
            speak("Try again! Look at which one can hold more water.");
        }
    };

    const scenarios = [
        {
            question: "Which container is BIG and holds more water? 🥤",
            target: 'big' as const,
            options: [
                { id: 'canteen', label: "Big Canteen", emoji: "🧴", type: 'big' as const, style: "h-64 w-48 bg-cyan-100 border-cyan-400" },
                { id: 'cup', label: "Small Cup", emoji: "🥤", type: 'small' as const, style: "h-24 w-24 bg-blue-50 border-blue-200" }
            ]
        },
        {
            question: "Which container is SMALL and holds less water? 🥣",
            target: 'small' as const,
            options: [
                { id: 'bucket', label: "Big Bucket", emoji: "🪣", type: 'big' as const, style: "h-64 w-64 bg-slate-200 border-slate-400" },
                { id: 'bowl', label: "Small Bowl", emoji: "🥣", type: 'small' as const, style: "h-20 w-32 bg-rose-50 border-rose-200" }
            ]
        }
    ];

    return (
        <div className="min-h-screen gradient-forest p-4 font-nunito overflow-x-hidden">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-4?last=lesson-9")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <MuteButton />
                    <div>
                        <span className="text-sm font-bold text-cyan-700 bg-cyan-100 px-3 py-1 rounded-full font-fredoka uppercase tracking-wider">Lesson 9</span>
                        <h1 className="text-2xl font-bold text-foreground font-fredoka tracking-wide mt-1">🥤 Big or Small?</h1>
                    </div>
                </div>

                {!showGame ? (
                    <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700">
                        <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-3xl flex items-center justify-center rotate-6 shadow-lg border-4 border-white/50">
                            <Container className="w-12 h-12 text-white" />
                        </div>
                        <h2 className="text-4xl font-fredoka text-forest-900 uppercase tracking-tighter">Water Wonders!</h2>
                        <p className="text-2xl text-forest-800 font-nunito leading-relaxed max-w-xl mx-auto">
                            Some things hold a <span className="font-black text-blue-700 underline">LOT</span> of water,
                            <br />and some hold just a <span className="italic text-cyan-600 font-bold">LITTLE</span> bit.
                        </p>
                        <Button
                            onClick={() => { setShowGame(true); speak("Ready to find big and small containers? Let's go!"); }}
                            className="bg-cyan-500 hover:bg-cyan-600 text-white text-3xl px-16 py-10 rounded-full shadow-2xl font-fredoka border-b-8 border-cyan-800 transition-all hover:scale-105 active:scale-95 w-full md:w-auto uppercase tracking-tighter"
                        >
                            Start Pouring! 💧
                        </Button>
                    </Card>
                ) : isComplete ? (
                    <Card className="bg-gradient-to-br from-cyan-500 via-blue-500 to-blue-800 shadow-2xl rounded-[4rem] p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                        <div className="text-9xl animate-bounce">🌊</div>
                        <h2 className="text-6xl font-fredoka drop-shadow-xl tracking-tighter uppercase">Water Expert!</h2>
                        <p className="text-2xl font-nunito max-w-2xl mx-auto leading-relaxed">
                            You correctly identifies which containers hold more and which hold less!
                            <br /><span className="text-blue-200 font-black text-4xl">GREAT JOB!</span>
                        </p>
                        <div className="flex flex-wrap gap-4 w-full pt-8 justify-center">
                            <Button onClick={() => { setCurrentStep(0); setIsComplete(false); speak("Let's compare again!"); }} className="h-20 px-12 bg-white/10 hover:bg-white/20 text-white text-2xl font-fredoka rounded-[2rem] border-4 border-white/20 uppercase tracking-tighter">
                                Play Again 🔄
                            </Button>
                            <Button onClick={() => navigate("/activities/module-4")} className="h-20 px-12 bg-white text-cyan-800 hover:bg-cyan-50 text-2xl font-fredoka rounded-[2rem] shadow-2xl uppercase tracking-tighter">
                                Next Lesson! ✨
                            </Button>
                        </div>
                    </Card>
                ) : (
                    <div className="space-y-8">
                        <div className="flex justify-center gap-2">
                            {[0, 1].map((n) => (
                                <div key={n} className={`h-4 rounded-full transition-all duration-500 ${currentStep >= n ? 'bg-cyan-500 w-16 shadow-lg' : 'bg-cyan-100 w-4'}`} />
                            ))}
                        </div>

                        <Card className="bg-white/95 border-4 border-white shadow-2xl rounded-[3rem] p-8 md:p-12 text-center space-y-12 min-h-[600px] flex flex-col items-center justify-around relative overflow-hidden">
                            <div className="space-y-4 relative z-10 w-full mb-4">
                                <h3 className="text-4xl md:text-5xl font-fredoka text-forest-900 tracking-tighter leading-none">
                                    {scenarios[currentStep].question}
                                </h3>
                                <p className="text-forest-600 font-nunito text-xl font-medium">Which one holds more?</p>
                            </div>

                            <div className="flex items-end justify-center gap-10 md:gap-24 relative z-10 py-6 min-h-[400px]">
                                {scenarios[currentStep].options.map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={() => handleChoice(option.type, scenarios[currentStep].target)}
                                        className="group relative flex flex-col items-center transition-all duration-300 hover:scale-110 active:scale-95"
                                    >
                                        <div className={`${option.style} rounded-[3rem] border-4 flex items-center justify-center text-8xl md:text-9xl shadow-xl group-hover:shadow-2xl transition-all relative overflow-hidden backdrop-blur-sm bg-white/40`}>
                                            <span className="group-hover:rotate-12 group-hover:scale-110 transition-transform z-10">{option.emoji}</span>
                                            {/* Water Effect */}
                                            <div className="absolute bottom-0 left-0 right-0 bg-blue-400/30 transition-all duration-1000 group-hover:h-1/2 h-1/4" />
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
                                <Card className={`flex items-center gap-6 px-12 py-10 shadow-2xl rounded-[2.5rem] border-4 ${showFeedback === 'correct' ? 'bg-cyan-50 border-cyan-400' : 'bg-rose-50 border-rose-400'}`}>
                                    <span className="text-7xl">{showFeedback === 'correct' ? '🐳' : '🧐'}</span>
                                    <div className="flex flex-col text-left">
                                        <span className={`text-4xl font-fredoka font-bold ${showFeedback === 'correct' ? 'text-cyan-700' : 'text-rose-700'}`}>
                                            {showFeedback === 'correct' ? 'Water-tastic!' : 'Not Quite!'}
                                        </span>
                                        <span className="text-xl font-nunito text-muted-foreground font-bold tracking-tight">
                                            {showFeedback === 'correct' ? 'You matched them perfectly!' : 'Which is big?'}
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

export default BigSmallLesson9;

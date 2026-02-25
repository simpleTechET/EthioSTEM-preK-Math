import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Trees, CheckCircle } from "lucide-react";
import { MuteButton } from "@/components/MuteButton";
import { useAudio } from "@/context/AudioContext";

const MatchCompareLesson12 = () => {
    const navigate = useNavigate();
    const [showGame, setShowGame] = useState(false);
    const [currentStep, setCurrentStep] = useState(0); // 0: Length, 1: Weight, 2: Volume
    const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [isComplete, setIsComplete] = useState(false);
    const { isMuted } = useAudio();

    const markLessonComplete = () => {
        const saved = localStorage.getItem("ethio-stem-m4-completed");
        const completed = saved ? JSON.parse(saved) : [];
        if (!completed.includes("lesson-12")) {
            completed.push("lesson-12");
            localStorage.setItem("ethio-stem-m4-completed", JSON.stringify(completed));
        }
    };

    const speak = (text: string) => {
        if (isMuted) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    };

    const handleChoice = (isCorrect: boolean, feedback: string) => {
        if (isCorrect) {
            setShowFeedback('correct');
            speak(feedback);
            setTimeout(() => {
                setShowFeedback(null);
                if (currentStep < 2) {
                    setCurrentStep(prev => prev + 1);
                } else {
                    setIsComplete(true);
                    markLessonComplete();
                    speak("You are a measurement master! Topic C complete!");
                }
            }, 2000);
        } else {
            setShowFeedback('incorrect');
            speak("Look again! Think about length, weight, or how much it holds.");
        }
    };

    const steps = [
        {
            title: "Length Match",
            question: "Which stick is TALLER than the other? 🦒",
            options: [
                { id: 'tall', emoji: "🦒", label: "Tall Giraffe", isCorrect: true, feedback: "Great! That is the taller one!" },
                { id: 'short', emoji: "🐰", label: "Short Bunny", isCorrect: false, feedback: "" }
            ]
        },
        {
            title: "Weight Match",
            question: "Which one is HEAVIER? 🐘",
            options: [
                { id: 'heavy', emoji: "🐘", label: "Heavy Elephant", isCorrect: true, feedback: "Perfect! Elephants are heavy!" },
                { id: 'light', emoji: "🪶", label: "Light Feather", isCorrect: false, feedback: "" }
            ]
        },
        {
            title: "Volume Match",
            question: "Which container holds MORE? 🥛",
            options: [
                { id: 'more', emoji: "🫙", label: "Big Jar", isCorrect: true, feedback: "Exactly! The big jar holds more!" },
                { id: 'less', emoji: "☕", label: "Small Cup", isCorrect: false, feedback: "" }
            ]
        }
    ];

    return (
        <div className="min-h-screen gradient-forest p-4 font-nunito overflow-x-hidden">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-4?last=lesson-12")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <MuteButton />
                    <div>
                        <span className="text-sm font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full font-fredoka uppercase tracking-wider">Lesson 12</span>
                        <h1 className="text-2xl font-bold text-foreground font-fredoka tracking-wide mt-1">✅ Match & Compare</h1>
                    </div>
                </div>

                {!showGame ? (
                    <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700">
                        <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-emerald-500 to-teal-700 rounded-3xl flex items-center justify-center -rotate-3 shadow-lg border-4 border-white/50">
                            <CheckCircle className="w-12 h-12 text-white" />
                        </div>
                        <h2 className="text-4xl font-fredoka text-forest-900 uppercase">Review Adventure!</h2>
                        <p className="text-2xl text-forest-800 font-nunito leading-relaxed max-w-xl mx-auto">
                            It's time to show off what you know!
                            <br />Let's match <span className="font-bold underline">Length</span>, <span className="font-bold underline">Weight</span>, and <span className="font-bold underline text-blue-600">Volume</span>!
                        </p>
                        <Button
                            onClick={() => { setShowGame(true); speak("Are you ready for the measurement challenge? Let's match them all!"); }}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl font-fredoka border-b-8 border-emerald-800 transition-all hover:scale-105 active:scale-95 w-full md:w-auto uppercase tracking-tighter"
                        >
                            Challenge Start! 🎯
                        </Button>
                    </Card>
                ) : isComplete ? (
                    <Card className="bg-gradient-to-br from-emerald-600 via-teal-600 to-teal-900 shadow-2xl rounded-[4rem] p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                        <div className="text-9xl animate-bounce">🏆</div>
                        <h2 className="text-6xl font-fredoka drop-shadow-xl tracking-tighter uppercase">Measurement Master!</h2>
                        <p className="text-2xl font-nunito max-w-2xl mx-auto leading-relaxed">
                            You've mastered Length, Weight, and Volume in the forest!
                            <br /><span className="text-yellow-300 font-black text-5xl">TOPIC C COMPLETE!</span>
                        </p>
                        <div className="flex flex-wrap gap-4 w-full pt-8 justify-center">
                            <Button onClick={() => { setCurrentStep(0); setIsComplete(false); speak("Let's challenge again!"); }} className="h-20 px-12 bg-white/10 hover:bg-white/20 text-white text-2xl font-fredoka rounded-[2rem] border-4 border-white/20 uppercase tracking-tighter">
                                Play Again 🔄
                            </Button>
                            <Button onClick={() => navigate("/activities/module-4")} className="h-20 px-12 bg-white text-emerald-800 hover:bg-emerald-50 text-2xl font-fredoka rounded-[2rem] shadow-2xl uppercase tracking-tighter">
                                Module Hub ✨
                            </Button>
                        </div>
                    </Card>
                ) : (
                    <div className="space-y-8">
                        <div className="flex justify-center gap-2">
                            {[0, 1, 2].map((n) => (
                                <div key={n} className={`h-4 rounded-full transition-all duration-500 ${currentStep >= n ? 'bg-emerald-500 w-16 shadow-lg' : 'bg-emerald-100 w-4'}`} />
                            ))}
                        </div>

                        <Card className="bg-white/95 border-4 border-white shadow-2xl rounded-[3rem] p-8 md:p-12 text-center space-y-10 min-h-[600px] flex flex-col items-center justify-around relative overflow-hidden transition-all">
                            <div className="space-y-4 relative z-10 w-full mb-4">
                                <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-4 py-1 rounded-full uppercase tracking-widest">{steps[currentStep].title}</span>
                                <h3 className="text-4xl md:text-5xl font-fredoka text-forest-900 tracking-tighter leading-none mt-4">
                                    {steps[currentStep].question}
                                </h3>
                            </div>

                            <div className="flex items-end justify-center gap-10 md:gap-24 relative z-10 py-6 min-h-[350px]">
                                {steps[currentStep].options.map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={() => handleChoice(option.isCorrect, option.feedback)}
                                        className="group relative flex flex-col items-center transition-all duration-300 hover:scale-110 active:scale-95"
                                    >
                                        <div className={`w-40 h-40 md:w-56 md:h-56 rounded-[3rem] border-8 border-emerald-50 flex items-center justify-center text-8xl md:text-9xl shadow-xl group-hover:shadow-2xl transition-all bg-white relative overflow-hidden`}>
                                            <span className="group-hover:animate-wiggle transition-transform">{option.emoji}</span>
                                        </div>
                                        <span className="mt-8 font-fredoka text-3xl text-forest-910 bg-white/70 px-8 py-3 rounded-full border-2 border-white shadow-sm uppercase tracking-tighter group-hover:bg-white transition-colors">
                                            {option.label}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </Card>

                        {showFeedback && (
                            <div className="fixed top-24 right-6 z-[100] animate-in slide-in-from-right-4 fade-in duration-300">
                                <Card className={`flex items-center gap-6 px-12 py-10 shadow-2xl rounded-[2.5rem] border-4 ${showFeedback === 'correct' ? 'bg-emerald-50 border-emerald-400' : 'bg-rose-50 border-rose-400'}`}>
                                    <span className="text-7xl">{showFeedback === 'correct' ? '🦁' : '🧐'}</span>
                                    <div className="flex flex-col text-left">
                                        <span className={`text-4xl font-fredoka font-bold ${showFeedback === 'correct' ? 'text-emerald-700' : 'text-rose-700'}`}>
                                            {showFeedback === 'correct' ? 'Incredible!' : 'Look Again!'}
                                        </span>
                                        <span className="text-xl font-nunito text-muted-foreground font-bold tracking-tight">
                                            {showFeedback === 'correct' ? 'You matched it perfectly!' : 'Think about the sizes!'}
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

export default MatchCompareLesson12;

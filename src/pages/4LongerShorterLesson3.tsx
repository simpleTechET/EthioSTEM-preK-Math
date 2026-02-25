import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Trees, Ruler } from "lucide-react";
import { MuteButton } from "@/components/MuteButton";
import { useAudio } from "@/context/AudioContext";

const LongerShorter3 = () => {
    const navigate = useNavigate();
    const [showGame, setShowGame] = useState(false);
    const [currentStep, setCurrentStep] = useState(0); // 0: Comparing Pencil, 1: Comparing Spoon, 2: About Same
    const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [isComplete, setIsComplete] = useState(false);
    const { isMuted } = useAudio();

    const markLessonComplete = () => {
        const saved = localStorage.getItem("ethio-stem-m4-completed");
        const completed = saved ? JSON.parse(saved) : [];
        if (!completed.includes("lesson-3")) {
            completed.push("lesson-3");
            localStorage.setItem("ethio-stem-m4-completed", JSON.stringify(completed));
        }
    };

    const speak = (text: string) => {
        if (isMuted) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    };

    const handleChoice = (isCorrect: boolean, feedbackText: string) => {
        if (isCorrect) {
            setShowFeedback('correct');
            speak(feedbackText);
            setTimeout(() => {
                setShowFeedback(null);
                if (currentStep < 2) {
                    setCurrentStep(prev => prev + 1);
                } else {
                    setIsComplete(true);
                    markLessonComplete();
                    speak("You are a length expert!");
                }
            }, 1500);
        } else {
            setShowFeedback('incorrect');
            speak("Not quite! Look closely at the ends.");
        }
    };

    const scenarios = [
        {
            question: "Which one is LONGER than the yellow straw? 🥤",
            baseEmoji: "🥤",
            baseLabel: "Yellow Straw",
            target: "longer",
            options: [
                { id: 'pencil', label: "New Pencil", emoji: "✏️", length: "w-64", isCorrect: true, feedback: "Yes! The pencil is longer than the straw!" },
                { id: 'crayon', label: "Crayon", emoji: "🖍️", length: "w-24", isCorrect: false }
            ]
        },
        {
            question: "Which one is SHORTER than the yellow straw? 🥤",
            baseEmoji: "🥤",
            baseLabel: "Yellow Straw",
            target: "shorter",
            options: [
                { id: 'spoon', label: "Tiny Spoon", emoji: "🥄", length: "w-20", isCorrect: true, feedback: "That's right! The spoon is shorter!" },
                { id: 'ruler', label: "Ruler", emoji: "📏", length: "w-80", isCorrect: false }
            ]
        },
        {
            question: "Which one is ABOUT THE SAME as the yellow straw? 🥤",
            baseEmoji: "🥤",
            baseLabel: "Yellow Straw",
            target: "same",
            options: [
                { id: 'pen', label: "Pen", emoji: "🖊️", length: "w-40", isCorrect: true, feedback: "Great! They are about the same length!" },
                { id: 'needle', label: "Needle", emoji: "🪡", length: "w-10", isCorrect: false }
            ]
        }
    ];

    return (
        <div className="min-h-screen gradient-forest p-4 font-nunito overflow-x-hidden">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-4?last=lesson-3")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <MuteButton />
                    <div>
                        <span className="text-sm font-bold text-forest-700 bg-forest-100 px-3 py-1 rounded-full font-fredoka uppercase tracking-wider">Lesson 3</span>
                        <h1 className="text-2xl font-bold text-foreground font-fredoka tracking-wide mt-1">📏 Longer & Shorter</h1>
                    </div>
                </div>

                {!showGame ? (
                    /* Intro Screen */
                    <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700">
                        <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-3xl flex items-center justify-center rotate-6 shadow-lg border-4 border-white/50">
                            <Ruler className="w-12 h-12 text-white" />
                        </div>
                        <h2 className="text-4xl font-fredoka text-forest-900 uppercase">Straw Search!</h2>
                        <p className="text-2xl text-forest-800 font-nunito leading-relaxed max-w-xl mx-auto">
                            We have a magic yellow straw. Is it <span className="font-bold text-cyan-600">longer</span> or <span className="font-bold text-blue-500">shorter</span> than our forest treasures?
                            <br />Let's find out!
                        </p>
                        <Button
                            onClick={() => { setShowGame(true); speak("Let's compare lengths with our yellow straw!"); }}
                            className="bg-cyan-500 hover:bg-cyan-600 text-white text-3xl px-16 py-10 rounded-full shadow-2xl font-fredoka border-b-8 border-cyan-700 transition-all hover:scale-105 active:scale-95 w-full md:w-auto uppercase tracking-tighter"
                        >
                            Start Measuring! 🧪
                        </Button>
                    </Card>
                ) : isComplete ? (
                    /* Completion Screen */
                    <Card className="bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 shadow-2xl rounded-[4rem] p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                        <div className="text-9xl animate-bounce">🎒</div>
                        <h2 className="text-6xl font-fredoka drop-shadow-xl">Length Specialist!</h2>
                        <p className="text-2xl font-nunito max-w-2xl mx-auto leading-relaxed">
                            You found things that were longer, shorter, and even the same as our straw!
                            <br /><span className="text-yellow-200 font-bold text-4xl">Outstanding!</span>
                        </p>
                        <div className="flex flex-wrap gap-4 w-full pt-8 justify-center">
                            <Button onClick={() => { setCurrentStep(0); setIsComplete(false); speak("Let's measure again!"); }} className="h-20 px-12 bg-white/10 hover:bg-white/20 text-white text-2xl font-fredoka rounded-[2rem] border-4 border-white/20">
                                Play Again! 🔄
                            </Button>
                            <Button onClick={() => navigate("/activities/module-4")} className="h-20 px-12 bg-white text-cyan-700 hover:bg-cyan-50 text-2xl font-fredoka rounded-[2rem] shadow-2xl">
                                Done! ✨
                            </Button>
                        </div>
                    </Card>
                ) : (
                    /* Main Activity */
                    <div className="space-y-8">
                        <div className="flex justify-center gap-2">
                            {[0, 1, 2].map((n) => (
                                <div key={n} className={`h-3 rounded-full transition-all duration-500 ${currentStep >= n ? 'bg-cyan-500 w-12' : 'bg-cyan-100 w-3'}`} />
                            ))}
                        </div>

                        <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-8 md:p-12 text-center space-y-8 min-h-[550px] flex flex-col items-center justify-around relative overflow-hidden">
                            <div className="space-y-4 relative z-10 w-full">
                                <h3 className="text-3xl md:text-4xl font-fredoka text-forest-900">
                                    {scenarios[currentStep].question}
                                </h3>
                            </div>

                            {/* Comparison Area */}
                            <div className="w-full space-y-12 py-10">
                                {/* The Base Straw */}
                                <div className="flex flex-col items-start gap-2 max-w-md mx-auto">
                                    <span className="font-fredoka text-sm text-cyan-600 uppercase tracking-widest bg-cyan-50 px-3 py-1 rounded-full border border-cyan-100">Our Straw</span>
                                    <div className="h-10 w-40 bg-yellow-400 rounded-full border-4 border-white shadow-md flex items-center px-4">
                                        <span className="text-sm">🥤</span>
                                    </div>
                                </div>

                                <div className="h-1 bg-forest-100/50 w-full rounded-full" />

                                {/* The Options */}
                                <div className="flex flex-col gap-10">
                                    {scenarios[currentStep].options.map((option) => (
                                        <div key={option.id} className="flex flex-col items-start gap-2 max-w-2xl mx-auto w-full group">
                                            <span className="font-nunito text-lg font-bold text-forest-700 group-hover:text-cyan-600 transition-colors ml-1">{option.label}</span>
                                            <div
                                                onClick={() => handleChoice(option.isCorrect, option.feedback || "")}
                                                className={`h-12 ${option.length} bg-white rounded-full border-4 border-forest-100 shadow-sm flex items-center px-4 cursor-pointer hover:border-cyan-400 hover:shadow-xl transition-all active:scale-[0.98] group-hover:bg-cyan-50/50`}
                                            >
                                                <span className="text-2xl group-hover:animate-wiggle">{option.emoji}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card>

                        {showFeedback && (
                            <div className="fixed top-24 right-6 z-[100] animate-in slide-in-from-right-4 fade-in duration-300">
                                <Card className={`flex items-center gap-4 px-8 py-6 shadow-2xl rounded-3xl border-4 ${showFeedback === 'correct' ? 'bg-cyan-50 border-cyan-400' : 'bg-rose-50 border-rose-400'}`}>
                                    <span className="text-5xl">{showFeedback === 'correct' ? '🥤' : '🧐'}</span>
                                    <div className="flex flex-col text-left">
                                        <span className={`text-3xl font-fredoka font-bold ${showFeedback === 'correct' ? 'text-cyan-700' : 'text-rose-700'}`}>
                                            {showFeedback === 'correct' ? 'Length Master!' : 'Look Again!'}
                                        </span>
                                        <span className="text-lg font-nunito text-muted-foreground">
                                            {showFeedback === 'correct' ? 'Perfect comparison!' : 'Try the other one!'}
                                        </span>
                                    </div>
                                    {showFeedback === 'incorrect' && (
                                        <Button onClick={() => setShowFeedback(null)} className="ml-4 px-6 py-4 text-xl font-fredoka rounded-2xl border-b-6 bg-rose-500 hover:bg-rose-600 border-rose-700 text-white">
                                            Try Again
                                        </Button>
                                    )}
                                </Card>
                            </div>
                        )}

                        <Button onClick={() => setShowGame(false)} variant="ghost" className="text-forest-400 hover:text-forest-600 w-full py-4 text-lg font-bold font-nunito">
                            ← Instructions
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LongerShorter3;

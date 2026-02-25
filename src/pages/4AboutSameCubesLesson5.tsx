import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Trees, HandHeart } from "lucide-react";
import { MuteButton } from "@/components/MuteButton";
import { useAudio } from "@/context/AudioContext";

const AboutSameCubes5 = () => {
    const navigate = useNavigate();
    const [showGame, setShowGame] = useState(false);
    const [currentStep, setCurrentStep] = useState(0); // 0: Exactly Same (5 vs 5), 1: Colors Different (5 vs 5), 2: Near Match (5 vs 6)
    const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [isComplete, setIsComplete] = useState(false);
    const { isMuted } = useAudio();

    const markLessonComplete = () => {
        const saved = localStorage.getItem("ethio-stem-m4-completed");
        const completed = saved ? JSON.parse(saved) : [];
        if (!completed.includes("lesson-5")) {
            completed.push("lesson-5");
            localStorage.setItem("ethio-stem-m4-completed", JSON.stringify(completed));
        }
    };

    const speak = (text: string) => {
        if (isMuted) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    };

    const handleChoice = (choice: 'same' | 'different', target: 'same' | 'different') => {
        if (choice === target) {
            setShowFeedback('correct');
            speak(target === 'same' ? "Yes! They are about the same!" : "That's right, they are different lengths.");
            setTimeout(() => {
                setShowFeedback(null);
                if (currentStep < 2) {
                    setCurrentStep(prev => prev + 1);
                } else {
                    setIsComplete(true);
                    markLessonComplete();
                    speak("You found all the matches! Great job!");
                }
            }, 1500);
        } else {
            setShowFeedback('incorrect');
            speak("Look closely! Count the cubes to be sure.");
        }
    };

    const renderCubes = (count: number, color: string) => (
        <div className="flex flex-col-reverse items-center gap-1 animate-in slide-in-from-bottom-8 duration-500">
            {[...Array(count)].map((_, i) => (
                <div key={i} className={`w-14 h-14 md:w-20 md:h-20 rounded-xl border-4 border-white shadow-md transition-all duration-300 ${color} flex items-center justify-center relative`}>
                    <div className="w-4 h-4 bg-white/40 rounded-full" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-1/2 bg-white/20 rounded-full" />
                </div>
            ))}
            <span className="mt-4 font-fredoka text-2xl text-forest-700 bg-white/80 px-4 py-1 rounded-full border border-forest-100">{count}</span>
        </div>
    );

    return (
        <div className="min-h-screen gradient-forest p-4 font-nunito overflow-x-hidden">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-4?last=lesson-5")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <MuteButton />
                    <div>
                        <span className="text-sm font-bold text-forest-700 bg-forest-100 px-3 py-1 rounded-full font-fredoka uppercase tracking-wider">Lesson 5</span>
                        <h1 className="text-2xl font-bold text-foreground font-fredoka tracking-wide mt-1">🤝 About the Same</h1>
                    </div>
                </div>

                {!showGame ? (
                    /* Intro Screen */
                    <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700">
                        <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-sky-400 to-indigo-600 rounded-3xl flex items-center justify-center -rotate-6 shadow-lg border-4 border-white/50">
                            <HandHeart className="w-12 h-12 text-white" />
                        </div>
                        <h2 className="text-4xl font-fredoka text-forest-900 uppercase">Match Making!</h2>
                        <p className="text-2xl text-forest-800 font-nunito leading-relaxed max-w-xl mx-auto">
                            Sometimes things are <span className="font-bold text-sky-600 underline decoration-double decoration-indigo-300">Exactly the Same</span>.
                            <br />Can you find the sticks that match?
                        </p>
                        <Button
                            onClick={() => { setShowGame(true); speak("Let's find the sticks that are about the same length!"); }}
                            className="bg-sky-500 hover:bg-sky-600 text-white text-3xl px-16 py-10 rounded-full shadow-2xl font-fredoka border-b-8 border-sky-700 transition-all hover:scale-105 active:scale-95 w-full md:w-auto uppercase tracking-tighter"
                        >
                            Start Matching! 🤝
                        </Button>
                    </Card>
                ) : isComplete ? (
                    /* Completion Screen */
                    <Card className="bg-gradient-to-br from-sky-500 via-indigo-500 to-indigo-800 shadow-2xl rounded-[4rem] p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                        <div className="text-9xl animate-bounce">🏆</div>
                        <h2 className="text-6xl font-fredoka drop-shadow-xl tracking-tighter">Matching Pro!</h2>
                        <p className="text-2xl font-nunito max-w-2xl mx-auto leading-relaxed">
                            You correctly identified which sticks were the same and which were different.
                            <br /><span className="text-yellow-200 font-bold text-4xl">TOPIC A COMPLETE!</span>
                        </p>
                        <div className="flex flex-wrap gap-4 w-full pt-8 justify-center">
                            <Button onClick={() => { setCurrentStep(0); setIsComplete(false); speak("Let's match again!"); }} className="h-20 px-12 bg-white/10 hover:bg-white/20 text-white text-2xl font-fredoka rounded-[2rem] border-4 border-white/20">
                                Play Again! 🔄
                            </Button>
                            <Button onClick={() => navigate("/activities/module-4")} className="h-20 px-12 bg-white text-indigo-700 hover:bg-indigo-50 text-2xl font-fredoka rounded-[2rem] shadow-2xl">
                                Module Hub ✨
                            </Button>
                        </div>
                    </Card>
                ) : (
                    /* Main Activity */
                    <div className="space-y-8">
                        <div className="flex justify-center gap-2">
                            {[0, 1, 2].map((n) => (
                                <div key={n} className={`h-4 rounded-full transition-all duration-500 ${currentStep >= n ? 'bg-sky-500 w-16 shadow-lg' : 'bg-sky-100 w-4'}`} />
                            ))}
                        </div>

                        <Card className="bg-white/95 border-4 border-white shadow-2xl rounded-[3rem] p-8 md:p-12 text-center space-y-8 min-h-[650px] flex flex-col items-center justify-around relative overflow-hidden transition-colors duration-500">
                            <div className="space-y-2 relative z-10 w-full mb-2">
                                <h3 className="text-4xl md:text-5xl font-fredoka text-forest-900 tracking-tight leading-none">
                                    {currentStep === 0 && "Look at these sticks!"}
                                    {currentStep === 1 && "Different colors, same length?"}
                                    {currentStep === 2 && "Are they about the same?"}
                                </h3>
                                <p className="text-forest-600 font-nunito text-xl mt-4">
                                    {currentStep === 0 && "They both have 5 cubes. Are they same?"}
                                    {currentStep === 1 && "One is blue, one is red. Count the cubes!"}
                                    {currentStep === 2 && "Careful! Look at the top cubes."}
                                </p>
                            </div>

                            {/* Activity Area */}
                            <div className="flex items-end justify-center gap-12 md:gap-24 relative z-10 min-h-[350px]">
                                {renderCubes(5, "bg-sky-500")}
                                {renderCubes(currentStep === 2 ? 6 : 5, currentStep === 1 ? "bg-rose-500" : (currentStep === 2 ? "bg-amber-500" : "bg-sky-500"))}
                            </div>

                            {/* Interaction Buttons */}
                            <div className="flex flex-col md:flex-row gap-6 w-full max-w-3xl">
                                <Button
                                    onClick={() => handleChoice('same', currentStep === 2 ? 'different' : 'same')}
                                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-10 text-3xl font-fredoka rounded-[2.5rem] border-b-8 border-emerald-800 shadow-2xl transition-all active:scale-95 group"
                                >
                                    <span className="hidden group-active:inline mr-2">✨</span>
                                    About the SAME! 🟰
                                </Button>
                                <Button
                                    onClick={() => handleChoice('different', currentStep === 2 ? 'different' : 'same')}
                                    className="flex-1 bg-rose-500 hover:bg-rose-600 text-white py-10 text-3xl font-fredoka rounded-[2.5rem] border-b-8 border-rose-800 shadow-2xl transition-all active:scale-95 group"
                                >
                                    DIFFERENT! ❌
                                </Button>
                            </div>
                        </Card>

                        {showFeedback && (
                            <div className="fixed top-24 right-6 z-[100] animate-in slide-in-from-right-4 fade-in duration-300">
                                <Card className={`flex items-center gap-4 px-10 py-8 shadow-2xl rounded-[2rem] border-4 ${showFeedback === 'correct' ? 'bg-sky-50 border-sky-400' : 'bg-red-50 border-red-400'}`}>
                                    <span className="text-6xl">{showFeedback === 'correct' ? '🤼' : '🧐'}</span>
                                    <div className="flex flex-col text-left">
                                        <span className={`text-4xl font-fredoka font-bold ${showFeedback === 'correct' ? 'text-sky-700' : 'text-red-700'}`}>
                                            {showFeedback === 'correct' ? 'Brilliant!' : 'Try Again!'}
                                        </span>
                                        <span className="text-xl font-nunito text-muted-foreground font-semibold">
                                            {showFeedback === 'correct' ? 'You have an eagle eye!' : 'Look at the height!'}
                                        </span>
                                    </div>
                                    {showFeedback === 'incorrect' && (
                                        <Button onClick={() => setShowFeedback(null)} className="ml-4 px-8 py-5 text-2xl font-fredoka rounded-2xl border-b-8 bg-red-500 hover:bg-red-600 border-red-700 text-white">
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

export default AboutSameCubes5;

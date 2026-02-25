import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Trees, Layers } from "lucide-react";
import { MuteButton } from "@/components/MuteButton";
import { useAudio } from "@/context/AudioContext";

const LinkingCubes4 = () => {
    const navigate = useNavigate();
    const [showGame, setShowGame] = useState(false);
    const [currentStep, setCurrentStep] = useState(0); // 0: Longer (4 vs 3), 1: Shorter (3 vs 5), 2: Same (4 vs 4)
    const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [isComplete, setIsComplete] = useState(false);
    const { isMuted } = useAudio();

    const markLessonComplete = () => {
        const saved = localStorage.getItem("ethio-stem-m4-completed");
        const completed = saved ? JSON.parse(saved) : [];
        if (!completed.includes("lesson-4")) {
            completed.push("lesson-4");
            localStorage.setItem("ethio-stem-m4-completed", JSON.stringify(completed));
        }
    };

    const speak = (text: string) => {
        if (isMuted) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    };

    const handleChoice = (choice: 'longer' | 'shorter' | 'same', target: 'longer' | 'shorter' | 'same') => {
        if (choice === target) {
            setShowFeedback('correct');
            speak("Perfect! You measured correctly!");
            setTimeout(() => {
                setShowFeedback(null);
                if (currentStep < 2) {
                    setCurrentStep(prev => prev + 1);
                } else {
                    setIsComplete(true);
                    markLessonComplete();
                    speak("You are a cube stick master!");
                }
            }, 1500);
        } else {
            setShowFeedback('incorrect');
            speak("Oops! Count the cubes and look at the ends.");
        }
    };

    const renderCubes = (count: number, color: string) => (
        <div className="flex flex-col-reverse items-center gap-0.5">
            {[...Array(count)].map((_, i) => (
                <div key={i} className={`w-12 h-12 md:w-16 md:h-16 rounded-lg border-4 border-white shadow-sm transition-all duration-300 ${color} flex items-center justify-center`}>
                    <div className="w-3 h-3 bg-white/30 rounded-full" />
                </div>
            ))}
            <span className="mt-2 font-fredoka text-xl text-forest-700">{count}</span>
        </div>
    );

    return (
        <div className="min-h-screen gradient-forest p-4 font-nunito overflow-x-hidden">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-4?last=lesson-4")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <MuteButton />
                    <div>
                        <span className="text-sm font-bold text-forest-700 bg-forest-100 px-3 py-1 rounded-full font-fredoka uppercase tracking-wider">Lesson 4</span>
                        <h1 className="text-2xl font-bold text-foreground font-fredoka tracking-wide mt-1">🧱 Linking Cube Sticks</h1>
                    </div>
                </div>

                {!showGame ? (
                    /* Intro Screen */
                    <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700">
                        <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-rose-400 to-indigo-600 rounded-3xl flex items-center justify-center rotate-12 shadow-lg border-4 border-white/50">
                            <Layers className="w-12 h-12 text-white" />
                        </div>
                        <h2 className="text-4xl font-fredoka text-forest-900 uppercase">Cube Builder!</h2>
                        <p className="text-2xl text-forest-800 font-nunito leading-relaxed max-w-xl mx-auto">
                            We can build <span className="font-bold text-rose-600">sticks</span> of cubes to measure things!
                            <br />A stick with more cubes is <span className="italic">longer</span>.
                        </p>
                        <Button
                            onClick={() => { setShowGame(true); speak("Ready to build and compare cube sticks? Let's go!"); }}
                            className="bg-rose-500 hover:bg-rose-600 text-white text-3xl px-16 py-10 rounded-full shadow-2xl font-fredoka border-b-8 border-rose-700 transition-all hover:scale-105 active:scale-95 w-full md:w-auto uppercase tracking-tighter"
                        >
                            Start Building! 🏗️
                        </Button>
                    </Card>
                ) : isComplete ? (
                    /* Completion Screen */
                    <Card className="bg-gradient-to-br from-rose-500 via-indigo-500 to-purple-600 shadow-2xl rounded-[4rem] p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                        <div className="text-9xl animate-bounce">🏰</div>
                        <h2 className="text-6xl font-fredoka drop-shadow-xl">Master Builder!</h2>
                        <p className="text-2xl font-nunito max-w-2xl mx-auto leading-relaxed">
                            You know exactly how to compare sticks by counting the cubes!
                            <br /><span className="text-rose-200 font-black text-4xl uppercase">Brilliant!</span>
                        </p>
                        <div className="flex flex-wrap gap-4 w-full pt-8 justify-center">
                            <Button onClick={() => { setCurrentStep(0); setIsComplete(false); speak("Let's build again!"); }} className="h-20 px-12 bg-white/10 hover:bg-white/20 text-white text-2xl font-fredoka rounded-[2rem] border-4 border-white/20">
                                Play Again! 🔄
                            </Button>
                            <Button onClick={() => navigate("/activities/module-4")} className="h-20 px-12 bg-white text-indigo-700 hover:bg-indigo-50 text-2xl font-fredoka rounded-[2rem] shadow-2xl">
                                Done! ✨
                            </Button>
                        </div>
                    </Card>
                ) : (
                    /* Main Activity */
                    <div className="space-y-8">
                        <div className="flex justify-center gap-2">
                            {[0, 1, 2].map((n) => (
                                <div key={n} className={`h-4 rounded-full transition-all duration-500 ${currentStep >= n ? 'bg-rose-500 w-16 shadow-inner' : 'bg-rose-100 w-4'}`} />
                            ))}
                        </div>

                        <Card className="bg-white/90 border-4 border-white shadow-2xl rounded-[3rem] p-8 md:p-12 text-center space-y-8 min-h-[600px] flex flex-col items-center justify-around relative overflow-hidden">
                            <div className="space-y-2 relative z-10 w-full mb-4">
                                <h3 className="text-3xl md:text-5xl font-fredoka text-forest-900 tracking-tight">
                                    {currentStep === 0 && "Compare the Sticks!"}
                                    {currentStep === 1 && "Which stick is SHORTER?"}
                                    {currentStep === 2 && "Are these sticks the same?"}
                                </h3>
                            </div>

                            {/* Activity Area */}
                            <div className="flex items-end justify-center gap-12 md:gap-24 relative z-10 py-6 min-h-[300px]">
                                {renderCubes(currentStep === 1 ? 3 : 4, currentStep === 2 ? "bg-rose-500" : "bg-indigo-500")}
                                {renderCubes(currentStep === 0 ? 3 : (currentStep === 1 ? 5 : 4), currentStep === 2 ? "bg-rose-500 shadow-inner" : "bg-emerald-500")}
                            </div>

                            {/* Interaction Buttons */}
                            <div className="flex flex-col md:flex-row gap-4 w-full max-w-2xl">
                                {currentStep === 0 && (
                                    <>
                                        <Button onClick={() => handleChoice('longer', 'longer')} className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white py-8 text-2xl font-fredoka rounded-3xl border-b-8 border-indigo-800 shadow-xl transition-all active:scale-95">The Blue Stick is Longer! 🔵</Button>
                                        <Button onClick={() => handleChoice('shorter', 'longer')} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-8 text-2xl font-fredoka rounded-3xl border-b-8 border-emerald-800 shadow-xl transition-all active:scale-95">The Green Stick is Longer! 🟢</Button>
                                    </>
                                )}
                                {currentStep === 1 && (
                                    <>
                                        <Button onClick={() => handleChoice('shorter', 'shorter')} className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white py-8 text-2xl font-fredoka rounded-3xl border-b-8 border-indigo-800 shadow-xl transition-all active:scale-95">Blue is Shorter! 🔵</Button>
                                        <Button onClick={() => handleChoice('longer', 'shorter')} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-8 text-2xl font-fredoka rounded-3xl border-b-8 border-emerald-800 shadow-xl transition-all active:scale-95">Green is Shorter! 🟢</Button>
                                    </>
                                )}
                                {currentStep === 2 && (
                                    <>
                                        <Button onClick={() => handleChoice('same', 'same')} className="flex-1 bg-rose-500 hover:bg-rose-600 text-white py-10 text-3xl font-fredoka rounded-3xl border-b-8 border-rose-800 shadow-2xl transition-all active:scale-95">They are the SAME! 🟰</Button>
                                        <Button onClick={() => handleChoice('shorter', 'same')} className="flex-1 bg-white/50 text-muted-foreground py-10 text-2xl font-fredoka rounded-3xl border-2 border-forest-100 transition-all active:scale-95">Different! ❌</Button>
                                    </>
                                )}
                            </div>
                        </Card>

                        {showFeedback && (
                            <div className="fixed top-24 right-6 z-[100] animate-in slide-in-from-right-4 fade-in duration-300">
                                <Card className={`flex items-center gap-4 px-8 py-6 shadow-2xl rounded-3xl border-4 ${showFeedback === 'correct' ? 'bg-rose-50 border-rose-400' : 'bg-red-50 border-red-400'}`}>
                                    <span className="text-5xl">{showFeedback === 'correct' ? '🧱' : '🧐'}</span>
                                    <div className="flex flex-col text-left">
                                        <span className={`text-3xl font-fredoka font-bold ${showFeedback === 'correct' ? 'text-rose-700' : 'text-red-700'}`}>
                                            {showFeedback === 'correct' ? 'Magnificent!' : 'Count Again!'}
                                        </span>
                                        <span className="text-lg font-nunito text-muted-foreground font-medium">
                                            {showFeedback === 'correct' ? 'You are a measuring pro!' : 'Which stick has more cubes?'}
                                        </span>
                                    </div>
                                    {showFeedback === 'incorrect' && (
                                        <Button onClick={() => setShowFeedback(null)} className="ml-4 px-6 py-4 text-xl font-fredoka rounded-2xl border-b-6 bg-red-500 hover:bg-red-600 border-red-700 text-white">
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

export default LinkingCubes4;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Trees, Ghost } from "lucide-react";
import { MuteButton } from "@/components/MuteButton";
import { useAudio } from "@/context/AudioContext";

const SameVolumeLesson11 = () => {
    const navigate = useNavigate();
    const [showGame, setShowGame] = useState(false);
    const [currentStep, setCurrentStep] = useState(0); // 0: Tall Jar vs Wide Bowl (Same amount), 1: 3 cups into 1 jar
    const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [isComplete, setIsComplete] = useState(false);
    const [isThinking, setIsThinking] = useState(false);
    const { isMuted } = useAudio();

    const markLessonComplete = () => {
        const saved = localStorage.getItem("ethio-stem-m4-completed");
        const completed = saved ? JSON.parse(saved) : [];
        if (!completed.includes("lesson-11")) {
            completed.push("lesson-11");
            localStorage.setItem("ethio-stem-m4-completed", JSON.stringify(completed));
        }
    };

    const speak = (text: string) => {
        if (isMuted) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    };

    const handleChoice = (isSame: boolean) => {
        setIsThinking(true);
        speak("Thinking time... Is it the same?");

        setTimeout(() => {
            setIsThinking(false);
            if (isSame) {
                setShowFeedback('correct');
                speak("Magic! Yes, it is the same amount, even if the shape changed!");
                setTimeout(() => {
                    setShowFeedback(null);
                    if (currentStep < 1) {
                        setCurrentStep(prev => prev + 1);
                    } else {
                        setIsComplete(true);
                        markLessonComplete();
                        speak("You are a volume wizard!");
                    }
                }, 2000);
            } else {
                setShowFeedback('incorrect');
                speak("Wait, look closer. We didn't add or take any away!");
            }
        }, 1200);
    };

    return (
        <div className="min-h-screen gradient-forest p-4 font-nunito overflow-x-hidden">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-4?last=lesson-11")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <MuteButton />
                    <div>
                        <span className="text-sm font-bold text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full font-fredoka uppercase tracking-wider">Lesson 11</span>
                        <h1 className="text-2xl font-bold text-foreground font-fredoka tracking-wide mt-1">✨ Same Volume</h1>
                    </div>
                </div>

                {!showGame ? (
                    <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700">
                        <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-indigo-500 to-purple-700 rounded-3xl flex items-center justify-center rotate-3 shadow-lg border-4 border-white/50">
                            <Ghost className="w-12 h-12 text-white" />
                        </div>
                        <h2 className="text-4xl font-fredoka text-forest-900 uppercase">Volume Magic!</h2>
                        <p className="text-2xl text-forest-800 font-nunito leading-relaxed max-w-xl mx-auto">
                            Sometimes the <span className="font-black text-indigo-700 underline">SAME</span> amount looks different in a new jar.
                            <br />Can you spot the magic?
                        </p>
                        <Button
                            onClick={() => { setShowGame(true); speak("Ready for magic? Let's see if the volume stays the same!"); }}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl font-fredoka border-b-8 border-indigo-800 transition-all hover:scale-105 active:scale-95 w-full md:w-auto uppercase tracking-tighter"
                        >
                            Open the Magic Jar! 🪄
                        </Button>
                    </Card>
                ) : isComplete ? (
                    <Card className="bg-gradient-to-br from-indigo-600 via-purple-600 to-purple-900 shadow-2xl rounded-[4rem] p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                        <div className="text-9xl animate-bounce">🪄</div>
                        <h2 className="text-6xl font-fredoka drop-shadow-xl tracking-tighter uppercase">Volume Wizard!</h2>
                        <p className="text-2xl font-nunito max-w-2xl mx-auto leading-relaxed">
                            You know that volume doesn't change just because of the shape!
                            <br /><span className="text-indigo-200 font-black text-4xl">FANTASTIC!</span>
                        </p>
                        <div className="flex flex-wrap gap-4 w-full pt-8 justify-center">
                            <Button onClick={() => { setCurrentStep(0); setIsComplete(false); speak("Show me more magic!"); }} className="h-20 px-12 bg-white/10 hover:bg-white/20 text-white text-2xl font-fredoka rounded-[2rem] border-4 border-white/20 uppercase tracking-tighter">
                                Play Again 🔄
                            </Button>
                            <Button onClick={() => navigate("/activities/module-4")} className="h-20 px-12 bg-white text-indigo-800 hover:bg-indigo-50 text-2xl font-fredoka rounded-[2rem] shadow-2xl uppercase tracking-tighter">
                                Next Trick! ✨
                            </Button>
                        </div>
                    </Card>
                ) : (
                    <div className="space-y-8">
                        <div className="flex justify-center gap-2">
                            {[0, 1].map((n) => (
                                <div key={n} className={`h-4 rounded-full transition-all duration-500 ${currentStep >= n ? 'bg-indigo-500 w-16 shadow-lg' : 'bg-indigo-100 w-4'}`} />
                            ))}
                        </div>

                        <Card className="bg-white/95 border-4 border-white shadow-2xl rounded-[3rem] p-8 md:p-12 text-center space-y-10 min-h-[650px] flex flex-col items-center justify-around relative overflow-hidden transition-all">
                            <div className="space-y-4 relative z-10 w-full mb-4">
                                <h3 className="text-4xl md:text-5xl font-fredoka text-indigo-900 tracking-tighter leading-none">
                                    {currentStep === 0 && "Look! We poured the same water into a new bowl."}
                                    {currentStep === 1 && "We poured 3 little cups into this big jar."}
                                </h3>
                                <p className="text-indigo-600 font-nunito text-xl font-medium">Is it still the same amount?</p>
                            </div>

                            <div className="flex items-end justify-center gap-12 md:gap-24 relative z-10 py-6 min-h-[350px]">
                                {currentStep === 0 ? (
                                    <>
                                        {/* Tall Jar */}
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-20 h-64 border-8 border-slate-200 rounded-t-lg rounded-b-xl relative bg-white/40 overflow-hidden shadow-xl">
                                                <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-blue-400" />
                                            </div>
                                            <span className="font-fredoka text-xl text-indigo-700">Tall Jar</span>
                                        </div>
                                        <span className="text-6xl self-center text-indigo-300 animate-pulse">➡️</span>
                                        {/* Wide Bowl */}
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-64 h-24 border-8 border-slate-200 rounded-b-full relative bg-white/40 overflow-hidden shadow-xl">
                                                <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-blue-400" />
                                            </div>
                                            <span className="font-fredoka text-xl text-indigo-700">Wide Bowl</span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {/* 3 Small Cups */}
                                        <div className="flex gap-2">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-12 h-16 border-4 border-slate-200 rounded-lg bg-blue-400 shadow-md transform -rotate-12" />
                                            ))}
                                        </div>
                                        <span className="text-6xl self-center text-indigo-300 animate-pulse">➡️</span>
                                        {/* Big Jar */}
                                        <div className="w-32 h-64 border-8 border-slate-200 rounded-xl relative bg-white/40 overflow-hidden shadow-xl">
                                            <div className="absolute bottom-0 left-0 right-0 h-3/5 bg-blue-400" />
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="flex flex-col md:flex-row gap-6 w-full max-w-2xl relative z-20">
                                <Button
                                    onClick={() => handleChoice(true)}
                                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-10 text-3xl font-fredoka rounded-[2.5rem] border-b-8 border-indigo-800 shadow-2xl transition-all active:scale-95 uppercase tracking-tighter"
                                    disabled={isThinking}
                                >
                                    It's the SAME! 🟰
                                </Button>
                                <Button
                                    onClick={() => handleChoice(false)}
                                    className="flex-1 bg-white border-4 border-indigo-200 text-indigo-300 py-10 text-3xl font-placeholder rounded-[2.5rem] shadow-xl transition-all active:scale-95 uppercase tracking-tighter"
                                    disabled={isThinking}
                                >
                                    Different ❌
                                </Button>
                            </div>
                        </Card>

                        {showFeedback && (
                            <div className="fixed top-24 right-6 z-[100] animate-in slide-in-from-right-4 fade-in duration-300">
                                <Card className={`flex items-center gap-6 px-12 py-10 shadow-2xl rounded-[2.5rem] border-4 ${showFeedback === 'correct' ? 'bg-indigo-50 border-indigo-400' : 'bg-rose-50 border-rose-400'}`}>
                                    <span className="text-7xl">{showFeedback === 'correct' ? '🧙‍♂️' : '🧐'}</span>
                                    <div className="flex flex-col text-left">
                                        <span className={`text-4xl font-fredoka font-bold ${showFeedback === 'correct' ? 'text-indigo-700' : 'text-rose-700'}`}>
                                            {showFeedback === 'correct' ? 'Magical!' : 'Wait!'}
                                        </span>
                                        <span className="text-xl font-nunito text-muted-foreground font-bold tracking-tight">
                                            {showFeedback === 'correct' ? 'You see the magic!' : 'Did we lose any water?'}
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

export default SameVolumeLesson11;

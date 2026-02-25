import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Trees, Beaker } from "lucide-react";
import { MuteButton } from "@/components/MuteButton";
import { useAudio } from "@/context/AudioContext";

const MoreLessLesson10 = () => {
    const navigate = useNavigate();
    const [showGame, setShowGame] = useState(false);
    const [currentStep, setCurrentStep] = useState(0); // 0: More water, 1: Less sand
    const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [isComplete, setIsComplete] = useState(false);
    const [isPouring, setIsPouring] = useState(false);
    const { isMuted } = useAudio();

    const markLessonComplete = () => {
        const saved = localStorage.getItem("ethio-stem-m4-completed");
        const completed = saved ? JSON.parse(saved) : [];
        if (!completed.includes("lesson-10")) {
            completed.push("lesson-10");
            localStorage.setItem("ethio-stem-m4-completed", JSON.stringify(completed));
        }
    };

    const speak = (text: string) => {
        if (isMuted) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    };

    const handleChoice = (type: 'more' | 'less', target: 'more' | 'less') => {
        setIsPouring(true);
        speak(type === target ? "Pour! Yes, this one has " + target + "!" : "Wait, look closely. We want the one with " + target + ".");

        setTimeout(() => {
            setIsPouring(false);
            if (type === target) {
                setShowFeedback('correct');
                setTimeout(() => {
                    setShowFeedback(null);
                    if (currentStep < 1) {
                        setCurrentStep(prev => prev + 1);
                    } else {
                        setIsComplete(true);
                        markLessonComplete();
                        speak("You can tell exactly how much is inside!");
                    }
                }, 1500);
            } else {
                setShowFeedback('incorrect');
            }
        }, 1000);
    };

    const scenarios = [
        {
            question: "Which jar has MORE water? 💧",
            target: 'more' as const,
            options: [
                { id: 'full', label: "Lots of Water", emoji: "💧", type: 'more' as const, fillHeight: "h-3/4", color: "bg-blue-400" },
                { id: 'empty', label: "A Little Water", emoji: "💧", type: 'less' as const, fillHeight: "h-1/4", color: "bg-blue-300" }
            ]
        },
        {
            question: "Which bucket has LESS sand? 🏖️",
            target: 'less' as const,
            options: [
                { id: 'lots-sand', label: "Lots of Sand", emoji: "🏖️", type: 'more' as const, fillHeight: "h-4/5", color: "bg-amber-300" },
                { id: 'less-sand', label: "Little Sand", emoji: "🏖️", type: 'less' as const, fillHeight: "h-1/5", color: "bg-amber-200" }
            ]
        }
    ];

    return (
        <div className="min-h-screen gradient-forest p-4 font-nunito overflow-x-hidden">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-4?last=lesson-10")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <MuteButton />
                    <div>
                        <span className="text-sm font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-full font-fredoka uppercase tracking-wider">Lesson 10</span>
                        <h1 className="text-2xl font-bold text-foreground font-fredoka tracking-wide mt-1">🧪 More or Less</h1>
                    </div>
                </div>

                {!showGame ? (
                    <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700">
                        <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-blue-400 to-indigo-600 rounded-3xl flex items-center justify-center -rotate-6 shadow-lg border-4 border-white/50">
                            <Beaker className="w-12 h-12 text-white" />
                        </div>
                        <h2 className="text-4xl font-fredoka text-forest-900 uppercase">Fill it Up!</h2>
                        <p className="text-2xl text-forest-800 font-nunito leading-relaxed max-w-xl mx-auto">
                            We can compare how much is inside.
                            <br />One has <span className="font-black text-blue-700 underline underline-offset-4">MORE</span> and one has <span className="italic text-indigo-500 font-bold">LESS</span>.
                        </p>
                        <Button
                            onClick={() => { setShowGame(true); speak("Let's look at the containers! Which one has more and which has less?"); }}
                            className="bg-blue-500 hover:bg-blue-600 text-white text-3xl px-16 py-10 rounded-full shadow-2xl font-fredoka border-b-8 border-blue-800 transition-all hover:scale-105 active:scale-95 w-full md:w-auto uppercase tracking-tighter"
                        >
                            Pour & Play! 🧪
                        </Button>
                    </Card>
                ) : isComplete ? (
                    <Card className="bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-900 shadow-2xl rounded-[4rem] p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                        <div className="text-9xl animate-bounce">💧</div>
                        <h2 className="text-6xl font-fredoka drop-shadow-xl tracking-tighter uppercase">Volume Master!</h2>
                        <p className="text-2xl font-nunito max-w-2xl mx-auto leading-relaxed">
                            You're a pro at comparing how much is in the containers!
                            <br /><span className="text-blue-300 font-black text-4xl uppercase">Brilliant!</span>
                        </p>
                        <div className="flex flex-wrap gap-4 w-full pt-8 justify-center">
                            <Button onClick={() => { setCurrentStep(0); setIsComplete(false); speak("Let's pour again!"); }} className="h-20 px-12 bg-white/10 hover:bg-white/20 text-white text-2xl font-fredoka rounded-[2rem] border-4 border-white/20 uppercase tracking-tighter">
                                Play Again 🔄
                            </Button>
                            <Button onClick={() => navigate("/activities/module-4")} className="h-20 px-12 bg-white text-indigo-800 hover:bg-indigo-50 text-2xl font-fredoka rounded-[2rem] shadow-2xl uppercase tracking-tighter">
                                Next One! ✨
                            </Button>
                        </div>
                    </Card>
                ) : (
                    <div className="space-y-8">
                        <div className="flex justify-center gap-2">
                            {[0, 1].map((n) => (
                                <div key={n} className={`h-4 rounded-full transition-all duration-500 ${currentStep >= n ? 'bg-blue-500 w-16 shadow-lg' : 'bg-blue-100 w-4'}`} />
                            ))}
                        </div>

                        <Card className="bg-white/95 border-4 border-white shadow-2xl rounded-[3rem] p-8 md:p-12 text-center space-y-10 min-h-[600px] flex flex-col items-center justify-around relative overflow-hidden transition-all">
                            <div className="space-y-4 relative z-10 w-full mb-4">
                                <h3 className="text-4xl md:text-5xl font-fredoka text-forest-900 tracking-tighter leading-none">
                                    {scenarios[currentStep].question}
                                </h3>
                            </div>

                            <div className="flex items-end justify-center gap-12 md:gap-32 relative z-10 py-6 min-h-[350px]">
                                {scenarios[currentStep].options.map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={() => handleChoice(option.type, scenarios[currentStep].target)}
                                        className="group relative flex flex-col items-center transition-all duration-300 hover:scale-110 active:scale-95 disabled:opacity-80"
                                        disabled={isPouring}
                                    >
                                        <div className={`w-32 h-56 md:w-40 md:h-72 rounded-t-xl rounded-b-[2rem] border-8 border-slate-200/50 relative overflow-hidden bg-white/30 shadow-2xl transition-all duration-500 group-hover:border-blue-200`}>
                                            <div className={`absolute bottom-0 left-0 right-0 ${option.color} ${option.fillHeight} transition-all duration-700 ease-in-out`}>
                                                {isPouring && (
                                                    <div className="absolute top-0 left-0 right-0 h-1 bg-white/30 animate-pulse" />
                                                )}
                                            </div>
                                            <div className="absolute inset-0 flex items-center justify-center opacity-10 blur-sm scale-150">
                                                <span className="text-8xl">{option.emoji}</span>
                                            </div>
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
                                <Card className={`flex items-center gap-6 px-12 py-10 shadow-2xl rounded-[2.5rem] border-4 ${showFeedback === 'correct' ? 'bg-blue-50 border-blue-400' : 'bg-rose-50 border-rose-400'}`}>
                                    <span className="text-7xl">{showFeedback === 'correct' ? '🎉' : '🧐'}</span>
                                    <div className="flex flex-col text-left">
                                        <span className={`text-4xl font-fredoka font-bold ${showFeedback === 'correct' ? 'text-blue-700' : 'text-rose-700'}`}>
                                            {showFeedback === 'correct' ? 'Spectacular!' : 'Look Closer!'}
                                        </span>
                                        <span className="text-xl font-nunito text-muted-foreground font-bold tracking-tight">
                                            {showFeedback === 'correct' ? 'You poured the right amount!' : 'Which fills more?'}
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

export default MoreLessLesson10;

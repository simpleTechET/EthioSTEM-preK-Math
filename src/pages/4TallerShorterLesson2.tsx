import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Trees, Ruler } from "lucide-react";
import { MuteButton } from "@/components/MuteButton";
import { useAudio } from "@/context/AudioContext";

const TallerShorter2 = () => {
    const navigate = useNavigate();
    const [showGame, setShowGame] = useState(false);
    const [currentStep, setCurrentStep] = useState(0); // 0: Aligned, 1: The Trick (Susie on chair), 2: Fixed
    const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [isComplete, setIsComplete] = useState(false);
    const { isMuted } = useAudio();

    const markLessonComplete = () => {
        const saved = localStorage.getItem("ethio-stem-m4-completed");
        const completed = saved ? JSON.parse(saved) : [];
        if (!completed.includes("lesson-2")) {
            completed.push("lesson-2");
            localStorage.setItem("ethio-stem-m4-completed", JSON.stringify(completed));
        }
    };

    const speak = (text: string) => {
        if (isMuted) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    };

    const handleStepCompletion = () => {
        if (currentStep < 2) {
            setCurrentStep(prev => prev + 1);
            if (currentStep === 0) speak("Oh look! Susie is standing on a chair. Is she really taller than the teacher?");
            if (currentStep === 1) speak("Now they are both on the ground. Who is taller now?");
        } else {
            setIsComplete(true);
            markLessonComplete();
            speak("Great job explorer! You learned how to line things up!");
        }
    };

    return (
        <div className="min-h-screen gradient-forest p-4 font-nunito overflow-x-hidden">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-4?last=lesson-2")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <MuteButton />
                    <div>
                        <span className="text-sm font-bold text-forest-700 bg-forest-100 px-3 py-1 rounded-full font-fredoka uppercase tracking-wider">Lesson 2</span>
                        <h1 className="text-2xl font-bold text-foreground font-fredoka tracking-wide mt-1">🪜 Taller & Shorter</h1>
                    </div>
                </div>

                {!showGame ? (
                    /* Intro Screen */
                    <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700">
                        <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-amber-400 to-orange-600 rounded-3xl flex items-center justify-center -rotate-3 shadow-lg border-4 border-white/50">
                            <Ruler className="w-12 h-12 text-white" />
                        </div>
                        <h2 className="text-4xl font-fredoka text-forest-900 uppercase">Line them up!</h2>
                        <p className="text-2xl text-forest-800 font-nunito leading-relaxed max-w-xl mx-auto">
                            To see who is <span className="font-bold text-orange-600">taller</span>, we must start at the <span className="underline decoration-wavy decoration-orange-400">same place</span>!
                            <br />Let's learn how to compare!
                        </p>
                        <Button
                            onClick={() => { setShowGame(true); speak("Let's help Susie and her teacher compare their heights!"); }}
                            className="bg-orange-500 hover:bg-orange-600 text-white text-3xl px-16 py-10 rounded-full shadow-2xl font-fredoka border-b-8 border-orange-700 transition-all hover:scale-105 active:scale-95 w-full md:w-auto uppercase tracking-tighter"
                        >
                            Let's Go! 🚀
                        </Button>
                    </Card>
                ) : isComplete ? (
                    /* Completion Screen */
                    <Card className="bg-gradient-to-br from-orange-500 via-sunset-500 to-amber-600 shadow-2xl rounded-[4rem] p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                        <div className="text-9xl animate-bounce">📏</div>
                        <h2 className="text-6xl font-fredoka drop-shadow-xl">Measuring Master!</h2>
                        <p className="text-2xl font-nunito max-w-2xl mx-auto leading-relaxed">
                            You know the secret! Always line things up at the bottom.
                            <br /><span className="text-yellow-200 font-bold">You are ready for more!</span>
                        </p>
                        <div className="flex flex-wrap gap-4 w-full pt-8 justify-center">
                            <Button onClick={() => { setCurrentStep(0); setIsComplete(false); speak("Let's try again!"); }} className="h-20 px-12 bg-white/10 hover:bg-white/20 text-white text-2xl font-fredoka rounded-[2rem] border-4 border-white/20">
                                Explore Again! 🔄
                            </Button>
                            <Button onClick={() => navigate("/activities/module-4")} className="h-20 px-12 bg-white text-orange-700 hover:bg-orange-50 text-2xl font-fredoka rounded-[2rem] shadow-2xl">
                                Finish! ✨
                            </Button>
                        </div>
                    </Card>
                ) : (
                    /* Main Activity */
                    <div className="space-y-8">
                        <div className="flex justify-center gap-2">
                            {[0, 1, 2].map((n) => (
                                <div key={n} className={`h-3 rounded-full transition-all duration-500 ${currentStep >= n ? 'bg-orange-500 w-12' : 'bg-orange-100 w-3'}`} />
                            ))}
                        </div>

                        <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-8 md:p-12 text-center space-y-8 min-h-[550px] flex flex-col items-center justify-between relative overflow-hidden">
                            {/* Ground Line */}
                            <div className="absolute bottom-24 left-10 right-10 h-2 bg-forest-900/10 rounded-full z-0" />
                            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-forest-900/20 px-4 py-1 rounded-full text-xs font-bold text-forest-900/40 uppercase tracking-widest z-0">
                                Floor
                            </div>

                            <div className="space-y-2 relative z-10 w-full">
                                <h3 className="text-3xl md:text-4xl font-fredoka text-forest-900">
                                    {currentStep === 0 && "Compare Susie and the Teacher!"}
                                    {currentStep === 1 && "Wait! Susie is on a chair! 🪑"}
                                    {currentStep === 2 && "Perfect! Both are on the floor! ✨"}
                                </h3>
                                <p className="text-forest-600 font-nunito text-lg md:text-xl max-w-md mx-auto">
                                    {currentStep === 0 && "They are both standing on the floor. Who is taller?"}
                                    {currentStep === 1 && "Is Susie really taller than the teacher now?"}
                                    {currentStep === 2 && "Now we can see who is taller! Tap the taller one!"}
                                </p>
                            </div>

                            <div className="flex items-end justify-center gap-12 md:gap-24 relative z-10 py-4 w-full">
                                {/* Susie */}
                                <div className={`flex flex-col items-center transition-all duration-700 ${currentStep === 1 ? '-translate-y-20' : ''}`}>
                                    <div
                                        onClick={() => {
                                            if (currentStep === 0 || currentStep === 2) {
                                                speak("Susie is shorter than the teacher!");
                                            } else {
                                                speak("Wait, Susie is on a chair! She's not really taller.");
                                            }
                                        }}
                                        className={`relative cursor-pointer group transition-all duration-500 ${currentStep === 1 ? 'scale-110' : ''}`}
                                    >
                                        <span className="text-7xl md:text-8xl block group-hover:scale-110 transition-transform">👧</span>
                                        {currentStep === 1 && (
                                            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-6xl animate-in zoom-in spin-in-12 duration-500">
                                                🪑
                                            </div>
                                        )}
                                    </div>
                                    <span className="mt-8 font-fredoka text-xl text-forest-700">Susie</span>
                                </div>

                                {/* Teacher */}
                                <div className="flex flex-col items-center">
                                    <div
                                        onClick={() => {
                                            if (currentStep === 0 || currentStep === 2) {
                                                speak("The teacher is taller than Susie!");
                                                handleStepCompletion();
                                            } else {
                                                speak("The teacher looks shorter, but Susie is cheating with a chair!");
                                                handleStepCompletion();
                                            }
                                        }}
                                        className="cursor-pointer group flex items-center justify-center"
                                    >
                                        <span className="text-9xl md:text-[10rem] block group-hover:scale-110 transition-transform">👩‍🏫</span>
                                    </div>
                                    <span className="mt-4 font-fredoka text-xl text-forest-700">Teacher</span>
                                </div>
                            </div>

                            <Button
                                onClick={handleStepCompletion}
                                className="bg-forest-600 hover:bg-forest-700 text-white py-6 px-10 rounded-2xl text-xl shadow-lg font-fredoka transition-all active:scale-95"
                            >
                                {currentStep === 0 && "Next Comparison →"}
                                {currentStep === 1 && "Fix the Trick! 🪄"}
                                {currentStep === 2 && "Finish Lesson! ✨"}
                            </Button>
                        </Card>

                        <Button onClick={() => setShowGame(false)} variant="ghost" className="text-forest-400 hover:text-forest-600 w-full py-4 text-lg font-bold font-nunito">
                            ← Instructions
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TallerShorter2;

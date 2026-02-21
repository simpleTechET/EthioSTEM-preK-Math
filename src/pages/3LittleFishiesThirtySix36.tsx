import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RefreshCw, Home, Waves, Fish, Star, Lightbulb } from "lucide-react";

const FISH_COLORS = [
    "text-blue-400 font-bold",
    "text-orange-400 font-bold",
    "text-pink-400 font-bold",
    "text-emerald-400 font-bold",
    "text-yellow-400 font-bold",
];

const LittleFishiesThirtySix36 = () => {
    const navigate = useNavigate();
    const [showGame, setShowGame] = useState(false);
    const [currentStep, setCurrentStep] = useState<'fingerCountdown' | 'sharkStory' | 'partnerPlay' | 'complete'>('fingerCountdown');

    // States
    const [fingersUp, setFingersUp] = useState(5);
    const [fishCount, setFishCount] = useState(5);
    const [isChomping, setIsChomping] = useState(false);
    const [partnerCount, setPartnerCount] = useState(5);
    const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);

    const markComplete = () => {
        const saved = localStorage.getItem("ethio-stem-m3-completed");
        const completed = saved ? JSON.parse(saved) : [];
        if (!completed.includes("3-fishies-36")) {
            completed.push("3-fishies-36");
            localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
        }
    };

    const handleFingerFold = () => {
        if (fingersUp > 1) {
            setFingersUp(fingersUp - 1);
        } else {
            setShowFeedback("correct");
        }
    };

    const handleChomp = () => {
        if (fishCount > 0 && !isChomping) {
            setIsChomping(true);
            setTimeout(() => {
                setFishCount(fishCount - 1);
                setIsChomping(false);
                if (fishCount === 1) {
                    setShowFeedback("correct");
                }
            }, 800);
        }
    };

    const handlePartnerChomp = () => {
        if (partnerCount > 1) {
            setPartnerCount(partnerCount - 1);
        } else {
            setShowFeedback("correct");
        }
    };

    const nextStep = () => {
        setShowFeedback(null);
        if (currentStep === 'fingerCountdown') setCurrentStep('sharkStory');
        else if (currentStep === 'sharkStory') setCurrentStep('partnerPlay');
        else if (currentStep === 'partnerPlay') {
            markComplete();
            setCurrentStep('complete');
        }
    };

    const resetActivity = () => {
        setCurrentStep('fingerCountdown');
        setFingersUp(5);
        setFishCount(5);
        setIsChomping(false);
        setPartnerCount(5);
        setShowFeedback(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 p-4 font-nunito overflow-x-hidden">
            <style>{`
        @keyframes swim {
          0%, 100% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(15px) translateY(-5px); }
        }
        .animate-swim { animation: swim 3s ease-in-out infinite; }
        
        @keyframes chomp {
          0% { transform: scale(1) rotate(0); }
          50% { transform: scale(1.5) rotate(-20deg); }
          100% { transform: scale(1) rotate(0); }
        }
        .animate-chomp { animation: chomp 0.5s ease-in-out forwards; }
        
        @keyframes bubble {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-100px) scale(1.5); opacity: 0; }
        }
        .bubble { position: absolute; background: white; border-radius: 50%; opacity: 0.3; animation: bubble 2s infinite; }
      `}</style>

            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=3-fishies-36")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full font-fredoka">
                                Lesson 36
                            </span>
                            <h1 className="text-2xl font-bold text-foreground font-fredoka uppercase tracking-wide">Fishy Countdown</h1>
                        </div>
                    </div>
                </div>

                {!showGame ? (
                    <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] overflow-hidden text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700 relative">
                        <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-cyan-500 to-blue-500 rounded-3xl flex items-center justify-center mb-6 -rotate-3 shadow-lg">
                            <Fish className="w-12 h-12 text-white" />
                        </div>
                        <h2 className="text-5xl font-fredoka text-blue-900 leading-tight">Five Little Fishies!</h2>
                        <p className="text-2xl text-blue-800 font-nunito leading-relaxed max-w-2xl mx-auto">
                            Jump in the water and count
                            <span className="font-fredoka text-4xl text-blue-600 drop-shadow-sm mx-2">5</span>
                            fishies. Watch out for Mr. Shark!
                        </p>
                        <Button
                            onClick={() => setShowGame(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl font-fredoka transition-all hover:scale-105 active:scale-95 border-b-8 border-blue-800"
                        >
                            Swim! 🐠
                        </Button>
                        <p className="text-sm text-blue-400 font-bold uppercase tracking-widest pt-4">Topic H: Final Countdown to 1</p>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        <div className="flex justify-center gap-3 mb-4">
                            {['fingerCountdown', 'sharkStory', 'partnerPlay'].map((step, idx) => (
                                <div
                                    key={step}
                                    className={`h-3 rounded-full transition-all ${['fingerCountdown', 'sharkStory', 'partnerPlay'].indexOf(currentStep) >= idx
                                        ? 'bg-blue-500 w-12 shadow-sm'
                                        : 'bg-blue-100 w-3'
                                        }`}
                                />
                            ))}
                        </div>

                        {currentStep === 'fingerCountdown' && (
                            <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-bottom-8">
                                <h3 className="text-4xl font-fredoka text-cyan-600">
                                    🖐️ 5 Finger Magic
                                </h3>
                                <div className="flex justify-center items-end gap-3 p-10 bg-cyan-50/50 rounded-[3rem] border-4 border-white shadow-inner max-w-xl mx-auto h-48">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div
                                            key={i}
                                            className={`w-14 rounded-t-full transition-all duration-300 border-2 ${i <= fingersUp ? 'bg-amber-200 border-amber-400 h-32' : 'bg-transparent border-transparent h-4'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <div className="text-center bg-cyan-50 p-8 rounded-[2.5rem] border-4 border-white shadow-inner max-w-lg mx-auto">
                                    <p className="text-3xl font-fredoka text-cyan-800 mb-8 leading-tight">
                                        <span className="text-7xl text-cyan-600 drop-shadow-sm">{fingersUp}</span> fingers up!
                                    </p>
                                    <Button onClick={handleFingerFold} disabled={fingersUp === 0 || showFeedback !== null} className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-12 text-4xl font-fredoka rounded-[2rem] shadow-xl border-b-8 border-cyan-700">
                                        FOLD 1! 🖐️
                                    </Button>
                                </div>
                            </Card>
                        )}

                        {currentStep === 'sharkStory' && (
                            <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-right-8 overflow-hidden relative">
                                <div className="bubble w-8 h-8 left-[10%] top-[70%]" />
                                <div className="bubble w-12 h-12 left-[80%] top-[40%]" />
                                <h3 className="text-4xl font-fredoka text-blue-600 relative z-10">
                                    🦈 Mr. Shark is Hungry!
                                </h3>
                                <div className="flex justify-between items-center w-full max-w-2xl mx-auto h-48 p-8 bg-blue-100/30 rounded-[3rem] border-4 border-white shadow-inner relative z-10">
                                    <div className="flex gap-4">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <div
                                                key={i}
                                                className={`text-6xl transition-all duration-700 ${i < fishCount ? 'animate-swim' : 'opacity-0 -translate-y-48 scale-0 font-bold'}`}
                                            >
                                                <Fish className={`${FISH_COLORS[i % 5]} w-12 h-12`} />
                                            </div>
                                        ))}
                                    </div>
                                    <div className={`text-9xl transition-all duration-500 ${isChomping ? 'animate-chomp' : 'hover:scale-110'}`}>
                                        🦈
                                    </div>
                                </div>
                                <div className="bg-blue-50 p-8 rounded-[3rem] border-4 border-white shadow-inner max-w-2xl mx-auto relative z-10">
                                    <p className="text-2xl font-fredoka text-blue-800 mb-8 italic">
                                        "{fishCount} little fishies teasing Mr. Shark... CHOMP!"
                                    </p>
                                    <Button onClick={handleChomp} disabled={fishCount === 0 || isChomping || showFeedback !== null} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-12 text-4xl font-fredoka rounded-[2rem] shadow-xl border-b-8 border-blue-700">
                                        CHOMP! 🦈💨
                                    </Button>
                                </div>
                            </Card>
                        )}

                        {currentStep === 'partnerPlay' && (
                            <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in zoom-in">
                                <h3 className="text-4xl font-fredoka text-indigo-600">
                                    🤝 Catch Them All!
                                </h3>
                                <div className="flex justify-center items-center gap-6 h-48 p-10 bg-indigo-50/50 rounded-[3rem] border-8 border-white shadow-inner">
                                    {Array.from({ length: partnerCount }).map((_, i) => (
                                        <div key={i} className="text-6xl animate-bounce drop-shadow-md">🐠</div>
                                    ))}
                                    {partnerCount === 0 && <p className="text-indigo-300 text-4xl font-fredoka uppercase">All Caught!</p>}
                                </div>
                                <div className="text-center bg-indigo-50 p-10 rounded-[2.5rem] border-4 border-white shadow-inner max-w-lg mx-auto">
                                    <p className="text-3xl font-fredoka text-indigo-800 mb-8">
                                        <span className="text-7xl text-indigo-600">{partnerCount}</span> fishies left!
                                    </p>
                                    <Button onClick={handlePartnerChomp} disabled={partnerCount === 0 || showFeedback !== null} className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-12 text-4xl font-fredoka rounded-[2rem] shadow-xl border-b-8 border-indigo-700">
                                        CATCH ONE! 🦈
                                    </Button>
                                </div>
                            </Card>
                        )}

                        {currentStep === 'complete' && (
                            <Card className="bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-600 shadow-2xl rounded-[4rem] overflow-hidden p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                                <div className="text-9xl animate-bounce">🌊</div>
                                <h2 className="text-7xl font-fredoka drop-shadow-xl">Ocean Hero!</h2>
                                <p className="text-3xl font-nunito max-w-2xl mx-auto leading-relaxed">
                                    You finished Module 3!
                                    <br />
                                    You can count from <span className="font-fredoka text-5xl text-yellow-300">5 all the way to 1</span>!
                                </p>
                                <div className="flex gap-4 w-full pt-8">
                                    <Button onClick={resetActivity} className="h-24 flex-1 bg-white/10 hover:bg-white/20 text-white text-3xl font-fredoka rounded-[2rem] border-4 border-white/20">
                                        Again! 🔄
                                    </Button>
                                    <Button onClick={() => navigate("/activities/module-3?last=3-fishies-36")} className="h-24 flex-1 bg-white text-blue-600 hover:bg-blue-50 text-3xl font-fredoka rounded-[2rem] shadow-2xl">
                                        Fin-tastic! 🐠
                                    </Button>
                                </div>
                            </Card>
                        )}

                        {showFeedback && (
                            <div className="fixed bottom-[33%] right-[25%] z-[100] animate-in slide-in-from-right-4 fade-in duration-300">
                                <Card className={`flex items-center gap-4 px-6 py-4 shadow-2xl rounded-2xl border-4 ${showFeedback === 'correct' ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'}`}>
                                    <span className="text-4xl">{showFeedback === 'correct' ? '🌟' : '🤔'}</span>
                                    <h4 className={`text-2xl font-fredoka ${showFeedback === 'correct' ? 'text-green-700' : 'text-red-700'}`}>
                                        {showFeedback === 'correct' ? 'Brilliant!' : 'Try Again!'}
                                    </h4>
                                    <Button onClick={showFeedback === 'correct' ? nextStep : () => setShowFeedback(null)} size="sm" className={`ml-2 rounded-xl text-lg px-4 py-2 ${showFeedback === 'correct' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}>
                                        {showFeedback === 'correct' ? 'Next! ➡️' : 'OK! 👍'}
                                    </Button>
                                </Card>
                            </div>
                        )}

                        {currentStep !== 'complete' && (
                            <Button onClick={() => setShowGame(false)} variant="ghost" className="text-blue-400 hover:text-blue-600 w-full py-2 font-bold font-nunito">
                                ← Back to Instructions
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LittleFishiesThirtySix36;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RefreshCw, Home, Star, ShoppingBasket, CheckCircle, Smile, Utensils, Heart } from "lucide-react";

const CountOutTenFortyOne41 = () => {
    const navigate = useNavigate();
    const [showGame, setShowGame] = useState(false);
    const [currentStep, setCurrentStep] = useState<'counting' | 'practice' | 'complete'>('counting');

    // States
    const [basket, setBasket] = useState<number[]>([]);
    const [servedBees, setServedBees] = useState<number[]>([]);
    const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);

    const markComplete = () => {
        const saved = localStorage.getItem("ethio-stem-m3-completed");
        const completed = saved ? JSON.parse(saved) : [];
        if (!completed.includes("3-count-out-41")) {
            completed.push("3-count-out-41");
            localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
        }
    };

    const handleAddItem = () => {
        if (basket.length < 10) {
            const next = [...basket, basket.length + 1];
            setBasket(next);
            if (next.length === 10) {
                setShowFeedback("correct");
            }
        }
    };

    const handleServeBee = (idx: number) => {
        if (!servedBees.includes(idx)) {
            const next = [...servedBees, idx];
            setServedBees(next);
            if (next.length === 10) {
                setShowFeedback("correct");
            }
        }
    };

    const nextStep = () => {
        setShowFeedback(null);
        if (currentStep === 'counting') setCurrentStep('practice');
        else if (currentStep === 'practice') {
            markComplete();
            setCurrentStep('complete');
        }
    };

    const resetActivity = () => {
        setShowGame(false);
        setCurrentStep('counting');
        setBasket([]);
        setServedBees([]);
        setShowFeedback(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-pink-50 to-purple-50 p-4 font-nunito overflow-x-hidden">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=3-count-out-41")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-pink-600 bg-pink-100 px-3 py-1 rounded-full font-fredoka">
                                Lesson 41
                            </span>
                            <h1 className="text-2xl font-bold text-foreground font-fredoka uppercase tracking-wide">Basket Master</h1>
                        </div>
                    </div>
                </div>

                {!showGame ? (
                    <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] overflow-hidden text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700 relative">
                        <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-pink-500 to-rose-500 rounded-3xl flex items-center justify-center mb-6 rotate-3 shadow-lg">
                            <ShoppingBasket className="w-12 h-12 text-white" />
                        </div>
                        <h2 className="text-5xl font-fredoka text-pink-900 leading-tight">The 10 Challenge!</h2>
                        <p className="text-2xl text-pink-800 font-nunito leading-relaxed max-w-2xl mx-auto">
                            Can you count out exactly
                            <span className="font-fredoka text-4xl text-pink-600 drop-shadow-sm mx-2">10</span>
                            apples? We must stop exactly at ten!
                        </p>
                        <Button
                            onClick={() => setShowGame(true)}
                            className="bg-pink-600 hover:bg-pink-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl font-fredoka transition-all hover:scale-105 active:scale-95 border-b-8 border-pink-800"
                        >
                            Play! 🍎
                        </Button>
                        <p className="text-sm text-pink-400 font-bold uppercase tracking-widest pt-4">Topic H: Cardinality to 10</p>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        <div className="flex justify-center gap-3 mb-4">
                            {['counting', 'practice'].map((step, idx) => (
                                <div
                                    key={step}
                                    className={`h-3 rounded-full transition-all ${['counting', 'practice'].indexOf(currentStep) >= idx
                                        ? 'bg-pink-500 w-12 shadow-sm'
                                        : 'bg-pink-100 w-3'
                                        }`}
                                />
                            ))}
                        </div>

                        {currentStep === 'counting' && (
                            <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-bottom-8">
                                <div className="space-y-4">
                                    <h3 className="text-4xl font-fredoka text-pink-700">Fill the Basket!</h3>
                                    <p className="text-2xl text-pink-600 font-nunito">Tap the button to add apples until you have 10!</p>
                                </div>
                                <div className="bg-pink-50/30 w-full max-w-2xl mx-auto rounded-[3rem] p-16 flex flex-wrap gap-4 items-center justify-center min-h-[300px] border-4 border-dashed border-pink-100 shadow-inner relative">
                                    {basket.length > 0 ? (
                                        basket.map((i) => (
                                            <div key={i} className="text-6xl animate-in zoom-in duration-300 transform hover:scale-110">🍎</div>
                                        ))
                                    ) : (
                                        <div className="text-pink-200 flex flex-col items-center gap-4">
                                            <ShoppingBasket className="w-24 h-24" />
                                            <p className="text-2xl font-fredoka uppercase tracking-widest">Empty Basket...</p>
                                        </div>
                                    )}
                                </div>
                                <div className="text-center bg-pink-50 p-8 rounded-[2.5rem] border-4 border-white shadow-inner max-w-md mx-auto">
                                    <p className="text-4xl font-fredoka text-pink-800">
                                        Count: <span className="text-6xl text-pink-600 drop-shadow-sm">{basket.length} / 10</span>
                                    </p>
                                    <Button onClick={handleAddItem} disabled={basket.length >= 10 || showFeedback !== null} className="w-full mt-8 bg-pink-600 hover:bg-pink-700 text-white py-12 text-4xl font-fredoka rounded-[2rem] shadow-xl border-b-8 border-pink-800 transition-all active:scale-95">
                                        ADD APPLE 🍎
                                    </Button>
                                </div>
                            </Card>
                        )}

                        {currentStep === 'practice' && (
                            <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-right-8">
                                <div className="space-y-4">
                                    <h3 className="text-4xl font-fredoka text-indigo-700">Café Time! 🐝</h3>
                                    <p className="text-2xl text-indigo-600 font-nunito">Serve exactly 10 friends. Tap each one!</p>
                                </div>
                                <div className="grid grid-cols-4 md:grid-cols-5 gap-4 py-8 max-w-2xl mx-auto">
                                    {Array.from({ length: 12 }).map((_, i) => {
                                        const isTarget = i < 10;
                                        const isServed = servedBees.includes(i);
                                        return (
                                            <button
                                                key={i}
                                                onClick={() => isTarget && handleServeBee(i)}
                                                disabled={!isTarget || isServed || showFeedback !== null}
                                                className={`h-24 rounded-[2rem] flex items-center justify-center text-5xl transition-all duration-300 ${!isTarget ? 'bg-gray-100 opacity-20 cursor-not-allowed border-none' : isServed ? 'bg-indigo-100 border-4 border-indigo-400 scale-90 opacity-40 shadow-inner' : 'bg-white border-4 border-indigo-100 shadow-xl hover:scale-110 active:scale-95'}`}
                                            >
                                                {isServed ? '🥪' : '🐝'}
                                            </button>
                                        );
                                    })}
                                </div>
                                <div className="bg-indigo-50 p-8 rounded-[2.5rem] border-4 border-white shadow-inner max-w-md mx-auto">
                                    <p className="text-4xl font-fredoka text-indigo-800">
                                        Served: <span className="text-6xl text-indigo-600 drop-shadow-sm">{servedBees.length} / 10</span>
                                    </p>
                                </div>
                            </Card>
                        )}

                        {currentStep === 'complete' && (
                            <Card className="bg-gradient-to-br from-indigo-600 via-pink-600 to-purple-600 shadow-2xl rounded-[4rem] overflow-hidden p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                                <div className="text-9xl animate-bounce">🍎</div>
                                <h2 className="text-7xl font-fredoka drop-shadow-xl">10 Specialist!</h2>
                                <p className="text-3xl font-nunito max-w-2xl mx-auto leading-relaxed">
                                    You can look at <span className="font-fredoka text-5xl text-yellow-300">10</span> and count out exactly that many!
                                    You're a counting superstar!
                                </p>
                                <div className="flex gap-4 w-full pt-8">
                                    <Button onClick={resetActivity} className="h-24 flex-1 bg-white/10 hover:bg-white/20 text-white text-3xl font-fredoka rounded-[2rem] border-4 border-white/20">
                                        Again! 🔄
                                    </Button>
                                    <Button onClick={() => navigate("/activities/module-3?last=3-count-out-41")} className="h-24 flex-1 bg-white text-pink-600 hover:bg-pink-50 text-3xl font-fredoka rounded-[2rem] shadow-2xl">
                                        Yay! ✨
                                    </Button>
                                </div>
                            </Card>
                        )}

                        {showFeedback && (
                            <div className="fixed bottom-[33%] right-[25%] z-[100] animate-in slide-in-from-right-4 fade-in duration-300">
                                <Card className={`flex items-center gap-4 px-6 py-4 shadow-2xl rounded-2xl border-4 ${showFeedback === 'correct' ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'}`}>
                                    <span className="text-4xl">{showFeedback === 'correct' ? '🌟' : '🧐'}</span>
                                    <h4 className={`text-2xl font-fredoka ${showFeedback === 'correct' ? 'text-green-700' : 'text-red-700'}`}>
                                        {showFeedback === 'correct' ? 'Sensational!' : 'Try Again!'}
                                    </h4>
                                    <Button onClick={showFeedback === 'correct' ? nextStep : () => setShowFeedback(null)} size="sm" className={`ml-2 rounded-xl text-lg px-4 py-2 ${showFeedback === 'correct' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}>
                                        {showFeedback === 'correct' ? 'Next! ➡️' : 'OK! 👍'}
                                    </Button>
                                </Card>
                            </div>
                        )}

                        {currentStep !== 'complete' && (
                            <Button onClick={() => setShowGame(false)} variant="ghost" className="text-pink-400 hover:text-pink-600 w-full py-2 font-bold font-nunito">
                                ← Back to Instructions
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CountOutTenFortyOne41;

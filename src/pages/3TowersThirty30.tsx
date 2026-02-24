import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RefreshCw, Home, TowerControl as Tower } from "lucide-react";

const TOWER_COLORS = [
    "bg-[hsl(200,90%,54%)]", // blue
    "bg-[hsl(280,70%,50%)]", // purple
    "bg-[hsl(142,76%,45%)]", // green
    "bg-[hsl(200,90%,54%)]", // blue
    "bg-[hsl(280,70%,50%)]", // purple
];

const TOWER_BORDERS = [
    "border-[hsl(200,90%,44%)]",
    "border-[hsl(280,70%,40%)]",
    "border-[hsl(142,76%,35%)]",
    "border-[hsl(200,90%,44%)]",
    "border-[hsl(280,70%,40%)]",
];

const TowersThirty30 = () => {
    const navigate = useNavigate();
    const [showGame, setShowGame] = useState(false);
    const [currentStep, setCurrentStep] = useState<'fingerTapping' | 'antsMarching' | 'towerBuilding' | 'practice' | 'complete'>('fingerTapping');

    // States
    const [tapCount, setTapCount] = useState(0);
    const [antVerse, setAntVerse] = useState(1);
    const [towerCubes, setTowerCubes] = useState(0);
    const [practiceStep, setPracticeStep] = useState(1);
    const [selectedNum, setSelectedNum] = useState<number | null>(null);
    const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);

    const markComplete = () => {
        const saved = localStorage.getItem("ethio-stem-m3-completed");
        const completed = saved ? JSON.parse(saved) : [];
        if (!completed.includes("lesson-30")) {
            completed.push("lesson-30");
            localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
        }
    };

    const handleTap = () => {
        if (tapCount < 5) {
            setTapCount(tapCount + 1);
            if (tapCount === 4) {
                setShowFeedback("correct");
            }
        }
    };

    const handleAntVerse = () => {
        if (antVerse < 5) {
            setAntVerse(antVerse + 1);
        } else {
            setShowFeedback("correct");
        }
    };

    const handleAddCube = () => {
        if (towerCubes < 5) {
            setTowerCubes(towerCubes + 1);
            if (towerCubes === 4) {
                setShowFeedback("correct");
            }
        }
    };

    const handlePracticeSelect = (num: number) => {
        setSelectedNum(num);
        if (num === practiceStep) {
            setShowFeedback("correct");
        } else {
            setShowFeedback("incorrect");
        }
    };

    const nextStep = () => {
        setShowFeedback(null);
        if (currentStep === 'fingerTapping') setCurrentStep('antsMarching');
        else if (currentStep === 'antsMarching') setCurrentStep('towerBuilding');
        else if (currentStep === 'towerBuilding') setCurrentStep('practice');
        else if (currentStep === 'practice') {
            if (practiceStep < 5) {
                setPracticeStep(practiceStep + 1);
                setSelectedNum(null);
            } else {
                markComplete();
                setCurrentStep('complete');
            }
        }
    };

    const resetActivity = () => {
        setCurrentStep('fingerTapping');
        setTapCount(0);
        setAntVerse(1);
        setTowerCubes(0);
        setPracticeStep(1);
        setSelectedNum(null);
        setShowFeedback(null);
    };

    const renderTower = (count: number, animated = true) => (
        <div className="flex flex-col-reverse items-center justify-center min-h-[250px] gap-1">
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className={`w-20 h-14 ${TOWER_COLORS[i % 5]} ${TOWER_BORDERS[i % 5]} border-4 rounded-xl shadow-md ${animated ? 'animate-bounce-in' : ''}`}
                    style={{ animationDelay: animated ? `${i * 0.1}s` : '0s' }}
                >
                    <div className="w-full h-full flex items-center justify-center opacity-30">
                        <div className="w-6 h-6 bg-white rounded-full" />
                    </div>
                </div>
            ))}
        </div>
    );

    useEffect(() => {

        if (showFeedback === 'correct') {

            const timer = setTimeout(() => { nextStep(); }, 1200);

            return () => clearTimeout(timer);

        }

    }, [showFeedback]);


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 font-nunito overflow-x-hidden">
            <style>{`
        @keyframes bounce-in {
          0% { transform: scale(0) translateY(20px); opacity: 0; }
          60% { transform: scale(1.1) translateY(-10px); }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        .animate-bounce-in { animation: bounce-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
      `}</style>

            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=lesson-30")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full font-fredoka">
                                Lesson 30
                            </span>
                            <h1 className="text-2xl font-bold text-foreground font-fredoka uppercase tracking-wide">Building Towers</h1>
                        </div>
                    </div>
                </div>

                {!showGame ? (
                    <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] overflow-hidden text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700 relative">
                        <div className="absolute top-4 right-4 text-4xl animate-pulse">✨</div>
                        <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-3xl flex items-center justify-center mb-6 rotate-3 shadow-lg">
                            <Tower className="w-12 h-12 text-white" />
                        </div>
                        <h2 className="text-5xl font-fredoka text-blue-900 leading-tight">Let's Build Towers!</h2>
                        <p className="text-2xl text-blue-800 font-nunito leading-relaxed max-w-2xl mx-auto">
                            We're going to use our fingers, sing a song, and build
                            <span className="font-fredoka text-4xl text-blue-600 drop-shadow-sm mx-2">TALL</span>
                            towers today!
                        </p>
                        <Button
                            onClick={() => setShowGame(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl font-fredoka transition-all hover:scale-105 active:scale-95"
                        >
                            Play! 🚀
                        </Button>
                        <p className="text-sm text-blue-400 font-bold uppercase tracking-widest pt-4">Topic G: 1 More</p>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        <div className="flex justify-center gap-3 mb-4">
                            {['fingerTapping', 'antsMarching', 'towerBuilding', 'practice'].map((step, idx) => (
                                <div
                                    key={step}
                                    className={`h-3 rounded-full transition-all ${['fingerTapping', 'antsMarching', 'towerBuilding', 'practice'].indexOf(currentStep) >= idx
                                        ? 'bg-blue-500 w-12 shadow-sm'
                                        : 'bg-blue-100 w-3'
                                        }`}
                                />
                            ))}
                        </div>

                        {currentStep === 'fingerTapping' && (
                            <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-bottom-8">
                                <h3 className="text-4xl font-fredoka text-blue-600 flex items-center justify-center gap-4">
                                    🖐️ Warm Up: Tap to <span className="text-6xl text-blue-700">5</span>
                                </h3>
                                <div className="flex justify-center gap-4">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div
                                            key={i}
                                            className={`w-20 h-20 rounded-[2rem] flex items-center justify-center text-4xl font-bold transition-all border-4 ${i <= tapCount ? 'bg-blue-500 text-white border-blue-600 shadow-lg scale-110' : 'bg-blue-50 text-blue-200 border-blue-100'
                                                }`}
                                        >
                                            {i}
                                        </div>
                                    ))}
                                </div>
                                <div className="text-center bg-blue-100/50 p-8 rounded-[2.5rem] border-4 border-white shadow-inner max-w-lg mx-auto">
                                    <p className="text-3xl font-fredoka text-blue-800 mb-8 leading-tight">
                                        {tapCount === 0 ? "Let's tap... 1!" :
                                            tapCount < 5 ? <span>Tap <span className="text-5xl text-blue-600">1</span> more... <span className="text-5xl text-blue-600">{tapCount + 1}</span>!</span> :
                                                "Great job! Everyone is awake!"}
                                    </p>
                                    <Button onClick={handleTap} disabled={tapCount >= 5 || showFeedback !== null} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-12 text-4xl font-fredoka rounded-[2rem] shadow-xl transform active:scale-95 transition-all outline-none border-b-8 border-blue-700">
                                        TAP! 🖐️
                                    </Button>
                                </div>
                            </Card>
                        )}

                        {currentStep === 'antsMarching' && (
                            <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-8 animate-in slide-in-from-right-8">
                                <h3 className="text-4xl font-fredoka text-teal-600 flex items-center justify-center gap-4">
                                    🐜 Singing Time!
                                </h3>
                                <div className="flex justify-center flex-wrap gap-4 h-32 items-end">
                                    {Array.from({ length: antVerse }).map((_, i) => (
                                        <div key={i} className="text-7xl animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}>🐜</div>
                                    ))}
                                </div>
                                <div className="bg-teal-50 p-10 rounded-[3rem] border-4 border-white shadow-inner max-w-2xl mx-auto">
                                    <p className="text-3xl font-fredoka text-teal-800 italic mb-8 leading-relaxed">
                                        "The ants go marching <span className="text-6xl text-teal-600">{antVerse}</span> by <span className="text-6xl text-teal-600">{antVerse}</span>, hurrah!"
                                    </p>
                                    <Button onClick={handleAntVerse} disabled={antVerse >= 5 || showFeedback !== null} className="w-full bg-teal-500 hover:bg-teal-600 text-white py-10 text-4xl font-fredoka rounded-[2rem] shadow-xl border-b-8 border-teal-700">
                                        1 More Ant! 🐜
                                    </Button>
                                </div>
                            </Card>
                        )}

                        {currentStep === 'towerBuilding' && (
                            <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-8 animate-in slide-in-from-left-8">
                                <h3 className="text-4xl font-fredoka text-purple-600 flex items-center justify-center gap-4">
                                    🏗️ Build a Big Tower!
                                </h3>
                                <div className="flex flex-col md:flex-row items-center justify-center gap-12 py-8">
                                    {renderTower(towerCubes)}

                                    <div className="flex flex-col gap-8 w-full max-w-sm">
                                        <div className="bg-purple-100/50 p-8 rounded-[3rem] border-4 border-white shadow-inner text-center">
                                            <div className="text-8xl font-fredoka text-purple-700 mb-2">{towerCubes}</div>
                                            <p className="text-2xl font-bold text-purple-800">Cubes!</p>
                                        </div>

                                        <p className="text-3xl font-fredoka text-purple-800">
                                            {towerCubes === 0 ? "Start with 1!" :
                                                towerCubes < 5 ? <span>Add <span className="text-5xl text-purple-600 mx-1">1</span> more...</span> :
                                                    "It's so tall!"}
                                        </p>

                                        <Button
                                            onClick={handleAddCube}
                                            disabled={towerCubes >= 5 || showFeedback !== null}
                                            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-12 text-4xl font-fredoka rounded-[2rem] shadow-xl transform hover:scale-105 border-b-8 border-purple-700"
                                        >
                                            + 1 More
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        )}

                        {currentStep === 'practice' && (
                            <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in zoom-in">
                                <h3 className="text-4xl font-fredoka text-indigo-600">
                                    Can you count them?
                                </h3>
                                <div className="flex flex-col items-center min-h-[300px] justify-center">
                                    {renderTower(practiceStep, false)}
                                </div>

                                <div className="grid grid-cols-5 gap-4 max-w-2xl mx-auto">
                                    {[1, 2, 3, 4, 5].map((num) => (
                                        <Button
                                            key={num}
                                            onClick={() => handlePracticeSelect(num)}
                                            className={`h-24 text-4xl font-fredoka rounded-[1.5rem] border-4 transition-all
                                                ${selectedNum === num
                                                    ? (num === practiceStep ? 'bg-green-500 border-green-600 text-white shadow-lg scale-110' : 'bg-red-500 border-red-600 text-white')
                                                    : 'bg-white border-indigo-100 text-indigo-600 hover:border-indigo-300'}`}
                                        >
                                            {num}
                                        </Button>
                                    ))}
                                </div>
                            </Card>
                        )}

                        {currentStep === 'complete' && (
                            <Card className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 shadow-2xl rounded-[4rem] overflow-hidden p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700 relative">
                                <div className="absolute top-10 left-10 text-6xl animate-pulse opacity-50">⭐</div>
                                <div className="absolute bottom-10 right-10 text-6xl animate-pulse opacity-50 transition-delay-500">⭐</div>
                                <div className="text-9xl animate-bounce">🏆</div>
                                <h2 className="text-7xl font-fredoka drop-shadow-xl">Tower Master!</h2>
                                <p className="text-3xl font-nunito max-w-2xl mx-auto leading-relaxed">
                                    You built a tower of 5 cubes by adding
                                    <span className="font-fredoka text-5xl text-yellow-300 mx-3">1 more</span>
                                    each time!
                                </p>
                                <div className="flex gap-4 w-full pt-8">
                                    <Button onClick={resetActivity} className="h-24 flex-1 bg-white/10 hover:bg-white/20 text-white text-3xl font-fredoka rounded-[2rem] border-4 border-white/20">
                                        Again! 🔄
                                    </Button>
                                    <Button onClick={() => navigate("/activities/module-3?last=lesson-30")} className="h-24 flex-1 bg-white text-indigo-600 hover:bg-indigo-50 text-3xl font-fredoka rounded-[2rem] shadow-2xl">
                                        Done! ✨
                                    </Button>
                                </div>
                            </Card>
                        )}

                        {showFeedback && (
                            <div className="fixed top-24 right-6 z-[100] animate-in slide-in-from-right-4 fade-in duration-300">
                                <Card className={`flex items-center gap-4 px-6 py-4 shadow-2xl rounded-2xl border-4 ${showFeedback === 'correct' ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'}`}>
                                    <span className="text-4xl">{showFeedback === 'correct' ? '🌟' : '🧐'}</span>
                                    <span className={`text-2xl font-fredoka font-bold ${showFeedback === 'correct' ? 'text-green-700' : 'text-red-700'}`}>
                                        {showFeedback === 'correct' ? 'Great!' : 'Try Again!'}
                                    </span>
                                    {showFeedback !== 'correct' && (
                                        <Button onClick={() => setShowFeedback(null)} className="ml-2 px-5 py-3 text-xl font-fredoka rounded-xl border-b-4 bg-red-500 hover:bg-red-600 border-red-700 text-white">
                                            OK 👍
                                        </Button>
                                    )}
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

export default TowersThirty30;

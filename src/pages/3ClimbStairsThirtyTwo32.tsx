import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RefreshCw, Home, Gift, Layout as StairIcon } from "lucide-react";

const STAIR_COLORS = [
    "bg-[hsl(200,90%,54%)]", // blue
    "bg-[hsl(4,90%,58%)]",   // red
    "bg-[hsl(45,93%,58%)]",  // yellow
    "bg-[hsl(142,76%,45%)]", // green
    "bg-[hsl(280,70%,50%)]", // purple
];

const ClimbStairsThirtyTwo32 = () => {
    const navigate = useNavigate();
    const [showGame, setShowGame] = useState(false);
    const [currentStep, setCurrentStep] = useState<'partyBox' | 'climbingDemo' | 'stickerStairs' | 'complete'>('partyBox');

    // States
    const [itemsInBox, setItemsInBox] = useState(0);
    const [currentClimb, setCurrentClimb] = useState(1);
    const [isClimbingUp, setIsClimbingUp] = useState(true);
    const [grid, setGrid] = useState<number[]>(new Array(5).fill(0));
    const [activeColumn, setActiveColumn] = useState(0);
    const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);

    const markComplete = () => {
        const saved = localStorage.getItem("ethio-stem-m3-completed");
        const completed = saved ? JSON.parse(saved) : [];
        if (!completed.includes("3-climb-32")) {
            completed.push("3-climb-32");
            localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
        }
    };

    const handleBoxAdd = () => {
        if (itemsInBox < 5) {
            setItemsInBox(itemsInBox + 1);
            if (itemsInBox === 4) {
                setShowFeedback("correct");
            }
        }
    };

    const handleClimb = () => {
        if (isClimbingUp) {
            if (currentClimb < 5) {
                setCurrentClimb(currentClimb + 1);
            } else {
                setIsClimbingUp(false);
                setShowFeedback("correct");
            }
        } else {
            if (currentClimb > 1) {
                setCurrentClimb(currentClimb - 1);
            } else {
                setShowFeedback("correct");
            }
        }
    };

    const addSticker = (colIdx: number) => {
        if (colIdx === activeColumn) {
            const newGrid = [...grid];
            if (newGrid[colIdx] < colIdx + 1) {
                newGrid[colIdx]++;
                setGrid(newGrid);

                if (newGrid[colIdx] === colIdx + 1) {
                    if (colIdx < 4) {
                        setActiveColumn(colIdx + 1);
                        setShowFeedback("correct");
                    } else {
                        setShowFeedback("correct");
                    }
                }
            }
        }
    };

    const nextStep = () => {
        setShowFeedback(null);
        if (currentStep === 'partyBox') setCurrentStep('climbingDemo');
        else if (currentStep === 'climbingDemo') {
            if (!isClimbingUp && currentClimb === 1) {
                setCurrentStep('stickerStairs');
            } else if (!isClimbingUp) {
                // Should not happen with logic above
                setCurrentStep('stickerStairs');
            }
        }
        else if (currentStep === 'stickerStairs') {
            if (activeColumn === 4 && grid[4] === 5) {
                markComplete();
                setCurrentStep('complete');
            }
        }
    };

    const resetActivity = () => {
        setCurrentStep('partyBox');
        setItemsInBox(0);
        setCurrentClimb(1);
        setIsClimbingUp(true);
        setGrid(new Array(5).fill(0));
        setActiveColumn(0);
        setShowFeedback(null);
    };

    useEffect(() => {

        if (showFeedback === 'correct') {

            const timer = setTimeout(() => { nextStep(); }, 1200);

            return () => clearTimeout(timer);

        }

    }, [showFeedback]);


    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-sky-50 p-4 font-nunito overflow-x-hidden">
            <style>{`
        @keyframes pop-in {
          0% { transform: scale(0); opacity: 0; }
          80% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop-in { animation: pop-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
      `}</style>

            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=3-climb-32")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full font-fredoka">
                                Lesson 32
                            </span>
                            <h1 className="text-2xl font-bold text-foreground font-fredoka uppercase tracking-wide">Climbing Stairs</h1>
                        </div>
                    </div>
                </div>

                {!showGame ? (
                    <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] overflow-hidden text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700 relative">
                        <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-3xl flex items-center justify-center mb-6 rotate-3 shadow-lg">
                            <StairIcon className="w-12 h-12 text-white" />
                        </div>
                        <h2 className="text-5xl font-fredoka text-blue-900 leading-tight">Up and Down!</h2>
                        <p className="text-2xl text-blue-800 font-nunito leading-relaxed max-w-2xl mx-auto">
                            Let's count as we climb
                            <span className="font-fredoka text-4xl text-blue-600 drop-shadow-sm mx-2">UP</span>
                            the stairs and then zoom back
                            <span className="font-fredoka text-4xl text-indigo-600 drop-shadow-sm mx-2">DOWN</span>!
                        </p>
                        <Button
                            onClick={() => setShowGame(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl font-fredoka transition-all hover:scale-105 active:scale-95 border-b-8 border-blue-800"
                        >
                            Play! 🪜
                        </Button>
                        <p className="text-sm text-blue-400 font-bold uppercase tracking-widest pt-4">Topic G: Up and Down to 5</p>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        <div className="flex justify-center gap-3 mb-4">
                            {['partyBox', 'climbingDemo', 'stickerStairs'].map((step, idx) => (
                                <div
                                    key={step}
                                    className={`h-3 rounded-full transition-all ${['partyBox', 'climbingDemo', 'stickerStairs'].indexOf(currentStep) >= idx
                                        ? 'bg-blue-500 w-12 shadow-sm'
                                        : 'bg-blue-100 w-3'
                                        }`}
                                />
                            ))}
                        </div>

                        {currentStep === 'partyBox' && (
                            <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-bottom-8">
                                <h3 className="text-4xl font-fredoka text-pink-600 flex items-center justify-center gap-4">
                                    🎁 Fill the Party Box!
                                </h3>
                                <div className="relative w-full max-w-md mx-auto aspect-video bg-amber-50 rounded-[3rem] border-8 border-white shadow-inner flex flex-wrap items-center justify-center p-8 gap-4">
                                    {Array.from({ length: itemsInBox }).map((_, i) => (
                                        <div key={i} className="text-6xl animate-pop-in drop-shadow-md">🎁</div>
                                    ))}
                                    {itemsInBox === 0 && <p className="text-amber-200 text-3xl font-fredoka uppercase tracking-widest">Empty Box</p>}
                                </div>
                                <div className="text-center bg-pink-50 p-8 rounded-[2.5rem] border-4 border-white shadow-inner max-w-lg mx-auto">
                                    <p className="text-3xl font-fredoka text-pink-800 mb-8 leading-tight">
                                        {itemsInBox === 0 ? "Put 1 item in!" : <span>The box has <span className="text-5xl text-pink-500">{itemsInBox}</span>! Add 1 more!</span>}
                                    </p>
                                    <Button onClick={handleBoxAdd} disabled={itemsInBox >= 5 || showFeedback !== null} className="w-full bg-pink-500 hover:bg-pink-600 text-white py-12 text-4xl font-fredoka rounded-[2rem] shadow-xl border-b-8 border-pink-700 transform active:scale-95">
                                        ADD 🎁
                                    </Button>
                                </div>
                            </Card>
                        )}

                        {currentStep === 'climbingDemo' && (
                            <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-8 animate-in slide-in-from-right-8">
                                <h3 className="text-4xl font-fredoka text-blue-600">
                                    Ladder Climb: {isClimbingUp ? "UP! 🚀" : "DOWN! 📉"}
                                </h3>
                                <div className="flex items-end justify-center gap-3 h-64 p-8 bg-blue-50/50 rounded-[3rem] border-4 border-white shadow-inner">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div key={i} className="flex flex-col items-center group">
                                            <div
                                                className={`w-16 rounded-2xl transition-all duration-500 relative flex items-center justify-center border-4 ${currentClimb === i ? 'bg-blue-500 border-blue-200 shadow-2xl ring-4 ring-blue-400/20' : 'bg-blue-100 border-white h-12'
                                                    }`}
                                                style={{ height: currentClimb === i ? `${i * 45}px` : `${i * 15}px` }}
                                            >
                                                {currentClimb === i && (
                                                    <span className="text-4xl animate-bounce absolute -top-12">🏃</span>
                                                )}
                                                <span className={`text-2xl font-fredoka ${currentClimb === i ? 'text-white' : 'text-blue-300'}`}>{i}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-blue-50 p-10 rounded-[3rem] border-4 border-white shadow-inner max-w-lg mx-auto">
                                    <p className="text-3xl font-fredoka text-blue-800 mb-8">
                                        {isClimbingUp ? "Climb up to 5!" : "Now climb back down!"}
                                    </p>
                                    <Button onClick={handleClimb} disabled={showFeedback !== null} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-12 text-4xl font-fredoka rounded-[2rem] shadow-xl border-b-8 border-blue-700">
                                        {isClimbingUp ? (currentClimb < 5 ? <span>Next: <span className="text-6xl mx-2">{currentClimb + 1}</span></span> : "Reach the top!") : (currentClimb > 1 ? <span>Down to: <span className="text-6xl mx-2">{currentClimb - 1}</span></span> : "Going Home!")}
                                    </Button>
                                </div>
                            </Card>
                        )}

                        {currentStep === 'stickerStairs' && (
                            <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in zoom-in">
                                <h3 className="text-4xl font-fredoka text-sky-600">
                                    ✨ My Sticker Stairs
                                </h3>
                                <div className="flex items-end justify-center gap-4 h-64 p-10 bg-slate-50 rounded-[3rem] border-8 border-white shadow-inner">
                                    {grid.map((count, colIdx) => (
                                        <div
                                            key={colIdx}
                                            className={`w-16 flex flex-col-reverse gap-2 items-center p-2 rounded-2xl transition-all duration-300 ${activeColumn === colIdx ? 'bg-sky-100 ring-4 ring-sky-200' : 'bg-white/50'
                                                }`}
                                        >
                                            {Array.from({ length: count }).map((_, i) => (
                                                <div key={i} className={`w-12 h-10 ${STAIR_COLORS[colIdx]} rounded-xl shadow-md border-2 border-white animate-pop-in`} />
                                            ))}
                                            {count === 0 && <div className="h-10 w-12 border-4 border-dashed border-sky-200 rounded-xl bg-white/50" />}
                                            <span className={`text-2xl font-fredoka mt-2 ${count === colIdx + 1 ? 'text-sky-600' : 'text-sky-200'}`}>
                                                {colIdx + 1}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className="text-center bg-sky-50 p-8 rounded-[2.5rem] border-4 border-white shadow-inner max-w-lg mx-auto">
                                    <p className="text-3xl font-fredoka text-sky-800 mb-8">
                                        Add <span className="text-5xl text-sky-500">{activeColumn + 1}</span> stickers here!
                                    </p>
                                    <Button onClick={() => addSticker(activeColumn)} disabled={showFeedback !== null} className="w-full bg-sky-500 hover:bg-sky-600 text-white py-12 text-4xl font-fredoka rounded-[2rem] shadow-xl border-b-8 border-sky-700">
                                        STICK IT! ⭐
                                    </Button>
                                </div>
                            </Card>
                        )}

                        {currentStep === 'complete' && (
                            <Card className="bg-gradient-to-br from-indigo-600 via-blue-600 to-sky-600 shadow-2xl rounded-[4rem] overflow-hidden p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                                <div className="text-9xl animate-bounce">🎖️</div>
                                <h2 className="text-7xl font-fredoka drop-shadow-xl">Climbing Champ!</h2>
                                <p className="text-3xl font-nunito max-w-2xl mx-auto leading-relaxed">
                                    You climbed all the way to
                                    <span className="font-fredoka text-5xl text-yellow-300 mx-3">5</span>
                                    and back down to
                                    <span className="font-fredoka text-5xl text-yellow-300 mx-3">1</span>!
                                </p>
                                <div className="flex gap-4 w-full pt-8">
                                    <Button onClick={resetActivity} className="h-24 flex-1 bg-white/10 hover:bg-white/20 text-white text-3xl font-fredoka rounded-[2rem] border-4 border-white/20">
                                        Again! 🔄
                                    </Button>
                                    <Button onClick={() => navigate("/activities/module-3?last=3-climb-32")} className="h-24 flex-1 bg-white text-blue-600 hover:bg-blue-50 text-3xl font-fredoka rounded-[2rem] shadow-2xl">
                                        Victory! ✨
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

export default ClimbStairsThirtyTwo32;

import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RefreshCw, Home, TreeDeciduous, Coins, Layout as StairIcon } from "lucide-react";

const STAIR_COLORS = [
    "bg-[hsl(4,90%,58%)]",   // 1 - red
    "bg-[hsl(142,76%,45%)]", // 2 - green
    "bg-[hsl(200,90%,54%)]", // 3 - blue
    "bg-[hsl(45,93%,58%)]",  // 4 - yellow
    "bg-[hsl(280,70%,50%)]", // 5 - purple
];

const PennyStaircaseThirtyFour34 = () => {
    const navigate = useNavigate();
    const [showGame, setShowGame] = useState(false);
    const [currentStep, setCurrentStep] = useState<'appleTree' | 'pennyMat' | 'stickerPage' | 'complete'>('appleTree');

    // States
    const [applesOnTree, setApplesOnTree] = useState(5);
    const [penniesPlaced, setPenniesPlaced] = useState<number[]>([]);
    const [targetPennies, setTargetPennies] = useState(5);
    const [grid, setGrid] = useState<number[]>(new Array(5).fill(0));
    const [activeCol, setActiveCol] = useState(0);
    const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);

    const markComplete = () => {
        const saved = localStorage.getItem("ethio-stem-m3-completed");
        const completed = saved ? JSON.parse(saved) : [];
        if (!completed.includes("3-penny-34")) {
            completed.push("3-penny-34");
            localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
        }
    };

    const handleAppleFall = () => {
        if (applesOnTree > 0) {
            setApplesOnTree(applesOnTree - 1);
            if (applesOnTree === 1) {
                setShowFeedback("correct");
            }
        }
    };

    const placePenny = () => {
        if (targetPennies >= 1) {
            setPenniesPlaced([...penniesPlaced, targetPennies]);
            if (targetPennies === 1) {
                setShowFeedback("correct");
            } else {
                setTargetPennies(targetPennies - 1);
            }
        }
    };

    const addSheetSticker = (colIdx: number) => {
        if (colIdx === activeCol) {
            const newGrid = [...grid];
            const targetCount = 5 - colIdx; // Descending: 5, 4, 3, 2, 1
            if (newGrid[colIdx] < targetCount) {
                newGrid[colIdx]++;
                setGrid(newGrid);

                if (newGrid[colIdx] === targetCount) {
                    if (colIdx < 4) {
                        setActiveCol(colIdx + 1);
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
        if (currentStep === 'appleTree') setCurrentStep('pennyMat');
        else if (currentStep === 'pennyMat') setCurrentStep('stickerPage');
        else if (currentStep === 'stickerPage') {
            markComplete();
            setCurrentStep('complete');
        }
    };

    const resetActivity = () => {
        setCurrentStep('appleTree');
        setApplesOnTree(5);
        setPenniesPlaced([]);
        setTargetPennies(5);
        setGrid(new Array(5).fill(0));
        setActiveCol(0);
        setShowFeedback(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 p-4 font-nunito overflow-x-hidden">
            <style>{`
        @keyframes fall {
          0% { transform: translateY(-50px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-fall { animation: fall 0.5s ease-in forwards; }
      `}</style>

            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=3-penny-34")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-amber-600 bg-amber-100 px-3 py-1 rounded-full font-fredoka">
                                Lesson 34
                            </span>
                            <h1 className="text-2xl font-bold text-foreground font-fredoka uppercase tracking-wide">Penny Stairs</h1>
                        </div>
                    </div>
                </div>

                {!showGame ? (
                    <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] overflow-hidden text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700 relative">
                        <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-orange-500 to-amber-500 rounded-3xl flex items-center justify-center mb-6 -rotate-3 shadow-lg">
                            <Coins className="w-12 h-12 text-white" />
                        </div>
                        <h2 className="text-5xl font-fredoka text-amber-900 leading-tight">Shake and Count!</h2>
                        <p className="text-2xl text-amber-800 font-nunito leading-relaxed max-w-2xl mx-auto">
                            Let's watch apples fall and build stairs with
                            <span className="font-fredoka text-4xl text-amber-600 drop-shadow-sm mx-2">SHINY</span>
                            pennies!
                        </p>
                        <Button
                            onClick={() => setShowGame(true)}
                            className="bg-amber-600 hover:bg-amber-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl font-fredoka transition-all hover:scale-105 active:scale-95 border-b-8 border-amber-800"
                        >
                            Play! 🪙
                        </Button>
                        <p className="text-sm text-amber-400 font-bold uppercase tracking-widest pt-4">Topic H: Counting Down from 5</p>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        <div className="flex justify-center gap-3 mb-4">
                            {['appleTree', 'pennyMat', 'stickerPage'].map((step, idx) => (
                                <div
                                    key={step}
                                    className={`h-3 rounded-full transition-all ${['appleTree', 'pennyMat', 'stickerPage'].indexOf(currentStep) >= idx
                                        ? 'bg-amber-500 w-12 shadow-sm'
                                        : 'bg-amber-100 w-3'
                                        }`}
                                />
                            ))}
                        </div>

                        {currentStep === 'appleTree' && (
                            <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-bottom-8">
                                <h3 className="text-4xl font-fredoka text-red-600">
                                    🍎 5 Apples on the Tree
                                </h3>
                                <div className="relative w-full max-w-md mx-auto aspect-video bg-emerald-50 rounded-[3rem] border-8 border-white shadow-inner flex items-center justify-center overflow-hidden">
                                    <TreeDeciduous className="w-64 h-64 text-emerald-100 absolute" />
                                    <div className="grid grid-cols-3 gap-8 relative z-10 p-8">
                                        {[...Array(5)].map((_, i) => (
                                            <div
                                                key={i}
                                                className={`text-7xl cursor-pointer transition-all duration-500 ${i < applesOnTree ? 'scale-100 hover:scale-110 drop-shadow-lg' : 'translate-y-96 opacity-0'
                                                    }`}
                                                onClick={handleAppleFall}
                                            >
                                                🍎
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="text-center bg-red-50 p-8 rounded-[2.5rem] border-4 border-white shadow-inner max-w-lg mx-auto">
                                    <p className="text-3xl font-fredoka text-red-800 mb-8 leading-tight">
                                        {applesOnTree === 5 ? "Tap an apple to fall!" : <span>Now we have <span className="text-5xl text-red-600">{applesOnTree}</span> apples! Shake again!</span>}
                                    </p>
                                    <Button onClick={handleAppleFall} disabled={applesOnTree === 0 || showFeedback !== null} className="w-full bg-red-500 hover:bg-red-600 text-white py-12 text-4xl font-fredoka rounded-[2rem] shadow-xl border-b-8 border-red-700">
                                        SHAKE! 🌳
                                    </Button>
                                </div>
                            </Card>
                        )}

                        {currentStep === 'pennyMat' && (
                            <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-right-8">
                                <h3 className="text-4xl font-fredoka text-amber-600">
                                    🪙 Penny Mat Stairs
                                </h3>
                                <div className="flex items-end justify-center gap-4 h-64 p-10 bg-amber-50 rounded-[3rem] border-8 border-white shadow-inner">
                                    {penniesPlaced.map((count, idx) => (
                                        <div key={idx} className="flex flex-col-reverse gap-2 items-center">
                                            {Array.from({ length: count }).map((_, i) => (
                                                <div key={i} className="w-14 h-14 bg-amber-500 rounded-full border-4 border-amber-200 flex items-center justify-center shadow-md animate-fall">
                                                    <Coins className="w-8 h-8 text-amber-100" />
                                                </div>
                                            ))}
                                            <span className="text-2xl font-fredoka text-amber-300">{count}</span>
                                        </div>
                                    ))}
                                    {targetPennies >= 1 && (
                                        <div className="w-16 h-48 border-4 border-dashed border-amber-200 rounded-3xl flex items-center justify-center bg-white/50 opacity-50">
                                            <span className="text-4xl font-fredoka text-amber-300 animate-pulse">{targetPennies}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="bg-amber-50 p-10 rounded-[3rem] border-4 border-white shadow-inner max-w-lg mx-auto">
                                    <p className="text-3xl font-fredoka text-amber-800 mb-8">
                                        Let's place <span className="text-6xl text-amber-600">{targetPennies}</span> pennies!
                                    </p>
                                    <Button onClick={placePenny} disabled={targetPennies < 1 || showFeedback !== null} className="w-full bg-amber-500 hover:bg-amber-600 text-white py-12 text-4xl font-fredoka rounded-[2rem] shadow-xl border-b-8 border-amber-700">
                                        PLACE! 🪙
                                    </Button>
                                </div>
                            </Card>
                        )}

                        {currentStep === 'stickerPage' && (
                            <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in zoom-in">
                                <h3 className="text-4xl font-fredoka text-orange-600">
                                    ✨ Rainbow Sticker Page
                                </h3>
                                <div className="flex items-end justify-center gap-3 h-64 p-10 bg-slate-50 rounded-[3rem] border-8 border-white shadow-inner">
                                    {grid.map((count, colIdx) => {
                                        const targetCount = 5 - colIdx;
                                        return (
                                            <div
                                                key={colIdx}
                                                className={`w-16 flex flex-col-reverse gap-2 items-center p-2 rounded-2xl transition-all ${activeCol === colIdx ? 'bg-orange-100 ring-4 ring-orange-200' : 'bg-white'
                                                    }`}
                                            >
                                                {Array.from({ length: count }).map((_, i) => (
                                                    <div key={i} className={`w-12 h-10 ${STAIR_COLORS[4 - colIdx]} rounded-xl border-2 border-white shadow-md animate-fall`} />
                                                ))}
                                                {count < targetCount && <div className="h-10 w-12 border-4 border-dashed border-orange-100 rounded-xl bg-orange-50/20" />}
                                                <span className={`text-2xl font-fredoka ${count === targetCount ? 'text-orange-600' : 'text-slate-200'}`}>{targetCount}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="text-center bg-orange-50 p-8 rounded-[2.5rem] border-4 border-white shadow-inner max-w-lg mx-auto">
                                    <p className="text-3xl font-fredoka text-orange-800 mb-8 leading-tight">
                                        Fill the column of <span className="text-5xl text-orange-500">{5 - activeCol}</span>!
                                    </p>
                                    <Button onClick={() => addSheetSticker(activeCol)} disabled={showFeedback !== null} className="w-full bg-orange-500 hover:bg-orange-600 text-white py-12 text-4xl font-fredoka rounded-[2rem] shadow-xl border-b-8 border-orange-700">
                                        STICK! ✨
                                    </Button>
                                </div>
                            </Card>
                        )}

                        {currentStep === 'complete' && (
                            <Card className="bg-gradient-to-br from-red-600 via-orange-600 to-amber-600 shadow-2xl rounded-[4rem] overflow-hidden p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                                <div className="text-9xl animate-bounce">🥇</div>
                                <h2 className="text-7xl font-fredoka drop-shadow-xl">Penny Master!</h2>
                                <p className="text-3xl font-nunito max-w-2xl mx-auto leading-relaxed">
                                    You can count from <span className="font-fredoka text-5xl text-yellow-300">5 down to 1</span>!
                                    That's amazing!
                                </p>
                                <div className="flex gap-4 w-full pt-8">
                                    <Button onClick={resetActivity} className="h-24 flex-1 bg-white/10 hover:bg-white/20 text-white text-3xl font-fredoka rounded-[2rem] border-4 border-white/20">
                                        Restart 🔄
                                    </Button>
                                    <Button onClick={() => navigate("/activities/module-3?last=3-penny-34")} className="h-24 flex-1 bg-white text-orange-600 hover:bg-orange-50 text-3xl font-fredoka rounded-[2rem] shadow-2xl">
                                        Yay! ✨
                                    </Button>
                                </div>
                            </Card>
                        )}

                        {showFeedback && (
                            <div className="fixed bottom-6 right-6 z-[100] animate-in slide-in-from-right-4 fade-in duration-300">
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
                            <Button onClick={() => setShowGame(false)} variant="ghost" className="text-orange-400 hover:text-orange-600 w-full py-2 font-bold font-nunito">
                                ← Back to Instructions
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PennyStaircaseThirtyFour34;

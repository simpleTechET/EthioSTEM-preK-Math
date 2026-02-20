import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RefreshCw, Home, Package, Layers, Sparkles, Smile, Star, Lightbulb } from "lucide-react";

const TOWER_COLORS = [
    "bg-blue-500",
    "bg-indigo-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-teal-500",
];

const CulminatingThirtySeven37 = () => {
    const navigate = useNavigate();
    const [showGame, setShowGame] = useState(false);
    const [currentStep, setCurrentStep] = useState<'mysteryBag' | 'sorting' | 'counting' | 'towerBuilding' | 'oneMore' | 'complete'>('mysteryBag');

    // States
    const [isBagOpen, setIsBagOpen] = useState(false);
    const [mysteryItems, setMysteryItems] = useState([
        { id: 1, icon: "🖍️", group: "art", sorted: false },
        { id: 2, icon: "🍴", group: "eating", sorted: false },
        { id: 3, icon: "🖌️", group: "art", sorted: false },
        { id: 4, icon: "🥄", group: "eating", sorted: false },
        { id: 5, icon: "🎨", group: "art", sorted: false },
        { id: 6, icon: "🍽️", group: "eating", sorted: false },
        { id: 7, icon: "✏️", group: "art", sorted: false },
    ]);
    const [selectedGroup, setSelectedGroup] = useState<'art' | 'eating' | null>(null);
    const [towerHeight, setTowerHeight] = useState(0);
    const [oneMoreStep, setOneMoreStep] = useState<'build' | 'identify'>('build');
    const [oneMoreTowers, setOneMoreTowers] = useState(0);
    const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);

    const markComplete = () => {
        const saved = localStorage.getItem("ethio-stem-m3-completed");
        const completed = saved ? JSON.parse(saved) : [];
        if (!completed.includes("3-culminating-37")) {
            completed.push("3-culminating-37");
            localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
        }
    };

    const handleOpenBag = () => {
        setIsBagOpen(true);
        setShowFeedback("correct");
    };

    const handleSort = (id: number) => {
        setMysteryItems(prev => prev.map(item => item.id === id ? { ...item, sorted: true } : item));
        const remaining = mysteryItems.filter(i => !i.sorted).length;
        if (remaining === 1) {
            setShowFeedback("correct");
        }
    };

    const handleCountSelect = (num: number) => {
        const actualCount = selectedGroup === 'art' ? 4 : 3;
        if (num === actualCount) {
            setShowFeedback("correct");
        } else {
            setShowFeedback("incorrect");
        }
    };

    const handleAddCube = () => {
        const target = selectedGroup === 'art' ? 4 : 3;
        if (towerHeight < target) {
            setTowerHeight(towerHeight + 1);
            if (towerHeight + 1 === target) {
                setShowFeedback("correct");
            }
        }
    };

    const handleOneMoreBuild = () => {
        const target = towerHeight + 1;
        if (oneMoreTowers < target) {
            setOneMoreTowers(oneMoreTowers + 1);
            if (oneMoreTowers + 1 === target) {
                setOneMoreStep('identify');
            }
        }
    };

    const handleNumSelect = (num: number) => {
        if (num === towerHeight + 1) {
            setShowFeedback("correct");
        } else {
            setShowFeedback("incorrect");
        }
    };

    const nextStep = () => {
        setShowFeedback(null);
        if (currentStep === 'mysteryBag') setCurrentStep('sorting');
        else if (currentStep === 'sorting') setCurrentStep('counting');
        else if (currentStep === 'counting') setCurrentStep('towerBuilding');
        else if (currentStep === 'towerBuilding') setCurrentStep('oneMore');
        else if (currentStep === 'oneMore') {
            markComplete();
            setCurrentStep('complete');
        }
    };

    const resetActivity = () => {
        setCurrentStep('mysteryBag');
        setIsBagOpen(false);
        setMysteryItems(prev => prev.map(item => ({ ...item, sorted: false })));
        setSelectedGroup(null);
        setTowerHeight(0);
        setOneMoreStep('build');
        setOneMoreTowers(0);
        setShowFeedback(null);
    };

    const renderTower = (count: number, colorIdxOffset = 0) => (
        <div className="flex flex-col-reverse items-center justify-center min-h-[220px] gap-1">
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className={`w-16 h-12 ${TOWER_COLORS[(i + colorIdxOffset) % 5]} border-4 border-white/20 rounded-xl shadow-md animate-bounce-in`}
                    style={{ animationDelay: `${i * 0.1}s` }}
                >
                    <div className="w-full h-full flex items-center justify-center opacity-30">
                        <div className="w-4 h-4 bg-white rounded-full" />
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-teal-50 p-4 font-nunito overflow-x-hidden">
            <style>{`
                @keyframes bounce-in {
                    0% { transform: scale(0) translateY(20px); opacity: 0; }
                    60% { transform: scale(1.1) translateY(-10px); }
                    100% { transform: scale(1) translateY(0); opacity: 1; }
                }
                .animate-bounce-in { animation: bounce-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
                
                @keyframes float {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-20px); }
                }
                .animate-float { animation: float 3s ease-in-out infinite; }
            `}</style>

            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=3-culminating-37")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full font-fredoka">
                                Lesson 37
                            </span>
                            <h1 className="text-2xl font-bold text-foreground font-fredoka uppercase tracking-wide">Mystery Mission</h1>
                        </div>
                    </div>
                </div>

                {!showGame ? (
                    <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] overflow-hidden text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700 relative">
                        <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-3xl flex items-center justify-center mb-6 rotate-3 shadow-lg">
                            <Package className="w-12 h-12 text-white" />
                        </div>
                        <h2 className="text-5xl font-fredoka text-indigo-900 leading-tight">The Big Mystery Bag!</h2>
                        <p className="text-2xl text-indigo-800 font-nunito leading-relaxed max-w-2xl mx-auto">
                            We're going to use all our math powers to sort, count, and build! There are
                            <span className="font-fredoka text-4xl text-indigo-600 drop-shadow-sm mx-2">7</span>
                            surprises waiting for you!
                        </p>
                        <Button
                            onClick={() => setShowGame(true)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl font-fredoka transition-all hover:scale-105 active:scale-95 border-b-8 border-indigo-800"
                        >
                            Start Mission! 🎒
                        </Button>
                        <p className="text-sm text-indigo-400 font-bold uppercase tracking-widest pt-4">Module 3 Finale</p>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        <div className="flex justify-center gap-3 mb-4">
                            {['mysteryBag', 'sorting', 'counting', 'towerBuilding', 'oneMore'].map((step, idx) => (
                                <div
                                    key={step}
                                    className={`h-3 rounded-full transition-all ${['mysteryBag', 'sorting', 'counting', 'towerBuilding', 'oneMore'].indexOf(currentStep) >= idx
                                        ? 'bg-indigo-500 w-12 shadow-sm'
                                        : 'bg-indigo-100 w-3'
                                        }`}
                                />
                            ))}
                        </div>

                        {currentStep === 'mysteryBag' && (
                            <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-bottom-8">
                                <h3 className="text-4xl font-fredoka text-indigo-600">
                                    🎒 What's in the bag?
                                </h3>
                                <div className="relative py-12 flex justify-center">
                                    {!isBagOpen ? (
                                        <button onClick={handleOpenBag} className="group relative transition-transform hover:scale-110 active:scale-95">
                                            <div className="absolute -inset-8 bg-indigo-500/20 rounded-full blur-2xl group-hover:bg-indigo-500/30 transition-all animate-pulse" />
                                            <Package className="w-48 h-48 text-indigo-500 relative animate-float transition-all" />
                                            <div className="absolute -top-4 -right-4 bg-yellow-400 rounded-full p-4 shadow-xl border-4 border-white animate-bounce">
                                                <Sparkles className="w-10 h-10 text-white" />
                                            </div>
                                        </button>
                                    ) : (
                                        <div className="flex flex-wrap justify-center gap-6 animate-in zoom-in-50 duration-700 max-w-2xl">
                                            {mysteryItems.map((item) => (
                                                <div key={item.id} className="w-24 h-24 bg-white border-4 border-indigo-100 rounded-[2rem] flex items-center justify-center text-6xl shadow-xl rotate-3 hover:rotate-0 transition-all">
                                                    {item.icon}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                {isBagOpen && (
                                    <div className="bg-indigo-50 p-8 rounded-[2.5rem] border-4 border-white shadow-inner max-w-lg mx-auto">
                                        <p className="text-3xl font-fredoka text-indigo-800 mb-8 leading-tight">
                                            You found <span className="text-5xl text-indigo-600">7</span> objects!
                                        </p>
                                        <Button onClick={nextStep} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-12 text-4xl font-fredoka rounded-[2rem] shadow-xl border-b-8 border-indigo-800">
                                            SORT THEM! ➡️
                                        </Button>
                                    </div>
                                )}
                            </Card>
                        )}

                        {currentStep === 'sorting' && (
                            <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-right-8">
                                <h3 className="text-4xl font-fredoka text-indigo-600">
                                    📂 Let's Sort Group 1 and 2
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div className="flex flex-wrap gap-4 justify-center p-8 bg-indigo-50/50 rounded-[3rem] border-4 border-white shadow-inner min-h-[150px]">
                                            {mysteryItems.filter(i => !i.sorted).map(item => (
                                                <button
                                                    key={item.id}
                                                    onClick={() => handleSort(item.id)}
                                                    className="w-24 h-24 bg-white border-4 border-indigo-100 rounded-[2rem] flex items-center justify-center text-5xl shadow-xl hover:scale-110 active:scale-95 transition-all animate-bounce-in"
                                                >
                                                    {item.icon}
                                                </button>
                                            ))}
                                            {mysteryItems.filter(i => !i.sorted).length === 0 && (
                                                <div className="flex flex-col items-center justify-center text-indigo-300">
                                                    <Smile className="w-16 h-16 mb-4" />
                                                    <p className="text-2xl font-fredoka uppercase">Perfect!</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="p-8 rounded-[3rem] border-4 border-purple-200 bg-purple-50 shadow-md min-h-[180px]">
                                            <h4 className="text-2xl font-bold text-purple-700 font-fredoka mb-4">Art Supplies</h4>
                                            <div className="flex flex-wrap gap-4 justify-center">
                                                {mysteryItems.filter(i => i.sorted && i.group === 'art').map(item => (
                                                    <div key={item.id} className="text-5xl p-2 bg-white rounded-2xl shadow-sm border-2 border-purple-100 animate-bounce-in">
                                                        {item.icon}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="p-8 rounded-[3rem] border-4 border-teal-200 bg-teal-50 shadow-md min-h-[180px]">
                                            <h4 className="text-2xl font-bold text-teal-700 font-fredoka mb-4">Eating Tools</h4>
                                            <div className="flex flex-wrap gap-4 justify-center">
                                                {mysteryItems.filter(i => i.sorted && i.group === 'eating').map(item => (
                                                    <div key={item.id} className="text-5xl p-2 bg-white rounded-2xl shadow-sm border-2 border-teal-100 animate-bounce-in">
                                                        {item.icon}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        )}

                        {currentStep === 'counting' && (
                            <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in zoom-in">
                                <h3 className="text-4xl font-fredoka text-indigo-600">
                                    🔢 How many in each group?
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                                    <button onClick={() => setSelectedGroup('art')} className={`p-10 rounded-[3rem] border-8 transition-all ${selectedGroup === 'art' ? 'border-purple-500 bg-purple-100 scale-105 shadow-2xl' : 'border-purple-200 bg-purple-50'}`}>
                                        <div className="text-8xl mb-4">🎨</div>
                                        <p className="text-3xl font-fredoka text-purple-700">Art Supplies</p>
                                    </button>
                                    <button onClick={() => setSelectedGroup('eating')} className={`p-10 rounded-[3rem] border-8 transition-all ${selectedGroup === 'eating' ? 'border-teal-500 bg-teal-100 scale-105 shadow-2xl' : 'border-teal-200 bg-teal-50'}`}>
                                        <div className="text-8xl mb-4">🍴</div>
                                        <p className="text-3xl font-fredoka text-teal-700">Eating Tools</p>
                                    </button>
                                </div>
                                {selectedGroup && (
                                    <div className="pt-10 space-y-8 animate-in slide-in-from-bottom-8">
                                        <div className="flex justify-center gap-6 p-8 bg-indigo-50 rounded-[3rem] border-4 border-white shadow-inner">
                                            {mysteryItems.filter(i => i.group === selectedGroup).map((item, idx) => (
                                                <div key={item.id} className="text-7xl animate-bounce" style={{ animationDelay: `${idx * 0.1}s` }}>{item.icon}</div>
                                            ))}
                                        </div>
                                        <p className="text-4xl font-fredoka text-indigo-800">Choose the number!</p>
                                        <div className="flex justify-center gap-4 flex-wrap">
                                            {[1, 2, 3, 4, 5].map(num => (
                                                <Button key={num} onClick={() => handleCountSelect(num)} className="w-24 h-24 text-4xl font-fredoka rounded-[2rem] bg-white text-indigo-600 border-4 border-indigo-200 hover:bg-indigo-50 shadow-lg">
                                                    {num}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </Card>
                        )}

                        {currentStep === 'towerBuilding' && (
                            <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in slide-in-from-left-8">
                                <h3 className="text-4xl font-fredoka text-indigo-600">
                                    🏗️ Build a Matching Tower
                                </h3>
                                <div className="grid md:grid-cols-2 gap-12 items-center text-center">
                                    <div className="space-y-6">
                                        <div className="p-8 bg-indigo-50 rounded-[3rem] border-4 border-white shadow-inner inline-block">
                                            <p className="text-2xl font-fredoka text-indigo-800 mb-6 uppercase tracking-widest">Target</p>
                                            <div className="flex gap-4">
                                                {mysteryItems.filter(i => i.group === selectedGroup).map(item => (
                                                    <div key={item.id} className="text-6xl">{item.icon}</div>
                                                ))}
                                            </div>
                                            <p className="text-6xl font-fredoka text-indigo-600 mt-6">{selectedGroup === 'art' ? 4 : 3}</p>
                                        </div>
                                        <Button onClick={handleAddCube} disabled={towerHeight >= (selectedGroup === 'art' ? 4 : 3) || showFeedback !== null} className="w-full bg-indigo-600 hover:bg-indigo-700 py-12 text-4xl font-fredoka rounded-[2rem] shadow-xl border-b-8 border-indigo-800">
                                            ADD CUBE! 🏗️
                                        </Button>
                                    </div>
                                    <div className="flex flex-col items-center gap-6">
                                        <div className="text-4xl font-fredoka text-indigo-500 bg-indigo-50 px-8 py-2 rounded-full border-4 border-white shadow-sm">Height: {towerHeight}</div>
                                        {renderTower(towerHeight)}
                                    </div>
                                </div>
                            </Card>
                        )}

                        {currentStep === 'oneMore' && (
                            <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-10 text-center space-y-10 animate-in zoom-in">
                                <h3 className="text-4xl font-fredoka text-indigo-600">
                                    🚀 1 More Final Challenge
                                </h3>
                                <div className="flex justify-center items-end gap-12 md:gap-32 min-h-[300px] p-10 bg-white/50 rounded-[3rem] border-8 border-white shadow-inner overflow-x-auto">
                                    <div className="flex flex-col items-center gap-4 min-w-[120px]">
                                        <p className="text-xl font-bold text-indigo-300 uppercase">Start Tower</p>
                                        {renderTower(towerHeight)}
                                        <p className="text-5xl font-fredoka text-indigo-600">{towerHeight}</p>
                                    </div>
                                    <div className="flex flex-col items-center gap-4 min-w-[120px]">
                                        <p className="text-xl font-bold text-indigo-500 uppercase">1 More Tower</p>
                                        {renderTower(oneMoreTowers, 2)}
                                        <p className="text-7xl font-fredoka text-indigo-600">{oneMoreTowers || '?'}</p>
                                    </div>
                                </div>
                                <div className="bg-indigo-50 p-10 rounded-[3rem] border-4 border-white shadow-inner max-w-2xl mx-auto">
                                    {oneMoreStep === 'build' ? (
                                        <div className="space-y-8">
                                            <p className="text-3xl font-fredoka text-indigo-800">
                                                Build a tower that is <span className="text-5xl text-indigo-600">1 more</span> than {towerHeight}!
                                            </p>
                                            <Button onClick={handleOneMoreBuild} disabled={oneMoreTowers >= (towerHeight + 1) || showFeedback !== null} className="w-full bg-indigo-600 hover:bg-indigo-700 py-12 text-4xl font-fredoka rounded-[2rem] shadow-xl border-b-8 border-indigo-800">
                                                BUILD 1 MORE! 🔨
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="space-y-8 animate-in slide-in-from-bottom-8">
                                            <p className="text-3xl font-fredoka text-indigo-800">
                                                What is <span className="text-5xl text-indigo-600">1 more</span> than {towerHeight}?
                                            </p>
                                            <div className="flex justify-center gap-4 flex-wrap">
                                                {[1, 2, 3, 4, 5].map(num => (
                                                    <Button key={num} onClick={() => handleNumSelect(num)} disabled={showFeedback !== null} className="w-24 h-24 text-4xl font-fredoka rounded-[2rem] bg-white text-indigo-600 border-4 border-indigo-200 hover:bg-indigo-50 shadow-lg">
                                                        {num}
                                                    </Button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        )}

                        {currentStep === 'complete' && (
                            <Card className="bg-gradient-to-br from-indigo-600 via-purple-600 to-teal-600 shadow-2xl rounded-[4rem] overflow-hidden p-16 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                                <div className="text-9xl animate-bounce">🏆</div>
                                <h2 className="text-7xl font-fredoka drop-shadow-xl">Math Superstar!</h2>
                                <p className="text-3xl font-nunito max-w-2xl mx-auto leading-relaxed">
                                    You sorted, counted, and built your way to the finish line!
                                    <br />
                                    Module 3 is COMPLETE! 🌟
                                </p>
                                <div className="flex gap-4 w-full pt-8">
                                    <Button onClick={resetActivity} className="h-24 flex-1 bg-white/10 hover:bg-white/20 text-white text-3xl font-fredoka rounded-[2rem] border-4 border-white/20">
                                        Again! 🔄
                                    </Button>
                                    <Button onClick={() => navigate("/activities/module-3?last=3-culminating-37")} className="h-24 flex-1 bg-white text-indigo-600 hover:bg-indigo-50 text-3xl font-fredoka rounded-[2rem] shadow-2xl">
                                        Victory! ✨
                                    </Button>
                                </div>
                            </Card>
                        )}

                        {showFeedback && (
                            <div className="fixed bottom-6 right-6 z-[100] animate-in slide-in-from-right-4 fade-in duration-300">
                                <Card className={`flex items-center gap-4 px-6 py-4 shadow-2xl rounded-2xl border-4 ${showFeedback === 'correct' ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'}`}>
                                    <span className="text-4xl">{showFeedback === 'correct' ? '🎉' : '🤔'}</span>
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
                            <Button onClick={() => setShowGame(false)} variant="ghost" className="text-indigo-400 hover:text-indigo-600 w-full py-2 font-bold font-nunito">
                                ← Back to Instructions
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CulminatingThirtySeven37;

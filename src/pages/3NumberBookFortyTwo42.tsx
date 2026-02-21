import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, RefreshCw, Home, Star, BookOpen, PenTool, Image as ImageIcon, Sparkles, Smile, Heart, CheckCircle } from "lucide-react";

const NUMBER_DATA = [
    { num: 6, color: "bg-blue-500", light: "bg-blue-50", text: "text-blue-700", icon: "🎈" },
    { num: 7, color: "bg-purple-500", light: "bg-purple-50", text: "text-purple-700", icon: "🌈" },
    { num: 8, color: "bg-pink-500", light: "bg-pink-50", text: "text-pink-700", icon: "🦋" },
    { num: 9, color: "bg-indigo-500", light: "bg-indigo-50", text: "text-indigo-700", icon: "🦄" },
    { num: 10, color: "bg-emerald-500", light: "bg-emerald-50", text: "text-emerald-700", icon: "🐬" },
];

const NumberBookFortyTwo42 = () => {
    const navigate = useNavigate();
    const [showGame, setShowGame] = useState(false);
    const [currentStep, setCurrentStep] = useState<'author' | 'book' | 'complete'>('author');
    const [currentPage, setCurrentPage] = useState(0);
    const [bookState, setBookState] = useState(NUMBER_DATA.map(d => ({ ...d, added: false })));
    const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);

    const markComplete = () => {
        const saved = localStorage.getItem("ethio-stem-m3-completed");
        const completed = saved ? JSON.parse(saved) : [];
        if (!completed.includes("3-number-book-42")) {
            completed.push("3-number-book-42");
            localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
        }
    };

    const handleAddContent = (idx: number) => {
        const newState = [...bookState];
        newState[idx].added = true;
        setBookState(newState);
        setShowFeedback("correct");
    };

    const nextStep = () => {
        setShowFeedback(null);
        if (currentPage < bookState.length - 1) {
            setCurrentPage(currentPage + 1);
        } else {
            markComplete();
            setCurrentStep('complete');
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const resetActivity = () => {
        setShowGame(false);
        setCurrentStep('author');
        setCurrentPage(0);
        setBookState(NUMBER_DATA.map(d => ({ ...d, added: false })));
        setShowFeedback(null);
    };

    const currentData = bookState[currentPage];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 font-nunito overflow-x-hidden">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=3-number-book-42")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full font-fredoka">
                                Lesson 42
                            </span>
                            <h1 className="text-2xl font-bold text-foreground font-fredoka uppercase tracking-wide">Number Book</h1>
                        </div>
                    </div>
                </div>

                {!showGame ? (
                    <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] overflow-hidden text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700 relative">
                        <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mb-6 rotate-3 shadow-lg">
                            <BookOpen className="w-12 h-12 text-white" />
                        </div>
                        <h2 className="text-5xl font-fredoka text-purple-900 leading-tight">Becoming an Author!</h2>
                        <p className="text-2xl text-purple-800 font-nunito leading-relaxed max-w-2xl mx-auto">
                            You've learned so much about numbers
                            <span className="font-fredoka text-4xl text-pink-600 drop-shadow-sm mx-2">6, 7, 8, 9, and 10!</span>
                            Now, let's create your very own Number Book!
                        </p>
                        <Button
                            onClick={() => setShowGame(true)}
                            className="bg-purple-600 hover:bg-purple-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl font-fredoka transition-all hover:scale-105 active:scale-95 border-b-8 border-purple-800"
                        >
                            Open My Book! 📔
                        </Button>
                        <p className="text-sm text-purple-400 font-bold uppercase tracking-widest pt-4">Module 3 Grand Finale</p>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        {currentStep === 'author' && (
                            <Card className="p-12 rounded-[3.5rem] bg-white/80 border-4 border-white shadow-2xl text-center space-y-10 animate-in zoom-in-95 duration-500">
                                <h2 className="text-5xl font-fredoka text-indigo-900 leading-tight">Who is the Author?</h2>
                                <div className="py-8">
                                    <div className="mx-auto w-40 h-40 bg-indigo-50 rounded-full flex items-center justify-center mb-8 border-4 border-dashed border-indigo-200">
                                        <ImageIcon className="w-20 h-20 text-indigo-300" />
                                    </div>
                                    <div className="bg-white border-4 border-indigo-100 p-12 rounded-[3rem] shadow-inner max-w-md mx-auto relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500" />
                                        <p className="text-3xl font-fredoka text-indigo-400 mb-2 uppercase tracking-widest">Written by:</p>
                                        <p className="text-6xl font-bold text-indigo-600 drop-shadow-sm">YOU! 🌟</p>
                                    </div>
                                </div>
                                <Button
                                    onClick={() => setCurrentStep('book')}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-3xl px-16 py-10 rounded-full shadow-2xl font-fredoka transition-all hover:scale-105 active:scale-95 border-b-8 border-indigo-800"
                                >
                                    Open Case 📖
                                </Button>
                            </Card>
                        )}

                        {currentStep === 'book' && (
                            <div className="space-y-8 animate-in slide-in-from-right-8">
                                <div className="flex justify-between items-center px-6">
                                    <p className="text-indigo-900 font-bold text-2xl font-fredoka">Page {currentPage + 1} / 5</p>
                                    <div className="flex gap-3">
                                        {bookState.map((page, i) => (
                                            <div key={i} className={`h-4 rounded-full transition-all ${i === currentPage ? 'bg-indigo-600 w-12 shadow-md' : 'bg-indigo-100 w-4'}`} />
                                        ))}
                                    </div>
                                </div>

                                <Card className="min-h-[600px] rounded-[4rem] bg-white shadow-3xl border-4 border-white flex flex-col overflow-hidden relative">
                                    <div className={`p-10 ${currentData.color} text-white text-center shadow-lg relative overflow-hidden`}>
                                        <h2 className="text-7xl font-fredoka drop-shadow-2xl relative z-10">Number {currentData.num}</h2>
                                        <div className="absolute top-1/2 right-12 -translate-y-1/2 opacity-20 text-9xl z-0">
                                            {currentData.icon}
                                        </div>
                                    </div>

                                    <div className="flex-1 p-12 flex flex-col items-center justify-center space-y-12">
                                        {!currentData.added ? (
                                            <div className="text-center space-y-10">
                                                <p className="text-4xl text-gray-700 font-fredoka leading-relaxed max-w-xl">
                                                    What should we add to the <span className={`font-bold text-5xl underline decoration-double ${currentData.text}`}>{currentData.num}</span> page?
                                                </p>
                                                <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto">
                                                    <button
                                                        onClick={() => handleAddContent(currentPage)}
                                                        className="p-10 rounded-[2.5rem] bg-gray-50 border-4 border-dashed border-gray-200 hover:bg-indigo-50 hover:border-indigo-400 transition-all flex flex-col items-center gap-6 group shadow-inner"
                                                    >
                                                        <PenTool className="w-16 h-16 text-gray-300 group-hover:text-indigo-500 group-hover:scale-110 transition-transform" />
                                                        <p className="text-2xl font-bold text-gray-600 group-hover:text-indigo-800">Draw {currentData.num} Items</p>
                                                    </button>
                                                    <button
                                                        onClick={() => handleAddContent(currentPage)}
                                                        className="p-10 rounded-[2.5rem] bg-gray-50 border-4 border-dashed border-gray-200 hover:bg-pink-50 hover:border-pink-400 transition-all flex flex-col items-center gap-6 group shadow-inner"
                                                    >
                                                        <ImageIcon className="w-16 h-16 text-gray-300 group-hover:text-pink-500 group-hover:scale-110 transition-transform" />
                                                        <p className="text-2xl font-bold text-gray-600 group-hover:text-pink-800">Add {currentData.num} Stickers</p>
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="w-full space-y-12 animate-in zoom-in duration-500">
                                                <div className={`rounded-[3rem] p-16 ${currentData.light} border-8 border-white shadow-inner flex flex-wrap gap-6 items-center justify-center min-h-[350px]`}>
                                                    {Array.from({ length: currentData.num }).map((_, i) => (
                                                        <div
                                                            key={i}
                                                            className="text-8xl animate-bounce drop-shadow-lg"
                                                            style={{ animationDelay: `${i * 0.1}s` }}
                                                        >
                                                            {currentData.icon}
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="flex justify-center items-center gap-4 text-emerald-600 bg-emerald-50 py-4 px-8 rounded-full border-4 border-white shadow-md w-fit mx-auto">
                                                    <CheckCircle className="w-10 h-10" />
                                                    <p className="text-4xl font-fredoka">It's a Masterpiece!</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-10 bg-gray-50/50 border-t-4 border-white flex justify-between gap-6">
                                        <Button
                                            onClick={prevPage}
                                            disabled={currentPage === 0}
                                            variant="outline"
                                            className="px-10 h-20 text-2xl font-fredoka rounded-[2rem] border-4 border-white bg-white text-gray-400 hover:text-indigo-600"
                                        >
                                            <ArrowLeft className="mr-3 w-8 h-8" /> Back
                                        </Button>
                        {currentData.added && (
                            <Button
                                onClick={nextStep}
                                className={`px-16 h-20 text-3xl font-fredoka rounded-[2rem] shadow-2xl transition-all hover:scale-105 border-b-8 ${currentPage === bookState.length - 1 ? 'bg-emerald-600 hover:bg-emerald-700 border-emerald-800' : 'bg-indigo-600 hover:bg-indigo-700 border-indigo-800'} text-white`}
                            >
                                {currentPage === bookState.length - 1 ? "Finish Book! 🏆" : "Next Page! ➡️"}
                            </Button>
                        )}
                                    </div>
                                </Card>
                            </div>
                        )}

                        {currentStep === 'complete' && (
                            <Card className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 shadow-2xl rounded-[4rem] overflow-hidden p-20 text-center text-white space-y-10 animate-in zoom-in-95 duration-700">
                                <div className="space-y-6">
                                    <div className="flex justify-center gap-6 mb-12">
                                        <Sparkles className="w-20 h-20 text-yellow-300 animate-pulse" />
                                        <Star className="w-32 h-32 fill-yellow-400 text-yellow-400 animate-bounce" />
                                        <Heart className="w-20 h-20 fill-pink-400 text-pink-400 animate-pulse" />
                                    </div>
                                    <h2 className="text-8xl font-fredoka drop-shadow-2xl">Master Author!</h2>
                                    <p className="text-4xl font-nunito max-w-3xl mx-auto leading-relaxed text-indigo-50">
                                        You've finished your first Number Book!
                                        <br />
                                        You are an expert at <span className="text-yellow-300 font-bold">6, 7, 8, 9, and 10!</span>
                                    </p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-2xl p-12 rounded-[3.5rem] border-4 border-white/20 text-white max-w-3xl mx-auto">
                                    <h3 className="text-4xl font-fredoka mb-6 text-yellow-200">The Grand Finale! 🎓</h3>
                                    <p className="font-nunito text-2xl opacity-90 leading-relaxed italic">
                                        "You've completed ALL the Module 3 challenges. Show your incredible book to your family and tell them all about your number adventures!"
                                    </p>
                                </div>
                                <div className="flex gap-8 w-full max-w-2xl mx-auto pt-8">
                                    <Button onClick={resetActivity} className="h-28 flex-1 bg-white/10 hover:bg-white/20 text-white text-4xl font-fredoka rounded-[2.5rem] border-4 border-white/20">
                                        Again! 🔄
                                    </Button>
                                    <Button onClick={() => navigate("/activities/module-3?last=3-number-book-42")} className="h-28 flex-1 bg-white text-indigo-600 hover:bg-indigo-50 text-4xl font-fredoka rounded-[2.5rem] shadow-3xl">
                                        DONE! 🎉
                                    </Button>
                                </div>
                            </Card>
                        )}

                        {showFeedback && (
                            <div className="fixed bottom-[33%] right-[25%] z-[100] animate-in slide-in-from-right-4 fade-in duration-300">
                                <Card className={`flex items-center gap-4 px-6 py-4 shadow-2xl rounded-2xl border-4 ${showFeedback === 'correct' ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'}`}>
                                    <span className="text-4xl">{showFeedback === 'correct' ? '📚' : '🤔'}</span>
                                    <h4 className={`text-2xl font-fredoka ${showFeedback === 'correct' ? 'text-green-700' : 'text-red-700'}`}>
                                        {showFeedback === 'correct' ? 'Beautiful!' : 'Try Again!'}
                                    </h4>
                                    <Button onClick={showFeedback === 'correct' ? nextStep : () => setShowFeedback(null)} size="sm" className={`ml-2 rounded-xl text-lg px-4 py-2 ${showFeedback === 'correct' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}>
                                        {showFeedback === 'correct' ? 'Next Page! ➡️' : 'OK! 👍'}
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

export default NumberBookFortyTwo42;

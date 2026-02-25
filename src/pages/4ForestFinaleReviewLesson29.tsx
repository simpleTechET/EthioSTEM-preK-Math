import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Trees, Star, CheckCircle2, Trophy, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/context/AudioContext";

const ForestFinaleReview29 = () => {
    const navigate = useNavigate();
    const { isMuted } = useAudio();
    const [step, setStep] = useState(0);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState<{ show: boolean; correct: boolean }>({ show: false, correct: false });
    const [completed, setCompleted] = useState(false);

    const questions = [
        {
            id: 1,
            title: "Length Challenge",
            text: "Which tree is TALLER?",
            options: [
                { id: "tall", label: "Tall Tree", img: "🌲", size: "scale-150" },
                { id: "short", label: "Short Tree", img: "🌲", size: "scale-75" }
            ],
            correctId: "tall",
            voice: "Let's start our Grand Review! Point to the tree that is taller."
        },
        {
            id: 2,
            title: "Weight Challenge",
            text: "Which one is HEAVIER?",
            options: [
                { id: "rock", label: "Big Rock", img: "🪨" },
                { id: "leaf", label: "Small Leaf", img: "🍃" }
            ],
            correctId: "rock",
            voice: "Great! Now, which one feels heavier: the big rock or the small leaf?"
        },
        {
            id: 3,
            title: "Volume Challenge",
            text: "Which jar has MORE honey?",
            options: [
                { id: "more", label: "Full Jar", img: "🍯", level: "h-full" },
                { id: "less", label: "Empty Jar", img: "🍯", level: "h-1/4" }
            ],
            correctId: "more",
            voice: "The bears need help! Which jar has more honey for them?"
        },
        {
            id: 4,
            title: "Pattern Challenge",
            text: "What comes next in our pattern?",
            pattern: ["🍎", "🍐", "🍎", "🍐"],
            options: [
                { id: "apple", label: "Apple", img: "🍎" },
                { id: "pear", label: "Pear", img: "🍐" }
            ],
            correctId: "apple",
            voice: "Look at the fruit pattern: Apple, Pear, Apple, Pear. What comes next?"
        },
        {
            id: 5,
            title: "Position Challenge",
            text: "Which animal is LAST in line?",
            animals: ["🦊", "🐰", "🐻", "🦆"],
            options: [
                { id: "fox", label: "Fox", img: "🦊" },
                { id: "duck", label: "Duck", img: "🦆" }
            ],
            correctId: "duck",
            voice: "The animals are waiting! Who is last in the line?"
        }
    ];

    const currentQuestion = questions[step];

    const speak = (text: string) => {
        if (!isMuted && "speechSynthesis" in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.9;
            window.speechSynthesis.speak(utterance);
        }
    };

    useEffect(() => {
        speak(currentQuestion.voice);
    }, [step]);

    const handleSelect = (optionId: string) => {
        if (feedback.show) return;

        const isCorrect = optionId === currentQuestion.correctId;
        setFeedback({ show: true, correct: isCorrect });

        if (isCorrect) {
            setScore(score + 1);
            speak("That's right! You're a forest master!");
            setTimeout(() => {
                if (step < questions.length - 1) {
                    setStep(step + 1);
                    setFeedback({ show: false, correct: false });
                } else {
                    handleComplete();
                }
            }, 2000);
        } else {
            speak("Not quite. Let's try to look closely again.");
            setTimeout(() => setFeedback({ show: false, correct: false }), 2000);
        }
    };

    const handleComplete = () => {
        setCompleted(true);
        speak("Amazing job! You've completed your Forest Adventure! You are ready for the next module.");
        const completedLessons = JSON.parse(localStorage.getItem("ethio-stem-m4-completed") || "[]");
        if (!completedLessons.includes(29)) {
            localStorage.setItem("ethio-stem-m4-completed", JSON.stringify([...completedLessons, 29]));
        }
    };

    if (completed) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-emerald-100 flex items-center justify-center p-4">
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                    <Card className="max-w-md w-full p-8 text-center rounded-[3rem] shadow-2xl border-4 border-emerald-500">
                        <Trophy className="w-24 h-24 text-yellow-500 mx-auto mb-6 animate-bounce" />
                        <h1 className="text-4xl font-fredoka text-emerald-800 mb-4">Forest Master!</h1>
                        <p className="text-xl font-nunito text-slate-600 mb-8">
                            You've finished all 29 lessons! You've learned how to compare things and make patterns.
                        </p>
                        <div className="flex flex-col gap-4">
                            <Button onClick={() => navigate("/activities/module-4")} className="bg-emerald-600 hover:bg-emerald-700 h-16 text-xl rounded-2xl">
                                Go to Forest Road
                            </Button>
                            <Button variant="outline" onClick={() => navigate("/")} className="h-16 text-xl rounded-2xl">
                                Back to Home
                            </Button>
                        </div>
                    </Card>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] font-fredoka overflow-hidden pb-12">
            <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 p-4 flex items-center justify-between border-b shadow-sm">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate("/activities/module-4")} className="rounded-full">
                        <ArrowLeft className="w-6 h-6" />
                    </Button>
                    <div>
                        <h1 className="text-xl md:text-2xl text-emerald-800">Review: Forest Finale</h1>
                        <div className="flex gap-1">
                            {questions.map((_, i) => (
                                <div key={i} className={`h-1.5 w-8 rounded-full transition-all ${i === step ? 'bg-emerald-500 w-12' : i < step ? 'bg-emerald-200' : 'bg-slate-200'}`} />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="bg-emerald-100 px-4 py-2 rounded-full flex items-center gap-2">
                    <Star className="text-emerald-600 fill-emerald-600" />
                    <span className="text-xl font-bold text-emerald-800">{score}</span>
                </div>
            </header>

            <main className="container mx-auto max-w-4xl p-4 md:p-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -50, opacity: 0 }}
                        className="space-y-8"
                    >
                        <div className="text-center">
                            <h2 className="text-3xl md:text-4xl text-emerald-900 mb-2">{currentQuestion.title}</h2>
                            <p className="text-xl text-slate-600">{currentQuestion.text}</p>
                        </div>

                        <Card className="p-8 md:p-12 rounded-[2.5rem] bg-white shadow-xl min-h-[400px] flex items-center justify-center border-2 border-emerald-50 overflow-hidden relative">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#f0fdf4,transparent)] opacity-50" />

                            <div className="relative z-10 w-full">
                                {/* Specific display for Position challenge */}
                                {currentQuestion.animals && (
                                    <div className="flex justify-center gap-4 mb-12 text-6xl">
                                        {currentQuestion.animals.map((a, i) => (
                                            <motion.div
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: i * 0.1 }}
                                                key={i}
                                                className="bg-slate-50 p-4 rounded-2xl shadow-sm"
                                            >
                                                {a}
                                            </motion.div>
                                        ))}
                                    </div>
                                )}

                                {/* Specific display for Pattern challenge */}
                                {currentQuestion.pattern && (
                                    <div className="flex justify-center gap-4 mb-12 text-6xl items-center">
                                        {currentQuestion.pattern.map((p, i) => (
                                            <div key={i} className="bg-orange-50 p-4 rounded-2xl border-2 border-orange-100">{p}</div>
                                        ))}
                                        <div className="w-16 h-16 bg-emerald-50 border-4 border-dashed border-emerald-200 rounded-2xl flex items-center justify-center animate-pulse">?</div>
                                    </div>
                                )}

                                {/* Generalized Options */}
                                <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto">
                                    {currentQuestion.options.map((option) => (
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            key={option.id}
                                            onClick={() => handleSelect(option.id)}
                                            className={`h-48 md:h-64 rounded-[2rem] border-4 transition-all flex flex-col items-center justify-center gap-4 text-2xl relative
                        ${feedback.show && option.id === currentQuestion.correctId ? 'bg-emerald-100 border-emerald-500 scale-105' :
                                                    feedback.show && option.id !== currentQuestion.correctId ? 'bg-red-50 border-red-200 opacity-50' :
                                                        'bg-slate-50 border-slate-100 hover:bg-white hover:border-emerald-200 shadow-sm'}`}
                                        >
                                            <div className={`text-8xl transition-all ${option.size || ''}`}>
                                                {option.id === "more" ? (
                                                    <div className="relative w-24 h-32 bg-slate-200 rounded-lg overflow-hidden">
                                                        <div className={`absolute bottom-0 left-0 right-0 bg-yellow-400 transition-all duration-500 ${option.level}`} />
                                                        <div className="absolute inset-0 flex items-center justify-center text-5xl">🍯</div>
                                                    </div>
                                                ) : option.img}
                                            </div>
                                            <span className="font-nunito font-bold text-slate-700">{option.label}</span>

                                            {feedback.show && option.id === currentQuestion.correctId && (
                                                <div className="absolute -top-4 -right-4 bg-emerald-500 text-white rounded-full p-2">
                                                    <CheckCircle2 className="w-8 h-8" />
                                                </div>
                                            )}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </AnimatePresence>
            </main>

            <footer className="fixed bottom-0 left-0 right-0 p-8 flex justify-center pointer-events-none">
                <div className="flex gap-2">
                    <Trees className="text-emerald-200 w-12 h-12" />
                    <Trees className="text-emerald-100 w-16 h-16" />
                    <Trees className="text-emerald-200 w-12 h-12" />
                </div>
            </footer>
        </div>
    );
};

export default ForestFinaleReview29;

import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, CheckCircle, RefreshCw, Trees, Scale, Container, ArrowRight, Table as TableIcon, Layers, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MuteButton } from "@/components/MuteButton";

interface Lesson {
    path: string;
    lessonNumber: number;
    title: string;
    description: string;
    emoji: string;
}

interface Topic {
    id: string;
    title: string;
    subtitle: string;
    standards: string;
    color: string;
    borderColor: string;
    gradientFrom: string;
    gradientTo: string;
    icon: any;
    waveFill: string;
    lessons: Lesson[];
}

const topics: Topic[] = [
    {
        id: "A",
        title: "Topic A",
        subtitle: "Comparison of Length",
        standards: "PK.MD.1",
        color: "bg-emerald-50",
        borderColor: "border-emerald-400",
        gradientFrom: "from-emerald-400",
        gradientTo: "to-forest-600",
        icon: "🌳",
        waveFill: "#ecfdf5",
        lessons: [
            { path: "/module-4/lesson-1", lessonNumber: 1, title: "Tall or Short", description: "Identify length by describing objects as tall or short", emoji: "🦒" },
            { path: "/module-4/lesson-2", lessonNumber: 2, title: "Taller & Shorter", description: "Compare length with aligned and non-aligned endpoints", emoji: "🪜" },
            { path: "/module-4/lesson-3", lessonNumber: 3, title: "Longer & Shorter", description: "Compare using a simple straight object", emoji: "📏" },
            { path: "/module-4/lesson-4", lessonNumber: 4, title: "Linking Cube Sticks", description: "Compare using a stick of linking cubes", emoji: "🧱" },
            { path: "/module-4/lesson-5", lessonNumber: 5, title: "About the Same", description: "Compare length using 'about the same as'", emoji: "🤝" },
        ],
    },
    {
        id: "B",
        title: "Topic B",
        subtitle: "Comparison of Weight",
        standards: "PK.MD.1",
        color: "bg-orange-50",
        borderColor: "border-orange-400",
        gradientFrom: "from-orange-400",
        gradientTo: "to-amber-600",
        icon: "⚖️",
        waveFill: "#fff7ed",
        lessons: [
            { path: "/module-4/lesson-6", lessonNumber: 6, title: "Heavy or Light", description: "Identify weight by describing objects as heavy or light", emoji: "🐘" },
            { path: "/module-4/lesson-7", lessonNumber: 7, title: "Heavier & Lighter", description: "Compare weight using heavier than and lighter than", emoji: "🎈" },
            { path: "/module-4/lesson-8", lessonNumber: 8, title: "Balance Scales", description: "Compare weight using balance scales", emoji: "⚖️" },
        ],
    },
    {
        id: "C",
        title: "Topic C",
        subtitle: "Comparison of Volume",
        standards: "PK.MD.1",
        color: "bg-cyan-50",
        borderColor: "border-cyan-400",
        gradientFrom: "from-cyan-400",
        gradientTo: "to-blue-600",
        icon: "🫗",
        waveFill: "#ecfeff",
        lessons: [
            { path: "/module-4/lesson-9", lessonNumber: 9, title: "Big or Small", description: "Identify volume using containers", emoji: "🥤" },
            { path: "/module-4/lesson-10", lessonNumber: 10, title: "More or Less", description: "Compare volume using more than or less than", emoji: "🧪" },
            { path: "/module-4/lesson-11", lessonNumber: 11, title: "Same Volume", description: "Explore conservation of volume with sand", emoji: "🏖️" },
            { path: "/module-4/lesson-12", lessonNumber: 12, title: "Match & Compare", description: "Match length, weight, and volume statements", emoji: "✅" },
        ],
    },
    {
        id: "D",
        title: "Topic D",
        subtitle: "First and Last",
        standards: "PK.CC.6, PK.CC.4",
        color: "bg-amber-50",
        borderColor: "border-amber-400",
        gradientFrom: "from-amber-400",
        gradientTo: "to-yellow-600",
        icon: "🏁",
        waveFill: "#fffbeb",
        lessons: [
            { path: "/module-4/lesson-13", lessonNumber: 13, title: "First & Last (Scattered)", description: "Identify first/last in a scattered group (2-5)", emoji: "🍭" },
            { path: "/module-4/lesson-14", lessonNumber: 14, title: "First & Last (Linear)", description: "Identify first/last in a linear group (2-10)", emoji: "🚂" },
            { path: "/module-4/lesson-15", lessonNumber: 15, title: "First & Last (Circular)", description: "Identify first/last in a circular group (2-10)", emoji: "🎡" },
        ],
    },
    {
        id: "E",
        title: "Topic E",
        subtitle: "Are There Enough?",
        standards: "PK.CC.5",
        color: "bg-fuchsia-50",
        borderColor: "border-fuchsia-400",
        gradientFrom: "from-fuchsia-400",
        gradientTo: "to-purple-600",
        icon: "🪑",
        waveFill: "#fdf4ff",
        lessons: [
            { path: "/module-4/lesson-16", lessonNumber: 16, title: "Are There Enough? (Matching)", description: "Match objects to find if there are enough", emoji: "❌" },
            { path: "/module-4/lesson-17", lessonNumber: 17, title: "Are There Enough? (Counting)", description: "Count objects to find if there are enough", emoji: "🎯" },
            { path: "/module-4/lesson-18", lessonNumber: 18, title: "One More", description: "Add one more and see how many we have", emoji: "➕" },
            { path: "/module-4/lesson-19", lessonNumber: 19, title: "One Less", description: "Take one away and count what's left", emoji: "📉" },
        ],
    },
    {
        id: "F",
        title: "Topic F",
        subtitle: "The 5-Group",
        standards: "PK.CC.5",
        color: "bg-rose-50",
        borderColor: "border-rose-400",
        gradientFrom: "from-rose-400",
        gradientTo: "to-red-600",
        icon: "🖐️",
        waveFill: "#fff1f2",
        lessons: [
            { path: "/module-4/lesson-20", lessonNumber: 20, title: "5-Group Objects", description: "Find groups of 5 in lines and scattered groups", emoji: "🫐" },
            { path: "/module-4/lesson-21", lessonNumber: 21, title: "5-Group Dots", description: "Find groups of 5 in circular patterns", emoji: "🌸" },
            { path: "/module-4/lesson-22", lessonNumber: 22, title: "Hidden 5-Group", description: "Find the hidden 5-group in larger numbers", emoji: "🔍" },
        ],
    },
    {
        id: "G",
        title: "Topic G",
        subtitle: "AB Patterns",
        standards: "PK.OA.2",
        color: "bg-indigo-50",
        borderColor: "border-indigo-400",
        gradientFrom: "from-indigo-400",
        gradientTo: "to-violet-600",
        icon: "➰",
        waveFill: "#eef2ff",
        lessons: [
            { path: "/module-4/lesson-23", lessonNumber: 23, title: "AB Linear Patterns", description: "Identify patterns in a straight line", emoji: "📏" },
            { path: "/module-4/lesson-24", lessonNumber: 24, title: "AB Scattered Patterns", description: "Find pattern pieces in a mixed pile", emoji: "🎲" },
            { path: "/module-4/lesson-25", lessonNumber: 25, title: "AB Circular Patterns", description: "Complete patterns around a circle", emoji: "⭕" },
            { path: "/module-4/lesson-26", lessonNumber: 26, title: "Create AB Pattern", description: "Build your own repeating pattern", emoji: "🎨" },
            { path: "/module-4/lesson-27", lessonNumber: 27, title: "Extend AB Pattern", description: "Predict what comes next in a pattern", emoji: "🔮" },
            { path: "/module-4/lesson-28", lessonNumber: 28, title: "Pattern Match", description: "Find the pattern that looks the same", emoji: "👯" },
            { path: "/module-4/lesson-29", lessonNumber: 29, title: "Forest Finale: Final Review", description: "A fun challenge covering all our forest learning!", emoji: "🏆" },
        ],
    },
];

const Module4Index = () => {
    const location = useLocation();
    const [completedLessons, setCompletedLessons] = useState<string[]>([]);
    const lessonRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});

    useEffect(() => {
        const saved = localStorage.getItem("ethio-stem-m4-completed");
        if (saved) setCompletedLessons(JSON.parse(saved));
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const lastId = params.get("last");
        if (lastId && lessonRefs.current[lastId]) {
            setTimeout(() => {
                lessonRefs.current[lastId]?.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 500);
        }
    }, [location]);

    const resetProgress = () => {
        if (confirm("Reset all your forest badges? 🌲")) {
            setCompletedLessons([]);
            localStorage.removeItem("ethio-stem-m4-completed");
        }
    };

    return (
        <div className="min-h-screen gradient-forest overflow-hidden relative">
            {/* Nature Elements */}
            <div className="absolute top-8 left-10 w-24 h-24 bg-emerald-500/20 rounded-full blur-2xl animate-pulse" />
            <div className="absolute top-40 right-20 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
            <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-forest-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "0.5s" }} />

            {/* Sun */}
            <div className="absolute top-6 right-8 w-20 h-20 bg-sunset-500 rounded-full shadow-[0_0_40px_rgba(249,115,22,0.4)] flex items-center justify-center animate-pulse">
                <div className="w-14 h-14 bg-sunset-400/80 rounded-full blur-sm" />
            </div>

            <div className="container mx-auto px-4 py-12 relative z-10 pb-24">
                <header className="text-center mb-12 relative">
                    <Link to="/" className="absolute left-0 top-0">
                        <Button variant="ghost" size="icon" className="rounded-full bg-white/50 hover:bg-white border-2 border-white/20">
                            <ArrowLeft className="w-6 h-6" />
                        </Button>
                    </Link>
                    <div className="inline-flex items-center gap-4 mb-4">
                        <span className="text-5xl">🌲</span>
                        <h1 className="font-fredoka text-4xl md:text-5xl text-foreground text-shadow-playful">
                            Forest Adventure
                        </h1>
                        <span className="text-5xl">🦉</span>
                    </div>
                    <p className="font-nunito text-xl text-foreground/80">
                        Module 4: Comparing Length, Weight, and Capacity
                    </p>
                    <div className="flex justify-center items-center gap-3 mt-4">
                        <Button
                            onClick={resetProgress}
                            variant="outline"
                            size="sm"
                            className="rounded-full bg-white/30 border-white/50 hover:bg-white/80 text-xs gap-2"
                        >
                            <RefreshCw className="w-3 h-3" /> Reset
                        </Button>
                        <MuteButton className="h-8 w-8" />
                    </div>
                </header>

                <div className="max-w-3xl mx-auto space-y-8">
                    {topics.map((topic) => (
                        <div
                            key={topic.id}
                            className={`${topic.color} rounded-[3rem] shadow-xl overflow-hidden border-4 ${topic.borderColor} transform transition-all hover:scale-[1.01]`}
                        >
                            <div className={`relative p-6 bg-gradient-to-r ${topic.gradientFrom} ${topic.gradientTo} overflow-hidden`}>
                                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-lg" />
                                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/5 rounded-full blur-lg" />

                                <div className="relative flex items-center gap-6">
                                    <div className="w-20 h-20 rounded-[2rem] bg-white/20 backdrop-blur-md flex items-center justify-center shadow-xl transform -rotate-3 hover:rotate-3 transition-transform border-4 border-white/30">
                                        <span className="text-5xl">{topic.icon}</span>
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="bg-white/30 text-white text-xs font-black px-3 py-1 rounded-full font-nunito tracking-wider">
                                                LEVEL {topic.id}
                                            </span>
                                        </div>
                                        <h2 className="font-fredoka text-2xl md:text-3xl text-white drop-shadow-md mt-1">
                                            {topic.subtitle}
                                        </h2>
                                        <p className="font-nunito text-sm text-white/90 mt-1 font-medium">
                                            🍃 {topic.standards} • Exploration Guide
                                        </p>
                                    </div>
                                </div>

                                <svg className="absolute bottom-0 left-0 right-0 h-4" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 10 Q 10 0, 20 6 T 40 6 T 60 6 T 80 6 T 100 6 L 100 10 Z" style={{ fill: topic.waveFill }} />
                                </svg>
                            </div>

                            <div className="p-6">
                                <div className="grid gap-4">
                                    {topic.lessons.map((lesson) => {
                                        const lessonId = lesson.path.split('/').pop() || "";
                                        const isCompleted = completedLessons.includes(lessonId);
                                        return (
                                            <Link
                                                key={lesson.path}
                                                to={lesson.path}
                                                ref={(el) => { if (lessonId) lessonRefs.current[lessonId] = el; }}
                                            >
                                                <div className="bg-white/90 rounded-3xl p-5 hover:scale-[1.02] transition-all cursor-pointer shadow-md flex items-center gap-5 hover:bg-white group relative border-2 border-transparent hover:border-forest-400">
                                                    <div className="w-16 h-16 rounded-2xl bg-forest-50 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
                                                        {lesson.emoji}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="font-fredoka text-xl text-foreground group-hover:text-forest-700 transition-colors">
                                                            Lesson {lesson.lessonNumber}: {lesson.title}
                                                        </h3>
                                                        <p className="font-nunito text-sm text-muted-foreground">{lesson.description}</p>
                                                    </div>
                                                    <div className="flex flex-col items-center gap-1">
                                                        {isCompleted ? (
                                                            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 animate-in zoom-in duration-300">
                                                                <CheckCircle className="w-8 h-8" />
                                                            </div>
                                                        ) : (
                                                            <div className="w-12 h-12 bg-forest-50 rounded-full flex items-center justify-center text-forest-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <ArrowRight className="w-6 h-6" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 space-y-4">
                    <Link to="/module-4/assessment">
                        <div className="bg-emerald-900/90 backdrop-blur-md rounded-[2.5rem] p-8 border-4 border-emerald-700 shadow-2xl hover:scale-[1.02] transition-all group flex items-center justify-between overflow-hidden relative">
                            <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl group-hover:bg-emerald-400/40 transition-colors" />
                            <div className="flex items-center gap-6 relative z-10">
                                <div className="w-20 h-20 bg-white/10 rounded-[1.5rem] flex items-center justify-center text-5xl">📋</div>
                                <div>
                                    <h2 className="text-3xl font-fredoka text-white">Teacher assessment</h2>
                                    <p className="text-emerald-300 font-nunito font-bold italic">Topic H: Comparison & Pattern Rubric</p>
                                </div>
                            </div>
                            <ArrowRight className="w-12 h-12 text-white/50 group-hover:text-white transition-all transform group-hover:translate-x-2" />
                        </div>
                    </Link>

                    <p className="text-center font-nunito text-foreground/60 text-sm bg-white/20 backdrop-blur-sm inline-block px-6 py-2 rounded-full border border-white/30 w-full mt-4">
                        🌱 Module 4 Exploration: Comparisons & Measurements
                    </p>
                </div>
            </div>

            {/* Forest Ground */}
            <div className="fixed bottom-0 left-0 right-0 h-20 gradient-earth z-0 pointer-events-none opacity-80" />

            {/* Trees in Background */}
            <div className="fixed bottom-0 left-0 right-0 h-40 pointer-events-none z-0 flex justify-around items-end overflow-hidden opacity-10">
                {[...Array(6)].map((_, i) => (
                    <Trees key={i} className={`w-${24 + i * 4} h-${24 + i * 4} text-forest-900 animate-float`} style={{ animationDelay: `${i * 0.7}s` }} />
                ))}
            </div>
        </div>
    );
};

export default Module4Index;

import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, RefreshCw, ArrowRight, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MuteButton } from "@/components/MuteButton";

interface Lesson {
  path: string;
  lessonNumber: number;
  title: string;
  description: string;
  emoji: string;
}

interface Chapter {
  id: string;
  label: string;
  subtitle: string;
  standards: string;
  accent: string;
  accentDark: string;
  bgPattern: string;
  icon: string;
  lessons: Lesson[];
}

const chapters: Chapter[] = [
  {
    id: "A",
    label: "Chapter 1",
    subtitle: "Writing Numerals 0 to 5",
    standards: "PK.CC.2",
    accent: "#f59e0b",
    accentDark: "#d97706",
    bgPattern: "📝",
    icon: "✏️",
    lessons: [
      { path: "/module-5/lesson-1", lessonNumber: 1, title: "Write 0 and 1", description: "Learn to write numerals 0 and 1 with rhymes", emoji: "1️⃣" },
      { path: "/module-5/lesson-2", lessonNumber: 2, title: "Write 2", description: "Practice writing the numeral 2", emoji: "✌️" },
      { path: "/module-5/lesson-3", lessonNumber: 3, title: "Write 3", description: "Practice writing the numeral 3", emoji: "3️⃣" },
      { path: "/module-5/lesson-4", lessonNumber: 4, title: "Write 4", description: "Practice writing the numeral 4", emoji: "4️⃣" },
      { path: "/module-5/lesson-5", lessonNumber: 5, title: "Write 5", description: "Practice writing the numeral 5", emoji: "🖐️" },
    ],
  },
  {
    id: "B",
    label: "Chapter 2",
    subtitle: "Addition Stories",
    standards: "PK.OA.1, PK.CC.2–4",
    accent: "#3b82f6",
    accentDark: "#2563eb",
    bgPattern: "➕",
    icon: "📖",
    lessons: [
      { path: "/module-5/lesson-6", lessonNumber: 6, title: "Act Out Addition", description: "Act out add-to stories with result unknown", emoji: "🎭" },
      { path: "/module-5/lesson-7", lessonNumber: 7, title: "Addition with Objects", description: "Solve add-to stories using objects from the story", emoji: "🧸" },
      { path: "/module-5/lesson-8", lessonNumber: 8, title: "Number Sentences +", description: "Represent add-to stories with number sentences", emoji: "📝" },
      { path: "/module-5/lesson-9", lessonNumber: 9, title: "Put Together Stories", description: "Solve put-together stories with objects and drawings", emoji: "🎨" },
      { path: "/module-5/lesson-10", lessonNumber: 10, title: "Create Addition Stories", description: "Create and solve addition stories using drawings", emoji: "📖" },
    ],
  },
  {
    id: "C",
    label: "Chapter 3",
    subtitle: "Subtraction Stories",
    standards: "PK.OA.1, PK.CC.2–4",
    accent: "#ef4444",
    accentDark: "#dc2626",
    bgPattern: "➖",
    icon: "🐻",
    lessons: [
      { path: "/module-5/lesson-11", lessonNumber: 11, title: "Act Out Subtraction", description: "Act out take-from stories with result unknown", emoji: "🐻" },
      { path: "/module-5/lesson-12", lessonNumber: 12, title: "Subtraction with Objects", description: "Solve take-from stories using objects from the story", emoji: "🪆" },
      { path: "/module-5/lesson-13", lessonNumber: 13, title: "Number Sentences −", description: "Represent take-from stories with number sentences", emoji: "✍️" },
      { path: "/module-5/lesson-14", lessonNumber: 14, title: "Subtract with Drawings", description: "Solve take-from stories with objects and drawings", emoji: "✂️" },
      { path: "/module-5/lesson-15", lessonNumber: 15, title: "Create Subtraction Stories", description: "Create and solve subtraction stories by drawing", emoji: "🖍️" },
    ],
  },
  {
    id: "D",
    label: "Chapter 4",
    subtitle: "Addition with Fingers & Drawings",
    standards: "PK.OA.1, PK.CC.2",
    accent: "#8b5cf6",
    accentDark: "#7c3aed",
    bgPattern: "🖐️",
    icon: "🖐️",
    lessons: [
      { path: "/module-5/lesson-16", lessonNumber: 16, title: "Addition with Fingers I", description: "Solve addition stories using fingers", emoji: "👆" },
      { path: "/module-5/lesson-17", lessonNumber: 17, title: "Addition with Fingers II", description: "More addition stories using fingers", emoji: "✌️" },
      { path: "/module-5/lesson-18", lessonNumber: 18, title: "Addition with Cubes", description: "Solve addition stories with representative objects", emoji: "🧱" },
      { path: "/module-5/lesson-19", lessonNumber: 19, title: "Addition with Drawings", description: "Solve addition stories with representative drawings", emoji: "⭕" },
    ],
  },
  {
    id: "E",
    label: "Chapter 5",
    subtitle: "Subtraction with Fingers & Drawings",
    standards: "PK.OA.1, PK.CC.2",
    accent: "#14b8a6",
    accentDark: "#0d9488",
    bgPattern: "🤲",
    icon: "🤲",
    lessons: [
      { path: "/module-5/lesson-20", lessonNumber: 20, title: "Subtraction with Fingers I", description: "Solve subtraction stories using fingers", emoji: "👇" },
      { path: "/module-5/lesson-21", lessonNumber: 21, title: "Subtraction with Fingers II", description: "More subtraction stories using fingers", emoji: "🤏" },
      { path: "/module-5/lesson-22", lessonNumber: 22, title: "Subtraction with Cubes", description: "Solve subtraction stories with representative objects", emoji: "🧊" },
      { path: "/module-5/lesson-23", lessonNumber: 23, title: "Subtraction with Drawings", description: "Solve subtraction stories with representative drawings", emoji: "❌" },
    ],
  },
  {
    id: "F",
    label: "Chapter 6",
    subtitle: "Duplicating & Extending Patterns",
    standards: "PK.OA.2, PK.CC.1",
    accent: "#ec4899",
    accentDark: "#db2777",
    bgPattern: "🔁",
    icon: "🎪",
    lessons: [
      { path: "/module-5/lesson-24", lessonNumber: 24, title: "Identify Patterns", description: "Identify patterns using objects", emoji: "🔍" },
      { path: "/module-5/lesson-25", lessonNumber: 25, title: "Sound & Movement Patterns", description: "Identify and duplicate patterns using sounds and movement", emoji: "🥁" },
      { path: "/module-5/lesson-26", lessonNumber: 26, title: "Extend Patterns", description: "Duplicate and extend patterns with movement and objects", emoji: "🔗" },
      { path: "/module-5/lesson-27", lessonNumber: 27, title: "Growth Patterns", description: "Identify a growth pattern using objects", emoji: "📈" },
      { path: "/module-5/lesson-28", lessonNumber: 28, title: "Math Theater", description: "Create a story problem and act it out!", emoji: "🎪" },
    ],
  },
];

const Module5Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [openChapter, setOpenChapter] = useState<string | null>("A");
  const lessonRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});

  useEffect(() => {
    const saved = localStorage.getItem("ethio-stem-m5-completed");
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
    if (confirm("Reset all your storybook progress? 📖")) {
      setCompletedLessons([]);
      localStorage.removeItem("ethio-stem-m5-completed");
    }
  };

  const totalLessons = chapters.reduce((acc, c) => acc + c.lessons.length, 0);
  const completedCount = completedLessons.length;
  const pct = Math.round((completedCount / totalLessons) * 100);

  return (
    <div className="min-h-screen relative" style={{ background: "linear-gradient(180deg, #fef3c7 0%, #fde68a 15%, #fbbf24 30%, #f9a825 50%, #ff8a65 75%, #ef5350 100%)" }}>
      {/* Floating book pages */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute pointer-events-none select-none opacity-[0.07] font-fredoka font-bold"
          style={{
            top: `${8 + i * 15}%`,
            left: i % 2 === 0 ? `${3 + i * 4}%` : undefined,
            right: i % 2 !== 0 ? `${3 + i * 3}%` : undefined,
            fontSize: `${60 + i * 10}px`,
            transform: `rotate(${i % 2 === 0 ? -15 : 15}deg)`,
          }}
        >
          {["📖", "✨", "🌟", "📚", "🎭", "🔢"][i]}
        </div>
      ))}

      <div className="container mx-auto px-4 py-8 relative z-10 max-w-2xl pb-24">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/">
            <Button variant="ghost" size="icon" className="rounded-full bg-white/40 hover:bg-white/70 backdrop-blur-sm shadow-md">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Button
              onClick={resetProgress}
              variant="ghost"
              size="icon"
              className="rounded-full bg-white/40 hover:bg-white/70 backdrop-blur-sm shadow-md"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
            <MuteButton className="h-9 w-9 rounded-full bg-white/40 hover:bg-white/70 backdrop-blur-sm shadow-md" />
          </div>
        </div>

        {/* Book cover hero */}
        <div className="relative mx-auto mb-8">
          <div
            className="rounded-[2rem] p-8 text-center relative overflow-hidden shadow-2xl"
            style={{
              background: "linear-gradient(145deg, #5b21b6 0%, #7c3aed 40%, #a855f7 100%)",
              boxShadow: "0 20px 60px rgba(91, 33, 182, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
            }}
          >
            {/* Book spine effect */}
            <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/20 to-transparent" />
            <div className="absolute left-3 top-0 bottom-0 w-[1px] bg-white/10" />

            {/* Stars */}
            <div className="absolute top-3 right-4 text-yellow-300 animate-pulse text-xl">✦</div>
            <div className="absolute top-8 right-12 text-yellow-200 animate-pulse text-sm" style={{ animationDelay: "0.5s" }}>✦</div>
            <div className="absolute bottom-6 left-8 text-yellow-300 animate-pulse text-base" style={{ animationDelay: "1s" }}>✦</div>

            <div className="text-6xl mb-3 drop-shadow-lg">📖</div>
            <h1 className="font-fredoka text-3xl md:text-4xl text-white drop-shadow-lg mb-1">
              Storybook Adventure
            </h1>
            <p className="font-nunito text-white/80 text-base mb-5">
              Module 5 · Addition & Subtraction Stories
            </p>

            {/* Progress as a bookmark ribbon */}
            <div className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-full px-5 py-2.5 border border-white/20">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                <span className="font-fredoka text-white text-sm">{completedCount}/{totalLessons}</span>
              </div>
              <div className="w-24 h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-300 rounded-full transition-all duration-700"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="font-nunito text-white/70 text-xs">{pct}%</span>
            </div>
          </div>

          {/* Page curl decoration */}
          <div
            className="absolute -bottom-2 right-4 w-12 h-12 rounded-bl-2xl"
            style={{
              background: "linear-gradient(135deg, transparent 50%, #e9d5ff 50%, #f3e8ff 100%)",
              boxShadow: "-2px 2px 4px rgba(0,0,0,0.1)",
            }}
          />
        </div>

        {/* Chapter accordion */}
        <div className="space-y-3">
          {chapters.map((chapter, ci) => {
            const isOpen = openChapter === chapter.id;
            const chapterCompleted = chapter.lessons.filter(l =>
              completedLessons.includes(`lesson-${l.lessonNumber}`)
            ).length;
            const allDone = chapterCompleted === chapter.lessons.length;

            return (
              <div key={chapter.id} className="relative">
                {/* Connector line between chapters */}
                {ci < chapters.length - 1 && (
                  <div className="absolute left-8 -bottom-3 w-[2px] h-6 bg-white/30 z-0" />
                )}

                {/* Chapter card */}
                <div
                  className="rounded-2xl overflow-hidden shadow-lg transition-all duration-300 relative"
                  style={{
                    background: isOpen ? "white" : "rgba(255,255,255,0.85)",
                    backdropFilter: "blur(12px)",
                    border: isOpen ? `3px solid ${chapter.accent}` : "3px solid transparent",
                    transform: isOpen ? "scale(1.02)" : "scale(1)",
                  }}
                >
                  {/* Chapter header - clickable */}
                  <button
                    onClick={() => setOpenChapter(isOpen ? null : chapter.id)}
                    className="w-full flex items-center gap-4 p-4 text-left group transition-all"
                  >
                    {/* Chapter number badge */}
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl shrink-0 shadow-md transition-transform group-hover:scale-110 group-hover:rotate-3"
                      style={{ background: `linear-gradient(135deg, ${chapter.accent}, ${chapter.accentDark})` }}
                    >
                      {chapter.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className="font-fredoka text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-md text-white"
                          style={{ background: chapter.accent }}
                        >
                          {chapter.label}
                        </span>
                        {allDone && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-nunito font-bold">
                            ✓ Done!
                          </span>
                        )}
                      </div>
                      <h2 className="font-fredoka text-lg text-foreground mt-0.5 truncate">
                        {chapter.subtitle}
                      </h2>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden max-w-[120px]">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${(chapterCompleted / chapter.lessons.length) * 100}%`, background: chapter.accent }}
                          />
                        </div>
                        <span className="font-nunito text-xs text-muted-foreground">
                          {chapterCompleted}/{chapter.lessons.length}
                        </span>
                      </div>
                    </div>

                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 shrink-0"
                      style={{
                        background: `${chapter.accent}15`,
                        transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                      }}
                    >
                      <ArrowRight className="w-4 h-4" style={{ color: chapter.accent }} />
                    </div>
                  </button>

                  {/* Expandable lesson list */}
                  <div
                    className="overflow-hidden transition-all duration-400"
                    style={{
                      maxHeight: isOpen ? `${chapter.lessons.length * 80 + 16}px` : "0px",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="px-4 pb-4 space-y-2">
                      {chapter.lessons.map((lesson, li) => {
                        const lessonId = `lesson-${lesson.lessonNumber}`;
                        const done = completedLessons.includes(lessonId);
                        return (
                          <Link
                            key={lesson.path}
                            to={lesson.path}
                            ref={(el) => { lessonRefs.current[lessonId] = el; }}
                            className="flex items-center gap-3 p-3 rounded-xl group/lesson transition-all hover:shadow-md relative"
                            style={{
                              background: done ? `${chapter.accent}10` : "#f9fafb",
                              border: `1.5px solid ${done ? chapter.accent + "40" : "transparent"}`,
                            }}
                          >
                            {/* Lesson number dot */}
                            <div
                              className="w-10 h-10 rounded-lg flex items-center justify-center text-2xl shrink-0 transition-transform group-hover/lesson:scale-110"
                              style={{ background: `${chapter.accent}15` }}
                            >
                              {lesson.emoji}
                            </div>

                            <div className="flex-1 min-w-0">
                              <h3 className="font-fredoka text-sm text-foreground truncate">
                                <span className="text-muted-foreground">L{lesson.lessonNumber}.</span> {lesson.title}
                              </h3>
                              <p className="font-nunito text-xs text-muted-foreground truncate">{lesson.description}</p>
                            </div>

                            {done ? (
                              <CheckCircle className="w-5 h-5 shrink-0" style={{ color: chapter.accent }} />
                            ) : (
                              <ArrowRight className="w-4 h-4 shrink-0 text-muted-foreground/40 opacity-0 group-hover/lesson:opacity-100 transition-opacity" />
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Assessment cards */}
          <div className="mt-6 space-y-3">
            <div
              className="rounded-2xl p-5 flex items-center gap-4 shadow-lg hover:scale-[1.02] transition-transform cursor-default"
              style={{
                background: "linear-gradient(135deg, #92400e, #b45309)",
                boxShadow: "0 8px 30px rgba(146, 64, 14, 0.3)",
              }}
            >
              <span className="text-4xl">📋</span>
              <div className="flex-1">
                <h3 className="font-fredoka text-lg text-white">Mid-Module Assessment</h3>
                <p className="font-nunito text-sm text-amber-200 italic">Topics A–C · Interview Rubric</p>
              </div>
              <Sparkles className="w-6 h-6 text-amber-300/40" />
            </div>

            <div
              className="rounded-2xl p-5 flex items-center gap-4 shadow-lg hover:scale-[1.02] transition-transform cursor-default"
              style={{
                background: "linear-gradient(135deg, #9f1239, #e11d48)",
                boxShadow: "0 8px 30px rgba(159, 18, 57, 0.3)",
              }}
            >
              <span className="text-4xl">🏆</span>
              <div className="flex-1">
                <h3 className="font-fredoka text-lg text-white">End-of-Module Assessment</h3>
                <p className="font-nunito text-sm text-rose-200 italic">Topics D–F · Interview Rubric</p>
              </div>
              <Sparkles className="w-6 h-6 text-rose-300/40" />
            </div>
          </div>
        </div>

        <p className="text-center font-nunito text-white/60 text-xs mt-8">
          📖 Module 5: Addition & Subtraction Stories and Counting to 20
        </p>
      </div>
    </div>
  );
};

export default Module5Index;

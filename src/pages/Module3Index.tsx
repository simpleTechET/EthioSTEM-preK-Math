import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, CheckCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Lesson {
  path: string;
  lessonNumber: number;
  title: string;
  description: string;
  emoji: string;
  completionId?: string;
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
  icon: string;
  waveFill: string;
  lessons: Lesson[];
}

const topics: Topic[] = [
  {
    id: "A",
    title: "Topic A",
    subtitle: "How Many Questions with up to 7 Objects",
    standards: "PK.CC.1, PK.CC.3abc, PK.CC.4",
    color: "bg-amber-50",
    borderColor: "border-amber-400",
    gradientFrom: "from-amber-400",
    gradientTo: "to-orange-500",
    icon: "🐣",
    waveFill: "#fffbeb",
    lessons: [
      {
        path: "/3-introduce-6-7-lesson-1",
        lessonNumber: 1,
        title: "Introduce 6 and 7",
        description: "Introduce 6 and 7, relate to 5 and 6 and 1 more",
        emoji: "⚽",
      },
      {
        path: "/3-crossing-creek-lesson-2",
        lessonNumber: 2,
        title: "Crossing the Creek",
        description: "Count rocks in a line to cross the creek",
        emoji: "🏞️",
      },
      {
        path: "/3-finger-counting-6-lesson-3",
        lessonNumber: 3,
        title: "Finger Counting to 6",
        description: "Count left to right with hatching chicks",
        emoji: "🐣",
      },
      {
        path: "/3-count-eggs-4",
        lessonNumber: 4,
        title: "Counting Chicks",
        description: "Count to 6 and 7 left to right with fingers",
        emoji: "🐣",
      },
      {
        path: "/3-count-arrays-5",
        lessonNumber: 5,
        title: "Counting in Arrays",
        description: "Count 6 objects in array configurations",
        emoji: "🧦",
      },
    ],
  },
  {
    id: "B",
    title: "Topic B",
    subtitle: "Matching One Numeral with up to 7 Objects",
    standards: "PK.CC.3ab, PK.CC.4",
    color: "bg-purple-50",
    borderColor: "border-purple-400",
    gradientFrom: "from-purple-400",
    gradientTo: "to-pink-500",
    icon: "🔢",
    waveFill: "#faf5ff",
    lessons: [
      {
        path: "/3-compose-six-6",
        lessonNumber: 6,
        title: "Partners of 6",
        description: "Compose 6, decompose into two parts, match to numeral 6",
        emoji: "🧱",
      },
      {
        path: "/3-compose-seven-7",
        lessonNumber: 7,
        title: "Partners of 7",
        description: "Compose 7, decompose into two parts, match to numeral 7",
        emoji: "📅",
      },
      {
        path: "/3-circle-count-8",
        lessonNumber: 8,
        title: "Circle Counting",
        description: "Count 6 and 7 objects in circular configurations",
        emoji: "🔵",
      },
      {
        path: "/3-arrange-count-9",
        lessonNumber: 9,
        title: "Arrange & Count",
        description: "Arrange and count 6 and 7 objects in varied configurations",
        emoji: "🐠",
      },
      {
        path: "/3-tally-10",
        lessonNumber: 10,
        title: "Tally Marks",
        description: "Tally 6 and 7 objects using bundled tally marks",
        emoji: "🌾",
      },
      {
        path: "/3-count-out-11",
        lessonNumber: 11,
        title: "Count Out Groups",
        description: "Look at a numeral and count out a group of up to 7 objects",
        emoji: "🐬",
      },
    ],
  },
  {
    id: "C",
    title: "Topic C",
    subtitle: "How Many Questions with up to 8 Objects",
    standards: "PK.CC.1, PK.CC.3abc, PK.CC.4",
    color: "bg-sky-50",
    borderColor: "border-sky-400",
    gradientFrom: "from-sky-400",
    gradientTo: "to-cyan-500",
    icon: "🐙",
    waveFill: "#f0f9ff",
    lessons: [
      {
        path: "/3-introduce-8-12",
        lessonNumber: 12,
        title: "Introduce 8",
        description: "Introduce 8, and relate 8 to 7 and 1 more",
        emoji: "🐙",
      },
      {
        path: "/3-linear-count-13",
        lessonNumber: 13,
        title: "Linear Count to 8",
        description: "Use linear configurations to count 8 in relation to 5",
        emoji: "🪨",
      },
      {
        path: "/3-finger-count-14",
        lessonNumber: 14,
        title: "Finger Counting to 8",
        description: "Count to 8 from left to right with fingers",
        emoji: "🐣",
      },
      {
        path: "/3-array-count-15",
        lessonNumber: 15,
        title: "Array Configurations",
        description: "Count 8 objects in array configurations",
        emoji: "🕷️",
      },
    ],
  },
  {
    id: "D",
    title: "Topic D",
    subtitle: "Matching One Numeral with up to 8 Objects",
    standards: "PK.CC.3ab, PK.CC.4",
    color: "bg-rose-50",
    borderColor: "border-rose-400",
    gradientFrom: "from-rose-400",
    gradientTo: "to-red-500",
    icon: "👑",
    waveFill: "#fff1f2",
    lessons: [
      {
        path: "/3-compose-8-16",
        lessonNumber: 16,
        title: "Compose & Decompose 8",
        description: "Compose 8, decompose into two parts, match to numeral 8",
        emoji: "🧩",
      },
      {
        path: "/3-circular-count-17",
        lessonNumber: 17,
        title: "Circular Counting to 8",
        description: "Count 8 objects in circular configurations",
        emoji: "🍎",
      },
      {
        path: "/3-arrange-count-18",
        lessonNumber: 18,
        title: "Arrange & Count 8",
        description: "Arrange and count 8 objects in varied configurations",
        emoji: "🌱",
      },
      {
        path: "/3-tally-19",
        lessonNumber: 19,
        title: "Tally 8 Objects",
        description: "Count and tally 8 objects in a garden",
        emoji: "🐝",
      },
      {
        path: "/3-count-out-20",
        lessonNumber: 20,
        title: "Count Out Up to 8",
        description: "Count out up to 8 objects in a cafe role-play",
        emoji: "☕",
      },
    ],
  },
  {
    id: "E",
    title: "Topic E: Zero and 9",
    subtitle: "How Many Questions with 0 up to 9 Objects",
    standards: "PK.CC.1, PK.CC.3abc, PK.CC.4",
    color: "bg-emerald-50",
    borderColor: "border-emerald-400",
    gradientFrom: "from-emerald-400",
    gradientTo: "to-green-500",
    icon: "🎈",
    waveFill: "#ecfdf5",
    lessons: [
      {
        path: "/3-introduce-zero-21",
        lessonNumber: 21,
        title: "Introduce Zero",
        description: "Introduction to the concept of zero with counting flaps",
        emoji: "🎈",
      },
      {
        path: "/3-introduce-9-lesson-22",
        lessonNumber: 22,
        title: "Introduce 9",
        description: "Introduce the number 9 with clapping and building towers",
        emoji: "🏰",
      },
      {
        path: "/3-linear-count-9-lesson-23",
        lessonNumber: 23,
        title: "9 in Relation to 5",
        description: "Count 9 in linear configurations in relation to 5",
        emoji: "🌲",
      },
      {
        path: "/3-finger-count-24",
        lessonNumber: 24,
        title: "0-9 with Fingers",
        description: "Count from 0 up to 9 with fingers",
        emoji: "🖐️",
      },
      {
        path: "/3-array-count-25",
        lessonNumber: 25,
        title: "9 Objects in Arrays",
        description: "Count 9 objects in array configurations",
        emoji: "🎾",
      },
    ],
  },
  {
    id: "F",
    title: "Topic F: Composing 9",
    subtitle: "Matching One Numeral with 0 up to 9 Objects",
    standards: "PK.CC.3ab, PK.CC.4",
    color: "bg-teal-50",
    borderColor: "border-teal-400",
    gradientFrom: "from-teal-400",
    gradientTo: "to-cyan-600",
    icon: "🧩",
    waveFill: "#f0fdfa",
    lessons: [
      {
        path: "/3-compose-9-lesson-26",
        lessonNumber: 26,
        title: "Compose 9",
        description: "Compose and decompose 9 with partners of 9",
        emoji: "🧩",
        completionId: "3-compose-9-26",
      },
      {
        path: "/3-circular-count-9-lesson-27",
        lessonNumber: 27,
        title: "Circular Count 9",
        description: "Count 9 objects in circular configurations",
        emoji: "🐌",
        completionId: "3-circular-9-27",
      },
      {
        path: "/3-arrange-count-28",
        lessonNumber: 28,
        title: "Arrange & Count 9",
        description: "Arrange 9 seeds in arrays, lines, and circles to count",
        emoji: "🌱",
        completionId: "3-arrange-9-28",
      },
      {
        path: "/3-tally-9-lesson-29",
        lessonNumber: 29,
        title: "Tally 9 Objects",
        description: "Seat bees and tally pollen orders up to 9",
        emoji: "🐝",
        completionId: "3-tally-9-29",
      },
    ],
  },
  {
    id: "G",
    title: "Topic G: Number Stairs",
    subtitle: "How Many Questions with up to 10 Objects",
    standards: "PK.CC.1, PK.CC.3abc, PK.CC.4",
    color: "bg-indigo-50",
    borderColor: "border-indigo-400",
    gradientFrom: "from-indigo-400",
    gradientTo: "to-violet-500",
    icon: "🌟",
    waveFill: "#eef2ff",
    lessons: [
      {
        path: "/3-towers-30",
        lessonNumber: 30,
        title: "Building Towers",
        description: "Identify 1 more and build towers to 5",
        emoji: "🏗️",
        completionId: "3-towers-30",
      },
      {
        path: "/3-stairs-31",
        lessonNumber: 31,
        title: "Number Stairs to 5",
        description: "Build number stairs by adding 1 more each time",
        emoji: "🪜",
        completionId: "3-stairs-31",
      },
      {
        path: "/3-climb-stairs-32",
        lessonNumber: 32,
        title: "Climbing Stairs",
        description: "Practice counting up and down number stairs to 5",
        emoji: "🪜",
        completionId: "3-climb-32",
      },
      {
        path: "/3-descending-stairs-33",
        lessonNumber: 33,
        title: "Descending Stairs",
        description: "Identify 1 less and build descending number stairs",
        emoji: "🪜",
        completionId: "3-descending-33",
      },
    ],
  },
  {
    id: "H",
    title: "Topic H: Counting Down",
    subtitle: "Matching One Numeral with up to 10 Objects",
    standards: "PK.CC.3ab, PK.CC.4",
    color: "bg-fuchsia-50",
    borderColor: "border-fuchsia-400",
    gradientFrom: "from-fuchsia-400",
    gradientTo: "to-pink-500",
    icon: "🎯",
    waveFill: "#fdf4ff",
    lessons: [
      {
        path: "/3-penny-staircase-34",
        lessonNumber: 34,
        title: "Penny Staircase",
        description: "Count down from 5 to 1 with pennies",
        emoji: "🪙",
        completionId: "3-penny-34",
      },
      {
        path: "/3-little-crabs-35",
        lessonNumber: 35,
        title: "Five Little Crabs",
        description: "Counting back from 5 using crabs and riddles",
        emoji: "🦀",
        completionId: "3-crabs-35",
      },
      {
        path: "/3-little-fishies-36",
        lessonNumber: 36,
        title: "Five Little Fishies",
        description: "Achieve fluency in counting down from 5 to 1",
        emoji: "🐠",
        completionId: "3-fishies-36",
      },
      {
        path: "/3-culminating-thirty-seven-37",
        lessonNumber: 37,
        title: "Lesson 37: Culminating Task",
        description: "Sort, count, and build with 7 objects",
        emoji: "🎒",
        completionId: "3-culminating-37",
      },
      {
        path: "/3-circular-ten-thirty-eight-38",
        lessonNumber: 38,
        title: "Lesson 38: Circular Ten",
        description: "Count 10 objects in a circle",
        emoji: "🔄",
        completionId: "3-circular-38",
      },
      {
        path: "/3-varied-ten-thirty-nine-39",
        lessonNumber: 39,
        title: "Lesson 39: Varied Ten",
        description: "10 in lines, arrays, and circles",
        emoji: "✨",
        completionId: "3-varied-39",
      },
      {
        path: "/3-tally-ten-forty-40",
        lessonNumber: 40,
        title: "Lesson 40: Tally Ten",
        description: "Represent 10 with tally marks",
        emoji: "🖊️",
        completionId: "3-tally-40",
      },
      {
        path: "/3-count-out-ten-forty-one-41",
        lessonNumber: 41,
        title: "Count Out Ten",
        description: "Serve 10 friends in the café",
        emoji: "🥪",
        completionId: "3-count-out-41",
      },
      {
        path: "/3-number-book-forty-two-42",
        lessonNumber: 42,
        title: "Number Book",
        description: "Represent numbers 6-10",
        emoji: "📖",
        completionId: "3-number-book-42",
      },
    ],
  },
];

const Module3Index = () => {
  const location = useLocation();
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const lessonRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});

  useEffect(() => {
    const saved = localStorage.getItem("ethio-stem-m3-completed");
    if (saved) {
      setCompletedLessons(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const lastId = params.get("last");
    if (lastId && lessonRefs.current[lastId]) {
      setTimeout(() => {
        lessonRefs.current[lastId]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 500);
    }
  }, [location]);

  const resetProgress = () => {
    if (confirm("Reset all your stars? 🌟")) {
      setCompletedLessons([]);
      localStorage.removeItem("ethio-stem-m3-completed");
    }
  };

  return (
    <div className="min-h-screen gradient-sky overflow-hidden relative">
      {/* Clouds */}
      <div className="absolute top-8 left-10 w-20 h-10 bg-white/60 rounded-full blur-sm animate-float" />
      <div className="absolute top-16 right-20 w-28 h-12 bg-white/50 rounded-full blur-sm animate-float" style={{ animationDelay: "1s" }} />
      <div className="absolute top-24 left-1/3 w-16 h-8 bg-white/40 rounded-full blur-sm animate-float" style={{ animationDelay: "0.5s" }} />

      {/* Sun */}
      <div className="absolute top-6 right-8 w-16 h-16 bg-primary rounded-full shadow-lg flex items-center justify-center">
        <div className="w-12 h-12 bg-primary/80 rounded-full" />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10 pb-24">
        <header className="text-center mb-12 relative">
          <Link to="/" className="absolute left-0 top-0">
            <Button variant="ghost" size="icon" className="rounded-full bg-white/50 hover:bg-white border-2 border-white/20">
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </Link>
          <h1 className="font-fredoka text-4xl md:text-5xl text-foreground text-shadow-playful mb-4">
            🌟 EthioSTEM PreK Math 🌟
          </h1>
          <p className="font-nunito text-xl text-foreground/80">
            Module 3: Counting to 10
          </p>
          <Button
            onClick={resetProgress}
            variant="outline"
            size="sm"
            className="mt-4 rounded-full bg-white/30 border-white/50 hover:bg-white/80 text-xs gap-2"
          >
            <RefreshCw className="w-3 h-3" /> Reset Progress
          </Button>
        </header>

        <div className="max-w-3xl mx-auto space-y-6">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className={`${topic.color} rounded-2xl shadow-lg overflow-hidden border-2 ${topic.borderColor} transform transition-all hover:scale-[1.01]`}
            >
              <div className={`relative p-5 bg-gradient-to-r ${topic.gradientFrom} ${topic.gradientTo} overflow-hidden`}>
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-10 w-12 h-12 bg-white/10 rounded-full translate-y-1/2" />
                <div className="absolute top-2 right-20 w-6 h-6 bg-white/20 rounded-full animate-float" />

                <div className="relative flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/30 backdrop-blur-sm flex items-center justify-center shadow-lg transform -rotate-3 hover:rotate-3 transition-transform">
                    <span className="text-4xl">{topic.icon}</span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="bg-white/30 text-white text-xs font-bold px-2 py-1 rounded-full font-nunito">
                        TOPIC {topic.id}
                      </span>
                    </div>
                    <h2 className="font-fredoka text-2xl text-white drop-shadow-md mt-1">
                      {topic.subtitle}
                    </h2>
                    <p className="font-nunito text-xs text-white/80 mt-1">
                      📚 {topic.standards}
                    </p>
                  </div>
                </div>

                <svg className="absolute bottom-0 left-0 right-0 h-3" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 10 Q 10 0, 20 5 T 40 5 T 60 5 T 80 5 T 100 5 L 100 10 Z" style={{ fill: topic.waveFill }} />
                </svg>
              </div>

              <div className="p-4">
                {topic.lessons.length > 0 ? (
                  <div className="space-y-3">
                    {topic.lessons.map((lesson) => {
                      const lessonId = lesson.completionId || lesson.path.split('/').pop() || "";
                      const isCompleted = completedLessons.includes(lessonId);
                      return (
                        <Link
                          key={lesson.path}
                          to={lesson.path}
                          ref={(el) => {
                            if (lessonId) lessonRefs.current[lessonId] = el;
                          }}
                        >
                          <div className="bg-white/80 rounded-xl p-4 hover:scale-[1.02] transition-all cursor-pointer shadow-sm flex items-center gap-4 hover:bg-white relative">
                            <div className="text-4xl">{lesson.emoji}</div>
                            <div className="flex-1">
                              <h3 className="font-fredoka text-lg text-foreground">
                                Lesson {lesson.lessonNumber}: {lesson.title}
                              </h3>
                              <p className="font-nunito text-sm text-muted-foreground">{lesson.description}</p>
                            </div>
                            {isCompleted && (
                              <div className="absolute bottom-2 right-2 text-green-500 animate-in zoom-in duration-300">
                                <CheckCircle className="w-8 h-8 fill-green-50" />
                              </div>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="font-nunito text-muted-foreground text-sm italic">
                      🚧 Lessons coming soon...
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="font-nunito text-foreground/60 text-sm">
            Module 3 covers 50 instructional days across 8 topics
          </p>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 h-16 gradient-grass z-0 pointer-events-none">
        <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full">
          {[...Array(30)].map((_, i) => (
            <path
              key={i}
              d={`M${i * 3.5} 20 Q${i * 3.5 + 1} 10 ${i * 3.5 + 1.5} ${5 + Math.random() * 5} Q${i * 3.5 + 2} 10 ${i * 3.5 + 3} 20`}
              className="fill-grass-dark/60 grass-blade"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default Module3Index;

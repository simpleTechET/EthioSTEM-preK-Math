import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Play, Lock, CheckCircle2 } from "lucide-react";

const Activities = () => {
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  // Load completed lessons from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('ethiostem-completed-lessons');
    if (saved) {
      setCompletedLessons(JSON.parse(saved));
    }
  }, []);

  const isLessonCompleted = (lessonId: number) => {
    return completedLessons.includes(lessonId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-muted">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-foreground">Learning Activities</h1>
            <p className="text-sm text-muted-foreground">Module 1: Counting to 5</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Topic A: Matching Objects */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-success flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Topic A: Matching Objects</h2>
              <p className="text-muted-foreground">Learn to identify and match similar objects</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {matchingLessons.map((lesson) => (
              <Link to={lesson.path} key={lesson.id}>
                <Card className="h-full hover:shadow-playful transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-primary relative">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                        Lesson {lesson.id}
                      </span>
                      {lesson.unlocked ? (
                        <Play className="w-5 h-5 text-success" />
                      ) : (
                        <Lock className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <CardTitle className="text-lg">{lesson.title}</CardTitle>
                    <CardDescription className="text-sm">{lesson.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">{lesson.icon}</span>
                      <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                    </div>
                  </CardContent>
                  {isLessonCompleted(lesson.id) && (
                    <div className="absolute bottom-3 right-3">
                      <CheckCircle2 className="w-6 h-6 text-green-600 fill-green-100" />
                    </div>
                  )}
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Topic B: Sorting */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-warning flex items-center justify-center">
              <span className="text-2xl">🔵</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Topic B: Sorting</h2>
              <p className="text-muted-foreground">Group objects by their attributes</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortingLessons.map((lesson) => (
              lesson.path ? (
                <Link to={lesson.path} key={lesson.id}>
                  <Card className="h-full hover:shadow-playful transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-primary relative">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                          Lesson {lesson.id}
                        </span>
                        <Play className="w-5 h-5 text-success" />
                      </div>
                      <CardTitle className="text-lg">{lesson.title}</CardTitle>
                      <CardDescription className="text-sm">{lesson.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <span className="text-3xl">{lesson.icon}</span>
                        <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                      </div>
                    </CardContent>
                    {isLessonCompleted(lesson.id) && (
                      <div className="absolute bottom-3 right-3">
                        <CheckCircle2 className="w-6 h-6 text-green-600 fill-green-100" />
                      </div>
                    )}
                  </Card>
                </Link>
              ) : (
                <Card key={lesson.id} className="opacity-60 cursor-not-allowed relative">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-muted-foreground bg-muted px-3 py-1 rounded-full">
                        Lesson {lesson.id}
                      </span>
                      <Lock className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-lg text-muted-foreground">{lesson.title}</CardTitle>
                    <CardDescription className="text-sm">{lesson.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">{lesson.icon}</span>
                      <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                    </div>
                  </CardContent>
                </Card>
              )
            ))}
          </div>
        </section>

        {/* Topic C: Counting */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-warning to-primary flex items-center justify-center">
              <span className="text-2xl">🔢</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Topic C: Counting</h2>
              <p className="text-muted-foreground">Learn to count objects up to 3</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {countingLessons.map((lesson) => (
              lesson.path ? (
                <Link to={lesson.path} key={lesson.id}>
                  <Card className="h-full hover:shadow-playful transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-primary relative">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                          Lesson {lesson.id}
                        </span>
                        <Play className="w-5 h-5 text-success" />
                      </div>
                      <CardTitle className="text-lg">{lesson.title}</CardTitle>
                      <CardDescription className="text-sm">{lesson.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <span className="text-3xl">{lesson.icon}</span>
                        <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                      </div>
                    </CardContent>
                    {isLessonCompleted(lesson.id) && (
                      <div className="absolute bottom-3 right-3">
                        <CheckCircle2 className="w-6 h-6 text-green-600 fill-green-100" />
                      </div>
                    )}
                  </Card>
                </Link>
              ) : (
                <Card key={lesson.id} className="opacity-60 cursor-not-allowed relative">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-muted-foreground bg-muted px-3 py-1 rounded-full">
                        Lesson {lesson.id}
                      </span>
                      <Lock className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-lg text-muted-foreground">{lesson.title}</CardTitle>
                    <CardDescription className="text-sm">{lesson.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">{lesson.icon}</span>
                      <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                    </div>
                  </CardContent>
                </Card>
              )
            ))}
          </div>
        </section>

        {/* Coming Soon Section */}
        <section>
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-dashed">
            <CardContent className="text-center py-12">
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold mb-2 text-foreground">More Activities Coming Soon!</h3>
              <p className="text-muted-foreground">
                Complete the matching activities to unlock counting and number lessons
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

const matchingLessons = [
  {
    id: 1,
    title: "Exactly the Same",
    description: "Match objects that are identical",
    icon: "💯",
    duration: "10 min",
    path: "/activity/matching-1",
    unlocked: true
  },
  {
    id: 2,
    title: "Same, But Different Size",
    description: "Match objects that are similar but different sizes",
    icon: "📏",
    duration: "10 min",
    path: "/activity/matching-2",
    unlocked: true
  },
  {
    id: 3,
    title: "Match Fruits",
    description: "Match fruits that are the same type but different sizes",
    icon: "🍎",
    duration: "10 min",
    path: "/activity/matching-3",
    unlocked: true
  },
  {
    id: 4,
    title: "Used Together",
    description: "Match objects that go together",
    icon: "🧩",
    duration: "10 min",
    path: "/activity/matching-4",
    unlocked: true
  }
];

const sortingLessons = [
  {
    id: 5,
    title: "Make One Group",
    description: "Create groups with a given attribute",
    icon: "📦",
    duration: "12 min",
    path: "/activity/sorting-5",
    unlocked: true
  },
  {
    id: 6,
    title: "Sort into Two",
    description: "Divide objects into two groups",
    icon: "⚖️",
    duration: "12 min",
    path: "/activity/sorting-6",
    unlocked: true
  },
  {
    id: 7,
    title: "Two Different Ways",
    description: "Sort the same objects in different ways",
    icon: "🔄",
    duration: "12 min",
    path: "/activity/sorting-7",
    unlocked: true
  }
];

const countingLessons = [
  {
    id: 8,
    title: "Count Up to 3",
    description: "Touch and count objects up to 3",
    icon: "🐻",
    duration: "15 min",
    path: "/activity/counting-8",
    unlocked: true
  },
  {
    id: 9,
    title: "Count Up to 3",
    description: "Arrange and count objects in different ways",
    icon: "🔢",
    duration: "15 min",
    path: "/activity/counting-9",
    unlocked: true
  },
  {
    id: 10,
    title: "Lines & Scattered Groups",
    description: "Count objects in different arrangements",
    icon: "👁️",
    duration: "12 min",
    path: "/activity/counting-10",
    unlocked: true
  },
  {
    id: 11,
    title: "Counting Games",
    description: "Play games with counting and moving",
    icon: "🎮",
    duration: "12 min",
    path: "/activity/counting-11",
    unlocked: true
  },
  {
    id: 12,
    title: "Match Numbers 1, 2, 3",
    description: "Match numerals to quantities",
    icon: "🔢",
    duration: "12 min",
    path: "/activity/counting-12",
    unlocked: true
  },
  {
    id: 13,
    title: "Make Groups & Match Numbers",
    description: "Create groups and match to numerals 1-3",
    icon: "🎲",
    duration: "12 min",
    path: "/activity/counting-13",
    unlocked: true
  },
  {
    id: 14,
    title: "Numbers to Objects",
    description: "Count objects to match numerals 1-3",
    icon: "🧊",
    duration: "12 min",
    path: "/activity/counting-14",
    unlocked: true
  }
];

export default Activities;
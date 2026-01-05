import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Play, Lock, CheckCircle2 } from "lucide-react";

const ActivitiesModule2 = () => {
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

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
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-foreground">Module 2 Activities</h1>
            <p className="text-sm text-muted-foreground">Shapes</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Topic A: Two-Dimensional Shapes */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center">
              <span className="text-2xl">🔷</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Topic A: Two-Dimensional Shapes</h2>
              <p className="text-muted-foreground">Identify, analyze, sort, compare, and position 2D shapes</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {module2TopicALessons.map((lesson) => (
              lesson.path ? (
                <Link to={lesson.path} key={lesson.id}>
                  <Card className="h-full hover:shadow-playful transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-violet-500 bg-gradient-to-br from-violet-50/50 to-indigo-50/50 relative">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-violet-700 bg-violet-100 px-3 py-1 rounded-full">
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
                <Card key={lesson.id} className="opacity-60 cursor-not-allowed relative bg-gradient-to-br from-violet-50/30 to-indigo-50/30">
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

        {/* Topic B: Constructing Two-Dimensional Shapes */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
              <span className="text-2xl">🔨</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Topic B: Constructing Two-Dimensional Shapes</h2>
              <p className="text-muted-foreground">Build shapes from components like sticks and clay</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {module2TopicBLessons.map((lesson) => (
              lesson.path ? (
                <Link to={lesson.path} key={lesson.id}>
                  <Card className="h-full hover:shadow-playful transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-pink-500 bg-gradient-to-br from-pink-50/50 to-rose-50/50 relative">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-pink-700 bg-pink-100 px-3 py-1 rounded-full">
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
                <Card key={lesson.id} className="opacity-60 cursor-not-allowed relative bg-gradient-to-br from-pink-50/30 to-rose-50/30">
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

        {/* Topic C: Three-Dimensional Shapes */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center">
              <span className="text-2xl">📦</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Topic C: Three-Dimensional Shapes</h2>
              <p className="text-muted-foreground">Explore solid shapes and their properties</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {module2TopicCLessons.map((lesson) => (
              lesson.path ? (
                <Link to={lesson.path} key={lesson.id}>
                  <Card className="h-full hover:shadow-playful transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-indigo-500 bg-gradient-to-br from-indigo-50/50 to-blue-50/50 relative">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full">
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
                <Card key={lesson.id} className="opacity-60 cursor-not-allowed relative bg-gradient-to-br from-indigo-50/30 to-blue-50/30">
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
        <section className="mb-16">
  <div className="flex items-center gap-3 mb-6">
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-warning flex items-center justify-center">
      <span className="text-2xl">📋</span>
    </div>
    <div>
      <h2 className="text-2xl font-bold text-foreground">End of Module Assessment</h2>
      <p className="text-muted-foreground">Final evaluation of all Module 2 skills</p>
    </div>
  </div>
  <Link to="/assessment/end-of-module-2">
    <Card className="hover:shadow-playful transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-primary">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
            For Teachers/Parents
          </span>
        </div>
        <CardTitle className="text-xl">End of Module 2 Assessment</CardTitle>
        <CardDescription>Comprehensive evaluation of Topics A-E</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>• Matching and Sorting Objects</p>
          <p>• Counting 1-5</p>
          <p>• Matching Numerals to Quantities</p>
          <p>• Understanding One More and One Less</p>
        </div>
      </CardContent>
    </Card>
  </Link>
</section>
      </div>
    </div>
  );
};

// Copy the lesson arrays from Activities.tsx
const module2TopicALessons = [
  {
    id: 1,
    title: "Shape Detective",
    description: "Find and describe circles, rectangles, squares, and triangles without naming them.",
    icon: "🕵️",
    duration: "15-20 min",
    path: "/activity/shapes-1",
    unlocked: true,
    standards: ["PK.G.1", "PK.G.3"],
    objective: "Find and describe 2D shapes using informal language"
  },
  {
    id: 2,
    title: "Triangle Hunt",
    description: "Identify, analyze, sort, compare, and position triangles.",
    icon: "🔺",
    duration: "15-20 min",
    path: "/activity/shapes-2",
    unlocked: true,
    standards: ["PK.G.2", "PK.G.3", "PK.MD.2"],
    objective: "Identify, analyze, sort, compare, and position triangles"
  },
  {
    id: 3,
    title: "Rectangle and Square Adventure",
    description: "Identify, analyze, sort, compare, and position rectangles and squares.",
    icon: "🟦",
    duration: "15-20 min",
    path: "/activity/shapes-3",
    unlocked: true,
    standards: ["PK.G.2", "PK.G.3", "PK.MD.2"],
    objective: "Identify, analyze, sort, compare, and position rectangles and squares"
  },
  {
    id: 4,
    title: "Circle Explorer",
    description: "Identify, analyze, sort, compare, and position circles.",
    icon: "⭕",
    duration: "15-20 min",
    path: "/activity/shapes-4",
    unlocked: true,
    standards: ["PK.G.2", "PK.G.3", "PK.MD.2"],
    objective: "Identify, analyze, sort, compare, and position circles"
  },
  {
    id: 5,
    title: "Shape Park",
    description: "Identify, analyze, sort, compare, and position circles, rectangles, squares, and triangles in a park scene.",
    icon: "🏞️",
    duration: "15-20 min",
    path: "/activity/shapes-5",
    unlocked: true,
    standards: ["PK.G.1", "PK.G.2", "PK.G.3", "PK.MD.2"],
    objective: "Identify, analyze, sort, compare, and position multiple 2D shapes"
  }
];

const module2TopicBLessons = [
  {
    id: 6,
    title: "Build a Triangle",
    description: "Use straws and clay to construct a triangle with three sides and three corners.",
    icon: "🔺",
    duration: "15-20 min",
    path: "/activity/shapes-6",
    unlocked: true,
    standards: ["PK.G.4"],
    objective: "Construct a triangle from components"
  },
  {
    id: 7,
    title: "Build a Rectangle & Square",
    description: "Use materials to construct rectangles and squares with four sides and corners.",
    icon: "⬜",
    duration: "15-20 min",
    path: "/activity/shapes-7",
    unlocked: true,
    standards: ["PK.G.4"],
    objective: "Construct a rectangle and a square"
  },
  {
    id: 8,
    title: "Build a Circle",
    description: "Create a circle using flexible materials to understand its round shape.",
    icon: "🔵",
    duration: "15-20 min",
    path: "/activity/shapes-8",
    unlocked: true,
    standards: ["PK.G.4"],
    objective: "Construct a circle"
  }
];

const module2TopicCLessons = [
  {
    id: 9,
    title: "Solid Shape Search",
    description: "Find and describe solid shapes (3D objects) using informal language.",
    icon: "🔎",
    duration: "15-20 min",
    path: "/activity/shapes-9",
    unlocked: true,
    standards: ["PK.G.3"],
    objective: "Find and describe solid shapes using informal language"
  },
  {
    id: 10,
    title: "Face Detective",
    description: "Match solid shapes to their two-dimensional faces by analyzing footprints.",
    icon: "👣",
    duration: "15-20 min",
    path: "/activity/shapes-10",
    unlocked: true,
    standards: ["PK.G.3", "PK.MD.2"],
    objective: "Match solid shapes to their 2D faces"
  },
  {
    id: 11,
    title: "Build with Solid Shapes",
    description: "Analyze, sort, compare, and build with solid shapes like cubes, spheres, and cylinders.",
    icon: "🧱",
    duration: "15-20 min",
    path: "/activity/shapes-11",
    unlocked: true,
    standards: ["PK.G.3", "PK.MD.2"],
    objective: "Identify, analyze, sort, compare, and build with solid shapes"
  },
  {
    id: 12,
    title: "Create a Model",
    description: "Position solid shapes to create a model of a familiar place like a classroom or park.",
    icon: "🏗️",
    duration: "15-20 min",
    path: "/activity/shapes-12",
    unlocked: true,
    standards: ["PK.G.1"],
    objective: "Position solid shapes to create a model"
  }
];

export default ActivitiesModule2;
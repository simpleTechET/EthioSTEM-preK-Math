import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Play, Lock, CheckCircle2, Hash, Calculator, Hand, Grid3X3 } from "lucide-react";
import { useEffect, useState } from "react";

const ActivitiesModule3 = () => {
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('completedLessons');
    if (saved) {
      setCompletedLessons(JSON.parse(saved));
    }
  }, []);

  const isLessonCompleted = (lessonId: number) => completedLessons.includes(lessonId);

  // Topic A: How Many Questions with up to 7 Objects (Lessons 1-5)
  const topicALessons = [
    { id: 301, title: "Lesson 1: Introduce 6 and 7", description: "Relate 6 to 5 and 1 more, 7 to 6 and 1 more", icon: Hash, duration: "25 min", path: "/activity/counting-to-seven-1" },
    { id: 302, title: "Lesson 2: Linear Configurations", description: "Count 6 and 7 in relation to 5", icon: Calculator, duration: "25 min", path: "/activity/counting-to-seven-2" },
    { id: 303, title: "Lesson 3: Finger Counting to 6", description: "Count to 6 left to right with fingers", icon: Hand, duration: "25 min", path: null },
    /* REMOTE origin/main alternatives for these lessons (kept commented):
    { id: 301, title: "Lesson 1: Introduce 6 and 7", description: "Relate 6 to 5 and 1 more, 7 to 6 and 1 more", icon: Hash, duration: "25 min", path: "/activity/counting-to-7-intro" },
    { id: 302, title: "Lesson 2: Linear Configurations", description: "Count 6 and 7 in relation to 5", icon: Calculator, duration: "25 min", path: "/activity/counting-to-7-linear" },
    { id: 303, title: "Lesson 3: Finger Counting to 6", description: "Count to 6 left to right with fingers", icon: Hand, duration: "25 min", path: "/activity/finger-counting-6" },
    */
    { id: 304, title: "Lesson 4: Finger Counting to 7", description: "Count to 7 left to right with fingers", icon: Hand, duration: "25 min", path: null },
    { id: 305, title: "Lesson 5: Array Configurations", description: "Count 6 objects in array configurations", icon: Grid3X3, duration: "25 min", path: null },
  ];

  // Topic B: Matching One Numeral with up to 7 Objects (Lessons 6-11)
  const topicBLessons = [
    { id: 306, title: "Lesson 6: Compose and Decompose 6", description: "Decompose into two parts, match to numeral 6", icon: Hash, duration: "25 min", path: null },
    { id: 307, title: "Lesson 7: Compose and Decompose 7", description: "Decompose into two parts, match to numeral 7", icon: Hash, duration: "25 min", path: null },
    { id: 308, title: "Lesson 8: Circular Configurations", description: "Count 6 and 7 objects in circular configurations", icon: Calculator, duration: "25 min", path: null },
    { id: 309, title: "Lesson 9: Varied Configurations", description: "Arrange and count 6 and 7 objects", icon: Grid3X3, duration: "25 min", path: null },
    { id: 310, title: "Lesson 10: Tally 6 and 7", description: "Tally 6 and 7 objects", icon: Hash, duration: "25 min", path: null },
    { id: 311, title: "Lesson 11: Count Out Objects", description: "Look at a numeral and count out up to 7 objects", icon: Calculator, duration: "25 min", path: null },
  ];

  // Topic C: How Many Questions with up to 8 Objects (Lessons 12-15)
  const topicCLessons = [
    { id: 312, title: "Lesson 12: Introduce 8", description: "Relate 8 to 7 and 1 more", icon: Hash, duration: "25 min", path: null },
    { id: 313, title: "Lesson 13: Linear Configurations", description: "Count 8 in relation to 5", icon: Calculator, duration: "25 min", path: null },
    { id: 314, title: "Lesson 14: Finger Counting to 8", description: "Count to 8 from left to right with fingers", icon: Hand, duration: "25 min", path: null },
    { id: 315, title: "Lesson 15: Array Configurations", description: "Count 8 objects in array configurations", icon: Grid3X3, duration: "25 min", path: null },
  ];

  // Topic D: Matching One Numeral with up to 8 Objects (Lessons 16-20)
  const topicDLessons = [
    { id: 316, title: "Lesson 16: Compose and Decompose 8", description: "Decompose into two parts, match to numeral 8", icon: Hash, duration: "25 min", path: null },
    { id: 317, title: "Lesson 17: Circular Configurations", description: "Count 8 objects in circular configurations", icon: Calculator, duration: "25 min", path: null },
    { id: 318, title: "Lesson 18: Varied Configurations", description: "Arrange and count 8 objects", icon: Grid3X3, duration: "25 min", path: null },
    { id: 319, title: "Lesson 19: Tally 8 Objects", description: "Tally 8 objects", icon: Hash, duration: "25 min", path: null },
    { id: 320, title: "Lesson 20: Count Out Objects", description: "Look at a numeral and count out up to 8 objects", icon: Calculator, duration: "25 min", path: null },
  ];

  // Topic E: How Many Questions with 0 up to 9 Objects (Lessons 21-25)
  const topicELessons = [
    { id: 321, title: "Lesson 21: Introduce Zero", description: "Understand the concept of zero", icon: Hash, duration: "25 min", path: null },
    { id: 322, title: "Lesson 22: Introduce 9", description: "Relate 9 to 8 and 1 more", icon: Hash, duration: "25 min", path: null },
    { id: 323, title: "Lesson 23: Linear Configurations", description: "Count 9 in relation to 5", icon: Calculator, duration: "25 min", path: null },
    { id: 324, title: "Lesson 24: Finger Counting 0-9", description: "Count from 0 to 9 with fingers", icon: Hand, duration: "25 min", path: null },
    { id: 325, title: "Lesson 25: Array Configurations", description: "Count 9 objects in array configurations", icon: Grid3X3, duration: "25 min", path: null },
  ];

  // Topic F: Matching One Numeral with 0 up to 9 Objects (Lessons 26-30)
  const topicFLessons = [
    { id: 326, title: "Lesson 26: Compose and Decompose 9", description: "Match numerals 0 and 9 to objects", icon: Hash, duration: "25 min", path: null },
    { id: 327, title: "Lesson 27: Circular Configurations", description: "Count 9 objects in circular configurations", icon: Calculator, duration: "25 min", path: null },
    { id: 328, title: "Lesson 28: Varied Configurations", description: "Arrange and count 9 objects", icon: Grid3X3, duration: "25 min", path: null },
    { id: 329, title: "Lesson 29: Tally 9 Objects", description: "Tally 9 objects", icon: Hash, duration: "25 min", path: null },
    { id: 330, title: "Lesson 30: Count Out Objects", description: "Look at a numeral and count out up to 9 objects", icon: Calculator, duration: "25 min", path: null },
  ];

  // Topic G: How Many Questions with up to 10 Objects (Lessons 31-34)
  const topicGLessons = [
    { id: 331, title: "Lesson 31: Introduce 10", description: "Relate 10 to 9 and 1 more", icon: Hash, duration: "25 min", path: null },
    { id: 332, title: "Lesson 32: Linear Configurations", description: "Count 10 in relation to 5", icon: Calculator, duration: "25 min", path: null },
    { id: 333, title: "Lesson 33: Finger Counting 0-10", description: "Count from 0 to 10 with fingers", icon: Hand, duration: "25 min", path: null },
    { id: 334, title: "Lesson 34: Array Configurations", description: "Count 10 objects in array configurations", icon: Grid3X3, duration: "25 min", path: null },
  ];

  // Topic H: Matching One Numeral with up to 10 Objects (Lessons 35-42)
  const topicHLessons = [
    { id: 335, title: "Lesson 35: Compose and Decompose 10", description: "Match to the numeral 10", icon: Hash, duration: "25 min", path: null },
    { id: 336, title: "Lesson 36: Decompose 6-10", description: "Decompose numbers 6-10", icon: Calculator, duration: "25 min", path: null },
    { id: 337, title: "Lesson 37: Circular Configurations", description: "Count 10 objects in circular configurations", icon: Grid3X3, duration: "25 min", path: null },
    { id: 338, title: "Lessons 38-39: Varied Configurations", description: "Count up to 10 objects in varied configurations", icon: Grid3X3, duration: "50 min", path: null },
    { id: 340, title: "Lesson 40: Tally 10 Objects", description: "Tally 10 objects", icon: Hash, duration: "25 min", path: null },
    { id: 341, title: "Lesson 41: Count Out Objects", description: "Look at a numeral and count out up to 10 objects", icon: Calculator, duration: "25 min", path: null },
    { id: 342, title: "Lesson 42: Number Book", description: "Represent numbers 6-10 using objects, images, and numerals", icon: Hash, duration: "25 min", path: null },
  ];

  const renderLessonCard = (lesson: typeof topicALessons[0]) => (
    <Card key={lesson.id} className={`${lesson.path ? 'hover:shadow-lg transition-shadow cursor-pointer' : 'opacity-60'} ${isLessonCompleted(lesson.id) ? 'border-success' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <lesson.icon className="h-8 w-8 text-primary" />
          <span className="text-xs text-muted-foreground">{lesson.duration}</span>
        </div>
        <CardTitle className="text-lg">{lesson.title}</CardTitle>
        <CardDescription>{lesson.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {lesson.path ? (
          <Link to={lesson.path} className="flex items-center gap-2 text-primary hover:underline">
            <Play className="h-4 w-4" />
            <span>Start Lesson</span>
            {isLessonCompleted(lesson.id) && <CheckCircle2 className="h-4 w-4 text-success ml-auto" />}
          </Link>
        ) : (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Lock className="h-4 w-4" />
            <span>Coming Soon</span>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <header className="bg-primary text-primary-foreground py-4 px-6 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Link to="/activities" className="hover:opacity-80">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Module 3: Counting to 10</h1>
            <p className="text-primary-foreground/80 text-sm">50 Instructional Days</p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-8 px-6 space-y-12">
        {/* Topic A */}
        <section>
          <h2 className="text-2xl font-bold mb-2 text-foreground">Topic A: How Many Questions with up to 7 Objects</h2>
          <p className="text-muted-foreground mb-4">5 Lessons • Introduce 6 and 7, linear configurations, finger counting, arrays</p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {topicALessons.map(renderLessonCard)}
          </div>
        </section>

        {/* Topic B */}
        <section>
          <h2 className="text-2xl font-bold mb-2 text-foreground">Topic B: Matching One Numeral with up to 7 Objects</h2>
          <p className="text-muted-foreground mb-4">6 Lessons • Compose/decompose, circular configurations, tallying</p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {topicBLessons.map(renderLessonCard)}
          </div>
        </section>

        {/* Topic C */}
        <section>
          <h2 className="text-2xl font-bold mb-2 text-foreground">Topic C: How Many Questions with up to 8 Objects</h2>
          <p className="text-muted-foreground mb-4">4 Lessons • Introduce 8, linear configurations, finger counting, arrays</p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {topicCLessons.map(renderLessonCard)}
          </div>
        </section>

        {/* Topic D */}
        <section>
          <h2 className="text-2xl font-bold mb-2 text-foreground">Topic D: Matching One Numeral with up to 8 Objects</h2>
          <p className="text-muted-foreground mb-4">5 Lessons • Compose/decompose 8, circular configurations, tallying</p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {topicDLessons.map(renderLessonCard)}
          </div>
        </section>

        {/* Mid-Module Assessment */}
        <section>
          <Card className="border-warning bg-warning/5">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Calculator className="h-6 w-6 text-warning" />
                Mid-Module Assessment
              </CardTitle>
              <CardDescription>Topics A-D • Numbers 1-8 • Interview Style (4 days)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Lock className="h-4 w-4" />
                <span>Coming Soon</span>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Topic E */}
        <section>
          <h2 className="text-2xl font-bold mb-2 text-foreground">Topic E: How Many Questions with 0 up to 9 Objects</h2>
          <p className="text-muted-foreground mb-4">5 Lessons • Introduce zero and 9, linear configurations, finger counting, arrays</p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {topicELessons.map(renderLessonCard)}
          </div>
        </section>

        {/* Topic F */}
        <section>
          <h2 className="text-2xl font-bold mb-2 text-foreground">Topic F: Matching One Numeral with 0 up to 9 Objects</h2>
          <p className="text-muted-foreground mb-4">5 Lessons • Compose/decompose 9, circular configurations, tallying</p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {topicFLessons.map(renderLessonCard)}
          </div>
        </section>

        {/* Topic G */}
        <section>
          <h2 className="text-2xl font-bold mb-2 text-foreground">Topic G: How Many Questions with up to 10 Objects</h2>
          <p className="text-muted-foreground mb-4">4 Lessons • Introduce 10, linear configurations, finger counting, arrays</p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {topicGLessons.map(renderLessonCard)}
          </div>
        </section>

        {/* Topic H */}
        <section>
          <h2 className="text-2xl font-bold mb-2 text-foreground">Topic H: Matching One Numeral with up to 10 Objects</h2>
          <p className="text-muted-foreground mb-4">8 Lessons • Compose/decompose 10, culminating number book</p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {topicHLessons.map(renderLessonCard)}
          </div>
        </section>

        {/* End-of-Module Assessment */}
        <section>
          <Card className="border-primary bg-primary/5">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Calculator className="h-6 w-6 text-primary" />
                End-of-Module Assessment
              </CardTitle>
              <CardDescription>Topics E-H • Numbers 0-10 • Interview Style (4 days)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Lock className="h-4 w-4" />
                <span>Coming Soon</span>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default ActivitiesModule3;
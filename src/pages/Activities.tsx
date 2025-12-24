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
                <Card className="h-full hover:shadow-playful transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-green-500 bg-gradient-to-br from-green-50/50 to-emerald-50/50 relative"
>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full">
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
                  <Card className="h-full hover:shadow-playful transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-amber-500 bg-gradient-to-br from-amber-50/50 to-yellow-50/50 relative">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
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
                  <Card className="h-full hover:shadow-playful transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-orange-500 bg-gradient-to-br from-orange-50/50 to-red-50/50 relative">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-orange-700 bg-orange-100 px-3 py-1 rounded-full">
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
        
        {/* Topic D: Matching Numerals to Quantities */}
        <section className="mb-16">
  <div className="flex items-center gap-3 mb-6">
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
      <span className="text-2xl">🔢</span>
    </div>
    <div>
      <h2 className="text-2xl font-bold text-foreground">Topic D: Matching Numerals to Quantities</h2>
      <p className="text-muted-foreground">Connect numbers to groups of objects</p>
    </div>
  </div>
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
    {topicDLessons.map((lesson) => (
      lesson.path ? (
        <Link to={lesson.path} key={lesson.id}>
          <Card className="h-full hover:shadow-playful transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-purple-500 bg-gradient-to-br from-purple-50/50 to-pink-50/50 relative">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
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
        <Card key={lesson.id} className="opacity-60 cursor-not-allowed relative bg-gradient-to-br from-purple-50/30 to-pink-50/30">
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
      <h2 className="text-2xl font-bold text-foreground">Assessment</h2>
      <p className="text-muted-foreground">Track student progress and understanding</p>
    </div>
  </div>
  <Link to="/assessment/mid-module-1">
    <Card className="hover:shadow-playful transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-primary">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
            For Teachers/Parents
          </span>
        </div>
        <CardTitle className="text-xl">Mid-Module 1 Assessment</CardTitle>
        <CardDescription>Evaluate student understanding of Topics A-D</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>• Matching Objects</p>
          <p>• Sorting</p>
          <p>• Counting 1-3</p>
          <p>• Matching Numerals to Quantities</p>
        </div>
      </CardContent>
    </Card>
  </Link>
</section>

{/* Topic E: How Many Questions with 4 or 5 Objects */}
<section className="mb-16">
  <div className="flex items-center gap-3 mb-6">
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
      <span className="text-2xl">🐠</span>
    </div>
    <div>
      <h2 className="text-2xl font-bold text-foreground">Topic E: How Many Questions with 4 or 5 Objects</h2>
      <p className="text-muted-foreground">Count and arrange groups of 4-5 objects</p>
    </div>
  </div>
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
    {topicELessons.map((lesson) => (
      lesson.path ? (
        <Link to={lesson.path} key={lesson.id}>
          <Card className="h-full hover:shadow-playful transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-blue-500 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 relative">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
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
        <Card key={lesson.id} className="opacity-60 cursor-not-allowed relative bg-gradient-to-br from-blue-50/30 to-cyan-50/30">
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
{/* Topic F: Matching 1 Numeral with up to 5 Objects */}
<section className="mb-16">
  <div className="flex items-center gap-3 mb-6">
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
      <span className="text-2xl">🔢</span>
    </div>
    <div>
      <h2 className="text-2xl font-bold text-foreground">Topic F: Matching 1 Numeral with up to 5 Objects</h2>
      <p className="text-muted-foreground">Connect quantities to written numerals 1-5</p>
    </div>
  </div>
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
    {topicFLessons.map((lesson) => (
      lesson.path ? (
        <Link to={lesson.path} key={lesson.id}>
          <Card className="h-full hover:shadow-playful transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-purple-500 bg-gradient-to-br from-purple-50/50 to-pink-50/50 relative">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
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
        <Card key={lesson.id} className="opacity-60 cursor-not-allowed relative bg-gradient-to-br from-purple-50/30 to-pink-50/30">
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
{/* Topic G: One More with Numbers 1 to 5 */}
<section className="mb-16">
  <div className="flex items-center gap-3 mb-6">
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-green-500 flex items-center justify-center">
      <span className="text-2xl">➕</span>
    </div>
    <div>
      <h2 className="text-2xl font-bold text-foreground">Topic G: One More with Numbers 1 to 5</h2>
      <p className="text-muted-foreground">Understand that each number is one more than the previous</p>
    </div>
  </div>
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
    {topicGLessons.map((lesson) => (
      lesson.path ? (
        <Link to={lesson.path} key={lesson.id}>
          <Card className="h-full hover:shadow-playful transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-teal-500 bg-gradient-to-br from-teal-50/50 to-green-50/50 relative">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-teal-700 bg-teal-100 px-3 py-1 rounded-full">
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
        <Card key={lesson.id} className="opacity-60 cursor-not-allowed relative bg-gradient-to-br from-teal-50/30 to-green-50/30">
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
{/* Topic H: Counting 5, 4, 3, 2, 1 */}
<section className="mb-16">
  <div className="flex items-center gap-3 mb-6">
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-red-500 flex items-center justify-center">
      <span className="text-2xl">⬇️</span>
    </div>
    <div>
      <h2 className="text-2xl font-bold text-foreground">Topic H: Counting 5, 4, 3, 2, 1</h2>
      <p className="text-muted-foreground">Count down and understand 1 less</p>
    </div>
  </div>
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
    {topicHLessons.map((lesson) => (
      lesson.path ? (
        <Link to={lesson.path} key={lesson.id}>
          <Card className="h-full hover:shadow-playful transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-rose-500 bg-gradient-to-br from-rose-50/50 to-red-50/50 relative">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-rose-700 bg-rose-100 px-3 py-1 rounded-full">
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
        <Card key={lesson.id} className="opacity-60 cursor-not-allowed relative bg-gradient-to-br from-rose-50/30 to-red-50/30">
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
{/* End of Module 1 Assessment */}
<section className="mb-16">
  <div className="flex items-center gap-3 mb-6">
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-warning flex items-center justify-center">
      <span className="text-2xl">📋</span>
    </div>
    <div>
      <h2 className="text-2xl font-bold text-foreground">End of Module Assessment</h2>
      <p className="text-muted-foreground">Final evaluation of all Module 1 skills</p>
    </div>
  </div>
  <Link to="/assessment/end-of-module-1">
    <Card className="hover:shadow-playful transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-primary">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
            For Teachers/Parents
          </span>
        </div>
        <CardTitle className="text-xl">End of Module 1 Assessment</CardTitle>
        <CardDescription>Comprehensive evaluation of Topics A-H</CardDescription>
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
  }
];
const topicDLessons = [
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

const topicELessons = [
  {
    id: 15,
    title: "Fishy Friends Counting",
    description: "Help the fish play tag and line up to escape the shark!",
    icon: "🐠",
    duration: "15-20 min",
    path: "/activity/counting-15",
    unlocked: true
  },
  {
    id: 16, 
    title: "Family Photo Counting",
    description: "Count family members in photos and tell how many!",
    icon: "👨‍👩‍👧‍👦",
    duration: "15-20 min",
    path: "/activity/counting-16",
    unlocked: true
  },
  {
    id: 17,
    title: "Piano Finger Counting",
    description: "Play the piano and count your fingers the Math Way!",
    icon: "🎹",
    duration: "15-20 min",
    path: "/activity/counting-17",
    unlocked: true
  },
  {
    id: 18,
    title: "Toy Store Arrays",
    description: "Help organize toys in the toy store display!",
    icon: "🧸",
    duration: "15-20 min",
    path: "/activity/counting-18",
    unlocked: true
  },
  {
    id: 19,
    title: "Number Partners Discovery",
    description: "Break apart groups to find number partners hiding inside!",
    icon: "🔍",
    duration: "15-20 min", 
    path: "/activity/counting-19",
    unlocked: true
  },
      {
    id: 20,
    title: "Circle of Friends",
    topic: "Topic E: How Many Questions with 4 or 5 Objects",
    standards: ["PK.CC.1", "PK.CC.3ab", "PK.CC.4"],
    objective: "Arrange and count 5 objects in a circular configuration",
    description: "Count friends sitting in a circle without losing your place!",
    icon: "⭕",
    color: "red",
    difficulty: "intermediate",
    duration: "15-20 min",
    learningGoals: [
      "Count objects in circular arrangements",
      "Use strategies to mark starting points",
      "Develop accurate counting in tricky configurations"
    ],
      path: "/activity/counting-20",
    unlocked: true
  }
];

const topicFLessons = [
  {
  id: 21,
  title: "Number Match Adventure",
  description: "Count up to 4 objects and find the matching numeral!",
  icon: "🔢",
  duration: "15-20 min",
  path: "/activity/matching-21",
  unlocked: true,
  standards: ["PK.CC.2", "PK.CC.3ab", "PK.CC.4"],
  objective: "Count up to 4 objects and match the numerals",
  type: "matching"
},
 {
    id: 22,
    title: "Five Friends Matching", 
    description: "Count up to 5 objects and match them with numerals!",
    icon: "5️⃣",
    duration: "15-20 min",
    path: "/activity/matching-22",
    unlocked: true
  },
  {
  id: 23,
  title: "Dice & Object Match",
  description: "Roll the dice, count the dots, and create matching groups!",
  icon: "🎲",
  duration: "15-20 min",
  path: "/activity/matching-23",
  unlocked: true,
  standards: ["PK.CC.2", "PK.CC.3ab", "PK.CC.4"],
  objective: "Make a group of up to 5 objects and match the numeral (concrete to abstract)"
},
{
  id: 24,
  title: "Numeral to Objects",
  description: "Look at numerals and count out matching groups of objects!",
  icon: "👀",
  duration: "15-20 min",
  path: "/activity/matching-24", 
  unlocked: true,
  standards: ["PK.CC.2", "PK.CC.3ab", "PK.CC.4"],
  objective: "Look at a numeral and count out a group of objects to match (abstract to concrete)"
},
{
  id: 25,
  title: "My Number Book - Part 1",
  description: "Create your own number book with objects and pictures for numbers 1-5!",
  icon: "📖",
  duration: "15-20 min",
  path: "/activity/matching-25",
  unlocked: true,
  standards: ["PK.CC.2", "PK.CC.3ab", "PK.CC.4"],
  objective: "Represent numbers 1-5 using objects and pictures"
},
{
  id: 26, 
  title: "My Number Book - Part 2",
  description: "Finish your number book by adding numerals to your object collections!",
  icon: "✏️",
  duration: "15-20 min",
  path: "/activity/matching-26",
  unlocked: true,
  standards: ["PK.CC.2", "PK.CC.3ab", "PK.CC.4"],
  objective: "Represent numbers 1-5 using numerals"
},
{
  id: 27,
  title: "Number Bingo Bonanza",
  description: "Play bingo with numerals and object groups - match and win!",
  icon: "🎯",
  duration: "15-20 min",
  path: "/activity/matching-27",
  unlocked: true,
  standards: ["PK.CC.2", "PK.CC.3ab", "PK.CC.4"],
  objective: "Play a game involving numbers to 5"
}];

const topicGLessons = [
// topic g
{
  id: 28,
  title: "Snake Path Parade",
  description: "Count snakes 1-5 as they leave slithery paths in the sand!",
  icon: "🐍",
  duration: "15-20 min",
  path: "/activity/matching-28",
  unlocked: true,
  standards: ["PK.CC.3c", "PK.CC.2"],
  objective: "Count 1, 2, 3, 4, 5 objects in sequence with stories"
},
{
  id: 29,
  title: "Beanbag Toss Challenge",
  description: "Toss beanbags into hoops and discover you need 1 more to match the number!",
  icon: "🎯",
  duration: "15-20 min",
  path: "/activity/matching-29",
  unlocked: true,
  standards: ["PK.CC.3c", "PK.CC.2"],
  objective: "Find 1 more object needed to match a given numeral"
},
   {
    id: 30,
    title: "Tower Building Adventure",
    description: "Build towers by adding 1 more cube at a time!",
    icon: "🧱",
    duration: "15-20 min",
    path: "/activity/matching-30",
    unlocked: true,
    standards: ["PK.CC.3c", "PK.CC.5"],
    objective: "Build a tower by putting 1 more cube or block at a time"
  },
  {
    id: 31,
    title: "Number Stairs Builder",
    description: "Build number stairs showing 1 more with each step!",
    icon: "📶",
    duration: "15-20 min",
    path: "/activity/matching-31",
    unlocked: true,
    standards: ["PK.CC.3c", "PK.OA.2", "PK.CC.5"],
    objective: "Build number stairs showing 1 more with cubes"
  },
  {
    id: 32,
    title: "What Comes Next?",
    description: "Count up and discover what number comes after!",
    icon: "⏭️",
    duration: "15-20 min",
    path: "/activity/matching-32",
    unlocked: true,
    standards: ["PK.CC.3c", "PK.CC.2"],
    objective: "Count up—What comes after?"
  }];

  const topicHLessons = [{
    id: 33,
    title: "Building Down Stairs (Part 1)",
    description: "Build step-down stairs with cubes from 5 to 1.",
    icon: "📉",
    duration: "15-20 min",
    path: "/activity/matching-33",
    unlocked: true,
    standards: ["PK.CC.3c", "PK.CC.4"],
    objective: "Build descending number stairs at the concrete level"
  },
  {
    id: 34,
    title: "Building Down Stairs (Part 2)",
    description: "Match pennies and stickers to numerals 5-4-3-2-1.",
    icon: "🪙",
    duration: "15-20 min",
    path: "/activity/matching-34",
    unlocked: true,
    standards: ["PK.CC.3c", "PK.CC.4"],
    objective: "Build descending number stairs at pictorial/abstract levels"
  },
  {
    id: 35,
    title: "Five Little Crabs",
    description: "Count down from 5 to 1 as waves wash crabs away!",
    icon: "🦀",
    duration: "15-20 min",
    path: "/activity/matching-35",
    unlocked: true,
    standards: ["PK.CC.3c", "PK.OA.2"],
    objective: "Count 5, 4, 3, 2, 1 using a story and fingers"
  },
  {
    id: 36,
    title: "Five Little Fishies",
    description: "Count down as Mr. Shark snaps up fish one by one!",
    icon: "🦈",
    duration: "15-20 min",
    path: "/activity/matching-36",
    unlocked: true,
    standards: ["PK.CC.3c", "PK.OA.2"],
    objective: "Count 5, 4, 3, 2, 1 using a story and fingers"
  },
  {
    id: 37,
    title: "Culminating Task",
    description: "Sort objects, count them, and build towers with numerals!",
    icon: "🏆",
    duration: "15-20 min",
    path: "/activity/matching-37",
    unlocked: true,
    standards: ["PK.CC.1", "PK.CC.2", "PK.CC.3", "PK.CC.4", "PK.MD.2"],
    objective: "Sort, count, and represent groups with towers and numerals"
  }
];

const module2TopicALessons = [
  {
    id: 38,
    title: "Shape Detective",
    description: "Find and describe circles, rectangles, squares, and triangles without naming them.",
    icon: "🕵️",
    duration: "15-20 min",
    path: "/activity/shapes-38",
    unlocked: true,
    standards: ["PK.G.1", "PK.G.3"],
    objective: "Find and describe 2D shapes using informal language"
  },
  {
    id: 39,
    title: "Triangle Hunt",
    description: "Identify, analyze, sort, compare, and position triangles.",
    icon: "🔺",
    duration: "15-20 min",
    path: "/activity/shapes-39",
    unlocked: true,
    standards: ["PK.G.2", "PK.G.3", "PK.MD.2"],
    objective: "Identify, analyze, sort, compare, and position triangles"
  },
  {
    id: 40,
    title: "Rectangle and Square Adventure",
    description: "Identify, analyze, sort, compare, and position rectangles and squares.",
    icon: "🟦",
    duration: "15-20 min",
    path: "/activity/shapes-40",
    unlocked: true,
    standards: ["PK.G.2", "PK.G.3", "PK.MD.2"],
    objective: "Identify, analyze, sort, compare, and position rectangles and squares"
  },
  {
    id: 41,
    title: "Circle Explorer",
    description: "Identify, analyze, sort, compare, and position circles.",
    icon: "⭕",
    duration: "15-20 min",
    path: "/activity/shapes-41",
    unlocked: true,
    standards: ["PK.G.2", "PK.G.3", "PK.MD.2"],
    objective: "Identify, analyze, sort, compare, and position circles"
  },
  {
    id: 42,
    title: "Shape Park",
    description: "Identify, analyze, sort, compare, and position circles, rectangles, squares, and triangles in a park scene.",
    icon: "🏞️",
    duration: "15-20 min",
    path: "/activity/shapes-42",
    unlocked: true,
    standards: ["PK.G.1", "PK.G.2", "PK.G.3", "PK.MD.2"],
    objective: "Identify, analyze, sort, compare, and position multiple 2D shapes"
  }
];
const module2TopicBLessons = [
  {
    id: 43,
    title: "Build a Triangle",
    description: "Use straws and clay to construct a triangle with three sides and three corners.",
    icon: "🔺",
    duration: "15-20 min",
    path: "/activity/shapes-43",
    unlocked: true,
    standards: ["PK.G.4"],
    objective: "Construct a triangle from components"
  },
  {
    id: 44,
    title: "Build a Rectangle & Square",
    description: "Use materials to construct rectangles and squares with four sides and corners.",
    icon: "⬜",
    duration: "15-20 min",
    path: "/activity/shapes-44",
    unlocked: true,
    standards: ["PK.G.4"],
    objective: "Construct a rectangle and a square"
  },
  {
    id: 45,
    title: "Build a Circle",
    description: "Create a circle using flexible materials to understand its round shape.",
    icon: "🔵",
    duration: "15-20 min",
    path: "/activity/shapes-45",
    unlocked: true,
    standards: ["PK.G.4"],
    objective: "Construct a circle"
  }
];

const module2TopicCLessons = [
  {
    id: 46,
    title: "Solid Shape Search",
    description: "Find and describe solid shapes (3D objects) using informal language.",
    icon: "🔎",
    duration: "15-20 min",
    path: "/activity/shapes-46",
    unlocked: true,
    standards: ["PK.G.3"],
    objective: "Find and describe solid shapes using informal language"
  },
  {
    id: 47,
    title: "Face Detective",
    description: "Match solid shapes to their two-dimensional faces by analyzing footprints.",
    icon: "👣",
    duration: "15-20 min",
    path: "/activity/shapes-47",
    unlocked: true,
    standards: ["PK.G.3", "PK.MD.2"],
    objective: "Match solid shapes to their 2D faces"
  },
  {
    id: 48,
    title: "Build with Solid Shapes",
    description: "Analyze, sort, compare, and build with solid shapes like cubes, spheres, and cylinders.",
    icon: "🧱",
    duration: "15-20 min",
    path: "/activity/shapes-48",
    unlocked: true,
    standards: ["PK.G.3", "PK.MD.2"],
    objective: "Identify, analyze, sort, compare, and build with solid shapes"
  },
  {
    id: 49,
    title: "Create a Model",
    description: "Position solid shapes to create a model of a familiar place like a classroom or park.",
    icon: "🏗️",
    duration: "15-20 min",
    path: "/activity/shapes-49",
    unlocked: true,
    standards: ["PK.G.1"],
    objective: "Position solid shapes to create a model"
  }
];
export default Activities;
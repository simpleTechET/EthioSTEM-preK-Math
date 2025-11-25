import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Star, BookOpen, Users, Lightbulb, CheckCircle2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { shuffleArray } from "@/lib/utils";

// Import bear images
import bearBlue from "@/assets/bear-blue.png";

interface CountingOption {
  value: number;
  label: string;
}

const CountingActivity8 = () => {
  const [currentActivity, setCurrentActivity] = useState("intro");
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const navigate = useNavigate();

  // Questions with different bear counts
  const questions = [
    { bears: 1, correctAnswer: 1 },
    { bears: 2, correctAnswer: 2 },
    { bears: 3, correctAnswer: 3 },
  ];

  const currentQ = questions[currentQuestion];

  const markLessonComplete = (lessonId: number) => {
    const saved = localStorage.getItem('ethiostem-completed-lessons');
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes(lessonId)) {
      completed.push(lessonId);
      localStorage.setItem('ethiostem-completed-lessons', JSON.stringify(completed));
    }
  };

  const handleComplete = () => {
    markLessonComplete(8);
    navigate("/activities");
  };
  
  // Shuffled answer options for each question
  const answerOptions = useMemo(() => {
    return shuffleArray<CountingOption>([
      { value: 1, label: "1" },
      { value: 2, label: "2" },
      { value: 3, label: "3" },
    ]);
  }, [currentQuestion]);

  const handleAnswerClick = (answer: number) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === currentQ.correctAnswer;

    if (isCorrect) {
      toast.success("Perfect! 🎉", {
        description: `Yes! There ${currentQ.correctAnswer === 1 ? 'is' : 'are'} ${currentQ.correctAnswer} bear${currentQ.correctAnswer > 1 ? 's' : ''}!`,
      });

      if (currentQuestion < questions.length - 1) {
        setTimeout(() => {
          setCurrentQuestion((q) => q + 1);
          setSelectedAnswer(null);
        }, 1500);
      } else {
        setIsComplete(true);
        markLessonComplete(8);
        setTimeout(() => setCurrentActivity("complete"), 1500);
      }
    } else {
      toast.error("Not quite! 💭", {
        description: "Try counting again. Touch each bear as you count!",
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/activities" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back to Activities</span>
          </Link>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary">Lesson 8</h1>
            <p className="text-sm text-muted-foreground">Count Up to 3</p>
          </div>
          <div className="w-24" />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="intro" value={currentActivity} onValueChange={setCurrentActivity}>
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="intro">Introduction</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
            <TabsTrigger value="complete">Complete</TabsTrigger>
          </TabsList>

          {/* Introduction Tab */}
          <TabsContent value="intro" className="space-y-6">
            {/* Learning Objective */}
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Star className="w-6 h-6" />
                  Learning Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">
                  Today, your child will learn to <span className="font-bold text-primary">count up to 3 objects</span>. 
                  They'll touch and count items while learning that the last number tells how many!
                </p>
              </CardContent>
            </Card>

            {/* Introduction */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Let's Count!</CardTitle>
                <CardDescription>Read this together with your child</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-primary/10 p-6 rounded-xl border-2 border-primary/20">
                  <p className="text-lg mb-4">
                    Today we'll learn to <strong>count objects</strong> by touching each one as we count!
                  </p>
                  <div className="bg-card p-4 rounded-lg border-2 border-primary/30 mb-4">
                    <p className="text-lg font-bold mb-2">How to Count:</p>
                    <ol className="space-y-2 ml-6">
                      <li><strong>1.</strong> Touch the first object and say "1"</li>
                      <li><strong>2.</strong> Touch the next object and say "2"</li>
                      <li><strong>3.</strong> Touch the last object and say "3"</li>
                      <li><strong>4.</strong> The last number tells how many!</li>
                    </ol>
                  </div>
                  <div className="bg-accent/10 p-4 rounded-lg border-2 border-accent/20">
                    <p className="text-sm">
                      <strong>Remember:</strong> When we count 1, 2, 3, the number <strong>3</strong> tells us there are <strong>3 objects</strong> total!
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-secondary/50 p-4 rounded-lg border-2 border-secondary">
                    <h4 className="font-bold mb-2 flex items-center gap-2">
                      <span className="text-2xl">👆</span> Touch and Count
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Touch each object as you say the number. This helps you count correctly!
                    </p>
                  </div>
                  <div className="bg-secondary/50 p-4 rounded-lg border-2 border-secondary">
                    <h4 className="font-bold mb-2 flex items-center gap-2">
                      <span className="text-2xl">🎯</span> Last Number = How Many
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      The last number you say tells you how many objects there are in total!
                    </p>
                  </div>
                </div>

                {/* Story Connection */}
                <div className="bg-accent/10 p-4 rounded-lg border-2 border-accent/20">
                  <h4 className="font-bold mb-2 flex items-center gap-2">
                    <span className="text-2xl">📖</span> Story Connection: Goldilocks and the Three Bears
                  </h4>
                  <p className="text-sm mb-2">
                    Do you know the story of Goldilocks? She found a cottage with:
                  </p>
                  <ul className="text-sm space-y-1 ml-6">
                    <li>• 3 bowls of porridge</li>
                    <li>• 3 chairs</li>
                    <li>• 3 beds</li>
                    <li>• 3 bears!</li>
                  </ul>
                  <p className="text-sm mt-2">
                    Today we'll practice counting bears, just like in the story!
                  </p>
                </div>

                {/* Parent Tips */}
                <div className="flex items-start gap-4 p-4 bg-muted rounded-lg border-2 border-border">
                  <Users className="w-8 h-8 text-primary flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Parent Tips:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Make sure your child touches each object as they count</li>
                      <li>• Ask: "How many bears are there?"</li>
                      <li>• Help them understand the last number tells "how many"</li>
                      <li>• Practice with toys: "Count your cars. How many are there?"</li>
                    </ul>
                  </div>
                </div>

                {/* Key Vocabulary */}
                <div className="bg-accent/10 p-4 rounded-lg border-2 border-accent/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-5 h-5" />
                    <h4 className="font-bold">Key Words to Practice</h4>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="bg-card p-3 rounded-lg">
                      <p className="font-bold text-primary">Count</p>
                      <p className="text-sm text-muted-foreground">Say numbers in order: 1, 2, 3</p>
                    </div>
                    <div className="bg-card p-3 rounded-lg">
                      <p className="font-bold text-primary">How Many</p>
                      <p className="text-sm text-muted-foreground">The total number of objects</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Start Button */}
            <div className="text-center">
              <Button 
                size="lg" 
                onClick={() => setCurrentActivity("practice")}
                className="text-lg px-8 py-6"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Start Counting Activity
              </Button>
            </div>
          </TabsContent>

          {/* Practice Tab */}
          <TabsContent value="practice" className="space-y-6">
            {/* Progress */}
            <Card className="p-4 border-2 border-primary/20">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <div className="flex gap-2">
                  {questions.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-3 h-3 rounded-full ${
                        idx < currentQuestion ? 'bg-green-500' : 
                        idx === currentQuestion ? 'bg-primary' : 
                        'bg-muted'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </Card>

            {/* Instructions */}
            <Card className="p-6 bg-primary/10 border-2 border-primary/20">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🐻</div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Count the Bears</h3>
                  <p className="text-foreground">
                    Touch each bear and count out loud: 1, 2, 3...
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Then click on the number that tells how many bears there are!
                  </p>
                </div>
              </div>
            </Card>

            {/* Bears to Count */}
            <Card className="p-8">
              <div className="flex items-center justify-center gap-8 mb-8">
                {Array.from({ length: currentQ.bears }).map((_, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center animate-bounce"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <img 
                      src={bearBlue} 
                      alt={`Bear ${idx + 1}`}
                      className="w-32 h-32 object-contain"
                    />
                    <span className="text-4xl font-bold text-primary mt-2">{idx + 1}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Answer Options */}
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4 text-center">
                How many bears are there?
              </h3>
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                {answerOptions.map((option) => {
                  const isSelected = selectedAnswer === option.value;
                  const isCorrect = option.value === currentQ.correctAnswer;
                  const selectedClass = isSelected
                    ? (isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white')
                    : 'bg-card border-2 border-border';

                  return (
                    <button
                      key={option.value}
                      onClick={() => handleAnswerClick(option.value)}
                      className={`
                        h-24 text-3xl font-bold transition-all rounded-lg
                        ${selectedClass}
                        ${isSelected ? 'scale-110 shadow-lg' : 'hover:scale-105'}
                      `}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </Card>
          </TabsContent>

          {/* Complete Tab */}
          <TabsContent value="complete">
            <Card className="p-8 text-center border-2 border-green-500 bg-green-50">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold mb-2">Excellent Counting!</h3>
              <p className="text-muted-foreground mb-4">
                You counted all the bears correctly! You're great at counting to 3!
              </p>
              <div className="flex items-center justify-center gap-2 text-green-700">
                <CheckCircle2 className="w-6 h-6" />
                <span className="font-semibold">Lesson Complete</span>
              </div>
              <div className="mt-4">
                <Button size="lg" onClick={handleComplete}>
                  Continue Learning
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CountingActivity8;

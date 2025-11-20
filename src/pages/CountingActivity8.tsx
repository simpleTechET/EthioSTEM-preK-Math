import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Star, BookOpen, Users, Lightbulb, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { shuffleArray } from "@/lib/utils";

// Import bear images
import bearBlue from "@/assets/bear-blue.png";

interface CountingOption {
  value: number;
  label: string;
}

const CountingActivity8 = () => {
  const [showGame, setShowGame] = useState(false);
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
        // advance automatically to the next set after a short delay so the toast can be read
        setTimeout(() => {
          setCurrentQuestion((q) => q + 1);
          setSelectedAnswer(null);
        }, 1500);
      } else {
        // end of questions: mark complete but do not auto-route
        setIsComplete(true);
        markLessonComplete(8);
      }
    } else {
      // incorrect -> stay on the same set, leave the selected choice red
      toast.error("Not quite! 💭", {
        description: "Try counting again. Touch each bear as you count!",
      });
      // don't clear selectedAnswer so UI can show it as incorrect
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                Lesson 8
              </span>
              <h1 className="text-2xl font-bold text-gray-800">Count Up to 3</h1>
            </div>
            <p className="text-sm text-gray-600">Topic C: Counting</p>
          </div>
        </div>

        {!showGame ? (
          <div className="space-y-6">
            {/* Learning Objective */}
            <Card className="border-2 border-blue-200 bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl text-blue-700">
                  <Star className="w-6 h-6" />
                  Learning Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-700">
                  Today, your child will learn to <span className="font-bold text-blue-700">count up to 3 objects</span>. 
                  They'll touch and count items while learning that the last number tells how many!
                </p>
              </CardContent>
            </Card>

            {/* Introduction */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">Let's Count!</CardTitle>
                <CardDescription>Read this together with your child</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                  <p className="text-lg text-gray-700 mb-4">
                    Today we'll learn to <strong>count objects</strong> by touching each one as we count!
                  </p>
                  <div className="bg-white p-4 rounded-lg border-2 border-blue-300 mb-4">
                    <p className="text-lg font-bold text-blue-700 mb-2">How to Count:</p>
                    <ol className="space-y-2 text-gray-700 ml-6">
                      <li><strong>1.</strong> Touch the first object and say "1"</li>
                      <li><strong>2.</strong> Touch the next object and say "2"</li>
                      <li><strong>3.</strong> Touch the last object and say "3"</li>
                      <li><strong>4.</strong> The last number tells how many!</li>
                    </ol>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                    <p className="text-sm text-gray-700">
                      <strong>Remember:</strong> When we count 1, 2, 3, the number <strong>3</strong> tells us there are <strong>3 objects</strong> total!
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-200">
                    <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <span className="text-2xl">👆</span> Touch and Count
                    </h4>
                    <p className="text-sm text-gray-600">
                      Touch each object as you say the number. This helps you count correctly!
                    </p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-200">
                    <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <span className="text-2xl">🎯</span> Last Number = How Many
                    </h4>
                    <p className="text-sm text-gray-600">
                      The last number you say tells you how many objects there are in total!
                    </p>
                  </div>
                </div>

                {/* Story Connection */}
                <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
                  <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="text-2xl">📖</span> Story Connection: Goldilocks and the Three Bears
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Do you know the story of Goldilocks? She found a cottage with:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-6">
                    <li>• 3 bowls of porridge</li>
                    <li>• 3 chairs</li>
                    <li>• 3 beds</li>
                    <li>• 3 bears!</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-2">
                    Today we'll practice counting bears, just like in the story!
                  </p>
                </div>

                {/* Parent Tips */}
                <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                  <Users className="w-8 h-8 text-purple-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Parent Tips:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Make sure your child touches each object as they count</li>
                      <li>• Ask: "How many bears are there?"</li>
                      <li>• Help them understand the last number tells "how many"</li>
                      <li>• Practice with toys: "Count your cars. How many are there?"</li>
                    </ul>
                  </div>
                </div>

                {/* Key Vocabulary */}
                <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-5 h-5 text-yellow-600" />
                    <h4 className="font-bold text-gray-800">Key Words to Practice</h4>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded-lg">
                      <p className="font-bold text-blue-700">Count</p>
                      <p className="text-sm text-gray-600">Say numbers in order: 1, 2, 3</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="font-bold text-blue-700">How Many</p>
                      <p className="text-sm text-gray-600">The total number of objects</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Start Button */}
            <div className="text-center">
              <Button 
                size="lg" 
                onClick={() => setShowGame(true)}
                className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Start Counting Activity
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Progress */}
            <Card className="p-4 bg-white border-2 border-blue-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <div className="flex gap-2">
                  {questions.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-3 h-3 rounded-full ${
                        idx < currentQuestion ? 'bg-green-500' : 
                        idx === currentQuestion ? 'bg-blue-500' : 
                        'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </Card>

            {/* Instructions */}
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🐻</div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-gray-800">Count the Bears</h3>
                  <p className="text-gray-700">
                    Touch each bear and count out loud: 1, 2, 3...
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Then click on the number that tells how many bears there are!
                  </p>
                </div>
              </div>
            </Card>

            {/* Bears to Count */}
            <Card className="p-8 bg-white shadow-lg">
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
                    <span className="text-4xl font-bold text-blue-700 mt-2">{idx + 1}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Answer Options */}
            <Card className="p-6 bg-white shadow-lg">
              <h3 className="font-bold text-lg mb-4 text-gray-800 text-center">
                How many bears are there?
              </h3>
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                {answerOptions.map((option) => {
                  const isSelected = selectedAnswer === option.value;
                  const isCorrect = option.value === currentQ.correctAnswer;
                  const selectedClass = isSelected
                    ? (isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white')
                    : 'bg-white text-gray-800 border border-gray-200';

                  return (
                    <button
                      key={option.value}
                      onClick={() => handleAnswerClick(option.value)}
                      className={`
                        h-24 text-3xl font-bold transition-all rounded-lg
                        ${selectedClass}
                        ${isSelected ? 'scale-110 shadow-lg' : 'hover:scale-105 hover:bg-transparent'}
                      `}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </Card>
  
            {/* Completion Message */}
            {isComplete && (
              <Card className="p-8 text-center bg-gradient-to-br from-success/10 to-primary/10 border-2 border-success animate-fade-in">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold mb-2 text-foreground">Excellent Counting!</h3>
                <p className="text-muted-foreground mb-4">
                  You counted all the bears correctly! You're great at counting to 3!
                </p>
                <div className="flex items-center justify-center gap-2 text-green-700">
                  <CheckCircle2 className="w-6 h-6" />
                  <span className="font-semibold">Lesson Complete</span>
                </div>
                <div className="mt-4">
                  <Button size="lg" onClick={handleComplete} className="bg-blue-600 hover:bg-blue-700">
                    Continue Learning
                  </Button>
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CountingActivity8;

// src/pages/CountingActivity9.tsx
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Star, BookOpen, Users, Lightbulb, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface CountingItem {
  id: number;
  type: string;
  emoji: string;
  count: 1 | 2 | 3;
}

const CountingActivity9 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [currentStep, setCurrentStep] = useState<'fingers' | 'count' | 'complete'>('fingers');
  const [fingerCount, setFingerCount] = useState<number | null>(null);
  const [selectedAnimal, setSelectedAnimal] = useState<CountingItem | null>(null);
  const [placedAnimals, setPlacedAnimals] = useState<CountingItem[]>([]);
  const [completed, setCompleted] = useState(false);

  const markLessonComplete = (lessonId: number) => {
    const saved = localStorage.getItem('ethiostem-completed-lessons');
    const completedLessons = saved ? JSON.parse(saved) : [];
    if (!completedLessons.includes(lessonId)) {
      completedLessons.push(lessonId);
      localStorage.setItem('ethiostem-completed-lessons', JSON.stringify(completedLessons));
    }
  };

  const handleComplete = () => {
    markLessonComplete(9);
    navigate("../activities");
  };
  
  // Animals with emojis - mixed counts for counting practice
  const animals = useMemo(() => [
    { id: 1, type: "horse", emoji: "🐎", count: 1 as const },
    { id: 2, type: "cow", emoji: "🐄", count: 2 as const },
    { id: 3, type: "pig", emoji: "🐖", count: 2 as const },
    { id: 4, type: "sheep", emoji: "🐑", count: 3 as const },
    { id: 5, type: "chicken", emoji: "🐔", count: 1 as const },
    { id: 6, type: "duck", emoji: "🦆", count: 3 as const },
  ].sort(() => Math.random() - 0.5), []);

  // Shuffled finger questions
  const fingerQuestions = useMemo(() => 
    [1, 2, 3, 2, 1, 3].sort(() => Math.random() - 0.5), 
  []);
  const [currentFingerQ, setCurrentFingerQ] = useState(0);
  const [fingerFeedback, setFingerFeedback] = useState<'none' | 'correct' | 'wrong'>('none');

  const handleFingerAnswer = (count: number) => {
    // show the selected count immediately
    setFingerCount(count);

    if (count === fingerQuestions[currentFingerQ]) {
      setFingerFeedback('correct');
      toast.success("Great! 🎉", { description: `That's ${count} finger${count > 1 ? 's' : ''}!` });
      // advance immediately (no timeouts)
      if (currentFingerQ < fingerQuestions.length - 1) {
        setCurrentFingerQ((q) => q + 1);
        setFingerCount(null);
        setFingerFeedback('none');
      } else {
        setCurrentStep('count');
        setFingerCount(null);
        setFingerFeedback('none');
      }
    } else {
      // keep the selected button red until the user tries again
      setFingerFeedback('wrong');
      toast.error("Try again! 🤔", { description: "Count your fingers carefully." });
    }
  };

  const handleAnimalClick = (animal: CountingItem) => {
    setSelectedAnimal(animal);
    toast.info("Count the animals!", { 
      description: `How many ${animal.type}s are there? Click the correct number below.` 
    });
  };

  const handleNumberClick = (number: number) => {
    if (!selectedAnimal) return;

    if (number === selectedAnimal.count) {
      toast.success("Correct! 🎉", { 
        description: `Yes! There ${selectedAnimal.count === 1 ? 'is' : 'are'} ${selectedAnimal.count} ${selectedAnimal.type}${selectedAnimal.count > 1 ? 's' : ''}!` 
      });
      
      const newPlaced = [...placedAnimals, selectedAnimal];
      setPlacedAnimals(newPlaced);
      setSelectedAnimal(null);

      // If this was the last one, mark completion (no auto-route)
      if (newPlaced.length === animals.length) {
        setCurrentStep('complete');
        setCompleted(true);
        markLessonComplete(9); // record completion so /activities shows green mark
        // do NOT call handleComplete() here to avoid auto-routing; the Continue Learning button calls it
      }
    } else {
      toast.error("Let's count again! 🤔", { 
        description: `Touch each ${selectedAnimal.type} and count: 1, 2, 3...` 
      });
    }
  };

  const remainingAnimals = animals.filter(animal => 
    !placedAnimals.some(placed => placed.id === animal.id)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("../activities")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full">
                Lesson 9
              </span>
              <h1 className="text-2xl font-bold text-gray-800">Count Objects in Lines & Groups</h1>
            </div>
            <p className="text-sm text-gray-600">Topic C: Counting to 3</p>
          </div>
        </div>

        {!showGame ? (
          // ... (Keep the same introduction page as before)
          <div className="space-y-6">
            {/* Learning Objective */}
            <Card className="border-2 border-green-200 bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl text-green-700">
                  <Star className="w-6 h-6" />
                  Learning Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-700">
                  Today, your child will learn to <span className="font-bold text-green-700">count up to 3 objects</span> arranged 
                  in different ways - in lines, groups, or scattered!
                </p>
              </CardContent>
            </Card>

            {/* Introduction */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">Counting in Different Arrangements</CardTitle>
                <CardDescription>Read this together with your child</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
                  <p className="text-lg text-gray-700 mb-4">
                    Animals can be arranged in different ways, but we count them the same!
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-white p-4 rounded-lg border-2 border-blue-200 text-center">
                      <p className="font-bold text-blue-700 mb-2">In a Line</p>
                      <div className="text-3xl">🐑<br/>🐑<br/>🐑</div>
                      <p className="text-sm text-gray-600 mt-2">1, 2, 3 sheep!</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border-2 border-purple-200 text-center">
                      <p className="font-bold text-purple-700 mb-2">In a Group</p>
                      <div className="text-3xl">🐖🐖</div>
                      <p className="text-sm text-gray-600 mt-2">1, 2 pigs!</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border-2 border-orange-200 text-center">
                      <p className="font-bold text-orange-700 mb-2">Scattered</p>
                      <div className="text-3xl">🐔<br/>🐔 🐔</div>
                      <p className="text-sm text-gray-600 mt-2">Still 3 chickens!</p>
                    </div>
                  </div>
                </div>

                {/* Game Instructions */}
                <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                  <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="text-2xl">🎮</span> How to Play
                  </h4>
                  <ol className="text-sm text-gray-600 space-y-2 ml-6">
                    <li><strong>1.</strong> Click on an animal group</li>
                    <li><strong>2.</strong> Count how many animals you see</li>
                    <li><strong>3.</strong> Click the correct number (1, 2, or 3)</li>
                    <li><strong>4.</strong> Help all the animals find their homes!</li>
                  </ol>
                </div>

                {/* Parent Tips */}
                <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                  <Users className="w-8 h-8 text-purple-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Parent Tips:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Help your child touch each animal as they count</li>
                      <li>• Ask: "How many do you see in this group?"</li>
                      <li>• Show that arrangement doesn't change the count</li>
                      <li>• Celebrate when they get it right!</li>
                    </ul>
                  </div>
                </div>

                {/* Start Button */}
                <div className="text-center">
                  <Button 
                    size="lg" 
                    onClick={() => setShowGame(true)}
                    className="text-lg px-8 py-6 bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transition-all"
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    Start Counting Activity
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Finger Counting Warm-up */}
            {currentStep === 'fingers' && (
              <Card className="p-6 bg-blue-50 border-2 border-blue-200">
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  👋 Finger Warm-up!
                </h3>
                <p className="text-lg text-gray-700 mb-4">
                  Show me <strong className="text-blue-700 text-3xl">{fingerQuestions[currentFingerQ]}</strong> finger{fingerQuestions[currentFingerQ] > 1 ? 's' : ''}!
                </p>
                <div className="flex gap-4 justify-center">
                  {[1, 2, 3].map(num => (
                    <Button
                      key={num}
                      onClick={() => handleFingerAnswer(num)}
                      size="lg"
                      className={`text-4xl py-8 ${
                        fingerCount === num
                          ? (fingerFeedback === 'wrong' ? 'bg-red-500 text-white' : 'bg-blue-600 text-white')
                          : 'bg-white text-gray-800 hover:bg-blue-100'
                      }`}
                    >
                      {num === 1 ? '☝️' : num === 2 ? '✌️' : '👌'}
                    </Button>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-4 text-center">
                  Question {currentFingerQ + 1} of {fingerQuestions.length}
                </p>
              </Card>
            )}

            {/* Main Counting Game (show while counting; render completion card under the game when complete) */}
            {(currentStep === 'count' || currentStep === 'complete') && (
              <>
                <Card className="p-6 bg-green-50 border-2 border-green-200">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">
                    🐄 Farm Animal Counting
                  </h3>
                  <p className="text-gray-700 mb-2">
                    Count the animals in each group! Click a group, then click how many animals you counted.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="flex-1 bg-white p-2 rounded border">
                      Remaining: {remainingAnimals.length} groups
                    </div>
                    <div className="flex-1 bg-white p-2 rounded border">
                      Completed: {placedAnimals.length} groups
                    </div>
                  </div>
                </Card>

                {/* Animal Groups to Count */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {animals.map(animal => {
                    const isPlaced = placedAnimals.some(placed => placed.id === animal.id);
                    const isSelected = selectedAnimal?.id === animal.id;
                    
                    return (
                      <Card
                        key={animal.id}
                        onClick={() => !isPlaced && handleAnimalClick(animal)}
                        className={`
                          text-center p-6 cursor-pointer transition-all
                          ${isPlaced 
                            ? 'opacity-50 border-4 border-green-500 bg-green-50' 
                            : isSelected
                            ? 'border-4 border-blue-500 scale-105 bg-blue-50'
                            : 'hover:scale-105 hover:border-green-300 border-2'
                          }`}
                      >
                        <div className="text-6xl mb-3">
                          {/* Show multiple emojis based on count */}
                          {Array(animal.count).fill(animal.emoji).map((emoji, index) => (
                            <span 
                              key={index} 
                              className={`
                                ${animal.count === 2 ? 'inline-block mx-1' : ''}
                                ${animal.count === 3 ? 'block' : ''}
                              `}
                            >
                              {emoji}
                            </span>
                          ))}
                        </div>
                        <p className="text-sm text-gray-600 capitalize">
                          {animal.type}{animal.count > 1 ? 's' : ''}
                          {isPlaced && <CheckCircle2 className="w-4 h-4 text-green-600 inline ml-1" />}
                        </p>
                      </Card>
                    );
                  })}
                </div>

                {/* Number Selection */}
                {selectedAnimal && (
                  <Card className="p-6 bg-yellow-50 border-2 border-yellow-200">
                    <h3 className="text-lg font-bold mb-4 text-gray-800 text-center">
                      How many {selectedAnimal.type}s did you count?
                    </h3>
                    <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                      {[1, 2, 3].map(number => (
                        <Button
                          key={number}
                          onClick={() => handleNumberClick(number)}
                          size="lg"
                          className="h-20 text-2xl font-bold bg-white hover:bg-green-100 border-2 border-green-300 text-gray-800"
                        >
                          {number}
                        </Button>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Completion card shown under the game when complete */}
                {currentStep === 'complete' && (
                  <div className="mt-6">
                    <Card className="bg-gradient-to-br from-green-100 to-blue-100 border-4 border-green-400 p-8 text-center">
                      <div className="text-6xl mb-4">🎉</div>
                      <h3 className="text-3xl font-bold mb-3 text-gray-800">Excellent Counting!</h3>
                      <p className="text-lg text-gray-700 mb-4">
                        You counted all the animal groups correctly! You're amazing at counting in lines and groups!
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                        {placedAnimals.map(animal => (
                          <div key={animal.id} className="bg-white p-3 rounded-lg border">
                            <div className="text-4xl mb-2">
                              {Array(animal.count).fill(animal.emoji).map((emoji, i) => (
                                <span key={i}>{emoji}</span>
                              ))}
                            </div>
                            <p className="text-sm text-gray-600">{animal.count} {animal.type}{animal.count > 1 ? 's' : ''}</p>
                          </div>
                        ))}
                      </div>
                      <Button 
                        size="lg"
                        onClick={handleComplete}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Continue Learning
                      </Button>
                    </Card>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CountingActivity9;

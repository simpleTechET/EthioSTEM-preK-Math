// src/pages/CountingActivity9.tsx
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Star, BookOpen, Users, Lightbulb, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

// Import animal images - you'll need these
import horseImg from "@/assets/horse.png";
import pigImg from "@/assets/pig.png";
import sheepImg from "@/assets/sheep.png";

interface CountingItem {
  id: number;
  type: string;
  image: string;
  count: 1 | 2 | 3;
}

const CountingActivity9 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [currentStep, setCurrentStep] = useState<'fingers' | 'sort' | 'line'>('fingers');
  const [fingerCount, setFingerCount] = useState<number | null>(null);
  const [lineAnswers, setLineAnswers] = useState<Record<number, CountingItem[]>>({
    1: [],
    2: [],
    3: []
  });

  // Animals shuffled
  const animals = useMemo(() => [
    { id: 1, type: "horse", image: horseImg, count: 1 as const },
    { id: 2, type: "pig", image: pigImg, count: 2 as const },
    { id: 3, type: "pig", image: pigImg, count: 2 as const },
    { id: 4, type: "sheep", image: sheepImg, count: 3 as const },
    { id: 5, type: "sheep", image: sheepImg, count: 3 as const },
    { id: 6, type: "sheep", image: sheepImg, count: 3 as const },
  ].sort(() => Math.random() - 0.5), []);

  const [unsortedAnimals, setUnsortedAnimals] = useState<CountingItem[]>(animals);

  // Shuffled finger questions
  const fingerQuestions = useMemo(() => 
    [1, 2, 3, 2, 1, 3].sort(() => Math.random() - 0.5), 
  []);
  const [currentFingerQ, setCurrentFingerQ] = useState(0);

  const handleFingerAnswer = (count: number) => {
    if (count === fingerQuestions[currentFingerQ]) {
      toast.success("Great! 🎉", { description: `That's ${count} finger${count > 1 ? 's' : ''}!` });
      if (currentFingerQ < fingerQuestions.length - 1) {
        setCurrentFingerQ(currentFingerQ + 1);
        setFingerCount(null);
      } else {
        setCurrentStep('sort');
      }
    } else {
      toast.error("Try again! 🤔", { description: "Count your fingers carefully." });
      setFingerCount(null);
    }
  };

  const handleAnimalPlace = (animal: CountingItem, lineNum: number) => {
    if (animal.count === lineNum) {
      setLineAnswers({
        ...lineAnswers,
        [lineNum]: [...lineAnswers[lineNum], animal]
      });
      setUnsortedAnimals(unsortedAnimals.filter(a => a.id !== animal.id));
      toast.success("Correct! 🎉", { description: `${animal.type} goes in line ${lineNum}!` });
    } else {
      toast.error("Not quite! 🤔", { description: `Count the dots in that line.` });
    }
  };

  const isComplete = unsortedAnimals.length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full">
                Lesson 9
              </span>
              <h1 className="text-2xl font-bold text-gray-800">Count Up to 3 Objects</h1>
            </div>
            <p className="text-sm text-gray-600">Topic C: Counting to 3</p>
          </div>
        </div>

        {!showGame ? (
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
                  in different ways - scattered in groups or lined up in a row!
                </p>
              </CardContent>
            </Card>

            {/* Introduction */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">Counting to 3</CardTitle>
                <CardDescription>Read this together with your child</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
                  <p className="text-lg text-gray-700 mb-4">
                    We can count objects no matter how they're arranged!
                  </p>
                  <ul className="space-y-2 text-gray-700 ml-6">
                    <li>• Whether they're in a <strong>group</strong> (scattered)</li>
                    <li>• Or in a <strong>line</strong> (lined up)</li>
                    <li>• The number stays the <strong>same</strong>!</li>
                  </ul>
                </div>

                {/* Parent Tips */}
                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <Users className="w-8 h-8 text-blue-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Parent Tips:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Help your child touch each object as they count</li>
                      <li>• Ask: "How many do you see?"</li>
                      <li>• Show that 3 scattered objects = 3 lined up objects</li>
                      <li>• Practice counting fingers: 1, 2, 3!</li>
                    </ul>
                  </div>
                </div>

                {/* Key Vocabulary */}
                <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-5 h-5 text-yellow-600" />
                    <h4 className="font-bold text-gray-800">Key Words</h4>
                  </div>
                  <div className="grid md:grid-cols-3 gap-3">
                    <div className="bg-white p-3 rounded-lg">
                      <p className="font-bold text-green-700">Line</p>
                      <p className="text-sm text-gray-600">Objects in a row</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="font-bold text-green-700">Group</p>
                      <p className="text-sm text-gray-600">Objects together</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="font-bold text-green-700">Count</p>
                      <p className="text-sm text-gray-600">1, 2, 3...</p>
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
                className="text-lg px-8 py-6 bg-green-600 hover:bg-green-700 shadow-lg"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Start Counting Activity
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Finger Counting */}
            {currentStep === 'fingers' && (
              <>
                <Card className="p-6 bg-blue-50 border-2 border-blue-200">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">
                    👋 Show Me Fingers!
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
                        className={`text-4xl py-8 ${fingerCount === num ? 'bg-blue-600' : 'bg-white text-gray-800 hover:bg-blue-100'}`}
                      >
                        {num === 1 ? '☝️' : num === 2 ? '✌️' : '🤟'}
                      </Button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-4 text-center">
                    Question {currentFingerQ + 1} of {fingerQuestions.length}
                  </p>
                </Card>
              </>
            )}

            {/* Sorting & Lining Up */}
            {currentStep === 'sort' && (
              <>
                <Card className="p-6 bg-green-50 border-2 border-green-200">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">
                    🐄 Old MacDonald's Farm
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Help the animals line up for lunch! Click an animal, then click the line with the matching number of dots.
                  </p>
                </Card>

                {/* Unsorted Animals */}
                {unsortedAnimals.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-gray-800">Animals in the Pen:</h4>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                      {unsortedAnimals.map(animal => (
                        <Card
                          key={animal.id}
                          className="cursor-pointer hover:scale-105 transition-all border-2 hover:border-green-500"
                        >
                          <div className="aspect-square flex items-center justify-center p-2">
                            <img src={animal.image} alt={animal.type} className="w-full h-full object-contain" />
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Lines with Dots */}
                <div className="grid md:grid-cols-3 gap-4">
                  {[1, 2, 3].map(lineNum => (
                    <Card 
                      key={lineNum}
                      onClick={() => {
                        if (unsortedAnimals.length > 0) {
                          handleAnimalPlace(unsortedAnimals[0], lineNum);
                        }
                      }}
                      className={`min-h-[200px] cursor-pointer hover:border-4 hover:border-green-500 transition-all ${
                        unsortedAnimals.length > 0 ? 'border-4 border-dashed border-green-300' : ''
                      }`}
                    >
                      <CardHeader className="bg-green-100 border-b-2">
                        <CardTitle className="text-center">
                          <div className="flex justify-center gap-2 mb-2">
                            {Array(lineNum).fill(0).map((_, i) => (
                              <div key={i} className="w-8 h-8 rounded-full bg-green-600" />
                            ))}
                          </div>
                          Line {lineNum}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        {lineAnswers[lineNum].length === 0 ? (
                          <p className="text-gray-500 text-center py-4">Click to add animals</p>
                        ) : (
                          <div className="space-y-2">
                            {lineAnswers[lineNum].map(animal => (
                              <div key={animal.id} className="flex items-center gap-2 p-2 bg-green-50 rounded">
                                <img src={animal.image} alt={animal.type} className="w-12 h-12 object-contain" />
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Completion */}
                {isComplete && (
                  <Card className="bg-gradient-to-br from-green-100 to-blue-100 border-4 border-green-400 p-8 text-center">
                    <div className="text-6xl mb-4">🎉</div>
                    <h3 className="text-3xl font-bold mb-3 text-gray-800">Excellent Counting!</h3>
                    <p className="text-lg text-gray-700 mb-6">
                      You helped all the animals line up for lunch!
                    </p>
                    <Button 
                      size="lg"
                      onClick={() => navigate('/activities')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Continue Learning
                    </Button>
                  </Card>
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

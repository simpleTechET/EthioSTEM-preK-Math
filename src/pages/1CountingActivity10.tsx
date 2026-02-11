// src/pages/CountingActivity10.tsx
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Star, BookOpen, Users, Lightbulb, CheckCircle2, Shuffle, Eye } from "lucide-react";
import { toast } from "sonner";

interface AnimalGroup {
  id: number;
  type: string;
  emoji: string;
  count: 1 | 2 | 3;
  configuration: 'line' | 'scattered';
}

const CountingActivity10 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [currentStep, setCurrentStep] = useState<'peekaboo' | 'matching' | 'complete'>('peekaboo');
  const [peekabooCount, setPeekabooCount] = useState<number | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<AnimalGroup | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);

  const markLessonComplete = (lessonId: number) => {
    const saved = localStorage.getItem('ethiostem-completed-lessons');
    const completedLessons = saved ? JSON.parse(saved) : [];
    if (!completedLessons.includes(lessonId)) {
      completedLessons.push(lessonId);
      localStorage.setItem('ethiostem-completed-lessons', JSON.stringify(completedLessons));
    }
  };

  // Peek-a-boo sequences
  const peekabooSequences = useMemo(() => 
    [1, 2, 3, 2, 1, 3, 2, 3, 1].sort(() => Math.random() - 0.5), 
  []);
  const [currentPeekaboo, setCurrentPeekaboo] = useState(0);
  const [showPeekaboo, setShowPeekaboo] = useState(false);

  // Animal groups in different configurations
  const animalGroups = useMemo(() => [
    // Line configurations
    { id: 1, type: "chickens", emoji: "🐥", count: 1 as const, configuration: 'line' as const },
    { id: 2, type: "goats", emoji: "🐐", count: 2 as const, configuration: 'line' as const },
    { id: 3, type: "pigs", emoji: "🐖", count: 3 as const, configuration: 'line' as const },
    // Scattered configurations
    { id: 4, type: "cows", emoji: "🐄", count: 1 as const, configuration: 'scattered' as const },
    { id: 5, type: "sheep", emoji: "🐑", count: 2 as const, configuration: 'scattered' as const },
    { id: 6, type: "horses", emoji: "🐎", count: 3 as const, configuration: 'scattered' as const },
  ].sort(() => Math.random() - 0.5), []);

  // Dot cards for matching
  const dotCards = useMemo(() => [
    { id: 1, count: 1, dots: "●" },
    { id: 2, count: 2, dots: "● ●" },
    { id: 3, count: 3, dots: "● ● ●" },
  ], []);

  const startPeekaboo = () => {
    setShowPeekaboo(true);
    setTimeout(() => {
      setShowPeekaboo(false);
    }, 2000);
  };
const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
const [showFeedback, setShowFeedback] = useState(false);

const handlePeekabooAnswer = (count: number) => {
  const isCorrect = count === peekabooSequences[currentPeekaboo];
  setLastAnswerCorrect(isCorrect);
  setShowFeedback(true);
  setPeekabooCount(count);

  if (isCorrect) {
    toast.success("Great memory! 🎉", { description: `You remembered ${count} animal${count > 1 ? 's' : ''}!` });
    setTimeout(() => {
      if (currentPeekaboo < peekabooSequences.length - 1) {
        setCurrentPeekaboo(currentPeekaboo + 1);
        setPeekabooCount(null);
        setShowFeedback(false);
        startPeekaboo();
      } else {
        setCurrentStep('matching');
        setShowFeedback(false);
      }
    }, 1500);
  } else {
    toast.error("Let's try again! 🤔", { description: "Look carefully next time!" });
    setTimeout(() => {
      setPeekabooCount(null);
      setShowFeedback(false);
    }, 1500);
  }
};

  const handleGroupClick = (group: AnimalGroup) => {
    setSelectedGroup(group);
  };

  const handleDotCardClick = (dotCount: number) => {
    if (!selectedGroup) return;

    if (dotCount === selectedGroup.count) {
      toast.success("Perfect match! 🎉", { 
        description: `${selectedGroup.count} ${selectedGroup.type} matches ${dotCount} dots!` 
      });
      const newMatched = [...matchedPairs, selectedGroup.id];
      setMatchedPairs(newMatched);
      setSelectedGroup(null);

      // if that was the last match, mark lesson complete and show completion (no auto-route)
      if (newMatched.length === animalGroups.length) {
        setCurrentStep('complete');
        setCompleted(true);
        markLessonComplete(10); // lesson 10 completed
      }
    } else {
      toast.error("Not quite! 🤔", { 
        description: `Count the ${selectedGroup.type} carefully.` 
      });
    }
  };

  const remainingGroups = animalGroups.filter(group => 
    !matchedPairs.includes(group.id)
  );

  const renderAnimalGroup = (group: AnimalGroup) => {
    const isMatched = matchedPairs.includes(group.id);
    const isSelected = selectedGroup?.id === group.id;

    return (
      <Card
        key={group.id}
        onClick={() => !isMatched && handleGroupClick(group)}
        className={`
          text-center p-4 cursor-pointer transition-all
          ${isMatched 
            ? 'opacity-50 border-4 border-green-500 bg-green-50' 
            : isSelected
            ? 'border-4 border-blue-500 scale-105 bg-blue-50'
            : 'hover:scale-105 hover:border-green-300 border-2'
          }
        `}
      >
        <div className="text-4xl mb-2 min-h-[80px] flex items-center justify-center">
          {group.configuration === 'line' ? (
            // Line configuration
            <div className="space-y-1">
              {Array(group.count).fill(group.emoji).map((emoji, index) => (
                <div key={index}>{emoji}</div>
              ))}
            </div>
          ) : (
            // Scattered configuration
            <div className="flex flex-wrap justify-center gap-1">
              {Array(group.count).fill(group.emoji).map((emoji, index) => (
                <span key={index} className="transform rotate-12">{emoji}</span>
              ))}
            </div>
          )}
        </div>
        <p className="text-sm text-gray-600 capitalize">
          {group.configuration} {group.type}
          {isMatched && <CheckCircle2 className="w-4 h-4 text-green-600 inline ml-1" />}
        </p>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-green-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full">
                Lesson 10
              </span>
              <h1 className="text-2xl font-bold text-gray-800">Count in Lines & Groups</h1>
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
                  Today, your child will learn to <span className="font-bold text-green-700">arrange and count up to 3 objects</span> in 
                  scattered and linear configurations, developing visual memory and counting skills.
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
                    Animals can be arranged in different ways, but the number stays the same!
                  </p>
                  <div className="grid md:grid-cols-2 gap-6 mb-4">
                    <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                      <p className="font-bold text-blue-700 mb-3">In a Line</p>
                      <div className="text-3xl text-center space-y-1">
                        <div>🐖</div>
                        <div>🐖</div>
                        <div>🐖</div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 text-center">3 pigs in a line = 3 pigs!</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border-2 border-purple-200">
                      <p className="font-bold text-purple-700 mb-3">Scattered</p>
                      <div className="text-3xl text-center">
                        <div>🐖 🐖</div>
                        <div>🐖</div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 text-center">3 pigs scattered = still 3 pigs!</p>
                    </div>
                  </div>
                </div>

                {/* Real World Connection */}
                <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                  <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="text-2xl">👁️</span> Peek-a-Boo Counting
                  </h4>
                  <p className="text-sm text-gray-600">
                    Just like playing peek-a-boo, we'll practice remembering how many animals we see 
                    quickly! This helps build your "math eyes" - being able to recognize quantities fast.
                  </p>
                </div>

                {/* Game Instructions */}
                <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
                  <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="text-2xl">🎮</span> How to Play
                  </h4>
                  <ol className="text-sm text-gray-600 space-y-2 ml-6">
                    <li><strong>1.</strong> Peek-a-Boo: Remember how many animals you see quickly</li>
                    <li><strong>2.</strong> Matching: Count animals in lines and scattered groups</li>
                    <li><strong>3.</strong> Match each animal group to the correct number of dots</li>
                    <li><strong>4.</strong> Help organize Old MacDonald's farm!</li>
                  </ol>
                </div>

                {/* Parent Tips */}
                <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                  <Users className="w-8 h-8 text-purple-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Parent Tips:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Encourage quick looking during peek-a-boo to build visual memory</li>
                      <li>• Ask: "Are they in a line or scattered? Does it change the count?"</li>
                      <li>• Help notice that arrangement doesn't change the number</li>
                      <li>• Practice with toys at home - line them up, scatter them, count!</li>
                    </ul>
                  </div>
                </div>

                {/* Key Vocabulary */}
                <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-5 h-5 text-orange-600" />
                    <h4 className="font-bold text-gray-800">Key Words</h4>
                  </div>
                  <div className="grid md:grid-cols-3 gap-3">
                    <div className="bg-white p-3 rounded-lg">
                      <p className="font-bold text-green-700">Line</p>
                      <p className="text-sm text-gray-600">Objects in a row</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="font-bold text-green-700">Scattered</p>
                      <p className="text-sm text-gray-600">Objects spread out</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="font-bold text-green-700">Peek-a-Boo</p>
                      <p className="text-sm text-gray-600">Quick looking game</p>
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
                className="text-lg px-8 py-6 bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transition-all"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Start Counting Activity
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Peek-a-Boo Game */}
            {currentStep === 'peekaboo' && (
              <Card className="p-6 bg-blue-50 border-2 border-blue-200 text-center">
                <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center justify-center gap-2">
                  <Eye className="w-6 h-6" />
                  Peek-a-Boo Counting!
                </h3>
                
                {showPeekaboo ? (
                  <div className="mb-6">
                    <p className="text-lg text-gray-700 mb-4">Quick! Look at the animals!</p>
                    <div className="text-8xl mb-4 animate-pulse">
                      {Array(peekabooSequences[currentPeekaboo]).fill("🐄").map((emoji, index) => (
                        <span key={index}>{emoji}</span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">Remember how many you saw!</p>
                  </div>
                ) : (
                  <div className="mb-6">
                    <p className="text-lg text-gray-700 mb-4">
                      How many animals did you see?
                    </p>
                    <div className="grid grid-cols-3 gap-4 max-w-md mx-auto relative">
  {[1, 2, 3].map(number => (
    <div key={number} className="relative">
      <Button
        onClick={() => handlePeekabooAnswer(number)}
        size="lg"
        className={`h-20 text-2xl font-bold border-2 border-blue-300 text-gray-800 relative z-10 ${
          showFeedback && number === peekabooCount 
            ? lastAnswerCorrect 
              ? 'bg-green-100 border-green-500' 
              : 'bg-red-100 border-red-500'
            : 'bg-white hover:bg-blue-100'
        }`}
      >
        {number}
      </Button>
      {showFeedback && number === peekabooCount && (
        <div className="absolute -top-2 -right-2 z-20">
          {lastAnswerCorrect ? (
            <div className="bg-green-500 text-white rounded-full p-1 animate-bounce">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          ) : (
            <div className="bg-red-500 text-white rounded-full p-1 animate-bounce">
              <span className="w-6 h-6 flex items-center justify-center font-bold">✕</span>
            </div>
          )}
        </div>
      )}
    </div>
  ))}
</div>
                    <p className="text-sm text-gray-600 mt-4">
                      Question {currentPeekaboo + 1} of {peekabooSequences.length}
                    </p>
                  </div>
                )}

                {!showPeekaboo && currentPeekaboo === 0 && (
                  <Button onClick={startPeekaboo} className="mt-4">
                    Start Peek-a-Boo!
                  </Button>
                )}
              </Card>
            )}

            {/* Matching Game */}
            {currentStep === 'matching' && (
              <>
                <Card className="p-6 bg-green-50 border-2 border-green-200">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">
                    🐄 Old MacDonald's Farm Matching
                  </h3>
                  <p className="text-gray-700 mb-2">
                    Count the animals in each group - some are in lines, some are scattered! 
                    Click a group, then click the matching dot card.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="flex-1 bg-white p-2 rounded border">
                      Remaining: {remainingGroups.length} groups
                    </div>
                    <div className="flex-1 bg-white p-2 rounded border">
                      Matched: {matchedPairs.length} groups
                    </div>
                  </div>
                </Card>

                {/* Animal Groups */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {animalGroups.map(renderAnimalGroup)}
                </div>

                {/* Dot Cards */}
                {selectedGroup && (
                  <Card className="p-6 bg-yellow-50 border-2 border-yellow-200">
                    <h3 className="text-lg font-bold mb-4 text-gray-800 text-center">
                      How many {selectedGroup.type} did you count?
                    </h3>
                    <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                      {dotCards.map(card => (
                        <Card
                          key={card.id}
                          onClick={() => handleDotCardClick(card.count)}
                          className="text-center p-4 cursor-pointer hover:scale-105 transition-all bg-white border-2 border-green-300"
                        >
                          <div className="text-3xl font-bold text-gray-800 mb-2">
                            {card.dots}
                          </div>
                          <p className="text-sm text-gray-600">{card.count} dot{card.count > 1 ? 's' : ''}</p>
                        </Card>
                      ))}
                    </div>
                  </Card>
                )}
              </>
            )}

            {/* Completion */}
            {currentStep === 'complete' && (
              <Card className="bg-gradient-to-br from-green-100 to-yellow-100 border-4 border-green-400 p-8 text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-3xl font-bold mb-3 text-gray-800">Amazing Counting!</h3>
                <p className="text-lg text-gray-700 mb-4">
                  You organized Old MacDonald's farm perfectly! You can count animals in lines 
                  and scattered groups like a pro!
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {animalGroups.map(group => (
                    <div key={group.id} className="bg-white p-3 rounded-lg border">
                      <div className="text-2xl mb-2">
                        {group.configuration === 'line' ? (
                          <div className="space-y-1">
                            {Array(group.count).fill(group.emoji).map((emoji, i) => (
                              <div key={i}>{emoji}</div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-wrap justify-center gap-1">
                            {Array(group.count).fill(group.emoji).map((emoji, i) => (
                              <span key={i}>{emoji}</span>
                            ))}
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{group.count} {group.type}</p>
                    </div>
                  ))}
                </div>
                <Button 
                  size="lg"
                  onClick={() => {
                    // ensure it's marked (in case user presses Continue without completion being recorded)
                    if (!completed) markLessonComplete(10);
                    navigate('/activities');
                  }}
                   className="bg-green-600 hover:bg-green-700"
                 >
                   Continue Learning
                 </Button>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CountingActivity10;

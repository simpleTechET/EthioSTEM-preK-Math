// src/pages/CountingActivity14.tsx
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Star, BookOpen, Users, Lightbulb, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const CountingActivity14 = () => {
  const navigate = useNavigate();
  const { user, updateProgress } = useAuth();
  const [showGame, setShowGame] = useState(false);
  const [currentStep, setCurrentStep] = useState<'warmup' | 'iceCubes' | 'numberGroups' | 'complete'>('warmup');
  const [selectedNumeral, setSelectedNumeral] = useState<number | null>(null);
  const [objectCount, setObjectCount] = useState<number>(0);
  const [jiveStep, setJiveStep] = useState(0);
  const [popUpCount, setPopUpCount] = useState(0);
  const [currentOrder, setCurrentOrder] = useState<number | null>(null);

  // Jive chant actions
  const jiveChant = [
    { count: "1, 2,", action: "tie my shoe", emoji: "👟" },
    { count: "3, 4,", action: "close the door", emoji: "🚪" },
    { count: "On 5,", action: "we jive", emoji: "💃" },
    { count: "On 5,", action: "we jive", emoji: "🕺" }
  ];

  // Ice cube orders
  const iceCubeOrders = useMemo(() => [1, 2, 3, 2, 1, 3, 2, 1], []);

  const handleJiveStep = () => {
    setJiveStep((prev) => {
      if (prev < jiveChant.length - 1) {
        return prev + 1;
      } else {
        setCurrentStep('iceCubes');
        return 0;
      }
    });
  };

  const handlePopUp = () => {
    setPopUpCount((prev) => {
      if (prev < 5) {
        const newCount = prev + 1;
        if (newCount === 5) {
          toast.success("Pop Up 5! 🎉", { description: "You reached number 5!" });
        }
        return newCount;
      }
      return prev;
    });
  };

  const handleNextOrder = () => {
    if (currentOrder === null) {
      setCurrentOrder(0);
    } else if (currentOrder < iceCubeOrders.length - 1) {
      setCurrentOrder(currentOrder + 1);
    } else {
      setCurrentStep('numberGroups');
    }
  };

  const addObject = () => {
    if (objectCount < 3 && selectedNumeral !== null && objectCount < selectedNumeral) {
      setObjectCount(objectCount + 1);
    }
  };

  const removeObject = () => {
    if (objectCount > 0) {
      setObjectCount(objectCount - 1);
    }
  };

  const checkGroup = () => {
  if (selectedNumeral === null) {
    toast.error("Pick a number first!", { description: "Choose a numeral card to start." });
    return;
  }

  if (objectCount === selectedNumeral) {
    toast.success("Perfect match! 🎉", { 
      description: `You made exactly ${selectedNumeral} object${selectedNumeral > 1 ? 's' : ''}!` 
    });
    
    // Track progress if user is logged in
    if (user) {
      const score = 10; // Perfect score
      const maxScore = 10;
      const timeSpent = 120; // Example: 2 minutes in seconds
      updateProgress('counting-14', score, maxScore, timeSpent);
    }
    
    setTimeout(() => {
      setCurrentStep('complete');
    }, 2000);
  } else {
    toast.error("Not quite! 🤔", { 
      description: `Count carefully to make exactly ${selectedNumeral} object${selectedNumeral > 1 ? 's' : ''}.` 
    });
  }
};

  const resetGame = () => {
    setSelectedNumeral(null);
    setObjectCount(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                Lesson 14
              </span>
              <h1 className="text-2xl font-bold text-gray-800">Numbers to Objects</h1>
            </div>
            <p className="text-sm text-gray-600">Topic D: Numbers 1-3</p>
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
                  Today, your child will learn to <span className="font-bold text-blue-700">look at numerals and count out matching groups of objects</span>, 
                  connecting abstract number symbols to concrete quantities.
                </p>
              </CardContent>
            </Card>

            {/* Introduction */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">From Numbers to Objects</CardTitle>
                <CardDescription>Read this together with your child</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                  <p className="text-lg text-gray-700 mb-4">
                    Today we'll practice reading numbers and creating matching groups of objects!
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-white p-4 rounded-lg border-2 border-indigo-200 text-center">
                      <div className="text-4xl font-bold text-indigo-700 mb-2">1</div>
                      <p className="font-bold text-indigo-700">See the Number</p>
                      <p className="text-sm text-gray-600">Look at the numeral</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border-2 border-blue-200 text-center">
                      <div className="text-3xl mb-2">🧊🧊</div>
                      <p className="font-bold text-blue-700">Count Objects</p>
                      <p className="text-sm text-gray-600">Make a matching group</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border-2 border-cyan-200 text-center">
                      <div className="text-4xl mb-2">✓</div>
                      <p className="font-bold text-cyan-700">Check Match</p>
                      <p className="text-sm text-gray-600">Numbers = Objects</p>
                    </div>
                  </div>
                </div>

                {/* Real World Connection */}
                <div className="bg-cyan-50 p-4 rounded-lg border-2 border-cyan-200">
                  <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="text-2xl">🌍</span> Real World Counting
                  </h4>
                  <p className="text-sm text-gray-600">
                    Just like chefs read recipes to know how many ingredients to use, or cashiers read prices 
                    to count money, we're learning to read numbers and count matching objects!
                  </p>
                </div>

                {/* Game Instructions */}
                <div className="bg-indigo-50 p-4 rounded-lg border-2 border-indigo-200">
                  <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="text-2xl">🎮</span> How to Play
                  </h4>
                  <ol className="text-sm text-gray-600 space-y-2 ml-6">
                    <li><strong>1.</strong> Look at a numeral card (1, 2, or 3)</li>
                    <li><strong>2.</strong> Count out exactly that many objects</li>
                    <li><strong>3.</strong> Check that your group matches the number</li>
                    <li><strong>4.</strong> Practice with different numbers!</li>
                  </ol>
                </div>

                {/* Parent Tips */}
                <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                  <Users className="w-8 h-8 text-purple-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Parent Tips:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Help your child point to each object as they count</li>
                      <li>• Ask: "What number do you see? How many objects should you make?"</li>
                      <li>• Encourage them to stop counting when they reach the target number</li>
                      <li>• Practice with household items: "Can you get 2 spoons for us?"</li>
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
                      <p className="font-bold text-blue-700">Numeral</p>
                      <p className="text-sm text-gray-600">Number symbol like 1, 2, 3</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="font-bold text-blue-700">Count Out</p>
                      <p className="text-sm text-gray-600">Make a group with objects</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="font-bold text-blue-700">Match</p>
                      <p className="text-sm text-gray-600">Make numbers and objects equal</p>
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
                Start Number Matching Activity
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Warm-up Activities */}
            {currentStep === 'warmup' && (
              <>
                {/* Baggie Buddies */}
                <Card className="p-6 bg-green-50 border-2 border-green-200">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">
                    🎒 Baggie Buddies Warm-up
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Look at the objects and find the matching numeral! This helps us connect quantities to numbers.
                  </p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {[1, 2, 3].map(count => (
                      <Card key={count} className="text-center p-4 bg-white border-2 border-gray-200">
                        <div className="text-4xl mb-3">
                          {Array(count).fill('🍂').join('')}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{count} object{count > 1 ? 's' : ''}</p>
                        <div className="text-2xl font-bold text-green-700">
                          {count}
                        </div>
                      </Card>
                    ))}
                  </div>

                  <p className="text-sm text-gray-600 text-center mb-4">
                    "How many objects? Find the matching number!"
                  </p>

                  <Button onClick={() => setJiveStep(0)} className="w-full">
                    Ready for More Warm-ups!
                  </Button>
                </Card>

                {/* On 5 We Jive Chant */}
                <Card className="p-6 bg-pink-50 border-2 border-pink-200 text-center">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">
                    On 5 We Jive Chant!
                  </h3>
                  
                  <div className="bg-white p-6 rounded-lg border-2 border-pink-300 mb-4">
                    <div className="text-3xl font-bold text-purple-700 mb-4">
                      {jiveChant[jiveStep].count}
                    </div>
                    <div className="text-2xl font-bold text-pink-600 animate-bounce">
                      {jiveChant[jiveStep].action}
                    </div>
                    <div className="text-4xl mt-4">
                      {jiveChant[jiveStep].emoji}
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">
                    Let's chant and move together! This helps us practice counting to 5.
                  </p>

                  <Button onClick={handleJiveStep} className="bg-pink-600 hover:bg-pink-700">
                    {jiveStep === 0 ? 'Start Chanting!' : 'Next Action!'}
                  </Button>
                </Card>

                {/* Pop Up 5 */}
                <Card className="p-6 bg-yellow-50 border-2 border-yellow-200 text-center">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">
                    🎉 Pop Up 5!
                  </h3>
                  
                  <div className="bg-white p-6 rounded-lg border-2 border-yellow-300 mb-4">
                    <div className="text-4xl font-bold text-yellow-700 mb-4">
                      {popUpCount}
                    </div>
                    <div className="text-lg text-gray-600 mb-4">
                      {popUpCount < 5 
                        ? "Keep counting to 5!" 
                        : "🎊 You popped up at 5! 🎊"
                      }
                    </div>
                  </div>

                  <Button onClick={handlePopUp} disabled={popUpCount >= 5} className="bg-yellow-600 hover:bg-yellow-700">
                    {popUpCount < 5 ? `Count: ${popUpCount + 1}` : 'Ready for Ice Cubes!'}
                  </Button>
                </Card>
              </>
            )}

            {/* Ice Cube Counting */}
            {currentStep === 'iceCubes' && (
              <>
                <Card className="p-6 bg-cyan-50 border-2 border-cyan-200">
                  <h3 className="text-xl font-bold mb-2 text-gray-800 flex items-center gap-2">
                    <span className="text-2xl">🧊</span> Ice Cube Restaurant
                  </h3>
                  <p className="text-gray-700 mb-4">
                    You're a restaurant worker! Fill drink orders with exactly the right number of ice cubes.
                  </p>
                  
                  {currentOrder !== null && (
                    <div className="bg-white p-4 rounded-lg border-2 border-cyan-300 text-center mb-4">
                      <h4 className="text-lg font-bold text-cyan-700 mb-2">Current Order:</h4>
                      <div className="text-3xl font-bold text-gray-800">
                        {iceCubeOrders[currentOrder]} ice cube{iceCubeOrders[currentOrder] > 1 ? 's' : ''}
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Order {currentOrder + 1} of {iceCubeOrders.length}
                      </p>
                    </div>
                  )}
                </Card>

                <Card className="p-6 bg-white border-2 border-gray-200 text-center">
                  <div className="text-6xl mb-6 min-h-[120px] flex items-center justify-center">
                    {currentOrder !== null ? (
                      Array(iceCubeOrders[currentOrder]).fill('🧊').map((cube, index) => (
                        <span key={index} className="mx-1">{cube}</span>
                      ))
                    ) : (
                      <span className="text-gray-400">Waiting for orders...</span>
                    )}
                  </div>

                  <div className="bg-gray-100 p-4 rounded-lg border-2 border-gray-300 mb-4">
                    <p className="text-sm text-gray-600">
                      {currentOrder === null 
                        ? "Click below to start taking orders!"
                        : `Customer wants ${iceCubeOrders[currentOrder]} ice cube${iceCubeOrders[currentOrder] > 1 ? 's' : ''} in their drink.`
                      }
                    </p>
                  </div>

                  <Button onClick={handleNextOrder} className="bg-cyan-600 hover:bg-cyan-700">
                    {currentOrder === null ? 'Start Taking Orders!' : 'Next Order!'}
                  </Button>
                </Card>
              </>
            )}

            {/* Number to Objects Game */}
            {currentStep === 'numberGroups' && (
              <>
                <Card className="p-6 bg-blue-50 border-2 border-blue-200">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">
                    🔢 Number to Objects Game
                  </h3>
                  <p className="text-gray-700 mb-2">
                    Pick a numeral card and count out exactly that many objects! Match the abstract number to concrete objects.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex-1 bg-white p-2 rounded border text-center">
                      Target: {selectedNumeral ? `${selectedNumeral} object${selectedNumeral > 1 ? 's' : ''}` : 'Pick a number!'}
                    </div>
                    <div className="flex-1 bg-white p-2 rounded border text-center">
                      Current: {objectCount} object{objectCount !== 1 ? 's' : ''}
                    </div>
                  </div>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Numeral Cards */}
                  <Card className="p-6 bg-indigo-50 border-2 border-indigo-200">
                    <h3 className="text-lg font-bold mb-4 text-gray-800 text-center">Pick a Numeral Card</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {[1, 2, 3].map(num => (
                        <Card
                          key={num}
                          onClick={() => {
                            resetGame();
                            setSelectedNumeral(num);
                            toast.info(`Number ${num} selected!`, { 
                              description: `Count out exactly ${num} object${num > 1 ? 's' : ''}.` 
                            });
                          }}
                          className={`
                            text-center p-6 cursor-pointer transition-all
                            ${selectedNumeral === num 
                              ? 'bg-indigo-100 border-4 border-indigo-500 scale-105' 
                              : 'bg-white hover:bg-indigo-50 border-2 border-indigo-300 hover:border-indigo-400'
                            }
                          `}
                        >
                          <div className="text-5xl font-bold text-indigo-700">
                            {num}
                          </div>
                          <p className="text-sm text-gray-600 mt-2">Numeral {num}</p>
                        </Card>
                      ))}
                    </div>
                  </Card>

                  {/* Object Counting */}
                  <Card className="p-6 bg-green-50 border-2 border-green-200">
                    <h3 className="text-lg font-bold mb-4 text-gray-800 text-center">Count Your Objects</h3>
                    
                    <div className="bg-white p-6 rounded-lg border-2 border-green-300 mb-4 min-h-[120px] flex items-center justify-center">
                      <div className="text-4xl">
                        {Array(objectCount).fill('🧱').map((obj, index) => (
                          <span key={index} className="mx-1">{obj}</span>
                        ))}
                        {objectCount === 0 && (
                          <span className="text-gray-400">No objects yet</span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-4 justify-center mb-4">
                      <Button onClick={removeObject} disabled={objectCount === 0} size="lg">
                        -
                      </Button>
                      <div className="px-6 py-2 bg-white rounded border-2 border-green-300 text-xl font-bold">
                        {objectCount}
                      </div>
                      <Button 
                        onClick={addObject} 
                        disabled={objectCount === 3 || (selectedNumeral !== null && objectCount >= selectedNumeral)} 
                        size="lg"
                      >
                        +
                      </Button>
                    </div>

                    <p className="text-sm text-gray-600 text-center mb-4">
                      {selectedNumeral === null 
                        ? "Pick a number card first!"
                        : objectCount === selectedNumeral
                        ? "✓ Perfect match!"
                        : `Make exactly ${selectedNumeral} object${selectedNumeral > 1 ? 's' : ''}`
                      }
                    </p>

                    <Button 
                      onClick={checkGroup}
                      disabled={selectedNumeral === null}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      Check My Group
                    </Button>
                  </Card>
                </div>
              </>
            )}

            {/* Completion */}
            {currentStep === 'complete' && (
              <Card className="bg-gradient-to-br from-blue-100 to-indigo-100 border-4 border-blue-400 p-8 text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-3xl font-bold mb-3 text-gray-800">Number Expert! 🏆</h3>
                <p className="text-lg text-gray-700 mb-4">
                  You perfectly matched numerals to objects! You can read numbers and count matching groups like a pro!
                </p>
                <div className="bg-white p-4 rounded-lg border-2 border-blue-300 mb-6">
                  <p className="text-sm text-gray-600">
                    <strong>You showed that {selectedNumeral} means:</strong><br/>
                    • The numeral {selectedNumeral}<br/>
                    • {selectedNumeral} object{selectedNumeral && selectedNumeral > 1 ? 's' : ''} in a group<br/>
                    • The same quantity in both!
                  </p>
                </div>
                <Button 
                  size="lg"
                  onClick={() => navigate('/activities')}
                  className="bg-blue-600 hover:bg-blue-700"
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

export default CountingActivity14;

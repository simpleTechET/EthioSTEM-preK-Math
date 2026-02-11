import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Volume2, VolumeX, Check, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const CountingMatching24 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/activities">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-foreground">Lesson 24: Numeral to Objects</h1>
            <p className="text-sm text-muted-foreground">Look at a numeral and count out objects to match</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="intro" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="intro">Introduction</TabsTrigger>
            <TabsTrigger value="fluency">Fluency</TabsTrigger>
            <TabsTrigger value="application">Application</TabsTrigger>
            <TabsTrigger value="concept">Practice</TabsTrigger>
          </TabsList>

          <TabsContent value="intro">
            <IntroductionSection />
          </TabsContent>

          <TabsContent value="fluency">
            <FluencySection />
          </TabsContent>

          <TabsContent value="application">
            <ApplicationSection />
          </TabsContent>

          <TabsContent value="concept">
            <ConceptSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Introduction Section
const IntroductionSection = () => {
  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Welcome to Lesson 24! 🔢</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-xl">
          <h3 className="font-bold text-lg mb-3">Today's Objective</h3>
          <p className="text-lg">Look at a numeral and count out a group of objects to match!</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">🎹 Fluency Practice (6 min)</h4>
            <ul className="text-sm space-y-1">
              <li>• Counting on the Piano (with volume!)</li>
              <li>• Baggie Buddies - Match to 5</li>
            </ul>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">🌭 Application (4 min)</h4>
            <p className="text-sm">Sam's Sausage Shack - Cook the right number!</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">🧊 Concept Development (12 min)</h4>
            <p className="text-sm">Restaurant ice cube counting game</p>
          </div>
          <div className="bg-amber-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">💡 Key Skill</h4>
            <p className="text-sm">See a numeral → Count out that many objects!</p>
          </div>
        </div>

        <p className="text-center text-muted-foreground">
          Click the tabs above to explore each activity!
        </p>
      </CardContent>
    </Card>
  );
};

// Fluency Section - Piano Counting & Baggie Buddies
const FluencySection = () => {
  const [activity, setActivity] = useState<"piano" | "baggie">("piano");

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-center gap-4 mb-6">
        <Button
          variant={activity === "piano" ? "default" : "outline"}
          onClick={() => setActivity("piano")}
        >
          🎹 Piano Counting
        </Button>
        <Button
          variant={activity === "baggie" ? "default" : "outline"}
          onClick={() => setActivity("baggie")}
        >
          🎒 Baggie Buddies
        </Button>
      </div>

      {activity === "piano" ? <PianoCounting /> : <BaggieBuddies />}
    </div>
  );
};

// Piano Counting with Volume
const PianoCounting = () => {
  const [currentKey, setCurrentKey] = useState<number | null>(null);
  const [showTemplate, setShowTemplate] = useState(true);

  const pianoKeys = [1, 2, 3, 4, 5];
  const volumeLevels = ["🔈", "🔉", "🔉", "🔊", "📢"];
  const volumeDescriptions = ["whisper", "soft", "normal", "loud", "SHOUT!"];

  const handleKeyPress = (num: number) => {
    setCurrentKey(num);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">🎹 Counting the Math Way on the Piano</CardTitle>
        <p className="text-center text-muted-foreground">
          Count louder as the numbers get bigger!
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowTemplate(!showTemplate)}
          >
            {showTemplate ? "Hide Numbers" : "Show Numbers"}
          </Button>
        </div>

        {/* Piano Keys */}
        <div className="flex justify-center gap-2">
          {pianoKeys.map((num, idx) => (
            <button
              key={num}
              onClick={() => handleKeyPress(num)}
              className={`w-16 h-32 rounded-b-lg border-2 transition-all duration-200 flex flex-col items-center justify-end pb-4 ${
                currentKey === num
                  ? "bg-indigo-500 border-indigo-600 text-white scale-95"
                  : "bg-white border-gray-300 hover:bg-indigo-100"
              }`}
            >
              {showTemplate && (
                <span className="text-2xl font-bold">{num}</span>
              )}
              <span className="text-lg">{volumeLevels[idx]}</span>
            </button>
          ))}
        </div>

        {/* Current Number Display */}
        {currentKey && (
          <div className="text-center space-y-4 animate-in fade-in">
            <div className="text-6xl font-bold text-indigo-600">{currentKey}</div>
            <div className="text-2xl">
              Say it {volumeDescriptions[currentKey - 1]}! {volumeLevels[currentKey - 1]}
            </div>
            <div className="flex justify-center gap-2">
              {Array.from({ length: currentKey }).map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 bg-indigo-400 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 100}ms` }}
                />
              ))}
            </div>
          </div>
        )}

        <div className="bg-indigo-50 p-4 rounded-lg text-center">
          <p className="font-medium">🎵 Start at 1 with a whisper, get LOUDER as you count to 5! 🎵</p>
        </div>
      </CardContent>
    </Card>
  );
};

// Baggie Buddies - Match objects to numerals
const BaggieBuddies = () => {
  const [currentRound, setCurrentRound] = useState(0);
  const [selectedNumeral, setSelectedNumeral] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  const rounds = [
    { objects: "🍎", count: 3, label: "apples" },
    { objects: "⭐", count: 5, label: "stars" },
    { objects: "🐟", count: 2, label: "fish" },
    { objects: "🌺", count: 4, label: "flowers" },
    { objects: "🦋", count: 1, label: "butterfly" },
  ];

  const current = rounds[currentRound];
  const numeralOptions = [1, 2, 3, 4, 5];

  const handleNumeralSelect = (num: number) => {
    setSelectedNumeral(num);
    setShowFeedback(true);
    if (num === current.count) {
      setScore(score + 1);
    }
  };

  const nextRound = () => {
    if (currentRound < rounds.length - 1) {
      setCurrentRound(currentRound + 1);
      setSelectedNumeral(null);
      setShowFeedback(false);
    }
  };

  const isComplete = currentRound === rounds.length - 1 && showFeedback;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">🎒 Baggie Buddies</CardTitle>
        <p className="text-center text-muted-foreground">
          Count the objects and pick the matching numeral!
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            Round {currentRound + 1} of {rounds.length}
          </span>
          <span className="text-sm font-medium text-green-600">
            Score: {score}/{rounds.length}
          </span>
        </div>

        {/* Objects Display */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-xl text-center">
          <p className="text-sm text-muted-foreground mb-4">How many {current.label}?</p>
          <div className="flex justify-center gap-3 flex-wrap">
            {Array.from({ length: current.count }).map((_, i) => (
              <span key={i} className="text-5xl animate-bounce" style={{ animationDelay: `${i * 100}ms` }}>
                {current.objects}
              </span>
            ))}
          </div>
        </div>

        {/* Numeral Selection */}
        <div className="flex justify-center gap-3">
          {numeralOptions.map((num) => (
            <button
              key={num}
              onClick={() => !showFeedback && handleNumeralSelect(num)}
              disabled={showFeedback}
              className={`w-16 h-16 rounded-xl text-2xl font-bold border-3 transition-all ${
                showFeedback
                  ? num === current.count
                    ? "bg-green-500 text-white border-green-600"
                    : num === selectedNumeral
                    ? "bg-red-400 text-white border-red-500"
                    : "bg-gray-100 border-gray-200"
                  : "bg-indigo-100 border-indigo-300 hover:bg-indigo-200 hover:scale-105"
              }`}
            >
              {num}
            </button>
          ))}
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className={`text-center p-4 rounded-lg ${selectedNumeral === current.count ? "bg-green-100" : "bg-red-100"}`}>
            {selectedNumeral === current.count ? (
              <p className="text-lg font-medium text-green-700">✅ Correct! {current.count} {current.label}!</p>
            ) : (
              <p className="text-lg font-medium text-red-700">
                ❌ Not quite! Count again: {current.count} {current.label}
              </p>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-center gap-4">
          {showFeedback && !isComplete && (
            <Button onClick={nextRound}>Next Round →</Button>
          )}
          {isComplete && (
            <div className="text-center space-y-4">
              <p className="text-xl font-bold text-green-600">
                🎉 Great job! You scored {score}/{rounds.length}!
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Application Section - Sam's Sausage Shack
const ApplicationSection = () => {
  const [targetNumber, setTargetNumber] = useState<number | null>(null);
  const [placedSausages, setPlacedSausages] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [round, setRound] = useState(1);
  const { toast } = useToast();

  const generateTarget = () => {
    const num = Math.floor(Math.random() * 5) + 1;
    setTargetNumber(num);
    setPlacedSausages([]);
    setShowResult(false);
  };

  const addSausage = () => {
    if (placedSausages.length < 8) {
      setPlacedSausages([...placedSausages, placedSausages.length + 1]);
    }
  };

  const removeSausage = () => {
    if (placedSausages.length > 0) {
      setPlacedSausages(placedSausages.slice(0, -1));
    }
  };

  const checkAnswer = () => {
    setShowResult(true);
    if (placedSausages.length === targetNumber) {
      toast({
        title: "🌭 Perfect!",
        description: `You cooked exactly ${targetNumber} sausages!`,
      });
    }
  };

  const nextOrder = () => {
    setRound(round + 1);
    generateTarget();
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">🌭 Sam's Sausage Shack</CardTitle>
        <p className="text-center text-muted-foreground">
          Cook the right number of sausages for hungry customers!
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {!targetNumber ? (
          <div className="text-center space-y-6">
            <div className="text-6xl">👨‍🍳</div>
            <p className="text-lg">Ready to cook some sausages?</p>
            <Button size="lg" onClick={generateTarget}>
              Start Cooking! 🍳
            </Button>
          </div>
        ) : (
          <>
            <div className="text-center text-sm text-muted-foreground">Order #{round}</div>
            
            {/* Customer Order */}
            <div className="bg-gradient-to-br from-orange-100 to-amber-100 p-6 rounded-xl text-center">
              <p className="text-lg mb-4">🧑 Customer wants:</p>
              <div className="flex justify-center gap-2 mb-2">
                {Array.from({ length: targetNumber }).map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 bg-amber-400 rounded-full border-2 border-amber-600"
                  />
                ))}
              </div>
              <div className="text-4xl font-bold text-amber-700">{targetNumber}</div>
              <p className="text-sm text-muted-foreground">sausages</p>
            </div>

            {/* Grill */}
            <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-xl">
              <div className="flex justify-center gap-2 min-h-[60px] flex-wrap">
                {placedSausages.map((_, i) => (
                  <div
                    key={i}
                    className="text-4xl animate-in slide-in-from-top"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    🌭
                  </div>
                ))}
                {placedSausages.length === 0 && (
                  <p className="text-gray-400 italic">Grill is empty</p>
                )}
              </div>
            </div>

            {/* Controls */}
            {!showResult && (
              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={removeSausage} disabled={placedSausages.length === 0}>
                  Remove 🌭
                </Button>
                <Button onClick={addSausage} disabled={placedSausages.length >= 8}>
                  Add 🌭
                </Button>
              </div>
            )}

            <div className="text-center">
              <p className="text-lg">
                Sausages on grill: <span className="font-bold text-2xl">{placedSausages.length}</span>
              </p>
            </div>

            {!showResult ? (
              <div className="flex justify-center">
                <Button size="lg" onClick={checkAnswer} disabled={placedSausages.length === 0}>
                  Serve Order! 🍽️
                </Button>
              </div>
            ) : (
              <div className={`text-center p-4 rounded-lg ${
                placedSausages.length === targetNumber ? "bg-green-100" : "bg-red-100"
              }`}>
                {placedSausages.length === targetNumber ? (
                  <div className="space-y-2">
                    <p className="text-xl font-bold text-green-700">✅ Perfect Order!</p>
                    <p>You cooked exactly {targetNumber} sausages!</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-xl font-bold text-red-700">❌ Oops!</p>
                    <p>Customer wanted {targetNumber}, but you made {placedSausages.length}</p>
                  </div>
                )}
                <Button className="mt-4" onClick={nextOrder}>
                  Next Customer →
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

// Concept Development - Restaurant Ice Cube Game
const ConceptSection = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [cubesInCup, setCubesInCup] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const orders = [
    { numeral: 3, color: "bg-blue-400" },
    { numeral: 5, color: "bg-cyan-400" },
    { numeral: 2, color: "bg-indigo-400" },
    { numeral: 4, color: "bg-purple-400" },
    { numeral: 1, color: "bg-teal-400" },
  ];

  const current = orders[currentCard];

  const addCube = () => {
    if (cubesInCup.length < 8 && !showResult) {
      setCubesInCup([...cubesInCup, cubesInCup.length + 1]);
    }
  };

  const removeCube = () => {
    if (cubesInCup.length > 0 && !showResult) {
      setCubesInCup(cubesInCup.slice(0, -1));
    }
  };

  const checkOrder = () => {
    setShowResult(true);
    if (cubesInCup.length === current.numeral) {
      setScore(score + 1);
    }
  };

  const nextOrder = () => {
    if (currentCard < orders.length - 1) {
      setCurrentCard(currentCard + 1);
      setCubesInCup([]);
      setShowResult(false);
    } else {
      setIsComplete(true);
    }
  };

  if (isComplete) {
    return (
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">🎉 Lesson Complete!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="text-6xl">🏆</div>
          <p className="text-2xl font-bold text-green-600">
            Great job! You scored {score}/{orders.length}!
          </p>
          <p className="text-lg text-muted-foreground">
            You learned to look at a numeral and count out matching objects!
          </p>
          
          <div className="bg-indigo-50 p-6 rounded-xl space-y-4">
            <h3 className="font-bold text-lg">🎓 What You Learned</h3>
            <ul className="text-left space-y-2 max-w-md mx-auto">
              <li>✅ See a numeral (like 4)</li>
              <li>✅ Count out that many objects</li>
              <li>✅ Stop when you reach the target number</li>
              <li>✅ Check your work!</li>
            </ul>
          </div>

          <Link to="/activities">
            <Button size="lg" className="mt-4">
              Continue Learning →
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">🧊 Restaurant Ice Cube Orders</CardTitle>
        <p className="text-center text-muted-foreground">
          You're a waiter! See the numeral and add that many ice cubes to the drink!
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            Order {currentCard + 1} of {orders.length}
          </span>
          <span className="text-sm font-medium text-green-600">
            Score: {score}/{orders.length}
          </span>
        </div>

        {/* Numeral Card */}
        <div className="flex justify-center">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white w-32 h-40 rounded-xl flex flex-col items-center justify-center shadow-lg">
            <span className="text-6xl font-bold">{current.numeral}</span>
            <span className="text-sm mt-2">ice cubes needed</span>
          </div>
        </div>

        {/* Cup with Ice Cubes */}
        <div className="flex justify-center">
          <div className="relative">
            {/* Cup */}
            <div className="w-40 h-48 bg-gradient-to-b from-gray-100 to-gray-200 rounded-b-3xl border-4 border-gray-300 flex flex-col items-center justify-end p-4 overflow-hidden">
              {/* Ice cubes in cup */}
              <div className="flex flex-wrap justify-center gap-1 mb-4">
                {cubesInCup.map((_, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 ${current.color} rounded-md opacity-80 animate-in slide-in-from-top shadow-md`}
                    style={{ animationDelay: `${i * 50}ms` }}
                  />
                ))}
              </div>
              {cubesInCup.length === 0 && (
                <p className="text-gray-400 text-sm text-center">Empty cup</p>
              )}
            </div>
            {/* Cup top rim */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-44 h-3 bg-gray-300 rounded-t-lg" />
          </div>
        </div>

        {/* Count Display */}
        <div className="text-center">
          <p className="text-lg">
            Ice cubes: <span className="font-bold text-3xl text-indigo-600">{cubesInCup.length}</span>
          </p>
          {!showResult && cubesInCup.length === current.numeral && (
            <p className="text-green-600 font-medium animate-pulse">🎯 That looks right! Check your order!</p>
          )}
        </div>

        {/* Controls */}
        {!showResult && (
          <div className="flex justify-center gap-4">
            <Button variant="outline" onClick={removeCube} disabled={cubesInCup.length === 0}>
              Remove 🧊
            </Button>
            <Button onClick={addCube} disabled={cubesInCup.length >= 8}>
              Add 🧊
            </Button>
          </div>
        )}

        {/* Check / Result */}
        {!showResult ? (
          <div className="flex justify-center">
            <Button size="lg" onClick={checkOrder} disabled={cubesInCup.length === 0}>
              Serve Drink! 🥤
            </Button>
          </div>
        ) : (
          <div className={`text-center p-4 rounded-lg ${
            cubesInCup.length === current.numeral ? "bg-green-100" : "bg-red-100"
          }`}>
            {cubesInCup.length === current.numeral ? (
              <div className="flex items-center justify-center gap-2">
                <Check className="w-6 h-6 text-green-600" />
                <span className="text-lg font-medium text-green-700">
                  Perfect! Exactly {current.numeral} ice cubes!
                </span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <X className="w-6 h-6 text-red-600" />
                <span className="text-lg font-medium text-red-700">
                  Needed {current.numeral}, but you put {cubesInCup.length}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        {showResult && (
          <div className="flex justify-center">
            <Button onClick={nextOrder}>
              {currentCard < orders.length - 1 ? "Next Order →" : "Finish Lesson 🎉"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CountingMatching24;
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Volume2, Star, Check, X, Sparkles, PenTool } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CountingMatching25 = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("fluency");

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-pink-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/activities")}
            className="flex items-center gap-2 text-purple-700 hover:text-purple-900 hover:bg-purple-100"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Activities
          </Button>
          <h1 className="text-lg font-bold text-purple-800">Lesson 25: Number Representations</h1>
          <div className="w-24" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Lesson Objective */}
        <Card className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-full">
                <PenTool className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-bold text-lg">Today's Goal</h2>
                <p className="text-white/90">Represent numbers 1–5 using objects, pictures, and numerals!</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lesson Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 bg-white/80 p-1 rounded-xl">
            <TabsTrigger
              value="fluency"
              className="data-[state=active]:bg-purple-500 data-[state=active]:text-white rounded-lg"
            >
              🧊 Ice Cubes
            </TabsTrigger>
            <TabsTrigger
              value="concept"
              className="data-[state=active]:bg-pink-500 data-[state=active]:text-white rounded-lg"
            >
              📚 Number Book
            </TabsTrigger>
            <TabsTrigger
              value="debrief"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-lg"
            >
              🌟 Share & Reflect
            </TabsTrigger>
          </TabsList>

          <TabsContent value="fluency" className="space-y-4">
            <FluencyPractice onComplete={() => setActiveTab("concept")} />
          </TabsContent>

          <TabsContent value="concept" className="space-y-4">
            <ConceptDevelopment onComplete={() => setActiveTab("debrief")} />
          </TabsContent>

          <TabsContent value="debrief" className="space-y-4">
            <StudentDebrief />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

// Fluency Practice: Counting Ice Cubes to 5
const FluencyPractice = ({ onComplete }: { onComplete: () => void }) => {
  const [currentRound, setCurrentRound] = useState(0);
  const [selectedCup, setSelectedCup] = useState<number | null>(null);
  const [cubesPlaced, setCubesPlaced] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const rounds = [
    { cubes: 3, instruction: "Count the ice cubes and put them in the right cup!" },
    { cubes: 5, instruction: "How many ice cubes? Find the matching cup!" },
    { cubes: 2, instruction: "Count carefully and match!" },
    { cubes: 4, instruction: "Where do these ice cubes go?" },
    { cubes: 1, instruction: "One more round! Count and match!" },
  ];

  const currentTarget = rounds[currentRound]?.cubes || 0;

  const handleCupClick = (cupNumber: number) => {
    if (showFeedback) return;
    setSelectedCup(cupNumber);
    setCubesPlaced(Array(currentTarget).fill(cupNumber));
    setShowFeedback(true);
    setIsCorrect(cupNumber === currentTarget);

    setTimeout(() => {
      if (cupNumber === currentTarget) {
        if (currentRound < rounds.length - 1) {
          setCurrentRound(prev => prev + 1);
          setSelectedCup(null);
          setCubesPlaced([]);
          setShowFeedback(false);
        } else {
          setIsComplete(true);
        }
      } else {
        setSelectedCup(null);
        setCubesPlaced([]);
        setShowFeedback(false);
      }
    }, 1500);
  };

  const speakInstruction = () => {
    const utterance = new SpeechSynthesisUtterance(rounds[currentRound].instruction);
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  if (isComplete) {
    return (
      <Card className="bg-gradient-to-br from-green-100 to-emerald-100 border-green-300">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold text-green-700 mb-2">Ice Cube Master!</h3>
          <p className="text-green-600 mb-6">You matched all the ice cubes perfectly!</p>
          <Button onClick={onComplete} className="bg-green-500 hover:bg-green-600">
            Continue to Number Book →
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/90 backdrop-blur border-purple-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-purple-800">🧊 Counting Ice Cubes</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-purple-600">Round {currentRound + 1}/{rounds.length}</span>
            <Button variant="ghost" size="icon" onClick={speakInstruction}>
              <Volume2 className="w-5 h-5 text-purple-600" />
            </Button>
          </div>
        </div>

        <p className="text-center text-lg text-purple-700 mb-6">{rounds[currentRound].instruction}</p>

        {/* Ice Cubes Display */}
        <div className="flex justify-center gap-3 mb-8 min-h-[80px]">
          {Array(currentTarget).fill(0).map((_, i) => (
            <div
              key={i}
              className={`w-14 h-14 bg-gradient-to-br from-cyan-200 to-blue-300 rounded-lg shadow-lg border-2 border-cyan-400 flex items-center justify-center transition-all duration-300 ${
                cubesPlaced.length > 0 ? 'opacity-30 scale-75' : 'animate-bounce'
              }`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <span className="text-2xl">🧊</span>
            </div>
          ))}
        </div>

        {/* Cups */}
        <div className="flex justify-center gap-4 flex-wrap">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              onClick={() => handleCupClick(num)}
              disabled={showFeedback}
              className={`relative transition-all duration-300 transform hover:scale-110 ${
                selectedCup === num
                  ? isCorrect
                    ? 'scale-110 ring-4 ring-green-400'
                    : 'scale-110 ring-4 ring-red-400 animate-shake'
                  : ''
              }`}
            >
              <div className="w-20 h-24 bg-gradient-to-b from-amber-100 to-amber-200 rounded-b-3xl rounded-t-lg border-2 border-amber-400 flex flex-col items-center justify-center shadow-lg">
                <span className="text-2xl font-bold text-amber-800">{num}</span>
                {selectedCup === num && cubesPlaced.length > 0 && (
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-0.5">
                    {cubesPlaced.map((_, i) => (
                      <span key={i} className="text-xs">🧊</span>
                    ))}
                  </div>
                )}
              </div>
              {showFeedback && selectedCup === num && (
                <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center ${
                  isCorrect ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  {isCorrect ? <Check className="w-5 h-5 text-white" /> : <X className="w-5 h-5 text-white" />}
                </div>
              )}
            </button>
          ))}
        </div>

        {showFeedback && (
          <p className={`text-center mt-6 text-lg font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
            {isCorrect ? '🎉 Perfect match!' : `Try again! Count the ice cubes: ${currentTarget}`}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

// Concept Development: Number Book Creator
const ConceptDevelopment = ({ onComplete }: { onComplete: () => void }) => {
  const [currentNumber, setCurrentNumber] = useState(1);
  const [drawnItems, setDrawnItems] = useState<{ [key: number]: string[] }>({
    1: [], 2: [], 3: [], 4: [], 5: []
  });
  const [showCelebration, setShowCelebration] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const itemOptions = [
    { emoji: "⭐", name: "star" },
    { emoji: "❤️", name: "heart" },
    { emoji: "🌸", name: "flower" },
    { emoji: "🦋", name: "butterfly" },
    { emoji: "🍎", name: "apple" },
    { emoji: "🚗", name: "car" },
    { emoji: "🎈", name: "balloon" },
    { emoji: "🐱", name: "cat" },
  ];

  const addItem = (emoji: string) => {
    const currentItems = drawnItems[currentNumber] || [];
    if (currentItems.length < currentNumber) {
      setDrawnItems(prev => ({
        ...prev,
        [currentNumber]: [...currentItems, emoji]
      }));
    }
    if (currentItems.length + 1 === currentNumber) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 1500);
    }
  };

  const removeItem = (index: number) => {
    setDrawnItems(prev => ({
      ...prev,
      [currentNumber]: prev[currentNumber].filter((_, i) => i !== index)
    }));
  };

  const clearPage = () => {
    setDrawnItems(prev => ({
      ...prev,
      [currentNumber]: []
    }));
  };

  const nextPage = () => {
    if (currentNumber < 5) {
      setCurrentNumber(prev => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const prevPage = () => {
    if (currentNumber > 1) {
      setCurrentNumber(prev => prev - 1);
    }
  };

  const isPageComplete = (drawnItems[currentNumber]?.length || 0) === currentNumber;

  if (isComplete) {
    return (
      <Card className="bg-gradient-to-br from-pink-100 to-purple-100 border-pink-300">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-2xl font-bold text-pink-700 mb-4">Your Number Book is Complete!</h3>
          
          {/* Mini book preview */}
          <div className="flex justify-center gap-2 mb-6 flex-wrap">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="w-16 h-20 bg-white rounded-lg shadow-md border-2 border-pink-200 flex flex-col items-center justify-center">
                <span className="text-lg font-bold text-pink-600">{num}</span>
                <div className="flex flex-wrap justify-center gap-0.5 mt-1">
                  {drawnItems[num]?.map((emoji, i) => (
                    <span key={i} className="text-xs">{emoji}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <Button onClick={onComplete} className="bg-pink-500 hover:bg-pink-600">
            Continue to Share & Reflect →
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/90 backdrop-blur border-pink-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-pink-800">📚 Create Your Number Book</h3>
          <span className="text-sm text-pink-600">Page {currentNumber} of 5</span>
        </div>

        <p className="text-center text-pink-700 mb-4">
          Add exactly <span className="font-bold text-2xl text-pink-600">{currentNumber}</span> item{currentNumber > 1 ? 's' : ''} to your page!
        </p>

        {/* Book Page */}
        <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-4 border-amber-300 p-6 mb-6 min-h-[200px] shadow-lg">
          {/* Page number */}
          <div className="absolute top-2 right-4 text-4xl font-bold text-amber-400">{currentNumber}</div>
          
          {/* Drawn items */}
          <div className="flex justify-center items-center gap-4 flex-wrap min-h-[120px]">
            {drawnItems[currentNumber]?.map((emoji, i) => (
              <button
                key={i}
                onClick={() => removeItem(i)}
                className="text-5xl transform hover:scale-110 transition-transform hover:rotate-12 cursor-pointer"
                title="Click to remove"
              >
                {emoji}
              </button>
            ))}
            {/* Empty slots */}
            {Array(currentNumber - (drawnItems[currentNumber]?.length || 0)).fill(0).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="w-14 h-14 border-2 border-dashed border-amber-300 rounded-lg flex items-center justify-center text-amber-300"
              >
                ?
              </div>
            ))}
          </div>

          {showCelebration && (
            <div className="absolute inset-0 flex items-center justify-center bg-yellow-400/30 rounded-xl">
              <div className="text-4xl animate-bounce">🎉 Perfect!</div>
            </div>
          )}
        </div>

        {/* Item palette */}
        <div className="bg-pink-50 rounded-xl p-4 mb-4">
          <p className="text-sm text-pink-600 mb-2 text-center">Click to add items to your page:</p>
          <div className="flex justify-center gap-3 flex-wrap">
            {itemOptions.map((item) => (
              <button
                key={item.name}
                onClick={() => addItem(item.emoji)}
                disabled={(drawnItems[currentNumber]?.length || 0) >= currentNumber}
                className="text-3xl p-2 bg-white rounded-lg shadow hover:shadow-lg transition-all transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {item.emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={prevPage}
            disabled={currentNumber === 1}
            className="border-pink-300 text-pink-600"
          >
            ← Previous
          </Button>
          
          <Button
            variant="ghost"
            onClick={clearPage}
            className="text-pink-400 hover:text-pink-600"
          >
            Clear Page
          </Button>

          <Button
            onClick={nextPage}
            disabled={!isPageComplete}
            className={`${isPageComplete ? 'bg-pink-500 hover:bg-pink-600' : 'bg-gray-300'}`}
          >
            {currentNumber === 5 ? 'Finish Book' : 'Next Page'} →
          </Button>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-4">
          {[1, 2, 3, 4, 5].map((num) => (
            <div
              key={num}
              className={`w-3 h-3 rounded-full transition-all ${
                num === currentNumber
                  ? 'bg-pink-500 scale-125'
                  : (drawnItems[num]?.length || 0) === num
                    ? 'bg-green-400'
                    : 'bg-pink-200'
              }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Student Debrief
const StudentDebrief = () => {
  const navigate = useNavigate();
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [sharedWays, setSharedWays] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const representationWays = [
    { id: "fingers", emoji: "✋", label: "Fingers" },
    { id: "dots", emoji: "⚫", label: "Dots" },
    { id: "objects", emoji: "🧸", label: "Objects" },
    { id: "pictures", emoji: "🖼️", label: "Pictures" },
    { id: "numerals", emoji: "🔢", label: "Numerals" },
    { id: "sounds", emoji: "👏", label: "Claps" },
  ];

  const toggleWay = (id: string) => {
    setSharedWays(prev =>
      prev.includes(id)
        ? prev.filter(w => w !== id)
        : [...prev, id]
    );
  };

  const handleComplete = () => {
    setIsComplete(true);
  };

  if (isComplete) {
    return (
      <Card className="bg-gradient-to-br from-yellow-100 to-orange-100 border-yellow-300">
        <CardContent className="p-8 text-center">
          <Sparkles className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-yellow-700 mb-2">Amazing Work!</h3>
          <p className="text-yellow-600 mb-2">You've learned so many ways to show numbers 1-5!</p>
          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3, 4, 5].map(num => (
              <span key={num} className="text-3xl font-bold text-orange-500">{num}</span>
            ))}
          </div>
          <div className="space-y-3">
            <p className="text-sm text-yellow-700">
              Remember: The same number can be shown with fingers, dots, pictures, objects, and numerals!
            </p>
            <Button
              onClick={() => navigate("/activities")}
              className="bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              Continue Learning →
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/90 backdrop-blur border-orange-200">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-orange-800 mb-4">🌟 Share & Reflect</h3>

        {/* Number Selection */}
        <div className="mb-6">
          <p className="text-orange-700 mb-3">Pick a number to explore:</p>
          <div className="flex justify-center gap-3">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => setSelectedNumber(num)}
                className={`w-14 h-14 rounded-xl text-2xl font-bold transition-all transform hover:scale-110 ${
                  selectedNumber === num
                    ? 'bg-orange-500 text-white shadow-lg scale-110'
                    : 'bg-orange-100 text-orange-600 hover:bg-orange-200'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {selectedNumber && (
          <div className="space-y-4">
            <p className="text-orange-700 text-center">
              How can you show <span className="font-bold text-2xl text-orange-600">{selectedNumber}</span>? Select all the ways:
            </p>

            <div className="grid grid-cols-3 gap-3">
              {representationWays.map((way) => (
                <button
                  key={way.id}
                  onClick={() => toggleWay(way.id)}
                  className={`p-4 rounded-xl transition-all ${
                    sharedWays.includes(way.id)
                      ? 'bg-green-100 border-2 border-green-400 shadow-md'
                      : 'bg-orange-50 border-2 border-orange-200 hover:border-orange-400'
                  }`}
                >
                  <span className="text-3xl block mb-1">{way.emoji}</span>
                  <span className="text-sm text-orange-700">{way.label}</span>
                  {sharedWays.includes(way.id) && (
                    <Check className="w-4 h-4 text-green-500 mx-auto mt-1" />
                  )}
                </button>
              ))}
            </div>

            {/* Visual demonstrations */}
            {sharedWays.length > 0 && (
              <div className="bg-orange-50 rounded-xl p-4 mt-4">
                <p className="text-sm text-orange-600 mb-3 text-center">Here's {selectedNumber} shown different ways:</p>
                <div className="flex justify-center gap-4 flex-wrap">
                  {sharedWays.includes("fingers") && (
                    <div className="text-center">
                      <div className="text-3xl">{["☝️", "✌️", "🤟", "🖐️", "🖐️"][selectedNumber - 1]}</div>
                      <span className="text-xs text-orange-500">Fingers</span>
                    </div>
                  )}
                  {sharedWays.includes("dots") && (
                    <div className="text-center">
                      <div className="flex gap-0.5 justify-center">
                        {Array(selectedNumber).fill(0).map((_, i) => (
                          <span key={i} className="text-xl">⚫</span>
                        ))}
                      </div>
                      <span className="text-xs text-orange-500">Dots</span>
                    </div>
                  )}
                  {sharedWays.includes("objects") && (
                    <div className="text-center">
                      <div className="flex gap-0.5 justify-center">
                        {Array(selectedNumber).fill(0).map((_, i) => (
                          <span key={i} className="text-xl">🧸</span>
                        ))}
                      </div>
                      <span className="text-xs text-orange-500">Objects</span>
                    </div>
                  )}
                  {sharedWays.includes("pictures") && (
                    <div className="text-center">
                      <div className="flex gap-0.5 justify-center">
                        {Array(selectedNumber).fill(0).map((_, i) => (
                          <span key={i} className="text-xl">⭐</span>
                        ))}
                      </div>
                      <span className="text-xs text-orange-500">Pictures</span>
                    </div>
                  )}
                  {sharedWays.includes("numerals") && (
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-600">{selectedNumber}</div>
                      <span className="text-xs text-orange-500">Numeral</span>
                    </div>
                  )}
                  {sharedWays.includes("sounds") && (
                    <div className="text-center">
                      <div className="flex gap-0.5 justify-center">
                        {Array(selectedNumber).fill(0).map((_, i) => (
                          <span key={i} className="text-xl">👏</span>
                        ))}
                      </div>
                      <span className="text-xs text-orange-500">Claps</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="text-center mt-6">
              <Button
                onClick={handleComplete}
                disabled={sharedWays.length < 2}
                className="bg-orange-500 hover:bg-orange-600"
              >
                {sharedWays.length < 2 ? `Select at least 2 ways` : 'Complete Lesson! 🎉'}
              </Button>
            </div>
          </div>
        )}

        {!selectedNumber && (
          <p className="text-center text-orange-400 mt-4">Pick a number above to explore!</p>
        )}
      </CardContent>
    </Card>
  );
};

export default CountingMatching25;
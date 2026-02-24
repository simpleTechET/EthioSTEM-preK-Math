import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Volume2, Check, X, Sparkles, BookOpen, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CountingMatching26 = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("concept");

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/activities/module-1")}
            className="flex items-center gap-2 text-indigo-700 hover:text-indigo-900 hover:bg-indigo-100"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Activities
          </Button>
          <h1 className="text-lg font-bold text-indigo-800">Lesson 26: Number Book (Day 2)</h1>
          <div className="w-24" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Lesson Objective */}
        <Card className="mb-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-full">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-bold text-lg">Today's Goal</h2>
                <p className="text-white/90">Complete your number book and share it with friends!</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lesson Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 bg-white/80 p-1 rounded-xl">
            <TabsTrigger
              value="concept"
              className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white rounded-lg"
            >
              📚 Finish Book
            </TabsTrigger>
            <TabsTrigger
              value="fluency"
              className="data-[state=active]:bg-purple-500 data-[state=active]:text-white rounded-lg"
            >
              🔢 Show Number
            </TabsTrigger>
            <TabsTrigger
              value="debrief"
              className="data-[state=active]:bg-pink-500 data-[state=active]:text-white rounded-lg"
            >
              🎨 Gallery Walk
            </TabsTrigger>
          </TabsList>

          <TabsContent value="concept" className="space-y-4">
            <ConceptDevelopment onComplete={() => setActiveTab("fluency")} />
          </TabsContent>

          <TabsContent value="fluency" className="space-y-4">
            <FluencyPractice onComplete={() => setActiveTab("debrief")} />
          </TabsContent>

          <TabsContent value="debrief" className="space-y-4">
            <StudentDebrief />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

// Concept Development: Complete Number Book (Day 2)
const ConceptDevelopment = ({ onComplete }: { onComplete: () => void }) => {
  const [currentNumber, setCurrentNumber] = useState(1);
  const [drawnItems, setDrawnItems] = useState<{ [key: number]: string[] }>({
    1: [], 2: [], 3: [], 4: [], 5: []
  });
  const [showCelebration, setShowCelebration] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const itemCategories = [
    { 
      name: "Animals", 
      items: [
        { emoji: "🐱", name: "cat" },
        { emoji: "🐶", name: "dog" },
        { emoji: "🐰", name: "bunny" },
        { emoji: "🦋", name: "butterfly" },
      ]
    },
    { 
      name: "Food", 
      items: [
        { emoji: "🍎", name: "apple" },
        { emoji: "🍪", name: "cookie" },
        { emoji: "🍕", name: "pizza" },
        { emoji: "🧁", name: "cupcake" },
      ]
    },
    { 
      name: "Shapes", 
      items: [
        { emoji: "⭐", name: "star" },
        { emoji: "❤️", name: "heart" },
        { emoji: "🔵", name: "circle" },
        { emoji: "🔷", name: "diamond" },
      ]
    },
    { 
      name: "Objects", 
      items: [
        { emoji: "🎈", name: "balloon" },
        { emoji: "🚗", name: "car" },
        { emoji: "🌸", name: "flower" },
        { emoji: "⚽", name: "ball" },
      ]
    },
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
  const allPagesComplete = [1, 2, 3, 4, 5].every(n => (drawnItems[n]?.length || 0) === n);

  if (isComplete) {
    return (
      <Card className="bg-gradient-to-br from-indigo-100 to-purple-100 border-indigo-300">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4">📖</div>
          <h3 className="text-2xl font-bold text-indigo-700 mb-4">Your Number Book is Ready!</h3>
          
          {/* Full book preview */}
          <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
            <div className="text-sm text-indigo-600 mb-3 font-semibold">My Number Book</div>
            <div className="flex justify-center gap-3 flex-wrap">
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="w-20 h-24 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg shadow-md border-2 border-amber-300 flex flex-col items-center justify-center p-1">
                  <span className="text-xl font-bold text-amber-600">{num}</span>
                  <div className="flex flex-wrap justify-center gap-0.5 mt-1">
                    {drawnItems[num]?.map((emoji, i) => (
                      <span key={i} className="text-sm">{emoji}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <Button onClick={onComplete} className="bg-indigo-500 hover:bg-indigo-600">
            Continue to Show the Number →
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/90 backdrop-blur border-indigo-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-indigo-800">📚 Complete Your Number Book</h3>
          <span className="text-sm text-indigo-600">Page {currentNumber} of 5</span>
        </div>

        <p className="text-center text-indigo-700 mb-2">
          Add exactly <span className="font-bold text-2xl text-indigo-600">{currentNumber}</span> item{currentNumber > 1 ? 's' : ''} to complete your page!
        </p>
        <p className="text-center text-sm text-indigo-500 mb-4">
          Try using different categories to make your book creative!
        </p>

        {/* Book Page */}
        <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-4 border-amber-300 p-6 mb-6 min-h-[180px] shadow-lg">
          {/* Page number */}
          <div className="absolute top-2 right-4 text-4xl font-bold text-amber-400">{currentNumber}</div>
          
          {/* Drawn items */}
          <div className="flex justify-center items-center gap-4 flex-wrap min-h-[100px]">
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

        {/* Item categories */}
        <div className="bg-indigo-50 rounded-xl p-4 mb-4">
          <p className="text-sm text-indigo-600 mb-3 text-center font-semibold">Choose from different categories:</p>
          <div className="space-y-3">
            {itemCategories.map((category) => (
              <div key={category.name} className="bg-white rounded-lg p-2">
                <p className="text-xs text-indigo-500 mb-1">{category.name}</p>
                <div className="flex justify-center gap-2">
                  {category.items.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => addItem(item.emoji)}
                      disabled={(drawnItems[currentNumber]?.length || 0) >= currentNumber}
                      className="text-2xl p-1.5 bg-indigo-50 rounded-lg hover:shadow-md transition-all transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {item.emoji}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={prevPage}
            disabled={currentNumber === 1}
            className="border-indigo-300 text-indigo-600"
          >
            ← Previous
          </Button>
          
          <Button
            variant="ghost"
            onClick={clearPage}
            className="text-indigo-400 hover:text-indigo-600"
          >
            Clear Page
          </Button>

          <Button
            onClick={nextPage}
            disabled={!isPageComplete}
            className={`${isPageComplete ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-gray-300'}`}
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
                  ? 'bg-indigo-500 scale-125'
                  : (drawnItems[num]?.length || 0) === num
                    ? 'bg-green-400'
                    : 'bg-indigo-200'
              }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Fluency Practice: Show the Number
const FluencyPractice = ({ onComplete }: { onComplete: () => void }) => {
  const [currentRound, setCurrentRound] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [mode, setMode] = useState<'voice' | 'fingers'>('voice');

  const rounds = [
    { target: 3, mode: 'voice' as const, instruction: "I said THREE! Show me the number 3!" },
    { target: 1, mode: 'voice' as const, instruction: "I said ONE! Which number is it?" },
    { target: 5, mode: 'fingers' as const, instruction: "🖐️ I'm showing 5 fingers! Find the number!" },
    { target: 2, mode: 'fingers' as const, instruction: "✌️ I'm showing 2 fingers! Match it!" },
    { target: 4, mode: 'voice' as const, instruction: "I said FOUR! Show me!" },
    { target: 3, mode: 'fingers' as const, instruction: "🤟 I'm showing 3 fingers! Find it!" },
  ];

  const currentTarget = rounds[currentRound]?.target || 0;
  const currentMode = rounds[currentRound]?.mode || 'voice';

  const handleAnswer = (num: number) => {
    if (showFeedback) return;
    setSelectedAnswer(num);
    setShowFeedback(true);
    setIsCorrect(num === currentTarget);

    setTimeout(() => {
      if (num === currentTarget) {
        if (currentRound < rounds.length - 1) {
          setCurrentRound(prev => prev + 1);
          setSelectedAnswer(null);
          setShowFeedback(false);
        } else {
          setIsComplete(true);
        }
      } else {
        setSelectedAnswer(null);
        setShowFeedback(false);
      }
    }, 1500);
  };

  const speakNumber = () => {
    const words = ["one", "two", "three", "four", "five"];
    const utterance = new SpeechSynthesisUtterance(words[currentTarget - 1]);
    utterance.rate = 0.7;
    speechSynthesis.speak(utterance);
  };

  const renderFingers = (count: number) => {
    const fingerEmojis = ["☝️", "✌️", "🤟", "🖐️", "🖐️"];
    return <span className="text-6xl">{fingerEmojis[count - 1] || "✋"}</span>;
  };

  if (isComplete) {
    return (
      <Card className="bg-gradient-to-br from-green-100 to-emerald-100 border-green-300">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4">🏆</div>
          <h3 className="text-2xl font-bold text-green-700 mb-2">Number Master!</h3>
          <p className="text-green-600 mb-6">You matched all the numbers perfectly!</p>
          <Button onClick={onComplete} className="bg-green-500 hover:bg-green-600">
            Continue to Gallery Walk →
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/90 backdrop-blur border-purple-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-purple-800">🔢 Show the Number</h3>
          <span className="text-sm text-purple-600">Round {currentRound + 1}/{rounds.length}</span>
        </div>

        <p className="text-center text-lg text-purple-700 mb-4">{rounds[currentRound].instruction}</p>

        {/* Display mode indicator */}
        <div className="flex justify-center mb-6">
          {currentMode === 'voice' ? (
            <button
              onClick={speakNumber}
              className="p-6 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              <Volume2 className="w-16 h-16 text-purple-600 animate-pulse" />
              <p className="text-purple-600 mt-2 font-semibold">Click to hear!</p>
            </button>
          ) : (
            <div className="p-6 bg-gradient-to-br from-amber-100 to-orange-200 rounded-2xl shadow-lg">
              {renderFingers(currentTarget)}
              <p className="text-amber-700 mt-2 font-semibold">{currentTarget} finger{currentTarget > 1 ? 's' : ''}!</p>
            </div>
          )}
        </div>

        {/* Number pages to choose from */}
        <div className="flex justify-center gap-3 flex-wrap">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              onClick={() => handleAnswer(num)}
              disabled={showFeedback}
              className={`relative w-20 h-24 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-3 shadow-lg transition-all transform hover:scale-105 ${
                selectedAnswer === num
                  ? isCorrect
                    ? 'ring-4 ring-green-400 scale-110'
                    : 'ring-4 ring-red-400 animate-shake'
                  : 'border-amber-300 hover:border-purple-400'
              }`}
            >
              <span className="text-3xl font-bold text-amber-700">{num}</span>
              {showFeedback && selectedAnswer === num && (
                <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center ${
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
            {isCorrect ? '🎉 That\'s right!' : `Try again! The answer is ${currentTarget}`}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

// Student Debrief: Gallery Walk
const StudentDebrief = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<'gallery' | 'share'>('gallery');
  const [selectedBook, setSelectedBook] = useState<number | null>(null);
  const [clapsGiven, setClapsGiven] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  // Sample number books from "classmates"
  const classBooks = [
    { id: 1, name: "Mia", items: { 1: ["🌸"], 2: ["🐱", "🐶"], 3: ["⭐", "⭐", "⭐"], 4: ["🎈", "🎈", "🎈", "🎈"], 5: ["❤️", "❤️", "❤️", "❤️", "❤️"] } },
    { id: 2, name: "Leo", items: { 1: ["🚗"], 2: ["⚽", "⚽"], 3: ["🍎", "🍎", "🍎"], 4: ["🦋", "🦋", "🦋", "🦋"], 5: ["🔵", "🔵", "🔵", "🔵", "🔵"] } },
    { id: 3, name: "Zara", items: { 1: ["🧁"], 2: ["🌸", "🌸"], 3: ["🐰", "🐰", "🐰"], 4: ["🔷", "🔷", "🔷", "🔷"], 5: ["🍪", "🍪", "🍪", "🍪", "🍪"] } },
  ];

  const handleClap = (bookId: number, pageNumber: number) => {
    const key = bookId * 10 + pageNumber;
    if (!clapsGiven.includes(key)) {
      setClapsGiven(prev => [...prev, key]);
    }
  };

  const handleComplete = () => {
    setIsComplete(true);
  };

  if (isComplete) {
    return (
      <Card className="bg-gradient-to-br from-yellow-100 to-orange-100 border-yellow-300">
        <CardContent className="p-8 text-center">
          <Sparkles className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-yellow-700 mb-2">Lesson 26 Complete!</h3>
          <p className="text-yellow-600 mb-4">
            You created an amazing number book and shared it with friends!
          </p>
          <div className="bg-white/50 rounded-xl p-4 mb-6">
            <p className="text-amber-700 text-sm">
              🎉 Remember: You can show numbers with objects, pictures, fingers, and numerals!
            </p>
          </div>
          <Button 
            onClick={() => navigate("/activities/module-1")}
            className="bg-yellow-500 hover:bg-yellow-600"
          >
            Continue Learning →
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/90 backdrop-blur border-pink-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-pink-800">🎨 Gallery Walk</h3>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-pink-600" />
            <span className="text-sm text-pink-600">Viewing classmates' books</span>
          </div>
        </div>

        <p className="text-center text-pink-700 mb-6">
          Look at your friends' number books! Click on a book to see more, and clap to celebrate!
        </p>

        {selectedBook === null ? (
          // Gallery view
          <div className="grid grid-cols-3 gap-4 mb-6">
            {classBooks.map((book) => (
              <button
                key={book.id}
                onClick={() => setSelectedBook(book.id)}
                className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border-2 border-pink-200"
              >
                <div className="text-3xl mb-2">📚</div>
                <p className="font-bold text-pink-700">{book.name}'s Book</p>
                <div className="flex justify-center gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map(n => (
                    <div key={n} className="w-2 h-2 bg-pink-300 rounded-full" />
                  ))}
                </div>
              </button>
            ))}
          </div>
        ) : (
          // Book detail view
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedBook(null)}
              className="mb-4 text-pink-600"
            >
              ← Back to Gallery
            </Button>
            
            {(() => {
              const book = classBooks.find(b => b.id === selectedBook)!;
              return (
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border-4 border-amber-300">
                  <h4 className="text-center font-bold text-amber-700 mb-4">{book.name}'s Number Book</h4>
                  <div className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <div key={num} className="text-center">
                        <div className="bg-white rounded-lg p-2 shadow border border-amber-200 mb-2 min-h-[80px]">
                          <span className="text-xl font-bold text-amber-600">{num}</span>
                          <div className="flex flex-wrap justify-center gap-0.5 mt-1">
                            {book.items[num as keyof typeof book.items]?.map((emoji, i) => (
                              <span key={i} className="text-lg">{emoji}</span>
                            ))}
                          </div>
                        </div>
                        <button
                          onClick={() => handleClap(book.id, num)}
                          className={`text-2xl transition-transform ${
                            clapsGiven.includes(book.id * 10 + num) 
                              ? 'scale-125' 
                              : 'hover:scale-110'
                          }`}
                        >
                          {clapsGiven.includes(book.id * 10 + num) ? '👏' : '👐'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Reflection questions */}
        <div className="bg-pink-50 rounded-xl p-4 mb-4">
          <h4 className="font-bold text-pink-700 mb-2">Think About It:</h4>
          <ul className="text-sm text-pink-600 space-y-1">
            <li>🤔 What did your friends use to show the number 4?</li>
            <li>🤔 How is your book different from theirs?</li>
            <li>🤔 What's your favorite page?</li>
          </ul>
        </div>

        <div className="text-center">
          <Button
            onClick={handleComplete}
            className="bg-pink-500 hover:bg-pink-600"
            disabled={clapsGiven.length < 3}
          >
            {clapsGiven.length < 3 
              ? `Clap for ${3 - clapsGiven.length} more pages!` 
              : 'Complete Lesson! 🎉'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CountingMatching26;
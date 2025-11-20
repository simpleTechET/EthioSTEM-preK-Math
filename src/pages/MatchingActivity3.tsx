import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Star, BookOpen, Users, Lightbulb } from "lucide-react";

const MatchingActivity3 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [selectedPairs, setSelectedPairs] = useState([]);
  const [currentSelection, setCurrentSelection] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [attempts, setAttempts] = useState(0);

  // Placeholder images - in production, these would be actual image paths
  const items = [
    { id: 1, name: "Small Red Apple", type: "apple", size: "small", color: "red", emoji: "🍎" },
    { id: 2, name: "Large Red Apple", type: "apple", size: "large", color: "red", emoji: "🍎" },
    { id: 3, name: "Small Yellow Banana", type: "banana", size: "small", color: "yellow", emoji: "🍌" },
    { id: 4, name: "Large Yellow Banana", type: "banana", size: "large", color: "yellow", emoji: "🍌" },
    { id: 5, name: "Small Orange", type: "orange", size: "small", color: "orange", emoji: "🍊" },
    { id: 6, name: "Large Orange", type: "orange", size: "large", color: "orange", emoji: "🍊" },
  ];

  // Fisher-Yates shuffle helper
  const shuffleArray = (arr: typeof items) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  // keep a shuffled copy so original items (ids) remain stable
  const [shuffledItems, setShuffledItems] = useState(() => shuffleArray(items));
  
  const handleItemClick = (item) => {
    if (matchedPairs.includes(item.id)) return;

    if (!currentSelection) {
      setCurrentSelection(item);
    } else {
      setAttempts(attempts + 1);
      
      if (currentSelection.type === item.type && currentSelection.id !== item.id) {
        // Match found!
        setMatchedPairs([...matchedPairs, currentSelection.id, item.id]);
        setSelectedPairs([...selectedPairs, { item1: currentSelection, item2: item }]);
        setCurrentSelection(null);
      } else {
        // No match
        setTimeout(() => setCurrentSelection(null), 1000);
      }
    }
  };

  const allMatched = matchedPairs.length === items.length;
const markLessonComplete = (lessonId: number) => {
    const saved = localStorage.getItem('ethiostem-completed-lessons');
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes(lessonId)) {
      completed.push(lessonId);
      localStorage.setItem('ethiostem-completed-lessons', JSON.stringify(completed));
    }
  };

  const handleComplete = () => {
    markLessonComplete(3); // Call it here with lesson 3
    navigate("../activities");
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => window.history.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full">
                Lesson 3
              </span>
              <h1 className="text-2xl font-bold text-gray-800">Match 2 Objects That Are the Same, But...</h1>
            </div>
            <p className="text-sm text-gray-600">Topic A: Matching Objects</p>
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
                  Today, your child will learn to match 2 objects that are <span className="font-bold text-green-700">the same, but different</span> in one way. 
                  For example: two apples that are the same fruit, but one is bigger!
                </p>
              </CardContent>
            </Card>

            {/* Introduction */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">Let's Learn Together!</CardTitle>
                <CardDescription>Read this with your child before starting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-yellow-50 p-6 rounded-xl border-2 border-yellow-200">
                  <p className="text-lg text-gray-700 mb-4">
                    Remember yesterday? We matched things that were <span className="font-bold">exactly the same</span>!
                  </p>
                  <p className="text-lg text-gray-700 mb-4">
                    Today is different! We'll match things that are similar but not exactly the same. We say:
                  </p>
                  <div className="bg-white p-4 rounded-lg border-2 border-green-300">
                    <p className="text-xl font-bold text-green-700 text-center">
                      "They are the same, but..."
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-200">
                    <h4 className="font-bold text-gray-800 mb-2">✓ Example: Same</h4>
                    <p className="text-sm text-gray-600">
                      Two apples are both apples<br/>
                      They are both red<br/>
                      They are both round
                    </p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg border-2 border-red-200">
                    <h4 className="font-bold text-gray-800 mb-2">✓ Example: But...</h4>
                    <p className="text-sm text-gray-600">
                      One apple is small<br/>
                      One apple is big<br/>
                      Different sizes!
                    </p>
                  </div>
                </div>

                {/* Parent Tips */}
                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <Users className="w-8 h-8 text-blue-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Parent Tips:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Help your child use the phrase "They are the same, but..."</li>
                      <li>• Point out what makes them the same first</li>
                      <li>• Then discuss what is different</li>
                      <li>• Use size words: bigger, smaller, larger</li>
                    </ul>
                  </div>
                </div>

                {/* Key Vocabulary */}
                <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-5 h-5 text-purple-600" />
                    <h4 className="font-bold text-gray-800">Key Words to Practice</h4>
                  </div>
                  <div className="grid md:grid-cols-3 gap-3">
                    <div className="bg-white p-3 rounded">
                      <p className="font-bold text-purple-700">Same</p>
                      <p className="text-xs text-gray-600">Things that match</p>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <p className="font-bold text-purple-700">But...</p>
                      <p className="text-xs text-gray-600">Shows a difference</p>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <p className="font-bold text-purple-700">Bigger/Smaller</p>
                      <p className="text-xs text-gray-600">Size words</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Start Button */}
            <div className="text-center">
              <Button 
                size="lg" 
                onClick={() => {
                  setShuffledItems(shuffleArray(items)); // reshuffle when starting
                  setShowGame(true);
                }}
                className="text-lg px-8 py-6 bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transition-all"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Start Matching Activity
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Game Instructions */}
            <Card className="bg-green-50 border-2 border-green-300">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🎯</div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-gray-800">How to Play:</h3>
                    <ol className="space-y-1 text-gray-700">
                      <li>1. Look at all the fruits carefully</li>
                      <li>2. Find two fruits that are the same type (both apples, both bananas, etc.)</li>
                      <li>3. Click on one, then click on its match</li>
                      <li>4. Say: "They are the same, but one is bigger!"</li>
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress */}
            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
              <div className="text-sm text-gray-600">
                Attempts: <span className="font-semibold text-gray-800">{attempts}</span>
              </div>
              <div className="text-sm text-gray-600">
                Matched: <span className="font-semibold text-gray-800">{matchedPairs.length / 2}</span> / 3
              </div>
            </div>

            {/* Game Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {shuffledItems.map((item) => {
                const isMatched = matchedPairs.includes(item.id);
                const isSelected = currentSelection?.id === item.id;
                
                return (
                  <Card
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className={`
                      cursor-pointer transition-all duration-300 hover:shadow-xl
                      ${isMatched ? 'opacity-50 border-4 border-green-500 bg-green-50' : 'hover:scale-105'}
                      ${isSelected ? 'border-4 border-blue-500 scale-105' : 'border-2'}
                      ${item.size === 'large' ? 'aspect-square' : 'aspect-square'}
                    `}
                  >
                    <div className="h-full flex flex-col items-center justify-center p-4">
                      <div className={`${item.size === 'large' ? 'text-8xl' : 'text-6xl'} mb-2`}>
                        {item.emoji}
                      </div>
                      <p className="text-sm text-center text-gray-600 font-medium">
                        {item.size === 'large' ? 'Big' : 'Small'}
                      </p>
                      {isMatched && (
                        <div className="mt-2 text-green-600 text-2xl">✓</div>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Completion */}
            {allMatched && (
              <Card className="bg-gradient-to-br from-green-100 to-yellow-100 border-4 border-green-400 shadow-xl">
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-3xl font-bold mb-3 text-gray-800">Amazing Work!</h3>
                  <p className="text-lg text-gray-700 mb-4">
                    You matched all the fruits! You completed it in {attempts} attempts.
                  </p>
                  <div className="space-y-2 mb-6">
                    {selectedPairs.map((pair, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-lg">
                        <p className="text-gray-700">
                          <span className="font-bold text-green-700">Match {idx + 1}:</span> {pair.item1.emoji} and {pair.item2.emoji} are the same {pair.item1.type}, but one is bigger!
                        </p>
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
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchingActivity3;
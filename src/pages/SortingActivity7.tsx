import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Star, BookOpen, Users, Lightbulb, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import bearBlueLarge from "@/assets/bear-blue-large.png";
import bearBlueSmall from "@/assets/bear-blue-small.png";
import bearRedLarge from "@/assets/bear-red-large.png";
import bearRedSmall from "@/assets/bear-red-small.png";

const SortingActivity7 = () => {
  const [showGame, setShowGame] = useState(false);
  const [sortingRound, setSortingRound] = useState(1); // 1 = color, 2 = size
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const navigate = useNavigate();

  // Bears that can be sorted by color OR size - shuffled to not group by color
  const bears = [
    { id: 1, name: "Big Blue Bear", image: bearBlueLarge, color: "blue", size: "big" },
    { id: 4, name: "Big Red Bear", image: bearRedLarge, color: "red", size: "big" },
    { id: 3, name: "Small Blue Bear", image: bearBlueSmall, color: "blue", size: "small" },
    { id: 5, name: "Big Red Bear", image: bearRedLarge, color: "red", size: "big" },
    { id: 2, name: "Big Blue Bear", image: bearBlueLarge, color: "blue", size: "big" },
    { id: 6, name: "Small Red Bear", image: bearRedSmall, color: "red", size: "small" },
  ];

  const handleItemClick = (bear: typeof bears[0]) => {
    if (selectedItems.includes(bear.id)) {
      setSelectedItems(selectedItems.filter(id => id !== bear.id));
    } else {
      setSelectedItems([...selectedItems, bear.id]);
      
      const isCorrect = sortingRound === 1 
        ? bear.color === "blue"
        : bear.size === "big";

      if (isCorrect) {
        toast.success("Good choice! 🎉");
      } else {
        toast.error("Not quite! 💭");
      }
    }
  };

  const handleCheckAnswer = () => {
    const correctIds = sortingRound === 1
      ? bears.filter(b => b.color === "blue").map(b => b.id)
      : bears.filter(b => b.size === "big").map(b => b.id);

    const isCorrect = correctIds.length === selectedItems.length && 
                      correctIds.every(id => selectedItems.includes(id));

    if (isCorrect) {
      if (sortingRound === 1) {
        toast.success("Perfect! Now let's sort a different way! 🌟");
        setTimeout(() => {
          setSortingRound(2);
          setSelectedItems([]);
        }, 2000);
      } else {
        // mark complete, show success and display completion UI (no auto-route)
        setIsComplete(true);
        toast.success("Amazing! You sorted two different ways! 🎉");
        markLessonComplete(7);
      }
    } else {
      toast.error("Try again! 🤔");
    }
  };

  const currentAttribute = sortingRound === 1 ? "blue" : "big";
  const correctCount = sortingRound === 1 
    ? bears.filter(b => b.color === "blue").length
    : bears.filter(b => b.size === "big").length;
const markLessonComplete = (lessonId: number) => {
    const saved = localStorage.getItem('ethiostem-completed-lessons');
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes(lessonId)) {
      completed.push(lessonId);
      localStorage.setItem('ethiostem-completed-lessons', JSON.stringify(completed));
    }
  };

  const handleComplete = () => {
    markLessonComplete(7);
    navigate("../activities");
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                Lesson 7
              </span>
              <h1 className="text-2xl font-bold text-gray-800">Two Different Ways</h1>
            </div>
            <p className="text-sm text-gray-600">Topic B: Sorting</p>
          </div>
        </div>

        {!showGame ? (
          <div className="space-y-6">
            <Card className="border-2 border-blue-200 bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl text-blue-700">
                  <Star className="w-6 h-6" />
                  Learning Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-700">
                  Today, your child will learn to <span className="font-bold text-blue-700">sort the same group of objects in two different ways</span>. 
                  Objects can be sorted by different attributes!
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">Sorting the Same Things Different Ways</CardTitle>
                <CardDescription>Read this together</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                  <p className="text-lg text-gray-700 mb-4">
                    Did you know? The <strong>same objects</strong> can be sorted in <strong>different ways</strong>!
                  </p>
                  <p className="text-lg text-gray-700">
                    We can look at bears and sort them by:
                  </p>
                  <ul className="space-y-2 text-gray-700 ml-6 mt-2">
                    <li>• <strong>Color</strong> (blue bears or red bears)</li>
                    <li>• <strong>Size</strong> (big bears or small bears)</li>
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                    <h4 className="font-bold text-gray-800 mb-2">🔵 First Way: By Color</h4>
                    <p className="text-sm text-gray-600">
                      We'll put all the <strong>blue</strong> bears together!
                    </p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-200">
                    <h4 className="font-bold text-gray-800 mb-2">📏 Second Way: By Size</h4>
                    <p className="text-sm text-gray-600">
                      Then we'll put all the <strong>big</strong> bears together!
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                  <Users className="w-8 h-8 text-purple-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Parent Tips:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• First, help sort by color</li>
                      <li>• Then, sort the same bears by size</li>
                      <li>• Ask: "What other way could we sort these?"</li>
                      <li>• Practice with toys at home: sort by color, then by type!</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-5 h-5 text-yellow-600" />
                    <h4 className="font-bold text-gray-800">Key Words</h4>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded-lg">
                      <p className="font-bold text-blue-700">Attribute</p>
                      <p className="text-sm text-gray-600">A feature like color or size</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="font-bold text-blue-700">Different Ways</p>
                      <p className="text-sm text-gray-600">Sorting by different features</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button 
                size="lg" 
                onClick={() => setShowGame(true)}
                className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700 shadow-lg"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Start Sorting Activity
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
              <div className="flex items-start gap-4">
                <div className="text-4xl">
                  {sortingRound === 1 ? "🔵" : "📏"}
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-gray-800">
                    {sortingRound === 1 ? "Round 1: Sort by Color" : "Round 2: Sort by Size"}
                  </h3>
                  <p className="text-gray-700">
                    Click on all the <strong>{currentAttribute}</strong> bears!
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Hint: There are {correctCount} correct bears to find.
                  </p>
                </div>
              </div>
            </Card>

            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Selected: <span className="font-semibold text-foreground">{selectedItems.length}</span>
              </div>
              <Button 
                onClick={handleCheckAnswer}
                disabled={selectedItems.length === 0}
                className="bg-primary hover:bg-primary/90"
              >
                Check My Answer
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {bears.map((bear) => {
                const isSelected = selectedItems.includes(bear.id);
                const isCorrect = sortingRound === 1 ? bear.color === "blue" : bear.size === "big";
                
                return (
                  <Card
                    key={bear.id}
                    onClick={() => !isComplete && handleItemClick(bear)}
                    className={`
                      relative aspect-square cursor-pointer transition-all duration-300
                      ${isSelected ? 'border-primary border-4 scale-105 bg-primary/5' : 'hover:scale-105 hover:shadow-lg'}
                    `}
                  >
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                      <img 
                        src={bear.image} 
                        alt={bear.name}
                        className={`object-contain transition-all ${bear.size === 'big' ? 'w-36 h-36' : 'w-24 h-24'}`}
                      />
                    </div>
                    {isComplete && isCorrect && (
                      <div className="absolute top-2 right-2">
                        <CheckCircle2 className="w-8 h-8 text-success fill-success/20" />
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>

            {isComplete && (
              <Card className="p-8 text-center bg-gradient-to-br from-success/10 to-primary/10 border-2 border-success">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold mb-2">Amazing Work!</h3>
                <p className="text-muted-foreground mb-4">
                  You sorted the same bears in two different ways! First by color, then by size!
                </p>
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

export default SortingActivity7;

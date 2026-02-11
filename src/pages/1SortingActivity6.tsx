import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Star, BookOpen, Users, Lightbulb, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { shuffleArray } from "@/lib/utils";

// Import images - crayons and markers
import redCrayonImg from "@/assets/crayon-red.png";
import blueCrayonImg from "@/assets/crayon-blue.png";
import greenCrayonImg from "@/assets/crayon-green.png";
import yellowMarkerImg from "@/assets/marker-yellow.png";
import orangeMarkerImg from "@/assets/marker-orange.png";
import purpleMarkerImg from "@/assets/marker-purple.png";

interface SortingItem {
  id: number;
  name: string;
  image: string;
  group: "crayons" | "markers" | null;
}

const SortingActivity6 = () => {
  const [showGame, setShowGame] = useState(false);
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);
  const [draggedItem, setDraggedItem] = useState<SortingItem | null>(null);
  const [crayonGroup, setCrayonGroup] = useState<SortingItem[]>([]);
  const [markerGroup, setMarkerGroup] = useState<SortingItem[]>([]);
 
  const markLessonComplete = (lessonId: number) => {
    const saved = localStorage.getItem('ethiostem-completed-lessons');
    const completedLessons = saved ? JSON.parse(saved) : [];
    if (!completedLessons.includes(lessonId)) {
      completedLessons.push(lessonId);
      localStorage.setItem('ethiostem-completed-lessons', JSON.stringify(completedLessons));
    }
  };
  const initialItems = useMemo(() => shuffleArray([
    { id: 1, name: "Red Crayon", image: redCrayonImg, group: "crayons" as const },
    { id: 2, name: "Yellow Marker", image: yellowMarkerImg, group: "markers" as const },
    { id: 3, name: "Blue Crayon", image: blueCrayonImg, group: "crayons" as const },
    { id: 4, name: "Orange Marker", image: orangeMarkerImg, group: "markers" as const },
    { id: 5, name: "Purple Marker", image: purpleMarkerImg, group: "markers" as const },
    { id: 6, name: "Green Crayon", image: greenCrayonImg, group: "crayons" as const },
  ]), []);
  const [unsortedItems, setUnsortedItems] = useState<SortingItem[]>(initialItems);

  const handleItemClick = (item: SortingItem) => {
    if (!draggedItem) {
      setDraggedItem(item);
    }
  };

  const handleGroupClick = (targetGroup: "crayons" | "markers") => {
    if (!draggedItem) return;

    // Remove item from unsorted
    setUnsortedItems(unsortedItems.filter(i => i.id !== draggedItem.id));

    // Add to appropriate group
    if (targetGroup === "crayons") {
      setCrayonGroup([...crayonGroup, draggedItem]);
    } else {
      setMarkerGroup([...markerGroup, draggedItem]);
    }

    // Show feedback
    if (draggedItem.group === targetGroup) {
      toast.success("Great job! 🎉", {
        description: `${draggedItem.name} belongs in the ${targetGroup} group!`,
      });
    } else {
      toast.error("Hmm... 🤔", {
        description: `Does ${draggedItem.name} really belong there?`,
      });
    }

    setDraggedItem(null);
  };

  const handleCheckAnswer = () => {
    const allCorrect = 
      crayonGroup.every(item => item.group === "crayons") &&
      markerGroup.every(item => item.group === "markers") &&
      unsortedItems.length === 0;

    if (allCorrect) {
      toast.success("Perfect! 🌟", {
        description: "You sorted everything correctly into two groups!",
      });
      // mark lesson complete and show completion card instead of auto-routing
      markLessonComplete(6);
      setCompleted(true);
    } else {
      toast.error("Not quite! 🤔", {
        description: "Try sorting all items into the correct groups.",
      });
    }
  };

  const isComplete = unsortedItems.length === 0;

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
                Lesson 6
              </span>
              <h1 className="text-2xl font-bold text-gray-800">Sort into Two Groups</h1>
            </div>
            <p className="text-sm text-gray-600">Topic B: Sorting</p>
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
                  Today, your child will learn to <span className="font-bold text-blue-700">sort objects into two different groups</span>. 
                  Instead of making just one group, we'll separate things into two groups!
                </p>
              </CardContent>
            </Card>

            {/* Introduction */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">Sorting into Two Groups</CardTitle>
                <CardDescription>Read this together with your child</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                  <p className="text-lg text-gray-700 mb-4">
                    Last time, we made <strong>one group</strong> of things that were the same.
                  </p>
                  <p className="text-lg text-gray-700 mb-4">
                    Today, we're going to make <strong>two groups</strong>! We'll put things into different piles based on what they are.
                  </p>
                  <div className="bg-white p-4 rounded-lg border-2 border-blue-300">
                    <p className="text-xl font-bold text-blue-700 text-center">
                      "These are crayons. These are markers."
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                    <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                      🖍️ Group 1: Crayons
                    </h4>
                    <p className="text-sm text-gray-600">
                      All the crayons go in one group because they're all used for coloring!
                    </p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-200">
                    <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                      🖊️ Group 2: Markers
                    </h4>
                    <p className="text-sm text-gray-600">
                      All the markers go in another group because they're also used for coloring!
                    </p>
                  </div>
                </div>

                {/* Parent Tips */}
                <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                  <Users className="w-8 h-8 text-purple-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Parent Tips:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Ask: "How are these two groups the same? How are they different?"</li>
                      <li>• Help your child say: "This group is for..." and "This group is for..."</li>
                      <li>• Practice at home: sort toys into two groups, clothes into two piles</li>
                      <li>• Examples: Sort by color (red vs blue), by size (big vs small)</li>
                    </ul>
                  </div>
                </div>

                {/* Key Vocabulary */}
                <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-5 h-5 text-yellow-600" />
                    <h4 className="font-bold text-gray-800">Key Phrases to Practice</h4>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded-lg">
                      <p className="font-bold text-blue-700">"These are the same because..."</p>
                      <p className="text-sm text-gray-600">Explain what's alike in each group</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="font-bold text-blue-700">"These are different because..."</p>
                      <p className="text-sm text-gray-600">Explain what's different between groups</p>
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
                Start Sorting Activity
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Instructions */}
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🎯</div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-gray-800">Sort into Two Groups</h3>
                  <p className="text-gray-700">
                    Click on an item, then click on the group where it belongs!
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Put all the crayons in one group and all the markers in another group.
                  </p>
                </div>
              </div>
            </Card>

            {/* Unsorted Items */}
            {unsortedItems.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Items to Sort:</h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {unsortedItems.map((item) => (
                    <Card
                      key={item.id}
                      onClick={() => handleItemClick(item)}
                      className={`
                        cursor-pointer transition-all duration-300
                        ${draggedItem?.id === item.id ? 'border-4 border-blue-500 scale-110 bg-blue-50' : 'hover:scale-105 hover:shadow-lg'}
                      `}
                    >
                      <div className="aspect-square flex flex-col items-center justify-center p-3">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-16 h-16 object-contain mb-1"
                        />
                        <p className="text-xs font-medium text-center text-gray-700">
                          {item.name}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Two Groups */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Crayons Group */}
              <Card 
                onClick={() => handleGroupClick("crayons")}
                className={`
                  min-h-[250px] transition-all duration-300
                  ${draggedItem ? 'cursor-pointer hover:border-4 hover:border-green-500 hover:bg-green-50' : ''}
                  ${draggedItem ? 'border-4 border-dashed border-green-300' : 'border-2'}
                `}
              >
                <CardHeader className="bg-green-100 border-b-2 border-green-300">
                  <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
                    🖍️ Crayons Group
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  {crayonGroup.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">Click to add crayons here</p>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      {crayonGroup.map((item) => (
                        <div key={item.id} className="flex flex-col items-center p-2 bg-green-50 rounded-lg border border-green-200">
                          <img src={item.image} alt={item.name} className="w-12 h-12 object-contain mb-1" />
                          <p className="text-xs text-center font-medium text-gray-700">{item.name}</p>
                          {item.group === "crayons" && (
                            <CheckCircle2 className="w-5 h-5 text-green-600 mt-1" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Markers Group */}
              <Card 
                onClick={() => handleGroupClick("markers")}
                className={`
                  min-h-[250px] transition-all duration-300
                  ${draggedItem ? 'cursor-pointer hover:border-4 hover:border-orange-500 hover:bg-orange-50' : ''}
                  ${draggedItem ? 'border-4 border-dashed border-orange-300' : 'border-2'}
                `}
              >
                <CardHeader className="bg-orange-100 border-b-2 border-orange-300">
                  <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
                    🖊️ Markers Group
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  {markerGroup.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">Click to add markers here</p>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      {markerGroup.map((item) => (
                        <div key={item.id} className="flex flex-col items-center p-2 bg-orange-50 rounded-lg border border-orange-200">
                          <img src={item.image} alt={item.name} className="w-12 h-12 object-contain mb-1" />
                          <p className="text-xs text-center font-medium text-gray-700">{item.name}</p>
                          {item.group === "markers" && (
                            <CheckCircle2 className="w-5 h-5 text-green-600 mt-1" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Check Button */}
            {isComplete && !completed && (
              <div className="text-center">
                <Button 
                  onClick={handleCheckAnswer}
                  size="lg"
                  className="bg-primary hover:bg-primary/90"
                >
                  Check My Answer
                </Button>
              </div>
            )}

            {/* Completion Card shown under the game when completed */}
            {completed && (
              <div className="mt-6">
                <Card className="bg-gradient-to-br from-blue-100 to-purple-100 border-4 border-blue-300 shadow-xl">
                  <CardContent className="p-8 text-center">
                    <div className="text-6xl mb-4">🎉</div>
                    <h3 className="text-3xl font-bold mb-3 text-gray-800">Excellent Work!</h3>
                    <p className="text-lg text-gray-700 mb-6">
                      You sorted everything into the correct groups. Great job!
                    </p>
                    <Button
                      size="lg"
                      onClick={() => navigate("/activities")}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Continue Learning
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
  
export default SortingActivity6;

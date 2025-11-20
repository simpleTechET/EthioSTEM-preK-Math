import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Star, BookOpen, Users, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SortingGame from "@/components/SortingGame";
import { shuffleArray } from "@/lib/utils";

// Import images
import appleImg from "@/assets/apple.png";
import bananaImg from "@/assets/banana.png";
import orangeImg from "@/assets/orange.png";
import cupImg from "@/assets/cup.jpeg";
import pencilImg from "@/assets/pencil.jpeg";
import paperImg from "@/assets/paper.jpeg";
import sockImg from "@/assets/sock.jpeg";
import shoeImg from "@/assets/shoe.jpeg";

const SortingActivity5 = () => {
  const [showGame, setShowGame] = useState(false);
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();

  const markLessonComplete = (lessonId: number) => {
    const saved = localStorage.getItem('ethiostem-completed-lessons');
    const completedLessons = saved ? JSON.parse(saved) : [];
    if (!completedLessons.includes(lessonId)) {
      completedLessons.push(lessonId);
      localStorage.setItem('ethiostem-completed-lessons', JSON.stringify(completedLessons));
    }
  };
  
  // Shuffled items - some are food, some are not
  const items = useMemo(() => shuffleArray([
    { id: 1, name: "Apple", image: appleImg, belongsToGroup: true },
    { id: 2, name: "Cup", image: cupImg, belongsToGroup: false },
    { id: 3, name: "Banana", image: bananaImg, belongsToGroup: true },
    { id: 4, name: "Pencil", image: pencilImg, belongsToGroup: false },
    { id: 5, name: "Orange", image: orangeImg, belongsToGroup: true },
    { id: 6, name: "Paper", image: paperImg, belongsToGroup: false },
    { id: 7, name: "Sock", image: sockImg, belongsToGroup: false },
    { id: 8, name: "Shoe", image: shoeImg, belongsToGroup: false },
  ]), []);
  
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
                Lesson 5
              </span>
              <h1 className="text-2xl font-bold text-gray-800">Make One Group</h1>
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
                  Today, your child will learn to <span className="font-bold text-blue-700">make one group of objects that share a common attribute</span>. 
                  They'll learn to sort objects by what they have in common!
                </p>
              </CardContent>
            </Card>

            {/* Introduction */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">What is Sorting?</CardTitle>
                <CardDescription>Read this together with your child</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                  <p className="text-lg text-gray-700 mb-4">
                    When we <strong>sort</strong>, we put things together that are the same in some way.
                  </p>
                  <p className="text-lg text-gray-700 mb-4">
                    We can make <strong>one group</strong> of things that:
                  </p>
                  <ul className="space-y-2 text-gray-700 ml-6">
                    <li>• Have the same <strong>color</strong> (all red things)</li>
                    <li>• Have the same <strong>shape</strong> (all circles)</li>
                    <li>• Have the same <strong>size</strong> (all big things)</li>
                    <li>• Are used the same way (all food we can eat)</li>
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                    <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <span className="text-2xl">🍎</span> Example 1
                    </h4>
                    <p className="text-sm text-gray-600">
                      <strong>Making a Food Group</strong><br/>
                      Let's put all the food together!<br/>
                      Apple, banana, and orange go in the food group.
                    </p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-200">
                    <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <span className="text-2xl">🔴</span> Example 2
                    </h4>
                    <p className="text-sm text-gray-600">
                      <strong>Making a Color Group</strong><br/>
                      Let's put all the red things together!<br/>
                      Red ball, red marker, and red crayon go in the red group.
                    </p>
                  </div>
                </div>

                {/* Parent Tips */}
                <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                  <Users className="w-8 h-8 text-purple-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Parent Tips:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Ask: "What's the same about these things?"</li>
                      <li>• Help your child say: "I'm making a group of..."</li>
                      <li>• Practice at home: sort toys, clothes, or food items</li>
                      <li>• Start with obvious groups (like all fruits or all toys)</li>
                    </ul>
                  </div>
                </div>

                {/* Key Vocabulary */}
                <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-5 h-5 text-yellow-600" />
                    <h4 className="font-bold text-gray-800">Key Words to Practice</h4>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded-lg">
                      <p className="font-bold text-blue-700">Group</p>
                      <p className="text-sm text-gray-600">Things that go together</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="font-bold text-blue-700">Sort</p>
                      <p className="text-sm text-gray-600">Put things into groups</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="font-bold text-blue-700">Same</p>
                      <p className="text-sm text-gray-600">Alike in some way</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="font-bold text-blue-700">Different</p>
                      <p className="text-sm text-gray-600">Not the same</p>
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
          <>
            {/* keep the game visible, show completion card under the game when done */}
            <SortingGame
              items={items}
              groupName="Food"
              instruction="Let's make a group of FOOD!"
              onComplete={() => {
                markLessonComplete(5);
                setCompleted(true);
              }}
            />

            {completed && (
              <div className="mt-6">
                <Card className="bg-gradient-to-br from-blue-100 to-purple-100 border-4 border-blue-300 shadow-xl">
                  <CardContent className="p-8 text-center">
                    <div className="text-6xl mb-4">🎉</div>
                    <h3 className="text-3xl font-bold mb-3 text-gray-800">Great Job!</h3>
                    <p className="text-lg text-gray-700 mb-6">
                      You made the Food group. Well done!
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
          </>
         )}
      </div>
    </div>
  );
};
  
export default SortingActivity5;

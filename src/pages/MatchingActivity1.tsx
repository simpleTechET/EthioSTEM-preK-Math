import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BookOpen, Star } from "lucide-react";
import MatchingGame from "@/components/MatchingGame";
import appleImg from "@/assets/apple.png";
import bananaImg from "@/assets/banana.png";
import orangeImg from "@/assets/orange.png";

const MatchingActivity1 = () => {
  const [showGame, setShowGame] = useState(false);
  const navigate = useNavigate();

  const gameItems = [
    { id: 1, image: appleImg, matchId: 1 },
    { id: 2, image: appleImg, matchId: 1 },
    { id: 3, image: bananaImg, matchId: 2 },
    { id: 4, image: bananaImg, matchId: 2 },
    { id: 5, image: orangeImg, matchId: 3 },
    { id: 6, image: orangeImg, matchId: 3 },
  ];

  const shuffledGameItems = useMemo(() => {
    const arr = [...gameItems];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, []);

  const handleComplete = () => {
  markLessonComplete(1); // Add this line to mark lesson 1 as complete
  navigate("/activities");
};

// Add this helper function to save completion
const markLessonComplete = (lessonId: number) => {
  const saved = localStorage.getItem('ethiostem-completed-lessons');
  const completed = saved ? JSON.parse(saved) : [];
  if (!completed.includes(lessonId)) {
    completed.push(lessonId);
    localStorage.setItem('ethiostem-completed-lessons', JSON.stringify(completed));
  }
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-muted">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/activities">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                Lesson 1
              </span>
              <h1 className="text-xl font-bold text-foreground">Match Exactly the Same</h1>
            </div>
            <p className="text-sm text-muted-foreground">Topic A: Matching Objects</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {!showGame ? (
          <>
            {/* Learning Objective */}
            <Card className="mb-8 border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Star className="w-6 h-6 text-primary" />
                  Learning Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-foreground">
                  Today, your child will learn to <span className="font-bold text-primary">match 2 objects that are exactly the same</span>.
                  This helps develop observation skills and understanding of attributes.
                </p>
              </CardContent>
            </Card>

            {/* Introduction */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">Let's Learn About Matching!</CardTitle>
                <CardDescription>Read this together with your child</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-secondary/30 p-6 rounded-xl">
                  <p className="text-lg text-foreground mb-4">
                    When two things are <span className="font-bold text-primary">exactly the same</span>, 
                    they match! They have the same:
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-center gap-2">
                      <span className="text-primary">•</span>
                      <span className="text-foreground">Color</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary">•</span>
                      <span className="text-foreground">Size</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary">•</span>
                      <span className="text-foreground">Shape</span>
                    </li>
                  </ul>
                </div>

                <div className="flex items-start gap-4 p-4 bg-accent/10 rounded-lg">
                  <div className="text-3xl">👨‍👩‍👧‍👦</div>
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground">Parent Tip:</h4>
                    <p className="text-sm text-muted-foreground">
                      Encourage your child to say "They are both..." when describing matches. 
                      For example: "They are both red" or "They are both circles."
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vocabulary */}
 <div className="text-center">
              <Button 
                size="lg" 
                onClick={() => setShowGame(true)}
                className="text-lg px-8 py-6 shadow-playful hover:scale-105 transition-all"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Start Activity
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* Game Instructions */}
            <Card className="mb-8 bg-primary/5 border-2 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🎯</div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-foreground">How to Play:</h3>
                    <ol className="space-y-1 text-foreground">
                      <li>1. Click on an object</li>
                      <li>2. Click on another object that is exactly the same</li>
                      <li>3. If they match, you'll see a checkmark!</li>
                      <li>4. Match all the pairs to complete the activity</li>
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Game */}
            <MatchingGame items={shuffledGameItems} onComplete={handleComplete} />
          </>
        )}
      </div>
    </div>
  );
};

export default MatchingActivity1;

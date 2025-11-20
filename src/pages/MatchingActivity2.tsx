import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import MatchingGame from "@/components/MatchingGame";
import { shuffleArray } from "@/lib/utils";
import ballSmall from "@/assets/ball-red-small.png";
import ballLarge from "@/assets/ball-red-large.png";
import bearSmall from "@/assets/bear-blue-small.png";
import bearLarge from "@/assets/bear-blue-large.png";
import duckSmall from "@/assets/duck-yellow-small.png";
import duckLarge from "@/assets/duck-yellow-large.png";

const MatchingActivity2 = () => {
  const [showGame, setShowGame] = useState(false);
  const navigate = useNavigate();

  const gameItems = [
    { id: 1, image: ballSmall, matchId: "ball", size: "small" },
    { id: 2, image: ballLarge, matchId: "ball", size: "large" },
    { id: 3, image: bearSmall, matchId: "bear", size: "small" },
    { id: 4, image: bearLarge, matchId: "bear", size: "large" },
    { id: 5, image: duckSmall, matchId: "duck", size: "small" },
    { id: 6, image: duckLarge, matchId: "duck", size: "large" },
  ];

  const shuffledGameItems = useMemo(() => {
    return shuffleArray(gameItems);
  }, []);

  const handleComplete = () => {
  markLessonComplete(2);
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
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/activities")}
              className="hover:bg-primary/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                Lesson 2: Match Objects
              </h1>
              <p className="text-sm text-muted-foreground">
                Find items that are the same, but...
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {!showGame ? (
          <div className="space-y-8 animate-fade-in">
            {/* Learning Goal */}
            <Card className="p-6 bg-primary/5 border-primary/20">
              <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                Learning Goal
              </h2>
              <p className="text-foreground/80">
                Today you will learn to match objects that are the same, but different in some way - like size or color!
              </p>
            </Card>

            {/* Introduction */}
            <Card className="p-6">
              <h2 className="text-lg font-bold text-foreground mb-4">
                Let&apos;s Get Started!
              </h2>
              <div className="space-y-3 text-foreground/80">
                <p>
                  Yesterday, we matched objects that were <strong>exactly the same</strong>.
                </p>
                <p>
                  Today, we&apos;ll match objects that are similar but have one thing different. For example:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Two red balls - one small and one big</li>
                  <li>Two blue bears - one little and one large</li>
                  <li>Two yellow ducks - different sizes</li>
                </ul>
                <p className="font-semibold mt-4">
                  We can say: "They are the same, but..."
                </p>
              </div>
            </Card>

            {/* Vocabulary */}
            <Card className="p-6 bg-accent/30">
              <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="text-2xl">📚</span>
                Key Words
              </h2>
              <div className="grid gap-4">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">📏</span>
                  <div>
                    <h3 className="font-semibold text-foreground">Size</h3>
                    <p className="text-sm text-muted-foreground">
                      How big or small something is (little or big)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-3xl">🔄</span>
                  <div>
                    <h3 className="font-semibold text-foreground">Same, but...</h3>
                    <p className="text-sm text-muted-foreground">
                      Objects that match in one way but are different in another way
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Button
              onClick={() => setShowGame(true)}
              size="lg"
              className="w-full text-lg py-6 bg-primary hover:bg-primary/90"
            >
              Start Matching Activity
            </Button>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <Card className="p-6 bg-accent/20">
              <h2 className="text-lg font-bold text-foreground mb-2">
                Instructions
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-foreground/80">
                <li>Look at all the objects carefully</li>
                <li>Find two objects that are the same type, but different sizes</li>
                <li>Click on both to make a match</li>
                <li>Say: "They are the same, but one is bigger!"</li>
              </ol>
            </Card>

            <MatchingGame items={shuffledGameItems} onComplete={handleComplete} />
          </div>
        )}
      </main>
    </div>
  );
};

export default MatchingActivity2;

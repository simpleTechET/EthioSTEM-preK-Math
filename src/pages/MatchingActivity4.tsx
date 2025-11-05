// ESTEM-preK-Math/src/pages/MatchingActivity4.tsx
import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BookOpen, Star } from "lucide-react";
import MatchingGame from "@/components/MatchingGame";
import pencilImg from "@/assets/pencil.png";
import paperImg from "@/assets/paper.png";
import cupImg from "@/assets/cup.png";
import strawImg from "@/assets/straw.png";
import toothbrushImg from "@/assets/toothbrush.png";
import toothpasteImg from "@/assets/toothpaste.png";
import shoeImg from "@/assets/shoe.png";
import sockImg from "@/assets/sock.png";

const MatchingActivity4 = () => {
  const [showGame, setShowGame] = useState(false);
  const navigate = useNavigate();

  // Objects that are used together functionally
  const gameItems = [
    { id: 1, image: pencilImg, matchId: 2, name: "pencil" },
    { id: 2, image: paperImg, matchId: 1, name: "paper" },
    { id: 3, image: cupImg, matchId: 4, name: "cup" },
    { id: 4, image: strawImg, matchId: 3, name: "straw" },
    { id: 5, image: toothbrushImg, matchId: 6, name: "toothbrush" },
    { id: 6, image: toothpasteImg, matchId: 5, name: "toothpaste" },
    { id: 7, image: shoeImg, matchId: 8, name: "shoe" },
    { id: 8, image: sockImg, matchId: 7, name: "sock" },
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
    navigate("/activities");
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
                Lesson 4
              </span>
              <h1 className="text-xl font-bold text-foreground">Match Objects Used Together</h1>
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
                  Today, your child will learn to <span className="font-bold text-primary">match 2 objects that are used together</span>.
                  This helps develop understanding of object functions and real-world connections.
                </p>
              </CardContent>
            </Card>

            {/* Introduction */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">Let's Learn About Objects That Go Together!</CardTitle>
                <CardDescription>Read this together with your child</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-secondary/30 p-6 rounded-xl">
                  <p className="text-lg text-foreground mb-4">
                    Some objects <span className="font-bold text-primary">go together</span> because we use them together, even if they don't look the same!
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center gap-3 p-3 bg-card rounded-lg">
                      <span className="text-2xl">✏️</span>
                      <div>
                        <p className="font-semibold text-foreground">Pencil and Paper</p>
                        <p className="text-sm text-muted-foreground">We use them together to write</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-card rounded-lg">
                      <span className="text-2xl">🥤</span>
                      <div>
                        <p className="font-semibold text-foreground">Cup and Straw</p>
                        <p className="text-sm text-muted-foreground">We use them together to drink</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-accent/10 rounded-lg">
                  <div className="text-3xl">👨‍👩‍👧‍👦</div>
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground">Parent Tip:</h4>
                    <p className="text-sm text-muted-foreground">
                      Encourage your child to say "They match because I use them together to..." when describing matches. 
                      For example: "They match because I use them together to write" or "They match because I use them together to drink."
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vocabulary */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">Key Words</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-bold text-primary mb-1">Used together</h4>
                    <p className="text-sm text-muted-foreground">Objects that we use with each other for the same activity</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-bold text-primary mb-1">Go together</h4>
                    <p className="text-sm text-muted-foreground">Objects that belong with each other or are used as a pair</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Real World Examples */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">Objects That Go Together</CardTitle>
                <CardDescription>Look for these pairs around your home!</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-card rounded-xl">
                    <div className="text-3xl mb-2">🧦👟</div>
                    <p className="text-sm font-medium text-foreground">Socks and Shoes</p>
                  </div>
                  <div className="text-center p-4 bg-card rounded-xl">
                    <div className="text-3xl mb-2">🍽️🥄</div>
                    <p className="text-sm font-medium text-foreground">Plate and Spoon</p>
                  </div>
                  <div className="text-center p-4 bg-card rounded-xl">
                    <div className="text-3xl mb-2">📘🎒</div>
                    <p className="text-sm font-medium text-foreground">Book and Backpack</p>
                  </div>
                  <div className="text-center p-4 bg-card rounded-xl">
                    <div className="text-3xl mb-2">🔑🚪</div>
                    <p className="text-sm font-medium text-foreground">Key and Door</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Start Button */}
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
                      <li>2. Click on another object that is used with it</li>
                      <li>3. If they go together, you'll see a checkmark!</li>
                      <li>4. Match all the pairs to complete the activity</li>
                    </ol>
                    <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                      <p className="text-sm font-medium text-primary">
                        💡 Remember: These objects don't look the same, but they are used together!
                      </p>
                    </div>
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

export default MatchingActivity4;

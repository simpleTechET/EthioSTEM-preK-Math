import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BookOpen, Star, Users, Lightbulb, CheckCircle2 } from "lucide-react";
import cupImg from "@/assets/cup.jpeg";
import strawImg from "@/assets/straw.jpeg";
import paperImg from "@/assets/paper.jpeg";
import pencilImg from "@/assets/pencil.jpeg";
import toothbrushImg from "@/assets/toothbrush.jpeg";
import toothpasteImg from "@/assets/toothpaste.jpeg";
import sockImg from "@/assets/sock.jpeg";
import shoeImg from "@/assets/shoe.jpeg";

const MatchingActivity4 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [currentSelection, setCurrentSelection] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [attempts, setAttempts] = useState(0);

  // Objects that are used together - shuffled to prevent adjacent matches
  const shuffledItems = useMemo(() => {
    const itemsArray = [
      { id: 1, name: "Cup", img: cupImg, matchId: "drink", pair: "Straw" },
      { id: 2, name: "Straw", img: strawImg, matchId: "drink", pair: "Cup" },
      { id: 3, name: "Paper", img: paperImg, matchId: "write", pair: "Pencil" },
      { id: 4, name: "Pencil", img: pencilImg, matchId: "write", pair: "Paper" },
      { id: 5, name: "Toothbrush", img: toothbrushImg, matchId: "brush", pair: "Toothpaste" },
      { id: 6, name: "Toothpaste", img: toothpasteImg, matchId: "brush", pair: "Toothbrush" },
      { id: 7, name: "Sock", img: sockImg, matchId: "wear", pair: "Shoe" },
      { id: 8, name: "Shoe", img: shoeImg, matchId: "wear", pair: "Sock" },
    ];
    return [...itemsArray].sort(() => Math.random() - 0.5);
  }, []);

  const handleItemClick = (item) => {
    if (matchedPairs.includes(item.id)) return;

    if (!currentSelection) {
      setCurrentSelection(item);
    } else {
      setAttempts(attempts + 1);
      
      if (currentSelection.matchId === item.matchId && currentSelection.id !== item.id) {
        // Match found!
        setMatchedPairs([...matchedPairs, currentSelection.id, item.id]);
        setCurrentSelection(null);
      } else {
        // No match
        setTimeout(() => setCurrentSelection(null), 1500);
      }
    }
  };

  const allMatched = matchedPairs.length === shuffledItems.length;
const markLessonComplete = (lessonId: number) => {
    const saved = localStorage.getItem('ethiostem-completed-lessons');
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes(lessonId)) {
      completed.push(lessonId);
      localStorage.setItem('ethiostem-completed-lessons', JSON.stringify(completed));
    }
  };

  const handleComplete = () => {
    markLessonComplete(4);
    navigate("../activities");
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

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {!showGame ? (
          <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">A New Way to Match!</CardTitle>
                    <CardDescription>Read this together with your child</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-secondary/30 p-6 rounded-xl border-2 border-primary/20">
                      <p className="text-lg text-foreground mb-4">
                        So far, we've matched things that <strong>look the same</strong>.
                      </p>
                      <p className="text-lg text-foreground mb-4">
                        Today is different! We'll match things that <strong>don't look the same</strong>, 
                        but we <strong>use them together</strong>!
                      </p>
                      <div className="bg-card p-4 rounded-lg border-2 border-primary/30">
                        <p className="text-xl font-bold text-primary text-center mb-2">
                          "They match because I use them together to..."
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-success/10 p-4 rounded-lg border-2 border-success/20">
                        <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                          <img src={cupImg} alt="Cup" className="w-8 h-8 object-contain" /> Example 1
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          <strong>Cup and Straw</strong><br/>
                          They don't look the same!<br/>
                          But: I use them together to <strong>drink</strong>!
                        </p>
                      </div>
                      <div className="bg-accent/10 p-4 rounded-lg border-2 border-accent/20">
                        <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                          <img src={pencilImg} alt="Pencil" className="w-8 h-8 object-contain" /> Example 2
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          <strong>Pencil and Paper</strong><br/>
                          They don't look the same!<br/>
                          But: I use them together to <strong>write</strong>!
                        </p>
                      </div>
                    </div>

                    {/* Parent Tips */}
                    <div className="flex items-start gap-4 p-4 bg-primary/10 rounded-lg border-2 border-primary/20">
                      <Users className="w-8 h-8 text-primary flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-2 text-foreground">Parent Tips:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Help your child use: "They match because I use them together to..."</li>
                          <li>• Ask: "What do we do with these things?"</li>
                          <li>• Point out items in your home that go together</li>
                          <li>• Examples: sock & shoe, fork & plate, key & lock</li>
                        </ul>
                      </div>
                    </div>

                    {/* Key Vocabulary */}
                    <div className="bg-warning/10 p-4 rounded-lg border-2 border-warning/20">
                      <div className="flex items-center gap-2 mb-3">
                        <Lightbulb className="w-5 h-5 text-warning" />
                        <h4 className="font-bold text-foreground">Key Phrase to Practice</h4>
                      </div>
                      <div className="bg-card p-4 rounded-lg">
                        <p className="font-bold text-primary text-lg text-center">
                          "They match because I use them together to..."
                        </p>
                        <p className="text-sm text-muted-foreground text-center mt-2">
                          Help your child complete this sentence for each match!
                        </p>
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
                  Start Matching Activity
                </Button>
              </div>
          </div>
        ) : (
          // THIRD PAGE: Game
          <div className="space-y-6">
            {/* Game Instructions */}
            <Card className="bg-primary/5 border-2 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🎯</div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-foreground">How to Play:</h3>
                    <ol className="space-y-1 text-foreground">
                      <li>1. Look at all the objects</li>
                      <li>2. Find two objects that are used together</li>
                      <li>3. Click on both to make a match</li>
                      <li>4. Say: "They match because I use them together to..."</li>
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress */}
            <div className="flex items-center justify-between bg-card p-4 rounded-lg shadow">
              <div className="text-sm text-muted-foreground">
                Attempts: <span className="font-semibold text-foreground">{attempts}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Matched: <span className="font-semibold text-foreground">{matchedPairs.length / 2}</span> / 4
              </div>
            </div>

            {/* Game Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {shuffledItems.map((item) => {
                const isMatched = matchedPairs.includes(item.id);
                const isSelected = currentSelection?.id === item.id;
                
                return (
                  <Card
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className={`
                      cursor-pointer transition-all duration-300 hover:shadow-xl
                      ${isMatched ? 'opacity-50 border-4 border-success bg-success/10' : 'hover:scale-105'}
                      ${isSelected ? 'border-4 border-primary scale-105' : 'border-2'}
                    `}
                  >
                    <div className="aspect-square flex flex-col items-center justify-center p-4">
                      <div className="w-24 h-24 flex items-center justify-center mb-2">
                        <img src={item.img} alt={item.name} className="max-w-full max-h-full object-contain" />
                      </div>
                      <p className="text-sm text-center text-foreground font-medium">
                        {item.name}
                      </p>
                      {isMatched && (
                        <CheckCircle2 className="w-8 h-8 text-success mt-2" />
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Completion */}
            {allMatched && (
              <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-4 border-primary shadow-xl">
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-3xl font-bold mb-3 text-foreground">Excellent Work!</h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    You found all the objects that are used together! You completed it in {attempts} attempts.
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <h4 className="font-bold text-foreground text-xl">Your Matches:</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="bg-card p-4 rounded-lg border-2 border-success/30">
                        <div className="flex gap-2 justify-center mb-2">
                          <img src={cupImg} alt="Cup" className="w-12 h-12 object-contain" />
                          <span className="text-2xl">+</span>
                          <img src={strawImg} alt="Straw" className="w-12 h-12 object-contain" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          <strong>Cup and Straw</strong> match because we use them together to <strong>drink</strong>!
                        </p>
                      </div>
                      <div className="bg-card p-4 rounded-lg border-2 border-success/30">
                        <div className="flex gap-2 justify-center mb-2">
                          <img src={paperImg} alt="Paper" className="w-12 h-12 object-contain" />
                          <span className="text-2xl">+</span>
                          <img src={pencilImg} alt="Pencil" className="w-12 h-12 object-contain" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          <strong>Paper and Pencil</strong> match because we use them together to <strong>write</strong>!
                        </p>
                      </div>
                      <div className="bg-card p-4 rounded-lg border-2 border-success/30">
                        <div className="flex gap-2 justify-center mb-2">
                          <img src={toothbrushImg} alt="Toothbrush" className="w-12 h-12 object-contain" />
                          <span className="text-2xl">+</span>
                          <img src={toothpasteImg} alt="Toothpaste" className="w-12 h-12 object-contain" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          <strong>Toothbrush and Toothpaste</strong> match because we use them together to <strong>brush teeth</strong>!
                        </p>
                      </div>
                      <div className="bg-card p-4 rounded-lg border-2 border-success/30">
                        <div className="flex gap-2 justify-center mb-2">
                          <img src={sockImg} alt="Sock" className="w-12 h-12 object-contain" />
                          <span className="text-2xl">+</span>
                          <img src={shoeImg} alt="Shoe" className="w-12 h-12 object-contain" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          <strong>Sock and Shoe</strong> match because we use them together to <strong>wear on our feet</strong>!
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary/10 p-4 rounded-lg border-2 border-primary/20 mb-6">
                    <p className="text-muted-foreground text-sm">
                      <strong>🏠 Try at Home:</strong> Look around your house! Can you find other things that are used together? 
                      Maybe a fork and plate, or a key and lock?
                    </p>
                  </div>

                  <Button 
                    size="lg" 
                    onClick={handleComplete}
                    className="shadow-playful hover:scale-105 transition-all"
                  >
                    Continue to Next Topic
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

export default MatchingActivity4;

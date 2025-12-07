import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Music, ArrowLeft, Grid3x3, Building, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const CountingActivity19 = () => {
  const navigate = useNavigate();
  const [currentActivity, setCurrentActivity] = useState("intro");
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back to Home</span>
          </Link>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary">Lesson 19</h1>
            <p className="text-sm text-muted-foreground">Find Embedded Numbers Within 4 and 5</p>
          </div>
          <div className="w-24" />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="intro" value={currentActivity} onValueChange={setCurrentActivity}>
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="intro">Introduction</TabsTrigger>
            <TabsTrigger value="fluency">Fluency</TabsTrigger>
            <TabsTrigger value="sorting">Sorting</TabsTrigger>
            <TabsTrigger value="towers">Towers</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
          </TabsList>

          <TabsContent value="intro">
            <IntroductionSection />
          </TabsContent>

          <TabsContent value="fluency">
            <FluencyPractice />
          </TabsContent>

          <TabsContent value="sorting">
            <SortingActivity />
          </TabsContent>

          <TabsContent value="towers">
            <TowerBuilding />
          </TabsContent>

          <TabsContent value="practice">
            <PartnersActivity />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const IntroductionSection = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Users className="w-6 h-6" />
        Lesson Objective
      </CardTitle>
      <CardDescription>Understanding embedded numbers and partners</CardDescription>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="bg-accent/20 p-6 rounded-lg">
        <h3 className="font-bold text-lg mb-3">🎯 Today's Goal</h3>
        <p className="text-lg">Find embedded numbers within 4 and 5 objects.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-card p-4 rounded-lg border border-border">
          <h4 className="font-semibold mb-2">⏱️ Lesson Structure (25 minutes)</h4>
          <ul className="space-y-2 text-sm">
            <li>• Fluency Practice (4 min)</li>
            <li>• Application Problem (3 min)</li>
            <li>• Concept Development (15 min)</li>
            <li>• Student Debrief (3 min)</li>
          </ul>
        </div>

        <div className="bg-card p-4 rounded-lg border border-border">
          <h4 className="font-semibold mb-2">🎓 Key Concept</h4>
          <p className="text-sm">
            Partners are smaller groups found inside a bigger group. When we break apart a group, 
            we can find different partners inside!
          </p>
        </div>
      </div>

      <div className="text-center">
        <p className="text-muted-foreground mb-4">Click the tabs above to start the activities!</p>
      </div>
    </CardContent>
  </Card>
);

const FluencyPractice = () => {
  const [hiddenObjects, setHiddenObjects] = useState<boolean[]>([false, false, false, false, false]);
  const [chaChaCounts, setChaChaCounts] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);

  const toggleObject = (index: number) => {
    const newHidden = [...hiddenObjects];
    newHidden[index] = !newHidden[index];
    setHiddenObjects(newHidden);
    setAnswer(null);
    setFeedback(null);
  };

  const resetPeekaBoo = () => {
    setHiddenObjects([false, false, false, false, false]);
    setAnswer(null);
    setFeedback(null);
  };

  const checkAnswer = (selectedAnswer: number) => {
    const correctAnswer = hiddenObjects.filter(h => !h).length;
    setAnswer(selectedAnswer);
    setFeedback(selectedAnswer === correctAnswer ? "correct" : "incorrect");
  };

  const doChaCha = () => {
    setChaChaCounts(prev => (prev + 1) % 6);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-6 h-6" />
            Peek-a-Boo Counting
          </CardTitle>
          <CardDescription>Click on the balls to hide or show them (3 minutes)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center gap-4 flex-wrap mb-6">
            {[0, 1, 2, 3, 4].map((index) => (
              <button
                key={index}
                onClick={() => toggleObject(index)}
                className="w-20 h-20 rounded-full bg-primary hover:bg-primary/90 transition-all transform hover:scale-110 flex items-center justify-center text-3xl relative"
                style={{
                  opacity: hiddenObjects[index] ? 0.2 : 1,
                }}
              >
                {hiddenObjects[index] ? (
                  <EyeOff className="w-8 h-8 text-primary-foreground" />
                ) : (
                  <span className="text-primary-foreground font-bold">{index + 1}</span>
                )}
              </button>
            ))}
          </div>
          <div className="text-center space-y-4">
            <p className="text-lg font-semibold mb-4">How many visible balls do you see?</p>
            <div className="flex justify-center gap-3 mb-4">
              {[0, 1, 2, 3, 4, 5].map((num) => (
                <Button
                  key={num}
                  onClick={() => checkAnswer(num)}
                  variant={answer === num ? (feedback === "correct" ? "default" : "destructive") : "outline"}
                  className="w-16 h-16 text-xl font-bold"
                  disabled={feedback !== null}
                >
                  {num}
                </Button>
              ))}
            </div>
            {feedback && (
              <div className={`p-4 rounded-lg ${feedback === "correct" ? "bg-green-500/20 text-green-700 dark:text-green-300" : "bg-red-500/20 text-red-700 dark:text-red-300"}`}>
                <p className="font-bold text-lg">
                  {feedback === "correct" ? "✓ Correct! Great job!" : "✗ Try again! Count carefully."}
                </p>
              </div>
            )}
            <Button onClick={resetPeekaBoo} variant="outline">Reset & Try Again</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music className="w-6 h-6" />
            Number Cha-Cha to 5
          </CardTitle>
          <CardDescription>Click the button and count along! (1 minute)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-6">
            <div className="bg-accent/20 p-8 rounded-lg">
              <p className="text-6xl font-bold text-primary mb-4">{chaChaCounts === 0 ? "Ready?" : chaChaCounts}</p>
              {chaChaCounts > 0 && (
                <p className="text-xl">
                  {chaChaCounts <= 2 ? "🙌 Hand out!" : "🦶 Step in place!"}
                </p>
              )}
            </div>
            <Button onClick={doChaCha} size="lg" className="text-lg px-8">
              {chaChaCounts === 0 ? "Start Cha-Cha!" : chaChaCounts === 5 ? "Again!" : "Next Number"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const SortingActivity = () => {
  const [sortBy, setSortBy] = useState<"color" | "type" | null>(null);
  const [userGroups, setUserGroups] = useState<Record<string, string[]>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);

  const animals = [
    { name: "Green Turtle", color: "green", type: "swim", emoji: "🐢", bgColor: "#eab308" },
    { name: "Red Bird", color: "red", type: "fly", emoji: "🐦", bgColor: "#22c55e" },
    { name: "Yellow Bee", color: "yellow", type: "fly", emoji: "🐝", bgColor: "#ef4444" },
    { name: "Green Frog", color: "green", type: "swim", emoji: "🐸", bgColor: "#eab308" },
    { name: "Red Crab", color: "red", type: "swim", emoji: "🦀", bgColor: "#22c55e" },
  ];

  const groupLabels = sortBy === "color" 
    ? { red: "🔴 Red Animals", yellow: "🟡 Yellow Animals", green: "🟢 Green Animals" }
    : { fly: "🦋 Animals That Fly", swim: "🐠 Animals That Swim" };

  const correctGroups = sortBy
    ? animals.reduce((acc, animal) => {
        const key = sortBy === "color" ? animal.color : animal.type;
        if (!acc[key]) acc[key] = [];
        acc[key].push(animal.name);
        return acc;
      }, {} as Record<string, string[]>)
    : null;

  const addToGroup = (groupKey: string) => {
    if (!selectedAnimal) return;
    
    const newGroups = { ...userGroups };
    // Remove from other groups if already placed
    Object.keys(newGroups).forEach(key => {
      newGroups[key] = newGroups[key].filter(name => name !== selectedAnimal);
    });
    
    // Add to new group
    if (!newGroups[groupKey]) newGroups[groupKey] = [];
    newGroups[groupKey].push(selectedAnimal);
    
    setUserGroups(newGroups);
    setSelectedAnimal(null);
  };

  const checkSorting = () => {
    setShowFeedback(true);
  };

  const resetSort = () => {
    setSortBy(null);
    setUserGroups({});
    setShowFeedback(false);
    setSelectedAnimal(null);
  };

  const isCorrect = correctGroups && JSON.stringify(Object.keys(userGroups).sort().reduce((acc, key) => {
    acc[key] = userGroups[key].sort();
    return acc;
  }, {} as Record<string, string[]>)) === JSON.stringify(Object.keys(correctGroups).sort().reduce((acc, key) => {
    acc[key] = correctGroups[key].sort();
    return acc;
  }, {} as Record<string, string[]>));

  const placedAnimals = Object.values(userGroups).flat();
  const allPlaced = placedAnimals.length === animals.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Grid3x3 className="w-6 h-6" />
          Sorting Activity
        </CardTitle>
        <CardDescription>Sort animals in different ways (3 minutes)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center gap-4 mb-6">
          <Button onClick={() => { setSortBy("color"); setUserGroups({}); setShowFeedback(false); setSelectedAnimal(null); }} variant={sortBy === "color" ? "default" : "outline"}>
            Sort by Color
          </Button>
          <Button onClick={() => { setSortBy("type"); setUserGroups({}); setShowFeedback(false); setSelectedAnimal(null); }} variant={sortBy === "type" ? "default" : "outline"}>
            Sort by Movement
          </Button>
          <Button onClick={resetSort} variant="secondary">
            Reset
          </Button>
        </div>

        {!sortBy && (
          <div className="text-center text-muted-foreground">
            <p>Choose how you want to sort the animals above!</p>
          </div>
        )}

        {sortBy && (
          <>
            <div className="bg-accent/10 p-4 rounded-lg">
              <p className="text-center font-semibold mb-4">Click an animal, then click a group to sort it:</p>
              <div className="flex justify-center gap-4 flex-wrap">
                {animals.map((animal, idx) => {
                  const isPlaced = placedAnimals.includes(animal.name);
                  return (
                    <button
                      key={idx}
                      onClick={() => !isPlaced && setSelectedAnimal(animal.name)}
                      disabled={isPlaced && selectedAnimal !== animal.name}
                      className={`text-center p-4 rounded-lg border-2 transition-all ${
                        selectedAnimal === animal.name
                          ? "border-primary scale-110 ring-4 ring-primary/50"
                          : isPlaced
                          ? "border-border/50 opacity-40 cursor-not-allowed"
                          : "border-border hover:border-primary cursor-pointer"
                      }`}
                    >
                      <div 
                        className="w-20 h-20 rounded-full flex items-center justify-center mb-2 mx-auto border-4 border-white shadow-lg"
                        style={{ backgroundColor: animal.bgColor }}
                      >
                        <span className="text-4xl">{animal.emoji}</span>
                      </div>
                      <p className="text-sm font-medium">{animal.name}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className={`grid gap-4 ${sortBy === "color" ? "md:grid-cols-3 grid-cols-1" : "md:grid-cols-2"}`}>
              {Object.entries(groupLabels).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => selectedAnimal && addToGroup(key)}
                  disabled={!selectedAnimal}
                  className={`bg-accent/20 p-4 rounded-lg border-2 transition-all ${
                    selectedAnimal ? "border-primary hover:bg-accent/30 cursor-pointer" : "border-border"
                  }`}
                >
                  <h3 className="font-bold text-base mb-3">{label}</h3>
                  <div className="flex gap-2 justify-center flex-wrap min-h-[60px] items-center">
                    {userGroups[key]?.map((animalName, idx) => {
                      const animal = animals.find(a => a.name === animalName);
                      return animal ? (
                        <div 
                          key={idx} 
                          className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-white shadow"
                          style={{ backgroundColor: animal.bgColor }}
                        >
                          <span className="text-2xl">{animal.emoji}</span>
                        </div>
                      ) : null;
                    })}
                    {(!userGroups[key] || userGroups[key].length === 0) && (
                      <p className="text-muted-foreground text-xs">Drop here</p>
                    )}
                  </div>
                  <p className="text-center mt-2 font-bold text-lg">Count: {userGroups[key]?.length || 0}</p>
                </button>
              ))}
            </div>
            
            <div className="flex justify-center gap-4 pt-4">
              <Button onClick={checkSorting} size="lg" disabled={showFeedback || !allPlaced}>
                Check My Answer
              </Button>
            </div>

            {showFeedback && (
              <div className={`p-4 rounded-lg text-center ${isCorrect ? "bg-green-500/20 text-green-700 dark:text-green-300" : "bg-red-500/20 text-red-700 dark:text-red-300"}`}>
                <p className="font-bold text-lg">
                  {isCorrect ? "✓ Perfect! You sorted correctly!" : "✗ Not quite right. Try sorting them again!"}
                </p>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

const TowerBuilding = () => {
  const [tower, setTower] = useState([1, 2, 3, 4]);
  const [broken, setBroken] = useState<number[][] | null>(null);
  const [userGuess, setUserGuess] = useState<{ part1: number | null; part2: number | null }>({ part1: null, part2: null });
  const [showAnswer, setShowAnswer] = useState(false);

  const breakTower = () => {
    const splitPoint = Math.floor(Math.random() * (tower.length - 1)) + 1;
    const part1 = tower.slice(0, splitPoint);
    const part2 = tower.slice(splitPoint);
    setBroken([part1, part2]);
    setUserGuess({ part1: null, part2: null });
    setShowAnswer(false);
  };

  const fixTower = () => {
    setBroken(null);
    setUserGuess({ part1: null, part2: null });
    setShowAnswer(false);
  };

  const changeTowerSize = (size: number) => {
    setTower(Array.from({ length: size }, (_, i) => i + 1));
    setBroken(null);
    setUserGuess({ part1: null, part2: null });
    setShowAnswer(false);
  };

  const checkGuess = () => {
    setShowAnswer(true);
  };

  const isCorrect = broken && userGuess.part1 === broken[0].length && userGuess.part2 === broken[1].length;

  const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#f9ca24", "#6c5ce7"];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="w-6 h-6" />
          Tower Building - Charlie's Story
        </CardTitle>
        <CardDescription>Build towers and break them into partners (15 minutes)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-accent/20 p-4 rounded-lg">
          <p className="text-center italic">
            "Charlie built a tower, but his baby sister broke it! Let's see what happened..."
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <Button onClick={() => changeTowerSize(4)} variant={tower.length === 4 ? "default" : "outline"}>
            Tower of 4
          </Button>
          <Button onClick={() => changeTowerSize(5)} variant={tower.length === 5 ? "default" : "outline"}>
            Tower of 5
          </Button>
        </div>

        <div className="min-h-[300px] flex items-center justify-center">
          {!broken ? (
            <div className="flex flex-col-reverse gap-2">
              {tower.map((cube, idx) => (
                <div
                  key={idx}
                  className="w-24 h-24 rounded-lg flex items-center justify-center text-white font-bold text-2xl shadow-lg"
                  style={{ backgroundColor: colors[cube - 1] }}
                >
                  {cube}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex gap-12">
              {broken.map((part, partIdx) => (
                <div key={partIdx} className="flex flex-col-reverse gap-2">
                  {part.map((cube, idx) => (
                    <div
                      key={idx}
                      className="w-24 h-24 rounded-lg flex items-center justify-center text-white font-bold text-2xl shadow-lg"
                      style={{ backgroundColor: colors[cube - 1] }}
                    >
                      {cube}
                    </div>
                  ))}
                  {!showAnswer && (
                    <p className="text-center font-bold text-lg mt-2 text-muted-foreground">
                      ? cubes
                    </p>
                  )}
                  {showAnswer && (
                    <p className="text-center font-bold text-lg mt-2">
                      {part.length} cube{part.length !== 1 ? "s" : ""}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {broken && !showAnswer && (
          <div className="space-y-4">
            <p className="text-center font-semibold text-lg">How many cubes are in each tower?</p>
            <div className="flex justify-center gap-8">
              <div className="text-center">
                <p className="text-sm mb-2 text-muted-foreground">Left Tower</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <Button
                      key={num}
                      onClick={() => setUserGuess({ ...userGuess, part1: num })}
                      variant={userGuess.part1 === num ? "default" : "outline"}
                      className="w-12 h-12"
                    >
                      {num}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm mb-2 text-muted-foreground">Right Tower</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <Button
                      key={num}
                      onClick={() => setUserGuess({ ...userGuess, part2: num })}
                      variant={userGuess.part2 === num ? "default" : "outline"}
                      className="w-12 h-12"
                    >
                      {num}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-center gap-4">
          {!broken ? (
            <Button onClick={breakTower} size="lg">
              Break the Tower
            </Button>
          ) : showAnswer ? (
            <Button onClick={fixTower} size="lg" variant="secondary">
              Try Another Tower
            </Button>
          ) : (
            <Button 
              onClick={checkGuess} 
              size="lg"
              disabled={userGuess.part1 === null || userGuess.part2 === null}
            >
              Check My Answer
            </Button>
          )}
        </div>

        {broken && showAnswer && (
          <div className={`p-4 rounded-lg text-center ${isCorrect ? "bg-green-500/20 text-green-700 dark:text-green-300" : "bg-red-500/20 text-red-700 dark:text-red-300"}`}>
            <p className="font-bold text-lg mb-2">
              {isCorrect ? "✓ Excellent! You found the partners!" : "✗ Not quite! Try again."}
            </p>
            <p className="text-lg">
              I found {broken[0].length} and {broken[1].length} inside {tower.length}!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const PartnersActivity = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [selectedPartners, setSelectedPartners] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);

  const cards = [
    {
      title: "Bears",
      total: 4,
      items: [
        { emoji: "🧸", size: "big", hasBow: true, color: "brown" },
        { emoji: "🧸", size: "big", hasBow: true, color: "brown" },
        { emoji: "🧸", size: "small", hasBow: false, color: "white" },
        { emoji: "🧸", size: "small", hasBow: false, color: "brown" },
      ],
      options: [
        { description: "Bears with bowties vs no bowties", partner1: 2, partner2: 2, isCorrect: true },
        { description: "Big bears vs small bears", partner1: 2, partner2: 2, isCorrect: true },
        { description: "Brown bears vs white bears", partner1: 3, partner2: 1, isCorrect: true },
        { description: "Happy bears vs sad bears", partner1: 1, partner2: 3, isCorrect: false },
      ]
    },
    {
      title: "Fish",
      total: 5,
      items: [
        { emoji: "🐠", size: "big", color: "orange" },
        { emoji: "🐠", size: "big", color: "orange" },
        { emoji: "🐠", size: "small", color: "blue" },
        { emoji: "🐠", size: "small", color: "blue" },
        { emoji: "🐠", size: "small", color: "orange" },
      ],
      options: [
        { description: "Big fish vs small fish", partner1: 2, partner2: 3, isCorrect: true },
        { description: "Orange fish vs blue fish", partner1: 3, partner2: 2, isCorrect: true },
        { description: "Swimming vs floating fish", partner1: 4, partner2: 1, isCorrect: false },
        { description: "Hungry fish vs full fish", partner1: 2, partner2: 3, isCorrect: false },
      ]
    },
    {
      title: "Cats",
      total: 5,
      items: [
        { emoji: "🐱", position: "sitting", color: "orange" },
        { emoji: "🐱", position: "sitting", color: "orange" },
        { emoji: "🐱", position: "sitting", color: "gray" },
        { emoji: "🐱", position: "walking", color: "gray" },
        { emoji: "🐱", position: "walking", color: "gray" },
      ],
      options: [
        { description: "Sitting cats vs walking cats", partner1: 3, partner2: 2, isCorrect: true },
        { description: "Orange cats vs gray cats", partner1: 2, partner2: 3, isCorrect: true },
        { description: "Sleeping vs awake cats", partner1: 1, partner2: 4, isCorrect: false },
        { description: "Hungry cats vs full cats", partner1: 3, partner2: 2, isCorrect: false },
      ]
    },
  ];

  const currentCardData = cards[currentCard];

  const renderBear = (bear: any, index: number) => {
    const sizeClass = bear.size === "big" ? "text-7xl" : "text-5xl";
    const isWhite = bear.color === "white";
    return (
      <div key={index} className="relative inline-block">
        <div 
          className={sizeClass} 
          style={{ 
            filter: isWhite ? "grayscale(100%) brightness(1.8)" : "",
            textShadow: isWhite ? "0 0 3px rgba(0,0,0,0.4), 0 0 1px rgba(0,0,0,0.6)" : ""
          }}
        >
          {bear.emoji}
        </div>
        {bear.hasBow && (
          <div 
            className="absolute left-1/2 -translate-x-1/2 text-xl"
            style={{ top: bear.size === "big" ? "45%" : "40%" }}
          >
            🎀
          </div>
        )}
      </div>
    );
  };

  const renderFish = (fish: any, index: number) => {
    const sizeClass = fish.size === "big" ? "text-7xl" : "text-5xl";
    const filter = fish.color === "blue" ? "hue-rotate(180deg)" : "";
    return <div key={index} className={sizeClass} style={{ filter }}>{fish.emoji}</div>;
  };

  const renderCat = (cat: any, index: number) => {
    const filter = cat.color === "gray" ? "grayscale(100%)" : "";
    const catEmoji = cat.position === "sitting" ? "🐱" : "🐈";
    const transform = cat.position === "sitting" ? "rotate(0deg)" : "scaleX(-1)";
    return (
      <div key={index} className="relative inline-block">
        <div 
          className="text-6xl transition-transform" 
          style={{ filter, transform }}
        >
          {catEmoji}
        </div>
        {cat.position === "sitting" && (
          <div className="text-xs text-center text-muted-foreground mt-1">sitting</div>
        )}
        {cat.position === "walking" && (
          <div className="text-xs text-center text-muted-foreground mt-1">walking</div>
        )}
      </div>
    );
  };

  const renderItem = (item: any, index: number) => {
    if (currentCardData.title === "Bears") return renderBear(item, index);
    if (currentCardData.title === "Fish") return renderFish(item, index);
    if (currentCardData.title === "Cats") return renderCat(item, index);
    return null;
  };

  const toggleOption = (optionKey: string) => {
    if (showFeedback) return;
    setSelectedPartners(prev => 
      prev.includes(optionKey) 
        ? prev.filter(p => p !== optionKey)
        : [...prev, optionKey]
    );
  };

  const getResults = () => {
    return selectedPartners.map(key => {
      const idx = parseInt(key.split("-")[1]);
      const option = currentCardData.options[idx];
      return { key, option, isCorrect: option.isCorrect };
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Partners Practice</CardTitle>
        <CardDescription>Find different partners inside each group (select all that apply)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">Card {currentCard + 1} of {cards.length}</p>
          <h3 className="text-3xl font-bold mb-4">I have a group of {currentCardData.title}</h3>
          <div className="flex justify-center gap-3 mb-6 flex-wrap">
            {currentCardData.items.map((item, idx) => renderItem(item, idx))}
          </div>
          <p className="text-2xl font-bold text-primary">Total: {currentCardData.total}</p>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-center">What partners can you find? Select all correct ways to split them:</h4>
          {currentCardData.options.map((option, idx) => {
            const optionKey = `option-${idx}`;
            const isSelected = selectedPartners.includes(optionKey);
            const result = showFeedback ? getResults().find(r => r.key === optionKey) : null;
            
            return (
              <button
                key={idx}
                onClick={() => toggleOption(optionKey)}
                disabled={showFeedback}
                className={`w-full p-6 rounded-lg border-2 transition-all ${
                  showFeedback && result
                    ? result.isCorrect
                      ? "border-green-500 bg-green-500/10"
                      : "border-red-500 bg-red-500/10"
                    : showFeedback && !result && option.isCorrect
                    ? "border-yellow-500 bg-yellow-500/10"
                    : isSelected
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                } ${showFeedback ? "cursor-not-allowed" : ""}`}
              >
                <div className="text-center space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      isSelected ? "border-primary bg-primary" : "border-muted-foreground"
                    }`}>
                      {isSelected && <span className="text-primary-foreground text-sm">✓</span>}
                    </div>
                    <p className="text-lg font-medium">{option.description}</p>
                    {showFeedback && result && (
                      <span className={result.isCorrect ? "text-green-600" : "text-red-600"}>
                        {result.isCorrect ? "✓" : "✗"}
                      </span>
                    )}
                    {showFeedback && !result && option.isCorrect && (
                      <span className="text-yellow-600">(missed)</span>
                    )}
                  </div>
                  <p className="text-xl text-muted-foreground">
                    {option.partner1} and {option.partner2}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {selectedPartners.length > 0 && !showFeedback && (
          <div className="flex justify-center">
            <Button onClick={() => setShowFeedback(true)} size="lg">
              Check My Answers
            </Button>
          </div>
        )}

        {showFeedback && (() => {
          const results = getResults();
          const correctCount = results.filter(r => r.isCorrect).length;
          const incorrectCount = results.filter(r => !r.isCorrect).length;
          const totalCorrectOptions = currentCardData.options.filter(o => o.isCorrect).length;
          const allCorrect = correctCount === totalCorrectOptions && incorrectCount === 0;
          
          return (
            <div className={`p-4 rounded-lg text-center ${
              allCorrect 
                ? "bg-green-500/20 text-green-700 dark:text-green-300" 
                : incorrectCount > 0
                ? "bg-red-500/20 text-red-700 dark:text-red-300"
                : "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300"
            }`}>
              <p className="font-bold text-lg mb-2">
                {allCorrect 
                  ? "✓ Perfect! You found all the correct partners!" 
                  : incorrectCount > 0
                  ? `✗ ${incorrectCount} wrong selection${incorrectCount > 1 ? "s" : ""}. Some options don't match what you can see!`
                  : `You got ${correctCount} of ${totalCorrectOptions} correct ways!`}
              </p>
            </div>
          );
        })()}

        <div className="flex justify-between pt-4 border-t border-border">
          <Button
            onClick={() => {
              setCurrentCard(Math.max(0, currentCard - 1));
              setSelectedPartners([]);
              setShowFeedback(false);
            }}
            disabled={currentCard === 0}
            variant="outline"
          >
            Previous
          </Button>
          {currentCard === cards.length - 1 && showFeedback ? (
            <Link to="/activities">
              <Button size="lg">
                Continue Learning
              </Button>
            </Link>
          ) : (
            <Button
              onClick={() => {
                setCurrentCard(Math.min(cards.length - 1, currentCard + 1));
                setSelectedPartners([]);
                setShowFeedback(false);
              }}
              disabled={currentCard === cards.length - 1}
            >
              Next
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CountingActivity19;

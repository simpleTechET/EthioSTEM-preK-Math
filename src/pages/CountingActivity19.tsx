import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Music, ArrowLeft, Grid3x3, Building, Users } from "lucide-react";
import { Link } from "react-router-dom";

const CountingActivity19 = () => {
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

  const toggleObject = (index: number) => {
    const newHidden = [...hiddenObjects];
    newHidden[index] = !newHidden[index];
    setHiddenObjects(newHidden);
  };

  const resetPeekaBoo = () => {
    setHiddenObjects([false, false, false, false, false]);
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
            <p className="text-lg">
              Visible balls: <span className="font-bold text-2xl text-primary">
                {hiddenObjects.filter(h => !h).length}
              </span>
            </p>
            <Button onClick={resetPeekaBoo} variant="outline">Show All Balls</Button>
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

  const animals = [
    { name: "Alligator", color: "orange", type: "swim", emoji: "🐊" },
    { name: "Bird", color: "orange", type: "fly", emoji: "🐦" },
    { name: "Fish", color: "yellow", type: "swim", emoji: "🐠" },
    { name: "Bee", color: "yellow", type: "fly", emoji: "🐝" },
    { name: "Butterfly", color: "yellow", type: "fly", emoji: "🦋" },
  ];

  const sortedGroups = sortBy
    ? animals.reduce((acc, animal) => {
        const key = sortBy === "color" ? animal.color : animal.type;
        if (!acc[key]) acc[key] = [];
        acc[key].push(animal);
        return acc;
      }, {} as Record<string, typeof animals>)
    : null;

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
        <div className="flex justify-center gap-8 flex-wrap">
          {animals.map((animal, idx) => (
            <div
              key={idx}
              className="text-center p-4 bg-card border-2 border-border rounded-lg hover:border-primary transition-colors"
            >
              <div className="text-6xl mb-2">{animal.emoji}</div>
              <p className="text-sm font-medium">{animal.name}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <Button onClick={() => setSortBy("color")} variant={sortBy === "color" ? "default" : "outline"}>
            Sort by Color
          </Button>
          <Button onClick={() => setSortBy("type")} variant={sortBy === "type" ? "default" : "outline"}>
            Sort by Movement
          </Button>
          <Button onClick={() => setSortBy(null)} variant="secondary">
            Reset
          </Button>
        </div>

        {sortedGroups && (
          <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-border">
            {Object.entries(sortedGroups).map(([key, group]) => (
              <div key={key} className="bg-accent/20 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-4 capitalize">
                  {key === "orange" && "🟠 Orange Animals"}
                  {key === "yellow" && "🟡 Yellow Animals"}
                  {key === "fly" && "🦋 Animals That Fly"}
                  {key === "swim" && "🐠 Animals That Swim"}
                </h3>
                <div className="flex gap-4 justify-center">
                  {group.map((animal, idx) => (
                    <div key={idx} className="text-5xl">{animal.emoji}</div>
                  ))}
                </div>
                <p className="text-center mt-3 font-bold text-xl">Count: {group.length}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const TowerBuilding = () => {
  const [tower, setTower] = useState([1, 2, 3, 4]);
  const [broken, setBroken] = useState<number[][] | null>(null);

  const breakTower = () => {
    const splitPoint = Math.floor(Math.random() * (tower.length - 1)) + 1;
    const part1 = tower.slice(0, splitPoint);
    const part2 = tower.slice(splitPoint);
    setBroken([part1, part2]);
  };

  const fixTower = () => {
    setBroken(null);
  };

  const changeTowerSize = (size: number) => {
    setTower(Array.from({ length: size }, (_, i) => i + 1));
    setBroken(null);
  };

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
                  <p className="text-center font-bold text-lg mt-2">
                    {part.length} cube{part.length !== 1 ? "s" : ""}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-center gap-4">
          {!broken ? (
            <Button onClick={breakTower} size="lg">
              Break the Tower
            </Button>
          ) : (
            <Button onClick={fixTower} size="lg" variant="secondary">
              Put It Back Together
            </Button>
          )}
        </div>

        {broken && (
          <div className="bg-primary/10 p-4 rounded-lg text-center">
            <p className="font-bold text-lg">
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
  const [selectedPartners, setSelectedPartners] = useState<string | null>(null);

  const cards = [
    {
      title: "Bears",
      total: 4,
      emoji: "🧸",
      options: [
        { description: "Bears with bowties vs no bowties", partner1: 2, partner2: 2, visual: "👔🎀" },
        { description: "Big bears vs small bears", partner1: 2, partner2: 2, visual: "📏📐" },
        { description: "Brown bears vs white bears", partner1: 3, partner2: 1, visual: "🟤⚪" },
      ]
    },
    {
      title: "Fish",
      total: 5,
      emoji: "🐠",
      options: [
        { description: "Big fish vs small fish", partner1: 2, partner2: 3, visual: "🐋🐟" },
        { description: "Orange fish vs blue fish", partner1: 3, partner2: 2, visual: "🟠🔵" },
      ]
    },
    {
      title: "Cats",
      total: 5,
      emoji: "🐱",
      options: [
        { description: "Sitting cats vs walking cats", partner1: 3, partner2: 2, visual: "🪑🚶" },
        { description: "Orange cats vs gray cats", partner1: 2, partner2: 3, visual: "🟠⚫" },
      ]
    },
  ];

  const currentCardData = cards[currentCard];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Partners Practice</CardTitle>
        <CardDescription>Find different partners inside each group</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">Card {currentCard + 1} of {cards.length}</p>
          <h3 className="text-3xl font-bold mb-4">I have a group of {currentCardData.title}</h3>
          <div className="flex justify-center gap-3 mb-6">
            {Array.from({ length: currentCardData.total }).map((_, idx) => (
              <div key={idx} className="text-6xl">
                {currentCardData.emoji}
              </div>
            ))}
          </div>
          <p className="text-2xl font-bold text-primary">Total: {currentCardData.total}</p>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-center">What partners can you find?</h4>
          {currentCardData.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedPartners(`option-${idx}`)}
              className={`w-full p-6 rounded-lg border-2 transition-all ${
                selectedPartners === `option-${idx}`
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="text-center space-y-3">
                <p className="text-lg font-medium">{option.description}</p>
                <p className="text-4xl">{option.visual}</p>
                {selectedPartners === `option-${idx}` && (
                  <p className="text-xl font-bold text-primary">
                    I found {option.partner1} and {option.partner2} inside {currentCardData.total}!
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="flex justify-between pt-4 border-t border-border">
          <Button
            onClick={() => {
              setCurrentCard(Math.max(0, currentCard - 1));
              setSelectedPartners(null);
            }}
            disabled={currentCard === 0}
            variant="outline"
          >
            Previous
          </Button>
          <Button
            onClick={() => {
              setCurrentCard(Math.min(cards.length - 1, currentCard + 1));
              setSelectedPartners(null);
            }}
            disabled={currentCard === cards.length - 1}
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CountingActivity19;

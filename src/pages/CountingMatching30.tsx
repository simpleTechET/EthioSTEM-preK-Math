import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Flower2, Bug, Gift, Blocks, CheckCircle2, RotateCcw, Volume2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const CountingMatching30 = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("fluency");

  // 1 More Seed activity state
  const [seedCount, setSeedCount] = useState(0);
  const [seedComplete, setSeedComplete] = useState(false);

  // Ants Go Marching state
  const [antVerse, setAntVerse] = useState(1);
  const [antsComplete, setAntsComplete] = useState(false);

  // Birthday presents state
  const [presentCount, setPresentCount] = useState(0);
  const [presentsComplete, setPresentsComplete] = useState(false);

  // Tower building state
  const [towerHeight, setTowerHeight] = useState(0);
  const [towerComplete, setTowerComplete] = useState(false);

  // Debrief state
  const [hiddenTower, setHiddenTower] = useState(2);
  const [showHiddenAnswer, setShowHiddenAnswer] = useState(false);
  const [selectedGuess, setSelectedGuess] = useState<number | null>(null);

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  const plantSeed = () => {
    if (seedCount < 3) {
      const newCount = seedCount + 1;
      setSeedCount(newCount);
      speak(`${newCount} seed${newCount > 1 ? 's' : ''}!`);
      if (newCount === 3) {
        setSeedComplete(true);
        toast({
          title: "Garden Complete! 🌱",
          description: "You planted 3 seeds by adding 1 more each time!",
        });
      }
    }
  };

  const resetSeeds = () => {
    setSeedCount(0);
    setSeedComplete(false);
  };

  const antVerses = [
    { number: 1, action: "suck his thumb" },
    { number: 2, action: "tie a shoe" },
    { number: 3, action: "climb a tree" },
    { number: 4, action: "shut the door" },
  ];

  const nextAntVerse = () => {
    if (antVerse < 4) {
      setAntVerse(antVerse + 1);
      speak(`The ants go marching ${antVerse + 1} by ${antVerse + 1}`);
    } else {
      setAntsComplete(true);
      toast({
        title: "Song Complete! 🐜",
        description: "The ants marched from 1 to 4, adding 1 more each time!",
      });
    }
  };

  const resetAnts = () => {
    setAntVerse(1);
    setAntsComplete(false);
  };

  const addPresent = () => {
    if (presentCount < 5) {
      const newCount = presentCount + 1;
      setPresentCount(newCount);
      speak(`${newCount} present${newCount > 1 ? 's' : ''}! Cameron has 1 more!`);
      if (newCount === 5) {
        setPresentsComplete(true);
        toast({
          title: "Party Time! 🎁",
          description: "Cameron has 5 presents! Each friend brought 1 more!",
        });
      }
    }
  };

  const resetPresents = () => {
    setPresentCount(0);
    setPresentsComplete(false);
  };

  const addBlock = () => {
    if (towerHeight < 5) {
      const newHeight = towerHeight + 1;
      setTowerHeight(newHeight);
      speak(`We have 1 more! ${Array.from({ length: newHeight }, (_, i) => `${i + 1} block${i > 0 ? 's' : ''}`).pop()}`);
      if (newHeight === 5) {
        setTowerComplete(true);
        toast({
          title: "Tower Complete! 🏗️",
          description: "You built a tower of 5 blocks by adding 1 more each time!",
        });
      }
    }
  };

  const resetTower = () => {
    setTowerHeight(0);
    setTowerComplete(false);
  };

  const guessHiddenTower = (guess: number) => {
    setSelectedGuess(guess);
    setShowHiddenAnswer(true);
    if (guess === hiddenTower + 1) {
      speak(`Yes! 2 plus 1 more is 3!`);
      toast({
        title: "Correct! 🎉",
        description: `${hiddenTower} + 1 more = ${hiddenTower + 1}!`,
      });
    } else {
      speak(`Let's count again. 2 plus 1 more is 3.`);
    }
  };

  const resetHiddenGuess = () => {
    setShowHiddenAnswer(false);
    setSelectedGuess(null);
    setHiddenTower(Math.floor(Math.random() * 3) + 2); // 2, 3, or 4
  };

  const blockColors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-purple-500",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/activities")}
            className="rounded-full"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-amber-800">
              Lesson 30: Build a Tower
            </h1>
            <p className="text-amber-600">
              Put 1 more cube or block at a time
            </p>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="fluency" className="text-xs md:text-sm">
              Fluency
            </TabsTrigger>
            <TabsTrigger value="application" className="text-xs md:text-sm">
              Application
            </TabsTrigger>
            <TabsTrigger value="concept" className="text-xs md:text-sm">
              Concept
            </TabsTrigger>
            <TabsTrigger value="debrief" className="text-xs md:text-sm">
              Debrief
            </TabsTrigger>
          </TabsList>

          {/* Fluency Practice */}
          <TabsContent value="fluency" className="space-y-6">
            <Card className="border-2 border-green-300 bg-white/80">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Flower2 className="h-6 w-6 text-green-600" />
                  <h2 className="text-xl font-bold text-green-700">1 More Seed</h2>
                  <span className="text-sm text-muted-foreground">(4 min)</span>
                </div>
                <p className="text-gray-600 mb-4">
                  Plant seeds in your garden row! Add 1 more seed each time.
                </p>

                {/* Garden Row */}
                <div className="bg-amber-100 rounded-xl p-6 mb-4">
                  <div className="flex justify-center gap-4 mb-4">
                    {[1, 2, 3].map((spot) => (
                      <div
                        key={spot}
                        className={`w-16 h-16 rounded-full border-4 border-dashed flex items-center justify-center transition-all duration-300 ${
                          seedCount >= spot
                            ? "border-green-500 bg-green-100"
                            : "border-amber-400 bg-amber-50"
                        }`}
                      >
                        {seedCount >= spot && (
                          <div className="w-8 h-8 bg-amber-600 rounded-full animate-bounce" />
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-center text-2xl font-bold text-green-700">
                    {seedCount} seed{seedCount !== 1 ? "s" : ""} planted!
                  </p>
                </div>

                <div className="flex justify-center gap-4">
                  <Button
                    onClick={plantSeed}
                    disabled={seedComplete}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    <Flower2 className="mr-2 h-5 w-5" />
                    Plant 1 More Seed
                  </Button>
                  <Button variant="outline" onClick={resetSeeds}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-300 bg-white/80">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Bug className="h-6 w-6 text-red-600" />
                  <h2 className="text-xl font-bold text-red-700">The Ants Go Marching</h2>
                  <span className="text-sm text-muted-foreground">(3 min)</span>
                </div>
                <p className="text-gray-600 mb-4">
                  Sing along! Watch the ants march - 1 more joins each verse!
                </p>

                {/* Ants Display */}
                <div className="bg-green-100 rounded-xl p-6 mb-4">
                  <div className="flex justify-center gap-2 mb-4 min-h-[60px]">
                    {Array.from({ length: antVerse }).map((_, i) => (
                      <div
                        key={i}
                        className="text-4xl animate-bounce"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      >
                        🐜
                      </div>
                    ))}
                  </div>

                  <div className="text-center bg-white/80 rounded-lg p-4">
                    <p className="text-lg font-semibold text-gray-700 mb-2">
                      🎵 The ants go marching {antVerse} by {antVerse}. Hoorah! Hoorah!
                    </p>
                    <p className="text-gray-600">
                      The little one stops to {antVerses[antVerse - 1].action}!
                    </p>
                  </div>

                  <p className="text-center text-xl font-bold text-red-600 mt-4">
                    {antVerse} ant{antVerse !== 1 ? "s" : ""} marching!
                  </p>
                </div>

                <div className="flex justify-center gap-4">
                  <Button
                    onClick={nextAntVerse}
                    disabled={antsComplete}
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    <Volume2 className="mr-2 h-5 w-5" />
                    {antsComplete ? "Song Complete!" : "Next Verse (1 More Ant!)"}
                  </Button>
                  <Button variant="outline" onClick={resetAnts}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Start Over
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Application Problem */}
          <TabsContent value="application">
            <Card className="border-2 border-pink-300 bg-white/80">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Gift className="h-6 w-6 text-pink-600" />
                  <h2 className="text-xl font-bold text-pink-700">Cameron's Birthday!</h2>
                  <span className="text-sm text-muted-foreground">(2 min)</span>
                </div>
                <p className="text-gray-600 mb-4">
                  It's Cameron's birthday! Each friend brings 1 more present. How many presents does Cameron have?
                </p>

                {/* Birthday Scene */}
                <div className="bg-gradient-to-b from-pink-100 to-purple-100 rounded-xl p-6 mb-4">
                  <div className="text-center mb-4">
                    <span className="text-6xl">🎂</span>
                    <p className="text-xl font-bold text-pink-700 mt-2">Happy Birthday Cameron!</p>
                  </div>

                  {/* Presents Display */}
                  <div className="flex justify-center gap-3 mb-4 min-h-[80px] flex-wrap">
                    {Array.from({ length: presentCount }).map((_, i) => (
                      <div
                        key={i}
                        className="text-5xl animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      >
                        🎁
                      </div>
                    ))}
                  </div>

                  <div className="text-center bg-white/80 rounded-lg p-4">
                    {presentCount === 0 ? (
                      <p className="text-gray-600">Cameron is waiting for friends to arrive...</p>
                    ) : (
                      <p className="text-lg">
                        <span className="font-bold text-pink-600">
                          {presentCount} present{presentCount !== 1 ? "s" : ""}!
                        </span>
                        {presentCount < 5 && " Who will bring 1 more?"}
                      </p>
                    )}
                  </div>

                  <p className="text-center text-2xl font-bold text-purple-600 mt-4">
                    {presentCount > 0 && `Cameron has ${presentCount}!`}
                  </p>
                </div>

                <div className="flex justify-center gap-4">
                  <Button
                    onClick={addPresent}
                    disabled={presentsComplete}
                    className="bg-pink-500 hover:bg-pink-600 text-white"
                  >
                    <Gift className="mr-2 h-5 w-5" />
                    {presentsComplete ? "Party Time!" : "A Friend Brings 1 More! 🎁"}
                  </Button>
                  <Button variant="outline" onClick={resetPresents}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    New Party
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Concept Development */}
          <TabsContent value="concept">
            <Card className="border-2 border-blue-300 bg-white/80">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Blocks className="h-6 w-6 text-blue-600" />
                  <h2 className="text-xl font-bold text-blue-700">Build a Tower!</h2>
                  <span className="text-sm text-muted-foreground">(12 min)</span>
                </div>
                <p className="text-gray-600 mb-4">
                  Let's build a tower! Add 1 more block at a time and count how many you have.
                </p>

                {/* Tower Building Area */}
                <div className="bg-gradient-to-b from-blue-50 to-indigo-100 rounded-xl p-6 mb-4">
                  <div className="flex flex-col items-center">
                    {/* Tower */}
                    <div className="flex flex-col-reverse items-center mb-4 min-h-[280px] justify-end">
                      {Array.from({ length: towerHeight }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-20 h-12 ${blockColors[i]} rounded-md shadow-lg border-2 border-white/50 flex items-center justify-center text-white font-bold text-xl transition-all duration-300`}
                          style={{
                            animation: i === towerHeight - 1 ? "bounce 0.5s ease-out" : "none",
                          }}
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>

                    {/* Ground */}
                    <div className="w-32 h-4 bg-amber-600 rounded-t-lg" />
                  </div>

                  <div className="text-center mt-4">
                    <p className="text-3xl font-bold text-blue-700">
                      {towerHeight} block{towerHeight !== 1 ? "s" : ""}!
                    </p>
                    {towerHeight > 0 && towerHeight < 5 && (
                      <p className="text-lg text-blue-600 mt-2">
                        We have {towerHeight}. Put 1 more to get {towerHeight + 1}!
                      </p>
                    )}
                  </div>
                </div>

                {/* Instructions */}
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <h3 className="font-semibold text-blue-800 mb-2">How to Build:</h3>
                  <ul className="text-blue-700 space-y-1">
                    <li>• Click "Put 1 More Block" to add a block</li>
                    <li>• Count the blocks each time</li>
                    <li>• Say: "We have 1 more! 1 block, 2 blocks, 3 blocks..."</li>
                  </ul>
                </div>

                <div className="flex justify-center gap-4">
                  <Button
                    onClick={addBlock}
                    disabled={towerComplete}
                    size="lg"
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    <Blocks className="mr-2 h-5 w-5" />
                    {towerComplete ? "Tower Complete! 🏗️" : "Put 1 More Block!"}
                  </Button>
                  <Button variant="outline" onClick={resetTower}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Start Over
                  </Button>
                </div>

                {towerComplete && (
                  <div className="mt-4 p-4 bg-green-100 rounded-lg text-center">
                    <CheckCircle2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-green-700 font-semibold">
                      Amazing! You built a tower of 5 by adding 1 more each time!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Student Debrief */}
          <TabsContent value="debrief">
            <Card className="border-2 border-purple-300 bg-white/80">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-purple-700 mb-4">
                  Let's Think About It!
                </h2>
                <p className="text-gray-600 mb-6">
                  Answer questions about building towers with 1 more.
                </p>

                {/* Hidden Tower Guessing Game */}
                <div className="bg-purple-50 rounded-xl p-6 mb-6">
                  <h3 className="text-lg font-semibold text-purple-700 mb-4">
                    🎩 Magic Tower Game
                  </h3>
                  <p className="text-gray-600 mb-4">
                    I have {hiddenTower} cubes in one hand and 1 cube in the other. 
                    I put them together behind my back. How many cubes are in my tower now?
                  </p>

                  <div className="flex justify-center gap-4 mb-4">
                    {/* Visual representation */}
                    <div className="text-center">
                      <div className="flex flex-col-reverse items-center">
                        {Array.from({ length: hiddenTower }).map((_, i) => (
                          <div
                            key={i}
                            className="w-12 h-8 bg-purple-400 rounded-md border border-purple-600"
                          />
                        ))}
                      </div>
                      <p className="text-sm text-purple-600 mt-2">{hiddenTower} cubes</p>
                    </div>
                    <div className="flex items-center text-2xl">➕</div>
                    <div className="text-center">
                      <div className="w-12 h-8 bg-orange-400 rounded-md border border-orange-600" />
                      <p className="text-sm text-orange-600 mt-2">1 cube</p>
                    </div>
                    <div className="flex items-center text-2xl">=</div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center">
                        {showHiddenAnswer ? (
                          <span className="text-2xl font-bold text-purple-700">{hiddenTower + 1}</span>
                        ) : (
                          <span className="text-2xl">❓</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-2">How many?</p>
                    </div>
                  </div>

                  {!showHiddenAnswer ? (
                    <div className="flex justify-center gap-3">
                      {[hiddenTower, hiddenTower + 1, hiddenTower + 2].map((num) => (
                        <Button
                          key={num}
                          onClick={() => guessHiddenTower(num)}
                          variant="outline"
                          className="text-xl px-6 py-4"
                        >
                          {num}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className={`text-lg font-semibold mb-3 ${selectedGuess === hiddenTower + 1 ? "text-green-600" : "text-orange-600"}`}>
                        {selectedGuess === hiddenTower + 1 
                          ? `✅ Correct! ${hiddenTower} + 1 more = ${hiddenTower + 1}!`
                          : `${hiddenTower} + 1 more = ${hiddenTower + 1}. Let's try again!`}
                      </p>
                      <Button onClick={resetHiddenGuess} variant="outline">
                        Try Another <RotateCcw className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>

                {/* Reflection Questions */}
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 border-2 border-purple-200">
                    <h3 className="font-semibold text-purple-700 mb-2">
                      🗣️ Discussion Questions:
                    </h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500">•</span>
                        <span>Tell your friend how you built your tower.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500">•</span>
                        <span>How did your tower change each time you put one more block on top?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500">•</span>
                        <span>When we put one more block, did you have to start counting again from 1?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500">•</span>
                        <span>What is another way you can tell how many there are without counting from 1?</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-amber-50 rounded-lg p-4 border-2 border-amber-200">
                    <h3 className="font-semibold text-amber-700 mb-2">
                      🏠 Center Connection:
                    </h3>
                    <p className="text-amber-700">
                      Try building towers with blocks at home or in the block center! 
                      You can also build a road - add 1 more block each time and count!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Back Button */}
            <div className="mt-6 text-center">
              <Button
                onClick={() => navigate("/activities")}
                size="lg"
                className="bg-amber-500 hover:bg-amber-600"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Activities
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CountingMatching30;

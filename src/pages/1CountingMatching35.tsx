// src/pages/CountingMatching35.tsx
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Star, BookOpen, Users, Lightbulb, RefreshCw, Home, Hand } from "lucide-react";
import { toast } from "sonner";

// Crab colors
const CRAB_COLORS = [
  "bg-[hsl(15,85%,55%)]",   // orange-red
  "bg-[hsl(4,80%,50%)]",    // red
  "bg-[hsl(25,90%,50%)]",   // orange
  "bg-[hsl(340,75%,55%)]",  // pink-red
  "bg-[hsl(10,85%,45%)]",   // dark red
];

const CountingMatching35 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [currentStep, setCurrentStep] = useState<'fingerCounting' | 'farmerBrown' | 'crabColoring' | 'fiveCrabs' | 'fingerPractice' | 'complete'>('fingerCounting');
  
  // Finger Counting (Bears waking up)
  const [bearsAwake, setBearsAwake] = useState(0);
  
  // Farmer Brown Song (starting from 4)
  const [applesOnTree, setApplesOnTree] = useState(4);
  const [songVerse, setSongVerse] = useState(0);
  
  // Crab Coloring
  const [coloredCrabs, setColoredCrabs] = useState<boolean[]>([false, false, false, false, false]);
  const [coloringComplete, setColoringComplete] = useState(false);
  
  // Five Little Crabs Rhyme
  const [crabsOnShore, setCrabsOnShore] = useState(5);
  const [rhymeVerse, setRhymeVerse] = useState(0);
  
  // Finger Practice (counting down)
  const [fingersUp, setFingersUp] = useState(5);

  const handleWakeBear = () => {
    if (bearsAwake < 5) {
      setBearsAwake(bearsAwake + 1);
      
      if (bearsAwake === 4) {
        toast.success("All 5 bears are awake! Great counting! 🐻");
        setTimeout(() => {
          setCurrentStep('farmerBrown');
        }, 1500);
      }
    }
  };

  const handleAppleSongStep = () => {
    if (songVerse < 4) {
      if (applesOnTree > 0) {
        setApplesOnTree(applesOnTree - 1);
      }
      setSongVerse(songVerse + 1);
      
      if (songVerse === 3) {
        toast.success("Great singing! No more apples! 🎵");
        setTimeout(() => {
          setCurrentStep('crabColoring');
        }, 1500);
      }
    }
  };

  const handleColorCrab = (index: number) => {
    const coloredCount = coloredCrabs.filter(c => c).length;
    
    if (coloredCount < 4 && !coloredCrabs[index]) {
      const newColored = [...coloredCrabs];
      newColored[index] = true;
      setColoredCrabs(newColored);
      
      const newCount = newColored.filter(c => c).length;
      if (newCount === 4) {
        toast.success("You colored 4 crabs! That's 1 less than 5! 🦀");
        setColoringComplete(true);
        setTimeout(() => {
          setCurrentStep('fiveCrabs');
        }, 2000);
      }
    }
  };

  const handleCrabRhymeStep = () => {
    if (rhymeVerse < 5) {
      if (crabsOnShore > 0) {
        setCrabsOnShore(crabsOnShore - 1);
      }
      setRhymeVerse(rhymeVerse + 1);
      
      if (rhymeVerse === 4) {
        toast.success("All crabs went home! 🌊");
        setTimeout(() => {
          setCurrentStep('fingerPractice');
        }, 1500);
      }
    }
  };

  const handleFingerDown = () => {
    if (fingersUp > 0) {
      setFingersUp(fingersUp - 1);
      
      if (fingersUp === 1) {
        toast.success("You counted down from 5 to 0! Amazing! 🖐️");
        setTimeout(() => {
          setCurrentStep('complete');
        }, 1500);
      }
    }
  };

  const resetActivity = () => {
    setCurrentStep('fingerCounting');
    setBearsAwake(0);
    setApplesOnTree(4);
    setSongVerse(0);
    setColoredCrabs([false, false, false, false, false]);
    setColoringComplete(false);
    setCrabsOnShore(5);
    setRhymeVerse(0);
    setFingersUp(5);
  };

  // Render hand with fingers
  const renderHand = (fingersShowing: number, isLeft = true) => {
    const fingerNames = ['Pinky', 'Ring', 'Middle', 'Index', 'Thumb'];
    return (
      <div className="relative flex flex-col items-center">
        <div className="flex gap-1 items-end justify-center">
          {[0, 1, 2, 3, 4].map((idx) => {
            const isUp = idx < fingersShowing;
            const heights = ['h-12', 'h-16', 'h-20', 'h-16', 'h-10'];
            return (
              <div
                key={idx}
                className={`w-6 ${heights[idx]} rounded-t-full transition-all duration-300 ${
                  isUp 
                    ? 'bg-[hsl(35,65%,70%)] border-2 border-[hsl(35,65%,55%)]' 
                    : 'bg-muted h-4 rounded-full'
                }`}
                title={fingerNames[idx]}
              />
            );
          })}
        </div>
        <div className="w-28 h-12 bg-[hsl(35,65%,70%)] rounded-b-2xl border-2 border-t-0 border-[hsl(35,65%,55%)]" />
      </div>
    );
  };

  // Render apple tree
  const renderAppleTree = () => (
    <div className="relative w-48 h-56 mx-auto">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-20 bg-[hsl(30,50%,35%)] rounded-md" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-[hsl(142,60%,40%)] rounded-full" />
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-3 flex-wrap justify-center w-36">
        {Array.from({ length: applesOnTree }).map((_, i) => (
          <div
            key={i}
            className="w-10 h-10 bg-[hsl(142,70%,45%)] rounded-full shadow-lg border-2 border-[hsl(142,70%,35%)] animate-bounce-in"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );

  // Render crab
  const renderCrab = (index: number, isColored: boolean, onClick?: () => void, size = "large") => {
    const sizeClasses = size === "large" ? "w-16 h-12" : "w-12 h-9";
    const clawSize = size === "large" ? "w-4 h-4" : "w-3 h-3";
    const legSize = size === "large" ? "w-1 h-4" : "w-1 h-3";
    
    return (
      <button
        key={index}
        onClick={onClick}
        disabled={!onClick}
        className={`relative ${sizeClasses} transition-all duration-300 ${onClick ? 'cursor-pointer hover:scale-110' : ''}`}
      >
        {/* Body */}
        <div className={`absolute inset-0 ${isColored ? CRAB_COLORS[index] : 'bg-muted'} rounded-full border-2 ${isColored ? 'border-[hsl(4,80%,40%)]' : 'border-muted-foreground/30'} transition-colors`}>
          {/* Eyes */}
          <div className="absolute top-1 left-1/4 w-2 h-2 bg-black rounded-full" />
          <div className="absolute top-1 right-1/4 w-2 h-2 bg-black rounded-full" />
        </div>
        {/* Claws */}
        <div className={`absolute -left-3 top-2 ${clawSize} ${isColored ? 'bg-[hsl(4,80%,45%)]' : 'bg-muted-foreground/50'} rounded-full rotate-45`} />
        <div className={`absolute -right-3 top-2 ${clawSize} ${isColored ? 'bg-[hsl(4,80%,45%)]' : 'bg-muted-foreground/50'} rounded-full -rotate-45`} />
        {/* Legs */}
        {[-2, -1, 1, 2].map((offset, i) => (
          <div
            key={i}
            className={`absolute bottom-0 ${legSize} ${isColored ? 'bg-[hsl(4,80%,45%)]' : 'bg-muted-foreground/50'} rounded-full`}
            style={{ left: `calc(50% + ${offset * 8}px)`, transform: `rotate(${offset * 10}deg)` }}
          />
        ))}
      </button>
    );
  };

  // Render shore scene
  const renderShoreScene = () => (
    <div className="relative w-full h-64 overflow-hidden rounded-xl">
      {/* Sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(200,80%,75%)] to-[hsl(200,70%,85%)]" />
      {/* Water */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-[hsl(200,70%,55%)] to-[hsl(210,80%,45%)]">
        {/* Waves */}
        <div className="absolute top-0 left-0 right-0 h-4 bg-[hsl(200,70%,65%)] opacity-50" 
          style={{ borderRadius: '50% 50% 0 0' }} />
        {/* Crabs in water */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-4 justify-center">
          {Array.from({ length: 5 - crabsOnShore }).map((_, i) => (
            <div key={i} className="opacity-70 scale-75">
              {renderCrab(i, true, undefined, "small")}
            </div>
          ))}
        </div>
      </div>
      {/* Sand/Shore */}
      <div className="absolute bottom-20 left-0 right-0 h-24 bg-gradient-to-b from-[hsl(45,70%,75%)] to-[hsl(40,60%,65%)]">
        {/* Crabs on shore */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-6 justify-center">
          {Array.from({ length: crabsOnShore }).map((_, i) => (
            <div key={i} className="animate-bounce-in" style={{ animationDelay: `${i * 0.1}s` }}>
              {renderCrab(i, true, undefined, "large")}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Get rhyme text
  const getRhymeText = () => {
    const verses = [
      { count: 5, text: "5 little crabs, wiggling on the shore,\nSwoosh went the waves, and then there were 4." },
      { count: 4, text: "4 little crabs, happy as can be,\nSwoosh went the waves, and then there were 3." },
      { count: 3, text: "3 little crabs, their legs turning blue,\nSwoosh went the waves, and then there were 2." },
      { count: 2, text: "2 little crabs, having lots of fun,\nSwoosh went the waves, and then there was 1." },
      { count: 1, text: "1 little crab, looking all alone,\nSwoosh went the waves, and carried him home." },
    ];
    return rhymeVerse < 5 ? verses[rhymeVerse] : null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                Lesson 35
              </span>
              <h1 className="text-2xl font-bold text-foreground">Five Little Crabs</h1>
            </div>
            <p className="text-sm text-muted-foreground">Topic F: Counting Down with Fingers</p>
          </div>
        </div>

        {!showGame ? (
          <div className="space-y-6">
            {/* Learning Objective */}
            <Card className="border-2 border-primary/30 bg-card shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl text-primary">
                  <Star className="w-6 h-6" />
                  Learning Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-card-foreground">
                  Today, your child will count <span className="font-bold text-primary">5, 4, 3, 2, 1</span> using a story about crabs and their left hand fingers, reinforcing counting down patterns.
                </p>
              </CardContent>
            </Card>

            {/* Introduction */}
            <Card className="bg-card shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-card-foreground">Five Little Crabs</CardTitle>
                <CardDescription>Read this together with your child</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-6 rounded-xl border-2 border-border">
                  <p className="text-lg text-card-foreground mb-4">
                    Today we'll use our fingers like crabs to count DOWN from 5 to 1! We'll wake up bears, sing about apples, and play with crabs on the beach!
                  </p>
                  <div className="grid md:grid-cols-4 gap-4 mb-4">
                    <div className="bg-card p-4 rounded-lg border-2 border-amber-500/30 text-center">
                      <div className="text-4xl mb-2">🐻</div>
                      <p className="font-bold text-amber-600">Wake Bears</p>
                      <p className="text-sm text-muted-foreground">Count to 5</p>
                    </div>
                    <div className="bg-card p-4 rounded-lg border-2 border-green-500/30 text-center">
                      <div className="text-4xl mb-2">🍎</div>
                      <p className="font-bold text-green-600">Apple Song</p>
                      <p className="text-sm text-muted-foreground">Count from 4</p>
                    </div>
                    <div className="bg-card p-4 rounded-lg border-2 border-orange-500/30 text-center">
                      <div className="text-4xl mb-2">🦀</div>
                      <p className="font-bold text-orange-600">Color Crabs</p>
                      <p className="text-sm text-muted-foreground">Color 4 of 5</p>
                    </div>
                    <div className="bg-card p-4 rounded-lg border-2 border-blue-500/30 text-center">
                      <div className="text-4xl mb-2">🌊</div>
                      <p className="font-bold text-blue-600">Crab Rhyme</p>
                      <p className="text-sm text-muted-foreground">5 to 0!</p>
                    </div>
                  </div>
                  
                  {/* Visual demonstration of finger counting */}
                  <div className="flex items-center justify-center gap-8 py-6 bg-card/50 rounded-lg">
                    <div className="text-center">
                      <Hand className="w-16 h-16 mx-auto text-primary mb-2" />
                      <p className="text-sm font-medium text-foreground">Count with fingers!</p>
                      <p className="text-xs text-muted-foreground">5, 4, 3, 2, 1</p>
                    </div>
                  </div>
                </div>

                {/* Parent Tips */}
                <div className="bg-secondary/20 p-4 rounded-lg border-2 border-secondary/40">
                  <h4 className="font-bold text-card-foreground mb-2 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-secondary" />
                    Parent Tips
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Place a sticker on your child's left pinky to mark the starting point</li>
                    <li>• Practice the "Math Way" of counting (left pinky to right pinky)</li>
                    <li>• Sing the rhyme together and act it out with fingers</li>
                  </ul>
                </div>

                {/* Teacher Guide */}
                <Card className="bg-primary/5 border-primary/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Activity Guide
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <div className="flex items-start gap-2">
                      <Users className="w-4 h-4 mt-1 text-amber-600" />
                      <div>
                        <strong>Finger Counting (3 min):</strong> Bears waking up story, count to 5 with fingers.
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Users className="w-4 h-4 mt-1 text-green-600" />
                      <div>
                        <strong>Farmer Brown (3 min):</strong> Apple song starting from 4.
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Users className="w-4 h-4 mt-1 text-orange-600" />
                      <div>
                        <strong>Crab Coloring (4 min):</strong> Color 4 of 5 crabs.
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Users className="w-4 h-4 mt-1 text-blue-600" />
                      <div>
                        <strong>Five Little Crabs (12 min):</strong> Act out rhyme, count down with fingers.
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            <Button 
              onClick={() => setShowGame(true)} 
              size="lg" 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-xl py-6 shadow-lg"
            >
              Start Activity 🦀
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Progress indicator */}
            <div className="flex justify-center gap-2 mb-4">
              {['fingerCounting', 'farmerBrown', 'crabColoring', 'fiveCrabs', 'fingerPractice', 'complete'].map((step, idx) => (
                <div
                  key={step}
                  className={`w-3 h-3 rounded-full transition-all ${
                    ['fingerCounting', 'farmerBrown', 'crabColoring', 'fiveCrabs', 'fingerPractice', 'complete'].indexOf(currentStep) >= idx
                      ? 'bg-primary scale-110'
                      : 'bg-muted'
                  }`}
                />
              ))}
            </div>

            {/* Finger Counting - Bears Waking Up */}
            {currentStep === 'fingerCounting' && (
              <Card className="bg-gradient-to-b from-amber-50 to-orange-50 shadow-xl border-2 border-amber-500/30">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-amber-700">🐻 Bears Waking Up!</CardTitle>
                  <CardDescription>Wake up the bears one by one - count with your fingers!</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                  <div className="bg-card rounded-xl p-6 shadow-md max-w-lg mx-auto">
                    <p className="text-lg text-card-foreground mb-4">
                      {bearsAwake === 0 && "It's spring! The bears are sleeping in their dens. 🏔️"}
                      {bearsAwake === 1 && "1 bear woke up and came out! 🐻"}
                      {bearsAwake === 2 && "Another bear woke up! 1, 2 bears are out! 🐻🐻"}
                      {bearsAwake === 3 && "One more! 1, 2, 3 bears are awake! 🐻🐻🐻"}
                      {bearsAwake === 4 && "Almost there! 1, 2, 3, 4 bears out! 🐻🐻🐻🐻"}
                      {bearsAwake === 5 && "All 5 bears are awake! Great counting! 🐻🐻🐻🐻🐻"}
                    </p>
                  </div>

                  {/* Bears display */}
                  <div className="flex justify-center gap-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`text-5xl transition-all duration-500 ${
                          i < bearsAwake 
                            ? 'scale-100 opacity-100' 
                            : 'scale-75 opacity-30 grayscale'
                        }`}
                      >
                        🐻
                      </div>
                    ))}
                  </div>

                  {/* Hand visualization */}
                  <div className="flex justify-center">
                    {renderHand(bearsAwake)}
                  </div>
                  <p className="text-lg font-bold text-amber-700">{bearsAwake} finger{bearsAwake !== 1 ? 's' : ''} up!</p>

                  <Button 
                    onClick={handleWakeBear} 
                    size="lg" 
                    disabled={bearsAwake >= 5}
                    className="bg-amber-500 hover:bg-amber-600 text-white px-12"
                  >
                    Wake Another Bear! 🐻
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Farmer Brown Song (from 4) */}
            {currentStep === 'farmerBrown' && (
              <Card className="bg-gradient-to-b from-green-50 to-emerald-50 shadow-xl border-2 border-green-500/30">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-green-700">🍎 Farmer Brown's Apple Tree</CardTitle>
                  <CardDescription>Sing along! Start from 4 green apples!</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                  {renderAppleTree()}
                  
                  <div className="bg-card rounded-xl p-6 shadow-md max-w-md mx-auto">
                    <p className="text-lg text-card-foreground italic whitespace-pre-line">
                      {songVerse === 0 && `"Farmer Brown had ${applesOnTree} green apples hanging on the tree..."`}
                      {songVerse === 1 && `"Then he took 1 apple and ate it greedily,\nleaving ${applesOnTree} green apples hanging on the tree."`}
                      {songVerse === 2 && `"Farmer Brown had ${applesOnTree} green apples...\nThen he took 1, leaving ${applesOnTree - 1} on the tree."`}
                      {songVerse === 3 && `"Farmer Brown had ${applesOnTree} green apple...\nThen he took 1, leaving no green apples on the tree!"`}
                      {songVerse >= 4 && "🎵 Great singing! All the apples are gone! 🎵"}
                    </p>
                  </div>

                  <div className="text-4xl font-bold text-green-700">
                    {applesOnTree} apple{applesOnTree !== 1 ? 's' : ''} left
                  </div>

                  <Button 
                    onClick={handleAppleSongStep} 
                    size="lg" 
                    disabled={songVerse >= 4}
                    className="bg-green-500 hover:bg-green-600 text-white px-12"
                  >
                    {songVerse === 0 ? "Start Singing! 🎵" : "Take an Apple! 🍎"}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Crab Coloring */}
            {currentStep === 'crabColoring' && (
              <Card className="bg-gradient-to-b from-orange-50 to-amber-50 shadow-xl border-2 border-orange-500/30">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-orange-700">🦀 Color the Crabs!</CardTitle>
                  <CardDescription>5 little crabs are swimming. 4 want to swim to shore. Color 4 crabs!</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                  <div className="bg-gradient-to-b from-blue-100 to-blue-200 rounded-xl p-8">
                    <div className="flex justify-center gap-6 flex-wrap">
                      {coloredCrabs.map((isColored, index) => (
                        <div key={index} className="transform hover:scale-105 transition-transform">
                          {renderCrab(index, isColored, coloringComplete ? undefined : () => handleColorCrab(index))}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-card rounded-xl p-4 shadow-md">
                    <p className="text-2xl font-bold text-orange-700">
                      {coloredCrabs.filter(c => c).length} of 5 crabs colored
                    </p>
                    <p className="text-muted-foreground">
                      {coloringComplete 
                        ? "4 is 1 less than 5! 🎉" 
                        : `Color ${4 - coloredCrabs.filter(c => c).length} more crabs!`}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Five Little Crabs Rhyme */}
            {currentStep === 'fiveCrabs' && (
              <Card className="bg-gradient-to-b from-blue-50 to-cyan-50 shadow-xl border-2 border-blue-500/30">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-blue-700">🌊 Five Little Crabs</CardTitle>
                  <CardDescription>Say the rhyme and watch the crabs go home!</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                  {renderShoreScene()}
                  
                  <div className="bg-card rounded-xl p-6 shadow-md max-w-lg mx-auto">
                    {getRhymeText() ? (
                      <p className="text-lg text-card-foreground whitespace-pre-line font-medium">
                        {getRhymeText()?.text}
                      </p>
                    ) : (
                      <p className="text-lg text-card-foreground">
                        🌊 All the crabs went home! Great counting! 🦀
                      </p>
                    )}
                  </div>

                  <div className="flex justify-center gap-4 items-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-amber-600">{crabsOnShore}</div>
                      <p className="text-sm text-muted-foreground">on shore</p>
                    </div>
                    <div className="text-2xl">➜</div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-600">{5 - crabsOnShore}</div>
                      <p className="text-sm text-muted-foreground">in water</p>
                    </div>
                  </div>

                  <Button 
                    onClick={handleCrabRhymeStep} 
                    size="lg" 
                    disabled={rhymeVerse >= 5}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-12"
                  >
                    {rhymeVerse === 0 ? "Start the Rhyme! 🌊" : "Swoosh! Next Wave! 🌊"}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Finger Practice - Counting Down */}
            {currentStep === 'fingerPractice' && (
              <Card className="bg-gradient-to-b from-purple-50 to-pink-50 shadow-xl border-2 border-purple-500/30">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-purple-700">🖐️ Finger Countdown!</CardTitle>
                  <CardDescription>Your fingers are crabs! Count down from 5 to 0!</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                  <div className="bg-card rounded-xl p-6 shadow-md">
                    <p className="text-lg text-card-foreground mb-4">
                      Start with 5 fingers up (all your crabs on shore).
                      <br />
                      Fold one finger down as each crab swims away!
                    </p>
                  </div>

                  {/* Large hand display */}
                  <div className="flex justify-center transform scale-125">
                    {renderHand(fingersUp)}
                  </div>

                  <div className="text-5xl font-bold text-purple-700">
                    {fingersUp}
                  </div>
                  <p className="text-lg text-muted-foreground">
                    {fingersUp === 5 && "5 fingers up - ready to count down!"}
                    {fingersUp === 4 && "4 fingers! 1 less than 5!"}
                    {fingersUp === 3 && "3 fingers! Keep going!"}
                    {fingersUp === 2 && "2 fingers! Almost there!"}
                    {fingersUp === 1 && "1 finger! One more!"}
                    {fingersUp === 0 && "0 fingers! All crabs are home! 🎉"}
                  </p>

                  <Button 
                    onClick={handleFingerDown} 
                    size="lg" 
                    disabled={fingersUp <= 0}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-12"
                  >
                    Fold Down 1 Finger! 👇
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Complete */}
            {currentStep === 'complete' && (
              <Card className="bg-gradient-to-b from-yellow-50 to-amber-50 shadow-xl border-2 border-yellow-500/30">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl text-yellow-700">🌟 Amazing Job! 🌟</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                  <div className="text-6xl mb-4">🦀🖐️🌊</div>
                  
                  <div className="bg-card rounded-xl p-6 shadow-md max-w-lg mx-auto">
                    <h3 className="text-xl font-bold text-card-foreground mb-4">Reflection Questions:</h3>
                    <ul className="text-left space-y-3 text-card-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-500">★</span>
                        How did you count in the "Five Little Crabs" rhyme?
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-500">★</span>
                        What is different about counting up (1 to 5) and counting back (5 to 1)?
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-500">★</span>
                        You colored 4 crabs. Is that 1 more or 1 less than 5?
                      </li>
                    </ul>
                  </div>

                  <div className="flex gap-4 justify-center flex-wrap">
                    <Button 
                      onClick={resetActivity}
                      variant="outline"
                      size="lg"
                      className="gap-2"
                    >
                      <RefreshCw className="w-5 h-5" />
                      Play Again
                    </Button>
                    <Button 
                      onClick={() => navigate("/")}
                      size="lg"
                      className="gap-2 bg-primary hover:bg-primary/90"
                    >
                      <Home className="w-5 h-5" />
                      Back to Lessons
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CountingMatching35;
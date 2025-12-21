// src/pages/CountingMatching33.tsx
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Star, BookOpen, Users, Lightbulb, CheckCircle2, RefreshCw, ArrowDown, Home } from "lucide-react";
import { toast } from "sonner";

// Cube colors matching the design system
const CUBE_COLORS = [
  "bg-[hsl(280,70%,50%)]", // 5 - purple
  "bg-[hsl(207,90%,54%)]", // 4 - blue
  "bg-[hsl(142,76%,45%)]", // 3 - green
  "bg-[hsl(45,93%,58%)]",  // 2 - yellow
  "bg-[hsl(4,90%,58%)]",   // 1 - red/orange
];

const CUBE_BORDERS = [
  "border-[hsl(280,70%,40%)]",
  "border-[hsl(207,90%,44%)]",
  "border-[hsl(142,76%,35%)]",
  "border-[hsl(45,93%,48%)]",
  "border-[hsl(4,90%,48%)]",
];

interface CubeTower {
  count: number;
  color: string;
  border: string;
  placed: boolean;
}

const CountingMatching33 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [currentStep, setCurrentStep] = useState<'warmup' | 'snowball' | 'buildStairs' | 'practiceStairs' | 'complete'>('warmup');
  
  // Warmup: 1 More Chant
  const [chantStep, setChantStep] = useState(0);
  const [isSideA, setIsSideA] = useState(true);
  
  // Snowball Toss
  const [snowballsThrown, setSnowballsThrown] = useState(0);
  const [snowballsRemaining, setSnowballsRemaining] = useState(3);
  const [snowballRound, setSnowballRound] = useState(1);
  
  // Build Stairs
  const [demonstrationStep, setDemonstrationStep] = useState(0);
  const [showFriend, setShowFriend] = useState(true);
  
  // Practice Stairs - student builds descending stairs
  const [towers, setTowers] = useState<CubeTower[]>([
    { count: 5, color: CUBE_COLORS[0], border: CUBE_BORDERS[0], placed: false },
    { count: 4, color: CUBE_COLORS[1], border: CUBE_BORDERS[1], placed: false },
    { count: 3, color: CUBE_COLORS[2], border: CUBE_BORDERS[2], placed: false },
    { count: 2, color: CUBE_COLORS[3], border: CUBE_BORDERS[3], placed: false },
    { count: 1, color: CUBE_COLORS[4], border: CUBE_BORDERS[4], placed: false },
  ]);
  const [currentTowerIndex, setCurrentTowerIndex] = useState(0);
  const [friendPosition, setFriendPosition] = useState(0);

  // Chant data
  const chantSequence = [
    { sideA: "1", sideB: "1 more is..." },
    { sideA: "2", sideB: "1 more is..." },
    { sideA: "3", sideB: "1 more is..." },
    { sideA: "4", sideB: "1 more is..." },
    { sideA: "5!", sideB: "Great job! 🎉" },
  ];

  const handleChantStep = () => {
    if (isSideA) {
      setIsSideA(false);
    } else {
      if (chantStep < chantSequence.length - 1) {
        setChantStep(chantStep + 1);
        setIsSideA(true);
      } else {
        toast.success("Excellent counting! 🎉", { description: "Now let's play Snowball Toss!" });
        setCurrentStep('snowball');
      }
    }
  };

  const handleThrowSnowball = () => {
    if (snowballsRemaining > 0) {
      setSnowballsThrown(snowballsThrown + 1);
      setSnowballsRemaining(snowballsRemaining - 1);
      
      if (snowballsRemaining === 1) {
        toast.success(`All snowballs thrown! Round ${snowballRound} complete! ❄️`);
        if (snowballRound < 2) {
          setTimeout(() => {
            setSnowballRound(2);
            setSnowballsThrown(0);
            setSnowballsRemaining(3);
          }, 1500);
        } else {
          setTimeout(() => {
            setCurrentStep('buildStairs');
          }, 1500);
        }
      }
    }
  };

  const handleDemonstrationStep = () => {
    if (demonstrationStep < 5) {
      setDemonstrationStep(demonstrationStep + 1);
    } else {
      toast.success("Great! Now it's your turn to build! 🏗️");
      setCurrentStep('practiceStairs');
    }
  };

  const handlePlaceTower = useCallback(() => {
    if (currentTowerIndex < towers.length) {
      const newTowers = [...towers];
      newTowers[currentTowerIndex].placed = true;
      setTowers(newTowers);
      
      const countingDown = 5 - currentTowerIndex;
      toast.success(`${countingDown} cubes placed! ${currentTowerIndex < 4 ? "1 less is " + (countingDown - 1) + "!" : "Perfect stairs!"}`, {
        description: currentTowerIndex < 4 ? "Keep building!" : "Your friend can climb down now! 🎉"
      });
      
      if (currentTowerIndex < towers.length - 1) {
        setCurrentTowerIndex(currentTowerIndex + 1);
      } else {
        setTimeout(() => {
          animateFriendWalking();
        }, 1000);
      }
    }
  }, [currentTowerIndex, towers]);

  const animateFriendWalking = () => {
    let position = 0;
    const walkInterval = setInterval(() => {
      position++;
      setFriendPosition(position);
      if (position >= 5) {
        clearInterval(walkInterval);
        toast.success("Your friend made it home! 🏠", { description: "Excellent work building descending stairs!" });
        setTimeout(() => setCurrentStep('complete'), 1500);
      }
    }, 800);
  };

  const resetPractice = () => {
    setTowers([
      { count: 5, color: CUBE_COLORS[0], border: CUBE_BORDERS[0], placed: false },
      { count: 4, color: CUBE_COLORS[1], border: CUBE_BORDERS[1], placed: false },
      { count: 3, color: CUBE_COLORS[2], border: CUBE_BORDERS[2], placed: false },
      { count: 2, color: CUBE_COLORS[3], border: CUBE_BORDERS[3], placed: false },
      { count: 1, color: CUBE_COLORS[4], border: CUBE_BORDERS[4], placed: false },
    ]);
    setCurrentTowerIndex(0);
    setFriendPosition(0);
  };

  // Render cube tower
  const renderTower = (count: number, colorClass: string, borderClass: string, animate = false, small = false) => {
    const size = small ? "w-6 h-6" : "w-10 h-10";
    return (
      <div className="flex flex-col-reverse items-center">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={`${size} ${colorClass} ${borderClass} border-2 rounded-md shadow-md ${animate ? 'animate-cube-pop' : ''}`}
            style={{ animationDelay: animate ? `${i * 0.1}s` : undefined }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                Lesson 33
              </span>
              <h1 className="text-2xl font-bold text-foreground">Descending Number Stairs</h1>
            </div>
            <p className="text-sm text-muted-foreground">Topic F: Numbers 1-5</p>
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
                  Today, your child will learn to <span className="font-bold text-primary">build descending number stairs</span> at the concrete and pictorial levels, understanding the pattern of "1 less."
                </p>
              </CardContent>
            </Card>

            {/* Introduction */}
            <Card className="bg-card shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-card-foreground">Going Down the Stairs</CardTitle>
                <CardDescription>Read this together with your child</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-6 rounded-xl border-2 border-border">
                  <p className="text-lg text-card-foreground mb-4">
                    Today we'll help our friend climb DOWN from her classroom! We'll build stairs using cubes, starting with 5 and going down to 1.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-card p-4 rounded-lg border-2 border-primary/30 text-center">
                      <div className="text-4xl mb-2">🏫</div>
                      <p className="font-bold text-primary">Start at 5</p>
                      <p className="text-sm text-muted-foreground">Build a tall tower</p>
                    </div>
                    <div className="bg-card p-4 rounded-lg border-2 border-info/30 text-center">
                      <div className="text-4xl mb-2">📉</div>
                      <p className="font-bold text-info">1 Less Each Time</p>
                      <p className="text-sm text-muted-foreground">Take away 1 cube</p>
                    </div>
                    <div className="bg-card p-4 rounded-lg border-2 border-success/30 text-center">
                      <div className="text-4xl mb-2">🏠</div>
                      <p className="font-bold text-success">Reach Home!</p>
                      <p className="text-sm text-muted-foreground">Count: 5, 4, 3, 2, 1</p>
                    </div>
                  </div>
                  
                  {/* Visual demonstration of descending stairs */}
                  <div className="flex items-end justify-center gap-2 py-6 bg-card/50 rounded-lg">
                    {[5, 4, 3, 2, 1].map((count, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-1">
                        {renderTower(count, CUBE_COLORS[idx], CUBE_BORDERS[idx], false, true)}
                        <span className="text-sm font-bold text-foreground mt-1">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Parent Tips */}
                <div className="bg-secondary/20 p-4 rounded-lg border-2 border-secondary/40">
                  <h4 className="font-bold text-card-foreground mb-2 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-secondary" />
                    Parent Tips
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Encourage your child to say "1 less" as they build each shorter tower</li>
                    <li>• Use real blocks or LEGO bricks to practice at home</li>
                    <li>• Practice on real stairs, counting down: 5, 4, 3, 2, 1!</li>
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
                      <Users className="w-4 h-4 mt-1 text-primary" />
                      <div>
                        <strong>1 More Chant (3 min):</strong> Practice counting up with the call-and-response chant.
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Users className="w-4 h-4 mt-1 text-info" />
                      <div>
                        <strong>Snowball Toss (3 min):</strong> Throw snowballs and count how many thrown vs. remaining.
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Users className="w-4 h-4 mt-1 text-success" />
                      <div>
                        <strong>Build Stairs (13 min):</strong> Build descending stairs from 5 to 1, learning "1 less."
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
              Start Activity 🎮
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Progress indicator */}
            <div className="flex justify-center gap-2 mb-4">
              {['warmup', 'snowball', 'buildStairs', 'practiceStairs', 'complete'].map((step, idx) => (
                <div
                  key={step}
                  className={`w-3 h-3 rounded-full transition-all ${
                    ['warmup', 'snowball', 'buildStairs', 'practiceStairs', 'complete'].indexOf(currentStep) >= idx
                      ? 'bg-primary scale-110'
                      : 'bg-muted'
                  }`}
                />
              ))}
            </div>

            {/* Warmup: 1 More Chant */}
            {currentStep === 'warmup' && (
              <Card className="bg-card shadow-xl border-2 border-primary/30">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-primary">🎵 1 More Chant</CardTitle>
                  <CardDescription>Practice counting up together!</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                  <div className="bg-muted rounded-2xl p-8">
                    <div className="text-6xl font-bold mb-4 animate-bounce-in text-foreground" key={`${chantStep}-${isSideA}`}>
                      {isSideA ? chantSequence[chantStep].sideA : chantSequence[chantStep].sideB}
                    </div>
                    <p className="text-lg text-muted-foreground">
                      {isSideA ? "Side A says the number" : "Side B responds"}
                    </p>
                  </div>
                  
                  <div className="flex justify-center gap-4">
                    <div className={`px-6 py-3 rounded-xl font-bold transition-all ${isSideA ? 'bg-primary text-primary-foreground scale-110' : 'bg-muted text-muted-foreground'}`}>
                      Side A
                    </div>
                    <div className={`px-6 py-3 rounded-xl font-bold transition-all ${!isSideA ? 'bg-info text-primary-foreground scale-110' : 'bg-muted text-muted-foreground'}`}>
                      Side B
                    </div>
                  </div>

                  <Button onClick={handleChantStep} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-12">
                    {isSideA ? "Say It!" : "Response!"} →
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Snowball Toss */}
            {currentStep === 'snowball' && (
              <Card className="bg-gradient-to-b from-blue-50 to-cyan-50 shadow-xl border-2 border-info/30">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-info">❄️ Snowball Toss - Round {snowballRound}</CardTitle>
                  <CardDescription>Throw your snowballs and count!</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                  <div className="flex justify-center gap-8">
                    <div className="bg-card rounded-xl p-6 shadow-md">
                      <p className="text-sm text-muted-foreground mb-2">Thrown</p>
                      <div className="text-5xl font-bold text-primary">{snowballsThrown}</div>
                    </div>
                    <div className="bg-card rounded-xl p-6 shadow-md">
                      <p className="text-sm text-muted-foreground mb-2">Remaining</p>
                      <div className="text-5xl font-bold text-info">{snowballsRemaining}</div>
                    </div>
                  </div>

                  <div className="flex justify-center gap-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-16 h-16 rounded-full transition-all duration-300 ${
                          i < snowballsRemaining
                            ? 'bg-gradient-to-br from-white to-blue-100 shadow-lg border-2 border-blue-200 scale-100'
                            : 'bg-muted scale-75 opacity-50'
                        }`}
                      />
                    ))}
                  </div>

                  <Button 
                    onClick={handleThrowSnowball} 
                    size="lg" 
                    disabled={snowballsRemaining === 0}
                    className="bg-info hover:bg-info/90 text-primary-foreground px-12"
                  >
                    Throw Snowball! ❄️
                  </Button>
                  
                  <p className="text-muted-foreground">
                    How many have you thrown? <strong className="text-primary">{snowballsThrown}</strong> | 
                    How many left? <strong className="text-info">{snowballsRemaining}</strong>
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Build Stairs Demonstration */}
            {currentStep === 'buildStairs' && (
              <Card className="bg-card shadow-xl border-2 border-success/30">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-success">🏗️ Build Descending Stairs</CardTitle>
                  <CardDescription>Watch how we build stairs for our friend to go DOWN!</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-muted rounded-2xl p-6">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <div className="text-4xl animate-friend-walk">👧</div>
                      <p className="text-lg text-card-foreground">
                        "I've worked hard at school! Help me build stairs to go home!"
                      </p>
                    </div>

                    {/* Stair visualization */}
                    <div className="flex items-end justify-center gap-3 py-6 min-h-[200px]">
                      {[5, 4, 3, 2, 1].map((count, idx) => (
                        <div 
                          key={idx} 
                          className={`flex flex-col items-center transition-all duration-500 ${idx <= demonstrationStep ? 'opacity-100' : 'opacity-20'}`}
                        >
                          {idx <= demonstrationStep && showFriend && idx === demonstrationStep && (
                            <div className="text-3xl mb-1 animate-friend-walk">👧</div>
                          )}
                          {renderTower(count, CUBE_COLORS[idx], CUBE_BORDERS[idx], idx === demonstrationStep)}
                          <span className="text-lg font-bold text-foreground mt-2">{count}</span>
                          {idx > 0 && idx <= demonstrationStep && (
                            <span className="text-xs text-muted-foreground">1 less!</span>
                          )}
                        </div>
                      ))}
                      {demonstrationStep >= 5 && (
                        <div className="flex flex-col items-center">
                          <div className="text-3xl animate-celebrate">🏠</div>
                          <span className="text-sm text-success font-bold">Home!</span>
                        </div>
                      )}
                    </div>

                    <div className="text-center mt-4">
                      {demonstrationStep < 5 ? (
                        <p className="text-lg text-card-foreground">
                          {demonstrationStep === 0 && "Start with 5 cubes - the tallest tower!"}
                          {demonstrationStep === 1 && "5. 1 less is 4! Take away 1 cube."}
                          {demonstrationStep === 2 && "4. 1 less is 3! Take away 1 more."}
                          {demonstrationStep === 3 && "3. 1 less is 2! Getting shorter!"}
                          {demonstrationStep === 4 && "2. 1 less is 1! Almost there!"}
                        </p>
                      ) : (
                        <p className="text-lg text-success font-bold">
                          🎉 Counting down: 5, 4, 3, 2, 1 - Home!
                        </p>
                      )}
                    </div>
                  </div>

                  <Button 
                    onClick={handleDemonstrationStep} 
                    size="lg" 
                    className="w-full bg-success hover:bg-success/90 text-primary-foreground"
                  >
                    {demonstrationStep < 5 ? `Build Stair ${demonstrationStep + 1} →` : "Now You Try! 🎮"}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Practice Stairs */}
            {currentStep === 'practiceStairs' && (
              <Card className="bg-card shadow-xl border-2 border-primary/30">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-primary">🧱 Your Turn to Build!</CardTitle>
                  <CardDescription>Build descending stairs for your friend</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-muted rounded-2xl p-6">
                    {/* Friend at school */}
                    <div className="flex items-center justify-between mb-4 px-4">
                      <div className="text-center">
                        <div className="text-3xl">🏫</div>
                        <span className="text-xs text-muted-foreground">School</span>
                      </div>
                      <ArrowDown className="w-6 h-6 text-muted-foreground animate-bounce" />
                      <div className="text-center">
                        <div className="text-3xl">🏠</div>
                        <span className="text-xs text-muted-foreground">Home</span>
                      </div>
                    </div>

                    {/* Stair building area */}
                    <div className="flex items-end justify-center gap-3 py-6 min-h-[220px] relative">
                      {towers.map((tower, idx) => (
                        <div 
                          key={idx} 
                          className={`flex flex-col items-center transition-all duration-300 ${tower.placed ? 'opacity-100' : 'opacity-30'}`}
                        >
                          {tower.placed && friendPosition === idx + 1 && (
                            <div className="text-3xl mb-1 animate-friend-walk">👧</div>
                          )}
                          {friendPosition === 0 && idx === 0 && !towers[0].placed && (
                            <div className="text-3xl mb-1 animate-friend-walk">👧</div>
                          )}
                          {friendPosition === 0 && idx === 0 && towers[0].placed && friendPosition < 1 && (
                            <div className="text-3xl mb-1 animate-friend-walk">👧</div>
                          )}
                          {tower.placed ? (
                            renderTower(tower.count, tower.color, tower.border, idx === currentTowerIndex - 1)
                          ) : (
                            <div className={`flex flex-col-reverse items-center`}>
                              {Array.from({ length: tower.count }).map((_, i) => (
                                <div
                                  key={i}
                                  className="w-10 h-10 bg-muted border-2 border-dashed border-muted-foreground/40 rounded-md"
                                />
                              ))}
                            </div>
                          )}
                          <span className={`text-lg font-bold mt-2 ${tower.placed ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {tower.count}
                          </span>
                        </div>
                      ))}
                      {friendPosition >= 5 && (
                        <div className="flex flex-col items-center justify-end">
                          <div className="text-4xl animate-celebrate">👧🏠</div>
                        </div>
                      )}
                    </div>

                    {/* Current instruction */}
                    <div className="text-center bg-card rounded-lg p-4 border-2 border-border">
                      {currentTowerIndex < towers.length ? (
                        <>
                          <p className="text-lg text-card-foreground mb-2">
                            Build a tower with <span className="font-bold text-primary text-2xl">{towers[currentTowerIndex].count}</span> cubes
                          </p>
                          {currentTowerIndex > 0 && (
                            <p className="text-sm text-muted-foreground">
                              {5 - currentTowerIndex + 1}. 1 less is {5 - currentTowerIndex}!
                            </p>
                          )}
                        </>
                      ) : (
                        <p className="text-lg text-success font-bold">
                          All stairs built! Watch your friend go home! 🎉
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      onClick={resetPractice} 
                      variant="outline" 
                      size="lg" 
                      className="flex-1"
                    >
                      <RefreshCw className="w-5 h-5 mr-2" />
                      Start Over
                    </Button>
                    <Button 
                      onClick={handlePlaceTower} 
                      size="lg" 
                      disabled={currentTowerIndex >= towers.length}
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      Place {towers[currentTowerIndex]?.count || 0} Cubes! 🧱
                    </Button>
                  </div>

                  {/* Counting practice */}
                  <div className="text-center">
                    <p className="text-muted-foreground text-sm">
                      Count down as you build: <span className="font-bold">5 → 4 → 3 → 2 → 1</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Complete */}
            {currentStep === 'complete' && (
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 shadow-xl border-2 border-success/40">
                <CardContent className="text-center py-12 space-y-6">
                  <div className="text-7xl animate-celebrate">🎉</div>
                  <h2 className="text-3xl font-bold text-success">Amazing Work!</h2>
                  <p className="text-lg text-card-foreground max-w-md mx-auto">
                    You helped your friend climb down from school by building descending stairs!
                    You learned that each stair has <strong>1 less</strong> cube.
                  </p>
                  
                  {/* Final stairs display */}
                  <div className="flex items-end justify-center gap-2 py-4">
                    {[5, 4, 3, 2, 1].map((count, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        {renderTower(count, CUBE_COLORS[idx], CUBE_BORDERS[idx], false, true)}
                        <span className="text-sm font-bold text-foreground mt-1">{count}</span>
                      </div>
                    ))}
                    <div className="text-2xl">👧🏠</div>
                  </div>

                  {/* Debrief questions */}
                  <div className="bg-card/80 rounded-xl p-6 max-w-lg mx-auto text-left">
                    <h3 className="font-bold text-card-foreground mb-3 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-secondary" />
                      Talk About It:
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• What did we show with our stairs today? <span className="text-primary">(1 less)</span></li>
                      <li>• Where did we start counting? <span className="text-primary">(5)</span></li>
                      <li>• What did we do to make each stair smaller? <span className="text-primary">(Took away 1 cube)</span></li>
                    </ul>
                  </div>

                  <div className="flex gap-4 justify-center">
                    <Button 
                      onClick={() => {
                        resetPractice();
                        setCurrentStep('practiceStairs');
                      }} 
                      variant="outline" 
                      size="lg"
                    >
                      <RefreshCw className="w-5 h-5 mr-2" />
                      Practice Again
                    </Button>
                    <Button 
                      onClick={() => navigate("/")} 
                      size="lg" 
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      <Home className="w-5 h-5 mr-2" />
                      Back Home
                    </Button>
                  </div>

                  <div className="flex justify-center gap-1">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="w-8 h-8 text-secondary fill-secondary" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Back button during game */}
            {currentStep !== 'complete' && (
              <Button 
                variant="ghost" 
                onClick={() => setShowGame(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                ← Back to Instructions
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CountingMatching33;
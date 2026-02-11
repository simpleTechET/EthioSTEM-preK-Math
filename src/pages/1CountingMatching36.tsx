// src/pages/CountingMatching36.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Star, BookOpen, Users, Lightbulb, RefreshCw, Home, Hand } from "lucide-react";
import { toast } from "sonner";

// Fish colors
const FISH_COLORS = [
  "bg-[hsl(200,85%,55%)]",  // blue
  "bg-[hsl(45,90%,55%)]",   // yellow
  "bg-[hsl(280,70%,55%)]",  // purple
  "bg-[hsl(340,80%,55%)]",  // pink
  "bg-[hsl(142,70%,50%)]",  // green
];

const CountingMatching36 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [currentStep, setCurrentStep] = useState<'fingerCounting' | 'farmerBrown' | 'crabDrama' | 'fiveFishies' | 'partnerPlay' | 'complete'>('fingerCounting');
  
  // Finger Counting (Bears waking up with count down challenge)
  const [bearsAwake, setBearsAwake] = useState(0);
  const [countingDown, setCountingDown] = useState(false);
  
  // Farmer Brown Song (starting from 5 this time!)
  const [applesOnTree, setApplesOnTree] = useState(5);
  const [songVerse, setSongVerse] = useState(0);
  
  // Five Little Crabs Drama
  const [studentsAsCrews, setStudentsAsCrabs] = useState(5);
  const [crabDramaStep, setCrabDramaStep] = useState(0);
  
  // Five Little Fishies
  const [fishVisible, setFishVisible] = useState([true, true, true, true, true]);
  const [fishRhymeVerse, setFishRhymeVerse] = useState(0);
  
  // Partner Play
  const [partnerFish, setPartnerFish] = useState([true, true, true, true, true]);
  const [isPartnerA, setIsPartnerA] = useState(true);

  const handleWakeBear = () => {
    if (!countingDown) {
      if (bearsAwake < 5) {
        setBearsAwake(bearsAwake + 1);
        if (bearsAwake === 4) {
          toast.success("All 5 bears are awake! Now let's count DOWN! 🐻");
          setTimeout(() => setCountingDown(true), 1000);
        }
      }
    } else {
      if (bearsAwake > 0) {
        setBearsAwake(bearsAwake - 1);
        if (bearsAwake === 1) {
          toast.success("All bears back in the cave! Great counting! 🐻");
          setTimeout(() => setCurrentStep('farmerBrown'), 1500);
        }
      }
    }
  };

  const handleAppleSongStep = () => {
    if (songVerse < 5) {
      if (applesOnTree > 0) {
        setApplesOnTree(applesOnTree - 1);
      }
      setSongVerse(songVerse + 1);
      
      if (songVerse === 4) {
        toast.success("Great singing from 5! Your voice is strong! 🎵");
        setTimeout(() => setCurrentStep('crabDrama'), 1500);
      }
    }
  };

  const handleCrabDramaStep = () => {
    if (crabDramaStep < 5) {
      if (studentsAsCrews > 0) {
        setStudentsAsCrabs(studentsAsCrews - 1);
      }
      setCrabDramaStep(crabDramaStep + 1);
      
      if (crabDramaStep === 0) {
        toast("1 less than 5 is... 4! 🦀", { duration: 2000 });
      }
      
      if (crabDramaStep === 4) {
        toast.success("All crabs washed away! 1 less than 5 is 4! 🌊");
        setTimeout(() => setCurrentStep('fiveFishies'), 1500);
      }
    }
  };

  const handleFishRhyme = () => {
    if (fishRhymeVerse < 5) {
      const newFish = [...fishVisible];
      newFish[4 - fishRhymeVerse] = false;
      setFishVisible(newFish);
      setFishRhymeVerse(fishRhymeVerse + 1);
      
      if (fishRhymeVerse === 4) {
        toast.success("Mr. Shark caught all the fish! 🦈");
        setTimeout(() => setCurrentStep('partnerPlay'), 1500);
      }
    }
  };

  const handlePartnerHideFish = () => {
    const visibleCount = partnerFish.filter(f => f).length;
    if (visibleCount > 0) {
      const newFish = [...partnerFish];
      const lastVisibleIdx = partnerFish.lastIndexOf(true);
      newFish[lastVisibleIdx] = false;
      setPartnerFish(newFish);
      
      if (visibleCount === 1) {
        if (!isPartnerA) {
          toast.success("Both partners finished! Great teamwork! 🐠🦈");
          setTimeout(() => setCurrentStep('complete'), 1500);
        } else {
          toast.success("Partner A done! Now Partner B's turn!");
          setPartnerFish([true, true, true, true, true]);
          setIsPartnerA(false);
        }
      }
    }
  };

  const resetActivity = () => {
    setCurrentStep('fingerCounting');
    setBearsAwake(0);
    setCountingDown(false);
    setApplesOnTree(5);
    setSongVerse(0);
    setStudentsAsCrabs(5);
    setCrabDramaStep(0);
    setFishVisible([true, true, true, true, true]);
    setFishRhymeVerse(0);
    setPartnerFish([true, true, true, true, true]);
    setIsPartnerA(true);
  };

  // Render hand with fingers
  const renderHand = (fingersShowing: number) => {
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
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-2 flex-wrap justify-center w-36">
        {Array.from({ length: applesOnTree }).map((_, i) => (
          <div
            key={i}
            className="w-8 h-8 bg-[hsl(142,70%,45%)] rounded-full shadow-lg border-2 border-[hsl(142,70%,35%)] animate-bounce-in"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    </div>
  );

  // Render fish
  const renderFish = (index: number, visible: boolean, size = "large") => {
    const sizeClasses = size === "large" ? "w-16 h-10" : "w-12 h-7";
    
    return (
      <div
        key={index}
        className={`relative ${sizeClasses} transition-all duration-500 ${
          visible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
      >
        {/* Body */}
        <div className={`absolute inset-0 ${FISH_COLORS[index]} rounded-full`}>
          {/* Eye */}
          <div className="absolute top-1/3 left-2 w-2 h-2 bg-white rounded-full">
            <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-black rounded-full" />
          </div>
        </div>
        {/* Tail */}
        <div 
          className={`absolute right-0 top-1/2 -translate-y-1/2 w-4 h-6 ${FISH_COLORS[index]} clip-triangle`}
          style={{ clipPath: 'polygon(0 50%, 100% 0, 100% 100%)' }}
        />
      </div>
    );
  };

  // Render underwater scene
  const renderUnderwaterScene = (fish: boolean[], showShark = false) => (
    <div className="relative w-full h-72 overflow-hidden rounded-xl bg-gradient-to-b from-[hsl(200,70%,60%)] to-[hsl(210,80%,35%)]">
      {/* Bubbles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-3 h-3 bg-white/30 rounded-full animate-float"
          style={{
            left: `${10 + i * 12}%`,
            bottom: `${20 + (i % 3) * 20}%`,
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${2 + i * 0.2}s`,
          }}
        />
      ))}
      
      {/* Seaweed */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute bottom-0 w-6 h-24 bg-[hsl(142,60%,35%)] rounded-t-full animate-sway"
          style={{ left: `${15 + i * 35}%`, animationDelay: `${i * 0.5}s` }}
        />
      ))}
      
      {/* Fish */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 flex gap-4 items-center justify-center flex-wrap">
        {fish.map((visible, idx) => renderFish(idx, visible))}
      </div>
      
      {/* Mr. Shark */}
      {showShark && (
        <div className="absolute bottom-4 right-4 text-5xl animate-bounce-in">
          🦈
        </div>
      )}
      
      {/* Sand at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-[hsl(45,50%,65%)]" />
    </div>
  );

  // Render student crabs
  const renderStudentCrabs = () => (
    <div className="flex justify-center gap-4 py-8">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className={`transition-all duration-500 ${
            i < studentsAsCrews ? 'opacity-100 scale-100' : 'opacity-20 scale-75'
          }`}
        >
          <div className="flex flex-col items-center">
            <span className="text-5xl">🧒</span>
            <span className="text-3xl -mt-2">🦀</span>
          </div>
        </div>
      ))}
    </div>
  );

  // Get fish rhyme text
  const getFishRhymeText = () => {
    const count = 5 - fishRhymeVerse;
    const countWords = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five'];
    
    if (fishRhymeVerse >= 5) return null;
    
    return {
      count,
      text: `${countWords[count]} little ${count === 1 ? 'fishy' : 'fishies'} swimming in the sea,
Teasing Mr. Shark, "You can't catch me!"
Along comes Mr. Shark, as quiet as can be...
And SNAPPED one fish right out of the sea!`,
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 p-4">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes sway {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes bounce-in {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-sway { animation: sway 2s ease-in-out infinite; transform-origin: bottom; }
        .animate-bounce-in { animation: bounce-in 0.5s ease-out forwards; }
      `}</style>
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-info bg-info/10 px-3 py-1 rounded-full">
                Lesson 36
              </span>
              <h1 className="text-2xl font-bold text-foreground">Five Little Fishies</h1>
            </div>
            <p className="text-sm text-muted-foreground">Topic H: Counting Down with Mr. Shark</p>
          </div>
        </div>

        {!showGame ? (
          <div className="space-y-6">
            {/* Learning Objective */}
            <Card className="border-2 border-info/30 bg-card shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl text-info">
                  <Star className="w-6 h-6" />
                  Learning Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-card-foreground">
                  Today, your child will count <span className="font-bold text-info">5, 4, 3, 2, 1</span> using a story about fish and Mr. Shark, building fluency with counting down.
                </p>
              </CardContent>
            </Card>

            {/* Introduction */}
            <Card className="bg-card shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-card-foreground">Five Little Fishies 🐠🦈</CardTitle>
                <CardDescription>Read this together with your child</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-6 rounded-xl border-2 border-border">
                  <p className="text-lg text-card-foreground mb-4">
                    Today we'll count down from 5 to 1 with fishies swimming away from Mr. Shark! We'll also practice with bears, apples, and crabs again!
                  </p>
                  <div className="grid md:grid-cols-4 gap-4 mb-4">
                    <div className="bg-card p-4 rounded-lg border-2 border-amber-500/30 text-center">
                      <div className="text-4xl mb-2">🐻</div>
                      <p className="font-bold text-amber-600">Bears Up & Down</p>
                      <p className="text-sm text-muted-foreground">Count to 5, then back!</p>
                    </div>
                    <div className="bg-card p-4 rounded-lg border-2 border-green-500/30 text-center">
                      <div className="text-4xl mb-2">🍎</div>
                      <p className="font-bold text-green-600">Apple Song</p>
                      <p className="text-sm text-muted-foreground">From 5 this time!</p>
                    </div>
                    <div className="bg-card p-4 rounded-lg border-2 border-orange-500/30 text-center">
                      <div className="text-4xl mb-2">🦀</div>
                      <p className="font-bold text-orange-600">Crab Drama</p>
                      <p className="text-sm text-muted-foreground">Act it out!</p>
                    </div>
                    <div className="bg-card p-4 rounded-lg border-2 border-blue-500/30 text-center">
                      <div className="text-4xl mb-2">🐠🦈</div>
                      <p className="font-bold text-blue-600">Fishies & Shark</p>
                      <p className="text-sm text-muted-foreground">5 to 0!</p>
                    </div>
                  </div>
                  
                  {/* Visual demonstration */}
                  <div className="flex items-center justify-center gap-8 py-6 bg-card/50 rounded-lg">
                    <div className="text-center">
                      <div className="flex gap-2 mb-2">
                        {FISH_COLORS.map((color, i) => (
                          <div key={i} className={`w-8 h-5 ${color} rounded-full`} />
                        ))}
                      </div>
                      <p className="text-sm font-medium text-foreground">Mr. Shark catches fish!</p>
                      <p className="text-xs text-muted-foreground">5, 4, 3, 2, 1... 0!</p>
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
                    <li>• Celebrate your child's stronger, more confident counting voice!</li>
                    <li>• Practice counting down faster each time</li>
                    <li>• Have your child be "Mr. Shark" and you be the fish!</li>
                  </ul>
                </div>

                {/* Teacher Guide */}
                <Card className="bg-info/5 border-info/20">
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
                        <strong>Finger Counting (3 min):</strong> Bears wake up to 5, then go back to sleep counting down.
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Users className="w-4 h-4 mt-1 text-green-600" />
                      <div>
                        <strong>Farmer Brown (3 min):</strong> Apple song starting from 5 this time!
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Users className="w-4 h-4 mt-1 text-orange-600" />
                      <div>
                        <strong>Crab Drama (3 min):</strong> 5 students act as crabs, get "washed away" one by one.
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Users className="w-4 h-4 mt-1 text-blue-600" />
                      <div>
                        <strong>Five Little Fishies (13 min):</strong> Learn rhyme, partner play with Mr. Shark.
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            <Button 
              onClick={() => setShowGame(true)} 
              size="lg" 
              className="w-full bg-info hover:bg-info/90 text-primary-foreground text-xl py-6 shadow-lg"
            >
              Start Activity 🐠
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Progress indicator */}
            <div className="flex justify-center gap-2 mb-4">
              {['fingerCounting', 'farmerBrown', 'crabDrama', 'fiveFishies', 'partnerPlay', 'complete'].map((step, idx) => (
                <div
                  key={step}
                  className={`w-3 h-3 rounded-full transition-all ${
                    ['fingerCounting', 'farmerBrown', 'crabDrama', 'fiveFishies', 'partnerPlay', 'complete'].indexOf(currentStep) >= idx
                      ? 'bg-info scale-110'
                      : 'bg-muted'
                  }`}
                />
              ))}
            </div>

            {/* Finger Counting - Bears with Count Down Challenge */}
            {currentStep === 'fingerCounting' && (
              <Card className="bg-gradient-to-b from-amber-50 to-orange-50 shadow-xl border-2 border-amber-500/30">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-amber-700">
                    {countingDown ? "🐻 Bears Going Back to Sleep!" : "🐻 Bears Waking Up!"}
                  </CardTitle>
                  <CardDescription>
                    {countingDown 
                      ? "Tap to put each bear back in the cave - count DOWN!" 
                      : "Tap to wake each bear - start with your pinky finger!"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center gap-6 py-8">
                    {/* Hand visualization */}
                    {renderHand(bearsAwake)}
                    
                    {/* Bear counter */}
                    <div className="text-6xl font-bold text-amber-600">
                      {bearsAwake}
                    </div>
                    
                    {/* Bears */}
                    <div className="flex gap-2">
                      {[0, 1, 2, 3, 4].map((idx) => (
                        <span
                          key={idx}
                          className={`text-4xl transition-all duration-300 ${
                            idx < bearsAwake ? 'scale-100 opacity-100' : 'scale-75 opacity-30'
                          }`}
                        >
                          🐻
                        </span>
                      ))}
                    </div>
                    
                    <Button
                      onClick={handleWakeBear}
                      size="lg"
                      className="bg-amber-500 hover:bg-amber-600 text-white px-8"
                    >
                      {countingDown 
                        ? `Put Bear to Sleep (${bearsAwake} awake)` 
                        : `Wake Up Bear ${bearsAwake + 1}`}
                    </Button>
                    
                    <p className="text-sm text-muted-foreground text-center">
                      {countingDown 
                        ? `Count down: "${bearsAwake}, ${bearsAwake - 1}..." as each bear sleeps`
                        : "Say each number as you extend a finger: 1, 2, 3, 4, 5!"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Farmer Brown Song - Starting from 5 */}
            {currentStep === 'farmerBrown' && (
              <Card className="bg-gradient-to-b from-green-50 to-emerald-50 shadow-xl border-2 border-green-500/30">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-green-700">🍎 Farmer Brown's Apples!</CardTitle>
                  <CardDescription>Starting from 5 this time! Sing and count down!</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center gap-6 py-4">
                    {renderAppleTree()}
                    
                    {/* Song lyrics */}
                    <div className="bg-card p-4 rounded-lg border-2 border-green-200 max-w-md text-center">
                      {songVerse < 5 ? (
                        <>
                          <p className="text-lg font-semibold text-green-700 mb-2">
                            ♪ Farmer Brown had {applesOnTree} green {applesOnTree === 1 ? 'apple' : 'apples'} hanging on the tree ♪
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Then he took 1 apple and he ate it greedily...
                          </p>
                        </>
                      ) : (
                        <p className="text-lg font-semibold text-green-700">
                          No more apples on the tree! 🎵
                        </p>
                      )}
                    </div>
                    
                    <div className="text-5xl font-bold text-green-600">
                      {applesOnTree}
                    </div>
                    
                    {songVerse < 5 && (
                      <Button
                        onClick={handleAppleSongStep}
                        size="lg"
                        className="bg-green-500 hover:bg-green-600 text-white px-8"
                      >
                        🍎 Farmer Ate an Apple!
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Crab Drama */}
            {currentStep === 'crabDrama' && (
              <Card className="bg-gradient-to-b from-orange-50 to-amber-50 shadow-xl border-2 border-orange-500/30">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-orange-700">🦀 Five Little Crabs Drama!</CardTitle>
                  <CardDescription>5 students pretend to be crabs. The wave washes them away!</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center gap-6 py-4">
                    {renderStudentCrabs()}
                    
                    <div className="text-5xl font-bold text-orange-600">
                      {studentsAsCrews} {studentsAsCrews === 1 ? 'crab' : 'crabs'}
                    </div>
                    
                    <div className="bg-card p-4 rounded-lg border-2 border-orange-200 max-w-md text-center">
                      {crabDramaStep === 0 && (
                        <p className="text-lg">
                          "1 less than 5 is ___?"
                        </p>
                      )}
                      {crabDramaStep > 0 && studentsAsCrews > 0 && (
                        <p className="text-lg">
                          Swoosh! 🌊 {studentsAsCrews} {studentsAsCrews === 1 ? 'crab' : 'crabs'} left!
                        </p>
                      )}
                      {studentsAsCrews === 0 && (
                        <p className="text-lg font-semibold text-orange-700">
                          All crabs washed away!
                        </p>
                      )}
                    </div>
                    
                    {crabDramaStep < 5 && (
                      <Button
                        onClick={handleCrabDramaStep}
                        size="lg"
                        className="bg-orange-500 hover:bg-orange-600 text-white px-8"
                      >
                        🌊 Wave Washes Away a Crab!
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Five Little Fishies */}
            {currentStep === 'fiveFishies' && (
              <Card className="bg-gradient-to-b from-blue-50 to-cyan-50 shadow-xl border-2 border-blue-500/30">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-blue-700">🐠 Five Little Fishies! 🦈</CardTitle>
                  <CardDescription>Mr. Shark is coming! Sing and count down!</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center gap-6 py-4">
                    {renderUnderwaterScene(fishVisible, true)}
                    
                    {/* Rhyme */}
                    {getFishRhymeText() && (
                      <div className="bg-card p-4 rounded-lg border-2 border-blue-200 max-w-lg text-center">
                        <p className="text-lg whitespace-pre-line text-blue-800">
                          {getFishRhymeText()?.text}
                        </p>
                      </div>
                    )}
                    
                    <div className="text-5xl font-bold text-blue-600">
                      {fishVisible.filter(f => f).length}
                    </div>
                    
                    {fishRhymeVerse < 5 && (
                      <Button
                        onClick={handleFishRhyme}
                        size="lg"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-8"
                      >
                        🦈 SNAP! Mr. Shark catches a fish!
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Partner Play */}
            {currentStep === 'partnerPlay' && (
              <Card className="bg-gradient-to-b from-teal-50 to-cyan-50 shadow-xl border-2 border-teal-500/30">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-teal-700">
                    🐠🦈 Partner Play! {isPartnerA ? "(Partner A's Turn)" : "(Partner B's Turn)"}
                  </CardTitle>
                  <CardDescription>
                    {isPartnerA 
                      ? "Partner A is Mr. Shark! Partner B counts the fish!"
                      : "Partner B is Mr. Shark now! Partner A counts!"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center gap-6 py-4">
                    {renderUnderwaterScene(partnerFish, true)}
                    
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">{isPartnerA ? 'Partner A' : 'Partner B'}</p>
                        <span className="text-4xl">🦈</span>
                        <p className="text-xs">Mr. Shark</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">{isPartnerA ? 'Partner B' : 'Partner A'}</p>
                        <span className="text-4xl">👀</span>
                        <p className="text-xs">Counter</p>
                      </div>
                    </div>
                    
                    <div className="text-5xl font-bold text-teal-600">
                      {partnerFish.filter(f => f).length} {partnerFish.filter(f => f).length === 1 ? 'fish' : 'fishies'}
                    </div>
                    
                    <Button
                      onClick={handlePartnerHideFish}
                      size="lg"
                      className="bg-teal-500 hover:bg-teal-600 text-white px-8"
                    >
                      🦈 SNAP! Hide a Fish!
                    </Button>
                    
                    <p className="text-sm text-muted-foreground">
                      Say together: "{partnerFish.filter(f => f).length}, {Math.max(0, partnerFish.filter(f => f).length - 1)}..."
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Complete */}
            {currentStep === 'complete' && (
              <Card className="bg-gradient-to-br from-info/20 to-primary/20 shadow-xl border-2 border-primary/30">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl text-primary">🎉 Amazing Work! 🎉</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                  <div className="text-6xl">🐠🦈🐠</div>
                  <p className="text-xl text-card-foreground">
                    You practiced counting down from 5 to 1 with bears, apples, crabs, AND fishies!
                  </p>
                  
                  {/* Debrief questions */}
                  <div className="bg-card p-6 rounded-xl border-2 border-border text-left max-w-md mx-auto">
                    <h4 className="font-bold text-card-foreground mb-3">Let's Talk About It:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• How was counting with fishies the same as with crabs?</li>
                      <li>• What happened when Mr. Shark came?</li>
                      <li>• Can you count down from 5 to 1 really fast now?</li>
                      <li>• If 4 little fishies are swimming, and 1 gets caught, how many are left?</li>
                    </ul>
                  </div>
                  
                  <div className="flex gap-4 justify-center">
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
                      className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                    >
                      <Home className="w-5 h-5" />
                      Back to Home
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

export default CountingMatching36;

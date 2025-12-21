// src/pages/CountingMatching34.tsx
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Star, BookOpen, Users, Lightbulb, RefreshCw, Home, Circle } from "lucide-react";
import { toast } from "sonner";

// Sticker/coin colors matching the design system
const ITEM_COLORS = [
  "bg-[hsl(45,93%,58%)]",  // 5 - gold/yellow (pennies)
  "bg-[hsl(207,90%,54%)]", // 4 - blue
  "bg-[hsl(142,76%,45%)]", // 3 - green
  "bg-[hsl(4,90%,58%)]",   // 2 - red/orange
  "bg-[hsl(280,70%,50%)]", // 1 - purple
];

const ITEM_BORDERS = [
  "border-[hsl(45,93%,48%)]",
  "border-[hsl(207,90%,44%)]",
  "border-[hsl(142,76%,35%)]",
  "border-[hsl(4,90%,48%)]",
  "border-[hsl(280,70%,40%)]",
];

interface StickerColumn {
  count: number;
  color: string;
  border: string;
  filled: boolean;
}

const CountingMatching34 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [currentStep, setCurrentStep] = useState<'snowball' | 'appleSong' | 'pennyDemo' | 'stickerPractice' | 'complete'>('snowball');
  
  // Snowball Toss (starting with 5 this time)
  const [snowballsThrown, setSnowballsThrown] = useState(0);
  const [snowballsRemaining, setSnowballsRemaining] = useState(5);
  const [snowballRound, setSnowballRound] = useState(1);
  
  // Apple Tree Song
  const [applesOnTree, setApplesOnTree] = useState(3);
  const [songVerse, setSongVerse] = useState(0);
  
  // Penny Demonstration (staircase mat)
  const [pennyStep, setPennyStep] = useState(0);
  const [pennyColumns, setPennyColumns] = useState<number[]>([0, 0, 0, 0, 0]);
  
  // Sticker Practice
  const [stickerColumns, setStickerColumns] = useState<StickerColumn[]>([
    { count: 5, color: ITEM_COLORS[0], border: ITEM_BORDERS[0], filled: false },
    { count: 4, color: ITEM_COLORS[1], border: ITEM_BORDERS[1], filled: false },
    { count: 3, color: ITEM_COLORS[2], border: ITEM_BORDERS[2], filled: false },
    { count: 2, color: ITEM_COLORS[3], border: ITEM_BORDERS[3], filled: false },
    { count: 1, color: ITEM_COLORS[4], border: ITEM_BORDERS[4], filled: false },
  ]);
  const [currentColumnIndex, setCurrentColumnIndex] = useState(0);

  const handleThrowSnowball = () => {
    if (snowballsRemaining > 0) {
      setSnowballsThrown(snowballsThrown + 1);
      setSnowballsRemaining(snowballsRemaining - 1);
      
      if (snowballsRemaining === 1) {
        toast.success(`All 5 snowballs thrown! Round ${snowballRound} complete! ❄️`);
        if (snowballRound < 2) {
          setTimeout(() => {
            setSnowballRound(2);
            setSnowballsThrown(0);
            setSnowballsRemaining(5);
          }, 1500);
        } else {
          setTimeout(() => {
            setCurrentStep('appleSong');
          }, 1500);
        }
      }
    }
  };

  const handleAppleSongStep = () => {
    if (songVerse < 3) {
      if (applesOnTree > 0) {
        setApplesOnTree(applesOnTree - 1);
      }
      setSongVerse(songVerse + 1);
      
      if (songVerse === 2) {
        toast.success("Great singing! No more apples! 🎵");
        setTimeout(() => {
          setCurrentStep('pennyDemo');
        }, 1500);
      }
    }
  };

  const handlePennyStep = () => {
    if (pennyStep < 5) {
      const newPennyColumns = [...pennyColumns];
      newPennyColumns[pennyStep] = 5 - pennyStep;
      setPennyColumns(newPennyColumns);
      setPennyStep(pennyStep + 1);
    } else {
      toast.success("Perfect staircase! Now make your own! 🌟");
      setCurrentStep('stickerPractice');
    }
  };

  const handleFillColumn = useCallback(() => {
    if (currentColumnIndex < stickerColumns.length) {
      const newColumns = [...stickerColumns];
      newColumns[currentColumnIndex].filled = true;
      setStickerColumns(newColumns);
      
      const count = 5 - currentColumnIndex;
      toast.success(`${count} stickers placed!`, {
        description: currentColumnIndex < 4 ? `Next: ${count - 1} stickers` : "All done! 🎉"
      });
      
      if (currentColumnIndex < stickerColumns.length - 1) {
        setCurrentColumnIndex(currentColumnIndex + 1);
      } else {
        setTimeout(() => {
          setCurrentStep('complete');
        }, 1500);
      }
    }
  }, [currentColumnIndex, stickerColumns]);

  const resetPractice = () => {
    setStickerColumns([
      { count: 5, color: ITEM_COLORS[0], border: ITEM_BORDERS[0], filled: false },
      { count: 4, color: ITEM_COLORS[1], border: ITEM_BORDERS[1], filled: false },
      { count: 3, color: ITEM_COLORS[2], border: ITEM_BORDERS[2], filled: false },
      { count: 2, color: ITEM_COLORS[3], border: ITEM_BORDERS[3], filled: false },
      { count: 1, color: ITEM_COLORS[4], border: ITEM_BORDERS[4], filled: false },
    ]);
    setCurrentColumnIndex(0);
  };

  // Render sticker/penny column
  const renderColumn = (count: number, colorClass: string, borderClass: string, filled: boolean, isPenny = false) => {
    const size = isPenny ? "w-8 h-8" : "w-10 h-10";
    return (
      <div className="flex flex-col-reverse items-center gap-1">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={`${size} ${filled ? colorClass : 'bg-muted'} ${filled ? borderClass : 'border-muted-foreground/30'} border-2 ${isPenny ? 'rounded-full' : 'rounded-md'} shadow-md transition-all duration-300 ${filled ? 'scale-100' : 'scale-90 opacity-50'}`}
            style={{ animationDelay: filled ? `${i * 0.1}s` : undefined }}
          />
        ))}
      </div>
    );
  };

  // Render apple tree
  const renderAppleTree = () => (
    <div className="relative w-48 h-56 mx-auto">
      {/* Tree trunk */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-20 bg-[hsl(30,50%,35%)] rounded-md" />
      {/* Tree top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-[hsl(142,60%,40%)] rounded-full" />
      {/* Apples */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-3 flex-wrap justify-center w-32">
        {Array.from({ length: applesOnTree }).map((_, i) => (
          <div
            key={i}
            className="w-10 h-10 bg-[hsl(4,80%,50%)] rounded-full shadow-lg border-2 border-[hsl(4,80%,40%)] animate-bounce-in"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                Lesson 34
              </span>
              <h1 className="text-2xl font-bold text-foreground">Staircase Mat & Stickers</h1>
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
                  Today, your child will continue building <span className="font-bold text-primary">descending number stairs</span> using pennies on a mat and creating a sticker sheet, reinforcing the "1 less" pattern.
                </p>
              </CardContent>
            </Card>

            {/* Introduction */}
            <Card className="bg-card shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-card-foreground">Making Sticker Stairs</CardTitle>
                <CardDescription>Read this together with your child</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-6 rounded-xl border-2 border-border">
                  <p className="text-lg text-card-foreground mb-4">
                    Today we'll sing about apples, then use pennies and stickers to make staircases that go DOWN from 5 to 1!
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-card p-4 rounded-lg border-2 border-info/30 text-center">
                      <div className="text-4xl mb-2">🍎</div>
                      <p className="font-bold text-info">Apple Song</p>
                      <p className="text-sm text-muted-foreground">Count down from 3</p>
                    </div>
                    <div className="bg-card p-4 rounded-lg border-2 border-secondary/30 text-center">
                      <div className="text-4xl mb-2">🪙</div>
                      <p className="font-bold text-secondary">Penny Mat</p>
                      <p className="text-sm text-muted-foreground">Fill the staircase</p>
                    </div>
                    <div className="bg-card p-4 rounded-lg border-2 border-success/30 text-center">
                      <div className="text-4xl mb-2">⭐</div>
                      <p className="font-bold text-success">Sticker Sheet</p>
                      <p className="text-sm text-muted-foreground">Make your own!</p>
                    </div>
                  </div>
                  
                  {/* Visual demonstration of staircase mat */}
                  <div className="flex items-end justify-center gap-3 py-6 bg-card/50 rounded-lg">
                    {[5, 4, 3, 2, 1].map((count, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-1">
                        <div className="flex flex-col-reverse gap-1">
                          {Array.from({ length: count }).map((_, i) => (
                            <Circle key={i} className="w-6 h-6 text-secondary fill-secondary/30" />
                          ))}
                        </div>
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
                    <li>• Use real coins or stickers at home to recreate this activity</li>
                    <li>• Encourage your child to touch and count each item</li>
                    <li>• Ask "What is 1 less than ___?" to reinforce the pattern</li>
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
                      <Users className="w-4 h-4 mt-1 text-info" />
                      <div>
                        <strong>Snowball Toss (4 min):</strong> 5 snowballs, count thrown vs. remaining.
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Users className="w-4 h-4 mt-1 text-destructive" />
                      <div>
                        <strong>Apple Song (4 min):</strong> Sing and remove apples from the tree.
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Users className="w-4 h-4 mt-1 text-secondary" />
                      <div>
                        <strong>Penny Mat (7 min):</strong> Fill staircase columns with pennies.
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Users className="w-4 h-4 mt-1 text-success" />
                      <div>
                        <strong>Sticker Sheet (7 min):</strong> Create your own descending sticker chart.
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
              {['snowball', 'appleSong', 'pennyDemo', 'stickerPractice', 'complete'].map((step, idx) => (
                <div
                  key={step}
                  className={`w-3 h-3 rounded-full transition-all ${
                    ['snowball', 'appleSong', 'pennyDemo', 'stickerPractice', 'complete'].indexOf(currentStep) >= idx
                      ? 'bg-primary scale-110'
                      : 'bg-muted'
                  }`}
                />
              ))}
            </div>

            {/* Snowball Toss (5 snowballs) */}
            {currentStep === 'snowball' && (
              <Card className="bg-gradient-to-b from-blue-50 to-cyan-50 shadow-xl border-2 border-info/30">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-info">❄️ Snowball Toss - Round {snowballRound}</CardTitle>
                  <CardDescription>Throw 5 snowballs and count down!</CardDescription>
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

                  <div className="flex justify-center gap-3 flex-wrap">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-14 h-14 rounded-full transition-all duration-300 ${
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
                    Count down: <strong className="text-info">{snowballsRemaining}</strong> left!
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Apple Song */}
            {currentStep === 'appleSong' && (
              <Card className="bg-gradient-to-b from-red-50 to-orange-50 shadow-xl border-2 border-destructive/30">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-destructive">🍎 Farmer Brown's Apple Tree</CardTitle>
                  <CardDescription>Sing along and take away apples!</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                  {renderAppleTree()}
                  
                  <div className="bg-card rounded-xl p-6 shadow-md max-w-md mx-auto">
                    <p className="text-lg text-card-foreground italic">
                      {songVerse === 0 && (
                        <>
                          "Farmer Brown had <strong className="text-destructive">{applesOnTree} green apples</strong> hanging on the tree..."
                        </>
                      )}
                      {songVerse === 1 && (
                        <>
                          "Then, he took 1 apple and ate it greedily, leaving <strong className="text-destructive">{applesOnTree} apples</strong>..."
                        </>
                      )}
                      {songVerse === 2 && (
                        <>
                          "...leaving <strong className="text-destructive">{applesOnTree} apple</strong> hanging on the tree!"
                        </>
                      )}
                      {songVerse === 3 && (
                        <>
                          "No more apples hanging on the tree! 🎉"
                        </>
                      )}
                    </p>
                  </div>

                  <div className="flex justify-center gap-2">
                    {[3, 2, 1, 0].map((num, idx) => (
                      <div
                        key={idx}
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all ${
                          songVerse === idx ? 'bg-destructive text-primary-foreground scale-110' : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {num}
                      </div>
                    ))}
                  </div>

                  <Button 
                    onClick={handleAppleSongStep} 
                    size="lg" 
                    disabled={songVerse >= 3}
                    className="bg-destructive hover:bg-destructive/90 text-primary-foreground px-12"
                  >
                    {songVerse < 3 ? "Take 1 Apple! 🍎" : "Done Singing!"}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Penny Mat Demonstration */}
            {currentStep === 'pennyDemo' && (
              <Card className="bg-card shadow-xl border-2 border-secondary/30">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-secondary">🪙 Penny Staircase Mat</CardTitle>
                  <CardDescription>Fill in pennies to make descending stairs!</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-muted rounded-2xl p-6">
                    <p className="text-center text-lg text-card-foreground mb-4">
                      Remember the staircase for our friend? Let's fill it with pennies!
                    </p>

                    {/* Staircase mat visualization */}
                    <div className="flex items-end justify-center gap-4 py-6 min-h-[200px]">
                      {[5, 4, 3, 2, 1].map((count, idx) => (
                        <div 
                          key={idx} 
                          className={`flex flex-col items-center transition-all duration-500`}
                        >
                          <div className="flex flex-col-reverse gap-1">
                            {Array.from({ length: count }).map((_, i) => (
                              <div
                                key={i}
                                className={`w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                                  pennyColumns[idx] > i 
                                    ? 'bg-[hsl(45,93%,58%)] border-[hsl(45,93%,48%)] shadow-md' 
                                    : 'bg-muted border-dashed border-muted-foreground/40'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-lg font-bold text-foreground mt-2">{count}</span>
                          {pennyColumns[idx] === count && (
                            <span className="text-xs text-success">✓</span>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="text-center mt-4">
                      <p className="text-lg text-card-foreground">
                        {pennyStep === 0 && "Let's put 5 pennies in the first column!"}
                        {pennyStep === 1 && "Now 4 pennies - that's 1 less!"}
                        {pennyStep === 2 && "3 pennies - the stairs go down!"}
                        {pennyStep === 3 && "2 pennies - almost there!"}
                        {pennyStep === 4 && "1 penny - the smallest stair!"}
                        {pennyStep === 5 && "Perfect descending stairs: 5, 4, 3, 2, 1! 🎉"}
                      </p>
                    </div>
                  </div>

                  <Button 
                    onClick={handlePennyStep} 
                    size="lg" 
                    className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  >
                    {pennyStep < 5 ? `Add ${5 - pennyStep} Pennies! 🪙` : "Make Your Own! ⭐"}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Sticker Practice */}
            {currentStep === 'stickerPractice' && (
              <Card className="bg-card shadow-xl border-2 border-primary/30">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-primary">⭐ Your Sticker Sheet!</CardTitle>
                  <CardDescription>Fill in stickers to make your own descending stairs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-muted rounded-2xl p-6">
                    {/* Sticker sheet grid */}
                    <div className="flex items-end justify-center gap-4 py-6 min-h-[220px]">
                      {stickerColumns.map((column, idx) => (
                        <div 
                          key={idx} 
                          className={`flex flex-col items-center transition-all duration-300`}
                        >
                          {renderColumn(column.count, column.color, column.border, column.filled)}
                          <span className={`text-lg font-bold mt-2 ${column.filled ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {column.count}
                          </span>
                          {column.filled && (
                            <span className="text-xs text-success">✓</span>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Current instruction */}
                    <div className="text-center bg-card rounded-lg p-4 border-2 border-border">
                      {currentColumnIndex < stickerColumns.length ? (
                        <>
                          <p className="text-lg text-card-foreground mb-2">
                            Put <span className="font-bold text-primary text-2xl">{stickerColumns[currentColumnIndex].count}</span> stickers in this column
                          </p>
                          {currentColumnIndex > 0 && (
                            <p className="text-sm text-muted-foreground">
                              1 less than {stickerColumns[currentColumnIndex - 1].count}!
                            </p>
                          )}
                        </>
                      ) : (
                        <p className="text-lg text-success font-bold">
                          All stickers placed! Count: 5, 4, 3, 2, 1! 🎉
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
                      onClick={handleFillColumn} 
                      size="lg" 
                      disabled={currentColumnIndex >= stickerColumns.length}
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      Add {stickerColumns[currentColumnIndex]?.count || 0} Stickers! ⭐
                    </Button>
                  </div>

                  {/* Counting practice */}
                  <div className="text-center">
                    <p className="text-muted-foreground text-sm">
                      Count down as you add: <span className="font-bold">5 → 4 → 3 → 2 → 1</span>
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
                  <h2 className="text-3xl font-bold text-success">Wonderful Work!</h2>
                  <p className="text-lg text-card-foreground max-w-md mx-auto">
                    You made a beautiful sticker sheet showing descending stairs!
                    Each column has <strong>1 less</strong> sticker.
                  </p>
                  
                  {/* Final sticker display */}
                  <div className="flex items-end justify-center gap-3 py-4">
                    {[5, 4, 3, 2, 1].map((count, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        <div className="flex flex-col-reverse gap-1">
                          {Array.from({ length: count }).map((_, i) => (
                            <div
                              key={i}
                              className={`w-6 h-6 ${ITEM_COLORS[idx]} ${ITEM_BORDERS[idx]} border-2 rounded-md shadow-sm`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-bold text-foreground mt-1">{count}</span>
                      </div>
                    ))}
                  </div>

                  {/* Debrief questions */}
                  <div className="bg-card/80 rounded-xl p-6 max-w-lg mx-auto text-left">
                    <h3 className="font-bold text-card-foreground mb-3 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-secondary" />
                      Talk About It:
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• How is your sticker sheet like the stairs we made yesterday?</li>
                      <li>• What happens when we move from 5 to 4 stickers? <span className="text-primary">(1 less)</span></li>
                      <li>• What is 1 less than 4? <span className="text-primary">(3)</span></li>
                      <li>• Let's count back: 5, 4, 3, 2, 1!</li>
                    </ul>
                  </div>

                  <div className="flex gap-4 justify-center">
                    <Button 
                      onClick={() => {
                        resetPractice();
                        setCurrentStep('stickerPractice');
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

export default CountingMatching34;
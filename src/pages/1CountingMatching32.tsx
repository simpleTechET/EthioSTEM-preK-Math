import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw, Check, Star, Gift, Hand } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CountingMatching32 = () => {
  const [activeTab, setActiveTab] = useState("fluency");
  
  // Fluency - Show Me 1 More
  const [fingerCount, setFingerCount] = useState(1);
  const [fingerFeedback, setFingerFeedback] = useState("");
  
  // Fluency - Ants Marching
  const [antCount, setAntCount] = useState(1);
  const [antVerse, setAntVerse] = useState(0);
  const antVerses = [
    { count: 1, line: "The little one stops to suck his thumb" },
    { count: 2, line: "The little one stops to tie a shoe" },
    { count: 3, line: "The little one stops to climb a tree" },
    { count: 4, line: "The little one stops to shut the door" },
    { count: 5, line: "The little one stops to take a dive" },
  ];
  
  // Concept - Party Box Game
  const [partyBoxTower, setPartyBoxTower] = useState<number | null>(null);
  const [hasAddedCube, setHasAddedCube] = useState(false);
  const [partyBoxFeedback, setPartyBoxFeedback] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState(0);
  
  // Concept - Sticker Grid
  const [stickerGrid, setStickerGrid] = useState<number[]>([0, 0, 0, 0, 0]);
  const [gridComplete, setGridComplete] = useState(false);
  
  // Debrief - Hidden Fingers Game
  const [hiddenFingers, setHiddenFingers] = useState(3);
  const [showHiddenAnswer, setShowHiddenAnswer] = useState(false);
  const [debriefGuess, setDebriefGuess] = useState<number | null>(null);
  
  const markLessonComplete = () => {
    const saved = localStorage.getItem('ethiostem-completed-lessons');
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes(32)) {
      completed.push(32);
      localStorage.setItem('ethiostem-completed-lessons', JSON.stringify(completed));
    }
  };

  // Fluency handlers
  const handleFingerClick = () => {
    if (fingerCount < 5) {
      setFingerFeedback(`${fingerCount}. 1 more is ${fingerCount + 1}!`);
      setFingerCount(fingerCount + 1);
    } else {
      setFingerFeedback("Great job! You counted to 5! 🎉");
    }
  };
  
  const resetFingers = () => {
    setFingerCount(1);
    setFingerFeedback("");
  };

  const handleNextAntVerse = () => {
    if (antVerse < 4) {
      setAntVerse(antVerse + 1);
      setAntCount(antVerse + 2);
    }
  };
  
  const resetAnts = () => {
    setAntVerse(0);
    setAntCount(1);
  };

  // Party Box handlers
  const drawFromPartyBox = () => {
    const tower = Math.floor(Math.random() * 4) + 1; // 1-4
    setPartyBoxTower(tower);
    setHasAddedCube(false);
    setPartyBoxFeedback(`You drew a tower of ${tower}!`);
  };
  
  const addOneCube = () => {
    if (partyBoxTower && !hasAddedCube) {
      setHasAddedCube(true);
      setPartyBoxFeedback(`Let's count 1 more: ${partyBoxTower}, ${partyBoxTower + 1}!`);
    }
  };
  
  const answerWhatComesAfter = (answer: number) => {
    if (partyBoxTower && hasAddedCube) {
      if (answer === partyBoxTower + 1) {
        setPartyBoxFeedback(`Correct! ${answer} comes after ${partyBoxTower}! 🎉`);
        setCorrectAnswers(correctAnswers + 1);
        setTimeout(() => {
          setPartyBoxTower(null);
          setHasAddedCube(false);
          setPartyBoxFeedback("");
        }, 1500);
      } else {
        setPartyBoxFeedback(`Try again! What comes after ${partyBoxTower}?`);
      }
    }
  };
  
  // Sticker Grid handlers
  const addSticker = (column: number) => {
    const newGrid = [...stickerGrid];
    const targetCount = column + 1;
    if (newGrid[column] < targetCount) {
      newGrid[column] = newGrid[column] + 1;
      setStickerGrid(newGrid);
      
      // Check if grid is complete
      const isComplete = newGrid.every((count, idx) => count === idx + 1);
      if (isComplete) {
        setGridComplete(true);
        markLessonComplete();
      }
    }
  };
  
  const resetGrid = () => {
    setStickerGrid([0, 0, 0, 0, 0]);
    setGridComplete(false);
  };

  // Debrief handlers
  const handleDebriefGuess = (guess: number) => {
    setDebriefGuess(guess);
    setShowHiddenAnswer(true);
  };
  
  const newHiddenGame = () => {
    const newNum = Math.floor(Math.random() * 4) + 1; // 1-4
    setHiddenFingers(newNum);
    setShowHiddenAnswer(false);
    setDebriefGuess(null);
  };

  const renderFingers = (count: number) => {
    return (
      <div className="flex gap-2 justify-center">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="w-8 h-16 bg-gradient-to-t from-amber-400 to-amber-300 rounded-t-full border-2 border-amber-500 shadow-md"
          />
        ))}
      </div>
    );
  };

  const renderAnts = (count: number) => {
    return (
      <div className="flex gap-2 justify-center flex-wrap">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="text-4xl animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
            🐜
          </div>
        ))}
      </div>
    );
  };

  const renderCubeTower = (count: number, color: string = "blue") => {
    const colors: Record<string, string> = {
      blue: "from-blue-500 to-blue-400",
      green: "from-green-500 to-green-400",
      red: "from-red-500 to-red-400",
      purple: "from-purple-500 to-purple-400",
      orange: "from-orange-500 to-orange-400",
    };
    
    return (
      <div className="flex flex-col-reverse items-center gap-1">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={`w-12 h-10 bg-gradient-to-br ${colors[color]} rounded-md border-2 border-white/50 shadow-lg flex items-center justify-center`}
          >
            <span className="text-white font-bold text-sm">{i + 1}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/activities/module-1">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-foreground">Lesson 32: Count Up—What Comes After?</h1>
            <p className="text-sm text-muted-foreground">Topic G: 1 More • 25 minutes</p>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500" />
            <span className="font-semibold text-amber-700">{correctAnswers}</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="fluency" className="text-sm">
              🎹 Fluency Practice
            </TabsTrigger>
            <TabsTrigger value="concept" className="text-sm">
              🎁 Concept Development
            </TabsTrigger>
            <TabsTrigger value="debrief" className="text-sm">
              💬 Student Debrief
            </TabsTrigger>
          </TabsList>

          {/* Fluency Practice Tab */}
          <TabsContent value="fluency" className="space-y-8">
            {/* Show Me 1 More */}
            <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-800">
                  <Hand className="w-6 h-6" />
                  Show Me 1 More (3 minutes)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground text-center">
                  Show fingers the Math Way! Click to add 1 more finger.
                </p>
                
                <div className="bg-white/60 rounded-xl p-8 min-h-[200px] flex flex-col items-center justify-center gap-6">
                  {renderFingers(fingerCount)}
                  
                  <div className="text-center">
                    <p className="text-3xl font-bold text-amber-700">{fingerCount} finger{fingerCount > 1 ? 's' : ''}</p>
                    {fingerFeedback && (
                      <p className="text-lg text-green-600 mt-2 animate-pulse">{fingerFeedback}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={handleFingerClick}
                    disabled={fingerCount >= 5 && fingerFeedback.includes("Great")}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                  >
                    Show 1 More
                  </Button>
                  <Button variant="outline" onClick={resetFingers}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Start Over
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* The Ants Go Marching */}
            <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  🐜 The Ants Go Marching (4 minutes)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-white/60 rounded-xl p-6 text-center">
                  <div className="mb-6">
                    {renderAnts(antCount)}
                  </div>
                  
                  <div className="bg-green-100 rounded-lg p-4 mb-4">
                    <p className="text-lg font-medium text-green-800">
                      ♪ The ants go marching {antVerses[antVerse].count === 1 ? "one by one" : 
                        antVerses[antVerse].count === 2 ? "two by two" :
                        antVerses[antVerse].count === 3 ? "three by three" :
                        antVerses[antVerse].count === 4 ? "four by four" : "five by five"}. Hoorah! Hoorah! ♪
                    </p>
                    <p className="text-md text-green-700 mt-2">
                      ♪ {antVerses[antVerse].line} ♪
                    </p>
                    <p className="text-sm text-green-600 mt-2">
                      ♪ And they all go marching down, to the ground, to get out of the rain. BOOM, BOOM, BOOM! ♪
                    </p>
                  </div>
                  
                  <p className="text-2xl font-bold text-green-700">
                    {antCount} ant{antCount > 1 ? 's' : ''} marching!
                  </p>
                </div>
                
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={handleNextAntVerse}
                    disabled={antVerse >= 4}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  >
                    Add 1 More Ant!
                  </Button>
                  <Button variant="outline" onClick={resetAnts}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Start Over
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Concept Development Tab */}
          <TabsContent value="concept" className="space-y-8">
            {/* Party Box Game */}
            <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-800">
                  <Gift className="w-6 h-6" />
                  What Comes After? Party Box Game
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground text-center">
                  Draw a number tower from the party box, add 1 more cube, and tell what comes after!
                </p>
                
                <div className="bg-white/60 rounded-xl p-8 min-h-[300px] flex flex-col items-center justify-center gap-6">
                  {!partyBoxTower ? (
                    <div className="text-center">
                      <div className="text-8xl mb-4">🎁</div>
                      <p className="text-lg text-purple-700">Click the party box to draw a tower!</p>
                      <Button
                        onClick={drawFromPartyBox}
                        className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                        size="lg"
                      >
                        Draw from Party Box
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-6">
                      <div className="flex items-end gap-4">
                        {renderCubeTower(hasAddedCube ? partyBoxTower + 1 : partyBoxTower, "purple")}
                        
                        {!hasAddedCube && (
                          <div className="flex flex-col items-center">
                            <div className="w-10 h-8 bg-gradient-to-br from-yellow-400 to-yellow-300 rounded-md border-2 border-yellow-500 shadow-lg flex items-center justify-center animate-bounce">
                              <span className="text-white font-bold text-xs">+1</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">Your cube</p>
                          </div>
                        )}
                      </div>
                      
                      <p className="text-lg font-medium text-purple-700">{partyBoxFeedback}</p>
                      
                      {!hasAddedCube && (
                        <Button
                          onClick={addOneCube}
                          className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600"
                        >
                          Put 1 More On Top!
                        </Button>
                      )}
                      
                      {hasAddedCube && (
                        <div className="space-y-4 text-center">
                          <p className="text-lg font-semibold text-purple-800">What comes after {partyBoxTower}?</p>
                          <div className="flex gap-3 justify-center">
                            {[1, 2, 3, 4, 5].map((num) => (
                              <Button
                                key={num}
                                onClick={() => answerWhatComesAfter(num)}
                                className="w-14 h-14 text-2xl font-bold bg-gradient-to-br from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                              >
                                {num}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Sticker Stairs Grid */}
            <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  ⭐ Make Sticker Stairs!
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground text-center">
                  Put stickers in each column to match the number. Build stairs!
                </p>
                
                <div className="bg-white/60 rounded-xl p-6">
                  <div className="flex gap-2 justify-center items-end">
                    {[1, 2, 3, 4, 5].map((num, colIdx) => (
                      <div key={num} className="flex flex-col items-center">
                        {/* Sticker column */}
                        <div 
                          className="w-16 bg-blue-100 rounded-lg border-2 border-blue-300 p-1 flex flex-col-reverse gap-1 cursor-pointer hover:bg-blue-200 transition-colors min-h-[200px]"
                          onClick={() => addSticker(colIdx)}
                        >
                          {Array.from({ length: stickerGrid[colIdx] }).map((_, i) => (
                            <div
                              key={i}
                              className="w-full h-8 bg-gradient-to-br from-yellow-400 to-amber-400 rounded-md flex items-center justify-center shadow-md"
                            >
                              ⭐
                            </div>
                          ))}
                        </div>
                        
                        {/* Number label */}
                        <div className="mt-2 w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">{num}</span>
                        </div>
                        
                        {/* Status */}
                        <div className="mt-1 h-6">
                          {stickerGrid[colIdx] === num ? (
                            <Check className="w-5 h-5 text-green-500" />
                          ) : (
                            <span className="text-sm text-muted-foreground">{stickerGrid[colIdx]}/{num}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {gridComplete && (
                    <div className="mt-6 text-center">
                      <p className="text-2xl font-bold text-green-600 animate-pulse">
                        🎉 Perfect Sticker Stairs! You built stairs showing 1 more! 🎉
                      </p>
                      <p className="text-lg text-blue-700 mt-2">
                        2 comes after 1 • 3 comes after 2 • 4 comes after 3 • 5 comes after 4
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-center">
                  <Button variant="outline" onClick={resetGrid}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Start Over
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Student Debrief Tab */}
          <TabsContent value="debrief" className="space-y-8">
            {/* Hidden Fingers Game */}
            <Card className="border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-cyan-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-teal-800">
                  <Hand className="w-6 h-6" />
                  Magic Fingers Game
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground text-center">
                  I'm showing {hiddenFingers} finger{hiddenFingers > 1 ? 's' : ''}. Now I'm hiding them and adding 1 more. 
                  How many fingers do I have now?
                </p>
                
                <div className="bg-white/60 rounded-xl p-8 min-h-[200px] flex flex-col items-center justify-center">
                  {!showHiddenAnswer ? (
                    <div className="text-center">
                      <div className="text-6xl mb-4">🙈</div>
                      <p className="text-lg text-teal-700 mb-4">
                        I had {hiddenFingers} finger{hiddenFingers > 1 ? 's' : ''}, now adding 1 more behind my back...
                      </p>
                      <p className="text-xl font-semibold text-teal-800 mb-4">What number do I have now?</p>
                      <div className="flex gap-3 justify-center">
                        {[2, 3, 4, 5].map((num) => (
                          <Button
                            key={num}
                            onClick={() => handleDebriefGuess(num)}
                            className="w-14 h-14 text-2xl font-bold bg-gradient-to-br from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600"
                          >
                            {num}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      {renderFingers(hiddenFingers + 1)}
                      <p className="text-2xl font-bold text-teal-700 mt-4">
                        {hiddenFingers + 1} fingers!
                      </p>
                      {debriefGuess === hiddenFingers + 1 ? (
                        <p className="text-xl text-green-600 mt-2">
                          ✅ You got it! {hiddenFingers + 1} comes after {hiddenFingers}!
                        </p>
                      ) : (
                        <p className="text-xl text-orange-600 mt-2">
                          {hiddenFingers} + 1 more = {hiddenFingers + 1}
                        </p>
                      )}
                      <Button onClick={newHiddenGame} className="mt-4 bg-gradient-to-r from-teal-500 to-cyan-500">
                        Play Again
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Reflection Questions */}
            <Card className="border-2 border-rose-200 bg-gradient-to-br from-rose-50 to-pink-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-rose-800">
                  💭 Let's Think Together!
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="bg-white/60 rounded-lg p-4">
                    <p className="font-medium text-rose-800">🤔 How many cubes did we put on our towers that helped tell us what came after?</p>
                    <p className="text-muted-foreground mt-1 text-sm">Just 1 more cube!</p>
                  </div>
                  <div className="bg-white/60 rounded-lg p-4">
                    <p className="font-medium text-rose-800">🤔 How is your sticker sheet the same as the stairs you made before?</p>
                    <p className="text-muted-foreground mt-1 text-sm">Each column has 1 more sticker than the one before!</p>
                  </div>
                  <div className="bg-white/60 rounded-lg p-4">
                    <p className="font-medium text-rose-800">🤔 What comes after 2? What comes after 4?</p>
                    <p className="text-muted-foreground mt-1 text-sm">3 comes after 2! 5 comes after 4!</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Back to Activities */}
            <div className="text-center pt-4">
              <Link to="/activities/module-1">
                <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Activities
                </Button>
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CountingMatching32;

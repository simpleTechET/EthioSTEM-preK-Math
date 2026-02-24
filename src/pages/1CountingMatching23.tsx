import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Music, Footprints, Dices } from "lucide-react";

const CountingMatching23 = () => {
  const [currentActivity, setCurrentActivity] = useState("intro");
  
  const navigate = (path: string) => {
    window.location.href = path;
  };
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={() => navigate("/activities/module-1")}
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back to Home</span>
          </button>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary">Lesson 23</h1>
            <p className="text-sm text-muted-foreground">Make Groups and Match Numerals</p>
          </div>
          <div className="w-24" />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="intro" value={currentActivity} onValueChange={setCurrentActivity}>
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="intro">Introduction</TabsTrigger>
            <TabsTrigger value="fluency">Fluency</TabsTrigger>
            <TabsTrigger value="application">Application</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
            <TabsTrigger value="debrief">Debrief</TabsTrigger>
          </TabsList>

          <TabsContent value="intro">
            <IntroductionSection />
          </TabsContent>

          <TabsContent value="fluency">
            <FluencyPractice />
          </TabsContent>

          <TabsContent value="application">
            <ApplicationProblem />
          </TabsContent>

          <TabsContent value="practice">
            <PracticeActivity />
          </TabsContent>

          <TabsContent value="debrief">
            <StudentDebrief navigate={navigate} />
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
        <Dices className="w-6 h-6" />
        Lesson Objective
      </CardTitle>
      <CardDescription>Making groups and matching them to numerals</CardDescription>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="bg-accent/20 p-6 rounded-lg">
        <h3 className="font-bold text-lg mb-3">🎯 Today's Goal</h3>
        <p className="text-lg">Make a group of up to 5 objects and match the numeral (concrete to abstract).</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-card p-4 rounded-lg border border-border">
          <h4 className="font-semibold mb-2">⏱️ Lesson Structure (25 minutes)</h4>
          <ul className="space-y-2 text-sm">
            <li>• Fluency Practice (6 min)</li>
            <li>• Application Problem (3 min)</li>
            <li>• Concept Development (13 min)</li>
            <li>• Student Debrief (3 min)</li>
          </ul>
        </div>

        <div className="bg-card p-4 rounded-lg border border-border">
          <h4 className="font-semibold mb-2">🎓 Key Concept</h4>
          <p className="text-sm">
            The numeral tells us how many objects are in a group. When we make groups, we can match them to the right number!
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
  const [currentPianoFinger, setCurrentPianoFinger] = useState(0);
  const [hopNumber, setHopNumber] = useState<number | null>(null);
  const [hopCount, setHopCount] = useState(0);
  const [showHopFeedback, setShowHopFeedback] = useState(false);

  const pianoKeys = [
    { finger: "Pinky", number: 1, color: "bg-red-500" },
    { finger: "Ring", number: 2, color: "bg-orange-500" },
    { finger: "Middle", number: 3, color: "bg-yellow-500" },
    { finger: "Index", number: 4, color: "bg-green-500" },
    { finger: "Thumb", number: 5, color: "bg-blue-500" },
  ];

  const startPiano = () => {
    setCurrentPianoFinger(0);
  };

  const nextPianoKey = () => {
    if (currentPianoFinger < 4) {
      setCurrentPianoFinger(currentPianoFinger + 1);
    } else {
      setCurrentPianoFinger(0);
    }
  };

  const tossBeanbag = () => {
    const randomNum = Math.floor(Math.random() * 5) + 1;
    setHopNumber(randomNum);
    setHopCount(0);
    setShowHopFeedback(false);
  };

  const hop = () => {
    if (hopNumber && hopCount < hopNumber) {
      setHopCount(hopCount + 1);
      if (hopCount + 1 === hopNumber) {
        setShowHopFeedback(true);
      }
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music className="w-6 h-6" />
            Counting the Math Way on the Piano
          </CardTitle>
          <CardDescription>Count fingers on the piano mat with numerals (3 minutes)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-lg border-2 border-purple-200 dark:border-purple-800">
              <h3 className="text-center font-bold text-lg mb-4">🎹 Piano Mat</h3>
              <div className="flex justify-center gap-2 mb-6">
                {pianoKeys.map((key, idx) => (
                  <div
                    key={idx}
                    className={`relative w-20 h-40 rounded-lg border-4 transition-all ${
                      idx <= currentPianoFinger
                        ? `${key.color} border-gray-800 scale-105`
                        : 'bg-white dark:bg-gray-700 border-gray-400'
                    }`}
                  >
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center">
                      <div className="text-3xl font-bold text-gray-800 dark:text-white">
                        {key.number}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                        {key.finger}
                      </div>
                    </div>
                    {idx === currentPianoFinger && (
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 text-2xl animate-bounce">
                        👇
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="text-center space-y-4">
                <p className="text-lg font-semibold">
                  {currentPianoFinger === 0 && "Start with your left pinky!"}
                  {currentPianoFinger > 0 && currentPianoFinger < 5 && `Count: ${currentPianoFinger + 1}`}
                  {currentPianoFinger === 5 && "Great job counting to 5!"}
                </p>
                <div className="flex gap-3 justify-center">
                  {currentPianoFinger === 0 ? (
                    <Button onClick={startPiano} size="lg" className="bg-purple-600 hover:bg-purple-700">
                      Start Counting
                    </Button>
                  ) : (
                    <Button onClick={nextPianoKey} size="lg" className="bg-purple-600 hover:bg-purple-700">
                      {currentPianoFinger < 4 ? "Next Finger" : "Start Over"}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Footprints className="w-6 h-6" />
            Hop-Hop Game
          </CardTitle>
          <CardDescription>Toss the beanbag and hop that many times (3 minutes)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-lg border-2 border-green-200 dark:border-green-800">
              <h3 className="text-center font-bold text-lg mb-4">Hopscotch Mat</h3>
              
              <div className="flex justify-center gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((num) => (
                  <div
                    key={num}
                    className={`w-20 h-24 rounded-lg border-4 flex items-center justify-center text-4xl font-bold transition-all ${
                      hopNumber === num
                        ? 'bg-yellow-300 border-yellow-600 scale-110'
                        : 'bg-blue-200 dark:bg-blue-800 border-blue-400 dark:border-blue-600'
                    }`}
                  >
                    {num}
                  </div>
                ))}
              </div>

              {hopNumber && (
                <div className="text-center mb-4">
                  <div className="text-6xl mb-2">🎒</div>
                  <p className="text-xl font-bold text-green-700 dark:text-green-300">
                    The beanbag landed on {hopNumber}!
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mt-2">
                    Hops: {hopCount} / {hopNumber}
                  </p>
                </div>
              )}

              <div className="text-center space-y-4">
                {!hopNumber ? (
                  <Button onClick={tossBeanbag} size="lg" className="bg-green-600 hover:bg-green-700">
                    Toss Beanbag
                  </Button>
                ) : !showHopFeedback ? (
                  <Button onClick={hop} size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Hop! 🦘
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-green-500/20 text-green-700 dark:text-green-300 p-4 rounded-lg">
                      <p className="font-bold text-lg">✓ Perfect! You hopped {hopNumber} times!</p>
                    </div>
                    <Button onClick={tossBeanbag} size="lg" variant="outline">
                      Play Again
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ApplicationProblem = () => {
  const [currentDots, setCurrentDots] = useState<number | null>(null);
  const [selectedNumeral, setSelectedNumeral] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const dotConfigurations = {
    1: [[{ x: 50, y: 50 }]],
    2: [[{ x: 30, y: 50 }, { x: 70, y: 50 }]],
    3: [[{ x: 30, y: 30 }, { x: 70, y: 30 }, { x: 50, y: 70 }]],
    4: [[{ x: 30, y: 30 }, { x: 70, y: 30 }, { x: 30, y: 70 }, { x: 70, y: 70 }]],
    5: [[{ x: 30, y: 30 }, { x: 70, y: 30 }, { x: 50, y: 50 }, { x: 30, y: 70 }, { x: 70, y: 70 }]],
  };

  const showNewCard = () => {
    const randomNum = Math.floor(Math.random() * 5) + 1;
    setCurrentDots(randomNum);
    setSelectedNumeral(null);
    setFeedback(null);
  };

  const selectNumeral = (num: number) => {
    setSelectedNumeral(num);
    if (num === currentDots) {
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Match Dots to Numerals</CardTitle>
        <CardDescription>See the dots and find the matching number (3 minutes)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center space-y-6">
          {!currentDots ? (
            <Button onClick={showNewCard} size="lg" className="bg-primary">
              Show Dot Card
            </Button>
          ) : (
            <>
              <div className="bg-white dark:bg-gray-800 border-4 border-gray-300 dark:border-gray-600 rounded-lg p-8 max-w-xs mx-auto aspect-square flex items-center justify-center relative">
                {dotConfigurations[currentDots as keyof typeof dotConfigurations][0].map((dot, idx) => (
                  <div
                    key={idx}
                    className="absolute w-12 h-12 bg-blue-600 rounded-full"
                    style={{ left: `${dot.x}%`, top: `${dot.y}%`, transform: 'translate(-50%, -50%)' }}
                  />
                ))}
              </div>

              <p className="text-lg font-semibold">Which numeral matches these dots?</p>

              <div className="flex gap-4 justify-center">
                {[1, 2, 3, 4, 5].map((num) => (
                  <Button
                    key={num}
                    onClick={() => selectNumeral(num)}
                    variant={selectedNumeral === num ? "default" : "outline"}
                    className={`w-16 h-16 text-3xl font-bold ${
                      feedback && selectedNumeral === num
                        ? feedback === 'correct'
                          ? 'bg-green-500 hover:bg-green-600'
                          : 'bg-red-500 hover:bg-red-600'
                        : ''
                    }`}
                    disabled={feedback !== null}
                  >
                    {num}
                  </Button>
                ))}
              </div>

              {feedback && (
                <div className={`p-4 rounded-lg ${
                  feedback === 'correct'
                    ? 'bg-green-500/20 text-green-700 dark:text-green-300'
                    : 'bg-red-500/20 text-red-700 dark:text-red-300'
                }`}>
                  <p className="font-bold text-lg">
                    {feedback === 'correct'
                      ? `✓ Correct! There are ${currentDots} dots, so the numeral is ${currentDots}!`
                      : '✗ Not quite! Count the dots again.'}
                  </p>
                  <Button onClick={showNewCard} variant="outline" className="mt-3">
                    Next Card
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const PracticeActivity = () => {
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [puffballCount, setPuffballCount] = useState(0);
  const [stickCount, setStickCount] = useState(0);
  const [selectedNumeral, setSelectedNumeral] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [roundsCompleted, setRoundsCompleted] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const rollDice = () => {
    const value = Math.floor(Math.random() * 5) + 1;
    setDiceValue(value);
    setPuffballCount(0);
    setStickCount(0);
    setSelectedNumeral(null);
    setShowFeedback(false);
  };

  const checkAnswer = () => {
    setShowFeedback(true);
    if (puffballCount === diceValue && stickCount === diceValue && selectedNumeral === diceValue) {
      setRoundsCompleted(roundsCompleted + 1);
      if (roundsCompleted + 1 >= 5) {
        setGameComplete(true);
      }
    }
  };

  const isCorrect = puffballCount === diceValue && stickCount === diceValue && selectedNumeral === diceValue;

  const dotPositions = {
    1: [{ x: 50, y: 50 }],
    2: [{ x: 35, y: 50 }, { x: 65, y: 50 }],
    3: [{ x: 35, y: 35 }, { x: 65, y: 35 }, { x: 50, y: 65 }],
    4: [{ x: 35, y: 35 }, { x: 65, y: 35 }, { x: 35, y: 65 }, { x: 65, y: 65 }],
    5: [{ x: 35, y: 35 }, { x: 65, y: 35 }, { x: 50, y: 50 }, { x: 35, y: 65 }, { x: 65, y: 65 }],
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Make Groups and Match</CardTitle>
        <CardDescription>Roll the die, make groups, and match the numeral (13 minutes)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!gameComplete ? (
          <>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Rounds Completed: {roundsCompleted}/5</p>
            </div>

            {!diceValue ? (
              <div className="text-center">
                <Button onClick={rollDice} size="lg" className="bg-primary">
                  🎲 Roll the Die
                </Button>
              </div>
            ) : (
              <>
                <div className="bg-accent/10 p-6 rounded-lg border-2 border-accent">
                  <h3 className="text-center font-bold text-lg mb-4">Dice Roll</h3>
                  <div className="flex justify-center">
                    <div className="relative w-32 h-32 bg-white dark:bg-gray-800 rounded-2xl border-4 border-gray-800 shadow-lg">
                      {dotPositions[diceValue as keyof typeof dotPositions].map((pos, idx) => (
                        <div
                          key={idx}
                          className="absolute w-6 h-6 bg-gray-900 dark:bg-white rounded-full"
                          style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)' }}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-center text-xl font-bold mt-4">You rolled {diceValue}!</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Puffballs */}
                  <Card className="p-4 bg-pink-50 dark:bg-pink-900/20 border-2 border-pink-200 dark:border-pink-800">
                    <h4 className="font-bold text-center mb-3">Puffballs</h4>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded min-h-[100px] flex items-center justify-center flex-wrap gap-2 mb-4">
                      {Array(puffballCount).fill('⚪').map((item, idx) => (
                        <span key={idx} className="text-4xl">{item}</span>
                      ))}
                    </div>
                    <div className="flex gap-2 justify-center">
                      <Button onClick={() => setPuffballCount(Math.max(0, puffballCount - 1))} disabled={puffballCount === 0}>-</Button>
                      <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded border font-bold">{puffballCount}</div>
                      <Button onClick={() => setPuffballCount(Math.min(7, puffballCount + 1))} disabled={puffballCount >= 7}>+</Button>
                    </div>
                  </Card>

                  {/* Sticks */}
                  <Card className="p-4 bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-200 dark:border-orange-800">
                    <h4 className="font-bold text-center mb-3">Craft Sticks</h4>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded min-h-[100px] flex items-center justify-center flex-wrap gap-2 mb-4">
                      {Array(stickCount).fill('🥢').map((item, idx) => (
                        <span key={idx} className="text-4xl">{item}</span>
                      ))}
                    </div>
                    <div className="flex gap-2 justify-center">
                      <Button onClick={() => setStickCount(Math.max(0, stickCount - 1))} disabled={stickCount === 0}>-</Button>
                      <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded border font-bold">{stickCount}</div>
                      <Button onClick={() => setStickCount(Math.min(7, stickCount + 1))} disabled={stickCount >= 7}>+</Button>
                    </div>
                  </Card>
                </div>

                {/* Numeral Selection */}
                <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800">
                  <h4 className="font-bold text-center mb-3">Pick the Matching Numeral</h4>
                  <div className="flex gap-3 justify-center">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <Button
                        key={num}
                        onClick={() => setSelectedNumeral(num)}
                        variant={selectedNumeral === num ? "default" : "outline"}
                        className="w-16 h-16 text-3xl font-bold"
                      >
                        {num}
                      </Button>
                    ))}
                  </div>
                </Card>

                {!showFeedback ? (
                  <Button 
                    onClick={checkAnswer}
                    disabled={puffballCount === 0 || stickCount === 0 || selectedNumeral === null}
                    size="lg"
                    className="w-full"
                  >
                    Check My Groups
                  </Button>
                ) : (
                  <div className={`p-6 rounded-lg text-center ${
                    isCorrect
                      ? 'bg-green-500/20 text-green-700 dark:text-green-300'
                      : 'bg-red-500/20 text-red-700 dark:text-red-300'
                  }`}>
                    <p className="font-bold text-xl mb-2">
                      {isCorrect
                        ? '✓ Perfect! All your groups match!'
                        : '✗ Not quite! Check your groups again.'}
                    </p>
                    {isCorrect && (
                      <p className="text-lg mb-4">
                        The numeral {diceValue} tells us there are {diceValue} objects in each group!
                      </p>
                    )}
                    <Button onClick={rollDice} size="lg" variant="outline">
                      {isCorrect ? 'Next Round' : 'Try Again'}
                    </Button>
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-8 rounded-lg border-2 border-green-200 dark:border-green-800 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-3xl font-bold text-green-700 dark:text-green-300 mb-4">
              Amazing Work!
            </h3>
            <p className="text-xl text-green-600 dark:text-green-400 mb-6">
              You've mastered making groups and matching numerals!
            </p>
            <Button size="lg" onClick={() => {
              setRoundsCompleted(0);
              setGameComplete(false);
              rollDice();
            }}>
              Practice More
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const StudentDebrief = ({ navigate }: { navigate: (path: string) => void }) => {
  const [isComplete, setIsComplete] = useState(false);

  const markLessonComplete = () => {
    const saved = localStorage.getItem('ethiostem-completed-lessons');
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes(23)) {
      completed.push(23);
      localStorage.setItem('ethiostem-completed-lessons', JSON.stringify(completed));
    }
    setIsComplete(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Debrief</CardTitle>
        <CardDescription>Reflect on today's learning (3 minutes)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="bg-accent/10 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Discussion Questions:</h4>
            <ul className="space-y-2 text-sm">
              <li>• What tools did we use to count in our lesson today?</li>
              <li>• How did you know how many puffballs or sticks to put in a group?</li>
              <li>• What number tells how many should be in each group?</li>
              <li>• What differences do you see between the shapes of the numbers 4 and 5?</li>
            </ul>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-2 border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold mb-2">🏠 Center Connection:</h4>
            <p className="text-sm">
              Practice making groups of 5 or less at the kitchen center. Diners can show how many vegetables they want using numerals, and the chef counts out the right number!
            </p>
          </div>
        </div>

        {!isComplete ? (
          <Button onClick={markLessonComplete} size="lg" className="w-full">
            Complete Lesson
          </Button>
        ) : (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-8 rounded-lg border-2 border-green-200 dark:border-green-800 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-4">
              Lesson Complete!
            </h3>
            <p className="text-lg text-green-600 dark:text-green-400 mb-6">
              Great job learning about groups and numerals today!
            </p>
            <Button size="lg" onClick={() => navigate("/activities/module-1")}>
              Continue Learning
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CountingMatching23;
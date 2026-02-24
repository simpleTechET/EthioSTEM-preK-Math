import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Music, Award, Sparkles } from "lucide-react";

const CountingActivity27 = () => {
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
            <h1 className="text-2xl font-bold text-primary">Lesson 27</h1>
            <p className="text-sm text-muted-foreground">Play a Game with Numbers to 5</p>
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
            <TabsTrigger value="bingo">Bingo Game</TabsTrigger>
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

          <TabsContent value="bingo">
            <BingoGame />
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
        <Award className="w-6 h-6" />
        Lesson Objective
      </CardTitle>
      <CardDescription>Learning through game play</CardDescription>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="bg-accent/20 p-6 rounded-lg">
        <h3 className="font-bold text-lg mb-3">🎯 Today's Goal</h3>
        <p className="text-lg">Play a game involving numbers to 5.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-card p-4 rounded-lg border border-border">
          <h4 className="font-semibold mb-2">⏱️ Lesson Structure (25 minutes)</h4>
          <ul className="space-y-2 text-sm">
            <li>• Fluency Practice (5 min)</li>
            <li>• Application Problem (3 min)</li>
            <li>• Concept Development (14 min)</li>
            <li>• Student Debrief (3 min)</li>
          </ul>
        </div>

        <div className="bg-card p-4 rounded-lg border border-border">
          <h4 className="font-semibold mb-2">🎓 Key Concept</h4>
          <p className="text-sm">
            Today we'll play BINGO! This game helps us recognize numbers 1-5 in different forms: numerals, dots, and pictures!
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
  const [pianoCount, setPianoCount] = useState(0);
  const [mixMatchStarted, setMixMatchStarted] = useState(false);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [matched, setMatched] = useState<number[]>([]);
  const [round, setRound] = useState(1);

  const pianoKeys = [
    { num: 1, finger: "Pinky", emoji: "🤙", pitch: "low" },
    { num: 2, finger: "Ring", emoji: "🤟", pitch: "low" },
    { num: 3, finger: "Middle", emoji: "🖕", pitch: "medium" },
    { num: 4, finger: "Index", emoji: "☝️", pitch: "medium-high" },
    { num: 5, finger: "Thumb", emoji: "👍", pitch: "high" },
  ];

  const cards = [
    { id: 1, num: 1, type: "numeral", display: "1" },
    { id: 2, num: 1, type: "dots", display: "⚫" },
    { id: 3, num: 2, type: "numeral", display: "2" },
    { id: 4, num: 2, type: "dots", display: "⚫⚫" },
    { id: 5, num: 3, type: "numeral", display: "3" },
    { id: 6, num: 3, type: "dots", display: "⚫⚫⚫" },
    { id: 7, num: 4, type: "numeral", display: "4" },
    { id: 8, num: 4, type: "dots", display: "⚫⚫⚫⚫" },
    { id: 9, num: 5, type: "numeral", display: "5" },
    { id: 10, num: 5, type: "dots", display: "⚫⚫⚫⚫⚫" },
  ];

  const handlePianoKey = (keyNum: number) => {
    if (keyNum === pianoCount + 1 && pianoCount < 5) {
      setPianoCount(pianoCount + 1);
    }
  };

  const resetPiano = () => {
    setPianoCount(0);
  };

  const handleCardClick = (cardId: number) => {
    if (matched.includes(cardId)) return;
    
    if (selectedCard === null) {
      setSelectedCard(cardId);
    } else {
      const card1 = cards.find(c => c.id === selectedCard);
      const card2 = cards.find(c => c.id === cardId);
      
      if (card1 && card2 && card1.num === card2.num && card1.id !== card2.id) {
        setMatched([...matched, selectedCard, cardId]);
        setSelectedCard(null);
      } else {
        setTimeout(() => setSelectedCard(null), 500);
      }
    }
  };

  const resetMixMatch = () => {
    setMatched([]);
    setSelectedCard(null);
    setRound(round + 1);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music className="w-6 h-6" />
            Counting the Math Way on Piano
          </CardTitle>
          <CardDescription>Count with changing pitch - low to high! (2 minutes)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border-2 border-purple-200">
              <p className="text-center text-sm mb-2">
                <strong>New challenge:</strong> Say each number in a different pitch!
              </p>
              <p className="text-center text-xs text-muted-foreground">
                1 = deepest voice, 3 = normal voice, 5 = squeaky voice!
              </p>
            </div>

            <div className="flex justify-center gap-2 mb-4">
              {pianoKeys.map(key => (
                <div 
                  key={key.num}
                  className={`text-center transition-all ${
                    pianoCount >= key.num ? 'scale-110 opacity-100' : 'opacity-40'
                  }`}
                >
                  <div className="text-3xl mb-1">{key.emoji}</div>
                  <div className="text-xs font-bold">{key.num}</div>
                  <div className="text-xs text-muted-foreground">{key.pitch}</div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-xl">
              <div className="flex justify-center gap-1">
                {pianoKeys.map(key => (
                  <button
                    key={key.num}
                    onClick={() => handlePianoKey(key.num)}
                    className={`
                      w-16 h-40 rounded-b-lg transition-all border-2 border-gray-700
                      ${pianoCount >= key.num
                        ? 'bg-purple-400 shadow-lg shadow-purple-500/50 transform translate-y-1'
                        : 'bg-white hover:bg-gray-100'
                      }
                    `}
                  >
                    <div className="h-full flex items-end justify-center pb-2">
                      <span className={`text-xl font-bold ${
                        pianoCount >= key.num ? 'text-white' : 'text-gray-800'
                      }`}>
                        {key.num}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="text-center space-y-2">
              <p className="text-lg">Keys played: <span className="text-3xl font-bold text-purple-700">{pianoCount}</span> / 5</p>
              <Button onClick={resetPiano} variant="outline">Reset Piano</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            Mix and Match - Dots and Numerals
          </CardTitle>
          <CardDescription>Match numerals with their dot patterns (3 minutes)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {!mixMatchStarted ? (
              <div className="text-center space-y-4">
                <p className="text-lg">Match each numeral with its dots!</p>
                <Button onClick={() => setMixMatchStarted(true)} size="lg">
                  Start Matching Game
                </Button>
              </div>
            ) : (
              <>
                <div className="text-center mb-4">
                  <p className="text-sm text-muted-foreground">Round {round} - Matched: {matched.length / 2} / 5</p>
                </div>

                <div className="grid grid-cols-5 gap-4">
                  {cards.map(card => {
                    const isMatched = matched.includes(card.id);
                    const isSelected = selectedCard === card.id;
                    
                    return (
                      <button
                        key={card.id}
                        onClick={() => handleCardClick(card.id)}
                        disabled={isMatched}
                        className={`
                          aspect-square p-4 rounded-lg border-4 transition-all
                          ${isMatched ? 'bg-green-100 border-green-500 opacity-50' : 
                            isSelected ? 'bg-blue-100 border-blue-500 scale-105' :
                            'bg-white border-gray-300 hover:border-blue-300 hover:scale-105'}
                        `}
                      >
                        <div className="flex flex-col items-center justify-center h-full">
                          <div className={`${card.type === 'dots' ? 'text-2xl' : 'text-5xl'} font-bold`}>
                            {card.display}
                          </div>
                        </div>
                        {isMatched && (
                          <div className="text-2xl">✓</div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {matched.length === cards.length && (
                  <div className="bg-green-500/20 text-green-700 p-6 rounded-lg text-center">
                    <p className="font-bold text-xl mb-3">🎉 All Matched!</p>
                    <Button onClick={resetMixMatch} size="lg">
                      Play Again
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ApplicationProblem = () => {
  const [currentNumber, setCurrentNumber] = useState(1);
  const [showItems, setShowItems] = useState(false);

  const representations = {
    1: { emoji: "🐻", count: 1, name: "bear" },
    2: { emoji: "🐄", count: 2, name: "cows" },
    3: { emoji: "🍎", count: 3, name: "apples" },
    4: { emoji: "⭐", count: 4, name: "stars" },
    5: { emoji: "5", count: 1, name: "numeral" },
  };

  const current = representations[currentNumber as keyof typeof representations];

  const handleShowNumber = (num: number) => {
    setCurrentNumber(num);
    setShowItems(true);
  };

  const resetActivity = () => {
    setCurrentNumber(1);
    setShowItems(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Show Me the Number!</CardTitle>
        <CardDescription>Explore different ways to show numbers 1-5 (3 minutes)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <p className="text-lg mb-6">Click a number to see what's in the bag!</p>
          <div className="flex gap-3 justify-center mb-8">
            {[1, 2, 3, 4, 5].map(num => (
              <Button
                key={num}
                onClick={() => handleShowNumber(num)}
                variant={currentNumber === num && showItems ? "default" : "outline"}
                className="w-16 h-16 text-2xl font-bold"
              >
                {num}
              </Button>
            ))}
          </div>

          {showItems && (
            <div className="bg-accent/10 p-8 rounded-lg border-2 border-accent">
              <div className="text-6xl mb-4">
                {Array(current.count).fill(current.emoji).map((emoji, idx) => (
                  <span key={idx} className="mx-1">{emoji}</span>
                ))}
              </div>
              <p className="text-xl font-bold">
                {currentNumber === 5 ? "The numeral 5" : `${current.count} ${current.name}${current.count > 1 ? 's' : ''}`}
              </p>
            </div>
          )}

          <div className="mt-6">
            <Button onClick={resetActivity} variant="outline">
              Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const BingoGame = () => {
  const [board, setBoard] = useState<(number | null)[][]>([]);
  const [chips, setChips] = useState<boolean[][]>([]);
  const [drawnCard, setDrawnCard] = useState<{num: number, type: 'numeral' | 'dots'} | null>(null);
  const [gameWon, setGameWon] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const representations = {
    1: ["1", "🐻", "⚫"],
    2: ["2", "🍎🍎", "⚫⚫"],
    3: ["3", "⭐⭐⭐", "⚫⚫⚫"],
    4: ["4", "🐔🐔🐔🐔", "⚫⚫⚫⚫"],
    5: ["5", "🐟🐟🐟🐟🐟", "⚫⚫⚫⚫⚫"],
  };

  const generateBoard = () => {
    const newBoard: (number | null)[][] = [];
    const numbers = [1, 2, 3, 4, 5];
    
    for (let i = 0; i < 3; i++) {
      const row: (number | null)[] = [];
      for (let j = 0; j < 3; j++) {
        if (i === 1 && j === 1) {
          row.push(null); // Free space
        } else {
          row.push(numbers[Math.floor(Math.random() * numbers.length)]);
        }
      }
      newBoard.push(row);
    }
    
    setBoard(newBoard);
    setChips(Array(3).fill(null).map(() => Array(3).fill(false)));
    setChips(prev => {
      const updated = [...prev];
      updated[1][1] = true; // Free space
      return updated;
    });
    setGameWon(false);
    setGameStarted(true);
  };

  const drawCard = () => {
    const num = Math.floor(Math.random() * 5) + 1;
    const type = Math.random() > 0.5 ? 'numeral' : 'dots';
    setDrawnCard({ num, type });
  };

  const placeChip = (row: number, col: number) => {
    if (gameWon || chips[row][col] || !drawnCard) return;
    
    if (board[row][col] === drawnCard.num) {
      const newChips = chips.map(r => [...r]);
      newChips[row][col] = true;
      setChips(newChips);
      checkWin(newChips);
    }
  };

  const checkWin = (currentChips: boolean[][]) => {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (currentChips[i].every(chip => chip)) {
        setGameWon(true);
        return;
      }
    }
    
    // Check columns
    for (let j = 0; j < 3; j++) {
      if (currentChips.every(row => row[j])) {
        setGameWon(true);
        return;
      }
    }
    
    // Check diagonals
    if (currentChips[0][0] && currentChips[1][1] && currentChips[2][2]) {
      setGameWon(true);
      return;
    }
    if (currentChips[0][2] && currentChips[1][1] && currentChips[2][0]) {
      setGameWon(true);
      return;
    }
  };

  const getCellRepresentation = (num: number | null) => {
    if (num === null) return "FREE";
    const reps = representations[num as keyof typeof representations];
    return reps[Math.floor(Math.random() * reps.length)];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="w-6 h-6" />
          BINGO Game!
        </CardTitle>
        <CardDescription>Get 3 in a row to win! (14 minutes)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!gameStarted ? (
          <div className="text-center space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-8 rounded-lg border-2">
              <h3 className="text-3xl font-bold mb-4">Let's Play BINGO!</h3>
              <p className="text-lg mb-6">Match numbers to get 3 chips in a row!</p>
              <div className="text-6xl mb-4">🎯</div>
            </div>
            <Button onClick={generateBoard} size="lg" className="text-lg px-8">
              Start New Game
            </Button>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Bingo Board */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-center">Your BINGO Board</h3>
                <div className="inline-grid grid-cols-3 gap-2 p-4 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border-4 border-yellow-400">
                  {board.map((row, i) => (
                    row.map((cell, j) => (
                      <button
                        key={`${i}-${j}`}
                        onClick={() => placeChip(i, j)}
                        disabled={chips[i][j] || gameWon}
                        className={`
                          w-24 h-24 rounded-lg border-4 text-2xl font-bold transition-all
                          ${chips[i][j] 
                            ? 'bg-red-500 text-white border-red-700' 
                            : 'bg-white border-gray-300 hover:border-blue-400 hover:scale-105'}
                          ${cell === null ? 'bg-green-200 border-green-400' : ''}
                        `}
                      >
                        {chips[i][j] ? '🔴' : getCellRepresentation(cell)}
                      </button>
                    ))
                  ))}
                </div>
              </div>

              {/* Card Drawing Area */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-center">Draw a Card</h3>
                
                {drawnCard ? (
                  <div className="bg-white dark:bg-gray-800 border-4 border-blue-500 rounded-lg p-8 text-center">
                    <p className="text-sm text-muted-foreground mb-4">Card shows:</p>
                    <div className="text-6xl font-bold mb-4">
                      {drawnCard.type === 'numeral' ? drawnCard.num : Array(drawnCard.num).fill('⚫').join('')}
                    </div>
                    <p className="text-2xl font-bold text-blue-600">
                      Number {drawnCard.num}
                    </p>
                  </div>
                ) : (
                  <div className="bg-gray-100 dark:bg-gray-800 border-4 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <p className="text-muted-foreground">No card drawn yet</p>
                  </div>
                )}

                <Button 
                  onClick={drawCard} 
                  size="lg" 
                  className="w-full"
                  disabled={gameWon}
                >
                  Draw Next Card
                </Button>

                {gameWon && (
                  <div className="bg-green-500/20 text-green-700 dark:text-green-300 p-6 rounded-lg text-center">
                    <div className="text-6xl mb-4">🎉</div>
                    <p className="font-bold text-2xl mb-4">BINGO!</p>
                    <p className="mb-4">You won!</p>
                    <Button onClick={generateBoard} size="lg">
                      Play Again
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </>
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
    if (!completed.includes(27)) {
      completed.push(27);
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
              <li>• Which numbers on your bingo board were the hardest to find? Why?</li>
              <li>• Is it the same box as your friends' boards?</li>
              <li>• Are there the same number of items in different representations?</li>
              <li>• Did you feel lucky sometimes? Why or why not?</li>
            </ul>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-2 border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold mb-2">🏠 Center Connection:</h4>
            <p className="text-sm">
              Continue playing bingo during centers! One student can be the caller, picking cards and announcing numbers. Students can even create their own game boards!
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
              Great job playing and learning with numbers today!
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

export default CountingActivity27;
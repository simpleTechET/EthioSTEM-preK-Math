import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Hand, Circle, Sparkles, MessageCircle } from "lucide-react";

const CountingMatching28 = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("fluency");

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-4 shadow-lg">
        <div className="container mx-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/activities/module-1")}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Lesson 28: Counting with Stories</h1>
            <p className="text-amber-100">Count 1, 2, 3, 4, 5 with stories</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4 md:p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="fluency" className="flex items-center gap-2">
              <Hand className="h-4 w-4" />
              <span className="hidden sm:inline">Fluency</span>
            </TabsTrigger>
            <TabsTrigger value="application" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline">Application</span>
            </TabsTrigger>
            <TabsTrigger value="concept" className="flex items-center gap-2">
              <Circle className="h-4 w-4" />
              <span className="hidden sm:inline">Concept</span>
            </TabsTrigger>
            <TabsTrigger value="debrief" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Debrief</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="fluency">
            <FluencyPractice onComplete={() => setActiveTab("application")} />
          </TabsContent>

          <TabsContent value="application">
            <ApplicationProblem onComplete={() => setActiveTab("concept")} />
          </TabsContent>

          <TabsContent value="concept">
            <ConceptDevelopment onComplete={() => setActiveTab("debrief")} />
          </TabsContent>

          <TabsContent value="debrief">
            <StudentDebrief />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

// Fluency Practice Component
const FluencyPractice = ({ onComplete }: { onComplete: () => void }) => {
  const [activity, setActivity] = useState<"piano" | "merrygoround">("piano");
  const [pianoCount, setPianoCount] = useState(0);
  const [pianoComplete, setPianoComplete] = useState(false);
  const [merryGoRoundComplete, setMerryGoRoundComplete] = useState(false);
  const [teddies, setTeddies] = useState<number[]>([]);
  const [targetNumber, setTargetNumber] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [merryRounds, setMerryRounds] = useState(0);

  const handlePianoTap = () => {
    if (pianoCount < 5) {
      const newCount = pianoCount + 1;
      setPianoCount(newCount);
      if (newCount === 5) {
        setPianoComplete(true);
      }
    }
  };

  const resetPiano = () => {
    setPianoCount(0);
    setPianoComplete(false);
  };

  const startMerryGoRound = () => {
    const newTarget = Math.floor(Math.random() * 5) + 1;
    setTargetNumber(newTarget);
    setTeddies([]);
    setFeedback("");
  };

  const addTeddy = () => {
    if (teddies.length < 5) {
      setTeddies([...teddies, teddies.length + 1]);
    }
  };

  const checkMerryAnswer = () => {
    if (teddies.length === targetNumber) {
      setFeedback("🎉 Perfect! You put the right number of teddies on the ride!");
      setMerryRounds(merryRounds + 1);
      if (merryRounds >= 2) {
        setMerryGoRoundComplete(true);
      }
    } else {
      setFeedback(`Not quite! The number was ${targetNumber}. Try again!`);
    }
  };

  const fingerLabels = ["Pinky", "Ring", "Middle", "Index", "Thumb"];

  return (
    <Card className="border-2 border-amber-200">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-amber-800 mb-4">Fluency Practice (6 minutes)</h2>

        <div className="flex gap-2 mb-6">
          <Button
            variant={activity === "piano" ? "default" : "outline"}
            onClick={() => setActivity("piano")}
            className={activity === "piano" ? "bg-amber-500 hover:bg-amber-600" : ""}
          >
            Imaginary Piano
          </Button>
          <Button
            variant={activity === "merrygoround" ? "default" : "outline"}
            onClick={() => setActivity("merrygoround")}
            className={activity === "merrygoround" ? "bg-amber-500 hover:bg-amber-600" : ""}
          >
            Merry-Go-Round
          </Button>
        </div>

        {activity === "piano" && (
          <div className="space-y-6">
            <div className="bg-amber-50 p-4 rounded-lg">
              <p className="text-amber-700 mb-4">
                🎹 <strong>Imaginary Piano:</strong> Tap each finger starting with your pinky! 
                Imagine the numbers 1-5 as you count. Count louder as the numbers get bigger!
              </p>
            </div>

            <div className="flex justify-center gap-2 md:gap-4">
              {[1, 2, 3, 4, 5].map((num) => (
                <div
                  key={num}
                  onClick={num === pianoCount + 1 ? handlePianoTap : undefined}
                  className={`
                    w-12 h-20 md:w-16 md:h-24 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all
                    ${num <= pianoCount 
                      ? "bg-amber-500 text-white scale-105 shadow-lg" 
                      : num === pianoCount + 1 
                        ? "bg-amber-200 hover:bg-amber-300 animate-pulse border-2 border-amber-400" 
                        : "bg-gray-200 text-gray-400"
                    }
                  `}
                >
                  <span className="text-2xl font-bold">{num}</span>
                  <span className="text-xs mt-1">{fingerLabels[num - 1]}</span>
                </div>
              ))}
            </div>

            {pianoCount > 0 && (
              <p className="text-center text-2xl font-bold text-amber-700">
                {pianoCount === 1 && "1... (whisper)"}
                {pianoCount === 2 && "1, 2... (soft)"}
                {pianoCount === 3 && "1, 2, 3! (normal voice)"}
                {pianoCount === 4 && "1, 2, 3, 4! (louder)"}
                {pianoCount === 5 && "1, 2, 3, 4, 5! (SHOUT!) 🎉"}
              </p>
            )}

            {pianoComplete && (
              <div className="text-center space-y-4">
                <p className="text-green-600 font-bold text-xl">Great job counting to 5!</p>
                <Button onClick={resetPiano} variant="outline">Try Again</Button>
              </div>
            )}
          </div>
        )}

        {activity === "merrygoround" && (
          <div className="space-y-6">
            <div className="bg-amber-50 p-4 rounded-lg">
              <p className="text-amber-700 mb-2">
                🎠 <strong>Merry-Go-Round:</strong> Put the correct number of teddy bears on the ride!
              </p>
            </div>

            {targetNumber === 0 ? (
              <div className="text-center">
                <Button onClick={startMerryGoRound} className="bg-amber-500 hover:bg-amber-600">
                  Roll the Number!
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="inline-block bg-amber-500 text-white text-4xl font-bold p-6 rounded-xl shadow-lg">
                    {targetNumber}
                  </div>
                  <p className="mt-2 text-amber-700">Put {targetNumber} teddy bear{targetNumber > 1 ? "s" : ""} on the ride!</p>
                </div>

                {/* Merry-go-round plate */}
                <div className="relative mx-auto w-48 h-48 md:w-64 md:h-64">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-200 to-purple-200 border-4 border-purple-300 shadow-lg">
                    {/* Starting dot */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-red-500 rounded-full"></div>
                    
                    {/* Teddies on the plate */}
                    {teddies.map((_, index) => {
                      const angle = (index * 72 - 90) * (Math.PI / 180);
                      const radius = 70;
                      const x = 50 + radius * Math.cos(angle) * 0.8;
                      const y = 50 + radius * Math.sin(angle) * 0.8;
                      return (
                        <div
                          key={index}
                          className="absolute text-3xl transform -translate-x-1/2 -translate-y-1/2 animate-bounce"
                          style={{ left: `${x}%`, top: `${y}%` }}
                        >
                          🧸
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-center gap-4">
                  <Button 
                    onClick={addTeddy} 
                    disabled={teddies.length >= 5}
                    className="bg-pink-500 hover:bg-pink-600"
                  >
                    Add Teddy 🧸
                  </Button>
                  <Button onClick={checkMerryAnswer} className="bg-green-500 hover:bg-green-600">
                    Check Answer ✓
                  </Button>
                  <Button 
                    onClick={() => { setTeddies([]); setFeedback(""); }} 
                    variant="outline"
                  >
                    Reset
                  </Button>
                </div>

                <p className="text-center text-xl">Teddies on ride: {teddies.length}</p>

                {feedback && (
                  <div className={`text-center p-4 rounded-lg ${feedback.includes("Perfect") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    <p className="font-bold">{feedback}</p>
                    {feedback.includes("Perfect") && (
                      <Button onClick={startMerryGoRound} className="mt-2 bg-amber-500 hover:bg-amber-600">
                        Next Round!
                      </Button>
                    )}
                  </div>
                )}
              </div>
            )}

            {merryGoRoundComplete && (
              <p className="text-center text-green-600 font-bold">🎉 Excellent work on Merry-Go-Round!</p>
            )}
          </div>
        )}

        {pianoComplete && merryGoRoundComplete && (
          <div className="mt-6 text-center">
            <Button onClick={onComplete} className="bg-green-500 hover:bg-green-600">
              Continue to Application Problem →
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Application Problem Component
const ApplicationProblem = ({ onComplete }: { onComplete: () => void }) => {
  const [snakeCount, setSnakeCount] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const addSnake = () => {
    if (snakeCount < 5) {
      setSnakeCount(snakeCount + 1);
      setShowQuestion(true);
      setSelectedAnswer(null);
      setIsCorrect(null);
    }
  };

  const checkAnswer = (answer: number) => {
    setSelectedAnswer(answer);
    setIsCorrect(answer === snakeCount);
  };

  const snakeStories = [
    "Ananya the snake is slithering through the desert by herself.",
    "James joined Ananya! They slither side by side.",
    "Another friend joined! Three snakes slither together.",
    "One more snake! Four snakes make paths in the sand.",
    "Five snakes slithering together through the desert!"
  ];

  return (
    <Card className="border-2 border-orange-200">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-orange-800 mb-4">Application Problem (3 minutes)</h2>

        <div className="bg-orange-50 p-4 rounded-lg mb-6">
          <p className="text-orange-700">
            🐍 <strong>Snake Story:</strong> Watch as snakes join to slither through the desert! 
            Count how many snakes are slithering together.
          </p>
        </div>

        {/* Desert scene */}
        <div className="relative bg-gradient-to-b from-amber-200 to-amber-300 rounded-xl p-6 mb-6 min-h-[200px] overflow-hidden">
          {/* Sun */}
          <div className="absolute top-4 right-4 w-12 h-12 bg-yellow-400 rounded-full shadow-lg"></div>
          
          {/* Sand dunes */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-amber-400 rounded-t-full"></div>
          
          {/* Snakes */}
          <div className="flex justify-center items-end gap-2 relative z-10 min-h-[120px]">
            {Array.from({ length: snakeCount }).map((_, index) => (
              <div 
                key={index} 
                className="text-4xl md:text-5xl animate-bounce"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                🐍
              </div>
            ))}
          </div>
        </div>

        {snakeCount > 0 && (
          <p className="text-center text-lg text-orange-700 mb-4 font-medium">
            {snakeStories[snakeCount - 1]}
          </p>
        )}

        {showQuestion && (
          <div className="bg-white p-4 rounded-lg border-2 border-orange-200 mb-4">
            <p className="text-center text-lg font-bold text-orange-800 mb-4">
              How many snakes are slithering through the desert?
            </p>
            <div className="flex justify-center gap-3 flex-wrap">
              {[1, 2, 3, 4, 5].map((num) => (
                <Button
                  key={num}
                  onClick={() => checkAnswer(num)}
                  variant={selectedAnswer === num ? (isCorrect ? "default" : "destructive") : "outline"}
                  className={`w-12 h-12 text-xl font-bold ${
                    selectedAnswer === num && isCorrect ? "bg-green-500" : ""
                  }`}
                  disabled={isCorrect === true}
                >
                  {num}
                </Button>
              ))}
            </div>
            {isCorrect !== null && (
              <p className={`text-center mt-3 font-bold ${isCorrect ? "text-green-600" : "text-red-600"}`}>
                {isCorrect ? "🎉 Correct!" : "Try again!"}
              </p>
            )}
          </div>
        )}

        <div className="flex justify-center gap-4">
          {snakeCount < 5 && (
            <Button 
              onClick={addSnake} 
              className="bg-orange-500 hover:bg-orange-600"
              disabled={showQuestion && !isCorrect}
            >
              {snakeCount === 0 ? "Start Story" : "Add Another Snake"} 🐍
            </Button>
          )}
          {snakeCount === 5 && isCorrect && (
            <Button onClick={onComplete} className="bg-green-500 hover:bg-green-600">
              Continue to Concept Development →
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Concept Development Component
const ConceptDevelopment = ({ onComplete }: { onComplete: () => void }) => {
  const [sandLines, setSandLines] = useState<number[]>([]);
  const [targetCount, setTargetCount] = useState(1);
  const [showCheck, setShowCheck] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [rounds, setRounds] = useState(0);

  const addFingerLine = () => {
    if (sandLines.length < 5) {
      setSandLines([...sandLines, sandLines.length + 1]);
      setShowCheck(true);
    }
  };

  const checkAnswer = () => {
    if (sandLines.length === targetCount) {
      setFeedback(`🎉 Perfect! ${targetCount} snake${targetCount > 1 ? "s" : ""} made ${targetCount} line${targetCount > 1 ? "s" : ""} in the sand!`);
      if (targetCount < 5) {
        setTimeout(() => {
          setTargetCount(targetCount + 1);
          setSandLines([]);
          setFeedback("");
          setShowCheck(false);
          setRounds(rounds + 1);
        }, 1500);
      } else {
        setRounds(5);
      }
    } else {
      setFeedback(`Not quite! You need ${targetCount} line${targetCount > 1 ? "s" : ""}. Try again!`);
    }
  };

  const resetSand = () => {
    setSandLines([]);
    setShowCheck(false);
    setFeedback("");
  };

  return (
    <Card className="border-2 border-yellow-200">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-yellow-800 mb-4">Concept Development (13 minutes)</h2>

        <div className="bg-yellow-50 p-4 rounded-lg mb-6">
          <p className="text-yellow-700">
            🏜️ <strong>Snakes in the Sand:</strong> Slide your fingers through the sand to show 
            how many snakes are slithering! Each finger makes one line, just like a snake's path.
          </p>
        </div>

        <div className="text-center mb-4">
          <p className="text-xl font-bold text-yellow-800">
            Show {targetCount} snake{targetCount > 1 ? "s" : ""} slithering through the desert!
          </p>
          <p className="text-yellow-600">Use your fingers to draw lines in the sand.</p>
        </div>

        {/* Sand tray */}
        <div className="relative mx-auto max-w-md bg-gradient-to-b from-amber-200 to-amber-400 rounded-xl p-6 mb-6 min-h-[200px] border-4 border-amber-600 shadow-inner">
          <div className="flex justify-center gap-4 h-full items-center">
            {sandLines.map((_, index) => (
              <div
                key={index}
                className="w-3 h-32 bg-amber-700 rounded-full shadow-inner animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              />
            ))}
            {sandLines.length === 0 && (
              <p className="text-amber-700 text-center">Tap to slide your finger through the sand!</p>
            )}
          </div>
        </div>

        {/* Finger guide */}
        <div className="flex justify-center gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((num) => (
            <div
              key={num}
              className={`w-10 h-14 rounded-t-full flex items-center justify-center text-sm font-bold transition-all ${
                num <= sandLines.length 
                  ? "bg-amber-500 text-white" 
                  : num <= targetCount 
                    ? "bg-amber-200 text-amber-700" 
                    : "bg-gray-200 text-gray-400"
              }`}
            >
              {num}
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 mb-4">
          <Button 
            onClick={addFingerLine}
            disabled={sandLines.length >= 5}
            className="bg-amber-500 hover:bg-amber-600"
          >
            Slide Finger 👆
          </Button>
          <Button onClick={resetSand} variant="outline">
            Smooth Sand 🌊
          </Button>
          {showCheck && (
            <Button onClick={checkAnswer} className="bg-green-500 hover:bg-green-600">
              Check ✓
            </Button>
          )}
        </div>

        <p className="text-center text-lg font-bold text-amber-700 mb-4">
          Lines in sand: {sandLines.length}
        </p>

        {feedback && (
          <div className={`text-center p-4 rounded-lg ${
            feedback.includes("Perfect") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}>
            <p className="font-bold">{feedback}</p>
          </div>
        )}

        {rounds >= 5 && (
          <div className="mt-6 text-center">
            <p className="text-green-600 font-bold text-xl mb-4">🎉 You showed all 5 numbers!</p>
            <Button onClick={onComplete} className="bg-green-500 hover:bg-green-600">
              Continue to Debrief →
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Student Debrief Component
const StudentDebrief = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [completed, setCompleted] = useState(false);

  const questions = [
    {
      question: "Show me 5 snakes on your fingers! How many fingers did you use?",
      options: [3, 4, 5],
      correct: 5,
      emoji: "🖐️"
    },
    {
      question: "If 1 snake is slithering, then another joins, how many snakes are there now?",
      options: [1, 2, 3],
      correct: 2,
      emoji: "🐍"
    },
    {
      question: "If 3 snakes make paths in the sand, how many lines would you see?",
      options: [2, 3, 4],
      correct: 3,
      emoji: "〰️"
    },
    {
      question: "If you start with 5 snakes and 1 goes home, how many are left?",
      options: [3, 4, 5],
      correct: 4,
      emoji: "🏠"
    }
  ];

  const checkAnswer = (answer: number) => {
    setSelectedAnswer(answer);
    const correct = answer === questions[currentQuestion].correct;
    setIsCorrect(correct);
    
    if (correct) {
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
          setIsCorrect(null);
        } else {
          setCompleted(true);
        }
      }, 1000);
    }
  };

  return (
    <Card className="border-2 border-green-200">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-green-800 mb-4">Student Debrief (3 minutes)</h2>

        <div className="bg-green-50 p-4 rounded-lg mb-6">
          <p className="text-green-700">
            🎯 <strong>Let's Reflect:</strong> Answer these questions about counting with stories!
          </p>
        </div>

        {!completed ? (
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-4xl mb-4 block">{questions[currentQuestion].emoji}</span>
              <p className="text-xl font-bold text-green-800 mb-6">
                {questions[currentQuestion].question}
              </p>
            </div>

            <div className="flex justify-center gap-4">
              {questions[currentQuestion].options.map((option) => (
                <Button
                  key={option}
                  onClick={() => checkAnswer(option)}
                  variant={selectedAnswer === option ? (isCorrect ? "default" : "destructive") : "outline"}
                  className={`w-16 h-16 text-2xl font-bold ${
                    selectedAnswer === option && isCorrect ? "bg-green-500" : ""
                  }`}
                  disabled={isCorrect === true}
                >
                  {option}
                </Button>
              ))}
            </div>

            {isCorrect !== null && (
              <p className={`text-center text-xl font-bold ${isCorrect ? "text-green-600" : "text-red-600"}`}>
                {isCorrect ? "🎉 Correct!" : "Try again!"}
              </p>
            )}

            <div className="flex justify-center gap-2 mt-4">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index < currentQuestion ? "bg-green-500" : 
                    index === currentQuestion ? "bg-green-300" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <div className="text-6xl">🏆</div>
            <h3 className="text-2xl font-bold text-green-700">
              Congratulations! You completed Lesson 28!
            </h3>
            <p className="text-green-600">
              You learned to count 1, 2, 3, 4, 5 with stories!
            </p>
            
            <div className="bg-green-100 p-4 rounded-lg">
              <p className="text-green-700 font-medium">
                🌟 Remember: You can use your fingers to show numbers, just like snakes making paths in the sand!
              </p>
            </div>

            <Button 
              onClick={() => navigate("/activities/module-1")}
              className="bg-green-500 hover:bg-green-600"
            >
              Back to Activities
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CountingMatching28;
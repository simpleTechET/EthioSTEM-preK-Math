import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Volume2, RotateCcw } from "lucide-react";

type LessonPhase = "intro" | "compose" | "decompose" | "practice" | "complete";

interface PuzzlePiece {
  left: number;
  right: number;
}

const PUZZLES: PuzzlePiece[] = [
  { left: 4, right: 4 },
  { left: 5, right: 3 },
  { left: 6, right: 2 },
  { left: 7, right: 1 },
  { left: 3, right: 5 },
  { left: 2, right: 6 },
];

const CUBE_COLORS = [
  "#ef4444", // red
  "#f97316", // orange
  "#eab308", // yellow
  "#22c55e", // green
  "#3b82f6", // blue
  "#8b5cf6", // purple
  "#ec4899", // pink
  "#06b6d4", // cyan
];

const Compose8Lesson16 = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<LessonPhase>("intro");
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [isComposed, setIsComposed] = useState(false);
  const [countingIndex, setCountingIndex] = useState(-1);
  const [showNumeral, setShowNumeral] = useState(false);
  const [practiceBreaks, setPracticeBreaks] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const hasSpokenRef = useRef<Record<string, boolean>>({});

  const speak = (text: string, key?: string) => {
    if (key && hasSpokenRef.current[key]) return;
    if (key) hasSpokenRef.current[key] = true;
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (phase === "intro") {
      setTimeout(() => {
        speak("Welcome to Lesson 16! Today we will compose 8 and decompose it into two parts. We will also learn the numeral 8!", "intro");
      }, 500);
    } else if (phase === "compose") {
      speak("Watch as we put two sticks of 4 cubes together to make 8!", "compose");
    } else if (phase === "decompose") {
      speak("Now let's break 8 apart into different pieces. Tap on the stick to break it!", "decompose");
    } else if (phase === "practice") {
      speak("Great job! Now practice breaking 8 into different parts. Match the puzzle!", "practice");
    } else if (phase === "complete") {
      speak("Wonderful! You learned that 8 can be made from different parts. You also learned the numeral 8!", "complete");
    }
  }, [phase]);

  const handleCompose = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsComposed(true);
    
    // Count the cubes
    let count = 0;
    const countInterval = setInterval(() => {
      if (count < 8) {
        setCountingIndex(count);
        speak((count + 1).toString());
        count++;
      } else {
        clearInterval(countInterval);
        setTimeout(() => {
          setShowNumeral(true);
          speak("8 cubes! This is the numeral 8. Trace it with your finger!");
          setIsAnimating(false);
        }, 500);
      }
    }, 400);
  };

  const handleDecompose = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsComposed(false);
    setCountingIndex(-1);
    setShowNumeral(false);
    
    setTimeout(() => {
      const puzzle = PUZZLES[currentPuzzle];
      speak(`We broke 8 into ${puzzle.left} and ${puzzle.right}!`);
      setIsAnimating(false);
    }, 500);
  };

  const handleNextPuzzle = () => {
    if (currentPuzzle < PUZZLES.length - 1) {
      setCurrentPuzzle(prev => prev + 1);
      setIsComposed(false);
      setCountingIndex(-1);
      setShowNumeral(false);
    } else if (phase === "decompose") {
      setPhase("practice");
      setCurrentPuzzle(0);
      setIsComposed(true);
      setPracticeBreaks([]);
    }
  };

  const handlePracticeBreak = (breakPoint: number) => {
    if (practiceBreaks.includes(breakPoint)) return;
    
    setPracticeBreaks([...practiceBreaks, breakPoint]);
    const left = breakPoint;
    const right = 8 - breakPoint;
    speak(`${left} and ${right} make 8!`);
  };

  const resetPractice = () => {
    setPracticeBreaks([]);
  };

  const renderCubeStick = (count: number, startIndex: number = 0, isRight: boolean = false) => {
    return (
      <div className={`flex flex-col gap-1 ${isRight ? 'ml-8' : ''}`}>
        {Array.from({ length: count }).map((_, i) => {
          const globalIndex = startIndex + i;
          const isHighlighted = countingIndex === globalIndex;
          return (
            <div
              key={i}
              className={`w-12 h-12 rounded-lg border-2 border-white/50 shadow-lg transition-all duration-300 flex items-center justify-center text-white font-bold text-lg ${
                isHighlighted ? 'scale-125 ring-4 ring-yellow-400' : ''
              }`}
              style={{ backgroundColor: CUBE_COLORS[globalIndex % CUBE_COLORS.length] }}
            >
              {countingIndex >= globalIndex && phase !== "practice" && globalIndex + 1}
            </div>
          );
        })}
      </div>
    );
  };

  const renderComposedStick = () => {
    return (
      <div 
        className="flex flex-col gap-1 cursor-pointer hover:scale-105 transition-transform"
        onClick={handleDecompose}
      >
        {Array.from({ length: 8 }).map((_, i) => {
          const isHighlighted = countingIndex === i;
          return (
            <div
              key={i}
              className={`w-12 h-12 rounded-lg border-2 border-white/50 shadow-lg transition-all duration-300 flex items-center justify-center text-white font-bold text-lg ${
                isHighlighted ? 'scale-125 ring-4 ring-yellow-400' : ''
              }`}
              style={{ backgroundColor: CUBE_COLORS[i % CUBE_COLORS.length] }}
            >
              {countingIndex >= i && i + 1}
            </div>
          );
        })}
      </div>
    );
  };

  const renderPuzzleTemplate = () => {
    const puzzle = PUZZLES[currentPuzzle];
    return (
      <div className="flex gap-8 items-end">
        <div className="flex flex-col gap-1 opacity-30">
          {Array.from({ length: puzzle.left }).map((_, i) => (
            <div key={i} className="w-12 h-12 rounded-lg border-2 border-dashed border-gray-400 bg-gray-200" />
          ))}
        </div>
        <div className="flex flex-col gap-1 opacity-30">
          {Array.from({ length: puzzle.right }).map((_, i) => (
            <div key={i} className="w-12 h-12 rounded-lg border-2 border-dashed border-gray-400 bg-gray-200" />
          ))}
        </div>
      </div>
    );
  };

  const renderNumeral8 = () => {
    if (!showNumeral) return null;
    
    return (
      <div className="flex flex-col items-center gap-4 animate-bounce-in">
        <div className="text-9xl font-bold text-purple-600 drop-shadow-lg">
          8
        </div>
        <p className="text-2xl text-purple-700 font-semibold">This is eight!</p>
        <p className="text-lg text-gray-600">Trace it with your finger: Make an S, go back up!</p>
      </div>
    );
  };

  const renderPracticeStick = () => {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col gap-1">
          {Array.from({ length: 8 }).map((_, i) => {
            const breakIndex = i + 1;
            const isBreakPoint = practiceBreaks.length > 0 && i === practiceBreaks[0] - 1;
            
            return (
              <div key={i} className="relative">
                <div
                  className={`w-14 h-14 rounded-lg border-2 border-white/50 shadow-lg flex items-center justify-center text-white font-bold text-xl transition-all ${
                    practiceBreaks.length > 0 && i < practiceBreaks[0] ? 'translate-x-[-30px]' : ''
                  } ${practiceBreaks.length > 0 && i >= practiceBreaks[0] ? 'translate-x-[30px]' : ''}`}
                  style={{ backgroundColor: CUBE_COLORS[i % CUBE_COLORS.length] }}
                >
                  {i + 1}
                </div>
                {i < 7 && practiceBreaks.length === 0 && (
                  <button
                    onClick={() => handlePracticeBreak(i + 1)}
                    className="absolute -right-16 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-yellow-400 hover:bg-yellow-500 rounded-full flex items-center justify-center text-xl font-bold shadow-lg transition-all hover:scale-110"
                  >
                    ✂️
                  </button>
                )}
              </div>
            );
          })}
        </div>
        
        {practiceBreaks.length > 0 && (
          <div className="mt-4 text-center animate-bounce-in">
            <div className="text-3xl font-bold text-purple-600">
              {practiceBreaks[0]} + {8 - practiceBreaks[0]} = 8
            </div>
            <Button onClick={resetPractice} className="mt-4 bg-blue-500 hover:bg-blue-600">
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Another Break
            </Button>
          </div>
        )}
      </div>
    );
  };

  const renderPhaseContent = () => {
    switch (phase) {
      case "intro":
        return (
          <div className="flex flex-col items-center gap-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-purple-700 mb-4">Lesson 16</h1>
              <h2 className="text-2xl text-purple-600 mb-2">Compose and Decompose 8</h2>
              <p className="text-xl text-gray-600">Learn the numeral 8!</p>
            </div>
            
            <div className="flex gap-8 items-center">
              <div className="text-center">
                <p className="text-lg text-gray-600 mb-2">Two groups of 4...</p>
                <div className="flex gap-4">
                  {renderCubeStick(4, 0)}
                  {renderCubeStick(4, 4)}
                </div>
              </div>
              
              <div className="text-6xl">➜</div>
              
              <div className="text-center">
                <p className="text-lg text-gray-600 mb-2">...make 8!</p>
                <div className="text-8xl font-bold text-purple-600">8</div>
              </div>
            </div>
            
            <Button 
              onClick={() => setPhase("compose")} 
              size="lg" 
              className="text-xl px-8 py-6 bg-green-500 hover:bg-green-600"
            >
              Let's Start!
              <ChevronRight className="w-6 h-6 ml-2" />
            </Button>
          </div>
        );

      case "compose":
        return (
          <div className="flex flex-col items-center gap-8">
            <h2 className="text-3xl font-bold text-purple-700">Compose 8!</h2>
            <p className="text-xl text-gray-600">
              {isComposed 
                ? "We put them together! Count the cubes!" 
                : "Tap to put two 4-sticks together!"}
            </p>
            
            <div className="flex gap-8 items-end">
              {!isComposed ? (
                <>
                  <div 
                    className="cursor-pointer hover:scale-105 transition-transform"
                    onClick={handleCompose}
                  >
                    {renderCubeStick(4, 0)}
                  </div>
                  <div className="text-4xl text-gray-400">+</div>
                  <div 
                    className="cursor-pointer hover:scale-105 transition-transform"
                    onClick={handleCompose}
                  >
                    {renderCubeStick(4, 4)}
                  </div>
                </>
              ) : (
                <div className="flex gap-16 items-center">
                  {renderComposedStick()}
                  {renderNumeral8()}
                </div>
              )}
            </div>
            
            {showNumeral && (
              <Button 
                onClick={() => setPhase("decompose")} 
                size="lg" 
                className="text-xl px-8 py-6 bg-green-500 hover:bg-green-600"
              >
                Now Let's Decompose!
                <ChevronRight className="w-6 h-6 ml-2" />
              </Button>
            )}
          </div>
        );

      case "decompose":
        const puzzle = PUZZLES[currentPuzzle];
        return (
          <div className="flex flex-col items-center gap-6">
            <h2 className="text-3xl font-bold text-purple-700">Decompose 8!</h2>
            <p className="text-xl text-gray-600">
              Break the 8-stick into {puzzle.left} and {puzzle.right}
            </p>
            <p className="text-lg text-gray-500">Puzzle {currentPuzzle + 1} of {PUZZLES.length}</p>
            
            <div className="flex gap-16 items-center">
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">Match this pattern:</p>
                {renderPuzzleTemplate()}
                <p className="mt-2 text-lg font-semibold text-purple-600">
                  {puzzle.left} + {puzzle.right} = 8
                </p>
              </div>
              
              <div className="text-4xl">➜</div>
              
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">
                  {isComposed ? "Tap to break apart!" : "Great! Tap to put back together!"}
                </p>
                {isComposed ? (
                  <div 
                    className="cursor-pointer hover:scale-105 transition-transform"
                    onClick={handleDecompose}
                  >
                    {renderComposedStick()}
                  </div>
                ) : (
                  <div 
                    className="flex gap-4 cursor-pointer hover:scale-105 transition-transform"
                    onClick={handleCompose}
                  >
                    {renderCubeStick(puzzle.left, 0)}
                    {renderCubeStick(puzzle.right, puzzle.left, true)}
                  </div>
                )}
              </div>
            </div>
            
            {!isComposed && (
              <Button 
                onClick={handleNextPuzzle} 
                size="lg" 
                className="text-xl px-8 py-6 bg-green-500 hover:bg-green-600"
              >
                {currentPuzzle < PUZZLES.length - 1 ? "Next Puzzle" : "Practice Time!"}
                <ChevronRight className="w-6 h-6 ml-2" />
              </Button>
            )}
          </div>
        );

      case "practice":
        return (
          <div className="flex flex-col items-center gap-6">
            <h2 className="text-3xl font-bold text-purple-700">Practice Breaking 8!</h2>
            <p className="text-xl text-gray-600">
              Use the scissors ✂️ to break the stick anywhere!
            </p>
            
            <div className="flex gap-16 items-center">
              {renderPracticeStick()}
              
              <div className="text-center">
                <div className="text-9xl font-bold text-purple-600 drop-shadow-lg">8</div>
                <p className="text-xl text-purple-700 mt-2">Eight</p>
              </div>
            </div>
            
            <Button 
              onClick={() => setPhase("complete")} 
              size="lg" 
              className="text-xl px-8 py-6 bg-green-500 hover:bg-green-600"
            >
              Finish Lesson
              <ChevronRight className="w-6 h-6 ml-2" />
            </Button>
          </div>
        );

      case "complete":
        return (
          <div className="flex flex-col items-center gap-8">
            <div className="text-6xl">🎉</div>
            <h2 className="text-4xl font-bold text-purple-700">Great Job!</h2>
            <p className="text-xl text-gray-600 text-center max-w-md">
              You learned to compose and decompose 8!
            </p>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-purple-100 p-4 rounded-xl">
                <p className="text-lg text-purple-700">4 + 4 = 8</p>
              </div>
              <div className="bg-purple-100 p-4 rounded-xl">
                <p className="text-lg text-purple-700">5 + 3 = 8</p>
              </div>
              <div className="bg-purple-100 p-4 rounded-xl">
                <p className="text-lg text-purple-700">6 + 2 = 8</p>
              </div>
              <div className="bg-purple-100 p-4 rounded-xl">
                <p className="text-lg text-purple-700">7 + 1 = 8</p>
              </div>
            </div>
            
            <div className="text-9xl font-bold text-purple-600">8</div>
            
            <div className="flex gap-4">
              <Button onClick={() => navigate("/")} variant="outline" size="lg">
                <ChevronLeft className="w-5 h-5 mr-2" />
                Back to Lessons
              </Button>
              <Button 
                onClick={() => {
                  hasSpokenRef.current = {};
                  setPhase("intro");
                  setCurrentPuzzle(0);
                  setIsComposed(false);
                  setCountingIndex(-1);
                  setShowNumeral(false);
                  setPracticeBreaks([]);
                }} 
                size="lg"
                className="bg-green-500 hover:bg-green-600"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Play Again
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-pink-50 to-orange-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => navigate("/")} className="text-purple-700">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              const messages: Record<LessonPhase, string> = {
                intro: "Today we will compose 8 and decompose it into two parts!",
                compose: "Tap to put two 4-sticks together to make 8!",
                decompose: "Break the 8-stick to match the puzzle pattern!",
                practice: "Use the scissors to break 8 anywhere you like!",
                complete: "Great job learning about 8!"
              };
              speak(messages[phase]);
            }}
          >
            <Volume2 className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 min-h-[600px] flex items-center justify-center">
          {renderPhaseContent()}
        </div>
      </div>
    </div>
  );
};

export default Compose8Lesson16;

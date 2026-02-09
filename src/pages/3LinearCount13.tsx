import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Volume2, RotateCcw, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LinearCount13 = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"intro" | "counting" | "practice" | "complete">("intro");
  const [rockCount, setRockCount] = useState(5);
  const [explorerPosition, setExplorerPosition] = useState(-1);
  const [countingActive, setCountingActive] = useState(false);
  const [practiceRound, setPracticeRound] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const speakText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1.1;
    speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (phase === "intro") {
      setTimeout(() => {
        speakText("An explorer needs to cross a creek by stepping on rocks. Let's help her count the rocks!");
      }, 500);
    }
  }, [phase]);

  const startCounting = () => {
    if (countingActive) return;
    setCountingActive(true);
    setExplorerPosition(-1);
    
    let position = 0;
    const interval = setInterval(() => {
      if (position < rockCount) {
        setExplorerPosition(position);
        speakText(String(position + 1));
        position++;
      } else {
        clearInterval(interval);
        setCountingActive(false);
        speakText(`There are ${rockCount} rocks!`);
        
        if (phase === "counting" && rockCount === 8) {
          setTimeout(() => {
            setShowCelebration(true);
            speakText("The explorer crossed the creek! She walked on 8 rocks!");
            setTimeout(() => {
              setShowCelebration(false);
              setPhase("practice");
              setRockCount(5);
              setExplorerPosition(-1);
              setPracticeRound(0);
            }, 3000);
          }, 1000);
        }
      }
    }, 800);
  };

  const addRock = () => {
    if (rockCount < 8 && !countingActive) {
      const newCount = rockCount + 1;
      setRockCount(newCount);
      speakText(`Adding 1 more rock. Now there are ${newCount} rocks.`);
      setExplorerPosition(-1);
    }
  };

  const handlePracticeAdd = () => {
    if (rockCount < 8 && !countingActive) {
      const newCount = rockCount + 1;
      setRockCount(newCount);
      speakText(`1 more rock! Now count all the rocks.`);
      setExplorerPosition(-1);
      setPracticeRound(prev => prev + 1);
      
      if (newCount === 8) {
        setTimeout(() => {
          speakText("Great job! You helped the explorer cross with 8 rocks!");
          setPhase("complete");
        }, 2000);
      }
    }
  };

  const renderCreek = () => {
    const rocks = [];
    const originalRocks = 5;
    
    for (let i = 0; i < rockCount; i++) {
      const isOriginal = i < originalRocks;
      const isExplorerHere = explorerPosition === i;
      
      rocks.push(
        <div key={i} className="relative flex flex-col items-center">
          {/* Rock */}
          <div
            className={`w-14 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg transition-all duration-300 ${
              isOriginal 
                ? "bg-gray-700" 
                : "bg-amber-600 ring-2 ring-amber-400"
            } ${isExplorerHere ? "ring-4 ring-green-400 scale-110" : ""}`}
          >
            {i + 1}
          </div>
          
          {/* Explorer */}
          {isExplorerHere && (
            <div className="absolute -top-12 text-4xl animate-bounce">
              🧗‍♀️
            </div>
          )}
        </div>
      );
    }
    
    return rocks;
  };

  const resetLesson = () => {
    setPhase("intro");
    setRockCount(5);
    setExplorerPosition(-1);
    setCountingActive(false);
    setPracticeRound(0);
    setShowCelebration(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 via-blue-100 to-green-200 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <h1 className="text-xl md:text-2xl font-bold text-blue-800">
          Lesson 13: Count 8 in a Line
        </h1>
        <Button variant="ghost" onClick={resetLesson}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        {/* Celebration Overlay */}
        {showCelebration && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 text-center animate-bounce">
              <div className="text-6xl mb-4">🎉🌟🎊</div>
              <h2 className="text-3xl font-bold text-green-600">
                The Explorer Crossed!
              </h2>
              <p className="text-xl text-gray-600 mt-2">
                She stepped on 8 rocks!
              </p>
            </div>
          </div>
        )}

        {/* Phase: Intro */}
        {phase === "intro" && (
          <Card className="mb-6">
            <CardContent className="p-6 text-center">
              <div className="text-6xl mb-4">🧗‍♀️🌊</div>
              <h2 className="text-2xl font-bold text-blue-700 mb-4">
                Help the Explorer Cross the Creek!
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                The explorer needs to step on rocks to cross. There are 5 rocks,
                but she needs more to reach the other side!
              </p>
              <Button
                onClick={() => {
                  setPhase("counting");
                  speakText("Let's start with 5 rocks and add more to help her cross!");
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 text-xl"
              >
                Start Adventure
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Phase: Counting */}
        {phase === "counting" && (
          <div className="space-y-6">
            <Card className="bg-white/90">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <h2 className="text-xl font-bold text-blue-700">
                    Count the Rocks to Cross the Creek
                  </h2>
                  <p className="text-gray-600">
                    {rockCount < 8 
                      ? `We have ${rockCount} rocks. Add more to help the explorer!`
                      : "Perfect! 8 rocks to cross the creek!"
                    }
                  </p>
                </div>

                {/* Creek Visualization */}
                <div className="relative bg-gradient-to-r from-green-300 via-blue-400 to-green-300 rounded-xl p-6 mb-6">
                  {/* Banks */}
                  <div className="absolute left-0 top-0 bottom-0 w-8 bg-green-500 rounded-l-xl flex items-center justify-center">
                    <span className="text-2xl">🌿</span>
                  </div>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-green-500 rounded-r-xl flex items-center justify-center">
                    <span className="text-2xl">🌳</span>
                  </div>
                  
                  {/* Rocks */}
                  <div className="flex items-center justify-center gap-2 py-8 px-12">
                    {renderCreek()}
                  </div>
                  
                  {/* Water effect */}
                  <div className="absolute inset-0 pointer-events-none opacity-20">
                    <div className="w-full h-full bg-gradient-to-b from-transparent via-blue-300 to-transparent" />
                  </div>
                </div>

                {/* Legend */}
                <div className="flex justify-center gap-6 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-4 bg-gray-700 rounded-full" />
                    <span>Original rocks (5)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-4 bg-amber-600 rounded-full ring-2 ring-amber-400" />
                    <span>New rocks</span>
                  </div>
                </div>

                {/* Count Display */}
                <div className="text-center mb-4">
                  <div className="inline-flex items-center gap-2 bg-blue-100 px-6 py-3 rounded-full">
                    <span className="text-2xl font-bold text-blue-700">
                      Total: {rockCount} rocks
                    </span>
                    {rockCount > 5 && (
                      <span className="text-lg text-gray-600">
                        (5 + {rockCount - 5})
                      </span>
                    )}
                  </div>
                </div>

                {/* Controls */}
                <div className="flex justify-center gap-4">
                  <Button
                    onClick={startCounting}
                    disabled={countingActive}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3"
                  >
                    <Volume2 className="w-5 h-5 mr-2" />
                    Count Rocks
                  </Button>
                  
                  {rockCount < 8 && (
                    <Button
                      onClick={addRock}
                      disabled={countingActive}
                      className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Add 1 More Rock
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Phase: Practice */}
        {phase === "practice" && (
          <div className="space-y-6">
            <Card className="bg-white/90">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <h2 className="text-xl font-bold text-green-700">
                    Your Turn! Help Another Explorer
                  </h2>
                  <p className="text-gray-600">
                    Start with 5 rocks and add more until you have 8!
                  </p>
                </div>

                {/* Creek Visualization */}
                <div className="relative bg-gradient-to-r from-green-300 via-blue-400 to-green-300 rounded-xl p-6 mb-6">
                  <div className="absolute left-0 top-0 bottom-0 w-8 bg-green-500 rounded-l-xl flex items-center justify-center">
                    <span className="text-2xl">🧗‍♀️</span>
                  </div>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-green-500 rounded-r-xl flex items-center justify-center">
                    <span className="text-2xl">🏕️</span>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 py-8 px-12">
                    {renderCreek()}
                  </div>
                </div>

                {/* Progress */}
                <div className="flex justify-center gap-2 mb-4">
                  {[5, 6, 7, 8].map((num) => (
                    <div
                      key={num}
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                        rockCount >= num
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      {num}
                    </div>
                  ))}
                </div>

                {/* Pattern Display */}
                <div className="text-center mb-4 bg-yellow-50 p-3 rounded-lg">
                  <p className="text-lg font-medium text-gray-700">
                    {rockCount === 5 && "5 rocks. Add 1 more!"}
                    {rockCount === 6 && "5 and 1 more is 6! Add 1 more!"}
                    {rockCount === 7 && "6 and 1 more is 7! Add 1 more!"}
                    {rockCount === 8 && "7 and 1 more is 8! Perfect!"}
                  </p>
                </div>

                {/* Controls */}
                <div className="flex justify-center gap-4">
                  <Button
                    onClick={startCounting}
                    disabled={countingActive}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3"
                  >
                    <Volume2 className="w-5 h-5 mr-2" />
                    Count All Rocks
                  </Button>
                  
                  {rockCount < 8 && (
                    <Button
                      onClick={handlePracticeAdd}
                      disabled={countingActive}
                      className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Add 1 More
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Phase: Complete */}
        {phase === "complete" && (
          <Card className="bg-gradient-to-br from-green-100 to-blue-100">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">🏆🌟🎉</div>
              <h2 className="text-3xl font-bold text-green-700 mb-4">
                Wonderful Job!
              </h2>
              <p className="text-xl text-gray-600 mb-2">
                You learned that 8 is 5 and 3 more!
              </p>
              <div className="bg-white/80 p-4 rounded-xl mb-6 inline-block">
                <p className="text-lg font-medium text-blue-700">
                  5 + 1 = 6
                </p>
                <p className="text-lg font-medium text-blue-700">
                  6 + 1 = 7
                </p>
                <p className="text-lg font-medium text-blue-700">
                  7 + 1 = 8
                </p>
              </div>
              
              {/* Visual representation */}
              <div className="flex justify-center gap-1 mb-6">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {i}
                  </div>
                ))}
                {[6,7,8].map(i => (
                  <div key={i} className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {i}
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center gap-4">
                <Button
                  onClick={resetLesson}
                  variant="outline"
                  className="px-6 py-3"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Practice Again
                </Button>
                <Button
                  onClick={() => navigate("/")}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3"
                >
                  Back to Lessons
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LinearCount13;

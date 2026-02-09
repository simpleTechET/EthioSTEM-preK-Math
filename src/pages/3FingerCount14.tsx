import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Volume2, RotateCcw, Hand } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FingerCount14 = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"intro" | "learn" | "practice" | "complete">("intro");
  const [hatchedFingers, setHatchedFingers] = useState<boolean[]>(Array(10).fill(false));
  const [countingActive, setCountingActive] = useState(false);
  const [highlightedFinger, setHighlightedFinger] = useState(-1);
  const [practiceMode, setPracticeMode] = useState<"count8" | "count5" | "count3">("count8");

  const speakText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1.1;
    speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (phase === "intro") {
      setTimeout(() => {
        speakText("Let's count to 8 using our fingers! Pretend each finger is a baby chick hatching from an egg!");
      }, 500);
    }
  }, [phase]);

  const countFingers = (count: number) => {
    if (countingActive) return;
    setCountingActive(true);
    setHatchedFingers(Array(10).fill(false));
    setHighlightedFinger(-1);
    
    let fingerIndex = 0;
    
    const interval = setInterval(() => {
      if (fingerIndex < count) {
        setHighlightedFinger(fingerIndex);
        setHatchedFingers(prev => {
          const newHatched = [...prev];
          newHatched[fingerIndex] = true;
          return newHatched;
        });
        speakText(String(fingerIndex + 1));
        fingerIndex++;
      } else {
        clearInterval(interval);
        setCountingActive(false);
        setHighlightedFinger(-1);
        
        if (count === 8) {
          speakText(`${count} chicks hatched! 5 from one nest and 3 from another!`);
        } else {
          speakText(`${count} chicks hatched!`);
        }
      }
    }, 700);
  };

  const hatchFinger = (index: number) => {
    if (countingActive || index >= 8) return;
    
    // Must hatch in order
    const hatchedCount = hatchedFingers.filter(h => h).length;
    if (index !== hatchedCount) {
      speakText(`Hatch finger ${hatchedCount + 1} first!`);
      return;
    }
    
    setHatchedFingers(prev => {
      const newHatched = [...prev];
      newHatched[index] = true;
      return newHatched;
    });
    speakText(String(index + 1));
    
    if (index === 7) {
      setTimeout(() => {
        speakText("8 chicks hatched! Great counting!");
      }, 500);
    }
  };

  const resetFingers = () => {
    setHatchedFingers(Array(10).fill(false));
    setHighlightedFinger(-1);
  };

  // Finger positions for both hands - left hand pinky to right hand middle
  const fingerLabels = ["Pinky", "Ring", "Middle", "Index", "Thumb", "Thumb", "Index", "Middle", "Ring", "Pinky"];
  const fingerSizes = [0.7, 0.85, 0.95, 0.9, 0.75, 0.75, 0.9, 0.95, 0.85, 0.7];

  const renderHands = (interactive: boolean = false) => {
    const leftHandFingers = [0, 1, 2, 3, 4]; // pinky to thumb
    const rightHandFingers = [5, 6, 7, 8, 9]; // thumb to pinky
    
    return (
      <div className="flex justify-center gap-8 items-end">
        {/* Left Hand (Nest 1) */}
        <div className="text-center">
          <div className="text-lg font-bold text-amber-700 mb-2">Nest 1 (5 eggs)</div>
          <div className="relative bg-amber-100 rounded-full p-4 border-4 border-amber-300">
            <div className="flex gap-1 items-end justify-center">
              {leftHandFingers.map((fingerIndex) => {
                const isHatched = hatchedFingers[fingerIndex];
                const isHighlighted = highlightedFinger === fingerIndex;
                const size = fingerSizes[fingerIndex];
                
                return (
                  <div
                    key={fingerIndex}
                    className={`flex flex-col items-center transition-all duration-300 ${
                      interactive && !isHatched ? "cursor-pointer hover:scale-110" : ""
                    } ${isHighlighted ? "scale-125 z-10" : ""}`}
                    onClick={() => interactive && hatchFinger(fingerIndex)}
                  >
                    {/* Finger/Chick */}
                    <div
                      className={`rounded-t-full flex items-center justify-center transition-all duration-300 ${
                        isHatched
                          ? "bg-yellow-400 border-2 border-yellow-500"
                          : "bg-amber-200 border-2 border-amber-400"
                      }`}
                      style={{
                        width: `${size * 40}px`,
                        height: `${size * 60}px`,
                      }}
                    >
                      {isHatched ? (
                        <div className="text-center">
                          <div className="text-lg">🐥</div>
                          <div className="text-xs font-bold text-amber-800">{fingerIndex + 1}</div>
                        </div>
                      ) : (
                        <div className="text-2xl">🥚</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-2 text-2xl">✋</div>
          </div>
        </div>

        {/* Right Hand (Nest 2) */}
        <div className="text-center">
          <div className="text-lg font-bold text-orange-700 mb-2">Nest 2 (3 eggs)</div>
          <div className="relative bg-orange-100 rounded-full p-4 border-4 border-orange-300">
            <div className="flex gap-1 items-end justify-center">
              {rightHandFingers.slice(0, 3).map((fingerIndex) => {
                const isHatched = hatchedFingers[fingerIndex];
                const isHighlighted = highlightedFinger === fingerIndex;
                const size = fingerSizes[fingerIndex];
                const displayIndex = fingerIndex - 5; // 0, 1, 2 for right hand
                
                return (
                  <div
                    key={fingerIndex}
                    className={`flex flex-col items-center transition-all duration-300 ${
                      interactive && !isHatched ? "cursor-pointer hover:scale-110" : ""
                    } ${isHighlighted ? "scale-125 z-10" : ""}`}
                    onClick={() => interactive && hatchFinger(fingerIndex)}
                  >
                    {/* Finger/Chick */}
                    <div
                      className={`rounded-t-full flex items-center justify-center transition-all duration-300 ${
                        isHatched
                          ? "bg-orange-400 border-2 border-orange-500"
                          : "bg-orange-200 border-2 border-orange-400"
                      }`}
                      style={{
                        width: `${size * 40}px`,
                        height: `${size * 60}px`,
                      }}
                    >
                      {isHatched ? (
                        <div className="text-center">
                          <div className="text-lg">🐥</div>
                          <div className="text-xs font-bold text-orange-800">{fingerIndex + 1}</div>
                        </div>
                      ) : (
                        <div className="text-2xl">🥚</div>
                      )}
                    </div>
                  </div>
                );
              })}
              {/* Remaining fingers (still in eggs - not part of 8) */}
              {rightHandFingers.slice(3).map((fingerIndex) => (
                <div
                  key={fingerIndex}
                  className="flex flex-col items-center opacity-40"
                >
                  <div
                    className="rounded-t-full flex items-center justify-center bg-gray-200 border-2 border-gray-300"
                    style={{
                      width: `${fingerSizes[fingerIndex] * 40}px`,
                      height: `${fingerSizes[fingerIndex] * 60}px`,
                    }}
                  >
                    <div className="text-xl">🥚</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 text-2xl">🤚</div>
          </div>
        </div>
      </div>
    );
  };

  const hatchedCount = hatchedFingers.slice(0, 8).filter(h => h).length;

  const resetLesson = () => {
    setPhase("intro");
    setHatchedFingers(Array(10).fill(false));
    setCountingActive(false);
    setHighlightedFinger(-1);
    setPracticeMode("count8");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 via-yellow-50 to-orange-100 p-4">
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
        <h1 className="text-xl md:text-2xl font-bold text-amber-800">
          Lesson 14: Finger Counting to 8
        </h1>
        <Button variant="ghost" onClick={resetLesson}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        {/* Phase: Intro */}
        {phase === "intro" && (
          <Card className="mb-6">
            <CardContent className="p-6 text-center">
              <div className="text-6xl mb-4">🐣✋🤚</div>
              <h2 className="text-2xl font-bold text-amber-700 mb-4">
                Counting Chicks with Fingers!
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Pretend your fingers are baby chicks in eggs. When they hatch, we count them!
              </p>
              <p className="text-md text-amber-600 mb-6">
                We'll count 8 chicks: 5 from one nest (left hand) and 3 from another nest (right hand)!
              </p>
              <Button
                onClick={() => {
                  setPhase("learn");
                  speakText("Watch the chicks hatch from left to right! Start with your pinky finger.");
                }}
                className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 text-xl"
              >
                Let's Count!
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Phase: Learn */}
        {phase === "learn" && (
          <div className="space-y-6">
            <Card className="bg-white/90">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <h2 className="text-xl font-bold text-amber-700">
                    Watch the Chicks Hatch!
                  </h2>
                  <p className="text-gray-600">
                    Count from left to right as each chick hatches from its egg
                  </p>
                </div>

                {/* Hands Display */}
                <div className="bg-gradient-to-b from-green-100 to-green-200 rounded-xl p-6 mb-6">
                  {renderHands()}
                </div>

                {/* Count Display */}
                <div className="text-center mb-4">
                  <div className="inline-flex items-center gap-4 bg-amber-100 px-6 py-3 rounded-full">
                    <span className="text-2xl font-bold text-amber-700">
                      Chicks hatched: {hatchedCount}
                    </span>
                    {hatchedCount > 0 && (
                      <span className="text-lg text-gray-600">
                        ({Math.min(hatchedCount, 5)} + {Math.max(0, hatchedCount - 5)})
                      </span>
                    )}
                  </div>
                </div>

                {/* Key Learning */}
                {hatchedCount === 8 && (
                  <div className="bg-yellow-50 p-4 rounded-lg text-center mb-4">
                    <p className="text-xl font-bold text-amber-700">
                      🌟 5 + 3 = 8 chicks! 🌟
                    </p>
                  </div>
                )}

                {/* Controls */}
                <div className="flex justify-center gap-4 flex-wrap">
                  <Button
                    onClick={() => countFingers(8)}
                    disabled={countingActive}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3"
                  >
                    <Volume2 className="w-5 h-5 mr-2" />
                    Count to 8
                  </Button>
                  
                  <Button
                    onClick={resetFingers}
                    disabled={countingActive}
                    variant="outline"
                    className="px-6 py-3"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                  
                  {hatchedCount === 8 && (
                    <Button
                      onClick={() => {
                        setPhase("practice");
                        resetFingers();
                        speakText("Now you try! Tap each egg to hatch the chicks, starting from the left!");
                      }}
                      className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3"
                    >
                      Practice
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Math Way reminder */}
            <Card className="bg-blue-50">
              <CardContent className="p-4">
                <h3 className="font-bold text-blue-700 mb-2 flex items-center gap-2">
                  <Hand className="w-5 h-5" />
                  The Math Way
                </h3>
                <p className="text-gray-600 text-sm">
                  Count from left to right: Start with your left pinky (1), go to your left thumb (5), 
                  then continue with your right thumb (6), index (7), and middle finger (8)!
                </p>
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
                  <h2 className="text-xl font-bold text-amber-700">
                    Your Turn! Hatch the Chicks!
                  </h2>
                  <p className="text-gray-600">
                    Tap each egg in order from left to right to hatch the chicks
                  </p>
                </div>

                {/* Interactive Hands */}
                <div className="bg-gradient-to-b from-green-100 to-green-200 rounded-xl p-6 mb-6">
                  {renderHands(true)}
                </div>

                {/* Progress */}
                <div className="flex justify-center gap-2 mb-4">
                  {Array(8).fill(0).map((_, index) => (
                    <div
                      key={index}
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                        hatchedFingers[index]
                          ? index < 5
                            ? "bg-yellow-400 text-amber-800"
                            : "bg-orange-400 text-orange-800"
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      {index + 1}
                    </div>
                  ))}
                </div>

                {/* Count Display */}
                <div className="text-center mb-4">
                  <p className="text-lg">
                    Chicks hatched: {hatchedCount} / 8
                  </p>
                  {hatchedCount === 5 && (
                    <p className="text-amber-600 font-medium mt-2">
                      Great! Now hatch 3 more from the second nest!
                    </p>
                  )}
                  {hatchedCount === 8 && (
                    <p className="text-xl font-bold text-green-600 mt-2">
                      🎉 All 8 chicks hatched! 5 + 3 = 8!
                    </p>
                  )}
                </div>

                {/* Controls */}
                <div className="flex justify-center gap-4 flex-wrap">
                  <Button
                    onClick={resetFingers}
                    variant="outline"
                    className="px-6 py-3"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>
                  
                  {hatchedCount === 8 && (
                    <Button
                      onClick={() => {
                        setPhase("complete");
                        speakText("Wonderful! You can count to 8 using your fingers!");
                      }}
                      className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3"
                    >
                      Finish
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Phase: Complete */}
        {phase === "complete" && (
          <Card className="bg-gradient-to-br from-amber-100 to-orange-100">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">🐥🎉✨</div>
              <h2 className="text-3xl font-bold text-amber-700 mb-4">
                Excellent Counting!
              </h2>
              <p className="text-xl text-gray-600 mb-4">
                You learned to count to 8 with your fingers!
              </p>
              
              <div className="bg-white/80 p-6 rounded-xl mb-6 inline-block">
                <p className="text-xl font-bold text-amber-700 mb-4">
                  The Math Way to 8:
                </p>
                <div className="flex justify-center gap-1 mb-4">
                  {/* Left hand - 5 chicks */}
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-amber-800 font-bold text-sm">
                      {i}
                    </div>
                  ))}
                  <span className="text-xl mx-2">+</span>
                  {/* Right hand - 3 chicks */}
                  {[6,7,8].map(i => (
                    <div key={i} className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-orange-800 font-bold text-sm">
                      {i}
                    </div>
                  ))}
                </div>
                <p className="text-lg text-gray-600">
                  5 fingers + 3 fingers = 8 fingers
                </p>
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
                  className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3"
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

export default FingerCount14;

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Volume2, RotateCcw, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Introduce8Lesson12 = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"intro" | "discover" | "practice" | "complete">("intro");
  const [hiddenArm, setHiddenArm] = useState(true);
  const [countingActive, setCountingActive] = useState(false);
  const [highlightedArm, setHighlightedArm] = useState(-1);
  const [counters, setCounters] = useState<boolean[]>(Array(8).fill(false));
  const [hurtArm, setHurtArm] = useState(-1);
  const [showStickers, setShowStickers] = useState<boolean[]>(Array(8).fill(false));

  const speakText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1.1;
    speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (phase === "intro") {
      setTimeout(() => {
        speakText("Meet Ollie Octopus! Let's count his arms to discover the number 8!");
      }, 500);
    }
  }, [phase]);

  const countArms = () => {
    if (countingActive) return;
    setCountingActive(true);
    setHighlightedArm(-1);
    
    const totalArms = hiddenArm ? 7 : 8;
    let armIndex = 0;
    
    const interval = setInterval(() => {
      if (armIndex < totalArms) {
        setHighlightedArm(armIndex);
        speakText(String(armIndex + 1));
        
        // Add sticker during discovery phase
        if (phase === "discover") {
          setShowStickers(prev => {
            const newStickers = [...prev];
            newStickers[armIndex] = true;
            return newStickers;
          });
        }
        
        armIndex++;
      } else {
        clearInterval(interval);
        setCountingActive(false);
        
        if (hiddenArm) {
          speakText(`Ollie has ${totalArms} arms. But wait... there's 1 more hiding!`);
        } else {
          speakText(`Ollie has 8 arms! 7 and 1 more is 8!`);
        }
      }
    }, 700);
  };

  const revealHiddenArm = () => {
    setHiddenArm(false);
    speakText("Look! Ollie has 1 more arm! 7 and 1 more is... 8!");
  };

  const toggleCounter = (index: number) => {
    if (countingActive) return;
    
    const newCounters = [...counters];
    newCounters[index] = !newCounters[index];
    setCounters(newCounters);
    
    if (newCounters[index]) {
      speakText(String(newCounters.filter(c => c).length));
    }
  };

  const setHurtArmIndex = (index: number) => {
    setHurtArm(index);
    speakText(`Ollie has a scrape on arm ${index + 1}! Now count all 8 arms.`);
  };

  const resetLesson = () => {
    setPhase("intro");
    setHiddenArm(true);
    setCountingActive(false);
    setHighlightedArm(-1);
    setCounters(Array(8).fill(false));
    setHurtArm(-1);
    setShowStickers(Array(8).fill(false));
  };

  // Octopus arm positions (arranged in a circle pattern)
  const armPositions = [
    { x: 50, y: 15, rotation: -45 },   // Top left
    { x: 70, y: 20, rotation: -20 },   // Top
    { x: 85, y: 35, rotation: 15 },    // Right top
    { x: 90, y: 55, rotation: 45 },    // Right
    { x: 80, y: 75, rotation: 75 },    // Right bottom
    { x: 55, y: 85, rotation: 110 },   // Bottom
    { x: 30, y: 75, rotation: 140 },   // Left bottom
    { x: 15, y: 50, rotation: 180 },   // Left (hidden arm)
  ];

  const renderOctopus = (interactive: boolean = false) => {
    const visibleArms = hiddenArm ? 7 : 8;
    
    return (
      <div className="relative w-64 h-64 mx-auto">
        {/* Octopus Body */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-24 bg-purple-500 rounded-full shadow-lg">
          {/* Face */}
          <div className="absolute top-4 left-4 w-5 h-5 bg-white rounded-full">
            <div className="absolute top-1 left-1 w-3 h-3 bg-black rounded-full" />
          </div>
          <div className="absolute top-4 right-4 w-5 h-5 bg-white rounded-full">
            <div className="absolute top-1 left-1 w-3 h-3 bg-black rounded-full" />
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-4 bg-purple-600 rounded-full" />
        </div>
        
        {/* Arms */}
        {armPositions.map((pos, index) => {
          const isHiddenArm = index === 7;
          const isVisible = !isHiddenArm || !hiddenArm;
          const isHighlighted = highlightedArm === index;
          const hasSticker = showStickers[index];
          const hasCounter = counters[index];
          const isHurt = hurtArm === index;
          
          if (!isVisible) return null;
          
          return (
            <div
              key={index}
              className={`absolute transition-all duration-300 ${
                isHighlighted ? "scale-125 z-10" : ""
              } ${interactive ? "cursor-pointer hover:scale-110" : ""}`}
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: `translate(-50%, -50%) rotate(${pos.rotation}deg)`,
              }}
              onClick={() => interactive && toggleCounter(index)}
            >
              {/* Arm */}
              <div
                className={`w-16 h-4 rounded-full transition-colors ${
                  isHiddenArm && !hiddenArm
                    ? "bg-purple-400 ring-2 ring-yellow-400"
                    : isHurt
                    ? "bg-red-400"
                    : "bg-purple-400"
                } ${isHighlighted ? "bg-yellow-400" : ""}`}
              >
                {/* Suckers */}
                <div className="flex justify-around items-center h-full px-1">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="w-2 h-2 bg-purple-300 rounded-full" />
                  ))}
                </div>
              </div>
              
              {/* Sticker */}
              {hasSticker && (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-lg">
                  ⭐
                </div>
              )}
              
              {/* Counter */}
              {hasCounter && (
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full ${
                  isHurt ? "bg-red-500" : "bg-green-500"
                } flex items-center justify-center text-white text-xs font-bold`}>
                  {index + 1}
                </div>
              )}
              
              {/* Number label */}
              {isHighlighted && (
                <div
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-2 py-1 rounded-full text-sm font-bold"
                  style={{ transform: `translate(-50%, 0) rotate(-${pos.rotation}deg)` }}
                >
                  {index + 1}
                </div>
              )}
            </div>
          );
        })}
        
        {/* Hidden arm indicator */}
        {hiddenArm && phase === "discover" && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 text-2xl animate-pulse">
            ❓
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-300 via-cyan-200 to-blue-400 p-4">
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
          Lesson 12: Introduce 8
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
              <div className="text-6xl mb-4">🐙</div>
              <h2 className="text-2xl font-bold text-purple-700 mb-4">
                Meet Ollie Octopus!
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Ollie has many arms. Let's count them to discover a new number!
              </p>
              <Button
                onClick={() => {
                  setPhase("discover");
                  speakText("Let's count Ollie's arms! But wait... one arm is hiding!");
                }}
                className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 text-xl"
              >
                Start Counting
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Phase: Discover */}
        {phase === "discover" && (
          <div className="space-y-6">
            <Card className="bg-white/90">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <h2 className="text-xl font-bold text-purple-700">
                    Count Ollie's Arms
                  </h2>
                  <p className="text-gray-600">
                    {hiddenArm 
                      ? "Touch to count each arm. How many can you see?"
                      : "7 and 1 more is 8! Count all of Ollie's arms!"
                    }
                  </p>
                </div>

                {/* Octopus Display */}
                <div className="bg-gradient-to-b from-blue-200 to-blue-300 rounded-xl p-6 mb-6">
                  {renderOctopus()}
                </div>

                {/* Count Display */}
                <div className="text-center mb-4">
                  <div className="inline-flex items-center gap-4 bg-purple-100 px-6 py-3 rounded-full">
                    <span className="text-2xl font-bold text-purple-700">
                      Arms: {hiddenArm ? "7" : "8"}
                    </span>
                    {!hiddenArm && (
                      <span className="text-lg text-purple-600 bg-yellow-200 px-3 py-1 rounded-full">
                        7 + 1 = 8
                      </span>
                    )}
                  </div>
                </div>

                {/* Key Learning */}
                {!hiddenArm && (
                  <div className="bg-yellow-50 p-4 rounded-lg text-center mb-4">
                    <p className="text-xl font-bold text-purple-700">
                      🌟 7 and 1 more is 8! 🌟
                    </p>
                  </div>
                )}

                {/* Controls */}
                <div className="flex justify-center gap-4 flex-wrap">
                  <Button
                    onClick={countArms}
                    disabled={countingActive}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3"
                  >
                    <Volume2 className="w-5 h-5 mr-2" />
                    Count Arms
                  </Button>
                  
                  {hiddenArm && (
                    <Button
                      onClick={revealHiddenArm}
                      disabled={countingActive}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3"
                    >
                      <Eye className="w-5 h-5 mr-2" />
                      Find Hidden Arm
                    </Button>
                  )}
                  
                  {!hiddenArm && (
                    <Button
                      onClick={() => {
                        setPhase("practice");
                        setCounters(Array(8).fill(false));
                        setHurtArm(-1);
                        speakText("Now let's practice! Put a counter on each of Ollie's arms.");
                      }}
                      className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3"
                    >
                      Practice
                      <ArrowRight className="w-5 h-5 ml-2" />
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
                  <h2 className="text-xl font-bold text-purple-700">
                    Practice: Count Ollie's Arms
                  </h2>
                  <p className="text-gray-600">
                    {hurtArm === -1 
                      ? "Click on each arm to place a counter!"
                      : "Count all 8 arms - 7 green and 1 red (hurt)!"
                    }
                  </p>
                </div>

                {/* Interactive Octopus */}
                <div className="bg-gradient-to-b from-blue-200 to-blue-300 rounded-xl p-6 mb-6">
                  {renderOctopus(true)}
                </div>

                {/* Counter Status */}
                <div className="flex justify-center gap-2 mb-4">
                  {counters.map((hasCounter, index) => (
                    <div
                      key={index}
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                        hasCounter
                          ? hurtArm === index
                            ? "bg-red-500 text-white"
                            : "bg-green-500 text-white"
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
                    Counters placed: {counters.filter(c => c).length} / 8
                  </p>
                  {counters.every(c => c) && (
                    <p className="text-xl font-bold text-green-600 mt-2">
                      🎉 All 8 arms have counters! 7 and 1 more is 8!
                    </p>
                  )}
                </div>

                {/* Controls */}
                <div className="flex justify-center gap-4 flex-wrap">
                  {hurtArm === -1 && counters.filter(c => c).length >= 7 && (
                    <Button
                      onClick={() => setHurtArmIndex(7)}
                      className="bg-red-400 hover:bg-red-500 text-white px-6 py-3"
                    >
                      Add Hurt Arm Story
                    </Button>
                  )}
                  
                  <Button
                    onClick={() => setCounters(Array(8).fill(false))}
                    variant="outline"
                    className="px-6 py-3"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Clear Counters
                  </Button>
                  
                  {counters.every(c => c) && (
                    <Button
                      onClick={() => {
                        setPhase("complete");
                        speakText("Wonderful! You learned that 7 and 1 more is 8!");
                      }}
                      className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3"
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
          <Card className="bg-gradient-to-br from-purple-100 to-blue-100">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">🐙🌟🎉</div>
              <h2 className="text-3xl font-bold text-purple-700 mb-4">
                Amazing Job!
              </h2>
              <p className="text-xl text-gray-600 mb-4">
                You learned the number 8 with Ollie Octopus!
              </p>
              
              <div className="bg-white/80 p-6 rounded-xl mb-6 inline-block">
                <p className="text-2xl font-bold text-purple-700 mb-2">
                  7 and 1 more is 8!
                </p>
                <div className="flex justify-center items-center gap-2 mt-4">
                  {/* Visual: 7 purple + 1 yellow */}
                  {[1,2,3,4,5,6,7].map(i => (
                    <div key={i} className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {i}
                    </div>
                  ))}
                  <span className="text-xl mx-2">+</span>
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm ring-2 ring-yellow-300">
                    8
                  </div>
                </div>
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
                  className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3"
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

export default Introduce8Lesson12;

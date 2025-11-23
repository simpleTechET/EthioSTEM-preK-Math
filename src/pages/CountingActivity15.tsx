// src/pages/CountingActivity15.tsx
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Star, BookOpen, Users, Lightbulb, Eye } from "lucide-react";
import { toast } from "sonner";

const CountingActivity15 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [currentStep, setCurrentStep] = useState<'warmup' | 'peekaboo' | 'chacha' | 'scattered' | 'lineup' | 'practice' | 'complete'>('warmup');
  const [fishCount, setFishCount] = useState(4);
  const [currentPeekaboo, setCurrentPeekaboo] = useState(0);
  const [showPeekaboo, setShowPeekaboo] = useState(false);
  const [peekabooCount, setPeekabooCount] = useState<number | null>(null);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [chaChaStep, setChaChaStep] = useState(0);
  const [isScattered, setIsScattered] = useState(true);
  const [practiceCount, setPracticeCount] = useState(0);
  const [userAnswer, setUserAnswer] = useState<string>('');

  // Peekaboo sequences showing 2 and 1 embedded in 3
  const peekabooSequences = useMemo(() => [2, 1, 3, 2, 1, 3], []);

  // Fish positions for scattered configuration
  const scatteredPositions = useMemo(() => {
    return Array(fishCount).fill(0).map(() => ({
      top: Math.random() * 60 + 10,
      left: Math.random() * 70 + 10
    }));
  }, [fishCount, isScattered]);

  const startPeekaboo = () => {
    setShowPeekaboo(true);
    setTimeout(() => {
      setShowPeekaboo(false);
    }, 2000);
  };

  const handlePeekabooAnswer = (count: number) => {
    const isCorrect = count === peekabooSequences[currentPeekaboo];
    setLastAnswerCorrect(isCorrect);
    setShowFeedback(true);
    setPeekabooCount(count);

    if (isCorrect) {
      toast.success("Great memory! 🎉", { description: `You remembered ${count}!` });
      setTimeout(() => {
        if (currentPeekaboo < peekabooSequences.length - 1) {
          setCurrentPeekaboo(currentPeekaboo + 1);
          setPeekabooCount(null);
          setShowFeedback(false);
          startPeekaboo();
        } else {
          setCurrentStep('chacha');
          setShowFeedback(false);
        }
      }, 1500);
    } else {
      toast.error("Try again! 🤔");
      setTimeout(() => {
        setPeekabooCount(null);
        setShowFeedback(false);
      }, 1500);
    }
  };

  const handleChaChaStep = () => {
    if (chaChaStep < 4) {
      setChaChaStep(chaChaStep + 1);
    } else {
      setCurrentStep('scattered');
      setChaChaStep(0);
    }
  };

  const handleScatteredCount = () => {
    toast.success(`Correct! 🎉`, { description: `There are ${fishCount} fish playing tag!` });
    setTimeout(() => setCurrentStep('lineup'), 1500);
  };

  const handleLineupCount = () => {
    toast.success(`Perfect! 🎉`, { description: `Still ${fishCount} fish, just in a line!` });
    if (fishCount === 4) {
      setTimeout(() => {
        setFishCount(5);
        setIsScattered(true);
        setCurrentStep('scattered');
      }, 1500);
    } else {
      setTimeout(() => setCurrentStep('practice'), 1500);
    }
  };

  const handlePracticeScatter = () => {
    setIsScattered(true);
    toast.info("Fish are playing tag! 🐠", { description: "Count them in scattered formation." });
  };

  const handlePracticeLineup = () => {
    setIsScattered(false);
    toast.info("Shark coming! Line up! 🦈", { description: "Fish lined up to escape." });
  };

  const chaChaSteps = [
    { text: "Put one hand out!", emoji: "✋", instruction: "Reach one hand to the side" },
    { text: "Now the other hand!", emoji: "🤚", instruction: "Reach other hand to the side" },
    { text: "Cha-cha-cha!", emoji: "💃", instruction: "Three quick steps in place" },
    { text: "1, 2, cha-cha-cha!", emoji: "🕺", instruction: "Count as you move!" },
    { text: "1, 2, 3, 4, 5!", emoji: "🎉", instruction: "Count all the way to 5!" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-cyan-50 to-blue-200 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                Lesson 15
              </span>
              <h1 className="text-2xl font-bold text-gray-800">Count Up to 5 Objects</h1>
            </div>
            <p className="text-sm text-gray-600">Topic E: Counting 4-5 Objects</p>
          </div>
        </div>

        {!showGame ? (
          <div className="space-y-6">
            {/* Learning Objective */}
            <Card className="border-2 border-blue-200 bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl text-blue-700">
                  <Star className="w-6 h-6" />
                  Learning Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-700">
                  Today, your child will learn to <span className="font-bold text-blue-700">arrange and count up to 5 objects in scattered and linear configurations</span>, 
                  understanding that the number stays the same regardless of arrangement.
                </p>
              </CardContent>
            </Card>

            {/* Introduction */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">Underwater Counting Adventure!</CardTitle>
                <CardDescription>Read this together with your child</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                  <p className="text-lg text-gray-700 mb-4">
                    Today we'll count fish swimming in the ocean! Sometimes they're playing tag (scattered) and sometimes they line up to swim through a window!
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg border-2 border-cyan-200">
                      <h4 className="font-bold text-cyan-700 mb-2">🐠 Scattered (Playing Tag)</h4>
                      <div className="relative h-32 bg-blue-100 rounded-lg mb-2">
                        <span className="absolute top-2 left-4 text-3xl">🐠</span>
                        <span className="absolute top-12 right-8 text-3xl">🐠</span>
                        <span className="absolute bottom-4 left-16 text-3xl">🐠</span>
                        <span className="absolute top-8 right-20 text-3xl">🐠</span>
                      </div>
                      <p className="text-sm text-gray-600">Fish swimming all around!</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border-2 border-indigo-200">
                      <h4 className="font-bold text-indigo-700 mb-2">🐠🐠🐠🐠 Linear (Line Up)</h4>
                      <div className="relative h-32 bg-blue-100 rounded-lg mb-2 flex items-center justify-center gap-2">
                        <span className="text-3xl">🐠</span>
                        <span className="text-3xl">🐠</span>
                        <span className="text-3xl">🐠</span>
                        <span className="text-3xl">🐠</span>
                      </div>
                      <p className="text-sm text-gray-600">Fish in a straight line!</p>
                    </div>
                  </div>
                  <p className="text-center text-gray-700 mt-4 font-semibold">
                    Both have 4 fish! The arrangement changes, but the number stays the same! ✨
                  </p>
                </div>

                {/* Parent Tips */}
                <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                  <Users className="w-8 h-8 text-purple-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Parent Tips:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Help your child point to each fish as they count</li>
                      <li>• Emphasize: "The number stays the same when we rearrange them!"</li>
                      <li>• Use position words: "One is by the rock, two are by the plant"</li>
                      <li>• Practice with toys at home: scatter them, then line them up</li>
                    </ul>
                  </div>
                </div>

                {/* Key Vocabulary */}
                <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-5 h-5 text-yellow-600" />
                    <h4 className="font-bold text-gray-800">Key Words</h4>
                  </div>
                  <div className="grid md:grid-cols-3 gap-3">
                    <div className="bg-white p-3 rounded-lg">
                      <p className="font-bold text-blue-700">Scattered</p>
                      <p className="text-sm text-gray-600">Objects spread out randomly</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="font-bold text-blue-700">Linear</p>
                      <p className="text-sm text-gray-600">Objects in a straight line</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="font-bold text-blue-700">Configuration</p>
                      <p className="text-sm text-gray-600">How objects are arranged</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Start Button */}
            <div className="text-center">
              <Button 
                size="lg" 
                onClick={() => setShowGame(true)}
                className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700 shadow-lg"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Start Underwater Adventure
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Peek-a-Boo Warm-up */}
            {currentStep === 'peekaboo' && (
              <Card className="p-6 bg-green-50 border-2 border-green-200 text-center">
                <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center justify-center gap-2">
                  <Eye className="w-6 h-6" />
                  Peek-a-Boo Counting!
                </h3>
                
                {showPeekaboo ? (
                  <div className="mb-6">
                    <p className="text-lg text-gray-700 mb-4">Quick! Look at the objects!</p>
                    <div className="text-8xl mb-4 animate-pulse">
                      {Array(peekabooSequences[currentPeekaboo]).fill("🎁").map((emoji, index) => (
                        <span key={index} className="mx-2">{emoji}</span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="mb-6">
                    <p className="text-lg text-gray-700 mb-4">How many objects did you see?</p>
                    <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                      {[1, 2, 3].map(number => {
                        const isThisCorrectAnswer = number === peekabooSequences[currentPeekaboo];
                        const wasClicked = number === peekabooCount;
                        
                        return (
                          <Button
                            key={number}
                            onClick={() => handlePeekabooAnswer(number)}
                            size="lg"
                            className={`h-20 text-2xl font-bold ${
                              showFeedback && wasClicked
                                ? lastAnswerCorrect 
                                  ? 'bg-green-100 border-green-500' 
                                  : 'bg-red-100 border-red-500'
                                : showFeedback && isThisCorrectAnswer
                                ? 'bg-green-100 border-green-500'
                                : 'bg-white text-gray-800 hover:bg-green-100'
                            }`}
                          >
                            {number}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {!showPeekaboo && currentPeekaboo === 0 && peekabooCount === null && (
                  <Button onClick={startPeekaboo} className="mt-4">
                    Start Peek-a-Boo!
                  </Button>
                )}
              </Card>
            )}

            {/* Number Cha-Cha */}
            {currentStep === 'chacha' && (
              <Card className="p-6 bg-pink-50 border-2 border-pink-200 text-center">
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  💃 Number Cha-Cha to 5!
                </h3>
                
                <div className="bg-white p-8 rounded-lg border-2 border-pink-300 mb-6">
                  <div className="text-6xl mb-4 animate-bounce">
                    {chaChaSteps[chaChaStep].emoji}
                  </div>
                  <div className="text-2xl font-bold text-pink-600 mb-2">
                    {chaChaSteps[chaChaStep].text}
                  </div>
                  <div className="text-gray-600">
                    {chaChaSteps[chaChaStep].instruction}
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                  Follow along and learn to count to 5 with dance moves!
                </p>

                <Button onClick={handleChaChaStep} className="bg-pink-600 hover:bg-pink-700">
                  {chaChaStep === 0 ? 'Start Dancing!' : 'Next Step!'}
                </Button>
              </Card>
            )}

            // Replace the Scattered Configuration section:
{currentStep === 'scattered' && (
  <Card className="p-6 bg-cyan-50 border-2 border-cyan-200">
    <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">
      🐠 Fish Playing Tag! (Scattered)
    </h3>
    
    <div className="relative bg-gradient-to-b from-blue-200 to-blue-400 rounded-xl border-4 border-blue-500 h-96 mb-6 overflow-hidden">
      {/* Underwater decorations */}
      <div className="absolute bottom-0 left-4 text-6xl">🪨</div>
      <div className="absolute bottom-0 right-8 text-6xl">🌿</div>
      <div className="absolute top-4 right-4 text-4xl opacity-50">☁️</div>
      
      {/* Scattered fish */}
      {scatteredPositions.map((pos, index) => (
        <div
          key={index}
          className="absolute text-5xl animate-pulse"
          style={{ 
            top: `${pos.top}%`, 
            left: `${pos.left}%`,
            animationDelay: `${index * 200}ms`
          }}
        >
          🐠
        </div>
      ))}
    </div>

    <p className="text-center text-lg text-gray-700 mb-4">
      Count the fish playing tag! Point to each one as you count.
    </p>

    <div className="text-center mb-6">
      <label className="text-2xl font-bold text-blue-700 mb-4 block">
        How many fish?
      </label>
      <input
        type="number"
        min="0"
        max="10"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        className="w-32 h-20 text-4xl text-center font-bold border-4 border-blue-400 rounded-lg focus:border-blue-600 focus:outline-none"
        placeholder="?"
      />
    </div>

    <Button 
      onClick={() => {
        const answer = parseInt(userAnswer);
        if (answer === fishCount) {
          toast.success("Correct! 🎉", { description: `There are ${fishCount} fish playing tag!` });
          setUserAnswer('');
          setTimeout(() => setCurrentStep('lineup'), 1500);
        } else {
          toast.error("Try again! 🤔", { description: "Count carefully, point to each fish!" });
        }
      }}
      disabled={!userAnswer}
      size="lg" 
      className="w-full bg-cyan-600 hover:bg-cyan-700"
    >
      Check My Answer
    </Button>
  </Card>
)}

           {currentStep === 'lineup' && (
  <Card className="p-6 bg-indigo-50 border-2 border-indigo-200">
    <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">
      🦈 Shark Coming! Fish Line Up! (Linear)
    </h3>
    
    <div className="relative bg-gradient-to-b from-blue-200 to-blue-400 rounded-xl border-4 border-blue-500 p-8 mb-6">
      {/* Shark */}
      <div className="absolute top-4 right-4 text-6xl animate-bounce">🦈</div>
      
      {/* Window/Portal */}
      <div className="bg-cyan-300 border-4 border-gray-600 rounded-lg p-6 flex items-center justify-center gap-3">
        {Array(fishCount).fill('🐠').map((fish, index) => (
          <span key={index} className="text-5xl">{fish}</span>
        ))}
      </div>
      
      <p className="text-center text-sm text-white mt-4 font-bold">
        → Swimming through the window to escape! →
      </p>
    </div>

    <p className="text-center text-lg text-gray-700 mb-4">
      Count the fish in the line! Did the number change?
    </p>

    <div className="text-center mb-6">
      <label className="text-2xl font-bold text-indigo-700 mb-4 block">
        Still ___ fish!
      </label>
      <input
        type="number"
        min="0"
        max="10"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        className="w-32 h-20 text-4xl text-center font-bold border-4 border-indigo-400 rounded-lg focus:border-indigo-600 focus:outline-none"
        placeholder="?"
      />
    </div>

    <Button 
      onClick={() => {
        const answer = parseInt(userAnswer);
        if (answer === fishCount) {
          toast.success("Perfect! 🎉", { description: `Still ${fishCount} fish, just in a line!` });
          setUserAnswer('');
          if (fishCount === 4) {
            setTimeout(() => {
              setFishCount(5);
              setIsScattered(true);
              setCurrentStep('scattered');
            }, 1500);
          } else {
            setTimeout(() => setCurrentStep('practice'), 1500);
          }
        } else {
          toast.error("Try again! 🤔", { description: "Count carefully!" });
        }
      }}
      disabled={!userAnswer}
      size="lg" 
      className="w-full bg-indigo-600 hover:bg-indigo-700"
    >
      Check My Answer
    </Button>
  </Card>
)}

            {/* Practice */}
            {currentStep === 'practice' && (
              <>
                <Card className="p-6 bg-purple-50 border-2 border-purple-200">
                  <h3 className="text-xl font-bold mb-2 text-gray-800 text-center">
                    🎮 Your Turn to Practice!
                  </h3>
                  <p className="text-center text-gray-700 mb-4">
                    Switch between scattered and linear. Count each time!
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button onClick={handlePracticeScatter} className="bg-cyan-600">
                      🐠 Scatter Fish (Play Tag)
                    </Button>
                    <Button onClick={handlePracticeLineup} className="bg-indigo-600">
                      🦈 Line Up Fish (Escape)
                    </Button>
                  </div>
                </Card>

                <Card className="p-6 bg-white border-2 border-gray-200">
                  <div className="relative bg-gradient-to-b from-blue-200 to-blue-400 rounded-xl border-4 border-blue-500 h-96 mb-4">
                    {isScattered ? (
                      <>
                        {/* Decorations */}
                        <div className="absolute bottom-0 left-4 text-6xl">🪨</div>
                        <div className="absolute bottom-0 right-8 text-6xl">🌿</div>
                        {/* Scattered fish */}
                        {scatteredPositions.map((pos, index) => (
                          <div
                            key={index}
                            className="absolute text-5xl"
                            style={{ top: `${pos.top}%`, left: `${pos.left}%` }}
                          >
                            🐠
                          </div>
                        ))}
                      </>
                    ) : (
                      <>
                        {/* Shark */}
                        <div className="absolute top-4 right-4 text-6xl">🦈</div>
                        {/* Lined up fish */}
                        <div className="absolute inset-0 flex items-center justify-center gap-3">
                          {Array(5).fill('🐠').map((fish, index) => (
                            <span key={index} className="text-5xl">{fish}</span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="text-center">
                    <p className="text-lg text-gray-700 mb-4">
                      {isScattered ? "Fish are playing tag! Count them!" : "Fish lined up! Count them!"}
                    </p>
                    <div className="text-3xl font-bold text-blue-700 mb-4">
                      There are 5 fish!
                    </div>
                    <Button 
                      onClick={() => {
                        setPracticeCount(practiceCount + 1);
                        if (practiceCount >= 3) {
                          setCurrentStep('complete');
                        } else {
                          toast.success("Great counting! 🎉", { description: "Try switching the arrangement!" });
                        }
                      }}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Count Complete! ({practiceCount + 1}/4)
                    </Button>
                  </div>
                </Card>
              </>
            )}

            {/* Completion */}
            {currentStep === 'complete' && (
              <Card className="bg-gradient-to-br from-green-100 to-blue-100 border-4 border-green-400 p-8 text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-3xl font-bold mb-3 text-gray-800">Ocean Explorer! 🌊</h3>
                <p className="text-lg text-gray-700 mb-4">
                  You counted fish in scattered AND linear configurations! You understand that the number stays the same no matter how they're arranged! 
                </p>
                <div className="bg-white p-4 rounded-lg border-2 border-blue-300 mb-6">
                  <p className="text-sm text-gray-600">
                    <strong>Today you learned:</strong><br/>
                    • Counting up to 5 objects<br/>
                    • Scattered configuration (spread out)<br/>
                    • Linear configuration (in a line)<br/>
                    • The number stays the same when rearranged! ✨
                  </p>
                </div>
                <Button 
                  size="lg"
                  onClick={() => navigate('/activities')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Continue Learning
                </Button>
              </Card>
            )}

            {/* Skip to warmup button */}
            {currentStep === 'warmup' && (
              <Card className="p-6 bg-blue-50 border-2 border-blue-200 text-center">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Ready to Start?</h3>
                <p className="text-gray-700 mb-4">Let's begin with some warm-up activities!</p>
                <Button onClick={() => setCurrentStep('peekaboo')} size="lg" className="bg-blue-600">
                  Start Warm-ups!
                </Button>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CountingActivity15;

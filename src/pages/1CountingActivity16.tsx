// src/pages/CountingActivity16.tsx
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Star, BookOpen, Users, Lightbulb, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

// FishSwimGame Component
const FishSwimGame = ({ onComplete }: { onComplete: () => void }) => {
  const [fishCount, setFishCount] = useState(4);
  const [fishArrangement, setFishArrangement] = useState<'scattered' | 'line'>('scattered');
  const [clickedFish, setClickedFish] = useState<number[]>([]);
  const [showCountInput, setShowCountInput] = useState(false);
  const [userCount, setUserCount] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [roundsCompleted, setRoundsCompleted] = useState(0);

  const scatteredPositions = {
    4: [
      { top: '20%', left: '15%' },
      { top: '40%', left: '70%' },
      { top: '60%', left: '30%' },
      { top: '25%', left: '60%' }
    ],
    5: [
      { top: '20%', left: '15%' },
      { top: '40%', left: '70%' },
      { top: '60%', left: '30%' },
      { top: '25%', left: '60%' },
      { top: '55%', left: '80%' }
    ]
  };

  const handleFishClick = (index: number) => {
    if (!clickedFish.includes(index) && feedback === null) {
      setClickedFish([...clickedFish, index]);
    }
  };

  const handleCountSubmit = (num: number) => {
    setUserCount(num);
    if (num === fishCount) {
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
  };

  const handleNextRound = () => {
    const newRoundsCompleted = roundsCompleted + 1;
    setRoundsCompleted(newRoundsCompleted);

    // Progress through the rounds: 4 scattered -> 4 line -> 5 scattered -> 5 line -> complete
    if (newRoundsCompleted >= 4) {
      onComplete();
    } else {
      // Determine next configuration
      if (fishCount === 4 && fishArrangement === 'scattered') {
        setFishArrangement('line');
      } else if (fishCount === 4 && fishArrangement === 'line') {
        setFishCount(5);
        setFishArrangement('scattered');
      } else if (fishCount === 5 && fishArrangement === 'scattered') {
        setFishArrangement('line');
      }
      
      // Reset for next round
      setClickedFish([]);
      setShowCountInput(false);
      setFeedback(null);
      setUserCount(null);
    }
  };

  const handleTryAgain = () => {
    setClickedFish([]);
    setShowCountInput(false);
    setFeedback(null);
    setUserCount(null);
  };

  return (
    <Card className="p-6 bg-cyan-50 border-2 border-cyan-200">
      <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">
        🐠 Fish Swimming Game
      </h3>
      
      <div className="text-center mb-4">
        <p className="text-sm text-muted-foreground">Round {roundsCompleted + 1} of 4</p>
      </div>

      <div className="relative bg-gradient-to-b from-blue-200 to-blue-400 rounded-xl border-4 border-blue-500 h-96 mb-6 overflow-hidden">
        {/* Ocean decorations */}
        <div className="absolute bottom-0 left-0 text-6xl opacity-70">🪨</div>
        <div className="absolute bottom-0 right-0 text-6xl opacity-70">🌿</div>
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white font-bold text-lg bg-blue-600/50 px-4 py-2 rounded-full">
          {fishArrangement === 'scattered' ? '🌊 Fish swimming freely!' : '🍽️ Fish lining up for food!'}
        </div>

        {fishArrangement === 'scattered' ? (
          <>
            {scatteredPositions[fishCount as keyof typeof scatteredPositions].map((pos, index) => (
              <button
                key={index}
                onClick={() => handleFishClick(index)}
                disabled={feedback !== null}
                className="absolute text-6xl cursor-pointer hover:scale-110 transition-transform"
                style={{ top: pos.top, left: pos.left, transform: 'translate(-50%, -50%)' }}
              >
                🐠
                {clickedFish.includes(index) && (
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold border-2 border-white">
                    {clickedFish.indexOf(index) + 1}
                  </span>
                )}
              </button>
            ))}
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center gap-4">
            {Array(fishCount).fill('🐠').map((fish, index) => (
              <button
                key={index}
                onClick={() => handleFishClick(index)}
                disabled={feedback !== null}
                className="text-6xl cursor-pointer hover:scale-110 transition-transform relative"
              >
                {fish}
                {clickedFish.includes(index) && (
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold border-2 border-white">
                    {clickedFish.indexOf(index) + 1}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="text-center space-y-4">
        <p className="text-lg text-gray-700 font-semibold">
          {fishArrangement === 'scattered' 
            ? 'Click each fish to count them as they swim!'
            : 'Click each fish in the line to count them!'}
        </p>

        {!showCountInput ? (
          <Button 
            onClick={() => setShowCountInput(true)}
            disabled={clickedFish.length === 0}
            className="bg-blue-600 hover:bg-blue-700"
            size="lg"
          >
            I Finished Counting!
          </Button>
        ) : (
          <div className="space-y-4">
            <p className="text-lg font-semibold text-gray-800">How many fish did you count?</p>
            <div className="flex gap-3 justify-center">
              {[2, 3, 4, 5, 6].map(num => (
                <Button
                  key={num}
                  onClick={() => handleCountSubmit(num)}
                  variant={userCount === num ? "default" : "outline"}
                  className="w-16 h-16 text-2xl font-bold"
                  disabled={feedback !== null}
                >
                  {num}
                </Button>
              ))}
            </div>
            
            {feedback && (
              <div className={`p-4 rounded-lg ${
                feedback === 'correct' 
                  ? 'bg-green-100 text-green-700 border-2 border-green-300' 
                  : 'bg-red-100 text-red-700 border-2 border-red-300'
              }`}>
                <p className="font-bold text-lg mb-2">
                  {feedback === 'correct' 
                    ? '✓ Perfect! You counted correctly!' 
                    : '✗ Not quite. Try counting again by clicking each fish!'}
                </p>
                {feedback === 'correct' && (
                  <p className="mb-3">
                    There are {fishCount} fish whether they're {fishArrangement === 'scattered' ? 'swimming around' : 'in a line'}!
                  </p>
                )}
                {feedback === 'correct' ? (
                  <Button 
                    onClick={handleNextRound}
                    className="bg-cyan-600 hover:bg-cyan-700"
                  >
                    {roundsCompleted >= 3 ? 'Finish Fish Game' : 'Next Round'} 
                  </Button>
                ) : (
                  <Button 
                    onClick={handleTryAgain}
                    variant="outline"
                  >
                    Try Again
                  </Button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

const CountingActivity16 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [currentStep, setCurrentStep] = useState<'warmup' | 'parking' | 'chacha' | 'fishSwim' | 'matching' | 'practice' | 'complete'>('warmup');
  const [parkingSpaces, setParkingSpaces] = useState(5);
  const [parkedCars, setParkedCars] = useState<number[]>([]);
  const [chaChaStep, setChaChaStep] = useState(0);
  const [currentFamilyIndex, setCurrentFamilyIndex] = useState(0);
  const [selectedDots, setSelectedDots] = useState<number | null>(null);
  const [matchedFamilies, setMatchedFamilies] = useState<number[]>([]);
  const [practiceRound, setPracticeRound] = useState(0);

  // Family configurations (2-5 members)
  const families = useMemo(() => [
    { id: 1, members: 3, emojis: ['👨', '👩', '👦'], description: "Mom, Dad, and Son" },
    { id: 2, members: 4, emojis: ['👨', '👩', '👧', '👦'], description: "Parents and 2 kids" },
    { id: 3, members: 2, emojis: ['👨', '👧'], description: "Dad and Daughter" },
    { id: 4, members: 5, emojis: ['👴', '👵', '👨', '👩', '👶'], description: "Grandparents, Parents, Baby" },
    { id: 5, members: 3, emojis: ['👩', '👧', '👧'], description: "Mom and 2 Daughters" },
    { id: 6, members: 4, emojis: ['👨', '👨', '👦', '👦'], description: "Two Dads and 2 Sons" }
  ], []);

  const shuffledFamilies = useMemo(() => {
    return [...families].sort(() => Math.random() - 0.5);
  }, [families]);

  const handleParkCar = (space: number) => {
    if (!parkedCars.includes(space)) {
      setParkedCars([...parkedCars, space]);
      if (parkedCars.length + 1 === parkingSpaces) {
        setTimeout(() => setCurrentStep('chacha'), 1000);
      }
    }
  };

  const chaChaSteps = [
    { text: "Put one hand out!", emoji: "✋" },
    { text: "Now the other hand!", emoji: "🤚" },
    { text: "Cha-cha-cha!", emoji: "💃" },
    { text: "1, 2, cha-cha-cha!", emoji: "🕺" },
    { text: "1, 2, 3, 4, 5!", emoji: "🎉" }
  ];

  const handleChaChaStep = () => {
    if (chaChaStep < 4) {
      setChaChaStep(chaChaStep + 1);
    } else {
      setCurrentStep('fishSwim');
    }
  };

  const handleDotMatch = () => {
    const currentFamily = shuffledFamilies[currentFamilyIndex];
    if (selectedDots === currentFamily.members) {
      toast.success("Perfect match! 🎉", { 
        description: `This family has ${currentFamily.members} people!` 
      });
      setMatchedFamilies([...matchedFamilies, currentFamily.id]);
      setSelectedDots(null);
      
      if (currentFamilyIndex < shuffledFamilies.length - 1) {
        setTimeout(() => setCurrentFamilyIndex(currentFamilyIndex + 1), 1000);
      } else {
        setTimeout(() => setCurrentStep('practice'), 1500);
      }
    } else {
      toast.error("Try again! 🤔", { description: "Count the family members carefully." });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-1")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
                Lesson 16
              </span>
              <h1 className="text-2xl font-bold text-gray-800">Count Family Members</h1>
            </div>
            <p className="text-sm text-gray-600">Topic E: Counting 4-5 Objects</p>
          </div>
        </div>

        {!showGame ? (
          <div className="space-y-6">
            {/* Learning Objective */}
            <Card className="border-2 border-purple-200 bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl text-purple-700">
                  <Star className="w-6 h-6" />
                  Learning Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-700">
                  Today, your child will continue to <span className="font-bold text-purple-700">count up to 5 objects in different configurations</span>, 
                  moving from concrete objects (fish) to pictorial representations (family photos).
                </p>
              </CardContent>
            </Card>

            {/* Introduction */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">Counting People in Families!</CardTitle>
                <CardDescription>Read this together with your child</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
                  <p className="text-lg text-gray-700 mb-4">
                    Today we'll count people in different families! Just like yesterday with fish, the number stays the same whether people are scattered or in a line.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg border-2 border-pink-200 text-center">
                      <div className="text-5xl mb-3">👨👩👧👦</div>
                      <p className="font-bold text-pink-700">Family of 4</p>
                      <p className="text-sm text-gray-600">Count each person!</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border-2 border-orange-200 text-center">
                      <div className="text-5xl mb-3">👴👵👨👩👶</div>
                      <p className="font-bold text-orange-700">Family of 5</p>
                      <p className="text-sm text-gray-600">Grandparents too!</p>
                    </div>
                  </div>
                </div>

                {/* Key Concept */}
                <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                  <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="text-2xl">💡</span> Important Idea
                  </h4>
                  <p className="text-gray-700">
                    Today we practice with <strong>pictures</strong> instead of real objects. This helps us understand that counting works with pictures too!
                  </p>
                </div>

                {/* Parent Tips */}
                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border-2 border-green-200">
                  <Users className="w-8 h-8 text-green-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Parent Tips:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Point to each person in the picture as you count together</li>
                      <li>• Ask: "How many people are in this family?"</li>
                      <li>• Compare: "These families look different but both have 4 people!"</li>
                      <li>• Practice: "How many people are in our family?"</li>
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
                      <p className="font-bold text-purple-700">Family</p>
                      <p className="text-sm text-gray-600">People who belong together</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="font-bold text-purple-700">Members</p>
                      <p className="text-sm text-gray-600">People in a group</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="font-bold text-purple-700">Match</p>
                      <p className="text-sm text-gray-600">Find equal numbers</p>
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
                className="text-lg px-8 py-6 bg-purple-600 hover:bg-purple-700 shadow-lg"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Start Family Counting
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Dot Path Parking Lot Warm-up */}
            {currentStep === 'parking' && (
              <>
                <Card className="p-6 bg-green-50 border-2 border-green-200">
                  <h3 className="text-xl font-bold mb-2 text-gray-800 flex items-center gap-2">
                    🚗
                    Dot Path Parking Lot
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Park the cars! Each car gets its own numbered space. Watch the queue get shorter as you park them!
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="flex-1 bg-white p-2 rounded border">
                      Cars parked: {parkedCars.length} of {parkingSpaces}
                    </div>
                    <div className="flex-1 bg-white p-2 rounded border">
                      Cars waiting: {parkingSpaces - parkedCars.length}
                    </div>
                  </div>
                </Card>

                {/* Cars Waiting to Park (Queue) */}
                <Card className="p-6 bg-blue-50 border-2 border-blue-200">
                  <h4 className="text-lg font-bold mb-4 text-gray-800 text-center">
                    🚗 Cars Waiting in Queue
                  </h4>
                  <div className="flex justify-center gap-4 min-h-[100px] items-center flex-wrap">
                    {Array(parkingSpaces).fill(0).map((_, index) => {
                      const isParked = index < parkedCars.length;
                      const carColor = ['red', 'blue', 'green', 'yellow', 'purple'][index % 5];
                      const carEmoji = ['🚗', '🚙', '🚐', '🚕', '🏎️'][index % 5];
                      
                      return (
                        <div
                          key={index}
                          className={`transition-all duration-500 ${
                            isParked ? 'opacity-20 scale-75' : 'opacity-100 scale-100'
                          }`}
                        >
                          <div className="text-center">
                            <div className="text-5xl mb-2">{carEmoji}</div>
                            <div className={`text-sm font-semibold ${
                              isParked ? 'text-gray-400 line-through' : 'text-gray-700'
                            }`}>
                              {carColor} car
                            </div>
                            {isParked && (
                              <div className="text-xs text-green-600 font-bold mt-1">
                                ✓ Parked
                              </div>
                            )}
                            {!isParked && index === parkedCars.length && (
                              <div className="text-xs text-blue-600 font-bold mt-1 animate-pulse">
                                → Next to park
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-sm text-gray-600 text-center mt-4">
                    {parkedCars.length === 0 
                      ? "Click any parking spot below to park the first car!" 
                      : parkedCars.length === parkingSpaces 
                      ? "All cars are parked! 🎉" 
                      : `Click a parking spot to park the next car!`
                    }
                  </p>
                </Card>

                {/* Parking Lot */}
                <Card className="p-6 bg-gray-100 border-2 border-gray-300">
                  <h4 className="text-lg font-bold mb-4 text-gray-800 text-center">
                    🅿️ Parking Lot
                  </h4>
                  <div className="grid grid-cols-5 gap-4 max-w-2xl mx-auto">
                    {Array(parkingSpaces).fill(0).map((_, index) => {
                      const space = index + 1;
                      const isParked = parkedCars.includes(space);
                      const carIndex = parkedCars.indexOf(space);
                      const carEmoji = ['🚗', '🚙', '🚐', '🚕', '🏎️'][carIndex % 5];
                      
                      return (
                        <Card
                          key={space}
                          onClick={() => !isParked && handleParkCar(space)}
                          className={`
                            text-center p-4 cursor-pointer transition-all duration-300
                            ${isParked 
                              ? 'bg-green-100 border-4 border-green-500' 
                              : 'bg-white hover:bg-green-50 border-2 border-gray-400 hover:border-green-300 hover:scale-105'
                            }
                          `}
                        >
                          <div className="text-2xl font-bold text-gray-700 mb-2">
                            Spot {space}
                          </div>
                          <div className="h-16 flex items-center justify-center">
                            {isParked ? (
                              <div className="animate-bounce">
                                <div className="text-4xl">{carEmoji}</div>
                                <div className="text-xs text-gray-600 mt-1">
                                  {['red', 'blue', 'green', 'yellow', 'purple'][carIndex % 5]}
                                </div>
                              </div>
                            ) : (
                              <div className="text-lg text-gray-400">Empty</div>
                            )}
                          </div>
                          {isParked && <CheckCircle2 className="w-5 h-5 text-green-600 mx-auto mt-2" />}
                        </Card>
                      );
                    })}
                  </div>
                </Card>
              </>
            )}

            {/* Number Cha-Cha */}
            {currentStep === 'chacha' && (
              <Card className="p-6 bg-pink-50 border-2 border-pink-200 text-center">
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  💃 Number Cha-Cha to 5! (Day 2)
                </h3>
                
                <div className="bg-white p-8 rounded-lg border-2 border-pink-300 mb-6">
                  <div className="text-6xl mb-4 animate-bounce">
                    {chaChaSteps[chaChaStep].emoji}
                  </div>
                  <div className="text-2xl font-bold text-pink-600">
                    {chaChaSteps[chaChaStep].text}
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                  Did you get better since yesterday? Notice how much easier it is today! 🌟
                </p>

                <Button onClick={handleChaChaStep} className="bg-pink-600 hover:bg-pink-700">
                  {chaChaStep === 0 ? 'Start Dancing!' : 'Next Step!'}
                </Button>
              </Card>
            )}

            {/* Fish Swimming Application Problem - REPLACED */}
            {currentStep === 'fishSwim' && (
              <FishSwimGame onComplete={() => setCurrentStep('matching')} />
            )}

            {/* Family Matching Activity */}
            {currentStep === 'matching' && (
              <>
                <Card className="p-6 bg-purple-50 border-2 border-purple-200">
                  <h3 className="text-xl font-bold mb-2 text-gray-800 text-center">
                    👨‍👩‍👧‍👦 Match Families to Dots
                  </h3>
                  <p className="text-center text-gray-700 mb-4">
                    Count the people in each family and match to the correct dot pattern!
                  </p>
                  <div className="text-center text-sm text-gray-600">
                    Family {currentFamilyIndex + 1} of {shuffledFamilies.length}
                  </div>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Family Card */}
                  <Card className="p-6 bg-white border-2 border-pink-200">
                    <h4 className="text-lg font-bold mb-4 text-center text-gray-800">
                      This Family
                    </h4>
                    <div className="bg-pink-50 p-6 rounded-lg border-2 border-pink-300 mb-4">
                      <div className="text-6xl text-center mb-3">
                        {shuffledFamilies[currentFamilyIndex].emojis.map((emoji, i) => (
                          <span key={i} className="mx-1">{emoji}</span>
                        ))}
                      </div>
                      <p className="text-center text-gray-600 text-sm">
                        {shuffledFamilies[currentFamilyIndex].description}
                      </p>
                    </div>
                    <p className="text-center text-lg text-gray-700 font-semibold">
                      How many people? Count them!
                    </p>
                  </Card>

                  {/* Dot Cards */}
                  <Card className="p-6 bg-white border-2 border-blue-200">
                    <h4 className="text-lg font-bold mb-4 text-center text-gray-800">
                      Match to Dots
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {[2, 3, 4, 5].map(dots => (
                        <Card
                          key={dots}
                          onClick={() => setSelectedDots(dots)}
                          className={`
                            text-center p-4 cursor-pointer transition-all
                            ${selectedDots === dots 
                              ? 'bg-blue-100 border-4 border-blue-500 scale-105' 
                              : 'bg-white hover:bg-blue-50 border-2 border-blue-300'
                            }
                          `}
                        >
                          <div className="text-4xl mb-2">
                            {Array(dots).fill('⚫').map((dot, i) => (
                              <span key={i}>{dot}</span>
                            ))}
                          </div>
                          <p className="text-sm text-gray-600">{dots} dots</p>
                        </Card>
                      ))}
                    </div>

                    <Button
                      onClick={handleDotMatch}
                      disabled={selectedDots === null}
                      size="lg"
                      className="w-full mt-6 bg-blue-600 hover:bg-blue-700"
                    >
                      Check Match
                    </Button>
                  </Card>
                </div>
              </>
            )}

            {/* Practice Round */}
            {currentStep === 'practice' && (
              <Card className="p-6 bg-orange-50 border-2 border-orange-200">
                <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">
                  🎯 Practice Time!
                </h3>
                <p className="text-center text-gray-700 mb-6">
                  Great job matching families to dots! Let's practice more.
                </p>
                
                <div className="bg-white p-6 rounded-lg border-2 border-orange-300 mb-6 text-center">
                  <div className="text-6xl mb-4">
                    {practiceRound === 0 ? '👨👩👧' : practiceRound === 1 ? '👴👵👨👩' : '👨👨👦👦👶'}
                  </div>
                  <p className="text-lg text-gray-700">
                    How many people in this family?
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                  {[3, 4, 5].map(num => (
                    <Button
                      key={num}
                      onClick={() => {
                        const correct = [3, 4, 5][practiceRound];
                        if (num === correct) {
                          toast.success("Correct! 🎉");
                          if (practiceRound < 2) {
                            setTimeout(() => setPracticeRound(practiceRound + 1), 1000);
                          } else {
                            setTimeout(() => setCurrentStep('complete'), 1000);
                          }
                        } else {
                          toast.error("Try again! 🤔");
                        }
                      }}
                      size="lg"
                      className="h-20 text-2xl font-bold"
                    >
                      {num}
                    </Button>
                  ))}
                </div>
              </Card>
            )}

            {/* Completion */}
            {currentStep === 'complete' && (
              <Card className="bg-gradient-to-br from-purple-100 to-pink-100 border-4 border-purple-400 p-8 text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-3xl font-bold mb-3 text-gray-800">Family Counting Expert!</h3>
                <p className="text-lg text-gray-700 mb-4">
                  You counted people in pictures! Now you know counting works with real objects AND pictures!
                </p>
                <div className="bg-white p-4 rounded-lg border-2 border-purple-300 mb-6">
                  <p className="text-sm text-gray-600">
                    <strong>Today you learned:</strong><br/>
                    • Counting from pictures (not just objects)<br/>
                    • Different families can have the same number of people<br/>
                    • Matching quantities to dot patterns<br/>
                    • The number stays the same in any arrangement! ✨
                  </p>
                </div>
                <Button 
                  size="lg"
                  onClick={() => navigate('/activities/module-1')}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Continue Learning
                </Button>
              </Card>
            )}

            {/* Warmup Start Button */}
            {currentStep === 'warmup' && (
              <Card className="p-6 bg-purple-50 border-2 border-purple-200 text-center">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Ready to Start?</h3>
                <p className="text-gray-700 mb-4">Let's warm up with parking and dancing!</p>
                <Button onClick={() => setCurrentStep('parking')} size="lg" className="bg-purple-600">
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

export default CountingActivity16;
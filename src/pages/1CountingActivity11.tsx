// src/pages/CountingActivity11.tsx
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Star, BookOpen, Users, Lightbulb, CheckCircle2, Car, Trophy } from "lucide-react";
import { toast } from "sonner";

interface GamePosition {
  player1: number;
  player2: number;
}

const CountingActivity11 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [currentStep, setCurrentStep] = useState<'warmup' | 'parking' | 'bearGame' | 'complete'>('warmup');
  const [currentPlayer, setCurrentPlayer] = useState<'player1' | 'player2'>('player1');
  const [gamePositions, setGamePositions] = useState<GamePosition>({ player1: 0, player2: 0 });
  const [parkedCars, setParkedCars] = useState<number[]>([]);
  const [touchFloorStep, setTouchFloorStep] = useState(0);
  const [unparkedCars] = useState([
    { id: 1, emoji: "🚗", color: "red" },
    { id: 2, emoji: "🚙", color: "blue" },
    { id: 3, emoji: "🚕", color: "yellow" },
  ]);
  // Touch the floor actions
  const touchFloorActions = [
    "Touch the floor!",
    "Point to the door!",
    "Start to snore!",
    "Give a roar!",
    "Swim to shore!"
  ];

  // Dot cards for the bear game
  const dotCards = useMemo(() => [
    { id: 1, count: 1, dots: "●" },
    { id: 2, count: 2, dots: "● ●" },
    { id: 3, count: 3, dots: "● ● ●" },
    { id: 4, count: 1, dots: "●" },
    { id: 5, count: 2, dots: "● ●" },
    { id: 6, count: 3, dots: "● ● ●" },
    { id: 7, count: 1, dots: "●" },
    { id: 8, count: 2, dots: "● ●" },
    { id: 9, count: 3, dots: "● ● ●" },
  ].sort(() => Math.random() - 0.5), []);

  // Parking lot spots
  const parkingSpots = [1, 2, 3];

  const handleTouchFloor = () => {
    setTouchFloorStep((prev) => {
      if (prev < touchFloorActions.length - 1) {
        return prev + 1;
      } else {
        setCurrentStep('parking');
        return 0;
      }
    });
  };

  const handleParkCar = (spot: number) => {
    if (parkedCars.includes(spot)) {
      toast.error("Spot taken! 🚗", { description: "This parking spot already has a car!" });
      return;
    }

    setParkedCars([...parkedCars, spot]);
    toast.success("Perfect parking! 🎉", { 
      description: `Car parked in spot ${spot}! ${3 - parkedCars.length - 1} spots left.` 
    });

    if (parkedCars.length + 1 === 3) {
      setTimeout(() => {
        setCurrentStep('bearGame');
        setParkedCars([]);
      }, 2000);
    }
  };

  const handleDotCardPick = (cardCount: number) => {
    const newPosition = gamePositions[currentPlayer] + cardCount;
    
    if (newPosition <= 8) { // 8 spaces to reach the beehive
      setGamePositions({
        ...gamePositions,
        [currentPlayer]: newPosition
      });

      toast.success(`Great counting! 🐻`, { 
        description: `${currentPlayer === 'player1' ? 'Red Bear' : 'Blue Bear'} moved ${cardCount} spaces!` 
      });

      // Check for winner
      if (newPosition >= 8) {
        setTimeout(() => setCurrentStep('complete'), 1000);
        return;
      }

      // Switch players
      setCurrentPlayer(currentPlayer === 'player1' ? 'player2' : 'player1');
    } else {
      toast.info("Almost there! 🍯", { 
        description: "Pick a smaller number to land exactly on the beehive!" 
      });
    }
  };

  const renderGameBoard = () => {
    const spaces = Array.from({ length: 9 }, (_, i) => i);
    
    return (
      <div className="bg-amber-50 p-6 rounded-lg border-2 border-amber-200">
        <div className="grid grid-cols-3 gap-2 mb-4">
          {spaces.map((space, index) => {
            const hasPlayer1 = gamePositions.player1 === space;
            const hasPlayer2 = gamePositions.player2 === space;
            const isBeehive = space === 8;
            
            return (
              <div
                key={space}
                className={`
                  h-16 border-2 rounded-lg flex items-center justify-center relative
                  ${isBeehive 
                    ? 'bg-yellow-100 border-yellow-400' 
                    : 'bg-white border-gray-300'
                  }
                `}
              >
                {isBeehive ? (
                  <div className="text-2xl">🍯</div>
                ) : (
                  <div className="text-sm text-gray-500">{space + 1}</div>
                )}
                
                {hasPlayer1 && (
                  <div className="absolute top-0 left-0 text-2xl">🐻‍❄️</div>
                )}
                {hasPlayer2 && (
                  <div className="absolute bottom-0 right-0 text-2xl">🐻</div>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="text-center text-sm text-gray-600 mb-4">
          <div className="flex justify-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🐻‍❄️</span>
              <span>Red Bear: Space {gamePositions.player1 + 1}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🐻</span>
              <span>Blue Bear: Space {gamePositions.player2 + 1}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-amber-50 to-green-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                Lesson 11
              </span>
              <h1 className="text-2xl font-bold text-gray-800">Counting Games</h1>
            </div>
            <p className="text-sm text-gray-600">Topic C: Counting to 3</p>
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
                  Today, your child will learn to <span className="font-bold text-blue-700">arrange and count up to 3 objects to play games</span>, 
                  developing counting skills through fun, interactive activities.
                </p>
              </CardContent>
            </Card>

            {/* Introduction */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">Counting Games Are Fun!</CardTitle>
                <CardDescription>Read this together with your child</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                  <p className="text-lg text-gray-700 mb-4">
                    Today we'll play two exciting counting games!
                  </p>
                  <div className="grid md:grid-cols-2 gap-6 mb-4">
                    <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                      <div className="flex items-center gap-2 mb-3">
                        <Car className="w-6 h-6 text-green-600" />
                        <p className="font-bold text-green-700">Parking Lot Game</p>
                      </div>
                      <p className="text-sm text-gray-600">
                        Park cars in numbered spots - one car per space, just like real parking lots!
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border-2 border-amber-200">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">🐻</span>
                        <p className="font-bold text-amber-700">Bear Race Game</p>
                      </div>
                      <p className="text-sm text-gray-600">
                        Help bears race to the beehive by counting dots and moving spaces!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Real World Connection */}
                <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                  <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="text-2xl">🌍</span> Real World Counting
                  </h4>
                  <p className="text-sm text-gray-600">
                    Just like parking cars in spaces or moving game pieces, counting helps us organize 
                    and play fairly. These skills help in sports, board games, and everyday activities!
                  </p>
                </div>

                {/* Game Instructions */}
                <div className="bg-amber-50 p-4 rounded-lg border-2 border-amber-200">
                  <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="text-2xl">🎮</span> How to Play
                  </h4>
                  <ol className="text-sm text-gray-600 space-y-2 ml-6">
                    <li><strong>1.</strong> Parking Lot: Park 3 cars in numbered spots</li>
                    <li><strong>2.</strong> Bear Race: Take turns picking dot cards</li>
                    <li><strong>3.</strong> Count the dots and move your bear</li>
                    <li><strong>4.</strong> First bear to reach the beehive wins!</li>
                  </ol>
                </div>

                {/* Parent Tips */}
                <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                  <Users className="w-8 h-8 text-purple-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Parent Tips:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Encourage taking turns and good sportsmanship</li>
                      <li>• Ask: "How many dots did you count?" before moving</li>
                      <li>• Help notice that each space gets one game piece</li>
                      <li>• Celebrate both players' counting achievements</li>
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
                      <p className="font-bold text-blue-700">Space</p>
                      <p className="text-sm text-gray-600">One spot for one object</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="font-bold text-blue-700">Turn</p>
                      <p className="text-sm text-gray-600">Waiting for your chance</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="font-bold text-blue-700">Move</p>
                      <p className="text-sm text-gray-600">Go forward spaces</p>
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
                className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Start Counting Games
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Warm-up Activities */}
            {currentStep === 'warmup' && (
              <>
                {/* Dot Path Parking Lot */}
                <Card className="p-6 bg-green-50 border-2 border-green-200">
                  <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                    <Car className="w-6 h-6" />
                    Dot Path Parking Lot Warm-up
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Let's practice parking cars on dot paths! Each car gets its own space, just like in a real parking lot.
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg border-2 border-gray-300 mb-4">
                    <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                      {[1, 2, 3].map(spot => (
                        <div
                          key={spot}
                          className="text-center p-4 border-2 border-gray-400 rounded-lg bg-gray-50"
                        >
                          <div className="text-2xl font-bold text-gray-700 mb-2">●</div>
                          <div className="h-12 flex items-center justify-center">
                            <div className="text-2xl">🚗</div>
                          </div>
                          <div className="text-sm text-gray-600">Space {spot}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 text-center mb-4">
                    "One car, one space!" - Just like each student has their own chair!
                  </p>

                  <Button onClick={() => setCurrentStep('parking')} className="w-full">
                    Ready to Play Parking Lot Game!
                  </Button>
                </Card>

                {/* 1, 2, 3, 4, Touch the Floor */}
                <Card className="p-6 bg-blue-50 border-2 border-blue-200 text-center">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">
                    1, 2, 3, 4, Touch the Floor!
                  </h3>
                  
                  <div className="bg-white p-6 rounded-lg border-2 border-blue-300 mb-4">
                    <div className="text-4xl font-bold text-blue-700 mb-4">
                      1, 2, 3, 4
                    </div>
                    <div className="text-2xl font-bold text-red-600 animate-bounce">
                      {touchFloorActions[touchFloorStep]}
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">
                    Let's count together and do the actions! Get ready to move!
                  </p>

                  <Button onClick={handleTouchFloor} className="bg-red-600 hover:bg-red-700">
                    {touchFloorStep === 0 ? 'Start Counting!' : 'Next Action!'}
                  </Button>
                </Card>
              </>
            )}

            {/* Parking Lot Game */}
{currentStep === 'parking' && (
  <>
    <Card className="p-6 bg-green-50 border-2 border-green-200">
      <h3 className="text-xl font-bold mb-2 text-gray-800 flex items-center gap-2">
        <Car className="w-6 h-6" />
        Parking Lot Game
      </h3>
      <p className="text-gray-700 mb-4">
        Park the cars! Each car gets its own numbered space. Watch the queue get shorter as you park them!
      </p>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <div className="flex-1 bg-white p-2 rounded border">
          Cars parked: {parkedCars.length} of 3
        </div>
        <div className="flex-1 bg-white p-2 rounded border">
          Cars waiting: {3 - parkedCars.length}
        </div>
      </div>
    </Card>

    {/* Cars Waiting to Park (Queue) */}
    <Card className="p-6 bg-blue-50 border-2 border-blue-200">
      <h4 className="text-lg font-bold mb-4 text-gray-800 text-center">
        🚗 Cars Waiting in Queue
      </h4>
      <div className="flex justify-center gap-6 min-h-[100px] items-center">
        {unparkedCars.map((car, index) => {
          const isParked = index < parkedCars.length;
          return (
            <div
              key={car.id}
              className={`transition-all duration-500 ${
                isParked ? 'opacity-20 scale-75' : 'opacity-100 scale-100'
              }`}
            >
              <div className="text-center">
                <div className="text-6xl mb-2">{car.emoji}</div>
                <div className={`text-sm font-semibold ${
                  isParked ? 'text-gray-400 line-through' : 'text-gray-700'
                }`}>
                  {car.color} car
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
          : parkedCars.length === 3 
          ? "All cars are parked! 🎉" 
          : `Click a parking spot to park the ${unparkedCars[parkedCars.length].color} car!`
        }
      </p>
    </Card>

    {/* Parking Lot */}
    <Card className="p-6 bg-gray-100 border-2 border-gray-300">
      <h4 className="text-lg font-bold mb-4 text-gray-800 text-center">
        🅿️ Parking Lot
      </h4>
      <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
        {parkingSpots.map(spot => {
          const spotIndex = parkedCars.indexOf(spot);
          const isParked = spotIndex !== -1;
          const carInSpot = isParked ? unparkedCars[spotIndex] : null;
          
          return (
            <Card
              key={spot}
              onClick={() => !isParked && handleParkCar(spot)}
              className={`
                text-center p-4 cursor-pointer transition-all duration-300
                ${isParked 
                  ? 'bg-green-100 border-4 border-green-500' 
                  : 'bg-white hover:bg-green-50 border-2 border-gray-400 hover:border-green-300 hover:scale-105'
                }
              `}
            >
              <div className="text-2xl font-bold text-gray-700 mb-2">
                Spot {spot}
              </div>
              <div className="h-16 flex items-center justify-center">
                {isParked && carInSpot ? (
                  <div className="animate-bounce">
                    <div className="text-4xl">{carInSpot.emoji}</div>
                    <div className="text-xs text-gray-600 mt-1">{carInSpot.color}</div>
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

            {/* Bear Race Game */}
            {currentStep === 'bearGame' && (
              <>
                <Card className="p-6 bg-amber-50 border-2 border-amber-200">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">
                    🐻 Bear Race to the Beehive!
                  </h3>
                  <p className="text-gray-700 mb-2">
                    <strong className="text-blue-700">{currentPlayer === 'player1' ? 'Red Bear' : 'Blue Bear'}'s turn!</strong>{' '}
                    Pick a dot card, count the dots, and move your bear that many spaces.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex-1 bg-white p-2 rounded border text-center">
                      Current Player: {currentPlayer === 'player1' ? '🐻‍❄️ Red Bear' : '🐻 Blue Bear'}
                    </div>
                  </div>
                </Card>

                {/* Game Board */}
                {renderGameBoard()}

                {/* Dot Cards */}
                <Card className="p-6 bg-white border-2 border-blue-200">
                  <h3 className="text-lg font-bold mb-4 text-gray-800 text-center">
                    Pick a Dot Card!
                  </h3>
                  <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                    {dotCards.slice(0, 3).map(card => (
                      <Card
                        key={card.id}
                        onClick={() => handleDotCardPick(card.count)}
                        className="text-center p-4 cursor-pointer hover:scale-105 transition-all bg-blue-50 border-2 border-blue-300"
                      >
                        <div className="text-3xl font-bold text-gray-800 mb-2">
                          {card.dots}
                        </div>
                        <p className="text-sm text-gray-600">{card.count} space{card.count > 1 ? 's' : ''}</p>
                      </Card>
                    ))}
                  </div>
                </Card>
              </>
            )}

            {/* Completion */}
            {currentStep === 'complete' && (
              <Card className="bg-gradient-to-br from-yellow-100 to-amber-100 border-4 border-yellow-400 p-8 text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-3xl font-bold mb-3 text-gray-800">Game Champion! 🏆</h3>
                <p className="text-lg text-gray-700 mb-4">
                  {gamePositions.player1 >= 8 ? '🐻‍❄️ Red Bear' : '🐻 Blue Bear'} reached the beehive first! 
                  You both did amazing counting!
                </p>
                <div className="bg-white p-4 rounded-lg border-2 border-amber-300 mb-6">
                  <p className="text-sm text-gray-600">
                    <strong>Final Scores:</strong><br/>
                    🐻‍❄️ Red Bear: {gamePositions.player1} spaces<br/>
                    🐻 Blue Bear: {gamePositions.player2} spaces
                  </p>
                </div>
                <Button 
                  size="lg"
                  onClick={() => navigate('/activities')}
                  className="bg-amber-600 hover:bg-amber-700"
                >
                  Continue Learning
                </Button>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CountingActivity11;

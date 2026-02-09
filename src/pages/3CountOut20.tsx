import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, RotateCcw, Volume2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Phase = "fluency" | "concept" | "application" | "debrief";

const CountOut20 = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("fluency");
  
  // Fluency state
  const [balanceCount, setBalanceCount] = useState(0);
  const [balanceTarget, setBalanceTarget] = useState(9);
  const [balanceLeg, setBalanceLeg] = useState<"left" | "right">("left");
  const [isBalancing, setIsBalancing] = useState(false);
  const [balanceRound, setBalanceRound] = useState(1);
  
  // Concept state
  const [conceptStep, setConceptStep] = useState<"intro" | "practice">("intro");
  const [targetNumber, setTargetNumber] = useState(8);
  const [flowersCounted, setFlowersCounted] = useState<number[]>([]);
  const [orderComplete, setOrderComplete] = useState(false);
  const [practiceOrders, setPracticeOrders] = useState<number[]>([]);
  const [currentOrderIndex, setCurrentOrderIndex] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Application state
  const [appStep, setAppStep] = useState(1);
  const [seatedBees, setSeatedBees] = useState<number[]>([]);
  const [tallyMarks, setTallyMarks] = useState(0);
  const [chefFlowers, setChefFlowers] = useState<number[]>([]);
  const [flowersDelivered, setFlowersDelivered] = useState(0);
  const [beeCount] = useState(() => Math.floor(Math.random() * 6) + 3);

  // Initialize practice orders
  useEffect(() => {
    const orders = [3, 4, 5, 6, 7, 8].sort(() => Math.random() - 0.5).slice(0, 3);
    setPracticeOrders(orders);
  }, []);

  // Fluency: Balance and count
  const startBalancing = () => {
    setIsBalancing(true);
    setBalanceCount(0);
  };

  useEffect(() => {
    if (isBalancing && balanceCount < balanceTarget) {
      const delay = balanceCount === 4 ? 1200 : 600; // Drag out "fiiiiive"
      const timer = setTimeout(() => {
        setBalanceCount(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    } else if (balanceCount === balanceTarget) {
      setIsBalancing(false);
    }
  }, [isBalancing, balanceCount, balanceTarget]);

  const nextBalanceRound = () => {
    if (balanceRound < 4) {
      setBalanceRound(prev => prev + 1);
      setBalanceCount(0);
      setBalanceLeg(prev => prev === "left" ? "right" : "left");
      if (balanceRound >= 2) {
        setBalanceTarget(10);
      }
    }
  };

  // Concept: Count out flowers
  const addFlower = () => {
    if (flowersCounted.length < targetNumber) {
      setFlowersCounted(prev => [...prev, prev.length + 1]);
      if (flowersCounted.length + 1 === targetNumber) {
        setOrderComplete(true);
        setShowSuccess(true);
      }
    }
  };

  const nextPracticeOrder = () => {
    if (currentOrderIndex < practiceOrders.length - 1) {
      setCurrentOrderIndex(prev => prev + 1);
      setTargetNumber(practiceOrders[currentOrderIndex + 1]);
      setFlowersCounted([]);
      setOrderComplete(false);
      setShowSuccess(false);
    } else {
      setPhase("application");
    }
  };

  const startPractice = () => {
    setConceptStep("practice");
    setTargetNumber(practiceOrders[0]);
    setFlowersCounted([]);
    setOrderComplete(false);
  };

  // Application: Full café role play
  const seatBee = () => {
    if (seatedBees.length < beeCount) {
      setSeatedBees(prev => [...prev, prev.length + 1]);
    }
  };

  const addTally = () => {
    if (tallyMarks < beeCount) {
      setTallyMarks(prev => prev + 1);
    }
  };

  const addChefFlower = () => {
    if (chefFlowers.length < beeCount) {
      setChefFlowers(prev => [...prev, prev.length + 1]);
    }
  };

  const deliverFlower = () => {
    if (flowersDelivered < beeCount) {
      setFlowersDelivered(prev => prev + 1);
    }
  };

  const resetLesson = () => {
    setPhase("fluency");
    setBalanceCount(0);
    setBalanceTarget(9);
    setBalanceLeg("left");
    setIsBalancing(false);
    setBalanceRound(1);
    setConceptStep("intro");
    setTargetNumber(8);
    setFlowersCounted([]);
    setOrderComplete(false);
    setCurrentOrderIndex(0);
    setShowSuccess(false);
    setAppStep(1);
    setSeatedBees([]);
    setTallyMarks(0);
    setChefFlowers([]);
    setFlowersDelivered(0);
  };

  // Render tally marks
  const renderTallies = (count: number) => {
    const bundles = Math.floor(count / 5);
    const remainder = count % 5;
    
    return (
      <div className="flex gap-3 items-end">
        {Array.from({ length: bundles }).map((_, bundleIdx) => (
          <div key={`bundle-${bundleIdx}`} className="flex gap-0.5 relative">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-1 h-6 bg-amber-800 rounded-sm" />
            ))}
            <div 
              className="absolute -left-0.5 -right-0.5 h-0.5 bg-amber-800 rounded-full top-1/2 -rotate-45"
              style={{ width: "calc(100% + 4px)" }}
            />
          </div>
        ))}
        {remainder > 0 && (
          <div className="flex gap-0.5">
            {Array.from({ length: remainder }).map((_, i) => (
              <div key={i} className="w-1 h-6 bg-amber-800 rounded-sm" />
            ))}
          </div>
        )}
      </div>
    );
  };

  const Bee = ({ size = "md" }: { size?: "sm" | "md" }) => (
    <span className={size === "sm" ? "text-lg" : "text-2xl"}>🐝</span>
  );

  const Flower = ({ size = "md", dimmed = false }: { size?: "sm" | "md"; dimmed?: boolean }) => (
    <span className={`${size === "sm" ? "text-lg" : "text-2xl"} ${dimmed ? "opacity-30" : ""}`}>🌸</span>
  );

  const renderPhase = () => {
    switch (phase) {
      case "fluency":
        return (
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold text-amber-800">Balance and Count!</h2>
            <p className="text-lg text-amber-700">
              Stand on your <span className="font-bold">{balanceLeg}</span> leg and count to {balanceTarget}!
            </p>
            
            <div className="flex justify-center py-4">
              <div className={`text-8xl transition-transform duration-300 ${isBalancing ? "animate-pulse" : ""}`}>
                {balanceLeg === "left" ? "🦩" : "🦩"}
              </div>
            </div>

            <div className="flex justify-center gap-2 flex-wrap py-2">
              {Array.from({ length: balanceTarget }).map((_, i) => (
                <div
                  key={i}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                    i < balanceCount
                      ? i === 4 
                        ? "bg-amber-500 text-white scale-125 animate-bounce" 
                        : "bg-amber-400 text-white scale-110"
                      : "bg-amber-100 text-amber-400"
                  }`}
                >
                  {i === 4 && i < balanceCount ? "5!" : i + 1}
                </div>
              ))}
            </div>

            {balanceCount === balanceTarget && (
              <div className="text-2xl font-bold text-green-600 animate-pulse">
                🎉 Great balance! You counted to {balanceTarget}! 🎉
              </div>
            )}

            <div className="flex justify-center gap-4">
              {!isBalancing && balanceCount < balanceTarget && (
                <Button onClick={startBalancing} className="bg-amber-500 hover:bg-amber-600 text-xl px-8 py-6">
                  <Volume2 className="mr-2" /> Start Counting!
                </Button>
              )}
              {balanceCount === balanceTarget && balanceRound < 4 && (
                <Button onClick={nextBalanceRound} className="bg-amber-500 hover:bg-amber-600 text-xl px-8 py-6">
                  Switch legs! <ArrowRight className="ml-2" />
                </Button>
              )}
              {balanceCount === 10 && balanceRound === 4 && (
                <Button onClick={() => setPhase("concept")} className="bg-green-500 hover:bg-green-600 text-xl px-8 py-6">
                  Continue <ArrowRight className="ml-2" />
                </Button>
              )}
            </div>

            <p className="text-sm text-amber-600">Round {balanceRound} of 4</p>
          </div>
        );

      case "concept":
        return (
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold text-amber-800">👨‍🍳 Be the Chef! 👩‍🍳</h2>
            
            {conceptStep === "intro" && (
              <div className="space-y-4">
                <p className="text-lg text-amber-700">
                  You're a chef at the Pollen Café! Count out exactly 8 flowers for this order.
                </p>

                {/* Order card */}
                <Card className="bg-amber-100 border-amber-300 max-w-xs mx-auto">
                  <CardContent className="p-4">
                    <p className="text-sm text-amber-600 mb-1">Order Card</p>
                    <div className="text-6xl font-bold text-amber-800">8</div>
                    <p className="text-amber-700">flowers needed</p>
                  </CardContent>
                </Card>

                <p className="text-amber-600">Tap flowers to count them out. Stop when you reach 8!</p>

                {/* Flower supply */}
                <div className="bg-amber-50 rounded-xl p-4 max-w-md mx-auto">
                  <p className="text-sm text-amber-600 mb-2">Flower Supply (tap to pick)</p>
                  <div className="flex flex-wrap gap-2 justify-center min-h-16">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <button
                        key={i}
                        onClick={addFlower}
                        disabled={flowersCounted.length >= 8}
                        className={`p-1 rounded-lg transition-all ${
                          i < flowersCounted.length 
                            ? "opacity-30 cursor-not-allowed" 
                            : "hover:bg-amber-200 cursor-pointer hover:scale-110"
                        }`}
                      >
                        <Flower />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Counted flowers */}
                <Card className="bg-white border-amber-300 max-w-md mx-auto">
                  <CardContent className="p-4">
                    <p className="text-sm text-amber-600 mb-2">Your Order Line</p>
                    <div className="flex gap-1 justify-center min-h-12 flex-wrap">
                      {flowersCounted.map((_, i) => (
                        <div key={i} className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                          <Flower size="sm" />
                        </div>
                      ))}
                      {flowersCounted.length < 8 && (
                        <div className="w-10 h-10 border-2 border-dashed border-amber-300 rounded-lg flex items-center justify-center text-amber-400">
                          ?
                        </div>
                      )}
                    </div>
                    <p className="text-xl font-bold text-amber-800 mt-2">
                      Count: {flowersCounted.length}
                      {flowersCounted.length === 8 && " — STOP!"}
                    </p>
                  </CardContent>
                </Card>

                {showSuccess && (
                  <div className="space-y-2">
                    <p className="text-xl font-bold text-green-600">✓ Perfect! You counted out exactly 8 flowers!</p>
                    <Button onClick={startPractice} className="bg-green-500 hover:bg-green-600">
                      Practice More Orders <ArrowRight className="ml-2" />
                    </Button>
                  </div>
                )}
              </div>
            )}

            {conceptStep === "practice" && (
              <div className="space-y-4">
                <p className="text-lg text-amber-700">
                  Order {currentOrderIndex + 1} of {practiceOrders.length}: Count out {targetNumber} flowers!
                </p>

                <Card className="bg-amber-100 border-amber-300 max-w-xs mx-auto">
                  <CardContent className="p-4">
                    <p className="text-sm text-amber-600 mb-1">Order Card</p>
                    <div className="text-5xl font-bold text-amber-800">{targetNumber}</div>
                    {/* Dot pattern on back */}
                    <div className="flex flex-wrap justify-center gap-1 mt-2 max-w-20 mx-auto">
                      {Array.from({ length: targetNumber }).map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-amber-600 rounded-full" />
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="bg-amber-50 rounded-xl p-4 max-w-md mx-auto">
                  <p className="text-sm text-amber-600 mb-2">Tap to pick flowers</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <button
                        key={i}
                        onClick={addFlower}
                        disabled={orderComplete}
                        className={`p-1 rounded-lg transition-all ${
                          i < flowersCounted.length 
                            ? "opacity-30" 
                            : "hover:bg-amber-200 cursor-pointer hover:scale-110"
                        }`}
                      >
                        <Flower />
                      </button>
                    ))}
                  </div>
                </div>

                <Card className="bg-white border-amber-300 max-w-md mx-auto">
                  <CardContent className="p-4">
                    <p className="text-sm text-amber-600 mb-2">Your Order</p>
                    <div className="flex gap-1 justify-center min-h-10 flex-wrap">
                      {flowersCounted.map((_, i) => (
                        <div key={i} className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                          <Flower size="sm" />
                        </div>
                      ))}
                    </div>
                    <p className="text-lg font-bold text-amber-800 mt-2">
                      Count: {flowersCounted.length}
                      {orderComplete && " — STOP!"}
                    </p>
                  </CardContent>
                </Card>

                {orderComplete && (
                  <div className="space-y-2">
                    <p className="text-xl font-bold text-green-600">
                      ✓ You counted out {targetNumber} flowers!
                    </p>
                    <Button onClick={nextPracticeOrder} className="bg-amber-500 hover:bg-amber-600">
                      {currentOrderIndex < practiceOrders.length - 1 ? "Next Order" : "Continue"} 
                      <ArrowRight className="ml-2" />
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case "application":
        return (
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold text-amber-800">🐝 Full Café Service! 🌸</h2>
            
            {appStep === 1 && (
              <div className="space-y-4">
                <p className="text-lg text-amber-700">Step 1: Seat the {beeCount} bee customers!</p>
                
                <div className="flex justify-center gap-1 py-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      onClick={seatBee}
                      className={`w-12 h-14 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all ${
                        i < beeCount
                          ? i < 5 ? "bg-yellow-200 border-yellow-400" : "bg-orange-200 border-orange-400"
                          : "bg-gray-100 border-gray-200"
                      } border-2`}
                    >
                      <div className="h-6 flex items-center justify-center">
                        {i < seatedBees.length ? <Bee size="sm" /> : 
                          i < beeCount ? <span className="text-gray-300 text-xs">🪑</span> : null}
                      </div>
                      <span className="text-xs font-bold text-amber-800">{i + 1}</span>
                    </div>
                  ))}
                </div>

                {seatedBees.length === beeCount && (
                  <Button onClick={() => setAppStep(2)} className="bg-amber-500 hover:bg-amber-600">
                    Take the order! <ArrowRight className="ml-2" />
                  </Button>
                )}
              </div>
            )}

            {appStep === 2 && (
              <div className="space-y-4">
                <p className="text-lg text-amber-700">Step 2: Waiter tallies {beeCount} flower orders!</p>
                
                <div className="flex justify-center gap-1 py-2">
                  {Array.from({ length: beeCount }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        i < tallyMarks ? "bg-green-100" : "bg-amber-100"
                      }`}
                    >
                      <Bee size="sm" />
                    </div>
                  ))}
                </div>

                <Card className="bg-white border-amber-300 max-w-xs mx-auto cursor-pointer" onClick={addTally}>
                  <CardContent className="p-4">
                    <p className="text-sm text-amber-600 mb-2">Order Pad (tap to tally)</p>
                    <div className="min-h-10 flex items-center justify-center">
                      {tallyMarks > 0 ? renderTallies(tallyMarks) : (
                        <span className="text-gray-400 text-sm">Tap to add...</span>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {tallyMarks === beeCount && (
                  <Button onClick={() => setAppStep(3)} className="bg-amber-500 hover:bg-amber-600">
                    Give order to chef! <ArrowRight className="ml-2" />
                  </Button>
                )}
              </div>
            )}

            {appStep === 3 && (
              <div className="space-y-4">
                <p className="text-lg text-amber-700">Step 3: Chef counts out {beeCount} flowers!</p>
                
                <div className="flex justify-center gap-2 mb-2">
                  {renderTallies(beeCount)}
                  <span className="text-amber-600 font-bold">= {beeCount} flowers</span>
                </div>

                <div className="bg-amber-50 rounded-xl p-3 max-w-sm mx-auto">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <button
                        key={i}
                        onClick={addChefFlower}
                        disabled={chefFlowers.length >= beeCount}
                        className={`p-1 rounded-lg transition-all ${
                          i < chefFlowers.length ? "opacity-30" : "hover:bg-amber-200"
                        }`}
                      >
                        <Flower size="sm" />
                      </button>
                    ))}
                  </div>
                </div>

                <p className="font-bold text-amber-800">
                  Chef's order: {chefFlowers.length} / {beeCount}
                </p>

                {chefFlowers.length === beeCount && (
                  <Button onClick={() => setAppStep(4)} className="bg-amber-500 hover:bg-amber-600">
                    Deliver flowers! <ArrowRight className="ml-2" />
                  </Button>
                )}
              </div>
            )}

            {appStep === 4 && (
              <div className="space-y-4">
                <p className="text-lg text-amber-700">Step 4: Waiter delivers flowers to bees!</p>
                
                <div className="flex justify-center gap-1 py-4">
                  {Array.from({ length: beeCount }).map((_, i) => (
                    <div
                      key={i}
                      onClick={deliverFlower}
                      className="w-12 h-16 rounded-lg flex flex-col items-center justify-center cursor-pointer bg-amber-100 border-2 border-amber-300"
                    >
                      <Bee size="sm" />
                      <div className="h-6 flex items-center justify-center">
                        {i < flowersDelivered ? <Flower size="sm" /> : <span className="text-gray-300">?</span>}
                      </div>
                    </div>
                  ))}
                </div>

                {flowersDelivered === beeCount && (
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-green-600">🎉 All {beeCount} bees served! 🎉</p>
                    <Button onClick={() => setPhase("debrief")} className="bg-green-500 hover:bg-green-600">
                      Finish <ArrowRight className="ml-2" />
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case "debrief":
        return (
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold text-amber-800">🎉 Amazing Chef Work! 🎉</h2>
            
            <Card className="bg-amber-50 border-amber-200 max-w-lg mx-auto">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-amber-800">What We Learned:</h3>
                
                <div className="text-left space-y-3 text-amber-700">
                  <p>📌 <strong>Look at the numeral</strong> to know how many to count out.</p>
                  <p>📌 <strong>Say "STOP!"</strong> when you reach the target number.</p>
                  <p>📌 <strong>Count carefully</strong> — not too many, not too few!</p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-amber-200">
                  <p className="text-amber-800 font-semibold mb-2">All of these show 8:</p>
                  <div className="flex justify-center items-center gap-4 flex-wrap">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-amber-800">8</div>
                      <p className="text-xs text-amber-600">numeral</p>
                    </div>
                    <div className="text-center">
                      {renderTallies(8)}
                      <p className="text-xs text-amber-600">tallies</p>
                    </div>
                    <div className="text-center">
                      <div className="flex flex-wrap justify-center gap-0.5 max-w-12">
                        {Array.from({ length: 8 }).map((_, i) => (
                          <div key={i} className="w-2 h-2 bg-amber-600 rounded-full" />
                        ))}
                      </div>
                      <p className="text-xs text-amber-600">dots</p>
                    </div>
                    <div className="text-center">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 8 }).map((_, i) => (
                          <Flower key={i} size="sm" />
                        ))}
                      </div>
                      <p className="text-xs text-amber-600">objects</p>
                    </div>
                  </div>
                </div>

                <p className="text-amber-600 italic">
                  When counting out objects, keep the target number in your head and stop when you reach it!
                </p>
              </CardContent>
            </Card>

            <div className="flex justify-center gap-4 flex-wrap">
              <Button onClick={resetLesson} variant="outline" className="border-amber-400 text-amber-700">
                <RotateCcw className="mr-2 h-4 w-4" /> Try Again
              </Button>
              <Button onClick={() => navigate("/learning")} className="bg-amber-500 hover:bg-amber-600">
                Back to Lessons <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        );
    }
  };

  const phases: Phase[] = ["fluency", "concept", "application", "debrief"];
  const phaseLabels: Record<Phase, string> = {
    fluency: "Fluency",
    concept: "Concept",
    application: "Application",
    debrief: "Debrief"
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-yellow-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => navigate("/learning")} className="text-amber-700">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <h1 className="text-lg font-bold text-amber-800 text-center">Lesson 20: Count Out Up to 8</h1>
          <div className="w-20" />
        </div>

        {/* Progress bar */}
        <div className="flex gap-2 mb-8">
          {phases.map((p) => (
            <button
              key={p}
              onClick={() => setPhase(p)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                phase === p
                  ? "bg-amber-500 text-white"
                  : phases.indexOf(p) < phases.indexOf(phase)
                  ? "bg-amber-300 text-amber-800"
                  : "bg-amber-100 text-amber-500"
              }`}
            >
              {phaseLabels[p]}
            </button>
          ))}
        </div>

        {/* Main content */}
        <Card className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-xl">
          <CardContent className="p-8">
            {renderPhase()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CountOut20;

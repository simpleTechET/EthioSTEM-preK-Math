import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, RotateCcw, Volume2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Phase = "fluency" | "application" | "concept" | "practice" | "debrief";

const Tally19 = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("fluency");
  const [marchCount, setMarchCount] = useState(0);
  const [marchTarget, setMarchTarget] = useState(9);
  const [isMarching, setIsMarching] = useState(false);
  
  // Application state
  const [beeCount, setBeeCount] = useState(0);
  const [selectedNumeral, setSelectedNumeral] = useState<number | null>(null);
  const [beeCupCount] = useState(() => Math.floor(Math.random() * 6) + 3); // 3-8 bees
  
  // Concept state
  const [seatedBees, setSeatedBees] = useState<number[]>([]);
  const [tallyMarks, setTallyMarks] = useState(0);
  const [flowersDelivered, setFlowersDelivered] = useState(0);
  const [conceptStep, setConceptStep] = useState(0);
  
  // Practice state
  const [practiceRole, setPracticeRole] = useState<"seater" | "waiter">("seater");
  const [practiceBees, setPracticeBees] = useState<number[]>([]);
  const [practiceTallies, setPracticeTallies] = useState(0);
  const [practiceComplete, setPracticeComplete] = useState(false);
  const [practiceBeeCount] = useState(() => Math.floor(Math.random() * 6) + 3);

  // Fluency: March and count
  const startMarching = () => {
    setIsMarching(true);
    setMarchCount(0);
  };

  useEffect(() => {
    if (isMarching && marchCount < marchTarget) {
      const timer = setTimeout(() => {
        setMarchCount(prev => prev + 1);
      }, 600);
      return () => clearTimeout(timer);
    } else if (marchCount === marchTarget) {
      setIsMarching(false);
    }
  }, [isMarching, marchCount, marchTarget]);

  const handleMarchComplete = () => {
    if (marchTarget === 9) {
      setMarchTarget(10);
      setMarchCount(0);
    }
  };

  // Application: Count bees and find numeral
  const countBee = () => {
    if (beeCount < beeCupCount) {
      setBeeCount(prev => prev + 1);
    }
  };

  const checkNumeral = (num: number) => {
    setSelectedNumeral(num);
  };

  // Concept: Seat bees and tally
  const seatBee = () => {
    if (seatedBees.length < 8) {
      setSeatedBees(prev => [...prev, prev.length + 1]);
    }
  };

  const addTally = () => {
    if (tallyMarks < 8) {
      setTallyMarks(prev => prev + 1);
    }
  };

  const deliverFlower = () => {
    if (flowersDelivered < 8) {
      setFlowersDelivered(prev => prev + 1);
    }
  };

  // Practice: Seat bees or tally
  const seatPracticeBee = () => {
    if (practiceBees.length < practiceBeeCount) {
      setPracticeBees(prev => [...prev, prev.length + 1]);
    }
  };

  const addPracticeTally = () => {
    if (practiceTallies < practiceBeeCount) {
      setPracticeTallies(prev => prev + 1);
    }
  };

  const switchRole = () => {
    setPracticeRole(prev => prev === "seater" ? "waiter" : "seater");
    setPracticeBees([]);
    setPracticeTallies(0);
  };

  const resetLesson = () => {
    setPhase("fluency");
    setMarchCount(0);
    setMarchTarget(9);
    setIsMarching(false);
    setBeeCount(0);
    setSelectedNumeral(null);
    setSeatedBees([]);
    setTallyMarks(0);
    setFlowersDelivered(0);
    setConceptStep(0);
    setPracticeRole("seater");
    setPracticeBees([]);
    setPracticeTallies(0);
    setPracticeComplete(false);
  };

  // Render tally marks with bundle at 5
  const renderTallies = (count: number, size: "sm" | "lg" = "lg") => {
    const height = size === "lg" ? "h-10" : "h-6";
    const width = size === "lg" ? "w-1.5" : "w-1";
    const gap = size === "lg" ? "gap-1" : "gap-0.5";
    
    const bundles = Math.floor(count / 5);
    const remainder = count % 5;
    
    return (
      <div className="flex gap-4 items-end">
        {/* Bundles of 5 */}
        {Array.from({ length: bundles }).map((_, bundleIdx) => (
          <div key={`bundle-${bundleIdx}`} className={`flex ${gap} relative`}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className={`${width} ${height} bg-amber-800 rounded-sm`} />
            ))}
            {/* Diagonal strike-through */}
            <div 
              className={`absolute ${size === "lg" ? "-left-1 -right-1 h-1" : "-left-0.5 -right-0.5 h-0.5"} bg-amber-800 rounded-full top-1/2 -rotate-45 origin-center`}
              style={{ width: size === "lg" ? "calc(100% + 8px)" : "calc(100% + 4px)" }}
            />
          </div>
        ))}
        {/* Remainder */}
        {remainder > 0 && (
          <div className={`flex ${gap}`}>
            {Array.from({ length: remainder }).map((_, i) => (
              <div key={i} className={`${width} ${height} bg-amber-800 rounded-sm`} />
            ))}
          </div>
        )}
      </div>
    );
  };

  // Render bee emoji
  const Bee = ({ className = "" }: { className?: string }) => (
    <span className={`text-2xl ${className}`}>🐝</span>
  );

  // Render flower emoji
  const Flower = ({ className = "" }: { className?: string }) => (
    <span className={`text-2xl ${className}`}>🌸</span>
  );

  const renderPhase = () => {
    switch (phase) {
      case "fluency":
        return (
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold text-amber-800">March and Count to {marchTarget}!</h2>
            <p className="text-lg text-amber-700">Let's march {marchTarget} times and count our steps!</p>
            
            <div className="flex justify-center gap-2 flex-wrap py-4">
              {Array.from({ length: marchTarget }).map((_, i) => (
                <div
                  key={i}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-all duration-300 ${
                    i < marchCount
                      ? "bg-amber-500 text-white scale-110 animate-bounce"
                      : "bg-amber-100 text-amber-400"
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>

            {marchCount === marchTarget && (
              <div className="text-3xl font-bold text-green-600 animate-pulse">
                🎉 Great marching! We counted to {marchTarget}! 🎉
              </div>
            )}

            <div className="flex justify-center gap-4">
              {!isMarching && marchCount < marchTarget && (
                <Button onClick={startMarching} className="bg-amber-500 hover:bg-amber-600 text-xl px-8 py-6">
                  <Volume2 className="mr-2" /> Start Marching!
                </Button>
              )}
              {marchCount === marchTarget && marchTarget === 9 && (
                <Button onClick={handleMarchComplete} className="bg-green-500 hover:bg-green-600 text-xl px-8 py-6">
                  Now count to 10! <ArrowRight className="ml-2" />
                </Button>
              )}
              {marchCount === 10 && marchTarget === 10 && (
                <Button onClick={() => setPhase("application")} className="bg-green-500 hover:bg-green-600 text-xl px-8 py-6">
                  Continue <ArrowRight className="ml-2" />
                </Button>
              )}
            </div>
          </div>
        );

      case "application":
        return (
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold text-amber-800">🐝 Welcome to the Pollen Café! 🐝</h2>
            <p className="text-lg text-amber-700">
              You're a worker at a special café for bees! Count the bees in your cup and find their number.
            </p>

            <Card className="bg-amber-50 border-amber-200 max-w-md mx-auto">
              <CardContent className="p-6">
                <div className="text-lg font-semibold text-amber-800 mb-4">Your Bee Cup</div>
                <div 
                  className="bg-amber-100 rounded-xl p-4 min-h-24 flex flex-wrap gap-2 justify-center items-center cursor-pointer hover:bg-amber-200 transition-colors"
                  onClick={countBee}
                >
                  {Array.from({ length: beeCupCount }).map((_, i) => (
                    <div
                      key={i}
                      className={`transition-all duration-300 ${
                        i < beeCount ? "scale-125 opacity-100" : "opacity-40"
                      }`}
                    >
                      <Bee />
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-amber-600">Tap to count each bee!</p>
                {beeCount > 0 && (
                  <p className="text-2xl font-bold text-amber-800 mt-2">Count: {beeCount}</p>
                )}
              </CardContent>
            </Card>

            {beeCount === beeCupCount && (
              <div className="space-y-4">
                <p className="text-lg text-amber-700">Find the numeral that shows how many bees:</p>
                <div className="flex justify-center gap-3 flex-wrap">
                  {[3, 4, 5, 6, 7, 8].map(num => (
                    <Button
                      key={num}
                      onClick={() => checkNumeral(num)}
                      className={`w-14 h-14 text-2xl font-bold ${
                        selectedNumeral === num
                          ? num === beeCupCount
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-red-400 hover:bg-red-500"
                          : "bg-amber-400 hover:bg-amber-500"
                      }`}
                    >
                      {num}
                    </Button>
                  ))}
                </div>
                {selectedNumeral === beeCupCount && (
                  <div className="space-y-4">
                    <p className="text-xl font-bold text-green-600">✓ Correct! You have {beeCupCount} bees!</p>
                    <Button onClick={() => setPhase("concept")} className="bg-green-500 hover:bg-green-600">
                      Continue to Concept <ArrowRight className="ml-2" />
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case "concept":
        return (
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold text-amber-800">🌸 Taking Orders at the Pollen Café 🌸</h2>
            
            {conceptStep === 0 && (
              <div className="space-y-4">
                <p className="text-lg text-amber-700">First, let's seat our 8 bee customers!</p>
                <p className="text-amber-600">Tap to seat each bee in their special seat.</p>
                
                {/* Number path with bee seats */}
                <div className="flex justify-center gap-1 py-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      onClick={seatBee}
                      className={`w-14 h-16 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all ${
                        i < 5 ? "bg-yellow-200 border-yellow-400" : "bg-orange-200 border-orange-400"
                      } border-2`}
                    >
                      <div className="h-8 flex items-center justify-center">
                        {i < seatedBees.length ? <Bee /> : <span className="text-gray-300">🪑</span>}
                      </div>
                      <span className="text-sm font-bold text-amber-800">{i + 1}</span>
                    </div>
                  ))}
                </div>
                
                {seatedBees.length === 8 && (
                  <div className="space-y-2">
                    <p className="text-xl font-bold text-green-600">All 8 bees are seated!</p>
                    <p className="text-amber-700">The last bee is in seat 8 - that matches our count!</p>
                    <Button onClick={() => setConceptStep(1)} className="bg-amber-500 hover:bg-amber-600">
                      Now take the order! <ArrowRight className="ml-2" />
                    </Button>
                  </div>
                )}
              </div>
            )}

            {conceptStep === 1 && (
              <div className="space-y-4">
                <p className="text-lg text-amber-700">Now you're the waiter! Make a tally for each flower order.</p>
                <p className="text-amber-600">Each bee wants 1 flower. Tap to make tally marks!</p>
                
                {/* Show bees saying their order */}
                <div className="flex justify-center gap-1 py-2">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        i < tallyMarks ? "bg-green-100" : "bg-amber-100"
                      }`}
                    >
                      <Bee className={i < tallyMarks ? "" : "opacity-50"} />
                    </div>
                  ))}
                </div>

                {/* Tally pad */}
                <Card className="bg-white border-amber-300 max-w-sm mx-auto cursor-pointer" onClick={addTally}>
                  <CardContent className="p-6">
                    <p className="text-sm text-amber-600 mb-2">Waiter's Order Pad (tap to tally)</p>
                    <div className="min-h-16 flex items-center justify-center">
                      {tallyMarks > 0 ? renderTallies(tallyMarks) : (
                        <span className="text-gray-400">Tap to add tally marks...</span>
                      )}
                    </div>
                    <p className="text-lg font-bold text-amber-800 mt-2">Flowers ordered: {tallyMarks}</p>
                  </CardContent>
                </Card>

                {tallyMarks === 8 && (
                  <div className="space-y-2">
                    <p className="text-xl font-bold text-green-600">Perfect! 8 tallies = 8 flowers!</p>
                    <p className="text-amber-700">Notice: 5 tallies bundled + 3 more = 8</p>
                    <Button onClick={() => setConceptStep(2)} className="bg-amber-500 hover:bg-amber-600">
                      Deliver the flowers! <ArrowRight className="ml-2" />
                    </Button>
                  </div>
                )}
              </div>
            )}

            {conceptStep === 2 && (
              <div className="space-y-4">
                <p className="text-lg text-amber-700">Time to deliver flowers to each bee!</p>
                <p className="text-amber-600">Tap to give each bee their flower.</p>
                
                {/* Bees with flowers */}
                <div className="flex justify-center gap-2 py-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      onClick={deliverFlower}
                      className={`w-14 h-20 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all ${
                        i < 5 ? "bg-yellow-100" : "bg-orange-100"
                      } border-2 border-amber-300`}
                    >
                      <Bee />
                      <div className="h-8 flex items-center justify-center">
                        {i < flowersDelivered ? <Flower /> : <span className="text-gray-300">?</span>}
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-xl font-bold text-amber-800">Flowers delivered: {flowersDelivered}</p>

                {flowersDelivered === 8 && (
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-green-600">🎉 All 8 bees got their flowers! 🎉</p>
                    <p className="text-amber-700">Our tallies (5 + 3) matched perfectly!</p>
                    <Button onClick={() => setPhase("practice")} className="bg-green-500 hover:bg-green-600">
                      Practice Time! <ArrowRight className="ml-2" />
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case "practice":
        return (
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold text-amber-800">🐝 Practice at the Pollen Café 🐝</h2>
            <p className="text-lg text-amber-700">
              You are the <span className="font-bold">{practiceRole === "seater" ? "Bee Seater" : "Waiter"}</span>!
            </p>

            {practiceRole === "seater" ? (
              <div className="space-y-4">
                <p className="text-amber-600">Seat {practiceBeeCount} bees on the number path!</p>
                
                <div className="flex justify-center gap-1 py-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      onClick={seatPracticeBee}
                      className={`w-12 h-14 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all ${
                        i < practiceBeeCount
                          ? i < 5 ? "bg-yellow-200 border-yellow-400" : "bg-orange-200 border-orange-400"
                          : "bg-gray-100 border-gray-300"
                      } border-2`}
                    >
                      <div className="h-6 flex items-center justify-center">
                        {i < practiceBees.length ? <Bee className="text-xl" /> : 
                          i < practiceBeeCount ? <span className="text-gray-300 text-sm">🪑</span> : null}
                      </div>
                      <span className="text-xs font-bold text-amber-800">{i + 1}</span>
                    </div>
                  ))}
                </div>

                {practiceBees.length === practiceBeeCount && (
                  <div className="space-y-2">
                    <p className="text-xl font-bold text-green-600">✓ All {practiceBeeCount} bees seated!</p>
                    <Button onClick={switchRole} className="bg-amber-500 hover:bg-amber-600">
                      Now be the Waiter! <ArrowRight className="ml-2" />
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-amber-600">Make tallies for {practiceBeeCount} flower orders!</p>
                
                <div className="flex justify-center gap-1 py-2">
                  {Array.from({ length: practiceBeeCount }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        i < practiceTallies ? "bg-green-100" : "bg-amber-100"
                      }`}
                    >
                      <Bee className={i < practiceTallies ? "" : "opacity-50"} />
                    </div>
                  ))}
                </div>

                <Card className="bg-white border-amber-300 max-w-sm mx-auto cursor-pointer" onClick={addPracticeTally}>
                  <CardContent className="p-6">
                    <p className="text-sm text-amber-600 mb-2">Your Order Pad (tap to tally)</p>
                    <div className="min-h-12 flex items-center justify-center">
                      {practiceTallies > 0 ? renderTallies(practiceTallies, "sm") : (
                        <span className="text-gray-400 text-sm">Tap to add tally marks...</span>
                      )}
                    </div>
                    <p className="font-bold text-amber-800 mt-2">Tallies: {practiceTallies}</p>
                  </CardContent>
                </Card>

                {practiceTallies === practiceBeeCount && (
                  <div className="space-y-2">
                    <p className="text-xl font-bold text-green-600">✓ Order ready! {practiceTallies} flowers!</p>
                    <Button 
                      onClick={() => {
                        setPracticeComplete(true);
                        setPhase("debrief");
                      }} 
                      className="bg-green-500 hover:bg-green-600"
                    >
                      Finish Practice <ArrowRight className="ml-2" />
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
            <h2 className="text-2xl font-bold text-amber-800">🎉 Great Work at the Pollen Café! 🎉</h2>
            
            <Card className="bg-amber-50 border-amber-200 max-w-lg mx-auto">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-amber-800">What We Learned:</h3>
                
                <div className="text-left space-y-3 text-amber-700">
                  <p>📌 <strong>Number Path:</strong> We used special seats numbered 1-8 to count bees!</p>
                  <p>📌 <strong>Tally Marks:</strong> We made marks to remember flower orders.</p>
                  <p>📌 <strong>Bundling 5:</strong> After 5 tallies, we draw a line across to make a bundle!</p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-amber-200">
                  <p className="text-amber-800 font-semibold mb-2">5 and 3 more is 8!</p>
                  <div className="flex justify-center items-center gap-4">
                    {renderTallies(8, "sm")}
                    <span className="text-2xl">=</span>
                    <span className="text-3xl font-bold text-amber-800">8</span>
                  </div>
                </div>

                <p className="text-amber-600 italic">
                  The bundle of 5 in our tallies is just like the color change on the number path at 5!
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

  const phases: Phase[] = ["fluency", "application", "concept", "practice", "debrief"];
  const phaseLabels: Record<Phase, string> = {
    fluency: "Fluency",
    application: "Application",
    concept: "Concept",
    practice: "Practice",
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
          <h1 className="text-xl font-bold text-amber-800">Lesson 19: Tally 8 Objects</h1>
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

export default Tally19;

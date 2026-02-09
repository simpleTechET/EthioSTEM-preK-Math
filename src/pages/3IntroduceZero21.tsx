import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, RotateCcw, Volume2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Phase = "fluency" | "application" | "concept" | "debrief";

const IntroduceZero21 = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("fluency");

  // Fluency: Count Flaps to 9
  const [flapCount, setFlapCount] = useState(0);
  const [isFlapping, setIsFlapping] = useState(false);
  const [fluencyStep, setFluencyStep] = useState<"flaps" | "wind">("flaps");

  // Wind and Trees
  const [treesStanding, setTreesStanding] = useState(5);
  const [windBlowing, setWindBlowing] = useState(false);

  // Application: Dominoes
  const [dominoesStanding, setDominoesStanding] = useState(8);
  const [dominoesFalling, setDominoesFalling] = useState(false);

  // Concept: Balloons & Zero
  const [conceptStep, setConceptStep] = useState<"balloons" | "fish" | "practice">("balloons");
  const [balloons, setBalloons] = useState(5);
  const [isBlowing, setIsBlowing] = useState(false);
  const [fishCount, setFishCount] = useState(3);
  const [fishNames] = useState(["Sara 🐟", "Leo 🐟", "Maya 🐟"]);

  // Practice: Goldfish
  const [goldfish, setGoldfish] = useState(3);
  const [showZeroCelebration, setShowZeroCelebration] = useState(false);

  // Flap counting
  const startFlapping = () => {
    setIsFlapping(true);
    setFlapCount(0);
  };

  useEffect(() => {
    if (isFlapping && flapCount < 9) {
      const timer = setTimeout(() => {
        setFlapCount(prev => prev + 1);
      }, 500);
      return () => clearTimeout(timer);
    } else if (flapCount === 9) {
      setIsFlapping(false);
    }
  }, [isFlapping, flapCount]);

  // Wind blowing trees
  const blowTree = () => {
    if (treesStanding > 0) {
      setWindBlowing(true);
      setTimeout(() => {
        setTreesStanding(prev => prev - 1);
        setWindBlowing(false);
      }, 600);
    }
  };

  // Blow balloon away
  const blowBalloon = () => {
    if (balloons > 0) {
      setIsBlowing(true);
      setTimeout(() => {
        setBalloons(prev => prev - 1);
        setIsBlowing(false);
      }, 800);
    }
  };

  // Fish swim away
  const swimFish = () => {
    if (fishCount > 0) {
      setFishCount(prev => prev - 1);
    }
  };

  // Eat goldfish
  const eatGoldfish = () => {
    if (goldfish > 0) {
      setGoldfish(prev => prev - 1);
      if (goldfish - 1 === 0) {
        setShowZeroCelebration(true);
      }
    }
  };

  // Knock dominoes
  const knockDominoes = () => {
    if (dominoesStanding > 0) {
      setDominoesFalling(true);
      let remaining = dominoesStanding;
      const interval = setInterval(() => {
        remaining--;
        setDominoesStanding(remaining);
        if (remaining <= 0) {
          clearInterval(interval);
          setDominoesFalling(false);
        }
      }, 300);
    }
  };

  const resetPhase = () => {
    switch (phase) {
      case "fluency":
        setFlapCount(0);
        setIsFlapping(false);
        setFluencyStep("flaps");
        setTreesStanding(5);
        break;
      case "application":
        setDominoesStanding(8);
        setDominoesFalling(false);
        break;
      case "concept":
        setConceptStep("balloons");
        setBalloons(5);
        setFishCount(3);
        setGoldfish(3);
        setShowZeroCelebration(false);
        break;
    }
  };

  const phases: Phase[] = ["fluency", "application", "concept", "debrief"];
  const phaseIndex = phases.indexOf(phase);

  const phaseLabels: Record<Phase, string> = {
    fluency: "🐦 Fluency Practice",
    application: "🧱 Application Problem",
    concept: "🎈 Concept Development",
    debrief: "💬 Student Debrief",
  };

  const renderFluency = () => (
    <div className="space-y-6">
      {fluencyStep === "flaps" ? (
        <Card className="border-2 border-sky-200 bg-sky-50">
          <CardContent className="p-6 text-center space-y-4">
            <h3 className="text-xl font-bold text-sky-800">🐦 Count Flaps to 9!</h3>
            <p className="text-sky-700">
              Pretend you're a baby bird learning to fly! Flap your wings and count to 9.
            </p>

            <div className="flex justify-center items-center gap-2 flex-wrap min-h-[80px]">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className={`text-4xl transition-transform duration-300 ${
                    i < flapCount
                      ? "scale-110 animate-bounce"
                      : "opacity-30"
                  }`}
                >
                  🐣
                </div>
              ))}
            </div>

            <p className="text-3xl font-bold text-sky-900">
              {flapCount > 0 ? flapCount : "Ready?"}
            </p>

            {!isFlapping && flapCount === 0 && (
              <Button
                onClick={startFlapping}
                className="bg-sky-500 hover:bg-sky-600 text-white text-lg px-8 py-4"
              >
                🐦 Start Flapping!
              </Button>
            )}

            {!isFlapping && flapCount === 9 && (
              <div className="space-y-3">
                <p className="text-green-600 font-bold text-lg">🎉 9 flaps! Great counting!</p>
                <Button
                  onClick={() => setFluencyStep("wind")}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white"
                >
                  Next: The Wind and the Trees! 🌳
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card className="border-2 border-green-200 bg-green-50">
          <CardContent className="p-6 text-center space-y-4">
            <h3 className="text-xl font-bold text-green-800">🌬️ The Wind and the Trees!</h3>
            <p className="text-green-700">
              Our blocks are trees. The wind knocks them down one by one!
            </p>

            <div className="flex justify-center items-center gap-3 min-h-[120px]">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={`text-5xl transition-all duration-500 ${
                    i < treesStanding
                      ? windBlowing && i === treesStanding - 1
                        ? "rotate-45 opacity-50"
                        : ""
                      : "rotate-90 opacity-20 translate-y-4"
                  }`}
                >
                  🌳
                </div>
              ))}
            </div>

            <p className="text-2xl font-bold text-green-900">
              {treesStanding > 0
                ? `${treesStanding} tree${treesStanding !== 1 ? "s" : ""} standing`
                : "No trees standing!"}
            </p>

            {treesStanding > 0 ? (
              <Button
                onClick={blowTree}
                disabled={windBlowing}
                className="bg-blue-400 hover:bg-blue-500 text-white text-lg px-8 py-4"
              >
                🌬️ Blow the Wind!
              </Button>
            ) : (
              <div className="space-y-2">
                <p className="text-amber-600 font-bold text-lg">
                  All the trees fell down! There are none left!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderApplication = () => (
    <Card className="border-2 border-orange-200 bg-orange-50">
      <CardContent className="p-6 text-center space-y-4">
        <h3 className="text-xl font-bold text-orange-800">🧱 Domino Trees</h3>
        <p className="text-orange-700">
          If the wind blows over one tree, it can make ALL the trees fall down!
          Tap the first domino to start the chain reaction!
        </p>

        <div className="flex justify-center items-center gap-2 min-h-[140px]">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className={`text-5xl transition-all duration-300 ${
                i >= dominoesStanding
                  ? "rotate-90 opacity-20 translate-y-4"
                  : dominoesFalling && i === dominoesStanding - 1
                  ? "rotate-12 opacity-70"
                  : ""
              }`}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              🧱
            </div>
          ))}
        </div>

        <p className="text-2xl font-bold text-orange-900">
          {dominoesStanding > 0
            ? `${dominoesStanding} standing`
            : "None left! Zero trees standing!"}
        </p>

        {dominoesStanding > 0 && !dominoesFalling ? (
          <Button
            onClick={knockDominoes}
            className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-4"
          >
            🌬️ Blow the First Tree!
          </Button>
        ) : dominoesStanding === 0 ? (
          <div className="space-y-3">
            <p className="text-red-600 font-bold text-xl">
              There are NO trees standing. That's <span className="text-3xl">ZERO</span>!
            </p>
            <Button
              onClick={() => {
                setDominoesStanding(8);
                setDominoesFalling(false);
              }}
              variant="outline"
              className="mr-2"
            >
              <RotateCcw className="w-4 h-4 mr-1" /> Try Again
            </Button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );

  const renderConcept = () => (
    <div className="space-y-6">
      {conceptStep === "balloons" && (
        <Card className="border-2 border-purple-200 bg-purple-50">
          <CardContent className="p-6 text-center space-y-4">
            <h3 className="text-xl font-bold text-purple-800">🎈 Balloons in the Wind!</h3>
            <p className="text-purple-700">
              It's a windy day! Blow the balloons away one by one. Count how many are left!
            </p>

            <div className="flex justify-center items-center gap-3 min-h-[120px]">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={`text-5xl transition-all duration-700 ${
                    i < balloons
                      ? isBlowing && i === balloons - 1
                        ? "-translate-y-10 translate-x-8 opacity-30 scale-50"
                        : "animate-pulse"
                      : "opacity-0 scale-0"
                  }`}
                >
                  {["🎈", "🟡", "🔵", "🟢", "🟣"][i % 5] === "🎈" ? "🎈" : "🎈"}
                </div>
              ))}
            </div>

            <p className="text-3xl font-bold text-purple-900">
              {balloons > 0 ? `${balloons} balloon${balloons !== 1 ? "s" : ""} left` : ""}
            </p>

            {balloons > 0 ? (
              <Button
                onClick={blowBalloon}
                disabled={isBlowing}
                className="bg-purple-500 hover:bg-purple-600 text-white text-lg px-8 py-4"
              >
                🌬️ Blow a Balloon Away!
              </Button>
            ) : (
              <div className="space-y-3 bg-yellow-100 p-6 rounded-xl border-2 border-yellow-300">
                <p className="text-2xl font-bold text-yellow-800">
                  How many balloons are left?
                </p>
                <p className="text-5xl font-black text-red-600 animate-bounce">
                  ZERO! 0
                </p>
                <p className="text-lg text-yellow-700">
                  When there are <strong>no more left</strong>, we say <strong>"zero"</strong>.
                  <br />0 is the number that means <strong>"none"</strong>!
                </p>
                <Button
                  onClick={() => setConceptStep("fish")}
                  className="bg-blue-500 hover:bg-blue-600 text-white mt-2"
                >
                  Next: Swimming Fish! 🐟
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {conceptStep === "fish" && (
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardContent className="p-6 text-center space-y-4">
            <h3 className="text-xl font-bold text-blue-800">🐟 Fish Swimming Away!</h3>
            <p className="text-blue-700">
              Let's count as the fish swim away one by one!
            </p>

            <div className="flex justify-center items-center gap-4 min-h-[100px]">
              {fishNames.map((name, i) => (
                <div
                  key={i}
                  className={`text-center transition-all duration-500 ${
                    i < fishCount
                      ? ""
                      : "translate-x-20 opacity-0 scale-0"
                  }`}
                >
                  <span className="text-5xl">🐟</span>
                  <p className="text-sm font-medium text-blue-600 mt-1">
                    {name.split(" ")[0]}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-3xl font-bold text-blue-900">
              {fishCount > 0
                ? `${fishCount} fish`
                : ""}
            </p>

            {fishCount > 0 ? (
              <Button
                onClick={swimFish}
                className="bg-blue-500 hover:bg-blue-600 text-white text-lg px-8 py-4"
              >
                🏊 A Fish Swims Away!
              </Button>
            ) : (
              <div className="space-y-3 bg-yellow-100 p-6 rounded-xl border-2 border-yellow-300">
                <p className="text-2xl font-bold text-yellow-800">
                  How many fish are left?
                </p>
                <p className="text-5xl font-black text-red-600 animate-bounce">
                  ZERO! 0
                </p>
                <p className="text-lg text-yellow-700">
                  3 fish, 2 fish, 1 fish, <strong>0 fish</strong>!
                </p>
                <Button
                  onClick={() => setConceptStep("practice")}
                  className="bg-amber-500 hover:bg-amber-600 text-white mt-2"
                >
                  Next: Goldfish Practice! 🐠
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {conceptStep === "practice" && (
        <Card className="border-2 border-amber-200 bg-amber-50">
          <CardContent className="p-6 text-center space-y-4">
            <h3 className="text-xl font-bold text-amber-800">🐠 Catch and Eat the Goldfish!</h3>
            <p className="text-amber-700">
              Count your goldfish, then catch and eat them one at a time!
            </p>

            <div className="relative bg-blue-100 rounded-2xl p-8 min-h-[160px] border-2 border-blue-300">
              {/* Water background */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-200/50 to-blue-400/30 rounded-2xl" />

              <div className="relative flex justify-center items-center gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className={`text-6xl transition-all duration-500 cursor-pointer hover:scale-125 ${
                      i < goldfish
                        ? "animate-bounce"
                        : "opacity-0 scale-0"
                    }`}
                    style={{ animationDelay: `${i * 200}ms` }}
                  >
                    🐠
                  </div>
                ))}
              </div>
            </div>

            <p className="text-3xl font-bold text-amber-900">
              {goldfish > 0
                ? `${goldfish} goldfish`
                : ""}
            </p>

            {goldfish > 0 && !showZeroCelebration ? (
              <Button
                onClick={eatGoldfish}
                className="bg-amber-500 hover:bg-amber-600 text-white text-lg px-8 py-4"
              >
                🎣 Catch a Goldfish! Yum!
              </Button>
            ) : showZeroCelebration ? (
              <div className="space-y-3 bg-green-100 p-6 rounded-xl border-2 border-green-300">
                <p className="text-2xl font-bold text-green-800">
                  There are no goldfish left!
                </p>
                <p className="text-lg text-green-700">How many goldfish are left?</p>
                <p className="text-6xl font-black text-red-600 animate-bounce">
                  0
                </p>
                <p className="text-xl font-bold text-green-800">
                  Zero! 0 goldfish! 🎉
                </p>
              </div>
            ) : null}
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderDebrief = () => (
    <Card className="border-2 border-indigo-200 bg-indigo-50">
      <CardContent className="p-6 space-y-6">
        <h3 className="text-xl font-bold text-indigo-800 text-center">💬 Let's Talk About Zero!</h3>

        <div className="space-y-4">
          <div className="bg-white rounded-xl p-4 border border-indigo-100">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🟦🟦</span>
            </div>
            <p className="text-indigo-800 font-medium">
              How many cubes are <span className="text-blue-600 font-bold">blue</span>? <strong>2!</strong>
            </p>
            <p className="text-indigo-800 font-medium">
              How many are <span className="text-yellow-600 font-bold">yellow</span>? <strong>Zero!</strong>
            </p>
            <p className="text-indigo-800 font-medium">
              How many are <span className="text-green-600 font-bold">green</span>? <strong>Zero!</strong>
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-indigo-100">
            <p className="text-indigo-800 font-medium text-lg">
              🐘 How many flying elephants with green shoes are in our class right now?
            </p>
            <p className="text-4xl font-black text-red-600 text-center mt-2">ZERO! 😄</p>
          </div>

          <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
            <p className="text-yellow-800 font-bold text-lg mb-2">🤔 Think About It:</p>
            <ul className="space-y-2 text-yellow-700">
              <li>• What is there <strong>zero</strong> of in our classroom?</li>
              <li>• What is there <strong>zero</strong> of in your house?</li>
              <li>• Can you think of something there is <strong>zero</strong> of outside?</li>
            </ul>
          </div>

          <div className="bg-green-50 rounded-xl p-5 border-2 border-green-200 text-center">
            <p className="text-green-800 font-bold text-xl mb-2">🌟 Great Job!</p>
            <p className="text-green-700 text-lg">
              Today we learned that <strong>zero</strong> means <strong>none</strong>!
              When there's nothing left, the number is <strong>0</strong>!
            </p>
            <div className="text-6xl mt-3 animate-pulse">0️⃣</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-indigo-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/learning")}
            className="text-indigo-600"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back
          </Button>
          <div className="text-center">
            <h1 className="text-lg font-bold text-indigo-900">Lesson 21</h1>
            <p className="text-xs text-indigo-500">Introduce Zero</p>
          </div>
          <Button variant="ghost" size="icon" onClick={resetPhase}>
            <RotateCcw className="w-4 h-4 text-indigo-500" />
          </Button>
        </div>
      </div>

      {/* Phase Navigation */}
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex gap-1 overflow-x-auto pb-2">
          {phases.map((p, i) => (
            <button
              key={p}
              onClick={() => setPhase(p)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                phase === p
                  ? "bg-indigo-600 text-white shadow-md"
                  : i <= phaseIndex
                  ? "bg-indigo-100 text-indigo-700"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {phaseLabels[p]}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 pb-24">
        {phase === "fluency" && renderFluency()}
        {phase === "application" && renderApplication()}
        {phase === "concept" && renderConcept()}
        {phase === "debrief" && renderDebrief()}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur border-t border-indigo-100">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between">
          <Button
            variant="outline"
            onClick={() => setPhase(phases[phaseIndex - 1])}
            disabled={phaseIndex === 0}
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Previous
          </Button>
          <Button
            onClick={() => setPhase(phases[phaseIndex + 1])}
            disabled={phaseIndex === phases.length - 1}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Next <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IntroduceZero21;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Star, RotateCcw } from "lucide-react";

const PHASES = ["fluency", "application", "concept", "debrief"] as const;
type Phase = (typeof PHASES)[number];

const CUBE_COLORS = ["#ef4444", "#22c55e", "#f97316"]; // red, green, orange

const PARTNERS_OF_9: [number, number][] = [
  [9, 0], [0, 9], [8, 1], [1, 8], [7, 2], [2, 7],
  [6, 3], [3, 6], [5, 4], [4, 5],
];

const Compose9Lesson26 = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("fluency");
  const [step, setStep] = useState(0);

  // Fluency state
  const [flapCount, setFlapCount] = useState(0);
  const [isFlapping, setIsFlapping] = useState(false);
  const [tennisCounted, setTennisCounted] = useState(false);
  const [tennisHighlight, setTennisHighlight] = useState(-1);

  // Application state
  const [groupMode, setGroupMode] = useState<"pairs" | "rows">("pairs");

  // Concept state
  const [stickA] = useState(5);
  const [stickB] = useState(4);
  const [joined, setJoined] = useState(false);
  const [showNumeral9, setShowNumeral9] = useState(false);
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [practiceJoined, setPracticeJoined] = useState(true);

  const nextPhase = () => {
    const i = PHASES.indexOf(phase);
    if (i < PHASES.length - 1) {
      setPhase(PHASES[i + 1]);
      setStep(0);
    }
  };

  const doFlap = () => {
    if (flapCount >= 10 || isFlapping) return;
    setIsFlapping(true);
    setTimeout(() => {
      setFlapCount((c) => c + 1);
      setIsFlapping(false);
    }, 300);
  };

  const countTennis = () => {
    setTennisCounted(false);
    setTennisHighlight(-1);
    let i = 0;
    const interval = setInterval(() => {
      setTennisHighlight(i);
      i++;
      if (i >= 9) {
        clearInterval(interval);
        setTennisCounted(true);
      }
    }, 400);
  };

  const renderCubeStack = () => {
    const balls: string[] = [];
    for (let c = 0; c < 3; c++) {
      for (let b = 0; b < 3; b++) {
        balls.push(CUBE_COLORS[c]);
      }
    }
    return (
      <div className="grid grid-cols-3 gap-2 justify-center max-w-[180px] mx-auto">
        {balls.map((color, i) => (
          <div
            key={i}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg transition-all duration-300 ${
              tennisHighlight >= i ? "scale-110 ring-4 ring-yellow-400" : "opacity-70"
            }`}
            style={{ backgroundColor: color }}
          >
            {tennisHighlight >= i ? i + 1 : "🎾"}
          </div>
        ))}
      </div>
    );
  };

  const renderStick = (count: number, color: string, label?: string) => (
    <div className="flex flex-col items-center gap-1">
      <div className="flex gap-1">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="w-8 h-8 rounded-md border-2 border-white/50 transition-all duration-300"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      {label && <span className="text-sm font-semibold text-muted-foreground">{label}</span>}
    </div>
  );

  const renderPuzzlePiece = (pair: [number, number], active: boolean) => (
    <div
      className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all ${
        active ? "border-primary bg-primary/10 scale-105" : "border-muted bg-card"
      }`}
    >
      <div className="flex gap-0.5">
        {Array.from({ length: pair[0] }).map((_, i) => (
          <div key={i} className="w-5 h-5 rounded bg-blue-500" />
        ))}
      </div>
      <span className="font-bold text-lg">+</span>
      <div className="flex gap-0.5">
        {Array.from({ length: pair[1] }).map((_, i) => (
          <div key={i} className="w-5 h-5 rounded bg-orange-400" />
        ))}
      </div>
      <span className="text-sm font-semibold ml-2">
        {pair[0]} & {pair[1]}
      </span>
    </div>
  );

  const currentPracticePair = PARTNERS_OF_9[practiceIndex % PARTNERS_OF_9.length];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur shadow-sm p-4 flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => navigate("/learning")}>
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Button>
        <h1 className="text-lg font-bold text-primary">Lesson 26: Compose & Decompose 9</h1>
        <div className="flex gap-1">
          {PHASES.map((p) => (
            <div
              key={p}
              className={`w-3 h-3 rounded-full ${p === phase ? "bg-primary" : "bg-muted"}`}
            />
          ))}
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 gap-6 max-w-2xl mx-auto w-full">
        {/* ==================== FLUENCY ==================== */}
        {phase === "fluency" && step === 0 && (
          <div className="text-center space-y-6 w-full">
            <h2 className="text-2xl font-bold">🐣 Count Flaps to 10</h2>
            <p className="text-muted-foreground">
              Pretend you're a baby bird! Flap your wings and count each flap.
            </p>
            <div className="text-7xl font-black text-primary">{flapCount}</div>
            <div className={`text-6xl transition-transform duration-300 ${isFlapping ? "scale-125 -rotate-12" : ""}`}>
              🐦
            </div>
            <Button
              size="lg"
              onClick={doFlap}
              disabled={flapCount >= 10}
              className="text-xl px-8"
            >
              {flapCount >= 10 ? "🎉 10 flaps!" : `Flap! (${flapCount}/10)`}
            </Button>
            {flapCount >= 10 && (
              <div className="space-y-3">
                <p className="text-green-600 font-bold text-lg">
                  Great flapping! You counted to 10! 🎉
                </p>
                <Button onClick={() => setStep(1)}>
                  Next: Count Tennis Balls <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            )}
          </div>
        )}

        {phase === "fluency" && step === 1 && (
          <div className="text-center space-y-6 w-full">
            <h2 className="text-2xl font-bold">🎾 Count Tennis Balls</h2>
            <p className="text-muted-foreground">
              Stack 3 cans of 3 tennis balls. Touch and count to find exactly 9!
            </p>
            {renderCubeStack()}
            <div className="flex gap-3 justify-center">
              <Button size="lg" onClick={countTennis}>
                {tennisCounted ? "Count Again" : "Touch & Count"}
              </Button>
            </div>
            {tennisCounted && (
              <div className="space-y-3">
                <p className="text-green-600 font-bold text-lg">9 tennis balls! ✅</p>
                <Button onClick={nextPhase}>
                  Continue <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            )}
          </div>
        )}

        {/* ==================== APPLICATION ==================== */}
        {phase === "application" && (
          <div className="text-center space-y-6 w-full">
            <h2 className="text-2xl font-bold">🚌 Friends on a Bus</h2>
            <p className="text-muted-foreground">
              9 friends are going on a trip! Let's arrange them in different ways.
            </p>

            <div className="flex gap-4 justify-center">
              <Button
                variant={groupMode === "pairs" ? "default" : "outline"}
                onClick={() => setGroupMode("pairs")}
              >
                Pairs
              </Button>
              <Button
                variant={groupMode === "rows" ? "default" : "outline"}
                onClick={() => setGroupMode("rows")}
              >
                Rows of 3
              </Button>
            </div>

            {groupMode === "pairs" ? (
              <div className="space-y-4">
                <p className="font-semibold">Pairs: 2 + 2 + 2 + 2 + 1 left over!</p>
                <div className="flex flex-wrap gap-3 justify-center">
                  {[0, 1, 2, 3].map((pair) => (
                    <div key={pair} className="flex gap-1 bg-blue-100 rounded-lg p-2">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        {pair * 2 + 1}
                      </div>
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        {pair * 2 + 2}
                      </div>
                    </div>
                  ))}
                  <div className="flex gap-1 bg-yellow-100 rounded-lg p-2">
                    <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                      9
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  One friend doesn't have a partner! 9 can't make even pairs.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="font-semibold">Rows of 3: 3 + 3 + 3 = 9 ✅</p>
                <div className="flex flex-col gap-2 items-center">
                  {[0, 1, 2].map((row) => (
                    <div key={row} className="flex gap-2 bg-green-100 rounded-lg p-2">
                      {[0, 1, 2].map((col) => (
                        <div
                          key={col}
                          className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold"
                        >
                          {row * 3 + col + 1}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  3 friends in each row — perfect rows on the bus!
                </p>
              </div>
            )}

            <Button onClick={nextPhase}>
              Continue <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}

        {/* ==================== CONCEPT ==================== */}
        {phase === "concept" && step === 0 && (
          <div className="text-center space-y-6 w-full">
            <h2 className="text-2xl font-bold">🧩 Partners of 9</h2>
            <p className="text-muted-foreground">
              Make a stick of 5 and a stick of 4. Join them to make 9!
            </p>

            <div className="flex flex-col items-center gap-4">
              {!joined ? (
                <div className="flex gap-6 items-end">
                  {renderStick(stickA, "#3b82f6", `${stickA} cubes`)}
                  {renderStick(stickB, "#f97316", `${stickB} cubes`)}
                </div>
              ) : (
                <div className="flex gap-0.5">
                  {Array.from({ length: stickA }).map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-md bg-blue-500 border-2 border-white/50" />
                  ))}
                  {Array.from({ length: stickB }).map((_, i) => (
                    <div key={`b${i}`} className="w-8 h-8 rounded-md bg-orange-400 border-2 border-white/50" />
                  ))}
                </div>
              )}

              <Button
                size="lg"
                onClick={() => {
                  setJoined(!joined);
                  if (!joined) setShowNumeral9(true);
                }}
              >
                {joined ? "Break Apart" : "Join Together!"}
              </Button>

              {showNumeral9 && joined && (
                <div className="space-y-3 animate-in fade-in">
                  <p className="text-lg font-bold">
                    {stickA} + {stickB} = <span className="text-4xl text-primary">9</span>
                  </p>
                  <p className="text-muted-foreground">This is the numeral 9! Trace it in the air ✨</p>
                </div>
              )}
            </div>

            <Button onClick={() => setStep(1)} variant="outline">
              See the 9 and 0 puzzle <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}

        {phase === "concept" && step === 1 && (
          <div className="text-center space-y-6 w-full">
            <h2 className="text-2xl font-bold">9 and 0</h2>
            <p className="text-muted-foreground">
              You have 9 cubes and 0 red cubes. That's a puzzle with 9 and 0!
            </p>

            <div className="flex gap-4 items-center justify-center">
              <div className="flex gap-0.5">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="w-7 h-7 rounded-md bg-blue-500" />
                ))}
              </div>
              <span className="text-2xl font-bold">+</span>
              <div className="w-7 h-7 rounded-md border-2 border-dashed border-red-300 flex items-center justify-center text-red-300 text-xs">
                0
              </div>
            </div>

            <div className="flex gap-8 justify-center">
              <div className="text-center">
                <div className="text-7xl font-black text-primary">9</div>
                <p className="text-sm font-semibold">nine</p>
              </div>
              <div className="text-center">
                <div className="text-7xl font-black text-muted-foreground">0</div>
                <p className="text-sm font-semibold">zero — nothing!</p>
              </div>
            </div>

            <Button onClick={() => setStep(2)}>
              Practice Puzzles <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}

        {phase === "concept" && step === 2 && (
          <div className="text-center space-y-6 w-full">
            <h2 className="text-2xl font-bold">🧩 Partners of 9 Puzzles</h2>
            <p className="text-muted-foreground">
              Break and join your 9-stick. Match it to the puzzle!
            </p>

            <div className="flex flex-col items-center gap-4">
              {practiceJoined ? (
                <div className="flex gap-0.5">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-md border-2 border-white/50"
                      style={{
                        backgroundColor: i < currentPracticePair[0] ? "#3b82f6" : "#f97316",
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex gap-6 items-end">
                  {renderStick(currentPracticePair[0], "#3b82f6", `${currentPracticePair[0]}`)}
                  {renderStick(currentPracticePair[1], "#f97316", `${currentPracticePair[1]}`)}
                </div>
              )}

              <div className="flex gap-3">
                <Button onClick={() => setPracticeJoined(!practiceJoined)}>
                  {practiceJoined ? "Break Apart" : "Join → 9"}
                </Button>
              </div>

              <div className="bg-card rounded-xl p-4 border shadow-sm">
                {renderPuzzlePiece(currentPracticePair, true)}
              </div>

              <p className="font-semibold text-lg">
                {currentPracticePair[0]} + {currentPracticePair[1]} = 9 ✅
              </p>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setPracticeIndex((i) => (i + 1) % PARTNERS_OF_9.length);
                    setPracticeJoined(true);
                  }}
                >
                  Next Puzzle <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
                <Button onClick={nextPhase}>
                  Continue to Debrief <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== DEBRIEF ==================== */}
        {phase === "debrief" && (
          <div className="text-center space-y-6 w-full">
            <h2 className="text-2xl font-bold">⭐ Lesson 26 Debrief</h2>

            <div className="bg-card rounded-xl p-6 border shadow-sm space-y-4 text-left max-w-md mx-auto">
              <p className="font-semibold">What did we learn?</p>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <Star className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                  All Partners of 9 puzzles make <strong>9</strong> when joined!
                </li>
                <li className="flex gap-2">
                  <Star className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                  5 + 4 = 9, 6 + 3 = 9, 7 + 2 = 9, 8 + 1 = 9, 9 + 0 = 9
                </li>
                <li className="flex gap-2">
                  <Star className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                  The numeral <strong>9</strong> means 9 objects
                </li>
                <li className="flex gap-2">
                  <Star className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                  The numeral <strong>0</strong> means no objects — zero!
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <p className="text-muted-foreground">
                Show 9 fingers! Now wiggle 4 of them. How many aren't wiggling?
              </p>
              <div className="flex gap-6 justify-center">
                <div className="text-center">
                  <div className="text-7xl font-black text-primary">9</div>
                  <p className="text-sm font-medium">nine</p>
                </div>
                <div className="text-center">
                  <div className="text-7xl font-black text-muted-foreground">0</div>
                  <p className="text-sm font-medium">zero</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-center pt-4">
              <Button variant="outline" onClick={() => { setPhase("fluency"); setStep(0); setFlapCount(0); setTennisCounted(false); setTennisHighlight(-1); }}>
                <RotateCcw className="w-4 h-4 mr-1" /> Restart
              </Button>
              <Button onClick={() => navigate("/learning")}>
                Back to Lessons <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Compose9Lesson26;

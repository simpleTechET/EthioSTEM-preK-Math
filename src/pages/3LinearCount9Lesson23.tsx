import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Wind, Plus, TreePine } from "lucide-react";

type Phase = "fluency" | "application" | "concept" | "debrief";

const Lesson23 = () => {
  const [phase, setPhase] = useState<Phase>("fluency");
  const [fluencyStep, setFluencyStep] = useState(0);
  const [volume, setVolume] = useState<"loud" | "quiet" | "silent" | "mind">("loud");
  const [trees, setTrees] = useState<boolean[]>([]);
  const [treesPlanted, setTreesPlanted] = useState(false);
  const [treesFallen, setTreesFallen] = useState(false);

  // Application
  const [appTarget, setAppTarget] = useState(0);
  const [appSelected, setAppSelected] = useState(0);
  const [appDone, setAppDone] = useState(false);

  // Concept
  const [rocks, setRocks] = useState(5);
  const [explorerPos, setExplorerPos] = useState(-1);
  const [crossing, setCrossing] = useState(false);
  const [crossComplete, setCrossComplete] = useState(false);

  // Fluency: Count to 9
  const volumeLabels = {
    loud: "Count to 9 so I can hear you! 🔊",
    quiet: "Count to 9 so I almost can't hear you... 🤫",
    silent: "Count to 9 so I can't hear you! 🤐",
    mind: "Close your eyes and count to 9 in your mind... 🧠",
  };
  const volumeSizes = { loud: "text-3xl", quiet: "text-lg", silent: "text-sm", mind: "text-xs opacity-30" };

  const handleNextVolume = () => {
    const order: typeof volume[] = ["loud", "quiet", "silent", "mind"];
    const idx = order.indexOf(volume);
    if (idx < 3) setVolume(order[idx + 1]);
    else setFluencyStep(1);
  };

  // Wind and Trees
  const plantTrees = () => {
    setTrees(Array(9).fill(true));
    setTreesPlanted(true);
    setTreesFallen(false);
  };

  const blowTrees = () => {
    setTreesFallen(true);
    let i = 8;
    const interval = setInterval(() => {
      setTrees((prev) => {
        const next = [...prev];
        next[i] = false;
        return next;
      });
      i--;
      if (i < 0) clearInterval(interval);
    }, 200);
  };

  // Application
  const startApp = () => {
    const t = 6 + Math.floor(Math.random() * 3); // 6-8
    setAppTarget(t);
    setAppSelected(0);
    setAppDone(false);
  };

  const addGranola = () => {
    if (appSelected < appTarget) {
      const next = appSelected + 1;
      setAppSelected(next);
      if (next === appTarget) setAppDone(true);
    }
  };

  // Concept: Creek crossing
  const addRock = () => {
    if (rocks < 9) {
      setRocks(rocks + 1);
      setExplorerPos(-1);
      setCrossComplete(false);
    }
  };

  const startCrossing = () => {
    setCrossing(true);
    setExplorerPos(0);
    let pos = 0;
    const interval = setInterval(() => {
      pos++;
      if (pos >= rocks) {
        setCrossing(false);
        setCrossComplete(true);
        clearInterval(interval);
      }
      setExplorerPos(pos);
    }, 400);
  };

  const renderPhaseNav = () => (
    <div className="flex justify-between items-center mt-6">
      <Button
        variant="outline"
        onClick={() => {
          const phases: Phase[] = ["fluency", "application", "concept", "debrief"];
          const idx = phases.indexOf(phase);
          if (idx > 0) setPhase(phases[idx - 1]);
        }}
        disabled={phase === "fluency"}
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Back
      </Button>
      <div className="flex gap-1">
        {(["fluency", "application", "concept", "debrief"] as Phase[]).map((p) => (
          <div
            key={p}
            className={`w-3 h-3 rounded-full ${p === phase ? "bg-primary" : "bg-muted"}`}
          />
        ))}
      </div>
      <Button
        onClick={() => {
          const phases: Phase[] = ["fluency", "application", "concept", "debrief"];
          const idx = phases.indexOf(phase);
          if (idx < 3) setPhase(phases[idx + 1]);
        }}
        disabled={phase === "debrief"}
      >
        Next <ArrowRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-green-800">
            Lesson 23: Count 9 in Relation to 5
          </h1>
          <p className="text-green-600 mt-1">Use linear configurations to count 9</p>
        </header>

        {phase === "fluency" && (
          <div className="bg-white rounded-2xl shadow-lg p-6 min-h-[350px]">
            <h2 className="text-xl font-bold text-green-700 mb-4">🎵 Fluency Practice</h2>

            {fluencyStep === 0 && (
              <div className="text-center space-y-6">
                <p className="text-lg font-semibold text-green-800">{volumeLabels[volume]}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                    <span key={n} className={`${volumeSizes[volume]} font-bold text-green-700 transition-all`}>
                      {n}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground italic">
                  {volume === "mind"
                    ? '"When I count in my mind, no one hears me or sees me counting."'
                    : "Count along!"}
                </p>
                <Button onClick={handleNextVolume} className="bg-green-600 hover:bg-green-700">
                  {volume === "mind" ? "Next: Wind & Trees! 🌲" : "Count quieter..."}
                </Button>
              </div>
            )}

            {fluencyStep === 1 && (
              <div className="text-center space-y-4">
                <h3 className="text-lg font-bold text-green-700">
                  <Wind className="inline w-5 h-5 mr-1" /> The Wind and the Trees!
                </h3>
                <p className="text-sm text-muted-foreground">
                  Plant 9 trees, then watch the wind knock them all down!
                </p>

                <div className="flex justify-center gap-2 min-h-[80px] items-end">
                  {trees.length > 0 &&
                    trees.map((standing, i) => (
                      <div
                        key={i}
                        className={`transition-all duration-300 ${standing ? "" : "rotate-90 opacity-40"}`}
                      >
                        <TreePine className={`w-8 h-8 ${standing ? "text-green-600" : "text-amber-700"}`} />
                      </div>
                    ))}
                  {trees.length === 0 && (
                    <p className="text-muted-foreground">No trees yet — plant them!</p>
                  )}
                </div>

                <p className="text-lg font-bold text-green-800">
                  Trees standing:{" "}
                  <span className="text-2xl">{trees.filter(Boolean).length}</span>
                </p>

                {!treesPlanted && (
                  <Button onClick={plantTrees} className="bg-green-600 hover:bg-green-700">
                    🌱 Plant 9 Trees
                  </Button>
                )}
                {treesPlanted && !treesFallen && (
                  <Button onClick={blowTrees} className="bg-sky-600 hover:bg-sky-700">
                    💨 Blow the Wind!
                  </Button>
                )}
                {treesFallen && trees.every((t) => !t) && (
                  <div className="space-y-2">
                    <p className="text-green-700 font-bold text-xl">Zero trees! 🎉</p>
                    <Button
                      onClick={() => {
                        setTrees([]);
                        setTreesPlanted(false);
                        setTreesFallen(false);
                      }}
                      variant="outline"
                    >
                      Play Again
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {phase === "application" && (
          <div className="bg-white rounded-2xl shadow-lg p-6 min-h-[350px]">
            <h2 className="text-xl font-bold text-amber-700 mb-4">🎒 Application: Pack Granola Bars</h2>
            {appTarget === 0 ? (
              <div className="text-center space-y-4">
                <p className="text-lg">
                  You're an explorer going on a hike! Pack the right number of granola bars into your bag.
                </p>
                <p className="text-3xl">🥾🏔️🎒</p>
                <Button onClick={startApp} className="bg-amber-600 hover:bg-amber-700">
                  Get My Order!
                </Button>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <p className="text-lg font-semibold">
                  Pack exactly <span className="text-3xl text-amber-700">{appTarget}</span> granola bars!
                </p>
                <div className="flex flex-wrap justify-center gap-2 min-h-[60px]">
                  {Array.from({ length: appSelected }).map((_, i) => (
                    <span key={i} className="text-3xl">🍫</span>
                  ))}
                </div>
                <p className="text-xl font-bold text-amber-800">
                  {appSelected} / {appTarget}
                </p>
                {!appDone ? (
                  <Button onClick={addGranola} className="bg-amber-600 hover:bg-amber-700">
                    <Plus className="w-4 h-4 mr-1" /> Add a Granola Bar
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <p className="text-green-600 font-bold text-xl">✅ Bag packed! Ready to hike!</p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setAppTarget(0);
                        setAppSelected(0);
                        setAppDone(false);
                      }}
                    >
                      Pack Another Bag
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {phase === "concept" && (
          <div className="bg-white rounded-2xl shadow-lg p-6 min-h-[350px]">
            <h2 className="text-xl font-bold text-blue-700 mb-4">🪨 Creek Crossing</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Help the explorer cross the creek! Start with 5 rocks and add more until there are 9.
            </p>

            {/* Creek visualization */}
            <div className="relative bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200 rounded-xl p-4 mb-4 overflow-x-auto">
              <div className="flex items-center gap-1 min-w-max justify-center">
                {/* Left bank */}
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-xs font-bold text-white">
                  Start
                </div>

                {/* Rocks */}
                {Array.from({ length: rocks }).map((_, i) => (
                  <div
                    key={i}
                    className={`relative w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      i < 5
                        ? "bg-gray-600 text-white"
                        : "bg-amber-500 text-white ring-2 ring-amber-300"
                    }`}
                  >
                    {i + 1}
                    {explorerPos === i && (
                      <span className="absolute -top-6 text-2xl animate-bounce">🧭</span>
                    )}
                  </div>
                ))}

                {/* Right bank */}
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-xs font-bold text-white">
                  End
                </div>
                {explorerPos >= rocks && (
                  <span className="text-2xl ml-1">🧭</span>
                )}
              </div>
            </div>

            <div className="text-center space-y-3">
              <div className="flex justify-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <span className="w-4 h-4 rounded-full bg-gray-600 inline-block" /> Original: 5
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-4 h-4 rounded-full bg-amber-500 inline-block" /> Added: {rocks - 5}
                </span>
                <span className="font-bold">Total: {rocks}</span>
              </div>

              <p className="text-lg font-bold text-blue-800">
                {rocks < 9
                  ? `5 and ${rocks - 5} more is ${rocks}. Add 1 more?`
                  : crossComplete
                    ? "🎉 The explorer crossed with 9 rocks!"
                    : "9 rocks! Let's cross!"}
              </p>

              <div className="flex justify-center gap-3">
                {rocks < 9 && (
                  <Button onClick={addRock} className="bg-amber-600 hover:bg-amber-700">
                    <Plus className="w-4 h-4 mr-1" /> Add 1 More Rock
                  </Button>
                )}
                {!crossing && !crossComplete && (
                  <Button onClick={startCrossing} className="bg-blue-600 hover:bg-blue-700">
                    🧭 Cross the Creek!
                  </Button>
                )}
                {crossComplete && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setRocks(5);
                      setExplorerPos(-1);
                      setCrossComplete(false);
                    }}
                  >
                    Try Again
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {phase === "debrief" && (
          <div className="bg-white rounded-2xl shadow-lg p-6 min-h-[350px]">
            <h2 className="text-xl font-bold text-purple-700 mb-4">💬 Student Debrief</h2>
            <div className="space-y-4">
              <div className="bg-purple-50 rounded-xl p-4">
                <p className="font-semibold text-purple-800">
                  How many rocks were in the creek at first?
                </p>
                <p className="text-muted-foreground mt-1">
                  There were 5 rocks. We added more to help the explorer cross!
                </p>
              </div>
              <div className="bg-purple-50 rounded-xl p-4">
                <p className="font-semibold text-purple-800">Follow the pattern:</p>
                <div className="mt-2 space-y-1 text-purple-700 font-mono">
                  <p>5 and 1 more is <strong>6</strong></p>
                  <p>6 and 1 more is <strong>7</strong></p>
                  <p>7 and 1 more is <strong>8</strong></p>
                  <p>8 and 1 more is <strong>…?</strong></p>
                </div>
                <p className="text-2xl font-bold text-purple-800 mt-2">9! 🎉</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <p className="font-semibold text-green-800">Remember:</p>
                <p className="text-green-700">
                  Each number is just 1 more than the number before it. We counted from 5 all the way to 9!
                </p>
              </div>
            </div>
          </div>
        )}

        {renderPhaseNav()}
      </div>
    </div>
  );
};

export default Lesson23;

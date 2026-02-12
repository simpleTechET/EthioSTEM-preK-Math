import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";

type Phase = "fluency" | "application" | "concept" | "debrief";

const ArrayCount25 = () => {
  const [phase, setPhase] = useState<Phase>("fluency");
  const [fluencyStep, setFluencyStep] = useState(0);

  // Fluency: plates & forks
  const [forks, setForks] = useState(0);
  // Fluency: towers
  const [towers, setTowers] = useState<number[][]>([[], [], []]);
  const [towerStep, setTowerStep] = useState(0); // 0=build, 1=joined, 2=split

  // Application: tennis balls
  const [cansShown, setCansShown] = useState(0);

  // Concept: storybook array
  const [rowsShown, setRowsShown] = useState(0);
  const [conceptStep, setConceptStep] = useState(0);

  // Practice: place counters in 3x3 grid
  const [placed, setPlaced] = useState(0);

  const towerColors = ["bg-rose-400", "bg-sky-400", "bg-amber-400"];
  const cubePool = [0, 0, 0, 1, 1, 1, 2, 2, 2]; // color indices

  const animals = [
    { row: "🐭 Three Blind Mice", emoji: "🐭", color: "bg-gray-200 border-gray-400" },
    { row: "🐷 Three Little Pigs", emoji: "🐷", color: "bg-pink-200 border-pink-400" },
    { row: "🐱 Three Little Kittens", emoji: "🐱", color: "bg-orange-200 border-orange-400" },
  ];

  const counterColors = ["bg-gray-400", "bg-pink-400", "bg-orange-400"];

  const addFork = () => { if (forks < 9) setForks(f => f + 1); };

  const buildTowers = () => {
    setTowers([[0, 1, 2].map(() => 0), [0, 1, 2].map(() => 1), [0, 1, 2].map(() => 2)]);
    setTowerStep(0);
  };

  const renderFluency = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-violet-800">🍽️ Fluency Practice</h2>

      {fluencyStep === 0 && (
        <div className="bg-white/80 rounded-2xl p-6 space-y-4">
          <h3 className="text-xl font-semibold text-violet-700">Change of Pace: Count Forks for Plates!</h3>
          <p className="text-violet-600">9 plates are set. Count a fork for each plate, starting from 0!</p>

          <div className="grid grid-cols-3 gap-3 bg-violet-50 rounded-xl p-4 border-2 border-violet-200">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full bg-white border-2 border-gray-300 shadow flex items-center justify-center text-sm font-bold text-violet-700">
                  🍽️
                </div>
                {forks > i && <span className="text-lg">🍴</span>}
              </div>
            ))}
          </div>

          <div className="text-lg font-bold text-violet-800">
            Forks placed: <span className="text-3xl">{forks}</span>
          </div>

          <Button onClick={addFork} disabled={forks >= 9} className="bg-violet-600 hover:bg-violet-700 text-white text-lg px-6 py-3">
            {forks >= 9 ? "All 9 forks placed! 🎉" : `Place fork ${forks + 1}`}
          </Button>

          {forks >= 9 && (
            <Button onClick={() => { setFluencyStep(1); buildTowers(); }} className="ml-3 bg-sky-600 hover:bg-sky-700 text-white">
              Next: Compose Towers <ArrowRight className="ml-1 w-4 h-4" />
            </Button>
          )}
        </div>
      )}

      {fluencyStep === 1 && (
        <div className="bg-white/80 rounded-2xl p-6 space-y-4">
          <h3 className="text-xl font-semibold text-sky-700">Compose a Tower of 9</h3>
          <p className="text-sky-600">3 colors, 3 cubes each. Build, join, and count!</p>

          {towerStep === 0 && (
            <>
              <div className="flex gap-6 justify-center bg-sky-50 rounded-xl p-4 border-2 border-sky-200">
                {towers.map((t, ti) => (
                  <div key={ti} className="flex flex-col-reverse gap-1 items-center">
                    {[0, 1, 2].map((ci) => (
                      <div key={ci} className={`w-10 h-8 ${towerColors[ti]} rounded shadow border border-white/50`} />
                    ))}
                    <span className="text-xs font-bold mt-1">3</span>
                  </div>
                ))}
              </div>
              <p className="text-center text-sky-700 font-semibold">3 towers of 3 cubes each</p>
              <Button onClick={() => setTowerStep(1)} className="bg-sky-600 hover:bg-sky-700 text-white">
                Join into 1 tall tower!
              </Button>
            </>
          )}

          {towerStep === 1 && (
            <>
              <div className="flex justify-center bg-sky-50 rounded-xl p-4 border-2 border-sky-200">
                <div className="flex flex-col-reverse gap-1 items-center">
                  {cubePool.map((c, i) => (
                    <div key={i} className={`w-10 h-8 ${towerColors[c]} rounded shadow border border-white/50 flex items-center justify-center text-white text-xs font-bold`}>
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-center text-sky-700 font-bold text-lg">1 tower of 9 cubes!</p>
              <Button onClick={() => setTowerStep(2)} className="bg-sky-600 hover:bg-sky-700 text-white">
                Break back into 3 towers
              </Button>
            </>
          )}

          {towerStep === 2 && (
            <>
              <div className="flex gap-6 justify-center bg-sky-50 rounded-xl p-4 border-2 border-sky-200">
                {[0, 1, 2].map((ti) => (
                  <div key={ti} className="flex flex-col-reverse gap-1 items-center">
                    {[0, 1, 2].map((ci) => (
                      <div key={ci} className={`w-10 h-8 ${towerColors[ti]} rounded shadow border border-white/50`} />
                    ))}
                    <span className="text-xs font-bold mt-1">3</span>
                  </div>
                ))}
              </div>
              <p className="text-center text-sky-700 font-semibold">3 towers × 3 cubes = 9 cubes total!</p>
              <Button onClick={() => setPhase("application")} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Next: Tennis Balls <ArrowRight className="ml-1 w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );

  const renderApplication = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-green-800">🎾 Application: Tennis Ball Cans</h2>

      <div className="bg-white/80 rounded-2xl p-6 space-y-4">
        <p className="text-green-700 text-lg">Friends bring cans of tennis balls. Each can has 3 balls!</p>

        <div className="flex gap-6 justify-center flex-wrap bg-green-50 rounded-xl p-6 border-2 border-green-200 min-h-[120px]">
          {Array.from({ length: cansShown }).map((_, ci) => (
            <div key={ci} className="flex flex-col items-center gap-1 bg-white rounded-xl p-3 shadow border border-green-200">
              <div className="text-xs font-bold text-green-600 mb-1">Can {ci + 1}</div>
              {[0, 1, 2].map((bi) => (
                <div key={bi} className="w-10 h-10 rounded-full bg-yellow-300 border-2 border-yellow-500 shadow flex items-center justify-center text-sm font-bold text-yellow-800">
                  {ci * 3 + bi + 1}
                </div>
              ))}
            </div>
          ))}
          {cansShown === 0 && <span className="text-green-400 italic self-center">No cans yet!</span>}
        </div>

        <div className="text-center text-xl font-bold text-green-800">
          {cansShown > 0 ? `${cansShown} can${cansShown > 1 ? "s" : ""} = ${cansShown * 3} tennis balls` : "0 tennis balls"}
        </div>

        <div className="flex justify-center gap-3">
          <Button
            onClick={() => setCansShown(c => Math.min(c + 1, 3))}
            disabled={cansShown >= 3}
            className="bg-green-600 hover:bg-green-700 text-white text-lg px-6 py-3"
          >
            {cansShown >= 3 ? "3 cans = 9 balls! 🎾" : `Bring can ${cansShown + 1}`}
          </Button>
        </div>

        {cansShown >= 3 && (
          <div className="text-center bg-green-100 rounded-xl p-3">
            <p className="text-green-800 font-bold">3 cans × 3 balls = 9 tennis balls!</p>
            <Button onClick={() => setPhase("concept")} className="mt-2 bg-amber-600 hover:bg-amber-700 text-white">
              Next: Storybook Animals <ArrowRight className="ml-1 w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  const renderConcept = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-amber-800">📚 Concept: Storybook Animal Array</h2>

      {conceptStep === 0 && (
        <div className="bg-white/80 rounded-2xl p-6 space-y-4">
          <p className="text-amber-700 text-lg">Animals from nursery rhymes visit! Add each group of 3.</p>

          <div className="space-y-3 bg-amber-50 rounded-xl p-4 border-2 border-amber-200 min-h-[160px]">
            {animals.slice(0, rowsShown).map((a, ri) => (
              <div key={ri} className="flex items-center gap-3">
                <span className="text-sm font-bold text-amber-700 w-40 truncate">{a.row}</span>
                <div className="flex gap-2">
                  {[0, 1, 2].map((ci) => (
                    <div
                      key={ci}
                      className={`w-12 h-12 rounded-lg ${a.color} border-2 flex items-center justify-center text-xl shadow animate-[bounceIn_0.3s_ease]`}
                    >
                      {a.emoji}
                    </div>
                  ))}
                </div>
                <span className="text-sm font-bold text-amber-600">= {ri * 3 + 3}</span>
              </div>
            ))}
            {rowsShown === 0 && <span className="text-amber-400 italic">No animals yet…</span>}
          </div>

          <div className="text-center text-xl font-bold text-amber-800">
            Total animals: <span className="text-3xl">{rowsShown * 3}</span>
          </div>

          <Button
            onClick={() => setRowsShown(r => Math.min(r + 1, 3))}
            disabled={rowsShown >= 3}
            className="bg-amber-600 hover:bg-amber-700 text-white text-lg px-6 py-3"
          >
            {rowsShown >= 3
              ? "All 9 animals! 🎉"
              : rowsShown === 0
              ? "Bring the 3 Blind Mice 🐭"
              : rowsShown === 1
              ? "Bring the 3 Little Pigs 🐷"
              : "Bring the 3 Little Kittens 🐱"}
          </Button>

          {rowsShown >= 3 && (
            <div className="text-center space-y-2">
              <p className="text-amber-700 font-semibold">3 rows × 3 animals = a 3 by 3 array of 9!</p>
              <Button onClick={() => setConceptStep(1)} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Practice: Place Counters <ArrowRight className="ml-1 w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      )}

      {conceptStep === 1 && (
        <div className="bg-white/80 rounded-2xl p-6 space-y-4">
          <h3 className="text-xl font-semibold text-amber-700">🔵 Practice: Build the Animal Array</h3>
          <p className="text-amber-600">Place counters left to right, top to bottom. Tap to place each one!</p>

          <div className="grid grid-cols-3 gap-3 bg-amber-50 rounded-xl p-6 border-2 border-amber-200 max-w-xs mx-auto">
            {Array.from({ length: 9 }).map((_, i) => {
              const row = Math.floor(i / 3);
              const isPlaced = placed > i;
              const isNext = placed === i;
              return (
                <button
                  key={i}
                  onClick={() => { if (isNext) setPlaced(p => p + 1); }}
                  disabled={!isNext}
                  className={`w-16 h-16 rounded-lg border-2 transition-all duration-200 flex items-center justify-center text-2xl font-bold ${
                    isPlaced
                      ? `${counterColors[row]} text-white shadow-lg`
                      : isNext
                      ? "bg-white border-amber-400 animate-pulse cursor-pointer hover:bg-amber-100"
                      : "bg-gray-100 border-gray-200"
                  }`}
                >
                  {isPlaced ? animals[row].emoji : isNext ? (i + 1) : ""}
                </button>
              );
            })}
          </div>

          <div className="text-center text-xl font-bold text-amber-800">
            Placed: <span className="text-3xl">{placed}</span> / 9
          </div>

          {placed >= 9 && (
            <div className="text-center">
              <p className="text-emerald-700 font-bold text-lg mb-3">3 × 3 array complete — 9 animals! 🎉</p>
              <Button onClick={() => setPhase("debrief")} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Debrief <ArrowRight className="ml-1 w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderDebrief = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-emerald-800">💬 Student Debrief</h2>

      <div className="bg-white/80 rounded-2xl p-6 space-y-4">
        <div className="bg-emerald-50 rounded-xl p-4 border-2 border-emerald-200 space-y-3">
          <p className="text-emerald-800 font-semibold text-lg">🤔 Think About It:</p>
          <div className="space-y-2 text-emerald-700">
            <p>📐 Is it better to count in order (left to right, top to bottom) or jump around? Why?</p>
            <p>🐷 If 1 pig was missing from the array, how many animals would there be? How do you know?</p>
            <p>🔢 How many animals need to be in each row of our 3 × 3 array?</p>
          </div>
        </div>

        <div className="bg-amber-50 rounded-xl p-4 border-2 border-amber-200 flex gap-4 justify-center">
          <div className="text-center">
            <p className="text-sm font-semibold text-amber-700 mb-2">8 dots</p>
            <div className="grid grid-cols-4 gap-1">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="w-5 h-5 rounded-full bg-amber-400" />
              ))}
            </div>
          </div>
          <div className="text-center border-2 border-emerald-400 rounded-xl p-2">
            <p className="text-sm font-semibold text-emerald-700 mb-2">9 dots ✓</p>
            <div className="grid grid-cols-3 gap-1">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="w-5 h-5 rounded-full bg-emerald-500" />
              ))}
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 rounded-xl p-4 border-2 border-yellow-200">
          <p className="text-yellow-800 font-semibold mb-1">🌟 Key Idea:</p>
          <p className="text-yellow-700 text-lg">
            We can count <strong>9 objects</strong> arranged in a <strong>3 × 3 array</strong> by going left to right, top to bottom!
          </p>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={() => {
              setPhase("fluency");
              setFluencyStep(0);
              setForks(0);
              setTowers([[], [], []]);
              setTowerStep(0);
              setCansShown(0);
              setRowsShown(0);
              setConceptStep(0);
              setPlaced(0);
            }}
            variant="outline"
            className="border-emerald-300 text-emerald-700"
          >
            <ArrowLeft className="mr-1 w-4 h-4" /> Start Over
          </Button>
        </div>
      </div>
    </div>
  );

  const phaseLabels: Record<Phase, string> = {
    fluency: "Fluency",
    application: "Application",
    concept: "Concept & Practice",
    debrief: "Debrief",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-amber-50 to-emerald-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-violet-900">Lesson 25</h1>
          <p className="text-violet-700">Count 9 objects in array configurations</p>
        </div>

        <div className="flex gap-2 justify-center mb-6 flex-wrap">
          {(Object.keys(phaseLabels) as Phase[]).map((p) => (
            <span
              key={p}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                phase === p
                  ? "bg-violet-600 text-white shadow"
                  : "bg-white/60 text-violet-600 border border-violet-200"
              }`}
            >
              {phaseLabels[p]}
            </span>
          ))}
        </div>

        {phase === "fluency" && renderFluency()}
        {phase === "application" && renderApplication()}
        {phase === "concept" && renderConcept()}
        {phase === "debrief" && renderDebrief()}
      </div>
    </div>
  );
};

export default ArrayCount25;

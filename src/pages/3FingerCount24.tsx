import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";

type Phase = "fluency" | "application" | "concept" | "debrief";

const FingerCount24 = () => {
  const [phase, setPhase] = useState<Phase>("fluency");
  const [fluencyStep, setFluencyStep] = useState(0);

  // Fluency: Change of Pace – plates
  const [plates, setPlates] = useState<number[]>([]);
  

  // Fluency: 1 More Tower
  const [towerHeight, setTowerHeight] = useState(0);

  // Application: eggs in nests
  const [greenEggs, setGreenEggs] = useState<number[]>([]);
  const [redEggs, setRedEggs] = useState<number[]>([]);
  const [appStep, setAppStep] = useState(0);

  // Concept: finger hatching
  const [hatchedFingers, setHatchedFingers] = useState(0);
  const [conceptStep, setConceptStep] = useState(0);

  // Practice: drawing lines from eggs
  const [drawnChicks, setDrawnChicks] = useState(0);

  const addPlate = () => {
    if (plates.length < 9) {
      setPlates((p) => [...p, p.length + 1]);
    }
  };

  const addCube = () => {
    if (towerHeight < 9) setTowerHeight((h) => h + 1);
  };

  const hatchNext = () => {
    if (hatchedFingers < 9) setHatchedFingers((h) => h + 1);
  };

  const drawChick = () => {
    if (drawnChicks < 9) setDrawnChicks((c) => c + 1);
  };

  const cubeColors = [
    "bg-sky-500", "bg-sky-500", "bg-sky-500", "bg-sky-500", "bg-sky-500",
    "bg-amber-500", "bg-amber-500", "bg-amber-500", "bg-amber-500",
  ];

  const renderFluency = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-emerald-800">🎵 Fluency Practice</h2>

      {fluencyStep === 0 && (
        <div className="bg-white/80 rounded-2xl p-6 space-y-4">
          <h3 className="text-xl font-semibold text-emerald-700">Change of Pace Counting: Set the Table!</h3>
          <p className="text-emerald-600">Tap the table to place plates. Count each one as it lands!</p>

          <div className="text-lg font-bold text-emerald-800">
            Plates on the table: <span className="text-3xl">{plates.length}</span>
          </div>

          <div className="flex flex-wrap gap-3 justify-center min-h-[80px] bg-amber-50 rounded-xl p-4 border-2 border-amber-200">
            {plates.map((_, i) => (
              <div
                key={i}
                className="w-14 h-14 rounded-full bg-white border-4 border-gray-300 shadow-md flex items-center justify-center text-lg font-bold text-emerald-700 animate-[bounceIn_0.3s_ease]"
              >
                {i + 1}
              </div>
            ))}
            {plates.length === 0 && (
              <span className="text-amber-400 italic self-center">Zero plates!</span>
            )}
          </div>

          <Button
            onClick={addPlate}
            disabled={plates.length >= 9}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-lg px-6 py-3"
          >
            {plates.length >= 9 ? "All 9 plates placed! 🎉" : `Place plate ${plates.length + 1}`}
          </Button>

          {plates.length >= 9 && (
            <Button onClick={() => setFluencyStep(1)} className="ml-3 bg-sky-600 hover:bg-sky-700 text-white">
              Next: Build a Tower <ArrowRight className="ml-1 w-4 h-4" />
            </Button>
          )}
        </div>
      )}

      {fluencyStep === 1 && (
        <div className="bg-white/80 rounded-2xl p-6 space-y-4">
          <h3 className="text-xl font-semibold text-sky-700">Use "1 More" to Make a Tower of 9</h3>
          <p className="text-sky-600">Add 1 more cube each time. Watch your tower grow!</p>

          <div className="flex items-end justify-center gap-1 min-h-[240px] bg-sky-50 rounded-xl p-4 border-2 border-sky-200">
            <div className="flex flex-col-reverse gap-1">
              {Array.from({ length: towerHeight }).map((_, i) => (
                <div
                  key={i}
                  className={`w-12 h-10 ${cubeColors[i]} rounded shadow-md flex items-center justify-center text-white font-bold text-sm animate-[bounceIn_0.3s_ease]`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          <div className="text-lg font-bold text-sky-800">
            Tower height: <span className="text-3xl">{towerHeight}</span>
          </div>

          <Button
            onClick={addCube}
            disabled={towerHeight >= 9}
            className="bg-sky-600 hover:bg-sky-700 text-white text-lg px-6 py-3"
          >
            {towerHeight >= 9 ? "Tower of 9! 🏗️" : `Add 1 more → ${towerHeight + 1}`}
          </Button>

          {towerHeight >= 9 && (
            <Button onClick={() => setPhase("application")} className="ml-3 bg-emerald-600 hover:bg-emerald-700 text-white">
              Next: Eggs in Nests <ArrowRight className="ml-1 w-4 h-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );

  const renderApplication = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-amber-800">🥚 Application: Eggs in Two Nests</h2>

      <div className="bg-white/80 rounded-2xl p-6 space-y-4">
        {appStep === 0 && (
          <>
            <p className="text-amber-700 text-lg">Draw <strong>5 green eggs</strong> in the first nest. Tap to add!</p>
            <div className="bg-green-50 rounded-xl p-4 border-2 border-green-300 min-h-[80px] flex flex-wrap gap-2 items-center justify-center">
              {greenEggs.map((_, i) => (
                <div key={i} className="w-10 h-12 bg-green-400 rounded-full border-2 border-green-600 flex items-center justify-center text-white font-bold text-sm shadow">
                  {i + 1}
                </div>
              ))}
              {greenEggs.length === 0 && <span className="text-green-400 italic">Empty nest</span>}
            </div>
            <Button
              onClick={() => { if (greenEggs.length < 5) setGreenEggs((e) => [...e, e.length + 1]); }}
              disabled={greenEggs.length >= 5}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {greenEggs.length >= 5 ? "5 green eggs! ✓" : `Add green egg ${greenEggs.length + 1}`}
            </Button>
            {greenEggs.length >= 5 && (
              <Button onClick={() => setAppStep(1)} className="ml-3 bg-red-500 hover:bg-red-600 text-white">
                Next: Red Eggs <ArrowRight className="ml-1 w-4 h-4" />
              </Button>
            )}
          </>
        )}

        {appStep === 1 && (
          <>
            <p className="text-amber-700 text-lg">Draw <strong>4 red eggs</strong> in the second nest. Tap to add!</p>
            <div className="flex gap-4 flex-wrap justify-center">
              <div className="bg-green-50 rounded-xl p-3 border-2 border-green-300 flex gap-1">
                {greenEggs.map((_, i) => (
                  <div key={i} className="w-8 h-10 bg-green-400 rounded-full border border-green-600 text-white text-xs flex items-center justify-center font-bold">{i + 1}</div>
                ))}
              </div>
              <div className="bg-red-50 rounded-xl p-3 border-2 border-red-300 min-w-[100px] flex gap-1 items-center">
                {redEggs.map((_, i) => (
                  <div key={i} className="w-8 h-10 bg-red-400 rounded-full border border-red-600 text-white text-xs flex items-center justify-center font-bold">{i + 1}</div>
                ))}
                {redEggs.length === 0 && <span className="text-red-300 italic text-sm">Empty</span>}
              </div>
            </div>
            <Button
              onClick={() => { if (redEggs.length < 4) setRedEggs((e) => [...e, e.length + 1]); }}
              disabled={redEggs.length >= 4}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {redEggs.length >= 4 ? "4 red eggs! ✓" : `Add red egg ${redEggs.length + 1}`}
            </Button>
            {redEggs.length >= 4 && (
              <div className="mt-4 bg-amber-100 rounded-xl p-4 text-center">
                <p className="text-xl font-bold text-amber-800">
                  5 + 4 = <span className="text-3xl text-emerald-700">9 eggs!</span>
                </p>
                <Button onClick={() => setPhase("concept")} className="mt-3 bg-emerald-600 hover:bg-emerald-700 text-white">
                  Next: Hatching Chicks! <ArrowRight className="ml-1 w-4 h-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );

  const renderConcept = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-amber-800">🐣 Concept: Chicks Hatching!</h2>

      {conceptStep === 0 && (
        <div className="bg-white/80 rounded-2xl p-6 space-y-4">
          <p className="text-amber-700 text-lg">
            Two nests of eggs. The <strong>green eggs hatch first</strong> (1–5), then the <strong>red eggs</strong> (6–9). Tap to hatch!
          </p>

          <div className="flex justify-center gap-6 flex-wrap">
            {/* Left hand – green nest */}
            <div className="bg-green-50 rounded-xl p-4 border-2 border-green-300">
              <p className="text-center text-sm font-semibold text-green-700 mb-2">Green Nest (Left Hand)</p>
              <div className="flex gap-2">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div
                      className={`w-10 h-14 rounded-t-full transition-all duration-300 flex items-center justify-center text-lg font-bold ${
                        hatchedFingers > i
                          ? "bg-yellow-300 border-2 border-yellow-500 shadow-lg"
                          : "bg-green-200 border-2 border-green-400"
                      }`}
                    >
                      {hatchedFingers > i ? "🐤" : "🥚"}
                    </div>
                    <span className="text-xs font-bold text-green-800">{hatchedFingers > i ? i + 1 : ""}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right hand – red nest */}
            <div className="bg-red-50 rounded-xl p-4 border-2 border-red-300">
              <p className="text-center text-sm font-semibold text-red-700 mb-2">Red Nest (Right Hand)</p>
              <div className="flex gap-2">
                {[5, 6, 7, 8].map((i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div
                      className={`w-10 h-14 rounded-t-full transition-all duration-300 flex items-center justify-center text-lg font-bold ${
                        hatchedFingers > i
                          ? "bg-yellow-300 border-2 border-yellow-500 shadow-lg"
                          : "bg-red-200 border-2 border-red-400"
                      }`}
                    >
                      {hatchedFingers > i ? "🐤" : "🥚"}
                    </div>
                    <span className="text-xs font-bold text-red-800">{hatchedFingers > i ? i + 1 : ""}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center text-2xl font-bold text-amber-800">
            Chicks hatched: <span className="text-4xl text-yellow-600">{hatchedFingers}</span>
          </div>

          <div className="flex justify-center gap-3">
            <Button
              onClick={hatchNext}
              disabled={hatchedFingers >= 9}
              className="bg-yellow-500 hover:bg-yellow-600 text-white text-lg px-6 py-3"
            >
              {hatchedFingers >= 9 ? "All 9 hatched! 🎉" : `Hatch chick ${hatchedFingers + 1}!`}
            </Button>
          </div>

          {hatchedFingers >= 9 && (
            <div className="text-center space-y-2">
              <p className="text-emerald-700 font-semibold">5 from the green nest + 4 from the red nest = 9 chicks!</p>
              <Button onClick={() => setConceptStep(1)} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Practice: Draw the Chicks <ArrowRight className="ml-1 w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      )}

      {conceptStep === 1 && (
        <div className="bg-white/80 rounded-2xl p-6 space-y-4">
          <h3 className="text-xl font-semibold text-amber-700">✏️ Practice: Draw Lines for Hatched Chicks</h3>
          <p className="text-amber-600">Tap each egg to draw a line showing the chick that hatched!</p>

          <div className="flex flex-wrap gap-3 justify-center bg-amber-50 rounded-xl p-4 border-2 border-amber-200 min-h-[120px]">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <button
                  onClick={drawChick}
                  disabled={drawnChicks > i}
                  className={`w-12 h-16 rounded-t-full border-2 transition-all duration-300 flex flex-col items-center justify-center ${
                    drawnChicks > i
                      ? "bg-yellow-200 border-yellow-500"
                      : i === drawnChicks
                      ? "bg-amber-100 border-amber-400 cursor-pointer hover:bg-amber-200 animate-pulse"
                      : "bg-gray-100 border-gray-300"
                  }`}
                >
                  {drawnChicks > i ? "🐤" : "🥚"}
                </button>
                {drawnChicks > i && (
                  <div className="w-0.5 h-6 bg-amber-500" />
                )}
                <span className={`text-xs font-bold ${drawnChicks > i ? "text-amber-700" : "text-gray-400"}`}>
                  {drawnChicks > i ? i + 1 : ""}
                </span>
              </div>
            ))}
          </div>

          <div className="text-center text-xl font-bold text-amber-800">
            Chicks drawn: <span className="text-3xl text-yellow-600">{drawnChicks}</span> / 9
          </div>

          {drawnChicks >= 9 && (
            <div className="text-center">
              <p className="text-emerald-700 font-bold text-lg mb-3">All 9 chicks have hatched! 🐣🎉</p>
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
            <p>✋ Show me your two nests (two fists). Now show me all the chicks (all fingers)!</p>
            <p>🐣 On your fingers, show the chicks that hatched today — count to <strong>9</strong>.</p>
            <p>📊 How is your picture of hatched chicks like the 9 fingers you're showing?</p>
            <p>🔢 Let's count to 8 with fingers. Now count to 9. What's different?</p>
          </div>
        </div>

        <div className="bg-yellow-50 rounded-xl p-4 border-2 border-yellow-200">
          <p className="text-yellow-800 font-semibold mb-2">🌟 Key Idea:</p>
          <p className="text-yellow-700 text-lg">
            We can count from <strong>0 to 9</strong> on our fingers, going left to right — 5 on one hand and 4 more on the other!
          </p>
        </div>

        <div className="flex justify-center gap-3 mt-4">
          <Button
            onClick={() => {
              setPhase("fluency");
              setFluencyStep(0);
              setPlates([]);
              setTowerHeight(0);
              setGreenEggs([]);
              setRedEggs([]);
              setAppStep(0);
              setHatchedFingers(0);
              setConceptStep(0);
              setDrawnChicks(0);
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
    fluency: "Fluency Practice",
    application: "Application",
    concept: "Concept & Practice",
    debrief: "Debrief",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-yellow-50 to-emerald-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-emerald-900">Lesson 24</h1>
          <p className="text-emerald-700">Count from 0 to 9 from left to right with fingers</p>
        </div>

        {/* Phase indicators */}
        <div className="flex gap-2 justify-center mb-6 flex-wrap">
          {(Object.keys(phaseLabels) as Phase[]).map((p) => (
            <span
              key={p}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                phase === p
                  ? "bg-emerald-600 text-white shadow"
                  : "bg-white/60 text-emerald-600 border border-emerald-200"
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

export default FingerCount24;

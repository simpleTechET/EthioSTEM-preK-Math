import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Phase = "fluency" | "application" | "concept" | "practice" | "debrief";

const grapeEmoji = "🍇";
const blueberryEmoji = "🫐";
const potatoEmoji = "🥔";

const Introduce9Lesson22 = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("fluency");
  const [fluencyStep, setFluencyStep] = useState<"claps" | "decompose">("claps");

  // Clap fluency
  const [clapTarget, setClapTarget] = useState(0);
  const [clapCount, setClapCount] = useState(0);
  const [clapDone, setClapDone] = useState(false);

  // Decompose 8
  const [towerBuilt, setTowerBuilt] = useState(false);
  const [towerBroken, setTowerBroken] = useState(false);

  // Application
  const [potatoCount, setPotatoCount] = useState(0);
  const [addedMore, setAddedMore] = useState(false);

  // Concept
  const [conceptStep, setConceptStep] = useState(0);
  const [plateGrapes, setPlateGrapes] = useState(0);
  const [blueberryAdded, setBlueberryAdded] = useState(false);
  const [fruitEaten, setFruitEaten] = useState(0);

  // Practice
  const [practiceGrapes, setPracticeGrapes] = useState(0);
  const [practiceBlueberry, setPracticeBlueberry] = useState(false);
  const [practiceEaten, setPracticeEaten] = useState(0);

  const resetAll = () => {
    setPhase("fluency");
    setFluencyStep("claps");
    setClapTarget(0);
    setClapCount(0);
    setClapDone(false);
    setTowerBuilt(false);
    setTowerBroken(false);
    setPotatoCount(0);
    setAddedMore(false);
    setConceptStep(0);
    setPlateGrapes(0);
    setBlueberryAdded(false);
    setFruitEaten(0);
    setPracticeGrapes(0);
    setPracticeBlueberry(false);
    setPracticeEaten(0);
  };

  const handleClap = () => {
    if (clapCount < clapTarget) {
      setClapCount(c => c + 1);
    }
    if (clapCount + 1 >= clapTarget) {
      setTimeout(() => {
        if (clapTarget < 9) {
          setClapTarget(t => t + 1);
          setClapCount(0);
        } else {
          setClapDone(true);
        }
      }, 600);
    }
  };

  const totalFruit = (blueberryAdded ? 1 : 0) + plateGrapes - fruitEaten;
  const totalPractice = (practiceBlueberry ? 1 : 0) + practiceGrapes - practiceEaten;

  const renderNav = () => (
    <div className="flex items-center justify-between w-full max-w-2xl mx-auto mb-4">
      <Button variant="ghost" size="sm" onClick={() => navigate("/learning")}>
        <Home className="w-4 h-4 mr-1" /> Home
      </Button>
      <h2 className="text-lg font-bold text-amber-800">
        Lesson 22: Introduce 9
      </h2>
      <Button variant="ghost" size="sm" onClick={resetAll}>
        <RotateCcw className="w-4 h-4 mr-1" /> Reset
      </Button>
    </div>
  );

  const phaseButton = (label: string, next: Phase) => (
    <Button
      className="mt-4 bg-amber-600 hover:bg-amber-700 text-white"
      onClick={() => setPhase(next)}
    >
      {label} <ArrowRight className="w-4 h-4 ml-1" />
    </Button>
  );

  // ─── FLUENCY ───
  const renderFluency = () => (
    <div className="text-center space-y-4">
      <h3 className="text-xl font-bold text-amber-700">Fluency Practice</h3>

      {fluencyStep === "claps" && (
        <div className="space-y-4">
          <p className="text-amber-900 font-medium">Count Claps from 0 to 9</p>
          <p className="text-sm text-amber-700">
            Tap the hands to clap! Start at 0 — no claps for zero!
          </p>
          <div className="text-5xl font-black text-amber-800">{clapTarget}</div>
          {!clapDone ? (
            <>
              <button
                onClick={handleClap}
                className="text-6xl animate-bounce hover:scale-110 transition-transform"
                aria-label="clap"
              >
                👏
              </button>
              <div className="flex justify-center gap-1">
                {Array.from({ length: clapCount }).map((_, i) => (
                  <span key={i} className="text-2xl">👏</span>
                ))}
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <p className="text-green-700 font-bold text-lg">
                🎉 Great clapping from 0 to 9!
              </p>
              <Button
                className="bg-amber-500 hover:bg-amber-600 text-white"
                onClick={() => setFluencyStep("decompose")}
              >
                Next: Decompose 8 <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
      )}

      {fluencyStep === "decompose" && (
        <div className="space-y-4">
          <p className="text-amber-900 font-medium">Decompose 8 into 5 and 3</p>
          <div className="flex justify-center gap-1">
            {!towerBroken ? (
              <div className="flex flex-col-reverse items-center gap-1">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 rounded ${i < 5 ? "bg-blue-500" : "bg-red-400"} border-2 border-white shadow transition-all ${towerBuilt ? "scale-100" : "scale-0"}`}
                    style={{ transitionDelay: `${i * 80}ms` }}
                  />
                ))}
              </div>
            ) : (
              <div className="flex gap-8">
                <div className="flex flex-col-reverse gap-1 items-center">
                  <span className="text-sm font-bold text-blue-700 mt-1">5</span>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="w-10 h-10 rounded bg-blue-500 border-2 border-white shadow" />
                  ))}
                </div>
                <div className="flex flex-col-reverse gap-1 items-center">
                  <span className="text-sm font-bold text-red-600 mt-1">3</span>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="w-10 h-10 rounded bg-red-400 border-2 border-white shadow" />
                  ))}
                </div>
              </div>
            )}
          </div>

          {!towerBuilt && (
            <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={() => setTowerBuilt(true)}>
              Build Tower
            </Button>
          )}
          {towerBuilt && !towerBroken && (
            <Button className="bg-red-400 hover:bg-red-500 text-white" onClick={() => setTowerBroken(true)}>
              Break Apart by Color
            </Button>
          )}
          {towerBroken && (
            <div>
              <p className="text-green-700 font-bold">5 + 3 = 8 ✓</p>
              {phaseButton("Next: Application Problem", "application")}
            </div>
          )}
        </div>
      )}
    </div>
  );

  // ─── APPLICATION ───
  const renderApplication = () => {
    const rhymeLines = [
      "One potato, two potato,",
      "Three potato, four,",
      "Five potato, six potato,",
      "Seven potato, more!"
    ];
    return (
      <div className="text-center space-y-4">
        <h3 className="text-xl font-bold text-amber-700">Application Problem</h3>
        <p className="text-amber-900 font-medium">Count potatoes with the rhyme!</p>

        <div className="bg-amber-50 rounded-xl p-4 max-w-md mx-auto">
          {rhymeLines.map((line, i) => (
            <p key={i} className={`text-lg italic ${potatoCount > i * 2 ? "text-amber-800" : "text-amber-400"}`}>
              {line}
            </p>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {Array.from({ length: addedMore ? 8 : potatoCount }).map((_, i) => (
            <span key={i} className="text-4xl animate-bounce" style={{ animationDelay: `${i * 100}ms` }}>
              {potatoEmoji}
            </span>
          ))}
        </div>

        {potatoCount < 7 && (
          <Button className="bg-amber-500 hover:bg-amber-600 text-white" onClick={() => setPotatoCount(c => c + 1)}>
            Next Potato 🥔
          </Button>
        )}
        {potatoCount >= 7 && !addedMore && (
          <div className="space-y-2">
            <p className="text-amber-800 font-bold">"More" means we add 1 more!</p>
            <p className="text-amber-700">What is 7 and 1 more?</p>
            <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => setAddedMore(true)}>
              Add 1 More! 🥔
            </Button>
          </div>
        )}
        {addedMore && (
          <div className="space-y-2">
            <p className="text-green-700 font-bold text-xl">7 and 1 more = 8 potatoes! 🎉</p>
            {phaseButton("Next: Concept Development", "concept")}
          </div>
        )}
      </div>
    );
  };

  // ─── CONCEPT ───
  const renderConcept = () => (
    <div className="text-center space-y-4">
      <h3 className="text-xl font-bold text-amber-700">Concept Development</h3>
      <p className="text-amber-900 font-medium">Let's make a fruit snack!</p>

      {/* Plate */}
      <div className="relative mx-auto w-64 h-48 bg-gray-100 rounded-full border-4 border-gray-300 flex flex-wrap items-center justify-center gap-1 p-4">
        {Array.from({ length: plateGrapes - fruitEaten }).map((_, i) => (
          <span key={`g${i}`} className="text-3xl">{grapeEmoji}</span>
        ))}
        {blueberryAdded && fruitEaten < plateGrapes + 1 && (
          <span className="text-3xl">{blueberryEmoji}</span>
        )}
        {totalFruit === 0 && conceptStep >= 3 && (
          <span className="text-2xl font-black text-gray-400">0</span>
        )}
      </div>

      <p className="text-2xl font-black text-amber-800">
        {totalFruit} {totalFruit === 1 ? "piece" : "pieces"} of fruit
      </p>

      {conceptStep === 0 && (
        <div className="space-y-2">
          <p className="text-amber-700">The plate is empty. How many? <strong>0!</strong></p>
          <p className="text-amber-700">Tap to add grapes one at a time.</p>
          {plateGrapes < 8 ? (
            <Button className="bg-purple-500 hover:bg-purple-600 text-white" onClick={() => setPlateGrapes(c => c + 1)}>
              Add Grape {grapeEmoji} ({plateGrapes}/8)
            </Button>
          ) : (
            <div>
              <p className="text-green-700 font-bold">8 grapes! 🎉</p>
              <Button className="bg-amber-500 hover:bg-amber-600 text-white mt-2" onClick={() => setConceptStep(1)}>
                Next Step <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
      )}

      {conceptStep === 1 && (
        <div className="space-y-2">
          <p className="text-amber-700 font-medium">"I'm really hungry! Let's add one more piece of fruit!"</p>
          <Button className="bg-indigo-500 hover:bg-indigo-600 text-white" onClick={() => { setBlueberryAdded(true); setConceptStep(2); }}>
            Add Blueberry {blueberryEmoji}
          </Button>
        </div>
      )}

      {conceptStep === 2 && (
        <div className="space-y-2">
          <p className="text-green-700 font-bold text-xl">8 and 1 more is 9! 🎉</p>
          <p className="text-amber-700">8 grapes + 1 blueberry = 9 pieces of fruit</p>
          <Button className="bg-amber-500 hover:bg-amber-600 text-white" onClick={() => setConceptStep(3)}>
            Now Let's Eat! 🍽️
          </Button>
        </div>
      )}

      {conceptStep === 3 && totalFruit > 0 && (
        <div className="space-y-2">
          <p className="text-amber-700">Tap to eat fruit one at a time!</p>
          <Button className="bg-red-400 hover:bg-red-500 text-white" onClick={() => setFruitEaten(e => e + 1)}>
            Eat One! 😋
          </Button>
        </div>
      )}

      {conceptStep === 3 && totalFruit === 0 && (
        <div className="space-y-2">
          <p className="text-green-700 font-bold text-xl">0 pieces of fruit left! 🎉</p>
          {phaseButton("Next: Practice", "practice")}
        </div>
      )}
    </div>
  );

  // ─── PRACTICE ───
  const renderPractice = () => (
    <div className="text-center space-y-4">
      <h3 className="text-xl font-bold text-amber-700">Practice</h3>
      <p className="text-amber-900 font-medium">Now you make your own snack!</p>

      <div className="relative mx-auto w-64 h-48 bg-yellow-50 rounded-full border-4 border-yellow-300 flex flex-wrap items-center justify-center gap-1 p-4">
        {Array.from({ length: practiceGrapes - practiceEaten }).map((_, i) => (
          <span key={`pg${i}`} className="text-3xl">{grapeEmoji}</span>
        ))}
        {practiceBlueberry && practiceEaten < practiceGrapes + 1 && (
          <span className="text-3xl">{blueberryEmoji}</span>
        )}
        {totalPractice === 0 && practiceBlueberry && practiceEaten > 0 && (
          <span className="text-2xl font-black text-gray-400">0</span>
        )}
      </div>

      <p className="text-2xl font-black text-amber-800">{totalPractice} on the plate</p>

      {practiceGrapes < 8 && !practiceBlueberry && (
        <Button className="bg-purple-500 hover:bg-purple-600 text-white" onClick={() => setPracticeGrapes(c => c + 1)}>
          Add Grape {grapeEmoji} ({practiceGrapes}/8)
        </Button>
      )}

      {practiceGrapes === 8 && !practiceBlueberry && (
        <div className="space-y-2">
          <p className="text-amber-700 font-bold">8 grapes! Now add 1 more.</p>
          <Button className="bg-indigo-500 hover:bg-indigo-600 text-white" onClick={() => setPracticeBlueberry(true)}>
            Add Blueberry {blueberryEmoji}
          </Button>
        </div>
      )}

      {practiceBlueberry && totalPractice > 0 && (
        <div className="space-y-2">
          <p className="text-green-700 font-bold">8 and 1 more is 9! Now eat them!</p>
          <Button className="bg-red-400 hover:bg-red-500 text-white" onClick={() => setPracticeEaten(e => e + 1)}>
            Eat One! 😋
          </Button>
        </div>
      )}

      {practiceBlueberry && totalPractice === 0 && (
        <div className="space-y-2">
          <p className="text-green-700 font-bold text-xl">All gone — 0 fruit! 🎉</p>
          {phaseButton("Next: Debrief", "debrief")}
        </div>
      )}
    </div>
  );

  // ─── DEBRIEF ───
  const renderDebrief = () => (
    <div className="text-center space-y-5">
      <h3 className="text-xl font-bold text-amber-700">Student Debrief</h3>
      <div className="bg-amber-50 rounded-xl p-5 max-w-md mx-auto space-y-3 text-left">
        <p className="text-amber-800 font-medium">🤔 Think about your plate:</p>
        <ul className="list-disc list-inside text-amber-700 space-y-2 text-sm">
          <li>How many were grapes? How many were blueberries?</li>
          <li>How many pieces of fruit altogether?</li>
          <li>What is 8 and 1 more without counting? <strong>9!</strong></li>
        </ul>
        <p className="text-amber-800 font-medium mt-3">✋ Finger check:</p>
        <div className="flex flex-wrap gap-3 justify-center">
          {[5, 6, 7, 8].map(n => (
            <div key={n} className="bg-white rounded-lg p-3 shadow text-center">
              <p className="text-sm text-amber-600">{n} and 1 more?</p>
              <p className="text-2xl font-black text-amber-800">{n + 1}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-3 justify-center pt-2">
        <Button variant="outline" onClick={() => navigate("/learning")}>
          <Home className="w-4 h-4 mr-1" /> Home
        </Button>
        <Button className="bg-amber-600 hover:bg-amber-700 text-white" onClick={resetAll}>
          <RotateCcw className="w-4 h-4 mr-1" /> Play Again
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 via-yellow-50 to-orange-100 p-4">
      {renderNav()}

      {/* Phase indicator */}
      <div className="flex justify-center gap-1 mb-6 flex-wrap">
        {(["fluency", "application", "concept", "practice", "debrief"] as Phase[]).map(p => (
          <span
            key={p}
            className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${phase === p ? "bg-amber-600 text-white" : "bg-amber-200 text-amber-700"}`}
          >
            {p}
          </span>
        ))}
      </div>

      <div className="max-w-2xl mx-auto bg-white/80 rounded-2xl shadow-lg p-6">
        {phase === "fluency" && renderFluency()}
        {phase === "application" && renderApplication()}
        {phase === "concept" && renderConcept()}
        {phase === "practice" && renderPractice()}
        {phase === "debrief" && renderDebrief()}
      </div>
    </div>
  );
};

export default Introduce9Lesson22;

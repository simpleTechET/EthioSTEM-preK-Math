import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Drum } from "lucide-react";

type Phase = "fluency" | "application" | "concept" | "practice" | "debrief";
type VoiceMode = "whisper-big" | "big-whisper" | "growl-high";
type GardenLayout = "array3x3" | "array2rows" | "line" | "circle";

const VOICE_MODES: { key: VoiceMode; bottom: string; top: string }[] = [
  { key: "whisper-big", bottom: "🤫 Whisper", top: "📢 Big" },
  { key: "big-whisper", bottom: "📢 Big", top: "🤫 Whisper" },
  { key: "growl-high", bottom: "🐻 Growl", top: "🐦 High" },
];

const SEED_EMOJI = "🌱";

function positionOnCircle(i: number, total: number, r: number) {
  const angle = (2 * Math.PI * i) / total - Math.PI / 2;
  return { x: r + r * Math.cos(angle), y: r + r * Math.sin(angle) };
}

function SeedGrid({ layout, seeds, highlighted, onTap }: {
  layout: GardenLayout;
  seeds: number;
  highlighted: number[];
  onTap?: (i: number) => void;
}) {
  if (layout === "array3x3") {
    const rows = [seeds > 3 ? 3 : seeds, seeds > 6 ? 3 : Math.max(0, seeds - 3), Math.max(0, seeds - 6)];
    return (
      <div className="flex flex-col items-center gap-2">
        {rows.map((count, r) => count > 0 && (
          <div key={r} className="flex gap-3">
            {Array.from({ length: count }).map((_, c) => {
              const idx = r * 3 + c;
              return (
                <button key={idx} onClick={() => onTap?.(idx)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all ${highlighted.includes(idx) ? "bg-green-200 ring-2 ring-green-500 scale-110" : "bg-amber-100"}`}>
                  {SEED_EMOJI}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    );
  }

  if (layout === "array2rows") {
    const row1 = Math.min(5, seeds);
    const row2 = Math.max(0, seeds - 5);
    return (
      <div className="flex flex-col items-center gap-2">
        {[row1, row2].map((count, r) => count > 0 && (
          <div key={r} className="flex gap-3">
            {Array.from({ length: count }).map((_, c) => {
              const idx = r * 5 + c;
              return (
                <button key={idx} onClick={() => onTap?.(idx)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all ${highlighted.includes(idx) ? "bg-green-200 ring-2 ring-green-500 scale-110" : "bg-amber-100"}`}>
                  {SEED_EMOJI}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    );
  }

  if (layout === "line") {
    return (
      <div className="flex gap-2 flex-wrap justify-center">
        {Array.from({ length: seeds }).map((_, i) => (
          <button key={i} onClick={() => onTap?.(i)}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all ${highlighted.includes(i) ? "bg-green-200 ring-2 ring-green-500 scale-110" : "bg-amber-100"}`}>
            {SEED_EMOJI}
          </button>
        ))}
      </div>
    );
  }

  // circle
  const r = 70;
  return (
    <div className="relative mx-auto" style={{ width: r * 2 + 48, height: r * 2 + 48 }}>
      {Array.from({ length: seeds }).map((_, i) => {
        const pos = positionOnCircle(i, seeds, r);
        return (
          <button key={i} onClick={() => onTap?.(i)}
            className={`absolute w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all ${highlighted.includes(i) ? "bg-green-200 ring-2 ring-green-500 scale-110" : "bg-amber-100"}`}
            style={{ left: pos.x, top: pos.y }}>
            {SEED_EMOJI}
          </button>
        );
      })}
    </div>
  );
}

export default function ArrangeCount9Lesson28() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("fluency");

  // Fluency - Drum
  const [drumTarget, setDrumTarget] = useState(0);
  const [drumHits, setDrumHits] = useState(0);
  const [drumDone, setDrumDone] = useState(false);

  // Fluency - Tower
  const [voiceIdx, setVoiceIdx] = useState(0);
  const [towerCount, setTowerCount] = useState(0);
  const [showNumeral9, setShowNumeral9] = useState(false);

  // Application
  const [bagOpen, setBagOpen] = useState(false);
  const [bagCounted, setBagCounted] = useState<number[]>([]);

  // Concept
  const [gardenStep, setGardenStep] = useState(0);
  const [gardenCounted, setGardenCounted] = useState<number[]>([]);
  const GARDEN_LAYOUTS: { layout: GardenLayout; label: string; desc: string }[] = [
    { layout: "array3x3", label: "3 Rows of 3", desc: "Ezra and 2 neighbors each bring 3 seeds — a 3×3 array!" },
    { layout: "array2rows", label: "2 Rows", desc: "Ezra suggests planting in 2 rows: 5 and 4." },
    { layout: "line", label: "One Long Row", desc: "A neighbor says to try one long row!" },
    { layout: "circle", label: "A Circle", desc: "Everyone gets excited about planting in a circle!" },
  ];

  // Practice
  const [practiceLayout, setPracticeLayout] = useState<GardenLayout>("array3x3");
  const [practiceCounted, setPracticeCounted] = useState<number[]>([]);
  const [practiceComplete, setPracticeComplete] = useState(false);

  const phases: Phase[] = ["fluency", "application", "concept", "practice", "debrief"];
  const phaseIdx = phases.indexOf(phase);

  function nextPhase() {
    if (phaseIdx < phases.length - 1) setPhase(phases[phaseIdx + 1]);
  }

  // Drum handler
  function handleDrum() {
    if (drumHits < drumTarget) {
      setDrumHits(prev => {
        const next = prev + 1;
        if (next === drumTarget && drumTarget < 10) {
          setTimeout(() => { setDrumTarget(drumTarget + 1); setDrumHits(0); }, 800);
        }
        if (next === drumTarget && drumTarget === 10) {
          setTimeout(() => setDrumDone(true), 600);
        }
        return next;
      });
    }
  }

  // Tower count
  function handleTowerCube() {
    if (towerCount < 9) setTowerCount(prev => prev + 1);
  }

  // Bag counting
  function handleBagSeed(i: number) {
    if (!bagCounted.includes(i)) {
      setBagCounted(prev => [...prev, i]);
    }
  }

  // Garden counting
  function handleGardenSeed(i: number) {
    if (!gardenCounted.includes(i)) {
      setGardenCounted(prev => [...prev, i]);
    }
  }

  // Practice counting
  function handlePracticeSeed(i: number) {
    if (!practiceCounted.includes(i)) {
      const next = [...practiceCounted, i];
      setPracticeCounted(next);
      if (next.length === 9) setPracticeComplete(true);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-amber-50">
      {/* Header */}
      <div className="bg-green-700 text-white p-3 flex items-center justify-between">
        <Button variant="ghost" size="sm" className="text-white hover:text-green-200" onClick={() => navigate("/learning")}>
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Button>
        <h1 className="text-lg font-bold">Lesson 28: Arrange & Count 9</h1>
        <span className="text-sm bg-green-800 px-2 py-1 rounded">PK.CC.3a</span>
      </div>

      {/* Phase Tabs */}
      <div className="flex gap-1 p-2 bg-green-100 overflow-x-auto">
        {phases.map((p) => (
          <button key={p} onClick={() => setPhase(p)}
            className={`px-3 py-1 rounded-full text-sm font-medium capitalize whitespace-nowrap transition-all ${phase === p ? "bg-green-600 text-white" : "bg-white text-green-700 hover:bg-green-200"}`}>
            {p === "concept" ? "Concept" : p === "practice" ? "Practice" : p}
          </button>
        ))}
      </div>

      <div className="max-w-2xl mx-auto p-4">
        {/* ============ FLUENCY ============ */}
        {phase === "fluency" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-green-800">🥁 Fluency Practice</h2>

            {!drumDone ? (
              <div className="bg-white rounded-2xl p-6 shadow-md text-center space-y-4">
                <h3 className="font-semibold text-lg">Drum 10 Times</h3>
                <p className="text-muted-foreground">I say a number, you drum that many times! Start with zero.</p>
                <div className="text-6xl font-bold text-green-700">{drumTarget}</div>
                <p className="text-sm text-muted-foreground">
                  Hits: {drumHits} / {drumTarget}
                </p>
                <button onClick={handleDrum}
                  className="w-24 h-24 rounded-full bg-amber-500 hover:bg-amber-600 active:scale-90 transition-all flex items-center justify-center mx-auto shadow-lg">
                  <Drum className="w-12 h-12 text-white" />
                </button>
                {drumTarget === 0 && <p className="text-green-600 font-medium">Zero means no drums! ✓</p>}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-6 shadow-md space-y-4">
                <h3 className="font-semibold text-lg text-center">Touch & Count Tower of 9</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Tap each cube from bottom to top. Voice: {VOICE_MODES[voiceIdx].bottom} then {VOICE_MODES[voiceIdx].top}
                </p>
                <div className="flex flex-col-reverse items-center gap-1">
                  {Array.from({ length: 9 }).map((_, i) => {
                    const isBottom = i < 5;
                    const voice = isBottom ? VOICE_MODES[voiceIdx].bottom : VOICE_MODES[voiceIdx].top;
                    const counted = i < towerCount;
                    return (
                      <button key={i} onClick={i === towerCount ? handleTowerCube : undefined}
                        className={`w-14 h-8 rounded flex items-center justify-center text-sm font-bold transition-all ${isBottom ? "bg-red-400" : "bg-blue-400"} ${counted ? "ring-2 ring-yellow-400 scale-105" : "opacity-80"} ${i === towerCount ? "animate-pulse" : ""}`}>
                        {counted ? `${voice} ${i + 1}` : ""}
                      </button>
                    );
                  })}
                </div>
                {towerCount === 9 && !showNumeral9 && (
                  <Button className="w-full" onClick={() => setShowNumeral9(true)}>Show Numeral 9</Button>
                )}
                {showNumeral9 && (
                  <div className="text-center space-y-2">
                    <div className="text-8xl font-bold text-green-700">9</div>
                    <p className="text-green-600 font-medium">That's 9! Trace it in the air! ✨</p>
                    {voiceIdx < 2 ? (
                      <Button onClick={() => { setVoiceIdx(voiceIdx + 1); setTowerCount(0); setShowNumeral9(false); }}>
                        Try {VOICE_MODES[voiceIdx + 1].bottom} & {VOICE_MODES[voiceIdx + 1].top}
                      </Button>
                    ) : (
                      <Button onClick={nextPhase}>Continue <ArrowRight className="w-4 h-4 ml-1" /></Button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ============ APPLICATION ============ */}
        {phase === "application" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-green-800">🌱 Application: Seed Bags</h2>
            <div className="bg-white rounded-2xl p-6 shadow-md text-center space-y-4">
              <p className="text-muted-foreground">You have a bag with 9 seeds. Try to count them!</p>
              {!bagOpen ? (
                <div className="space-y-3">
                  <div className="w-32 h-40 mx-auto bg-amber-100 rounded-lg border-2 border-dashed border-amber-400 flex items-center justify-center">
                    <span className="text-4xl">👜</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Can you count without opening? Try arranging them inside!</p>
                  <Button onClick={() => setBagOpen(true)}>Open the Bag</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm font-medium">Tap each seed to count! Arrange them so they're easy to count.</p>
                  <div className="flex flex-wrap gap-3 justify-center p-4 bg-green-50 rounded-xl">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <button key={i} onClick={() => handleBagSeed(i)}
                        className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all ${bagCounted.includes(i) ? "bg-green-200 ring-2 ring-green-500 scale-110" : "bg-amber-100 hover:bg-amber-200"}`}>
                        {bagCounted.includes(i) ? `${bagCounted.indexOf(i) + 1}` : "🫘"}
                      </button>
                    ))}
                  </div>
                  {bagCounted.length === 9 && (
                    <div className="space-y-2">
                      <p className="text-green-600 font-bold text-lg">9 seeds! 🌱</p>
                      <Button onClick={nextPhase}>Continue <ArrowRight className="w-4 h-4 ml-1" /></Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============ CONCEPT ============ */}
        {phase === "concept" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-green-800">🌻 Community Garden</h2>
            <div className="bg-white rounded-2xl p-6 shadow-md space-y-4">
              <div className="bg-green-50 rounded-xl p-4">
                <h3 className="font-semibold text-green-800">{GARDEN_LAYOUTS[gardenStep].label}</h3>
                <p className="text-sm text-muted-foreground mt-1">{GARDEN_LAYOUTS[gardenStep].desc}</p>
              </div>

              <div className="bg-green-100 rounded-xl p-6 min-h-[180px] flex items-center justify-center">
                <SeedGrid layout={GARDEN_LAYOUTS[gardenStep].layout} seeds={9} highlighted={gardenCounted} onTap={handleGardenSeed} />
              </div>

              <p className="text-center text-sm font-medium">
                Counted: {gardenCounted.length} / 9
              </p>

              {gardenCounted.length === 9 && (
                <div className="text-center space-y-2">
                  <p className="text-green-600 font-bold">9 seeds no matter the arrangement! ✨</p>
                  {gardenStep < 3 ? (
                    <Button onClick={() => { setGardenStep(gardenStep + 1); setGardenCounted([]); }}>
                      Try Next Layout <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  ) : (
                    <Button onClick={nextPhase}>Continue to Practice <ArrowRight className="w-4 h-4 ml-1" /></Button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============ PRACTICE ============ */}
        {phase === "practice" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-green-800">🌿 Practice: Your Garden</h2>
            <div className="bg-white rounded-2xl p-6 shadow-md space-y-4">
              <p className="text-muted-foreground text-center">Choose your favorite garden layout and count the seeds!</p>

              <div className="flex gap-2 justify-center flex-wrap">
                {(["array3x3", "array2rows", "line", "circle"] as GardenLayout[]).map((l) => (
                  <button key={l} onClick={() => { setPracticeLayout(l); setPracticeCounted([]); setPracticeComplete(false); }}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${practiceLayout === l ? "bg-green-600 text-white" : "bg-green-100 text-green-700 hover:bg-green-200"}`}>
                    {l === "array3x3" ? "3×3 Array" : l === "array2rows" ? "2 Rows" : l === "line" ? "Line" : "Circle"}
                  </button>
                ))}
              </div>

              <div className="bg-green-100 rounded-xl p-6 min-h-[180px] flex items-center justify-center">
                <SeedGrid layout={practiceLayout} seeds={9} highlighted={practiceCounted} onTap={handlePracticeSeed} />
              </div>

              <p className="text-center text-sm font-medium">Counted: {practiceCounted.length} / 9</p>

              {practiceComplete && (
                <div className="text-center space-y-2">
                  <p className="text-green-600 font-bold text-lg">🌻 9 seeds planted! Great job!</p>
                  <div className="flex gap-2 justify-center">
                    <Button variant="outline" onClick={() => {
                      const layouts: GardenLayout[] = ["array3x3", "array2rows", "line", "circle"];
                      const next = layouts[(layouts.indexOf(practiceLayout) + 1) % 4];
                      setPracticeLayout(next); setPracticeCounted([]); setPracticeComplete(false);
                    }}>Try Another Layout</Button>
                    <Button onClick={nextPhase}>Continue <ArrowRight className="w-4 h-4 ml-1" /></Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============ DEBRIEF ============ */}
        {phase === "debrief" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-green-800">🌟 Student Debrief</h2>
            <div className="bg-white rounded-2xl p-6 shadow-md space-y-4">
              <div className="space-y-3">
                <div className="bg-green-50 p-4 rounded-xl">
                  <p className="font-medium text-green-800">💬 Which layout made it easiest to count the seeds?</p>
                  <p className="text-sm text-muted-foreground mt-1">Lines? Arrays? Circles? Think about why!</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-xl">
                  <p className="font-medium text-amber-800">🔄 Conservation of Number</p>
                  <p className="text-sm text-muted-foreground mt-1">No matter how we arrange 9 seeds — in a line, circle, or array — there are still 9! The number stays the same.</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl">
                  <p className="font-medium text-blue-800">🎨 Art Connection</p>
                  <p className="text-sm text-muted-foreground mt-1">Try making a flower garden! Place 9 seeds, then replace each with a flower 🌸</p>
                  <div className="flex gap-1 mt-2 justify-center">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <span key={i} className="text-2xl">🌸</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-center pt-4">
                <p className="text-green-700 font-bold text-lg mb-3">🎉 Lesson 28 Complete!</p>
                <div className="flex gap-2 justify-center">
                  <Button variant="outline" onClick={() => navigate("/learning")}>Back to Lessons</Button>
                  <Button onClick={() => setPhase("fluency")}>Restart Lesson</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

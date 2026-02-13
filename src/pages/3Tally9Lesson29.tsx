import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Phase = "fluency" | "application" | "concept" | "practice" | "debrief";

function TallyMarks({ count, size = "md" }: { count: number; size?: "sm" | "md" | "lg" }) {
  const groups = Math.floor(count / 5);
  const remainder = count % 5;
  const sz = size === "lg" ? "h-10" : size === "md" ? "h-8" : "h-6";
  const gap = size === "lg" ? "gap-1" : "gap-0.5";

  return (
    <div className="flex items-end gap-3 justify-center">
      {Array.from({ length: groups }).map((_, g) => (
        <div key={g} className={`relative flex ${gap} items-end`}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={`w-1.5 ${sz} bg-amber-800 rounded-sm`} />
          ))}
          <div className={`absolute w-full ${sz} border-t-[3px] border-amber-800 rotate-[30deg] top-1/2 -translate-y-1/2`} />
        </div>
      ))}
      {remainder > 0 && (
        <div className={`flex ${gap} items-end`}>
          {Array.from({ length: remainder }).map((_, i) => (
            <div key={i} className={`w-1.5 ${sz} bg-amber-800 rounded-sm`} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Tally9Lesson29() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("fluency");

  // Fluency - march count
  const [marchCount, setMarchCount] = useState(0);
  const [marchDone, setMarchDone] = useState(false);

  // Application - bees in cup
  const [appBeeCount] = useState(() => Math.floor(Math.random() * 6) + 4); // 4-9
  const [appRevealed, setAppRevealed] = useState(false);
  const [appSelected, setAppSelected] = useState<number | null>(null);

  // Concept - Pollen Café
  const [seatedBees, setSeatedBees] = useState(0);
  const [orders, setOrders] = useState(0);
  const [tallyCount, setTallyCount] = useState(0);
  const [flowersDelivered, setFlowersDelivered] = useState(0);
  const [conceptStep, setConceptStep] = useState<"seat" | "order" | "deliver">("seat");

  // Practice
  const [practiceBees] = useState(() => Math.floor(Math.random() * 6) + 4);
  const [practiceSeated, setPracticeSeated] = useState(0);
  const [practiceTally, setPracticeTally] = useState(0);
  const [practiceChecked, setPracticeChecked] = useState(false);

  const phases: Phase[] = ["fluency", "application", "concept", "practice", "debrief"];
  const phaseIdx = phases.indexOf(phase);
  function nextPhase() {
    if (phaseIdx < phases.length - 1) setPhase(phases[phaseIdx + 1]);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-50">
      {/* Header */}
      <div className="bg-amber-700 text-white p-3 flex items-center justify-between">
        <Button variant="ghost" size="sm" className="text-white hover:text-amber-200" onClick={() => navigate("/learning")}>
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Button>
        <h1 className="text-lg font-bold">Lesson 29: Tally 9 Objects</h1>
        <span className="text-sm bg-amber-800 px-2 py-1 rounded">PK.CC.5</span>
      </div>

      {/* Phase Tabs */}
      <div className="flex gap-1 p-2 bg-amber-100 overflow-x-auto">
        {phases.map((p) => (
          <button key={p} onClick={() => setPhase(p)}
            className={`px-3 py-1 rounded-full text-sm font-medium capitalize whitespace-nowrap transition-all ${phase === p ? "bg-amber-600 text-white" : "bg-white text-amber-700 hover:bg-amber-200"}`}>
            {p}
          </button>
        ))}
      </div>

      <div className="max-w-2xl mx-auto p-4">
        {/* ===== FLUENCY ===== */}
        {phase === "fluency" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-amber-800">🥁 March and Count 0 to 10</h2>
            <div className="bg-white rounded-2xl p-6 shadow-md text-center space-y-4">
              <p className="text-muted-foreground">Tap the boot to march! Don't march on zero.</p>
              <div className="text-6xl font-bold text-amber-700">{marchCount}</div>
              {!marchDone ? (
                <>
                  <button
                    onClick={() => {
                      if (marchCount === 0) {
                        setMarchCount(1);
                      } else if (marchCount < 10) {
                        setMarchCount(marchCount + 1);
                      } else {
                        setMarchDone(true);
                      }
                    }}
                    className="w-20 h-20 rounded-full bg-amber-500 hover:bg-amber-600 active:scale-90 transition-all flex items-center justify-center mx-auto shadow-lg text-4xl">
                    🥾
                  </button>
                  {marchCount === 0 && <p className="text-amber-600 font-medium">Zero — no march! Tap to start at 1.</p>}
                </>
              ) : (
                <div className="space-y-3">
                  <p className="text-green-600 font-bold text-lg">🎉 You marched to 10!</p>
                  <Button onClick={nextPhase}>Continue <ArrowRight className="w-4 h-4 ml-1" /></Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== APPLICATION ===== */}
        {phase === "application" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-amber-800">🐝 Pollen Café — Count Your Bees</h2>
            <div className="bg-white rounded-2xl p-6 shadow-md text-center space-y-4">
              <p className="text-muted-foreground">Open your cup and find the matching numeral!</p>

              {!appRevealed ? (
                <button onClick={() => setAppRevealed(true)}
                  className="w-28 h-36 mx-auto bg-amber-100 rounded-xl border-2 border-dashed border-amber-400 flex items-center justify-center text-5xl hover:bg-amber-200 transition-all">
                  ☕
                </button>
              ) : (
                <>
                  <div className="flex flex-wrap gap-2 justify-center p-4 bg-yellow-50 rounded-xl">
                    {Array.from({ length: appBeeCount }).map((_, i) => (
                      <span key={i} className="text-3xl">🐝</span>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">Which numeral matches your bees?</p>
                  <div className="flex gap-2 justify-center flex-wrap">
                    {[4, 5, 6, 7, 8, 9].map((n) => (
                      <button key={n} onClick={() => setAppSelected(n)}
                        className={`w-12 h-12 rounded-lg text-lg font-bold transition-all ${appSelected === n ? (n === appBeeCount ? "bg-green-500 text-white ring-2 ring-green-600" : "bg-red-200 text-red-700") : "bg-amber-100 text-amber-800 hover:bg-amber-200"}`}>
                        {n}
                      </button>
                    ))}
                  </div>
                  {appSelected === appBeeCount && (
                    <div className="space-y-2">
                      <p className="text-green-600 font-bold">✅ That's right! {appBeeCount} bees!</p>
                      <Button onClick={nextPhase}>Continue <ArrowRight className="w-4 h-4 ml-1" /></Button>
                    </div>
                  )}
                  {appSelected !== null && appSelected !== appBeeCount && (
                    <p className="text-red-500 text-sm">Count again carefully!</p>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* ===== CONCEPT ===== */}
        {phase === "concept" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-amber-800">🌸 Pollen Café — Tally Orders</h2>
            <div className="bg-white rounded-2xl p-6 shadow-md space-y-4">

              {/* Number Path */}
              <div className="flex gap-1 justify-center">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold border-2 transition-all ${i < seatedBees ? "bg-yellow-200 border-yellow-400" : "bg-gray-100 border-gray-300"}`}>
                    {i < seatedBees ? "🐝" : i + 1}
                  </div>
                ))}
              </div>

              {conceptStep === "seat" && (
                <div className="text-center space-y-3">
                  <p className="text-muted-foreground">Seat the bees! Tap to place each bee on the number path.</p>
                  <p className="font-medium">Bees seated: {seatedBees} / 9</p>
                  {seatedBees < 9 ? (
                    <button onClick={() => setSeatedBees(seatedBees + 1)}
                      className="w-16 h-16 rounded-full bg-yellow-400 hover:bg-yellow-500 active:scale-90 transition-all flex items-center justify-center mx-auto text-3xl shadow-lg">
                      🐝
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-green-600 font-bold">9 bees seated! The last bee is at seat 9. ✨</p>
                      <Button onClick={() => setConceptStep("order")}>Take Orders <ArrowRight className="w-4 h-4 ml-1" /></Button>
                    </div>
                  )}
                </div>
              )}

              {conceptStep === "order" && (
                <div className="text-center space-y-3">
                  <p className="text-muted-foreground">"May I have 1 flower please?" — Tally each order!</p>
                  <div className="bg-amber-50 rounded-xl p-4 min-h-[60px] flex items-center justify-center">
                    <TallyMarks count={tallyCount} size="lg" />
                  </div>
                  <p className="font-medium">Orders tallied: {tallyCount} / 9</p>
                  {tallyCount < 9 ? (
                    <div className="space-y-2">
                      <p className="text-amber-700 italic text-lg">🐝 "May I have 1 flower please?"</p>
                      {tallyCount === 4 && (
                        <p className="text-sm text-blue-600 font-medium">✋ The 5th tally goes diagonally across the group!</p>
                      )}
                      <Button onClick={() => { setTallyCount(tallyCount + 1); setOrders(orders + 1); }}>
                        Make Tally Mark ✏️
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-green-600 font-bold">9 orders tallied! 5 and 4 makes 9.</p>
                      <Button onClick={() => setConceptStep("deliver")}>Deliver Flowers 🌸</Button>
                    </div>
                  )}
                </div>
              )}

              {conceptStep === "deliver" && (
                <div className="text-center space-y-3">
                  <p className="text-muted-foreground">Deliver a flower to each bee!</p>
                  <div className="flex gap-1 justify-center">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div key={i} className="flex flex-col items-center gap-1">
                        <span className={`text-xl transition-all ${i < flowersDelivered ? "opacity-100" : "opacity-30"}`}>🌸</span>
                        <span className="text-xl">🐝</span>
                      </div>
                    ))}
                  </div>
                  <p className="font-medium">Delivered: {flowersDelivered} / 9</p>
                  {flowersDelivered < 9 ? (
                    <Button onClick={() => setFlowersDelivered(flowersDelivered + 1)}>
                      Deliver Flower 🌸
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-green-600 font-bold text-lg">All 9 bees have flowers! 🎉</p>
                      <Button onClick={nextPhase}>Continue to Practice <ArrowRight className="w-4 h-4 ml-1" /></Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== PRACTICE ===== */}
        {phase === "practice" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-amber-800">✏️ Practice: Your Turn!</h2>
            <div className="bg-white rounded-2xl p-6 shadow-md space-y-4">
              <p className="text-muted-foreground text-center">
                You have <span className="font-bold text-amber-700">{practiceBees}</span> bees. Seat them, then tally!
              </p>

              {/* Number path */}
              <div className="flex gap-1 justify-center">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold border-2 transition-all ${i < practiceSeated ? "bg-yellow-200 border-yellow-400" : "bg-gray-100 border-gray-300"}`}>
                    {i < practiceSeated ? "🐝" : i + 1}
                  </div>
                ))}
              </div>

              {practiceSeated < practiceBees ? (
                <div className="text-center space-y-2">
                  <p className="text-sm">Tap to seat bee {practiceSeated + 1}</p>
                  <button onClick={() => setPracticeSeated(practiceSeated + 1)}
                    className="w-14 h-14 rounded-full bg-yellow-400 hover:bg-yellow-500 active:scale-90 transition-all flex items-center justify-center mx-auto text-2xl shadow-lg">
                    🐝
                  </button>
                </div>
              ) : practiceTally < practiceBees ? (
                <div className="text-center space-y-3">
                  <p className="text-sm font-medium">Now tally the orders!</p>
                  <div className="bg-amber-50 rounded-xl p-4 min-h-[50px] flex items-center justify-center">
                    <TallyMarks count={practiceTally} size="lg" />
                  </div>
                  {practiceTally === 4 && (
                    <p className="text-sm text-blue-600">Remember: the 5th mark goes diagonally!</p>
                  )}
                  <Button onClick={() => setPracticeTally(practiceTally + 1)}>Tally ✏️ ({practiceTally}/{practiceBees})</Button>
                </div>
              ) : !practiceChecked ? (
                <div className="text-center space-y-3">
                  <div className="bg-amber-50 rounded-xl p-4 flex items-center justify-center">
                    <TallyMarks count={practiceTally} size="lg" />
                  </div>
                  <p className="font-medium">Does your tally match? You tallied {practiceTally} for {practiceBees} bees.</p>
                  <Button onClick={() => setPracticeChecked(true)}>
                    {practiceTally === practiceBees ? "✅ Yes, it matches!" : "Check"}
                  </Button>
                </div>
              ) : (
                <div className="text-center space-y-3">
                  <p className="text-green-600 font-bold text-lg">🎉 Great tallying!</p>
                  <Button onClick={nextPhase}>Continue <ArrowRight className="w-4 h-4 ml-1" /></Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== DEBRIEF ===== */}
        {phase === "debrief" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-amber-800">🌟 Student Debrief</h2>
            <div className="bg-white rounded-2xl p-6 shadow-md space-y-4">
              <div className="bg-amber-50 p-4 rounded-xl space-y-2">
                <p className="font-medium text-amber-800">💬 How do tally marks help the waiter?</p>
                <p className="text-sm text-muted-foreground">They help remember how many flowers to get from the kitchen!</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl space-y-2">
                <p className="font-medium text-blue-800">🤔 What if no bees ordered?</p>
                <p className="text-sm text-muted-foreground">Zero orders = zero tally marks!</p>
                <div className="bg-white rounded-lg p-3 text-center text-muted-foreground italic">
                  (no tally marks)
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-xl space-y-3">
                <p className="font-medium text-green-800">📊 What do you know about 9 tallies?</p>
                <div className="flex items-center justify-center gap-4">
                  <TallyMarks count={9} size="lg" />
                </div>
                <div className="flex justify-center gap-8 text-sm">
                  <div className="text-center">
                    <TallyMarks count={5} size="sm" />
                    <p className="mt-1 font-medium">5 in this group</p>
                  </div>
                  <div className="text-center">
                    <TallyMarks count={4} size="sm" />
                    <p className="mt-1 font-medium">4 in this group</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground text-center">1 more tally would make another group of 5!</p>
              </div>

              <div className="text-center pt-4">
                <p className="text-amber-700 font-bold text-lg mb-3">🎉 Lesson 29 Complete!</p>
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

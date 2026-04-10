import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Apple, Hand, Circle, Puzzle } from "lucide-react";

type Step =
  | "intro"
  | "tally-apples"
  | "finger-count"
  | "tennis-balls"
  | "concept-join"
  | "concept-break"
  | "practice"
  | "debrief"
  | "complete";

/* ─── Tally Apples (Fluency 1) ─── */
const TallyApples = ({ onComplete }: { onComplete: () => void }) => {
  const [tallyCount, setTallyCount] = useState(0);
  const [done, setDone] = useState(false);

  const addTally = () => {
    if (tallyCount >= 5) return;
    const next = tallyCount + 1;
    setTallyCount(next);
    if (next === 5) {
      setDone(true);
    }
  };

  const renderTallies = () => {
    const marks: JSX.Element[] = [];
    for (let i = 0; i < tallyCount; i++) {
      if (i === 4) {
        // diagonal across previous 4
        marks.push(
          <div key={i} className="w-3 h-16 bg-amber-700 rounded-sm -ml-[52px] rotate-[20deg] relative z-10" />
        );
      } else {
        marks.push(
          <div key={i} className="w-3 h-16 bg-amber-800 rounded-sm" />
        );
      }
    }
    return marks;
  };

  return (
    <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-8 text-center space-y-8 animate-in slide-in-from-bottom-8">
      <h3 className="text-3xl font-bold text-amber-800">Tally 5 Apples 🍎</h3>
      <p className="text-xl text-amber-700 font-nunito">Count the apples, then draw one tally mark for each!</p>

      {/* Apples row */}
      <div className="flex justify-center gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="text-5xl">🍎</span>
        ))}
      </div>

      {/* Tally area */}
      <div
        onClick={addTally}
        className="mx-auto flex items-end gap-2 justify-center min-h-[100px] p-6 bg-amber-50 rounded-3xl border-4 border-amber-200 cursor-pointer hover:bg-amber-100 transition-colors"
      >
        {tallyCount === 0 && <p className="text-amber-400 text-xl font-nunito">Tap here to draw tally marks!</p>}
        {renderTallies()}
      </div>

      <p className="text-2xl font-bold text-amber-800">{tallyCount} / 5 tally marks</p>

      {done && (
        <div className="space-y-4 animate-in zoom-in">
          <p className="text-2xl text-green-600 font-bold">🌟 5 tally marks for 5 apples!</p>
          <Button onClick={onComplete} className="bg-amber-600 hover:bg-amber-700 text-white text-2xl px-10 py-6 rounded-full">
            Next! →
          </Button>
        </div>
      )}
    </Card>
  );
};

/* ─── Finger Count to 7 (Fluency 2) ─── */
const FingerCount7 = ({ onComplete }: { onComplete: () => void }) => {
  const [count, setCount] = useState(0);
  const [mode, setMode] = useState<"drop" | "pop">("drop");

  const tap = () => {
    if (count >= 7) return;
    const next = count + 1;
    setCount(next);
    if (next === 7 && mode === "drop") {
      setTimeout(() => { setCount(0); setMode("pop"); }, 1200);
    }
  };

  const done = count === 7 && mode === "pop";

  const renderFingers = () => {
    const leftFingers = Math.min(count, 5);
    const rightFingers = Math.max(0, count - 5);
    return (
      <div className="flex justify-center gap-8">
        {/* Left hand */}
        <div className="flex flex-col items-center">
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className={`w-8 h-20 rounded-t-full transition-all ${i < leftFingers ? "bg-yellow-400 border-2 border-yellow-600 scale-100" : "bg-gray-200 border-2 border-gray-300 scale-75 opacity-40"}`} />
            ))}
          </div>
          <div className="w-32 h-12 bg-yellow-300 rounded-b-2xl border-2 border-yellow-500" />
        </div>
        {/* Right hand */}
        <div className="flex flex-col items-center">
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className={`w-8 h-20 rounded-t-full transition-all ${i < rightFingers ? "bg-yellow-400 border-2 border-yellow-600 scale-100" : "bg-gray-200 border-2 border-gray-300 scale-75 opacity-40"}`} />
            ))}
          </div>
          <div className="w-32 h-12 bg-yellow-300 rounded-b-2xl border-2 border-yellow-500" />
        </div>
      </div>
    );
  };

  return (
    <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-8 text-center space-y-6 animate-in slide-in-from-bottom-8">
      <h3 className="text-3xl font-bold text-purple-800">Count to 7 on Fingers! 🖐️</h3>
      <p className="text-xl text-purple-600 font-nunito">
        {mode === "drop" ? "Drop each finger like playing piano!" : "Pop each finger up from fists!"}
      </p>

      {renderFingers()}

      <p className="text-5xl font-bold text-purple-800">{count}</p>

      {!done && (
        <Button onClick={tap} className="bg-purple-600 hover:bg-purple-700 text-white text-2xl px-10 py-6 rounded-full">
          {mode === "drop" ? "Drop Finger! 🎹" : "Pop Finger! ✊"}
        </Button>
      )}

      {done && (
        <div className="space-y-4 animate-in zoom-in">
          <p className="text-2xl text-green-600 font-bold">🌟 You counted to 7 two ways!</p>
          <Button onClick={onComplete} className="bg-purple-600 hover:bg-purple-700 text-white text-2xl px-10 py-6 rounded-full">
            Next! →
          </Button>
        </div>
      )}
    </Card>
  );
};

/* ─── Tennis Balls Application ─── */
const TennisBalls = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"can1" | "can2" | "count-all" | "done">("can1");
  const [counted, setCounted] = useState(0);

  const handleCount = () => {
    if (phase === "can1") {
      const next = counted + 1;
      setCounted(next);
      if (next === 3) setTimeout(() => setPhase("can2"), 800);
    } else if (phase === "can2") {
      const next = counted + 1;
      setCounted(next);
      if (next === 6) setTimeout(() => setPhase("done"), 800);
    }
  };

  return (
    <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-8 text-center space-y-6 animate-in slide-in-from-bottom-8">
      <h3 className="text-3xl font-bold text-green-800">Tennis Ball Surprise! 🎾</h3>

      {phase === "can1" && (
        <div className="space-y-6">
          <p className="text-xl text-green-700 font-nunito">The teacher found a can of tennis balls! Tap each ball to count.</p>
          <div className="flex justify-center gap-4">
            {[0, 1, 2].map(i => (
              <button
                key={i}
                onClick={handleCount}
                disabled={i !== counted}
                className={`text-6xl transition-transform ${i < counted ? "scale-110" : i === counted ? "animate-pulse cursor-pointer" : "opacity-30"}`}
              >
                🎾
              </button>
            ))}
          </div>
          <p className="text-3xl font-bold text-green-800">{counted} ball{counted !== 1 ? "s" : ""}</p>
        </div>
      )}

      {phase === "can2" && (
        <div className="space-y-6">
          <p className="text-xl text-green-700 font-nunito">Another can appeared! Keep counting all the balls!</p>
          <div className="flex justify-center gap-6">
            {/* Can 1 */}
            <div className="flex gap-2 p-4 bg-green-50 rounded-2xl border-2 border-green-200">
              {[0, 1, 2].map(i => (<span key={i} className="text-5xl">🎾</span>))}
            </div>
            {/* Can 2 */}
            <div className="flex gap-2 p-4 bg-yellow-50 rounded-2xl border-2 border-yellow-200">
              {[3, 4, 5].map(i => (
                <button
                  key={i}
                  onClick={handleCount}
                  disabled={i !== counted}
                  className={`text-5xl transition-transform ${i < counted ? "scale-110" : i === counted ? "animate-pulse cursor-pointer" : "opacity-30"}`}
                >
                  🎾
                </button>
              ))}
            </div>
          </div>
          <p className="text-3xl font-bold text-green-800">{counted} ball{counted !== 1 ? "s" : ""}</p>
        </div>
      )}

      {phase === "done" && (
        <div className="space-y-6 animate-in zoom-in">
          <div className="flex justify-center gap-2">
            {Array.from({ length: 6 }).map((_, i) => (<span key={i} className="text-5xl">🎾</span>))}
          </div>
          <p className="text-3xl font-bold text-green-800">3 balls + 3 balls = 6 balls!</p>
          <p className="text-xl text-green-600 font-nunito">Two groups of 3 make 6!</p>
          <Button onClick={onComplete} className="bg-green-600 hover:bg-green-700 text-white text-2xl px-10 py-6 rounded-full">
            Next! →
          </Button>
        </div>
      )}
    </Card>
  );
};

/* ─── Concept: Join sticks ─── */
const ConceptJoin = ({ onComplete }: { onComplete: () => void }) => {
  const [joined, setJoined] = useState(false);
  const [traced, setTraced] = useState(false);

  return (
    <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-8 text-center space-y-6 animate-in slide-in-from-bottom-8">
      <h3 className="text-3xl font-bold text-indigo-800">Build a 6-Stick! 🧱</h3>
      <p className="text-xl text-indigo-600 font-nunito">
        {!joined ? "Tap the sticks together to join them!" : "Great! Now trace the numeral 6!"}
      </p>

      {!joined ? (
        <div className="space-y-8">
          <div className="flex justify-center items-center gap-4">
            <div
              onClick={() => setJoined(true)}
              className="flex gap-1 p-4 bg-blue-50 rounded-2xl border-4 border-blue-200 cursor-pointer hover:scale-105 transition-transform"
            >
              {[0, 1, 2].map(i => (
                <div key={i} className="w-12 h-12 bg-blue-500 rounded-lg border-2 border-white shadow" />
              ))}
            </div>
            <span className="text-4xl font-bold text-indigo-300">+</span>
            <div
              onClick={() => setJoined(true)}
              className="flex gap-1 p-4 bg-rose-50 rounded-2xl border-4 border-rose-200 cursor-pointer hover:scale-105 transition-transform"
            >
              {[0, 1, 2].map(i => (
                <div key={i} className="w-12 h-12 bg-rose-500 rounded-lg border-2 border-white shadow" />
              ))}
            </div>
          </div>
          <p className="text-2xl text-indigo-500 font-nunito">3 cubes + 3 cubes</p>
        </div>
      ) : (
        <div className="space-y-6 animate-in zoom-in">
          {/* Joined stick */}
          <div className="flex justify-center gap-1 p-4 bg-indigo-50 rounded-2xl border-4 border-indigo-200">
            {[0, 1, 2].map(i => (
              <div key={i} className="w-12 h-12 bg-blue-500 rounded-lg border-2 border-white shadow" />
            ))}
            {[0, 1, 2].map(i => (
              <div key={`r-${i}`} className="w-12 h-12 bg-rose-500 rounded-lg border-2 border-white shadow" />
            ))}
          </div>
          <p className="text-3xl font-bold text-indigo-800">That makes 6!</p>

          {/* Trace numeral 6 */}
          {!traced ? (
            <button
              onClick={() => setTraced(true)}
              className="mx-auto block text-[120px] leading-none font-bold text-indigo-200 hover:text-indigo-500 transition-colors border-4 border-dashed border-indigo-200 rounded-3xl px-10 py-4 cursor-pointer"
            >
              6
            </button>
          ) : (
            <div className="space-y-4 animate-in zoom-in">
              <div className="text-[120px] leading-none font-bold text-indigo-600">6</div>
              <p className="text-xl text-green-600 font-bold">🌟 This is how we show the number 6!</p>
              <Button onClick={onComplete} className="bg-indigo-600 hover:bg-indigo-700 text-white text-2xl px-10 py-6 rounded-full">
                Next! →
              </Button>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

/* ─── Concept: Break stick (decompose) ─── */
const ConceptBreak = ({ onComplete }: { onComplete: () => void }) => {
  const puzzles = [
    { left: 4, right: 2, leftColor: "bg-emerald-500", rightColor: "bg-amber-500" },
    { left: 5, right: 1, leftColor: "bg-indigo-500", rightColor: "bg-rose-500" },
    { left: 3, right: 3, leftColor: "bg-blue-500", rightColor: "bg-purple-500" },
  ];
  const [idx, setIdx] = useState(0);
  const [broken, setBroken] = useState(false);

  const puzzle = puzzles[idx];

  const handleBreak = () => setBroken(true);

  const handleNext = () => {
    if (idx < puzzles.length - 1) {
      setIdx(idx + 1);
      setBroken(false);
    } else {
      onComplete();
    }
  };

  return (
    <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-8 text-center space-y-6 animate-in slide-in-from-bottom-8">
      <h3 className="text-3xl font-bold text-indigo-800">Break the 6-Stick! ✂️</h3>
      <div className="flex justify-center gap-2 mb-2">
        {puzzles.map((_, i) => (
          <div key={i} className={`h-3 rounded-full transition-all ${idx >= i ? "bg-indigo-500 w-10" : "bg-indigo-100 w-3"}`} />
        ))}
      </div>

      {!broken ? (
        <div className="space-y-6">
          <p className="text-xl text-indigo-600 font-nunito">Tap the stick to break it into two parts!</p>
          <div
            onClick={handleBreak}
            className="flex justify-center gap-1 p-4 bg-indigo-50 rounded-2xl border-4 border-indigo-200 cursor-pointer hover:scale-105 transition-transform mx-auto"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={`w-12 h-12 rounded-lg border-2 border-white shadow ${i < puzzle.left ? puzzle.leftColor : puzzle.rightColor}`} />
            ))}
          </div>
          <p className="text-2xl font-bold text-indigo-800">6 cubes — find the two parts!</p>
        </div>
      ) : (
        <div className="space-y-6 animate-in zoom-in">
          <p className="text-xl text-indigo-600 font-nunito">You found partners of 6!</p>
          <div className="flex justify-center items-center gap-4">
            <div className="flex gap-1 p-3 bg-white rounded-2xl border-4 border-indigo-100 shadow-sm">
              {Array.from({ length: puzzle.left }).map((_, i) => (
                <div key={i} className={`w-12 h-12 rounded-lg border-2 border-white shadow ${puzzle.leftColor}`} />
              ))}
            </div>
            <span className="text-3xl font-bold text-indigo-300">+</span>
            <div className="flex gap-1 p-3 bg-white rounded-2xl border-4 border-indigo-100 shadow-sm">
              {Array.from({ length: puzzle.right }).map((_, i) => (
                <div key={i} className={`w-12 h-12 rounded-lg border-2 border-white shadow ${puzzle.rightColor}`} />
              ))}
            </div>
          </div>
          <p className="text-3xl font-bold text-indigo-800">
            {puzzle.left} and {puzzle.right} are partners of 6!
          </p>
          <Button onClick={handleNext} className="bg-indigo-600 hover:bg-indigo-700 text-white text-2xl px-10 py-6 rounded-full">
            {idx < puzzles.length - 1 ? "Next Puzzle! →" : "Continue! →"}
          </Button>
        </div>
      )}
    </Card>
  );
};

/* ─── Practice: match puzzle to numeral ─── */
const Practice = ({ onComplete }: { onComplete: () => void }) => {
  const puzzles = [
    { left: 2, right: 4 },
    { left: 1, right: 5 },
    { left: 3, right: 3 },
  ];
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  const options = [4, 6, 5, 7];
  const puzzle = puzzles[idx];

  const handleSelect = (n: number) => {
    setSelected(n);
    if (n === 6) {
      setFeedback("correct");
      setTimeout(() => {
        if (idx < puzzles.length - 1) {
          setIdx(idx + 1);
          setSelected(null);
          setFeedback(null);
        } else {
          onComplete();
        }
      }, 1200);
    } else {
      setFeedback("wrong");
      setTimeout(() => { setSelected(null); setFeedback(null); }, 1000);
    }
  };

  return (
    <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-8 text-center space-y-6 animate-in slide-in-from-bottom-8">
      <h3 className="text-3xl font-bold text-indigo-800">Match to the Numeral! 🔢</h3>
      <div className="flex justify-center gap-2 mb-2">
        {puzzles.map((_, i) => (
          <div key={i} className={`h-3 rounded-full transition-all ${idx >= i ? "bg-indigo-500 w-10" : "bg-indigo-100 w-3"}`} />
        ))}
      </div>

      <p className="text-xl text-indigo-600 font-nunito">How many cubes in total? Pick the right numeral!</p>

      <div className="flex justify-center items-center gap-4">
        <div className="flex gap-1 p-3 bg-blue-50 rounded-2xl border-2 border-blue-200">
          {Array.from({ length: puzzle.left }).map((_, i) => (
            <div key={i} className="w-10 h-10 bg-blue-500 rounded-lg border-2 border-white shadow" />
          ))}
        </div>
        <span className="text-3xl font-bold text-indigo-300">+</span>
        <div className="flex gap-1 p-3 bg-rose-50 rounded-2xl border-2 border-rose-200">
          {Array.from({ length: puzzle.right }).map((_, i) => (
            <div key={i} className="w-10 h-10 bg-rose-500 rounded-lg border-2 border-white shadow" />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
        {options.map(n => (
          <button
            key={n}
            onClick={() => handleSelect(n)}
            disabled={feedback === "correct"}
            className={`text-4xl font-bold py-6 rounded-2xl border-4 transition-all ${
              selected === n
                ? feedback === "correct"
                  ? "bg-green-100 border-green-500 text-green-700 scale-110"
                  : feedback === "wrong"
                  ? "bg-red-100 border-red-400 text-red-600 shake"
                  : "border-indigo-400"
                : "bg-white border-indigo-200 hover:border-indigo-400 hover:scale-105 cursor-pointer"
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      {feedback === "correct" && <p className="text-2xl text-green-600 font-bold animate-in zoom-in">🌟 That's right — 6!</p>}
      {feedback === "wrong" && <p className="text-2xl text-red-500 font-bold animate-in zoom-in">Try again!</p>}
    </Card>
  );
};

/* ─── Main Lesson Component ─── */
const ComposeSixLesson = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("intro");

  const markLessonComplete = () => {
    const saved = localStorage.getItem("ethio-stem-m3-completed");
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes("lesson-6")) {
      completed.push("lesson-6");
      localStorage.setItem("ethio-stem-m3-completed", JSON.stringify(completed));
    }
  };

  const goNext = useCallback((next: Step) => setStep(next), []);

  const steps: { key: Step; label: string }[] = [
    { key: "intro", label: "Start" },
    { key: "tally-apples", label: "Tally" },
    { key: "finger-count", label: "Fingers" },
    { key: "tennis-balls", label: "Tennis Balls" },
    { key: "concept-join", label: "Join" },
    { key: "concept-break", label: "Break" },
    { key: "practice", label: "Practice" },
    { key: "debrief", label: "Debrief" },
  ];

  const stepIdx = steps.findIndex(s => s.key === step);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-white p-4 font-fredoka overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-3?last=lesson-6")} className="rounded-full border-2 border-white bg-white/50 backdrop-blur-sm">
            <ArrowLeft className="w-5 h-5 text-indigo-600" />
          </Button>
          <div>
            <span className="text-sm font-bold text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full uppercase tracking-widest">Lesson 6</span>
            <h1 className="text-xl font-bold text-indigo-900">Compose & Decompose 6</h1>
          </div>
        </div>

        {/* Progress */}
        {step !== "intro" && step !== "complete" && (
          <div className="flex justify-center gap-2 mb-6">
            {steps.slice(1).map((s, i) => (
              <div key={s.key} className={`h-2 rounded-full transition-all ${stepIdx > i + 1 || step === "complete" ? "bg-indigo-500 w-8" : stepIdx === i + 1 ? "bg-indigo-400 w-10" : "bg-indigo-100 w-4"}`} />
            ))}
          </div>
        )}

        {/* Intro */}
        {step === "intro" && (
          <Card className="border-4 border-white bg-white/60 backdrop-blur-md shadow-2xl rounded-[3rem] overflow-hidden text-center p-10 space-y-8 animate-in fade-in zoom-in duration-700">
            <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-3xl flex items-center justify-center mb-4 rotate-3 shadow-lg">
              <Puzzle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl text-indigo-900 leading-tight">Partners of 6!</h2>
            <p className="text-xl text-indigo-700 font-nunito leading-relaxed max-w-2xl mx-auto">
              Today we'll build 6 from two parts, then break it apart to find all its partners!
            </p>

            <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto text-left">
              <div className="bg-amber-50 p-4 rounded-2xl border-2 border-amber-100">
                <p className="font-bold text-amber-800">🍎 Fluency</p>
                <p className="text-sm text-amber-600 font-nunito">Tally apples & finger counting</p>
              </div>
              <div className="bg-green-50 p-4 rounded-2xl border-2 border-green-100">
                <p className="font-bold text-green-800">🎾 Story</p>
                <p className="text-sm text-green-600 font-nunito">Tennis ball surprise</p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-2xl border-2 border-indigo-100">
                <p className="font-bold text-indigo-800">🧱 Build</p>
                <p className="text-sm text-indigo-600 font-nunito">Compose & decompose 6</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-2xl border-2 border-purple-100">
                <p className="font-bold text-purple-800">🔢 Match</p>
                <p className="text-sm text-purple-600 font-nunito">Match partners to numeral 6</p>
              </div>
            </div>

            <Button
              onClick={() => goNext("tally-apples")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-3xl px-14 py-8 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 border-b-8 border-indigo-800"
            >
              Let's Go! 🧱
            </Button>
          </Card>
        )}

        {step === "tally-apples" && <TallyApples onComplete={() => goNext("finger-count")} />}
        {step === "finger-count" && <FingerCount7 onComplete={() => goNext("tennis-balls")} />}
        {step === "tennis-balls" && <TennisBalls onComplete={() => goNext("concept-join")} />}
        {step === "concept-join" && <ConceptJoin onComplete={() => goNext("concept-break")} />}
        {step === "concept-break" && <ConceptBreak onComplete={() => goNext("practice")} />}
        {step === "practice" && <Practice onComplete={() => goNext("debrief")} />}

        {/* Debrief */}
        {step === "debrief" && (
          <Card className="bg-white/80 border-4 border-white shadow-2xl rounded-[3rem] p-8 text-center space-y-6 animate-in slide-in-from-bottom-8">
            <h3 className="text-3xl font-bold text-indigo-800">Let's Think! 🤔</h3>
            <div className="space-y-6 max-w-xl mx-auto text-left">
              <div className="bg-indigo-50 p-5 rounded-2xl border-2 border-indigo-100">
                <p className="text-lg text-indigo-800 font-nunito font-bold">Show me 6 fingers!</p>
                <p className="text-indigo-600 font-nunito mt-1">Wiggle all 6. Now wiggle just 1. Now wiggle 3!</p>
              </div>
              <div className="bg-purple-50 p-5 rounded-2xl border-2 border-purple-100">
                <p className="text-lg text-purple-800 font-nunito font-bold">What partners of 6 did you find?</p>
                <p className="text-purple-600 font-nunito mt-1">5+1, 4+2, and 3+3 are all partners of 6!</p>
              </div>
              <div className="bg-amber-50 p-5 rounded-2xl border-2 border-amber-100">
                <p className="text-lg text-amber-800 font-nunito font-bold">How are the partners the same? Different?</p>
                <p className="text-amber-600 font-nunito mt-1">They all make 6, but the parts are different sizes!</p>
              </div>
            </div>
            <Button
              onClick={() => { markLessonComplete(); goNext("complete"); }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-2xl px-10 py-6 rounded-full"
            >
              Finish! 🏆
            </Button>
          </Card>
        )}

        {/* Complete */}
        {step === "complete" && (
          <Card className="bg-gradient-to-br from-indigo-600 via-purple-600 to-rose-600 shadow-2xl rounded-[4rem] overflow-hidden p-16 text-center text-white space-y-8 animate-in zoom-in-95 duration-700">
            <div className="text-9xl animate-bounce">🏆</div>
            <h2 className="text-6xl drop-shadow-xl">Partner Pro!</h2>
            <p className="text-2xl font-nunito max-w-2xl mx-auto leading-relaxed">
              You composed and decomposed <span className="font-fredoka text-5xl text-yellow-300">6</span> and matched it to the numeral!
            </p>
            <div className="flex gap-4 w-full pt-6">
              <Button onClick={() => setStep("intro")} className="h-20 flex-1 bg-white/10 hover:bg-white/20 text-white text-2xl rounded-[2rem] border-4 border-white/20">
                Again! 🔄
              </Button>
              <Button onClick={() => navigate("/activities/module-3?last=lesson-6")} className="h-20 flex-1 bg-white text-indigo-600 hover:bg-indigo-50 text-2xl rounded-[2rem] shadow-2xl">
                Next! ✨
              </Button>
            </div>
          </Card>
        )}

        {/* Back link */}
        {step !== "intro" && step !== "complete" && (
          <Button onClick={() => setStep("intro")} variant="ghost" className="text-indigo-400 hover:text-indigo-600 w-full py-2 font-bold font-nunito mt-4">
            ← Back to Instructions
          </Button>
        )}
      </div>
    </div>
  );
};

export default ComposeSixLesson;

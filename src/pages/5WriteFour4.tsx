import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RotateCcw, Star } from "lucide-react";
import { MuteButton } from "@/components/MuteButton";

const speak = (text: string, rate = 0.85) => {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = rate;
    u.pitch = 1.2;
    window.speechSynthesis.speak(u);
  }
};

const RHYMES: Record<string, { lines: string[]; combined: string }> = {
  "0": {
    lines: ["Curve from the top;", "be a hero!", "Close the loop,", "and make a zero."],
    combined: "Curve from the top; be a hero! Close the loop, and make a zero.",
  },
  "1": {
    lines: ["Top to bottom,", "then I'm done.", "I just wrote", "the number 1."],
    combined: "Top to bottom, then I'm done. I just wrote the number 1.",
  },
  "2": {
    lines: ["Half a moon,", "there's more to do;", "slide to the right,", "I wrote a 2."],
    combined: "Half a moon, there's more to do; slide to the right, I wrote a 2.",
  },
  "3": {
    lines: ["Backward C,", "backward C,", "that is how", "I write a 3."],
    combined: "Backward C, backward C, that is how I write a 3.",
  },
  "4": {
    lines: ["Down the side,", "to the right some more.", "Top to bottom,", "I've written 4."],
    combined: "Down the side, to the right some more. Top to bottom, I've written 4.",
  },
};

const PATHS: Record<string, { x: number; y: number }[]> = {
  "0": [
    { x: 0.5, y: 0.05 }, { x: 0.2, y: 0.25 }, { x: 0.15, y: 0.5 },
    { x: 0.2, y: 0.75 }, { x: 0.5, y: 0.95 }, { x: 0.8, y: 0.75 },
    { x: 0.85, y: 0.5 }, { x: 0.8, y: 0.25 }, { x: 0.5, y: 0.05 },
  ],
  "1": [{ x: 0.45, y: 0.05 }, { x: 0.45, y: 0.95 }],
  "2": [
    { x: 0.25, y: 0.15 }, { x: 0.5, y: 0.05 }, { x: 0.75, y: 0.15 },
    { x: 0.8, y: 0.35 }, { x: 0.5, y: 0.55 }, { x: 0.2, y: 0.75 },
    { x: 0.15, y: 0.9 }, { x: 0.5, y: 0.92 }, { x: 0.85, y: 0.92 },
  ],
  "3": [
    { x: 0.2, y: 0.1 }, { x: 0.5, y: 0.05 }, { x: 0.75, y: 0.15 },
    { x: 0.7, y: 0.35 }, { x: 0.45, y: 0.48 },
    { x: 0.7, y: 0.6 }, { x: 0.75, y: 0.8 },
    { x: 0.5, y: 0.95 }, { x: 0.2, y: 0.88 },
  ],
  "4": [
    // Stroke 1: down the left side
    { x: 0.3, y: 0.05 }, { x: 0.3, y: 0.35 }, { x: 0.3, y: 0.6 },
    // Stroke 2: to the right along the crossbar
    { x: 0.5, y: 0.6 }, { x: 0.75, y: 0.6 },
    // Stroke 3: vertical down from top-right
    { x: 0.65, y: 0.05 }, { x: 0.65, y: 0.35 },
    { x: 0.65, y: 0.6 }, { x: 0.65, y: 0.95 },
  ],
};

const HIT_RADIUS = 0.13;

/* ─── WritingCanvas ─── */
interface WritingCanvasProps {
  numeral: string;
  onComplete: () => void;
  width?: number;
  height?: number;
}

const WritingCanvas = ({ numeral, onComplete, width = 280, height = 340 }: WritingCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentWP, setCurrentWP] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const pathRef = useRef<{ x: number; y: number }[]>([]);
  const waypoints = PATHS[numeral];

  const drawBackground = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = "#d4b896";
      ctx.lineWidth = 3;
      ctx.strokeRect(8, 8, width - 16, height - 16);
      ctx.setLineDash([8, 6]);
      ctx.strokeStyle = "#e8d5b8";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(8, height / 2);
      ctx.lineTo(width - 8, height / 2);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.font = `bold ${height * 0.7}px Fredoka`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "rgba(139,92,246,0.1)";
      ctx.fillText(numeral, width / 2, height / 2 + 4);

      if (!completed) {
        const start = waypoints[0];
        const dotX = 8 + start.x * (width - 16);
        const dotY = 8 + start.y * (height - 16);
        ctx.beginPath();
        ctx.arc(dotX, dotY, 10, 0, Math.PI * 2);
        ctx.fillStyle = "#22c55e";
        ctx.fill();
        ctx.fillStyle = "#fff";
        ctx.font = "bold 11px sans-serif";
        ctx.fillText("●", dotX, dotY + 1);
      }

      if (!completed && currentWP < waypoints.length) {
        const wp = waypoints[currentWP];
        const wpX = 8 + wp.x * (width - 16);
        const wpY = 8 + wp.y * (height - 16);
        ctx.beginPath();
        ctx.arc(wpX, wpY, 14, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(139,92,246,0.4)";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    },
    [numeral, width, height, currentWP, completed, waypoints]
  );

  const drawPath = useCallback((ctx: CanvasRenderingContext2D) => {
    if (pathRef.current.length < 2) return;
    ctx.beginPath();
    ctx.moveTo(pathRef.current[0].x, pathRef.current[0].y);
    for (let i = 1; i < pathRef.current.length; i++) {
      ctx.lineTo(pathRef.current[i].x, pathRef.current[i].y);
    }
    ctx.strokeStyle = "#7c3aed";
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  }, []);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    drawBackground(ctx);
    drawPath(ctx);
  }, [drawBackground, drawPath]);

  const getPos = (e: React.TouchEvent | React.MouseEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const scaleX = width / rect.width;
    const scaleY = height / rect.height;
    if ("touches" in e) {
      return { x: (e.touches[0].clientX - rect.left) * scaleX, y: (e.touches[0].clientY - rect.top) * scaleY };
    }
    return { x: ((e as React.MouseEvent).clientX - rect.left) * scaleX, y: ((e as React.MouseEvent).clientY - rect.top) * scaleY };
  };

  const checkWaypoint = (x: number, y: number) => {
    if (currentWP >= waypoints.length) return;
    const wp = waypoints[currentWP];
    const wpX = 8 + wp.x * (width - 16);
    const wpY = 8 + wp.y * (height - 16);
    const dist = Math.sqrt((x - wpX) ** 2 + (y - wpY) ** 2);
    if (dist < HIT_RADIUS * Math.min(width, height)) {
      const next = currentWP + 1;
      setCurrentWP(next);
      if (next >= waypoints.length) {
        setCompleted(true);
        setIsDrawing(false);
        onComplete();
      }
    }
  };

  const handleStart = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    if (completed) return;
    setIsDrawing(true);
    const pos = getPos(e);
    pathRef.current = [pos];
    checkWaypoint(pos.x, pos.y);
  };

  const handleMove = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    if (!isDrawing || completed) return;
    const pos = getPos(e);
    pathRef.current.push(pos);
    checkWaypoint(pos.x, pos.y);
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) { drawBackground(ctx); drawPath(ctx); }
  };

  const handleEnd = () => setIsDrawing(false);

  const reset = () => {
    setCurrentWP(0);
    setCompleted(false);
    pathRef.current = [];
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) drawBackground(ctx);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <canvas
        ref={canvasRef} width={width} height={height}
        className="rounded-2xl border-4 border-amber-200 bg-amber-50/80 shadow-inner touch-none cursor-crosshair"
        style={{ width: width * 0.85, height: height * 0.85 }}
        onMouseDown={handleStart} onMouseMove={handleMove} onMouseUp={handleEnd} onMouseLeave={handleEnd}
        onTouchStart={handleStart} onTouchMove={handleMove} onTouchEnd={handleEnd}
      />
      {!completed && (
        <button onClick={reset} className="text-xs text-amber-600 hover:text-amber-800 flex items-center gap-1 font-nunito">
          <RotateCcw className="w-3 h-3" /> clear
        </button>
      )}
      {completed && (
        <span className="text-green-600 font-fredoka text-sm flex items-center gap-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> Great!
        </span>
      )}
    </div>
  );
};

/* ─── Decompose 4 – sharing crayons on plates ─── */
const Decompose4Game = ({ onComplete }: { onComplete: () => void }) => {
  const splits = [
    { give: 1, keep: 3 },
    { give: 2, keep: 2 },
    { give: 3, keep: 1 },
    { give: 4, keep: 0 },
    { give: 0, keep: 4 },
  ];
  const [step, setStep] = useState(0);
  const [answered, setAnswered] = useState(false);
  const current = splits[step];

  useEffect(() => {
    speak(`I have 4 crayons. I give ${current.give} to my friend. How many do I keep?`);
  }, [step]);

  const handleAnswer = (n: number) => {
    if (n === current.keep) {
      speak(`Yes! ${current.give} and ${current.keep} make 4!`);
      setAnswered(true);
      setTimeout(() => {
        if (step + 1 >= splits.length) {
          onComplete();
        } else {
          setStep((s) => s + 1);
          setAnswered(false);
        }
      }, 1800);
    } else {
      speak("Try again! Count how many are left.");
    }
  };

  return (
    <div className="text-center space-y-4">
      <p className="font-nunito text-amber-700 text-sm">Round {step + 1} of {splits.length}</p>
      {/* Big plate with 4 crayons */}
      <div className="bg-amber-100/60 rounded-2xl p-4 border-2 border-dashed border-amber-300 space-y-3">
        <p className="font-fredoka text-amber-900 text-lg">4 crayons to share!</p>
        <div className="flex justify-center gap-8">
          {/* Friend's plate */}
          <div className="bg-white/60 rounded-xl p-3 border border-amber-200 min-w-[80px]">
            <p className="text-xs font-nunito text-amber-600 mb-1">Friend</p>
            <div className="flex justify-center gap-1 flex-wrap">
              {Array.from({ length: current.give }).map((_, i) => (
                <span key={i} className="text-2xl">🖍️</span>
              ))}
              {current.give === 0 && <span className="text-sm text-amber-400">none</span>}
            </div>
          </div>
          {/* My plate */}
          <div className="bg-white/60 rounded-xl p-3 border border-amber-200 min-w-[80px]">
            <p className="text-xs font-nunito text-amber-600 mb-1">Me</p>
            <div className="flex justify-center gap-1 flex-wrap">
              {Array.from({ length: current.keep }).map((_, i) => (
                <span key={i} className="text-2xl">🖍️</span>
              ))}
              {current.keep === 0 && <span className="text-sm text-amber-400">?</span>}
            </div>
          </div>
        </div>
        <p className="font-nunito text-amber-800 text-sm">
          I gave <strong>{current.give}</strong>. How many do I keep?
        </p>
        {!answered && (
          <div className="flex justify-center gap-2">
            {[0, 1, 2, 3, 4].map((n) => (
              <Button key={n} variant="outline" onClick={() => handleAnswer(n)}
                className="w-11 h-11 text-lg font-fredoka rounded-xl border-2 border-amber-300 hover:bg-amber-100">
                {n}
              </Button>
            ))}
          </div>
        )}
        {answered && (
          <p className="text-green-600 font-fredoka">
            <Star className="w-4 h-4 inline fill-yellow-400 text-yellow-400" /> {current.give} and {current.keep} make 4!
          </p>
        )}
      </div>
    </div>
  );
};

/* ─── Say Ten Ski Jumps – count to 19/20 ─── */
const SkiJumps = ({ onComplete }: { onComplete: () => void }) => {
  const [count, setCount] = useState(0);
  const target = 20;
  const [jumping, setJumping] = useState(false);

  const sayTen = (n: number): string => {
    if (n <= 10) return String(n);
    return `ten ${n - 10}`;
  };

  const handleJump = () => {
    if (count >= target) return;
    setJumping(true);
    const next = count + 1;
    setCount(next);
    speak(sayTen(next), 1.2);
    setTimeout(() => setJumping(false), 300);
    if (next >= target) {
      setTimeout(() => { speak("Twenty! Great ski jumping!"); onComplete(); }, 500);
    }
  };

  return (
    <div className="text-center space-y-4">
      <div className={`text-6xl transition-transform ${jumping ? "scale-110 -translate-y-2" : ""}`}>⛷️</div>
      <p className="font-nunito text-amber-700">Ski jump and count the Say Ten way to 20!</p>
      <Button onClick={handleJump} disabled={count >= target}
        className="bg-amber-600 hover:bg-amber-700 text-white text-2xl px-8 py-5 rounded-full shadow-lg border-b-4 border-amber-800">
        {count < target ? `Jump! (${sayTen(count)})` : "Done! 🎉"}
      </Button>
      <div className="w-full bg-amber-200 rounded-full h-2">
        <div className="bg-amber-600 h-2 rounded-full transition-all" style={{ width: `${(count / target) * 100}%` }} />
      </div>
    </div>
  );
};

/* ─── Café Ordering – write numbers for food orders ─── */
const CafeOrdering = ({ onComplete }: { onComplete: () => void }) => {
  const menuItems = ["🥨", "🍪", "🧁", "🍎"];
  const orders = [
    { item: "🥨", name: "pretzels", qty: 3 },
    { item: "🍪", name: "cookies", qty: 2 },
    { item: "🧁", name: "cupcakes", qty: 1 },
  ];
  const [step, setStep] = useState(0);
  const [answered, setAnswered] = useState(false);
  const current = orders[step];

  useEffect(() => {
    speak(`The customer says: I would like ${current.qty} ${current.name}, please!`);
  }, [step]);

  const handleWrite = (n: number) => {
    if (n === current.qty) {
      speak(`That's right! ${current.qty} ${current.name}!`);
      setAnswered(true);
      setTimeout(() => {
        if (step + 1 >= orders.length) {
          onComplete();
        } else {
          setStep((s) => s + 1);
          setAnswered(false);
        }
      }, 1800);
    } else {
      speak("Listen again. How many did they order?");
    }
  };

  return (
    <div className="text-center space-y-4">
      <div className="bg-amber-100/60 rounded-2xl p-4 border-2 border-dashed border-amber-300 space-y-3">
        <div className="flex justify-center gap-3 text-3xl">
          {menuItems.map((item, i) => <span key={i}>{item}</span>)}
        </div>
        <p className="font-fredoka text-amber-900 text-sm">Welcome to the Café!</p>
        <div className="bg-white/70 rounded-xl p-4 space-y-2">
          <p className="font-nunito text-amber-800">
            🧑 "I would like <strong>{current.qty} {current.name}</strong>, please!"
          </p>
          <div className="flex justify-center gap-1">
            {Array.from({ length: current.qty }).map((_, i) => (
              <span key={i} className="text-3xl">{current.item}</span>
            ))}
          </div>
          <p className="font-nunito text-amber-700 text-sm">👨‍🍳 Write the number on your pad!</p>
          {!answered && (
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4].map((n) => (
                <Button key={n} variant="outline" onClick={() => handleWrite(n)}
                  className="w-12 h-12 text-xl font-fredoka rounded-xl border-2 border-amber-300 hover:bg-amber-100">
                  {n}
                </Button>
              ))}
            </div>
          )}
          {answered && (
            <div className="bg-amber-50 rounded-lg p-2 inline-block border border-amber-200">
              <span className="text-3xl font-fredoka text-amber-800">{current.qty}</span>
              <p className="text-xs font-nunito text-amber-600">Order written! ✓</p>
            </div>
          )}
        </div>
      </div>
      <p className="font-nunito text-amber-600 text-xs">Order {step + 1} of {orders.length}</p>
    </div>
  );
};

/* ─── Cube Train for 4 – decomposition practice ─── */
const CubeTrainGame4 = ({ onComplete }: { onComplete: () => void }) => {
  const combos = [
    { orange: 4, yellow: 1 },
    { orange: 3, yellow: 1, label: "4-train" },
    { orange: 2, yellow: 2, label: "4-train" },
    { orange: 1, yellow: 3, label: "4-train" },
  ];
  const [step, setStep] = useState(0);
  const [answered, setAnswered] = useState(false);
  const current = combos[step];
  const total = current.orange + current.yellow;

  useEffect(() => {
    speak(`Count the orange cubes in this ${total}-cube train!`);
  }, [step]);

  const handleAnswer = (n: number) => {
    if (n === current.orange) {
      speak(`Yes! ${current.orange} orange and ${current.yellow} yellow make ${total}!`);
      setAnswered(true);
      setTimeout(() => {
        if (step + 1 >= combos.length) {
          onComplete();
        } else {
          setStep((s) => s + 1);
          setAnswered(false);
        }
      }, 1800);
    } else {
      speak("Count the orange cubes again!");
    }
  };

  return (
    <div className="text-center space-y-4">
      <p className="font-nunito text-amber-700 text-sm">Train {step + 1} of {combos.length}</p>
      <div className="flex justify-center gap-1 py-3">
        {Array.from({ length: current.orange }).map((_, i) => (
          <div key={`o-${i}`} className="w-10 h-10 rounded-lg bg-orange-400 border-2 border-orange-600 shadow-md" />
        ))}
        {Array.from({ length: current.yellow }).map((_, i) => (
          <div key={`y-${i}`} className="w-10 h-10 rounded-lg bg-yellow-300 border-2 border-yellow-500 shadow-md" />
        ))}
      </div>
      <p className="font-nunito text-amber-800 text-sm">
        How many <span className="text-orange-600 font-bold">orange</span> cubes?
      </p>
      {!answered && (
        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4].map((n) => (
            <Button key={n} variant="outline" onClick={() => handleAnswer(n)}
              className="w-12 h-12 text-xl font-fredoka rounded-xl border-2 border-amber-300 hover:bg-amber-100">
              {n}
            </Button>
          ))}
        </div>
      )}
      {answered && (
        <p className="text-green-600 font-fredoka text-lg">
          <Star className="w-5 h-5 inline fill-yellow-400 text-yellow-400" /> {current.orange} and {current.yellow} make {total}!
        </p>
      )}
    </div>
  );
};

/* ─── Main page ─── */
type Step = "intro" | "decompose" | "ski" | "cafe" | "cubes" | "learn-4" | "practice-4" | "review-lines" | "challenge" | "debrief" | "complete";

const WriteFour4 = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("intro");
  const [practiceCount, setPracticeCount] = useState(0);
  const [challengeDone, setChallengeDone] = useState<Record<string, boolean>>({ "0": false, "1": false, "2": false, "3": false, "4": false });

  const markLessonComplete = () => {
    const saved = localStorage.getItem("ethio-stem-m5-completed");
    const completed: string[] = saved ? JSON.parse(saved) : [];
    if (!completed.includes("lesson-4")) {
      completed.push("lesson-4");
      localStorage.setItem("ethio-stem-m5-completed", JSON.stringify(completed));
    }
  };

  const goNext = (from: Step) => {
    const flow: Step[] = ["intro", "decompose", "ski", "cafe", "cubes", "learn-4", "practice-4", "review-lines", "challenge", "debrief", "complete"];
    const idx = flow.indexOf(from);
    if (idx < flow.length - 1) setStep(flow[idx + 1]);
  };

  useEffect(() => {
    if (step === "complete") markLessonComplete();
  }, [step]);

  return (
    <div className="min-h-screen font-fredoka overflow-x-hidden" style={{ background: "linear-gradient(170deg, #fef9c3 0%, #fde68a 30%, #fbbf24 60%, #f59e0b 100%)" }}>
      {["✏️", "4️⃣", "🖍️", "⛷️", "☕"].map((e, i) => (
        <div key={i} className="fixed pointer-events-none select-none opacity-[0.06] text-6xl" style={{ top: `${10 + i * 18}%`, left: i % 2 === 0 ? `${2 + i * 5}%` : undefined, right: i % 2 !== 0 ? `${3 + i * 4}%` : undefined, transform: `rotate(${i * 12 - 20}deg)` }}>
          {e}
        </div>
      ))}

      <div className="container mx-auto px-4 py-6 max-w-xl relative z-10">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate("/activities/module-5?last=lesson-4")} className="rounded-full bg-white/40 hover:bg-white/70 backdrop-blur-sm shadow-md">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <span className="font-fredoka text-sm bg-amber-800/20 text-amber-900 px-3 py-1 rounded-full">Lesson 4</span>
            <MuteButton className="h-9 w-9 rounded-full bg-white/40 hover:bg-white/70 backdrop-blur-sm shadow-md" />
          </div>
        </div>

        {/* INTRO */}
        {step === "intro" && (
          <Card className="border-0 bg-white/70 backdrop-blur-md shadow-2xl rounded-[2.5rem] overflow-hidden text-center p-8 space-y-6 animate-in fade-in zoom-in-95 duration-500">
            <div className="mx-auto w-20 h-20 bg-gradient-to-tr from-amber-500 to-yellow-400 rounded-2xl flex items-center justify-center shadow-lg rotate-3">
              <span className="text-4xl">✏️</span>
            </div>
            <h1 className="text-3xl md:text-4xl text-amber-900 leading-tight">Write the Number 4!</h1>
            <p className="text-lg text-amber-800 font-nunito leading-relaxed max-w-md mx-auto">
              Today we'll share crayons, go ski jumping, order at a café, and learn to <strong>write the numeral 4</strong>!
            </p>
            <div className="bg-amber-50 rounded-2xl p-4 text-left space-y-2 font-nunito text-sm text-amber-800 border border-amber-200">
              <p className="font-bold text-amber-900">🎯 Learning Goals</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Write numeral 4 starting from the top</li>
                <li>Say the number formation rhyme for 4</li>
                <li>Review writing 0, 1, 2, and 3</li>
                <li>Explore partners of 4 (ways to make 4)</li>
              </ul>
              <p className="font-bold text-amber-900 pt-2">💡 Parent Tip</p>
              <p>The numeral 4 has <strong>only straight lines</strong> — point out how it's different from curved numbers like 0 and 3!</p>
            </div>
            <Button onClick={() => { speak("Let's learn to write the number 4!"); goNext("intro"); }}
              className="bg-amber-600 hover:bg-amber-700 text-white text-xl px-10 py-6 rounded-full shadow-xl border-b-4 border-amber-800 transition-all hover:scale-105 active:scale-95">
              Let's Start! ✏️
            </Button>
          </Card>
        )}

        {/* DECOMPOSE 4 */}
        {step === "decompose" && (
          <Card className="border-0 bg-white/70 backdrop-blur-md shadow-2xl rounded-[2.5rem] p-8 space-y-5 text-center animate-in slide-in-from-right-8 duration-500">
            <h2 className="text-2xl text-amber-900">🖍️ Share the Crayons!</h2>
            <p className="font-nunito text-amber-700 text-sm">4 crayons — how many ways can we share?</p>
            <Decompose4Game onComplete={() => { speak("You found all the ways to share 4! Let's go skiing!"); setTimeout(() => goNext("decompose"), 1500); }} />
          </Card>
        )}

        {/* SKI JUMPS */}
        {step === "ski" && (
          <Card className="border-0 bg-white/70 backdrop-blur-md shadow-2xl rounded-[2.5rem] p-8 space-y-5 text-center animate-in slide-in-from-right-8 duration-500">
            <h2 className="text-2xl text-amber-900">⛷️ Ski Jump Counting!</h2>
            <p className="font-nunito text-amber-700 text-sm">Count to 20 the Say Ten way while skiing!</p>
            <SkiJumps onComplete={() => { setTimeout(() => goNext("ski"), 1500); }} />
          </Card>
        )}

        {/* CAFÉ ORDERING */}
        {step === "cafe" && (
          <Card className="border-0 bg-white/70 backdrop-blur-md shadow-2xl rounded-[2.5rem] p-8 space-y-5 text-center animate-in slide-in-from-right-8 duration-500">
            <h2 className="text-2xl text-amber-900">☕ Café Time!</h2>
            <p className="font-nunito text-amber-700 text-sm">Be the waiter — write down each order!</p>
            <CafeOrdering onComplete={() => { speak("Great job taking orders! Now let's look at cube trains!"); setTimeout(() => goNext("cafe"), 1500); }} />
          </Card>
        )}

        {/* CUBE TRAIN */}
        {step === "cubes" && (
          <Card className="border-0 bg-white/70 backdrop-blur-md shadow-2xl rounded-[2.5rem] p-8 space-y-5 text-center animate-in slide-in-from-right-8 duration-500">
            <h2 className="text-2xl text-amber-900">🧊 Cube Trains!</h2>
            <p className="font-nunito text-amber-700 text-sm">Count the orange cubes in each train!</p>
            <CubeTrainGame4 onComplete={() => { speak("Now let's learn to write the number 4!"); setTimeout(() => goNext("cubes"), 1500); }} />
          </Card>
        )}

        {/* LEARN 4 */}
        {step === "learn-4" && (
          <Card className="border-0 bg-white/70 backdrop-blur-md shadow-2xl rounded-[2.5rem] p-8 space-y-6 text-center animate-in slide-in-from-right-8 duration-500">
            <h2 className="text-2xl text-amber-900">Let's Write <span className="text-5xl text-amber-600 align-middle">4</span></h2>
            <div className="bg-amber-50 rounded-2xl p-5 border-2 border-amber-200 mx-auto max-w-xs space-y-3">
              <div className="flex justify-center gap-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded bg-orange-400 border-2 border-orange-600" />
                ))}
              </div>
              <p className="font-nunito text-amber-700 text-sm">4 orange cubes in our train!</p>
              <p className="text-7xl text-amber-700 leading-none">4</p>
              <div className="space-y-1 font-nunito text-amber-800 text-lg italic">
                {RHYMES["4"].lines.map((l, i) => <p key={i}>{l}</p>)}
              </div>
            </div>
            <p className="font-nunito text-amber-700 text-sm">
              Start at the <strong>top dot</strong>. Down, across, then a tall line from top to bottom!
            </p>
            <Button onClick={() => { speak(RHYMES["4"].combined); goNext("learn-4"); }}
              className="bg-amber-600 hover:bg-amber-700 text-white text-lg px-8 py-5 rounded-full shadow-lg border-b-4 border-amber-800">
              Try Writing 4! ✍️
            </Button>
          </Card>
        )}

        {/* PRACTICE 4 */}
        {step === "practice-4" && (
          <Card className="border-0 bg-white/70 backdrop-blur-md shadow-2xl rounded-[2.5rem] p-8 space-y-5 text-center animate-in slide-in-from-right-8 duration-500">
            <h2 className="text-2xl text-amber-900">Trace the Number <span className="text-amber-600">4</span></h2>
            <p className="font-nunito text-amber-700 text-sm italic">"{RHYMES["4"].combined}"</p>
            <p className="font-nunito text-amber-600 text-xs">Practice {practiceCount + 1} of 3</p>
            <WritingCanvas
              key={`four-${practiceCount}`}
              numeral="4"
              onComplete={() => {
                speak("Great job!");
                setTimeout(() => {
                  if (practiceCount < 2) setPracticeCount((c) => c + 1);
                  else goNext("practice-4");
                }, 800);
              }}
            />
            <div className="flex justify-center gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className={`w-3 h-3 rounded-full ${i <= practiceCount ? "bg-amber-500" : "bg-amber-200"}`} />
              ))}
            </div>
          </Card>
        )}

        {/* REVIEW: Straight vs Curved lines */}
        {step === "review-lines" && (
          <Card className="border-0 bg-white/70 backdrop-blur-md shadow-2xl rounded-[2.5rem] p-8 space-y-6 text-center animate-in slide-in-from-right-8 duration-500">
            <h2 className="text-2xl text-amber-900">Straight or Curved? 🤔</h2>
            <p className="font-nunito text-amber-700 text-sm">Let's sort our numbers by their lines!</p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-blue-50 rounded-xl p-3 border border-blue-200">
                <p className="font-bold text-blue-700 text-xs mb-2">Only Straight</p>
                <div className="flex justify-center gap-2">
                  {["1", "4"].map((n) => (
                    <span key={n} className="text-3xl font-fredoka text-blue-600">{n}</span>
                  ))}
                </div>
              </div>
              <div className="bg-pink-50 rounded-xl p-3 border border-pink-200">
                <p className="font-bold text-pink-700 text-xs mb-2">Only Curved</p>
                <div className="flex justify-center gap-2">
                  {["0", "3"].map((n) => (
                    <span key={n} className="text-3xl font-fredoka text-pink-600">{n}</span>
                  ))}
                </div>
              </div>
              <div className="bg-purple-50 rounded-xl p-3 border border-purple-200">
                <p className="font-bold text-purple-700 text-xs mb-2">Both!</p>
                <div className="flex justify-center gap-2">
                  <span className="text-3xl font-fredoka text-purple-600">2</span>
                </div>
              </div>
            </div>
            <div className="space-y-3 font-nunito text-amber-800 text-left bg-amber-50 rounded-2xl p-4 border border-amber-200">
              <p>🔢 <strong>Partners of 4</strong>:</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {[
                  { a: 4, b: 0 }, { a: 3, b: 1 }, { a: 2, b: 2 }, { a: 1, b: 3 }, { a: 0, b: 4 },
                ].map(({ a, b }, idx) => (
                  <div key={idx} className="flex items-center gap-1">
                    <div className="flex gap-0.5">
                      {Array.from({ length: a }).map((_, i) => (
                        <div key={i} className="w-5 h-5 rounded bg-orange-400 border border-orange-600" />
                      ))}
                    </div>
                    <span>+</span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: b }).map((_, i) => (
                        <div key={i} className="w-5 h-5 rounded bg-yellow-300 border border-yellow-500" />
                      ))}
                    </div>
                    <span>= 4</span>
                  </div>
                ))}
              </div>
            </div>
            <Button onClick={() => { speak("Now write all five numbers!"); goNext("review-lines"); }}
              className="bg-amber-600 hover:bg-amber-700 text-white text-lg px-8 py-5 rounded-full shadow-lg border-b-4 border-amber-800">
              Challenge Time! ⭐
            </Button>
          </Card>
        )}

        {/* CHALLENGE */}
        {step === "challenge" && (
          <Card className="border-0 bg-white/70 backdrop-blur-md shadow-2xl rounded-[2.5rem] p-8 space-y-5 text-center animate-in slide-in-from-right-8 duration-500">
            <h2 className="text-2xl text-amber-900">Challenge! ⭐</h2>
            <p className="font-nunito text-amber-700">Write all five numbers!</p>
            <div className="flex flex-wrap justify-center gap-3">
              {["0", "1", "2", "3", "4"].map((num) => (
                <div key={num} className="space-y-1">
                  <span className="text-sm text-amber-800 font-bold">{num}</span>
                  <WritingCanvas numeral={num} width={140} height={175}
                    onComplete={() => {
                      setChallengeDone((d) => {
                        const next = { ...d, [num]: true };
                        const allDone = Object.values(next).every(Boolean);
                        if (allDone) setTimeout(() => goNext("challenge"), 600);
                        return next;
                      });
                    }}
                  />
                  {challengeDone[num] && <span className="text-green-500 text-lg">✓</span>}
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* DEBRIEF */}
        {step === "debrief" && (
          <Card className="border-0 bg-white/70 backdrop-blur-md shadow-2xl rounded-[2.5rem] p-8 space-y-6 text-center animate-in slide-in-from-right-8 duration-500">
            <h2 className="text-2xl text-amber-900">🤔 Think About It!</h2>
            <div className="space-y-4 font-nunito text-amber-800 text-left bg-amber-50 rounded-2xl p-5 border border-amber-200">
              <p>📊 Look at the trains we've drawn over the last few days. What do you notice about the colors and numbers?</p>
              <p>✏️ Which numbers have <strong>only straight lines</strong>? (1 and 4)</p>
              <p>🔄 Which numbers have <strong>only curved lines</strong>? (0 and 3)</p>
              <p>✨ Which number has <strong>both</strong>? (2!)</p>
              <p>🤲 Use your fingers on both hands to show partners of 4!</p>
            </div>
            <Button onClick={() => { speak("Amazing work today!"); goNext("debrief"); }}
              className="bg-amber-600 hover:bg-amber-700 text-white text-xl px-10 py-6 rounded-full shadow-xl border-b-4 border-amber-800">
              Finish! 🌟
            </Button>
          </Card>
        )}

        {/* COMPLETE */}
        {step === "complete" && (
          <Card className="border-0 overflow-hidden shadow-2xl rounded-[2.5rem] p-10 text-center space-y-6 animate-in zoom-in-95 duration-700" style={{ background: "linear-gradient(135deg, #92400e, #d97706, #f59e0b)" }}>
            <div className="text-7xl animate-bounce">🌟</div>
            <h2 className="text-4xl text-white drop-shadow-lg">Number Champion!</h2>
            <p className="text-xl text-amber-100 font-nunito leading-relaxed max-w-md mx-auto">
              You learned to write <strong>4</strong> and reviewed <strong>0</strong>, <strong>1</strong>, <strong>2</strong>, and <strong>3</strong>!
            </p>
            <div className="flex gap-3 pt-4">
              <Button onClick={() => { setStep("intro"); setPracticeCount(0); setChallengeDone({ "0": false, "1": false, "2": false, "3": false, "4": false }); }}
                className="flex-1 h-14 bg-white/15 hover:bg-white/25 text-white text-lg rounded-2xl border border-white/20">
                Again 🔄
              </Button>
              <Button onClick={() => navigate("/activities/module-5?last=lesson-4")}
                className="flex-1 h-14 bg-white text-amber-800 hover:bg-amber-50 text-lg rounded-2xl shadow-lg">
                Done! ✨
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default WriteFour4;

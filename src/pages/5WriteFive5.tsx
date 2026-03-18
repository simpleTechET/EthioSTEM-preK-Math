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
  "5": {
    lines: ["Down the side,", "around a hive.", "Give it a hat,", "I've written 5."],
    combined: "Down the side, around a hive. Give it a hat, I've written 5.",
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
    { x: 0.3, y: 0.05 }, { x: 0.3, y: 0.35 }, { x: 0.3, y: 0.6 },
    { x: 0.5, y: 0.6 }, { x: 0.75, y: 0.6 },
    { x: 0.65, y: 0.05 }, { x: 0.65, y: 0.35 },
    { x: 0.65, y: 0.6 }, { x: 0.65, y: 0.95 },
  ],
  "5": [
    // Stroke 1: down the left side from top
    { x: 0.55, y: 0.05 }, { x: 0.55, y: 0.2 }, { x: 0.55, y: 0.4 },
    // Stroke 2: curve around (the hive)
    { x: 0.65, y: 0.5 }, { x: 0.75, y: 0.65 },
    { x: 0.65, y: 0.82 }, { x: 0.45, y: 0.9 }, { x: 0.25, y: 0.82 },
    // Stroke 3: hat on top (go back up to top-right)
    { x: 0.55, y: 0.05 }, { x: 0.75, y: 0.05 },
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

/* ─── How Many? Number Practice – count bags of objects ─── */
const HowManyGame = ({ onComplete }: { onComplete: () => void }) => {
  const bags = [
    { emoji: "🔘", name: "buttons", count: 7 },
    { emoji: "🫘", name: "beans", count: 9 },
    { emoji: "🖍️", name: "crayons", count: 6 },
    { emoji: "🪙", name: "coins", count: 10 },
    { emoji: "📎", name: "erasers", count: 8 },
  ];
  const [step, setStep] = useState(0);
  const [showCard, setShowCard] = useState(false);
  const [answered, setAnswered] = useState(false);
  const current = bags[step];

  useEffect(() => {
    speak(`Count the ${current.name} in your bag!`);
  }, [step]);

  const handleCount = (n: number) => {
    if (n === current.count) {
      speak(`Yes! ${current.count} ${current.name}!`);
      setAnswered(true);
      setTimeout(() => {
        if (step + 1 >= bags.length) {
          onComplete();
        } else {
          setStep((s) => s + 1);
          setAnswered(false);
          setShowCard(false);
        }
      }, 1500);
    } else {
      speak("Count again carefully!");
    }
  };

  return (
    <div className="text-center space-y-4">
      <p className="font-nunito text-amber-700 text-sm">Bag {step + 1} of {bags.length}</p>
      <div className="bg-amber-100/60 rounded-2xl p-4 border-2 border-dashed border-amber-300 space-y-3">
        <div className="flex justify-center gap-1 flex-wrap py-2">
          {Array.from({ length: current.count }).map((_, i) => (
            <span key={i} className="text-2xl">{current.emoji}</span>
          ))}
        </div>
        <p className="font-nunito text-amber-800">How many {current.name}?</p>
        {!answered && (
          <div className="flex justify-center gap-1.5 flex-wrap">
            {[6, 7, 8, 9, 10].map((n) => (
              <Button key={n} variant="outline" onClick={() => handleCount(n)}
                className="w-11 h-11 text-lg font-fredoka rounded-xl border-2 border-amber-300 hover:bg-amber-100">
                {n}
              </Button>
            ))}
          </div>
        )}
        {answered && (
          <div className="bg-amber-50 rounded-lg p-2 inline-block border border-amber-200">
            <span className="text-3xl font-fredoka text-amber-800">{current.count}</span>
            <p className="text-xs font-nunito text-green-600">✓ Correct!</p>
          </div>
        )}
      </div>
    </div>
  );
};

/* ─── Say Ten Ski Jumps – count to 20 then 17 ─── */
const SkiJumps = ({ onComplete }: { onComplete: () => void }) => {
  const [count, setCount] = useState(0);
  const [round, setRound] = useState(1);
  const [jumping, setJumping] = useState(false);
  const target = round === 1 ? 20 : 17;

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
      setTimeout(() => {
        if (round === 1) {
          speak(`${target}! Great! Now let's ski to 17!`);
          setTimeout(() => { setRound(2); setCount(0); }, 1500);
        } else {
          speak("Seventeen! Amazing ski jumping!");
          onComplete();
        }
      }, 500);
    }
  };

  return (
    <div className="text-center space-y-4">
      <div className={`text-6xl transition-transform ${jumping ? "scale-110 -translate-y-2" : ""}`}>⛷️</div>
      <p className="font-nunito text-amber-700">
        {round === 1 ? "Ski to 20" : "Now ski to 17"} the Say Ten way!
      </p>
      <Button onClick={handleJump} disabled={count >= target}
        className="bg-amber-600 hover:bg-amber-700 text-white text-2xl px-8 py-5 rounded-full shadow-lg border-b-4 border-amber-800">
        {count < target ? `Jump! (${sayTen(count)})` : "Done! 🎉"}
      </Button>
      <div className="w-full bg-amber-200 rounded-full h-2">
        <div className="bg-amber-600 h-2 rounded-full transition-all" style={{ width: `${(count / target) * 100}%` }} />
      </div>
      <p className="text-xs font-nunito text-amber-600">Round {round} of 2</p>
    </div>
  );
};

/* ─── Café Ordering (returning from Lesson 4) ─── */
const CafeOrdering = ({ onComplete }: { onComplete: () => void }) => {
  const orders = [
    { item: "🧃", name: "juices", qty: 4 },
    { item: "🥨", name: "pretzels", qty: 2 },
    { item: "🍓", name: "strawberries", qty: 3 },
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
        <p className="font-fredoka text-amber-900 text-sm">Welcome back to the Café!</p>
        <div className="bg-white/70 rounded-xl p-4 space-y-2">
          <p className="font-nunito text-amber-800">
            🧑 "I would like <strong>{current.qty} {current.name}</strong>, please!"
          </p>
          <div className="flex justify-center gap-1">
            {Array.from({ length: current.qty }).map((_, i) => (
              <span key={i} className="text-3xl">{current.item}</span>
            ))}
          </div>
          <p className="font-nunito text-amber-700 text-sm">👨‍🍳 Write the number!</p>
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

/* ─── Make 5 – discover all partners of 5 ─── */
const Make5Game = ({ onComplete }: { onComplete: () => void }) => {
  const combos = [
    { orange: 5, yellow: 0 },
    { orange: 4, yellow: 1 },
    { orange: 3, yellow: 2 },
    { orange: 2, yellow: 3 },
    { orange: 1, yellow: 4 },
    { orange: 0, yellow: 5 },
  ];
  const [step, setStep] = useState(0);
  const [answeredOrange, setAnsweredOrange] = useState(false);
  const [answeredYellow, setAnsweredYellow] = useState(false);
  const current = combos[step];

  useEffect(() => {
    speak("Count the orange cubes!");
    setAnsweredOrange(false);
    setAnsweredYellow(false);
  }, [step]);

  const handleOrange = (n: number) => {
    if (n === current.orange) {
      speak(`Yes! ${current.orange} orange! Now count the yellow!`);
      setAnsweredOrange(true);
    } else {
      speak("Count the orange cubes again!");
    }
  };

  const handleYellow = (n: number) => {
    if (n === current.yellow) {
      speak(`${current.orange} and ${current.yellow} make 5!`);
      setAnsweredYellow(true);
      setTimeout(() => {
        if (step + 1 >= combos.length) {
          onComplete();
        } else {
          setStep((s) => s + 1);
        }
      }, 1800);
    } else {
      speak("Count the yellow cubes!");
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
        {current.orange === 0 && current.yellow === 0 && <p className="text-amber-400">empty</p>}
      </div>

      {!answeredOrange && (
        <>
          <p className="font-nunito text-amber-800 text-sm">
            How many <span className="text-orange-600 font-bold">orange</span>?
          </p>
          <div className="flex justify-center gap-2">
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <Button key={n} variant="outline" onClick={() => handleOrange(n)}
                className="w-10 h-10 text-lg font-fredoka rounded-xl border-2 border-amber-300 hover:bg-amber-100">
                {n}
              </Button>
            ))}
          </div>
        </>
      )}

      {answeredOrange && !answeredYellow && (
        <>
          <p className="font-nunito text-amber-800 text-sm">
            How many <span className="text-yellow-600 font-bold">yellow</span>?
          </p>
          <div className="flex justify-center gap-2">
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <Button key={n} variant="outline" onClick={() => handleYellow(n)}
                className="w-10 h-10 text-lg font-fredoka rounded-xl border-2 border-amber-300 hover:bg-amber-100">
                {n}
              </Button>
            ))}
          </div>
        </>
      )}

      {answeredYellow && (
        <p className="text-green-600 font-fredoka text-lg">
          <Star className="w-5 h-5 inline fill-yellow-400 text-yellow-400" /> {current.orange} and {current.yellow} make 5!
        </p>
      )}
    </div>
  );
};

/* ─── Main page ─── */
type Step = "intro" | "how-many" | "ski" | "cafe" | "learn-5" | "practice-5" | "make-5" | "challenge" | "debrief" | "complete";

const WriteFive5 = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("intro");
  const [practiceCount, setPracticeCount] = useState(0);
  const [challengeDone, setChallengeDone] = useState<Record<string, boolean>>({
    "0": false, "1": false, "2": false, "3": false, "4": false, "5": false,
  });

  const markLessonComplete = () => {
    const saved = localStorage.getItem("ethio-stem-m5-completed");
    const completed: string[] = saved ? JSON.parse(saved) : [];
    if (!completed.includes("lesson-5")) {
      completed.push("lesson-5");
      localStorage.setItem("ethio-stem-m5-completed", JSON.stringify(completed));
    }
  };

  const goNext = (from: Step) => {
    const flow: Step[] = ["intro", "how-many", "ski", "cafe", "learn-5", "practice-5", "make-5", "challenge", "debrief", "complete"];
    const idx = flow.indexOf(from);
    if (idx < flow.length - 1) setStep(flow[idx + 1]);
  };

  useEffect(() => {
    if (step === "complete") markLessonComplete();
  }, [step]);

  return (
    <div className="min-h-screen font-fredoka overflow-x-hidden" style={{ background: "linear-gradient(170deg, #fef9c3 0%, #fde68a 30%, #fbbf24 60%, #f59e0b 100%)" }}>
      {["✏️", "5️⃣", "⛷️", "☕", "🖐️"].map((e, i) => (
        <div key={i} className="fixed pointer-events-none select-none opacity-[0.06] text-6xl" style={{ top: `${10 + i * 18}%`, left: i % 2 === 0 ? `${2 + i * 5}%` : undefined, right: i % 2 !== 0 ? `${3 + i * 4}%` : undefined, transform: `rotate(${i * 12 - 20}deg)` }}>
          {e}
        </div>
      ))}

      <div className="container mx-auto px-4 py-6 max-w-xl relative z-10">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate("/activities/module-5?last=lesson-5")} className="rounded-full bg-white/40 hover:bg-white/70 backdrop-blur-sm shadow-md">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <span className="font-fredoka text-sm bg-amber-800/20 text-amber-900 px-3 py-1 rounded-full">Lesson 5</span>
            <MuteButton className="h-9 w-9 rounded-full bg-white/40 hover:bg-white/70 backdrop-blur-sm shadow-md" />
          </div>
        </div>

        {/* INTRO */}
        {step === "intro" && (
          <Card className="border-0 bg-white/70 backdrop-blur-md shadow-2xl rounded-[2.5rem] overflow-hidden text-center p-8 space-y-6 animate-in fade-in zoom-in-95 duration-500">
            <div className="mx-auto w-20 h-20 bg-gradient-to-tr from-amber-500 to-yellow-400 rounded-2xl flex items-center justify-center shadow-lg rotate-3">
              <span className="text-4xl">🖐️</span>
            </div>
            <h1 className="text-3xl md:text-4xl text-amber-900 leading-tight">Write the Number 5!</h1>
            <p className="text-lg text-amber-800 font-nunito leading-relaxed max-w-md mx-auto">
              Today we'll count objects, go ski jumping, visit the café again, and learn to <strong>write the numeral 5</strong>!
            </p>
            <div className="bg-amber-50 rounded-2xl p-4 text-left space-y-2 font-nunito text-sm text-amber-800 border border-amber-200">
              <p className="font-bold text-amber-900">🎯 Learning Goals</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Write numeral 5 starting from the top</li>
                <li>Say the number formation rhyme for 5</li>
                <li>Review writing 0, 1, 2, 3, and 4</li>
                <li>Discover all partners of 5</li>
              </ul>
              <p className="font-bold text-amber-900 pt-2">💡 Parent Tip</p>
              <p>The numeral 5 has three parts: a line down, a curve (the "hive"), and a "hat" on top. Remind your child to go back to the top for the hat!</p>
            </div>
            <Button onClick={() => { speak("Let's learn to write the number 5!"); goNext("intro"); }}
              className="bg-amber-600 hover:bg-amber-700 text-white text-xl px-10 py-6 rounded-full shadow-xl border-b-4 border-amber-800 transition-all hover:scale-105 active:scale-95">
              Let's Start! ✏️
            </Button>
          </Card>
        )}

        {/* HOW MANY? */}
        {step === "how-many" && (
          <Card className="border-0 bg-white/70 backdrop-blur-md shadow-2xl rounded-[2.5rem] p-8 space-y-5 text-center animate-in slide-in-from-right-8 duration-500">
            <h2 className="text-2xl text-amber-900">🔢 How Many?</h2>
            <p className="font-nunito text-amber-700 text-sm">Count the items in each bag!</p>
            <HowManyGame onComplete={() => { speak("Great counting! Time to ski!"); setTimeout(() => goNext("how-many"), 1500); }} />
          </Card>
        )}

        {/* SKI JUMPS */}
        {step === "ski" && (
          <Card className="border-0 bg-white/70 backdrop-blur-md shadow-2xl rounded-[2.5rem] p-8 space-y-5 text-center animate-in slide-in-from-right-8 duration-500">
            <h2 className="text-2xl text-amber-900">⛷️ Ski Jump Counting!</h2>
            <p className="font-nunito text-amber-700 text-sm">Count the Say Ten way — first to 20, then to 17!</p>
            <SkiJumps onComplete={() => { setTimeout(() => goNext("ski"), 1500); }} />
          </Card>
        )}

        {/* CAFÉ */}
        {step === "cafe" && (
          <Card className="border-0 bg-white/70 backdrop-blur-md shadow-2xl rounded-[2.5rem] p-8 space-y-5 text-center animate-in slide-in-from-right-8 duration-500">
            <h2 className="text-2xl text-amber-900">☕ Café Time!</h2>
            <p className="font-nunito text-amber-700 text-sm">Take orders at the café again!</p>
            <CafeOrdering onComplete={() => { speak("Great waiter work! Now let's learn a new number!"); setTimeout(() => goNext("cafe"), 1500); }} />
          </Card>
        )}

        {/* LEARN 5 */}
        {step === "learn-5" && (
          <Card className="border-0 bg-white/70 backdrop-blur-md shadow-2xl rounded-[2.5rem] p-8 space-y-6 text-center animate-in slide-in-from-right-8 duration-500">
            <h2 className="text-2xl text-amber-900">Let's Write <span className="text-5xl text-amber-600 align-middle">5</span></h2>
            <div className="bg-amber-50 rounded-2xl p-5 border-2 border-amber-200 mx-auto max-w-xs space-y-3">
              <div className="flex justify-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded bg-orange-400 border-2 border-orange-600" />
                ))}
              </div>
              <p className="font-nunito text-amber-700 text-sm">5 orange cubes — one whole hand!</p>
              <p className="text-7xl text-amber-700 leading-none">5</p>
              <div className="space-y-1 font-nunito text-amber-800 text-lg italic">
                {RHYMES["5"].lines.map((l, i) => <p key={i}>{l}</p>)}
              </div>
            </div>
            <p className="font-nunito text-amber-700 text-sm">
              Start at the <strong>top dot</strong>. Down, curve around, then go back up for the <strong>hat</strong>!
            </p>
            <Button onClick={() => { speak(RHYMES["5"].combined); goNext("learn-5"); }}
              className="bg-amber-600 hover:bg-amber-700 text-white text-lg px-8 py-5 rounded-full shadow-lg border-b-4 border-amber-800">
              Try Writing 5! ✍️
            </Button>
          </Card>
        )}

        {/* PRACTICE 5 */}
        {step === "practice-5" && (
          <Card className="border-0 bg-white/70 backdrop-blur-md shadow-2xl rounded-[2.5rem] p-8 space-y-5 text-center animate-in slide-in-from-right-8 duration-500">
            <h2 className="text-2xl text-amber-900">Trace the Number <span className="text-amber-600">5</span></h2>
            <p className="font-nunito text-amber-700 text-sm italic">"{RHYMES["5"].combined}"</p>
            <p className="font-nunito text-amber-600 text-xs">Practice {practiceCount + 1} of 3</p>
            <WritingCanvas
              key={`five-${practiceCount}`}
              numeral="5"
              onComplete={() => {
                speak("Great job!");
                setTimeout(() => {
                  if (practiceCount < 2) setPracticeCount((c) => c + 1);
                  else goNext("practice-5");
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

        {/* MAKE 5 */}
        {step === "make-5" && (
          <Card className="border-0 bg-white/70 backdrop-blur-md shadow-2xl rounded-[2.5rem] p-8 space-y-5 text-center animate-in slide-in-from-right-8 duration-500">
            <h2 className="text-2xl text-amber-900">🧊 Make 5!</h2>
            <p className="font-nunito text-amber-700 text-sm">Find all the partners of 5 with cube trains!</p>
            <Make5Game onComplete={() => { speak("You found all the partners of 5! Challenge time!"); setTimeout(() => goNext("make-5"), 1500); }} />
          </Card>
        )}

        {/* CHALLENGE */}
        {step === "challenge" && (
          <Card className="border-0 bg-white/70 backdrop-blur-md shadow-2xl rounded-[2.5rem] p-8 space-y-5 text-center animate-in slide-in-from-right-8 duration-500">
            <h2 className="text-2xl text-amber-900">Challenge! ⭐</h2>
            <p className="font-nunito text-amber-700">Write all six numbers — 0 through 5!</p>
            <div className="grid grid-cols-3 gap-3 justify-items-center">
              {["0", "1", "2", "3", "4", "5"].map((num) => (
                <div key={num} className="space-y-1">
                  <span className="text-sm text-amber-800 font-bold">{num}</span>
                  <WritingCanvas numeral={num} width={130} height={160}
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
              <p>🖐️ Show <strong>partners of 5</strong> with your fingers on both hands!</p>
              <div className="grid grid-cols-3 gap-2 text-sm">
                {[
                  { a: 5, b: 0 }, { a: 4, b: 1 }, { a: 3, b: 2 },
                  { a: 2, b: 3 }, { a: 1, b: 4 }, { a: 0, b: 5 },
                ].map(({ a, b }, idx) => (
                  <div key={idx} className="flex items-center gap-1 bg-white rounded-lg p-1.5">
                    <div className="flex gap-0.5">
                      {Array.from({ length: a }).map((_, i) => (
                        <div key={i} className="w-4 h-4 rounded bg-orange-400 border border-orange-600" />
                      ))}
                    </div>
                    <span className="text-xs">+</span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: b }).map((_, i) => (
                        <div key={i} className="w-4 h-4 rounded bg-yellow-300 border border-yellow-500" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p>📊 Look at the trains from all 5 lessons. What <strong>patterns</strong> do you see in the numbers?</p>
              <p>✏️ You can now write every number from <strong>0 to 5</strong>!</p>
            </div>
            <Button onClick={() => { speak("Amazing work! You've completed Topic A!"); goNext("debrief"); }}
              className="bg-amber-600 hover:bg-amber-700 text-white text-xl px-10 py-6 rounded-full shadow-xl border-b-4 border-amber-800">
              Finish! 🌟
            </Button>
          </Card>
        )}

        {/* COMPLETE */}
        {step === "complete" && (
          <Card className="border-0 overflow-hidden shadow-2xl rounded-[2.5rem] p-10 text-center space-y-6 animate-in zoom-in-95 duration-700" style={{ background: "linear-gradient(135deg, #92400e, #d97706, #f59e0b)" }}>
            <div className="text-7xl animate-bounce">🏆</div>
            <h2 className="text-4xl text-white drop-shadow-lg">Topic A Complete!</h2>
            <p className="text-xl text-amber-100 font-nunito leading-relaxed max-w-md mx-auto">
              You can write every number from <strong>0</strong> to <strong>5</strong>!
              <br />
              You're ready for the next adventure!
            </p>
            <div className="flex justify-center gap-2 text-4xl">
              {["0", "1", "2", "3", "4", "5"].map((n) => (
                <span key={n} className="bg-white/20 rounded-lg w-11 h-11 flex items-center justify-center font-fredoka text-white">{n}</span>
              ))}
            </div>
            <div className="flex gap-3 pt-4">
              <Button onClick={() => { setStep("intro"); setPracticeCount(0); setChallengeDone({ "0": false, "1": false, "2": false, "3": false, "4": false, "5": false }); }}
                className="flex-1 h-14 bg-white/15 hover:bg-white/25 text-white text-lg rounded-2xl border border-white/20">
                Again 🔄
              </Button>
              <Button onClick={() => navigate("/activities/module-5?last=lesson-5")}
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

export default WriteFive5;

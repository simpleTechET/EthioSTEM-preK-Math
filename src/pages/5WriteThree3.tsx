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

/* ─── Numbers in Rice – trace 0, 1, 2 in "sand" ─── */
const NumbersInRice = ({ onComplete }: { onComplete: () => void }) => {
  const bodyParts = [
    { q: "How many noses do you have?", ans: 1, numeral: "1" },
    { q: "How many eyes do you have?", ans: 2, numeral: "2" },
    { q: "How many tails do you have?", ans: 0, numeral: "0" },
  ];
  const [step, setStep] = useState(0);
  const [tracing, setTracing] = useState(false);
  const [answered, setAnswered] = useState(false);

  const current = bodyParts[step];

  useEffect(() => {
    speak(current.q);
  }, [step]);

  const handleAnswer = (n: number) => {
    if (n === current.ans) {
      speak(`Yes! ${current.ans}! Now trace the number ${current.numeral} in the rice.`);
      setAnswered(true);
      setTracing(true);
    } else {
      speak("Try again!");
    }
  };

  const handleTraceComplete = () => {
    speak(`${RHYMES[current.numeral].combined}`);
    setTimeout(() => {
      if (step + 1 >= bodyParts.length) {
        onComplete();
      } else {
        setStep((s) => s + 1);
        setTracing(false);
        setAnswered(false);
      }
    }, 2000);
  };

  return (
    <div className="space-y-4 text-center">
      <p className="font-nunito text-amber-700 text-sm">Round {step + 1} of {bodyParts.length}</p>
      <div className="bg-amber-100/60 rounded-2xl p-4 border-2 border-dashed border-amber-300">
        <p className="text-lg font-fredoka text-amber-900 mb-3">{current.q}</p>
        {!answered && (
          <div className="flex justify-center gap-2">
            {[0, 1, 2].map((n) => (
              <Button key={n} variant="outline" onClick={() => handleAnswer(n)}
                className="w-14 h-14 text-2xl font-fredoka rounded-xl border-2 border-amber-300 hover:bg-amber-100">
                {n}
              </Button>
            ))}
          </div>
        )}
        {tracing && (
          <div className="mt-4">
            <p className="text-sm font-nunito text-amber-600 mb-2 italic">Trace in the "rice"!</p>
            <div className="bg-amber-50 rounded-xl p-2 inline-block" style={{ background: "repeating-linear-gradient(45deg, #fef3c7, #fef3c7 4px, #fde68a 4px, #fde68a 8px)" }}>
              <WritingCanvas key={`rice-${step}`} numeral={current.numeral} width={200} height={240} onComplete={handleTraceComplete} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ─── Elephant Splashes – Say Ten way to 18 ─── */
const ElephantSplashes = ({ onComplete }: { onComplete: () => void }) => {
  const [count, setCount] = useState(0);
  const target = 18;
  const [swinging, setSwinging] = useState(false);

  const sayTen = (n: number): string => {
    if (n <= 10) return String(n);
    return `ten ${n - 10}`;
  };

  const handleSplash = () => {
    if (count >= target) return;
    setSwinging(true);
    const next = count + 1;
    setCount(next);
    speak(sayTen(next), 1.2);
    setTimeout(() => setSwinging(false), 300);
    if (next >= target) {
      setTimeout(() => { speak("Eighteen! Great counting the Say Ten way!"); onComplete(); }, 500);
    }
  };

  return (
    <div className="text-center space-y-4">
      <div className={`text-7xl transition-transform ${swinging ? "animate-wiggle" : ""}`}>🐘</div>
      <p className="font-nunito text-amber-700">Swing your trunk and count the Say Ten way to 18!</p>
      <Button onClick={handleSplash} disabled={count >= target}
        className="bg-amber-600 hover:bg-amber-700 text-white text-2xl px-8 py-5 rounded-full shadow-lg border-b-4 border-amber-800">
        {count < target ? `Splash! (${sayTen(count)})` : "Done! 🎉"}
      </Button>
      <div className="w-full bg-amber-200 rounded-full h-2">
        <div className="bg-amber-600 h-2 rounded-full transition-all" style={{ width: `${(count / target) * 100}%` }} />
      </div>
    </div>
  );
};

/* ─── Rock Counting – application problem (5 less) ─── */
const RockCounting = ({ onComplete }: { onComplete: () => void }) => {
  const [rocks, setRocks] = useState(5);
  const [answered, setAnswered] = useState(false);
  const [showCard, setShowCard] = useState(true);

  useEffect(() => {
    speak(`How many rocks do you count?`);
  }, [rocks]);

  const handleAnswer = (n: number) => {
    if (n === rocks) {
      speak(`Yes! ${rocks} rocks!`);
      setAnswered(true);
      if (rocks <= 1) {
        setTimeout(() => onComplete(), 1500);
      }
    } else {
      speak("Count again!");
    }
  };

  const removeRock = () => {
    const next = rocks - 1;
    setRocks(next);
    setAnswered(false);
    speak(`${rocks}. 1 less is…?`);
  };

  return (
    <div className="text-center space-y-4">
      {showCard && (
        <div className="bg-amber-100 rounded-xl p-3 inline-block border-2 border-amber-300">
          <span className="text-4xl font-fredoka text-amber-800">{rocks}</span>
        </div>
      )}
      <div className="flex justify-center gap-2 flex-wrap py-2">
        {Array.from({ length: rocks }).map((_, i) => (
          <span key={i} className="text-3xl" style={{ animationDelay: `${i * 0.1}s` }}>🪨</span>
        ))}
      </div>
      <p className="font-nunito text-amber-700">How many rocks?</p>
      <div className="flex justify-center gap-2">
        {[0, 1, 2, 3, 4, 5].map((n) => (
          <Button key={n} variant="outline" onClick={() => handleAnswer(n)}
            className={`w-11 h-11 text-lg font-fredoka rounded-xl border-2 ${
              answered && n === rocks ? "border-green-400 bg-green-50" : "border-amber-300 hover:bg-amber-100"
            }`}>
            {n}
          </Button>
        ))}
      </div>
      {answered && rocks > 1 && (
        <Button onClick={removeRock} className="bg-amber-600 hover:bg-amber-700 text-white rounded-full px-6 py-3">
          Remove 1 rock 🪨
        </Button>
      )}
      {answered && rocks <= 1 && (
        <p className="text-green-600 font-fredoka text-lg">
          <Star className="w-5 h-5 inline fill-yellow-400 text-yellow-400" /> Great counting backwards!
        </p>
      )}
    </div>
  );
};

/* ─── Cube Train Decomposition mini-game ─── */
const CubeTrainGame = ({ onComplete }: { onComplete: () => void }) => {
  const combos = [
    { orange: 3, yellow: 2 },
    { orange: 2, yellow: 3 },
    { orange: 1, yellow: 4 },
  ];
  const [step, setStep] = useState(0);
  const [answered, setAnswered] = useState(false);
  const current = combos[step];

  useEffect(() => {
    speak(`Count the orange cubes in the train!`);
  }, [step]);

  const handleAnswer = (n: number) => {
    if (n === current.orange) {
      speak(`Yes! ${current.orange} orange cubes!`);
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
        5-cube train! How many <span className="text-orange-600 font-bold">orange</span> cubes?
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
          <Star className="w-5 h-5 inline fill-yellow-400 text-yellow-400" /> {current.orange} orange and {current.yellow} yellow make 5!
        </p>
      )}
    </div>
  );
};

/* ─── Main page ─── */
type Step = "intro" | "rice" | "elephant" | "rocks" | "cubes" | "learn-3" | "practice-3" | "review-all" | "challenge" | "debrief" | "complete";

const WriteThree3 = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("intro");
  const [practiceCount, setPracticeCount] = useState(0);
  const [challengeDone, setChallengeDone] = useState<Record<string, boolean>>({ "0": false, "1": false, "2": false, "3": false });

  const markLessonComplete = () => {
    const saved = localStorage.getItem("ethio-stem-m5-completed");
    const completed: string[] = saved ? JSON.parse(saved) : [];
    if (!completed.includes("lesson-3")) {
      completed.push("lesson-3");
      localStorage.setItem("ethio-stem-m5-completed", JSON.stringify(completed));
    }
  };

  const goNext = (from: Step) => {
    const flow: Step[] = ["intro", "rice", "elephant", "rocks", "cubes", "learn-3", "practice-3", "review-all", "challenge", "debrief", "complete"];
    const idx = flow.indexOf(from);
    if (idx < flow.length - 1) setStep(flow[idx + 1]);
  };

  useEffect(() => {
    if (step === "complete") markLessonComplete();
  }, [step]);

  return (
    <div className="min-h-screen font-fredoka overflow-x-hidden" style={{ background: "linear-gradient(170deg, #fef9c3 0%, #fde68a 30%, #fbbf24 60%, #f59e0b 100%)" }}>
      {["✏️", "3️⃣", "🪨", "🐘", "🍚"].map((e, i) => (
        <div key={i} className="fixed pointer-events-none select-none opacity-[0.06] text-6xl" style={{ top: `${10 + i * 18}%`, left: i % 2 === 0 ? `${2 + i * 5}%` : undefined, right: i % 2 !== 0 ? `${3 + i * 4}%` : undefined, transform: `rotate(${i * 12 - 20}deg)` }}>
          {e}
        </div>
      ))}

      <div className="container mx-auto px-4 py-6 max-w-xl relative z-10">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate("/activities/module-5?last=lesson-3")} className="rounded-full bg-white/40 hover:bg-white/70 backdrop-blur-sm shadow-md">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <span className="font-fredoka text-sm bg-amber-800/20 text-amber-900 px-3 py-1 rounded-full">Lesson 3</span>
            <MuteButton className="h-9 w-9 rounded-full bg-white/40 hover:bg-white/70 backdrop-blur-sm shadow-md" />
          </div>
        </div>

        {/* INTRO */}
        {step === "intro" && (
          <Card className="border-0 bg-white/70 backdrop-blur-md shadow-2xl rounded-[2.5rem] overflow-hidden text-center p-8 space-y-6 animate-in fade-in zoom-in-95 duration-500">
            <div className="mx-auto w-20 h-20 bg-gradient-to-tr from-amber-500 to-yellow-400 rounded-2xl flex items-center justify-center shadow-lg rotate-3">
              <span className="text-4xl">✏️</span>
            </div>
            <h1 className="text-3xl md:text-4xl text-amber-900 leading-tight">Write the Number 3!</h1>
            <p className="text-lg text-amber-800 font-nunito leading-relaxed max-w-md mx-auto">
              Today we'll trace numbers in rice, splash with elephants, count rocks, and learn to <strong>write the numeral 3</strong>!
            </p>
            <div className="bg-amber-50 rounded-2xl p-4 text-left space-y-2 font-nunito text-sm text-amber-800 border border-amber-200">
              <p className="font-bold text-amber-900">🎯 Learning Goals</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Write numeral 3 starting from the top</li>
                <li>Say the number formation rhyme for 3</li>
                <li>Review writing 0, 1, and 2</li>
                <li>Explore partners of 3 (ways to make 3)</li>
              </ul>
              <p className="font-bold text-amber-900 pt-2">💡 Parent Tip</p>
              <p>The rhyme "Backward C, backward C, that is how I write a 3" helps children remember the correct strokes!</p>
            </div>
            <Button onClick={() => { speak("Let's learn to write the number 3!"); goNext("intro"); }}
              className="bg-amber-600 hover:bg-amber-700 text-white text-xl px-10 py-6 rounded-full shadow-xl border-b-4 border-amber-800 transition-all hover:scale-105 active:scale-95">
              Let's Start! ✏️
            </Button>
          </Card>
        )}

        {/* NUMBERS IN RICE */}
        {step === "rice" && (
          <Card className="border-0 bg-white/70 backdrop-blur-md shadow-2xl rounded-[2.5rem] p-8 space-y-5 text-center animate-in slide-in-from-right-8 duration-500">
            <h2 className="text-2xl text-amber-900">🍚 Numbers in Rice!</h2>
            <p className="font-nunito text-amber-700 text-sm">Answer the question, then trace the number in the rice tray!</p>
            <NumbersInRice onComplete={() => { speak("Great tracing! Let's count with Eli!"); setTimeout(() => goNext("rice"), 1500); }} />
          </Card>
        )}

        {/* ELEPHANT SPLASHES */}
        {step === "elephant" && (
          <Card className="border-0 bg-white/70 backdrop-blur-md shadow-2xl rounded-[2.5rem] p-8 space-y-5 text-center animate-in slide-in-from-right-8 duration-500">
            <h2 className="text-2xl text-amber-900">🐘 Elephant Splashes!</h2>
            <p className="font-nunito text-amber-700 text-sm">Count to 18 the Say Ten way!</p>
            <ElephantSplashes onComplete={() => { setTimeout(() => goNext("elephant"), 1500); }} />
          </Card>
        )}

        {/* ROCK COUNTING */}
        {step === "rocks" && (
          <Card className="border-0 bg-white/70 backdrop-blur-md shadow-2xl rounded-[2.5rem] p-8 space-y-5 text-center animate-in slide-in-from-right-8 duration-500">
            <h2 className="text-2xl text-amber-900">🪨 Counting Rocks</h2>
            <p className="font-nunito text-amber-700 text-sm">5 rocks… remove 1. 1 less is…?</p>
            <RockCounting onComplete={() => { speak("Wonderful counting! Now let's look at cube trains!"); setTimeout(() => goNext("rocks"), 1500); }} />
          </Card>
        )}

        {/* CUBE TRAIN */}
        {step === "cubes" && (
          <Card className="border-0 bg-white/70 backdrop-blur-md shadow-2xl rounded-[2.5rem] p-8 space-y-5 text-center animate-in slide-in-from-right-8 duration-500">
            <h2 className="text-2xl text-amber-900">🧊 Cube Trains!</h2>
            <p className="font-nunito text-amber-700 text-sm">Count the orange cubes in each 5-train!</p>
            <CubeTrainGame onComplete={() => { speak("Now let's learn to write the number 3!"); setTimeout(() => goNext("cubes"), 1500); }} />
          </Card>
        )}

        {/* LEARN 3 */}
        {step === "learn-3" && (
          <Card className="border-0 bg-white/70 backdrop-blur-md shadow-2xl rounded-[2.5rem] p-8 space-y-6 text-center animate-in slide-in-from-right-8 duration-500">
            <h2 className="text-2xl text-amber-900">Let's Write <span className="text-5xl text-amber-600 align-middle">3</span></h2>
            <div className="bg-amber-50 rounded-2xl p-5 border-2 border-amber-200 mx-auto max-w-xs space-y-3">
              <div className="flex justify-center gap-1">
                <div className="w-8 h-8 rounded bg-orange-400 border-2 border-orange-600" />
                <div className="w-8 h-8 rounded bg-orange-400 border-2 border-orange-600" />
                <div className="w-8 h-8 rounded bg-orange-400 border-2 border-orange-600" />
              </div>
              <p className="font-nunito text-amber-700 text-sm">3 orange cubes in our train!</p>
              <p className="text-7xl text-amber-700 leading-none">3</p>
              <div className="space-y-1 font-nunito text-amber-800 text-lg italic">
                {RHYMES["3"].lines.map((l, i) => <p key={i}>{l}</p>)}
              </div>
            </div>
            <p className="font-nunito text-amber-700 text-sm">
              Start at the <strong>top dot</strong>. Two backward C's, one on top of the other!
            </p>
            <Button onClick={() => { speak(RHYMES["3"].combined); goNext("learn-3"); }}
              className="bg-amber-600 hover:bg-amber-700 text-white text-lg px-8 py-5 rounded-full shadow-lg border-b-4 border-amber-800">
              Try Writing 3! ✍️
            </Button>
          </Card>
        )}

        {/* PRACTICE 3 */}
        {step === "practice-3" && (
          <Card className="border-0 bg-white/70 backdrop-blur-md shadow-2xl rounded-[2.5rem] p-8 space-y-5 text-center animate-in slide-in-from-right-8 duration-500">
            <h2 className="text-2xl text-amber-900">Trace the Number <span className="text-amber-600">3</span></h2>
            <p className="font-nunito text-amber-700 text-sm italic">"{RHYMES["3"].combined}"</p>
            <p className="font-nunito text-amber-600 text-xs">Practice {practiceCount + 1} of 3</p>
            <WritingCanvas
              key={`three-${practiceCount}`}
              numeral="3"
              onComplete={() => {
                speak("Great job!");
                setTimeout(() => {
                  if (practiceCount < 2) setPracticeCount((c) => c + 1);
                  else goNext("practice-3");
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

        {/* REVIEW ALL: fill in cube train numbers */}
        {step === "review-all" && (
          <Card className="border-0 bg-white/70 backdrop-blur-md shadow-2xl rounded-[2.5rem] p-8 space-y-5 text-center animate-in slide-in-from-right-8 duration-500">
            <h2 className="text-2xl text-amber-900">Partners of 3! ✨</h2>
            <p className="font-nunito text-amber-700 text-sm">How many ways can we make 3?</p>
            <div className="space-y-3 font-nunito text-amber-800">
              {[
                { a: 3, b: 0, aColor: "bg-orange-400", bColor: "bg-yellow-300" },
                { a: 2, b: 1, aColor: "bg-orange-400", bColor: "bg-yellow-300" },
                { a: 1, b: 2, aColor: "bg-orange-400", bColor: "bg-yellow-300" },
                { a: 0, b: 3, aColor: "bg-orange-400", bColor: "bg-yellow-300" },
              ].map(({ a, b, aColor, bColor }, idx) => (
                <div key={idx} className="flex items-center justify-center gap-2">
                  <div className="flex gap-0.5">
                    {Array.from({ length: a }).map((_, i) => (
                      <div key={i} className={`w-7 h-7 rounded ${aColor} border border-orange-600`} />
                    ))}
                  </div>
                  <span className="text-lg">+</span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: b }).map((_, i) => (
                      <div key={i} className={`w-7 h-7 rounded ${bColor} border border-yellow-500`} />
                    ))}
                  </div>
                  <span className="text-lg">=</span>
                  <span className="font-bold text-xl">3</span>
                  <span className="text-sm text-amber-600 ml-2">{a} and {b} make 3</span>
                </div>
              ))}
            </div>
            <Button onClick={() => { speak("Now try writing all four numbers!"); goNext("review-all"); }}
              className="bg-amber-600 hover:bg-amber-700 text-white text-lg px-8 py-5 rounded-full shadow-lg border-b-4 border-amber-800">
              Challenge Time! ⭐
            </Button>
          </Card>
        )}

        {/* CHALLENGE */}
        {step === "challenge" && (
          <Card className="border-0 bg-white/70 backdrop-blur-md shadow-2xl rounded-[2.5rem] p-8 space-y-5 text-center animate-in slide-in-from-right-8 duration-500">
            <h2 className="text-2xl text-amber-900">Challenge! ⭐</h2>
            <p className="font-nunito text-amber-700">Write all four numbers!</p>
            <div className="flex flex-wrap justify-center gap-4">
              {["0", "1", "2", "3"].map((num) => (
                <div key={num} className="space-y-2">
                  <span className="text-lg text-amber-800 font-bold">Write {num}</span>
                  <WritingCanvas numeral={num} width={160} height={200}
                    onComplete={() => {
                      setChallengeDone((d) => {
                        const next = { ...d, [num]: true };
                        const allDone = Object.values(next).every(Boolean);
                        if (allDone) setTimeout(() => goNext("challenge"), 600);
                        return next;
                      });
                    }}
                  />
                  {challengeDone[num] && <span className="text-green-500 text-xl">✓</span>}
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
              <p>✏️ What do you like about writing the number <strong>3</strong>?</p>
              <p>🔢 What are the <strong>partners of 3</strong>? (3+0, 2+1, 1+2, 0+3)</p>
              <p>👀 Can you find a <strong>3</strong> anywhere around you?</p>
              <div className="flex justify-center gap-4 pt-2">
                <div className="flex items-center gap-3 bg-white rounded-xl p-3">
                  <div className="flex gap-0.5">
                    <div className="w-6 h-6 rounded bg-orange-400 border border-orange-600" />
                    <div className="w-6 h-6 rounded bg-orange-400 border border-orange-600" />
                    <div className="w-6 h-6 rounded bg-orange-400 border border-orange-600" />
                  </div>
                  <span className="text-lg">+</span>
                  <div className="flex gap-0.5">
                    <div className="w-6 h-6 rounded bg-yellow-300 border border-yellow-500" />
                    <div className="w-6 h-6 rounded bg-yellow-300 border border-yellow-500" />
                  </div>
                </div>
              </div>
              <p className="text-center text-sm">This 5-train has <strong>3</strong> orange and <strong>2</strong> yellow!</p>
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
            <h2 className="text-4xl text-white drop-shadow-lg">Superstar Writer!</h2>
            <p className="text-xl text-amber-100 font-nunito leading-relaxed max-w-md mx-auto">
              You learned to write <strong>3</strong> and reviewed <strong>0</strong>, <strong>1</strong>, and <strong>2</strong>!
            </p>
            <div className="flex gap-3 pt-4">
              <Button onClick={() => { setStep("intro"); setPracticeCount(0); setChallengeDone({ "0": false, "1": false, "2": false, "3": false }); }}
                className="flex-1 h-14 bg-white/15 hover:bg-white/25 text-white text-lg rounded-2xl border border-white/20">
                Again 🔄
              </Button>
              <Button onClick={() => navigate("/activities/module-5?last=lesson-3")}
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

export default WriteThree3;

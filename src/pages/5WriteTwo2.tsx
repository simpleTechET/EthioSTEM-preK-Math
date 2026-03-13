import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RotateCcw, Star, Eye, EyeOff } from "lucide-react";
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

const RHYME = {
  lines: ["Half a moon,", "there's more to do;", "slide to the right,", "I wrote a 2."],
  combined: "Half a moon, there's more to do; slide to the right, I wrote a 2.",
};

const PATHS: Record<string, { x: number; y: number }[]> = {
  "2": [
    { x: 0.25, y: 0.15 },
    { x: 0.5, y: 0.05 },
    { x: 0.75, y: 0.15 },
    { x: 0.8, y: 0.35 },
    { x: 0.5, y: 0.55 },
    { x: 0.2, y: 0.75 },
    { x: 0.15, y: 0.9 },
    { x: 0.5, y: 0.92 },
    { x: 0.85, y: 0.92 },
  ],
  "0": [
    { x: 0.5, y: 0.05 },
    { x: 0.2, y: 0.25 },
    { x: 0.15, y: 0.5 },
    { x: 0.2, y: 0.75 },
    { x: 0.5, y: 0.95 },
    { x: 0.8, y: 0.75 },
    { x: 0.85, y: 0.5 },
    { x: 0.8, y: 0.25 },
    { x: 0.5, y: 0.05 },
  ],
  "1": [
    { x: 0.45, y: 0.05 },
    { x: 0.45, y: 0.95 },
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
        ref={canvasRef}
        width={width}
        height={height}
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

/* ─── Hide and Seek mini-game ─── */
const HideAndSeekGame = ({ onComplete }: { onComplete: () => void }) => {
  const TOTAL_CHAIRS = 4;
  const [round, setRound] = useState(0);
  const [hiding, setHiding] = useState(0);
  const [eyesClosed, setEyesClosed] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [answered, setAnswered] = useState(false);
  const maxRounds = 3;

  const startRound = () => {
    const hideCount = Math.floor(Math.random() * 3) + 1; // 1-3
    setHiding(hideCount);
    setEyesClosed(true);
    setRevealed(false);
    setAnswered(false);
    speak("Close your eyes!");
    setTimeout(() => {
      setEyesClosed(false);
      speak("Open your eyes! How many friends do you see now?");
    }, 2000);
  };

  useEffect(() => { startRound(); }, []);

  const handleAnswer = (ans: number) => {
    if (ans === TOTAL_CHAIRS - hiding) {
      speak(`Yes! ${TOTAL_CHAIRS - hiding} friends! And ${hiding} ${hiding === 1 ? "is" : "are"} hiding!`);
      setAnswered(true);
      setRevealed(true);
      setTimeout(() => {
        if (round + 1 >= maxRounds) {
          onComplete();
        } else {
          setRound((r) => r + 1);
          startRound();
        }
      }, 2500);
    } else {
      speak("Try again! Count the friends you can see.");
    }
  };

  return (
    <div className="space-y-4 text-center">
      <p className="font-nunito text-amber-800 text-sm">Round {round + 1} of {maxRounds}</p>
      {eyesClosed ? (
        <div className="flex flex-col items-center gap-3 py-6">
          <EyeOff className="w-16 h-16 text-amber-400 animate-pulse" />
          <p className="text-xl text-amber-700 font-fredoka">Eyes closed!</p>
        </div>
      ) : (
        <>
          <div className="flex justify-center gap-3 py-4">
            {Array.from({ length: TOTAL_CHAIRS }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className={`w-12 h-14 rounded-lg border-2 flex items-center justify-center text-2xl transition-all duration-500 ${
                  i < TOTAL_CHAIRS - hiding || revealed
                    ? "bg-amber-100 border-amber-300"
                    : "bg-gray-100 border-dashed border-gray-300"
                }`}>
                  {(i < TOTAL_CHAIRS - hiding || revealed) ? "🧒" : "🪑"}
                </div>
              </div>
            ))}
          </div>
          {!answered && !eyesClosed && (
            <div className="space-y-2">
              <p className="font-nunito text-amber-700 text-sm">How many friends do you see?</p>
              <div className="flex justify-center gap-2">
                {[0, 1, 2, 3, 4].map((n) => (
                  <Button key={n} variant="outline" onClick={() => handleAnswer(n)}
                    className="w-12 h-12 text-xl font-fredoka rounded-xl border-2 border-amber-300 hover:bg-amber-100">
                    {n}
                  </Button>
                ))}
              </div>
            </div>
          )}
          {answered && (
            <p className="text-green-600 font-fredoka text-lg flex items-center justify-center gap-1">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              {TOTAL_CHAIRS - hiding} friends! {hiding} hiding!
            </p>
          )}
        </>
      )}
    </div>
  );
};

/* ─── Elephant Splashes counting ─── */
const ElephantSplashes = ({ onComplete }: { onComplete: () => void }) => {
  const [count, setCount] = useState(0);
  const target = 20;
  const [swinging, setSwinging] = useState(false);

  const handleSplash = () => {
    if (count >= target) return;
    setSwinging(true);
    const next = count + 1;
    setCount(next);
    speak(String(next), 1.2);
    setTimeout(() => setSwinging(false), 300);
    if (next >= target) {
      setTimeout(() => { speak("Twenty! Great counting!"); onComplete(); }, 500);
    }
  };

  return (
    <div className="text-center space-y-4">
      <div className={`text-7xl transition-transform ${swinging ? "animate-wiggle" : ""}`}>🐘</div>
      <p className="font-nunito text-amber-700">Tap the elephant to swing and count!</p>
      <Button onClick={handleSplash} disabled={count >= target}
        className="bg-amber-600 hover:bg-amber-700 text-white text-2xl px-8 py-5 rounded-full shadow-lg border-b-4 border-amber-800">
        {count < target ? `Splash! (${count})` : "Done! 🎉"}
      </Button>
      <div className="w-full bg-amber-200 rounded-full h-2">
        <div className="bg-amber-600 h-2 rounded-full transition-all" style={{ width: `${(count / target) * 100}%` }} />
      </div>
    </div>
  );
};

/* ─── Leaf counting application problem ─── */
const LeafCounting = ({ onComplete }: { onComplete: () => void }) => {
  const [leaves, setLeaves] = useState(1);
  const [answered, setAnswered] = useState(false);
  const maxLeaves = 5;

  const addLeaf = () => {
    if (leaves >= maxLeaves) return;
    setLeaves((l) => l + 1);
    setAnswered(false);
    speak(`I added 1 more leaf. How many leaves now?`);
  };

  const handleAnswer = (ans: number) => {
    if (ans === leaves) {
      speak(`Yes! ${leaves} ${leaves === 1 ? "leaf" : "leaves"}!`);
      setAnswered(true);
      if (leaves >= maxLeaves) {
        setTimeout(() => onComplete(), 1500);
      }
    } else {
      speak("Count again!");
    }
  };

  return (
    <div className="text-center space-y-4">
      <div className="flex justify-center gap-2 flex-wrap py-2">
        {Array.from({ length: leaves }).map((_, i) => (
          <span key={i} className="text-4xl animate-float" style={{ animationDelay: `${i * 0.2}s` }}>🍃</span>
        ))}
      </div>
      <p className="font-nunito text-amber-700">How many leaves do you see?</p>
      <div className="flex justify-center gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <Button key={n} variant="outline" onClick={() => handleAnswer(n)}
            className={`w-12 h-12 text-xl font-fredoka rounded-xl border-2 ${
              answered && n === leaves ? "border-green-400 bg-green-50" : "border-amber-300 hover:bg-amber-100"
            }`}>
            {n}
          </Button>
        ))}
      </div>
      {answered && leaves < maxLeaves && (
        <Button onClick={addLeaf} className="bg-amber-600 hover:bg-amber-700 text-white rounded-full px-6 py-3">
          Add 1 more leaf 🍃
        </Button>
      )}
      {answered && leaves >= maxLeaves && (
        <p className="text-green-600 font-fredoka text-lg">
          <Star className="w-5 h-5 inline fill-yellow-400 text-yellow-400" /> 1 and 1 more and 1 more… is {maxLeaves}!
        </p>
      )}
    </div>
  );
};

/* ─── Main page ─── */
type Step = "intro" | "hide-seek" | "elephant" | "leaves" | "learn-2" | "practice-2" | "review" | "challenge" | "debrief" | "complete";

const WriteTwo2 = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("intro");
  const [practiceCount, setPracticeCount] = useState(0);
  const [challengeDone, setChallengeDone] = useState<Record<string, boolean>>({ "0": false, "1": false, "2": false });

  const markLessonComplete = () => {
    const saved = localStorage.getItem("ethio-stem-m5-completed");
    const completed: string[] = saved ? JSON.parse(saved) : [];
    if (!completed.includes("lesson-2")) {
      completed.push("lesson-2");
      localStorage.setItem("ethio-stem-m5-completed", JSON.stringify(completed));
    }
  };

  const goNext = (from: Step) => {
    const flow: Step[] = ["intro", "hide-seek", "elephant", "leaves", "learn-2", "practice-2", "review", "challenge", "debrief", "complete"];
    const idx = flow.indexOf(from);
    if (idx < flow.length - 1) setStep(flow[idx + 1]);
  };

  useEffect(() => {
    if (step === "complete") markLessonComplete();
  }, [step]);

  return (
    <div className="min-h-screen font-fredoka overflow-x-hidden" style={{ background: "linear-gradient(170deg, #fef9c3 0%, #fde68a 30%, #fbbf24 60%, #f59e0b 100%)" }}>
      {["✏️", "2️⃣", "🍃", "🐘", "🪑"].map((e, i) => (
        <div key={i} className="fixed pointer-events-none select-none opacity-[0.06] text-6xl" style={{ top: `${10 + i * 18}%`, left: i % 2 === 0 ? `${2 + i * 5}%` : undefined, right: i % 2 !== 0 ? `${3 + i * 4}%` : undefined, transform: `rotate(${i * 12 - 20}deg)` }}>
          {e}
        </div>
      ))}

      <div className="container mx-auto px-4 py-6 max-w-xl relative z-10">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate("/activities/module-5?last=lesson-2")} className="rounded-full bg-white/40 hover:bg-white/70 backdrop-blur-sm shadow-md">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <span className="font-fredoka text-sm bg-amber-800/20 text-amber-900 px-3 py-1 rounded-full">Lesson 2</span>
            <MuteButton className="h-9 w-9 rounded-full bg-white/40 hover:bg-white/70 backdrop-blur-sm shadow-md" />
          </div>
        </div>

        {/* INTRO */}
        {step === "intro" && (
          <Card className="border-0 bg-white/70 backdrop-blur-md shadow-2xl rounded-[2.5rem] overflow-hidden text-center p-8 space-y-6 animate-in fade-in zoom-in-95 duration-500">
            <div className="mx-auto w-20 h-20 bg-gradient-to-tr from-amber-500 to-yellow-400 rounded-2xl flex items-center justify-center shadow-lg rotate-3">
              <span className="text-4xl">✏️</span>
            </div>
            <h1 className="text-3xl md:text-4xl text-amber-900 leading-tight">Write the Number 2!</h1>
            <p className="text-lg text-amber-800 font-nunito leading-relaxed max-w-md mx-auto">
              Today we'll practice counting, play fun games, and learn to <strong>write the numeral 2</strong>!
            </p>
            <div className="bg-amber-50 rounded-2xl p-4 text-left space-y-2 font-nunito text-sm text-amber-800 border border-amber-200">
              <p className="font-bold text-amber-900">🎯 Learning Goals</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Write numeral 2 starting from the top</li>
                <li>Say the number formation rhyme for 2</li>
                <li>Review writing 0 and 1</li>
              </ul>
              <p className="font-bold text-amber-900 pt-2">💡 Parent Tip</p>
              <p>The rhyme "Half a moon, there's more to do; slide to the right, I wrote a 2" helps children remember the correct strokes!</p>
            </div>
            <Button onClick={() => { speak("Let's learn to write the number 2!"); goNext("intro"); }}
              className="bg-amber-600 hover:bg-amber-700 text-white text-xl px-10 py-6 rounded-full shadow-xl border-b-4 border-amber-800 transition-all hover:scale-105 active:scale-95">
              Let's Start! ✏️
            </Button>
          </Card>
        )}

        {/* HIDE AND SEEK */}
        {step === "hide-seek" && (
          <Card className="border-0 bg-white/70 backdrop-blur-md shadow-2xl rounded-[2.5rem] p-8 space-y-5 text-center animate-in slide-in-from-right-8 duration-500">
            <h2 className="text-2xl text-amber-900">🪑 Hide and Seek!</h2>
            <p className="font-nunito text-amber-700 text-sm">4 friends are sitting. Some will hide! Can you count?</p>
            <HideAndSeekGame onComplete={() => { speak("Great job! Let's count with Eli the elephant!"); setTimeout(() => goNext("hide-seek"), 1500); }} />
          </Card>
        )}

        {/* ELEPHANT SPLASHES */}
        {step === "elephant" && (
          <Card className="border-0 bg-white/70 backdrop-blur-md shadow-2xl rounded-[2.5rem] p-8 space-y-5 text-center animate-in slide-in-from-right-8 duration-500">
            <h2 className="text-2xl text-amber-900">🐘 Elephant Splashes!</h2>
            <p className="font-nunito text-amber-700 text-sm">Eli loves to splash! Count to 20!</p>
            <ElephantSplashes onComplete={() => { setTimeout(() => goNext("elephant"), 1500); }} />
          </Card>
        )}

        {/* LEAF COUNTING */}
        {step === "leaves" && (
          <Card className="border-0 bg-white/70 backdrop-blur-md shadow-2xl rounded-[2.5rem] p-8 space-y-5 text-center animate-in slide-in-from-right-8 duration-500">
            <h2 className="text-2xl text-amber-900">🍃 Counting Leaves</h2>
            <p className="font-nunito text-amber-700 text-sm">1 and 1 more is… let's find out!</p>
            <LeafCounting onComplete={() => { speak("Wonderful! Now let's learn to write the number 2!"); setTimeout(() => goNext("leaves"), 1500); }} />
          </Card>
        )}

        {/* LEARN 2 */}
        {step === "learn-2" && (
          <Card className="border-0 bg-white/70 backdrop-blur-md shadow-2xl rounded-[2.5rem] p-8 space-y-6 text-center animate-in slide-in-from-right-8 duration-500">
            <h2 className="text-2xl text-amber-900">Let's Write <span className="text-5xl text-amber-600 align-middle">2</span></h2>
            <div className="bg-amber-50 rounded-2xl p-5 border-2 border-amber-200 mx-auto max-w-xs space-y-3">
              <div className="flex justify-center gap-3">
                <span className="text-3xl">🟧</span><span className="text-3xl">🟧</span>
              </div>
              <p className="font-nunito text-amber-700 text-sm">2 orange cubes in our train!</p>
              <p className="text-7xl text-amber-700 leading-none">2</p>
              <div className="space-y-1 font-nunito text-amber-800 text-lg italic">
                {RHYME.lines.map((l, i) => <p key={i}>{l}</p>)}
              </div>
            </div>
            <p className="font-nunito text-amber-700 text-sm">
              Start at the <strong>top</strong>. Curve like half a moon, then slide right!
            </p>
            <Button onClick={() => { speak(RHYME.combined); goNext("learn-2"); }}
              className="bg-amber-600 hover:bg-amber-700 text-white text-lg px-8 py-5 rounded-full shadow-lg border-b-4 border-amber-800">
              Try Writing 2! ✍️
            </Button>
          </Card>
        )}

        {/* PRACTICE 2 */}
        {step === "practice-2" && (
          <Card className="border-0 bg-white/70 backdrop-blur-md shadow-2xl rounded-[2.5rem] p-8 space-y-5 text-center animate-in slide-in-from-right-8 duration-500">
            <h2 className="text-2xl text-amber-900">Trace the Number <span className="text-amber-600">2</span></h2>
            <p className="font-nunito text-amber-700 text-sm italic">"{RHYME.combined}"</p>
            <p className="font-nunito text-amber-600 text-xs">Practice {practiceCount + 1} of 3</p>
            <WritingCanvas
              key={`two-${practiceCount}`}
              numeral="2"
              onComplete={() => {
                speak("Great job!");
                setTimeout(() => {
                  if (practiceCount < 2) setPracticeCount((c) => c + 1);
                  else goNext("practice-2");
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

        {/* REVIEW 0 and 1 */}
        {step === "review" && (
          <Card className="border-0 bg-white/70 backdrop-blur-md shadow-2xl rounded-[2.5rem] p-8 space-y-5 text-center animate-in slide-in-from-right-8 duration-500">
            <h2 className="text-2xl text-amber-900">Quick Review! ✨</h2>
            <p className="font-nunito text-amber-700 text-sm">Which numbers have straight lines? Which have curves?</p>
            <div className="flex justify-center gap-8 py-2">
              {[{ n: "0", label: "Curved" }, { n: "1", label: "Straight" }, { n: "2", label: "Both!" }].map(({ n, label }) => (
                <div key={n} className="text-center space-y-1">
                  <span className="text-5xl font-fredoka text-amber-700">{n}</span>
                  <p className="text-xs font-nunito text-amber-600">{label}</p>
                </div>
              ))}
            </div>
            <Button onClick={() => { speak("Now try writing all three numbers!"); goNext("review"); }}
              className="bg-amber-600 hover:bg-amber-700 text-white text-lg px-8 py-5 rounded-full shadow-lg border-b-4 border-amber-800">
              Challenge Time! ⭐
            </Button>
          </Card>
        )}

        {/* CHALLENGE */}
        {step === "challenge" && (
          <Card className="border-0 bg-white/70 backdrop-blur-md shadow-2xl rounded-[2.5rem] p-8 space-y-5 text-center animate-in slide-in-from-right-8 duration-500">
            <h2 className="text-2xl text-amber-900">Challenge! ⭐</h2>
            <p className="font-nunito text-amber-700">Write all three numbers!</p>
            <div className="flex flex-wrap justify-center gap-4">
              {["0", "1", "2"].map((num) => (
                <div key={num} className="space-y-2">
                  <span className="text-lg text-amber-800 font-bold">Write {num}</span>
                  <WritingCanvas numeral={num} width={180} height={220}
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
              <p>👀 Can you find a <strong>2</strong> anywhere around you?</p>
              <p>✏️ What's different about writing <strong>1</strong> and <strong>2</strong>?</p>
              <p>🔵 Which numbers have <strong>curved lines</strong>? Which have <strong>straight lines</strong>?</p>
              <div className="flex justify-center gap-4 pt-2">
                <div className="flex items-center gap-3 bg-white rounded-xl p-3">
                  <span className="text-3xl">🟨🟨🟨</span>
                  <span className="text-3xl">🟧🟧</span>
                </div>
              </div>
              <p className="text-center text-sm">This tower of 5 has <strong>3</strong> yellow and <strong>2</strong> orange!</p>
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
            <h2 className="text-4xl text-white drop-shadow-lg">Amazing Writer!</h2>
            <p className="text-xl text-amber-100 font-nunito leading-relaxed max-w-md mx-auto">
              You learned to write <strong>2</strong> and reviewed <strong>0</strong> and <strong>1</strong>!
            </p>
            <div className="flex gap-3 pt-4">
              <Button onClick={() => { setStep("intro"); setPracticeCount(0); setChallengeDone({ "0": false, "1": false, "2": false }); }}
                className="flex-1 h-14 bg-white/15 hover:bg-white/25 text-white text-lg rounded-2xl border border-white/20">
                Again 🔄
              </Button>
              <Button onClick={() => navigate("/activities/module-5?last=lesson-2")}
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

export default WriteTwo2;

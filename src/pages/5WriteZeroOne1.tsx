import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RotateCcw, ArrowRight, Star, Sparkles } from "lucide-react";
import { MuteButton } from "@/components/MuteButton";

/* ─── helpers ─── */
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
};

/* Waypoints the child needs to follow (normalised 0-1 inside the writing rect) */
const PATHS: Record<string, { x: number; y: number }[]> = {
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

const HIT_RADIUS = 0.13; // normalised radius for waypoint detection

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
      // writing rectangle
      ctx.strokeStyle = "#d4b896";
      ctx.lineWidth = 3;
      ctx.strokeRect(8, 8, width - 16, height - 16);
      // dashed midline
      ctx.setLineDash([8, 6]);
      ctx.strokeStyle = "#e8d5b8";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(8, height / 2);
      ctx.lineTo(width - 8, height / 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // ghost numeral
      ctx.font = `bold ${height * 0.7}px Fredoka`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "rgba(139,92,246,0.1)";
      ctx.fillText(numeral, width / 2, height / 2 + 4);

      // start dot
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

      // next waypoint indicator
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

  const drawPath = useCallback(
    (ctx: CanvasRenderingContext2D) => {
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
    },
    []
  );

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
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: ((e as React.MouseEvent).clientX - rect.left) * scaleX,
      y: ((e as React.MouseEvent).clientY - rect.top) * scaleY,
    };
  };

  const checkWaypoint = (x: number, y: number) => {
    if (currentWP >= waypoints.length) return;
    const wp = waypoints[currentWP];
    const wpX = 8 + wp.x * (width - 16);
    const wpY = 8 + wp.y * (height - 16);
    const dist = Math.sqrt((x - wpX) ** 2 + (y - wpY) ** 2);
    const threshold = HIT_RADIUS * Math.min(width, height);
    if (dist < threshold) {
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
    if (ctx) {
      drawBackground(ctx);
      drawPath(ctx);
    }
  };

  const handleEnd = () => setIsDrawing(false);

  const reset = () => {
    setCurrentWP(0);
    setCompleted(false);
    pathRef.current = [];
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      drawBackground(ctx);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="rounded-2xl border-4 border-amber-200 bg-amber-50/80 shadow-inner touch-none cursor-crosshair"
        style={{ width: width * 0.85, height: height * 0.85 }}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
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

/* ─── Main page ─── */
type Step = "intro" | "learn-1" | "practice-1" | "learn-0" | "practice-0" | "challenge" | "complete";

const WriteZeroOne1 = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("intro");
  const [practiceCount1, setPracticeCount1] = useState(0);
  const [practiceCount0, setPracticeCount0] = useState(0);
  const [challengeDone, setChallengeDone] = useState<{ zero: boolean; one: boolean }>({ zero: false, one: false });

  const markLessonComplete = () => {
    const saved = localStorage.getItem("ethio-stem-m5-completed");
    const completed: string[] = saved ? JSON.parse(saved) : [];
    if (!completed.includes("lesson-1")) {
      completed.push("lesson-1");
      localStorage.setItem("ethio-stem-m5-completed", JSON.stringify(completed));
    }
  };

  const goNext = (from: Step) => {
    const flow: Step[] = ["intro", "learn-1", "practice-1", "learn-0", "practice-0", "challenge", "complete"];
    const idx = flow.indexOf(from);
    if (idx < flow.length - 1) setStep(flow[idx + 1]);
  };

  useEffect(() => {
    if (step === "complete") markLessonComplete();
  }, [step]);

  return (
    <div className="min-h-screen font-fredoka overflow-x-hidden" style={{ background: "linear-gradient(170deg, #fef9c3 0%, #fde68a 30%, #fbbf24 60%, #f59e0b 100%)" }}>
      {/* floating decorations */}
      {["✏️", "📝", "0️⃣", "1️⃣", "📖"].map((e, i) => (
        <div key={i} className="fixed pointer-events-none select-none opacity-[0.06] text-6xl" style={{ top: `${10 + i * 18}%`, left: i % 2 === 0 ? `${2 + i * 5}%` : undefined, right: i % 2 !== 0 ? `${3 + i * 4}%` : undefined, transform: `rotate(${i * 12 - 20}deg)` }}>
          {e}
        </div>
      ))}

      <div className="container mx-auto px-4 py-6 max-w-xl relative z-10">
        {/* header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate("/activities/module-5?last=lesson-1")} className="rounded-full bg-white/40 hover:bg-white/70 backdrop-blur-sm shadow-md">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <span className="font-fredoka text-sm bg-amber-800/20 text-amber-900 px-3 py-1 rounded-full">Lesson 1</span>
            <MuteButton className="h-9 w-9 rounded-full bg-white/40 hover:bg-white/70 backdrop-blur-sm shadow-md" />
          </div>
        </div>

        {/* ── INTRO ── */}
        {step === "intro" && (
          <Card className="border-0 bg-white/70 backdrop-blur-md shadow-2xl rounded-[2.5rem] overflow-hidden text-center p-8 space-y-6 animate-in fade-in zoom-in-95 duration-500">
            <div className="mx-auto w-20 h-20 bg-gradient-to-tr from-amber-500 to-yellow-400 rounded-2xl flex items-center justify-center shadow-lg rotate-3">
              <span className="text-4xl">✏️</span>
            </div>
            <h1 className="text-3xl md:text-4xl text-amber-900 leading-tight">Write 0 and 1!</h1>
            <p className="text-lg text-amber-800 font-nunito leading-relaxed max-w-md mx-auto">
              Today we'll learn to <strong>write</strong> the numerals <strong>0</strong> and <strong>1</strong> using special rhymes and a writing rectangle!
            </p>
            <div className="bg-amber-50 rounded-2xl p-4 text-left space-y-2 font-nunito text-sm text-amber-800 border border-amber-200">
              <p className="font-bold text-amber-900">🎯 Learning Goals</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Recognize the numerals 0 and 1</li>
                <li>Write numerals starting from the top</li>
                <li>Say the numeral formation rhyme</li>
              </ul>
              <p className="font-bold text-amber-900 pt-2">💡 Parent Tip</p>
              <p>Encourage your child to say the rhyme aloud while tracing. Starting from the top is very important!</p>
            </div>
            <Button onClick={() => { speak("Let's learn to write numbers!"); goNext("intro"); }} className="bg-amber-600 hover:bg-amber-700 text-white text-xl px-10 py-6 rounded-full shadow-xl border-b-4 border-amber-800 transition-all hover:scale-105 active:scale-95">
              Let's Start! ✏️
            </Button>
          </Card>
        )}

        {/* ── LEARN 1 ── */}
        {step === "learn-1" && (
          <Card className="border-0 bg-white/70 backdrop-blur-md shadow-2xl rounded-[2.5rem] p-8 space-y-6 text-center animate-in slide-in-from-right-8 duration-500">
            <h2 className="text-2xl text-amber-900">Let's Write <span className="text-5xl text-amber-600 align-middle">1</span></h2>
            <div className="bg-amber-50 rounded-2xl p-6 border-2 border-amber-200 mx-auto max-w-xs">
              <p className="text-7xl text-amber-700 mb-4 leading-none">1</p>
              <div className="space-y-1 font-nunito text-amber-800 text-lg italic">
                {RHYMES["1"].lines.map((l, i) => (
                  <p key={i}>{l}</p>
                ))}
              </div>
            </div>
            <p className="font-nunito text-amber-700 text-sm">
              ☝️ Start at the <strong>top</strong>. Go straight down!
            </p>
            <Button onClick={() => { speak(RHYMES["1"].combined); goNext("learn-1"); }} className="bg-amber-600 hover:bg-amber-700 text-white text-lg px-8 py-5 rounded-full shadow-lg border-b-4 border-amber-800">
              Try Writing 1! ✍️
            </Button>
          </Card>
        )}

        {/* ── PRACTICE 1 ── */}
        {step === "practice-1" && (
          <Card className="border-0 bg-white/70 backdrop-blur-md shadow-2xl rounded-[2.5rem] p-8 space-y-5 text-center animate-in slide-in-from-right-8 duration-500">
            <h2 className="text-2xl text-amber-900">Trace the Number <span className="text-amber-600">1</span></h2>
            <p className="font-nunito text-amber-700 text-sm italic">"{RHYMES["1"].combined}"</p>
            <p className="font-nunito text-amber-600 text-xs">Practice {practiceCount1 + 1} of 3</p>
            <WritingCanvas
              key={`one-${practiceCount1}`}
              numeral="1"
              onComplete={() => {
                speak("Great job!");
                setTimeout(() => {
                  if (practiceCount1 < 2) {
                    setPracticeCount1((c) => c + 1);
                  } else {
                    goNext("practice-1");
                  }
                }, 800);
              }}
            />
            <div className="flex justify-center gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className={`w-3 h-3 rounded-full ${i <= practiceCount1 ? "bg-amber-500" : "bg-amber-200"}`} />
              ))}
            </div>
          </Card>
        )}

        {/* ── LEARN 0 ── */}
        {step === "learn-0" && (
          <Card className="border-0 bg-white/70 backdrop-blur-md shadow-2xl rounded-[2.5rem] p-8 space-y-6 text-center animate-in slide-in-from-right-8 duration-500">
            <h2 className="text-2xl text-amber-900">Now Let's Write <span className="text-5xl text-amber-600 align-middle">0</span></h2>
            <p className="font-nunito text-amber-700 text-base">
              Zero means <strong>none</strong>. It looks like the letter O!
            </p>
            <div className="bg-amber-50 rounded-2xl p-6 border-2 border-amber-200 mx-auto max-w-xs">
              <p className="text-7xl text-amber-700 mb-4 leading-none">0</p>
              <div className="space-y-1 font-nunito text-amber-800 text-lg italic">
                {RHYMES["0"].lines.map((l, i) => (
                  <p key={i}>{l}</p>
                ))}
              </div>
            </div>
            <p className="font-nunito text-amber-700 text-sm">
              Start at the <strong>top center</strong>. Curve around and close the loop!
            </p>
            <Button onClick={() => { speak(RHYMES["0"].combined); goNext("learn-0"); }} className="bg-amber-600 hover:bg-amber-700 text-white text-lg px-8 py-5 rounded-full shadow-lg border-b-4 border-amber-800">
              Try Writing 0! ✍️
            </Button>
          </Card>
        )}

        {/* ── PRACTICE 0 ── */}
        {step === "practice-0" && (
          <Card className="border-0 bg-white/70 backdrop-blur-md shadow-2xl rounded-[2.5rem] p-8 space-y-5 text-center animate-in slide-in-from-right-8 duration-500">
            <h2 className="text-2xl text-amber-900">Trace the Number <span className="text-amber-600">0</span></h2>
            <p className="font-nunito text-amber-700 text-sm italic">"{RHYMES["0"].combined}"</p>
            <p className="font-nunito text-amber-600 text-xs">Practice {practiceCount0 + 1} of 3</p>
            <WritingCanvas
              key={`zero-${practiceCount0}`}
              numeral="0"
              onComplete={() => {
                speak("Wonderful!");
                setTimeout(() => {
                  if (practiceCount0 < 2) {
                    setPracticeCount0((c) => c + 1);
                  } else {
                    goNext("practice-0");
                  }
                }, 800);
              }}
            />
            <div className="flex justify-center gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className={`w-3 h-3 rounded-full ${i <= practiceCount0 ? "bg-amber-500" : "bg-amber-200"}`} />
              ))}
            </div>
          </Card>
        )}

        {/* ── CHALLENGE ── */}
        {step === "challenge" && (
          <Card className="border-0 bg-white/70 backdrop-blur-md shadow-2xl rounded-[2.5rem] p-8 space-y-6 text-center animate-in slide-in-from-right-8 duration-500">
            <h2 className="text-2xl text-amber-900">Challenge! ⭐</h2>
            <p className="font-nunito text-amber-700">Write both numbers on your own!</p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="space-y-2">
                <span className="text-lg text-amber-800 font-bold">Write 0</span>
                <WritingCanvas
                  numeral="0"
                  width={200}
                  height={240}
                  onComplete={() => {
                    setChallengeDone((d) => {
                      const next = { ...d, zero: true };
                      if (next.one) setTimeout(() => goNext("challenge"), 600);
                      return next;
                    });
                  }}
                />
                {challengeDone.zero && <span className="text-green-500 text-xl">✓</span>}
              </div>
              <div className="space-y-2">
                <span className="text-lg text-amber-800 font-bold">Write 1</span>
                <WritingCanvas
                  numeral="1"
                  width={200}
                  height={240}
                  onComplete={() => {
                    setChallengeDone((d) => {
                      const next = { ...d, one: true };
                      if (next.zero) setTimeout(() => goNext("challenge"), 600);
                      return next;
                    });
                  }}
                />
                {challengeDone.one && <span className="text-green-500 text-xl">✓</span>}
              </div>
            </div>
          </Card>
        )}

        {/* ── COMPLETE ── */}
        {step === "complete" && (
          <Card className="border-0 overflow-hidden shadow-2xl rounded-[2.5rem] p-10 text-center space-y-6 animate-in zoom-in-95 duration-700" style={{ background: "linear-gradient(135deg, #92400e, #d97706, #f59e0b)" }}>
            <div className="text-7xl animate-bounce">🌟</div>
            <h2 className="text-4xl text-white drop-shadow-lg">Amazing Writer!</h2>
            <p className="text-xl text-amber-100 font-nunito leading-relaxed max-w-md mx-auto">
              You learned to write <strong>0</strong> and <strong>1</strong>!
              <br />
              Keep practicing — you'll be a number expert!
            </p>
            <div className="flex gap-3 pt-4">
              <Button onClick={() => { setStep("intro"); setPracticeCount0(0); setPracticeCount1(0); setChallengeDone({ zero: false, one: false }); }} className="flex-1 h-14 bg-white/15 hover:bg-white/25 text-white text-lg rounded-2xl border border-white/20">
                Again 🔄
              </Button>
              <Button onClick={() => navigate("/activities/module-5?last=lesson-1")} className="flex-1 h-14 bg-white text-amber-800 hover:bg-amber-50 text-lg rounded-2xl shadow-lg">
                Done! ✨
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default WriteZeroOne1;

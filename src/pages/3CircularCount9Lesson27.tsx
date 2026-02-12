import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Star, RotateCcw } from "lucide-react";

const PHASES = ["fluency", "application", "concept", "debrief"] as const;
type Phase = (typeof PHASES)[number];

const CIRCLE_CARDS = [
  { count: 5, emoji: "🐸", label: "frogs" },
  { count: 6, emoji: "🦋", label: "butterflies" },
  { count: 7, emoji: "🐞", label: "ladybugs" },
  { count: 8, emoji: "🐝", label: "bees" },
  { count: 9, emoji: "🐌", label: "snails" },
];

const positionOnCircle = (index: number, total: number, radius: number) => {
  const angle = (2 * Math.PI * index) / total - Math.PI / 2;
  return { x: radius * Math.cos(angle), y: radius * Math.sin(angle) };
};

const CircularCount9Lesson27 = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("fluency");
  const [step, setStep] = useState(0);

  // Fluency
  const [clapCount, setClapCount] = useState(-1); // -1 = not started, 0..10
  const [redBeans, setRedBeans] = useState(0);
  const [whiteBeans, setWhiteBeans] = useState(0);
  const [beansJoined, setBeansJoined] = useState(false);

  // Application
  const [rhymeStep, setRhymeStep] = useState(0);

  // Concept
  const [snailsCounted, setSnailsCounted] = useState(0);
  const [markedStart, setMarkedStart] = useState(false);
  const [overCounted, setOverCounted] = useState(false);
  const [platesCounted, setPlatesCounted] = useState(0);
  const [practiceCard, setPracticeCard] = useState(0);
  const [practiceCount, setPracticeCount] = useState(0);
  const [practiceMarked, setPracticeMarked] = useState(false);
  const [selectedNumeral, setSelectedNumeral] = useState<number | null>(null);

  const nextPhase = () => {
    const i = PHASES.indexOf(phase);
    if (i < PHASES.length - 1) {
      setPhase(PHASES[i + 1]);
      setStep(0);
    }
  };

  const doClap = () => {
    if (clapCount < 10) setClapCount((c) => c + 1);
  };

  const rhymeLines = [
    { text: "🌸 One little flower", num: 1 },
    { text: "🐝🐝 2 little bees", num: 2 },
    { text: "🐦🐦🐦 3 little birds in a tree", num: 3 },
    { text: "🐱🐱🐱🐱 4 little kittens come out to play", num: 4 },
    { text: "🦆🦆🦆🦆🦆 5 little ducks take a dive", num: 5 },
    { text: "🐿️🐿️🐿️🐿️🐿️🐿️ 6 little squirrels", num: 6 },
    { text: "🐻🐻🐻🐻🐻🐻🐻 7 bears in 7 chairs", num: 7 },
    { text: "🍎🍎🍎🍎🍎🍎🍎🍎 8 little apples", num: 8 },
    { text: "🐌🐌🐌🐌🐌🐌🐌🐌🐌 9 little snails in a line!", num: 9 },
  ];

  const currentCard = CIRCLE_CARDS[practiceCard];

  const renderCircle = (
    count: number,
    emoji: string,
    highlighted: number,
    marked: boolean,
    onClickItem: (i: number) => void,
    radius = 90
  ) => (
    <div className="relative mx-auto" style={{ width: radius * 2 + 60, height: radius * 2 + 60 }}>
      {Array.from({ length: count }).map((_, i) => {
        const pos = positionOnCircle(i, count, radius);
        const cx = radius + 30 + pos.x;
        const cy = radius + 30 + pos.y;
        return (
          <button
            key={i}
            onClick={() => onClickItem(i)}
            className={`absolute flex items-center justify-center text-2xl transition-all duration-200 rounded-full w-11 h-11 ${
              i < highlighted
                ? "ring-4 ring-primary scale-110 bg-primary/10"
                : "bg-card border border-border"
            } ${i === 0 && marked ? "ring-4 ring-yellow-400" : ""}`}
            style={{ left: cx - 22, top: cy - 22 }}
          >
            {emoji}
            {i < highlighted && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">
                {i + 1}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 flex flex-col">
      <header className="bg-white/80 backdrop-blur shadow-sm p-4 flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => navigate("/learning")}>
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Button>
        <h1 className="text-lg font-bold text-primary">Lesson 27: Circular Counting to 9</h1>
        <div className="flex gap-1">
          {PHASES.map((p) => (
            <div key={p} className={`w-3 h-3 rounded-full ${p === phase ? "bg-primary" : "bg-muted"}`} />
          ))}
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 gap-6 max-w-2xl mx-auto w-full">
        {/* FLUENCY */}
        {phase === "fluency" && step === 0 && (
          <div className="text-center space-y-6 w-full">
            <h2 className="text-2xl font-bold">👏 Clap and Count 0 to 10</h2>
            <p className="text-muted-foreground">Clap once for each number. Hold "fiiiive" a bit longer!</p>
            <div className="text-7xl font-black text-primary">
              {clapCount < 0 ? "Ready?" : clapCount}
            </div>
            <div className={`text-5xl transition-transform duration-200 ${clapCount >= 0 && clapCount < 10 ? "animate-bounce" : ""}`}>
              👏
            </div>
            <Button size="lg" onClick={doClap} disabled={clapCount >= 10} className="text-xl px-8">
              {clapCount < 0 ? "Start!" : clapCount >= 10 ? "🎉 10!" : `Clap! (${clapCount}/10)`}
            </Button>
            {clapCount >= 10 && (
              <div className="space-y-3">
                <p className="text-green-600 font-bold">Great clapping from 0 to 10! 🎉</p>
                <Button onClick={() => setStep(1)}>Next: Line of 9 Beans <ArrowRight className="w-4 h-4 ml-1" /></Button>
              </div>
            )}
          </div>
        )}

        {phase === "fluency" && step === 1 && (
          <div className="text-center space-y-6 w-full">
            <h2 className="text-2xl font-bold">🫘 Make a Line of 9 Beans</h2>
            <p className="text-muted-foreground">Count 5 red beans, then 4 white beans, then join them!</p>

            {!beansJoined ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="font-semibold">Red beans: {redBeans}/5</p>
                  <div className="flex gap-2 justify-center min-h-[48px]">
                    {Array.from({ length: redBeans }).map((_, i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-sm">{i + 1}</div>
                    ))}
                  </div>
                  <Button onClick={() => redBeans < 5 && setRedBeans((r) => r + 1)} disabled={redBeans >= 5} size="sm">
                    Add Red Bean
                  </Button>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold">White beans: {whiteBeans}/4</p>
                  <div className="flex gap-2 justify-center min-h-[48px]">
                    {Array.from({ length: whiteBeans }).map((_, i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-amber-100 border-2 border-amber-300 flex items-center justify-center font-bold text-sm">{i + 1}</div>
                    ))}
                  </div>
                  <Button onClick={() => whiteBeans < 4 && setWhiteBeans((w) => w + 1)} disabled={whiteBeans >= 4 || redBeans < 5} size="sm">
                    Add White Bean
                  </Button>
                </div>
                {redBeans >= 5 && whiteBeans >= 4 && (
                  <Button size="lg" onClick={() => setBeansJoined(true)}>Join the Lines!</Button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex gap-1 justify-center flex-wrap">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-sm">{i + 1}</div>
                  ))}
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-amber-100 border-2 border-amber-300 flex items-center justify-center font-bold text-sm">{i + 6}</div>
                  ))}
                </div>
                <p className="text-green-600 font-bold text-xl">5 + 4 = 9 beans! ✅</p>
                <Button onClick={nextPhase}>Continue <ArrowRight className="w-4 h-4 ml-1" /></Button>
              </div>
            )}
          </div>
        )}

        {/* APPLICATION */}
        {phase === "application" && (
          <div className="text-center space-y-6 w-full">
            <h2 className="text-2xl font-bold">📖 Counting Rhyme</h2>
            <div className="bg-card rounded-xl p-6 border shadow-sm space-y-3 text-left max-w-md mx-auto">
              {rhymeLines.slice(0, rhymeStep + 1).map((line, i) => (
                <div key={i} className={`flex items-center gap-3 transition-all ${i === rhymeStep ? "text-lg font-bold" : "text-sm text-muted-foreground"}`}>
                  <span className="bg-primary text-primary-foreground rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold shrink-0">{line.num}</span>
                  <span>{line.text}</span>
                </div>
              ))}
            </div>
            {rhymeStep < rhymeLines.length - 1 ? (
              <Button size="lg" onClick={() => setRhymeStep((s) => s + 1)}>
                Next Line <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <div className="space-y-3">
                <p className="text-green-600 font-bold">
                  👏 Clap when you hear 9! We counted from 1 to 9!
                </p>
                <Button onClick={nextPhase}>Continue <ArrowRight className="w-4 h-4 ml-1" /></Button>
              </div>
            )}
          </div>
        )}

        {/* CONCEPT */}
        {phase === "concept" && step === 0 && (
          <div className="text-center space-y-6 w-full">
            <h2 className="text-2xl font-bold">🐌 Snails Playing Duck, Duck, Goose!</h2>
            <p className="text-muted-foreground">
              {!markedStart
                ? overCounted
                  ? "Oops! We went past 9! We need to mark where we started. Tap the first snail to mark it!"
                  : "Tap each snail to count them in the circle."
                : "Great! Now count from the marked snail. Tap each one!"}
            </p>

            {renderCircle(
              9,
              "🐌",
              snailsCounted,
              markedStart,
              (i) => {
                if (!markedStart && !overCounted) {
                  setSnailsCounted((c) => {
                    if (c >= 9) {
                      setOverCounted(true);
                      return 0;
                    }
                    return c + 1;
                  });
                } else if (overCounted && i === 0) {
                  setMarkedStart(true);
                  setOverCounted(false);
                  setSnailsCounted(0);
                } else if (markedStart && snailsCounted < 9) {
                  setSnailsCounted((c) => c + 1);
                }
              }
            )}

            <div className="text-3xl font-black text-primary">{snailsCounted}</div>

            {markedStart && snailsCounted >= 9 && (
              <div className="space-y-3">
                <p className="text-green-600 font-bold text-lg">
                  9 snails! Marking the start helped us know where to stop! ✅
                </p>
                <Button onClick={() => setStep(1)}>
                  Next: Snail Snack Table <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            )}
          </div>
        )}

        {phase === "concept" && step === 1 && (
          <div className="text-center space-y-6 w-full">
            <h2 className="text-2xl font-bold">🍽️ Snail Snack Table</h2>
            <p className="text-muted-foreground">
              The snails sit at a round table. Tap each plate to count — mark the first one!
            </p>

            {renderCircle(
              9,
              "🍽️",
              platesCounted,
              platesCounted > 0,
              () => {
                if (platesCounted < 9) setPlatesCounted((c) => c + 1);
              }
            )}

            <div className="text-3xl font-black text-primary">{platesCounted} plates</div>

            {platesCounted >= 9 && (
              <div className="space-y-3">
                <p className="text-green-600 font-bold">9 plates for 9 snails! How many snails are sitting? <strong>0</strong> — zero!</p>
                <Button onClick={() => setStep(2)}>
                  Practice Cards <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            )}
          </div>
        )}

        {phase === "concept" && step === 2 && (
          <div className="text-center space-y-6 w-full">
            <h2 className="text-2xl font-bold">🎴 Circular Counting Cards</h2>
            <p className="text-muted-foreground">
              Tap each {currentCard.label} to count. Then pick the matching numeral!
            </p>

            {renderCircle(
              currentCard.count,
              currentCard.emoji,
              practiceCount,
              practiceMarked || practiceCount > 0,
              () => {
                if (practiceCount < currentCard.count) {
                  setPracticeCount((c) => c + 1);
                  if (!practiceMarked) setPracticeMarked(true);
                }
              }
            )}

            {practiceCount >= currentCard.count && (
              <div className="space-y-3">
                <p className="font-semibold">Which numeral matches?</p>
                <div className="flex gap-2 justify-center flex-wrap">
                  {[5, 6, 7, 8, 9].map((n) => (
                    <Button
                      key={n}
                      variant={selectedNumeral === n ? (n === currentCard.count ? "default" : "destructive") : "outline"}
                      size="lg"
                      className="text-xl w-12 h-12"
                      onClick={() => setSelectedNumeral(n)}
                    >
                      {n}
                    </Button>
                  ))}
                </div>
                {selectedNumeral === currentCard.count && (
                  <p className="text-green-600 font-bold">
                    Correct! {currentCard.count} {currentCard.label}! ✅
                  </p>
                )}
              </div>
            )}

            <div className="flex gap-3 justify-center">
              {practiceCard < CIRCLE_CARDS.length - 1 && selectedNumeral === currentCard.count && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setPracticeCard((c) => c + 1);
                    setPracticeCount(0);
                    setPracticeMarked(false);
                    setSelectedNumeral(null);
                  }}
                >
                  Next Card <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              )}
              {(practiceCard >= CIRCLE_CARDS.length - 1 && selectedNumeral === currentCard.count) && (
                <Button onClick={nextPhase}>
                  Continue to Debrief <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              )}
            </div>
          </div>
        )}

        {/* DEBRIEF */}
        {phase === "debrief" && (
          <div className="text-center space-y-6 w-full">
            <h2 className="text-2xl font-bold">⭐ Lesson 27 Debrief</h2>
            <div className="bg-card rounded-xl p-6 border shadow-sm space-y-4 text-left max-w-md mx-auto">
              <p className="font-semibold">What did we learn?</p>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2"><Star className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />When counting in a <strong>circle</strong>, mark where you start!</li>
                <li className="flex gap-2"><Star className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />Stop counting when you get back to the marked object.</li>
                <li className="flex gap-2"><Star className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />We counted 5, 6, 7, 8, and 9 objects in circles.</li>
                <li className="flex gap-2"><Star className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />Do you prefer counting in a <strong>line</strong> or a <strong>circle</strong>?</li>
              </ul>
            </div>
            <div className="flex gap-3 justify-center pt-4">
              <Button variant="outline" onClick={() => { setPhase("fluency"); setStep(0); setClapCount(-1); setRedBeans(0); setWhiteBeans(0); setBeansJoined(false); setRhymeStep(0); setSnailsCounted(0); setMarkedStart(false); setOverCounted(false); setPlatesCounted(0); setPracticeCard(0); setPracticeCount(0); setPracticeMarked(false); setSelectedNumeral(null); }}>
                <RotateCcw className="w-4 h-4 mr-1" /> Restart
              </Button>
              <Button onClick={() => navigate("/learning")}>
                Back to Lessons <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CircularCount9Lesson27;

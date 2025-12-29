import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, RotateCcw, Star, Sparkles, Music, Pause, Volume2 } from "lucide-react";

interface Shape {
  id: string;
  type: "circle" | "rectangle" | "square" | "triangle";
  color: string;
}

const parkShapes = [
  { id: "sun", type: "circle", label: "Sun" },
  { id: "tree", type: "triangle", label: "Tree" },
  { id: "house", type: "rectangle", label: "House" },
  { id: "window", type: "square", label: "Window" },
  { id: "seesaw", type: "rectangle", label: "Seesaw" },
  { id: "swing", type: "triangle", label: "Swing" },
  { id: "slide", type: "rectangle", label: "Slide" },
  { id: "ball", type: "circle", label: "Ball" },
];

const floorShapes: Shape[] = [
  { id: "f1", type: "circle", color: "#f59e0b" },
  { id: "f2", type: "rectangle", color: "#3b82f6" },
  { id: "f3", type: "square", color: "#ef4444" },
  { id: "f4", type: "triangle", color: "#10b981" },
  { id: "f5", type: "circle", color: "#f59e0b" },
  { id: "f6", type: "rectangle", color: "#3b82f6" },
  { id: "f7", type: "square", color: "#ef4444" },
  { id: "f8", type: "triangle", color: "#10b981" },
  { id: "f9", type: "circle", color: "#f59e0b" },
];

const UnderstandShapes5 = () => {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [poppedFingers, setPoppedFingers] = useState(0);
  const [beanCounts, setBeanCounts] = useState({ triangle: 3, rectangle: 4 });
  const [selectedShapeForBeans, setSelectedShapeForBeans] = useState<"triangle" | "rectangle" | null>(null);
  const [mysteryGuess, setMysteryGuess] = useState<string>("");
  const [partnerTurn, setPartnerTurn] = useState<"student1" | "student2">("student1");
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [frozenShape, setFrozenShape] = useState<Shape | null>(null);
  const [lastInstruction, setLastInstruction] = useState("");
  const [animalX, setAnimalX] = useState(50);
  const [animalY, setAnimalY] = useState(50);
  const [parkTalk, setParkTalk] = useState("");
  const [showCelebration, setShowCelebration] = useState(false);
  const [score, setScore] = useState(0);

  const activities = [
    { title: "Pop Up Fingers", icon: "✋" },
    { title: "Count the Corners", icon: "🔺" },
    { title: "Mystery Bag Touch", icon: "🎒" },
    { title: "Shape Walk Game", icon: "🎶" },
    { title: "Park Walk", icon: "🏞️" },
    { title: "Let's Talk!", icon: "💬" },
    { title: "Great Job!", icon: "⭐" },
  ];

  const instructions = [
    "Everyone, touch a circle with your foot!",
    "If you have a square, hold it up!",
    "This shape has 3 corners—sit down!",
    "Find a rectangle and freeze!",
    "The shape with no corners—jump once!",
    "If you're next to a triangle, clap!",
  ];

  const canProceed = () => {
    switch (currentActivity) {
      case 0: return poppedFingers >= 3;
      case 1: return beanCounts.triangle === 3 && beanCounts.rectangle === 4;
      case 2: return mysteryGuess !== "";
      case 3: return frozenShape !== null;
      case 4: return parkTalk.length > 10;
      case 5: return true;
      default: return true;
    }
  };

  const nextActivity = () => {
    if (currentActivity < activities.length - 1) {
      setCurrentActivity(currentActivity + 1);
      setScore(score + 10);
    }
  };

  const prevActivity = () => {
    if (currentActivity > 0) setCurrentActivity(currentActivity - 1);
  };

  const resetLesson = () => {
    setCurrentActivity(0);
    setPoppedFingers(0);
    setBeanCounts({ triangle: 3, rectangle: 4 });
    setMysteryGuess("");
    setPartnerTurn("student1");
    setMusicPlaying(false);
    setFrozenShape(null);
    setLastInstruction("");
    setAnimalX(50);
    setAnimalY(50);
    setParkTalk("");
    setShowCelebration(false);
    setScore(0);
  };

  const renderActivity = () => {
    switch (currentActivity) {
      case 0: // Pop Up Fingers
        return (
          <div className="text-center space-y-8">
            <div className="text-6xl mb-4">✋</div>
            <h2 className="text-3xl font-bold">Pop Up Fingers the Math Way!</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start with no fingers up. We'll pop up 1, then 2, then 3 fingers from left to right!
            </p>
            <div className="flex justify-center gap-4 my-12">
              {[1, 2, 3].map(num => (
                <Button
                  key={num}
                  size="lg"
                  onClick={() => setPoppedFingers(num)}
                  className={`text-4xl px-12 py-16 ${poppedFingers >= num ? "bg-green-500" : "bg-blue-500"}`}
                >
                  Pop Up {num}!
                </Button>
              ))}
            </div>
            <div className="text-6xl">
              {"👎👎👎👎👎".substring(0, 5 - poppedFingers) + "👍".repeat(poppedFingers)}
            </div>
            {poppedFingers === 3 && (
              <p className="text-2xl text-green-600 font-bold">Amazing! You popped up 1, 2, and 3!</p>
            )}
          </div>
        );

      case 1: // Count the Corners
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center">Count the Corners with Beans!</h2>
            <p className="text-xl text-center text-muted-foreground">Tap a shape, then add or remove beans</p>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className={`cursor-pointer transition-all ${selectedShapeForBeans === "triangle" ? "ring-4 ring-green-400" : ""}`}
                onClick={() => setSelectedShapeForBeans("triangle")}>
                <CardContent className="p-8 text-center">
                  <div className="relative inline-block">
                    <div style={{ width: 0, height: 0, borderLeft: "80px solid transparent", borderRight: "80px solid transparent", borderBottom: "140px solid #10b981" }} />
                    {[...Array(beanCounts.triangle)].map((_, i) => (
                      <div key={i} className="absolute w-8 h-8 bg-yellow-400 rounded-full border-2 border-yellow-600"
                        style={{
                          top: i === 0 ? "10px" : i === 1 ? "120px" : "65px",
                          left: i === 0 ? "65px" : i === 1 ? "65px" : "10px",
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-2xl font-bold mt-4">Triangle: {beanCounts.triangle} corners</p>
                </CardContent>
              </Card>

              <Card className={`cursor-pointer transition-all ${selectedShapeForBeans === "rectangle" ? "ring-4 ring-blue-400" : ""}`}
                onClick={() => setSelectedShapeForBeans("rectangle")}>
                <CardContent className="p-8 text-center">
                  <div className="relative inline-block">
                    <div className="w-48 h-32 bg-blue-500 border-8 border-blue-700 rounded-lg" />
                    {[...Array(beanCounts.rectangle)].map((_, i) => (
                      <div key={i} className="absolute w-8 h-8 bg-yellow-400 rounded-full border-2 border-yellow-600"
                        style={{
                          top: i < 2 ? "-12px" : "calc(100% - 12px)",
                          left: i % 2 === 0 ? "-12px" : "calc(100% - 12px)",
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-2xl font-bold mt-4">Rectangle: {beanCounts.rectangle} corners</p>
                </CardContent>
              </Card>
            </div>
            {selectedShapeForBeans && (
              <div className="flex justify-center gap-4">
                <Button size="lg" onClick={() => setBeanCounts(prev => ({
                  ...prev,
                  [selectedShapeForBeans]: Math.max(0, prev[selectedShapeForBeans] - 1)
                }))}>Remove 1 Bean</Button>
                <Button size="lg" onClick={() => setBeanCounts(prev => ({
                  ...prev,
                  [selectedShapeForBeans]: Math.min(selectedShapeForBeans === "triangle" ? 3 : 4, prev[selectedShapeForBeans] + 1)
                }))}>Add 1 Bean</Button>
              </div>
            )}
          </div>
        );

      case 2: // Mystery Bag Touch
        return (
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold">Mystery Bag Touch Game!</h2>
            <p className="text-xl">Feel the shape without looking. What do you feel?</p>
            <div className="text-8xl my-8">
              {partnerTurn === "student1" ? "🔺" : "⭕"}
            </div>
            <p className="text-2xl font-bold text-purple-600">
              {partnerTurn === "student1" ? "Partner 1" : "Partner 2"}'s turn!
            </p>
            <div className="flex justify-center gap-6 flex-wrap max-w-2xl mx-auto">
              {["circle", "triangle", "rectangle", "square"].map(shape => (
                <Button
                  key={shape}
                  size="lg"
                  variant={mysteryGuess === shape ? "default" : "outline"}
                  onClick={() => setMysteryGuess(shape)}
                  className="text-xl px-8 py-6"
                >
                  {shape === "circle" && "⭕ Circle"}
                  {shape === "triangle" && "🔺 Triangle"}
                  {shape === "rectangle" && "▭ Rectangle"}
                  {shape === "square" && "▢ Square"}
                </Button>
              ))}
            </div>
            {mysteryGuess && (
              <div>
                <p className="text-2xl text-green-600 font-bold">
                  You guessed a {mysteryGuess}! 
                  {((partnerTurn === "student1" && mysteryGuess === "triangle") || 
                    (partnerTurn === "student2" && mysteryGuess === "circle")) 
                    ? " Correct!" : " Let's try the other partner!"}
                </p>
                <Button size="lg" onClick={() => setPartnerTurn(partnerTurn === "student1" ? "student2" : "student1")}>
                  Switch Partner
                </Button>
              </div>
            )}
          </div>
        );

      case 3: // Shape Walk Game
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center">Shape Walk Game!</h2>
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 min-h-96 relative overflow-hidden">
              <div className="grid grid-cols-3 gap-8">
                {floorShapes.map(shape => (
                  <div
                    key={shape.id}
                    className={`cursor-pointer transition-all ${frozenShape?.id === shape.id ? "ring-8 ring-purple-500 scale-125" : "hover:scale-110"}`}
                    onClick={() => setFrozenShape(shape)}
                  >
                    {shape.type === "circle" && <div className="w-32 h-32 rounded-full border-8 border-orange-600" style={{ backgroundColor: shape.color }} />}
                    {shape.type === "rectangle" && <div className="w-40 h-24 rounded-lg border-8 border-blue-700" style={{ backgroundColor: shape.color }} />}
                    {shape.type === "square" && <div className="w-32 h-32 rounded-lg border-8 border-red-700" style={{ backgroundColor: shape.color }} />}
                    {shape.type === "triangle" && 
                      <div style={{ width: 0, height: 0, borderLeft: "60px solid transparent", borderRight: "60px solid transparent", borderBottom: "100px solid " + shape.color }} />}
                  </div>
                ))}
              </div>
              <div className="absolute top-4 left-1/2 -translate-x-1/2 text-6xl animate-bounce">👟</div>
            </div>
            <div className="text-center space-y-4">
              <Button
                size="lg"
                onClick={() => setMusicPlaying(!musicPlaying)}
                className="text-2xl px-12 py-8"
              >
                {musicPlaying ? <Pause className="mr-2" /> : <Music className="mr-2" />}
                {musicPlaying ? "Stop Music" : "Play Music"}
              </Button>
              {!musicPlaying && frozenShape && (
                <div>
                  <p className="text-2xl font-bold mb-4">
                    Freeze! You're on a {frozenShape.type}!
                  </p>
                  <p className="text-xl text-purple-600 font-medium mb-4">
                    {instructions[Math.floor(Math.random() * instructions.length)]}
                  </p>
                  <p className="text-3xl">🎶 Circle, rectangle, triangle, square. You can find shapes everywhere! 🎶</p>
                </div>
              )}
            </div>
          </div>
        );

      case 4: // Park Walk
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center">Take Your Friend to the Park!</h2>
            <p className="text-xl text-center">Move your animal around the park. Talk about the shapes!</p>
            <div className="relative bg-gradient-to-br from-sky-100 to grass-100 rounded-2xl p-8 min-h-96 overflow-hidden border-4 border-green-300">
              {/* Park Scene */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 text-9xl">☀️</div>
              <div className="absolute top-32 left-20 text-8xl">🌳</div>
              <div className="absolute bottom-20 left-32 w-48 h-40 bg-orange-500 rounded-lg border-8 border-orange-700"></div>
              <div className="absolute bottom-32 left-48 w-20 h-20 bg-blue-400 border-4 border-blue-600"></div>
              <div className="absolute top-1/2 right-32 w-60 h-8 bg-purple-600"></div>
              <div className="absolute top-1/2 right-48 transform rotate-45 origin-bottom-left" style={{ width: 0, height: 0, borderLeft: "30px solid transparent", borderRight: "30px solid transparent", borderBottom: "80px solid #10b981" }}></div>
              <div className="absolute bottom-24 left-1/2 text-6xl">🛝</div>
              <div className="absolute bottom-32 right-40 text-6xl">⚽</div>

              {/* Movable Animal */}
              <div
                className="absolute text-6xl cursor-move transition-all duration-300"
                style={{ left: `${animalX}%`, top: `${animalY}%`, transform: "translate(-50%, -50%)" }}
                onMouseDown={(e) => {
                  const startX = e.clientX;
                  const startY = e.clientY;
                  const handleMove = (e: MouseEvent) => {
                    setAnimalX(animalX + (e.clientX - startX) / 10);
                    setAnimalY(animalY + (e.clientY - startY) / 10);
                  };
                  window.addEventListener("mousemove", handleMove);
                  window.addEventListener("mouseup", () => window.removeEventListener("mousemove", handleMove), { once: true });
                }}
              >
                🐶
              </div>
            </div>
            <div className="max-w-2xl mx-auto">
              <textarea
                placeholder="Tell your partner: What shape is your dog on? What is next to it? Above it?"
                className="w-full p-4 text-lg rounded-lg border-2 border-purple-300"
                rows={4}
                value={parkTalk}
                onChange={(e) => setParkTalk(e.target.value)}
              />
            </div>
          </div>
        );

      case 5: // Debrief
        return (
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold">Let's Talk About the Park!</h2>
            <div className="space-y-6 text-xl max-w-3xl mx-auto">
              <p>🌞 Where do you see circles in the park?</p>
              <p>🔺 Where are the triangles?</p>
              <p>🟦 What is the same about the seesaw and the swing set? What is different?</p>
              <p className="text-2xl font-bold text-purple-600">
                Ask me a question using above, next to, or in front of!
              </p>
            </div>
            <div className="bg-green-50 rounded-xl p-8 text-2xl font-medium">
              Example: "What is next to the park sign?"
            </div>
          </div>
        );

      case 6: // Celebration
        return (
          <div className="text-center space-y-6">
            <div className="text-8xl animate-bounce">🎉</div>
            <h2 className="text-4xl font-bold text-green-600">Fantastic Shape Explorer!</h2>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} className="w-12 h-12 text-yellow-500 fill-yellow-500 animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>
            <div className="space-y-3 text-xl">
              <p>You popped fingers, counted corners, felt mystery shapes,</p>
              <p>played Shape Walk, and talked about the park!</p>
              <p className="text-3xl font-bold text-purple-600">Final Score: {score} points! 🌟</p>
            </div>
            <div className="flex justify-center gap-6 mt-12">
              <Button onClick={resetLesson} variant="outline" size="lg" className="gap-2">
                <RotateCcw className="w-5 h-5" /> Try Again
              </Button>
              <Link to="/activities">
                <Button size="lg" className="gap-2 bg-green-600 hover:bg-green-700">
                  <Sparkles className="w-5 h-5" /> All Activities
                </Button>
              </Link>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-yellow-50 to-green-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-border py-4 px-6 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/activities">
              <Button variant="outline" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="font-bold text-2xl text-foreground">Lesson 5: All About Shapes!</h1>
              <p className="text-sm text-muted-foreground">Identify, Sort, Compare & Position Circles, Rectangles, Squares & Triangles</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={resetLesson}>
            <RotateCcw className="w-4 h-4 mr-1" /> Reset
          </Button>
        </div>
      </header>

      <div className="bg-white/50 border-b border-border py-3 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between gap-2">
            {activities.map((activity, index) => (
              <div
                key={index}
                className={`flex-1 text-center p-3 rounded-lg transition-all text-sm md:text-base ${
                  index === currentActivity
                    ? "bg-primary text-primary-foreground"
                    : index < currentActivity
                    ? "bg-green-100 text-green-700"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <span className="text-2xl md:text-3xl block mb-1">{activity.icon}</span>
                <span className="hidden md:block">{activity.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <Card className="p-6 md:p-10 shadow-2xl">
          {renderActivity()}
        </Card>

        {currentActivity < activities.length - 1 && (
          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={prevActivity} disabled={currentActivity === 0} size="lg" className="gap-2">
              <ArrowLeft className="w-5 h-5" /> Back
            </Button>
            <Button
              onClick={nextActivity}
              disabled={!canProceed()}
              size="lg"
              className="gap-2 bg-primary hover:bg-primary/90"
            >
              Next <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default UnderstandShapes5;
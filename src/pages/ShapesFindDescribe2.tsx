import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, RotateCcw, Volume2, Star, Sparkles, Hand } from "lucide-react";
import { toast } from "sonner";

type LessonPhase = 
  | "intro"
  | "fluency-fingers"
  | "fluency-farmer"
  | "application"
  | "concept-mystery"
  | "concept-hunt"
  | "concept-sort"
  | "debrief"
  | "complete";

interface Shape {
  id: string;
  type: "circle" | "triangle" | "rectangle" | "square";
  color: string;
  sides: number;
  corners: number;
  rotation?: number;
}

const SHAPES: Shape[] = [
  { id: "t1", type: "triangle", color: "#FF6B6B", sides: 3, corners: 3, rotation: 0 },
  { id: "t2", type: "triangle", color: "#4ECDC4", sides: 3, corners: 3, rotation: 45 },
  { id: "r1", type: "rectangle", color: "#45B7D1", sides: 4, corners: 4, rotation: 0 },
  { id: "r2", type: "rectangle", color: "#96CEB4", sides: 4, corners: 4, rotation: 15 },
  { id: "s1", type: "square", color: "#DDA0DD", sides: 4, corners: 4, rotation: 45 },
  { id: "c1", type: "circle", color: "#FFD93D", sides: 0, corners: 0 },
  { id: "c2", type: "circle", color: "#FF8C42", sides: 0, corners: 0 },
];

const CLASSROOM_ITEMS = [
  { name: "Clock", shape: "circle", emoji: "🕐" },
  { name: "Door", shape: "rectangle", emoji: "🚪" },
  { name: "Book", shape: "rectangle", emoji: "📕" },
  { name: "Window", shape: "square", emoji: "🪟" },
  { name: "Pizza slice", shape: "triangle", emoji: "🍕" },
  { name: "Ball", shape: "circle", emoji: "⚽" },
  { name: "Tablet", shape: "rectangle", emoji: "📱" },
  { name: "Yield sign", shape: "triangle", emoji: "⚠️" },
];

const ShapesFindDescribe = () => {
  const [phase, setPhase] = useState<LessonPhase>("intro");
  const [fingerCount, setFingerCount] = useState(0);
  const [appleCount, setAppleCount] = useState(5);
  const [mysteryBagIndex, setMysteryBagIndex] = useState(0);
  const [revealedShapes, setRevealedShapes] = useState<Shape[]>([]);
  const [selectedHuntItem, setSelectedHuntItem] = useState<number | null>(null);
  const [sortedShapes, setSortedShapes] = useState<{[key: string]: Shape[]}>({
    triangles: [],
    rectangles: [],
    circles: []
  });
  const [shapesToSort, setShapesToSort] = useState<Shape[]>([...SHAPES]);
  const [draggedShape, setDraggedShape] = useState<Shape | null>(null);
  const [starsEarned, setStarsEarned] = useState(0);
  const [countingMode, setCountingMode] = useState<"piano" | "bear">("piano");

  const getProgress = () => {
    const phases: LessonPhase[] = [
      "intro", "fluency-fingers", "fluency-farmer", "application",
      "concept-mystery", "concept-hunt", "concept-sort", "debrief", "complete"
    ];
    return ((phases.indexOf(phase) + 1) / phases.length) * 100;
  };

  const handleFingerTap = () => {
    if (fingerCount < 5) {
      const newCount = fingerCount + 1;
      setFingerCount(newCount);
      // Play a soft sound effect (visual feedback for now)
      toast.success(`${newCount}!`, { duration: 500 });
    }
  };

  const handleAppleEat = () => {
    if (appleCount > 0) {
      setAppleCount(appleCount - 1);
      toast.success(`Yum! ${appleCount - 1} apples left!`, { duration: 1000 });
    }
  };

  const handleRevealShape = () => {
    if (mysteryBagIndex < SHAPES.length) {
      const newShape = SHAPES[mysteryBagIndex];
      setRevealedShapes([...revealedShapes, newShape]);
      setMysteryBagIndex(mysteryBagIndex + 1);
      toast.success(`Found a shape with ${newShape.sides} sides and ${newShape.corners} corners!`);
    }
  };

  const handleShapeDrop = (category: "triangles" | "rectangles" | "circles") => {
    if (draggedShape) {
      let isCorrect = false;
      if (category === "triangles" && draggedShape.type === "triangle") isCorrect = true;
      if (category === "rectangles" && (draggedShape.type === "rectangle" || draggedShape.type === "square")) isCorrect = true;
      if (category === "circles" && draggedShape.type === "circle") isCorrect = true;

      if (isCorrect) {
        setSortedShapes({
          ...sortedShapes,
          [category]: [...sortedShapes[category], draggedShape]
        });
        setShapesToSort(shapesToSort.filter(s => s.id !== draggedShape.id));
        setStarsEarned(starsEarned + 1);
        toast.success("Great job! That's the right group!");
      } else {
        toast.error("Try again! Count the sides and corners.");
      }
      setDraggedShape(null);
    }
  };

  const handleShapeClick = (shape: Shape) => {
    setDraggedShape(draggedShape?.id === shape.id ? null : shape);
  };

  const saveProgress = () => {
    const saved = localStorage.getItem('ethiostem-completed-lessons');
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes(101)) { // 101 for Module 2, Lesson 1
      completed.push(101);
      localStorage.setItem('ethiostem-completed-lessons', JSON.stringify(completed));
    }
  };

  useEffect(() => {
    if (phase === "complete") {
      saveProgress();
    }
  }, [phase]);

  const renderShape = (shape: Shape, size: number = 60) => {
    const style = { transform: `rotate(${shape.rotation || 0}deg)` };
    
    if (shape.type === "circle") {
      return (
        <div 
          className="rounded-full transition-all duration-300"
          style={{ 
            width: size, 
            height: size, 
            backgroundColor: shape.color,
            ...style
          }}
        />
      );
    }
    
    if (shape.type === "triangle") {
      return (
        <div 
          style={{
            width: 0,
            height: 0,
            borderLeft: `${size/2}px solid transparent`,
            borderRight: `${size/2}px solid transparent`,
            borderBottom: `${size}px solid ${shape.color}`,
            ...style
          }}
        />
      );
    }
    
    if (shape.type === "square") {
      return (
        <div 
          className="transition-all duration-300"
          style={{ 
            width: size, 
            height: size, 
            backgroundColor: shape.color,
            ...style
          }}
        />
      );
    }
    
    // Rectangle
    return (
      <div 
        className="transition-all duration-300"
        style={{ 
          width: size * 1.5, 
          height: size * 0.8, 
          backgroundColor: shape.color,
          ...style
        }}
      />
    );
  };

  const renderIntro = () => (
    <div className="text-center space-y-8 animate-fade-in">
      <div className="text-8xl mb-6">🔷🔶🔺⭕</div>
      <h2 className="text-3xl font-bold text-foreground">
        Module 2: Shapes
      </h2>
      <h3 className="text-xl text-muted-foreground">
        Lesson 1: Find and Describe Shapes
      </h3>
      <p className="text-lg text-muted-foreground max-w-xl mx-auto">
        Today we'll discover shapes all around us! We'll learn to describe them 
        by counting their <strong>sides</strong> and <strong>corners</strong>.
      </p>
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
          <span className="text-2xl">📐</span>
          <span>Count sides</span>
        </div>
        <div className="flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full">
          <span className="text-2xl">📍</span>
          <span>Count corners</span>
        </div>
        <div className="flex items-center gap-2 bg-success/10 px-4 py-2 rounded-full">
          <span className="text-2xl">🔍</span>
          <span>Find shapes</span>
        </div>
      </div>
      <Button 
        size="lg" 
        onClick={() => setPhase("fluency-fingers")}
        className="mt-8 text-xl px-8 py-6"
      >
        Let's Start! <ArrowRight className="ml-2" />
      </Button>
    </div>
  );

  const renderFluencyFingers = () => (
    <div className="text-center space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground">
        🎹 Counting on Fingers
      </h2>
      <p className="text-muted-foreground">
        Let's warm up by counting to 5! Tap the {countingMode === "piano" ? "piano keys" : "bear paws"}.
      </p>
      
      <div className="flex justify-center gap-4 mb-4">
        <Button 
          variant={countingMode === "piano" ? "default" : "outline"}
          onClick={() => { setCountingMode("piano"); setFingerCount(0); }}
        >
          🎹 Piano Keys
        </Button>
        <Button 
          variant={countingMode === "bear" ? "default" : "outline"}
          onClick={() => { setCountingMode("bear"); setFingerCount(0); }}
        >
          🐻 Bear Den
        </Button>
      </div>

      <div className="flex justify-center gap-2">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            onClick={handleFingerTap}
            disabled={fingerCount >= num}
            className={`
              w-16 h-24 rounded-lg text-2xl font-bold transition-all duration-300
              ${countingMode === "piano" 
                ? "bg-white border-2 border-gray-800 hover:bg-gray-100" 
                : "bg-amber-700 rounded-full hover:bg-amber-600"
              }
              ${fingerCount >= num 
                ? countingMode === "piano" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-amber-400"
                : ""
              }
              ${fingerCount < num - 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:scale-105"}
            `}
          >
            {fingerCount >= num ? num : countingMode === "piano" ? "🎵" : "🐾"}
          </button>
        ))}
      </div>

      <div className="text-6xl font-bold text-primary">
        {fingerCount > 0 ? fingerCount : "..."}
      </div>

      {fingerCount === 5 && (
        <div className="animate-bounce">
          <p className="text-xl text-success font-bold">🎉 You counted to 5!</p>
          <Button 
            onClick={() => { setFingerCount(0); setPhase("fluency-farmer"); }}
            className="mt-4"
          >
            Continue <ArrowRight className="ml-2" />
          </Button>
        </div>
      )}

      {fingerCount > 0 && fingerCount < 5 && (
        <Button 
          variant="ghost" 
          onClick={() => setFingerCount(0)}
          className="text-muted-foreground"
        >
          <RotateCcw className="mr-2 h-4 w-4" /> Start Over
        </Button>
      )}
    </div>
  );

  const renderFluencyFarmer = () => (
    <div className="text-center space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground">
        🌳 Farmer Brown's Apple Tree
      </h2>
      <p className="text-muted-foreground">
        Farmer Brown is eating apples! Click an apple to eat it.
      </p>
      
      <div className="relative w-64 h-64 mx-auto">
        {/* Tree */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-20 bg-amber-800 rounded" />
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-green-600 rounded-full" />
        
        {/* Apples */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-2 w-40">
          {Array.from({ length: appleCount }).map((_, i) => (
            <button
              key={i}
              onClick={handleAppleEat}
              className="text-4xl hover:scale-125 transition-transform cursor-pointer animate-pulse"
            >
              🍎
            </button>
          ))}
        </div>
      </div>

      <div className="bg-muted rounded-xl p-4 max-w-md mx-auto">
        <p className="text-lg">
          🎵 Farmer Brown had <strong className="text-2xl text-primary">{appleCount}</strong> green apples 
          hanging on the tree! 🎵
        </p>
        {appleCount > 0 && (
          <p className="text-sm text-muted-foreground mt-2">
            Then he took 1 apple and ate it greedily...
          </p>
        )}
      </div>

      {appleCount === 0 && (
        <div className="animate-bounce">
          <p className="text-xl text-success font-bold">🎉 All done! No more apples!</p>
          <Button 
            onClick={() => { setAppleCount(5); setPhase("application"); }}
            className="mt-4"
          >
            Continue <ArrowRight className="ml-2" />
          </Button>
        </div>
      )}
    </div>
  );

  const renderApplication = () => (
    <div className="text-center space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground">
        👜 Counting Shape Bags
      </h2>
      <p className="text-muted-foreground">
        Three teachers brought bags of shapes. Let's count how many shapes each teacher brought!
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
        {/* Bag 1: 5 Circles */}
        <Card className="p-4 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Teacher 1's Bag</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="w-8 h-8 rounded-full bg-yellow-400" />
              ))}
            </div>
            <p className="text-3xl font-bold text-primary">5 shapes</p>
            <p className="text-sm text-muted-foreground">Round with no corners!</p>
          </CardContent>
        </Card>

        {/* Bag 2: 3 Triangles */}
        <Card className="p-4 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Teacher 2's Bag</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {[1,2,3].map(i => (
                <div 
                  key={i} 
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: '16px solid transparent',
                    borderRight: '16px solid transparent',
                    borderBottom: '28px solid #FF6B6B',
                  }}
                />
              ))}
            </div>
            <p className="text-3xl font-bold text-primary">3 shapes</p>
            <p className="text-sm text-muted-foreground">3 sides and 3 corners!</p>
          </CardContent>
        </Card>

        {/* Bag 3: 4 Rectangles */}
        <Card className="p-4 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Teacher 3's Bag</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-10 h-6 bg-blue-400" />
              ))}
            </div>
            <p className="text-3xl font-bold text-primary">4 shapes</p>
            <p className="text-sm text-muted-foreground">4 sides and 4 corners!</p>
          </CardContent>
        </Card>
      </div>

      <Button 
        onClick={() => setPhase("concept-mystery")}
        className="mt-6"
        size="lg"
      >
        Open the Mystery Bag! <Sparkles className="ml-2" />
      </Button>
    </div>
  );

  const renderConceptMystery = () => (
    <div className="text-center space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground">
        🎁 Mystery Shape Bag
      </h2>
      <p className="text-muted-foreground">
        Let's see what shapes are hiding in the mystery bag!
      </p>
      
      <div className="flex justify-center mb-6">
        <button
          onClick={handleRevealShape}
          disabled={mysteryBagIndex >= SHAPES.length}
          className={`
            text-8xl transition-all duration-300 hover:scale-110
            ${mysteryBagIndex >= SHAPES.length ? "opacity-50" : "animate-pulse cursor-pointer"}
          `}
        >
          🎒
        </button>
      </div>

      {mysteryBagIndex < SHAPES.length && (
        <p className="text-lg text-muted-foreground">
          Tap the bag to reveal a shape! ({SHAPES.length - mysteryBagIndex} left)
        </p>
      )}

      {revealedShapes.length > 0 && (
        <div className="bg-muted rounded-xl p-6 max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold mb-4">Shapes We Found:</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {revealedShapes.map((shape, index) => (
              <div 
                key={index}
                className="flex flex-col items-center gap-2 p-4 bg-background rounded-lg shadow animate-scale-in"
              >
                {renderShape(shape, 50)}
                <span className="text-sm text-muted-foreground">
                  {shape.sides} sides, {shape.corners} corners
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {mysteryBagIndex >= SHAPES.length && (
        <div className="space-y-4">
          <p className="text-xl text-success font-bold">🎉 We found all the shapes!</p>
          <Button 
            onClick={() => setPhase("concept-hunt")}
            size="lg"
          >
            Go on a Shape Hunt! <ArrowRight className="ml-2" />
          </Button>
        </div>
      )}
    </div>
  );

  const renderConceptHunt = () => (
    <div className="text-center space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground">
        🔍 Shape Hunt!
      </h2>
      <p className="text-muted-foreground">
        Can you find these shapes in the classroom? Tap an item to see its shape!
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
        {CLASSROOM_ITEMS.map((item, index) => (
          <button
            key={index}
            onClick={() => setSelectedHuntItem(selectedHuntItem === index ? null : index)}
            className={`
              p-4 rounded-xl transition-all duration-300 hover:scale-105
              ${selectedHuntItem === index 
                ? "bg-primary text-primary-foreground shadow-lg" 
                : "bg-muted hover:bg-muted/80"
              }
            `}
          >
            <div className="text-4xl mb-2">{item.emoji}</div>
            <p className="font-medium">{item.name}</p>
            {selectedHuntItem === index && (
              <p className="text-sm mt-2 animate-fade-in">
                This is shaped like a <strong>{item.shape}</strong>!
              </p>
            )}
          </button>
        ))}
      </div>

      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6 max-w-lg mx-auto">
        <h3 className="font-semibold mb-2">💡 What do you notice?</h3>
        <p className="text-muted-foreground">
          Shapes are everywhere! A clock is <strong>round</strong> like a circle. 
          A door has <strong>4 sides</strong> like a rectangle!
        </p>
      </div>

      <Button 
        onClick={() => setPhase("concept-sort")}
        size="lg"
      >
        Now Let's Sort Shapes! <ArrowRight className="ml-2" />
      </Button>
    </div>
  );

  const renderConceptSort = () => {
    const allSorted = shapesToSort.length === 0;

    return (
      <div className="text-center space-y-6 animate-fade-in">
        <h2 className="text-2xl font-bold text-foreground">
          📦 Shape Sorting Game
        </h2>
        <p className="text-muted-foreground">
          Tap a shape, then tap the box where it belongs!
        </p>
        
        {/* Shapes to sort */}
        <div className="bg-muted rounded-xl p-4 min-h-[120px]">
          <h3 className="text-sm font-semibold mb-3">Shapes to Sort:</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {shapesToSort.map((shape) => (
              <button
                key={shape.id}
                onClick={() => handleShapeClick(shape)}
                className={`
                  p-3 rounded-lg transition-all duration-300 cursor-pointer
                  ${draggedShape?.id === shape.id 
                    ? "ring-4 ring-primary scale-110 bg-primary/20" 
                    : "hover:scale-105 bg-background"
                  }
                `}
              >
                {renderShape(shape, 50)}
              </button>
            ))}
          </div>
          {shapesToSort.length === 0 && (
            <p className="text-muted-foreground">All shapes sorted! 🎉</p>
          )}
        </div>

        {/* Sorting bins */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {/* Triangles bin */}
          <button
            onClick={() => handleShapeDrop("triangles")}
            className={`
              p-4 rounded-xl border-2 border-dashed transition-all min-h-[150px]
              ${draggedShape ? "border-primary bg-primary/10 hover:bg-primary/20" : "border-muted-foreground/30"}
            `}
          >
            <div className="flex justify-center mb-2">
              <div style={{
                width: 0,
                height: 0,
                borderLeft: '20px solid transparent',
                borderRight: '20px solid transparent',
                borderBottom: '35px solid #FF6B6B',
              }} />
            </div>
            <p className="font-semibold">3 Sides, 3 Corners</p>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {sortedShapes.triangles.map((s, i) => (
                <div key={i}>{renderShape(s, 30)}</div>
              ))}
            </div>
          </button>

          {/* Rectangles bin */}
          <button
            onClick={() => handleShapeDrop("rectangles")}
            className={`
              p-4 rounded-xl border-2 border-dashed transition-all min-h-[150px]
              ${draggedShape ? "border-primary bg-primary/10 hover:bg-primary/20" : "border-muted-foreground/30"}
            `}
          >
            <div className="flex justify-center mb-2">
              <div className="w-10 h-7 bg-blue-400" />
            </div>
            <p className="font-semibold">4 Sides, 4 Corners</p>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {sortedShapes.rectangles.map((s, i) => (
                <div key={i}>{renderShape(s, 30)}</div>
              ))}
            </div>
          </button>

          {/* Circles bin */}
          <button
            onClick={() => handleShapeDrop("circles")}
            className={`
              p-4 rounded-xl border-2 border-dashed transition-all min-h-[150px]
              ${draggedShape ? "border-primary bg-primary/10 hover:bg-primary/20" : "border-muted-foreground/30"}
            `}
          >
            <div className="flex justify-center mb-2">
              <div className="w-9 h-9 rounded-full bg-yellow-400" />
            </div>
            <p className="font-semibold">No Sides, No Corners</p>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {sortedShapes.circles.map((s, i) => (
                <div key={i}>{renderShape(s, 30)}</div>
              ))}
            </div>
          </button>
        </div>

        <div className="flex items-center justify-center gap-2">
          <Star className="text-yellow-500" />
          <span className="font-bold">{starsEarned} Stars Earned!</span>
        </div>

        {allSorted && (
          <Button 
            onClick={() => setPhase("debrief")}
            size="lg"
            className="animate-bounce"
          >
            Time to Review! <ArrowRight className="ml-2" />
          </Button>
        )}
      </div>
    );
  };

  const renderDebrief = () => (
    <div className="text-center space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground">
        🎓 What Did We Learn?
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        <Card className="p-4 text-left">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="text-2xl">🔍</span> Shape Hunt
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We found shapes all around us! Clocks are round like circles, 
              doors are shaped like rectangles.
            </p>
          </CardContent>
        </Card>

        <Card className="p-4 text-left">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="text-2xl">📐</span> Counting Sides
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Triangles have 3 sides. Rectangles and squares have 4 sides. 
              Circles have no straight sides!
            </p>
          </CardContent>
        </Card>

        <Card className="p-4 text-left">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="text-2xl">📍</span> Counting Corners
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Triangles have 3 corners. Rectangles and squares have 4 corners. 
              Circles have no corners!
            </p>
          </CardContent>
        </Card>

        <Card className="p-4 text-left">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="text-2xl">📦</span> Sorting Shapes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We can sort shapes by counting their sides and corners, 
              even if they're different sizes or colors!
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-gradient-to-r from-success/20 to-primary/20 rounded-xl p-6 max-w-lg mx-auto">
        <h3 className="font-bold text-xl mb-2">🏠 Try at Home!</h3>
        <p className="text-muted-foreground">
          Go on a shape hunt at home! Can you find circles, rectangles, squares, 
          and triangles? Count the sides and corners!
        </p>
      </div>

      <Button 
        onClick={() => setPhase("complete")}
        size="lg"
      >
        Complete Lesson <Star className="ml-2" />
      </Button>
    </div>
  );

  const renderComplete = () => (
    <div className="text-center space-y-6 animate-fade-in">
      <div className="text-8xl animate-bounce">🏆</div>
      <h2 className="text-3xl font-bold text-foreground">
        Lesson Complete!
      </h2>
      <p className="text-xl text-muted-foreground">
        You learned about shapes today!
      </p>
      
      <div className="flex justify-center gap-2">
        {[1,2,3].map(i => (
          <Star key={i} className="w-12 h-12 text-yellow-500 fill-yellow-500 animate-pulse" />
        ))}
      </div>

      <div className="bg-muted rounded-xl p-6 max-w-md mx-auto">
        <h3 className="font-bold mb-4">Today you learned:</h3>
        <ul className="text-left space-y-2">
          <li className="flex items-center gap-2">
            <span className="text-success">✓</span> Find shapes in the environment
          </li>
          <li className="flex items-center gap-2">
            <span className="text-success">✓</span> Describe shapes by sides and corners
          </li>
          <li className="flex items-center gap-2">
            <span className="text-success">✓</span> Sort shapes into groups
          </li>
        </ul>
      </div>

      <div className="flex justify-center gap-4">
        <Link to="/activities">
          <Button variant="outline" size="lg">
            <ArrowLeft className="mr-2" /> Back to Activities
          </Button>
        </Link>
        <Link to="/module2/lesson-2">
          <Button size="lg">
            Next Lesson <ArrowRight className="ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (phase) {
      case "intro": return renderIntro();
      case "fluency-fingers": return renderFluencyFingers();
      case "fluency-farmer": return renderFluencyFarmer();
      case "application": return renderApplication();
      case "concept-mystery": return renderConceptMystery();
      case "concept-hunt": return renderConceptHunt();
      case "concept-sort": return renderConceptSort();
      case "debrief": return renderDebrief();
      case "complete": return renderComplete();
      default: return renderIntro();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-muted">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/activities">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-lg font-bold text-foreground">Module 2: Shapes</h1>
                <p className="text-sm text-muted-foreground">Lesson 1: Find and Describe Shapes</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Progress:</span>
                <Progress value={getProgress()} className="w-24 h-2" />
                <span className="font-medium">{Math.round(getProgress())}%</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {renderContent()}
        </div>
      </main>

      {/* Navigation Footer */}
      {/* {phase !== "intro" && phase !== "complete" && (
        <footer className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-sm border-t border-border/50 py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <Button 
              variant="ghost" 
              onClick={() => {
                const phases: LessonPhase[] = [
                  "intro", "fluency-fingers", "fluency-farmer", "application",
                  "concept-mystery", "concept-hunt", "concept-sort", "debrief"
                ];
                const currentIndex = phases.indexOf(phase);
                if (currentIndex > 0) {
                  setPhase(phases[currentIndex - 1]);
                }
              }}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            
            <div className="flex items-center gap-2">
              {["intro", "fluency-fingers", "fluency-farmer", "application", "concept-mystery", "concept-hunt", "concept-sort", "debrief"].map((p, i) => (
                <div 
                  key={p}
                  className={`w-2 h-2 rounded-full transition-all ${
                    p === phase ? "bg-primary w-4" : 
                    ["intro", "fluency-fingers", "fluency-farmer", "application", "concept-mystery", "concept-hunt", "concept-sort", "debrief"].indexOf(phase) > i 
                      ? "bg-primary/50" 
                      : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>

            <Button 
              variant="ghost"
              onClick={() => {
                const phases: LessonPhase[] = [
                  "intro", "fluency-fingers", "fluency-farmer", "application",
                  "concept-mystery", "concept-hunt", "concept-sort", "debrief", "complete"
                ];
                const currentIndex = phases.indexOf(phase);
                if (currentIndex < phases.length - 1) {
                  setPhase(phases[currentIndex + 1]);
                }
              }}
            >
              Skip <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </footer>
      )} */}
    </div>
  );
};

export default ShapesFindDescribe;

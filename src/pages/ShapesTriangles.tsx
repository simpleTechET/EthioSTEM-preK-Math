import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, RotateCcw, Star, Sparkles } from "lucide-react";
import { toast } from "sonner";

type LessonPhase = 
  | "intro"
  | "fluency-ants"
  | "fluency-corners"
  | "application"
  | "concept-intro"
  | "concept-sort"
  | "concept-position"
  | "debrief"
  | "complete";

interface Triangle {
  id: string;
  variant: "equilateral" | "right" | "isosceles" | "scalene";
  color: string;
  rotation: number;
  width: number;
  height: number;
}

const TRIANGLES: Triangle[] = [
  { id: "t1", variant: "equilateral", color: "#FF6B6B", rotation: 0, width: 60, height: 52 },
  { id: "t2", variant: "right", color: "#4ECDC4", rotation: 45, width: 50, height: 60 },
  { id: "t3", variant: "isosceles", color: "#45B7D1", rotation: 180, width: 40, height: 70 },
  { id: "t4", variant: "scalene", color: "#96CEB4", rotation: 30, width: 70, height: 50 },
  { id: "t5", variant: "equilateral", color: "#DDA0DD", rotation: 90, width: 55, height: 48 },
  { id: "t6", variant: "right", color: "#FFD93D", rotation: 0, width: 45, height: 55 },
];

const NON_TRIANGLES = [
  { id: "nt1", type: "circle", color: "#FF8C42" },
  { id: "nt2", type: "rectangle", color: "#A8E6CF" },
  { id: "nt3", type: "square", color: "#B8B5FF" },
  { id: "nt4", type: "oval", color: "#FFB7B2" },
];

const POSITION_WORDS = ["on", "under", "next to", "in", "up", "down"];

const ShapesTriangles = () => {
  const [phase, setPhase] = useState<LessonPhase>("intro");
  const [antCount, setAntCount] = useState(0);
  const [cornerCount, setCornerCount] = useState(0);
  const [currentTriangleIndex, setCurrentTriangleIndex] = useState(0);
  const [sortedTriangles, setSortedTriangles] = useState<Triangle[]>([]);
  const [basketShapes, setBasketShapes] = useState<any[]>([]);
  const [shapesToSort, setShapesToSort] = useState<any[]>([]);
  const [trianglePosition, setTrianglePosition] = useState<string>("on");
  const [starsEarned, setStarsEarned] = useState(0);
  const [simonSaysActive, setSimonSaysActive] = useState(false);
  const [currentInstruction, setCurrentInstruction] = useState("");
  const [instructionIndex, setInstructionIndex] = useState(0);

  useEffect(() => {
    // Initialize shapes for sorting
    const allShapes = [...TRIANGLES.slice(0, 4), ...NON_TRIANGLES.slice(0, 2)];
    setShapesToSort(shuffleArray(allShapes));
  }, []);

  const shuffleArray = (array: any[]) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const getProgress = () => {
    const phases: LessonPhase[] = [
      "intro", "fluency-ants", "fluency-corners", "application",
      "concept-intro", "concept-sort", "concept-position", "debrief", "complete"
    ];
    return ((phases.indexOf(phase) + 1) / phases.length) * 100;
  };

  const handleAddAnt = () => {
    if (antCount < 5) {
      const newCount = antCount + 1;
      setAntCount(newCount);
      toast.success(`${newCount} ant${newCount > 1 ? 's' : ''}!`, { duration: 500 });
    }
  };

  const handlePlaceBean = () => {
    if (cornerCount < 3) {
      const newCount = cornerCount + 1;
      setCornerCount(newCount);
      toast.success(`${newCount} corner${newCount > 1 ? 's' : ''}!`, { duration: 500 });
    }
  };

  const handleSortShape = (shape: any, isTriangle: boolean) => {
    const shapeIsTriangle = shape.variant !== undefined;
    
    if (isTriangle === shapeIsTriangle) {
      if (isTriangle) {
        setSortedTriangles([...sortedTriangles, shape]);
      } else {
        setBasketShapes([...basketShapes, shape]);
      }
      setShapesToSort(shapesToSort.filter(s => s.id !== shape.id));
      setStarsEarned(starsEarned + 1);
      toast.success(isTriangle ? "Yes! It has 3 sides and 3 corners!" : "Correct! That's not a triangle!");
    } else {
      toast.error("Count the sides and corners again!");
    }
  };

  const simonSaysInstructions = [
    { text: "Put the triangle ON your chair!", position: "on" },
    { text: "Put the triangle UNDER your chair!", position: "under" },
    { text: "Hold the triangle UP in the air!", position: "up" },
    { text: "Put the triangle DOWN on the table!", position: "down" },
    { text: "Put the triangle NEXT TO the tree!", position: "next to" },
    { text: "Put the triangle IN your hand!", position: "in" },
  ];

  const handleNextInstruction = () => {
    if (instructionIndex < simonSaysInstructions.length) {
      setCurrentInstruction(simonSaysInstructions[instructionIndex].text);
      setTrianglePosition(simonSaysInstructions[instructionIndex].position);
      setInstructionIndex(instructionIndex + 1);
      setStarsEarned(starsEarned + 1);
    }
  };

  const saveProgress = () => {
    const saved = localStorage.getItem('ethiostem-completed-lessons');
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes(102)) {
      completed.push(102);
      localStorage.setItem('ethiostem-completed-lessons', JSON.stringify(completed));
    }
  };

  useEffect(() => {
    if (phase === "complete") {
      saveProgress();
    }
  }, [phase]);

  const renderTriangle = (triangle: Triangle, size: number = 1) => (
    <div 
      style={{
        width: 0,
        height: 0,
        borderLeft: `${triangle.width * size / 2}px solid transparent`,
        borderRight: `${triangle.width * size / 2}px solid transparent`,
        borderBottom: `${triangle.height * size}px solid ${triangle.color}`,
        transform: `rotate(${triangle.rotation}deg)`,
        transition: "all 0.3s ease"
      }}
    />
  );

  const renderNonTriangle = (shape: any, size: number = 40) => {
    if (shape.type === "circle") {
      return <div className="rounded-full" style={{ width: size, height: size, backgroundColor: shape.color }} />;
    }
    if (shape.type === "rectangle") {
      return <div style={{ width: size * 1.5, height: size * 0.7, backgroundColor: shape.color }} />;
    }
    if (shape.type === "square") {
      return <div style={{ width: size, height: size, backgroundColor: shape.color }} />;
    }
    if (shape.type === "oval") {
      return <div className="rounded-full" style={{ width: size * 1.4, height: size * 0.8, backgroundColor: shape.color }} />;
    }
    return null;
  };

  const renderIntro = () => (
    <div className="text-center space-y-8 animate-fade-in">
      <div className="text-8xl mb-6">🔺📐🎯</div>
      <h2 className="text-3xl font-bold text-foreground">
        Module 2: Shapes - Lesson 2
      </h2>
      <h3 className="text-xl text-muted-foreground">
        Triangles: Identify, Analyze, Sort, Compare & Position
      </h3>
      <p className="text-lg text-muted-foreground max-w-xl mx-auto">
        Today we'll become triangle experts! We'll learn that all triangles have
        <strong> 3 sides</strong> and <strong>3 corners</strong>, no matter how they look!
      </p>
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        {TRIANGLES.slice(0, 4).map((t, i) => (
          <div key={i} className="p-4 bg-muted rounded-lg">
            {renderTriangle(t, 0.8)}
          </div>
        ))}
      </div>
      <Button 
        size="lg" 
        onClick={() => setPhase("fluency-ants")}
        className="mt-8 text-xl px-8 py-6"
      >
        Let's Start! <ArrowRight className="ml-2" />
      </Button>
    </div>
  );

  const renderFluencyAnts = () => (
    <div className="text-center space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground">
        🐜 The Ants Go Marching
      </h2>
      <p className="text-muted-foreground">
        Watch the ants march! Each time we add 1 more ant, the line gets wider.
      </p>
      
      <div className="bg-gradient-to-b from-green-100 to-green-200 rounded-xl p-8 min-h-[200px]">
        <div className="flex justify-center items-end gap-2">
          {Array.from({ length: antCount }).map((_, i) => (
            <div key={i} className="flex flex-col items-center animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
              <span className="text-4xl">🐜</span>
            </div>
          ))}
        </div>
        {antCount > 0 && (
          <p className="mt-4 text-lg font-medium text-green-800">
            {antCount} ant{antCount > 1 ? 's' : ''} marching {antCount === 1 ? "one by one" : antCount === 2 ? "two by two" : antCount === 3 ? "three by three" : antCount === 4 ? "four by four" : "five by five"}!
          </p>
        )}
      </div>

      <div className="bg-muted rounded-xl p-4 max-w-lg mx-auto">
        <p className="text-sm italic">
          🎵 The ants go marching {antCount === 0 ? "one" : antCount === 1 ? "two" : antCount === 2 ? "three" : antCount === 3 ? "four" : "five"} by {antCount === 0 ? "one" : antCount === 1 ? "two" : antCount === 2 ? "three" : antCount === 3 ? "four" : "five"}, hurrah, hurrah! 🎵
        </p>
      </div>

      {antCount < 5 ? (
        <Button onClick={handleAddAnt} size="lg">
          Add 1 More Ant! 🐜
        </Button>
      ) : (
        <div className="space-y-4">
          <p className="text-xl text-success font-bold">🎉 5 ants marching side by side!</p>
          <p className="text-muted-foreground">The line is widest with the most ants!</p>
          <Button onClick={() => { setAntCount(0); setPhase("fluency-corners"); }}>
            Continue <ArrowRight className="ml-2" />
          </Button>
        </div>
      )}
    </div>
  );

  const renderFluencyCorners = () => {
    const triangleColors = ["#FF6B6B", "#4ECDC4", "#45B7D1"];
    
    return (
      <div className="text-center space-y-6 animate-fade-in">
        <h2 className="text-2xl font-bold text-foreground">
          📍 Count the Corners
        </h2>
        <p className="text-muted-foreground">
          Let's put a bean on each corner of this triangle. Tap the corners!
        </p>
        
        <div className="relative w-64 h-64 mx-auto">
          {/* Triangle */}
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon 
              points="50,10 10,90 90,90" 
              fill="#FF6B6B" 
              stroke="#CC5555"
              strokeWidth="2"
            />
            {/* Corner positions */}
            <g>
              {/* Top corner */}
              <circle 
                cx="50" cy="10" r="8" 
                fill={cornerCount >= 1 ? "#8B4513" : "transparent"}
                stroke="#8B4513"
                strokeWidth="2"
                className="cursor-pointer hover:opacity-80"
                onClick={handlePlaceBean}
              />
              {/* Bottom left corner */}
              <circle 
                cx="10" cy="90" r="8" 
                fill={cornerCount >= 2 ? "#8B4513" : "transparent"}
                stroke="#8B4513"
                strokeWidth="2"
                className="cursor-pointer hover:opacity-80"
                onClick={handlePlaceBean}
              />
              {/* Bottom right corner */}
              <circle 
                cx="90" cy="90" r="8" 
                fill={cornerCount >= 3 ? "#8B4513" : "transparent"}
                stroke="#8B4513"
                strokeWidth="2"
                className="cursor-pointer hover:opacity-80"
                onClick={handlePlaceBean}
              />
            </g>
          </svg>
        </div>

        <div className="flex justify-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🫘</span>
            <span className="font-bold text-2xl">{cornerCount} / 3 corners</span>
          </div>
        </div>

        {cornerCount < 3 ? (
          <p className="text-muted-foreground">Tap each corner to place a bean!</p>
        ) : (
          <div className="space-y-4">
            <p className="text-xl text-success font-bold">🎉 3 corners! All triangles have 3 corners!</p>
            <Button onClick={() => { setCornerCount(0); setPhase("application"); }}>
              Continue <ArrowRight className="ml-2" />
            </Button>
          </div>
        )}

        {cornerCount > 0 && cornerCount < 3 && (
          <Button variant="ghost" onClick={() => setCornerCount(0)}>
            <RotateCcw className="mr-2 h-4 w-4" /> Start Over
          </Button>
        )}
      </div>
    );
  };

  const renderApplication = () => (
    <div className="text-center space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground">
        📚 Finding Lines in Pictures
      </h2>
      <p className="text-muted-foreground">
        Let's find straight lines and curved lines in this picture!
      </p>
      
      <div className="bg-gradient-to-b from-sky-100 to-green-100 rounded-xl p-6 relative">
        {/* Simple house scene with shapes */}
        <svg viewBox="0 0 300 200" className="w-full max-w-md mx-auto">
          {/* Sky */}
          <circle cx="260" cy="40" r="25" fill="#FFD93D" /> {/* Sun - circle */}
          
          {/* House */}
          <rect x="80" y="100" width="80" height="80" fill="#E57373" /> {/* House body - rectangle */}
          <polygon points="120,50 70,100 170,100" fill="#8D6E63" /> {/* Roof - triangle! */}
          
          {/* Door */}
          <rect x="105" y="130" width="30" height="50" fill="#5D4037" /> {/* Door - rectangle */}
          
          {/* Window */}
          <rect x="140" y="115" width="15" height="15" fill="#64B5F6" /> {/* Window - square */}
          
          {/* Tree */}
          <rect x="220" y="130" width="15" height="50" fill="#795548" /> {/* Trunk - rectangle */}
          <circle cx="227" cy="110" r="30" fill="#4CAF50" /> {/* Leaves - circle */}
          
          {/* Path */}
          <polygon points="105,180 135,180 125,200 115,200" fill="#9E9E9E" />
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        <Card className="p-4">
          <h3 className="font-bold mb-2">Straight Lines 📏</h3>
          <p className="text-sm text-muted-foreground">
            House walls, roof edges, door
          </p>
          <p className="text-2xl mt-2">🏠</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-bold mb-2">Curved Lines 〰️</h3>
          <p className="text-sm text-muted-foreground">
            Sun, tree top
          </p>
          <p className="text-2xl mt-2">☀️🌳</p>
        </Card>
      </div>

      <div className="bg-primary/10 rounded-xl p-4 max-w-md mx-auto">
        <p className="font-medium">🔺 The roof is a TRIANGLE!</p>
        <p className="text-sm text-muted-foreground">It has 3 straight sides. Hop 3 times for the triangle!</p>
      </div>

      <Button onClick={() => setPhase("concept-intro")} size="lg">
        Learn About Triangles <ArrowRight className="ml-2" />
      </Button>
    </div>
  );

  const renderConceptIntro = () => (
    <div className="text-center space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground">
        🔺 What Makes a Triangle?
      </h2>
      <p className="text-muted-foreground">
        All triangles have the same special features!
      </p>
      
      <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <Card className="p-6 border-2 border-primary">
          <h3 className="font-bold text-xl mb-4">A Triangle Has:</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-muted rounded-lg p-3">
              <span className="text-3xl">3️⃣</span>
              <span className="font-medium">3 Straight Sides</span>
            </div>
            <div className="flex items-center gap-4 bg-muted rounded-lg p-3">
              <span className="text-3xl">📍</span>
              <span className="font-medium">3 Corners</span>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <p className="font-medium">All of these are triangles!</p>
          <div className="grid grid-cols-2 gap-4">
            {TRIANGLES.slice(0, 4).map((t, i) => (
              <div key={i} className="p-4 bg-muted rounded-lg flex flex-col items-center gap-2">
                {renderTriangle(t, 0.7)}
                <span className="text-xs text-muted-foreground">3 sides, 3 corners</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-warning/20 rounded-xl p-4 max-w-md mx-auto">
        <p className="font-medium text-warning-foreground">
          💡 Triangles can be big, small, thin, or wide - but they ALWAYS have 3 sides and 3 corners!
        </p>
      </div>

      <Button onClick={() => setPhase("concept-sort")} size="lg">
        Sort Triangles <ArrowRight className="ml-2" />
      </Button>
    </div>
  );

  const renderConceptSort = () => (
    <div className="text-center space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground">
        📦 Triangle Sorting
      </h2>
      <p className="text-muted-foreground">
        Tap a shape, then decide: Is it a triangle or not?
      </p>
      
      {/* Shapes to sort */}
      <div className="bg-muted rounded-xl p-4 min-h-[100px]">
        <h3 className="text-sm font-semibold mb-3">Shapes to Sort:</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {shapesToSort.map((shape) => (
            <div key={shape.id} className="p-3 bg-background rounded-lg shadow">
              {shape.variant ? renderTriangle(shape, 0.8) : renderNonTriangle(shape)}
            </div>
          ))}
        </div>
        {shapesToSort.length === 0 && (
          <p className="text-muted-foreground">All shapes sorted! 🎉</p>
        )}
      </div>

      {/* Current shape to sort */}
      {shapesToSort.length > 0 && (
        <div className="space-y-4">
          <p className="font-medium">Is this a triangle?</p>
          <div className="p-6 bg-background rounded-xl shadow-lg inline-block">
            {shapesToSort[0].variant 
              ? renderTriangle(shapesToSort[0], 1.2) 
              : renderNonTriangle(shapesToSort[0], 60)}
          </div>
          <div className="flex justify-center gap-4">
            <Button 
              onClick={() => handleSortShape(shapesToSort[0], true)}
              className="bg-green-500 hover:bg-green-600"
              size="lg"
            >
              ✓ Yes, Triangle!
            </Button>
            <Button 
              onClick={() => handleSortShape(shapesToSort[0], false)}
              variant="outline"
              size="lg"
            >
              ✗ Not a Triangle
            </Button>
          </div>
        </div>
      )}

      {/* Sorted containers */}
      <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
        <Card className="p-4 border-2 border-green-300">
          <h3 className="font-bold mb-2">🔺 Triangles</h3>
          <div className="flex flex-wrap justify-center gap-2 min-h-[60px]">
            {sortedTriangles.map((t, i) => (
              <div key={i}>{renderTriangle(t, 0.5)}</div>
            ))}
          </div>
        </Card>
        <Card className="p-4 border-2 border-gray-300">
          <h3 className="font-bold mb-2">🧺 Not Triangles</h3>
          <div className="flex flex-wrap justify-center gap-2 min-h-[60px]">
            {basketShapes.map((s, i) => (
              <div key={i}>{renderNonTriangle(s, 25)}</div>
            ))}
          </div>
        </Card>
      </div>

      <div className="flex items-center justify-center gap-2">
        <Star className="text-yellow-500" />
        <span className="font-bold">{starsEarned} Stars!</span>
      </div>

      {shapesToSort.length === 0 && (
        <Button onClick={() => setPhase("concept-position")} size="lg" className="animate-bounce">
          Play Simon Says! <ArrowRight className="ml-2" />
        </Button>
      )}
    </div>
  );

  const renderConceptPosition = () => (
    <div className="text-center space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground">
        🎮 Simon Says with Triangles!
      </h2>
      <p className="text-muted-foreground">
        Use position words to place your triangle!
      </p>
      
      <div className="relative bg-gradient-to-b from-sky-100 to-green-200 rounded-xl p-6 min-h-[300px]">
        {/* Tree */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
          <div className="w-8 h-20 bg-amber-800 rounded mx-auto" />
          <div className="w-32 h-32 bg-green-600 rounded-full -mt-16" />
        </div>

        {/* Triangle position visualization */}
        <div className={`absolute transition-all duration-500 ${
          trianglePosition === "on" ? "bottom-[140px] left-1/2 -translate-x-1/2" :
          trianglePosition === "under" ? "bottom-8 left-1/2 -translate-x-1/2" :
          trianglePosition === "next to" ? "bottom-20 right-20" :
          trianglePosition === "up" ? "top-8 left-1/2 -translate-x-1/2" :
          trianglePosition === "down" ? "bottom-4 left-1/2 -translate-x-1/2" :
          "bottom-20 left-20"
        }`}>
          <div style={{
            width: 0,
            height: 0,
            borderLeft: '30px solid transparent',
            borderRight: '30px solid transparent',
            borderBottom: '52px solid #FF6B6B',
          }} />
        </div>
      </div>

      {currentInstruction ? (
        <div className="bg-primary/10 rounded-xl p-4 max-w-md mx-auto">
          <p className="text-xl font-bold">🗣️ {currentInstruction}</p>
        </div>
      ) : (
        <p className="text-muted-foreground">Press the button to get an instruction!</p>
      )}

      <div className="flex flex-wrap justify-center gap-2">
        {POSITION_WORDS.map((word) => (
          <span 
            key={word}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              trianglePosition === word ? "bg-primary text-primary-foreground" : "bg-muted"
            }`}
          >
            {word}
          </span>
        ))}
      </div>

      {instructionIndex < simonSaysInstructions.length ? (
        <Button onClick={handleNextInstruction} size="lg">
          {instructionIndex === 0 ? "Start Simon Says!" : "Next Instruction!"} <Sparkles className="ml-2" />
        </Button>
      ) : (
        <div className="space-y-4">
          <p className="text-xl text-success font-bold">🎉 Great job with position words!</p>
          <Button onClick={() => setPhase("debrief")} size="lg">
            Review What We Learned <ArrowRight className="ml-2" />
          </Button>
        </div>
      )}
    </div>
  );

  const renderDebrief = () => (
    <div className="text-center space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground">
        🎓 What Did We Learn About Triangles?
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        <Card className="p-4 text-left">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="text-2xl">🔺</span> Triangle Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              A triangle ALWAYS has <strong>3 straight sides</strong> and <strong>3 corners</strong>!
            </p>
          </CardContent>
        </Card>

        <Card className="p-4 text-left">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="text-2xl">🎨</span> Different Triangles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Triangles can be big, small, wide, thin, or turned any way - they're still triangles!
            </p>
          </CardContent>
        </Card>

        <Card className="p-4 text-left">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="text-2xl">📍</span> Position Words
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We used words like <strong>on, under, next to, up, down, in</strong> to describe where things are!
            </p>
          </CardContent>
        </Card>

        <Card className="p-4 text-left">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="text-2xl">❌</span> Not Triangles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Circles have no corners. Rectangles have 4 sides. These are NOT triangles!
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-gradient-to-r from-success/20 to-primary/20 rounded-xl p-6 max-w-lg mx-auto">
        <h3 className="font-bold text-xl mb-2">🏠 Try at Home!</h3>
        <p className="text-muted-foreground">
          Go on a triangle hunt! Look for triangles in signs, roofs, pizza slices, and more!
        </p>
      </div>

      <Button onClick={() => setPhase("complete")} size="lg">
        Complete Lesson <Star className="ml-2" />
      </Button>
    </div>
  );

  const renderComplete = () => (
    <div className="text-center space-y-6 animate-fade-in">
      <div className="text-8xl animate-bounce">🏆</div>
      <h2 className="text-3xl font-bold text-foreground">
        Triangle Expert!
      </h2>
      <p className="text-xl text-muted-foreground">
        You learned all about triangles today!
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
            <span className="text-success">✓</span> Triangles have 3 sides and 3 corners
          </li>
          <li className="flex items-center gap-2">
            <span className="text-success">✓</span> Sort triangles from other shapes
          </li>
          <li className="flex items-center gap-2">
            <span className="text-success">✓</span> Use position words (on, under, next to)
          </li>
        </ul>
      </div>

      <div className="flex justify-center gap-4">
        <Link to="/activities">
          <Button variant="outline" size="lg">
            <ArrowLeft className="mr-2" /> Back to Activities
          </Button>
        </Link>
        <Link to="/module2/lesson-3">
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
      case "fluency-ants": return renderFluencyAnts();
      case "fluency-corners": return renderFluencyCorners();
      case "application": return renderApplication();
      case "concept-intro": return renderConceptIntro();
      case "concept-sort": return renderConceptSort();
      case "concept-position": return renderConceptPosition();
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
                <p className="text-sm text-muted-foreground">Lesson 2: Triangles</p>
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
      {phase !== "intro" && phase !== "complete" && (
        <footer className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-sm border-t border-border/50 py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <Button 
              variant="ghost" 
              onClick={() => {
                const phases: LessonPhase[] = [
                  "intro", "fluency-ants", "fluency-corners", "application",
                  "concept-intro", "concept-sort", "concept-position", "debrief"
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
              {["intro", "fluency-ants", "fluency-corners", "application", "concept-intro", "concept-sort", "concept-position", "debrief"].map((p, i) => (
                <div 
                  key={p}
                  className={`w-2 h-2 rounded-full transition-all ${
                    p === phase ? "bg-primary w-4" : 
                    ["intro", "fluency-ants", "fluency-corners", "application", "concept-intro", "concept-sort", "concept-position", "debrief"].indexOf(phase) > i 
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
                  "intro", "fluency-ants", "fluency-corners", "application",
                  "concept-intro", "concept-sort", "concept-position", "debrief", "complete"
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
      )}
    </div>
  );
};

export default ShapesTriangles;
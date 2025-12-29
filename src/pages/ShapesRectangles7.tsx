import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, RotateCcw, Star, Sparkles, Check } from "lucide-react";
import { toast } from "sonner";

type LessonPhase = 
  | "intro"
  | "fluency-clay"
  | "application-party"
  | "concept-intro"
  | "concept-build-rectangle"
  | "concept-build-square"
  | "debrief"
  | "complete";

interface Straw {
  id: string;
  length: "short" | "long";
  placed: boolean;
  position: "top" | "bottom" | "left" | "right" | null;
}

interface ClayBall {
  id: string;
  placed: boolean;
  corner: "tl" | "tr" | "bl" | "br" | null;
}

const ShapesRectangles7 = () => {
  const [phase, setPhase] = useState<LessonPhase>("intro");
  const [clayBallCount, setClayBallCount] = useState(1);
  const [starsEarned, setStarsEarned] = useState(0);
  
  // Fluency - making clay balls
  const [clayDivisions, setClayDivisions] = useState(1);
  
  // Application - party shapes
  const [partyShapes, setPartyShapes] = useState<any[]>([]);
  const [collectedRectangles, setCollectedRectangles] = useState<number[]>([]);
  
  // Building rectangles
  const [rectangleStraws, setRectangleStraws] = useState<Straw[]>([
    { id: "s1", length: "long", placed: false, position: null },
    { id: "s2", length: "long", placed: false, position: null },
    { id: "s3", length: "short", placed: false, position: null },
    { id: "s4", length: "short", placed: false, position: null },
  ]);
  const [rectangleClay, setRectangleClay] = useState<ClayBall[]>([
    { id: "c1", placed: false, corner: null },
    { id: "c2", placed: false, corner: null },
    { id: "c3", placed: false, corner: null },
    { id: "c4", placed: false, corner: null },
  ]);
  
  // Building squares
  const [squareStraws, setSquareStraws] = useState<Straw[]>([
    { id: "sq1", length: "long", placed: false, position: null },
    { id: "sq2", length: "long", placed: false, position: null },
    { id: "sq3", length: "long", placed: false, position: null },
    { id: "sq4", length: "long", placed: false, position: null },
  ]);
  const [squareClay, setSquareClay] = useState<ClayBall[]>([
    { id: "sc1", placed: false, corner: null },
    { id: "sc2", placed: false, corner: null },
    { id: "sc3", placed: false, corner: null },
    { id: "sc4", placed: false, corner: null },
  ]);

  const [selectedStraw, setSelectedStraw] = useState<string | null>(null);
  const [selectedClay, setSelectedClay] = useState<string | null>(null);

  useEffect(() => {
    // Initialize party shapes
    const shapes = [
      { id: 1, type: "rectangle", color: "#FF6B6B", corners: 4 },
      { id: 2, type: "triangle", color: "#4ECDC4", corners: 3 },
      { id: 3, type: "square", color: "#45B7D1", corners: 4 },
      { id: 4, type: "circle", color: "#96CEB4", corners: 0 },
      { id: 5, type: "rectangle", color: "#DDA0DD", corners: 4 },
      { id: 6, type: "pentagon", color: "#FFD93D", corners: 5 },
      { id: 7, type: "square", color: "#FF8C42", corners: 4 },
      { id: 8, type: "triangle", color: "#A8E6CF", corners: 3 },
    ];
    setPartyShapes(shuffleArray(shapes));
  }, []);

  const shuffleArray = (array: any[]) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const getProgress = () => {
    const phases: LessonPhase[] = [
      "intro", "fluency-clay", "application-party", "concept-intro",
      "concept-build-rectangle", "concept-build-square", "debrief", "complete"
    ];
    return ((phases.indexOf(phase) + 1) / phases.length) * 100;
  };

  const handleDivideClay = () => {
    if (clayDivisions < 4) {
      const newCount = clayDivisions + 1;
      setClayDivisions(newCount);
      toast.success(`Now we have ${newCount} ball${newCount > 1 ? 's' : ''}!`, { duration: 800 });
    }
  };

  const handleCollectShape = (shape: any) => {
    if (shape.corners === 4) {
      setCollectedRectangles([...collectedRectangles, shape.id]);
      setStarsEarned(starsEarned + 1);
      toast.success(`Yes! A ${shape.type} has 4 corners! 🎉`, { duration: 800 });
    } else {
      toast.error(`Count the corners - that's not 4!`, { duration: 800 });
    }
  };

  const handlePlaceRectangleStraw = (position: "top" | "bottom" | "left" | "right") => {
    if (!selectedStraw) {
      toast.info("First tap a straw to select it!");
      return;
    }
    
    const straw = rectangleStraws.find(s => s.id === selectedStraw);
    if (!straw) return;
    
    // Check if correct length for position
    const needsLong = position === "top" || position === "bottom";
    if ((needsLong && straw.length !== "long") || (!needsLong && straw.length !== "short")) {
      toast.error("That straw doesn't fit! Try a different one.");
      return;
    }
    
    // Check if position already filled
    if (rectangleStraws.some(s => s.position === position)) {
      toast.error("A straw is already there!");
      return;
    }
    
    setRectangleStraws(rectangleStraws.map(s => 
      s.id === selectedStraw ? { ...s, placed: true, position } : s
    ));
    setSelectedStraw(null);
    toast.success("Straw placed! 🎯", { duration: 500 });
  };

  const handlePlaceRectangleClay = (corner: "tl" | "tr" | "bl" | "br") => {
    if (!selectedClay) {
      toast.info("First tap a clay ball to select it!");
      return;
    }
    
    // Check if corner already filled
    if (rectangleClay.some(c => c.corner === corner)) {
      toast.error("Clay is already there!");
      return;
    }
    
    setRectangleClay(rectangleClay.map(c => 
      c.id === selectedClay ? { ...c, placed: true, corner } : c
    ));
    setSelectedClay(null);
    toast.success("Corner connected! 🟤", { duration: 500 });
  };

  const handlePlaceSquareStraw = (position: "top" | "bottom" | "left" | "right") => {
    if (!selectedStraw) {
      toast.info("First tap a straw to select it!");
      return;
    }
    
    // Check if position already filled
    if (squareStraws.some(s => s.position === position)) {
      toast.error("A straw is already there!");
      return;
    }
    
    const straw = squareStraws.find(s => s.id === selectedStraw);
    if (!straw) return;
    
    setSquareStraws(squareStraws.map(s => 
      s.id === selectedStraw ? { ...s, placed: true, position } : s
    ));
    setSelectedStraw(null);
    toast.success("Straw placed! 🎯", { duration: 500 });
  };

  const handlePlaceSquareClay = (corner: "tl" | "tr" | "bl" | "br") => {
    if (!selectedClay) {
      toast.info("First tap a clay ball to select it!");
      return;
    }
    
    if (squareClay.some(c => c.corner === corner)) {
      toast.error("Clay is already there!");
      return;
    }
    
    setSquareClay(squareClay.map(c => 
      c.id === selectedClay ? { ...c, placed: true, corner } : c
    ));
    setSelectedClay(null);
    toast.success("Corner connected! 🟤", { duration: 500 });
  };

  const rectangleComplete = rectangleStraws.every(s => s.placed) && rectangleClay.every(c => c.placed);
  const squareComplete = squareStraws.every(s => s.placed) && squareClay.every(c => c.placed);

  const saveProgress = () => {
    const saved = localStorage.getItem('ethiostem-completed-lessons');
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes(107)) {
      completed.push(107);
      localStorage.setItem('ethiostem-completed-lessons', JSON.stringify(completed));
    }
  };

  useEffect(() => {
    if (phase === "complete") {
      saveProgress();
    }
  }, [phase]);

  const renderShape = (shape: any, size: number = 50) => {
    const isCollected = collectedRectangles.includes(shape.id);
    
    if (shape.type === "rectangle") {
      return (
        <div 
          className={`transition-all ${isCollected ? 'opacity-30' : 'cursor-pointer hover:scale-110'}`}
          style={{ 
            width: size * 1.5, 
            height: size, 
            backgroundColor: shape.color,
            borderRadius: 4
          }}
          onClick={() => !isCollected && handleCollectShape(shape)}
        />
      );
    }
    if (shape.type === "square") {
      return (
        <div 
          className={`transition-all ${isCollected ? 'opacity-30' : 'cursor-pointer hover:scale-110'}`}
          style={{ 
            width: size, 
            height: size, 
            backgroundColor: shape.color,
            borderRadius: 4
          }}
          onClick={() => !isCollected && handleCollectShape(shape)}
        />
      );
    }
    if (shape.type === "triangle") {
      return (
        <div 
          className="cursor-pointer hover:scale-110 transition-all"
          style={{
            width: 0,
            height: 0,
            borderLeft: `${size / 2}px solid transparent`,
            borderRight: `${size / 2}px solid transparent`,
            borderBottom: `${size}px solid ${shape.color}`,
          }}
          onClick={() => handleCollectShape(shape)}
        />
      );
    }
    if (shape.type === "circle") {
      return (
        <div 
          className="rounded-full cursor-pointer hover:scale-110 transition-all"
          style={{ 
            width: size, 
            height: size, 
            backgroundColor: shape.color 
          }}
          onClick={() => handleCollectShape(shape)}
        />
      );
    }
    if (shape.type === "pentagon") {
      return (
        <svg 
          width={size} height={size} viewBox="0 0 50 50"
          className="cursor-pointer hover:scale-110 transition-all"
          onClick={() => handleCollectShape(shape)}
        >
          <polygon 
            points="25,2 48,18 40,48 10,48 2,18" 
            fill={shape.color}
          />
        </svg>
      );
    }
    return null;
  };

  const renderIntro = () => (
    <div className="text-center space-y-8 animate-fade-in">
      <div className="text-8xl mb-6">🟫🥢🎨</div>
      <h2 className="text-3xl font-bold text-foreground">
        Module 2: Shapes - Lesson 7
      </h2>
      <h3 className="text-xl text-muted-foreground">
        Construct a Rectangle and a Square
      </h3>
      <p className="text-lg text-muted-foreground max-w-xl mx-auto">
        Today we'll build rectangles and squares using straws for sides and clay balls for corners!
        We'll learn that rectangles have <strong>4 sides</strong> and <strong>4 corners</strong>.
      </p>
      
      <div className="flex justify-center gap-8 mt-8">
        <Card className="p-6 border-2 border-primary">
          <div className="w-32 h-20 border-4 border-primary rounded-sm" />
          <p className="mt-2 font-medium">Rectangle</p>
        </Card>
        <Card className="p-6 border-2 border-secondary">
          <div className="w-20 h-20 border-4 border-secondary rounded-sm" />
          <p className="mt-2 font-medium">Square</p>
        </Card>
      </div>
      
      <Button 
        size="lg" 
        onClick={() => setPhase("fluency-clay")}
        className="mt-8 text-xl px-8 py-6"
      >
        Let's Start! <ArrowRight className="ml-2" />
      </Button>
    </div>
  );

  const renderFluencyClay = () => (
    <div className="text-center space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground">
        🟤 Make 4 Small Balls
      </h2>
      <p className="text-muted-foreground">
        Start with one ball of clay. Keep dividing it to make 4 smaller balls!
      </p>
      
      <div className="bg-gradient-to-b from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-xl p-8 min-h-[200px]">
        <div className="flex justify-center items-center gap-4 flex-wrap">
          {Array.from({ length: clayDivisions }).map((_, i) => (
            <div 
              key={i} 
              className="animate-bounce"
              style={{ 
                animationDelay: `${i * 0.15}s`,
                animationDuration: '1s'
              }}
            >
              <div 
                className="rounded-full bg-gradient-to-br from-amber-600 to-amber-800 shadow-lg"
                style={{ 
                  width: Math.max(30, 80 - clayDivisions * 12),
                  height: Math.max(30, 80 - clayDivisions * 12)
                }}
              />
            </div>
          ))}
        </div>
        
        <p className="mt-6 text-lg font-medium text-amber-800 dark:text-amber-200">
          {clayDivisions} ball{clayDivisions > 1 ? 's' : ''} of clay
        </p>
        
        {clayDivisions < 4 && (
          <p className="text-sm text-muted-foreground mt-2">
            {clayDivisions === 1 && "Which balls are bigger - 1 ball or 4 balls?"}
            {clayDivisions === 2 && "Now divide each ball again!"}
            {clayDivisions === 3 && "One more time!"}
          </p>
        )}
      </div>

      <div className="bg-muted rounded-xl p-4 max-w-lg mx-auto">
        <p className="text-sm">
          How many balls? <span className="font-bold text-xl">{clayDivisions}</span>
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Jump {clayDivisions} time{clayDivisions > 1 ? 's' : ''}! 🦘
        </p>
      </div>

      {clayDivisions < 4 ? (
        <Button onClick={handleDivideClay} size="lg">
          Divide into {clayDivisions + 1} balls! 🟤
        </Button>
      ) : (
        <div className="space-y-4">
          <p className="text-xl text-primary font-bold">🎉 4 clay balls ready for 4 corners!</p>
          <Button onClick={() => setPhase("application-party")}>
            Continue <ArrowRight className="ml-2" />
          </Button>
        </div>
      )}
    </div>
  );

  const renderApplicationParty = () => {
    const fourCornerShapes = partyShapes.filter(s => s.corners === 4);
    const allCollected = fourCornerShapes.every(s => collectedRectangles.includes(s.id));
    
    return (
      <div className="text-center space-y-6 animate-fade-in">
        <h2 className="text-2xl font-bold text-foreground">
          🎉 Jose's Rectangle Party!
        </h2>
        <p className="text-muted-foreground">
          Find all the shapes with exactly <strong>4 corners</strong> for the party!
        </p>
        
        <div className="bg-gradient-to-b from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 min-h-[200px]">
          <div className="flex flex-wrap justify-center gap-6">
            {partyShapes.map((shape) => (
              <div 
                key={shape.id} 
                className="p-4 bg-background/80 rounded-lg shadow-md flex flex-col items-center"
              >
                {renderShape(shape, 50)}
                {collectedRectangles.includes(shape.id) && (
                  <Check className="text-green-500 mt-2" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-4 items-center">
          <div className="bg-primary/10 rounded-lg px-4 py-2">
            <span className="font-bold">{collectedRectangles.length} / {fourCornerShapes.length}</span>
            <span className="text-sm text-muted-foreground ml-2">4-corner shapes found</span>
          </div>
        </div>

        {allCollected ? (
          <div className="space-y-4">
            <p className="text-xl text-primary font-bold">🎉 You found all the rectangles and squares!</p>
            <p className="text-muted-foreground">Both rectangles AND squares have 4 corners!</p>
            <Button onClick={() => setPhase("concept-intro")}>
              Learn to Build Them <ArrowRight className="ml-2" />
            </Button>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Tap shapes with exactly 4 corners!
          </p>
        )}
      </div>
    );
  };

  const renderConceptIntro = () => (
    <div className="text-center space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground">
        🔲 Building Rectangles
      </h2>
      <p className="text-muted-foreground">
        Rectangles have 4 sides and 4 corners. Let's see what we need!
      </p>
      
      <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <Card className="p-6 border-2 border-primary">
          <h3 className="font-bold text-xl mb-4">A Rectangle Has:</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-muted rounded-lg p-3">
              <span className="text-3xl">4️⃣</span>
              <span className="font-medium">4 Straight Sides</span>
            </div>
            <div className="flex items-center gap-4 bg-muted rounded-lg p-3">
              <span className="text-3xl">📍</span>
              <span className="font-medium">4 Corners</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-bold text-xl mb-4">Our Tools:</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
              <span className="text-3xl">🥢</span>
              <span className="font-medium">4 Straws (for sides)</span>
            </div>
            <div className="flex items-center gap-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3">
              <span className="text-3xl">🟤</span>
              <span className="font-medium">4 Clay Balls (for corners)</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="bg-secondary/20 rounded-xl p-4 max-w-md mx-auto">
        <p className="font-medium">
          💡 A square is a special rectangle where ALL 4 sides are the same length!
        </p>
      </div>

      <Button onClick={() => setPhase("concept-build-rectangle")} size="lg">
        Build a Rectangle <ArrowRight className="ml-2" />
      </Button>
    </div>
  );

  const renderBuildRectangle = () => {
    const placedStraws = rectangleStraws.filter(s => s.placed).length;
    const placedClay = rectangleClay.filter(c => c.placed).length;
    
    return (
      <div className="text-center space-y-6 animate-fade-in">
        <h2 className="text-2xl font-bold text-foreground">
          🏗️ Build a Rectangle
        </h2>
        <p className="text-muted-foreground">
          First select a straw, then tap where to place it. Then add clay balls to corners!
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Building area */}
          <div className="bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl p-6">
            <div className="relative w-64 h-44 mx-auto">
              {/* Template outline */}
              <div className="absolute inset-0 border-4 border-dashed border-slate-300 dark:border-slate-600 rounded-sm" />
              
              {/* Straws */}
              {/* Top */}
              <div 
                className={`absolute top-0 left-4 right-4 h-3 rounded-full cursor-pointer transition-all ${
                  rectangleStraws.find(s => s.position === "top") 
                    ? 'bg-blue-500' 
                    : 'bg-slate-200 dark:bg-slate-700 hover:bg-blue-200'
                }`}
                onClick={() => handlePlaceRectangleStraw("top")}
              />
              {/* Bottom */}
              <div 
                className={`absolute bottom-0 left-4 right-4 h-3 rounded-full cursor-pointer transition-all ${
                  rectangleStraws.find(s => s.position === "bottom") 
                    ? 'bg-blue-500' 
                    : 'bg-slate-200 dark:bg-slate-700 hover:bg-blue-200'
                }`}
                onClick={() => handlePlaceRectangleStraw("bottom")}
              />
              {/* Left */}
              <div 
                className={`absolute left-0 top-4 bottom-4 w-3 rounded-full cursor-pointer transition-all ${
                  rectangleStraws.find(s => s.position === "left") 
                    ? 'bg-green-500' 
                    : 'bg-slate-200 dark:bg-slate-700 hover:bg-green-200'
                }`}
                onClick={() => handlePlaceRectangleStraw("left")}
              />
              {/* Right */}
              <div 
                className={`absolute right-0 top-4 bottom-4 w-3 rounded-full cursor-pointer transition-all ${
                  rectangleStraws.find(s => s.position === "right") 
                    ? 'bg-green-500' 
                    : 'bg-slate-200 dark:bg-slate-700 hover:bg-green-200'
                }`}
                onClick={() => handlePlaceRectangleStraw("right")}
              />
              
              {/* Clay corners */}
              {/* Top-left */}
              <div 
                className={`absolute -top-2 -left-2 w-6 h-6 rounded-full cursor-pointer transition-all ${
                  rectangleClay.find(c => c.corner === "tl") 
                    ? 'bg-amber-700' 
                    : 'bg-slate-300 dark:bg-slate-600 hover:bg-amber-300'
                }`}
                onClick={() => handlePlaceRectangleClay("tl")}
              />
              {/* Top-right */}
              <div 
                className={`absolute -top-2 -right-2 w-6 h-6 rounded-full cursor-pointer transition-all ${
                  rectangleClay.find(c => c.corner === "tr") 
                    ? 'bg-amber-700' 
                    : 'bg-slate-300 dark:bg-slate-600 hover:bg-amber-300'
                }`}
                onClick={() => handlePlaceRectangleClay("tr")}
              />
              {/* Bottom-left */}
              <div 
                className={`absolute -bottom-2 -left-2 w-6 h-6 rounded-full cursor-pointer transition-all ${
                  rectangleClay.find(c => c.corner === "bl") 
                    ? 'bg-amber-700' 
                    : 'bg-slate-300 dark:bg-slate-600 hover:bg-amber-300'
                }`}
                onClick={() => handlePlaceRectangleClay("bl")}
              />
              {/* Bottom-right */}
              <div 
                className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full cursor-pointer transition-all ${
                  rectangleClay.find(c => c.corner === "br") 
                    ? 'bg-amber-700' 
                    : 'bg-slate-300 dark:bg-slate-600 hover:bg-amber-300'
                }`}
                onClick={() => handlePlaceRectangleClay("br")}
              />
            </div>
          </div>

          {/* Materials */}
          <div className="space-y-4">
            {/* Straws */}
            <Card className="p-4">
              <h4 className="font-semibold mb-3">🥢 Straws (tap to select)</h4>
              <div className="flex flex-wrap gap-3 justify-center">
                {rectangleStraws.filter(s => !s.placed).map((straw) => (
                  <div
                    key={straw.id}
                    className={`cursor-pointer transition-all rounded-full ${
                      selectedStraw === straw.id 
                        ? 'ring-4 ring-primary scale-110' 
                        : 'hover:scale-105'
                    } ${straw.length === "long" ? 'bg-blue-500 w-20 h-3' : 'bg-green-500 w-12 h-3'}`}
                    onClick={() => setSelectedStraw(straw.id)}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Blue = long sides, Green = short sides
              </p>
            </Card>

            {/* Clay */}
            <Card className="p-4">
              <h4 className="font-semibold mb-3">🟤 Clay Balls (tap to select)</h4>
              <div className="flex flex-wrap gap-3 justify-center">
                {rectangleClay.filter(c => !c.placed).map((clay) => (
                  <div
                    key={clay.id}
                    className={`w-8 h-8 rounded-full bg-amber-700 cursor-pointer transition-all ${
                      selectedClay === clay.id 
                        ? 'ring-4 ring-primary scale-110' 
                        : 'hover:scale-105'
                    }`}
                    onClick={() => setSelectedClay(clay.id)}
                  />
                ))}
              </div>
            </Card>

            <div className="text-sm">
              <p>Sides: {placedStraws}/4 | Corners: {placedClay}/4</p>
            </div>
          </div>
        </div>

        {rectangleComplete ? (
          <div className="space-y-4">
            <p className="text-xl text-primary font-bold">🎉 You built a rectangle!</p>
            <p className="text-muted-foreground">4 straws for sides + 4 clay balls for corners = Rectangle!</p>
            <Button onClick={() => setPhase("concept-build-square")}>
              Now Build a Square <ArrowRight className="ml-2" />
            </Button>
          </div>
        ) : (
          <Button 
            variant="ghost" 
            onClick={() => {
              setRectangleStraws(rectangleStraws.map(s => ({ ...s, placed: false, position: null })));
              setRectangleClay(rectangleClay.map(c => ({ ...c, placed: false, corner: null })));
              setSelectedStraw(null);
              setSelectedClay(null);
            }}
          >
            <RotateCcw className="mr-2 h-4 w-4" /> Start Over
          </Button>
        )}
      </div>
    );
  };

  const renderBuildSquare = () => {
    const placedStraws = squareStraws.filter(s => s.placed).length;
    const placedClay = squareClay.filter(c => c.placed).length;
    
    return (
      <div className="text-center space-y-6 animate-fade-in">
        <h2 className="text-2xl font-bold text-foreground">
          🏗️ Build a Square
        </h2>
        <p className="text-muted-foreground">
          A square is a special rectangle - all 4 sides are the same length!
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Building area */}
          <div className="bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl p-6">
            <div className="relative w-48 h-48 mx-auto">
              {/* Template outline */}
              <div className="absolute inset-0 border-4 border-dashed border-slate-300 dark:border-slate-600 rounded-sm" />
              
              {/* Straws - all same length for square */}
              {/* Top */}
              <div 
                className={`absolute top-0 left-4 right-4 h-3 rounded-full cursor-pointer transition-all ${
                  squareStraws.find(s => s.position === "top") 
                    ? 'bg-purple-500' 
                    : 'bg-slate-200 dark:bg-slate-700 hover:bg-purple-200'
                }`}
                onClick={() => handlePlaceSquareStraw("top")}
              />
              {/* Bottom */}
              <div 
                className={`absolute bottom-0 left-4 right-4 h-3 rounded-full cursor-pointer transition-all ${
                  squareStraws.find(s => s.position === "bottom") 
                    ? 'bg-purple-500' 
                    : 'bg-slate-200 dark:bg-slate-700 hover:bg-purple-200'
                }`}
                onClick={() => handlePlaceSquareStraw("bottom")}
              />
              {/* Left */}
              <div 
                className={`absolute left-0 top-4 bottom-4 w-3 rounded-full cursor-pointer transition-all ${
                  squareStraws.find(s => s.position === "left") 
                    ? 'bg-purple-500' 
                    : 'bg-slate-200 dark:bg-slate-700 hover:bg-purple-200'
                }`}
                onClick={() => handlePlaceSquareStraw("left")}
              />
              {/* Right */}
              <div 
                className={`absolute right-0 top-4 bottom-4 w-3 rounded-full cursor-pointer transition-all ${
                  squareStraws.find(s => s.position === "right") 
                    ? 'bg-purple-500' 
                    : 'bg-slate-200 dark:bg-slate-700 hover:bg-purple-200'
                }`}
                onClick={() => handlePlaceSquareStraw("right")}
              />
              
              {/* Clay corners */}
              <div 
                className={`absolute -top-2 -left-2 w-6 h-6 rounded-full cursor-pointer transition-all ${
                  squareClay.find(c => c.corner === "tl") 
                    ? 'bg-amber-700' 
                    : 'bg-slate-300 dark:bg-slate-600 hover:bg-amber-300'
                }`}
                onClick={() => handlePlaceSquareClay("tl")}
              />
              <div 
                className={`absolute -top-2 -right-2 w-6 h-6 rounded-full cursor-pointer transition-all ${
                  squareClay.find(c => c.corner === "tr") 
                    ? 'bg-amber-700' 
                    : 'bg-slate-300 dark:bg-slate-600 hover:bg-amber-300'
                }`}
                onClick={() => handlePlaceSquareClay("tr")}
              />
              <div 
                className={`absolute -bottom-2 -left-2 w-6 h-6 rounded-full cursor-pointer transition-all ${
                  squareClay.find(c => c.corner === "bl") 
                    ? 'bg-amber-700' 
                    : 'bg-slate-300 dark:bg-slate-600 hover:bg-amber-300'
                }`}
                onClick={() => handlePlaceSquareClay("bl")}
              />
              <div 
                className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full cursor-pointer transition-all ${
                  squareClay.find(c => c.corner === "br") 
                    ? 'bg-amber-700' 
                    : 'bg-slate-300 dark:bg-slate-600 hover:bg-amber-300'
                }`}
                onClick={() => handlePlaceSquareClay("br")}
              />
            </div>
          </div>

          {/* Materials */}
          <div className="space-y-4">
            {/* Straws */}
            <Card className="p-4">
              <h4 className="font-semibold mb-3">🥢 Straws (all same length!)</h4>
              <div className="flex flex-wrap gap-3 justify-center">
                {squareStraws.filter(s => !s.placed).map((straw) => (
                  <div
                    key={straw.id}
                    className={`cursor-pointer transition-all rounded-full bg-purple-500 w-16 h-3 ${
                      selectedStraw === straw.id 
                        ? 'ring-4 ring-primary scale-110' 
                        : 'hover:scale-105'
                    }`}
                    onClick={() => setSelectedStraw(straw.id)}
                  />
                ))}
              </div>
            </Card>

            {/* Clay */}
            <Card className="p-4">
              <h4 className="font-semibold mb-3">🟤 Clay Balls</h4>
              <div className="flex flex-wrap gap-3 justify-center">
                {squareClay.filter(c => !c.placed).map((clay) => (
                  <div
                    key={clay.id}
                    className={`w-8 h-8 rounded-full bg-amber-700 cursor-pointer transition-all ${
                      selectedClay === clay.id 
                        ? 'ring-4 ring-primary scale-110' 
                        : 'hover:scale-105'
                    }`}
                    onClick={() => setSelectedClay(clay.id)}
                  />
                ))}
              </div>
            </Card>

            <div className="text-sm">
              <p>Sides: {placedStraws}/4 | Corners: {placedClay}/4</p>
            </div>
          </div>
        </div>

        {squareComplete ? (
          <div className="space-y-4">
            <p className="text-xl text-primary font-bold">🎉 You built a square!</p>
            <p className="text-muted-foreground">A square is a rectangle with all sides equal!</p>
            <Button onClick={() => setPhase("debrief")}>
              Review What We Learned <ArrowRight className="ml-2" />
            </Button>
          </div>
        ) : (
          <Button 
            variant="ghost" 
            onClick={() => {
              setSquareStraws(squareStraws.map(s => ({ ...s, placed: false, position: null })));
              setSquareClay(squareClay.map(c => ({ ...c, placed: false, corner: null })));
              setSelectedStraw(null);
              setSelectedClay(null);
            }}
          >
            <RotateCcw className="mr-2 h-4 w-4" /> Start Over
          </Button>
        )}
      </div>
    );
  };

  const renderDebrief = () => (
    <div className="text-center space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground">
        📚 What We Learned Today
      </h2>
      
      <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <Card className="p-6">
          <div className="w-24 h-16 border-4 border-primary rounded-sm mx-auto mb-4" />
          <h3 className="font-bold text-lg">Rectangle</h3>
          <ul className="text-left mt-2 space-y-1 text-sm">
            <li>✓ 4 straight sides</li>
            <li>✓ 4 corners</li>
            <li>✓ Two pairs of sides</li>
          </ul>
        </Card>
        
        <Card className="p-6">
          <div className="w-16 h-16 border-4 border-secondary rounded-sm mx-auto mb-4" />
          <h3 className="font-bold text-lg">Square</h3>
          <ul className="text-left mt-2 space-y-1 text-sm">
            <li>✓ 4 straight sides</li>
            <li>✓ 4 corners</li>
            <li>✓ All sides equal!</li>
          </ul>
        </Card>
      </div>

      <Card className="p-4 max-w-md mx-auto bg-primary/10">
        <p className="font-medium">
          🔑 We used <strong>4 straws</strong> (for sides) and <strong>4 clay balls</strong> (for corners) to build our shapes!
        </p>
      </Card>

      <div className="bg-muted rounded-xl p-4 max-w-md mx-auto">
        <h4 className="font-semibold mb-2">Think About It:</h4>
        <p className="text-sm text-muted-foreground">
          What is the same about rectangles and triangles? They both have straight sides and corners!
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          What is different? Rectangles have 4 sides and corners, triangles have 3!
        </p>
      </div>

      <Button onClick={() => setPhase("complete")} size="lg">
        Complete Lesson <Star className="ml-2" />
      </Button>
    </div>
  );

  const renderComplete = () => (
    <div className="text-center space-y-6 animate-fade-in">
      <div className="text-8xl mb-4">🏆</div>
      <h2 className="text-3xl font-bold text-foreground">
        Lesson Complete!
      </h2>
      <p className="text-xl text-muted-foreground">
        You learned to construct rectangles and squares!
      </p>
      
      <div className="flex justify-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star} 
            className="w-10 h-10 text-yellow-500 fill-yellow-500 animate-bounce"
            style={{ animationDelay: `${star * 0.1}s` }}
          />
        ))}
      </div>

      <Card className="p-6 max-w-md mx-auto">
        <h3 className="font-bold mb-4">You Can Now:</h3>
        <ul className="text-left space-y-2">
          <li className="flex items-center gap-2">
            <Sparkles className="text-primary w-5 h-5" />
            Identify shapes with 4 corners
          </li>
          <li className="flex items-center gap-2">
            <Sparkles className="text-primary w-5 h-5" />
            Build a rectangle with straws and clay
          </li>
          <li className="flex items-center gap-2">
            <Sparkles className="text-primary w-5 h-5" />
            Build a square (special rectangle!)
          </li>
          <li className="flex items-center gap-2">
            <Sparkles className="text-primary w-5 h-5" />
            Explain that both have 4 sides and 4 corners
          </li>
        </ul>
      </Card>

      <div className="flex gap-4 justify-center">
        <Link to="/activities/module-2">
          <Button variant="outline">
            <ArrowLeft className="mr-2" /> Back to Module 2
          </Button>
        </Link>
      </div>
    </div>
  );

  const renderPhase = () => {
    switch (phase) {
      case "intro": return renderIntro();
      case "fluency-clay": return renderFluencyClay();
      case "application-party": return renderApplicationParty();
      case "concept-intro": return renderConceptIntro();
      case "concept-build-rectangle": return renderBuildRectangle();
      case "concept-build-square": return renderBuildSquare();
      case "debrief": return renderDebrief();
      case "complete": return renderComplete();
      default: return renderIntro();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/activities/module-2">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Star className="text-yellow-500 w-5 h-5" />
            <span className="font-medium">{starsEarned}</span>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Lesson 7: Construct Rectangles & Squares</span>
            <span>{Math.round(getProgress())}%</span>
          </div>
          <Progress value={getProgress()} className="h-2" />
        </div>

        {/* Main Content */}
        <Card className="p-6 md:p-8">
          {renderPhase()}
        </Card>
      </div>
    </div>
  );
};

export default ShapesRectangles7;
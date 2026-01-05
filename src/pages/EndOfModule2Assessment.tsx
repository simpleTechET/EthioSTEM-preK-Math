import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Star, CheckCircle2, Circle, Square, Triangle, Hexagon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Phase = "intro" | "topicA" | "topicB" | "topicC" | "results";
type TopicAStep = 1 | 2 | 3;
type TopicBStep = 1;
type TopicCStep = 1 | 2;

interface Shape2D {
  id: string;
  type: "triangle" | "circle" | "rectangle" | "square";
  color: "red" | "blue";
  variant?: string;
}

interface Shape3D {
  id: string;
  name: string;
  type: "sphere" | "cube" | "cylinder" | "cone" | "rectangular-block" | "pyramid";
  flatSides: number;
}

interface Scores {
  topicA: number;
  topicB: number;
  topicC: number;
}

const shapes2D: Shape2D[] = [
  { id: "t1", type: "triangle", color: "red", variant: "equilateral" },
  { id: "t2", type: "triangle", color: "blue", variant: "right" },
  { id: "c1", type: "circle", color: "red" },
  { id: "c2", type: "circle", color: "blue" },
  { id: "r1", type: "rectangle", color: "red" },
  { id: "r2", type: "rectangle", color: "blue" },
  { id: "s1", type: "square", color: "red" },
  { id: "s2", type: "square", color: "blue" },
  { id: "t3", type: "triangle", color: "red", variant: "isosceles" },
  { id: "t4", type: "triangle", color: "blue", variant: "scalene" },
];

const shapes3D: Shape3D[] = [
  { id: "sphere", name: "Sphere", type: "sphere", flatSides: 0 },
  { id: "cube", name: "Cube", type: "cube", flatSides: 6 },
  { id: "cylinder", name: "Cylinder", type: "cylinder", flatSides: 2 },
  { id: "cone", name: "Cone", type: "cone", flatSides: 1 },
  { id: "block", name: "Rectangular Block", type: "rectangular-block", flatSides: 6 },
  { id: "pyramid", name: "Pyramid", type: "pyramid", flatSides: 5 },
];

const EndOfModule2Assessment = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("intro");
  const [topicAStep, setTopicAStep] = useState<TopicAStep>(1);
  const [topicBStep, setTopicBStep] = useState<TopicBStep>(1);
  const [topicCStep, setTopicCStep] = useState<TopicCStep>(1);
  const [scores, setScores] = useState<Scores>({ topicA: 0, topicB: 0, topicC: 0 });
  
  // Topic A state
  const [selectedShapes, setSelectedShapes] = useState<string[]>([]);
  const [matShapes, setMatShapes] = useState<string[]>([]);
  const [triangleOnMat, setTriangleOnMat] = useState(false);
  const [circlePosition, setCirclePosition] = useState<"left" | "right" | null>(null);
  const [rectanglePosition, setRectanglePosition] = useState<"under" | null>(null);
  const [sortedTriangles, setSortedTriangles] = useState<string[]>([]);
  
  // Topic B state
  const [strawsUsed, setStrawsUsed] = useState<{ long: number; short: number }>({ long: 0, short: 0 });
  const [rectangleBuilt, setRectangleBuilt] = useState(false);
  
  // Topic C state
  const [redMatShapes, setRedMatShapes] = useState<string[]>([]);
  const [blueMatShapes, setBlueMatShapes] = useState<string[]>([]);

  const renderShape2D = (shape: Shape2D, size: number = 60, onClick?: () => void, selected?: boolean) => {
    const baseClasses = `cursor-pointer transition-all duration-200 ${selected ? "ring-4 ring-yellow-400 scale-110" : "hover:scale-105"}`;
    const fillColor = shape.color === "red" ? "#ef4444" : "#3b82f6";
    
    if (shape.type === "triangle") {
      return (
        <motion.svg 
          key={shape.id}
          width={size} 
          height={size} 
          viewBox="0 0 100 100" 
          className={baseClasses}
          onClick={onClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {shape.variant === "right" ? (
            <polygon points="10,90 10,10 90,90" fill={fillColor} stroke="#000" strokeWidth="2" />
          ) : shape.variant === "isosceles" ? (
            <polygon points="50,10 20,90 80,90" fill={fillColor} stroke="#000" strokeWidth="2" />
          ) : shape.variant === "scalene" ? (
            <polygon points="30,10 10,90 90,70" fill={fillColor} stroke="#000" strokeWidth="2" />
          ) : (
            <polygon points="50,10 10,90 90,90" fill={fillColor} stroke="#000" strokeWidth="2" />
          )}
        </motion.svg>
      );
    }
    
    if (shape.type === "circle") {
      return (
        <motion.svg 
          key={shape.id}
          width={size} 
          height={size} 
          viewBox="0 0 100 100" 
          className={baseClasses}
          onClick={onClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <circle cx="50" cy="50" r="40" fill={fillColor} stroke="#000" strokeWidth="2" />
        </motion.svg>
      );
    }
    
    if (shape.type === "rectangle") {
      return (
        <motion.svg 
          key={shape.id}
          width={size * 1.5} 
          height={size} 
          viewBox="0 0 150 100" 
          className={baseClasses}
          onClick={onClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <rect x="10" y="20" width="130" height="60" fill={fillColor} stroke="#000" strokeWidth="2" />
        </motion.svg>
      );
    }
    
    if (shape.type === "square") {
      return (
        <motion.svg 
          key={shape.id}
          width={size} 
          height={size} 
          viewBox="0 0 100 100" 
          className={baseClasses}
          onClick={onClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <rect x="10" y="10" width="80" height="80" fill={fillColor} stroke="#000" strokeWidth="2" />
        </motion.svg>
      );
    }
    
    return null;
  };

  const renderShape3D = (shape: Shape3D, onClick?: () => void, selected?: boolean) => {
    const baseClasses = `w-20 h-20 flex items-center justify-center rounded-xl cursor-pointer transition-all ${
      selected ? "ring-4 ring-yellow-400 scale-110" : "hover:scale-105"
    }`;
    
    const colors: Record<string, string> = {
      sphere: "bg-gradient-to-br from-orange-400 to-orange-600",
      cube: "bg-gradient-to-br from-blue-400 to-blue-600",
      cylinder: "bg-gradient-to-br from-green-400 to-green-600",
      cone: "bg-gradient-to-br from-yellow-400 to-yellow-600",
      "rectangular-block": "bg-gradient-to-br from-purple-400 to-purple-600",
      pyramid: "bg-gradient-to-br from-red-400 to-red-600",
    };
    
    return (
      <motion.div
        key={shape.id}
        className={`${baseClasses} ${colors[shape.type]}`}
        onClick={onClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-white text-xs font-bold text-center px-1">{shape.name}</span>
      </motion.div>
    );
  };

  const calculateTopicAScore = () => {
    let score = 0;
    // Step 1: Identified shapes correctly (simplified scoring)
    if (selectedShapes.length >= 3) score += 1;
    // Step 2: Positioned shapes correctly
    if (circlePosition && rectanglePosition) score += 1;
    // Step 3: Sorted triangles
    if (sortedTriangles.length >= 3) score += 2;
    return Math.min(score, 4);
  };

  const calculateTopicBScore = () => {
    if (rectangleBuilt && (strawsUsed.long === 2 && strawsUsed.short === 2)) return 4;
    if (rectangleBuilt && strawsUsed.long + strawsUsed.short === 4) return 3;
    if (rectangleBuilt) return 2;
    return 1;
  };

  const calculateTopicCScore = () => {
    const correctRed = shapes3D.filter(s => s.flatSides <= 1).map(s => s.id);
    const correctBlue = shapes3D.filter(s => s.flatSides > 1).map(s => s.id);
    
    const redCorrect = redMatShapes.filter(id => correctRed.includes(id)).length;
    const blueCorrect = blueMatShapes.filter(id => correctBlue.includes(id)).length;
    
    const totalCorrect = redCorrect + blueCorrect;
    if (totalCorrect === 6) return 4;
    if (totalCorrect >= 4) return 3;
    if (totalCorrect >= 2) return 2;
    return 1;
  };

  const handleTopicAComplete = () => {
    const score = calculateTopicAScore();
    setScores(prev => ({ ...prev, topicA: score }));
    setPhase("topicB");
    setTopicAStep(1);
  };

  const handleTopicBComplete = () => {
    const score = calculateTopicBScore();
    setScores(prev => ({ ...prev, topicB: score }));
    setPhase("topicC");
    setTopicBStep(1);
  };

  const handleTopicCComplete = () => {
    const score = calculateTopicCScore();
    setScores(prev => ({ ...prev, topicC: score }));
    setPhase("results");
  };

  const redShapes = shapes2D.filter(s => s.color === "red");
  const allTriangles = shapes2D.filter(s => s.type === "triangle");

  const renderIntro = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center space-y-6"
    >
      <h2 className="text-3xl font-bold text-primary">End-of-Module 2 Assessment</h2>
      <p className="text-xl text-muted-foreground">Let's see what you've learned about shapes!</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
        <Card className="p-6 bg-red-50 border-red-200">
          <Triangle className="w-12 h-12 text-red-500 mx-auto mb-2" />
          <h3 className="font-bold text-lg">Topic A</h3>
          <p className="text-sm text-muted-foreground">Two-Dimensional Shapes</p>
        </Card>
        <Card className="p-6 bg-blue-50 border-blue-200">
          <Hexagon className="w-12 h-12 text-blue-500 mx-auto mb-2" />
          <h3 className="font-bold text-lg">Topic B</h3>
          <p className="text-sm text-muted-foreground">Constructing Shapes</p>
        </Card>
        <Card className="p-6 bg-green-50 border-green-200">
          <Square className="w-12 h-12 text-green-500 mx-auto mb-2" />
          <h3 className="font-bold text-lg">Topic C</h3>
          <p className="text-sm text-muted-foreground">Three-Dimensional Shapes</p>
        </Card>
      </div>
      
      <Button size="lg" onClick={() => setPhase("topicA")} className="text-xl px-8 py-6">
        Start Assessment
      </Button>
    </motion.div>
  );

  const renderTopicA = () => (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-600">Topic A: Two-Dimensional Shapes</h2>
        <p className="text-muted-foreground">Step {topicAStep} of 3</p>
      </div>

      {topicAStep === 1 && (
        <div className="space-y-6">
          <Card className="p-6 bg-red-50">
            <h3 className="text-xl font-bold mb-4">Point to the shapes on the mat:</h3>
            <p className="mb-4 text-muted-foreground">Click on: a triangle, a circle, and a rectangle</p>
            
            <div className="grid grid-cols-5 gap-4 p-6 bg-white rounded-xl border-2 border-red-200">
              {redShapes.map(shape => (
                <div key={shape.id} className="flex justify-center">
                  {renderShape2D(
                    shape, 
                    60, 
                    () => {
                      if (!selectedShapes.includes(shape.id)) {
                        setSelectedShapes([...selectedShapes, shape.id]);
                      }
                    },
                    selectedShapes.includes(shape.id)
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedShapes.map(id => {
                const shape = shapes2D.find(s => s.id === id);
                return shape ? (
                  <span key={id} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    {shape.type} ✓
                  </span>
                ) : null;
              })}
            </div>
          </Card>
          
          {selectedShapes.length >= 3 && (
            <Button onClick={() => setTopicAStep(2)} className="w-full">
              Next Step →
            </Button>
          )}
        </div>
      )}

      {topicAStep === 2 && (
        <div className="space-y-6">
          <Card className="p-6 bg-red-50">
            <h3 className="text-xl font-bold mb-4">Position the shapes:</h3>
            
            <div className="space-y-4">
              {!triangleOnMat && (
                <div>
                  <p className="mb-2">First, click to place a blue triangle in the middle:</p>
                  <Button onClick={() => setTriangleOnMat(true)} variant="outline">
                    Place Triangle 🔺
                  </Button>
                </div>
              )}
              
              {triangleOnMat && !circlePosition && (
                <div>
                  <p className="mb-2">Put a circle NEXT TO the triangle:</p>
                  <div className="flex gap-4">
                    <Button onClick={() => setCirclePosition("left")} variant="outline">
                      Left Side ⭕
                    </Button>
                    <Button onClick={() => setCirclePosition("right")} variant="outline">
                      Right Side ⭕
                    </Button>
                  </div>
                </div>
              )}
              
              {circlePosition && !rectanglePosition && (
                <div>
                  <p className="mb-2">Put a rectangle UNDER the triangle:</p>
                  <Button onClick={() => setRectanglePosition("under")} variant="outline">
                    Place Rectangle Under 🟦
                  </Button>
                </div>
              )}
            </div>
            
            {/* Visual Mat */}
            <div className="mt-6 p-8 bg-white rounded-xl border-2 border-red-200 min-h-[200px] flex flex-col items-center justify-center">
              {triangleOnMat && (
                <div className="flex items-center gap-4">
                  {circlePosition === "left" && (
                    <svg width="50" height="50" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="#3b82f6" stroke="#000" strokeWidth="2" />
                    </svg>
                  )}
                  <svg width="60" height="60" viewBox="0 0 100 100">
                    <polygon points="50,10 10,90 90,90" fill="#3b82f6" stroke="#000" strokeWidth="2" />
                  </svg>
                  {circlePosition === "right" && (
                    <svg width="50" height="50" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="#3b82f6" stroke="#000" strokeWidth="2" />
                    </svg>
                  )}
                </div>
              )}
              {rectanglePosition && (
                <svg width="90" height="50" viewBox="0 0 150 100" className="mt-2">
                  <rect x="10" y="20" width="130" height="60" fill="#3b82f6" stroke="#000" strokeWidth="2" />
                </svg>
              )}
            </div>
          </Card>
          
          {rectanglePosition && (
            <Button onClick={() => setTopicAStep(3)} className="w-full">
              Next Step →
            </Button>
          )}
        </div>
      )}

      {topicAStep === 3 && (
        <div className="space-y-6">
          <Card className="p-6 bg-red-50">
            <h3 className="text-xl font-bold mb-4">Sort all the triangles onto the mat:</h3>
            <p className="mb-4 text-muted-foreground">Click on all the triangles to put them on the mat</p>
            
            <div className="grid grid-cols-5 gap-4 p-4 bg-gray-100 rounded-xl mb-4">
              {shapes2D.filter(s => !sortedTriangles.includes(s.id)).map(shape => (
                <div key={shape.id} className="flex justify-center">
                  {renderShape2D(
                    shape,
                    50,
                    shape.type === "triangle" 
                      ? () => setSortedTriangles([...sortedTriangles, shape.id])
                      : undefined
                  )}
                </div>
              ))}
            </div>
            
            <div className="p-6 bg-white rounded-xl border-2 border-red-200 min-h-[120px]">
              <p className="text-sm text-muted-foreground mb-2">Triangles on the mat:</p>
              <div className="flex flex-wrap gap-4 justify-center">
                {sortedTriangles.map(id => {
                  const shape = shapes2D.find(s => s.id === id);
                  return shape ? (
                    <div key={id}>{renderShape2D(shape, 50)}</div>
                  ) : null;
                })}
              </div>
            </div>
            
            {sortedTriangles.length >= 3 && (
              <div className="mt-4 p-4 bg-yellow-50 rounded-xl">
                <p className="font-bold">What is the SAME about all triangles?</p>
                <p className="text-sm text-muted-foreground mt-2">
                  ✓ They all have 3 sides<br />
                  ✓ They all have 3 corners (vertices)
                </p>
              </div>
            )}
          </Card>
          
          {sortedTriangles.length >= 3 && (
            <Button onClick={handleTopicAComplete} className="w-full bg-green-600 hover:bg-green-700">
              Complete Topic A ✓
            </Button>
          )}
        </div>
      )}
    </motion.div>
  );

  const renderTopicB = () => (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-blue-600">Topic B: Constructing Two-Dimensional Shapes</h2>
        <p className="text-muted-foreground">Build a rectangle with straws</p>
      </div>

      <Card className="p-6 bg-blue-50">
        <h3 className="text-xl font-bold mb-4">Use straws to make a rectangle:</h3>
        <p className="mb-4 text-muted-foreground">Select straws to build your rectangle. You have 4 long and 4 short straws.</p>
        
        <div className="grid grid-cols-2 gap-8 mb-6">
          <div className="text-center">
            <p className="font-bold mb-2">Long Straws (4 available)</p>
            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3, 4].map(i => (
                <div 
                  key={`long-${i}`}
                  className={`w-24 h-4 rounded-full cursor-pointer transition-all ${
                    i <= strawsUsed.long ? "bg-blue-500" : "bg-gray-300"
                  }`}
                  onClick={() => setStrawsUsed(prev => ({
                    ...prev,
                    long: prev.long < 4 ? prev.long + 1 : 0
                  }))}
                />
              ))}
            </div>
            <p className="text-sm">Using: {strawsUsed.long}</p>
          </div>
          
          <div className="text-center">
            <p className="font-bold mb-2">Short Straws (4 available)</p>
            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3, 4].map(i => (
                <div 
                  key={`short-${i}`}
                  className={`w-12 h-4 rounded-full cursor-pointer transition-all ${
                    i <= strawsUsed.short ? "bg-green-500" : "bg-gray-300"
                  }`}
                  onClick={() => setStrawsUsed(prev => ({
                    ...prev,
                    short: prev.short < 4 ? prev.short + 1 : 0
                  }))}
                />
              ))}
            </div>
            <p className="text-sm">Using: {strawsUsed.short}</p>
          </div>
        </div>
        
        {/* Rectangle Preview */}
        <div className="p-8 bg-white rounded-xl border-2 border-blue-200 flex items-center justify-center min-h-[200px]">
          {strawsUsed.long >= 2 && strawsUsed.short >= 2 ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="relative"
            >
              {/* Top */}
              <div className="w-48 h-3 bg-blue-500 rounded-full absolute -top-1.5 left-0" />
              {/* Bottom */}
              <div className="w-48 h-3 bg-blue-500 rounded-full absolute -bottom-1.5 left-0" />
              {/* Left */}
              <div className="w-3 h-24 bg-green-500 rounded-full absolute top-0 -left-1.5" />
              {/* Right */}
              <div className="w-3 h-24 bg-green-500 rounded-full absolute top-0 -right-1.5" />
              <div className="w-48 h-24 border-4 border-transparent" />
            </motion.div>
          ) : (
            <p className="text-muted-foreground">Select 2 long and 2 short straws to build a rectangle</p>
          )}
        </div>
        
        {strawsUsed.long >= 2 && strawsUsed.short >= 2 && !rectangleBuilt && (
          <Button 
            onClick={() => setRectangleBuilt(true)} 
            className="w-full mt-4"
          >
            I'm done building! 🏗️
          </Button>
        )}
        
        {rectangleBuilt && (
          <div className="mt-4 p-4 bg-green-50 rounded-xl">
            <p className="font-bold text-green-700">Great rectangle! 🎉</p>
            <p className="text-sm">You used {strawsUsed.long + strawsUsed.short} straws total!</p>
          </div>
        )}
      </Card>
      
      {rectangleBuilt && (
        <Button onClick={handleTopicBComplete} className="w-full bg-green-600 hover:bg-green-700">
          Complete Topic B ✓
        </Button>
      )}
    </motion.div>
  );

  const renderTopicC = () => (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-green-600">Topic C: Three-Dimensional Shapes</h2>
        <p className="text-muted-foreground">Sort the 3D shapes by their flat sides</p>
      </div>

      <Card className="p-6 bg-green-50">
        <h3 className="text-xl font-bold mb-4">Sort the shapes:</h3>
        <p className="mb-4 text-muted-foreground">
          🔴 Red Mat: Shapes with 0 or 1 flat side<br />
          🔵 Blue Mat: Shapes with more than 1 flat side
        </p>
        
        {/* Unsorted shapes */}
        <div className="mb-6">
          <p className="font-bold mb-2">Shapes to sort:</p>
          <div className="flex flex-wrap gap-4 p-4 bg-gray-100 rounded-xl">
            {shapes3D
              .filter(s => !redMatShapes.includes(s.id) && !blueMatShapes.includes(s.id))
              .map(shape => renderShape3D(shape))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          {/* Red Mat */}
          <div 
            className="p-6 bg-red-100 rounded-xl border-2 border-red-300 min-h-[150px] cursor-pointer"
            onClick={() => {
              const unsorted = shapes3D.find(s => 
                !redMatShapes.includes(s.id) && !blueMatShapes.includes(s.id)
              );
              if (unsorted) {
                setRedMatShapes([...redMatShapes, unsorted.id]);
              }
            }}
          >
            <p className="font-bold text-red-700 mb-2">🔴 Red Mat (0-1 flat sides)</p>
            <div className="flex flex-wrap gap-2">
              {redMatShapes.map(id => {
                const shape = shapes3D.find(s => s.id === id);
                return shape ? (
                  <div key={id} onClick={(e) => {
                    e.stopPropagation();
                    setRedMatShapes(redMatShapes.filter(s => s !== id));
                  }}>
                    {renderShape3D(shape)}
                  </div>
                ) : null;
              })}
            </div>
          </div>
          
          {/* Blue Mat */}
          <div 
            className="p-6 bg-blue-100 rounded-xl border-2 border-blue-300 min-h-[150px] cursor-pointer"
            onClick={() => {
              const unsorted = shapes3D.find(s => 
                !redMatShapes.includes(s.id) && !blueMatShapes.includes(s.id)
              );
              if (unsorted) {
                setBlueMatShapes([...blueMatShapes, unsorted.id]);
              }
            }}
          >
            <p className="font-bold text-blue-700 mb-2">🔵 Blue Mat (2+ flat sides)</p>
            <div className="flex flex-wrap gap-2">
              {blueMatShapes.map(id => {
                const shape = shapes3D.find(s => s.id === id);
                return shape ? (
                  <div key={id} onClick={(e) => {
                    e.stopPropagation();
                    setBlueMatShapes(blueMatShapes.filter(s => s !== id));
                  }}>
                    {renderShape3D(shape)}
                  </div>
                ) : null;
              })}
            </div>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mt-4">
          Click a mat to add the next shape, or click a shape on a mat to remove it.
        </p>
      </Card>
      
      {redMatShapes.length + blueMatShapes.length === 6 && (
        <Button onClick={handleTopicCComplete} className="w-full bg-green-600 hover:bg-green-700">
          Complete Topic C ✓
        </Button>
      )}
    </motion.div>
  );

  const renderResults = () => {
    const totalScore = scores.topicA + scores.topicB + scores.topicC;
    const maxScore = 12;
    const percentage = Math.round((totalScore / maxScore) * 100);
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6"
      >
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold text-primary">Assessment Complete!</h2>
        
        <div className="max-w-md mx-auto space-y-4">
          <Card className="p-6 bg-red-50">
            <div className="flex justify-between items-center">
              <span className="font-bold">Topic A: 2D Shapes</span>
              <span className="text-2xl font-bold text-red-600">{scores.topicA}/4</span>
            </div>
            <div className="flex mt-2">
              {[1, 2, 3, 4].map(i => (
                <Star 
                  key={i} 
                  className={`w-6 h-6 ${i <= scores.topicA ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} 
                />
              ))}
            </div>
          </Card>
          
          <Card className="p-6 bg-blue-50">
            <div className="flex justify-between items-center">
              <span className="font-bold">Topic B: Constructing Shapes</span>
              <span className="text-2xl font-bold text-blue-600">{scores.topicB}/4</span>
            </div>
            <div className="flex mt-2">
              {[1, 2, 3, 4].map(i => (
                <Star 
                  key={i} 
                  className={`w-6 h-6 ${i <= scores.topicB ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} 
                />
              ))}
            </div>
          </Card>
          
          <Card className="p-6 bg-green-50">
            <div className="flex justify-between items-center">
              <span className="font-bold">Topic C: 3D Shapes</span>
              <span className="text-2xl font-bold text-green-600">{scores.topicC}/4</span>
            </div>
            <div className="flex mt-2">
              {[1, 2, 3, 4].map(i => (
                <Star 
                  key={i} 
                  className={`w-6 h-6 ${i <= scores.topicC ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} 
                />
              ))}
            </div>
          </Card>
          
          <Card className="p-6 bg-gradient-to-r from-purple-100 to-pink-100">
            <p className="text-lg font-bold">Total Score</p>
            <p className="text-4xl font-bold text-purple-600">{totalScore}/{maxScore}</p>
            <p className="text-2xl mt-2">{percentage}%</p>
            {percentage >= 75 && <p className="text-green-600 font-bold mt-2">Excellent work! ⭐</p>}
            {percentage >= 50 && percentage < 75 && <p className="text-blue-600 font-bold mt-2">Good job! Keep practicing!</p>}
            {percentage < 50 && <p className="text-orange-600 font-bold mt-2">Let's practice more!</p>}
          </Card>
        </div>
        
        <div className="flex gap-4 justify-center">
          <Button variant="outline" onClick={() => navigate("/activities-module-2")}>
            Back to Module 2
          </Button>
          <Button onClick={() => {
            setPhase("intro");
            setScores({ topicA: 0, topicB: 0, topicC: 0 });
            setSelectedShapes([]);
            setMatShapes([]);
            setTriangleOnMat(false);
            setCirclePosition(null);
            setRectanglePosition(null);
            setSortedTriangles([]);
            setStrawsUsed({ long: 0, short: 0 });
            setRectangleBuilt(false);
            setRedMatShapes([]);
            setBlueMatShapes([]);
          }}>
            Try Again
          </Button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-pink-50 to-blue-100">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/activities-module-2")}
            className="hover:bg-white/50"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-primary">Module 2 Assessment</h1>
            <p className="text-muted-foreground">Shapes: 2D and 3D</p>
          </div>
          
          {phase !== "intro" && phase !== "results" && (
            <div className="ml-auto flex gap-2">
              <span className={`px-3 py-1 rounded-full text-sm ${phase === "topicA" ? "bg-red-500 text-white" : "bg-gray-200"}`}>
                Topic A
              </span>
              <span className={`px-3 py-1 rounded-full text-sm ${phase === "topicB" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                Topic B
              </span>
              <span className={`px-3 py-1 rounded-full text-sm ${phase === "topicC" ? "bg-green-500 text-white" : "bg-gray-200"}`}>
                Topic C
              </span>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {phase === "intro" && renderIntro()}
            {phase === "topicA" && renderTopicA()}
            {phase === "topicB" && renderTopicB()}
            {phase === "topicC" && renderTopicC()}
            {phase === "results" && renderResults()}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default EndOfModule2Assessment;
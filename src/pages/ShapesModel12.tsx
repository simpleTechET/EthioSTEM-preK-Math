import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Home, RotateCcw, Volume2, Play, Trash2, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Shape3D = 'sphere' | 'cube' | 'cylinder' | 'cone' | 'block';

interface PlacedShape {
  id: number;
  shape: Shape3D;
  x: number;
  y: number;
  label: string;
}

interface RoomItem {
  name: string;
  shape: Shape3D;
  description: string;
}

const roomItems: RoomItem[] = [
  { name: 'Bookshelf', shape: 'block', description: 'A tall rectangular block for the bookshelf' },
  { name: 'Table', shape: 'cylinder', description: 'A round table in the center' },
  { name: 'Chair', shape: 'cube', description: 'A cube-shaped chair' },
  { name: 'Lamp', shape: 'cone', description: 'A cone-shaped lamp' },
  { name: 'Ball', shape: 'sphere', description: 'A round ball on the floor' },
];

const placeOptions = [
  { id: 'classroom', name: 'Classroom', items: ['Desk', 'Chair', 'Bookshelf', 'Rug', 'Teacher Desk'] },
  { id: 'playground', name: 'Playground', items: ['Slide', 'Swing', 'Ball', 'Sandbox', 'Bench'] },
  { id: 'bedroom', name: 'Bedroom', items: ['Bed', 'Dresser', 'Lamp', 'Toy Box', 'Rug'] },
];

const shapeNames: Record<Shape3D, string> = {
  sphere: 'Ball',
  cube: 'Cube',
  cylinder: 'Cylinder',
  cone: 'Cone',
  block: 'Block',
};

const ShapesModel12: React.FC = () => {
  const navigate = useNavigate();
  const [currentPhase, setCurrentPhase] = useState<'intro' | 'marching' | 'story' | 'modeling' | 'debrief'>('intro');
  const [marchCount, setMarchCount] = useState(0);
  const [isMarching, setIsMarching] = useState(false);
  const [storyPage, setStoryPage] = useState(0);
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
  const [selectedShape, setSelectedShape] = useState<Shape3D | null>(null);
  const [placedShapes, setPlacedShapes] = useState<PlacedShape[]>([]);
  const [currentLabel, setCurrentLabel] = useState('');
  const [showLabelInput, setShowLabelInput] = useState(false);
  const [pendingPosition, setPendingPosition] = useState<{ x: number; y: number } | null>(null);
  const [dollPosition, setDollPosition] = useState<{ x: number; y: number } | null>(null);

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1.1;
    speechSynthesis.speak(utterance);
  };

  const handleMarch = () => {
    if (marchCount < 7) {
      setIsMarching(true);
      const newCount = marchCount + 1;
      setMarchCount(newCount);
      speak(newCount === 5 ? 'fiiiive' : newCount.toString());
      setTimeout(() => setIsMarching(false), 300);

      if (newCount === 7) {
        setTimeout(() => {
          speak("Great marching! You counted to 7! Now let's hear a story about shapes!");
          setTimeout(() => setCurrentPhase('story'), 1500);
        }, 500);
      }
    }
  };

  const storyPages = [
    {
      title: "The Shape Journey",
      content: "Tim got a secret message about finding his birthday present. The message had shapes that showed him where to go!",
      shape: null,
    },
    {
      title: "The Oval Rock",
      content: "First, Tim saw an OVAL shape on the map. It stood for the big oval rock in the garden!",
      shape: 'oval',
      shapeColor: 'hsl(var(--chart-1))',
    },
    {
      title: "The Triangle Tree",
      content: "Next, Tim saw a TRIANGLE. It was a model of the pointy pine tree!",
      shape: 'triangle',
      shapeColor: 'hsl(var(--chart-2))',
    },
    {
      title: "The Circle Pond",
      content: "Then, Tim found a CIRCLE. It represented the round pond!",
      shape: 'circle',
      shapeColor: 'hsl(var(--chart-3))',
    },
    {
      title: "The Rectangle Door",
      content: "Finally, Tim saw a RECTANGLE. It was a model of the shed door where his present was hidden!",
      shape: 'rectangle',
      shapeColor: 'hsl(var(--chart-4))',
    },
    {
      title: "Shapes as Models",
      content: "Shapes can be models of real things! Now let's use shapes to make our own model!",
      shape: null,
    },
  ];

  const renderStoryShape = (shape: string | null, color: string) => {
    if (!shape) return null;
    
    switch (shape) {
      case 'oval':
        return <div className="w-24 h-16 rounded-[50%]" style={{ backgroundColor: color }} />;
      case 'triangle':
        return (
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: '48px solid transparent',
              borderRight: '48px solid transparent',
              borderBottom: `80px solid ${color}`,
            }}
          />
        );
      case 'circle':
        return <div className="w-20 h-20 rounded-full" style={{ backgroundColor: color }} />;
      case 'rectangle':
        return <div className="w-28 h-16 rounded-sm" style={{ backgroundColor: color }} />;
      default:
        return null;
    }
  };

  const renderShape3D = (shape: Shape3D, size: number = 50) => {
    const colors = {
      sphere: 'hsl(var(--chart-1))',
      cube: 'hsl(var(--chart-2))',
      cylinder: 'hsl(var(--chart-3))',
      cone: 'hsl(var(--chart-4))',
      block: 'hsl(var(--chart-5))',
    };

    switch (shape) {
      case 'sphere':
        return (
          <div
            className="rounded-full"
            style={{
              width: size,
              height: size,
              background: `radial-gradient(circle at 30% 30%, ${colors.sphere}, hsl(var(--chart-1) / 0.6))`,
              boxShadow: `inset -${size/6}px -${size/6}px ${size/3}px rgba(0,0,0,0.3)`
            }}
          />
        );
      case 'cube':
        return (
          <div
            style={{
              width: size * 0.8,
              height: size * 0.8,
              background: colors.cube,
              boxShadow: `${size/10}px -${size/10}px 0 hsl(var(--chart-2) / 0.7)`
            }}
          />
        );
      case 'cylinder':
        return (
          <div className="relative" style={{ width: size, height: size * 1.1 }}>
            <div
              className="absolute rounded-full"
              style={{
                width: size,
                height: size * 0.3,
                top: 0,
                background: `linear-gradient(90deg, hsl(var(--chart-3) / 0.8), ${colors.cylinder}, hsl(var(--chart-3) / 0.8))`,
              }}
            />
            <div
              className="absolute"
              style={{
                width: size,
                height: size * 0.8,
                top: size * 0.15,
                background: `linear-gradient(90deg, hsl(var(--chart-3) / 0.6), ${colors.cylinder}, hsl(var(--chart-3) / 0.6))`,
              }}
            />
          </div>
        );
      case 'cone':
        return (
          <div className="relative" style={{ width: size, height: size * 1.1 }}>
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: `${size/2}px solid transparent`,
                borderRight: `${size/2}px solid transparent`,
                borderBottom: `${size}px solid ${colors.cone}`,
              }}
            />
          </div>
        );
      case 'block':
        return (
          <div
            style={{
              width: size * 1.4,
              height: size * 0.7,
              background: colors.block,
              boxShadow: `${size/12}px -${size/12}px 0 hsl(var(--chart-5) / 0.7)`,
            }}
          />
        );
    }
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedShape) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setPendingPosition({ x, y });
    setShowLabelInput(true);
  };

  const addShapeWithLabel = () => {
    if (pendingPosition && selectedShape) {
      setPlacedShapes(prev => [...prev, {
        id: Date.now(),
        shape: selectedShape,
        x: pendingPosition.x,
        y: pendingPosition.y,
        label: currentLabel || shapeNames[selectedShape],
      }]);
      setShowLabelInput(false);
      setCurrentLabel('');
      setPendingPosition(null);
      speak(`${currentLabel || shapeNames[selectedShape]} placed!`);
    }
  };

  const removeShape = (id: number) => {
    setPlacedShapes(prev => prev.filter(s => s.id !== id));
  };

  const walkDoll = () => {
    if (placedShapes.length === 0) return;
    
    let index = 0;
    const walkToNext = () => {
      if (index < placedShapes.length) {
        const shape = placedShapes[index];
        setDollPosition({ x: shape.x, y: shape.y });
        speak(`The doll is walking to the ${shape.label}!`);
        index++;
        setTimeout(walkToNext, 2000);
      } else {
        setDollPosition(null);
      }
    };
    walkToNext();
  };

  const renderIntro = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center space-y-6"
    >
      <h2 className="text-3xl font-bold text-primary">Build a Model!</h2>
      <p className="text-xl text-muted-foreground">
        Today we'll use solid shapes to make a model of a familiar place!
      </p>
      <div className="flex justify-center gap-4 flex-wrap py-6">
        {(['cube', 'block', 'cylinder', 'cone', 'sphere'] as Shape3D[]).map((shape, i) => (
          <motion.div
            key={shape}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15 * i }}
            className="flex flex-col items-center gap-2"
          >
            {renderShape3D(shape, 45)}
            <span className="text-xs text-muted-foreground">{shapeNames[shape]}</span>
          </motion.div>
        ))}
      </div>
      <p className="text-muted-foreground">
        A model uses shapes to represent real things!
      </p>
      <Button onClick={() => { setCurrentPhase('marching'); speak("Let's march and count to 7!"); }} size="lg">
        <Play className="mr-2" /> Start Activity
      </Button>
    </motion.div>
  );

  const renderMarching = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center space-y-6"
    >
      <h2 className="text-2xl font-bold text-primary">March and Count to 7!</h2>
      <p className="text-muted-foreground">Tap to march and count. Say "fiiiive" at 5!</p>

      <div className="flex justify-center gap-2 py-4">
        {Array.from({ length: 7 }, (_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ 
              scale: i < marchCount ? 1 : 0.5, 
              opacity: i < marchCount ? 1 : 0.3,
              y: isMarching && i === marchCount - 1 ? -10 : 0
            }}
            className={`w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold
              ${i < marchCount ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
          >
            {i + 1}
          </motion.div>
        ))}
      </div>

      <motion.div
        animate={{ y: isMarching ? -15 : 0 }}
        transition={{ type: 'spring', stiffness: 500 }}
        className="text-8xl mx-auto"
      >
        🚶
      </motion.div>

      <Button 
        onClick={handleMarch} 
        disabled={marchCount >= 7}
        size="lg"
        className="text-xl px-8 py-6"
      >
        March! ({marchCount}/7)
      </Button>

      <Button variant="outline" onClick={() => setMarchCount(0)}>
        <RotateCcw className="mr-2 w-4 h-4" /> Start Over
      </Button>
    </motion.div>
  );

  const renderStory = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-primary text-center">Shapes Tell a Story!</h2>

      <Card className="p-6 min-h-[250px] flex flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={storyPage}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold">{storyPages[storyPage].title}</h3>
            
            {storyPages[storyPage].shape && (
              <div className="flex justify-center py-4">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', damping: 10 }}
                >
                  {renderStoryShape(storyPages[storyPage].shape, storyPages[storyPage].shapeColor || '')}
                </motion.div>
              </div>
            )}
            
            <p className="text-lg text-muted-foreground">{storyPages[storyPage].content}</p>
          </motion.div>
        </AnimatePresence>
      </Card>

      <div className="flex justify-center gap-2">
        {storyPages.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === storyPage ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>

      <div className="flex justify-center gap-4">
        <Button
          variant="outline"
          onClick={() => setStoryPage(p => p - 1)}
          disabled={storyPage === 0}
        >
          <ArrowLeft className="mr-2 w-4 h-4" /> Back
        </Button>
        
        {storyPage < storyPages.length - 1 ? (
          <Button onClick={() => { setStoryPage(p => p + 1); speak(storyPages[storyPage + 1].content); }}>
            Next <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        ) : (
          <Button onClick={() => { setCurrentPhase('modeling'); speak("Now let's build our own model!"); }}>
            Build a Model! <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        )}
      </div>
    </motion.div>
  );

  const renderModeling = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-primary">Build Your Model!</h2>
        <p className="text-sm text-muted-foreground">
          {!selectedPlace ? "Choose a place to model:" : 
           !selectedShape ? "Select a shape, then tap the canvas to place it:" :
           "Tap on the canvas to place your shape!"}
        </p>
      </div>

      {/* Place selection */}
      {!selectedPlace && (
        <div className="flex justify-center gap-4 flex-wrap">
          {placeOptions.map((place) => (
            <motion.button
              key={place.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setSelectedPlace(place.id); speak(`Let's build a model of the ${place.name}!`); }}
              className="p-4 rounded-xl border-2 border-border bg-card hover:border-primary transition-all"
            >
              <div className="text-3xl mb-2">
                {place.id === 'classroom' ? '🏫' : place.id === 'playground' ? '🛝' : '🛏️'}
              </div>
              <p className="font-medium">{place.name}</p>
            </motion.button>
          ))}
        </div>
      )}

      {selectedPlace && (
        <>
          {/* Shape palette */}
          <div className="flex justify-center gap-3 flex-wrap">
            {(['cube', 'block', 'cylinder', 'cone', 'sphere'] as Shape3D[]).map((shape) => (
              <motion.button
                key={shape}
                onClick={() => setSelectedShape(shape)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-xl border-2 transition-all
                  ${selectedShape === shape ? 'border-primary bg-primary/10' : 'border-border bg-card'}`}
              >
                {renderShape3D(shape, 35)}
                <p className="mt-1 text-xs font-medium">{shapeNames[shape]}</p>
              </motion.button>
            ))}
          </div>

          {/* Modeling canvas */}
          <div
            className="relative h-64 bg-gradient-to-b from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-amber-800/20 
              rounded-xl border-2 border-border overflow-hidden cursor-pointer"
            onClick={handleCanvasClick}
          >
            {/* Room outline */}
            <div className="absolute inset-4 border-2 border-dashed border-amber-400/50 rounded-lg" />
            
            {/* Door indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-amber-600 rounded" />
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs text-amber-600">Door</span>

            {/* Placed shapes */}
            {placedShapes.map((item) => (
              <motion.div
                key={item.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute group"
                style={{ left: item.x - 25, top: item.y - 25 }}
              >
                {renderShape3D(item.shape, 40)}
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium bg-background/80 px-1 rounded">
                  {item.label}
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); removeShape(item.id); }}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-destructive text-destructive-foreground rounded-full 
                    opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </motion.div>
            ))}

            {/* Walking doll */}
            {dollPosition && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ x: dollPosition.x - 15, y: dollPosition.y - 40, scale: 1 }}
                transition={{ type: 'spring', damping: 15 }}
                className="absolute text-3xl"
              >
                🧍
              </motion.div>
            )}

            {placedShapes.length === 0 && !showLabelInput && (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                {selectedShape ? "Tap to place your shape!" : "Select a shape first"}
              </div>
            )}
          </div>

          {/* Label input modal */}
          {showLabelInput && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="fixed inset-0 bg-background/80 flex items-center justify-center z-50 p-4"
              onClick={() => setShowLabelInput(false)}
            >
              <Card className="p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
                <h3 className="font-bold text-lg mb-4">What does this shape represent?</h3>
                <div className="flex justify-center mb-4">
                  {selectedShape && renderShape3D(selectedShape, 50)}
                </div>
                <input
                  type="text"
                  value={currentLabel}
                  onChange={(e) => setCurrentLabel(e.target.value)}
                  placeholder={`e.g., ${placeOptions.find(p => p.id === selectedPlace)?.items[0] || 'Desk'}`}
                  className="w-full p-3 border rounded-lg mb-4 bg-background"
                  autoFocus
                />
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setShowLabelInput(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={addShapeWithLabel} className="flex-1">
                    Add Shape
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Controls */}
          <div className="flex justify-center gap-3 flex-wrap">
            <Button variant="outline" onClick={() => setPlacedShapes([])}>
              <RotateCcw className="mr-2 w-4 h-4" /> Clear
            </Button>
            <Button 
              variant="outline" 
              onClick={walkDoll}
              disabled={placedShapes.length === 0}
            >
              <Users className="mr-2 w-4 h-4" /> Walk Through
            </Button>
            <Button 
              onClick={() => { speak("Great model! Let's talk about what we made!"); setCurrentPhase('debrief'); }}
              disabled={placedShapes.length < 2}
            >
              <ArrowRight className="mr-2" /> Finish Model
            </Button>
          </div>
        </>
      )}
    </motion.div>
  );

  const renderDebrief = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-primary text-center">What Did We Make?</h2>

      <Card className="p-6">
        <h3 className="font-bold text-lg mb-4">Your Model of the {placeOptions.find(p => p.id === selectedPlace)?.name}</h3>
        
        <div className="bg-muted/50 rounded-lg p-4 mb-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {placedShapes.map((item) => (
              <div key={item.id} className="flex flex-col items-center gap-2">
                {renderShape3D(item.shape, 40)}
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2 text-muted-foreground">
          <p>🎉 You used <strong>{placedShapes.length}</strong> shapes to make your model!</p>
          <p>Each shape represents something real in the {placeOptions.find(p => p.id === selectedPlace)?.name.toLowerCase()}.</p>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-bold mb-3">💡 Key Ideas</h3>
        <ul className="text-sm text-muted-foreground space-y-2">
          <li>• A <strong>model</strong> uses shapes to represent real things</li>
          <li>• We can use position words: next to, above, below, in front of</li>
          <li>• Different shapes can represent different objects</li>
          <li>• Models help us understand how things are arranged</li>
        </ul>
      </Card>

      <Card className="p-4 bg-primary/5 border-primary/20">
        <h3 className="font-bold mb-2">🏠 Try at Home!</h3>
        <p className="text-sm text-muted-foreground">
          Make a model of your bedroom or another room in your home with your family!
        </p>
      </Card>

      <div className="text-center pt-4">
        <Button onClick={() => navigate('/activities-module-2')} size="lg">
          <Home className="mr-2" /> Back to Activities
        </Button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => navigate('/activities-module-2')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <h1 className="text-xl font-bold text-primary">Lesson 12: Model a Place</h1>
          <Button variant="ghost" size="icon" onClick={() => speak("Build a model of a familiar place!")}>
            <Volume2 className="h-5 w-5" />
          </Button>
        </div>

        {/* Progress */}
        <div className="flex justify-center gap-2 mb-6">
          {['intro', 'marching', 'story', 'modeling', 'debrief'].map((phase, i) => (
            <div
              key={phase}
              className={`w-3 h-3 rounded-full transition-colors ${
                ['intro', 'marching', 'story', 'modeling', 'debrief'].indexOf(currentPhase) >= i
                  ? 'bg-primary'
                  : 'bg-muted'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <Card className="p-6">
          <AnimatePresence mode="wait">
            {currentPhase === 'intro' && renderIntro()}
            {currentPhase === 'marching' && renderMarching()}
            {currentPhase === 'story' && renderStory()}
            {currentPhase === 'modeling' && renderModeling()}
            {currentPhase === 'debrief' && renderDebrief()}
          </AnimatePresence>
        </Card>
      </div>
    </div>
  );
};

export default ShapesModel12;

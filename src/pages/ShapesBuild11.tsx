import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Home, RotateCcw, Volume2, Drum, Play, Square, Circle, Triangle, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Shape3D = 'sphere' | 'cube' | 'cylinder' | 'cone' | 'block';

interface ShapeProps {
  canRoll: boolean;
  canSlide: boolean;
  canStack: boolean;
}

const shapeProperties: Record<Shape3D, ShapeProps> = {
  sphere: { canRoll: true, canSlide: false, canStack: false },
  cube: { canRoll: false, canSlide: true, canStack: true },
  cylinder: { canRoll: true, canSlide: true, canStack: true },
  cone: { canRoll: true, canSlide: true, canStack: false },
  block: { canRoll: false, canSlide: true, canStack: true },
};

const shapeNames: Record<Shape3D, string> = {
  sphere: 'Ball',
  cube: 'Cube',
  cylinder: 'Cylinder',
  cone: 'Cone',
  block: 'Block',
};

const ShapesBuild11: React.FC = () => {
  const navigate = useNavigate();
  const [currentPhase, setCurrentPhase] = useState<'intro' | 'drumming' | 'rolling' | 'building' | 'debrief'>('intro');
  const [drumCount, setDrumCount] = useState(0);
  const [targetCount, setTargetCount] = useState(6);
  const [isDrumming, setIsDrumming] = useState(false);
  const [currentTestShape, setCurrentTestShape] = useState<Shape3D | null>(null);
  const [testResults, setTestResults] = useState<Record<Shape3D, { roll?: boolean; slide?: boolean; stack?: boolean }>>({
    sphere: {},
    cube: {},
    cylinder: {},
    cone: {},
    block: {},
  });
  const [buildingBlocks, setBuildingBlocks] = useState<{ id: number; shape: Shape3D; x: number; y: number }[]>([]);
  const [selectedBuildShape, setSelectedBuildShape] = useState<Shape3D | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [currentTest, setCurrentTest] = useState<'roll' | 'slide' | 'stack'>('roll');

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1.1;
    speechSynthesis.speak(utterance);
  };

  const handleDrum = () => {
    if (drumCount < targetCount) {
      setIsDrumming(true);
      const newCount = drumCount + 1;
      setDrumCount(newCount);
      speak(newCount === 5 ? 'fiiiive' : newCount.toString());
      setTimeout(() => setIsDrumming(false), 200);

      if (newCount === targetCount) {
        setTimeout(() => {
          if (targetCount === 6) {
            speak("Great job counting to 6! Now let's count to 7!");
            setTargetCount(7);
            setDrumCount(0);
          } else {
            speak("Wonderful! You counted to 7! Now let's learn about shapes!");
            setTimeout(() => setCurrentPhase('rolling'), 1500);
          }
        }, 500);
      }
    }
  };

  const resetDrumming = () => {
    setDrumCount(0);
    setTargetCount(6);
  };

  const testShape = (shape: Shape3D, test: 'roll' | 'slide' | 'stack') => {
    setCurrentTestShape(shape);
    const props = shapeProperties[shape];
    const result = test === 'roll' ? props.canRoll : test === 'slide' ? props.canSlide : props.canStack;
    
    setTimeout(() => {
      setTestResults(prev => ({
        ...prev,
        [shape]: { ...prev[shape], [test]: result }
      }));
      
      const action = test === 'roll' ? (result ? 'rolls' : "doesn't roll") :
                     test === 'slide' ? (result ? 'slides' : "doesn't slide") :
                     (result ? 'stacks' : "doesn't stack well");
      speak(`The ${shapeNames[shape].toLowerCase()} ${action}!`);
      
      setTimeout(() => setCurrentTestShape(null), 1000);
    }, 1500);
  };

  const allShapesTested = () => {
    const shapes: Shape3D[] = ['sphere', 'cube', 'cylinder', 'cone', 'block'];
    return shapes.every(shape => testResults[shape][currentTest] !== undefined);
  };

  const nextTest = () => {
    if (currentTest === 'roll') {
      setCurrentTest('slide');
      speak("Now let's see which shapes can slide!");
    } else if (currentTest === 'slide') {
      setCurrentTest('stack');
      speak("Now let's see which shapes can stack!");
    } else {
      setShowResults(true);
      speak("Great job! Now let's build with our shapes!");
      setTimeout(() => setCurrentPhase('building'), 2000);
    }
  };

  const addBuildingBlock = (x: number, y: number) => {
    if (selectedBuildShape) {
      setBuildingBlocks(prev => [...prev, {
        id: Date.now(),
        shape: selectedBuildShape,
        x,
        y
      }]);
    }
  };

  const renderShape3D = (shape: Shape3D, size: number = 60, color: string = 'primary') => {
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
              boxShadow: `inset -${size/6}px -${size/6}px ${size/3}px rgba(0,0,0,0.3), ${size/10}px ${size/10}px ${size/5}px rgba(0,0,0,0.2)`
            }}
          />
        );
      case 'cube':
        return (
          <div
            className="relative"
            style={{ width: size, height: size }}
          >
            <div
              className="absolute"
              style={{
                width: size * 0.8,
                height: size * 0.8,
                bottom: 0,
                left: size * 0.1,
                background: colors.cube,
                boxShadow: `${size/8}px -${size/8}px 0 hsl(var(--chart-2) / 0.7), ${size/16}px -${size/16}px 0 hsl(var(--chart-2) / 0.5)`
              }}
            />
          </div>
        );
      case 'cylinder':
        return (
          <div className="relative" style={{ width: size, height: size * 1.2 }}>
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
                height: size * 0.9,
                top: size * 0.15,
                background: `linear-gradient(90deg, hsl(var(--chart-3) / 0.6), ${colors.cylinder}, hsl(var(--chart-3) / 0.6))`,
                borderRadius: '0 0 4px 4px',
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                width: size,
                height: size * 0.3,
                bottom: 0,
                background: `linear-gradient(90deg, hsl(var(--chart-3) / 0.5), hsl(var(--chart-3) / 0.7), hsl(var(--chart-3) / 0.5))`,
              }}
            />
          </div>
        );
      case 'cone':
        return (
          <div className="relative" style={{ width: size, height: size * 1.2 }}>
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: `${size/2}px solid transparent`,
                borderRight: `${size/2}px solid transparent`,
                borderBottom: `${size}px solid ${colors.cone}`,
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                width: size,
                height: size * 0.25,
                bottom: 0,
                background: `linear-gradient(90deg, hsl(var(--chart-4) / 0.6), hsl(var(--chart-4) / 0.8), hsl(var(--chart-4) / 0.6))`,
              }}
            />
          </div>
        );
      case 'block':
        return (
          <div
            className="relative"
            style={{ width: size * 1.5, height: size * 0.8 }}
          >
            <div
              className="absolute"
              style={{
                width: size * 1.3,
                height: size * 0.6,
                bottom: 0,
                left: size * 0.1,
                background: colors.block,
                boxShadow: `${size/10}px -${size/10}px 0 hsl(var(--chart-5) / 0.7)`,
              }}
            />
          </div>
        );
    }
  };

  const renderIntro = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center space-y-6"
    >
      <h2 className="text-3xl font-bold text-primary">Build with Solid Shapes!</h2>
      <p className="text-xl text-muted-foreground">
        Today we'll learn which shapes can roll, slide, and stack. Then we'll build!
      </p>
      <div className="flex justify-center gap-4 flex-wrap py-6">
        {(['sphere', 'cube', 'cylinder', 'cone', 'block'] as Shape3D[]).map((shape) => (
          <motion.div
            key={shape}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 * ['sphere', 'cube', 'cylinder', 'cone', 'block'].indexOf(shape) }}
            className="flex flex-col items-center gap-2"
          >
            {renderShape3D(shape, 50)}
            <span className="text-sm text-muted-foreground">{shapeNames[shape]}</span>
          </motion.div>
        ))}
      </div>
      <Button onClick={() => { setCurrentPhase('drumming'); speak("Let's play the drums and count to 6!"); }} size="lg">
        <Play className="mr-2" /> Start Activity
      </Button>
    </motion.div>
  );

  const renderDrumming = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center space-y-6"
    >
      <h2 className="text-2xl font-bold text-primary">Drum and Count to {targetCount}!</h2>
      <p className="text-lg text-muted-foreground">
        Tap the drum and count. Say "fiiiive" when you reach 5!
      </p>

      <div className="flex justify-center gap-2 py-4">
        {Array.from({ length: targetCount }, (_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: i < drumCount ? 1 : 0.5, opacity: i < drumCount ? 1 : 0.3 }}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold
              ${i < drumCount ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
          >
            {i + 1}
          </motion.div>
        ))}
      </div>

      <motion.button
        onClick={handleDrum}
        disabled={drumCount >= targetCount}
        animate={{ scale: isDrumming ? 0.9 : 1 }}
        className="w-40 h-40 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 
          flex items-center justify-center shadow-xl mx-auto cursor-pointer
          hover:from-amber-500 hover:to-amber-700 transition-colors disabled:opacity-50"
      >
        <Drum className="w-20 h-20 text-amber-100" />
      </motion.button>

      <p className="text-xl font-bold text-primary">
        Count: {drumCount} / {targetCount}
      </p>

      <Button variant="outline" onClick={resetDrumming}>
        <RotateCcw className="mr-2 w-4 h-4" /> Start Over
      </Button>
    </motion.div>
  );

  const renderRolling = () => {
    const shapes: Shape3D[] = ['sphere', 'cube', 'cylinder', 'cone', 'block'];
    const testLabel = currentTest === 'roll' ? 'Roll' : currentTest === 'slide' ? 'Slide' : 'Stack';
    const testDescription = currentTest === 'roll' 
      ? 'Tap a shape to see if it can roll down the ramp!'
      : currentTest === 'slide'
      ? 'Tap a shape to see if it can slide!'
      : 'Tap a shape to see if it can stack!';

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary">Test: Can It {testLabel}?</h2>
          <p className="text-muted-foreground">{testDescription}</p>
        </div>

        {/* Ramp visualization for roll test */}
        {currentTest === 'roll' && (
          <div className="relative h-32 mx-auto max-w-md">
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-amber-800 to-amber-600 transform -skew-y-6 origin-left rounded" />
            {currentTestShape && (
              <motion.div
                initial={{ x: 20, y: -80 }}
                animate={{ x: 280, y: 0 }}
                transition={{ duration: 1.5, ease: 'easeIn' }}
                className="absolute"
              >
                {renderShape3D(currentTestShape, 40)}
              </motion.div>
            )}
          </div>
        )}

        {/* Slide visualization */}
        {currentTest === 'slide' && (
          <div className="relative h-24 mx-auto max-w-md">
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-muted rounded" />
            {currentTestShape && (
              <motion.div
                initial={{ x: 20 }}
                animate={{ x: 280 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="absolute bottom-2"
              >
                {renderShape3D(currentTestShape, 40)}
              </motion.div>
            )}
          </div>
        )}

        {/* Stack visualization */}
        {currentTest === 'stack' && (
          <div className="relative h-32 mx-auto max-w-md flex justify-center">
            {currentTestShape && (
              <motion.div
                initial={{ y: -60 }}
                animate={{ y: shapeProperties[currentTestShape].canStack ? 0 : 20 }}
                transition={{ duration: 1, type: 'spring', bounce: shapeProperties[currentTestShape].canStack ? 0.3 : 0.8 }}
                className="relative z-10"
              >
                {renderShape3D(currentTestShape, 40)}
              </motion.div>
            )}
            <div className="absolute bottom-0">
              {renderShape3D('cube', 50)}
            </div>
          </div>
        )}

        {/* Shape selection */}
        <div className="flex justify-center gap-4 flex-wrap">
          {shapes.map((shape) => {
            const tested = testResults[shape][currentTest] !== undefined;
            const result = testResults[shape][currentTest];
            
            return (
              <motion.button
                key={shape}
                onClick={() => !tested && !currentTestShape && testShape(shape, currentTest)}
                disabled={tested || currentTestShape !== null}
                whileHover={{ scale: tested ? 1 : 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-xl border-2 transition-all relative
                  ${tested 
                    ? result 
                      ? 'border-green-500 bg-green-500/10' 
                      : 'border-red-500 bg-red-500/10'
                    : 'border-border hover:border-primary bg-card'
                  }
                  ${currentTestShape === shape ? 'ring-2 ring-primary' : ''}
                  disabled:cursor-not-allowed`}
              >
                {renderShape3D(shape, 50)}
                <p className="mt-2 text-sm font-medium">{shapeNames[shape]}</p>
                {tested && (
                  <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center
                    ${result ? 'bg-green-500' : 'bg-red-500'}`}>
                    {result ? <Check className="w-4 h-4 text-white" /> : <X className="w-4 h-4 text-white" />}
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        {allShapesTested() && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Button onClick={nextTest} size="lg">
              <ArrowRight className="mr-2" />
              {currentTest === 'stack' ? "Let's Build!" : 'Next Test'}
            </Button>
          </motion.div>
        )}
      </motion.div>
    );
  };

  const renderBuilding = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-primary">Build with Shapes!</h2>
        <p className="text-muted-foreground">Select a shape, then tap the building area to place it.</p>
      </div>

      {/* Shape palette */}
      <div className="flex justify-center gap-3 flex-wrap">
        {(['cube', 'block', 'cylinder', 'cone', 'sphere'] as Shape3D[]).map((shape) => (
          <motion.button
            key={shape}
            onClick={() => setSelectedBuildShape(shape)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`p-3 rounded-xl border-2 transition-all
              ${selectedBuildShape === shape ? 'border-primary bg-primary/10' : 'border-border bg-card'}`}
          >
            {renderShape3D(shape, 40)}
            <p className="mt-1 text-xs font-medium">{shapeNames[shape]}</p>
          </motion.button>
        ))}
      </div>

      {/* Building area */}
      <div
        className="relative h-64 bg-gradient-to-b from-sky-200 to-sky-100 dark:from-sky-900 dark:to-sky-800 
          rounded-xl border-2 border-border overflow-hidden cursor-pointer"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          addBuildingBlock(x, y);
        }}
      >
        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-green-700 to-green-500" />
        
        {/* Placed blocks */}
        {buildingBlocks.map((block) => (
          <motion.div
            key={block.id}
            initial={{ scale: 0, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            className="absolute"
            style={{ left: block.x - 25, top: block.y - 30 }}
          >
            {renderShape3D(block.shape, 40)}
          </motion.div>
        ))}

        {buildingBlocks.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            Tap here to place shapes!
          </div>
        )}
      </div>

      <div className="flex justify-center gap-4">
        <Button variant="outline" onClick={() => setBuildingBlocks([])}>
          <RotateCcw className="mr-2 w-4 h-4" /> Clear
        </Button>
        <Button onClick={() => { speak("Great building! Let's talk about what we learned!"); setCurrentPhase('debrief'); }}>
          <ArrowRight className="mr-2" /> Finish Building
        </Button>
      </div>
    </motion.div>
  );

  const renderDebrief = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-primary text-center">What Did We Learn?</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-4">
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
              <Check className="w-5 h-5 text-green-500" />
            </div>
            Shapes That Roll
          </h3>
          <div className="flex gap-3 flex-wrap">
            {(['sphere', 'cylinder', 'cone'] as Shape3D[]).map(shape => (
              <div key={shape} className="flex flex-col items-center">
                {renderShape3D(shape, 35)}
                <span className="text-xs mt-1">{shapeNames[shape]}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
              <ArrowRight className="w-5 h-5 text-blue-500" />
            </div>
            Shapes That Slide
          </h3>
          <div className="flex gap-3 flex-wrap">
            {(['cube', 'block', 'cylinder', 'cone'] as Shape3D[]).map(shape => (
              <div key={shape} className="flex flex-col items-center">
                {renderShape3D(shape, 35)}
                <span className="text-xs mt-1">{shapeNames[shape]}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
              <Square className="w-5 h-5 text-purple-500" />
            </div>
            Shapes That Stack
          </h3>
          <div className="flex gap-3 flex-wrap">
            {(['cube', 'block', 'cylinder'] as Shape3D[]).map(shape => (
              <div key={shape} className="flex flex-col items-center">
                {renderShape3D(shape, 35)}
                <span className="text-xs mt-1">{shapeNames[shape]}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-bold text-lg mb-3">💡 Building Tips</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Use flat shapes at the bottom for stability</li>
            <li>• Cubes and blocks stack the best</li>
            <li>• Put cones on top as decorations</li>
            <li>• Spheres roll away - hard to build with!</li>
          </ul>
        </Card>
      </div>

      <div className="text-center pt-4">
        <p className="text-lg text-muted-foreground mb-4">
          Great job learning about solid shapes! 🎉
        </p>
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
          <h1 className="text-xl font-bold text-primary">Lesson 11: Build with Shapes</h1>
          <Button variant="ghost" size="icon" onClick={() => speak("Build with solid shapes!")}>
            <Volume2 className="h-5 w-5" />
          </Button>
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center gap-2 mb-6">
          {['intro', 'drumming', 'rolling', 'building', 'debrief'].map((phase, i) => (
            <div
              key={phase}
              className={`w-3 h-3 rounded-full transition-colors ${
                ['intro', 'drumming', 'rolling', 'building', 'debrief'].indexOf(currentPhase) >= i
                  ? 'bg-primary'
                  : 'bg-muted'
              }`}
            />
          ))}
        </div>

        {/* Main content */}
        <Card className="p-6">
          <AnimatePresence mode="wait">
            {currentPhase === 'intro' && renderIntro()}
            {currentPhase === 'drumming' && renderDrumming()}
            {currentPhase === 'rolling' && renderRolling()}
            {currentPhase === 'building' && renderBuilding()}
            {currentPhase === 'debrief' && renderDebrief()}
          </AnimatePresence>
        </Card>
      </div>
    </div>
  );
};

export default ShapesBuild11;
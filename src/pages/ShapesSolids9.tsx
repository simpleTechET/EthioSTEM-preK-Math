import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Home, Volume2, Star, Drum, Search, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ShapesSolids9: React.FC = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<'intro' | 'drumming' | 'sticks' | 'mystery' | 'hunt' | 'clues' | 'celebration'>('intro');
  const [drumCount, setDrumCount] = useState(4);
  const [drumBeats, setDrumBeats] = useState<number[]>([]);
  const [isDrumming, setIsDrumming] = useState(false);
  const [currentShape, setCurrentShape] = useState<'rectangle' | 'square' | 'triangle'>('rectangle');
  const [sticksPlaced, setSticksPlaced] = useState(0);
  const [mysteryShapes, setMysteryShapes] = useState<string[]>(['sphere', 'cube', 'cylinder', 'cone']);
  const [sortedShapes, setSortedShapes] = useState<{[key: string]: string[]}>({
    round: [],
    pointy: [],
    flat: [],
    mixed: []
  });
  const [currentMysteryShape, setCurrentMysteryShape] = useState<string | null>(null);
  const [foundObjects, setFoundObjects] = useState<string[]>([]);
  const [currentClue, setCurrentClue] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [clueAnswers, setClueAnswers] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1.1;
    speechSynthesis.speak(utterance);
  };

  const shapeSticks = {
    rectangle: 4,
    square: 4,
    triangle: 3
  };

  const solidShapes = {
    sphere: { 
      color: '#FF6B6B', 
      description: 'Round and smooth, no flat or pointy parts',
      clue: "I'm holding a shape that is round and smooth. I don't feel anything flat or sharp."
    },
    cube: { 
      color: '#4ECDC4', 
      description: 'Lots of flat squares and pointy corners, like a box',
      clue: "I'm holding a shape that has lots of flat squares. There are lots of pointy corners. It feels like a box."
    },
    cylinder: { 
      color: '#45B7D1', 
      description: 'Two flat circles on top and bottom, round in the middle',
      clue: "I'm holding a shape that has two flat circles, one on the top and one on the bottom. It is round in the middle."
    },
    cone: { 
      color: '#96CEB4', 
      description: 'Flat circle on bottom, point on top',
      clue: "I'm holding a shape that has a flat circle on the bottom. It has a point on the top."
    }
  };

  const realWorldObjects = [
    { name: 'Ball', shape: 'sphere', emoji: '⚽' },
    { name: 'Soup Can', shape: 'cylinder', emoji: '🥫' },
    { name: 'Party Hat', shape: 'cone', emoji: '🎉' },
    { name: 'Dice', shape: 'cube', emoji: '🎲' },
    { name: 'Orange', shape: 'sphere', emoji: '🍊' },
    { name: 'Crayon', shape: 'cylinder', emoji: '🖍️' },
    { name: 'Ice Cream Cone', shape: 'cone', emoji: '🍦' },
    { name: 'Gift Box', shape: 'cube', emoji: '🎁' }
  ];

  const clues = [
    { clue: "I'm holding a shape that is round and smooth. I don't feel anything flat or sharp.", answer: 'sphere' },
    { clue: "I'm holding a shape that has a flat circle on the bottom. It has a point on the top.", answer: 'cone' },
    { clue: "I'm holding a shape that has lots of flat squares. There are lots of pointy corners. It feels like a box.", answer: 'cube' },
    { clue: "I'm holding a shape that has two flat circles, one on the top and one on the bottom. It is round in the middle.", answer: 'cylinder' }
  ];

  const handleDrum = () => {
    if (isDrumming) return;
    setIsDrumming(true);
    setDrumBeats([]);
    
    for (let i = 1; i <= drumCount; i++) {
      setTimeout(() => {
        setDrumBeats(prev => [...prev, i]);
        speak(i.toString());
      }, i * 500);
    }
    
    setTimeout(() => {
      setIsDrumming(false);
      if (drumCount < 6) {
        setDrumCount(prev => prev + 1);
      }
    }, drumCount * 500 + 500);
  };

  const handlePlaceStick = () => {
    const needed = shapeSticks[currentShape];
    if (sticksPlaced < needed) {
      setSticksPlaced(prev => prev + 1);
      speak((sticksPlaced + 1).toString());
    }
  };

  const handleNextShape = () => {
    if (currentShape === 'rectangle') {
      setCurrentShape('square');
    } else if (currentShape === 'square') {
      setCurrentShape('triangle');
    } else {
      setPhase('mystery');
    }
    setSticksPlaced(0);
  };

  const handlePullShape = () => {
    if (mysteryShapes.length > 0) {
      const shape = mysteryShapes[0];
      setCurrentMysteryShape(shape);
      setMysteryShapes(prev => prev.slice(1));
      speak(`What do you notice about this shape? ${solidShapes[shape as keyof typeof solidShapes].description}`);
    }
  };

  const handleSortShape = (category: string) => {
    if (currentMysteryShape) {
      setSortedShapes(prev => ({
        ...prev,
        [category]: [...prev[category], currentMysteryShape]
      }));
      setCurrentMysteryShape(null);
      
      if (mysteryShapes.length === 0) {
        setTimeout(() => setPhase('hunt'), 1000);
      }
    }
  };

  const handleFindObject = (objectName: string) => {
    if (!foundObjects.includes(objectName)) {
      setFoundObjects(prev => [...prev, objectName]);
      const obj = realWorldObjects.find(o => o.name === objectName);
      if (obj) {
        speak(`Great find! The ${objectName} looks like a ${obj.shape}!`);
      }
      
      if (foundObjects.length >= 5) {
        setTimeout(() => setPhase('clues'), 1500);
      }
    }
  };

  const handleClueAnswer = (shape: string) => {
    setSelectedAnswer(shape);
    setShowFeedback(true);
    
    const isCorrect = shape === clues[currentClue].answer;
    if (isCorrect) {
      speak("That's right! Great job!");
      setClueAnswers(prev => [...prev, shape]);
      
      setTimeout(() => {
        setShowFeedback(false);
        setSelectedAnswer(null);
        if (currentClue < clues.length - 1) {
          setCurrentClue(prev => prev + 1);
        } else {
          setPhase('celebration');
        }
      }, 1500);
    } else {
      speak("Try again! Listen to the clue carefully.");
      setTimeout(() => {
        setShowFeedback(false);
        setSelectedAnswer(null);
      }, 1500);
    }
  };

  const renderSolidShape = (shape: string, size: number = 80) => {
    const colors = solidShapes[shape as keyof typeof solidShapes]?.color || '#888';
    
    switch (shape) {
      case 'sphere':
        return (
          <div 
            className="rounded-full"
            style={{ 
              width: size, 
              height: size, 
              background: `radial-gradient(circle at 30% 30%, ${colors}, ${colors}88)`,
              boxShadow: `inset -10px -10px 20px rgba(0,0,0,0.3), 5px 5px 15px rgba(0,0,0,0.2)`
            }}
          />
        );
      case 'cube':
        return (
          <div className="relative" style={{ width: size, height: size }}>
            <div 
              className="absolute"
              style={{ 
                width: size * 0.7, 
                height: size * 0.7, 
                backgroundColor: colors,
                top: size * 0.15,
                left: size * 0.15,
                transform: 'skewX(-5deg) skewY(-5deg)',
                boxShadow: `${size * 0.15}px ${size * 0.15}px 0 ${colors}88, ${size * 0.08}px ${size * 0.25}px 0 ${colors}66`
              }}
            />
          </div>
        );
      case 'cylinder':
        return (
          <div className="relative flex flex-col items-center" style={{ width: size, height: size }}>
            <div 
              className="rounded-full"
              style={{ 
                width: size * 0.8, 
                height: size * 0.25, 
                backgroundColor: colors,
                zIndex: 2
              }}
            />
            <div 
              style={{ 
                width: size * 0.8, 
                height: size * 0.6, 
                backgroundColor: `${colors}cc`,
                marginTop: -size * 0.12
              }}
            />
            <div 
              className="rounded-full"
              style={{ 
                width: size * 0.8, 
                height: size * 0.25, 
                backgroundColor: `${colors}aa`,
                marginTop: -size * 0.12
              }}
            />
          </div>
        );
      case 'cone':
        return (
          <div className="relative" style={{ width: size, height: size }}>
            <div 
              style={{ 
                width: 0, 
                height: 0, 
                borderLeft: `${size * 0.4}px solid transparent`,
                borderRight: `${size * 0.4}px solid transparent`,
                borderBottom: `${size * 0.75}px solid ${colors}`,
                marginLeft: size * 0.1
              }}
            />
            <div 
              className="rounded-full absolute"
              style={{ 
                width: size * 0.8, 
                height: size * 0.2, 
                backgroundColor: `${colors}aa`,
                bottom: 0,
                left: size * 0.1
              }}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const renderPhase = () => {
    switch (phase) {
      case 'intro':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <h2 className="text-3xl font-bold text-primary">Discover 3D Shapes!</h2>
            <p className="text-xl text-muted-foreground">
              Today we'll explore solid shapes - shapes you can hold in your hands!
            </p>
            <div className="flex justify-center gap-6 py-8">
              {['sphere', 'cube', 'cylinder', 'cone'].map((shape) => (
                <motion.div
                  key={shape}
                  animate={{ 
                    y: [0, -10, 0],
                    rotateY: [0, 10, 0, -10, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: Math.random() * 2 }}
                >
                  {renderSolidShape(shape, 70)}
                </motion.div>
              ))}
            </div>
            <Button onClick={() => { setPhase('drumming'); speak("Let's start by playing the drums and counting!"); }} size="lg">
              Let's Start! <ArrowRight className="ml-2" />
            </Button>
          </motion.div>
        );

      case 'drumming':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-6"
          >
            <h2 className="text-2xl font-bold text-primary">🥁 Drum and Count to {drumCount}!</h2>
            <p className="text-lg text-muted-foreground">
              Tap the drum and count along!
            </p>
            
            <motion.div
              className="mx-auto w-48 h-48 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center cursor-pointer shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDrum}
            >
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                <Drum className="w-20 h-20 text-amber-700" />
              </div>
            </motion.div>

            <div className="flex justify-center gap-4 h-16">
              <AnimatePresence>
                {drumBeats.map((beat) => (
                  <motion.div
                    key={beat}
                    initial={{ scale: 0, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0 }}
                    className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold"
                  >
                    {beat}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {drumCount === 6 && drumBeats.length === 6 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Button onClick={() => { setPhase('sticks'); speak("Now let's count sticks to build shapes!"); }} size="lg">
                  Great Counting! Next Activity <ArrowRight className="ml-2" />
                </Button>
              </motion.div>
            )}
          </motion.div>
        );

      case 'sticks':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-6"
          >
            <h2 className="text-2xl font-bold text-primary">Count Sticks for the {currentShape.charAt(0).toUpperCase() + currentShape.slice(1)}</h2>
            <p className="text-lg text-muted-foreground">
              How many sticks does Sophia need? Tap to add sticks!
            </p>

            <div className="relative w-64 h-64 mx-auto border-4 border-dashed border-muted rounded-lg flex items-center justify-center">
              {/* Shape outline */}
              <svg width="200" height="200" viewBox="0 0 200 200">
                {currentShape === 'rectangle' && (
                  <rect x="20" y="50" width="160" height="100" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" strokeDasharray="10,5" />
                )}
                {currentShape === 'square' && (
                  <rect x="40" y="40" width="120" height="120" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" strokeDasharray="10,5" />
                )}
                {currentShape === 'triangle' && (
                  <polygon points="100,30 170,170 30,170" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" strokeDasharray="10,5" />
                )}
              </svg>

              {/* Placed sticks */}
              <div className="absolute inset-0 flex items-center justify-center">
                {Array.from({ length: sticksPlaced }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute w-3 h-20 bg-amber-600 rounded"
                    style={{
                      transform: `rotate(${(i * 360) / shapeSticks[currentShape]}deg) translateY(-50px)`
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-4">
              {sticksPlaced < shapeSticks[currentShape] ? (
                <Button onClick={handlePlaceStick} size="lg" className="gap-2">
                  Add a Stick ({sticksPlaced}/{shapeSticks[currentShape]})
                </Button>
              ) : (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <p className="text-xl font-bold text-green-600 mb-4">
                    ✓ {shapeSticks[currentShape]} sticks for a {currentShape}!
                  </p>
                  <Button onClick={handleNextShape} size="lg">
                    {currentShape === 'triangle' ? 'Explore 3D Shapes!' : 'Next Shape'} <ArrowRight className="ml-2" />
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        );

      case 'mystery':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-6"
          >
            <h2 className="text-2xl font-bold text-primary">🎒 Mystery Bag!</h2>
            <p className="text-lg text-muted-foreground">
              Pull shapes from the bag and describe them!
            </p>

            <div className="flex flex-col items-center gap-6">
              {!currentMysteryShape ? (
                <motion.div
                  className="w-40 h-48 bg-gradient-to-b from-purple-600 to-purple-800 rounded-t-3xl cursor-pointer flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePullShape}
                >
                  <HelpCircle className="w-16 h-16 text-white" />
                  <p className="absolute bottom-4 text-white font-bold">Tap to pull!</p>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex flex-col items-center"
                  >
                    {renderSolidShape(currentMysteryShape, 100)}
                    <p className="mt-4 text-lg font-medium">
                      {solidShapes[currentMysteryShape as keyof typeof solidShapes].description}
                    </p>
                  </motion.div>

                  <p className="text-muted-foreground">Where should this shape go?</p>
                  <div className="flex gap-3 justify-center flex-wrap">
                    {Object.keys(sortedShapes).map((category) => (
                      <Button
                        key={category}
                        variant="outline"
                        onClick={() => handleSortShape(category)}
                        className="capitalize"
                      >
                        {category} shapes
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {mysteryShapes.length === 0 && !currentMysteryShape && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <p className="text-xl font-bold text-green-600 mb-4">All shapes sorted!</p>
                  <Button onClick={() => setPhase('hunt')} size="lg">
                    Go on a Shape Hunt! <Search className="ml-2" />
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        );

      case 'hunt':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-6"
          >
            <h2 className="text-2xl font-bold text-primary">🔍 Shape Hunt!</h2>
            <p className="text-lg text-muted-foreground">
              Find objects that look like our 3D shapes! ({foundObjects.length}/6 found)
            </p>

            <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
              {realWorldObjects.map((obj) => (
                <motion.div
                  key={obj.name}
                  className={`p-4 rounded-xl cursor-pointer transition-all ${
                    foundObjects.includes(obj.name) 
                      ? 'bg-green-100 border-2 border-green-500' 
                      : 'bg-card border-2 border-border hover:border-primary'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleFindObject(obj.name)}
                >
                  <div className="text-4xl mb-2">{obj.emoji}</div>
                  <p className="text-sm font-medium">{obj.name}</p>
                  {foundObjects.includes(obj.name) && (
                    <p className="text-xs text-green-600 mt-1">Like a {obj.shape}!</p>
                  )}
                </motion.div>
              ))}
            </div>

            {foundObjects.length >= 6 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Button onClick={() => setPhase('clues')} size="lg">
                  Play the Clue Game! <ArrowRight className="ml-2" />
                </Button>
              </motion.div>
            )}
          </motion.div>
        );

      case 'clues':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-6"
          >
            <h2 className="text-2xl font-bold text-primary">🎯 Mystery Shape Clues!</h2>
            <p className="text-lg text-muted-foreground">
              Listen to the clue and find the matching shape!
            </p>

            <Card className="max-w-xl mx-auto">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => speak(clues[currentClue].clue)}
                  >
                    <Volume2 />
                  </Button>
                  <p className="text-lg italic">"{clues[currentClue].clue}"</p>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center gap-6">
              {['sphere', 'cone', 'cube', 'cylinder'].map((shape) => (
                <motion.div
                  key={shape}
                  className={`p-4 rounded-xl cursor-pointer transition-all ${
                    selectedAnswer === shape
                      ? showFeedback
                        ? shape === clues[currentClue].answer
                          ? 'bg-green-100 ring-4 ring-green-500'
                          : 'bg-red-100 ring-4 ring-red-500'
                        : 'ring-2 ring-primary'
                      : 'bg-card hover:bg-muted'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => !showFeedback && handleClueAnswer(shape)}
                >
                  {renderSolidShape(shape, 80)}
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center gap-2">
              {clues.map((_, i) => (
                <div
                  key={i}
                  className={`w-4 h-4 rounded-full ${
                    i < currentClue ? 'bg-green-500' : i === currentClue ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        );

      case 'celebration':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: 3 }}
              className="text-6xl"
            >
              🎉
            </motion.div>
            <h2 className="text-3xl font-bold text-primary">Shape Explorer!</h2>
            <p className="text-xl text-muted-foreground">
              You discovered all the 3D shapes!
            </p>

            <div className="flex justify-center gap-6 py-4">
              {['sphere', 'cube', 'cylinder', 'cone'].map((shape, i) => (
                <motion.div
                  key={shape}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.2 }}
                >
                  {renderSolidShape(shape, 70)}
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center gap-2">
              {[1, 2, 3].map((star) => (
                <motion.div
                  key={star}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: star * 0.3 }}
                >
                  <Star className="w-12 h-12 text-yellow-400 fill-yellow-400" />
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={() => navigate('/activities-module2')}>
                <Home className="mr-2 h-4 w-4" /> Back to Activities
              </Button>
              <Button onClick={() => {
                setPhase('intro');
                setDrumCount(4);
                setDrumBeats([]);
                setCurrentShape('rectangle');
                setSticksPlaced(0);
                setMysteryShapes(['sphere', 'cube', 'cylinder', 'cone']);
                setSortedShapes({ round: [], pointy: [], flat: [], mixed: [] });
                setCurrentMysteryShape(null);
                setFoundObjects([]);
                setCurrentClue(0);
                setClueAnswers([]);
              }}>
                Play Again! 🔄
              </Button>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => navigate('/activities-module2')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <h1 className="text-xl font-bold text-primary">Lesson 9: Explore 3D Shapes</h1>
          <Button variant="ghost" size="icon" onClick={() => speak("Let's explore solid shapes!")}>
            <Volume2 className="h-5 w-5" />
          </Button>
        </div>

        <Card className="p-8">
          <CardContent className="p-0">
            {renderPhase()}
          </CardContent>
        </Card>

        {phase !== 'intro' && phase !== 'celebration' && (
          <div className="mt-4 flex justify-center gap-2">
            {['drumming', 'sticks', 'mystery', 'hunt', 'clues'].map((p, i) => (
              <div
                key={p}
                className={`w-3 h-3 rounded-full transition-colors ${
                  phase === p ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShapesSolids9;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Volume2, Star, RotateCcw, Drum, Footprints, Smile, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Phase = 'intro' | 'drum' | 'march' | 'happy-faces' | 'stamping' | 'detective' | 'debrief' | 'complete';

interface Solid3D {
  id: string;
  name: string;
  shape: 'cone' | 'cube' | 'cylinder' | 'rectangular-block';
  face: 'circle' | 'square' | 'rectangle';
  color: string;
}

interface HappyFace {
  id: string;
  shape: 'circle' | 'square' | 'rectangle';
  matched: boolean;
}

const ShapesFaces10: React.FC = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>('intro');
  const [progress, setProgress] = useState(0);
  const [drumCount, setDrumCount] = useState(0);
  const [marchCount, setMarchCount] = useState(0);
  const [marchPosition, setMarchPosition] = useState(0);
  const [selectedFace, setSelectedFace] = useState<string | null>(null);
  const [selectedSolid, setSelectedSolid] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [stampedShapes, setStampedShapes] = useState<{x: number, shape: string}[]>([]);
  const [selectedStampShape, setSelectedStampShape] = useState<string | null>(null);
  const [detectiveGuess, setDetectiveGuess] = useState<string | null>(null);
  const [showDetectiveResult, setShowDetectiveResult] = useState(false);
  const [score, setScore] = useState(0);

  const solids: Solid3D[] = [
    { id: 'cone', name: 'Cone', shape: 'cone', face: 'circle', color: 'hsl(var(--primary))' },
    { id: 'cube', name: 'Cube', shape: 'cube', face: 'square', color: 'hsl(var(--secondary))' },
    { id: 'cylinder', name: 'Cylinder', shape: 'cylinder', face: 'circle', color: 'hsl(var(--accent))' },
    { id: 'rect-block', name: 'Block', shape: 'rectangular-block', face: 'rectangle', color: 'hsl(280, 70%, 60%)' },
  ];

  const happyFaces: HappyFace[] = [
    { id: 'circle-face', shape: 'circle', matched: false },
    { id: 'square-face', shape: 'square', matched: false },
    { id: 'rectangle-face', shape: 'rectangle', matched: false },
    { id: 'circle-face-2', shape: 'circle', matched: false },
  ];

  const mysteryFootprints = [
    { shape: 'circle', culprit: 'cylinder' },
    { shape: 'square', culprit: 'cube' },
  ];

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    const progressMap: Record<Phase, number> = {
      'intro': 0,
      'drum': 15,
      'march': 30,
      'happy-faces': 50,
      'stamping': 70,
      'detective': 85,
      'debrief': 95,
      'complete': 100
    };
    setProgress(progressMap[phase]);
  }, [phase]);

  const handleDrumHit = () => {
    if (drumCount < 6) {
      const newCount = drumCount + 1;
      setDrumCount(newCount);
      speak(newCount.toString());
    }
    if (drumCount === 5) {
      setTimeout(() => {
        setScore(prev => prev + 10);
        setPhase('march');
        setDrumCount(0);
      }, 1000);
    }
  };

  const handleMarch = () => {
    if (marchCount < 6) {
      const newCount = marchCount + 1;
      setMarchCount(newCount);
      setMarchPosition(prev => prev + 50);
      speak(newCount.toString());
    }
    if (marchCount === 5) {
      setTimeout(() => {
        setScore(prev => prev + 10);
        setPhase('happy-faces');
      }, 1000);
    }
  };

  const handleFaceSelect = (faceId: string) => {
    if (!matchedPairs.includes(faceId)) {
      setSelectedFace(faceId);
    }
  };

  const handleSolidSelect = (solidId: string) => {
    if (!matchedPairs.includes(solidId)) {
      setSelectedSolid(solidId);
    }
  };

  useEffect(() => {
    if (selectedFace && selectedSolid) {
      const face = happyFaces.find(f => f.id === selectedFace);
      const solid = solids.find(s => s.id === selectedSolid);
      
      if (face && solid && face.shape === solid.face) {
        speak(`Great! The ${face.shape} face fits the ${solid.name}!`);
        setMatchedPairs(prev => [...prev, selectedFace, selectedSolid]);
        setScore(prev => prev + 15);
      } else {
        speak("Try again! Find the matching face.");
      }
      
      setTimeout(() => {
        setSelectedFace(null);
        setSelectedSolid(null);
      }, 500);
    }
  }, [selectedFace, selectedSolid]);

  useEffect(() => {
    if (matchedPairs.length >= 8 && phase === 'happy-faces') {
      setTimeout(() => setPhase('stamping'), 1500);
    }
  }, [matchedPairs, phase]);

  const handleStamp = (x: number) => {
    if (selectedStampShape && stampedShapes.length < 8) {
      setStampedShapes(prev => [...prev, { x, shape: selectedStampShape }]);
      speak(`${selectedStampShape} footprint!`);
    }
    if (stampedShapes.length === 7) {
      setTimeout(() => {
        setScore(prev => prev + 20);
        setPhase('detective');
      }, 1000);
    }
  };

  const handleDetectiveGuess = (solidId: string) => {
    setDetectiveGuess(solidId);
    const correct = mysteryFootprints.some(f => f.culprit === solidId);
    if (correct) {
      speak("You found the culprit! Great detective work!");
      setScore(prev => prev + 25);
    } else {
      speak("That's not quite right. Look at the footprint shape!");
    }
    setShowDetectiveResult(true);
    setTimeout(() => {
      setPhase('debrief');
    }, 2000);
  };

  const render3DShape = (shape: string, size: number = 60, color: string = 'hsl(var(--primary))') => {
    switch (shape) {
      case 'cone':
        return (
          <svg width={size} height={size} viewBox="0 0 100 100">
            <polygon points="50,10 85,90 15,90" fill={color} stroke="hsl(var(--foreground))" strokeWidth="2" />
            <ellipse cx="50" cy="90" rx="35" ry="10" fill={color} stroke="hsl(var(--foreground))" strokeWidth="2" />
          </svg>
        );
      case 'cube':
        return (
          <svg width={size} height={size} viewBox="0 0 100 100">
            <polygon points="20,30 50,15 80,30 80,75 50,90 20,75" fill={color} stroke="hsl(var(--foreground))" strokeWidth="2" />
            <line x1="50" y1="15" x2="50" y2="45" stroke="hsl(var(--foreground))" strokeWidth="2" />
            <line x1="20" y1="30" x2="50" y2="45" stroke="hsl(var(--foreground))" strokeWidth="2" />
            <line x1="80" y1="30" x2="50" y2="45" stroke="hsl(var(--foreground))" strokeWidth="2" />
            <line x1="50" y1="45" x2="50" y2="90" stroke="hsl(var(--foreground))" strokeWidth="2" />
          </svg>
        );
      case 'cylinder':
        return (
          <svg width={size} height={size} viewBox="0 0 100 100">
            <ellipse cx="50" cy="20" rx="30" ry="12" fill={color} stroke="hsl(var(--foreground))" strokeWidth="2" />
            <rect x="20" y="20" width="60" height="60" fill={color} stroke="none" />
            <line x1="20" y1="20" x2="20" y2="80" stroke="hsl(var(--foreground))" strokeWidth="2" />
            <line x1="80" y1="20" x2="80" y2="80" stroke="hsl(var(--foreground))" strokeWidth="2" />
            <ellipse cx="50" cy="80" rx="30" ry="12" fill={color} stroke="hsl(var(--foreground))" strokeWidth="2" />
          </svg>
        );
      case 'rectangular-block':
        return (
          <svg width={size} height={size} viewBox="0 0 100 100">
            <polygon points="15,35 45,20 90,35 90,80 60,95 15,80" fill={color} stroke="hsl(var(--foreground))" strokeWidth="2" />
            <line x1="45" y1="20" x2="45" y2="50" stroke="hsl(var(--foreground))" strokeWidth="2" />
            <line x1="15" y1="35" x2="45" y2="50" stroke="hsl(var(--foreground))" strokeWidth="2" />
            <line x1="90" y1="35" x2="45" y2="50" stroke="hsl(var(--foreground))" strokeWidth="2" />
            <line x1="45" y1="50" x2="60" y2="95" stroke="hsl(var(--foreground))" strokeWidth="2" />
          </svg>
        );
      default:
        return null;
    }
  };

  const renderHappyFace = (shape: string, size: number = 50) => {
    const faceColor = 'hsl(45, 90%, 65%)';
    switch (shape) {
      case 'circle':
        return (
          <svg width={size} height={size} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill={faceColor} stroke="hsl(var(--foreground))" strokeWidth="2" />
            <circle cx="35" cy="40" r="5" fill="hsl(var(--foreground))" />
            <circle cx="65" cy="40" r="5" fill="hsl(var(--foreground))" />
            <path d="M 30 60 Q 50 80 70 60" fill="none" stroke="hsl(var(--foreground))" strokeWidth="3" />
          </svg>
        );
      case 'square':
        return (
          <svg width={size} height={size} viewBox="0 0 100 100">
            <rect x="10" y="10" width="80" height="80" fill={faceColor} stroke="hsl(var(--foreground))" strokeWidth="2" />
            <circle cx="35" cy="40" r="5" fill="hsl(var(--foreground))" />
            <circle cx="65" cy="40" r="5" fill="hsl(var(--foreground))" />
            <path d="M 30 60 Q 50 80 70 60" fill="none" stroke="hsl(var(--foreground))" strokeWidth="3" />
          </svg>
        );
      case 'rectangle':
        return (
          <svg width={size * 1.5} height={size} viewBox="0 0 150 100">
            <rect x="10" y="10" width="130" height="80" fill={faceColor} stroke="hsl(var(--foreground))" strokeWidth="2" />
            <circle cx="50" cy="40" r="5" fill="hsl(var(--foreground))" />
            <circle cx="100" cy="40" r="5" fill="hsl(var(--foreground))" />
            <path d="M 45 60 Q 75 80 105 60" fill="none" stroke="hsl(var(--foreground))" strokeWidth="3" />
          </svg>
        );
      default:
        return null;
    }
  };

  const renderFootprint = (shape: string, size: number = 30) => {
    switch (shape) {
      case 'circle':
        return <div className="rounded-full bg-foreground/70" style={{ width: size, height: size }} />;
      case 'square':
        return <div className="bg-foreground/70" style={{ width: size, height: size }} />;
      case 'rectangle':
        return <div className="bg-foreground/70" style={{ width: size * 1.5, height: size }} />;
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
            <h2 className="text-3xl font-bold text-foreground">Lesson 10: Match Shapes to Faces!</h2>
            <p className="text-lg text-muted-foreground">
              Today we'll learn how 3D shapes have flat faces that match 2D shapes!
            </p>
            <div className="flex justify-center gap-6 flex-wrap">
              {solids.map(solid => (
                <motion.div 
                  key={solid.id}
                  whileHover={{ scale: 1.1 }}
                  className="p-4"
                >
                  {render3DShape(solid.shape, 80, solid.color)}
                  <p className="mt-2 text-sm font-medium">{solid.name}</p>
                </motion.div>
              ))}
            </div>
            <Button onClick={() => { speak("Let's start by playing the drums and counting to 6!"); setPhase('drum'); }} size="lg">
              <Volume2 className="mr-2 h-5 w-5" /> Start Lesson
            </Button>
          </motion.div>
        );

      case 'drum':
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-6"
          >
            <h2 className="text-2xl font-bold text-foreground">Drum and Count to 6!</h2>
            <p className="text-muted-foreground">Tap the drum and count each beat!</p>
            
            <div className="flex justify-center gap-4 mb-4">
              {[1, 2, 3, 4, 5, 6].map(num => (
                <motion.div
                  key={num}
                  animate={{ scale: drumCount >= num ? 1.2 : 1, opacity: drumCount >= num ? 1 : 0.3 }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold
                    ${drumCount >= num ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
                >
                  {num}
                </motion.div>
              ))}
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleDrumHit}
              className="w-40 h-40 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 shadow-lg flex items-center justify-center mx-auto cursor-pointer border-8 border-amber-900"
            >
              <Drum className="w-20 h-20 text-amber-200" />
            </motion.button>
            <p className="text-lg font-medium">Count: {drumCount}</p>
          </motion.div>
        );

      case 'march':
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-6"
          >
            <h2 className="text-2xl font-bold text-foreground">March and Count to 6!</h2>
            <p className="text-muted-foreground">Click to march and count each step!</p>

            <div className="relative h-32 bg-gradient-to-r from-green-200 to-green-300 rounded-xl overflow-hidden">
              <motion.div
                animate={{ x: marchPosition }}
                className="absolute bottom-4 left-4"
              >
                <Footprints className="w-16 h-16 text-primary" />
              </motion.div>
              {[...Array(marchCount)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  className="absolute bottom-2"
                  style={{ left: 20 + i * 50 }}
                >
                  <Footprints className="w-8 h-8 text-muted-foreground/50" />
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5, 6].map(num => (
                <div
                  key={num}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold
                    ${marchCount >= num ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
                >
                  {num}
                </div>
              ))}
            </div>

            <Button onClick={handleMarch} size="lg" disabled={marchCount >= 6}>
              <Footprints className="mr-2" /> March! ({marchCount}/6)
            </Button>
          </motion.div>
        );

      case 'happy-faces':
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-foreground text-center">Make Happy Shapes!</h2>
            <p className="text-muted-foreground text-center">Match each happy face to its 3D shape!</p>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-semibold text-center">Happy Faces</h3>
                <div className="flex flex-wrap gap-4 justify-center">
                  {happyFaces.map(face => (
                    <motion.div
                      key={face.id}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleFaceSelect(face.id)}
                      className={`p-3 rounded-xl cursor-pointer transition-all
                        ${matchedPairs.includes(face.id) ? 'opacity-30 cursor-not-allowed' : ''}
                        ${selectedFace === face.id ? 'ring-4 ring-primary bg-primary/20' : 'bg-card hover:bg-accent'}`}
                    >
                      {renderHappyFace(face.shape, 60)}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-center">3D Shapes</h3>
                <div className="flex flex-wrap gap-4 justify-center">
                  {solids.map(solid => (
                    <motion.div
                      key={solid.id}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSolidSelect(solid.id)}
                      className={`p-3 rounded-xl cursor-pointer transition-all
                        ${matchedPairs.includes(solid.id) ? 'opacity-30 cursor-not-allowed' : ''}
                        ${selectedSolid === solid.id ? 'ring-4 ring-primary bg-primary/20' : 'bg-card hover:bg-accent'}`}
                    >
                      {render3DShape(solid.shape, 70, solid.color)}
                      <p className="text-xs text-center mt-1">{solid.name}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Matched: {matchedPairs.length / 2} / 4
            </p>
          </motion.div>
        );

      case 'stamping':
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-foreground text-center">Shape Stamping March!</h2>
            <p className="text-muted-foreground text-center">Pick a shape and stamp footprints on the path!</p>

            <div className="flex justify-center gap-4 mb-4">
              {['circle', 'square', 'rectangle'].map(shape => (
                <motion.button
                  key={shape}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedStampShape(shape)}
                  className={`p-4 rounded-xl border-2 transition-all
                    ${selectedStampShape === shape ? 'border-primary bg-primary/20' : 'border-border bg-card'}`}
                >
                  {renderFootprint(shape, 40)}
                  <p className="text-xs mt-2 capitalize">{shape}</p>
                </motion.button>
              ))}
            </div>

            <div className="relative h-40 bg-gradient-to-r from-amber-100 to-amber-200 rounded-xl overflow-hidden">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl">📬</div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-3xl">🏠</div>
              
              {stampedShapes.map((stamp, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1/2 -translate-y-1/2"
                  style={{ left: `${stamp.x}%` }}
                >
                  {renderFootprint(stamp.shape, 25)}
                </motion.div>
              ))}

              {selectedStampShape && (
                <div 
                  className="absolute inset-0 cursor-crosshair"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    if (x > 10 && x < 90) handleStamp(x);
                  }}
                />
              )}
            </div>

            <p className="text-center text-sm">
              {selectedStampShape ? `Stamping ${selectedStampShape}s - Click on the path!` : 'Select a shape to stamp'}
            </p>
            <p className="text-center text-xs text-muted-foreground">Stamps: {stampedShapes.length}/8</p>
          </motion.div>
        );

      case 'detective':
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-foreground text-center">
              <Search className="inline mr-2" />
              Shape Detective!
            </h2>
            <p className="text-muted-foreground text-center">
              Mr. McGregor's garden has footprints! Which shape made them?
            </p>

            <Card className="p-6 bg-green-100">
              <p className="text-center mb-4 font-semibold">🌱 Mr. McGregor's Garden 🌱</p>
              <div className="flex justify-center gap-8">
                {mysteryFootprints.map((fp, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <p className="text-sm">Footprint {i + 1}:</p>
                    {renderFootprint(fp.shape, 40)}
                  </div>
                ))}
              </div>
            </Card>

            <p className="text-center font-medium">Which shape made these footprints?</p>

            <div className="flex justify-center gap-4 flex-wrap">
              {solids.map(solid => (
                <motion.button
                  key={solid.id}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => !showDetectiveResult && handleDetectiveGuess(solid.id)}
                  disabled={showDetectiveResult}
                  className={`p-4 rounded-xl border-2 transition-all
                    ${detectiveGuess === solid.id 
                      ? (mysteryFootprints.some(f => f.culprit === solid.id) ? 'border-green-500 bg-green-100' : 'border-red-500 bg-red-100')
                      : 'border-border bg-card hover:bg-accent'}`}
                >
                  {render3DShape(solid.shape, 60, solid.color)}
                  <p className="text-xs mt-1">{solid.name}</p>
                </motion.button>
              ))}
            </div>

            {showDetectiveResult && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-lg font-semibold text-green-600"
              >
                The cylinder and cube made circle and square footprints!
              </motion.p>
            )}
          </motion.div>
        );

      case 'debrief':
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-6"
          >
            <h2 className="text-2xl font-bold text-foreground">What We Learned!</h2>
            
            <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
              <Card className="p-4">
                <Smile className="w-8 h-8 mx-auto mb-2 text-primary" />
                <p className="text-sm">3D shapes have flat faces that match 2D shapes!</p>
              </Card>
              <Card className="p-4">
                <Footprints className="w-8 h-8 mx-auto mb-2 text-primary" />
                <p className="text-sm">Shapes make footprints matching their flat faces!</p>
              </Card>
            </div>

            <div className="space-y-2">
              <p className="font-medium">Quick Review:</p>
              <p className="text-sm text-muted-foreground">• A cube has square faces</p>
              <p className="text-sm text-muted-foreground">• A cylinder has circle faces on top and bottom</p>
              <p className="text-sm text-muted-foreground">• A cone has one circle face at the bottom</p>
              <p className="text-sm text-muted-foreground">• A rectangular block has rectangle and square faces</p>
            </div>

            <Button onClick={() => setPhase('complete')} size="lg">
              <Star className="mr-2" /> See My Score!
            </Button>
          </motion.div>
        );

      case 'complete':
        return (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Star className="w-24 h-24 mx-auto text-yellow-400 fill-yellow-400" />
            </motion.div>
            
            <h2 className="text-3xl font-bold text-foreground">Amazing Work!</h2>
            <p className="text-xl">You scored: <span className="font-bold text-primary">{score}</span> points!</p>
            
            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={() => {
                setPhase('intro');
                setScore(0);
                setDrumCount(0);
                setMarchCount(0);
                setMarchPosition(0);
                setMatchedPairs([]);
                setStampedShapes([]);
                setSelectedStampShape(null);
                setDetectiveGuess(null);
                setShowDetectiveResult(false);
              }}>
                <RotateCcw className="mr-2 h-4 w-4" /> Play Again
              </Button>
              <Button onClick={() => navigate('/activities/module-2')}>
                <ArrowRight className="mr-2 h-4 w-4" /> Next Lesson
              </Button>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => navigate('/activities/module-2')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-400" />
            <span className="font-bold">{score}</span>
          </div>
        </div>

        <Progress value={progress} className="mb-6" />

        <Card className="p-6 md:p-8">
          <AnimatePresence mode="wait">
            {renderPhase()}
          </AnimatePresence>
        </Card>
      </div>
    </div>
  );
};

export default ShapesFaces10;
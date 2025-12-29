import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, RotateCcw, Volume2, Check, Circle, Bike } from 'lucide-react';

type Phase = 'intro' | 'fluency' | 'concept-intro' | 'concept-practice' | 'application' | 'debrief';

interface ClayBall {
  id: number;
  size: number;
}

interface Stick {
  id: number;
  angle: number;
  placed: boolean;
}

interface LinkingCube {
  id: number;
  angle: number;
  placed: boolean;
}

const ShapesCircles8: React.FC = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>('intro');
  const [clayBalls, setClayBalls] = useState<ClayBall[]>([{ id: 1, size: 100 }]);
  const [targetBalls, setTargetBalls] = useState(2);
  const [sticks, setSticks] = useState<Stick[]>([]);
  const [cubes, setCubes] = useState<LinkingCube[]>([]);
  const [selectedTires, setSelectedTires] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [practiceComplete, setPracticeComplete] = useState(false);
  const [showCircleComplete, setShowCircleComplete] = useState(false);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleDivideClay = () => {
    if (clayBalls.length < targetBalls) {
      const newBalls: ClayBall[] = [];
      const newSize = 100 / targetBalls;
      for (let i = 0; i < targetBalls; i++) {
        newBalls.push({ id: i + 1, size: newSize });
      }
      setClayBalls(newBalls);
      speak(`Great job! You made ${targetBalls} balls of clay!`);
      
      if (targetBalls < 5) {
        setTimeout(() => {
          setTargetBalls(targetBalls + 1);
          setClayBalls([{ id: 1, size: 100 }]);
        }, 2000);
      } else {
        setTimeout(() => {
          setShowSuccess(true);
          speak("Wonderful! You made 5 balls! Which balls are bigger, when we made 2 balls or 5 balls? 2 balls are bigger because we divided into fewer pieces!");
        }, 2000);
      }
    }
  };

  const handlePlaceStick = (angle: number) => {
    if (sticks.length < 8 && !sticks.find(s => s.angle === angle)) {
      const newStick: Stick = { id: sticks.length + 1, angle, placed: true };
      setSticks([...sticks, newStick]);
      speak(`Stick ${sticks.length + 1} placed!`);
      
      if (sticks.length + 1 === 8) {
        setTimeout(() => {
          speak("Great! Now let's add cubes to the ends of the sticks to make a wheel!");
        }, 1000);
      }
    }
  };

  const handlePlaceCube = (angle: number) => {
    if (cubes.length < 16 && !cubes.find(c => c.angle === angle)) {
      const newCube: LinkingCube = { id: cubes.length + 1, angle, placed: true };
      setCubes([...cubes, newCube]);
      
      if (cubes.length + 1 === 16) {
        setTimeout(() => {
          setShowCircleComplete(true);
          speak("Amazing! You made a circle! Circles roll because all the edges are the same distance from the center!");
        }, 500);
      }
    }
  };

  const handleSelectTire = (shape: string) => {
    if (selectedTires.includes(shape)) {
      setSelectedTires(selectedTires.filter(t => t !== shape));
    } else if (selectedTires.length < 2) {
      setSelectedTires([...selectedTires, shape]);
    }
  };

  const checkTireSelection = () => {
    const circleCount = selectedTires.filter(t => t.includes('circle')).length;
    if (circleCount === 2) {
      speak("Perfect! You chose circles for Claude's bicycle tires! Circles make the best wheels because they roll smoothly. All points on a circle are the same distance from the center!");
      setPracticeComplete(true);
    } else {
      speak("Hmm, think about which shape rolls the best. Circles roll smoothly because all edges are the same distance from the center!");
    }
  };

  const resetActivity = () => {
    setClayBalls([{ id: 1, size: 100 }]);
    setTargetBalls(2);
    setSticks([]);
    setCubes([]);
    setSelectedTires([]);
    setShowSuccess(false);
    setPracticeComplete(false);
    setShowCircleComplete(false);
    setPhase('intro');
  };

  const getPhaseTitle = () => {
    switch (phase) {
      case 'intro': return 'Lesson 8: Construct a Circle';
      case 'fluency': return 'Make Five Small Balls';
      case 'concept-intro': return 'Build a Lollipop Circle';
      case 'concept-practice': return 'Your Turn to Build a Circle';
      case 'application': return "Claude's Bicycle Tires";
      case 'debrief': return 'What Did We Learn?';
      default: return '';
    }
  };

  const renderIntro = () => (
    <div className="text-center space-y-6">
      <div className="text-8xl mb-6">⭕</div>
      <h2 className="text-3xl font-bold text-primary">Let's Learn About Circles!</h2>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        Today we will construct circles using sticks and cubes. 
        We'll discover why circles make perfect wheels!
      </p>
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <div className="bg-secondary/50 rounded-xl p-4 text-center">
          <div className="text-4xl mb-2">🔵</div>
          <p className="font-medium">Make Clay Balls</p>
        </div>
        <div className="bg-secondary/50 rounded-xl p-4 text-center">
          <div className="text-4xl mb-2">🍭</div>
          <p className="font-medium">Build Lollipop Circle</p>
        </div>
        <div className="bg-secondary/50 rounded-xl p-4 text-center">
          <div className="text-4xl mb-2">🚲</div>
          <p className="font-medium">Choose Bike Tires</p>
        </div>
      </div>
      <Button 
        size="lg" 
        onClick={() => {
          setPhase('fluency');
          speak("Let's start by making 5 small balls of clay! First, show me your ball of clay. How many balls do you have? One! Now, use the whole piece to make 2 smaller balls that are about the same size.");
        }}
        className="mt-6"
      >
        Let's Start! <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );

  const renderFluency = () => (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-xl text-muted-foreground mb-4">
          {clayBalls.length === 1 
            ? `Divide your clay into ${targetBalls} balls!`
            : showSuccess
              ? "Great job! You made 5 balls!"
              : `You have ${clayBalls.length} balls! Get ready to make ${targetBalls} balls.`
          }
        </p>
      </div>

      <div className="flex justify-center items-center min-h-[200px]">
        <div 
          className="flex flex-wrap justify-center gap-4 cursor-pointer"
          onClick={handleDivideClay}
        >
          {clayBalls.map((ball) => (
            <div
              key={ball.id}
              className="bg-amber-600 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center"
              style={{
                width: `${ball.size * 1.5}px`,
                height: `${ball.size * 1.5}px`,
                minWidth: '40px',
                minHeight: '40px'
              }}
            >
              <span className="text-white font-bold text-lg">{ball.id}</span>
            </div>
          ))}
        </div>
      </div>

      {clayBalls.length === 1 && (
        <p className="text-center text-muted-foreground animate-pulse">
          👆 Tap the clay to divide it into {targetBalls} balls!
        </p>
      )}

      {showSuccess && (
        <div className="text-center space-y-4">
          <div className="bg-green-100 dark:bg-green-900/30 rounded-xl p-4 max-w-lg mx-auto">
            <p className="text-lg font-medium text-green-800 dark:text-green-200">
              🤔 Which balls are bigger - when we made 2 balls or 5 balls?
            </p>
            <p className="text-green-700 dark:text-green-300 mt-2">
              2 balls are bigger because we divided into fewer pieces!
            </p>
          </div>
          <Button onClick={() => {
            setPhase('concept-intro');
            setSticks([]);
            setCubes([]);
            speak("Now we're going to make a shape by putting pretend lollipops around a dot. Each stick goes from the center dot to the edge. Let's place 8 sticks to make a wheel shape!");
          }}>
            Next: Build a Circle <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );

  const renderConceptIntro = () => {
    const stickAngles = [0, 45, 90, 135, 180, 225, 270, 315];
    const cubeAngles = [...stickAngles, 22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5];
    
    return (
      <div className="space-y-6">
        <div className="text-center mb-4">
          <p className="text-xl text-muted-foreground">
            {sticks.length < 8 
              ? `Place sticks from the center dot to the edge! (${sticks.length}/8)`
              : cubes.length < 16
                ? `Now add cubes to make a circle! (${cubes.length}/16)`
                : "You made a lollipop circle!"
            }
          </p>
        </div>

        <div className="flex justify-center">
          <div className="relative w-80 h-80 bg-secondary/30 rounded-full flex items-center justify-center">
            {/* Center dot */}
            <div className="absolute w-6 h-6 bg-red-500 rounded-full z-20 shadow-lg" />
            
            {/* Circle outline guide */}
            <div className="absolute w-72 h-72 border-4 border-dashed border-primary/30 rounded-full" />
            
            {/* Stick placement areas */}
            {sticks.length < 8 && stickAngles.map((angle) => {
              const isPlaced = sticks.find(s => s.angle === angle);
              if (isPlaced) return null;
              
              const radians = (angle * Math.PI) / 180;
              const x = Math.cos(radians) * 70;
              const y = Math.sin(radians) * 70;
              
              return (
                <button
                  key={`stick-btn-${angle}`}
                  onClick={() => handlePlaceStick(angle)}
                  className="absolute w-10 h-10 bg-yellow-200 hover:bg-yellow-300 rounded-full opacity-50 hover:opacity-100 transition-all z-10 border-2 border-yellow-400"
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                  }}
                />
              );
            })}
            
            {/* Placed sticks */}
            {sticks.map((stick) => {
              const radians = (stick.angle * Math.PI) / 180;
              const length = 130;
              
              return (
                <div
                  key={`stick-${stick.id}`}
                  className="absolute bg-amber-700 rounded-full origin-center"
                  style={{
                    width: '8px',
                    height: `${length}px`,
                    transform: `rotate(${stick.angle + 90}deg) translateY(-${length/2}px)`,
                  }}
                />
              );
            })}
            
            {/* Cube placement areas */}
            {sticks.length === 8 && cubes.length < 16 && cubeAngles.map((angle) => {
              const isPlaced = cubes.find(c => c.angle === angle);
              if (isPlaced) return null;
              
              const radians = (angle * Math.PI) / 180;
              const x = Math.cos(radians) * 130;
              const y = Math.sin(radians) * 130;
              
              return (
                <button
                  key={`cube-btn-${angle}`}
                  onClick={() => handlePlaceCube(angle)}
                  className="absolute w-8 h-8 bg-blue-200 hover:bg-blue-400 rounded opacity-50 hover:opacity-100 transition-all z-30 border-2 border-blue-400"
                  style={{
                    transform: `translate(${x - 16}px, ${y - 16}px)`,
                  }}
                />
              );
            })}
            
            {/* Placed cubes */}
            {cubes.map((cube) => {
              const radians = (cube.angle * Math.PI) / 180;
              const x = Math.cos(radians) * 130;
              const y = Math.sin(radians) * 130;
              
              return (
                <div
                  key={`cube-${cube.id}`}
                  className="absolute w-8 h-8 bg-blue-500 rounded shadow-md z-30"
                  style={{
                    transform: `translate(${x - 16}px, ${y - 16}px)`,
                  }}
                />
              );
            })}
          </div>
        </div>

        {showCircleComplete && (
          <div className="text-center space-y-4">
            <div className="bg-green-100 dark:bg-green-900/30 rounded-xl p-4 max-w-lg mx-auto">
              <p className="text-lg font-medium text-green-800 dark:text-green-200">
                🎉 You made a lollipop circle!
              </p>
              <p className="text-green-700 dark:text-green-300 mt-2">
                Circles roll because all the cubes are the same distance from the center dot!
              </p>
            </div>
            
            <div className="flex justify-center gap-8 mt-4">
              <div className="text-center">
                <div className="w-24 h-24 border-4 border-primary rounded-full mx-auto mb-2 flex items-center justify-center">
                  <Circle className="w-12 h-12 text-primary" />
                </div>
                <p className="font-medium">Circle ✓</p>
                <p className="text-sm text-muted-foreground">Same distance all around</p>
              </div>
              <div className="text-center opacity-60">
                <div className="w-32 h-20 border-4 border-muted rounded-full mx-auto mb-2" />
                <p className="font-medium">Oval ✗</p>
                <p className="text-sm text-muted-foreground">Different distances</p>
              </div>
            </div>
            
            <Button onClick={() => {
              setPhase('application');
              speak("Now let's help Claude! He's building a bicycle and needs to choose 2 tires. Which shapes should he use for his wheels?");
            }}>
              Next: Help Claude! <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    );
  };

  const renderApplication = () => {
    const shapes = [
      { id: 'circle1', type: 'circle', label: 'Circle 1' },
      { id: 'square1', type: 'square', label: 'Square 1' },
      { id: 'oval1', type: 'oval', label: 'Oval 1' },
      { id: 'circle2', type: 'circle', label: 'Circle 2' },
      { id: 'square2', type: 'square', label: 'Square 2' },
      { id: 'oval2', type: 'oval', label: 'Oval 2' },
    ];

    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="text-6xl mb-4">🚲</div>
          <p className="text-xl text-muted-foreground mb-2">
            Claude is building a bicycle! Help him choose 2 tires.
          </p>
          <p className="text-lg font-medium text-primary">
            Select 2 shapes that would make the best wheels!
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
          {shapes.map((shape) => (
            <button
              key={shape.id}
              onClick={() => handleSelectTire(shape.id)}
              disabled={practiceComplete}
              className={`p-4 rounded-xl border-4 transition-all ${
                selectedTires.includes(shape.id)
                  ? 'border-primary bg-primary/10 scale-105'
                  : 'border-secondary hover:border-primary/50'
              } ${practiceComplete ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex flex-col items-center gap-2">
                {shape.type === 'circle' && (
                  <div className="w-16 h-16 bg-gray-800 rounded-full" />
                )}
                {shape.type === 'square' && (
                  <div className="w-16 h-16 bg-gray-800" />
                )}
                {shape.type === 'oval' && (
                  <div className="w-20 h-12 bg-gray-800 rounded-full" />
                )}
                <span className="text-sm font-medium">{shape.label}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Selected: {selectedTires.length}/2 tires
          </p>
          
          {selectedTires.length === 2 && !practiceComplete && (
            <Button onClick={checkTireSelection} size="lg">
              Check My Answer <Check className="ml-2 h-4 w-4" />
            </Button>
          )}

          {practiceComplete && (
            <div className="space-y-4">
              <div className="bg-green-100 dark:bg-green-900/30 rounded-xl p-4 max-w-lg mx-auto">
                <p className="text-lg font-medium text-green-800 dark:text-green-200">
                  🎉 Correct! Circles make the best wheels!
                </p>
                <p className="text-green-700 dark:text-green-300 mt-2">
                  Circles roll smoothly because every point on the edge is the same distance from the center.
                </p>
              </div>
              
              <div className="flex justify-center items-center gap-4">
                <Bike className="w-16 h-16 text-primary" />
                <div className="flex gap-2">
                  <div className="w-12 h-12 bg-gray-800 rounded-full animate-spin" style={{ animationDuration: '2s' }} />
                  <div className="w-12 h-12 bg-gray-800 rounded-full animate-spin" style={{ animationDuration: '2s' }} />
                </div>
              </div>
              
              <Button onClick={() => {
                setPhase('debrief');
                speak("Great work today! Let's think about what we learned about circles.");
              }}>
                Next: What Did We Learn? <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderDebrief = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="text-6xl mb-4">🌟</div>
        <h2 className="text-2xl font-bold text-primary">What Did We Learn?</h2>
      </div>

      <div className="grid gap-4 max-w-2xl mx-auto">
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => speak("We used craft sticks and linking cubes to make circles! We needed 8 sticks and 16 cubes.")}
        >
          <CardContent className="p-4 flex items-start gap-4">
            <div className="text-3xl">🔧</div>
            <div>
              <h3 className="font-bold text-lg">What tools did we use?</h3>
              <p className="text-muted-foreground">We used craft sticks and linking cubes to make circles!</p>
            </div>
            <Volume2 className="h-5 w-5 text-muted-foreground ml-auto" />
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => speak("Circles roll because all the edges are the same distance from the center. That makes them smooth and round!")}
        >
          <CardContent className="p-4 flex items-start gap-4">
            <div className="text-3xl">🛞</div>
            <div>
              <h3 className="font-bold text-lg">Why do circles roll?</h3>
              <p className="text-muted-foreground">All the edges are the same distance from the center!</p>
            </div>
            <Volume2 className="h-5 w-5 text-muted-foreground ml-auto" />
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => speak("An oval is not a circle because the edges are different distances from the center. That's why ovals don't roll as well!")}
        >
          <CardContent className="p-4 flex items-start gap-4">
            <div className="text-3xl">🥚</div>
            <div>
              <h3 className="font-bold text-lg">Why is an oval not a circle?</h3>
              <p className="text-muted-foreground">The edges are different distances from the center!</p>
            </div>
            <Volume2 className="h-5 w-5 text-muted-foreground ml-auto" />
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => speak("Circles are best for Claude's tires because they roll smoothly. Wheels need to be circles so bikes can move easily!")}
        >
          <CardContent className="p-4 flex items-start gap-4">
            <div className="text-3xl">🚲</div>
            <div>
              <h3 className="font-bold text-lg">Why are circles best for tires?</h3>
              <p className="text-muted-foreground">They roll smoothly because they're perfectly round!</p>
            </div>
            <Volume2 className="h-5 w-5 text-muted-foreground ml-auto" />
          </CardContent>
        </Card>
      </div>

      <div className="text-center mt-8">
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl p-6 max-w-lg mx-auto">
          <div className="text-5xl mb-3">🏆</div>
          <h3 className="text-xl font-bold text-primary mb-2">Lesson Complete!</h3>
          <p className="text-muted-foreground">
            You learned how to construct circles and why they make perfect wheels!
          </p>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (phase) {
      case 'intro': return renderIntro();
      case 'fluency': return renderFluency();
      case 'concept-intro': return renderConceptIntro();
      case 'concept-practice': return renderConceptIntro();
      case 'application': return renderApplication();
      case 'debrief': return renderDebrief();
      default: return renderIntro();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/activities-module-2')}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <h1 className="text-xl font-bold text-primary">{getPhaseTitle()}</h1>
          <Button
            variant="ghost"
            onClick={resetActivity}
            className="gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center gap-2 mb-6">
          {['intro', 'fluency', 'concept-intro', 'application', 'debrief'].map((p, idx) => (
            <div
              key={p}
              className={`w-3 h-3 rounded-full transition-colors ${
                phase === p ? 'bg-primary' : 
                ['intro', 'fluency', 'concept-intro', 'application', 'debrief'].indexOf(phase) > idx 
                  ? 'bg-primary/50' 
                  : 'bg-secondary'
              }`}
            />
          ))}
        </div>

        {/* Main content */}
        <Card className="p-6">
          <CardContent className="p-0">
            {renderContent()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ShapesCircles8;
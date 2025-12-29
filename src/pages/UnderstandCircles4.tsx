import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, RotateCcw, Check, X } from 'lucide-react';

const UnderstandCircles4 = () => {
  const [stage, setStage] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedShape, setSelectedShape] = useState<string | null>(null);
  const [shapePosition, setShapePosition] = useState({ shape: 'circle', position: 'center' });
  const [completedPositions, setCompletedPositions] = useState<string[]>([]);

  const shapes = [
    { id: 'circle1', type: 'circle', isCircle: true, size: 80 },
    { id: 'circle2', type: 'circle', isCircle: true, size: 100 },
    { id: 'circle3', type: 'circle', isCircle: true, size: 60 },
    { id: 'oval', type: 'oval', isCircle: false, width: 100, height: 60 },
    { id: 'rectangle', type: 'rectangle', isCircle: false, width: 100, height: 60 },
    { id: 'triangle', type: 'triangle', isCircle: false },
    { id: 'square', type: 'square', isCircle: false, size: 80 },
  ];

  const positions = [
    { name: 'behind', label: 'Behind', instruction: 'Put the circle BEHIND the animal' },
    { name: 'front', label: 'In Front Of', instruction: 'Put the circle IN FRONT OF the tree' },
    { name: 'between', label: 'Between', instruction: 'Put the circle BETWEEN the tree and animal' },
  ];

  const handleShapeClick = (shapeId: string, isCircle: boolean) => {
    setSelectedShape(shapeId);
    if (stage === 1) {
      if (isCircle) {
        setScore(score + 1);
      }
    }
  };

  const handlePositionClick = (posName: string) => {
    if (!completedPositions.includes(posName)) {
      setShapePosition({ ...shapePosition, position: posName });
      setCompletedPositions([...completedPositions, posName]);
      setScore(score + 1);
    }
  };

  const nextStage = () => {
    setStage(stage + 1);
    setSelectedShape(null);
    setCompletedPositions([]);
    setShapePosition({ shape: 'circle', position: 'center' });
  };

  const resetLesson = () => {
    setStage(0);
    setScore(0);
    setSelectedShape(null);
    setCompletedPositions([]);
    setShapePosition({ shape: 'circle', position: 'center' });
  };

  const renderShape = (shape: any, index: number) => {
    const isSelected = selectedShape === shape.id;
    
    if (shape.type === 'circle') {
      return (
        <div
          key={shape.id}
          onClick={() => handleShapeClick(shape.id, shape.isCircle)}
          className={`cursor-pointer transition-all ${isSelected ? 'ring-4 ring-green-500 scale-110' : 'hover:scale-105'}`}
          style={{
            width: shape.size,
            height: shape.size,
            backgroundColor: '#f59e0b',
            borderRadius: '50%',
            display: 'inline-block',
            margin: '10px',
            border: '3px solid #d97706',
          }}
        />
      );
    } else if (shape.type === 'oval') {
      return (
        <div
          key={shape.id}
          onClick={() => handleShapeClick(shape.id, shape.isCircle)}
          className={`cursor-pointer transition-all ${isSelected ? 'ring-4 ring-green-500 scale-110' : 'hover:scale-105'}`}
          style={{
            width: shape.width,
            height: shape.height,
            backgroundColor: '#f97316',
            borderRadius: '50%',
            display: 'inline-block',
            margin: '10px',
            border: '3px solid #ea580c',
          }}
        />
      );
    } else if (shape.type === 'rectangle') {
      return (
        <div
          key={shape.id}
          onClick={() => handleShapeClick(shape.id, shape.isCircle)}
          className={`cursor-pointer transition-all ${isSelected ? 'ring-4 ring-green-500 scale-110' : 'hover:scale-105'}`}
          style={{
            width: shape.width,
            height: shape.height,
            backgroundColor: '#3b82f6',
            border: '3px solid #1e40af',
            borderRadius: '4px',
            display: 'inline-block',
            margin: '10px',
          }}
        />
      );
    } else if (shape.type === 'square') {
      return (
        <div
          key={shape.id}
          onClick={() => handleShapeClick(shape.id, shape.isCircle)}
          className={`cursor-pointer transition-all ${isSelected ? 'ring-4 ring-green-500 scale-110' : 'hover:scale-105'}`}
          style={{
            width: shape.size,
            height: shape.size,
            backgroundColor: '#ef4444',
            border: '3px solid #b91c1c',
            borderRadius: '4px',
            display: 'inline-block',
            margin: '10px',
          }}
        />
      );
    } else if (shape.type === 'triangle') {
      return (
        <div
          key={shape.id}
          onClick={() => handleShapeClick(shape.id, shape.isCircle)}
          className={`cursor-pointer transition-all ${isSelected ? 'ring-4 ring-green-500 scale-110' : 'hover:scale-105'}`}
          style={{
            width: 0,
            height: 0,
            borderLeft: '40px solid transparent',
            borderRight: '40px solid transparent',
            borderBottom: '80px solid #10b981',
            display: 'inline-block',
            margin: '10px',
          }}
        />
      );
    }
  };

  const renderPositioningStage = () => {
    const currentPosition = positions.find(p => !completedPositions.includes(p.name));
    
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-orange-900 mb-4">
            {currentPosition ? currentPosition.instruction : 'Great job with all positions!'}
          </h3>
        </div>

        <div className="relative bg-gradient-to-br from-green-100 to-blue-100 rounded-xl p-12 min-h-[500px] border-4 border-green-300">
          {/* Tree */}
          <div 
            className="absolute text-8xl"
            style={{
              left: '15%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            🌳
          </div>

          {/* Animal */}
          <div 
            className="absolute text-6xl transition-all duration-300"
            style={{
              left: '70%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            🦒
          </div>

          {/* Movable Circle */}
          <div
            className="absolute transition-all duration-500"
            style={{
              left: shapePosition.position === 'behind' ? '65%' : 
                    shapePosition.position === 'front' ? '10%' :
                    shapePosition.position === 'between' ? '40%' : '50%',
              top: shapePosition.position === 'behind' ? '52%' : '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: shapePosition.position === 'behind' ? 0 : 10,
            }}
          >
            <div
              style={{
                width: 100,
                height: 100,
                backgroundColor: '#f59e0b',
                borderRadius: '50%',
                border: '4px solid #d97706',
              }}
            />
          </div>
        </div>

        <div className="flex justify-center gap-4 flex-wrap">
          {positions.map(pos => (
            <Button
              key={pos.name}
              onClick={() => handlePositionClick(pos.name)}
              disabled={completedPositions.includes(pos.name)}
              className={`text-xl px-8 py-6 ${
                completedPositions.includes(pos.name)
                  ? 'bg-green-500'
                  : 'bg-orange-500 hover:bg-orange-600'
              }`}
            >
              {completedPositions.includes(pos.name) && <Check className="mr-2" />}
              {pos.label}
            </Button>
          ))}
        </div>

        {completedPositions.length === positions.length && (
          <div className="text-center">
            <Button onClick={nextStage} className="text-xl px-8 py-6 bg-green-500 hover:bg-green-600">
              Continue <ArrowRight className="ml-2" />
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-orange-900">
              Lesson 4: Circle Explorer
            </h1>
            <div className="flex gap-2">
              <Button onClick={resetLesson} variant="outline" size="icon">
                <RotateCcw className="w-5 h-5" />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-lg font-semibold text-orange-600">
              Score: {score}
            </div>
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-orange-500 to-yellow-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(stage / 4) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Card className="p-8 bg-white shadow-xl">
          {/* Stage 0: Introduction */}
          {stage === 0 && (
            <div className="space-y-6 text-center">
              <div className="text-6xl mb-4">⭕</div>
              <h2 className="text-3xl font-bold text-orange-900">
                Welcome to Circle Explorer!
              </h2>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                Today we're going to learn all about circles. 
                Circles are special shapes that go round and round!
              </p>
              <div className="bg-orange-50 rounded-xl p-6 max-w-xl mx-auto">
                <p className="text-lg text-orange-900 font-semibold mb-3">
                  What makes a circle special?
                </p>
                <ul className="text-left text-lg space-y-2 max-w-xs mx-auto">
                  <li>🔄 Goes round and round</li>
                  <li>❌ No straight sides</li>
                  <li>❌ No corners</li>
                  <li>🎡 Rolls like a wheel!</li>
                </ul>
              </div>
              <div className="bg-yellow-50 rounded-xl p-6 max-w-xl mx-auto">
                <p className="text-lg text-yellow-900 font-semibold mb-3">
                  Watch out for ovals! 🥚
                </p>
                <p className="text-gray-700">
                  Ovals look like circles, but they're squished. They're not circles!
                </p>
              </div>
              <Button onClick={nextStage} className="text-xl px-8 py-6 bg-orange-500 hover:bg-orange-600">
                Let's Find Circles! <ArrowRight className="ml-2" />
              </Button>
            </div>
          )}

          {/* Stage 1: Find Circles */}
          {stage === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-orange-900 text-center">
                Click on all the circles!
              </h2>
              <p className="text-center text-lg text-gray-600">
                Remember: Circles have NO straight sides and NO corners
              </p>
              
              <div className="flex flex-wrap justify-center items-center gap-4 p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl min-h-[300px]">
                {shapes.map((shape, idx) => renderShape(shape, idx))}
              </div>

              <div className="text-center text-lg font-semibold text-orange-900">
                Circles found: {score} / 3
              </div>

              {score >= 3 && (
                <div className="text-center">
                  <Button onClick={nextStage} className="text-xl px-8 py-6 bg-green-500 hover:bg-green-600">
                    Next Activity <ArrowRight className="ml-2" />
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Stage 2: Position Words */}
          {stage === 2 && renderPositioningStage()}

          {/* Stage 3: Circle vs Oval */}
          {stage === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-orange-900 text-center">
                Circle or Oval? What's the difference?
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-orange-50 rounded-xl p-6 text-center">
                  <h3 className="text-xl font-bold text-orange-900 mb-4">Circle</h3>
                  <div className="flex justify-center mb-4">
                    <div style={{
                      width: 120,
                      height: 120,
                      backgroundColor: '#f59e0b',
                      borderRadius: '50%',
                      border: '4px solid #d97706',
                    }} />
                  </div>
                  <ul className="text-left space-y-2 max-w-xs mx-auto">
                    <li>✅ Perfectly round</li>
                    <li>✅ No corners</li>
                    <li>✅ No straight sides</li>
                    <li>🎡 Rolls smoothly like a wheel</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 rounded-xl p-6 text-center">
                  <h3 className="text-xl font-bold text-yellow-900 mb-4">Oval (Not a Circle!)</h3>
                  <div className="flex justify-center mb-4">
                    <div style={{
                      width: 140,
                      height: 90,
                      backgroundColor: '#f97316',
                      borderRadius: '50%',
                      border: '4px solid #ea580c',
                    }} />
                  </div>
                  <ul className="text-left space-y-2 max-w-xs mx-auto">
                    <li>❌ Squished circle shape</li>
                    <li>✅ No corners</li>
                    <li>✅ No straight sides</li>
                    <li>⚠️ Wouldn't roll well - it's squished!</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 text-center">
                <p className="text-xl font-bold text-green-900 mb-2">
                  Remember! 🎯
                </p>
                <p className="text-lg text-gray-700">
                  A circle is perfectly round. An oval is stretched or squished!
                </p>
              </div>

              <div className="text-center">
                <Button onClick={nextStage} className="text-xl px-8 py-6 bg-purple-500 hover:bg-purple-600">
                  Finish Lesson <Check className="ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Stage 4: Completion */}
          {stage === 4 && (
            <div className="space-y-6 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-green-600">
                Amazing Work, Circle Expert!
              </h2>
              <p className="text-xl text-gray-700">
                You've mastered circles and position words!
              </p>
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-8 max-w-2xl mx-auto">
                <p className="text-2xl font-bold text-orange-900 mb-4">
                  Final Score: {score} points! 🌟
                </p>
                <div className="space-y-2 text-left max-w-md mx-auto">
                  <p className="text-lg">✅ You can identify circles</p>
                  <p className="text-lg">✅ You know circles have no corners or straight sides</p>
                  <p className="text-lg">✅ You can tell circles from ovals</p>
                  <p className="text-lg">✅ You can use position words: behind, in front of, between</p>
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <Button onClick={resetLesson} className="text-xl px-8 py-6 bg-orange-500 hover:bg-orange-600">
                  <RotateCcw className="mr-2" /> Play Again
                </Button>
                <Button 
                  onClick={() => window.location.href = '/activities/module-2'}
                  className="text-xl px-8 py-6 bg-green-500 hover:bg-green-600"
                >
                  Next Lesson <ArrowRight className="ml-2" />
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default UnderstandCircles4;
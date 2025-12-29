import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, RotateCcw, Check, X } from 'lucide-react';

const UnderstandRectangles3 = () => {
  const [stage, setStage] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedShape, setSelectedShape] = useState<string | null>(null);
  const [animalPosition, setAnimalPosition] = useState({ x: 50, y: 50 });
  const [shapePosition, setShapePosition] = useState('center');
  const [completedPositions, setCompletedPositions] = useState<string[]>([]);

  const shapes = [
    { id: 'rect1', type: 'rectangle', isRect: true, sides: 4, corners: 4, width: 120, height: 60 },
    { id: 'rect2', type: 'rectangle', isRect: true, sides: 4, corners: 4, width: 80, height: 100 },
    { id: 'square1', type: 'square', isRect: true, sides: 4, corners: 4, width: 80, height: 80 },
    { id: 'triangle', type: 'triangle', isRect: false, sides: 3, corners: 3 },
    { id: 'circle', type: 'circle', isRect: false, sides: 0, corners: 0 },
    { id: 'rect3', type: 'rectangle', isRect: true, sides: 4, corners: 4, width: 140, height: 50 },
  ];

  const positions = [
    { name: 'above', label: 'Above', instruction: 'Put the rectangle ABOVE the animal' },
    { name: 'below', label: 'Below', instruction: 'Put the rectangle BELOW the animal' },
    { name: 'next-to', label: 'Next to', instruction: 'Put the rectangle NEXT TO the animal' },
  ];

  const handleShapeClick = (shapeId: string, isRect: boolean) => {
    setSelectedShape(shapeId);
    if (stage === 1) {
      if (isRect) {
        setScore(score + 1);
      }
    }
  };

  const handlePositionClick = (posName: string) => {
    if (!completedPositions.includes(posName)) {
      setShapePosition(posName);
      setCompletedPositions([...completedPositions, posName]);
      setScore(score + 1);
    }
  };

  const nextStage = () => {
    setStage(stage + 1);
    setSelectedShape(null);
    setCompletedPositions([]);
    setShapePosition('center');
  };

  const resetLesson = () => {
    setStage(0);
    setScore(0);
    setSelectedShape(null);
    setCompletedPositions([]);
    setShapePosition('center');
  };

  const renderShape = (shape: any, index: number, small = false) => {
    const size = small ? 0.5 : 1;
    const isSelected = selectedShape === shape.id;
    
    if (shape.type === 'rectangle' || shape.type === 'square') {
      return (
        <div
          key={shape.id}
          onClick={() => handleShapeClick(shape.id, shape.isRect)}
          className={`cursor-pointer transition-all ${isSelected ? 'ring-4 ring-blue-500 scale-110' : 'hover:scale-105'}`}
          style={{
            width: shape.width * size,
            height: shape.height * size,
            backgroundColor: shape.type === 'square' ? '#ef4444' : '#3b82f6',
            border: '3px solid #1e40af',
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
          onClick={() => handleShapeClick(shape.id, shape.isRect)}
          className={`cursor-pointer transition-all ${isSelected ? 'ring-4 ring-blue-500 scale-110' : 'hover:scale-105'}`}
          style={{
            width: 0,
            height: 0,
            borderLeft: `${40 * size}px solid transparent`,
            borderRight: `${40 * size}px solid transparent`,
            borderBottom: `${80 * size}px solid #10b981`,
            display: 'inline-block',
            margin: '10px',
          }}
        />
      );
    } else if (shape.type === 'circle') {
      return (
        <div
          key={shape.id}
          onClick={() => handleShapeClick(shape.id, shape.isRect)}
          className={`cursor-pointer transition-all ${isSelected ? 'ring-4 ring-blue-500 scale-110' : 'hover:scale-105'}`}
          style={{
            width: 80 * size,
            height: 80 * size,
            backgroundColor: '#f59e0b',
            borderRadius: '50%',
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
          <h3 className="text-2xl font-bold text-blue-900 mb-4">
            {currentPosition ? currentPosition.instruction : 'Great job with all positions!'}
          </h3>
        </div>

        <div className="relative bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-12 min-h-[400px] border-4 border-blue-200">
          {/* Animal in center */}
          <div 
            className="absolute text-6xl transition-all duration-300"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            🦒
          </div>

          {/* Movable Rectangle */}
          <div
            className="absolute transition-all duration-500 cursor-pointer hover:scale-110"
            style={{
              left: shapePosition === 'next-to' ? '20%' : '50%',
              top: shapePosition === 'above' ? '20%' : shapePosition === 'below' ? '75%' : '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div
              style={{
                width: 100,
                height: 60,
                backgroundColor: '#3b82f6',
                border: '4px solid #1e40af',
                borderRadius: '4px',
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
                  : 'bg-blue-500 hover:bg-blue-600'
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-blue-900">
              Lesson 3: Rectangles and Squares Adventure
            </h1>
            <div className="flex gap-2">
              <Button onClick={resetLesson} variant="outline" size="icon">
                <RotateCcw className="w-5 h-5" />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-lg font-semibold text-purple-600">
              Score: {score}
            </div>
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
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
              <div className="text-6xl mb-4">🟦</div>
              <h2 className="text-3xl font-bold text-blue-900">
                Welcome to Rectangles and Squares!
              </h2>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                Today we're going to learn about rectangles and squares. 
                Did you know a square is a special kind of rectangle?
              </p>
              <div className="bg-blue-50 rounded-xl p-6 max-w-xl mx-auto">
                <p className="text-lg text-blue-900 font-semibold mb-3">
                  Rectangles have:
                </p>
                <ul className="text-left text-lg space-y-2 max-w-xs mx-auto">
                  <li>✅ 4 straight sides</li>
                  <li>✅ 4 corners</li>
                  <li>✅ Can be long or short</li>
                </ul>
              </div>
              <div className="bg-red-50 rounded-xl p-6 max-w-xl mx-auto">
                <p className="text-lg text-red-900 font-semibold mb-3">
                  Squares are special rectangles:
                </p>
                <ul className="text-left text-lg space-y-2 max-w-xs mx-auto">
                  <li>✅ 4 straight sides</li>
                  <li>✅ 4 corners</li>
                  <li>✅ All sides are the same length!</li>
                </ul>
              </div>
              <Button onClick={nextStage} className="text-xl px-8 py-6 bg-blue-500 hover:bg-blue-600">
                Let's Start! <ArrowRight className="ml-2" />
              </Button>
            </div>
          )}

          {/* Stage 1: Find Rectangles */}
          {stage === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-blue-900 text-center">
                Click on all the rectangles (including squares!)
              </h2>
              <p className="text-center text-lg text-gray-600">
                Remember: Rectangles have 4 sides and 4 corners
              </p>
              
              <div className="flex flex-wrap justify-center items-center gap-4 p-8 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl min-h-[300px]">
                {shapes.map((shape, idx) => renderShape(shape, idx))}
              </div>

              <div className="text-center text-lg font-semibold text-blue-900">
                Rectangles found: {score} / 4
              </div>

              {score >= 4 && (
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

          {/* Stage 3: Square vs Rectangle */}
          {stage === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-blue-900 text-center">
                What's the difference?
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-xl p-6 text-center">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">Rectangle</h3>
                  <div className="flex justify-center mb-4">
                    <div style={{
                      width: 140,
                      height: 80,
                      backgroundColor: '#3b82f6',
                      border: '4px solid #1e40af',
                      borderRadius: '4px',
                    }} />
                  </div>
                  <ul className="text-left space-y-2 max-w-xs mx-auto">
                    <li>✅ 4 sides</li>
                    <li>✅ 4 corners</li>
                    <li>📏 Can be long and thin</li>
                    <li>📏 Can be short and wide</li>
                  </ul>
                </div>

                <div className="bg-red-50 rounded-xl p-6 text-center">
                  <h3 className="text-xl font-bold text-red-900 mb-4">Square (Special Rectangle!)</h3>
                  <div className="flex justify-center mb-4">
                    <div style={{
                      width: 100,
                      height: 100,
                      backgroundColor: '#ef4444',
                      border: '4px solid #b91c1c',
                      borderRadius: '4px',
                    }} />
                  </div>
                  <ul className="text-left space-y-2 max-w-xs mx-auto">
                    <li>✅ 4 sides</li>
                    <li>✅ 4 corners</li>
                    <li>⭐ All sides are equal!</li>
                    <li>⭐ It's a special rectangle</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 text-center">
                <p className="text-xl font-bold text-purple-900 mb-2">
                  Fun Fact! 🎉
                </p>
                <p className="text-lg text-gray-700">
                  Just like all sneakers are shoes, all squares are rectangles!
                  But not all rectangles are squares.
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
                Fantastic Work!
              </h2>
              <p className="text-xl text-gray-700">
                You've mastered rectangles and squares!
              </p>
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-8 max-w-2xl mx-auto">
                <p className="text-2xl font-bold text-blue-900 mb-4">
                  Final Score: {score} points! 🌟
                </p>
                <div className="space-y-2 text-left max-w-md mx-auto">
                  <p className="text-lg">✅ You can identify rectangles</p>
                  <p className="text-lg">✅ You know squares are special rectangles</p>
                  <p className="text-lg">✅ You can use position words</p>
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <Button onClick={resetLesson} className="text-xl px-8 py-6 bg-blue-500 hover:bg-blue-600">
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

export default UnderstandRectangles3;
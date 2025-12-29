import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, RotateCcw, Check, X, Sparkles } from 'lucide-react';

interface Straw {
  id: string;
  length: number;
  placed: boolean;
  angle: number;
  x: number;
  y: number;
}

interface ClayBall {
  id: string;
  placed: boolean;
  x: number;
  y: number;
}

const BuildTriangle6 = () => {
  const [stage, setStage] = useState(0);
  const [score, setScore] = useState(0);
  const [clayBalls, setClayBalls] = useState(1);
  const [selectedStraws, setSelectedStraws] = useState(0);
  const [triangleBuilt, setTriangleBuilt] = useState(false);
  const [builtTriangles, setBuiltTriangles] = useState<number>(0);

  const nextStage = () => {
    setStage(stage + 1);
    setSelectedStraws(0);
    setTriangleBuilt(false);
  };

  const resetLesson = () => {
    setStage(0);
    setScore(0);
    setClayBalls(1);
    setSelectedStraws(0);
    setTriangleBuilt(false);
    setBuiltTriangles(0);
  };

  const handleClayBallClick = () => {
    if (stage === 1 && clayBalls < 3) {
      setClayBalls(clayBalls + 1);
      if (clayBalls + 1 === 3) {
        setScore(score + 1);
      }
    }
  };

  const handleStrawClick = () => {
    if (stage === 2 && selectedStraws < 3) {
      setSelectedStraws(selectedStraws + 1);
      if (selectedStraws + 1 === 3) {
        setScore(score + 1);
      }
    }
  };

  const handleBuildTriangle = () => {
    setTriangleBuilt(true);
    setBuiltTriangles(builtTriangles + 1);
    setScore(score + 2);
  };

  const renderClayBalls = () => {
    const balls = [];
    for (let i = 0; i < clayBalls; i++) {
      balls.push(
        <div
          key={i}
          className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full shadow-lg animate-bounce"
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: '1s',
            animationIterationCount: '1',
          }}
        />
      );
    }
    return balls;
  };

  const renderStraws = () => {
    const straws = [];
    const lengths = [120, 100, 140];
    for (let i = 0; i < selectedStraws; i++) {
      straws.push(
        <div
          key={i}
          className="bg-gradient-to-r from-yellow-300 to-yellow-500 shadow-lg rounded-full animate-slideIn"
          style={{
            width: `${lengths[i]}px`,
            height: '8px',
            animationDelay: `${i * 0.3}s`,
          }}
        />
      );
    }
    return straws;
  };

  const renderBuiltTriangle = () => {
    return (
      <div className="relative w-64 h-64 mx-auto">
        {/* Triangle outline using straws */}
        <div 
          className="absolute bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full"
          style={{
            width: '140px',
            height: '8px',
            left: '50%',
            top: '20%',
            transform: 'translate(-50%, 0) rotate(-30deg)',
            transformOrigin: 'left center',
          }}
        />
        <div 
          className="absolute bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full"
          style={{
            width: '140px',
            height: '8px',
            left: '50%',
            top: '20%',
            transform: 'translate(-50%, 0) rotate(30deg)',
            transformOrigin: 'right center',
          }}
        />
        <div 
          className="absolute bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full"
          style={{
            width: '120px',
            height: '8px',
            left: '50%',
            bottom: '15%',
            transform: 'translateX(-50%)',
          }}
        />
        
        {/* Clay balls at corners */}
        <div 
          className="absolute w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full"
          style={{
            left: '50%',
            top: '10%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div 
          className="absolute w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full"
          style={{
            left: '15%',
            bottom: '10%',
            transform: 'translate(-50%, 50%)',
          }}
        />
        <div 
          className="absolute w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full"
          style={{
            right: '15%',
            bottom: '10%',
            transform: 'translate(50%, 50%)',
          }}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-orange-900">
              Lesson 6: Build a Triangle
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
                className="bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(stage / 5) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Card className="p-8 bg-white shadow-xl">
          {/* Stage 0: Introduction */}
          {stage === 0 && (
            <div className="space-y-6 text-center">
              <div className="text-6xl mb-4">🔺</div>
              <h2 className="text-3xl font-bold text-orange-900">
                Let's Build Triangles!
              </h2>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                Today we're going to learn how to BUILD our own triangles using straws and clay balls!
              </p>
              <div className="bg-orange-50 rounded-xl p-6 max-w-xl mx-auto">
                <p className="text-lg text-orange-900 font-semibold mb-3">
                  What do we need to build a triangle?
                </p>
                <ul className="text-left text-lg space-y-3 max-w-xs mx-auto">
                  <li className="flex items-center gap-3">
                    <span className="text-3xl">🟡</span>
                    <span><strong>3 clay balls</strong> for the corners</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-3xl">📏</span>
                    <span><strong>3 straws</strong> for the sides</span>
                  </li>
                </ul>
              </div>
              <div className="bg-yellow-50 rounded-xl p-6 max-w-xl mx-auto">
                <p className="text-lg font-semibold text-yellow-900 mb-2">
                  Remember! 🎯
                </p>
                <p className="text-gray-700">
                  All triangles have 3 sides and 3 corners!
                </p>
              </div>
              <Button onClick={nextStage} className="text-xl px-8 py-6 bg-orange-500 hover:bg-orange-600">
                Let's Start Building! <ArrowRight className="ml-2" />
              </Button>
            </div>
          )}

          {/* Stage 1: Make Clay Balls */}
          {stage === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-orange-900 text-center">
                Step 1: Make 3 Clay Balls
              </h2>
              <p className="text-center text-lg text-gray-600">
                Click the clay to split it into smaller balls. We need 3 balls for the 3 corners!
              </p>
              
              <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl p-12 min-h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <div 
                    onClick={handleClayBallClick}
                    className={`cursor-pointer mb-6 ${clayBalls < 3 ? 'animate-pulse' : ''}`}
                  >
                    <div className="text-6xl mb-4">👇</div>
                    <div className="text-xl font-semibold text-orange-900 mb-4">
                      Click to split the clay!
                    </div>
                  </div>
                  <div className="flex justify-center gap-6 flex-wrap">
                    {renderClayBalls()}
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-orange-900 mb-4">
                  Clay Balls: {clayBalls} / 3
                </div>
                {clayBalls === 3 && (
                  <div className="space-y-4">
                    <div className="text-green-600 text-xl font-semibold">
                      ✅ Perfect! We have 3 clay balls for 3 corners!
                    </div>
                    <Button onClick={nextStage} className="text-xl px-8 py-6 bg-green-500 hover:bg-green-600">
                      Next: Get Straws <ArrowRight className="ml-2" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Stage 2: Count Straws */}
          {stage === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-orange-900 text-center">
                Step 2: Count Out 3 Straws
              </h2>
              <p className="text-center text-lg text-gray-600">
                Click to take straws from the pile. We need 3 straws for the 3 sides!
              </p>
              
              <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl p-12 min-h-[300px] flex items-center justify-center">
                <div className="text-center w-full">
                  <div 
                    onClick={handleStrawClick}
                    className={`cursor-pointer mb-6 ${selectedStraws < 3 ? 'animate-pulse' : ''}`}
                  >
                    <div className="text-6xl mb-4">👇</div>
                    <div className="text-xl font-semibold text-orange-900 mb-6">
                      Click to take a straw!
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    {renderStraws()}
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-orange-900 mb-4">
                  Straws: {selectedStraws} / 3
                </div>
                {selectedStraws === 3 && (
                  <div className="space-y-4">
                    <div className="text-green-600 text-xl font-semibold">
                      ✅ Great! We have 3 straws for 3 sides!
                    </div>
                    <Button onClick={nextStage} className="text-xl px-8 py-6 bg-green-500 hover:bg-green-600">
                      Now Build the Triangle! <ArrowRight className="ml-2" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Stage 3: Build Triangle */}
          {stage === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-orange-900 text-center">
                Step 3: Put It Together!
              </h2>
              <p className="text-center text-lg text-gray-600">
                Use the clay balls to connect the straws at the corners
              </p>
              
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-12 min-h-[400px] flex items-center justify-center">
                {!triangleBuilt ? (
                  <div className="text-center">
                    <div className="text-6xl mb-6">🔨</div>
                    <div className="text-xl font-semibold text-gray-700 mb-6">
                      Connect 3 straws with 3 clay balls to make a triangle!
                    </div>
                    <Button 
                      onClick={handleBuildTriangle}
                      className="text-xl px-8 py-6 bg-orange-500 hover:bg-orange-600"
                    >
                      <Sparkles className="mr-2" />
                      Build My Triangle!
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    {renderBuiltTriangle()}
                    <div className="mt-6 text-2xl font-bold text-green-600">
                      🎉 You Built a Triangle! 🎉
                    </div>
                  </div>
                )}
              </div>

              {triangleBuilt && (
                <div className="text-center space-y-4">
                  <div className="bg-green-50 rounded-xl p-6 max-w-xl mx-auto">
                    <p className="text-lg font-semibold text-green-900 mb-2">
                      Let's check our triangle:
                    </p>
                    <div className="space-y-2 text-left max-w-xs mx-auto">
                      <p className="text-lg">✅ 3 sides (straws)</p>
                      <p className="text-lg">✅ 3 corners (clay balls)</p>
                      <p className="text-lg">✅ It's a triangle!</p>
                    </div>
                  </div>
                  <Button onClick={nextStage} className="text-xl px-8 py-6 bg-purple-500 hover:bg-purple-600">
                    See Different Triangles <ArrowRight className="ml-2" />
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Stage 4: Gallery of Triangles */}
          {stage === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-orange-900 text-center">
                Triangles Come in All Shapes!
              </h2>
              <p className="text-center text-lg text-gray-600">
                All of these are triangles because they have 3 sides and 3 corners
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                {/* Tall Triangle */}
                <div className="bg-gradient-to-br from-pink-50 to-red-50 rounded-xl p-6 text-center">
                  <h3 className="font-bold text-pink-900 mb-4">Tall Triangle</h3>
                  <div className="relative h-48 flex items-center justify-center">
                    <div style={{
                      width: 0,
                      height: 0,
                      borderLeft: '50px solid transparent',
                      borderRight: '50px solid transparent',
                      borderBottom: '140px solid #ec4899',
                    }} />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">3 sides, 3 corners ✓</p>
                </div>

                {/* Wide Triangle */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 text-center">
                  <h3 className="font-bold text-blue-900 mb-4">Wide Triangle</h3>
                  <div className="relative h-48 flex items-center justify-center">
                    <div style={{
                      width: 0,
                      height: 0,
                      borderLeft: '80px solid transparent',
                      borderRight: '80px solid transparent',
                      borderBottom: '80px solid #3b82f6',
                    }} />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">3 sides, 3 corners ✓</p>
                </div>

                {/* Upside Down Triangle */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 text-center">
                  <h3 className="font-bold text-green-900 mb-4">Upside Down!</h3>
                  <div className="relative h-48 flex items-center justify-center">
                    <div style={{
                      width: 0,
                      height: 0,
                      borderLeft: '60px solid transparent',
                      borderRight: '60px solid transparent',
                      borderTop: '100px solid #10b981',
                    }} />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">3 sides, 3 corners ✓</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 text-center max-w-2xl mx-auto">
                <p className="text-xl font-bold text-orange-900 mb-2">
                  Remember! 🎯
                </p>
                <p className="text-lg text-gray-700">
                  A triangle can be tall, wide, or even upside down! 
                  As long as it has 3 straight sides and 3 corners, it's a triangle!
                </p>
              </div>

              <div className="text-center">
                <Button onClick={nextStage} className="text-xl px-8 py-6 bg-purple-500 hover:bg-purple-600">
                  Finish Lesson <Check className="ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Stage 5: Completion */}
          {stage === 5 && (
            <div className="space-y-6 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-green-600">
                You're a Triangle Builder!
              </h2>
              <p className="text-xl text-gray-700">
                You've learned how to construct triangles!
              </p>
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-8 max-w-2xl mx-auto">
                <p className="text-2xl font-bold text-orange-900 mb-4">
                  Final Score: {score} points! 🌟
                </p>
                <div className="space-y-2 text-left max-w-md mx-auto">
                  <p className="text-lg">✅ You made 3 clay balls for corners</p>
                  <p className="text-lg">✅ You counted 3 straws for sides</p>
                  <p className="text-lg">✅ You built a complete triangle</p>
                  <p className="text-lg">✅ You learned triangles come in different shapes</p>
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <Button onClick={resetLesson} className="text-xl px-8 py-6 bg-orange-500 hover:bg-orange-600">
                  <RotateCcw className="mr-2" /> Build Again
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

export default BuildTriangle6;
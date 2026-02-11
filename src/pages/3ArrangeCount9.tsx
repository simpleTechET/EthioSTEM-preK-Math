import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RotateCcw, Fish, Circle, ArrowRight, Grid } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Configuration = 'circle' | 'line' | 'array';

interface FishData {
  id: number;
  color: string;
}

const ArrangeCount9 = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<'intro' | 'counting' | 'rearrange' | 'practice' | 'complete'>('intro');
  const [fishCount, setFishCount] = useState(6);
  const [configuration, setConfiguration] = useState<Configuration>('circle');
  const [countedFish, setCountedFish] = useState<number[]>([]);
  const [showShark, setShowShark] = useState(false);
  const [selectedNumeral, setSelectedNumeral] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [practiceRound, setPracticeRound] = useState(0);
  const [startMarker, setStartMarker] = useState<number | null>(null);

  const fish: FishData[] = Array.from({ length: fishCount }, (_, i) => ({
    id: i,
    color: i < 5 ? 'text-orange-400' : 'text-yellow-400'
  }));

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
    if (phase === 'intro') {
      speak("Welcome to our underwater adventure! Let's count fish swimming in different ways. The number of fish stays the same no matter how they swim!");
    }
  }, [phase]);

  const handleFishClick = (fishId: number) => {
    if (phase !== 'counting') return;
    
    if (configuration === 'circle' && startMarker === null) {
      setStartMarker(fishId);
      speak("Good! You marked where to start counting. Now count each fish!");
      return;
    }

    if (countedFish.includes(fishId)) return;

    const newCounted = [...countedFish, fishId];
    setCountedFish(newCounted);
    speak(newCounted.length.toString());

    if (newCounted.length === fishCount) {
      setTimeout(() => {
        speak(`Great job! You counted ${fishCount} fish!`);
        setShowFeedback(true);
      }, 500);
    }
  };

  const triggerShark = () => {
    setShowShark(true);
    speak("Oh no! A shark is coming! The fish need to swim in a different way to escape!");
    
    setTimeout(() => {
      const configs: Configuration[] = ['circle', 'line', 'array'];
      const currentIndex = configs.indexOf(configuration);
      const nextConfig = configs[(currentIndex + 1) % 3];
      setConfiguration(nextConfig);
      setCountedFish([]);
      setStartMarker(null);
      setShowShark(false);
      setShowFeedback(false);
      speak(`The fish are now swimming in a ${nextConfig}! Count them again to make sure they're all safe!`);
    }, 2000);
  };

  const handleNumeralSelect = (num: number) => {
    setSelectedNumeral(num);
    if (num === fishCount) {
      speak(`Yes! There are ${fishCount} fish!`);
      setTimeout(() => {
        if (practiceRound < 2) {
          setPracticeRound(prev => prev + 1);
          setFishCount(practiceRound === 0 ? 7 : 6);
          setConfiguration('circle');
          setCountedFish([]);
          setStartMarker(null);
          setSelectedNumeral(null);
          setShowFeedback(false);
        } else {
          setPhase('complete');
          speak("Wonderful! You learned that the number of fish stays the same no matter how they swim!");
        }
      }, 1500);
    } else {
      speak("Hmm, try counting again!");
      setSelectedNumeral(null);
    }
  };

  const startCounting = () => {
    setPhase('counting');
    speak(configuration === 'circle' 
      ? "Tap one fish to mark where you'll start counting. Then tap each fish in order!"
      : "Tap each fish to count them!");
  };

  const getCirclePositions = (count: number) => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i * 360 / count - 90) * (Math.PI / 180);
      const radius = 120;
      return {
        x: 150 + radius * Math.cos(angle),
        y: 140 + radius * Math.sin(angle)
      };
    });
  };

  const getLinePositions = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      x: 40 + i * 45,
      y: 140
    }));
  };

  const getArrayPositions = (count: number) => {
    const cols = count <= 4 ? count : Math.ceil(count / 2);
    return Array.from({ length: count }, (_, i) => ({
      x: 80 + (i % cols) * 55,
      y: 100 + Math.floor(i / cols) * 80
    }));
  };

  const getPositions = () => {
    switch (configuration) {
      case 'circle': return getCirclePositions(fishCount);
      case 'line': return getLinePositions(fishCount);
      case 'array': return getArrayPositions(fishCount);
    }
  };

  const positions = getPositions();

  const renderFish = () => {
    return positions.map((pos, index) => {
      const fishData = fish[index];
      const isCounted = countedFish.includes(fishData.id);
      const isStartMarker = startMarker === fishData.id;
      
      return (
        <g
          key={fishData.id}
          transform={`translate(${pos.x}, ${pos.y})`}
          onClick={() => handleFishClick(fishData.id)}
          className="cursor-pointer"
        >
          {isStartMarker && (
            <circle
              r="28"
              fill="none"
              stroke="#22c55e"
              strokeWidth="3"
              strokeDasharray="5,3"
              className="animate-pulse"
            />
          )}
          <text
            fontSize="36"
            textAnchor="middle"
            dominantBaseline="central"
            className={`transition-all duration-300 ${
              isCounted ? 'opacity-50' : 'hover:scale-110'
            }`}
            style={{ 
              transformOrigin: 'center',
              transform: isCounted ? 'scale(0.8)' : 'scale(1)'
            }}
          >
            🐟
          </text>
          {isCounted && (
            <text
              y="-20"
              fontSize="16"
              textAnchor="middle"
              fill="#22c55e"
              fontWeight="bold"
            >
              {countedFish.indexOf(fishData.id) + 1}
            </text>
          )}
        </g>
      );
    });
  };

  const restart = () => {
    setPhase('intro');
    setFishCount(6);
    setConfiguration('circle');
    setCountedFish([]);
    setShowShark(false);
    setSelectedNumeral(null);
    setShowFeedback(false);
    setPracticeRound(0);
    setStartMarker(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-400 via-blue-500 to-blue-700 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="text-white hover:bg-white/20"
        >
          <ArrowLeft className="h-6 w-6 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-white text-center">
          Lesson 9: Arrange and Count
        </h1>
        <Button
          variant="ghost"
          onClick={restart}
          className="text-white hover:bg-white/20"
        >
          <RotateCcw className="h-6 w-6" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        {phase === 'intro' && (
          <div className="bg-white/90 rounded-3xl p-8 text-center shadow-xl">
            <h2 className="text-3xl font-bold text-blue-600 mb-6">
              🐠 Underwater Fish Counting! 🐠
            </h2>
            <p className="text-xl text-gray-700 mb-6">
              Fish swim in different ways - in circles, in lines, and in groups!
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Let's discover something amazing: <span className="font-bold text-blue-600">
              the number of fish stays the same</span> no matter how they swim!
            </p>
            
            <div className="flex justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <Circle className="h-10 w-10 text-blue-500" />
                </div>
                <span className="text-sm text-gray-600">Circle</span>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <ArrowRight className="h-10 w-10 text-blue-500" />
                </div>
                <span className="text-sm text-gray-600">Line</span>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <Grid className="h-10 w-10 text-blue-500" />
                </div>
                <span className="text-sm text-gray-600">Array</span>
              </div>
            </div>

            <Button
              onClick={startCounting}
              className="bg-blue-500 hover:bg-blue-600 text-white text-xl px-8 py-6 rounded-full"
            >
              <Fish className="h-6 w-6 mr-2" />
              Start Swimming!
            </Button>
          </div>
        )}

        {(phase === 'counting' || phase === 'rearrange') && (
          <div className="space-y-4">
            {/* Underwater Scene */}
            <div className="bg-gradient-to-b from-blue-300 to-blue-600 rounded-3xl p-4 shadow-xl relative overflow-hidden">
              {/* Bubbles decoration */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full bg-white/20 animate-pulse"
                    style={{
                      width: Math.random() * 20 + 10,
                      height: Math.random() * 20 + 10,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`
                    }}
                  />
                ))}
              </div>

              {/* Seaweed decoration */}
              <div className="absolute bottom-0 left-4 text-4xl">🌿</div>
              <div className="absolute bottom-0 right-8 text-4xl">🌿</div>
              <div className="absolute bottom-0 left-1/4 text-3xl">🪸</div>
              <div className="absolute bottom-0 right-1/4 text-3xl">🪸</div>

              {/* Configuration indicator */}
              <div className="absolute top-4 left-4 bg-white/80 rounded-full px-4 py-2 flex items-center gap-2">
                {configuration === 'circle' && <Circle className="h-5 w-5 text-blue-500" />}
                {configuration === 'line' && <ArrowRight className="h-5 w-5 text-blue-500" />}
                {configuration === 'array' && <Grid className="h-5 w-5 text-blue-500" />}
                <span className="font-bold text-blue-600 capitalize">{configuration}</span>
              </div>

              {/* Shark */}
              {showShark && (
                <div className="absolute top-1/2 right-0 transform -translate-y-1/2 animate-bounce text-6xl z-10">
                  🦈
                </div>
              )}

              {/* Fish SVG */}
              <svg 
                viewBox="0 0 320 280" 
                className="w-full h-64 md:h-80"
              >
                {renderFish()}
              </svg>
            </div>

            {/* Instructions */}
            <div className="bg-white/90 rounded-2xl p-4 text-center">
              {configuration === 'circle' && startMarker === null ? (
                <p className="text-lg text-gray-700">
                  👆 Tap one fish to mark where you'll start counting!
                </p>
              ) : countedFish.length < fishCount ? (
                <p className="text-lg text-gray-700">
                  🐟 Tap each fish to count! ({countedFish.length} of {fishCount})
                </p>
              ) : (
                <p className="text-lg text-green-600 font-bold">
                  ✨ You counted {fishCount} fish! The number stays the same!
                </p>
              )}
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4">
              {showFeedback && !showShark && (
                <>
                  <Button
                    onClick={triggerShark}
                    className="bg-gray-500 hover:bg-gray-600 text-white text-lg px-6 py-4 rounded-full"
                  >
                    🦈 Here comes a shark!
                  </Button>
                  <Button
                    onClick={() => setPhase('practice')}
                    className="bg-green-500 hover:bg-green-600 text-white text-lg px-6 py-4 rounded-full"
                  >
                    Match the numeral! ✨
                  </Button>
                </>
              )}
            </div>
          </div>
        )}

        {phase === 'practice' && (
          <div className="space-y-6">
            {/* Fish display */}
            <div className="bg-gradient-to-b from-blue-300 to-blue-600 rounded-3xl p-4 shadow-xl relative overflow-hidden">
              <div className="absolute top-4 left-4 bg-white/80 rounded-full px-4 py-2">
                <span className="font-bold text-blue-600">Round {practiceRound + 1} of 3</span>
              </div>
              
              <svg viewBox="0 0 320 280" className="w-full h-56">
                {renderFish()}
              </svg>
            </div>

            {/* Question */}
            <div className="bg-white/90 rounded-2xl p-6 text-center">
              <p className="text-xl text-gray-700 mb-6">
                How many fish are there? Tap the correct number!
              </p>

              {/* Numeral choices */}
              <div className="flex justify-center gap-6">
                {[5, 6, 7].map(num => (
                  <button
                    key={num}
                    onClick={() => handleNumeralSelect(num)}
                    className={`w-20 h-20 text-4xl font-bold rounded-2xl transition-all duration-300 ${
                      selectedNumeral === num
                        ? num === fishCount
                          ? 'bg-green-500 text-white scale-110'
                          : 'bg-red-400 text-white shake'
                        : 'bg-blue-100 text-blue-600 hover:bg-blue-200 hover:scale-105'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Restart counting option */}
            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={() => {
                  setCountedFish([]);
                  setStartMarker(null);
                  setPhase('counting');
                }}
                className="text-blue-600 border-blue-400"
              >
                Count the fish again
              </Button>
            </div>
          </div>
        )}

        {phase === 'complete' && (
          <div className="bg-white/90 rounded-3xl p-8 text-center shadow-xl">
            <div className="text-6xl mb-6">🎉🐠🌟</div>
            <h2 className="text-3xl font-bold text-blue-600 mb-4">
              Amazing Job!
            </h2>
            <p className="text-xl text-gray-700 mb-6">
              You discovered an important secret about counting!
            </p>
            <div className="bg-blue-50 rounded-2xl p-6 mb-8">
              <p className="text-lg text-blue-700 font-bold">
                🐟 The number of fish stays the same no matter if they swim in a circle, a line, or a group!
              </p>
            </div>
            
            <div className="flex justify-center gap-4">
              <Button
                onClick={restart}
                className="bg-blue-500 hover:bg-blue-600 text-white text-lg px-6 py-4 rounded-full"
              >
                Play Again! 🐠
              </Button>
              <Button
                onClick={() => navigate('/')}
                variant="outline"
                className="text-blue-600 border-blue-400 text-lg px-6 py-4 rounded-full"
              >
                Back to Lessons
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Objective reminder */}
      <div className="max-w-4xl mx-auto mt-6">
        <div className="bg-white/20 backdrop-blur rounded-xl p-3 text-center">
          <p className="text-white text-sm">
            <strong>Objective:</strong> Arrange and count 6 and 7 objects in varied configurations
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArrangeCount9;

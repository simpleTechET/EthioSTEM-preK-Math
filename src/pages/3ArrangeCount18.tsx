import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RotateCcw, Flower2, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Configuration = 'line' | '5group' | 'array' | 'circle';

interface GardenIdea {
  name: string;
  config: Configuration;
  description: string;
  emoji: string;
}

const gardenIdeas: GardenIdea[] = [
  { name: 'Sammy', config: 'line', description: 'Seeds in 1 long line', emoji: '🧒' },
  { name: 'Maria', config: '5group', description: '5 seeds on top, 3 below', emoji: '👧' },
  { name: 'Ms. Anan', config: 'array', description: '2 equal rows of 4', emoji: '👩' },
  { name: 'Mr. Quan', config: 'circle', description: 'Seeds in a circle', emoji: '👴' },
];

const ArrangeCount18: React.FC = () => {
  const [phase, setPhase] = useState<'intro' | 'explore' | 'arrange' | 'count' | 'match' | 'practice' | 'complete'>('intro');
  const [currentIdea, setCurrentIdea] = useState<GardenIdea>(gardenIdeas[0]);
  const [seeds, setSeeds] = useState<{ id: number; placed: boolean }[]>(
    Array.from({ length: 8 }, (_, i) => ({ id: i, placed: false }))
  );
  const [countedSeeds, setCountedSeeds] = useState<number[]>([]);
  const [selectedNumeral, setSelectedNumeral] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [practiceRound, setPracticeRound] = useState(0);
  const [ideaIndex, setIdeaIndex] = useState(0);

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
      speak('Welcome to the Community Garden! Maria and her neighbors want to plant flowers. They have 8 seeds but different ideas about how to arrange them. Let\'s explore!');
    }
  }, [phase]);

  const getPositions = (config: Configuration): { x: number; y: number }[] => {
    const positions: { x: number; y: number }[] = [];
    
    switch (config) {
      case 'line':
        for (let i = 0; i < 8; i++) {
          positions.push({ x: 80 + i * 50, y: 150 });
        }
        break;
      case '5group':
        // 5 on top, 3 below
        for (let i = 0; i < 5; i++) {
          positions.push({ x: 100 + i * 50, y: 120 });
        }
        for (let i = 0; i < 3; i++) {
          positions.push({ x: 125 + i * 50, y: 180 });
        }
        break;
      case 'array':
        // 2 rows of 4
        for (let row = 0; row < 2; row++) {
          for (let col = 0; col < 4; col++) {
            positions.push({ x: 130 + col * 55, y: 120 + row * 60 });
          }
        }
        break;
      case 'circle':
        const centerX = 240;
        const centerY = 150;
        const radius = 70;
        for (let i = 0; i < 8; i++) {
          const angle = (i * 2 * Math.PI) / 8 - Math.PI / 2;
          positions.push({
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle),
          });
        }
        break;
    }
    return positions;
  };

  const handleSeedClick = (seedId: number) => {
    if (phase !== 'count') return;
    
    if (countedSeeds.includes(seedId)) return;
    
    const newCount = countedSeeds.length + 1;
    setCountedSeeds([...countedSeeds, seedId]);
    speak(newCount.toString());
    
    if (newCount === 8) {
      setTimeout(() => {
        speak('Great counting! Now find the numeral that shows how many seeds.');
        setPhase('match');
      }, 800);
    }
  };

  const handleNumeralSelect = (num: number) => {
    setSelectedNumeral(num);
    if (num === 8) {
      setShowFeedback('correct');
      speak('Yes! 8 seeds! The number is still 8, no matter how we arrange them!');
      setTimeout(() => {
        setShowFeedback(null);
        if (practiceRound < 2) {
          // Move to next configuration
          const nextIndex = (ideaIndex + 1) % gardenIdeas.length;
          setIdeaIndex(nextIndex);
          setCurrentIdea(gardenIdeas[nextIndex]);
          setPracticeRound(practiceRound + 1);
          setCountedSeeds([]);
          setSelectedNumeral(null);
          speak(`Now let's try ${gardenIdeas[nextIndex].name}'s idea: ${gardenIdeas[nextIndex].description}. Tap each seed to count!`);
          setPhase('count');
        } else {
          setPhase('complete');
        }
      }, 2000);
    } else {
      setShowFeedback('incorrect');
      speak('Hmm, let\'s count again. Tap each seed one by one.');
      setTimeout(() => {
        setShowFeedback(null);
        setSelectedNumeral(null);
        setCountedSeeds([]);
        setPhase('count');
      }, 1500);
    }
  };

  const startExplore = () => {
    speak('First, let\'s see each neighbor\'s idea for the garden. They all have 8 seeds!');
    setPhase('explore');
  };

  const startArranging = () => {
    setIdeaIndex(0);
    setCurrentIdea(gardenIdeas[0]);
    speak(`Let's start with ${gardenIdeas[0].name}'s idea: ${gardenIdeas[0].description}. Tap each seed to count!`);
    setCountedSeeds([]);
    setPhase('count');
  };

  const nextIdea = () => {
    const nextIndex = ideaIndex + 1;
    if (nextIndex < gardenIdeas.length) {
      setIdeaIndex(nextIndex);
      speak(`${gardenIdeas[nextIndex].name} wants ${gardenIdeas[nextIndex].description}.`);
    } else {
      speak('Now it\'s your turn! Let\'s count seeds in different arrangements.');
      setPhase('arrange');
    }
  };

  const restart = () => {
    setPhase('intro');
    setCurrentIdea(gardenIdeas[0]);
    setSeeds(Array.from({ length: 8 }, (_, i) => ({ id: i, placed: false })));
    setCountedSeeds([]);
    setSelectedNumeral(null);
    setShowFeedback(null);
    setPracticeRound(0);
    setIdeaIndex(0);
  };

  const renderSeeds = () => {
    const positions = getPositions(currentIdea.config);
    
    return positions.map((pos, index) => {
      const isCounted = countedSeeds.includes(index);
      const countOrder = countedSeeds.indexOf(index) + 1;
      
      return (
        <g
          key={index}
          onClick={() => handleSeedClick(index)}
          style={{ cursor: phase === 'count' ? 'pointer' : 'default' }}
        >
          {/* Seed */}
          <ellipse
            cx={pos.x}
            cy={pos.y}
            rx={16}
            ry={10}
            fill={isCounted ? '#f59e0b' : '#92400e'}
            stroke={isCounted ? '#fbbf24' : '#78350f'}
            strokeWidth={2}
            className={`transition-all duration-200 ${phase === 'count' && !isCounted ? 'hover:scale-110' : ''}`}
            style={{
              transform: isCounted ? 'scale(1.1)' : 'scale(1)',
              transformOrigin: `${pos.x}px ${pos.y}px`,
            }}
          />
          {/* Seed highlight */}
          <ellipse
            cx={pos.x - 4}
            cy={pos.y - 3}
            rx={4}
            ry={2}
            fill="rgba(255,255,255,0.3)"
          />
          {/* Count number */}
          {isCounted && (
            <text
              x={pos.x}
              y={pos.y - 20}
              textAnchor="middle"
              className="text-lg font-bold fill-amber-600"
              style={{ fontSize: '16px' }}
            >
              {countOrder}
            </text>
          )}
        </g>
      );
    });
  };

  const renderExploreView = () => {
    const idea = gardenIdeas[ideaIndex];
    const positions = getPositions(idea.config);
    
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-3 bg-white/80 rounded-full px-6 py-3 shadow-lg">
          <span className="text-4xl">{idea.emoji}</span>
          <div>
            <div className="font-bold text-green-800">{idea.name}'s Idea</div>
            <div className="text-sm text-green-600">{idea.description}</div>
          </div>
        </div>
        
        {/* Garden bed */}
        <div className="relative">
          <svg width="480" height="300" viewBox="0 0 480 300">
            {/* Garden bed background */}
            <rect x="40" y="60" width="400" height="180" rx="20" fill="#4ade80" />
            <rect x="50" y="70" width="380" height="160" rx="15" fill="#86efac" />
            
            {/* Soil area */}
            <rect x="60" y="80" width="360" height="140" rx="10" fill="#78350f" opacity="0.3" />
            
            {/* Seeds */}
            {positions.map((pos, index) => (
              <g key={index}>
                <ellipse
                  cx={pos.x}
                  cy={pos.y}
                  rx={16}
                  ry={10}
                  fill="#92400e"
                  stroke="#78350f"
                  strokeWidth={2}
                />
                <ellipse
                  cx={pos.x - 4}
                  cy={pos.y - 3}
                  rx={4}
                  ry={2}
                  fill="rgba(255,255,255,0.3)"
                />
              </g>
            ))}
          </svg>
        </div>
        
        <div className="text-2xl font-bold text-green-800">
          8 seeds arranged {idea.config === 'line' ? 'in a line' : 
            idea.config === '5group' ? 'as 5 and 3' :
            idea.config === 'array' ? 'in 2 rows of 4' : 'in a circle'}
        </div>
        
        <Button
          onClick={nextIdea}
          size="lg"
          className="bg-green-500 hover:bg-green-600 text-white text-xl px-8"
        >
          {ideaIndex < gardenIdeas.length - 1 ? 'See Next Idea →' : 'Start Counting! 🌱'}
        </Button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 via-green-100 to-green-200 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Link to="/">
          <Button variant="ghost" size="icon" className="text-green-700">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-green-800 flex items-center gap-2">
          <Flower2 className="h-8 w-8 text-pink-500" />
          Community Garden
        </h1>
        <Button variant="ghost" size="icon" onClick={restart} className="text-green-700">
          <RotateCcw className="h-6 w-6" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto">
        {phase === 'intro' && (
          <div className="text-center space-y-6 animate-fade-in">
            <div className="text-6xl mb-4">🏡🌻</div>
            <h2 className="text-3xl font-bold text-green-800">Welcome to the Community Garden!</h2>
            <p className="text-xl text-green-700">
              Maria and her neighbors want to plant flowers.<br />
              They have <span className="font-bold text-amber-600">8 seeds</span> but different ideas!
            </p>
            
            <div className="flex justify-center gap-4 flex-wrap">
              {gardenIdeas.map((idea) => (
                <div key={idea.name} className="bg-white/70 rounded-xl p-4 shadow-lg">
                  <div className="text-3xl mb-1">{idea.emoji}</div>
                  <div className="font-bold text-green-700">{idea.name}</div>
                </div>
              ))}
            </div>
            
            <Button
              onClick={startExplore}
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white text-2xl px-10 py-6"
            >
              Explore the Ideas! 🌱
            </Button>
          </div>
        )}

        {phase === 'explore' && renderExploreView()}

        {phase === 'arrange' && (
          <div className="text-center space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-green-800">Now It's Your Turn!</h2>
            <p className="text-lg text-green-700">
              Count the seeds in each arrangement.<br />
              Remember: there are always 8 seeds!
            </p>
            
            <div className="flex justify-center gap-4 flex-wrap">
              {gardenIdeas.map((idea, index) => (
                <button
                  key={idea.name}
                  onClick={() => {
                    setCurrentIdea(idea);
                    setIdeaIndex(index);
                    setCountedSeeds([]);
                    speak(`${idea.name}'s idea: ${idea.description}. Tap each seed to count!`);
                    setPhase('count');
                  }}
                  className="bg-white/80 rounded-xl p-4 shadow-lg hover:scale-105 transition-transform border-2 border-transparent hover:border-green-400"
                >
                  <div className="text-3xl mb-2">{idea.emoji}</div>
                  <div className="font-bold text-green-700">{idea.name}</div>
                  <div className="text-sm text-green-600">{idea.description}</div>
                </button>
              ))}
            </div>
            
            <Button
              onClick={startArranging}
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-white text-xl px-8"
            >
              Let's Count Seeds! 🌻
            </Button>
          </div>
        )}

        {(phase === 'count' || phase === 'match') && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-center gap-3 bg-white/80 rounded-full px-6 py-3 shadow-lg">
              <span className="text-3xl">{currentIdea.emoji}</span>
              <div>
                <div className="font-bold text-green-800">{currentIdea.name}'s Garden</div>
                <div className="text-sm text-green-600">{currentIdea.description}</div>
              </div>
            </div>

            <div className="bg-gradient-to-b from-green-300 to-green-400 rounded-3xl p-4 shadow-xl">
              <svg width="100%" height="300" viewBox="0 0 480 300">
                {/* Garden bed background */}
                <rect x="40" y="60" width="400" height="180" rx="20" fill="#4ade80" />
                <rect x="50" y="70" width="380" height="160" rx="15" fill="#86efac" />
                
                {/* Soil area */}
                <rect x="60" y="80" width="360" height="140" rx="10" fill="#78350f" opacity="0.3" />
                
                {/* Seeds */}
                {renderSeeds()}
                
                {/* Decorative elements */}
                <text x="420" y="260" className="text-2xl">🌷</text>
                <text x="50" y="260" className="text-2xl">🌸</text>
              </svg>
            </div>

            <div className="text-center text-xl font-bold text-green-800">
              {phase === 'count' 
                ? `Tap each seed to count! (${countedSeeds.length}/8)`
                : 'How many seeds are there?'}
            </div>

            {phase === 'match' && (
              <div className="flex justify-center gap-4 flex-wrap">
                {[6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleNumeralSelect(num)}
                    disabled={showFeedback !== null}
                    className={`w-20 h-20 text-4xl font-bold rounded-2xl transition-all
                      ${selectedNumeral === num
                        ? showFeedback === 'correct'
                          ? 'bg-green-500 text-white scale-110'
                          : showFeedback === 'incorrect'
                          ? 'bg-red-500 text-white animate-shake'
                          : 'bg-amber-400 text-white'
                        : 'bg-white hover:bg-amber-100 text-green-800 shadow-lg hover:scale-105'
                      }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            )}

            {showFeedback === 'correct' && (
              <div className="flex justify-center items-center gap-2 text-green-600 text-xl font-bold animate-bounce">
                <Check className="h-8 w-8" />
                Excellent! Still 8 seeds!
              </div>
            )}

            <div className="text-center text-sm text-green-600 bg-white/50 rounded-lg p-2">
              Round {practiceRound + 1} of 3
            </div>
          </div>
        )}

        {phase === 'complete' && (
          <div className="text-center space-y-6 animate-fade-in">
            <div className="text-7xl animate-bounce">🎉</div>
            <h2 className="text-3xl font-bold text-green-800">Amazing Gardener!</h2>
            <p className="text-xl text-green-700">
              You discovered something important:
            </p>
            <div className="bg-white/80 rounded-2xl p-6 shadow-xl max-w-md mx-auto">
              <div className="text-lg text-green-800 font-medium">
                No matter how we arrange the seeds —<br />
                in a <strong>line</strong>, an <strong>array</strong>, or a <strong>circle</strong> —<br />
                there are always <span className="text-4xl font-bold text-amber-600">8</span> seeds!
              </div>
            </div>
            
            <div className="flex justify-center gap-4">
              {gardenIdeas.map((idea) => (
                <div key={idea.name} className="text-4xl animate-pulse">
                  {idea.emoji}
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-4 pt-4">
              <Button
                onClick={restart}
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-white text-xl"
              >
                <RotateCcw className="h-5 w-5 mr-2" />
                Plant Again
              </Button>
              <Link to="/">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-xl border-green-500 text-green-700"
                >
                  Back to Lessons
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Objective reminder */}
      <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto">
        <div className="bg-green-800/90 text-white text-center py-2 px-4 rounded-full text-sm">
          <Sparkles className="inline h-4 w-4 mr-1" />
          Objective: Arrange and count 8 objects in varied configurations
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-5px); }
          40%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default ArrangeCount18;

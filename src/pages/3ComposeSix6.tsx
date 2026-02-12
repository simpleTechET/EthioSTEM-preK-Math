import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RotateCcw, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CubeStickProps {
  count: number;
  color: string;
  onClick?: () => void;
  isClickable?: boolean;
  small?: boolean;
}

const CubeStick: React.FC<CubeStickProps> = ({ count, color, onClick, isClickable = false, small = false }) => {
  const cubeSize = small ? 'w-8 h-8' : 'w-12 h-12';
  
  return (
    <div 
      className={`flex gap-1 ${isClickable ? 'cursor-pointer hover:scale-105 transition-transform' : ''}`}
      onClick={isClickable ? onClick : undefined}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`${cubeSize} rounded-lg border-2 border-white/30 shadow-lg flex items-center justify-center text-white font-bold text-lg animate-scale-in`}
          style={{ 
            backgroundColor: color,
            animationDelay: `${i * 0.1}s`
          }}
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
};

interface PuzzleSlotProps {
  targetCount: number;
  currentCount: number;
  color: string;
  label: string;
}

const PuzzleSlot: React.FC<PuzzleSlotProps> = ({ targetCount, currentCount, color, label }) => {
  const isFilled = currentCount === targetCount;
  
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-lg font-bold text-muted-foreground">{label}</span>
      <div 
        className={`flex gap-1 p-3 rounded-xl border-4 border-dashed transition-all ${
          isFilled ? 'border-green-500 bg-green-100' : 'border-amber-400 bg-amber-50'
        }`}
      >
        {Array.from({ length: targetCount }).map((_, i) => (
          <div
            key={i}
            className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center font-bold transition-all ${
              i < currentCount 
                ? 'border-white/30 shadow-lg text-white' 
                : 'border-gray-300 bg-gray-100'
            }`}
            style={{ backgroundColor: i < currentCount ? color : undefined }}
          >
            {i < currentCount ? i + 1 : '?'}
          </div>
        ))}
      </div>
    </div>
  );
};

const NumeralCard: React.FC<{ number: number; isActive: boolean; onClick: () => void }> = ({ 
  number, 
  isActive, 
  onClick 
}) => {
  return (
    <div
      onClick={onClick}
      className={`w-24 h-32 rounded-2xl border-4 flex items-center justify-center cursor-pointer transition-all transform hover:scale-105 ${
        isActive 
          ? 'border-green-500 bg-green-100 shadow-xl scale-110' 
          : 'border-primary/30 bg-white shadow-md'
      }`}
    >
      <span className={`text-6xl font-bold ${isActive ? 'text-green-600' : 'text-primary'}`}>
        {number}
      </span>
    </div>
  );
};

// Partner pairs for 6
const PARTNER_PUZZLES = [
  { left: 5, right: 1, leftColor: '#FF6B6B', rightColor: '#4ECDC4' },
  { left: 4, right: 2, leftColor: '#45B7D1', rightColor: '#96CEB4' },
  { left: 3, right: 3, leftColor: '#FFEAA7', rightColor: '#DDA0DD' },
  { left: 2, right: 4, leftColor: '#98D8C8', rightColor: '#F7DC6F' },
  { left: 1, right: 5, leftColor: '#BB8FCE', rightColor: '#85C1E9' },
];

const ComposeSixLesson: React.FC = () => {
  const [phase, setPhase] = useState<'intro' | 'compose' | 'decompose' | 'match' | 'celebrate'>('intro');
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [leftFilled, setLeftFilled] = useState(0);
  const [rightFilled, setRightFilled] = useState(0);
  const [isComposed, setIsComposed] = useState(false);
  const [matchedCorrectly, setMatchedCorrectly] = useState(false);
  const [completedPuzzles, setCompletedPuzzles] = useState(0);

  const currentPuzzle = PARTNER_PUZZLES[currentPuzzleIndex];

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const speakNumber = (num: number) => {
    const words = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven'];
    speakText(words[num] || num.toString());
  };

  useEffect(() => {
    if (phase === 'intro') {
      speakText('Welcome! Let\'s learn about the number 6 and its partners!');
    }
  }, [phase]);

  const handleStartLesson = () => {
    setPhase('compose');
    speakText('Let\'s build 6 by putting two sticks together! Click the sticks to add cubes.');
  };

  const handleAddToLeft = () => {
    if (leftFilled < currentPuzzle.left && !isComposed) {
      const newCount = leftFilled + 1;
      setLeftFilled(newCount);
      speakNumber(newCount);
    }
  };

  const handleAddToRight = () => {
    if (rightFilled < currentPuzzle.right && !isComposed) {
      const newCount = rightFilled + 1;
      setRightFilled(newCount);
      speakNumber(newCount);
    }
  };

  const handleCompose = () => {
    if (leftFilled === currentPuzzle.left && rightFilled === currentPuzzle.right) {
      setIsComposed(true);
      speakText(`${currentPuzzle.left} and ${currentPuzzle.right} make 6! Now match the numeral!`);
      setPhase('match');
    }
  };

  const handleNumeralClick = (num: number) => {
    if (num === 6) {
      setMatchedCorrectly(true);
      speakText('Correct! That\'s 6!');
      
      setTimeout(() => {
        if (completedPuzzles + 1 >= 3) {
          setPhase('celebrate');
          speakText('Amazing! You learned all about the number 6 and its partners!');
        } else {
          // Move to next puzzle
          setCompletedPuzzles(prev => prev + 1);
          setCurrentPuzzleIndex(prev => (prev + 1) % PARTNER_PUZZLES.length);
          setLeftFilled(0);
          setRightFilled(0);
          setIsComposed(false);
          setMatchedCorrectly(false);
          setPhase('compose');
          speakText('Great! Let\'s try another way to make 6!');
        }
      }, 1500);
    } else {
      speakText('Hmm, try again! Count all the cubes.');
    }
  };

  const handleDecompose = () => {
    setIsComposed(false);
    setLeftFilled(0);
    setRightFilled(0);
    setPhase('compose');
    speakText('Let\'s break the stick apart and build it again!');
  };

  const resetGame = () => {
    setPhase('intro');
    setCurrentPuzzleIndex(0);
    setLeftFilled(0);
    setRightFilled(0);
    setIsComposed(false);
    setMatchedCorrectly(false);
    setCompletedPuzzles(0);
  };

  const bothFilled = leftFilled === currentPuzzle.left && rightFilled === currentPuzzle.right;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 via-sky-100 to-emerald-100 p-4 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Link to="/">
          <Button variant="ghost" size="icon" className="rounded-full bg-white/50 hover:bg-white/80">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-primary text-center">
          Partners of 6! 🧱
        </h1>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={resetGame}
          className="rounded-full bg-white/50 hover:bg-white/80"
        >
          <RotateCcw className="h-6 w-6" />
        </Button>
      </div>

      {/* Progress */}
      <div className="flex justify-center gap-2 mb-6">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold transition-all ${
              i < completedPuzzles 
                ? 'bg-green-500 border-green-600 text-white' 
                : i === completedPuzzles 
                  ? 'bg-amber-400 border-amber-500 text-white animate-pulse' 
                  : 'bg-gray-200 border-gray-300 text-gray-400'
            }`}
          >
            {i < completedPuzzles ? '✓' : i + 1}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        {phase === 'intro' && (
          <div className="flex flex-col items-center justify-center gap-8 animate-fade-in">
            <div className="text-center bg-white/80 rounded-3xl p-8 shadow-xl">
              <h2 className="text-3xl font-bold text-primary mb-4">
                Let's Learn About 6! 🎉
              </h2>
              <p className="text-xl text-muted-foreground mb-6">
                6 has special friends called "partners".<br/>
                Partners are two numbers that make 6 together!
              </p>
              
              {/* Show the numeral 6 large */}
              <div className="w-40 h-48 mx-auto bg-gradient-to-br from-primary to-primary/80 rounded-3xl flex items-center justify-center shadow-2xl mb-6">
                <span className="text-9xl font-bold text-white">6</span>
              </div>

              <p className="text-lg text-muted-foreground mb-6">
                5 and 1, 4 and 2, 3 and 3... they all make 6!
              </p>
              
              <Button 
                onClick={handleStartLesson}
                className="text-2xl px-8 py-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg"
              >
                Let's Build 6! 🧱
              </Button>
            </div>
          </div>
        )}

        {(phase === 'compose' || phase === 'match') && (
          <div className="flex flex-col items-center gap-6 animate-fade-in">
            {/* Current puzzle info */}
            <div className="bg-white/90 rounded-2xl px-6 py-3 shadow-lg">
              <p className="text-xl font-bold text-primary text-center">
                {phase === 'compose' 
                  ? `Build ${currentPuzzle.left} + ${currentPuzzle.right} = 6` 
                  : 'Now match the numeral!'}
              </p>
            </div>

            {/* Puzzle area */}
            <div className="bg-white/80 rounded-3xl p-6 shadow-xl">
              {!isComposed ? (
                <div className="flex flex-col md:flex-row items-center gap-6">
                  {/* Left slot */}
                  <div 
                    className="cursor-pointer transition-transform hover:scale-105"
                    onClick={handleAddToLeft}
                  >
                    <PuzzleSlot 
                      targetCount={currentPuzzle.left}
                      currentCount={leftFilled}
                      color={currentPuzzle.leftColor}
                      label={`${currentPuzzle.left} cubes`}
                    />
                    {leftFilled < currentPuzzle.left && (
                      <p className="text-center text-sm text-muted-foreground mt-2 animate-pulse">
                        Tap to add!
                      </p>
                    )}
                  </div>

                  <span className="text-4xl font-bold text-primary">+</span>

                  {/* Right slot */}
                  <div 
                    className="cursor-pointer transition-transform hover:scale-105"
                    onClick={handleAddToRight}
                  >
                    <PuzzleSlot 
                      targetCount={currentPuzzle.right}
                      currentCount={rightFilled}
                      color={currentPuzzle.rightColor}
                      label={`${currentPuzzle.right} cubes`}
                    />
                    {rightFilled < currentPuzzle.right && (
                      <p className="text-center text-sm text-muted-foreground mt-2 animate-pulse">
                        Tap to add!
                      </p>
                    )}
                  </div>

                  <span className="text-4xl font-bold text-primary">=</span>

                  <div className="w-20 h-20 rounded-2xl border-4 border-dashed border-gray-300 flex items-center justify-center">
                    <span className="text-4xl font-bold text-gray-300">?</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  {/* Composed stick of 6 */}
                  <div className="flex gap-1">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-12 h-12 rounded-lg border-2 border-white/30 shadow-lg flex items-center justify-center text-white font-bold text-lg animate-scale-in"
                        style={{ 
                          backgroundColor: i < currentPuzzle.left 
                            ? currentPuzzle.leftColor 
                            : currentPuzzle.rightColor,
                          animationDelay: `${i * 0.1}s`
                        }}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                  <p className="text-xl font-bold text-green-600">
                    {currentPuzzle.left} + {currentPuzzle.right} = 6! 🎉
                  </p>
                </div>
              )}

              {/* Compose button */}
              {bothFilled && !isComposed && (
                <div className="flex justify-center mt-6">
                  <Button
                    onClick={handleCompose}
                    className="text-xl px-6 py-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg animate-bounce"
                  >
                    Put Together! 🔗
                  </Button>
                </div>
              )}
            </div>

            {/* Numeral matching */}
            {phase === 'match' && (
              <div className="mt-4 animate-fade-in">
                <p className="text-xl font-bold text-center text-primary mb-4">
                  Which numeral shows how many cubes? 🔢
                </p>
                <div className="flex gap-4 justify-center">
                  {[4, 5, 6, 7].map((num) => (
                    <NumeralCard
                      key={num}
                      number={num}
                      isActive={matchedCorrectly && num === 6}
                      onClick={() => handleNumeralClick(num)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Decompose option */}
            {isComposed && !matchedCorrectly && (
              <Button
                onClick={handleDecompose}
                variant="outline"
                className="mt-4 rounded-full"
              >
                Break Apart Again 🔓
              </Button>
            )}
          </div>
        )}

        {phase === 'celebrate' && (
          <div className="flex flex-col items-center justify-center gap-6 animate-fade-in">
            <div className="text-center bg-white/90 rounded-3xl p-8 shadow-xl">
              <h2 className="text-4xl font-bold text-green-600 mb-4 animate-bounce">
                🎉 Amazing Work! 🎉
              </h2>
              <div className="text-8xl mb-4">🏆</div>
              <p className="text-xl text-muted-foreground mb-4">
                You learned all about the number 6!
              </p>
              
              {/* Show all partner pairs */}
              <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-4 mb-6">
                <p className="font-bold text-lg text-amber-800 mb-2">Partners of 6:</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {PARTNER_PUZZLES.map((p, i) => (
                    <span key={i} className="bg-white px-3 py-1 rounded-full text-primary font-bold">
                      {p.left} + {p.right}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Button
                  onClick={resetGame}
                  className="text-xl px-6 py-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg"
                >
                  Play Again! 🔄
                </Button>
                <Link to="/">
                  <Button
                    variant="outline"
                    className="text-xl px-6 py-4 rounded-full"
                  >
                    Back Home 🏠
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Audio hint button */}
      <button
        onClick={() => {
          if (phase === 'intro') speakText('Click the button to start learning about 6!');
          else if (phase === 'compose') speakText(`Tap to add cubes. Build ${currentPuzzle.left} and ${currentPuzzle.right} to make 6!`);
          else if (phase === 'match') speakText('Find the numeral that shows 6!');
        }}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
      >
        <Volume2 className="w-7 h-7" />
      </button>
    </div>
  );
};

export default ComposeSixLesson;

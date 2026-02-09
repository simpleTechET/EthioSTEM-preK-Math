import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RotateCcw, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
          isFilled ? 'border-green-500 bg-green-100' : 'border-violet-400 bg-violet-50'
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

// Partner pairs for 7
const PARTNER_PUZZLES = [
  { left: 5, right: 2, leftColor: '#8B5CF6', rightColor: '#F59E0B' },
  { left: 4, right: 3, leftColor: '#EC4899', rightColor: '#14B8A6' },
  { left: 6, right: 1, leftColor: '#3B82F6', rightColor: '#EF4444' },
  { left: 3, right: 4, leftColor: '#10B981', rightColor: '#F97316' },
  { left: 2, right: 5, leftColor: '#6366F1', rightColor: '#84CC16' },
  { left: 1, right: 6, leftColor: '#A855F7', rightColor: '#06B6D4' },
];

const ComposeSevenLesson: React.FC = () => {
  const [phase, setPhase] = useState<'intro' | 'compose' | 'match' | 'celebrate'>('intro');
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
      speakText('Welcome! Let\'s learn about the number 7 and its partners!');
    }
  }, [phase]);

  const handleStartLesson = () => {
    setPhase('compose');
    speakText('Let\'s build 7 by putting two sticks together! Click the sticks to add cubes.');
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
      speakText(`${currentPuzzle.left} and ${currentPuzzle.right} make 7! Now match the numeral!`);
      setPhase('match');
    }
  };

  const handleNumeralClick = (num: number) => {
    if (num === 7) {
      setMatchedCorrectly(true);
      speakText('Correct! That\'s 7!');
      
      setTimeout(() => {
        if (completedPuzzles + 1 >= 3) {
          setPhase('celebrate');
          speakText('Amazing! You learned all about the number 7 and its partners!');
        } else {
          setCompletedPuzzles(prev => prev + 1);
          setCurrentPuzzleIndex(prev => (prev + 1) % PARTNER_PUZZLES.length);
          setLeftFilled(0);
          setRightFilled(0);
          setIsComposed(false);
          setMatchedCorrectly(false);
          setPhase('compose');
          speakText('Great! Let\'s try another way to make 7!');
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
    <div className="min-h-screen bg-gradient-to-b from-violet-200 via-purple-100 to-indigo-100 p-4 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Link to="/">
          <Button variant="ghost" size="icon" className="rounded-full bg-white/50 hover:bg-white/80">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-primary text-center">
          Partners of 7! 🧱
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
                  ? 'bg-violet-400 border-violet-500 text-white animate-pulse' 
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
                Let's Learn About 7! 🎉
              </h2>
              <p className="text-xl text-muted-foreground mb-6">
                7 has special friends called "partners".<br/>
                Partners are two numbers that make 7 together!
              </p>
              
              {/* Show the numeral 7 large */}
              <div className="w-40 h-48 mx-auto bg-gradient-to-br from-violet-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl mb-6">
                <span className="text-9xl font-bold text-white">7</span>
              </div>

              <p className="text-lg text-muted-foreground mb-4">
                There are 7 days in a week! 📅
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                5 and 2, 4 and 3, 6 and 1... they all make 7!
              </p>
              
              <Button 
                onClick={handleStartLesson}
                className="text-2xl px-8 py-6 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 shadow-lg"
              >
                Let's Build 7! 🧱
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
                  ? `Build ${currentPuzzle.left} + ${currentPuzzle.right} = 7` 
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
                  {/* Composed stick of 7 */}
                  <div className="flex gap-1 flex-wrap justify-center">
                    {Array.from({ length: 7 }).map((_, i) => (
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
                    {currentPuzzle.left} + {currentPuzzle.right} = 7! 🎉
                  </p>
                </div>
              )}

              {/* Compose button */}
              {bothFilled && !isComposed && (
                <div className="flex justify-center mt-6">
                  <Button
                    onClick={handleCompose}
                    className="text-xl px-6 py-4 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 shadow-lg animate-bounce"
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
                <div className="flex gap-4 justify-center flex-wrap">
                  {[5, 6, 7, 8].map((num) => (
                    <NumeralCard
                      key={num}
                      number={num}
                      isActive={matchedCorrectly && num === 7}
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
                You learned all about the number 7!
              </p>
              
              {/* Show all partner pairs */}
              <div className="bg-gradient-to-r from-violet-100 to-purple-100 rounded-2xl p-4 mb-6">
                <p className="font-bold text-lg text-violet-800 mb-2">Partners of 7:</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {PARTNER_PUZZLES.map((p, i) => (
                    <span key={i} className="bg-white px-3 py-1 rounded-full text-primary font-bold">
                      {p.left} + {p.right}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-4 mb-6">
                <p className="font-bold text-amber-800">
                  🗓️ Remember: There are 7 days in a week!
                </p>
              </div>

              <div className="flex gap-4 justify-center flex-wrap">
                <Button
                  onClick={resetGame}
                  className="text-xl px-6 py-4 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 shadow-lg"
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
          if (phase === 'intro') speakText('Click the button to start learning about 7!');
          else if (phase === 'compose') speakText(`Tap to add cubes. Build ${currentPuzzle.left} and ${currentPuzzle.right} to make 7!`);
          else if (phase === 'match') speakText('Find the numeral that shows 7!');
        }}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
      >
        <Volume2 className="w-7 h-7" />
      </button>
    </div>
  );
};

export default ComposeSevenLesson;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RotateCcw, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Phase = 'intro' | 'learn5' | 'learn6' | 'learn7' | 'practice' | 'complete';

interface TallyGroup {
  count: number;
  tallied: number;
  animal: 'sheep' | 'horse' | 'cotton';
}

const Tally10 = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentTally, setCurrentTally] = useState(0);
  const [targetCount, setTargetCount] = useState(5);
  const [showFeedback, setShowFeedback] = useState(false);
  const [practiceRound, setPracticeRound] = useState(0);
  const [practiceTarget, setPracticeTarget] = useState(6);

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
      speak("Welcome to Old MacDonald's farm! Let's learn to make tally marks to count animals. Tally marks help us remember how many!");
    }
  }, [phase]);

  const handleAddTally = () => {
    if (currentTally >= targetCount) return;
    
    const newTally = currentTally + 1;
    setCurrentTally(newTally);
    
    if (newTally === 5) {
      speak("Five! Draw a line across to bundle them together!");
    } else {
      speak(newTally.toString());
    }

    if (newTally === targetCount) {
      setTimeout(() => {
        setShowFeedback(true);
        speak(`Great job! You made ${targetCount} tally marks!`);
      }, 500);
    }
  };

  const proceedToNext = () => {
    setShowFeedback(false);
    setCurrentTally(0);
    
    if (phase === 'learn5') {
      setPhase('learn6');
      setTargetCount(6);
      speak("Now let's count 6 sheep! We need 5 tally marks, and 1 more!");
    } else if (phase === 'learn6') {
      setPhase('learn7');
      setTargetCount(7);
      speak("Excellent! Now let's count 7 horses! We need 5 tally marks, and 2 more!");
    } else if (phase === 'learn7') {
      setPhase('practice');
      setPracticeTarget(6);
      speak("Now you try! Count the animals and make the right number of tally marks!");
    } else if (phase === 'practice') {
      if (practiceRound < 2) {
        setPracticeRound(prev => prev + 1);
        setPracticeTarget(practiceRound === 0 ? 7 : 6);
        setCurrentTally(0);
      } else {
        setPhase('complete');
        speak("Wonderful! You're a tally mark expert now!");
      }
    }
  };

  const startLearning = () => {
    setPhase('learn5');
    setTargetCount(5);
    speak("First, let's remember how to tally 5. Tap to add each tally mark!");
  };

  const renderTallyMarks = (count: number, size: 'small' | 'large' = 'large') => {
    const height = size === 'large' ? 60 : 40;
    const width = size === 'large' ? 12 : 8;
    const gap = size === 'large' ? 8 : 5;
    
    const groups = Math.floor(count / 5);
    const remainder = count % 5;
    const marks = [];

    // Render complete groups of 5
    for (let g = 0; g < groups; g++) {
      marks.push(
        <div key={`group-${g}`} className="flex items-center mr-4">
          <svg width={width * 4 + gap * 3 + 20} height={height + 10} className="overflow-visible">
            {/* Four vertical lines */}
            {[0, 1, 2, 3].map(i => (
              <line
                key={i}
                x1={i * (width + gap) + width/2}
                y1={5}
                x2={i * (width + gap) + width/2}
                y2={height + 5}
                stroke="#8B4513"
                strokeWidth={size === 'large' ? 4 : 3}
                strokeLinecap="round"
              />
            ))}
            {/* Diagonal line across */}
            <line
              x1={-5}
              y1={height}
              x2={4 * (width + gap) - gap + 5}
              y2={10}
              stroke="#8B4513"
              strokeWidth={size === 'large' ? 4 : 3}
              strokeLinecap="round"
            />
          </svg>
        </div>
      );
    }

    // Render remainder
    if (remainder > 0) {
      marks.push(
        <div key="remainder" className="flex items-center">
          <svg width={remainder * (width + gap)} height={height + 10} className="overflow-visible">
            {Array.from({ length: remainder }, (_, i) => (
              <line
                key={i}
                x1={i * (width + gap) + width/2}
                y1={5}
                x2={i * (width + gap) + width/2}
                y2={height + 5}
                stroke="#8B4513"
                strokeWidth={size === 'large' ? 4 : 3}
                strokeLinecap="round"
              />
            ))}
          </svg>
        </div>
      );
    }

    return <div className="flex items-center justify-center">{marks}</div>;
  };

  const renderAnimals = (count: number, type: 'sheep' | 'horse') => {
    const emoji = type === 'sheep' ? '🐑' : '🐴';
    return (
      <div className="flex flex-wrap justify-center gap-2">
        {Array.from({ length: count }, (_, i) => (
          <div 
            key={i} 
            className="text-4xl md:text-5xl transform hover:scale-110 transition-transform"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {emoji}
          </div>
        ))}
      </div>
    );
  };

  const renderNumberPath = (count: number) => {
    return (
      <div className="flex justify-center gap-1">
        {Array.from({ length: count }, (_, i) => (
          <div
            key={i}
            className={`w-10 h-12 md:w-12 md:h-14 border-2 rounded-lg flex items-center justify-center font-bold text-lg ${
              i < 5 ? 'bg-amber-100 border-amber-400' : 'bg-green-100 border-green-400'
            }`}
          >
            {i + 1}
          </div>
        ))}
      </div>
    );
  };

  const restart = () => {
    setPhase('intro');
    setCurrentTally(0);
    setTargetCount(5);
    setShowFeedback(false);
    setPracticeRound(0);
    setPracticeTarget(6);
  };

  const getAnimalForPhase = () => {
    if (phase === 'learn6' || (phase === 'practice' && practiceTarget === 6)) return 'sheep';
    if (phase === 'learn7' || (phase === 'practice' && practiceTarget === 7)) return 'horse';
    return 'sheep';
  };

  const getCurrentTarget = () => {
    if (phase === 'practice') return practiceTarget;
    return targetCount;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 via-sky-200 to-green-300 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="text-gray-700 hover:bg-white/20"
        >
          <ArrowLeft className="h-6 w-6 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Lesson 10: Tally Marks
        </h1>
        <Button
          variant="ghost"
          onClick={restart}
          className="text-gray-700 hover:bg-white/20"
        >
          <RotateCcw className="h-6 w-6" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        {phase === 'intro' && (
          <div className="bg-white/90 rounded-3xl p-8 text-center shadow-xl">
            <h2 className="text-3xl font-bold text-amber-700 mb-6">
              🌾 Old MacDonald's Farm 🌾
            </h2>
            <p className="text-xl text-gray-700 mb-4">
              Old MacDonald needs help counting his animals!
            </p>
            <p className="text-lg text-gray-600 mb-6">
              We'll use <span className="font-bold text-amber-600">tally marks</span> to keep track of how many.
            </p>
            
            {/* Tally mark explanation */}
            <div className="bg-amber-50 rounded-2xl p-6 mb-8">
              <p className="text-lg text-gray-700 mb-4">
                Tally marks help us count! Every 5 marks, we draw a line across to make a bundle:
              </p>
              <div className="flex justify-center items-center gap-8">
                <div className="text-center">
                  <div className="mb-2">{renderTallyMarks(4, 'small')}</div>
                  <span className="text-sm text-gray-600">4 tallies</span>
                </div>
                <div className="text-2xl">→</div>
                <div className="text-center">
                  <div className="mb-2">{renderTallyMarks(5, 'small')}</div>
                  <span className="text-sm text-gray-600">5 tallies (bundled!)</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 mb-6">
              <span className="text-5xl">🐑</span>
              <span className="text-5xl">🐴</span>
              <span className="text-5xl">🐄</span>
            </div>

            <Button
              onClick={startLearning}
              className="bg-amber-500 hover:bg-amber-600 text-white text-xl px-8 py-6 rounded-full"
            >
              Start Counting! 🌟
            </Button>
          </div>
        )}

        {(phase === 'learn5' || phase === 'learn6' || phase === 'learn7') && (
          <div className="space-y-6">
            {/* Barn header */}
            <div className="bg-red-700 rounded-t-3xl p-4 text-center">
              <span className="text-4xl">🏠</span>
              <h2 className="text-2xl font-bold text-white">
                {phase === 'learn5' && "Let's Review: Tally 5"}
                {phase === 'learn6' && "Count the Sheep: 6"}
                {phase === 'learn7' && "Count the Horses: 7"}
              </h2>
            </div>

            {/* Animals display */}
            <div className="bg-green-100 rounded-xl p-6 shadow-lg">
              <div className="mb-4">
                {phase === 'learn5' && renderAnimals(5, 'sheep')}
                {phase === 'learn6' && renderAnimals(6, 'sheep')}
                {phase === 'learn7' && renderAnimals(7, 'horse')}
              </div>
              
              {/* Number path */}
              <div className="mb-4">
                {renderNumberPath(targetCount)}
              </div>
              
              <p className="text-center text-gray-600">
                {targetCount} {phase === 'learn7' ? 'horses' : 'sheep'} need stalls!
              </p>
            </div>

            {/* Tally area */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-700 text-center mb-4">
                Your Tally Marks: {currentTally} of {targetCount}
              </h3>
              
              <div className="bg-amber-50 rounded-xl p-6 min-h-[100px] flex items-center justify-center mb-4">
                {currentTally > 0 ? (
                  renderTallyMarks(currentTally)
                ) : (
                  <p className="text-gray-400">Tap the button to add tally marks!</p>
                )}
              </div>

              {/* Progress indicator */}
              {targetCount > 5 && (
                <div className="text-center mb-4">
                  <span className="text-lg text-gray-600">
                    5 + {targetCount - 5} = {targetCount}
                  </span>
                </div>
              )}

              {!showFeedback ? (
                <div className="flex justify-center">
                  <Button
                    onClick={handleAddTally}
                    disabled={currentTally >= targetCount}
                    className="bg-amber-500 hover:bg-amber-600 text-white text-xl px-8 py-6 rounded-full"
                  >
                    Add Tally Mark ✏️
                  </Button>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-2 text-green-600">
                    <Check className="h-8 w-8" />
                    <span className="text-2xl font-bold">Perfect! {targetCount} tally marks!</span>
                  </div>
                  <Button
                    onClick={proceedToNext}
                    className="bg-green-500 hover:bg-green-600 text-white text-xl px-8 py-6 rounded-full"
                  >
                    {phase === 'learn7' ? 'Practice Time! 🎯' : 'Next! →'}
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {phase === 'practice' && (
          <div className="space-y-6">
            {/* Practice header */}
            <div className="bg-purple-600 rounded-t-3xl p-4 text-center">
              <h2 className="text-2xl font-bold text-white">
                Practice Round {practiceRound + 1} of 3
              </h2>
            </div>

            {/* Animals to count */}
            <div className="bg-green-100 rounded-xl p-6 shadow-lg">
              <p className="text-center text-lg text-gray-700 mb-4">
                How many {practiceTarget === 6 ? 'sheep' : 'horses'}? Make tally marks to match!
              </p>
              <div className="mb-4">
                {renderAnimals(practiceTarget, practiceTarget === 6 ? 'sheep' : 'horse')}
              </div>
            </div>

            {/* Tally area */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-700 text-center mb-4">
                Your Tally Marks: {currentTally}
              </h3>
              
              <div className="bg-amber-50 rounded-xl p-6 min-h-[100px] flex items-center justify-center mb-4">
                {currentTally > 0 ? (
                  renderTallyMarks(currentTally)
                ) : (
                  <p className="text-gray-400">Tap to add tally marks!</p>
                )}
              </div>

              {!showFeedback ? (
                <div className="flex justify-center gap-4">
                  <Button
                    onClick={handleAddTally}
                    className="bg-amber-500 hover:bg-amber-600 text-white text-lg px-6 py-4 rounded-full"
                  >
                    Add Tally ✏️
                  </Button>
                  <Button
                    onClick={() => {
                      if (currentTally === practiceTarget) {
                        setShowFeedback(true);
                        speak(`Correct! ${practiceTarget} tally marks!`);
                      } else {
                        speak("Hmm, count again! Do you have the right number of tallies?");
                      }
                    }}
                    disabled={currentTally === 0}
                    className="bg-green-500 hover:bg-green-600 text-white text-lg px-6 py-4 rounded-full"
                  >
                    Check! ✓
                  </Button>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-2 text-green-600">
                    <Check className="h-8 w-8" />
                    <span className="text-2xl font-bold">Correct! {practiceTarget} tallies!</span>
                  </div>
                  <Button
                    onClick={proceedToNext}
                    className="bg-green-500 hover:bg-green-600 text-white text-xl px-8 py-6 rounded-full"
                  >
                    {practiceRound < 2 ? 'Next Round! →' : 'Finish! 🎉'}
                  </Button>
                </div>
              )}

              {/* Reset option */}
              <div className="flex justify-center mt-4">
                <Button
                  variant="outline"
                  onClick={() => setCurrentTally(0)}
                  className="text-gray-600"
                >
                  Start Over
                </Button>
              </div>
            </div>
          </div>
        )}

        {phase === 'complete' && (
          <div className="bg-white/90 rounded-3xl p-8 text-center shadow-xl">
            <div className="text-6xl mb-6">🎉🌾⭐</div>
            <h2 className="text-3xl font-bold text-amber-700 mb-4">
              Tally Mark Expert!
            </h2>
            <p className="text-xl text-gray-700 mb-6">
              You learned how to use tally marks to count 6 and 7!
            </p>
            
            <div className="bg-amber-50 rounded-2xl p-6 mb-8">
              <p className="text-lg text-gray-700 mb-4">Remember:</p>
              <div className="flex justify-center items-center gap-6 flex-wrap">
                <div className="text-center">
                  <div className="mb-2">{renderTallyMarks(6, 'small')}</div>
                  <span className="font-bold text-amber-600">6 = 5 + 1</span>
                </div>
                <div className="text-center">
                  <div className="mb-2">{renderTallyMarks(7, 'small')}</div>
                  <span className="font-bold text-amber-600">7 = 5 + 2</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center gap-4">
              <Button
                onClick={restart}
                className="bg-amber-500 hover:bg-amber-600 text-white text-lg px-6 py-4 rounded-full"
              >
                Play Again! 🌾
              </Button>
              <Button
                onClick={() => navigate('/')}
                variant="outline"
                className="text-amber-600 border-amber-400 text-lg px-6 py-4 rounded-full"
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
          <p className="text-gray-700 text-sm">
            <strong>Objective:</strong> Tally 6 and 7 objects
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tally10;

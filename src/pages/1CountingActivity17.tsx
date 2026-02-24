// src/pages/CountingActivity17.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Star, BookOpen, Users, Lightbulb, Music } from "lucide-react";
import { toast } from "sonner";

// PassGame Component
const PassGame = ({ onComplete }: { onComplete: () => void }) => {
  const [clickedDots, setClickedDots] = useState<number[]>([]);
  const [roundsCompleted, setRoundsCompleted] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleDotClick = (dotNum: number) => {
    // Must click dots in order
    if (dotNum === clickedDots.length + 1 && dotNum <= 4) {
      const newClicked = [...clickedDots, dotNum];
      setClickedDots(newClicked);
      
      if (newClicked.length === 4) {
        setShowFeedback(true);
      }
    }
  };

  const handleNextRound = () => {
    const newRounds = roundsCompleted + 1;
    setRoundsCompleted(newRounds);
    
    if (newRounds >= 5) {
      onComplete();
    } else {
      setClickedDots([]);
      setShowFeedback(false);
    }
  };

  return (
    <Card className="p-6 bg-blue-50 border-2 border-blue-200">
      <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">
        🎵 1, 2, 3, 4 Pass!
      </h3>
      
      <div className="text-center mb-4">
        <p className="text-sm text-muted-foreground">Round {roundsCompleted + 1} of 5</p>
      </div>

      <div className="bg-white p-8 rounded-lg border-2 border-blue-300 mb-6">
        <p className="text-center text-gray-700 mb-6 font-semibold">
          Touch each dot in order: 1, 2, 3, 4!
        </p>
        <div className="flex justify-center gap-8">
          {[1, 2, 3, 4].map(num => (
            <button
              key={num}
              onClick={() => handleDotClick(num)}
              disabled={showFeedback}
              className={`relative transition-all duration-300 ${
                clickedDots.includes(num) ? 'scale-110' : 'hover:scale-105'
              }`}
            >
              <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl font-bold transition-all ${
                clickedDots.includes(num)
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-300 text-gray-600'
              }`}>
                {num}
              </div>
              <div className="mt-2 text-3xl">
                {clickedDots.includes(num) ? '✓' : '⚫'}
              </div>
              {clickedDots.includes(num) && (
                <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  {clickedDots.indexOf(num) + 1}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <p className="text-center text-gray-600 mb-4 italic">
        "1, 2, 3, 4, slide those dots across the floor!"
      </p>

      {showFeedback && (
        <div className="bg-green-100 text-green-700 p-4 rounded-lg text-center mb-4">
          <p className="font-bold text-lg">✓ Perfect! You counted 1, 2, 3, 4!</p>
          <Button 
            onClick={handleNextRound}
            className="mt-3 bg-blue-600 hover:bg-blue-700"
          >
            {roundsCompleted >= 4 ? 'Continue to Hop-Hop' : 'Pass to Next Person!'}
          </Button>
        </div>
      )}
    </Card>
  );
};

// HopHopGame Component
const HopHopGame = ({ onComplete }: { onComplete: () => void }) => {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [hopsCompleted, setHopsCompleted] = useState(0);
  const [roundsCompleted, setRoundsCompleted] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleNumberSelect = (num: number) => {
    setSelectedNumber(num);
    setHopsCompleted(0);
    setShowSuccess(false);
  };

  const handleHop = () => {
    if (selectedNumber && hopsCompleted < selectedNumber) {
      const newHops = hopsCompleted + 1;
      setHopsCompleted(newHops);
      
      if (newHops === selectedNumber) {
        setShowSuccess(true);
      }
    }
  };

  const handleNextRound = () => {
    const newRounds = roundsCompleted + 1;
    setRoundsCompleted(newRounds);
    
    if (newRounds >= 4) {
      onComplete();
    } else {
      setSelectedNumber(null);
      setHopsCompleted(0);
      setShowSuccess(false);
    }
  };

  return (
    <Card className="p-6 bg-green-50 border-2 border-green-200">
      <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">
        🐰 Hop-Hop Game!
      </h3>

      <div className="text-center mb-4">
        <p className="text-sm text-muted-foreground">Round {roundsCompleted + 1} of 4</p>
      </div>
      
      {selectedNumber === null ? (
        <div className="text-center">
          <p className="text-lg text-gray-700 mb-6">
            Pick a number card and hop that many times!
          </p>
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            {[1, 2, 3].map(num => (
              <button
                key={num}
                onClick={() => handleNumberSelect(num)}
                className="h-24 text-4xl font-bold bg-white text-gray-800 hover:bg-green-100 border-4 border-green-300 rounded-lg transition-all hover:scale-105 shadow-lg"
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="bg-white p-6 rounded-lg border-4 border-green-400 mb-6">
            <div className="text-6xl font-bold text-green-700 mb-4">{selectedNumber}</div>
            <p className="text-lg text-gray-700">Hop {selectedNumber} time{selectedNumber > 1 ? 's' : ''}!</p>
          </div>

          <div className="mb-6">
            <p className="text-lg text-gray-700 mb-4">Hops completed:</p>
            <div className="flex justify-center gap-3 mb-6">
              {Array(selectedNumber).fill(0).map((_, index) => (
                <div
                  key={index}
                  className={`w-16 h-16 rounded-full border-4 flex items-center justify-center text-3xl transition-all ${
                    index < hopsCompleted 
                      ? 'bg-green-500 border-green-600 text-white scale-110' 
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {index < hopsCompleted ? '✓' : ''}
                </div>
              ))}
            </div>
          </div>

          {!showSuccess ? (
            <Button 
              onClick={handleHop}
              size="lg"
              className="w-full bg-green-600 hover:bg-green-700 text-3xl py-10 font-bold"
            >
              HOP! 🐰
            </Button>
          ) : (
            <div className="bg-green-100 text-green-700 p-6 rounded-lg">
              <p className="font-bold text-2xl mb-4">✓ Perfect! You hopped {selectedNumber} times!</p>
              <Button 
                onClick={handleNextRound}
                size="lg"
                className="bg-green-600 hover:bg-green-700"
              >
                {roundsCompleted >= 3 ? 'Continue to Piano' : 'Next Round'}
              </Button>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

// PracticeDotToPiano Component
const PracticeDotToPiano = ({ onComplete }: { onComplete: () => void }) => {
  const [practiceRound, setPracticeRound] = useState(0);
  const [activeKeys, setActiveKeys] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const dotCounts = [3, 2, 4, 5];
  const currentDotCard = dotCounts[practiceRound];

  const handlePianoKey = (keyNum: number) => {
    // Must play keys in order (Math Way)
    if (keyNum === activeKeys.length + 1 && activeKeys.length < 5) {
      setActiveKeys([...activeKeys, keyNum]);
    }
  };

  const handleCheck = () => {
    setShowFeedback(true);
    if (activeKeys.length === currentDotCard) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const handleNext = () => {
    if (practiceRound >= 3) {
      onComplete();
    } else {
      setPracticeRound(practiceRound + 1);
      setActiveKeys([]);
      setShowFeedback(false);
      setIsCorrect(false);
    }
  };

  const handleReset = () => {
    setActiveKeys([]);
    setShowFeedback(false);
    setIsCorrect(false);
  };

  return (
    <Card className="p-6 bg-orange-50 border-2 border-orange-200">
      <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">
        🎯 Practice: Match Dots to Piano Keys!
      </h3>

      <div className="text-center mb-6">
        <p className="text-sm text-muted-foreground">Round {practiceRound + 1} of 4</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Dot Card */}
        <Card className="p-6 bg-white border-2 border-orange-300">
          <h4 className="text-lg font-bold mb-4 text-center text-gray-800">Dot Card</h4>
          <div className="bg-orange-50 p-8 rounded-lg border-2 border-orange-200 mb-4 min-h-[150px] flex items-center justify-center">
            <div className="flex flex-wrap gap-4 justify-center">
              {Array(currentDotCard).fill('⚫').map((dot, i) => (
                <span key={i} className="text-5xl">{dot}</span>
              ))}
            </div>
          </div>
          <p className="text-center text-gray-700">
            Count: <span className="text-3xl font-bold text-orange-700">{currentDotCard} dots</span>
          </p>
        </Card>

        {/* Piano */}
        <Card className="p-6 bg-white border-2 border-purple-300">
          <h4 className="text-lg font-bold mb-4 text-center text-gray-800">Play {currentDotCard} Keys the Math Way</h4>
          
          {/* Finger Guide */}
          <div className="flex justify-center gap-2 mb-4">
            {[
              { num: 1, emoji: '🤙' },
              { num: 2, emoji: '🤟' },
              { num: 3, emoji: '🖕' },
              { num: 4, emoji: '☝️' },
              { num: 5, emoji: '👍' }
            ].map(finger => (
              <div 
                key={finger.num}
                className={`text-center transition-all ${
                  activeKeys.includes(finger.num) ? 'scale-110 opacity-100' : 'opacity-40'
                }`}
              >
                <div className="text-2xl">{finger.emoji}</div>
                <div className="text-xs font-bold">{finger.num}</div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-4 rounded-xl mb-4">
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map(keyNum => (
                <button
                  key={keyNum}
                  onClick={() => handlePianoKey(keyNum)}
                  disabled={showFeedback}
                  className={`
                    w-14 h-32 rounded-b-lg transition-all border-2 border-gray-700
                    ${activeKeys.includes(keyNum)
                      ? 'bg-purple-400 shadow-lg shadow-purple-500/50 transform translate-y-1'
                      : 'bg-white hover:bg-gray-100'
                    }
                  `}
                >
                  <div className="h-full flex items-end justify-center pb-2">
                    <span className={`text-xl font-bold ${
                      activeKeys.includes(keyNum) ? 'text-white' : 'text-gray-800'
                    }`}>
                      {keyNum}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          <p className="text-center text-gray-700 mb-4">
            Keys played: <span className="text-2xl font-bold text-purple-700">{activeKeys.length}</span>
          </p>
          
          <Button 
            onClick={handleReset}
            variant="outline"
            className="w-full"
            disabled={showFeedback && isCorrect}
          >
            Reset Piano
          </Button>
        </Card>
      </div>

      {!showFeedback ? (
        <div className="text-center">
          <Button
            onClick={handleCheck}
            disabled={activeKeys.length === 0}
            size="lg"
            className="bg-orange-600 hover:bg-orange-700 text-lg px-8"
          >
            Check My Match
          </Button>
        </div>
      ) : (
        <div className={`p-6 rounded-lg text-center ${
          isCorrect
            ? 'bg-green-100 text-green-700 border-2 border-green-300'
            : 'bg-red-100 text-red-700 border-2 border-red-300'
        }`}>
          <p className="font-bold text-2xl mb-3">
            {isCorrect
              ? `✓ Perfect match! ${currentDotCard} dots = ${currentDotCard} piano keys!`
              : `✗ Not quite! Try again. Count ${currentDotCard} dots, play ${currentDotCard} keys.`}
          </p>
          <Button 
            onClick={isCorrect ? handleNext : handleReset}
            size="lg"
            className={isCorrect ? 'bg-green-600 hover:bg-green-700' : ''}
            variant={isCorrect ? 'default' : 'outline'}
          >
            {isCorrect 
              ? (practiceRound >= 3 ? 'Finish Activity' : 'Next Round')
              : 'Try Again'}
          </Button>
        </div>
      )}
    </Card>
  );
};

// Main CountingActivity17 Component
const CountingActivity17 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [currentStep, setCurrentStep] = useState<'warmup' | 'pass' | 'hophop' | 'piano' | 'practice' | 'complete'>('warmup');
  const [pianoCount, setPianoCount] = useState(0);
  const [activeKeys, setActiveKeys] = useState<number[]>([]);

  const handlePianoKey = (keyNum: number) => {
    if (keyNum === pianoCount + 1 && pianoCount < 5) {
      setPianoCount(pianoCount + 1);
      setActiveKeys([...activeKeys, keyNum]);
      
      if (pianoCount + 1 === 4) {
        toast.success("Great! You counted to 4 the Math Way! 🎹");
        setTimeout(() => {
          toast.info("Now let's add the thumb to count to 5!");
        }, 1500);
      } else if (pianoCount + 1 === 5) {
        toast.success("Perfect! You counted to 5 the Math Way! 🎉");
        setTimeout(() => setCurrentStep('practice'), 2000);
      }
    } else if (keyNum !== pianoCount + 1) {
      toast.error("Remember: Start with pinky (1), then work your way to thumb!");
    }
  };

  const resetPiano = () => {
    setPianoCount(0);
    setActiveKeys([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities/module-1")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full">
                Lesson 17
              </span>
              <h1 className="text-2xl font-bold text-gray-800">Count Fingers the Math Way</h1>
            </div>
            <p className="text-sm text-gray-600">Topic E: Counting 4-5 Objects</p>
          </div>
        </div>

        {!showGame ? (
          <div className="space-y-6">
            {/* Learning Objective */}
            <Card className="border-2 border-indigo-200 bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl text-indigo-700">
                  <Star className="w-6 h-6" />
                  Learning Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-700">
                  Today, your child will learn to <span className="font-bold text-indigo-700">count fingers on the left hand from 1 to 5 "the Math Way"</span> 
                  (pinky to thumb), preparing for number lines in future grades.
                </p>
              </CardContent>
            </Card>

            {/* Introduction */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
                  <Music className="w-6 h-6" />
                  Play Piano and Count the Math Way!
                </CardTitle>
                <CardDescription>Read this together with your child</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-indigo-50 p-6 rounded-xl border-2 border-indigo-200">
                  <p className="text-lg text-gray-700 mb-4">
                    Today we'll use a piano to learn "the Math Way" of counting on our fingers!
                  </p>
                  <div className="bg-white p-4 rounded-lg border-2 border-purple-200 mb-4">
                    <h4 className="font-bold text-purple-700 mb-3 text-center">The Math Way 🖐️</h4>
                    <div className="grid grid-cols-5 gap-2 max-w-md mx-auto">
                      <div className="text-center">
                        <div className="text-4xl mb-1">🤙</div>
                        <div className="text-2xl font-bold text-purple-700">1</div>
                        <div className="text-xs text-gray-600">Pinky</div>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl mb-1">🤟</div>
                        <div className="text-2xl font-bold text-purple-700">2</div>
                        <div className="text-xs text-gray-600">Ring</div>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl mb-1">🖕</div>
                        <div className="text-2xl font-bold text-purple-700">3</div>
                        <div className="text-xs text-gray-600">Middle</div>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl mb-1">☝️</div>
                        <div className="text-2xl font-bold text-purple-700">4</div>
                        <div className="text-xs text-gray-600">Pointer</div>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl mb-1">👍</div>
                        <div className="text-2xl font-bold text-purple-700">5</div>
                        <div className="text-xs text-gray-600">Thumb</div>
                      </div>
                    </div>
                    <p className="text-center text-sm text-gray-600 mt-4">
                      ← Always start with pinky (1) and count to thumb (5) →
                    </p>
                  </div>
                </div>

                {/* Why Piano */}
                <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                  <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <Music className="w-5 h-5 text-blue-600" />
                    Why a Piano?
                  </h4>
                  <p className="text-sm text-gray-600">
                    Using a piano helps us "drop" fingers on keys instead of trying to hold fingers up. 
                    It's easier and more fun! This prepares us for understanding number lines later.
                  </p>
                </div>

                {/* Parent Tips */}
                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border-2 border-green-200">
                  <Users className="w-8 h-8 text-green-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Parent Tips:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Help your child identify their LEFT hand (put a sticker on pinky!)</li>
                      <li>• Practice: Pinky = 1, Ring = 2, Middle = 3, Pointer = 4, Thumb = 5</li>
                      <li>• Sit behind them so they can mirror your hand movements</li>
                      <li>• Make it musical! Tap a rhythm while counting</li>
                    </ul>
                  </div>
                </div>

                {/* Key Vocabulary */}
                <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-5 h-5 text-yellow-600" />
                    <h4 className="font-bold text-gray-800">Key Words</h4>
                  </div>
                  <div className="grid md:grid-cols-3 gap-3">
                    <div className="bg-white p-3 rounded-lg">
                      <p className="font-bold text-indigo-700">The Math Way</p>
                      <p className="text-sm text-gray-600">Counting pinky to thumb (1-5)</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="font-bold text-indigo-700">Piano Keys</p>
                      <p className="text-sm text-gray-600">White keys we press to count</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="font-bold text-indigo-700">Left Hand</p>
                      <p className="text-sm text-gray-600">The hand we use for counting</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Start Button */}
            <div className="text-center">
              <Button 
                size="lg" 
                onClick={() => setShowGame(true)}
                className="text-lg px-8 py-6 bg-indigo-600 hover:bg-indigo-700 shadow-lg"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Start Piano Counting
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* 1, 2, 3, 4 Pass Warm-up - REPLACED */}
            {currentStep === 'pass' && <PassGame onComplete={() => setCurrentStep('hophop')} />}

            {/* Hop-Hop Game - REPLACED */}
            {currentStep === 'hophop' && <HopHopGame onComplete={() => setCurrentStep('piano')} />}

            {/* Piano Counting */}
            {currentStep === 'piano' && (
              <Card className="p-6 bg-purple-50 border-2 border-purple-200">
                <h3 className="text-xl font-bold mb-4 text-gray-800 text-center flex items-center justify-center gap-2">
                  <Music className="w-6 h-6" />
                  Play Piano the Math Way!
                </h3>
                
                <div className="bg-indigo-100 p-4 rounded-lg border-2 border-indigo-300 mb-6 text-center">
                  <p className="text-lg text-gray-700 mb-2">
                    Use your <strong>LEFT HAND</strong> 👈
                  </p>
                  <p className="text-sm text-gray-600">
                    Start with pinky (1) and tap each key in order!
                  </p>
                </div>

                {/* Hand Guide */}
                <div className="bg-white p-4 rounded-lg border-2 border-gray-300 mb-6">
                  <div className="flex justify-center gap-4">
                    {[
                      { num: 1, name: 'Pinky', emoji: '🤙' },
                      { num: 2, name: 'Ring', emoji: '🤟' },
                      { num: 3, name: 'Middle', emoji: '🖕' },
                      { num: 4, name: 'Pointer', emoji: '☝️' },
                      { num: 5, name: 'Thumb', emoji: '👍' }
                    ].map(finger => (
                      <div 
                        key={finger.num}
                        className={`text-center p-2 rounded transition-all ${
                          activeKeys.includes(finger.num) ? 'bg-purple-100 scale-110' : ''
                        }`}
                      >
                        <div className="text-3xl mb-1">{finger.emoji}</div>
                        <div className="text-xl font-bold text-purple-700">{finger.num}</div>
                        <div className="text-xs text-gray-600">{finger.name}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Piano Keyboard */}
                <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-xl shadow-2xl mb-6">
                  <div className="flex justify-center gap-1">
                    {[1, 2, 3, 4, 5].map(keyNum => (
                      <button
                        key={keyNum}
                        onClick={() => handlePianoKey(keyNum)}
                        className={`
                          w-20 h-48 rounded-b-lg transition-all duration-200 border-2 border-gray-700
                          ${activeKeys.includes(keyNum)
                            ? 'bg-purple-400 shadow-lg shadow-purple-500/50 transform translate-y-1'
                            : 'bg-white hover:bg-gray-100 shadow-xl'
                          }
                        `}
                      >
                        <div className="h-full flex flex-col items-center justify-end pb-4">
                          <span className={`text-2xl font-bold ${
                            activeKeys.includes(keyNum) ? 'text-white' : 'text-gray-800'
                          }`}>
                            {keyNum}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-lg text-gray-700 mb-4">
                    Fingers played: <span className="text-3xl font-bold text-purple-700">{pianoCount}</span>
                  </p>
                  <Button onClick={resetPiano} variant="outline" className="mr-4">
                    Reset Piano
                  </Button>
                  {pianoCount === 5 && (
                    <span className="text-green-600 font-bold">✓ You counted to 5 the Math Way!</span>
                  )}
                </div>
              </Card>
            )}

            {/* Practice with Dot Cards - REPLACED */}
            {currentStep === 'practice' && <PracticeDotToPiano onComplete={() => setCurrentStep('complete')} />}

            {/* Completion */}
            {currentStep === 'complete' && (
              <Card className="bg-gradient-to-br from-purple-100 to-pink-100 border-4 border-purple-400 p-8 text-center">
                <div className="text-6xl mb-4">🎹</div>
                <h3 className="text-3xl font-bold mb-3 text-gray-800">Piano Master!</h3>
                <p className="text-lg text-gray-700 mb-4">
                  You learned to count the Math Way! Pinky to thumb, 1 to 5!
                </p>
                <div className="bg-white p-6 rounded-lg border-2 border-purple-300 mb-6">
                  <div className="flex justify-center gap-3 mb-4">
                    {['🤙', '🤟', '🖕', '☝️', '👍'].map((emoji, i) => (
                      <div key={i} className="text-center">
                        <div className="text-4xl mb-1">{emoji}</div>
                        <div className="text-xl font-bold text-purple-700">{i + 1}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    <strong>The Math Way:</strong> Counting from pinky (1) to thumb (5)<br/>
                    This prepares you for number lines in the future!
                  </p>
                </div>
                <Button 
                  size="lg"
                  onClick={() => navigate('/activities/module-1')}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Continue Learning
                </Button>
              </Card>
            )}

            {/* Warmup Start Button */}
            {currentStep === 'warmup' && (
              <Card className="p-6 bg-indigo-50 border-2 border-indigo-200 text-center">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Ready to Count the Math Way?</h3>
                <p className="text-gray-700 mb-4">Let's warm up with some fun games first!</p>
                <Button onClick={() => setCurrentStep('pass')} size="lg" className="bg-indigo-600">
                  Start Warm-ups!
                </Button>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CountingActivity17;
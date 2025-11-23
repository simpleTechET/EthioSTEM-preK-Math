// src/pages/CountingActivity17.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Star, BookOpen, Users, Lightbulb, Music } from "lucide-react";
import { toast } from "sonner";

const CountingActivity17 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [currentStep, setCurrentStep] = useState<'warmup' | 'pass' | 'hophop' | 'piano' | 'practice' | 'complete'>('warmup');
  const [passRound, setPassRound] = useState(0);
  const [currentHop, setCurrentHop] = useState<number | null>(null);
  const [hopsCompleted, setHopsCompleted] = useState(0);
  const [pianoCount, setPianoCount] = useState(0);
  const [activeKeys, setActiveKeys] = useState<number[]>([]);
  const [currentDotCard, setCurrentDotCard] = useState(3);
  const [practiceRound, setPracticeRound] = useState(0);

  const hopNumbers = [1, 2, 3, 2, 1, 3, 2];

  const handlePass = () => {
    if (passRound < 5) {
      toast.success("Pass! 🎉", { description: "1, 2, 3, 4, slide those dots across the floor!" });
      setPassRound(passRound + 1);
    } else {
      setCurrentStep('hophop');
    }
  };

  const handleHop = () => {
    if (currentHop !== null) {
      if (hopsCompleted < currentHop) {
        setHopsCompleted(hopsCompleted + 1);
      } else {
        toast.success(`Perfect! ${currentHop} hops! 🎉`);
        if (hopNumbers.length > 1) {
          setTimeout(() => {
            setCurrentHop(hopNumbers[Math.floor(Math.random() * hopNumbers.length)]);
            setHopsCompleted(0);
          }, 1000);
        } else {
          setTimeout(() => setCurrentStep('piano'), 1500);
        }
      }
    }
  };

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

  const handleDotCardPiano = () => {
    if (activeKeys.length === currentDotCard) {
      toast.success("Perfect match! 🎉", { description: `${currentDotCard} dots = ${currentDotCard} piano keys!` });
      if (practiceRound < 3) {
        setTimeout(() => {
          setPracticeRound(practiceRound + 1);
          setCurrentDotCard([2, 4, 5][practiceRound]);
          resetPiano();
        }, 1500);
      } else {
        setTimeout(() => setCurrentStep('complete'), 1500);
      }
    } else {
      toast.error("Count again!", { description: `The card has ${currentDotCard} dots. Play ${currentDotCard} keys the Math Way.` });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities")}>
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
            {/* 1, 2, 3, 4 Pass Warm-up */}
            {currentStep === 'pass' && (
              <Card className="p-6 bg-blue-50 border-2 border-blue-200">
                <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">
                  🎵 1, 2, 3, 4 Pass!
                </h3>
                
                <div className="bg-white p-6 rounded-lg border-2 border-blue-300 mb-6">
                  <div className="flex justify-center gap-8 mb-4">
                    {[1, 2, 3, 4].map(num => (
                      <div key={num} className="text-center">
                        <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold mb-2">
                          {num}
                        </div>
                        <div className="text-2xl">⚫</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-center text-gray-700 text-lg font-semibold">
                    Touch each dot and count: 1, 2, 3, 4!
                  </p>
                </div>

                <p className="text-center text-gray-600 mb-4">
                  "1, 2, 3, 4, slide those dots across the floor!"
                </p>

                <Button onClick={handlePass} size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                  Pass to Next Person! ({passRound}/5)
                </Button>
              </Card>
            )}

            {/* Hop-Hop Game */}
            {currentStep === 'hophop' && (
              <Card className="p-6 bg-green-50 border-2 border-green-200">
                <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">
                  🐰 Hop-Hop Game!
                </h3>
                
                {currentHop === null ? (
                  <div className="text-center">
                    <p className="text-lg text-gray-700 mb-6">
                      Pick a number card and hop that many times!
                    </p>
                    <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                      {[1, 2, 3].map(num => (
                        <Button
                          key={num}
                          onClick={() => {
                            setCurrentHop(num);
                            setHopsCompleted(0);
                          }}
                          size="lg"
                          className="h-24 text-4xl font-bold bg-white text-gray-800 hover:bg-green-100 border-2 border-green-300"
                        >
                          {num}
                        </Button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="bg-white p-6 rounded-lg border-4 border-green-400 mb-6">
                      <div className="text-6xl font-bold text-green-700 mb-4">{currentHop}</div>
                      <p className="text-lg text-gray-700">Hop {currentHop} times!</p>
                    </div>

                    <div className="mb-6">
                      <p className="text-lg text-gray-700 mb-3">Hops completed:</p>
                      <div className="flex justify-center gap-3">
                        {Array(currentHop).fill(0).map((_, index) => (
                          <div
                            key={index}
                            className={`w-12 h-12 rounded-full border-4 flex items-center justify-center text-2xl ${
                              index < hopsCompleted 
                                ? 'bg-green-500 border-green-600 text-white' 
                                : 'bg-white border-gray-300'
                            }`}
                          >
                            {index < hopsCompleted ? '✓' : ''}
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button 
                      onClick={handleHop}
                      size="lg"
                      disabled={hopsCompleted >= currentHop}
                      className="w-full bg-green-600 hover:bg-green-700 text-2xl py-8"
                    >
                      {hopsCompleted >= currentHop ? '✓ Complete!' : 'HOP! 🐰'}
                    </Button>
                  </div>
                )}
              </Card>
            )}

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

            {/* Practice with Dot Cards */}
            {currentStep === 'practice' && (
              <Card className="p-6 bg-orange-50 border-2 border-orange-200">
                <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">
                  🎯 Practice: Match Dots to Piano Keys!
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Dot Card */}
                  <Card className="p-6 bg-white border-2 border-orange-300">
                    <h4 className="text-lg font-bold mb-4 text-center text-gray-800">Dot Card</h4>
                    <div className="bg-orange-50 p-6 rounded-lg border-2 border-orange-200 mb-4">
                      <div className="text-6xl text-center">
                        {Array(currentDotCard).fill('⚫').map((dot, i) => (
                          <span key={i}>{dot}</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-center text-gray-700">
                      Count: <span className="text-2xl font-bold text-orange-700">{currentDotCard} dots</span>
                    </p>
                  </Card>

                  {/* Piano */}
                  <Card className="p-6 bg-white border-2 border-purple-300">
                    <h4 className="text-lg font-bold mb-4 text-center text-gray-800">Play on Piano</h4>
                    <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-4 rounded-xl mb-4">
                      <div className="flex justify-center gap-1">
                        {[1, 2, 3, 4, 5].map(keyNum => (
                          <button
                            key={keyNum}
                            onClick={() => {
                              if (keyNum === activeKeys.length + 1 && activeKeys.length < currentDotCard) {
                                setActiveKeys([...activeKeys, keyNum]);
                              }
                            }}
                            className={`
                              w-14 h-32 rounded-b-lg transition-all
                              ${activeKeys.includes(keyNum)
                                ? 'bg-purple-400 shadow-lg'
                                : 'bg-white hover:bg-gray-100'
                              }
                            `}
                          >
                            <span className={`text-xl font-bold ${
                              activeKeys.includes(keyNum) ? 'text-white' : 'text-gray-800'
                            }`}>
                              {keyNum}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <p className="text-center text-gray-700 text-sm mb-4">
                      Keys played: {activeKeys.length}
                    </p>
                    <Button 
                      onClick={() => {
                        resetPiano();
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      Reset
                    </Button>
                  </Card>
                </div>

                <div className="text-center">
                  <Button
                    onClick={handleDotCardPiano}
                    disabled={activeKeys.length === 0}
                    size="lg"
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    Check Match
                  </Button>
                  <p className="text-sm text-gray-600 mt-4">
                    Round {practiceRound + 1} of 4
                  </p>
                </div>
              </Card>
            )}

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
                  onClick={() => navigate('/activities')}
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

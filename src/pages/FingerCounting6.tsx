import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, RotateCcw, Check, Star, Volume2 } from 'lucide-react';

type Step = 'intro' | 'nest' | 'hatch1' | 'hatch5' | 'hatch6' | 'practice' | 'complete';

const FingerCounting6: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>('intro');
  const [hatchedChicks, setHatchedChicks] = useState(0);
  const [showIntroScreen, setShowIntroScreen] = useState(true);
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [userFingers, setUserFingers] = useState<boolean[]>([false, false, false, false, false, false, false, false, false, false]);

  const practiceQuestions = useMemo(() => [
    { question: "Show 3 chicks hatching! Start from your left pinky.", answer: 3 },
    { question: "Show 5 chicks hatching!", answer: 5 },
    { question: "Show 6 chicks hatching! Use your thumb from the other hand!", answer: 6 },
    { question: "How many fingers on one hand?", answer: 5, isMultipleChoice: true, options: [4, 5, 6] },
  ], []);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleStepAction = () => {
    switch (currentStep) {
      case 'intro':
        setCurrentStep('nest');
        speakText("Look at your hands! Make two fists. These are your nests with eggs inside!");
        break;
      case 'nest':
        setCurrentStep('hatch1');
        speakText("Spring is coming! The first chick hatches. Lift your left pinky finger!");
        setHatchedChicks(1);
        break;
      case 'hatch1':
        setCurrentStep('hatch5');
        speakText("More chicks are hatching! Count as each one comes out. 1, 2, 3, 4, 5!");
        setHatchedChicks(5);
        break;
      case 'hatch5':
        setCurrentStep('hatch6');
        speakText("One more chick hatches from the other nest! Lift your right thumb. Now count all 6!");
        setHatchedChicks(6);
        break;
      case 'hatch6':
        setCurrentStep('practice');
        speakText("Great job! You just counted the Math Way! Now let's practice.");
        break;
      case 'practice':
        break;
      case 'complete':
        markLessonComplete();
        navigate('/activities/module3');
        break;
    }
  };

  const toggleFinger = (index: number) => {
    if (currentStep !== 'practice') return;
    const currentQuestion = practiceQuestions[practiceIndex];
    if (currentQuestion.isMultipleChoice) return;
    
    // For finger counting, we enforce left-to-right order
    const newFingers = [...userFingers];
    
    // Count how many are currently active
    const activeCount = newFingers.filter(f => f).length;
    
    if (newFingers[index]) {
      // Turning off - only allow turning off the rightmost active finger
      let rightmostActive = -1;
      for (let i = 9; i >= 0; i--) {
        if (newFingers[i]) {
          rightmostActive = i;
          break;
        }
      }
      if (index === rightmostActive) {
        newFingers[index] = false;
      }
    } else {
      // Turning on - only allow the next finger in sequence
      if (index === activeCount) {
        newFingers[index] = true;
      }
    }
    
    setUserFingers(newFingers);
  };

  const checkFingerAnswer = () => {
    const activeCount = userFingers.filter(f => f).length;
    const correct = activeCount === practiceQuestions[practiceIndex].answer;
    
    setShowFeedback(correct ? 'correct' : 'incorrect');
    speakText(correct ? "Perfect! You counted the Math Way!" : "Not quite. Try again!");
    
    setTimeout(() => {
      setShowFeedback(null);
      if (correct) {
        setUserFingers([false, false, false, false, false, false, false, false, false, false]);
        if (practiceIndex < practiceQuestions.length - 1) {
          setPracticeIndex(prev => prev + 1);
        } else {
          setCurrentStep('complete');
          speakText("Amazing! You're a finger counting expert!");
        }
      }
    }, 1500);
  };

  const handleMultipleChoiceAnswer = (answer: number) => {
    const correct = answer === practiceQuestions[practiceIndex].answer;
    setShowFeedback(correct ? 'correct' : 'incorrect');
    speakText(correct ? "That's right!" : "Try again!");
    
    setTimeout(() => {
      setShowFeedback(null);
      if (correct) {
        if (practiceIndex < practiceQuestions.length - 1) {
          setPracticeIndex(prev => prev + 1);
        } else {
          setCurrentStep('complete');
          speakText("Amazing! You're a finger counting expert!");
        }
      }
    }, 1500);
  };

  const markLessonComplete = () => {
    const completed = JSON.parse(localStorage.getItem('completedLessons') || '[]');
    if (!completed.includes(303)) {
      completed.push(303);
      localStorage.setItem('completedLessons', JSON.stringify(completed));
    }
  };

  const renderHand = (isLeft: boolean, activeFingers: number) => {
    const fingers = isLeft ? [0, 1, 2, 3, 4] : [5, 6, 7, 8, 9];
    const fingerNames = isLeft 
      ? ['Pinky', 'Ring', 'Middle', 'Index', 'Thumb']
      : ['Thumb', 'Index', 'Middle', 'Ring', 'Pinky'];
    
    return (
      <div className={`flex flex-col items-center ${isLeft ? '' : ''}`}>
        <div className="text-sm font-medium mb-2 text-muted-foreground">
          {isLeft ? 'Left Hand' : 'Right Hand'}
        </div>
        <div className={`flex gap-1 ${isLeft ? '' : ''}`}>
          {fingers.map((fingerIndex, i) => {
            const isActive = fingerIndex < activeFingers;
            const fingerNum = isLeft ? i : 4 - i;
            
            return (
              <motion.div
                key={fingerIndex}
                initial={{ scaleY: 0.3 }}
                animate={{ 
                  scaleY: isActive ? 1 : 0.3,
                  backgroundColor: isActive ? '#FCD34D' : '#9CA3AF'
                }}
                transition={{ type: 'spring', stiffness: 300 }}
                className={`w-8 h-16 md:w-10 md:h-20 rounded-t-full origin-bottom flex items-start justify-center pt-2 ${
                  isActive ? 'shadow-lg' : ''
                }`}
                style={{ 
                  marginTop: isActive ? '0' : '40px',
                  height: isActive ? '80px' : '40px'
                }}
              >
                {isActive && (
                  <span className="text-2xl">🐣</span>
                )}
              </motion.div>
            );
          })}
        </div>
        <div className="mt-2 text-2xl">✊</div>
        <div className="text-xs text-muted-foreground mt-1">Nest</div>
      </div>
    );
  };

  const renderInteractiveHands = () => {
    const fingerLabels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    
    return (
      <div className="flex justify-center gap-8">
        {/* Left Hand */}
        <div className="flex flex-col items-center">
          <div className="text-sm font-medium mb-2 text-muted-foreground">Left Hand</div>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.button
                key={i}
                onClick={() => toggleFinger(i)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-10 h-20 rounded-t-full origin-bottom flex items-center justify-center transition-all ${
                  userFingers[i] 
                    ? 'bg-yellow-400 shadow-lg' 
                    : 'bg-gray-300 h-10 mt-10'
                }`}
              >
                {userFingers[i] ? (
                  <span className="text-xl">🐣</span>
                ) : (
                  <span className="text-xs text-gray-500">{fingerLabels[i]}</span>
                )}
              </motion.button>
            ))}
          </div>
          <div className="mt-2 text-2xl">✊</div>
        </div>

        {/* Right Hand */}
        <div className="flex flex-col items-center">
          <div className="text-sm font-medium mb-2 text-muted-foreground">Right Hand</div>
          <div className="flex gap-1">
            {[5, 6, 7, 8, 9].map((i) => (
              <motion.button
                key={i}
                onClick={() => toggleFinger(i)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-10 h-20 rounded-t-full origin-bottom flex items-center justify-center transition-all ${
                  userFingers[i] 
                    ? 'bg-yellow-400 shadow-lg' 
                    : 'bg-gray-300 h-10 mt-10'
                }`}
              >
                {userFingers[i] ? (
                  <span className="text-xl">🐣</span>
                ) : (
                  <span className="text-xs text-gray-500">{fingerLabels[i]}</span>
                )}
              </motion.button>
            ))}
          </div>
          <div className="mt-2 text-2xl">✊</div>
        </div>
      </div>
    );
  };

  if (showIntroScreen) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-green-50 p-4 md:p-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/activities/module3')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Module 3
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8 text-center"
        >
          <div className="text-6xl mb-6">🐣</div>
          <h1 className="text-3xl font-bold text-primary mb-4">
            Lesson 3: Finger Counting to 6
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Learn to count the Math Way with hatching chicks!
          </p>

          <div className="bg-yellow-50 rounded-xl p-6 mb-6">
            <h2 className="font-semibold text-lg mb-3">What You'll Learn:</h2>
            <ul className="text-left space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Count from 1 to 6 with your fingers
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Count left to right (the Math Way!)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> See 6 as 5 and 1 more
              </li>
            </ul>
          </div>

          <Button
            size="lg"
            onClick={() => {
              setShowIntroScreen(false);
              speakText("Let's learn to count with our fingers! Your fingers will be baby chicks hatching from eggs!");
            }}
            className="text-xl px-8 py-6"
          >
            Start Lesson! <ArrowRight className="ml-2" />
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-green-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Button variant="ghost" onClick={() => navigate('/activities/module3')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <h1 className="text-xl md:text-2xl font-bold text-primary">
            Finger Counting to 6
          </h1>
          <Button variant="ghost" onClick={() => window.location.reload()}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        <AnimatePresence mode="wait">
          {currentStep !== 'practice' && currentStep !== 'complete' && (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-3xl shadow-xl p-6 md:p-8"
            >
              {/* Hands Display */}
              <div className="flex justify-center gap-8 md:gap-16 mb-8 py-8 bg-gradient-to-b from-green-100 to-green-50 rounded-2xl">
                {renderHand(true, Math.min(hatchedChicks, 5))}
                {renderHand(false, Math.max(0, hatchedChicks - 5))}
              </div>

              {/* Instructions */}
              <div className="text-center mb-6">
                {currentStep === 'intro' && (
                  <div>
                    <p className="text-xl font-semibold mb-2">🐣 The Chick Story!</p>
                    <p className="text-lg text-muted-foreground">
                      Your fingers are baby chicks, and your fists are nests with eggs!
                    </p>
                  </div>
                )}
                {currentStep === 'nest' && (
                  <div>
                    <p className="text-xl font-semibold mb-2">Make Your Nests!</p>
                    <p className="text-lg text-muted-foreground">
                      Make two fists and put them on the table. All the eggs are inside!
                    </p>
                    <p className="text-2xl mt-4">✊ ✊</p>
                  </div>
                )}
                {currentStep === 'hatch1' && (
                  <div>
                    <p className="text-xl font-semibold mb-2">First Chick Hatches!</p>
                    <p className="text-lg text-muted-foreground">
                      Spring is here! Lift your left pinky - the first chick comes out!
                    </p>
                    <p className="text-3xl font-bold text-primary mt-4">1 chick! 🐣</p>
                  </div>
                )}
                {currentStep === 'hatch5' && (
                  <div>
                    <p className="text-xl font-semibold mb-2">Count to 5!</p>
                    <p className="text-lg text-muted-foreground">
                      More chicks hatch! Count: 1, 2, 3, 4, 5!
                    </p>
                    <p className="text-3xl font-bold text-primary mt-4">5 chicks from one nest!</p>
                  </div>
                )}
                {currentStep === 'hatch6' && (
                  <div>
                    <p className="text-xl font-semibold mb-2">One More Makes 6!</p>
                    <p className="text-lg text-muted-foreground">
                      A chick hatches from the other nest! Lift your right thumb!
                    </p>
                    <p className="text-3xl font-bold text-primary mt-4">5 and 1 more is 6! 🎉</p>
                  </div>
                )}
              </div>

              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => speakText(
                    currentStep === 'intro' ? "Your fingers are baby chicks, and your fists are nests!" :
                    currentStep === 'nest' ? "Make two fists. These are your nests with eggs inside!" :
                    currentStep === 'hatch1' ? "Lift your left pinky. The first chick hatches!" :
                    currentStep === 'hatch5' ? "Count the chicks: 1, 2, 3, 4, 5!" :
                    "5 and 1 more is 6! You're counting the Math Way!"
                  )}
                >
                  <Volume2 className="mr-2 h-4 w-4" /> Listen
                </Button>
                <Button size="lg" onClick={handleStepAction}>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {currentStep === 'practice' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl shadow-xl p-6 md:p-8"
            >
              <h2 className="text-2xl font-bold text-center mb-6">Practice Time! 🐣</h2>
              
              <div className="text-center mb-6">
                <p className="text-xl font-semibold mb-6">
                  {practiceQuestions[practiceIndex].question}
                </p>

                {practiceQuestions[practiceIndex].isMultipleChoice ? (
                  <div className="flex justify-center gap-4 flex-wrap">
                    {practiceQuestions[practiceIndex].options?.map((option) => (
                      <Button
                        key={option}
                        size="lg"
                        variant="outline"
                        onClick={() => handleMultipleChoiceAnswer(option)}
                        disabled={showFeedback !== null}
                        className="text-3xl w-20 h-20 rounded-full"
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="bg-green-50 rounded-2xl p-6 mb-6">
                      {renderInteractiveHands()}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Tap fingers from left to right to show chicks hatching!
                    </p>
                    <Button 
                      size="lg" 
                      onClick={checkFingerAnswer}
                      disabled={showFeedback !== null}
                    >
                      Check My Answer <Check className="ml-2" />
                    </Button>
                  </>
                )}

                {showFeedback && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`mt-6 text-2xl font-bold ${
                      showFeedback === 'correct' ? 'text-green-500' : 'text-orange-500'
                    }`}
                  >
                    {showFeedback === 'correct' ? '🎉 Perfect!' : '🤔 Try again!'}
                  </motion.div>
                )}
              </div>

              <div className="flex justify-center gap-2">
                {practiceQuestions.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-3 h-3 rounded-full ${
                      idx < practiceIndex ? 'bg-green-500' :
                      idx === practiceIndex ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {currentStep === 'complete' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl shadow-xl p-8 text-center"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-6xl mb-6"
              >
                🌟
              </motion.div>
              
              <h2 className="text-3xl font-bold text-primary mb-4">
                Excellent Work!
              </h2>
              <p className="text-xl text-muted-foreground mb-6">
                You learned to count the Math Way!
              </p>

              <div className="bg-green-50 rounded-xl p-6 mb-6">
                <h3 className="font-semibold text-lg mb-3">You Learned:</h3>
                <ul className="space-y-2 text-left">
                  <li className="flex items-center gap-2">
                    <Check className="text-green-500" /> Count fingers left to right
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="text-green-500" /> 5 fingers on one hand
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="text-green-500" /> 5 and 1 more makes 6
                  </li>
                </ul>
              </div>

              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={() => window.location.reload()}>
                  <RotateCcw className="mr-2 h-4 w-4" /> Practice Again
                </Button>
                <Button size="lg" onClick={handleStepAction}>
                  Complete Lesson <Star className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FingerCounting6;

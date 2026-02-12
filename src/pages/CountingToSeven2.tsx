import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, RotateCcw, Check, Star, Volume2 } from 'lucide-react';

type Step = 'intro' | 'show5' | 'add6' | 'count6' | 'add7' | 'count7' | 'practice' | 'complete';

const CountingTo7Linear: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>('intro');
  const [rockCount, setRockCount] = useState(5);
  const [showIntroScreen, setShowIntroScreen] = useState(true);
  const [explorerPosition, setExplorerPosition] = useState(-1);
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const practiceQuestions = useMemo(() => [
    { question: "How many rocks do we start with?", answer: 5, options: [4, 5, 6] },
    { question: "5 rocks and 1 more makes how many?", answer: 6, options: [5, 6, 7] },
    { question: "6 rocks and 1 more makes how many?", answer: 7, options: [6, 7, 8] },
    { question: "How many rocks does the explorer need to cross?", answer: 7, options: [5, 6, 7] },
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
        setCurrentStep('show5');
        speakText("Look! There are 5 black rocks in the creek. Let's count them together!");
        break;
      case 'show5':
        setCurrentStep('add6');
        speakText("The explorer needs 1 more rock to cross. Let's add a red rock!");
        break;
      case 'add6':
        setRockCount(6);
        setCurrentStep('count6');
        speakText("Now let's count all the rocks. 1, 2, 3, 4, 5, 6! We have 6 rocks!");
        break;
      case 'count6':
        setCurrentStep('add7');
        speakText("The explorer needs 1 more rock. Let's add another red rock!");
        break;
      case 'add7':
        setRockCount(7);
        setCurrentStep('count7');
        speakText("Let's count all 7 rocks! 1, 2, 3, 4, 5, 6, 7! The explorer can cross now!");
        break;
      case 'count7':
        animateExplorerCrossing();
        break;
      case 'practice':
        // Handled by handlePracticeAnswer
        break;
      case 'complete':
        markLessonComplete();
        navigate('/activities/module3');
        break;
    }
  };

  const animateExplorerCrossing = () => {
    let pos = -1;
    const interval = setInterval(() => {
      pos++;
      setExplorerPosition(pos);
      if (pos >= 7) {
        clearInterval(interval);
        setTimeout(() => {
          setCurrentStep('practice');
          speakText("Great job! Now let's practice what we learned!");
        }, 500);
      }
    }, 400);
  };

  const handlePracticeAnswer = (answer: number) => {
    const correct = answer === practiceQuestions[practiceIndex].answer;
    setShowFeedback(correct ? 'correct' : 'incorrect');

    if (correct) {
      speakText("That's right! Great counting!");
    } else {
      speakText("Try again! You can do it!");
    }

    setTimeout(() => {
      setShowFeedback(null);
      if (correct) {
        if (practiceIndex < practiceQuestions.length - 1) {
          setPracticeIndex(prev => prev + 1);
        } else {
          setCurrentStep('complete');
          speakText("Wonderful! You helped the explorer cross the creek! You're a counting star!");
        }
      }
    }, 1500);
  };

  const markLessonComplete = () => {
    const completed = JSON.parse(localStorage.getItem('completedLessons') || '[]');
    if (!completed.includes(302)) {
      completed.push(302);
      localStorage.setItem('completedLessons', JSON.stringify(completed));
    }
  };

  const renderRocks = () => {
    const rocks = [];
    for (let i = 0; i < rockCount; i++) {
      const isRed = i >= 5;
      rocks.push(
        <motion.div
          key={i}
          initial={{ scale: 0, y: -20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ delay: i * 0.1, type: 'spring', stiffness: 300 }}
          className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg border-4 ${isRed
              ? 'bg-red-500 border-red-700 text-white'
              : 'bg-gray-700 border-gray-900 text-white'
            }`}
        >
          {i + 1}
        </motion.div>
      );
    }
    return rocks;
  };

  const renderExplorer = () => {
    if (explorerPosition < 0) return null;
    return (
      <motion.div
        initial={{ x: -100 }}
        animate={{ x: explorerPosition * 76 }}
        className="absolute top-[-60px] left-0 text-4xl"
        style={{ left: `${explorerPosition * 76 + 8}px` }}
      >
        🧑‍🎒
      </motion.div>
    );
  };

  if (showIntroScreen) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-green-100 p-4 md:p-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/activities/module-3')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Module 3
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8 text-center"
        >
          <div className="text-6xl mb-6">🏞️</div>
          <h1 className="text-3xl font-bold text-primary mb-4">
            Lesson 2: Crossing the Creek
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Help the explorer cross the creek by counting rocks!
          </p>

          <div className="bg-blue-50 rounded-xl p-6 mb-6">
            <h2 className="font-semibold text-lg mb-3">What You'll Learn:</h2>
            <ul className="text-left space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Count rocks in a line
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> See how 5 and 1 more makes 6
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> See how 6 and 1 more makes 7
              </li>
            </ul>
          </div>

          <Button
            size="lg"
            onClick={() => {
              setShowIntroScreen(false);
              speakText("Let's help the explorer cross the creek! First, we'll count the rocks.");
            }}
            className="text-xl px-8 py-6"
          >
            Start Adventure! <ArrowRight className="ml-2" />
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-green-200 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Button variant="ghost" onClick={() => navigate('/activities/module3')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <h1 className="text-xl md:text-2xl font-bold text-primary">
            Crossing the Creek
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
              {/* Creek Scene */}
              <div className="relative bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 rounded-2xl p-8 mb-6 min-h-[200px]">
                {/* Banks */}
                <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-green-600 to-green-500 rounded-l-2xl flex items-center justify-center">
                  <span className="text-3xl">🌳</span>
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-green-600 to-green-500 rounded-r-2xl flex items-center justify-center">
                  <span className="text-3xl">🏠</span>
                </div>

                {/* Rocks */}
                <div className="flex justify-center items-center gap-2 relative ml-16 mr-16">
                  {renderExplorer()}
                  {renderRocks()}
                </div>

                {/* Water effect */}
                <div className="absolute bottom-2 left-20 right-20 flex justify-center gap-4 text-2xl opacity-50">
                  <span>🌊</span>
                  <span>🌊</span>
                  <span>🌊</span>
                </div>
              </div>

              {/* Instructions */}
              <div className="text-center mb-6">
                {currentStep === 'intro' && (
                  <div>
                    <p className="text-xl font-semibold mb-2">🧑‍🎒 Meet the Explorer!</p>
                    <p className="text-lg text-muted-foreground">
                      The explorer needs to cross the creek to get home.
                    </p>
                  </div>
                )}
                {currentStep === 'show5' && (
                  <div>
                    <p className="text-xl font-semibold mb-2">Count the Black Rocks!</p>
                    <p className="text-lg text-muted-foreground">
                      There are 5 black rocks. Let's count: 1, 2, 3, 4, 5
                    </p>
                    <p className="text-3xl font-bold text-primary mt-4">5 rocks</p>
                  </div>
                )}
                {currentStep === 'add6' && (
                  <div>
                    <p className="text-xl font-semibold mb-2">Add 1 More Rock!</p>
                    <p className="text-lg text-muted-foreground">
                      The explorer needs 1 more rock. Let's add a red rock!
                    </p>
                  </div>
                )}
                {currentStep === 'count6' && (
                  <div>
                    <p className="text-xl font-semibold mb-2">Count All the Rocks!</p>
                    <p className="text-lg text-muted-foreground">
                      5 black rocks + 1 red rock = 6 rocks!
                    </p>
                    <p className="text-3xl font-bold text-primary mt-4">5 and 1 more is 6!</p>
                  </div>
                )}
                {currentStep === 'add7' && (
                  <div>
                    <p className="text-xl font-semibold mb-2">We Need 1 More!</p>
                    <p className="text-lg text-muted-foreground">
                      The explorer needs 1 more rock to reach home.
                    </p>
                  </div>
                )}
                {currentStep === 'count7' && (
                  <div>
                    <p className="text-xl font-semibold mb-2">Count All 7 Rocks!</p>
                    <p className="text-lg text-muted-foreground">
                      Now count: 1, 2, 3, 4, 5, 6, 7!
                    </p>
                    <p className="text-3xl font-bold text-primary mt-4">6 and 1 more is 7!</p>
                  </div>
                )}
              </div>

              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => speakText(
                    currentStep === 'intro' ? "The explorer needs to cross the creek to get home." :
                      currentStep === 'show5' ? "There are 5 black rocks. 1, 2, 3, 4, 5." :
                        currentStep === 'add6' ? "The explorer needs 1 more rock." :
                          currentStep === 'count6' ? "5 and 1 more is 6!" :
                            currentStep === 'add7' ? "We need 1 more rock." :
                              "6 and 1 more is 7!"
                  )}
                >
                  <Volume2 className="mr-2 h-4 w-4" /> Listen
                </Button>
                <Button size="lg" onClick={handleStepAction}>
                  {currentStep === 'count7' ? 'Help Explorer Cross!' : 'Next'}
                  <ArrowRight className="ml-2 h-4 w-4" />
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
              <h2 className="text-2xl font-bold text-center mb-6">Practice Time! 🌟</h2>

              <div className="text-center mb-8">
                <p className="text-xl font-semibold mb-6">
                  {practiceQuestions[practiceIndex].question}
                </p>

                <div className="flex justify-center gap-4 flex-wrap">
                  {practiceQuestions[practiceIndex].options.map((option) => (
                    <Button
                      key={option}
                      size="lg"
                      variant="outline"
                      onClick={() => handlePracticeAnswer(option)}
                      disabled={showFeedback !== null}
                      className="text-3xl w-20 h-20 rounded-full"
                    >
                      {option}
                    </Button>
                  ))}
                </div>

                {showFeedback && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`mt-6 text-2xl font-bold ${showFeedback === 'correct' ? 'text-green-500' : 'text-orange-500'
                      }`}
                  >
                    {showFeedback === 'correct' ? '🎉 Correct!' : '🤔 Try again!'}
                  </motion.div>
                )}
              </div>

              <div className="flex justify-center gap-2">
                {practiceQuestions.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-3 h-3 rounded-full ${idx < practiceIndex ? 'bg-green-500' :
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
                Amazing Work!
              </h2>
              <p className="text-xl text-muted-foreground mb-6">
                You helped the explorer cross the creek!
              </p>

              <div className="bg-green-50 rounded-xl p-6 mb-6">
                <h3 className="font-semibold text-lg mb-3">You Learned:</h3>
                <ul className="space-y-2 text-left">
                  <li className="flex items-center gap-2">
                    <Check className="text-green-500" /> 5 and 1 more is 6
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="text-green-500" /> 6 and 1 more is 7
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="text-green-500" /> Counting rocks in a line
                  </li>
                </ul>
              </div>

              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={() => window.location.reload()}>
                  <RotateCcw className="mr-2 h-4 w-4" /> Play Again
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

export default CountingTo7Linear;

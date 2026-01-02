import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Play, RotateCcw, CheckCircle2, Users, Circle } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const CountingM3Lesson1 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [currentStep, setCurrentStep] = useState<'intro' | 'count5' | 'add6' | 'count6' | 'add7' | 'count7' | 'practice' | 'complete'>('intro');
  const [playerCount, setPlayerCount] = useState(5);
  const [ballCount, setBallCount] = useState(5);
  const [practiceStep, setPracticeStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const markLessonComplete = () => {
    const saved = localStorage.getItem('completedLessons');
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes(301)) {
      completed.push(301);
      localStorage.setItem('completedLessons', JSON.stringify(completed));
    }
  };

  const handleComplete = () => {
    markLessonComplete();
    navigate("/activities/module3");
  };

  const practiceQuestions = useMemo(() => [
    { question: "5 and 1 more is...", answer: 6, options: [5, 6, 7] },
    { question: "6 and 1 more is...", answer: 7, options: [6, 7, 8] },
    { question: "How many players? 5 + 1 more = ?", answer: 6, options: [5, 6, 7] },
    { question: "How many balls? 6 + 1 more = ?", answer: 7, options: [6, 7, 8] },
  ], []);

  const handleStepAction = () => {
    switch (currentStep) {
      case 'intro':
        setCurrentStep('count5');
        break;
      case 'count5':
        toast.success("Great! We have 5 players!");
        setCurrentStep('add6');
        break;
      case 'add6':
        setPlayerCount(6);
        setBallCount(6);
        toast.success("1 more player joined! Now count again!");
        setCurrentStep('count6');
        break;
      case 'count6':
        toast.success("Yes! 5 and 1 more is 6!");
        setCurrentStep('add7');
        break;
      case 'add7':
        setPlayerCount(7);
        setBallCount(7);
        toast.success("Another player joined! Count again!");
        setCurrentStep('count7');
        break;
      case 'count7':
        toast.success("Excellent! 6 and 1 more is 7!");
        setCurrentStep('practice');
        break;
      case 'practice':
        // Handled by practice buttons
        break;
      case 'complete':
        handleComplete();
        break;
    }
  };

  const handlePracticeAnswer = (answer: number) => {
    setSelectedAnswer(answer);
    const correct = practiceQuestions[practiceStep].answer;
    
    if (answer === correct) {
      toast.success("Correct! Great counting!");
      setTimeout(() => {
        setSelectedAnswer(null);
        if (practiceStep < practiceQuestions.length - 1) {
          setPracticeStep(prev => prev + 1);
        } else {
          setCurrentStep('complete');
        }
      }, 1000);
    } else {
      toast.error("Try again! Count carefully.");
      setTimeout(() => setSelectedAnswer(null), 1000);
    }
  };

  const renderPlayers = (count: number) => (
    <div className="flex flex-wrap justify-center gap-3 my-6">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.1, type: "spring" }}
          className="flex flex-col items-center"
        >
          <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold ${
            i < 5 ? 'bg-primary text-primary-foreground' : 'bg-warning text-warning-foreground'
          }`}>
            <Users className="w-8 h-8" />
          </div>
          <span className="text-sm font-medium mt-1">{i + 1}</span>
        </motion.div>
      ))}
    </div>
  );

  const renderBalls = (count: number) => (
    <div className="flex flex-wrap justify-center gap-3 my-4">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.08, type: "spring" }}
          className={`w-12 h-12 rounded-full flex items-center justify-center ${
            i < 5 ? 'bg-chart-1' : 'bg-chart-2'
          }`}
        >
          <Circle className="w-6 h-6 text-white fill-white" />
        </motion.div>
      ))}
    </div>
  );

  if (!showGame) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <header className="bg-primary text-primary-foreground py-4 px-6 shadow-md">
          <div className="max-w-4xl mx-auto flex items-center gap-4">
            <Link to="/activities/module3" className="hover:opacity-80">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div>
              <h1 className="text-xl font-bold">Lesson 1: Introduce 6 and 7</h1>
              <p className="text-primary-foreground/80 text-sm">Module 3 • Topic A</p>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto py-8 px-6">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">Learning Goal</CardTitle>
              <CardDescription className="text-lg">
                Introduce 6 and 7, and relate 6 to 5 and 1 more and 7 to 6 and 1 more.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">📚 What We'll Learn</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Count objects from 1 to 6 and 1 to 7</li>
                  <li>• Understand that 6 is 5 and 1 more</li>
                  <li>• Understand that 7 is 6 and 1 more</li>
                  <li>• Match quantities to the count</li>
                </ul>
              </div>

              <div className="bg-primary/10 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">⚽ The Soccer Team Story</h3>
                <p className="text-muted-foreground">
                  A soccer team has 5 players. When 1 more player joins, we count 6 players!
                  When another player joins, we count 7 players! Each player needs a ball.
                </p>
              </div>

              <div className="bg-warning/10 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">👨‍👩‍👧 Parent Tips</h3>
                <ul className="space-y-1 text-muted-foreground text-sm">
                  <li>• Help your child touch each object as they count</li>
                  <li>• Emphasize "1 more" when adding objects</li>
                  <li>• Practice with toys, snacks, or household items</li>
                </ul>
              </div>

              <Button onClick={() => setShowGame(true)} size="lg" className="w-full">
                <Play className="mr-2 h-5 w-5" />
                Start Activity
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <header className="bg-primary text-primary-foreground py-4 px-6 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/activities/module3" className="hover:opacity-80">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-xl font-bold">Soccer Team Counting</h1>
          </div>
          <Button variant="secondary" size="sm" onClick={() => {
            setCurrentStep('intro');
            setPlayerCount(5);
            setBallCount(5);
            setPracticeStep(0);
          }}>
            <RotateCcw className="h-4 w-4 mr-1" />
            Restart
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-8 px-6">
        <AnimatePresence mode="wait">
          {currentStep === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-3xl">⚽ The Soccer Team</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-xl">
                    This is the Pre-K soccer team. Let's count how many players are on the team!
                  </p>
                  {renderPlayers(5)}
                  <p className="text-lg text-muted-foreground">
                    Touch each player and count together!
                  </p>
                  <Button onClick={handleStepAction} size="lg">
                    Let's Count! 👆
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {currentStep === 'count5' && (
            <motion.div
              key="count5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-2xl">Count the Players!</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {renderPlayers(5)}
                  <div className="text-4xl font-bold text-primary">
                    1, 2, 3, 4, 5
                  </div>
                  <p className="text-xl">There are <span className="font-bold text-primary">5</span> players!</p>
                  {renderBalls(5)}
                  <p className="text-lg">Each player has a soccer ball. Count the balls!</p>
                  <Button onClick={handleStepAction} size="lg">
                    We have 5! What's next? ➡️
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {currentStep === 'add6' && (
            <motion.div
              key="add6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-2xl">The Team Needs 1 More Player!</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {renderPlayers(5)}
                  <div className="text-xl bg-warning/20 p-4 rounded-lg">
                    <p>A new player wants to join the team!</p>
                    <p className="font-bold mt-2">5 and 1 more is... ?</p>
                  </div>
                  <Button onClick={handleStepAction} size="lg" className="bg-warning hover:bg-warning/90">
                    Add 1 More Player! ➕
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {currentStep === 'count6' && (
            <motion.div
              key="count6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-2xl">Count Again!</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {renderPlayers(6)}
                  <div className="text-4xl font-bold text-primary">
                    1, 2, 3, 4, 5, <span className="text-warning">6</span>
                  </div>
                  <div className="bg-success/20 p-4 rounded-lg">
                    <p className="text-2xl font-bold">5 and 1 more is 6!</p>
                    <p className="text-lg">There are now <span className="font-bold">6</span> players!</p>
                  </div>
                  {renderBalls(6)}
                  <p className="text-lg">We need 1 more ball too! Now we have 6 balls!</p>
                  <Button onClick={handleStepAction} size="lg">
                    Continue ➡️
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {currentStep === 'add7' && (
            <motion.div
              key="add7"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-2xl">Another Player Wants to Join!</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {renderPlayers(6)}
                  <div className="text-xl bg-warning/20 p-4 rounded-lg">
                    <p>One more friend wants to play soccer!</p>
                    <p className="font-bold mt-2">6 and 1 more is... ?</p>
                  </div>
                  <Button onClick={handleStepAction} size="lg" className="bg-warning hover:bg-warning/90">
                    Add 1 More Player! ➕
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {currentStep === 'count7' && (
            <motion.div
              key="count7"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-2xl">Count All the Players!</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {renderPlayers(7)}
                  <div className="text-4xl font-bold text-primary">
                    1, 2, 3, 4, 5, <span className="text-warning">6, 7</span>
                  </div>
                  <div className="bg-success/20 p-4 rounded-lg">
                    <p className="text-2xl font-bold">6 and 1 more is 7!</p>
                    <p className="text-lg">There are now <span className="font-bold">7</span> players!</p>
                  </div>
                  {renderBalls(7)}
                  <p className="text-lg">We added 1 more ball! Now we have 7 balls!</p>
                  <Button onClick={handleStepAction} size="lg">
                    Practice Time! 🎯
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {currentStep === 'practice' && (
            <motion.div
              key="practice"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-2xl">Practice Time!</CardTitle>
                  <CardDescription>Question {practiceStep + 1} of {practiceQuestions.length}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-3xl font-bold py-8 bg-muted/50 rounded-lg">
                    {practiceQuestions[practiceStep].question}
                  </div>
                  <div className="flex justify-center gap-4">
                    {practiceQuestions[practiceStep].options.map((option) => (
                      <Button
                        key={option}
                        onClick={() => handlePracticeAnswer(option)}
                        disabled={selectedAnswer !== null}
                        size="lg"
                        variant={selectedAnswer === option 
                          ? (option === practiceQuestions[practiceStep].answer ? "default" : "destructive")
                          : "outline"
                        }
                        className={`w-20 h-20 text-3xl ${
                          selectedAnswer === option && option === practiceQuestions[practiceStep].answer
                            ? 'bg-success hover:bg-success'
                            : ''
                        }`}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                  <div className="flex justify-center gap-2 mt-4">
                    {practiceQuestions.map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full ${
                          i < practiceStep ? 'bg-success' : i === practiceStep ? 'bg-primary' : 'bg-muted'
                        }`}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {currentStep === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <Card className="text-center bg-gradient-to-br from-success/20 to-primary/20">
                <CardHeader>
                  <div className="mx-auto mb-4">
                    <CheckCircle2 className="h-20 w-20 text-success" />
                  </div>
                  <CardTitle className="text-3xl">Amazing Job! 🎉</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <p className="text-xl">You learned that:</p>
                    <div className="bg-background/50 p-4 rounded-lg space-y-2">
                      <p className="text-lg font-semibold">5 and 1 more is 6</p>
                      <p className="text-lg font-semibold">6 and 1 more is 7</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button onClick={handleComplete} size="lg">
                      Complete Lesson ✓
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setCurrentStep('intro');
                        setPlayerCount(5);
                        setBallCount(5);
                        setPracticeStep(0);
                      }}
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Practice Again
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default CountingM3Lesson1;

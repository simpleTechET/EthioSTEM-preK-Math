// src/pages/CountingActivity18.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Star, BookOpen, Users, Lightbulb, Eye, Music } from "lucide-react";

const CountingActivity18 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [currentStep, setCurrentStep] = useState<'warmup' | 'peekaboo' | 'jive' | 'piano' | 'chicks' | 'practice' | 'complete'>('warmup');
  const [jiveStep, setJiveStep] = useState(0);
  const [pianoCount, setPianoCount] = useState(0);

  const jiveChant = [
    { line: "1, 2,", action: "tie my shoe", emoji: "👟" },
    { line: "3, 4,", action: "close the door", emoji: "🚪" },
    { line: "On 5,", action: "we jive", emoji: "💃" },
    { line: "On 5,", action: "we jive", emoji: "🕺" }
  ];

  const handleJiveStep = () => {
    if (jiveStep < 3) {
      setJiveStep(jiveStep + 1);
    } else {
      setCurrentStep('piano');
    }
  };

  const handlePianoKey = (key: number) => {
    if (key === pianoCount + 1 && pianoCount < 5) {
      setPianoCount(pianoCount + 1);
      if (pianoCount + 1 === 5) {
        setTimeout(() => setCurrentStep('chicks'), 1500);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-50 to-pink-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-orange-700 bg-orange-100 px-3 py-1 rounded-full">
                Lesson 18
              </span>
              <h1 className="text-2xl font-bold text-gray-800">Arrays - Counting in Pairs</h1>
            </div>
            <p className="text-sm text-gray-600">Topic E: Counting 4-5 Objects</p>
          </div>
        </div>

        {!showGame ? (
          <div className="space-y-6">
            {/* Learning Objective */}
            <Card className="border-2 border-orange-200 bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl text-orange-700">
                  <Star className="w-6 h-6" />
                  Learning Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-700">
                  Today, your child will learn to <span className="font-bold text-orange-700">arrange and count 4 objects in an array configuration</span> 
                  (2×2 pairs), understanding that objects can be organized in rows and columns.
                </p>
              </CardContent>
            </Card>

            {/* Introduction */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">🐣 Baby Chicks and Arrays!</CardTitle>
                <CardDescription>Read this together with your child</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-yellow-50 p-6 rounded-xl border-2 border-yellow-200">
                  <p className="text-lg text-gray-700 mb-4">
                    Today we'll help baby chicks follow their mommy! We'll arrange them in different ways: scattered, in a line, and in <strong>pairs</strong>!
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg border-2 border-orange-200 text-center">
                      <div className="text-5xl mb-2">🐣🐣🐣🐣</div>
                      <p className="font-bold text-orange-700">Line</p>
                      <p className="text-sm text-gray-600">Following mommy</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border-2 border-pink-200 text-center">
                      <div className="text-5xl mb-2">
                        <div>🐣🐣</div>
                        <div>🐣🐣</div>
                      </div>
                      <p className="font-bold text-pink-700">Array (2×2)</p>
                      <p className="text-sm text-gray-600">Walking in pairs!</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border-2 border-yellow-200 text-center">
                      <div className="text-5xl mb-2">🐣🐣  🐣🐣</div>
                      <p className="font-bold text-yellow-700">2 Pairs</p>
                      <p className="text-sm text-gray-600">Two groups of 2</p>
                    </div>
                  </div>
                  <p className="text-center text-gray-700 mt-4 font-semibold">
                    All arrangements have 4 chicks! The count stays the same! ✨
                  </p>
                </div>

                {/* Array Concept */}
                <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                  <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="text-2xl">📊</span> What is an Array?
                  </h4>
                  <p className="text-gray-700 mb-2">
                    An <strong>array</strong> is when objects are arranged in rows and columns (like a grid). 
                    A 2×2 array means 2 rows and 2 columns = 4 objects total!
                  </p>
                  <div className="bg-white p-3 rounded border-2 border-blue-300 text-center">
                    <div className="text-4xl mb-2">
                      <div className="flex justify-center gap-2">
                        <span>🟦</span><span>🟦</span>
                      </div>
                      <div className="flex justify-center gap-2">
                        <span>🟦</span><span>🟦</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">2 rows × 2 columns = 4 squares</p>
                  </div>
                </div>

                {/* Parent Tips */}
                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border-2 border-green-200">
                  <Users className="w-8 h-8 text-green-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Parent Tips:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Help arrange objects in pairs (2×2 grid)</li>
                      <li>• Point out: "Each chick has a partner!"</li>
                      <li>• Count pairs: "1 pair, 2 pairs" then total: "1, 2, 3, 4"</li>
                      <li>• Practice at home: Arrange toys, snacks, or blocks in arrays</li>
                    </ul>
                  </div>
                </div>

                {/* Key Vocabulary */}
                <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-5 h-5 text-purple-600" />
                    <h4 className="font-bold text-gray-800">Key Words</h4>
                  </div>
                  <div className="grid md:grid-cols-3 gap-3">
                    <div className="bg-white p-3 rounded-lg">
                      <p className="font-bold text-orange-700">Array</p>
                      <p className="text-sm text-gray-600">Objects in rows and columns</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="font-bold text-orange-700">Pair</p>
                      <p className="text-sm text-gray-600">A group of 2</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="font-bold text-orange-700">Partner</p>
                      <p className="text-sm text-gray-600">Two things together</p>
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
                className="text-lg px-8 py-6 bg-orange-600 hover:bg-orange-700 shadow-lg"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Start Array Adventure
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Peek-a-Boo with Embedded Numbers */}
            {currentStep === 'peekaboo' && <PeekabooGame onComplete={() => setCurrentStep('jive')} />}

            {/* On 5 We Jive */}
            {currentStep === 'jive' && (
              <Card className="p-6 bg-pink-50 border-2 border-pink-200 text-center">
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  💃 On 5 We Jive Chant!
                </h3>
                
                <div className="bg-white p-8 rounded-lg border-2 border-pink-300 mb-6">
                  <div className="text-6xl mb-4 animate-bounce">
                    {jiveChant[jiveStep].emoji}
                  </div>
                  <div className="text-3xl font-bold text-pink-600 mb-2">
                    {jiveChant[jiveStep].line}
                  </div>
                  <div className="text-2xl text-gray-700">
                    {jiveChant[jiveStep].action}
                  </div>
                </div>

                <Button onClick={handleJiveStep} size="lg" className="bg-pink-600 hover:bg-pink-700">
                  {jiveStep === 0 ? 'Start Chanting!' : 'Next Line!'}
                </Button>
              </Card>
            )}

            {/* Piano the Math Way */}
            {currentStep === 'piano' && (
              <Card className="p-6 bg-purple-50 border-2 border-purple-200">
                <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">
                  🎹 Count the Math Way on Piano!
                </h3>
                
                <p className="text-center text-gray-700 mb-4">
                  Remember: Pinky (1) → Ring (2) → Middle (3) → Pointer (4) → Thumb (5)
                </p>

                <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-xl mb-6">
                  <div className="flex justify-center gap-1">
                    {[1, 2, 3, 4, 5].map(key => (
                      <button
                        key={key}
                        onClick={() => handlePianoKey(key)}
                        className={`
                          w-20 h-48 rounded-b-lg transition-all
                          ${pianoCount >= key
                            ? 'bg-purple-400 shadow-lg'
                            : 'bg-white hover:bg-gray-100'
                          }
                        `}
                      >
                        <span className={`text-2xl font-bold ${
                          pianoCount >= key ? 'text-white' : 'text-gray-800'
                        }`}>
                          {key}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <p className="text-center text-lg text-gray-700">
                  Keys played: <span className="text-3xl font-bold text-purple-700">{pianoCount}</span> / 5
                </p>
              </Card>
            )}

            {/* Baby Chicks Array Game */}
            {currentStep === 'chicks' && <ChicksArrayGame onComplete={() => setCurrentStep('practice')} />}

            {/* Practice */}
            {currentStep === 'practice' && <PracticeArrayGame onComplete={() => setCurrentStep('complete')} />}

            {/* Completion */}
            {currentStep === 'complete' && (
              <Card className="bg-gradient-to-br from-yellow-100 to-orange-100 border-4 border-orange-400 p-8 text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-3xl font-bold mb-3 text-gray-800">Array Expert!</h3>
                <p className="text-lg text-gray-700 mb-4">
                  You learned to arrange 4 objects in arrays! You know how to make pairs!
                </p>
                <div className="bg-white p-6 rounded-lg border-2 border-orange-300 mb-6">
                  <div className="text-5xl mb-4">
                    <div className="flex gap-6 justify-center mb-3">
                      <span>🐣</span><span>🐣</span>
                    </div>
                    <div className="flex gap-6 justify-center">
                      <span>🐣</span><span>🐣</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    <strong>Today you learned:</strong><br/>
                    • Arrays (2×2 = rows and columns)<br/>
                    • Making pairs (groups of 2)<br/>
                    • 4 objects make 2 perfect pairs!<br/>
                    • 5 objects leave one without a partner<br/>
                    • The count stays the same in any arrangement! ✨
                  </p>
                </div>
                <Button 
                  size="lg"
                  onClick={() => navigate('/activities')}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  Continue Learning
                </Button>
              </Card>
            )}

            {/* Warmup Start */}
            {currentStep === 'warmup' && (
              <Card className="p-6 bg-orange-50 border-2 border-orange-200 text-center">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Ready to Learn About Arrays?</h3>
                <p className="text-gray-700 mb-4">Let's start with warm-up activities!</p>
                <Button onClick={() => setCurrentStep('peekaboo')} size="lg" className="bg-orange-600">
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

// Peek-a-Boo Game Component
const PeekabooGame = ({ onComplete }: { onComplete: () => void }) => {
  const [currentRound, setCurrentRound] = useState(0);
  const [showObjects, setShowObjects] = useState(false);
  const [userAnswer, setUserAnswer] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const configurations = [
    { groups: [3, 1], description: "3 and 1" },
    { groups: [2, 2], description: "2 and 2" },
    { groups: [1, 3], description: "1 and 3" },
    { groups: [2, 1, 1], description: "2, 1, and 1" }
  ];

  const currentConfig = configurations[currentRound];

  const startPeekaboo = () => {
    setShowObjects(true);
    setUserAnswer(null);
    setFeedback(null);
    setTimeout(() => {
      setShowObjects(false);
    }, 2000);
  };

  const handleAnswer = (answer: number) => {
    setUserAnswer(answer);
    if (answer === 4) {
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
  };

  const handleNextRound = () => {
    const nextRound = currentRound + 1;
    if (nextRound >= configurations.length) {
      onComplete();
    } else {
      setCurrentRound(nextRound);
      setShowObjects(false);
      setUserAnswer(null);
      setFeedback(null);
    }
  };

  return (
    <Card className="p-6 bg-green-50 border-2 border-green-200 text-center">
      <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center justify-center gap-2">
        <Eye className="w-6 h-6" />
        Peek-a-Boo Counting!
      </h3>

      <div className="text-center mb-4">
        <p className="text-sm text-muted-foreground">Round {currentRound + 1} of {configurations.length}</p>
      </div>
      
      {!showObjects && !feedback ? (
        <div className="space-y-4">
          <p className="text-lg text-gray-700">Get ready to see some objects quickly!</p>
          <Button onClick={startPeekaboo} size="lg" className="bg-green-600 hover:bg-green-700">
            Show Me the Objects!
          </Button>
        </div>
      ) : showObjects ? (
        <div className="mb-6">
          <p className="text-lg text-gray-700 mb-6 font-semibold">Quick! Look at the objects!</p>
          <div className="flex justify-center gap-12 text-6xl mb-6 min-h-[120px] items-center">
            {currentConfig.groups.map((group, groupIndex) => (
              <div key={groupIndex} className="flex gap-3 p-4 bg-white rounded-lg border-4 border-green-300">
                {Array(group).fill('🐻').map((bear, i) => (
                  <span key={i}>{bear}</span>
                ))}
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600 animate-pulse">Memorize the groups! ({currentConfig.description})</p>
        </div>
      ) : (
        <div className="space-y-6">
          <p className="text-lg text-gray-700 font-semibold">How many bears did you see in total?</p>
          
          <div className="flex gap-4 justify-center">
            {[2, 3, 4, 5, 6].map(num => (
              <Button
                key={num}
                onClick={() => handleAnswer(num)}
                variant={userAnswer === num ? "default" : "outline"}
                className="w-16 h-16 text-2xl font-bold"
                disabled={feedback !== null}
              >
                {num}
              </Button>
            ))}
          </div>

          {feedback && (
            <div className={`p-6 rounded-lg ${
              feedback === 'correct'
                ? 'bg-green-100 text-green-700 border-2 border-green-300'
                : 'bg-red-100 text-red-700 border-2 border-red-300'
            }`}>
              <p className="font-bold text-xl mb-3">
                {feedback === 'correct'
                  ? `✓ Correct! There were 4 bears total! (${currentConfig.description})`
                  : '✗ Not quite! Look again when you try the next round.'}
              </p>
              <Button 
                onClick={handleNextRound}
                size="lg"
                className={feedback === 'correct' ? 'bg-green-600 hover:bg-green-700' : ''}
                variant={feedback === 'correct' ? 'default' : 'outline'}
              >
                {currentRound >= configurations.length - 1 ? 'Continue to Jive!' : 'Next Round'}
              </Button>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

// Chicks Array Game Component
const ChicksArrayGame = ({ onComplete }: { onComplete: () => void }) => {
  const [chickConfig, setChickConfig] = useState<'scattered' | 'line' | 'array' | 'separated'>('scattered');
  const [clickedChicks, setClickedChicks] = useState<number[]>([]);
  const [showCountInput, setShowCountInput] = useState(false);
  const [userCount, setUserCount] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [stageComplete, setStageComplete] = useState(false);

  const sequence: Array<typeof chickConfig> = ['scattered', 'line', 'array', 'separated'];
  const currentStageIndex = sequence.indexOf(chickConfig);

  const handleChickClick = (index: number) => {
    if (!clickedChicks.includes(index) && !stageComplete) {
      setClickedChicks([...clickedChicks, index]);
    }
  };

  const handleCountSubmit = (count: number) => {
    setUserCount(count);
    if (count === 4) {
      setFeedback('correct');
      setStageComplete(true);
    } else {
      setFeedback('incorrect');
    }
  };

  const handleNextArrangement = () => {
    if (currentStageIndex >= sequence.length - 1) {
      onComplete();
    } else {
      setChickConfig(sequence[currentStageIndex + 1]);
      setClickedChicks([]);
      setShowCountInput(false);
      setUserCount(null);
      setFeedback(null);
      setStageComplete(false);
    }
  };

  const handleTryAgain = () => {
    setClickedChicks([]);
    setShowCountInput(false);
    setUserCount(null);
    setFeedback(null);
  };

  return (
    <Card className="p-6 bg-yellow-50 border-2 border-yellow-200">
      <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">
        🐣 Help the Baby Chicks!
      </h3>

      <div className="text-center mb-4">
        <p className="text-sm text-muted-foreground">
          Arrangement {currentStageIndex + 1} of {sequence.length}
        </p>
      </div>
      
      <div className="relative bg-gradient-to-b from-green-200 to-green-300 rounded-xl border-4 border-green-500 p-8 mb-6 min-h-[320px]">
        {/* Mother Hen */}
        <div className="text-center mb-6">
          <div className="text-6xl">🐔</div>
          <p className="text-sm text-gray-700 font-bold">Mother Hen</p>
        </div>

        {/* Baby Chicks - Clickable */}
        <div className="flex items-center justify-center">
          {chickConfig === 'scattered' && (
            <div className="relative w-full h-48">
              {[
                { top: '10%', left: '15%' },
                { top: '30%', right: '20%' },
                { bottom: '20%', left: '25%' },
                { bottom: '10%', right: '15%' }
              ].map((pos, idx) => (
                <button
                  key={idx}
                  onClick={() => handleChickClick(idx)}
                  disabled={stageComplete}
                  className="absolute text-6xl cursor-pointer hover:scale-110 transition-transform"
                  style={pos}
                >
                  🐣
                  {clickedChicks.includes(idx) && (
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold border-2 border-white">
                      {clickedChicks.indexOf(idx) + 1}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}

          {chickConfig === 'line' && (
            <div className="flex gap-4 text-6xl">
              {[0, 1, 2, 3].map(idx => (
                <button
                  key={idx}
                  onClick={() => handleChickClick(idx)}
                  disabled={stageComplete}
                  className="cursor-pointer hover:scale-110 transition-transform relative"
                >
                  🐣
                  {clickedChicks.includes(idx) && (
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold border-2 border-white">
                      {clickedChicks.indexOf(idx) + 1}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}

          {chickConfig === 'array' && (
            <div className="text-6xl">
              <div className="flex gap-12 justify-center mb-6">
                {[0, 1].map(idx => (
                  <button
                    key={idx}
                    onClick={() => handleChickClick(idx)}
                    disabled={stageComplete}
                    className="cursor-pointer hover:scale-110 transition-transform relative"
                  >
                    🐣
                    {clickedChicks.includes(idx) && (
                      <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold border-2 border-white">
                        {clickedChicks.indexOf(idx) + 1}
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <div className="flex gap-12 justify-center">
                {[2, 3].map(idx => (
                  <button
                    key={idx}
                    onClick={() => handleChickClick(idx)}
                    disabled={stageComplete}
                    className="cursor-pointer hover:scale-110 transition-transform relative"
                  >
                    🐣
                    {clickedChicks.includes(idx) && (
                      <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold border-2 border-white">
                        {clickedChicks.indexOf(idx) + 1}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {chickConfig === 'separated' && (
            <div className="flex gap-20 text-6xl">
              <div>
                <div className="flex gap-4 mb-2">
                  {[0, 1].map(idx => (
                    <button
                      key={idx}
                      onClick={() => handleChickClick(idx)}
                      disabled={stageComplete}
                      className="cursor-pointer hover:scale-110 transition-transform relative"
                    >
                      🐣
                      {clickedChicks.includes(idx) && (
                        <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold border-2 border-white">
                          {clickedChicks.indexOf(idx) + 1}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-700 text-center">Pair 1</p>
              </div>
              <div>
                <div className="flex gap-4 mb-2">
                  {[2, 3].map(idx => (
                    <button
                      key={idx}
                      onClick={() => handleChickClick(idx)}
                      disabled={stageComplete}
                      className="cursor-pointer hover:scale-110 transition-transform relative"
                    >
                      🐣
                      {clickedChicks.includes(idx) && (
                        <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold border-2 border-white">
                          {clickedChicks.indexOf(idx) + 1}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-700 text-center">Pair 2</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="text-center space-y-4">
        <p className="text-lg text-gray-700 font-semibold">
          {chickConfig === 'scattered' && 'The chicks just hatched and are scattered! Click each to count them!'}
          {chickConfig === 'line' && 'The chicks are following mommy in a line! Click each to count!'}
          {chickConfig === 'array' && 'The chicks are walking in pairs (2×2 array)! Click each to count!'}
          {chickConfig === 'separated' && 'Two pairs of chicks wandered off! Click each to count them all!'}
        </p>

        {!showCountInput ? (
          <Button 
            onClick={() => setShowCountInput(true)}
            disabled={clickedChicks.length === 0}
            className="bg-yellow-600 hover:bg-yellow-700"
            size="lg"
          >
            I Finished Counting!
          </Button>
        ) : (
          <div className="space-y-4">
            <p className="text-lg font-semibold">How many chicks did you count?</p>
            <div className="flex gap-3 justify-center">
              {[2, 3, 4, 5, 6].map(num => (
                <Button
                  key={num}
                  onClick={() => handleCountSubmit(num)}
                  variant={userCount === num ? "default" : "outline"}
                  className="w-16 h-16 text-2xl font-bold"
                  disabled={feedback !== null}
                >
                  {num}
                </Button>
              ))}
            </div>

            {feedback && (
              <div className={`p-6 rounded-lg ${
                feedback === 'correct'
                  ? 'bg-green-100 text-green-700 border-2 border-green-300'
                  : 'bg-red-100 text-red-700 border-2 border-red-300'
              }`}>
                <p className="font-bold text-xl mb-3">
                  {feedback === 'correct'
                    ? '✓ Perfect! There are 4 chicks in every arrangement!'
                    : '✗ Not quite! Try counting again by clicking each chick.'}
                </p>
                {feedback === 'correct' && (
                  <p className="mb-4">
                    {chickConfig === 'array' && 'Notice: 2 rows × 2 columns = 4 chicks!'}
                    {chickConfig === 'separated' && 'Notice: 2 pairs = 2 + 2 = 4 chicks!'}
                  </p>
                )}
                <Button 
                  onClick={feedback === 'correct' ? handleNextArrangement : handleTryAgain}
                  size="lg"
                  className={feedback === 'correct' ? 'bg-yellow-600 hover:bg-yellow-700' : ''}
                  variant={feedback === 'correct' ? 'default' : 'outline'}
                >
                  {feedback === 'correct'
                    ? (currentStageIndex >= sequence.length - 1 ? 'Continue to Practice' : 'Next Arrangement')
                    : 'Try Again'}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

// Practice Array Game Component
const PracticeArrayGame = ({ onComplete }: { onComplete: () => void }) => {
  const [showChicks, setShowChicks] = useState(false);
  const [understood, setUnderstood] = useState(false);

  return (
    <Card className="p-6 bg-orange-50 border-2 border-orange-200">
      <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">
        🎯 Practice: What About 5 Chicks?
      </h3>
      
      <div className="bg-white p-6 rounded-lg border-2 border-orange-300 mb-6">
        <p className="text-lg text-gray-700 text-center mb-6 font-semibold">
          What happens when we try to make pairs with 5 chicks?
        </p>
        
        {!showChicks ? (
          <div className="text-center">
            <Button 
              onClick={() => setShowChicks(true)}
              size="lg"
              className="bg-orange-600 hover:bg-orange-700"
            >
              Show Me 5 Chicks!
            </Button>
          </div>
        ) : (
          <div className="text-6xl text-center space-y-4">
            <div className="flex gap-12 justify-center">
              <span>🐣</span><span>🐣</span>
            </div>
            <div className="flex gap-12 justify-center">
              <span>🐣</span><span>🐣</span>
            </div>
            <div className="flex justify-center mt-6">
              <span className="animate-bounce">🐣</span>
            </div>
            <p className="text-lg text-gray-700 mt-4">
              <strong>Problem:</strong> One chick doesn't have a partner! 😢
            </p>
          </div>
        )}
      </div>

      {showChicks && !understood && (
        <div className="space-y-4">
          <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
            <p className="text-gray-700 text-center font-semibold mb-4">
              🤔 Can we make perfect pairs with 5 objects?
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => setUnderstood(true)}
                size="lg"
                variant="outline"
                className="text-lg"
              >
                No, one is left out!
              </Button>
            </div>
          </div>
        </div>
      )}

      {understood && (
        <div className="space-y-4">
          <div className="bg-green-100 p-6 rounded-lg border-2 border-green-300 text-center">
            <p className="font-bold text-xl text-green-700 mb-4">
              ✓ Correct! Great discovery!
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Important:</strong> We can't make pairs with 5 objects! One will always be left out.
            </p>
            <p className="text-gray-700">
              But with <strong>4 objects</strong>, we can make <strong>2 perfect pairs</strong> (2×2 array)!
            </p>
          </div>
          
          <Button
            onClick={onComplete}
            size="lg"
            className="w-full bg-orange-600 hover:bg-orange-700"
          >
            Finish Lesson
          </Button>
        </div>
      )}
    </Card>
  );
};

export default CountingActivity18;
// src/pages/CountingActivity18.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Star, BookOpen, Users, Lightbulb, Eye } from "lucide-react";
import { toast } from "sonner";

const CountingActivity18 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [currentStep, setCurrentStep] = useState<'warmup' | 'peekaboo' | 'jive' | 'piano' | 'chicks' | 'practice' | 'complete'>('warmup');
  const [peekabooConfig, setPeekabooConfig] = useState<'3-1' | '2-2' | '1-3' | '2-1-1'>('3-1');
  const [showPeekaboo, setShowPeekaboo] = useState(false);
  const [peekabooRound, setPeekabooRound] = useState(0);
  const [jiveStep, setJiveStep] = useState(0);
  const [pianoCount, setPianoCount] = useState(0);
  const [chickConfig, setChickConfig] = useState<'scattered' | 'line' | 'array' | 'separated'>('scattered');
  const [chickCount, setChickCount] = useState(4);
  const [practiceRound, setPracticeRound] = useState(0);

  const peekabooConfigs = [
    { type: '3-1' as const, groups: [3, 1] },
    { type: '2-2' as const, groups: [2, 2] },
    { type: '1-3' as const, groups: [1, 3] },
    { type: '2-1-1' as const, groups: [2, 1, 1] }
  ];

  const startPeekaboo = () => {
    setShowPeekaboo(true);
    setTimeout(() => {
      setShowPeekaboo(false);
    }, 2000);
  };

  const handlePeekabooAnswer = () => {
    toast.success("Correct! 🎉", { description: "4 objects total!" });
    if (peekabooRound < 3) {
      setTimeout(() => {
        setPeekabooRound(peekabooRound + 1);
        setPeekabooConfig(peekabooConfigs[peekabooRound + 1].type);
        startPeekaboo();
      }, 1500);
    } else {
      setTimeout(() => setCurrentStep('jive'), 1500);
    }
  };

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
        toast.success("Perfect! You counted to 5 the Math Way! 🎹");
        setTimeout(() => setCurrentStep('chicks'), 1500);
      }
    }
  };

  const handleChickArrangement = () => {
    const sequence: Array<typeof chickConfig> = ['scattered', 'line', 'array', 'separated', 'array'];
    const currentIndex = sequence.indexOf(chickConfig);
    
    if (currentIndex < sequence.length - 1) {
      setChickConfig(sequence[currentIndex + 1]);
      
      if (sequence[currentIndex + 1] === 'array') {
        toast.success("Pairs! 🐣", { description: "Each chick has a partner!" });
      } else if (sequence[currentIndex + 1] === 'separated') {
        toast.info("Pairs wandering! 👀", { description: "Two groups of 2!" });
      }
    } else {
      setCurrentStep('practice');
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
            {currentStep === 'peekaboo' && (
              <Card className="p-6 bg-green-50 border-2 border-green-200 text-center">
                <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center justify-center gap-2">
                  <Eye className="w-6 h-6" />
                  Peek-a-Boo Counting!
                </h3>
                
                {showPeekaboo ? (
                  <div className="mb-6">
                    <p className="text-lg text-gray-700 mb-4">Quick! Look at the objects!</p>
                    <div className="flex justify-center gap-8 text-6xl mb-4">
                      {peekabooConfigs[peekabooRound].groups.map((group, groupIndex) => (
                        <div key={groupIndex} className="flex gap-2">
                          {Array(group).fill('🐻').map((bear, i) => (
                            <span key={i}>{bear}</span>
                          ))}
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">Notice the groups!</p>
                  </div>
                ) : (
                  <div className="mb-6">
                    <p className="text-lg text-gray-700 mb-4">How many objects in total?</p>
                    <Button onClick={handlePeekabooAnswer} size="lg" className="text-3xl py-8 px-12">
                      4
                    </Button>
                    <p className="text-sm text-gray-600 mt-4">
                      Round {peekabooRound + 1} of 4
                    </p>
                  </div>
                )}

                {!showPeekaboo && peekabooRound === 0 && (
                  <Button onClick={startPeekaboo} className="mt-4">
                    Start Peek-a-Boo!
                  </Button>
                )}
              </Card>
            )}

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
            {currentStep === 'chicks' && (
              <Card className="p-6 bg-yellow-50 border-2 border-yellow-200">
                <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">
                  🐣 Help the Baby Chicks!
                </h3>
                
                <div className="relative bg-gradient-to-b from-green-200 to-green-300 rounded-xl border-4 border-green-500 p-8 mb-6 min-h-[300px]">
                  {/* Mother Hen */}
                  <div className="text-center mb-6">
                    <div className="text-6xl">🐔</div>
                    <p className="text-sm text-gray-700 font-bold">Mother Hen</p>
                  </div>

                  {/* Baby Chicks in Different Configurations */}
                  <div className="flex items-center justify-center">
                    {chickConfig === 'scattered' && (
                      <div className="relative w-full h-40">
                        <div className="absolute top-4 left-8 text-5xl">🐣</div>
                        <div className="absolute top-12 right-12 text-5xl">🐣</div>
                        <div className="absolute bottom-8 left-20 text-5xl">🐣</div>
                        <div className="absolute bottom-4 right-8 text-5xl">🐣</div>
                      </div>
                    )}

                    {chickConfig === 'line' && (
                      <div className="flex gap-3 text-5xl">
                        <span>🐣</span><span>🐣</span><span>🐣</span><span>🐣</span>
                      </div>
                    )}

                    {chickConfig === 'array' && (
                      <div className="text-5xl">
                        <div className="flex gap-8 justify-center mb-4">
                          <span>🐣</span><span>🐣</span>
                        </div>
                        <div className="flex gap-8 justify-center">
                          <span>🐣</span><span>🐣</span>
                        </div>
                      </div>
                    )}

                    {chickConfig === 'separated' && (
                      <div className="flex gap-16 text-5xl">
                        <div>
                          <div className="flex gap-3">
                            <span>🐣</span><span>🐣</span>
                          </div>
                          <p className="text-sm text-gray-700 text-center mt-2">Pair 1</p>
                        </div>
                        <div>
                          <div className="flex gap-3">
                            <span>🐣</span><span>🐣</span>
                          </div>
                          <p className="text-sm text-gray-700 text-center mt-2">Pair 2</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-center mb-4">
                  <p className="text-lg text-gray-700 mb-2">
                    {chickConfig === 'scattered' && 'The chicks just hatched and are scattered!'}
                    {chickConfig === 'line' && 'The chicks are following mommy in a line!'}
                    {chickConfig === 'array' && 'The chicks are walking in pairs (2×2 array)!'}
                    {chickConfig === 'separated' && 'Two pairs of chicks wandered off together!'}
                  </p>
                  <p className="text-2xl font-bold text-orange-700">
                    How many chicks? <span className="text-4xl">{chickCount}</span>
                  </p>
                </div>

                <Button 
                  onClick={handleChickArrangement}
                  size="lg"
                  className="w-full bg-yellow-600 hover:bg-yellow-700"
                >
                  {chickConfig === 'scattered' ? 'Make a Line' : 
                   chickConfig === 'line' ? 'Make Pairs' :
                   chickConfig === 'array' ? 'Separate Pairs' :
                   'Back to Array'}
                </Button>
              </Card>
            )}

            {/* Practice */}
            {currentStep === 'practice' && (
              <Card className="p-6 bg-orange-50 border-2 border-orange-200">
                <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">
                  🎯 Practice Time: Add a 5th Chick!
                </h3>
                
                <div className="bg-white p-6 rounded-lg border-2 border-orange-300 mb-6">
                  <p className="text-lg text-gray-700 text-center mb-4">
                    What happens when we add a 5th chick to our pairs?
                  </p>
                  
                  <div className="text-5xl text-center mb-4">
                    <div className="flex gap-8 justify-center mb-4">
                      <span>🐣</span><span>🐣</span>
                    </div>
                    <div className="flex gap-8 justify-center mb-4">
                      <span>🐣</span><span>🐣</span>
                    </div>
                    <div className="flex justify-center">
                      <span className="animate-bounce">🐣</span>
                    </div>
                  </div>

                  <p className="text-center text-gray-700">
                    <strong>Problem:</strong> One chick doesn't have a partner! 😢
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200 mb-4">
                  <p className="text-sm text-gray-700 text-center">
                    <strong>Important Discovery:</strong> We can't make pairs with 5 objects! 
                    One will always be left out. But with 4 objects, we can make perfect pairs!
                  </p>
                </div>

                <Button
                  onClick={() => setCurrentStep('complete')}
                  size="lg"
                  className="w-full bg-orange-600 hover:bg-orange-700"
                >
                  Finish Lesson
                </Button>
              </Card>
            )}

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

export default CountingActivity18;

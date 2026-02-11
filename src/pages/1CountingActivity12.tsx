// src/pages/CountingActivity12.tsx
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Star, BookOpen, Users, Lightbulb, CheckCircle2, Eye } from "lucide-react";
import { toast } from "sonner";

interface NumberMatch {
  id: number;
  numeral: number;
  objects: string[];
  emoji: string;
}

const CountingActivity12 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [currentStep, setCurrentStep] = useState<'fingers' | 'peekaboo' | 'matching' | 'partner' | 'complete'>('fingers');
  
  const markLessonComplete = (lessonId: number) => {
    const saved = localStorage.getItem('ethiostem-completed-lessons');
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes(lessonId)) {
      completed.push(lessonId);
      localStorage.setItem('ethiostem-completed-lessons', JSON.stringify(completed));
    }
  };
  const [selectedNumeral, setSelectedNumeral] = useState<number | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [currentPeekaboo, setCurrentPeekaboo] = useState(0);
  const [showPeekaboo, setShowPeekaboo] = useState(false);

  // Finger questions
  const fingerQuestions = useMemo(() => [1, 2, 3, 2, 1, 3].sort(() => Math.random() - 0.5), []);
  const [currentFingerQ, setCurrentFingerQ] = useState(0);

  // Peekaboo sequences
  const peekabooSequences = useMemo(() => [1, 2, 3, 2, 1, 3].sort(() => Math.random() - 0.5), []);
  const [peekabooCount, setPeekabooCount] = useState<number | null>(null);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Number matching items (1 flower, 2 bees, 3 bluebirds)
  const numberMatches = useMemo(() => [
    { id: 1, numeral: 1, objects: ["🌸"], emoji: "🌸" },
    { id: 2, numeral: 2, objects: ["🐝", "🐝"], emoji: "🐝" },
    { id: 3, numeral: 3, objects: ["🐦", "🐦", "🐦"], emoji: "🐦" },
  ].sort(() => Math.random() - 0.5), []);

  // Partner practice items
  const partnerItems = useMemo(() => [
    { id: 1, count: 1, emoji: "⭐" },
    { id: 2, count: 2, emoji: "🍎" },
    { id: 3, count: 3, emoji: "🎨" },
    { id: 4, count: 1, emoji: "🎵" },
    { id: 5, count: 2, emoji: "🌈" },
    { id: 6, count: 3, emoji: "🦋" },
  ].sort(() => Math.random() - 0.5), []);

  const [currentPartnerItem, setCurrentPartnerItem] = useState(0);
  const [partnerAnswer, setPartnerAnswer] = useState<number | null>(null);
  const [showPartnerFeedback, setShowPartnerFeedback] = useState(false);

  const handleFingerAnswer = (count: number) => {
    if (count === fingerQuestions[currentFingerQ]) {
      toast.success("Perfect! 🎉", { description: `That's ${count} finger${count > 1 ? 's' : ''}!` });
      if (currentFingerQ < fingerQuestions.length - 1) {
        setCurrentFingerQ(currentFingerQ + 1);
      } else {
        setCurrentStep('peekaboo');
      }
    } else {
      toast.error("Try again! 🤔", { description: "Count your fingers carefully." });
    }
  };

  const startPeekaboo = () => {
    setShowPeekaboo(true);
    setTimeout(() => {
      setShowPeekaboo(false);
    }, 2000);
  };

  const handlePeekabooAnswer = (count: number) => {
    const isCorrect = count === peekabooSequences[currentPeekaboo];
    setLastAnswerCorrect(isCorrect);
    setShowFeedback(true);
    setPeekabooCount(count);

    if (isCorrect) {
      toast.success("Great memory! 🎉", { description: `You remembered ${count} object${count > 1 ? 's' : ''}!` });
      setTimeout(() => {
        if (currentPeekaboo < peekabooSequences.length - 1) {
          setCurrentPeekaboo(currentPeekaboo + 1);
          setPeekabooCount(null);
          setShowFeedback(false);
          startPeekaboo();
        } else {
          setCurrentStep('matching');
          setShowFeedback(false);
        }
      }, 1500);
    } else {
      toast.error("Let's try again! 🤔", { description: "Look carefully next time!" });
      setTimeout(() => {
        setPeekabooCount(null);
        setShowFeedback(false);
      }, 1500);
    }
  };

  const handleNumeralClick = (numeral: number) => {
    setSelectedNumeral(numeral);
  };

  const handleObjectGroupClick = (item: NumberMatch) => {
    if (!selectedNumeral) {
      toast.info("Pick a number first! 🔢", { description: "Click on a number 1, 2, or 3 above." });
      return;
    }

    if (selectedNumeral === item.numeral) {
      toast.success("Perfect match! 🎉", { 
        description: `${item.numeral} matches ${item.numeral} ${item.emoji}!` 
      });
      setMatchedPairs([...matchedPairs, item.id]);
      setSelectedNumeral(null);

      if (matchedPairs.length + 1 === numberMatches.length) {
        setTimeout(() => setCurrentStep('partner'), 1000);
      }
    } else {
      toast.error("Not quite! 🤔", { 
        description: `Count the ${item.emoji} carefully.` 
      });
    }
  };

  const handlePartnerAnswer = (numeral: number) => {
    const currentItem = partnerItems[currentPartnerItem];
    setPartnerAnswer(numeral);
    setShowPartnerFeedback(true);
    
    if (numeral === currentItem.count) {
      toast.success("Correct! 🎉", { description: `Yes, there ${currentItem.count === 1 ? 'is' : 'are'} ${currentItem.count}!` });
      if (currentPartnerItem < partnerItems.length - 1) {
        setTimeout(() => {
          setCurrentPartnerItem(currentPartnerItem + 1);
          setPartnerAnswer(null);
          setShowPartnerFeedback(false);
        }, 1500);
      } else {
        setTimeout(() => {
          setCurrentStep('complete');
          markLessonComplete(12);
        }, 1500);
      }
    } else {
      toast.error("Try counting again! 🤔", { description: "Count each object carefully." });
      setTimeout(() => {
        setPartnerAnswer(null);
        setShowPartnerFeedback(false);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
                Lesson 12
              </span>
              <h1 className="text-2xl font-bold text-gray-800">Match Numbers to Quantities</h1>
            </div>
            <p className="text-sm text-gray-600">Topic C: Counting to 3</p>
          </div>
        </div>

        {!showGame ? (
          <div className="space-y-6">
            {/* Learning Objective */}
            <Card className="border-2 border-purple-200 bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl text-purple-700">
                  <Star className="w-6 h-6" />
                  Learning Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-700">
                  Today, your child will learn to <span className="font-bold text-purple-700">match the numerals 1, 2, and 3 to quantities</span>, 
                  connecting written numbers to groups of objects.
                </p>
              </CardContent>
            </Card>

            {/* Introduction */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">Numbers Match Amounts!</CardTitle>
                <CardDescription>Read this together with your child</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
                  <p className="text-lg text-gray-700 mb-4">
                    Today we'll learn about the <strong>numbers</strong> 1, 2, and 3 and match them to groups of objects!
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-white p-4 rounded-lg border-2 border-blue-200 text-center">
                      <div className="text-6xl font-bold text-blue-700 mb-2">1</div>
                      <div className="text-4xl mb-2">🌸</div>
                      <p className="text-sm text-gray-600">1 flower</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border-2 border-green-200 text-center">
                      <div className="text-6xl font-bold text-green-700 mb-2">2</div>
                      <div className="text-4xl mb-2">🐝 🐝</div>
                      <p className="text-sm text-gray-600">2 bees</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border-2 border-orange-200 text-center">
                      <div className="text-6xl font-bold text-orange-700 mb-2">3</div>
                      <div className="text-4xl mb-2">🐦 🐦 🐦</div>
                      <p className="text-sm text-gray-600">3 bluebirds</p>
                    </div>
                  </div>
                </div>

                {/* Rhyme */}
                <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                  <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="text-2xl">🎵</span> Let's Learn a Rhyme!
                  </h4>
                  <p className="text-gray-700 italic">
                    One little flower, 2 little bees,<br/>
                    3 little bluebirds in a tree.<br/>
                    Nice warm sun shines down on me.<br/>
                    I can count! 1, 2, 3.
                  </p>
                </div>

                {/* Game Instructions */}
                <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
                  <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="text-2xl">🎮</span> How to Play
                  </h4>
                  <ol className="text-sm text-gray-600 space-y-2 ml-6">
                    <li><strong>1.</strong> Show fingers for numbers 1, 2, and 3</li>
                    <li><strong>2.</strong> Peek-a-boo counting: Remember what you see!</li>
                    <li><strong>3.</strong> Match numbers to groups of objects</li>
                    <li><strong>4.</strong> Partner practice: Count and find the right number</li>
                  </ol>
                </div>

                {/* Parent Tips */}
                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border-2 border-green-200">
                  <Users className="w-8 h-8 text-green-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Parent Tips:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Point to each numeral and say its name: "This is number 1"</li>
                      <li>• Help count objects: "Let's count together: 1, 2, 3"</li>
                      <li>• Ask: "Which number matches this group?"</li>
                      <li>• Practice finding numbers around the house!</li>
                    </ul>
                  </div>
                </div>

                {/* Key Vocabulary */}
                <div className="bg-pink-50 p-4 rounded-lg border-2 border-pink-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-5 h-5 text-pink-600" />
                    <h4 className="font-bold text-gray-800">Key Words</h4>
                  </div>
                  <div className="grid md:grid-cols-3 gap-3">
                    <div className="bg-white p-3 rounded-lg">
                      <p className="font-bold text-purple-700">Numeral</p>
                      <p className="text-sm text-gray-600">The written number symbol</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="font-bold text-purple-700">Quantity</p>
                      <p className="text-sm text-gray-600">How many objects there are</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="font-bold text-purple-700">Match</p>
                      <p className="text-sm text-gray-600">Put together things that go together</p>
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
                className="text-lg px-8 py-6 bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-xl transition-all"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Start Number Matching
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Finger Warm-up */}
            {currentStep === 'fingers' && (
              <Card className="p-6 bg-blue-50 border-2 border-blue-200">
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  👋 Show Me Fingers!
                </h3>
                <p className="text-lg text-gray-700 mb-4">
                  Show me <strong className="text-blue-700 text-3xl">{fingerQuestions[currentFingerQ]}</strong> finger{fingerQuestions[currentFingerQ] > 1 ? 's' : ''}!
                </p>
                <div className="flex gap-4 justify-center">
                  {[1, 2, 3].map(num => (
                    <Button
                      key={num}
                      onClick={() => handleFingerAnswer(num)}
                      size="lg"
                      className="text-4xl py-8 bg-white text-gray-800 hover:bg-blue-100"
                    >
                      {num === 1 ? '☝️' : num === 2 ? '✌️' : '🤚'}
                    </Button>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-4 text-center">
                  Question {currentFingerQ + 1} of {fingerQuestions.length}
                </p>
              </Card>
            )}

            {/* Peek-a-Boo Game */}
            {currentStep === 'peekaboo' && (
              <Card className="p-6 bg-green-50 border-2 border-green-200 text-center">
                <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center justify-center gap-2">
                  <Eye className="w-6 h-6" />
                  Peek-a-Boo Counting!
                </h3>
                
                {showPeekaboo ? (
                  <div className="mb-6">
                    <p className="text-lg text-gray-700 mb-4">Quick! Look at the objects!</p>
                    <div className="text-8xl mb-4 animate-pulse">
                      {Array(peekabooSequences[currentPeekaboo]).fill("📦").map((emoji, index) => (
                        <span key={index}>{emoji}</span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">Remember how many you saw!</p>
                  </div>
                ) : (
                  <div className="mb-6">
                    <p className="text-lg text-gray-700 mb-4">
                      How many objects did you see?
                    </p>
                    <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                      {[1, 2, 3].map(number => {
                        const isThisCorrectAnswer = number === peekabooSequences[currentPeekaboo];
                        const wasClicked = number === peekabooCount;
                        
                        return (
                          <div key={number} className="relative">
                            <Button
                              onClick={() => handlePeekabooAnswer(number)}
                              size="lg"
                              className={`h-20 text-2xl font-bold border-2 text-gray-800 relative z-10 ${
                                showFeedback && wasClicked
                                  ? lastAnswerCorrect 
                                    ? 'bg-green-100 border-green-500' 
                                    : 'bg-red-100 border-red-500'
                                  : showFeedback && isThisCorrectAnswer && !lastAnswerCorrect
                                  ? 'bg-green-100 border-green-500'
                                  : 'bg-white hover:bg-green-100 border-green-300'
                              }`}
                            >
                              {number}
                            </Button>
                            {showFeedback && wasClicked && (
                              <div className="absolute -top-2 -right-2 z-20">
                                {lastAnswerCorrect ? (
                                  <div className="bg-green-500 text-white rounded-full p-1 animate-bounce">
                                    <CheckCircle2 className="w-6 h-6" />
                                  </div>
                                ) : (
                                  <div className="bg-red-500 text-white rounded-full p-1 animate-bounce">
                                    <span className="w-6 h-6 flex items-center justify-center font-bold">✕</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <p className="text-sm text-gray-600 mt-4">
                      Question {currentPeekaboo + 1} of {peekabooSequences.length}
                    </p>
                  </div>
                )}

                {!showPeekaboo && currentPeekaboo === 0 && peekabooCount === null && (
                  <Button onClick={startPeekaboo} className="mt-4">
                    Start Peek-a-Boo!
                  </Button>
                )}
              </Card>
            )}

            {/* Number Matching */}
            {currentStep === 'matching' && (
              <>
                <Card className="p-6 bg-purple-50 border-2 border-purple-200">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">
                    🔢 Match Numbers to Objects
                  </h3>
                  <p className="text-gray-700 mb-4">
                    First, click a number. Then click the group that has that many objects!
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="flex-1 bg-white p-2 rounded border">
                      Matched: {matchedPairs.length} of {numberMatches.length}
                    </div>
                  </div>
                </Card>

                {/* Number Buttons */}
                <Card className="p-6 bg-blue-50 border-2 border-blue-200">
                  <h3 className="text-lg font-bold mb-4 text-gray-800 text-center">
                    Pick a Number:
                  </h3>
                  <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                    {[1, 2, 3].map(num => (
                      <Button
                        key={num}
                        onClick={() => handleNumeralClick(num)}
                        size="lg"
                        className={`h-24 text-5xl font-bold ${
                          selectedNumeral === num
                            ? 'bg-blue-600 text-white border-4 border-blue-700'
                            : 'bg-white text-gray-800 hover:bg-blue-100 border-2 border-blue-300'
                        }`}
                      >
                        {num}
                      </Button>
                    ))}
                  </div>
                </Card>

                {/* Object Groups */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {numberMatches.map(item => {
                    const isMatched = matchedPairs.includes(item.id);
                    
                    return (
                      <Card
                        key={item.id}
                        onClick={() => !isMatched && handleObjectGroupClick(item)}
                        className={`
                          text-center p-6 cursor-pointer transition-all
                          ${isMatched 
                            ? 'opacity-50 border-4 border-green-500 bg-green-50' 
                            : 'hover:scale-105 hover:border-purple-300 border-2'
                          }
                        `}
                      >
                        <div className="text-6xl mb-3">
                          {item.objects.map((emoji, index) => (
                            <span key={index} className="inline-block mx-1">{emoji}</span>
                          ))}
                        </div>
                        <p className="text-sm text-gray-600">
                          {item.numeral} {item.emoji}
                          {isMatched && <CheckCircle2 className="w-4 h-4 text-green-600 inline ml-1" />}
                        </p>
                      </Card>
                    );
                  })}
                </div>
              </>
            )}

            {/* Partner Practice */}
            {currentStep === 'partner' && (
              <>
                <Card className="p-6 bg-yellow-50 border-2 border-yellow-200">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">
                    👥 Partner Practice
                  </h3>
                  <p className="text-gray-700 mb-2">
                    Count the objects below, then click the correct number!
                  </p>
                  <div className="text-sm text-gray-600">
                    Question {currentPartnerItem + 1} of {partnerItems.length}
                  </div>
                </Card>

                {/* Current Item */}
                <Card className="p-8 bg-white border-2 border-purple-200 text-center">
                  <p className="text-lg text-gray-700 mb-4 font-semibold">
                    How many objects are there?
                  </p>
                  <div className="text-7xl mb-6">
                    {Array(partnerItems[currentPartnerItem].count).fill(partnerItems[currentPartnerItem].emoji).map((emoji, index) => (
                      <span key={index} className="inline-block mx-2">{emoji}</span>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                    {[1, 2, 3].map(num => {
                      const isCorrect = num === partnerItems[currentPartnerItem].count;
                      const wasClicked = num === partnerAnswer;
                      
                      return (
                        <Button
                          key={num}
                          onClick={() => handlePartnerAnswer(num)}
                          size="lg"
                          className={`h-20 text-3xl font-bold ${
                            showPartnerFeedback && wasClicked
                              ? isCorrect
                                ? 'bg-green-100 border-4 border-green-500'
                                : 'bg-red-100 border-4 border-red-500'
                              : showPartnerFeedback && isCorrect
                              ? 'bg-green-100 border-4 border-green-500'
                              : 'bg-white text-gray-800 hover:bg-purple-100 border-2 border-purple-300'
                          }`}
                        >
                          {num}
                        </Button>
                      );
                    })}
                  </div>
                </Card>
              </>
            )}

            {/* Completion */}
            {currentStep === 'complete' && (
              <Card className="bg-gradient-to-br from-purple-100 to-pink-100 border-4 border-purple-400 p-8 text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-3xl font-bold mb-3 text-gray-800">Amazing Number Work!</h3>
                <p className="text-lg text-gray-700 mb-4">
                  You can match numerals to quantities like a pro! You know your numbers 1, 2, and 3!
                </p>
                <div className="grid grid-cols-3 gap-4 mb-6 max-w-md mx-auto">
                  {[1, 2, 3].map(num => (
                    <div key={num} className="bg-white p-4 rounded-lg border-2 border-purple-300">
                      <div className="text-5xl font-bold text-purple-700 mb-2">{num}</div>
                      <div className="text-3xl">
                        {num === 1 ? '🌸' : num === 2 ? '🐝 🐝' : '🐦 🐦 🐦'}
                      </div>
                    </div>
                  ))}
                </div>
                <Button 
                  size="lg"
                  onClick={() => navigate('/activities')}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Back to Activities
                </Button>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CountingActivity12;

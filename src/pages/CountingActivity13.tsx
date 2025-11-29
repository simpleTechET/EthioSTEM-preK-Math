// src/pages/CountingActivity13.tsx
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Star, BookOpen, Users, Lightbulb, CheckCircle2, Dice5 } from "lucide-react";
import { toast } from "sonner";

const CountingActivity13 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [currentStep, setCurrentStep] = useState<'warmup' | 'matching' | 'groupMaking' | 'complete'>('warmup');
  const [dieRoll, setDieRoll] = useState<number | null>(null);
  const [puffballCount, setPuffballCount] = useState<number>(0);
  const [stickCount, setStickCount] = useState<number>(0);
  const [selectedNumeral, setSelectedNumeral] = useState<number | null>(null);
  const [jiveStep, setJiveStep] = useState(0);

  // Die faces (1-3 only as per curriculum)
  const dieFaces = useMemo(() => [1, 2, 3], []);

  // Jive chant actions
  const jiveChant = [
    { count: "1, 2,", action: "tie my shoe", emoji: "👟" },
    { count: "3, 4,", action: "close the door", emoji: "🚪" },
    { count: "On 5,", action: "we jive", emoji: "💃" },
    { count: "On 5,", action: "we jive", emoji: "🕺" }
  ];

  const rollDie = () => {
    const roll = dieFaces[Math.floor(Math.random() * dieFaces.length)];
    setDieRoll(roll);
    toast.info(`You rolled ${roll}!`, { description: `Count the dots and make groups of ${roll}!` });
  };

  const handleJiveStep = () => {
    setJiveStep((prev) => {
      if (prev < jiveChant.length - 1) {
        return prev + 1;
      } else {
        setCurrentStep('matching');
        return 0;
      }
    });
  };

  const addPuffball = () => {
    if (puffballCount < 3) {
      setPuffballCount(puffballCount + 1);
    }
  };

  const removePuffball = () => {
    if (puffballCount > 0) {
      setPuffballCount(puffballCount - 1);
    }
  };

  const addStick = () => {
    if (stickCount < 3) {
      setStickCount(stickCount + 1);
    }
  };

  const removeStick = () => {
    if (stickCount > 0) {
      setStickCount(stickCount - 1);
    }
  };

  const checkGroup = () => {
    if (dieRoll === null) {
      toast.error("Roll the die first!", { description: "Click the die to roll a number." });
      return;
    }

    if (puffballCount === dieRoll && stickCount === dieRoll && selectedNumeral === dieRoll) {
      toast.success("Perfect match! 🎉", { 
        description: `All groups show the number ${dieRoll}!` 
      });
      setTimeout(() => {
        setCurrentStep('complete');
      }, 2000);
    } else {
      toast.error("Not quite! 🤔", { 
        description: "Make sure all groups match the die roll number." 
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
                Lesson 13
              </span>
              <h1 className="text-2xl font-bold text-gray-800">Make Groups & Match Numbers</h1>
            </div>
            <p className="text-sm text-gray-600">Topic D: Numbers 1-3</p>
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
                  Today, your child will learn to <span className="font-bold text-purple-700">make groups of up to 3 objects and match them to numerals</span>, 
                  connecting concrete objects to abstract number symbols.
                </p>
              </CardContent>
            </Card>

            {/* Introduction */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">From Objects to Numbers</CardTitle>
                <CardDescription>Read this together with your child</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
                  <p className="text-lg text-gray-700 mb-4">
                    Today we'll connect real objects to numbers! We'll roll dice, count dots, and create matching groups.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-white p-4 rounded-lg border-2 border-pink-200 text-center">
                      <div className="text-3xl mb-2">⚫⚫⚫</div>
                      <p className="font-bold text-pink-700">Dots</p>
                      <p className="text-sm text-gray-600">Count the dots on the die</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border-2 border-blue-200 text-center">
                      <div className="text-3xl mb-2">🟡🟡🟡</div>
                      <p className="font-bold text-blue-700">Objects</p>
                      <p className="text-sm text-gray-600">Make groups of objects</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border-2 border-green-200 text-center">
                      <div className="text-3xl mb-2">123</div>
                      <p className="font-bold text-green-700">Numbers</p>
                      <p className="text-sm text-gray-600">Match to numerals</p>
                    </div>
                  </div>
                </div>

                {/* Real World Connection */}
                <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                  <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="text-2xl">🌍</span> Real World Math
                  </h4>
                  <p className="text-sm text-gray-600">
                    Just like chefs count ingredients for recipes or builders count materials for projects, 
                    we're learning to match quantities to numbers - a skill used every day!
                  </p>
                </div>

                {/* Game Instructions */}
                <div className="bg-pink-50 p-4 rounded-lg border-2 border-pink-200">
                  <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="text-2xl">🎮</span> How to Play
                  </h4>
                  <ol className="text-sm text-gray-600 space-y-2 ml-6">
                    <li><strong>1.</strong> Roll the die and count the dots</li>
                    <li><strong>2.</strong> Make groups with the same number of puffballs and sticks</li>
                    <li><strong>3.</strong> Find the matching numeral card</li>
                    <li><strong>4.</strong> Make all three match: dots, objects, and number!</li>
                  </ol>
                </div>

                {/* Parent Tips */}
                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border-2 border-green-200">
                  <Users className="w-8 h-8 text-green-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Parent Tips:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Help your child count each object as they add it</li>
                      <li>• Ask: "How many dots? How many puffballs? What number is that?"</li>
                      <li>• Point out that the number stays the same across all representations</li>
                      <li>• Practice with household items: "Can you make a group of 3 spoons?"</li>
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
                      <p className="font-bold text-purple-700">Group</p>
                      <p className="text-sm text-gray-600">A collection of objects</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="font-bold text-purple-700">Match</p>
                      <p className="text-sm text-gray-600">Make things the same</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="font-bold text-purple-700">Numeral</p>
                      <p className="text-sm text-gray-600">Number symbol like 1, 2, 3</p>
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
                Start Group Making Activity
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Warm-up Activities */}
            {currentStep === 'warmup' && (
              <>
                {/* Dot Path Parking Lot */}
                <Card className="p-6 bg-green-50 border-2 border-green-200">
                  <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                    <span className="text-2xl">🚗</span>
                    Dot Path Parking Lot Warm-up
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Let's practice one-to-one correspondence! Each car gets its own numbered space.
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg border-2 border-gray-300 mb-4">
                    <div className="grid grid-cols-5 gap-2 max-w-md mx-auto">
                      {[1, 2, 3, 4, 5].map(spot => (
                        <div
                          key={spot}
                          className="text-center p-3 border-2 border-gray-400 rounded-lg bg-gray-50"
                        >
                          <div className="text-lg font-bold text-gray-700 mb-1">●</div>
                          <div className="h-10 flex items-center justify-center">
                            <div className="text-xl">🚗</div>
                          </div>
                          <div className="text-xs text-gray-600">Space {spot}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 text-center mb-4">
                    "One car, one space!" - Just like each object in our groups gets counted once!
                  </p>

                  <Button onClick={() => setCurrentStep('matching')} className="w-full">
                    Ready for Number Matching!
                  </Button>
                </Card>

                {/* On 5 We Jive Chant */}
                <Card className="p-6 bg-pink-50 border-2 border-pink-200 text-center">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">
                    On 5 We Jive Chant!
                  </h3>
                  
                  <div className="bg-white p-6 rounded-lg border-2 border-pink-300 mb-4">
                    <div className="text-3xl font-bold text-purple-700 mb-4">
                      {jiveChant[jiveStep].count}
                    </div>
                    <div className="text-2xl font-bold text-pink-600 animate-bounce">
                      {jiveChant[jiveStep].action}
                    </div>
                    <div className="text-4xl mt-4">
                      {jiveChant[jiveStep].emoji}
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">
                    Let's chant and move together! This helps us practice counting to 5.
                  </p>

                  <Button onClick={handleJiveStep} className="bg-pink-600 hover:bg-pink-700">
                    {jiveStep === 0 ? 'Start Chanting!' : 'Next Action!'}
                  </Button>
                </Card>
              </>
            )}

            {/* Number Matching Game */}
            {currentStep === 'matching' && (
              <>
                <Card className="p-6 bg-blue-50 border-2 border-blue-200">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">
                    🔢 Number Matching Practice
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Look at the dots and find the matching numeral! This helps us connect quantities to numbers.
                  </p>
                </Card>

                <div className="grid md:grid-cols-3 gap-4">
                  {[1, 2, 3].map(number => (
                    <Card key={number} className="text-center p-6 bg-white border-2 border-gray-200">
                      <div className="text-4xl font-bold text-gray-800 mb-4">
                        {Array(number).fill('●').join(' ')}
                      </div>
                      <p className="text-lg text-gray-600 mb-4">{number} dot{number > 1 ? 's' : ''}</p>
                      <div className="text-5xl font-bold text-blue-700">
                        {number}
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="text-center">
                  <Button onClick={() => setCurrentStep('groupMaking')} className="bg-blue-600 hover:bg-blue-700">
                    Ready to Make Groups!
                  </Button>
                </div>
              </>
            )}

            {/* Group Making Game */}
            {currentStep === 'groupMaking' && (
              <>
                <Card className="p-6 bg-purple-50 border-2 border-purple-200">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">
                    🎲 Make Matching Groups!
                  </h3>
                  <p className="text-gray-700 mb-2">
                    Roll the die, count the dots, and make groups with the same number of puffballs and sticks!
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex-1 bg-white p-2 rounded border text-center">
                      Target Number: {dieRoll ? dieRoll : 'Roll the die!'}
                    </div>
                  </div>
                </Card>

                {/* Die Roll */}
                <Card className="p-6 bg-white border-2 border-gray-200 text-center">
                  <h3 className="text-lg font-bold mb-4 text-gray-800">Roll the Die!</h3>
                  <div className="text-8xl mb-4 cursor-pointer hover:scale-110 transition-all" onClick={rollDie}>
                    {dieRoll ? (
                      <div className="text-6xl font-bold text-purple-700">
                        {Array(dieRoll).fill('⚫').join('')}
                      </div>
                    ) : (
                      <Dice5 className="w-32 h-32 mx-auto text-gray-400" />
                    )}
                  </div>
                  <Button onClick={rollDie} disabled={dieRoll !== null}>
                    {dieRoll ? `Rolled: ${dieRoll}` : 'Roll Die'}
                  </Button>
                </Card>

                {/* Groups */}
                <div className="grid md:grid-cols-3 gap-4">
                  {/* Puffballs */}
                  <Card className="p-6 bg-yellow-50 border-2 border-yellow-200 text-center">
                    <h3 className="text-lg font-bold mb-4 text-gray-800">🟡 Puffballs</h3>
                    <div className="text-6xl mb-4 min-h-[80px]">
                      {Array(puffballCount).fill('🟡').join(' ')}
                    </div>
                    <div className="flex gap-2 justify-center">
                      <Button onClick={removePuffball} disabled={puffballCount === 0} size="sm">
                        -
                      </Button>
                      <span className="px-4 py-2 bg-white rounded border">{puffballCount}</span>
                      <Button onClick={addPuffball} disabled={puffballCount === 3} size="sm">
                        +
                      </Button>
                    </div>
                  </Card>

                  {/* Sticks */}
                  <Card className="p-6 bg-green-50 border-2 border-green-200 text-center">
                    <h3 className="text-lg font-bold mb-4 text-gray-800">🎋 Sticks</h3>
                    <div className="text-6xl mb-4 min-h-[80px]">
                      {Array(stickCount).fill('🎋').join(' ')}
                    </div>
                    <div className="flex gap-2 justify-center">
                      <Button onClick={removeStick} disabled={stickCount === 0} size="sm">
                        -
                      </Button>
                      <span className="px-4 py-2 bg-white rounded border">{stickCount}</span>
                      <Button onClick={addStick} disabled={stickCount === 3} size="sm">
                        +
                      </Button>
                    </div>
                  </Card>

                  {/* Numeral */}
                  <Card className="p-6 bg-blue-50 border-2 border-blue-200 text-center">
                    <h3 className="text-lg font-bold mb-4 text-gray-800">🔢 Numeral</h3>
                    <div className="text-6xl mb-4 min-h-[80px] flex items-center justify-center">
                      {selectedNumeral ? (
                        <span className="text-8xl font-bold text-blue-700">{selectedNumeral}</span>
                      ) : (
                        <span className="text-gray-400">?</span>
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3].map(num => (
                        <Button
                          key={num}
                          onClick={() => setSelectedNumeral(num)}
                          variant={selectedNumeral === num ? "default" : "outline"}
                          size="sm"
                        >
                          {num}
                        </Button>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* Check Button */}
                <div className="text-center">
                  <Button 
                    onClick={checkGroup}
                    size="lg"
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Check My Groups
                  </Button>
                </div>
              </>
            )}

            {/* Completion */}
            {currentStep === 'complete' && (
              <Card className="bg-gradient-to-br from-purple-100 to-pink-100 border-4 border-purple-400 p-8 text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-3xl font-bold mb-3 text-gray-800">Amazing Group Making!</h3>
                <p className="text-lg text-gray-700 mb-4">
                  You perfectly matched dots, objects, and numerals! You're becoming a number expert!
                </p>
                <div className="bg-white p-4 rounded-lg border-2 border-purple-300 mb-6">
                  <p className="text-sm text-gray-600">
                    <strong>You showed that {dieRoll} means:</strong><br/>
                    • {dieRoll} dot{dieRoll && dieRoll > 1 ? 's' : ''} on the die<br/>
                    • {dieRoll} puffball{dieRoll && dieRoll > 1 ? 's' : ''}<br/>
                    • {dieRoll} stick{dieRoll && dieRoll > 1 ? 's' : ''}<br/>
                    • The numeral {dieRoll}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default CountingActivity13;

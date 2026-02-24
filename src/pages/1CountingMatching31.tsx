import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Music, Flower2, Check, X, RotateCcw, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CountingMatching31 = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('fluency');

  // Fluency - 1 More Seed state (now up to 5)
  const [seedsPlanted, setSeedsPlanted] = useState(0);
  const [seedFeedback, setSeedFeedback] = useState('');

  // Fluency - Ants Marching state (now up to 5)
  const [antCount, setAntCount] = useState(0);
  const [currentVerse, setCurrentVerse] = useState(0);

  // Application Problem - Pancake stacking
  const [pancakeStack, setPancakeStack] = useState<number[]>([]);
  const [selectedNumeral, setSelectedNumeral] = useState<number | null>(null);
  const [pancakeFeedback, setPancakeFeedback] = useState('');

  // Concept Development - Number stairs
  const [stairs, setStairs] = useState<number[]>([]);
  const [bearPosition, setBearPosition] = useState(-1);
  const [stairFeedback, setStairFeedback] = useState('');
  const [stairsComplete, setStairsComplete] = useState(false);

  // Debrief - Scrambled stairs game
  const [scrambledStairs, setScrambledStairs] = useState<number[]>([]);
  const [isScrambled, setIsScrambled] = useState(false);

  const stairColors = ['bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-400', 'bg-blue-400'];

  const antVerses = [
    { number: 1, action: "suck his thumb" },
    { number: 2, action: "tie a shoe" },
    { number: 3, action: "climb a tree" },
    { number: 4, action: "shut the door" },
    { number: 5, action: "take a dive" }
  ];

  // Seed planting functions
  const plantSeed = () => {
    if (seedsPlanted < 5) {
      const newCount = seedsPlanted + 1;
      setSeedsPlanted(newCount);
      setSeedFeedback(`You planted ${newCount} seed${newCount > 1 ? 's' : ''}! ${newCount < 5 ? 'Plant 1 more!' : 'Great job! All 5 seeds planted!'}`);
    }
  };

  const resetSeeds = () => {
    setSeedsPlanted(0);
    setSeedFeedback('');
  };

  // Ant marching functions
  const addAnt = () => {
    if (antCount < 5) {
      setAntCount(antCount + 1);
      setCurrentVerse(antCount);
    }
  };

  const resetAnts = () => {
    setAntCount(0);
    setCurrentVerse(0);
  };

  // Pancake functions
  const addPancake = () => {
    if (pancakeStack.length < 5) {
      setPancakeStack([...pancakeStack, pancakeStack.length + 1]);
      setSelectedNumeral(null);
      setPancakeFeedback(`Added 1 more pancake! How many pancakes now?`);
    }
  };

  const selectNumeral = (num: number) => {
    setSelectedNumeral(num);
    if (num === pancakeStack.length) {
      setPancakeFeedback(`Correct! There are ${num} pancake${num > 1 ? 's' : ''} in the stack!`);
    } else {
      setPancakeFeedback(`Try again! Count the pancakes carefully.`);
    }
  };

  const resetPancakes = () => {
    setPancakeStack([]);
    setSelectedNumeral(null);
    setPancakeFeedback('');
  };

  // Stair building functions
  const buildNextStair = () => {
    if (stairs.length < 5) {
      const nextStair = stairs.length + 1;
      setStairs([...stairs, nextStair]);
      setStairFeedback(`${stairs.length > 0 ? stairs.length : '0'}. 1 more is ${nextStair}!`);
      if (nextStair === 5) {
        setStairsComplete(true);
        setStairFeedback('Great staircase! Now Bear can climb to his tree house!');
      }
    }
  };

  const moveBear = (position: number) => {
    setBearPosition(position);
  };

  const resetStairs = () => {
    setStairs([]);
    setBearPosition(-1);
    setStairFeedback('');
    setStairsComplete(false);
  };

  // Scramble stairs for debrief
  const scrambleStairs = () => {
    const shuffled = [1, 2, 3, 4, 5].sort(() => Math.random() - 0.5);
    setScrambledStairs(shuffled);
    setIsScrambled(true);
  };

  const sortStairs = () => {
    setScrambledStairs([1, 2, 3, 4, 5]);
    setIsScrambled(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/activities/module-1')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Activities
          </Button>
          <h1 className="text-2xl font-bold text-amber-800">Lesson 31: Build Number Stairs</h1>
        </div>

        {/* Learning Objective */}
        <Card className="mb-6 bg-white/80 border-amber-200">
          <CardContent className="p-4">
            <p className="text-amber-700 font-medium">
              🎯 Objective: Build number stairs showing 1 more with cubes.
            </p>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-4 w-full bg-amber-100">
            <TabsTrigger value="fluency" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
              Fluency (5 min)
            </TabsTrigger>
            <TabsTrigger value="application" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
              Application (3 min)
            </TabsTrigger>
            <TabsTrigger value="concept" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
              Concept (14 min)
            </TabsTrigger>
            <TabsTrigger value="debrief" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
              Debrief (3 min)
            </TabsTrigger>
          </TabsList>

          {/* Fluency Practice */}
          <TabsContent value="fluency" className="space-y-6">
            {/* 1 More Seed Activity */}
            <Card className="bg-white border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <Flower2 className="w-5 h-5" />
                  1 More Seed (2 minutes)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">Plant seeds in your garden row, one at a time. Count as you plant!</p>
                
                {/* Garden row with 5 dots */}
                <div className="bg-amber-100 p-6 rounded-lg">
                  <p className="text-center mb-4 text-amber-800 font-medium">Garden Row (5-dot strip)</p>
                  <div className="flex justify-center gap-4 mb-6">
                    {[1, 2, 3, 4, 5].map((dot) => (
                      <div 
                        key={dot}
                        className={`w-12 h-12 rounded-full border-4 border-amber-600 flex items-center justify-center transition-all ${
                          dot <= seedsPlanted ? 'bg-green-500' : 'bg-amber-200'
                        }`}
                      >
                        {dot <= seedsPlanted && (
                          <span className="text-2xl">🌱</span>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-center gap-4">
                    <Button 
                      onClick={plantSeed}
                      disabled={seedsPlanted >= 5}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      Plant 1 More Seed
                    </Button>
                    <Button variant="outline" onClick={resetSeeds}>
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Start Over
                    </Button>
                  </div>
                  
                  {seedFeedback && (
                    <p className="text-center mt-4 text-lg font-medium text-green-700">{seedFeedback}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* The Ants Go Marching (up to 5) */}
            <Card className="bg-white border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700">
                  <Music className="w-5 h-5" />
                  The Ants Go Marching (3 minutes)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">Sing along and watch the ants march! Now going up to 5!</p>
                
                <div className="bg-red-50 p-6 rounded-lg">
                  {/* Marching ants display */}
                  <div className="flex justify-center gap-2 mb-6 min-h-[60px]">
                    {Array.from({ length: antCount }).map((_, i) => (
                      <div key={i} className="text-4xl animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
                        🐜
                      </div>
                    ))}
                  </div>
                  
                  {antCount > 0 && (
                    <div className="bg-white p-4 rounded-lg mb-4">
                      <p className="text-center text-lg font-medium text-red-800">
                        🎵 The ants go marching {antVerses[currentVerse]?.number === 1 ? 'one by one' : 
                           antVerses[currentVerse]?.number === 2 ? 'two by two' :
                           antVerses[currentVerse]?.number === 3 ? 'three by three' :
                           antVerses[currentVerse]?.number === 4 ? 'four by four' : 'five by five'}!
                      </p>
                      <p className="text-center text-gray-600">
                        The little one stops to {antVerses[currentVerse]?.action}!
                      </p>
                    </div>
                  )}
                  
                  <p className="text-center text-xl font-bold text-red-700 mb-4">
                    {antCount} ant{antCount !== 1 ? 's' : ''} marching!
                    {antCount > 0 && antCount < 5 && ' Is the line wider with more ants?'}
                  </p>
                  
                  <div className="flex justify-center gap-4">
                    <Button 
                      onClick={addAnt}
                      disabled={antCount >= 5}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      Add 1 More Ant
                    </Button>
                    <Button variant="outline" onClick={resetAnts}>
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Start Over
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Application Problem */}
          <TabsContent value="application">
            <Card className="bg-white border-yellow-200">
              <CardHeader>
                <CardTitle className="text-yellow-700">🥞 Pancake Stack Story</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-gray-700 mb-4">
                    Let's stack pancakes one at a time! After adding each pancake, find the number that shows how many!
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Pancake Stack */}
                  <div className="bg-amber-100 p-6 rounded-lg">
                    <p className="text-center font-medium text-amber-800 mb-4">Pancake Stack</p>
                    <div className="flex flex-col-reverse items-center gap-1 min-h-[200px] justify-start">
                      {/* Plate */}
                      <div className="w-32 h-4 bg-gray-300 rounded-full"></div>
                      {/* Pancakes */}
                      {pancakeStack.map((_, i) => (
                        <div 
                          key={i}
                          className="w-24 h-6 bg-amber-400 rounded-full border-2 border-amber-600 animate-scale-in"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        ></div>
                      ))}
                    </div>
                    
                    <div className="flex justify-center mt-4">
                      <Button 
                        onClick={addPancake}
                        disabled={pancakeStack.length >= 5}
                        className="bg-amber-500 hover:bg-amber-600"
                      >
                        Add 1 More Pancake
                      </Button>
                    </div>
                  </div>

                  {/* Numeral Cards */}
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <p className="text-center font-medium text-blue-800 mb-4">How many pancakes? Pick the number!</p>
                    <div className="flex flex-wrap justify-center gap-3">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <Button
                          key={num}
                          onClick={() => selectNumeral(num)}
                          disabled={pancakeStack.length === 0}
                          className={`w-14 h-14 text-2xl font-bold ${
                            selectedNumeral === num 
                              ? num === pancakeStack.length 
                                ? 'bg-green-500 hover:bg-green-600' 
                                : 'bg-red-500 hover:bg-red-600'
                              : 'bg-blue-500 hover:bg-blue-600'
                          }`}
                        >
                          {num}
                        </Button>
                      ))}
                    </div>
                    
                    {pancakeFeedback && (
                      <div className={`mt-4 p-3 rounded-lg text-center ${
                        selectedNumeral === pancakeStack.length ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {selectedNumeral === pancakeStack.length ? <Check className="inline w-5 h-5 mr-2" /> : null}
                        {pancakeFeedback}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button variant="outline" onClick={resetPancakes}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Start Over
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Concept Development */}
          <TabsContent value="concept">
            <Card className="bg-white border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-700">🐻 Build Stairs for Bear!</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    Help Bear build stairs to reach his tree house! Each stair has 1 more cube than the last.
                  </p>
                </div>

                <div className="bg-gradient-to-b from-sky-100 to-green-100 p-6 rounded-lg min-h-[350px]">
                  {/* Tree house */}
                  <div className="flex justify-end mb-4">
                    <div className="text-4xl">🏠🌳</div>
                  </div>

                  {/* Stairs display */}
                  <div className="flex items-end justify-center gap-2 mb-6">
                    {stairs.map((height, index) => (
                      <div 
                        key={index}
                        className="flex flex-col-reverse items-center cursor-pointer"
                        onClick={() => stairsComplete && moveBear(index)}
                      >
                        {/* Cubes stacked */}
                        {Array.from({ length: height }).map((_, cubeIndex) => (
                          <div 
                            key={cubeIndex}
                            className={`w-10 h-10 ${stairColors[index]} border-2 border-white rounded-sm shadow-md animate-scale-in`}
                          ></div>
                        ))}
                        {/* Number label */}
                        <div className="mt-2 w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-purple-700">
                          {height}
                        </div>
                        {/* Bear on stair */}
                        {bearPosition === index && (
                          <div className="text-3xl animate-bounce">🐻</div>
                        )}
                      </div>
                    ))}
                    
                    {/* Bear at start */}
                    {stairs.length === 0 && (
                      <div className="text-4xl">🐻</div>
                    )}
                  </div>

                  {/* Controls */}
                  <div className="flex justify-center gap-4">
                    <Button 
                      onClick={buildNextStair}
                      disabled={stairs.length >= 5}
                      className="bg-purple-500 hover:bg-purple-600"
                    >
                      {stairs.length === 0 ? 'Start Building (1 cube)' : `Add Stair ${stairs.length + 1} (${stairs.length + 1} cubes)`}
                    </Button>
                    <Button variant="outline" onClick={resetStairs}>
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Start Over
                    </Button>
                  </div>

                  {/* Feedback */}
                  {stairFeedback && (
                    <div className={`mt-4 p-4 rounded-lg text-center ${
                      stairsComplete ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'
                    }`}>
                      <p className="text-lg font-medium">{stairFeedback}</p>
                    </div>
                  )}

                  {/* Bear climbing instructions */}
                  {stairsComplete && (
                    <div className="mt-4 p-3 bg-yellow-100 text-yellow-800 rounded-lg text-center">
                      <p>Click on each stair to help Bear climb! Count as he goes: 1, 2, 3, 4, 5!</p>
                    </div>
                  )}
                </div>

                {/* Pattern explanation */}
                <Card className="bg-amber-50 border-amber-200">
                  <CardContent className="p-4">
                    <p className="text-amber-800 font-medium text-center">
                      ⭐ Pattern: Each stair has 1 more cube! <br/>
                      1 → 2 → 3 → 4 → 5
                    </p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Student Debrief */}
          <TabsContent value="debrief">
            <Card className="bg-white border-teal-200">
              <CardHeader>
                <CardTitle className="text-teal-700">🎓 Let's Reflect!</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Scrambled Stairs Game */}
                <div className="bg-teal-50 p-6 rounded-lg">
                  <h3 className="font-bold text-teal-800 mb-4 text-center">
                    🌪️ Oh no! The wind blew Bear's stairs over! Can you put them back?
                  </h3>
                  
                  <div className="flex items-end justify-center gap-3 mb-6 min-h-[180px]">
                    {(isScrambled ? scrambledStairs : [1, 2, 3, 4, 5]).map((height, index) => (
                      <div key={index} className="flex flex-col-reverse items-center">
                        {Array.from({ length: height }).map((_, cubeIndex) => (
                          <div 
                            key={cubeIndex}
                            className={`w-8 h-8 ${stairColors[height - 1]} border-2 border-white rounded-sm shadow-md`}
                          ></div>
                        ))}
                        <div className="mt-2 w-6 h-6 bg-white rounded-full flex items-center justify-center font-bold text-sm">
                          {height}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center gap-4">
                    <Button 
                      onClick={scrambleStairs}
                      className="bg-orange-500 hover:bg-orange-600"
                    >
                      🌪️ Scramble Stairs
                    </Button>
                    <Button 
                      onClick={sortStairs}
                      disabled={!isScrambled}
                      className="bg-teal-500 hover:bg-teal-600"
                    >
                      ✨ Fix the Stairs
                    </Button>
                  </div>
                </div>

                {/* Reflection Questions */}
                <div className="space-y-4">
                  <h3 className="font-bold text-teal-800">Discussion Questions:</h3>
                  
                  <div className="grid gap-3">
                    <div className="bg-white p-4 rounded-lg border border-teal-200">
                      <p className="text-gray-700">
                        🤔 What do you notice about the stairs? (Each stair has 1 more!)
                      </p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-teal-200">
                      <p className="text-gray-700">
                        🐻 How do we count as Bear climbs UP the stairs? (1, 2, 3, 4, 5)
                      </p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-teal-200">
                      <p className="text-gray-700">
                        🔮 Prediction: How do you think we count when Bear climbs DOWN? (5, 4, 3, 2, 1!)
                      </p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-teal-200">
                      <p className="text-gray-700">
                        🏫 Can you find stairs at school or home? Try counting each time you go up one more stair!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tower comparison activity */}
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-bold text-blue-800 mb-4 text-center">
                    🧱 Making Stairs from Towers
                  </h3>
                  <p className="text-gray-700 text-center mb-4">
                    If you have two towers of 3 cubes each, what can you do to make them look like stairs?
                  </p>
                  <div className="flex justify-center gap-8">
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-2">Two towers of 3:</p>
                      <div className="flex gap-2 justify-center">
                        <div className="flex flex-col-reverse">
                          <div className="w-8 h-8 bg-blue-400 border border-white"></div>
                          <div className="w-8 h-8 bg-blue-400 border border-white"></div>
                          <div className="w-8 h-8 bg-blue-400 border border-white"></div>
                        </div>
                        <div className="flex flex-col-reverse">
                          <div className="w-8 h-8 bg-blue-400 border border-white"></div>
                          <div className="w-8 h-8 bg-blue-400 border border-white"></div>
                          <div className="w-8 h-8 bg-blue-400 border border-white"></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center text-2xl">→</div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-2">Take 1 cube off!</p>
                      <div className="flex gap-2 items-end justify-center">
                        <div className="flex flex-col-reverse">
                          <div className="w-8 h-8 bg-green-400 border border-white"></div>
                          <div className="w-8 h-8 bg-green-400 border border-white"></div>
                        </div>
                        <div className="flex flex-col-reverse">
                          <div className="w-8 h-8 bg-green-400 border border-white"></div>
                          <div className="w-8 h-8 bg-green-400 border border-white"></div>
                          <div className="w-8 h-8 bg-green-400 border border-white"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Back to Activities Button */}
                <div className="flex justify-center pt-4">
                  <Button 
                    onClick={() => navigate('/activities/module-1')}
                    className="bg-teal-500 hover:bg-teal-600"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Back to Activities
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CountingMatching31;

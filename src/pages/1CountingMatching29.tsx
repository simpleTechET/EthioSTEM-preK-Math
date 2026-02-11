import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Hand, Music, Users, Target, Star, CheckCircle2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CountingMatching29 = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("fluency");

  // Imaginary Piano state
  const [pianoCount, setPianoCount] = useState(0);
  const [pianoComplete, setPianoComplete] = useState(false);

  // Ants Marching state
  const [antCount, setAntCount] = useState(0);
  const [antsComplete, setAntsComplete] = useState(false);

  // Application Problem state
  const [dancerCount, setDancerCount] = useState(0);
  const [applicationComplete, setApplicationComplete] = useState(false);

  // Beanbag Toss state
  const [hoopBags, setHoopBags] = useState<number[]>([0, 0, 0, 0, 0]);
  const [beanbagComplete, setBeanbagComplete] = useState(false);

  // Sticker Activity state
  const [circleStickers, setCircleStickers] = useState<number[]>([0, 0, 0, 0, 0]);
  const [stickerComplete, setStickerComplete] = useState(false);

  // Debrief state
  const [debriefAnswers, setDebriefAnswers] = useState<number[]>([]);

  const fingerNames = ["pinky", "ring", "middle", "index", "thumb"];

  const handlePianoPress = () => {
    if (pianoCount < 5) {
      const newCount = pianoCount + 1;
      setPianoCount(newCount);
      toast({
        title: `${newCount}!`,
        description: `Press your ${fingerNames[newCount - 1]} finger!`,
      });
      if (newCount === 5) {
        setPianoComplete(true);
        toast({
          title: "Excellent! 🎹",
          description: "You counted to 5 on the imaginary piano!",
        });
      }
    }
  };

  const handleAddAnt = () => {
    if (antCount < 3) {
      const newCount = antCount + 1;
      setAntCount(newCount);
      if (newCount === 3) {
        setAntsComplete(true);
        toast({
          title: "The ants finished marching! 🐜",
          description: "You learned about 1 more with each verse!",
        });
      }
    }
  };

  const handleAddDancer = () => {
    if (dancerCount < 5) {
      const newCount = dancerCount + 1;
      setDancerCount(newCount);
      if (newCount === 5) {
        setApplicationComplete(true);
        toast({
          title: "Everyone is dancing! 💃",
          description: "You added 1 more person each time!",
        });
      }
    }
  };

  const handleAddBeanbag = (hoopIndex: number) => {
    const targetAmount = hoopIndex + 1;
    const currentAmount = hoopBags[hoopIndex];
    
    if (currentAmount < targetAmount) {
      const newHoopBags = [...hoopBags];
      newHoopBags[hoopIndex] = currentAmount + 1;
      setHoopBags(newHoopBags);
      
      if (newHoopBags[hoopIndex] === targetAmount) {
        toast({
          title: `Hoop ${targetAmount} is correct!`,
          description: `${targetAmount} beanbag${targetAmount > 1 ? 's' : ''} match the number!`,
        });
      }
      
      // Check if all hoops are complete
      const allComplete = newHoopBags.every((bags, idx) => bags === idx + 1);
      if (allComplete) {
        setBeanbagComplete(true);
        toast({
          title: "All hoops are filled! 🎯",
          description: "You found 1 more for each hoop!",
        });
      }
    }
  };

  const handleAddSticker = (circleIndex: number) => {
    const targetAmount = circleIndex + 1;
    const currentAmount = circleStickers[circleIndex];
    
    if (currentAmount < targetAmount) {
      const newCircleStickers = [...circleStickers];
      newCircleStickers[circleIndex] = currentAmount + 1;
      setCircleStickers(newCircleStickers);
      
      if (newCircleStickers[circleIndex] === targetAmount) {
        toast({
          title: `Circle ${targetAmount} complete!`,
          description: `${targetAmount} sticker${targetAmount > 1 ? 's' : ''} match the number!`,
        });
      }
      
      // Check if all circles are complete
      const allComplete = newCircleStickers.every((stickers, idx) => stickers === idx + 1);
      if (allComplete) {
        setStickerComplete(true);
        toast({
          title: "All circles have stickers! ⭐",
          description: "Great job finding 1 more each time!",
        });
      }
    }
  };

  const handleDebriefAnswer = (questionIndex: number, answer: number) => {
    const newAnswers = [...debriefAnswers];
    newAnswers[questionIndex] = answer;
    setDebriefAnswers(newAnswers);
    
    const correctAnswers = [5, 1]; // Which circle has 5 stickers? Circle 5. What pattern? 1 more
    if (answer === correctAnswers[questionIndex]) {
      toast({
        title: "Correct! ✓",
        description: questionIndex === 0 ? "Circle 5 has 5 stickers!" : "Yes! We add 1 more each time!",
      });
    }
  };

  const movements = ["🧍", "💃", "🕺", "🤸", "🏃"];
  const movementNames = ["standing alone", "dancing", "jumping", "doing jumping jacks", "marching"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-pink-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/activities")}
          className="mb-4 text-rose-700 hover:text-rose-800 hover:bg-rose-200"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Activities
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-rose-800 mb-2">
            Lesson 29: Find 1 More
          </h1>
          <p className="text-rose-600 text-lg">
            Learn to find 1 more with fun activities!
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6 bg-rose-200">
            <TabsTrigger value="fluency" className="data-[state=active]:bg-rose-500 data-[state=active]:text-white">
              <Music className="w-4 h-4 mr-1" />
              Fluency
            </TabsTrigger>
            <TabsTrigger value="application" className="data-[state=active]:bg-rose-500 data-[state=active]:text-white">
              <Users className="w-4 h-4 mr-1" />
              Application
            </TabsTrigger>
            <TabsTrigger value="concept" className="data-[state=active]:bg-rose-500 data-[state=active]:text-white">
              <Target className="w-4 h-4 mr-1" />
              Concept
            </TabsTrigger>
            <TabsTrigger value="debrief" className="data-[state=active]:bg-rose-500 data-[state=active]:text-white">
              <Star className="w-4 h-4 mr-1" />
              Debrief
            </TabsTrigger>
          </TabsList>

          {/* Fluency Practice */}
          <TabsContent value="fluency" className="space-y-6">
            {/* Imaginary Piano */}
            <Card className="border-2 border-rose-300 bg-white/80">
              <CardHeader className="bg-rose-100">
                <CardTitle className="flex items-center gap-2 text-rose-800">
                  <Hand className="w-6 h-6" />
                  Imaginary Piano (Count to 5)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-rose-700 mb-4 text-center">
                  Imagine playing piano! Start with your pinky and count to 5.
                </p>
                
                <div className="flex justify-center gap-2 mb-6">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <div
                      key={num}
                      className={`w-12 h-20 rounded-b-lg border-2 flex items-end justify-center pb-2 text-xl font-bold transition-all ${
                        pianoCount >= num
                          ? "bg-rose-400 border-rose-600 text-white"
                          : "bg-white border-rose-300 text-rose-400"
                      }`}
                    >
                      {num}
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <p className="text-2xl font-bold text-rose-700 mb-4">
                    Count: {pianoCount}
                  </p>
                  <Button
                    onClick={handlePianoPress}
                    disabled={pianoComplete}
                    className="bg-rose-500 hover:bg-rose-600 text-white text-lg px-8 py-4"
                  >
                    {pianoComplete ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 mr-2" />
                        Complete!
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5 mr-2" />
                        Press Next Key
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Ants Marching */}
            <Card className="border-2 border-rose-300 bg-white/80">
              <CardHeader className="bg-rose-100">
                <CardTitle className="flex items-center gap-2 text-rose-800">
                  <Music className="w-6 h-6" />
                  The Ants Go Marching
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-rose-700 mb-4 text-center">
                  Watch the ants march! Add 1 more ant each verse.
                </p>

                <div className="bg-amber-100 rounded-xl p-6 mb-6 min-h-[120px]">
                  <div className="flex justify-center items-end gap-2">
                    {Array.from({ length: antCount }).map((_, idx) => (
                      <div
                        key={idx}
                        className="text-4xl animate-bounce"
                        style={{ animationDelay: `${idx * 0.2}s` }}
                      >
                        🐜
                      </div>
                    ))}
                  </div>
                  {antCount > 0 && (
                    <p className="text-center mt-4 text-amber-800 font-semibold">
                      {antCount === 1 && "The ants go marching one by one!"}
                      {antCount === 2 && "The ants go marching two by two!"}
                      {antCount === 3 && "The ants go marching three by three!"}
                    </p>
                  )}
                </div>

                <div className="text-center">
                  <p className="text-xl font-bold text-rose-700 mb-2">
                    Ants marching: {antCount}
                  </p>
                  <p className="text-rose-600 mb-4">
                    {antCount < 3 ? `Add 1 more to get ${antCount + 1}!` : "All verses complete!"}
                  </p>
                  <Button
                    onClick={handleAddAnt}
                    disabled={antsComplete}
                    className="bg-amber-500 hover:bg-amber-600 text-white text-lg px-8 py-4"
                  >
                    {antsComplete ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 mr-2" />
                        Song Complete!
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5 mr-2" />
                        Add 1 More Ant
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Application Problem */}
          <TabsContent value="application">
            <Card className="border-2 border-rose-300 bg-white/80">
              <CardHeader className="bg-rose-100">
                <CardTitle className="flex items-center gap-2 text-rose-800">
                  <Users className="w-6 h-6" />
                  Dancing Friends Story
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-rose-700 mb-4 text-center">
                  Friends are joining to dance! Add 1 more friend each time.
                </p>

                <div className="bg-purple-100 rounded-xl p-6 mb-6 min-h-[150px]">
                  <div className="flex justify-center items-center gap-4 flex-wrap">
                    {Array.from({ length: dancerCount }).map((_, idx) => (
                      <div
                        key={idx}
                        className="text-5xl animate-pulse"
                        style={{ animationDelay: `${idx * 0.3}s` }}
                      >
                        {movements[idx]}
                      </div>
                    ))}
                  </div>
                  {dancerCount > 0 && (
                    <p className="text-center mt-4 text-purple-800 font-semibold">
                      {dancerCount} friend{dancerCount > 1 ? 's' : ''} {movementNames[dancerCount - 1]}!
                    </p>
                  )}
                  {dancerCount === 0 && (
                    <p className="text-center text-purple-600">
                      No one is here yet. Add a friend!
                    </p>
                  )}
                </div>

                <div className="text-center">
                  <p className="text-2xl font-bold text-rose-700 mb-2">
                    Friends: {dancerCount}
                  </p>
                  <p className="text-rose-600 mb-4">
                    {dancerCount < 5 
                      ? `How many will there be with 1 more? ${dancerCount + 1}!` 
                      : "Everyone is here!"}
                  </p>
                  <Button
                    onClick={handleAddDancer}
                    disabled={applicationComplete}
                    className="bg-purple-500 hover:bg-purple-600 text-white text-lg px-8 py-4"
                  >
                    {applicationComplete ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 mr-2" />
                        All Friends Dancing!
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5 mr-2" />
                        Add 1 More Friend
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Concept Development */}
          <TabsContent value="concept" className="space-y-6">
            {/* Beanbag Toss */}
            <Card className="border-2 border-rose-300 bg-white/80">
              <CardHeader className="bg-rose-100">
                <CardTitle className="flex items-center gap-2 text-rose-800">
                  <Target className="w-6 h-6" />
                  Beanbag Toss Game
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-rose-700 mb-4 text-center">
                  Tap each hoop to add beanbags until it matches the number!
                </p>

                <div className="flex justify-center gap-3 flex-wrap mb-6">
                  {[1, 2, 3, 4, 5].map((num, idx) => {
                    const current = hoopBags[idx];
                    const isComplete = current === num;
                    const needsMore = current < num;
                    
                    return (
                      <button
                        key={num}
                        onClick={() => handleAddBeanbag(idx)}
                        disabled={isComplete}
                        className={`relative w-20 h-20 md:w-24 md:h-24 rounded-full border-4 flex flex-col items-center justify-center transition-all ${
                          isComplete
                            ? "border-green-500 bg-green-100"
                            : needsMore
                            ? "border-rose-400 bg-rose-50 hover:bg-rose-100 cursor-pointer"
                            : "border-gray-300 bg-gray-100"
                        }`}
                      >
                        <span className="absolute -top-3 bg-rose-500 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">
                          {num}
                        </span>
                        <div className="flex flex-wrap justify-center gap-1 p-1">
                          {Array.from({ length: current }).map((_, bagIdx) => (
                            <div
                              key={bagIdx}
                              className="w-4 h-4 bg-amber-500 rounded-sm"
                            />
                          ))}
                        </div>
                        {needsMore && (
                          <span className="text-xs text-rose-600 mt-1">
                            +1 more
                          </span>
                        )}
                        {isComplete && (
                          <CheckCircle2 className="absolute -bottom-2 w-5 h-5 text-green-500" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {beanbagComplete && (
                  <div className="text-center p-4 bg-green-100 rounded-lg">
                    <p className="text-green-700 font-bold text-lg">
                      🎯 All hoops have the right number of beanbags!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Sticker Activity */}
            <Card className="border-2 border-rose-300 bg-white/80">
              <CardHeader className="bg-rose-100">
                <CardTitle className="flex items-center gap-2 text-rose-800">
                  <Star className="w-6 h-6" />
                  Sticker Circles (Problem Set)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-rose-700 mb-4 text-center">
                  Add stickers to each circle to match the number!
                </p>

                <div className="flex justify-center gap-4 flex-wrap mb-6">
                  {[1, 2, 3, 4, 5].map((num, idx) => {
                    const current = circleStickers[idx];
                    const isComplete = current === num;
                    const needsMore = current < num;
                    
                    return (
                      <button
                        key={num}
                        onClick={() => handleAddSticker(idx)}
                        disabled={isComplete}
                        className={`relative w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-dashed flex flex-col items-center justify-center transition-all ${
                          isComplete
                            ? "border-yellow-500 bg-yellow-50"
                            : needsMore
                            ? "border-blue-400 bg-blue-50 hover:bg-blue-100 cursor-pointer"
                            : "border-gray-300 bg-gray-100"
                        }`}
                      >
                        <span className="absolute -top-3 bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold">
                          {num}
                        </span>
                        <div className="flex flex-wrap justify-center gap-1 p-2">
                          {Array.from({ length: current }).map((_, stickerIdx) => (
                            <span key={stickerIdx} className="text-xl">⭐</span>
                          ))}
                        </div>
                        {needsMore && (
                          <span className="text-xs text-blue-600">
                            Need {num - current} more
                          </span>
                        )}
                        {isComplete && (
                          <CheckCircle2 className="absolute -bottom-2 w-6 h-6 text-yellow-500" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {stickerComplete && (
                  <div className="text-center p-4 bg-yellow-100 rounded-lg">
                    <p className="text-yellow-700 font-bold text-lg">
                      ⭐ All circles have the right number of stickers!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Student Debrief */}
          <TabsContent value="debrief">
            <Card className="border-2 border-rose-300 bg-white/80">
              <CardHeader className="bg-rose-100">
                <CardTitle className="flex items-center gap-2 text-rose-800">
                  <Star className="w-6 h-6" />
                  Share & Reflect
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="bg-rose-50 p-4 rounded-lg">
                  <p className="text-rose-800 font-semibold mb-3">
                    Which circle had 5 stickers?
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <Button
                        key={num}
                        onClick={() => handleDebriefAnswer(0, num)}
                        variant={debriefAnswers[0] === num ? "default" : "outline"}
                        className={`${
                          debriefAnswers[0] === num
                            ? num === 5
                              ? "bg-green-500 hover:bg-green-600"
                              : "bg-red-400 hover:bg-red-500"
                            : "border-rose-300 text-rose-700"
                        }`}
                      >
                        Circle {num}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="bg-rose-50 p-4 rounded-lg">
                  <p className="text-rose-800 font-semibold mb-3">
                    What pattern did you notice? What happened each time?
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      onClick={() => handleDebriefAnswer(1, 1)}
                      variant={debriefAnswers[1] === 1 ? "default" : "outline"}
                      className={`${
                        debriefAnswers[1] === 1
                          ? "bg-green-500 hover:bg-green-600"
                          : "border-rose-300 text-rose-700"
                      }`}
                    >
                      We added 1 more
                    </Button>
                    <Button
                      onClick={() => handleDebriefAnswer(1, 2)}
                      variant={debriefAnswers[1] === 2 ? "default" : "outline"}
                      className={`${
                        debriefAnswers[1] === 2
                          ? "bg-red-400 hover:bg-red-500"
                          : "border-rose-300 text-rose-700"
                      }`}
                    >
                      We took away 1
                    </Button>
                    <Button
                      onClick={() => handleDebriefAnswer(1, 3)}
                      variant={debriefAnswers[1] === 3 ? "default" : "outline"}
                      className={`${
                        debriefAnswers[1] === 3
                          ? "bg-red-400 hover:bg-red-500"
                          : "border-rose-300 text-rose-700"
                      }`}
                    >
                      Nothing changed
                    </Button>
                  </div>
                </div>

                <div className="bg-amber-50 p-4 rounded-lg">
                  <p className="text-amber-800 font-semibold mb-2">
                    🐜 Connection Question:
                  </p>
                  <p className="text-amber-700">
                    How is what we did with the beanbags the same as our song about the ants marching?
                  </p>
                  <p className="text-amber-600 mt-2 italic">
                    Answer: Each time, we added 1 more! The ants added 1 more friend, and we added 1 more beanbag to each hoop.
                  </p>
                </div>

                <div className="text-center pt-4">
                  <Button
                    onClick={() => navigate("/activities")}
                    className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 text-lg"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
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

export default CountingMatching29;
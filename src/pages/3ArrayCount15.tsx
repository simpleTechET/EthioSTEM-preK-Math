import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Volume2, RotateCcw, Home } from "lucide-react";

const ArrayCount15 = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"intro" | "ant" | "spider" | "practice">("intro");
  const [antLegsTraced, setAntLegsTraced] = useState<boolean[]>([false, false, false, false, false, false]);
  const [spiderLegsTraced, setSpiderLegsTraced] = useState<boolean[]>([false, false, false, false, false, false, false, false]);
  const [currentCount, setCurrentCount] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1.1;
    speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (phase === "intro") {
      setTimeout(() => speak("Let's count legs on Ansel Ant and Spencer Spider! Tap each leg to count in order, from left to right, top to bottom."), 500);
    } else if (phase === "ant") {
      setTimeout(() => speak("This is Ansel Ant! Tap each leg to count. Start at the top left and go across, then down."), 500);
    } else if (phase === "spider") {
      setTimeout(() => speak("This is Spencer Spider! Spiders have 8 legs. Tap each leg to count them all."), 500);
    } else if (phase === "practice") {
      setTimeout(() => speak("Great job! Now practice counting both animals. How many legs does each one have?"), 500);
    }
  }, [phase]);

  useEffect(() => {
    const allAntTraced = antLegsTraced.every(t => t);
    const allSpiderTraced = spiderLegsTraced.every(t => t);
    
    if (phase === "ant" && allAntTraced) {
      setTimeout(() => {
        speak("6 legs! Ansel Ant has 6 legs. Now let's meet Spencer Spider!");
        setTimeout(() => setPhase("spider"), 2000);
      }, 500);
    } else if (phase === "spider" && allSpiderTraced) {
      setTimeout(() => {
        speak("8 legs! Spencer Spider has 8 legs. Wonderful counting!");
        setShowCelebration(true);
        setTimeout(() => {
          setShowCelebration(false);
          setPhase("practice");
        }, 3000);
      }, 500);
    }
  }, [antLegsTraced, spiderLegsTraced, phase]);

  const handleAntLegClick = (index: number) => {
    if (phase !== "ant" && phase !== "practice") return;
    
    // Must trace in order
    const nextIndex = antLegsTraced.findIndex(t => !t);
    if (index === nextIndex) {
      const newTraced = [...antLegsTraced];
      newTraced[index] = true;
      setAntLegsTraced(newTraced);
      const count = newTraced.filter(t => t).length;
      setCurrentCount(count);
      speak(count.toString());
    }
  };

  const handleSpiderLegClick = (index: number) => {
    if (phase !== "spider" && phase !== "practice") return;
    
    // Must trace in order
    const nextIndex = spiderLegsTraced.findIndex(t => !t);
    if (index === nextIndex) {
      const newTraced = [...spiderLegsTraced];
      newTraced[index] = true;
      setSpiderLegsTraced(newTraced);
      const count = newTraced.filter(t => t).length;
      setCurrentCount(count);
      speak(count.toString());
    }
  };

  const resetLegs = () => {
    setAntLegsTraced([false, false, false, false, false, false]);
    setSpiderLegsTraced([false, false, false, false, false, false, false, false]);
    setCurrentCount(0);
  };

  const renderAnt = (interactive: boolean = true) => {
    // Ant has 6 legs in 3 pairs (array: 2 columns x 3 rows)
    const legPositions = [
      { top: "25%", left: "15%", rotation: -45 },  // top-left
      { top: "25%", right: "15%", rotation: 45 },   // top-right
      { top: "50%", left: "10%", rotation: -30 },  // middle-left
      { top: "50%", right: "10%", rotation: 30 },   // middle-right
      { top: "75%", left: "15%", rotation: -15 },  // bottom-left
      { top: "75%", right: "15%", rotation: 15 },   // bottom-right
    ];

    return (
      <div className="relative w-48 h-64">
        {/* Ant body */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-amber-900 rounded-full" /> {/* head */}
        <div className="absolute top-14 left-1/2 -translate-x-1/2 w-16 h-20 bg-amber-800 rounded-full" /> {/* thorax */}
        <div className="absolute top-32 left-1/2 -translate-x-1/2 w-14 h-16 bg-amber-900 rounded-full" /> {/* abdomen */}
        
        {/* Eyes */}
        <div className="absolute top-6 left-1/2 -translate-x-6 w-3 h-3 bg-white rounded-full">
          <div className="absolute top-0.5 left-0.5 w-2 h-2 bg-black rounded-full" />
        </div>
        <div className="absolute top-6 left-1/2 translate-x-3 w-3 h-3 bg-white rounded-full">
          <div className="absolute top-0.5 left-0.5 w-2 h-2 bg-black rounded-full" />
        </div>
        
        {/* Antennae */}
        <div className="absolute top-0 left-1/2 -translate-x-4 w-1 h-6 bg-amber-900 rotate-[-30deg] origin-bottom rounded-full" />
        <div className="absolute top-0 left-1/2 translate-x-3 w-1 h-6 bg-amber-900 rotate-[30deg] origin-bottom rounded-full" />
        
        {/* Legs - in array order: left-to-right, top-to-bottom */}
        {legPositions.map((pos, index) => {
          const isTraced = antLegsTraced[index];
          return (
            <button
              key={index}
              onClick={() => interactive && handleAntLegClick(index)}
              className={`absolute w-16 h-3 rounded-full transition-all duration-300 ${
                isTraced 
                  ? "bg-green-500 shadow-lg shadow-green-300" 
                  : "bg-amber-700 hover:bg-amber-600"
              } ${interactive ? "cursor-pointer" : "cursor-default"}`}
              style={{
                top: pos.top,
                left: pos.left,
                right: pos.right,
                transform: `rotate(${pos.rotation}deg)`,
              }}
              disabled={!interactive}
            >
              {!isTraced && interactive && (
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-bold text-amber-900 bg-amber-100 px-1 rounded">
                  {index + 1}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  };

  const renderSpider = (interactive: boolean = true) => {
    // Spider has 8 legs in 4 pairs (array: 2 columns x 4 rows)
    const legPositions = [
      { top: "20%", left: "5%", rotation: -60 },   // top-left
      { top: "20%", right: "5%", rotation: 60 },    // top-right
      { top: "35%", left: "0%", rotation: -40 },   // upper-middle-left
      { top: "35%", right: "0%", rotation: 40 },    // upper-middle-right
      { top: "55%", left: "0%", rotation: -20 },   // lower-middle-left
      { top: "55%", right: "0%", rotation: 20 },    // lower-middle-right
      { top: "70%", left: "5%", rotation: 0 },     // bottom-left
      { top: "70%", right: "5%", rotation: 0 },     // bottom-right
    ];

    return (
      <div className="relative w-56 h-56">
        {/* Spider body */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-gray-800 rounded-full" /> {/* head */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-20 h-24 bg-gray-900 rounded-full" /> {/* abdomen */}
        
        {/* Eyes (8 eyes for spider!) */}
        <div className="absolute top-10 left-1/2 -translate-x-5 flex gap-0.5">
          <div className="w-2 h-2 bg-red-500 rounded-full" />
          <div className="w-2 h-2 bg-red-500 rounded-full" />
        </div>
        <div className="absolute top-10 left-1/2 translate-x-1 flex gap-0.5">
          <div className="w-2 h-2 bg-red-500 rounded-full" />
          <div className="w-2 h-2 bg-red-500 rounded-full" />
        </div>
        <div className="absolute top-14 left-1/2 -translate-x-4 flex gap-1">
          <div className="w-3 h-3 bg-white rounded-full">
            <div className="mt-0.5 ml-0.5 w-2 h-2 bg-black rounded-full" />
          </div>
          <div className="w-3 h-3 bg-white rounded-full">
            <div className="mt-0.5 ml-0.5 w-2 h-2 bg-black rounded-full" />
          </div>
        </div>
        
        {/* Legs - in array order: left-to-right, top-to-bottom */}
        {legPositions.map((pos, index) => {
          const isTraced = spiderLegsTraced[index];
          return (
            <button
              key={index}
              onClick={() => interactive && handleSpiderLegClick(index)}
              className={`absolute w-20 h-3 rounded-full transition-all duration-300 ${
                isTraced 
                  ? "bg-purple-500 shadow-lg shadow-purple-300" 
                  : "bg-gray-700 hover:bg-gray-600"
              } ${interactive ? "cursor-pointer" : "cursor-default"}`}
              style={{
                top: pos.top,
                left: pos.left,
                right: pos.right,
                transform: `rotate(${pos.rotation}deg)`,
              }}
              disabled={!interactive}
            >
              {!isTraced && interactive && (
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-900 bg-gray-200 px-1 rounded">
                  {index + 1}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 via-lime-50 to-green-200 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="text-green-700"
        >
          <Home className="w-5 h-5 mr-1" />
          Home
        </Button>
        <h1 className="text-xl md:text-2xl font-bold text-green-800 text-center">
          Lesson 15: Count Array Configurations
        </h1>
        <Button
          variant="ghost"
          onClick={() => speak("Count legs on Ansel Ant and Spencer Spider!")}
          className="text-green-700"
        >
          <Volume2 className="w-5 h-5" />
        </Button>
      </div>

      {/* Celebration */}
      {showCelebration && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white rounded-3xl p-8 text-center animate-bounce shadow-2xl">
            <div className="text-6xl mb-4">🕷️🐜⭐</div>
            <h2 className="text-3xl font-bold text-purple-600">Amazing!</h2>
            <p className="text-xl text-gray-600 mt-2">You counted 8 spider legs!</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        {phase === "intro" && (
          <div className="bg-white/80 rounded-3xl p-8 shadow-xl text-center">
            <h2 className="text-2xl font-bold text-green-700 mb-6">
              🐜 Meet Ansel Ant and Spencer Spider! 🕷️
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              Today we'll count legs in <span className="font-bold text-purple-600">array configurations</span>!
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Count from <span className="font-bold">left to right</span>, then <span className="font-bold">top to bottom</span>.
            </p>
            
            <div className="flex justify-center gap-12 my-8">
              <div className="text-center">
                <div className="transform scale-75">{renderAnt(false)}</div>
                <p className="mt-2 font-bold text-amber-800">Ansel Ant</p>
                <p className="text-amber-600">6 legs</p>
              </div>
              <div className="text-center">
                <div className="transform scale-75">{renderSpider(false)}</div>
                <p className="mt-2 font-bold text-gray-800">Spencer Spider</p>
                <p className="text-gray-600">8 legs</p>
              </div>
            </div>
            
            <Button 
              onClick={() => setPhase("ant")}
              className="bg-green-500 hover:bg-green-600 text-white text-xl px-8 py-6"
            >
              Let's Count! <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </div>
        )}

        {phase === "ant" && (
          <div className="bg-white/80 rounded-3xl p-8 shadow-xl text-center">
            <h2 className="text-2xl font-bold text-amber-700 mb-4">
              🐜 Count Ansel Ant's Legs!
            </h2>
            <p className="text-lg text-gray-600 mb-2">
              Tap each leg in order: left to right, top to bottom
            </p>
            
            <div className="bg-amber-50 rounded-2xl p-6 mb-4 inline-block">
              <div className="text-4xl font-bold text-amber-600 mb-2">
                {antLegsTraced.filter(t => t).length} / 6
              </div>
              <p className="text-amber-700">legs counted</p>
            </div>
            
            <div className="flex justify-center my-6">
              {renderAnt(true)}
            </div>
            
            <Button
              variant="outline"
              onClick={resetLegs}
              className="text-amber-600 border-amber-300"
            >
              <RotateCcw className="w-4 h-4 mr-2" /> Start Over
            </Button>
          </div>
        )}

        {phase === "spider" && (
          <div className="bg-white/80 rounded-3xl p-8 shadow-xl text-center">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              🕷️ Count Spencer Spider's Legs!
            </h2>
            <p className="text-lg text-gray-600 mb-2">
              Tap each leg in order: left to right, top to bottom
            </p>
            
            <div className="bg-purple-50 rounded-2xl p-6 mb-4 inline-block">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                {spiderLegsTraced.filter(t => t).length} / 8
              </div>
              <p className="text-purple-700">legs counted</p>
            </div>
            
            <div className="flex justify-center my-6">
              {renderSpider(true)}
            </div>
            
            <Button
              variant="outline"
              onClick={resetLegs}
              className="text-purple-600 border-purple-300"
            >
              <RotateCcw className="w-4 h-4 mr-2" /> Start Over
            </Button>
          </div>
        )}

        {phase === "practice" && (
          <div className="bg-white/80 rounded-3xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
              ⭐ Practice Counting Arrays!
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-amber-50 rounded-2xl p-6 text-center">
                <h3 className="text-xl font-bold text-amber-700 mb-2">Ansel Ant</h3>
                <p className="text-amber-600 mb-4">
                  {antLegsTraced.filter(t => t).length} / 6 legs
                </p>
                <div className="flex justify-center transform scale-90">
                  {renderAnt(true)}
                </div>
              </div>
              
              <div className="bg-purple-50 rounded-2xl p-6 text-center">
                <h3 className="text-xl font-bold text-gray-700 mb-2">Spencer Spider</h3>
                <p className="text-purple-600 mb-4">
                  {spiderLegsTraced.filter(t => t).length} / 8 legs
                </p>
                <div className="flex justify-center transform scale-90">
                  {renderSpider(true)}
                </div>
              </div>
            </div>
            
            <div className="flex justify-center gap-4 mt-6">
              <Button
                variant="outline"
                onClick={resetLegs}
                className="text-green-600 border-green-300"
              >
                <RotateCcw className="w-4 h-4 mr-2" /> Reset All
              </Button>
            </div>
            
            <div className="mt-6 p-4 bg-green-100 rounded-xl text-center">
              <p className="text-green-800 font-medium">
                🎯 Remember: Ants have <span className="font-bold">6</span> legs, 
                Spiders have <span className="font-bold">8</span> legs!
              </p>
              <p className="text-green-700 mt-2">
                8 is 2 more than 6! (6 + 2 = 8)
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-center gap-4 mt-8">
        <Button
          variant="outline"
          onClick={() => navigate("/lesson/3-finger-count-14")}
          className="text-green-700 border-green-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Previous Lesson
        </Button>
        <Button
          onClick={() => navigate("/")}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          Back to Lessons
        </Button>
      </div>
    </div>
  );
};

export default ArrayCount15;

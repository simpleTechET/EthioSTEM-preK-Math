import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Volume2, RotateCcw, Check } from "lucide-react";

interface Animal {
  name: string;
  emoji: string;
  targetNumber: number;
}

const animals: Animal[] = [
  { name: "Dolphin", emoji: "🐬", targetNumber: 6 },
  { name: "Seal", emoji: "🦭", targetNumber: 7 },
  { name: "Penguin", emoji: "🐧", targetNumber: 5 },
  { name: "Otter", emoji: "🦦", targetNumber: 7 },
  { name: "Walrus", emoji: "🦭", targetNumber: 6 },
];

const CountOut11 = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [currentAnimalIndex, setCurrentAnimalIndex] = useState(0);
  const [availableFish, setAvailableFish] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [selectedFish, setSelectedFish] = useState<number[]>([]);
  const [showNumeral, setShowNumeral] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [practiceRound, setPracticeRound] = useState(0);

  const currentAnimal = animals[currentAnimalIndex];

  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (step === 0) {
      speak("Welcome to the Aquarium! You are a trainer today. Let's feed the animals!");
    } else if (step === 1) {
      speak("Look at the numeral card. It shows how many fish each animal needs. Count out the right number of fish!");
    } else if (step === 2) {
      speak(`This is ${currentAnimal.name}. Look at the numeral to see how many fish ${currentAnimal.name} needs!`);
      setTimeout(() => setShowNumeral(true), 1500);
    }
  }, [step, currentAnimal]);

  useEffect(() => {
    if (showNumeral && step === 2) {
      speak(`${currentAnimal.name} needs ${currentAnimal.targetNumber} fish. Click on ${currentAnimal.targetNumber} fish to count them out!`);
    }
  }, [showNumeral, currentAnimal, step]);

  const handleFishClick = (fishId: number) => {
    if (isChecking || isCorrect !== null) return;
    
    if (selectedFish.includes(fishId)) {
      setSelectedFish(selectedFish.filter(f => f !== fishId));
    } else {
      const newSelected = [...selectedFish, fishId];
      setSelectedFish(newSelected);
      speak(newSelected.length.toString());
    }
  };

  const handleCheck = () => {
    setIsChecking(true);
    if (selectedFish.length === currentAnimal.targetNumber) {
      setIsCorrect(true);
      speak(`Yes! You counted ${currentAnimal.targetNumber} fish for ${currentAnimal.name}! Great job, trainer!`);
    } else {
      setIsCorrect(false);
      speak(`Hmm, that's ${selectedFish.length} fish. ${currentAnimal.name} needs ${currentAnimal.targetNumber} fish. Try again!`);
      setTimeout(() => {
        setIsChecking(false);
        setIsCorrect(null);
        setSelectedFish([]);
      }, 2500);
    }
  };

  const handleNextAnimal = () => {
    if (practiceRound < 3) {
      const nextIndex = (currentAnimalIndex + 1) % animals.length;
      setCurrentAnimalIndex(nextIndex);
      setSelectedFish([]);
      setShowNumeral(false);
      setIsChecking(false);
      setIsCorrect(null);
      setPracticeRound(prev => prev + 1);
      setTimeout(() => {
        speak(`Great! Now let's feed ${animals[nextIndex].name}!`);
        setTimeout(() => setShowNumeral(true), 1500);
      }, 500);
    } else {
      setStep(3);
      speak("Wonderful job, trainer! You fed all the animals the right amount of fish!");
    }
  };

  const resetActivity = () => {
    setSelectedFish([]);
    setIsChecking(false);
    setIsCorrect(null);
  };

  const renderNumeralCard = (number: number) => (
    <div className="relative">
      <Card className="w-32 h-40 bg-gradient-to-br from-blue-400 to-blue-600 flex flex-col items-center justify-center shadow-lg border-4 border-blue-300">
        <span className="text-6xl font-bold text-white drop-shadow-lg">{number}</span>
      </Card>
      {/* Dots on back representation shown below */}
      <div className="mt-2 flex flex-wrap justify-center gap-1 max-w-[120px]">
        {Array.from({ length: number }).map((_, i) => (
          <div key={i} className="w-4 h-4 rounded-full bg-blue-300 border border-blue-400" />
        ))}
      </div>
    </div>
  );

  const renderFishPool = () => (
    <div className="bg-gradient-to-b from-cyan-200 to-blue-400 rounded-3xl p-6 min-h-[200px]">
      <p className="text-center text-blue-800 font-semibold mb-4">Fish Pool - Click to count out fish!</p>
      <div className="flex flex-wrap justify-center gap-3">
        {availableFish.map((fishId) => (
          <button
            key={fishId}
            onClick={() => handleFishClick(fishId)}
            disabled={isChecking && isCorrect === true}
            className={`text-4xl p-2 rounded-full transition-all transform hover:scale-110 ${
              selectedFish.includes(fishId)
                ? "bg-yellow-300 shadow-lg scale-110 ring-4 ring-yellow-400"
                : "bg-white/50 hover:bg-white/70"
            }`}
          >
            🐟
          </button>
        ))}
      </div>
    </div>
  );

  const renderSelectedFishLine = () => (
    <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl p-4 min-h-[80px]">
      <p className="text-center text-blue-700 font-semibold mb-2">
        Fish for {currentAnimal.name}: {selectedFish.length}
      </p>
      <div className="flex justify-center gap-2 flex-wrap">
        {selectedFish.map((fishId, index) => (
          <div
            key={fishId}
            className="text-3xl animate-bounce"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            🐟
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 via-blue-400 to-blue-600 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="text-white hover:bg-white/20"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Home
        </Button>
        <h1 className="text-xl md:text-2xl font-bold text-white text-center">
          Lesson 11: Count Out Groups
        </h1>
        <Button
          variant="ghost"
          onClick={() => speak(step === 0 ? "Welcome to the Aquarium!" : "Look at the numeral and count out that many fish!")}
          className="text-white hover:bg-white/20"
        >
          <Volume2 className="h-5 w-5" />
        </Button>
      </div>

      {/* Step 0: Introduction */}
      {step === 0 && (
        <Card className="max-w-2xl mx-auto p-8 bg-white/95 text-center">
          <div className="text-8xl mb-6">🐬🐟🦭</div>
          <h2 className="text-3xl font-bold text-blue-600 mb-4">Welcome to the Aquarium!</h2>
          <p className="text-xl text-gray-700 mb-6">
            You are a trainer today! Each animal needs a certain number of fish.
            Look at the numeral card to see how many fish to count out!
          </p>
          <Button
            onClick={() => setStep(1)}
            className="bg-blue-500 hover:bg-blue-600 text-white text-xl px-8 py-6"
          >
            Start Training! <ArrowRight className="ml-2" />
          </Button>
        </Card>
      )}

      {/* Step 1: Numeral Card Demo */}
      {step === 1 && (
        <Card className="max-w-3xl mx-auto p-6 bg-white/95">
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
            Understanding Numeral Cards
          </h2>
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            {[5, 6, 7].map((num) => (
              <div key={num} className="text-center">
                {renderNumeralCard(num)}
                <p className="mt-2 font-semibold text-gray-700">{num} fish</p>
              </div>
            ))}
          </div>
          <p className="text-center text-lg text-gray-700 mb-6">
            The numeral tells you how many fish to count out. The dots help you check!
          </p>
          <div className="flex justify-center">
            <Button
              onClick={() => setStep(2)}
              className="bg-blue-500 hover:bg-blue-600 text-white text-xl px-8 py-4"
            >
              Let's Feed the Animals! <ArrowRight className="ml-2" />
            </Button>
          </div>
        </Card>
      )}

      {/* Step 2: Practice Counting Out */}
      {step === 2 && (
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Animal and Numeral */}
          <Card className="p-6 bg-white/95">
            <div className="flex flex-wrap items-center justify-center gap-8">
              {/* Animal */}
              <div className="text-center">
                <div className="text-8xl mb-2">{currentAnimal.emoji}</div>
                <p className="text-2xl font-bold text-blue-700">{currentAnimal.name}</p>
              </div>

              {/* Numeral Card */}
              {showNumeral && (
                <div className="text-center animate-fade-in">
                  <p className="text-lg text-gray-600 mb-2">Needs this many fish:</p>
                  {renderNumeralCard(currentAnimal.targetNumber)}
                </div>
              )}
            </div>
          </Card>

          {/* Fish Pool */}
          <Card className="p-4 bg-white/95">
            {renderFishPool()}
          </Card>

          {/* Selected Fish Line */}
          <Card className="p-4 bg-white/95">
            {renderSelectedFishLine()}
          </Card>

          {/* Actions */}
          <div className="flex justify-center gap-4">
            <Button
              onClick={resetActivity}
              variant="outline"
              className="bg-white hover:bg-gray-100"
              disabled={isCorrect === true}
            >
              <RotateCcw className="mr-2 h-4 w-4" /> Start Over
            </Button>
            
            {!isCorrect && (
              <Button
                onClick={handleCheck}
                disabled={selectedFish.length === 0 || isChecking}
                className="bg-green-500 hover:bg-green-600 text-white px-8"
              >
                <Check className="mr-2 h-4 w-4" /> Check My Count!
              </Button>
            )}

            {isCorrect && (
              <Button
                onClick={handleNextAnimal}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 animate-pulse"
              >
                {practiceRound < 3 ? "Next Animal!" : "Finish!"} <ArrowRight className="ml-2" />
              </Button>
            )}
          </div>

          {/* Feedback */}
          {isCorrect === true && (
            <div className="text-center p-4 bg-green-100 rounded-xl border-2 border-green-400">
              <p className="text-2xl font-bold text-green-700">
                🎉 Perfect! {currentAnimal.targetNumber} fish for {currentAnimal.name}!
              </p>
            </div>
          )}
          
          {isCorrect === false && (
            <div className="text-center p-4 bg-yellow-100 rounded-xl border-2 border-yellow-400">
              <p className="text-xl font-bold text-yellow-700">
                That's {selectedFish.length} fish. Look at the numeral - {currentAnimal.name} needs {currentAnimal.targetNumber}!
              </p>
            </div>
          )}
        </div>
      )}

      {/* Step 3: Celebration */}
      {step === 3 && (
        <Card className="max-w-2xl mx-auto p-8 bg-white/95 text-center">
          <div className="text-8xl mb-6">🎉🐬🐟🦭🎉</div>
          <h2 className="text-3xl font-bold text-blue-600 mb-4">Amazing Trainer!</h2>
          <p className="text-xl text-gray-700 mb-6">
            You looked at numerals and counted out the right number of fish for each animal!
            You can look at a number and count out that many objects!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => {
                setStep(0);
                setCurrentAnimalIndex(0);
                setSelectedFish([]);
                setShowNumeral(false);
                setIsChecking(false);
                setIsCorrect(null);
                setPracticeRound(0);
              }}
              variant="outline"
              className="text-lg px-6 py-4"
            >
              <RotateCcw className="mr-2" /> Play Again
            </Button>
            <Button
              onClick={() => navigate("/")}
              className="bg-blue-500 hover:bg-blue-600 text-white text-lg px-6 py-4"
            >
              Back to Lessons <ArrowRight className="ml-2" />
            </Button>
          </div>
        </Card>
      )}

      {/* Progress Indicator */}
      {step === 2 && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i <= practiceRound ? "bg-yellow-400" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountOut11;

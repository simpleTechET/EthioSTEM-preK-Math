import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const CountingMatching21 = () => {
  const [activeTab, setActiveTab] = useState("introduction");

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex items-center gap-4">
          <Link to="/">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Lesson 21</h1>
            <p className="text-muted-foreground">Count up to 4 objects and match the numerals</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="introduction">Introduction</TabsTrigger>
            <TabsTrigger value="fluency">Fluency</TabsTrigger>
            <TabsTrigger value="application">Application</TabsTrigger>
            <TabsTrigger value="concept">Concept</TabsTrigger>
            <TabsTrigger value="debrief">Debrief</TabsTrigger>
          </TabsList>

          <TabsContent value="introduction">
            <IntroductionSection />
          </TabsContent>

          <TabsContent value="fluency">
            <FluencyPractice />
          </TabsContent>

          <TabsContent value="application">
            <ApplicationProblem />
          </TabsContent>

          <TabsContent value="concept">
            <ConceptDevelopment />
          </TabsContent>

          <TabsContent value="debrief">
            <StudentDebrief />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const IntroductionSection = () => {
  return (
    <Card className="p-6 md:p-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-foreground">Lesson Overview</h2>
      <div className="space-y-4 text-foreground/90">
        <div>
          <h3 className="font-semibold text-lg mb-2">Objective</h3>
          <p>Count up to 4 objects and match the numerals.</p>
        </div>
        
        <div>
          <h3 className="font-semibold text-lg mb-2">Lesson Structure (25 minutes)</h3>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Fluency Practice (6 minutes) - Merry-Go-Round and Pop Up 5</li>
            <li>Application Problem (3 minutes) - "One Little Flower" rhyme</li>
            <li>Concept Development (13 minutes) - Matching numerals to quantities</li>
            <li>Student Debrief (3 minutes) - Review and reflection</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">Key Concepts</h3>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Counting objects in circular configurations</li>
            <li>Quick counting to 5</li>
            <li>Matching quantities to numerals 1-4</li>
            <li>Recognizing the numeral 4</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

const FluencyPractice = () => {
  const [currentActivity, setCurrentActivity] = useState<"merry" | "popup">("merry");

  return (
    <div className="space-y-6">
      <div className="flex gap-4 mb-4">
        <Button
          variant={currentActivity === "merry" ? "default" : "outline"}
          onClick={() => setCurrentActivity("merry")}
        >
          Merry-Go-Round
        </Button>
        <Button
          variant={currentActivity === "popup" ? "default" : "outline"}
          onClick={() => setCurrentActivity("popup")}
        >
          Pop Up 5
        </Button>
      </div>

      {currentActivity === "merry" && <MerryGoRound />}
      {currentActivity === "popup" && <PopUp5 />}
    </div>
  );
};

const MerryGoRound = () => {
  const [dieRoll, setDieRoll] = useState<number | null>(null);
  const [bears, setBears] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const rollDie = () => {
    const roll = Math.floor(Math.random() * 5) + 1;
    setDieRoll(roll);
    setBears(0);
    setIsSpinning(false);
  };

  const addBear = () => {
    if (dieRoll && bears < dieRoll) {
      setBears(bears + 1);
    }
  };

  const spinRide = () => {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 2000);
  };

  return (
    <Card className="p-6 animate-fade-in">
      <h3 className="text-xl font-bold mb-4 text-foreground">Merry-Go-Round (3 minutes)</h3>
      <p className="text-muted-foreground mb-4">
        The teddy bears want to ride the merry-go-round! Roll the die to see how many bears can ride.
      </p>

      <div className="space-y-4">
        <Button onClick={rollDie} size="lg">
          🎲 Roll Die
        </Button>

        {dieRoll && (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground mb-2">
                Die shows: {dieRoll}
              </p>
              <p className="text-muted-foreground">
                Let {dieRoll} bear{dieRoll > 1 ? "s" : ""} on the merry-go-round, one by one.
              </p>
            </div>

            <div className="flex justify-center">
              <Button
                onClick={addBear}
                disabled={bears >= dieRoll}
                variant={bears >= dieRoll ? "secondary" : "default"}
              >
                Add Bear ({bears}/{dieRoll})
              </Button>
            </div>

            <div
              className={`relative w-64 h-64 mx-auto rounded-full border-8 border-primary bg-primary/10 flex items-center justify-center ${
                isSpinning ? "animate-spin" : ""
              }`}
            >
              <div className="absolute top-2 w-4 h-4 bg-destructive rounded-full" />
              <div className="grid grid-cols-2 gap-4 text-5xl">
                {Array.from({ length: bears }).map((_, i) => (
                  <div key={i}>🧸</div>
                ))}
              </div>
            </div>

            {bears === dieRoll && !isSpinning && (
              <div className="text-center">
                <Button onClick={spinRide} size="lg">
                  🎠 Start the Ride!
                </Button>
              </div>
            )}

            {isSpinning && (
              <p className="text-center text-xl font-bold text-primary animate-bounce">
                Wee! 🎉
              </p>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

const PopUp5 = () => {
  const [currentNumber, setCurrentNumber] = useState(1);
  const [stoodUp, setStoodUp] = useState<number[]>([]);

  const sayNumber = () => {
    if (currentNumber === 5) {
      setStoodUp([...stoodUp, currentNumber]);
      setCurrentNumber(1);
    } else {
      setCurrentNumber(currentNumber + 1);
    }
  };

  const reset = () => {
    setCurrentNumber(1);
    setStoodUp([]);
  };

  return (
    <Card className="p-6 animate-fade-in">
      <h3 className="text-xl font-bold mb-4 text-foreground">Pop Up 5 (3 minutes)</h3>
      <p className="text-muted-foreground mb-4">
        Count to 5! When you reach 5, pop up (stand)!
      </p>

      <div className="space-y-6">
        <div className="text-center">
          <div className="text-6xl font-bold text-primary mb-4">{currentNumber}</div>
          <p className="text-muted-foreground mb-4">
            Times stood up: {stoodUp.length}
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <Button onClick={sayNumber} size="lg">
            {currentNumber === 5 ? "Pop Up! 🎉" : "Say Number"}
          </Button>
          <Button onClick={reset} variant="outline">
            Reset
          </Button>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Goal: Develop speed and accuracy in counting to 5
        </div>
      </div>
    </Card>
  );
};

const ApplicationProblem = () => {
  const [grouped, setGrouped] = useState(false);
  const { toast } = useToast();

  const animals = [
    { type: "flower", emoji: "🌸", count: 1, color: "pink" },
    { type: "bee", emoji: "🐝", count: 2, color: "yellow" },
    { type: "bluebird", emoji: "🐦", count: 3, color: "blue" },
    { type: "kitten", emoji: "🐱", count: 4, color: "orange" },
  ];

  const ungroupedOrder = [
    "flower", "bee", "bluebird", "bee", "kitten", "bluebird", 
    "kitten", "bluebird", "kitten", "kitten"
  ];

  const handleGroup = () => {
    setGrouped(true);
    toast({
      title: "Great job!",
      description: "Grouping by type makes counting much easier!",
    });
  };

  return (
    <Card className="p-6 animate-fade-in">
      <h3 className="text-xl font-bold mb-4 text-foreground">Application Problem (3 minutes)</h3>
      <div className="mb-6 p-4 bg-secondary/20 rounded-lg">
        <p className="text-lg font-semibold mb-2 text-foreground">One Little Flower</p>
        <div className="space-y-1 text-foreground/90">
          <p>One little flower, 2 little bees,</p>
          <p>3 little bluebirds in a tree.</p>
          <p>Nice warm sun shines down on me.</p>
          <p>I can count! 1, 2, 3!</p>
          <p>4 little kittens come out to play,</p>
          <p>On this warm and sunny day.</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-center gap-4 mb-4">
          <Button
            variant={!grouped ? "default" : "outline"}
            onClick={() => setGrouped(false)}
          >
            Mixed Up
          </Button>
          <Button
            variant={grouped ? "default" : "outline"}
            onClick={handleGroup}
          >
            Group by Type
          </Button>
        </div>

        {!grouped ? (
          <div className="flex flex-wrap gap-4 justify-center p-6 bg-secondary/10 rounded-lg min-h-32">
            {ungroupedOrder.map((type, i) => {
              const animal = animals.find((a) => a.type === type);
              return (
                <div key={i} className="text-4xl">
                  {animal?.emoji}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {animals.map((animal) => (
              <div
                key={animal.type}
                className="p-4 bg-secondary/20 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold text-primary w-12 text-center">
                    {animal.count}
                  </div>
                  <div className="flex gap-2 text-4xl">
                    {Array.from({ length: animal.count }).map((_, i) => (
                      <div key={i}>{animal.emoji}</div>
                    ))}
                  </div>
                  <div className="ml-auto text-foreground/70 font-semibold">
                    {animal.count} {animal.type}{animal.count > 1 ? "s" : ""}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="text-center text-muted-foreground">
          How does grouping make counting easier?
        </p>
      </div>
    </Card>
  );
};

const ConceptDevelopment = () => {
  const [currentPart, setCurrentPart] = useState<1 | 2>(1);

  return (
    <div className="space-y-6">
      <div className="flex gap-4 mb-4">
        <Button
          variant={currentPart === 1 ? "default" : "outline"}
          onClick={() => setCurrentPart(1)}
        >
          Part 1: Find Matching Number
        </Button>
        <Button
          variant={currentPart === 2 ? "default" : "outline"}
          onClick={() => setCurrentPart(2)}
        >
          Part 2: Partner Practice
        </Button>
      </div>

      {currentPart === 1 && <FindMatchingNumber />}
      {currentPart === 2 && <PartnerPractice />}
    </div>
  );
};

const FindMatchingNumber = () => {
  const [selectedBag, setSelectedBag] = useState<number | null>(null);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const { toast } = useToast();

  const bags = [
    { id: 1, count: 1, emoji: "🌟" },
    { id: 2, count: 2, emoji: "🍎" },
    { id: 3, count: 3, emoji: "🎨" },
    { id: 4, count: 4, emoji: "🔵" },
  ];

  const numbers = [1, 2, 3, 4];

  const currentBag = bags.find((b) => b.id === selectedBag);

  const checkAnswer = () => {
    if (selectedBag && selectedNumber) {
      const bag = bags.find((b) => b.id === selectedBag);
      if (bag && bag.count === selectedNumber) {
        setFeedback("correct");
        toast({
          title: "Correct! 🎉",
          description: `${selectedNumber} matches your objects!`,
        });
      } else {
        setFeedback("incorrect");
        toast({
          title: "Try again",
          description: "Count the objects carefully and find the matching number.",
          variant: "destructive",
        });
      }
    }
  };

  const reset = () => {
    setSelectedBag(null);
    setSelectedNumber(null);
    setFeedback("");
  };

  return (
    <Card className="p-6 animate-fade-in">
      <h3 className="text-xl font-bold mb-4 text-foreground">
        Find the Matching Number
      </h3>
      <p className="text-muted-foreground mb-6">
        Pick a bag, count the objects, then find the matching number!
      </p>

      <div className="space-y-6">
        <div>
          <h4 className="font-semibold mb-3 text-foreground">Step 1: Pick a bag</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bags.map((bag) => (
              <button
                key={bag.id}
                onClick={() => {
                  setSelectedBag(bag.id);
                  setSelectedNumber(null);
                  setFeedback("");
                }}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedBag === bag.id
                    ? "border-primary bg-primary/10 scale-105"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="text-4xl mb-2">🎒</div>
                <div className="text-sm text-muted-foreground">Bag {bag.id}</div>
              </button>
            ))}
          </div>
        </div>

        {currentBag && (
          <>
            <div>
              <h4 className="font-semibold mb-3 text-foreground">
                Count the objects in your bag
              </h4>
              <div className="p-6 bg-secondary/20 rounded-lg">
                <div className="flex gap-3 justify-center text-5xl flex-wrap">
                  {Array.from({ length: currentBag.count }).map((_, i) => (
                    <div key={i}>{currentBag.emoji}</div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-foreground">
                Step 2: Find the matching number
              </h4>
              <div className="grid grid-cols-4 gap-4">
                {numbers.map((num) => (
                  <button
                    key={num}
                    onClick={() => {
                      setSelectedNumber(num);
                      setFeedback("");
                    }}
                    className={`p-6 rounded-lg border-2 text-4xl font-bold transition-all ${
                      selectedNumber === num
                        ? "border-primary bg-primary/10 scale-105"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {selectedNumber && (
              <div className="flex justify-center gap-4">
                <Button onClick={checkAnswer} size="lg">
                  Check Answer
                </Button>
                <Button onClick={reset} variant="outline">
                  Try Another Bag
                </Button>
              </div>
            )}

            {feedback && (
              <div
                className={`p-4 rounded-lg text-center ${
                  feedback === "correct"
                    ? "bg-green-500/20 text-green-700 dark:text-green-300"
                    : "bg-red-500/20 text-red-700 dark:text-red-300"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  {feedback === "correct" ? (
                    <>
                      <CheckCircle2 className="h-6 w-6" />
                      <span className="font-semibold">
                        Correct! {selectedNumber} matches!
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-6 w-6" />
                      <span className="font-semibold">Try counting again!</span>
                    </>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Card>
  );
};

const PartnerPractice = () => {
  const [currentRound, setCurrentRound] = useState(0);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [correct, setCorrect] = useState(0);
  const { toast } = useToast();

  const rounds = [
    { objects: "🍓", count: 1 },
    { objects: "⭐", count: 2 },
    { objects: "🎈", count: 3 },
    { objects: "🌻", count: 4 },
    { objects: "🦋", count: 2 },
    { objects: "🎁", count: 3 },
  ];

  const currentQuestion = rounds[currentRound];
  const numeralCards = [1, 2, 3, 4];

  const checkAnswer = () => {
    if (selectedCard !== null) {
      setAttempts(attempts + 1);
      if (selectedCard === currentQuestion.count) {
        setCorrect(correct + 1);
        toast({
          title: "Excellent! 🎉",
          description: "That's the correct match!",
        });
        
        setTimeout(() => {
          if (currentRound < rounds.length - 1) {
            setCurrentRound(currentRound + 1);
            setSelectedCard(null);
          }
        }, 1500);
      } else {
        toast({
          title: "Not quite",
          description: "Try counting the objects again.",
          variant: "destructive",
        });
      }
    }
  };

  const reset = () => {
    setCurrentRound(0);
    setSelectedCard(null);
    setAttempts(0);
    setCorrect(0);
  };

  return (
    <Card className="p-6 animate-fade-in">
      <h3 className="text-xl font-bold mb-4 text-foreground">Partner Practice</h3>
      <p className="text-muted-foreground mb-4">
        Count the objects and find the matching numeral card!
      </p>

      <div className="mb-4 flex gap-4 text-sm">
        <div className="px-3 py-1 bg-primary/10 rounded-full text-foreground">
          Round: {currentRound + 1}/{rounds.length}
        </div>
        <div className="px-3 py-1 bg-primary/10 rounded-full text-foreground">
          Score: {correct}/{attempts}
        </div>
      </div>

      {currentRound < rounds.length ? (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3 text-foreground">
              Count these objects:
            </h4>
            <div className="p-8 bg-secondary/20 rounded-lg">
              <div className="flex gap-4 justify-center text-6xl flex-wrap">
                {Array.from({ length: currentQuestion.count }).map((_, i) => (
                  <div key={i}>{currentQuestion.objects}</div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-foreground">
              Pick the matching numeral:
            </h4>
            <div className="grid grid-cols-4 gap-4">
              {numeralCards.map((num) => (
                <button
                  key={num}
                  onClick={() => setSelectedCard(num)}
                  className={`p-8 rounded-lg border-2 transition-all ${
                    selectedCard === num
                      ? "border-primary bg-primary/10 scale-105"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="text-5xl font-bold text-foreground mb-2">
                    {num}
                  </div>
                  <div className="flex gap-1 justify-center">
                    {Array.from({ length: num }).map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-primary rounded-full" />
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {selectedCard !== null && (
            <div className="flex justify-center">
              <Button onClick={checkAnswer} size="lg">
                Check Answer
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center space-y-4 py-8">
          <div className="text-6xl mb-4">🎉</div>
          <h4 className="text-2xl font-bold text-foreground">
            Great Work!
          </h4>
          <p className="text-xl text-muted-foreground">
            You got {correct} out of {attempts} correct!
          </p>
          <Button onClick={reset} size="lg">
            Practice Again
          </Button>
        </div>
      )}
    </Card>
  );
};

const StudentDebrief = () => {
  const [traced, setTraced] = useState(false);
  const { toast } = useToast();

  const handleTrace = () => {
    setTraced(true);
    toast({
      title: "Great tracing!",
      description: "You're learning to write the number 4!",
    });
  };

  return (
    <Card className="p-6 animate-fade-in">
      <h3 className="text-xl font-bold mb-4 text-foreground">Student Debrief (3 minutes)</h3>

      <div className="space-y-6">
        <div>
          <h4 className="font-semibold mb-2 text-foreground">What did we learn today?</h4>
          <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-2">
            <li>We counted up to 4 objects in different ways</li>
            <li>We matched quantities to the numerals 1, 2, 3, and 4</li>
            <li>We learned to recognize the numeral 4</li>
            <li>We practiced counting quickly and accurately</li>
          </ul>
        </div>

        <div className="p-6 bg-secondary/20 rounded-lg">
          <h4 className="font-semibold mb-4 text-foreground text-center">
            Which number matches these dots?
          </h4>
          <div className="flex justify-center gap-2 mb-6">
            <div className="w-8 h-8 bg-primary rounded-full" />
            <div className="w-8 h-8 bg-primary rounded-full" />
            <div className="w-8 h-8 bg-primary rounded-full" />
            <div className="w-8 h-8 bg-primary rounded-full" />
          </div>
          <div className="text-center text-6xl font-bold text-primary">4</div>
        </div>

        <div className="p-6 bg-secondary/20 rounded-lg">
          <h4 className="font-semibold mb-4 text-foreground text-center">
            Let's practice writing the number 4
          </h4>
          <div className="flex justify-center mb-4">
            <div className="text-9xl font-bold text-primary/30 select-none">
              4
            </div>
          </div>
          <div className="text-center">
            <Button onClick={handleTrace} variant={traced ? "secondary" : "default"}>
              {traced ? "Traced! ✓" : "Trace the Number 4"}
            </Button>
          </div>
        </div>

        <div className="p-4 bg-primary/10 rounded-lg">
          <h4 className="font-semibold mb-2 text-foreground">Center Connection:</h4>
          <p className="text-foreground/90">
            Look for groups of 4 around you! 4 wheels on a car, 4 legs on a table, 
            4 sides on a piece of paper. How many groups of 4 can you find?
          </p>
        </div>

        <div className="text-center pt-4">
          <Link to="/">
            <Button size="lg">Back to Activities</Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default CountingMatching21;

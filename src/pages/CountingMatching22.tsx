import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const CountingMatching22 = () => {
  const [activeTab, setActiveTab] = useState("introduction");

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex items-center gap-4">
          <Link to="/activities">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Lesson 22</h1>
            <p className="text-muted-foreground">Count up to 5 objects and match the numerals</p>
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

        <div className="mt-8 text-center">
          <Link to="/activities">
            <Button size="lg" variant="outline">
              Back to Activities
            </Button>
          </Link>
        </div>
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
          <p>Count up to 5 objects and match the numerals.</p>
        </div>
        
        <div>
          <h3 className="font-semibold text-lg mb-2">Lesson Structure (25 minutes)</h3>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Fluency Practice (6 minutes) - Piano Counting and Hop-Hop</li>
            <li>Application Problem (3 minutes) - Extended rhyme with 5 objects</li>
            <li>Concept Development (13 minutes) - Matching numerals 1-5 to quantities</li>
            <li>Student Debrief (3 minutes) - Review and reflection on number 5</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">Key Concepts</h3>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Counting the Math Way on fingers (1-5 from left to right)</li>
            <li>Quick counting and movement activities</li>
            <li>Matching quantities to numerals 1-5</li>
            <li>Recognizing and using the numeral 5</li>
            <li>Introduction to 5-group visual patterns</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

const FluencyPractice = () => {
  const [currentActivity, setCurrentActivity] = useState<"piano" | "hop">("piano");

  return (
    <div className="space-y-6">
      <div className="flex gap-4 mb-4">
        <Button
          variant={currentActivity === "piano" ? "default" : "outline"}
          onClick={() => setCurrentActivity("piano")}
        >
          Piano Counting
        </Button>
        <Button
          variant={currentActivity === "hop" ? "default" : "outline"}
          onClick={() => setCurrentActivity("hop")}
        >
          Hop-Hop Game
        </Button>
      </div>

      {currentActivity === "piano" && <PianoCounting />}
      {currentActivity === "hop" && <HopHop />}
    </div>
  );
};

const PianoCounting = () => {
  const [currentCount, setCurrentCount] = useState(0);
  const [showingFingers, setShowingFingers] = useState(false);

  const fingers = [
    { id: 1, label: "Pinky", emoji: "🤙" },
    { id: 2, label: "Ring", emoji: "💍" },
    { id: 3, label: "Middle", emoji: "🖕" },
    { id: 4, label: "Index", emoji: "☝️" },
    { id: 5, label: "Thumb", emoji: "👍" },
  ];

  const startCounting = () => {
    setShowingFingers(true);
    setCurrentCount(0);
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setCurrentCount(count);
      if (count >= 5) {
        clearInterval(interval);
      }
    }, 800);
  };

  const reset = () => {
    setCurrentCount(0);
    setShowingFingers(false);
  };

  return (
    <Card className="p-6 animate-fade-in">
      <h3 className="text-xl font-bold mb-4 text-foreground">Counting the Math Way on the Piano (3 minutes)</h3>
      <p className="text-muted-foreground mb-4">
        Count from 1 to 5 using your fingers, moving from left pinky to thumb. This is the "Math Way"!
      </p>

      <div className="space-y-6">
        <div className="flex justify-center gap-4 mb-6">
          <Button onClick={startCounting} size="lg" disabled={showingFingers}>
            Start Counting
          </Button>
          <Button onClick={reset} variant="outline">
            Reset
          </Button>
        </div>

        {showingFingers && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <div className="text-6xl font-bold text-primary mb-2">{currentCount}</div>
              <p className="text-muted-foreground">
                {currentCount > 0 && currentCount <= 5 ? fingers[currentCount - 1].label : ""}
              </p>
            </div>

            <div className="flex justify-center gap-2 p-6 bg-secondary/20 rounded-lg">
              {fingers.map((finger, index) => (
                <div
                  key={finger.id}
                  className={`text-6xl transition-all duration-500 ${
                    index < currentCount ? "scale-100 opacity-100" : "scale-50 opacity-20"
                  }`}
                >
                  ✋
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <div
                  key={num}
                  className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold transition-all ${
                    num <= currentCount
                      ? "bg-primary text-primary-foreground scale-110"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {num}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-center text-sm text-muted-foreground mt-4">
          This builds foundation for understanding the number line (numbers increase left to right)
        </div>
      </div>
    </Card>
  );
};

const HopHop = () => {
  const [beanbagPosition, setBeanbagPosition] = useState<number | null>(null);
  const [hops, setHops] = useState(0);
  const [isHopping, setIsHopping] = useState(false);
  const { toast } = useToast();

  const tossBeanbag = () => {
    const position = Math.floor(Math.random() * 4) + 1;
    setBeanbagPosition(position);
    setHops(0);
    setIsHopping(false);
  };

  const hop = () => {
    if (beanbagPosition && hops < beanbagPosition) {
      setIsHopping(true);
      setTimeout(() => {
        setHops(hops + 1);
        setIsHopping(false);
        if (hops + 1 === beanbagPosition) {
          toast({
            title: "Perfect! 🎉",
            description: `You hopped ${beanbagPosition} times!`,
          });
        }
      }, 300);
    }
  };

  return (
    <Card className="p-6 animate-fade-in">
      <h3 className="text-xl font-bold mb-4 text-foreground">Hop-Hop Game (3 minutes)</h3>
      <p className="text-muted-foreground mb-4">
        Toss the beanbag on the hopscotch mat, then hop that many times!
      </p>

      <div className="space-y-6">
        <div className="flex justify-center">
          <Button onClick={tossBeanbag} size="lg">
            🎯 Toss Beanbag
          </Button>
        </div>

        {beanbagPosition && (
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
              {[1, 2, 3, 4].map((num) => (
                <div
                  key={num}
                  className={`relative aspect-square rounded-lg border-4 flex items-center justify-center text-4xl font-bold transition-all ${
                    beanbagPosition === num
                      ? "border-primary bg-primary/20 scale-110"
                      : "border-border bg-secondary/20"
                  }`}
                >
                  {num}
                  {beanbagPosition === num && (
                    <div className="absolute -top-3 -right-3 text-3xl">🎯</div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-2xl font-bold text-primary mb-4">
                Number: {beanbagPosition}
              </p>
              <p className="text-lg text-muted-foreground mb-2">
                Hops: {hops} / {beanbagPosition}
              </p>
            </div>

            {hops < beanbagPosition && (
              <div className="flex justify-center">
                <Button
                  onClick={hop}
                  size="lg"
                  disabled={isHopping}
                  className={isHopping ? "animate-bounce" : ""}
                >
                  {isHopping ? "🐰 Hopping!" : "Hop!"}
                </Button>
              </div>
            )}

            {hops === beanbagPosition && (
              <div className="text-center">
                <p className="text-xl font-bold text-success mb-4">
                  Great job! You hopped {beanbagPosition} times! 🎉
                </p>
              </div>
            )}
          </div>
        )}
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
    { type: "duck", emoji: "🦆", count: 5, color: "green" },
  ];

  const ungroupedOrder = [
    "flower", "bee", "duck", "bluebird", "bee", "kitten", "duck", "bluebird",
    "kitten", "duck", "bluebird", "kitten", "duck", "kitten", "duck"
  ];

  const handleGroup = () => {
    setGrouped(true);
    toast({
      title: "Excellent!",
      description: "Grouping by type makes counting much easier!",
    });
  };

  return (
    <Card className="p-6 animate-fade-in">
      <h3 className="text-xl font-bold mb-4 text-foreground">Application Problem (3 minutes)</h3>
      <div className="mb-6 p-4 bg-secondary/20 rounded-lg">
        <p className="text-lg font-semibold mb-2 text-foreground">One Little Flower (Extended)</p>
        <div className="space-y-1 text-foreground/90">
          <p>One little flower, 2 little bees,</p>
          <p>3 little bluebirds in a tree.</p>
          <p>Nice warm sun shines down on me.</p>
          <p>I can count! 1, 2, 3!</p>
          <p>4 little kittens come out to play,</p>
          <p>On this warm and sunny day.</p>
          <p className="font-bold text-primary">Five little ducks take a dive.</p>
          <p className="font-bold text-primary">Count them: 1, 2, 3, 4, 5!</p>
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
                  <div className="flex gap-2 text-4xl flex-wrap">
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
  const [selectedStrip, setSelectedStrip] = useState<number | null>(null);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const { toast } = useToast();

  const dotStrips = [
    { id: 1, count: 1 },
    { id: 2, count: 2 },
    { id: 3, count: 3 },
    { id: 4, count: 4 },
    { id: 5, count: 5 },
  ];

  const numbers = [1, 2, 3, 4, 5];

  const currentStrip = dotStrips.find((s) => s.id === selectedStrip);

  const checkAnswer = () => {
    if (selectedStrip && selectedNumber) {
      const strip = dotStrips.find((s) => s.id === selectedStrip);
      if (strip && strip.count === selectedNumber) {
        setFeedback("correct");
        toast({
          title: "Perfect! 🎉",
          description: `The number ${selectedNumber} matches your dots!`,
        });
      } else {
        setFeedback("incorrect");
        toast({
          title: "Try again",
          description: "Count the dots carefully and find the matching number.",
          variant: "destructive",
        });
      }
    }
  };

  const reset = () => {
    setSelectedStrip(null);
    setSelectedNumber(null);
    setFeedback("");
  };

  return (
    <Card className="p-6 animate-fade-in">
      <h3 className="text-xl font-bold mb-4 text-foreground">
        Find the Matching Number
      </h3>
      <p className="text-muted-foreground mb-6">
        Pick a dot strip, count the dots, then find the matching number!
      </p>

      <div className="space-y-6">
        <div>
          <h4 className="font-semibold mb-3 text-foreground">Step 1: Pick a dot strip</h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {dotStrips.map((strip) => (
              <button
                key={strip.id}
                onClick={() => {
                  setSelectedStrip(strip.id);
                  setSelectedNumber(null);
                  setFeedback("");
                }}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedStrip === strip.id
                    ? "border-primary bg-primary/10 scale-105"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex flex-col gap-1">
                  {Array.from({ length: strip.count }).map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-primary mx-auto" />
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

        {currentStrip && (
          <>
            <div>
              <h4 className="font-semibold mb-3 text-foreground">
                Count the dots on your strip
              </h4>
              <div className="p-6 bg-secondary/20 rounded-lg">
                <div className="flex flex-col gap-3 items-center">
                  {Array.from({ length: currentStrip.count }).map((_, i) => (
                    <div key={i} className="w-16 h-16 rounded-full bg-primary animate-fade-in" />
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-foreground">
                Step 2: Find the matching number
              </h4>
              <div className="grid grid-cols-5 gap-4">
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
                {feedback && (
                  <Button onClick={reset} variant="outline">
                    Try Another
                  </Button>
                )}
              </div>
            )}

            {feedback === "correct" && (
              <div className="text-center p-4 bg-success/10 rounded-lg border-2 border-success">
                <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-2" />
                <p className="text-lg font-semibold text-success">Correct! They match!</p>
              </div>
            )}

            {feedback === "incorrect" && (
              <div className="text-center p-4 bg-destructive/10 rounded-lg border-2 border-destructive">
                <XCircle className="w-12 h-12 text-destructive mx-auto mb-2" />
                <p className="text-lg font-semibold text-destructive">
                  Not quite. Count again carefully!
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </Card>
  );
};

const PartnerPractice = () => {
  const [currentRole, setCurrentRole] = useState<"teacher" | "student">("teacher");
  const [selectedDots, setSelectedDots] = useState<number | null>(null);
  const [selectedNumeral, setSelectedNumeral] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const { toast } = useToast();

  const dotCounts = [1, 2, 3, 4, 5];

  const pickDotStrip = () => {
    const randomDots = Math.floor(Math.random() * 5) + 1;
    setSelectedDots(randomDots);
    setSelectedNumeral(null);
    setShowFeedback(false);
  };

  const selectNumeral = (num: number) => {
    setSelectedNumeral(num);
    setShowFeedback(true);
    if (num === selectedDots) {
      toast({
        title: "Correct! 🎉",
        description: "Perfect match!",
      });
    } else {
      toast({
        title: "Not quite",
        description: "Try counting the dots again.",
        variant: "destructive",
      });
    }
  };

  const switchRoles = () => {
    setCurrentRole(currentRole === "teacher" ? "student" : "teacher");
    setSelectedDots(null);
    setSelectedNumeral(null);
    setShowFeedback(false);
  };

  return (
    <Card className="p-6 animate-fade-in">
      <h3 className="text-xl font-bold mb-4 text-foreground">Partner Practice</h3>
      <p className="text-muted-foreground mb-6">
        Take turns being the teacher and student. Teachers pick a dot strip, students find the matching number!
      </p>

      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
          <div>
            <p className="font-semibold text-foreground">Current Role:</p>
            <p className="text-2xl font-bold text-primary capitalize">{currentRole}</p>
          </div>
          <Button onClick={switchRoles} variant="outline">
            Switch Roles
          </Button>
        </div>

        {currentRole === "teacher" && (
          <div className="space-y-4">
            <Button onClick={pickDotStrip} size="lg" className="w-full">
              Pick a Dot Strip
            </Button>

            {selectedDots && (
              <div className="p-6 bg-secondary/20 rounded-lg">
                <p className="text-center font-semibold mb-4 text-foreground">
                  Show your student this dot strip:
                </p>
                <div className="flex flex-col gap-3 items-center">
                  {Array.from({ length: selectedDots }).map((_, i) => (
                    <div key={i} className="w-16 h-16 rounded-full bg-primary" />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {currentRole === "student" && selectedDots && (
          <div className="space-y-4">
            <div className="p-6 bg-secondary/20 rounded-lg">
              <p className="text-center font-semibold mb-4 text-foreground">
                Count the dots and find the matching number:
              </p>
              <div className="flex flex-col gap-3 items-center mb-6">
                {Array.from({ length: selectedDots }).map((_, i) => (
                  <div key={i} className="w-16 h-16 rounded-full bg-primary" />
                ))}
              </div>

              <div className="grid grid-cols-5 gap-3">
                {dotCounts.map((num) => (
                  <button
                    key={num}
                    onClick={() => selectNumeral(num)}
                    disabled={showFeedback}
                    className={`p-4 rounded-lg border-2 text-2xl font-bold transition-all ${
                      selectedNumeral === num
                        ? selectedNumeral === selectedDots
                          ? "border-success bg-success/10"
                          : "border-destructive bg-destructive/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {num}
                    <div className="text-xs mt-1 flex justify-center gap-0.5">
                      {Array.from({ length: num }).map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-current" />
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {showFeedback && (
              <div className="text-center">
                {selectedNumeral === selectedDots ? (
                  <div className="p-4 bg-success/10 rounded-lg border-2 border-success">
                    <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-2" />
                    <p className="font-semibold text-success">Perfect match!</p>
                  </div>
                ) : (
                  <div className="p-4 bg-destructive/10 rounded-lg border-2 border-destructive">
                    <XCircle className="w-12 h-12 text-destructive mx-auto mb-2" />
                    <p className="font-semibold text-destructive">Try again!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

const StudentDebrief = () => {
  const [traced, setTraced] = useState(false);
  const [showFingers, setShowFingers] = useState(false);

  return (
    <Card className="p-6 animate-fade-in">
      <h3 className="text-xl font-bold mb-4 text-foreground">Student Debrief (3 minutes)</h3>
      
      <div className="space-y-6">
        <div className="p-4 bg-secondary/20 rounded-lg">
          <h4 className="font-semibold mb-3 text-foreground">Reflection Questions</h4>
          <ul className="space-y-2 text-foreground/90">
            <li>• What important number did we learn about today?</li>
            <li>• How did we show 5?</li>
            <li>• Where else do we see 5 things?</li>
            <li>• How did you know how to match each group with a number?</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Show me 5 on your fingers!</h4>
          <div className="flex justify-center">
            <Button onClick={() => setShowFingers(!showFingers)} size="lg">
              {showFingers ? "Hide" : "Show"} Fingers
            </Button>
          </div>
          {showFingers && (
            <div className="text-center text-8xl animate-fade-in">
              ✋
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Trace the number 5</h4>
          <div className="bg-secondary/20 p-8 rounded-lg">
            <div 
              className="text-9xl font-bold text-primary text-center cursor-pointer select-none hover:scale-110 transition-transform"
              onClick={() => setTraced(true)}
            >
              5
            </div>
            {traced && (
              <p className="text-center text-success font-semibold mt-4">
                Great tracing! ✨
              </p>
            )}
          </div>
          <p className="text-center text-muted-foreground text-sm">
            Click the number to trace it with your finger
          </p>
        </div>

        <div className="p-4 bg-primary/10 rounded-lg">
          <h4 className="font-semibold mb-2 text-foreground">What does 5 look like to you?</h4>
          <p className="text-muted-foreground text-sm">
            Discuss with your teacher or friends: Does it look like something you know?
          </p>
        </div>

        <div className="text-center mt-8">
          <Link to="/activities">
            <Button size="lg">
              Back to Activities
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default CountingMatching22;
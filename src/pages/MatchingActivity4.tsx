import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BookOpen, Star, Users, Lightbulb, CheckCircle2 } from "lucide-react";
import cupImg from "@/assets/cup.png";
import strawImg from "@/assets/straw.png";
import paperImg from "@/assets/paper.png";
import pencilImg from "@/assets/pencil.png";
import toothbrushImg from "@/assets/toothbrush.png";
import toothpasteImg from "@/assets/toothpaste.png";
import sockImg from "@/assets/sock.png";
import shoeImg from "@/assets/shoe.png";

const MatchingActivity4 = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [showBodyParts, setShowBodyParts] = useState(true);
  const [currentSelection, setCurrentSelection] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [attempts, setAttempts] = useState(0);

  // Objects that are used together - shuffled to prevent adjacent matches
  const shuffledItems = useMemo(() => {
    const itemsArray = [
      { id: 1, name: "Cup", img: cupImg, matchId: "drink", pair: "Straw" },
      { id: 2, name: "Straw", img: strawImg, matchId: "drink", pair: "Cup" },
      { id: 3, name: "Paper", img: paperImg, matchId: "write", pair: "Pencil" },
      { id: 4, name: "Pencil", img: pencilImg, matchId: "write", pair: "Paper" },
      { id: 5, name: "Toothbrush", img: toothbrushImg, matchId: "brush", pair: "Toothpaste" },
      { id: 6, name: "Toothpaste", img: toothpasteImg, matchId: "brush", pair: "Toothbrush" },
      { id: 7, name: "Sock", img: sockImg, matchId: "wear", pair: "Shoe" },
      { id: 8, name: "Shoe", img: shoeImg, matchId: "wear", pair: "Sock" },
    ];
    return [...itemsArray].sort(() => Math.random() - 0.5);
  }, []);

  // Body parts that come in pairs
  const bodyParts = [
    { name: "Eyes", emoji: "👁️", count: 2 },
    { name: "Ears", emoji: "👂", count: 2 },
    { name: "Hands", emoji: "✋", count: 2 },
    { name: "Feet", emoji: "🦶", count: 2 },
    { name: "Legs", emoji: "🦵", count: 2 },
  ];

  const handleItemClick = (item) => {
    if (matchedPairs.includes(item.id)) return;

    if (!currentSelection) {
      setCurrentSelection(item);
    } else {
      setAttempts(attempts + 1);
      
      if (currentSelection.matchId === item.matchId && currentSelection.id !== item.id) {
        // Match found!
        setMatchedPairs([...matchedPairs, currentSelection.id, item.id]);
        setCurrentSelection(null);
      } else {
        // No match
        setTimeout(() => setCurrentSelection(null), 1500);
      }
    }
  };

  const allMatched = matchedPairs.length === shuffledItems.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-muted">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/activities">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                Lesson 4
              </span>
              <h1 className="text-xl font-bold text-foreground">Match Objects Used Together</h1>
            </div>
            <p className="text-sm text-muted-foreground">Topic A: Matching Objects</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {!showGame ? (
          <div className="space-y-6">
            {/* FIRST PAGE: Learning Goal + Body Parts Warm-Up */}
            {showBodyParts ? (
              <>
                {/* Learning Objective */}
                <Card className="border-2 border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <Star className="w-6 h-6 text-primary" />
                      Learning Goal
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-foreground">
                      Today, your child will learn to <span className="font-bold text-primary">match 2 objects that are used together</span>. 
                      These objects might not look the same at all, but they work together for a purpose!
                    </p>
                  </CardContent>
                </Card>

                {/* Body Parts Warm-Up */}
                <Card className="bg-primary/5 border-2 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-xl">🎵 Warm-Up: I Have 2 Chant</CardTitle>
                    <CardDescription>Let's count body parts that come in pairs!</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-card p-6 rounded-xl border-2 border-primary/20">
                      <p className="text-foreground mb-4">
                        <strong>Parent:</strong> Point to each body part as you count together!
                      </p>
                      
                      <div className="space-y-3">
                        {bodyParts.map((part, idx) => (
                          <div key={idx} className="flex items-center gap-4 p-3 bg-secondary/30 rounded-lg">
                            <span className="text-4xl">{part.emoji}</span>
                            <div className="flex-1">
                              <p className="font-semibold text-foreground">{part.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Point: 1 {part.name.slice(0, -1).toLowerCase()}, 2 {part.name.slice(0, -1).toLowerCase()} - I have 2!
                              </p>
                            </div>
                          </div>
                        ))}
                        <div className="text-center p-4 bg-warning/20 rounded-lg border-2 border-warning/30">
                          <p className="text-2xl font-bold text-foreground">Yahoo! And so do you! 🎉</p>
                        </div>
                      </div>
                    </div>

                    <Button 
                      onClick={() => setShowBodyParts(false)}
                      className="w-full"
                    >
                      Continue to Main Lesson
                    </Button>
                  </CardContent>
                </Card>
              </>
            ) : (
              // SECOND PAGE: Main Introduction
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">A New Way to Match!</CardTitle>
                    <CardDescription>Read this together with your child</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-secondary/30 p-6 rounded-xl border-2 border-primary/20">
                      <p className="text-lg text-foreground mb-4">
                        So far, we've matched things that <strong>look the same</strong>.
                      </p>
                      <p className="text-lg text-foreground mb-4">
                        Today is different! We'll match things that <strong>don't look the same</strong>, 
                        but we <strong>use them together</strong>!
                      </p>
                      <div className="bg-card p-4 rounded-lg border-2 border-primary/30">
                        <p className="text-xl font-bold text-primary text-center mb-2">
                          "They match because I use them together to..."
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-success/10 p-4 rounded-lg border-2 border-success/20">
                        <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                          <img src={cupImg} alt="Cup" className="w-8 h-8 object-contain" /> Example 1
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          <strong>Cup and Straw</strong><br/>
                          They don't look the same!<br/>
                          But: I use them together to <strong>drink</strong>!
                        </p>
                      </div>
                      <div className="bg-accent/10 p-4 rounded-lg border-2 border-accent/20">
                        <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                          <img src={pencilImg} alt="Pencil" className="w-8 h-8 object-contain" /> Example 2
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          <strong>Pencil and Paper</strong><br/>
                          They don't look the same!<br/>
                          But: I use them together to <strong>write</strong>!
                        </p>
                      </div>
                    </div>

                    {/* Parent Tips */}
                    <div className="flex items-start gap-4 p-4 bg-primary/10 rounded-lg border-2 border-primary/20">
                      <Users className="w-8 h-8 text-primary flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-2 text-foreground">Parent Tips:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Help your child use: "They match because I use them together to..."</li>
                          <li>• Ask: "What do we do with these things?"</li>
                          <li>• Point out items in your home that go together</li>
                          <li>• Examples: sock & shoe, fork & plate, key & lock</li>
                        </ul>
                      </div>
                    </div>

                    {/* Key Vocabulary */}
                    <div className="bg-warning/10 p-4 rounded-lg border-2 border-warning/20">
                      <div className="flex items-center gap-2 mb-3">
                        <Lightbulb className="w-5 h-5 text-warning" />
                        <h4 className="font-bold text-foreground">Key Phrase to Practice</h4>
                      </div>
                      <div className="bg-card p-4 rounded-lg">
                        <p className="font-bold text-primary text-lg text-center">
                          "They match because I use them together to..."
                        </p>
                        <p className="text-sm text-muted-foreground text-center mt-2">
                          Help your child complete this sentence for each match!
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Start Button */}
                <div className="text-center">
                  <Button 
                    size="lg" 
                    onClick={() => setShowGame(true)}
                    className="text-lg px-8 py-6 shadow-playful hover:scale-105 transition-all"
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    Start Matching Activity
                  </Button>
                </div>
              </>
            )}
          </div>
        ) : (
          // THIRD PAGE: Game
          <div className="space-y-6">
            {/* Game Instructions */}
            <Card className="bg-primary/5 border-2 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🎯</div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-foreground">How to Play:</h3>
                    <ol className="space-y-1 text-foreground">
                      <li>1. Look at all the objects</li>
                      <li>2. Find two objects that are used together</li>
                      <li>3. Click on both to make a match</li>
                      <li>4. Say: "They match because I use them together to..."</li>
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress */}
            <div className="flex items-center justify-between bg-card p-4 rounded-lg shadow">
              <div className="text-sm text-muted-foreground">
                Attempts: <span className="font-semibold text-foreground">{attempts}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Matched: <span className="font-semibold text-foreground">{matchedPairs.length / 2}</span> / 4
              </div>
            </div>

            {/* Game Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {shuffledItems.map((item) => {
                const isMatched = matchedPairs.includes(item.id);
                const isSelected = currentSelection?.id === item.id;
                
                return (
                  <Card
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className={`
                      cursor-pointer transition-all duration-300 hover:shadow-xl
                      ${isMatched ? 'opacity-50 border-4 border-success bg-success/10' : 'hover:scale-105'}
                      ${isSelected ? 'border-4 border-primary scale-105' : 'border-2'}
                    `}
                  >
                    <div className="aspect-square flex flex-col items-center justify-center p-4">
                      <div className="w-24 h-24 flex items-center justify-center mb-2">
                        <img src={item.img} alt={item.name} className="max-w-full max-h-full object-contain" />
                      </div>
                      <p className="text-sm text-center text-foreground font-medium">
                        {item.name}
                      </p>
                      {isMatched && (
                        <CheckCircle2 className="w-8 h-8 text-success mt-2" />
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Completion */}
            {allMatched && (
              <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-4 border-primary shadow-xl">
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-3xl font-bold mb-3 text-foreground">Excellent Work!</h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    You found all the objects that are used together! You completed it in {attempts} attempts.
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <h4 className="font-bold text-foreground text-xl">Your Matches:</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="bg-card p-4 rounded-lg border-2 border-success/30">
                        <div className="flex gap-2 justify-center mb-2">
                          <img src={cupImg} alt="Cup" className="w-12 h-12 object-contain" />
                          <span className="text-2xl">+</span>
                          <img src={strawImg} alt="Straw" className="w-12 h-12 object-contain" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          <strong>Cup and Straw</strong> match because we use them together to <strong>drink</strong>!
                        </p>
                      </div>
                      <div className="bg-card p-4 rounded-lg border-2 border-success/30">
                        <div className="flex gap-2 justify-center mb-2">
                          <img src={paperImg} alt="Paper" className="w-12 h-12 object-contain" />
                          <span className="text-2xl">+</span>
                          <img src={pencilImg} alt="Pencil" className="w-12 h-12 object-contain" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          <strong>Paper and Pencil</strong> match because we use them together to <strong>write</strong>!
                        </p>
                      </div>
                      <div className="bg-card p-4 rounded-lg border-2 border-success/30">
                        <div className="flex gap-2 justify-center mb-2">
                          <img src={toothbrushImg} alt="Toothbrush" className="w-12 h-12 object-contain" />
                          <span className="text-2xl">+</span>
                          <img src={toothpasteImg} alt="Toothpaste" className="w-12 h-12 object-contain" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          <strong>Toothbrush and Toothpaste</strong> match because we use them together to <strong>brush teeth</strong>!
                        </p>
                      </div>
                      <div className="bg-card p-4 rounded-lg border-2 border-success/30">
                        <div className="flex gap-2 justify-center mb-2">
                          <img src={sockImg} alt="Sock" className="w-12 h-12 object-contain" />
                          <span className="text-2xl">+</span>
                          <img src={shoeImg} alt="Shoe" className="w-12 h-12 object-contain" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          <strong>Sock and Shoe</strong> match because we use them together to <strong>wear on our feet</strong>!
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary/10 p-4 rounded-lg border-2 border-primary/20 mb-6">
                    <p className="text-muted-foreground text-sm">
                      <strong>🏠 Try at Home:</strong> Look around your house! Can you find other things that are used together? 
                      Maybe a fork and plate, or a key and lock?
                    </p>
                  </div>

                  <Button 
                    size="lg" 
                    onClick={() => navigate('/activities')}
                    className="shadow-playful hover:scale-105 transition-all"
                  >
                    Continue to Next Topic
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchingActivity4;

// import { useState, useMemo } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { ArrowLeft, BookOpen, Star, Users, Lightbulb, CheckCircle2 } from "lucide-react";
// import cupImg from "@/assets/cup.png";
// import strawImg from "@/assets/straw.png";
// import paperImg from "@/assets/paper.png";
// import pencilImg from "@/assets/pencil.png";
// import toothbrushImg from "@/assets/toothbrush.png";
// import toothpasteImg from "@/assets/toothpaste.png";
// import sockImg from "@/assets/sock.png";
// import shoeImg from "@/assets/shoe.png";

// const MatchingActivity4 = () => {
//   const navigate = useNavigate();
//   const [showGame, setShowGame] = useState(false);
//   const [showBodyParts, setShowBodyParts] = useState(true);
//   const [currentSelection, setCurrentSelection] = useState(null);
//   const [matchedPairs, setMatchedPairs] = useState([]);
//   const [attempts, setAttempts] = useState(0);

//   // Objects that are used together - shuffled to prevent adjacent matches
//   const shuffledItems = useMemo(() => {
//     const itemsArray = [
//       { id: 1, name: "Cup", img: cupImg, matchId: "drink", pair: "Straw" },
//       { id: 2, name: "Straw", img: strawImg, matchId: "drink", pair: "Cup" },
//       { id: 3, name: "Paper", img: paperImg, matchId: "write", pair: "Pencil" },
//       { id: 4, name: "Pencil", img: pencilImg, matchId: "write", pair: "Paper" },
//       { id: 5, name: "Toothbrush", img: toothbrushImg, matchId: "brush", pair: "Toothpaste" },
//       { id: 6, name: "Toothpaste", img: toothpasteImg, matchId: "brush", pair: "Toothbrush" },
//       { id: 7, name: "Sock", img: sockImg, matchId: "wear", pair: "Shoe" },
//       { id: 8, name: "Shoe", img: shoeImg, matchId: "wear", pair: "Sock" },
//     ];
//     return [...itemsArray].sort(() => Math.random() - 0.5);
//   }, []);

//   // Body parts that come in pairs
//   const bodyParts = [
//     { name: "Eyes", emoji: "👁️", count: 2 },
//     { name: "Ears", emoji: "👂", count: 2 },
//     { name: "Hands", emoji: "✋", count: 2 },
//     { name: "Feet", emoji: "🦶", count: 2 },
//     { name: "Legs", emoji: "🦵", count: 2 },
//   ];

//   const handleItemClick = (item) => {
//     if (matchedPairs.includes(item.id)) return;

//     if (!currentSelection) {
//       setCurrentSelection(item);
//     } else {
//       setAttempts(attempts + 1);
      
//       if (currentSelection.matchId === item.matchId && currentSelection.id !== item.id) {
//         // Match found!
//         setMatchedPairs([...matchedPairs, currentSelection.id, item.id]);
//         setCurrentSelection(null);
//       } else {
//         // No match
//         setTimeout(() => setCurrentSelection(null), 1500);
//       }
//     }
//   };

//   const allMatched = matchedPairs.length === shuffledItems.length;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-muted">
//       {/* Header */}
//       <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
//         <div className="container mx-auto px-4 py-4 flex items-center gap-4">
//           <Link to="/activities">
//             <Button variant="ghost" size="icon">
//               <ArrowLeft className="w-5 h-5" />
//             </Button>
//           </Link>
//           <div>
//             <div className="flex items-center gap-2">
//               <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
//                 Lesson 4
//               </span>
//               <h1 className="text-xl font-bold text-foreground">Match Objects Used Together</h1>
//             </div>
//             <p className="text-sm text-muted-foreground">Topic A: Matching Objects</p>
//           </div>
//         </div>
//       </header>

//       <div className="container mx-auto px-4 py-12 max-w-6xl">
//         {!showGame ? (
//           <div className="space-y-6">
//             {/* Learning Objective */}
//             <Card className="border-2 border-primary/20">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2 text-2xl">
//                   <Star className="w-6 h-6 text-primary" />
//                   Learning Goal
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-lg text-foreground">
//                   Today, your child will learn to <span className="font-bold text-primary">match 2 objects that are used together</span>. 
//                   These objects might not look the same at all, but they work together for a purpose!
//                 </p>
//               </CardContent>
//             </Card>

//             {/* Body Parts Warm-Up */}
//             {showBodyParts && (
//               <Card className="bg-primary/5 border-2 border-primary/20">
//                 <CardHeader>
//                   <CardTitle className="text-xl">🎵 Warm-Up: I Have 2 Chant</CardTitle>
//                   <CardDescription>Let's count body parts that come in pairs!</CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="bg-card p-6 rounded-xl border-2 border-primary/20">
//                     <p className="text-foreground mb-4">
//                       <strong>Parent:</strong> Point to each body part as you count together!
//                     </p>
                    
//                     <div className="space-y-3">
//                       {bodyParts.map((part, idx) => (
//                         <div key={idx} className="flex items-center gap-4 p-3 bg-secondary/30 rounded-lg">
//                           <span className="text-4xl">{part.emoji}</span>
//                           <div className="flex-1">
//                             <p className="font-semibold text-foreground">{part.name}</p>
//                             <p className="text-sm text-muted-foreground">
//                               Point: 1 {part.name.slice(0, -1).toLowerCase()}, 2 {part.name.slice(0, -1).toLowerCase()} - I have 2!
//                             </p>
//                           </div>
//                         </div>
//                       ))}
//                       <div className="text-center p-4 bg-warning/20 rounded-lg border-2 border-warning/30">
//                         <p className="text-2xl font-bold text-foreground">Yahoo! And so do you! 🎉</p>
//                       </div>
//                     </div>
//                   </div>

//                   <Button 
//                     onClick={() => setShowBodyParts(false)}
//                     className="w-full"
//                   >
//                     Continue to Main Lesson
//                   </Button>
//                 </CardContent>
//               </Card>
//             )}

//             {/* Introduction - Only show after warm-up */}
//             {!showBodyParts && (
//               <>
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="text-xl">A New Way to Match!</CardTitle>
//                     <CardDescription>Read this together with your child</CardDescription>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="bg-secondary/30 p-6 rounded-xl border-2 border-primary/20">
//                       <p className="text-lg text-foreground mb-4">
//                         So far, we've matched things that <strong>look the same</strong>.
//                       </p>
//                       <p className="text-lg text-foreground mb-4">
//                         Today is different! We'll match things that <strong>don't look the same</strong>, 
//                         but we <strong>use them together</strong>!
//                       </p>
//                       <div className="bg-card p-4 rounded-lg border-2 border-primary/30">
//                         <p className="text-xl font-bold text-primary text-center mb-2">
//                           "They match because I use them together to..."
//                         </p>
//                       </div>
//                     </div>

//                     <div className="grid md:grid-cols-2 gap-4">
//                       <div className="bg-success/10 p-4 rounded-lg border-2 border-success/20">
//                         <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
//                           <img src={cupImg} alt="Cup" className="w-8 h-8 object-contain" /> Example 1
//                         </h4>
//                         <p className="text-sm text-muted-foreground">
//                           <strong>Cup and Straw</strong><br/>
//                           They don't look the same!<br/>
//                           But: I use them together to <strong>drink</strong>!
//                         </p>
//                       </div>
//                       <div className="bg-accent/10 p-4 rounded-lg border-2 border-accent/20">
//                         <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
//                           <img src={pencilImg} alt="Pencil" className="w-8 h-8 object-contain" /> Example 2
//                         </h4>
//                         <p className="text-sm text-muted-foreground">
//                           <strong>Pencil and Paper</strong><br/>
//                           They don't look the same!<br/>
//                           But: I use them together to <strong>write</strong>!
//                         </p>
//                       </div>
//                     </div>

//                     {/* Parent Tips */}
//                     <div className="flex items-start gap-4 p-4 bg-primary/10 rounded-lg border-2 border-primary/20">
//                       <Users className="w-8 h-8 text-primary flex-shrink-0" />
//                       <div>
//                         <h4 className="font-semibold mb-2 text-foreground">Parent Tips:</h4>
//                         <ul className="text-sm text-muted-foreground space-y-1">
//                           <li>• Help your child use: "They match because I use them together to..."</li>
//                           <li>• Ask: "What do we do with these things?"</li>
//                           <li>• Point out items in your home that go together</li>
//                           <li>• Examples: sock & shoe, fork & plate, key & lock</li>
//                         </ul>
//                       </div>
//                     </div>

//                     {/* Key Vocabulary */}
//                     <div className="bg-warning/10 p-4 rounded-lg border-2 border-warning/20">
//                       <div className="flex items-center gap-2 mb-3">
//                         <Lightbulb className="w-5 h-5 text-warning" />
//                         <h4 className="font-bold text-foreground">Key Phrase to Practice</h4>
//                       </div>
//                       <div className="bg-card p-4 rounded-lg">
//                         <p className="font-bold text-primary text-lg text-center">
//                           "They match because I use them together to..."
//                         </p>
//                         <p className="text-sm text-muted-foreground text-center mt-2">
//                           Help your child complete this sentence for each match!
//                         </p>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 {/* Start Button - Only show after warm-up */}
//                 <div className="text-center">
//                   <Button 
//                     size="lg" 
//                     onClick={() => setShowGame(true)}
//                     className="text-lg px-8 py-6 shadow-playful hover:scale-105 transition-all"
//                   >
//                     <BookOpen className="w-5 h-5 mr-2" />
//                     Start Matching Activity
//                   </Button>
//                 </div>
//               </>
//             )}
//           </div>
//         ) : (
//           // ... rest of your game code remains the same
//           <div className="space-y-6">
//             {/* Game Instructions */}
//             <Card className="bg-primary/5 border-2 border-primary/20">
//               <CardContent className="pt-6">
//                 <div className="flex items-start gap-4">
//                   <div className="text-4xl">🎯</div>
//                   <div>
//                     <h3 className="font-bold text-lg mb-2 text-foreground">How to Play:</h3>
//                     <ol className="space-y-1 text-foreground">
//                       <li>1. Look at all the objects</li>
//                       <li>2. Find two objects that are used together</li>
//                       <li>3. Click on both to make a match</li>
//                       <li>4. Say: "They match because I use them together to..."</li>
//                     </ol>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Progress */}
//             <div className="flex items-center justify-between bg-card p-4 rounded-lg shadow">
//               <div className="text-sm text-muted-foreground">
//                 Attempts: <span className="font-semibold text-foreground">{attempts}</span>
//               </div>
//               <div className="text-sm text-muted-foreground">
//                 Matched: <span className="font-semibold text-foreground">{matchedPairs.length / 2}</span> / 4
//               </div>
//             </div>

//             {/* Game Grid */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {shuffledItems.map((item) => {
//                 const isMatched = matchedPairs.includes(item.id);
//                 const isSelected = currentSelection?.id === item.id;
                
//                 return (
//                   <Card
//                     key={item.id}
//                     onClick={() => handleItemClick(item)}
//                     className={`
//                       cursor-pointer transition-all duration-300 hover:shadow-xl
//                       ${isMatched ? 'opacity-50 border-4 border-success bg-success/10' : 'hover:scale-105'}
//                       ${isSelected ? 'border-4 border-primary scale-105' : 'border-2'}
//                     `}
//                   >
//                     <div className="aspect-square flex flex-col items-center justify-center p-4">
//                       <div className="w-24 h-24 flex items-center justify-center mb-2">
//                         <img src={item.img} alt={item.name} className="max-w-full max-h-full object-contain" />
//                       </div>
//                       <p className="text-sm text-center text-foreground font-medium">
//                         {item.name}
//                       </p>
//                       {isMatched && (
//                         <CheckCircle2 className="w-8 h-8 text-success mt-2" />
//                       )}
//                     </div>
//                   </Card>
//                 );
//               })}
//             </div>

//             {/* Completion */}
//             {allMatched && (
//               <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-4 border-primary shadow-xl">
//                 <CardContent className="p-8 text-center">
//                   <div className="text-6xl mb-4">🎉</div>
//                   <h3 className="text-3xl font-bold mb-3 text-foreground">Excellent Work!</h3>
//                   <p className="text-lg text-muted-foreground mb-6">
//                     You found all the objects that are used together! You completed it in {attempts} attempts.
//                   </p>
                  
//                   <div className="space-y-3 mb-6">
//                     <h4 className="font-bold text-foreground text-xl">Your Matches:</h4>
//                     <div className="grid md:grid-cols-2 gap-3">
//                       <div className="bg-card p-4 rounded-lg border-2 border-success/30">
//                         <div className="flex gap-2 justify-center mb-2">
//                           <img src={cupImg} alt="Cup" className="w-12 h-12 object-contain" />
//                           <span className="text-2xl">+</span>
//                           <img src={strawImg} alt="Straw" className="w-12 h-12 object-contain" />
//                         </div>
//                         <p className="text-sm text-muted-foreground">
//                           <strong>Cup and Straw</strong> match because we use them together to <strong>drink</strong>!
//                         </p>
//                       </div>
//                       <div className="bg-card p-4 rounded-lg border-2 border-success/30">
//                         <div className="flex gap-2 justify-center mb-2">
//                           <img src={paperImg} alt="Paper" className="w-12 h-12 object-contain" />
//                           <span className="text-2xl">+</span>
//                           <img src={pencilImg} alt="Pencil" className="w-12 h-12 object-contain" />
//                         </div>
//                         <p className="text-sm text-muted-foreground">
//                           <strong>Paper and Pencil</strong> match because we use them together to <strong>write</strong>!
//                         </p>
//                       </div>
//                       <div className="bg-card p-4 rounded-lg border-2 border-success/30">
//                         <div className="flex gap-2 justify-center mb-2">
//                           <img src={toothbrushImg} alt="Toothbrush" className="w-12 h-12 object-contain" />
//                           <span className="text-2xl">+</span>
//                           <img src={toothpasteImg} alt="Toothpaste" className="w-12 h-12 object-contain" />
//                         </div>
//                         <p className="text-sm text-muted-foreground">
//                           <strong>Toothbrush and Toothpaste</strong> match because we use them together to <strong>brush teeth</strong>!
//                         </p>
//                       </div>
//                       <div className="bg-card p-4 rounded-lg border-2 border-success/30">
//                         <div className="flex gap-2 justify-center mb-2">
//                           <img src={sockImg} alt="Sock" className="w-12 h-12 object-contain" />
//                           <span className="text-2xl">+</span>
//                           <img src={shoeImg} alt="Shoe" className="w-12 h-12 object-contain" />
//                         </div>
//                         <p className="text-sm text-muted-foreground">
//                           <strong>Sock and Shoe</strong> match because we use them together to <strong>wear on our feet</strong>!
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="bg-primary/10 p-4 rounded-lg border-2 border-primary/20 mb-6">
//                     <p className="text-muted-foreground text-sm">
//                       <strong>🏠 Try at Home:</strong> Look around your house! Can you find other things that are used together? 
//                       Maybe a fork and plate, or a key and lock?
//                     </p>
//                   </div>

//                   <Button 
//                     size="lg" 
//                     onClick={() => navigate('/activities')}
//                     className="shadow-playful hover:scale-105 transition-all"
//                   >
//                     Continue to Next Topic
//                   </Button>
//                 </CardContent>
//               </Card>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MatchingActivity4;// import { useState, useMemo } from "react";

// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { ArrowLeft, Star, BookOpen, Users, Lightbulb, CheckCircle2 } from "lucide-react";
// import cupImg from "@/assets/cup.png";
// import strawImg from "@/assets/straw.png";
// import paperImg from "@/assets/paper.png";
// import pencilImg from "@/assets/pencil.png";
// import toothbrushImg from "@/assets/toothbrush.png";
// import toothpasteImg from "@/assets/toothpaste.png";
// import sockImg from "@/assets/sock.png";
// import shoeImg from "@/assets/shoe.png";

// const MatchingActivity4 = () => {
//   const navigate = useNavigate();
//   const [showGame, setShowGame] = useState(false);
//   const [showBodyParts, setShowBodyParts] = useState(true);
//   const [currentSelection, setCurrentSelection] = useState(null);
//   const [matchedPairs, setMatchedPairs] = useState([]);
//   const [attempts, setAttempts] = useState(0);

//   // Objects that are used together - shuffled to prevent adjacent matches
//   const shuffledItems = useMemo(() => {
//     const itemsArray = [
//       { id: 1, name: "Cup", img: cupImg, matchId: "drink", pair: "Straw" },
//       { id: 2, name: "Straw", img: strawImg, matchId: "drink", pair: "Cup" },
//       { id: 3, name: "Paper", img: paperImg, matchId: "write", pair: "Pencil" },
//       { id: 4, name: "Pencil", img: pencilImg, matchId: "write", pair: "Paper" },
//       { id: 5, name: "Toothbrush", img: toothbrushImg, matchId: "brush", pair: "Toothpaste" },
//       { id: 6, name: "Toothpaste", img: toothpasteImg, matchId: "brush", pair: "Toothbrush" },
//       { id: 7, name: "Sock", img: sockImg, matchId: "wear", pair: "Shoe" },
//       { id: 8, name: "Shoe", img: shoeImg, matchId: "wear", pair: "Sock" },
//     ];
//     return [...itemsArray].sort(() => Math.random() - 0.5);
//   }, []);

//   // Body parts that come in pairs
//   const bodyParts = [
//     { name: "Eyes", emoji: "👁️", count: 2 },
//     { name: "Ears", emoji: "👂", count: 2 },
//     { name: "Hands", emoji: "✋", count: 2 },
//     { name: "Feet", emoji: "🦶", count: 2 },
//     { name: "Legs", emoji: "🦵", count: 2 },
//   ];

//   const handleItemClick = (item) => {
//     if (matchedPairs.includes(item.id)) return;

//     if (!currentSelection) {
//       setCurrentSelection(item);
//     } else {
//       setAttempts(attempts + 1);
      
//       if (currentSelection.matchId === item.matchId && currentSelection.id !== item.id) {
//         // Match found!
//         setMatchedPairs([...matchedPairs, currentSelection.id, item.id]);
//         setCurrentSelection(null);
//       } else {
//         // No match
//         setTimeout(() => setCurrentSelection(null), 1500);
//       }
//     }
//   };

//   const allMatched = matchedPairs.length === shuffledItems.length;

//   const getMatchDescription = (matchId) => {
//     switch(matchId) {
//       case "drink": return "drink something";
//       case "write": return "draw or write";
//       case "brush": return "brush teeth";
//       case "wear": return "wear on our feet";
//       default: return "use together";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center gap-4 mb-8">
//           <Button variant="outline" size="icon" onClick={() => window.history.back()}>
//             <ArrowLeft className="w-5 h-5" />
//           </Button>
//           <div>
//             <div className="flex items-center gap-2">
//               <span className="text-sm font-semibold text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
//                 Lesson 4
//               </span>
//               <h1 className="text-2xl font-bold text-gray-800">Match Objects Used Together</h1>
//             </div>
//             <p className="text-sm text-gray-600">Topic A: Matching Objects</p>
//           </div>
//         </div>

//         {!showGame ? (
//           <div className="space-y-6">
//             {/* Learning Objective */}
//             <Card className="border-2 border-purple-200 bg-white shadow-lg">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2 text-2xl text-purple-700">
//                   <Star className="w-6 h-6" />
//                   Learning Goal
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-lg text-gray-700">
//                   Today, your child will learn to <span className="font-bold text-purple-700">match 2 objects that are used together</span>. 
//                   These objects might not look the same at all, but they work together for a purpose!
//                 </p>
//               </CardContent>
//             </Card>

//             {/* Body Parts Warm-Up */}
            

//             {/* Introduction */}
//             {!showBodyParts && (
//               <>
//                 <Card className="bg-white shadow-lg">
//                   <CardHeader>
//                     <CardTitle className="text-xl text-gray-800">A New Way to Match!</CardTitle>
//                     <CardDescription>Read this together with your child</CardDescription>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
//                       <p className="text-lg text-gray-700 mb-4">
//                         So far, we've matched things that <strong>look the same</strong>.
//                       </p>
//                       <p className="text-lg text-gray-700 mb-4">
//                         Today is different! We'll match things that <strong>don't look the same</strong>, 
//                         but we <strong>use them together</strong>!
//                       </p>
//                       <div className="bg-white p-4 rounded-lg border-2 border-purple-300">
//                         <p className="text-xl font-bold text-purple-700 text-center mb-2">
//                           "They match because I use them together to..."
//                         </p>
//                       </div>
//                     </div>

//                     <div className="grid md:grid-cols-2 gap-4">
//                       <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
//                         <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
//                           <img src={cupImg} alt="Cup" className="w-8 h-8 object-contain" /> Example 1
//                         </h4>
//                         <p className="text-sm text-gray-600">
//                           <strong>Cup and Straw</strong><br/>
//                           They don't look the same!<br/>
//                           But: I use them together to <strong>drink</strong>!
//                         </p>
//                       </div>
//                       <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-200">
//                         <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
//                           <img src={pencilImg} alt="Pencil" className="w-8 h-8 object-contain" /> Example 2
//                         </h4>
//                         <p className="text-sm text-gray-600">
//                           <strong>Pencil and Paper</strong><br/>
//                           They don't look the same!<br/>
//                           But: I use them together to <strong>write</strong>!
//                         </p>
//                       </div>
//                     </div>

//                     {/* Parent Tips */}
//                     <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
//                       <Users className="w-8 h-8 text-blue-600 flex-shrink-0" />
//                       <div>
//                         <h4 className="font-semibold mb-2 text-gray-800">Parent Tips:</h4>
//                         <ul className="text-sm text-gray-600 space-y-1">
//                           <li>• Help your child use: "They match because I use them together to..."</li>
//                           <li>• Ask: "What do we do with these things?"</li>
//                           <li>• Point out items in your home that go together</li>
//                           <li>• Examples: sock & shoe, fork & plate, key & lock</li>
//                         </ul>
//                       </div>
//                     </div>

//                     {/* Key Vocabulary */}
//                     <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
//                       <div className="flex items-center gap-2 mb-3">
//                         <Lightbulb className="w-5 h-5 text-yellow-600" />
//                         <h4 className="font-bold text-gray-800">Key Phrase to Practice</h4>
//                       </div>
//                       <div className="bg-white p-4 rounded-lg">
//                         <p className="font-bold text-purple-700 text-lg text-center">
//                           "They match because I use them together to..."
//                         </p>
//                         <p className="text-sm text-gray-600 text-center mt-2">
//                           Help your child complete this sentence for each match!
//                         </p>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 {/* Start Button */}
//                 <div className="text-center">
//                   <Button 
//                     size="lg" 
//                     onClick={() => setShowGame(true)}
//                     className="text-lg px-8 py-6 bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-xl transition-all"
//                   >
//                     <BookOpen className="w-5 h-5 mr-2" />
//                     Start Matching Activity
//                   </Button>
//                 </div>
//               </>
//             )}
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {/* Game Instructions */}
//             <Card className="bg-purple-50 border-2 border-purple-300">
//               <CardContent className="pt-6">
//                 <div className="flex items-start gap-4">
//                   <div className="text-4xl">🎯</div>
//                   <div>
//                     <h3 className="font-bold text-lg mb-2 text-gray-800">How to Play:</h3>
//                     <ol className="space-y-1 text-gray-700">
//                       <li>1. Look at all the objects</li>
//                       <li>2. Find two objects that are used together</li>
//                       <li>3. Click on both to make a match</li>
//                       <li>4. Say: "They match because I use them together to..."</li>
//                     </ol>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Progress */}
//             <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
//               <div className="text-sm text-gray-600">
//                 Attempts: <span className="font-semibold text-gray-800">{attempts}</span>
//               </div>
//               <div className="text-sm text-gray-600">
//                 Matched: <span className="font-semibold text-gray-800">{matchedPairs.length / 2}</span> / 4
//               </div>
//             </div>

//             {/* Game Grid */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {shuffledItems.map((item) => {
//                 const isMatched = matchedPairs.includes(item.id);
//                 const isSelected = currentSelection?.id === item.id;
                
//                 return (
//                   <Card
//                     key={item.id}
//                     onClick={() => handleItemClick(item)}
//                     className={`
//                       cursor-pointer transition-all duration-300 hover:shadow-xl
//                       ${isMatched ? 'opacity-50 border-4 border-green-500 bg-green-50' : 'hover:scale-105'}
//                       ${isSelected ? 'border-4 border-blue-500 scale-105' : 'border-2'}
//                     `}
//                   >
//                     <div className="aspect-square flex flex-col items-center justify-center p-4">
//                       <div className="w-24 h-24 flex items-center justify-center mb-2">
//                         <img src={item.img} alt={item.name} className="max-w-full max-h-full object-contain" />
//                       </div>
//                       <p className="text-sm text-center text-gray-700 font-medium">
//                         {item.name}
//                       </p>
//                       {isMatched && (
//                         <CheckCircle2 className="w-8 h-8 text-green-600 mt-2" />
//                       )}
//                     </div>
//                   </Card>
//                 );
//               })}
//             </div>

//             {/* Completion */}
//             {allMatched && (
//               <Card className="bg-gradient-to-br from-purple-100 to-pink-100 border-4 border-purple-400 shadow-xl">
//                 <CardContent className="p-8 text-center">
//                   <div className="text-6xl mb-4">🎉</div>
//                   <h3 className="text-3xl font-bold mb-3 text-gray-800">Excellent Work!</h3>
//                   <p className="text-lg text-gray-700 mb-6">
//                     You found all the objects that are used together! You completed it in {attempts} attempts.
//                   </p>
                  
//                   <div className="space-y-3 mb-6">
//                     <h4 className="font-bold text-gray-800 text-xl">Your Matches:</h4>
//                     <div className="grid md:grid-cols-2 gap-3">
//                       <div className="bg-white p-4 rounded-lg border-2 border-green-300">
//                         <div className="flex gap-2 justify-center mb-2">
//                           <img src={cupImg} alt="Cup" className="w-12 h-12 object-contain" />
//                           <span className="text-2xl">+</span>
//                           <img src={strawImg} alt="Straw" className="w-12 h-12 object-contain" />
//                         </div>
//                         <p className="text-sm text-gray-700">
//                           <strong>Cup and Straw</strong> match because we use them together to <strong>drink</strong>!
//                         </p>
//                       </div>
//                       <div className="bg-white p-4 rounded-lg border-2 border-green-300">
//                         <div className="flex gap-2 justify-center mb-2">
//                           <img src={paperImg} alt="Paper" className="w-12 h-12 object-contain" />
//                           <span className="text-2xl">+</span>
//                           <img src={pencilImg} alt="Pencil" className="w-12 h-12 object-contain" />
//                         </div>
//                         <p className="text-sm text-gray-700">
//                           <strong>Paper and Pencil</strong> match because we use them together to <strong>write</strong>!
//                         </p>
//                       </div>
//                       <div className="bg-white p-4 rounded-lg border-2 border-green-300">
//                         <div className="flex gap-2 justify-center mb-2">
//                           <img src={toothbrushImg} alt="Toothbrush" className="w-12 h-12 object-contain" />
//                           <span className="text-2xl">+</span>
//                           <img src={toothpasteImg} alt="Toothpaste" className="w-12 h-12 object-contain" />
//                         </div>
//                         <p className="text-sm text-gray-700">
//                           <strong>Toothbrush and Toothpaste</strong> match because we use them together to <strong>brush teeth</strong>!
//                         </p>
//                       </div>
//                       <div className="bg-white p-4 rounded-lg border-2 border-green-300">
//                         <div className="flex gap-2 justify-center mb-2">
//                           <img src={sockImg} alt="Sock" className="w-12 h-12 object-contain" />
//                           <span className="text-2xl">+</span>
//                           <img src={shoeImg} alt="Shoe" className="w-12 h-12 object-contain" />
//                         </div>
//                         <p className="text-sm text-gray-700">
//                           <strong>Sock and Shoe</strong> match because we use them together to <strong>wear on our feet</strong>!
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-300 mb-6">
//                     <p className="text-gray-700 text-sm">
//                       <strong>🏠 Try at Home:</strong> Look around your house! Can you find other things that are used together? 
//                       Maybe a fork and plate, or a key and lock?
//                     </p>
//                   </div>

//                   <Button 
//                     size="lg" 
//                     onClick={() => navigate('/activities')}
//                     className="bg-purple-600 hover:bg-purple-700"
//                   >
//                     Continue to Next Topic
//                   </Button>
//                 </CardContent>
//               </Card>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MatchingActivity4;

// // // ESTEM-preK-Math/src/pages/MatchingActivity4.tsx
// // import { useState, useMemo } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { Button } from "@/components/ui/button";
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// // import { ArrowLeft, BookOpen, Star } from "lucide-react";
// // import MatchingGame from "@/components/MatchingGame";
// // import pencilImg from "@/assets/pencil.png";
// // import paperImg from "@/assets/paper.png";
// // import cupImg from "@/assets/cup.png";
// // import strawImg from "@/assets/straw.png";
// // import toothbrushImg from "@/assets/toothbrush.png";
// // import toothpasteImg from "@/assets/toothpaste.png";
// // import shoeImg from "@/assets/shoe.png";
// // import sockImg from "@/assets/sock.png";

// // const MatchingActivity4 = () => {
// //   const [showGame, setShowGame] = useState(false);
// //   const navigate = useNavigate();

// //   // Objects that are used together functionally
// //   const gameItems = [
// //     { id: 1, image: pencilImg, matchId: 2, name: "pencil" },
// //     { id: 2, image: paperImg, matchId: 1, name: "paper" },
// //     { id: 3, image: cupImg, matchId: 4, name: "cup" },
// //     { id: 4, image: strawImg, matchId: 3, name: "straw" },
// //     { id: 5, image: toothbrushImg, matchId: 6, name: "toothbrush" },
// //     { id: 6, image: toothpasteImg, matchId: 5, name: "toothpaste" },
// //     { id: 7, image: shoeImg, matchId: 8, name: "shoe" },
// //     { id: 8, image: sockImg, matchId: 7, name: "sock" },
// //   ];

// //   const shuffledGameItems = useMemo(() => {
// //     const arr = [...gameItems];
// //     for (let i = arr.length - 1; i > 0; i--) {
// //       const j = Math.floor(Math.random() * (i + 1));
// //       [arr[i], arr[j]] = [arr[j], arr[i]];
// //     }
// //     return arr;
// //   }, []);

// //   const handleComplete = () => {
// //     navigate("/activities");
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-muted">
// //       {/* Header */}
// //       <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
// //         <div className="container mx-auto px-4 py-4 flex items-center gap-4">
// //           <Link to="/activities">
// //             <Button variant="ghost" size="icon">
// //               <ArrowLeft className="w-5 h-5" />
// //             </Button>
// //           </Link>
// //           <div>
// //             <div className="flex items-center gap-2">
// //               <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
// //                 Lesson 4
// //               </span>
// //               <h1 className="text-xl font-bold text-foreground">Match Objects Used Together</h1>
// //             </div>
// //             <p className="text-sm text-muted-foreground">Topic A: Matching Objects</p>
// //           </div>
// //         </div>
// //       </header>

// //       <div className="container mx-auto px-4 py-12 max-w-4xl">
// //         {!showGame ? (
// //           <>
// //             {/* Learning Objective */}
// //             <Card className="mb-8 border-2 border-primary/20">
// //               <CardHeader>
// //                 <CardTitle className="flex items-center gap-2 text-2xl">
// //                   <Star className="w-6 h-6 text-primary" />
// //                   Learning Goal
// //                 </CardTitle>
// //               </CardHeader>
// //               <CardContent>
// //                 <p className="text-lg text-foreground">
// //                   Today, your child will learn to <span className="font-bold text-primary">match 2 objects that are used together</span>.
// //                   This helps develop understanding of object functions and real-world connections.
// //                 </p>
// //               </CardContent>
// //             </Card>

// //             {/* Introduction */}
// //             <Card className="mb-8">
// //               <CardHeader>
// //                 <CardTitle className="text-xl">Let's Learn About Objects That Go Together!</CardTitle>
// //                 <CardDescription>Read this together with your child</CardDescription>
// //               </CardHeader>
// //               <CardContent className="space-y-4">
// //                 <div className="bg-secondary/30 p-6 rounded-xl">
// //                   <p className="text-lg text-foreground mb-4">
// //                     Some objects <span className="font-bold text-primary">go together</span> because we use them together, even if they don't look the same!
// //                   </p>
// //                   <div className="grid md:grid-cols-2 gap-4 mt-4">
// //                     <div className="flex items-center gap-3 p-3 bg-card rounded-lg">
// //                       <span className="text-2xl">✏️</span>
// //                       <div>
// //                         <p className="font-semibold text-foreground">Pencil and Paper</p>
// //                         <p className="text-sm text-muted-foreground">We use them together to write</p>
// //                       </div>
// //                     </div>
// //                     <div className="flex items-center gap-3 p-3 bg-card rounded-lg">
// //                       <span className="text-2xl">🥤</span>
// //                       <div>
// //                         <p className="font-semibold text-foreground">Cup and Straw</p>
// //                         <p className="text-sm text-muted-foreground">We use them together to drink</p>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="flex items-start gap-4 p-4 bg-accent/10 rounded-lg">
// //                   <div className="text-3xl">👨‍👩‍👧‍👦</div>
// //                   <div>
// //                     <h4 className="font-semibold mb-2 text-foreground">Parent Tip:</h4>
// //                     <p className="text-sm text-muted-foreground">
// //                       Encourage your child to say "They match because I use them together to..." when describing matches. 
// //                       For example: "They match because I use them together to write" or "They match because I use them together to drink."
// //                     </p>
// //                   </div>
// //                 </div>
// //               </CardContent>
// //             </Card>

// //             {/* Vocabulary */}
// //             <Card className="mb-8">
// //               <CardHeader>
// //                 <CardTitle className="text-xl">Key Words</CardTitle>
// //               </CardHeader>
// //               <CardContent>
// //                 <div className="grid md:grid-cols-2 gap-4">
// //                   <div className="p-4 bg-muted rounded-lg">
// //                     <h4 className="font-bold text-primary mb-1">Used together</h4>
// //                     <p className="text-sm text-muted-foreground">Objects that we use with each other for the same activity</p>
// //                   </div>
// //                   <div className="p-4 bg-muted rounded-lg">
// //                     <h4 className="font-bold text-primary mb-1">Go together</h4>
// //                     <p className="text-sm text-muted-foreground">Objects that belong with each other or are used as a pair</p>
// //                   </div>
// //                 </div>
// //               </CardContent>
// //             </Card>

// //             {/* Real World Examples */}
// //             <Card className="mb-8">
// //               <CardHeader>
// //                 <CardTitle className="text-xl">Objects That Go Together</CardTitle>
// //                 <CardDescription>Look for these pairs around your home!</CardDescription>
// //               </CardHeader>
// //               <CardContent>
// //                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// //                   <div className="text-center p-4 bg-card rounded-xl">
// //                     <div className="text-3xl mb-2">🧦👟</div>
// //                     <p className="text-sm font-medium text-foreground">Socks and Shoes</p>
// //                   </div>
// //                   <div className="text-center p-4 bg-card rounded-xl">
// //                     <div className="text-3xl mb-2">🍽️🥄</div>
// //                     <p className="text-sm font-medium text-foreground">Plate and Spoon</p>
// //                   </div>
// //                   <div className="text-center p-4 bg-card rounded-xl">
// //                     <div className="text-3xl mb-2">📘🎒</div>
// //                     <p className="text-sm font-medium text-foreground">Book and Backpack</p>
// //                   </div>
// //                   <div className="text-center p-4 bg-card rounded-xl">
// //                     <div className="text-3xl mb-2">🔑🚪</div>
// //                     <p className="text-sm font-medium text-foreground">Key and Door</p>
// //                   </div>
// //                 </div>
// //               </CardContent>
// //             </Card>

// //             {/* Start Button */}
// //             <div className="text-center">
// //               <Button 
// //                 size="lg" 
// //                 onClick={() => setShowGame(true)}
// //                 className="text-lg px-8 py-6 shadow-playful hover:scale-105 transition-all"
// //               >
// //                 <BookOpen className="w-5 h-5 mr-2" />
// //                 Start Activity
// //               </Button>
// //             </div>
// //           </>
// //         ) : (
// //           <>
// //             {/* Game Instructions */}
// //             <Card className="mb-8 bg-primary/5 border-2 border-primary/20">
// //               <CardContent className="pt-6">
// //                 <div className="flex items-start gap-4">
// //                   <div className="text-4xl">🎯</div>
// //                   <div>
// //                     <h3 className="font-bold text-lg mb-2 text-foreground">How to Play:</h3>
// //                     <ol className="space-y-1 text-foreground">
// //                       <li>1. Click on an object</li>
// //                       <li>2. Click on another object that is used with it</li>
// //                       <li>3. If they go together, you'll see a checkmark!</li>
// //                       <li>4. Match all the pairs to complete the activity</li>
// //                     </ol>
// //                     <div className="mt-4 p-3 bg-primary/10 rounded-lg">
// //                       <p className="text-sm font-medium text-primary">
// //                         💡 Remember: These objects don't look the same, but they are used together!
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </CardContent>
// //             </Card>

// //             {/* Game */}
// //             <MatchingGame items={shuffledGameItems} onComplete={handleComplete} />
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default MatchingActivity4;

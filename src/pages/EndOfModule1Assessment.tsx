import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Bird, Save, Printer } from "lucide-react";
import { toast } from "sonner";

type RubricScore = 1 | 2 | 3 | 4 | null;

interface TopicAssessment {
  score: RubricScore;
  timeElapsed: string;
  whatDidDo: string[];
  whatDidSay: string[];
}

const EndOfModule1Assessment = () => {
  const [studentName, setStudentName] = useState("");
  const [assessmentDate, setAssessmentDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [topicE, setTopicE] = useState<TopicAssessment>({
    score: null,
    timeElapsed: "",
    whatDidDo: ["", "", ""],
    whatDidSay: ["", "", ""]
  });
  
  const [topicF, setTopicF] = useState<TopicAssessment>({
    score: null,
    timeElapsed: "",
    whatDidDo: ["", "", "", "", ""],
    whatDidSay: ["", "", "", "", ""]
  });
  
  const [topicG, setTopicG] = useState<TopicAssessment>({
    score: null,
    timeElapsed: "",
    whatDidDo: ["", ""],
    whatDidSay: ["", ""]
  });
  
  const [topicH, setTopicH] = useState<TopicAssessment>({
    score: null,
    timeElapsed: "",
    whatDidDo: ["", "", ""],
    whatDidSay: ["", "", ""]
  });

  const handleSave = () => {
    const assessmentData = {
      studentName,
      assessmentDate,
      topicE,
      topicF,
      topicG,
      topicH,
      savedAt: new Date().toISOString()
    };
    
    // Save to localStorage
    const existingAssessments = JSON.parse(localStorage.getItem('ethiostem-end-module1-assessments') || '[]');
    existingAssessments.push(assessmentData);
    localStorage.setItem('ethiostem-end-module1-assessments', JSON.stringify(existingAssessments));
    
    toast.success("Assessment saved successfully!");
  };

  const handlePrint = () => {
    window.print();
  };

  const RubricScoreSelector = ({ 
    value, 
    onChange 
  }: { 
    value: RubricScore; 
    onChange: (score: RubricScore) => void 
  }) => (
    <div className="flex gap-2">
      {[1, 2, 3, 4].map((score) => (
        <button
          key={score}
          onClick={() => onChange(score as RubricScore)}
          className={`w-10 h-10 rounded-lg font-bold transition-all ${
            value === score
              ? score === 4 ? 'bg-green-500 text-white'
              : score === 3 ? 'bg-blue-500 text-white'
              : score === 2 ? 'bg-yellow-500 text-white'
              : 'bg-red-500 text-white'
              : 'bg-muted hover:bg-muted/80 text-foreground'
          }`}
        >
          {score}
        </button>
      ))}
    </div>
  );

  const ProgressionTable = ({ topic }: { topic: 'E' | 'F' | 'G' | 'H' }) => {
    const progressions = {
      E: {
        step1: "Shows little evidence of understanding how to count objects in any configuration, unable to count from 1-5 with one-to-one correspondence.",
        step2: "Shows evidence of beginning to understand how to count objects in some configurations but has difficulty with cardinality or one-to-one correspondence.",
        step3: "Able to arrange and count cubes in more than one configuration correctly to 5, demonstrates understanding of cardinality, counts with one-to-one correspondence.",
        step4: "Correctly arranges and counts cubes in all configurations to 5. Demonstrates understanding of cardinality. Counts with one-to-one correspondence."
      },
      F: {
        step1: "Shows little evidence of understanding how to match a numeral to a quantity or make a group from a numeral.",
        step2: "Shows evidence of beginning to understand how to match a numeral to a quantity and create a group from a numeral.",
        step3: "Demonstrates some understanding but inaccurately or inconsistently matches numerals 1-4 to bird cards and creates groups.",
        step4: "Correctly matches numerals 1-4 to corresponding bird cards. Creates a group of 5 cubes to match the numeral."
      },
      G: {
        step1: "Shows little evidence of understanding how to count 1 more within 5 and is almost non-responsive.",
        step2: "Shows evidence of beginning to understand how to count 1 more within 5.",
        step3: "Correctly counts 1 more within 5 after prompting or a clue to add an additional cube.",
        step4: "Correctly counts 1 more within 5."
      },
      H: {
        step1: "Shows little evidence of understanding how to count from 5 to 1 and is almost non-responsive.",
        step2: "Counts 5, 4, 3, 2, 1 with two or three errors.",
        step3: "Counts 5, 4, 3, 2, 1 with materials and by rote with one error.",
        step4: "Correctly counts 5, 4, 3, 2, 1 with materials and by rote."
      }
    };

    return (
      <div className="grid grid-cols-4 gap-2 text-xs mt-4">
        <div className="bg-red-100 p-2 rounded">
          <div className="font-bold text-red-700 mb-1">Step 1 (1 pt)</div>
          <p className="text-red-800">{progressions[topic].step1}</p>
        </div>
        <div className="bg-yellow-100 p-2 rounded">
          <div className="font-bold text-yellow-700 mb-1">Step 2 (2 pts)</div>
          <p className="text-yellow-800">{progressions[topic].step2}</p>
        </div>
        <div className="bg-blue-100 p-2 rounded">
          <div className="font-bold text-blue-700 mb-1">Step 3 (3 pts)</div>
          <p className="text-blue-800">{progressions[topic].step3}</p>
        </div>
        <div className="bg-green-100 p-2 rounded">
          <div className="font-bold text-green-700 mb-1">Step 4 (4 pts)</div>
          <p className="text-green-800">{progressions[topic].step4}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-muted print:bg-white">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50 print:hidden">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/activities">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-foreground">End-of-Module 1 Assessment</h1>
              <p className="text-sm text-muted-foreground">Topics E-H: Counting to 5</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Student Info */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bird className="w-6 h-6 text-primary" />
              Student Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Student Name</label>
                <Input 
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter student name"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Assessment Date</label>
                <Input 
                  type="date"
                  value={assessmentDate}
                  onChange={(e) => setAssessmentDate(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Topic E */}
        <Card className="mb-8 border-2 border-blue-200">
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-blue-800">Topic E: How Many Questions with 4 or 5 Objects</CardTitle>
            <CardDescription>Standards: PK.CC.3ab, PK.CC.4</CardDescription>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Rubric Score:</span>
                <RubricScoreSelector 
                  value={topicE.score} 
                  onChange={(score) => setTopicE({...topicE, score})} 
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Time:</span>
                <Input 
                  className="w-24"
                  value={topicE.timeElapsed}
                  onChange={(e) => setTopicE({...topicE, timeElapsed: e.target.value})}
                  placeholder="0:00"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="bg-amber-50 p-4 rounded-lg mb-4">
              <p className="font-medium text-amber-800 mb-2">📦 Materials: 5 linking cubes (as "birds"), paper plate</p>
            </div>
            
            <div className="space-y-6">
              <div className="border-l-4 border-blue-400 pl-4">
                <p className="font-medium mb-2">1. "Let's pretend that these linking cubes are birds. These birds fly into your tree." (Put cubes on child's left-hand fingers like little hats.) "Touch and count each one. How many birds are in your tree?"</p>
                <div className="grid md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <label className="text-sm text-muted-foreground">What did the student do?</label>
                    <Textarea 
                      value={topicE.whatDidDo[0]}
                      onChange={(e) => {
                        const newDo = [...topicE.whatDidDo];
                        newDo[0] = e.target.value;
                        setTopicE({...topicE, whatDidDo: newDo});
                      }}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">What did the student say?</label>
                    <Textarea 
                      value={topicE.whatDidSay[0]}
                      onChange={(e) => {
                        const newSay = [...topicE.whatDidSay];
                        newSay[0] = e.target.value;
                        setTopicE({...topicE, whatDidSay: newSay});
                      }}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-blue-400 pl-4">
                <p className="font-medium mb-2">2. "A bird flies away." (Take 1 cube away.) "Touch and count the birds in your tree now."</p>
                <div className="grid md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <label className="text-sm text-muted-foreground">What did the student do?</label>
                    <Textarea 
                      value={topicE.whatDidDo[1]}
                      onChange={(e) => {
                        const newDo = [...topicE.whatDidDo];
                        newDo[1] = e.target.value;
                        setTopicE({...topicE, whatDidDo: newDo});
                      }}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">What did the student say?</label>
                    <Textarea 
                      value={topicE.whatDidSay[1]}
                      onChange={(e) => {
                        const newSay = [...topicE.whatDidSay];
                        newSay[1] = e.target.value;
                        setTopicE({...topicE, whatDidSay: newSay});
                      }}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-blue-400 pl-4">
                <p className="font-medium mb-2">3. (Put cube back.) "Watch as all the birds fly to the ground." (Place cubes in a circle around a plate.) "Touch and count each one. How many birds are on the ground?"</p>
                <div className="grid md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <label className="text-sm text-muted-foreground">What did the student do?</label>
                    <Textarea 
                      value={topicE.whatDidDo[2]}
                      onChange={(e) => {
                        const newDo = [...topicE.whatDidDo];
                        newDo[2] = e.target.value;
                        setTopicE({...topicE, whatDidDo: newDo});
                      }}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">What did the student say?</label>
                    <Textarea 
                      value={topicE.whatDidSay[2]}
                      onChange={(e) => {
                        const newSay = [...topicE.whatDidSay];
                        newSay[2] = e.target.value;
                        setTopicE({...topicE, whatDidSay: newSay});
                      }}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-muted rounded-lg text-sm">
              <strong>Note:</strong> If a child is unable to count 5 objects with one-to-one correspondence, ask them to rote count to 5. Rote counting (PK.CC.1) is a precursor to counting with one-to-one correspondence (PK.CC.3a).
            </div>

            <ProgressionTable topic="E" />
          </CardContent>
        </Card>

        {/* Topic F */}
        <Card className="mb-8 border-2 border-purple-200">
          <CardHeader className="bg-purple-50">
            <CardTitle className="text-purple-800">Topic F: Matching 1 Numeral with up to 5 Objects</CardTitle>
            <CardDescription>Standards: PK.CC.2, PK.CC.3ab, PK.CC.4</CardDescription>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Rubric Score:</span>
                <RubricScoreSelector 
                  value={topicF.score} 
                  onChange={(score) => setTopicF({...topicF, score})} 
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Time:</span>
                <Input 
                  className="w-24"
                  value={topicF.timeElapsed}
                  onChange={(e) => setTopicF({...topicF, timeElapsed: e.target.value})}
                  placeholder="0:00"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="bg-amber-50 p-4 rounded-lg mb-4">
              <p className="font-medium text-amber-800 mb-2">📦 Materials: Numerals 1-5 cards, bird picture cards (cut apart), 7 linking cubes</p>
            </div>
            
            <div className="space-y-6">
              {[
                { num: 1, text: '(Put bird pictures in front of student. Show numeral 4.) "What number is this? Can you find the group of birds that matches this number?"' },
                { num: 2, text: '(Repeat with 2.)' },
                { num: 3, text: '(Repeat with 3.)' },
                { num: 4, text: '(Repeat with 1.)' },
                { num: 5, text: '(Show numeral 5.) "What number is this? Pretend these cubes are birds. Can you make a group of birds to match this number?"' }
              ].map((item, idx) => (
                <div key={idx} className="border-l-4 border-purple-400 pl-4">
                  <p className="font-medium mb-2">{item.num}. {item.text}</p>
                  <div className="grid md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <label className="text-sm text-muted-foreground">What did the student do?</label>
                      <Textarea 
                        value={topicF.whatDidDo[idx]}
                        onChange={(e) => {
                          const newDo = [...topicF.whatDidDo];
                          newDo[idx] = e.target.value;
                          setTopicF({...topicF, whatDidDo: newDo});
                        }}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">What did the student say?</label>
                      <Textarea 
                        value={topicF.whatDidSay[idx]}
                        onChange={(e) => {
                          const newSay = [...topicF.whatDidSay];
                          newSay[idx] = e.target.value;
                          setTopicF({...topicF, whatDidSay: newSay});
                        }}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <ProgressionTable topic="F" />
          </CardContent>
        </Card>

        {/* Topic G */}
        <Card className="mb-8 border-2 border-green-200">
          <CardHeader className="bg-green-50">
            <CardTitle className="text-green-800">Topic G: One More with Numbers 1 to 5</CardTitle>
            <CardDescription>Standards: PK.CC.3c, PK.OA.2</CardDescription>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Rubric Score:</span>
                <RubricScoreSelector 
                  value={topicG.score} 
                  onChange={(score) => setTopicG({...topicG, score})} 
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Time:</span>
                <Input 
                  className="w-24"
                  value={topicG.timeElapsed}
                  onChange={(e) => setTopicG({...topicG, timeElapsed: e.target.value})}
                  placeholder="0:00"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="bg-amber-50 p-4 rounded-lg mb-4">
              <p className="font-medium text-amber-800 mb-2">📦 Materials: 5 linking cubes (as imaginary birds)</p>
            </div>
            
            <div className="space-y-6">
              <div className="border-l-4 border-green-400 pl-4">
                <p className="font-medium mb-2">1. "Let's pretend these cubes are birds." (Place 5 cubes in front of student.) "Two birds want to play. Show me 2 birds."</p>
                <div className="grid md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <label className="text-sm text-muted-foreground">What did the student do?</label>
                    <Textarea 
                      value={topicG.whatDidDo[0]}
                      onChange={(e) => {
                        const newDo = [...topicG.whatDidDo];
                        newDo[0] = e.target.value;
                        setTopicG({...topicG, whatDidDo: newDo});
                      }}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">What did the student say?</label>
                    <Textarea 
                      value={topicG.whatDidSay[0]}
                      onChange={(e) => {
                        const newSay = [...topicG.whatDidSay];
                        newSay[0] = e.target.value;
                        setTopicG({...topicG, whatDidSay: newSay});
                      }}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-green-400 pl-4">
                <p className="font-medium mb-2">2. "One more bird wants to play. Show me 1 more." (Child puts another cube in the group.) "How many birds are playing now?" (Continue the pattern of 1 more to 5.)</p>
                <div className="grid md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <label className="text-sm text-muted-foreground">What did the student do?</label>
                    <Textarea 
                      value={topicG.whatDidDo[1]}
                      onChange={(e) => {
                        const newDo = [...topicG.whatDidDo];
                        newDo[1] = e.target.value;
                        setTopicG({...topicG, whatDidDo: newDo});
                      }}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">What did the student say?</label>
                    <Textarea 
                      value={topicG.whatDidSay[1]}
                      onChange={(e) => {
                        const newSay = [...topicG.whatDidSay];
                        newSay[1] = e.target.value;
                        setTopicG({...topicG, whatDidSay: newSay});
                      }}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>

            <ProgressionTable topic="G" />
          </CardContent>
        </Card>

        {/* Topic H */}
        <Card className="mb-8 border-2 border-indigo-200">
          <CardHeader className="bg-indigo-50">
            <CardTitle className="text-indigo-800">Topic H: Counting 5, 4, 3, 2, 1</CardTitle>
            <CardDescription>Standards: PK.CC.3c, PK.OA.2</CardDescription>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Rubric Score:</span>
                <RubricScoreSelector 
                  value={topicH.score} 
                  onChange={(score) => setTopicH({...topicH, score})} 
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Time:</span>
                <Input 
                  className="w-24"
                  value={topicH.timeElapsed}
                  onChange={(e) => setTopicH({...topicH, timeElapsed: e.target.value})}
                  placeholder="0:00"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="bg-amber-50 p-4 rounded-lg mb-4">
              <p className="font-medium text-amber-800 mb-2">📦 Materials: 5 linking cubes (as imaginary birds)</p>
            </div>
            
            <div className="space-y-6">
              <div className="border-l-4 border-indigo-400 pl-4">
                <p className="font-medium mb-2">1. "Let's pretend these cubes are birds." (Place 5 cubes in front of student.) "How many birds are there on the ground?"</p>
                <div className="grid md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <label className="text-sm text-muted-foreground">What did the student do?</label>
                    <Textarea 
                      value={topicH.whatDidDo[0]}
                      onChange={(e) => {
                        const newDo = [...topicH.whatDidDo];
                        newDo[0] = e.target.value;
                        setTopicH({...topicH, whatDidDo: newDo});
                      }}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">What did the student say?</label>
                    <Textarea 
                      value={topicH.whatDidSay[0]}
                      onChange={(e) => {
                        const newSay = [...topicH.whatDidSay];
                        newSay[0] = e.target.value;
                        setTopicH({...topicH, whatDidSay: newSay});
                      }}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-indigo-400 pl-4">
                <p className="font-medium mb-2">2. "One bird flies into my tree. Show me." (After student removes 1 cube, place it on your left pinky.) "How many birds are on the ground now?" (Continue the pattern of 1 less to 1.)</p>
                <div className="grid md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <label className="text-sm text-muted-foreground">What did the student do?</label>
                    <Textarea 
                      value={topicH.whatDidDo[1]}
                      onChange={(e) => {
                        const newDo = [...topicH.whatDidDo];
                        newDo[1] = e.target.value;
                        setTopicH({...topicH, whatDidDo: newDo});
                      }}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">What did the student say?</label>
                    <Textarea 
                      value={topicH.whatDidSay[1]}
                      onChange={(e) => {
                        const newSay = [...topicH.whatDidSay];
                        newSay[1] = e.target.value;
                        setTopicH({...topicH, whatDidSay: newSay});
                      }}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-indigo-400 pl-4">
                <p className="font-medium mb-2">3. "Can you count from 5 to 1?"</p>
                <div className="grid md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <label className="text-sm text-muted-foreground">What did the student do?</label>
                    <Textarea 
                      value={topicH.whatDidDo[2]}
                      onChange={(e) => {
                        const newDo = [...topicH.whatDidDo];
                        newDo[2] = e.target.value;
                        setTopicH({...topicH, whatDidDo: newDo});
                      }}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">What did the student say?</label>
                    <Textarea 
                      value={topicH.whatDidSay[2]}
                      onChange={(e) => {
                        const newSay = [...topicH.whatDidSay];
                        newSay[2] = e.target.value;
                        setTopicH({...topicH, whatDidSay: newSay});
                      }}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>

            <ProgressionTable topic="H" />
          </CardContent>
        </Card>

        {/* Summary */}
        <Card className="mb-8 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle>Assessment Summary</CardTitle>
            <CardDescription>Overview of student performance across Topics E-H</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-card p-4 rounded-lg text-center">
                <div className="text-sm text-muted-foreground mb-1">Topic E</div>
                <div className={`text-3xl font-bold ${
                  topicE.score === 4 ? 'text-green-600' :
                  topicE.score === 3 ? 'text-blue-600' :
                  topicE.score === 2 ? 'text-yellow-600' :
                  topicE.score === 1 ? 'text-red-600' : 'text-muted-foreground'
                }`}>
                  {topicE.score ?? '-'}/4
                </div>
                <div className="text-xs text-muted-foreground mt-1">How Many?</div>
              </div>
              <div className="bg-card p-4 rounded-lg text-center">
                <div className="text-sm text-muted-foreground mb-1">Topic F</div>
                <div className={`text-3xl font-bold ${
                  topicF.score === 4 ? 'text-green-600' :
                  topicF.score === 3 ? 'text-blue-600' :
                  topicF.score === 2 ? 'text-yellow-600' :
                  topicF.score === 1 ? 'text-red-600' : 'text-muted-foreground'
                }`}>
                  {topicF.score ?? '-'}/4
                </div>
                <div className="text-xs text-muted-foreground mt-1">Matching</div>
              </div>
              <div className="bg-card p-4 rounded-lg text-center">
                <div className="text-sm text-muted-foreground mb-1">Topic G</div>
                <div className={`text-3xl font-bold ${
                  topicG.score === 4 ? 'text-green-600' :
                  topicG.score === 3 ? 'text-blue-600' :
                  topicG.score === 2 ? 'text-yellow-600' :
                  topicG.score === 1 ? 'text-red-600' : 'text-muted-foreground'
                }`}>
                  {topicG.score ?? '-'}/4
                </div>
                <div className="text-xs text-muted-foreground mt-1">One More</div>
              </div>
              <div className="bg-card p-4 rounded-lg text-center">
                <div className="text-sm text-muted-foreground mb-1">Topic H</div>
                <div className={`text-3xl font-bold ${
                  topicH.score === 4 ? 'text-green-600' :
                  topicH.score === 3 ? 'text-blue-600' :
                  topicH.score === 2 ? 'text-yellow-600' :
                  topicH.score === 1 ? 'text-red-600' : 'text-muted-foreground'
                }`}>
                  {topicH.score ?? '-'}/4
                </div>
                <div className="text-xs text-muted-foreground mt-1">Counting Down</div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-card rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-medium">Total Score:</span>
                <span className="text-2xl font-bold text-primary">
                  {(topicE.score || 0) + (topicF.score || 0) + (topicG.score || 0) + (topicH.score || 0)}/16
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Standards Reference */}
        <Card>
          <CardHeader>
            <CardTitle>Standards Addressed</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p><strong>PK.CC.1</strong> - Count to 20</p>
            <p><strong>PK.CC.2</strong> - Represent a number of objects with a written numeral 0-5</p>
            <p><strong>PK.CC.3a</strong> - Say number names in standard order, pairing each object with one number name</p>
            <p><strong>PK.CC.3b</strong> - Understand that the last number name said tells the number of objects counted</p>
            <p><strong>PK.CC.3c</strong> - Understand that each successive number name refers to a quantity that is one larger</p>
            <p><strong>PK.CC.4</strong> - Count to answer "how many?" questions about as many as 10 things</p>
            <p><strong>PK.OA.2</strong> - Duplicate and extend simple patterns using concrete objects</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EndOfModule1Assessment;
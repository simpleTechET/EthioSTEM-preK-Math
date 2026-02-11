import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, User } from 'lucide-react';

const MidModuleAssessment = () => {
  const [currentTopic, setCurrentTopic] = useState<'intro' | 'A' | 'B' | 'C' | 'D' | 'complete'>('intro');
  const [studentName, setStudentName] = useState('');
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [scores, setScores] = useState({ A: 0, B: 0, C: 0, D: 0 });
  const [responses, setResponses] = useState({
    A: { what: '', said: '' },
    B: { what: '', said: '' },
    C: { what: '', said: '' },
    D: { what: '', said: '' }
  });

  const handleStart = () => {
    if (studentName.trim()) {
      setStartTime(new Date());
      setCurrentTopic('A');
    }
  };

  const handleScore = (topic: 'A' | 'B' | 'C' | 'D', score: number) => {
    setScores({ ...scores, [topic]: score });
  };

  const handleResponse = (topic: 'A' | 'B' | 'C' | 'D', type: 'what' | 'said', value: string) => {
    setResponses({
      ...responses,
      [topic]: { ...responses[topic], [type]: value }
    });
  };

  const getElapsedTime = () => {
    if (!startTime) return '0:00';
    const elapsed = Math.floor((Date.now() - startTime.getTime()) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const moveNext = () => {
    if (currentTopic === 'A') setCurrentTopic('B');
    else if (currentTopic === 'B') setCurrentTopic('C');
    else if (currentTopic === 'C') setCurrentTopic('D');
    else if (currentTopic === 'D') setCurrentTopic('complete');
  };

  const movePrevious = () => {
    if (currentTopic === 'B') setCurrentTopic('A');
    else if (currentTopic === 'C') setCurrentTopic('B');
    else if (currentTopic === 'D') setCurrentTopic('C');
  };

  if (currentTopic === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-muted p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="text-3xl text-center">Mid-Module 1 Assessment</CardTitle>
              <CardDescription className="text-center text-lg">Topics A-D: Administer after Topic D</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
                <h3 className="font-bold text-lg mb-3 text-gray-800">Assessment Purpose</h3>
                <p className="text-gray-700">
                  This assessment informs daily planning, enhances parent conferences with specific documentation,
                  and provides valuable information about student skill development.
                </p>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-200">
                <h3 className="font-bold text-lg mb-3 text-gray-800">Materials Needed</h3>
                <ul className="text-sm text-gray-700 space-y-1 list-disc ml-5">
                  <li>Linking cubes (various colors)</li>
                  <li>Module 1 assessment picture cards</li>
                  <li>Paper, scissors, crayon, dish, apple</li>
                  <li>Yellow and green items</li>
                  <li>Paper plate, craft sticks</li>
                  <li>Numerals 1-3 cards</li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
                <h3 className="font-bold text-lg mb-3 text-gray-800">Important Notes</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Sit <strong>beside</strong> the child, not opposite</li>
                  <li>• Make this a positive experience - it may be their first assessment</li>
                  <li>• Allow at least 20 seconds of wait time for responses</li>
                  <li>• Allow the child to explain reasoning in their primary language</li>
                  <li>• Use the specific language provided in each task</li>
                </ul>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg border-2 border-purple-200">
                <h3 className="font-bold text-lg mb-3 text-gray-800">Scoring Rubric</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded border">
                    <div className="font-bold text-red-700">Step 1 (1 point)</div>
                    <p className="text-xs text-gray-600">Little evidence of reasoning without correct answer</p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <div className="font-bold text-orange-700">Step 2 (2 points)</div>
                    <p className="text-xs text-gray-600">Some reasoning without correct answer</p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <div className="font-bold text-yellow-700">Step 3 (3 points)</div>
                    <p className="text-xs text-gray-600">Some reasoning with correct answer OR solid reasoning with incorrect answer</p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <div className="font-bold text-green-700">Step 4 (4 points)</div>
                    <p className="text-xs text-gray-600">Solid reasoning with correct answer</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block">
                  <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Student Name
                  </span>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Enter student's name"
                    className="mt-1 w-full p-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                  />
                </label>

                <Button 
                  onClick={handleStart}
                  disabled={!studentName.trim()}
                  size="lg"
                  className="w-full text-lg py-6 bg-primary hover:bg-primary/90"
                >
                  Begin Assessment
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (currentTopic === 'complete') {
    const totalScore = scores.A + scores.B + scores.C + scores.D;
    const maxScore = 16;
    const percentage = Math.round((totalScore / maxScore) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-muted p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-green-200">
            <CardHeader>
              <div className="text-center">
                <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-3xl">Assessment Complete</CardTitle>
                <CardDescription className="text-lg">Student: {studentName}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold">Total Score</span>
                  <span className="text-3xl font-bold text-primary">{totalScore}/{maxScore}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">Percentage</span>
                  <span className="text-3xl font-bold text-primary">{percentage}%</span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-semibold flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Time Elapsed
                  </span>
                  <span className="text-xl font-semibold">{getElapsedTime()}</span>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Topic A: Matching</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-center text-primary">{scores.A}/4</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Topic B: Sorting</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-center text-primary">{scores.B}/4</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Topic C: Counting</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-center text-primary">{scores.C}/4</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Topic D: Numerals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-center text-primary">{scores.D}/4</div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-200">
                <h3 className="font-bold text-lg mb-3">Next Steps</h3>
                <p className="text-sm text-gray-700 mb-2">
                  If a student scores at Step 1 or 2, repeat that task at two-week intervals.
                </p>
                <p className="text-sm text-gray-700">
                  Document progress and keep assessments in a three-ring binder or student portfolio.
                </p>
              </div>

              <Button 
                onClick={() => window.print()}
                size="lg"
                className="w-full"
              >
                Print Assessment Results
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const topics = {
    A: {
      title: 'Topic A: Matching Objects',
      tasks: [
        {
          num: 1,
          instruction: 'Give the student 2 yellow, 1 red, and 1 green linking cube (separated). Say:',
          prompt: '"Here are some linking cubes. Show me two matching cubes that are exactly the same. How are they exactly the same?"',
          materials: '4 linking cubes (2 yellow, 1 red, 1 green)'
        },
        {
          num: 2,
          instruction: 'Show Module 1 assessment picture cards. Say:',
          prompt: '"Show me two things that are the same and use your words, \'They are the same, but...\' to tell me about the two things."',
          materials: 'Picture cards'
        },
        {
          num: 3,
          instruction: 'Present paper, apple, scissors, crayon, and dish. Say:',
          prompt: '"Show me two objects that are used together. Tell me how they are used together."',
          materials: 'Paper, apple, scissors, crayon, dish',
          note: 'Accept: paper & scissors, crayon & paper, or apple & dish'
        }
      ]
    },
    B: {
      title: 'Topic B: Sorting',
      tasks: [
        {
          num: 1,
          instruction: 'Show Module 1 assessment picture cards. Say:',
          prompt: '"Mama cat is looking for her kittens. Can you help me make a group of kittens?"',
          materials: 'Picture cards'
        },
        {
          num: 2,
          instruction: 'Place 5 green cubes, 3 yellow cubes, 3 yellow items, 3 green items. Say:',
          prompt: '"Here are some linking cubes and erasers. Sort these things by color."',
          materials: 'Cubes and items in two colors'
        },
        {
          num: 3,
          instruction: 'Point to the yellow group. Say:',
          prompt: '"Use your words, \'They are the same, but...\' to tell me about this group."',
          materials: 'Items from previous task'
        },
        {
          num: 4,
          instruction: 'Say:',
          prompt: '"Help me mix them up again." (Mix groups) "Now, sort them into two groups: a cube group and an eraser group."',
          materials: 'Same items, mixed'
        }
      ]
    },
    C: {
      title: 'Topic C: How Many Questions with 1, 2, or 3 Objects',
      tasks: [
        {
          num: 1,
          instruction: 'Put 3 unconnected cubes in a straight horizontal line on a paper plate. Say:',
          prompt: '"Touch and count the cubes. How many are there?"',
          materials: '3 different color cubes, paper plate'
        },
        {
          num: 2,
          instruction: 'Say:',
          prompt: '"Move the cubes close together." (Student moves cubes) "How many are there?"',
          materials: 'Same 3 cubes'
        },
        {
          num: 3,
          instruction: 'Say:',
          prompt: '"Move the cubes far apart on the plate." (Student moves cubes) "How many are there?"',
          materials: 'Same 3 cubes'
        },
        {
          num: 4,
          instruction: 'Show 2 cubes on the plate. Say:',
          prompt: '"How many cubes are there?"',
          materials: '2 cubes'
        },
        {
          num: 5,
          instruction: 'Put 1 cube on the plate. Say:',
          prompt: '"How many cubes are there?"',
          materials: '1 cube',
          note: 'If unable to count 3 objects with one-to-one correspondence, ask to rote count to 3'
        }
      ]
    },
    D: {
      title: 'Topic D: Matching 1 Numeral with up to 3 Objects',
      tasks: [
        {
          num: 1,
          instruction: 'Say:',
          prompt: '"Count to 3 on your fingers" (any 3 fingers will do)',
          materials: 'None needed'
        },
        {
          num: 2,
          instruction: 'Put a linking cube on each of the 3 fingers. Say:',
          prompt: '"I will help you put these hats on top of your 3 fingers. How many hats do you have?"',
          materials: '3 linking cubes'
        },
        {
          num: 3,
          instruction: 'Say:',
          prompt: '"Use your sticks to show that number. How many sticks are in the group?"',
          materials: '5 craft sticks'
        },
        {
          num: 4,
          instruction: 'Show numerals 1-3. Say:',
          prompt: '"Which number shows how many sticks are in your group?"',
          materials: 'Numeral cards 1-3'
        },
        {
          num: 5,
          instruction: 'Show 1 craft stick. Say:',
          prompt: '"What number shows how many sticks are in this group?"',
          materials: '1 craft stick, numerals'
        },
        {
          num: 6,
          instruction: 'Show 2 cubes. Say:',
          prompt: '"What number shows how many cubes are in this group?"',
          materials: '2 cubes, numerals'
        }
      ]
    }
  };

  const currentTopicData = topics[currentTopic as 'A' | 'B' | 'C' | 'D'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-muted p-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Student: {studentName}</h1>
            <p className="text-sm text-muted-foreground">Mid-Module Assessment</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-card p-3 rounded-lg border-2">
              <Clock className="w-5 h-5 text-primary" />
              <span className="font-semibold">{getElapsedTime()}</span>
            </div>
          </div>
        </div>

        {/* Progress */}
        <Card className="mb-6 border-2 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex justify-between mb-2">
              {['A', 'B', 'C', 'D'].map((topic) => (
                <div key={topic} className="text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                    currentTopic === topic ? 'bg-primary text-white' : 
                    scores[topic as 'A'|'B'|'C'|'D'] > 0 ? 'bg-green-100 text-green-700' : 
                    'bg-gray-100 text-gray-400'
                  }`}>
                    {topic}
                  </div>
                  <div className="text-xs mt-1 text-muted-foreground">
                    {scores[topic as 'A'|'B'|'C'|'D'] > 0 ? `${scores[topic as 'A'|'B'|'C'|'D']}/4` : '-'}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Current Topic */}
        <Card className="border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl">{currentTopicData.title}</CardTitle>
            <CardDescription>Follow the prompts below and observe student responses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentTopicData.tasks.map((task) => (
              <div key={task.num} className="bg-accent/30 p-6 rounded-lg border-2">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                    {task.num}
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="bg-white p-4 rounded border-2 border-blue-200">
                      <p className="text-sm text-gray-600 mb-2">{task.instruction}</p>
                      <p className="font-semibold text-gray-800">{task.prompt}</p>
                      <p className="text-xs text-gray-500 mt-2">📦 Materials: {task.materials}</p>
                      {task.note && (
                        <p className="text-xs text-blue-700 mt-2 bg-blue-50 p-2 rounded">💡 {task.note}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Documentation */}
            <div className="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-200">
              <h3 className="font-bold mb-4">Documentation</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">What did the student do?</label>
                  <textarea
                    value={responses[currentTopic as 'A'|'B'|'C'|'D'].what}
                    onChange={(e) => handleResponse(currentTopic as 'A'|'B'|'C'|'D', 'what', e.target.value)}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                    rows={3}
                    placeholder="Describe student's actions and approach..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">What did the student say?</label>
                  <textarea
                    value={responses[currentTopic as 'A'|'B'|'C'|'D'].said}
                    onChange={(e) => handleResponse(currentTopic as 'A'|'B'|'C'|'D', 'said', e.target.value)}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                    rows={3}
                    placeholder="Record student's verbal responses..."
                  />
                </div>
              </div>
            </div>

            {/* Scoring */}
            <div className="bg-purple-50 p-6 rounded-lg border-2 border-purple-200">
              <h3 className="font-bold mb-4">Rubric Score for {currentTopicData.title}</h3>
              <div className="grid md:grid-cols-4 gap-3">
                {[
                  { step: 1, label: 'Step 1', points: 1, color: 'red', desc: 'Little evidence of reasoning, no correct answer' },
                  { step: 2, label: 'Step 2', points: 2, color: 'orange', desc: 'Some reasoning, no correct answer' },
                  { step: 3, label: 'Step 3', points: 3, color: 'yellow', desc: 'Some reasoning with correct answer OR solid reasoning with incorrect' },
                  { step: 4, label: 'Step 4', points: 4, color: 'green', desc: 'Solid reasoning with correct answer' }
                ].map(({ step, label, points, color, desc }) => (
                  <button
                    key={step}
                    onClick={() => handleScore(currentTopic as 'A'|'B'|'C'|'D', points)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      scores[currentTopic as 'A'|'B'|'C'|'D'] === points
                        ? `bg-${color}-100 border-${color}-500 scale-105`
                        : 'bg-white border-gray-300 hover:border-primary'
                    }`}
                  >
                    <div className={`font-bold text-lg text-${color}-700`}>{label}</div>
                    <div className="text-2xl font-bold my-2">{points}</div>
                    <div className="text-xs text-gray-600">{desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex gap-4">
              {currentTopic !== 'A' && (
                <Button
                  onClick={movePrevious}
                  variant="outline"
                  size="lg"
                  className="flex-1"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Previous Topic
                </Button>
              )}
              <Button
                onClick={moveNext}
                disabled={scores[currentTopic as 'A'|'B'|'C'|'D'] === 0}
                size="lg"
                className="flex-1"
              >
                {currentTopic === 'D' ? 'Complete Assessment' : 'Next Topic'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MidModuleAssessment;

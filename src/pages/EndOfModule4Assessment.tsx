import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Trees, Save, Printer, ClipboardCheck } from "lucide-react";
import { toast } from "sonner";

type RubricScore = 1 | 2 | 3 | 4 | null;

interface TopicAssessment {
    score: RubricScore;
    timeElapsed: string;
    whatDidDo: string[];
    whatDidSay: string[];
}

const EndOfModule4Assessment = () => {
    const [studentName, setStudentName] = useState("");
    const [assessmentDate, setAssessmentDate] = useState(new Date().toISOString().split('T')[0]);

    const [topicA, setTopicA] = useState<TopicAssessment>({
        score: null,
        timeElapsed: "",
        whatDidDo: ["", ""],
        whatDidSay: ["", ""]
    });

    const [topicB, setTopicB] = useState<TopicAssessment>({
        score: null,
        timeElapsed: "",
        whatDidDo: ["", ""],
        whatDidSay: ["", ""]
    });

    const [topicCD, setTopicCD] = useState<TopicAssessment>({
        score: null,
        timeElapsed: "",
        whatDidDo: ["", "", ""],
        whatDidSay: ["", "", ""]
    });

    const [topicEFG, setTopicEFG] = useState<TopicAssessment>({
        score: null,
        timeElapsed: "",
        whatDidDo: ["", "", ""],
        whatDidSay: ["", "", ""]
    });

    const handleSave = () => {
        const assessmentData = {
            studentName,
            assessmentDate,
            topicA,
            topicB,
            topicCD,
            topicEFG,
            savedAt: new Date().toISOString()
        };

        const existingAssessments = JSON.parse(localStorage.getItem('ethiostem-end-module4-assessments') || '[]');
        existingAssessments.push(assessmentData);
        localStorage.setItem('ethiostem-end-module4-assessments', JSON.stringify(existingAssessments));

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
                    className={`w-10 h-10 rounded-lg font-bold transition-all ${value === score
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

    const ProgressionTable = ({ topic }: { topic: 'A' | 'B' | 'CD' | 'EFG' }) => {
        const progressions = {
            A: {
                step1: "Unable to compare lengths or align endpoints. Needs constant support.",
                step2: "Beginning to compare but struggles with alignment or terminology.",
                step3: "Compares length correctly with aligned endpoints. Uses 'longer/shorter'.",
                step4: "Expertly compares lengths in various contexts. Uses precise language."
            },
            B: {
                step1: "Cannot identify weight difference or use balance scale metaphor.",
                step2: "Identifies obvious weight differences but struggles with balance concepts.",
                step3: "Consistently identifies heavier/lighter objects correctly.",
                step4: "Precisely explains weight relative to container size or density."
            },
            CD: {
                step1: "Does not understand volume (more/less) or first/last position.",
                step2: "Occasional success with volume but confused by positional terms.",
                step3: "Identifies container capacity and positional order (1st/last) accurately.",
                step4: "Mastered comparison across volume and position in complex sets."
            },
            EFG: {
                step1: "Unsuccessful with 1-to-1 matching or pattern recognition.",
                step2: "Recognizes simple patterns but cannot extend or create them.",
                step3: "Matches 1-to-1 and creates/extends AB patterns with 6+ items.",
                step4: "Fluent in patterns and set comparisons. Justifies logic."
            }
        };

        return (
            <div className="grid grid-cols-4 gap-2 text-xs mt-4">
                {[1, 2, 3, 4].map((s) => (
                    <div key={s} className={`${s === 1 ? 'bg-red-50' : s === 2 ? 'bg-yellow-50' : s === 3 ? 'bg-blue-50' : 'bg-green-50'} p-2 rounded border border-current/10`}>
                        <div className={`font-bold mb-1 ${s === 1 ? 'text-red-700' : s === 2 ? 'text-yellow-700' : s === 3 ? 'text-blue-700' : 'text-green-700'}`}>Step {s}</div>
                        <p className="opacity-80">{(progressions[topic] as any)[`step${s}`]}</p>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-slate-50 font-['Inter'] print:bg-white pb-20">
            <header className="bg-white border-b sticky top-0 z-50 px-6 py-4 flex items-center justify-between shadow-sm print:hidden">
                <div className="flex items-center gap-4">
                    <Link to="/activities/module-4">
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold flex items-center gap-2">
                            <ClipboardCheck className="text-emerald-500" />
                            End-of-Module 4 Rubric
                        </h1>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Forest Adventure Assessment</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handlePrint} className="rounded-xl border-dashed">
                        <Printer className="w-4 h-4 mr-2" /> Print
                    </Button>
                    <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-lg">
                        <Save className="w-4 h-4 mr-2" /> Save Form
                    </Button>
                </div>
            </header>

            <main className="container mx-auto max-w-4xl py-10 px-4 space-y-10">
                <Card className="rounded-[2rem] border-2 border-emerald-100 shadow-xl shadow-emerald-900/5">
                    <CardHeader className="bg-emerald-50/50 rounded-t-[2rem]">
                        <CardTitle className="text-emerald-800">Student Profile</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-emerald-900">Explorer Name</label>
                                <Input value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="Enter name..." className="rounded-xl border-emerald-200" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-emerald-900">Adventure Date</label>
                                <Input type="date" value={assessmentDate} onChange={(e) => setAssessmentDate(e.target.value)} className="rounded-xl border-emerald-200" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Section A: Length */}
                <Card className="rounded-[2rem] border-l-8 border-l-emerald-400">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Topic A: Comparison of Length</CardTitle>
                            <CardDescription>Standards: PK.MD.1</CardDescription>
                        </div>
                        <RubricScoreSelector value={topicA.score} onChange={(s) => setTopicA({ ...topicA, score: s })} />
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="p-4 bg-emerald-50/50 rounded-2xl flex gap-4 items-center">
                            <Trees className="text-emerald-600 w-8 h-8 shrink-0" />
                            <p className="text-sm font-medium italic">Task: "Which tree is Taller? Can you line up the bottoms so it's fair?"</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <span className="text-xs font-bold text-slate-500 uppercase">Observations</span>
                                <Textarea placeholder="What did they do?" className="min-h-[100px] rounded-2xl" value={topicA.whatDidDo[0]} onChange={(e) => { let d = [...topicA.whatDidDo]; d[0] = e.target.value; setTopicA({ ...topicA, whatDidDo: d }) }} />
                            </div>
                            <div className="space-y-2">
                                <span className="text-xs font-bold text-slate-500 uppercase">Responses</span>
                                <Textarea placeholder="What did they say?" className="min-h-[100px] rounded-2xl" value={topicA.whatDidSay[0]} onChange={(e) => { let s = [...topicA.whatDidSay]; s[0] = e.target.value; setTopicA({ ...topicA, whatDidSay: s }) }} />
                            </div>
                        </div>
                        <ProgressionTable topic="A" />
                    </CardContent>
                </Card>

                {/* Section B: Weight */}
                <Card className="rounded-[2rem] border-l-8 border-l-amber-400">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Topic B: Comparison of Weight</CardTitle>
                            <CardDescription>Standards: PK.MD.1</CardDescription>
                        </div>
                        <RubricScoreSelector value={topicB.score} onChange={(s) => setTopicB({ ...topicB, score: s })} />
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="p-4 bg-amber-50/50 rounded-2xl flex gap-4 items-center">
                            <div className="text-3xl text-amber-600">⚖️</div>
                            <p className="text-sm font-medium italic">Task: "Hold the rock and the leaf. Which one feels Heavy? Which way does the scale tilt?"</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <span className="text-xs font-bold text-slate-500 uppercase">Observations</span>
                                <Textarea placeholder="..." className="min-h-[100px] rounded-2xl" value={topicB.whatDidDo[0]} onChange={(e) => { let d = [...topicB.whatDidDo]; d[0] = e.target.value; setTopicB({ ...topicB, whatDidDo: d }) }} />
                            </div>
                            <div className="space-y-2">
                                <span className="text-xs font-bold text-slate-500 uppercase">Responses</span>
                                <Textarea placeholder="..." className="min-h-[100px] rounded-2xl" value={topicB.whatDidSay[0]} onChange={(e) => { let s = [...topicB.whatDidSay]; s[0] = e.target.value; setTopicB({ ...topicB, whatDidSay: s }) }} />
                            </div>
                        </div>
                        <ProgressionTable topic="B" />
                    </CardContent>
                </Card>

                {/* Section CD: Volume & Position */}
                <Card className="rounded-[2rem] border-l-8 border-l-blue-400">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Topics C-D: Volume & Position</CardTitle>
                            <CardDescription>Standards: PK.MD.1, PK.CC.6</CardDescription>
                        </div>
                        <RubricScoreSelector value={topicCD.score} onChange={(s) => setTopicCD({ ...topicCD, score: s })} />
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="p-4 bg-blue-50/50 rounded-2xl flex gap-4 items-center">
                            <div className="text-3xl text-blue-600">🥤🏁</div>
                            <p className="text-sm font-medium italic">Task: "Show me the container with More water. Now, point to the First and Last animal in the line."</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <span className="text-xs font-bold text-slate-500 uppercase">Observations</span>
                                <Textarea placeholder="..." className="min-h-[100px] rounded-2xl" value={topicCD.whatDidDo[0]} onChange={(e) => { let d = [...topicCD.whatDidDo]; d[0] = e.target.value; setTopicCD({ ...topicCD, whatDidDo: d }) }} />
                            </div>
                            <div className="space-y-2">
                                <span className="text-xs font-bold text-slate-500 uppercase">Responses</span>
                                <Textarea placeholder="..." className="min-h-[100px] rounded-2xl" value={topicCD.whatDidSay[0]} onChange={(e) => { let s = [...topicCD.whatDidSay]; s[0] = e.target.value; setTopicCD({ ...topicCD, whatDidSay: s }) }} />
                            </div>
                        </div>
                        <ProgressionTable topic="CD" />
                    </CardContent>
                </Card>

                {/* Section EFG: Enough & Patterns */}
                <Card className="rounded-[2rem] border-l-8 border-l-purple-400">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Topics E-G: Enough & Patterns</CardTitle>
                            <CardDescription>Standards: PK.CC.5, PK.OA.2</CardDescription>
                        </div>
                        <RubricScoreSelector value={topicEFG.score} onChange={(s) => setTopicEFG({ ...topicEFG, score: s })} />
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="p-4 bg-purple-50/50 rounded-2xl flex gap-4 items-center">
                            <div className="text-3xl text-purple-600">➰🍎</div>
                            <p className="text-sm font-medium italic">Task: "Are there Enough nuts for the squirrels? Can you make an Apple-Pear-Apple-Pear pattern?"</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <span className="text-xs font-bold text-slate-500 uppercase">Observations</span>
                                <Textarea placeholder="..." className="min-h-[100px] rounded-2xl" value={topicEFG.whatDidDo[0]} onChange={(e) => { let d = [...topicEFG.whatDidDo]; d[0] = e.target.value; setTopicEFG({ ...topicEFG, whatDidDo: d }) }} />
                            </div>
                            <div className="space-y-2">
                                <span className="text-xs font-bold text-slate-500 uppercase">Responses</span>
                                <Textarea placeholder="..." className="min-h-[100px] rounded-2xl" value={topicEFG.whatDidSay[0]} onChange={(e) => { let s = [...topicEFG.whatDidSay]; s[0] = e.target.value; setTopicEFG({ ...topicEFG, whatDidSay: s }) }} />
                            </div>
                        </div>
                        <ProgressionTable topic="EFG" />
                    </CardContent>
                </Card>

                <section className="bg-emerald-900 rounded-[2.5rem] p-10 text-white shadow-2xl">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        Final Adventure Score 🧗
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                        {[
                            { label: 'Length', score: topicA.score },
                            { label: 'Weight', score: topicB.score },
                            { label: 'Volume/Pos', score: topicCD.score },
                            { label: 'Patterns/Set', score: topicEFG.score }
                        ].map((i, idx) => (
                            <div key={idx} className="bg-white/10 backdrop-blur-md rounded-[1.5rem] p-4 text-center border border-white/20">
                                <div className="text-white/60 text-xs font-bold uppercase mb-2">{i.label}</div>
                                <div className="text-4xl font-black">{i.score ?? '-'}</div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 pt-8 border-t border-white/10 flex justify-between items-center px-4">
                        <span className="text-xl font-medium text-emerald-300">Total Progress:</span>
                        <span className="text-5xl font-black italic">
                            {(topicA.score || 0) + (topicB.score || 0) + (topicCD.score || 0) + (topicEFG.score || 0)} / 16
                        </span>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default EndOfModule4Assessment;

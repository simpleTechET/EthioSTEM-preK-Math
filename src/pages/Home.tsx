import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, Target } from "lucide-react";
import estemLogo from "@/assets/estem-logo-notext.png";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-muted">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={estemLogo} alt="ESTEM Logo - Knowledge Tap" className="w-12 h-12" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">EthioSTEM Math</h1>
              <p className="text-sm text-muted-foreground">Ethiopian STEM Academy</p>
            </div>
          </div>
          <Button variant="outline" size="lg" className="hidden md:flex gap-2">
            <Users className="w-4 h-4" />
            Parent Guide
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold mb-4">
            Pre-K Module 1
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Counting to 5
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            An interactive journey through numbers! Help your child learn to count, match, 
            and understand numbers 1 through 5 with fun activities and games.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Link to="/activities/module-1">
              <Button size="lg" className="text-lg px-8 py-6 shadow-playful hover:scale-105 transition-all">
                <BookOpen className="w-5 h-5 mr-2" />
                Start Learning
              </Button>
            </Link>
            <Link to="/parent-guide">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                <Users className="w-5 h-5 mr-2" />
                Parent Guide
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Topics Grid */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12 text-foreground">Learning Topics</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {topics.map((topic, index) => (
            <Link to={topic.path} key={topic.id}>
              <Card className="h-full hover:shadow-playful transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-primary">
                <CardHeader>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${topic.gradient} flex items-center justify-center mb-4`}>
                    <span className="text-3xl">{topic.icon}</span>
                  </div>
                  <CardTitle className="text-xl">{topic.title}</CardTitle>
                  <CardDescription>{topic.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Target className="w-4 h-4" />
                    <span>{topic.lessons} activities</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Parent Info Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="max-w-4xl mx-auto bg-gradient-to-br from-primary/5 to-accent/5 border-2">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl mb-2">For Parents</CardTitle>
            <CardDescription className="text-lg">
              Supporting your child's mathematical journey
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-card rounded-xl">
                <div className="text-4xl mb-3">👥</div>
                <h4 className="font-semibold mb-2 text-foreground">Learn Together</h4>
                <p className="text-sm text-muted-foreground">Activities designed for parent-child interaction</p>
              </div>
              <div className="text-center p-6 bg-card rounded-xl">
                <div className="text-4xl mb-3">🎯</div>
                <h4 className="font-semibold mb-2 text-foreground">Track Progress</h4>
                <p className="text-sm text-muted-foreground">See your child's achievements and growth</p>
              </div>
              <div className="text-center p-6 bg-card rounded-xl">
                <div className="text-4xl mb-3">📚</div>
                <h4 className="font-semibold mb-2 text-foreground">Guided Learning</h4>
                <p className="text-sm text-muted-foreground">Clear instructions and learning objectives</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

const topics = [
  {
    id: "matching",
    title: "Matching Objects",
    description: "Learn to identify objects that are exactly the same",
    icon: "🎯",
    gradient: "from-primary to-success",
    lessons: 4,
    path: "/topic/matching"
  },
  {
    id: "sorting",
    title: "Sorting",
    description: "Group objects by color, shape, size, and more",
    icon: "🔵",
    gradient: "from-secondary to-warning",
    lessons: 3,
    path: "/topic/sorting"
  },
  {
    id: "counting-3",
    title: "Counting to 3",
    description: "Count up to 3 objects in different arrangements",
    icon: "1️⃣",
    gradient: "from-accent to-destructive",
    lessons: 4,
    path: "/topic/counting-3"
  },
  {
    id: "numbers-3",
    title: "Numbers 1-3",
    description: "Match numerals with quantities up to 3",
    icon: "🔢",
    gradient: "from-info to-primary",
    lessons: 3,
    path: "/topic/numbers-3"
  }
];

export default Home;

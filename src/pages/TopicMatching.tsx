import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BookOpen } from "lucide-react";
import estemLogo from "@/assets/estem-logo-notext.png";

const TopicMatching = () => {
  const navigate = useNavigate();

  const activities = [
    {
      id: 1,
      title: "Lesson 1: Match Exactly the Same",
      description: "Find objects that are exactly the same",
      path: "/activity/matching-1",
      completed: false
    },
    {
      id: 2,
      title: "Lesson 2: Match Objects",
      description: "Match objects that are the same but different in size",
      path: "/activity/matching-2",
      completed: false
    },
    {
      id: 3,
      title: "Lesson 3: Match by Color",
      description: "Match objects of the same color",
      path: "/activity/matching-3",
      completed: false
    },
    {
      id: 4,
      title: "Lesson 4: Match by Type",
      description: "Match objects of the same type",
      path: "/activity/matching-4",
      completed: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-muted">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="hover:bg-primary/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <img src={estemLogo} alt="ESTEM Logo" className="w-10 h-10" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Matching Objects</h1>
              <p className="text-sm text-muted-foreground">Topic A • 4 Activities</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="p-6 bg-primary/5 border-primary/20 mb-8">
          <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            Topic Overview
          </h2>
          <p className="text-foreground/80">
            In this topic, children learn to identify and match objects that are the same. They'll
            practice recognizing objects that are exactly identical, as well as objects that share
            common attributes like color, type, or shape while differing in size.
          </p>
        </Card>

        <div className="space-y-4">
          {activities.map((activity) => (
            <Link to={activity.path} key={activity.id}>
              <Card className="hover:shadow-playful transition-all duration-300 hover:scale-[1.02] cursor-pointer border-2 hover:border-primary">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{activity.title}</CardTitle>
                      <CardDescription>{activity.description}</CardDescription>
                    </div>
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TopicMatching;

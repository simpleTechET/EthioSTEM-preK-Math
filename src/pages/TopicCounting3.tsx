import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BookOpen } from "lucide-react";
import estemLogo from "@/assets/estem-logo.png";

const TopicCounting3 = () => {
  const navigate = useNavigate();

  const activities = [
    {
      id: 8,
      title: "Lesson 8: Count Up to 3",
      description: "Learn to count up to 3 objects",
      path: "/activity/counting-8",
      completed: false
    },
    {
      id: 9,
      title: "Lesson 9: Count 3 Objects in Different Arrangements",
      description: "Practice counting 3 objects arranged in various ways",
      path: "/activity/counting-9",
      completed: false
    },
    {
      id: 10,
      title: "Lesson 10: Count Objects and Match Quantities",
      description: "Count objects and match with the correct number of items",
      path: "/activity/counting-10",
      completed: false
    },
    {
      id: 11,
      title: "Lesson 11: Advanced Counting to 4",
      description: "Learn to count up to 4 objects with games",
      path: "/activity/counting-11",
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
              <h1 className="text-2xl font-bold text-foreground">Counting to 3</h1>
              <p className="text-sm text-muted-foreground">Topic C • 4 Activities</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="p-6 bg-primary/5 border-primary/20 mb-8">
          <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <span className="text-2xl">1️⃣</span>
            Topic Overview
          </h2>
          <p className="text-foreground/80">
            In this topic, children learn the fundamental skill of counting objects up to 3.
            They'll practice one-to-one correspondence, recognizing that each number word matches
            one object, and learn that the last number counted tells "how many" in total.
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

export default TopicCounting3;

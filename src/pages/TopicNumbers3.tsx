import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BookOpen } from "lucide-react";
import estemLogo from "@/assets/estem-logo.png";

const TopicNumbers3 = () => {
  const navigate = useNavigate();

  const activities = [
    {
      id: 12,
      title: "Coming Soon: Numerals 1-3",
      description: "Match written numerals with quantities",
      path: "#",
      completed: false,
      disabled: true
    },
    {
      id: 13,
      title: "Coming Soon: Number Recognition",
      description: "Practice identifying numbers 1-3",
      path: "#",
      completed: false,
      disabled: true
    },
    {
      id: 14,
      title: "Coming Soon: Numbers and Quantities",
      description: "Connect numerals with groups of objects",
      path: "#",
      completed: false,
      disabled: true
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
              <h1 className="text-2xl font-bold text-foreground">Numbers 1-3</h1>
              <p className="text-sm text-muted-foreground">Topic D • 3 Activities</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="p-6 bg-primary/5 border-primary/20 mb-8">
          <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <span className="text-2xl">🔢</span>
            Topic Overview
          </h2>
          <p className="text-foreground/80">
            In this topic, children learn to recognize and match written numerals (1, 2, 3) with
            their corresponding quantities. They'll practice number recognition and develop an
            understanding that numerals are symbols that represent specific amounts.
          </p>
        </Card>

        <div className="space-y-4">
          {activities.map((activity) => (
            <Card 
              key={activity.id}
              className={`border-2 ${activity.disabled ? 'opacity-60' : 'hover:shadow-playful hover:scale-[1.02] hover:border-primary cursor-pointer'} transition-all duration-300`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{activity.title}</CardTitle>
                    <CardDescription>{activity.description}</CardDescription>
                  </div>
                  <BookOpen className={`w-6 h-6 ${activity.disabled ? 'text-muted-foreground' : 'text-primary'}`} />
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TopicNumbers3;

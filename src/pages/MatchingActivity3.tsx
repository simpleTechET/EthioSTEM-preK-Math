import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import MatchingGame from "@/components/MatchingGame";
import appleSmall from "@/assets/apple-small.png";
import appleLarge from "@/assets/apple-large.png";
import bananaSmall from "@/assets/banana-small.png";
import bananaLarge from "@/assets/banana-large.png";
import orangeSmall from "@/assets/orange-small.png";
import orangeLarge from "@/assets/orange-large.png";

const MatchingActivity3 = () => {
  const navigate = useNavigate();

  const matchingItems = [
    { id: 1, image: appleSmall, matchId: "apple" },
    { id: 2, image: appleLarge, matchId: "apple" },
    { id: 3, image: bananaSmall, matchId: "banana" },
    { id: 4, image: bananaLarge, matchId: "banana" },
    { id: 5, image: orangeSmall, matchId: "orange" },
    { id: 6, image: orangeLarge, matchId: "orange" },
  ];

  const handleComplete = () => {
    navigate("/activities");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/activities")}
            className="shadow-playful"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Lesson 3: Same, But Different
            </h1>
            <p className="text-muted-foreground mt-1">
              Match fruits that are the same type
            </p>
          </div>
        </div>

        <Card className="p-6 md:p-8 bg-card/95 backdrop-blur border-2 shadow-playful">
          <div className="space-y-6">
            <div className="bg-primary/5 rounded-lg p-6 border-2 border-primary/20">
              <h2 className="text-xl font-semibold mb-3 text-foreground">
                🍎 Learn: "Same, But..."
              </h2>
              <p className="text-muted-foreground mb-4">
                Look carefully at each fruit. Some are the <strong>same type</strong> but <strong>different sizes</strong>!
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Find two apples - they are the same, but one is bigger!</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Find two bananas - they are the same, but different sizes!</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Find two oranges - they are the same, but one is larger!</span>
                </li>
              </ul>
            </div>

            <MatchingGame items={matchingItems} onComplete={handleComplete} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MatchingActivity3;

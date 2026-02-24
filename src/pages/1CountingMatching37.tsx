import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, RotateCcw, Star, Sparkles, Package, Layers } from "lucide-react";

type SortGroup = "art" | "eating" | null;

interface SortableObject {
  id: string;
  name: string;
  icon: string;
  use: "art" | "eating";
}

const mysteryObjects: SortableObject[] = [
  { id: "crayon", name: "Crayon", icon: "🖍️", use: "art" },
  { id: "paintbrush", name: "Paintbrush", icon: "🖌️", use: "art" },
  { id: "pencil", name: "Pencil", icon: "✏️", use: "art" },
  { id: "fork", name: "Fork", icon: "🍴", use: "eating" },
  { id: "spoon", name: "Spoon", icon: "🥄", use: "eating" },
  { id: "plate", name: "Plate", icon: "🍽️", use: "eating" },
  { id: "napkin", name: "Napkin", icon: "🧻", use: "eating" },
];

const CountingMatching37 = () => {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [sortedArt, setSortedArt] = useState<SortableObject[]>([]);
  const [sortedEating, setSortedEating] = useState<SortableObject[]>([]);
  const [unsortedItems, setUnsortedItems] = useState<SortableObject[]>(mysteryObjects);
  const [selectedGroup, setSelectedGroup] = useState<"art" | "eating" | null>(null);
  const [towerHeight, setTowerHeight] = useState(0);
  const [selectedNumeral, setSelectedNumeral] = useState<number | null>(null);
  const [oneMoreTower, setOneMoreTower] = useState(0);
  const [oneMoreNumeral, setOneMoreNumeral] = useState<number | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [bagOpened, setBagOpened] = useState(false);

  const activities = [
    { title: "Mystery Bag", icon: "🎒" },
    { title: "Sort by Use", icon: "📦" },
    { title: "Count Groups", icon: "🔢" },
    { title: "Build Tower", icon: "🧱" },
    { title: "Match Numeral", icon: "🔢" },
    { title: "One More Tower", icon: "📶" },
    { title: "Great Job!", icon: "⭐" },
  ];

  const handleOpenBag = () => {
    setBagOpened(true);
  };

  const handleSortItem = (item: SortableObject, group: "art" | "eating") => {
    if (group === "art") {
      setSortedArt([...sortedArt, item]);
    } else {
      setSortedEating([...sortedEating, item]);
    }
    setUnsortedItems(unsortedItems.filter((i) => i.id !== item.id));
  };

  const handleSelectGroup = (group: "art" | "eating") => {
    setSelectedGroup(group);
    const count = group === "art" ? sortedArt.length : sortedEating.length;
    setTowerHeight(count);
  };

  const handleSelectNumeral = (num: number) => {
    setSelectedNumeral(num);
  };

  const handleBuildOneMore = () => {
    setOneMoreTower(towerHeight + 1);
  };

  const handleSelectOneMoreNumeral = (num: number) => {
    setOneMoreNumeral(num);
    if (num === towerHeight + 1) {
      setShowCelebration(true);
    }
  };

  const resetActivity = () => {
    setSortedArt([]);
    setSortedEating([]);
    setUnsortedItems(mysteryObjects);
    setSelectedGroup(null);
    setTowerHeight(0);
    setSelectedNumeral(null);
    setOneMoreTower(0);
    setOneMoreNumeral(null);
    setShowCelebration(false);
    setBagOpened(false);
    setCurrentActivity(0);
  };

  const nextActivity = () => {
    if (currentActivity < activities.length - 1) {
      setCurrentActivity(currentActivity + 1);
    }
  };

  const prevActivity = () => {
    if (currentActivity > 0) {
      setCurrentActivity(currentActivity - 1);
    }
  };

  const canProceed = () => {
    switch (currentActivity) {
      case 0:
        return bagOpened;
      case 1:
        return unsortedItems.length === 0;
      case 2:
        return selectedGroup !== null;
      case 3:
        return towerHeight > 0;
      case 4:
        return selectedNumeral === towerHeight;
      case 5:
        return oneMoreNumeral === towerHeight + 1;
      default:
        return true;
    }
  };

  const renderActivity = () => {
    switch (currentActivity) {
      case 0:
        return renderMysteryBag();
      case 1:
        return renderSorting();
      case 2:
        return renderCountGroups();
      case 3:
        return renderBuildTower();
      case 4:
        return renderMatchNumeral();
      case 5:
        return renderOneMoreTower();
      case 6:
        return renderCelebration();
      default:
        return null;
    }
  };

  const renderMysteryBag = () => (
    <div className="text-center space-y-8">
      <div className="text-6xl mb-4">🎒</div>
      <h2 className="text-2xl font-bold text-foreground">Mystery Bag Challenge!</h2>
      <p className="text-lg text-muted-foreground">
        You have a mystery bag with 7 objects inside.
        <br />
        Let's open it and see what's inside!
      </p>
      
      {!bagOpened ? (
        <Button
          onClick={handleOpenBag}
          size="lg"
          className="text-xl px-8 py-6 bg-amber-500 hover:bg-amber-600 animate-bounce"
        >
          <Package className="w-6 h-6 mr-2" />
          Open the Bag!
        </Button>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-wrap justify-center gap-4 p-6 bg-card rounded-xl border-2 border-dashed border-amber-300">
            {mysteryObjects.map((item) => (
              <div
                key={item.id}
                className="text-5xl p-3 bg-background rounded-lg shadow-md animate-scale-in"
              >
                {item.icon}
              </div>
            ))}
          </div>
          <p className="text-lg font-medium text-green-600">
            ✨ You found 7 objects! Now let's sort them by how we use them!
          </p>
        </div>
      )}
    </div>
  );

  const renderSorting = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-foreground">Sort by Use</h2>
      <p className="text-center text-muted-foreground">
        Drag each object to the correct group - Art Supplies or Eating Tools!
      </p>

      {/* Unsorted Items */}
      {unsortedItems.length > 0 && (
        <div className="p-4 bg-card rounded-xl border-2 border-dashed border-muted">
          <p className="text-sm font-medium text-muted-foreground mb-3">Items to Sort:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {unsortedItems.map((item) => (
              <div key={item.id} className="flex flex-col items-center gap-2">
                <div className="text-4xl p-3 bg-background rounded-lg shadow-md">
                  {item.icon}
                </div>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleSortItem(item, "art")}
                    className="text-xs bg-purple-100 hover:bg-purple-200 border-purple-300"
                  >
                    🎨 Art
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleSortItem(item, "eating")}
                    className="text-xs bg-orange-100 hover:bg-orange-200 border-orange-300"
                  >
                    🍽️ Eat
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sorting Areas */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Art Supplies */}
        <Card className="border-2 border-purple-300 bg-purple-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="text-2xl">🎨</span>
              Art Supplies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="min-h-24 flex flex-wrap gap-2">
              {sortedArt.map((item) => (
                <div
                  key={item.id}
                  className="text-3xl p-2 bg-white rounded-lg shadow-sm animate-scale-in"
                >
                  {item.icon}
                </div>
              ))}
              {sortedArt.length === 0 && (
                <p className="text-sm text-muted-foreground italic">
                  Put art supplies here
                </p>
              )}
            </div>
            <p className="mt-2 text-sm font-medium text-purple-700">
              Count: {sortedArt.length}
            </p>
          </CardContent>
        </Card>

        {/* Eating Tools */}
        <Card className="border-2 border-orange-300 bg-orange-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="text-2xl">🍽️</span>
              Eating Tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="min-h-24 flex flex-wrap gap-2">
              {sortedEating.map((item) => (
                <div
                  key={item.id}
                  className="text-3xl p-2 bg-white rounded-lg shadow-sm animate-scale-in"
                >
                  {item.icon}
                </div>
              ))}
              {sortedEating.length === 0 && (
                <p className="text-sm text-muted-foreground italic">
                  Put eating tools here
                </p>
              )}
            </div>
            <p className="mt-2 text-sm font-medium text-orange-700">
              Count: {sortedEating.length}
            </p>
          </CardContent>
        </Card>
      </div>

      {unsortedItems.length === 0 && (
        <p className="text-center text-lg font-medium text-green-600">
          ✨ Great sorting! You have {sortedArt.length} art supplies and {sortedEating.length} eating tools!
        </p>
      )}
    </div>
  );

  const renderCountGroups = () => (
    <div className="space-y-6 text-center">
      <h2 className="text-2xl font-bold text-foreground">Count Each Group</h2>
      <p className="text-muted-foreground">
        Touch and count each group. Then pick one group to build a tower!
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <Card
          className={`border-2 cursor-pointer transition-all ${
            selectedGroup === "art"
              ? "border-purple-500 ring-4 ring-purple-200"
              : "border-purple-300 hover:border-purple-400"
          } bg-purple-50`}
          onClick={() => handleSelectGroup("art")}
        >
          <CardContent className="p-6">
            <div className="text-4xl mb-4">🎨</div>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {sortedArt.map((item) => (
                <span key={item.id} className="text-3xl">{item.icon}</span>
              ))}
            </div>
            <p className="text-2xl font-bold text-purple-700">{sortedArt.length} things</p>
            <p className="text-sm text-muted-foreground mt-2">for making art</p>
          </CardContent>
        </Card>

        <Card
          className={`border-2 cursor-pointer transition-all ${
            selectedGroup === "eating"
              ? "border-orange-500 ring-4 ring-orange-200"
              : "border-orange-300 hover:border-orange-400"
          } bg-orange-50`}
          onClick={() => handleSelectGroup("eating")}
        >
          <CardContent className="p-6">
            <div className="text-4xl mb-4">🍽️</div>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {sortedEating.map((item) => (
                <span key={item.id} className="text-3xl">{item.icon}</span>
              ))}
            </div>
            <p className="text-2xl font-bold text-orange-700">{sortedEating.length} things</p>
            <p className="text-sm text-muted-foreground mt-2">for eating food</p>
          </CardContent>
        </Card>
      </div>

      {selectedGroup && (
        <p className="text-lg font-medium text-green-600">
          ✨ You picked {selectedGroup === "art" ? "art supplies" : "eating tools"}! 
          Let's build a tower of {towerHeight}!
        </p>
      )}
    </div>
  );

  const renderBuildTower = () => (
    <div className="space-y-6 text-center">
      <h2 className="text-2xl font-bold text-foreground">Build Your Number Tower</h2>
      <p className="text-muted-foreground">
        Build a tower with {towerHeight} cubes to match your{" "}
        {selectedGroup === "art" ? "art supplies" : "eating tools"}!
      </p>

      <div className="flex justify-center items-end gap-8">
        {/* Objects */}
        <div className="text-center">
          <p className="text-sm font-medium mb-2">Your Group</p>
          <div className="flex flex-col items-center gap-1">
            {(selectedGroup === "art" ? sortedArt : sortedEating).map((item) => (
              <span key={item.id} className="text-3xl">{item.icon}</span>
            ))}
          </div>
        </div>

        {/* Tower */}
        <div className="text-center">
          <p className="text-sm font-medium mb-2">Your Tower</p>
          <div className="flex flex-col-reverse items-center">
            {Array.from({ length: towerHeight }).map((_, i) => (
              <div
                key={i}
                className="w-16 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-sm border-2 border-blue-700 shadow-md animate-scale-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
          <p className="text-2xl font-bold mt-2 text-blue-700">{towerHeight} cubes</p>
        </div>
      </div>

      <p className="text-lg font-medium text-green-600">
        ✨ Your tower of {towerHeight} shows your {towerHeight}{" "}
        {selectedGroup === "art" ? "art things" : "eating things"}!
      </p>
    </div>
  );

  const renderMatchNumeral = () => (
    <div className="space-y-6 text-center">
      <h2 className="text-2xl font-bold text-foreground">Match the Numeral</h2>
      <p className="text-muted-foreground">
        Find the numeral that matches your tower of {towerHeight}!
      </p>

      <div className="flex justify-center items-end gap-8">
        {/* Tower */}
        <div className="text-center">
          <p className="text-sm font-medium mb-2">Your Tower</p>
          <div className="flex flex-col-reverse items-center">
            {Array.from({ length: towerHeight }).map((_, i) => (
              <div
                key={i}
                className="w-12 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-sm border-2 border-blue-700"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Numeral Cards */}
      <div className="flex justify-center gap-4 flex-wrap">
        {[1, 2, 3, 4, 5].map((num) => (
          <Button
            key={num}
            onClick={() => handleSelectNumeral(num)}
            variant="outline"
            className={`w-16 h-20 text-3xl font-bold transition-all ${
              selectedNumeral === num
                ? num === towerHeight
                  ? "bg-green-100 border-green-500 ring-4 ring-green-200"
                  : "bg-red-100 border-red-500"
                : "hover:bg-muted"
            }`}
          >
            {num}
          </Button>
        ))}
      </div>

      {selectedNumeral !== null && (
        <p className={`text-lg font-medium ${selectedNumeral === towerHeight ? "text-green-600" : "text-red-500"}`}>
          {selectedNumeral === towerHeight
            ? `✨ Yes! ${towerHeight} matches your tower!`
            : `Try again! Count your cubes.`}
        </p>
      )}
    </div>
  );

  const renderOneMoreTower = () => (
    <div className="space-y-6 text-center">
      <h2 className="text-2xl font-bold text-foreground">Build One More!</h2>
      <p className="text-muted-foreground">
        Now build a tower that shows 1 more than {towerHeight}!
      </p>

      <div className="flex justify-center items-end gap-8">
        {/* Original Tower */}
        <div className="text-center">
          <p className="text-sm font-medium mb-2">Tower of {towerHeight}</p>
          <div className="flex flex-col-reverse items-center">
            {Array.from({ length: towerHeight }).map((_, i) => (
              <div
                key={i}
                className="w-12 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-sm border-2 border-blue-700"
              />
            ))}
          </div>
          <p className="text-xl font-bold mt-2 text-blue-700">{towerHeight}</p>
        </div>

        {/* One More Tower */}
        <div className="text-center">
          <p className="text-sm font-medium mb-2">1 More = ?</p>
          {oneMoreTower === 0 ? (
            <Button
              onClick={handleBuildOneMore}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-8"
            >
              <Layers className="w-6 h-6 mr-2" />
              Build 1 More!
            </Button>
          ) : (
            <div className="flex flex-col-reverse items-center">
              {Array.from({ length: oneMoreTower }).map((_, i) => (
                <div
                  key={i}
                  className={`w-12 h-8 rounded-sm border-2 shadow-md ${
                    i === oneMoreTower - 1
                      ? "bg-gradient-to-r from-green-400 to-green-600 border-green-700 animate-bounce"
                      : "bg-gradient-to-r from-blue-400 to-blue-600 border-blue-700"
                  }`}
                  style={{ animationDelay: i === oneMoreTower - 1 ? "0s" : "0s" }}
                />
              ))}
            </div>
          )}
          {oneMoreTower > 0 && (
            <p className="text-xl font-bold mt-2 text-green-700">{oneMoreTower}</p>
          )}
        </div>
      </div>

      {oneMoreTower > 0 && (
        <>
          <p className="text-lg font-medium text-foreground">
            Now find the numeral for your new tower!
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            {[1, 2, 3, 4, 5].map((num) => (
              <Button
                key={num}
                onClick={() => handleSelectOneMoreNumeral(num)}
                variant="outline"
                className={`w-16 h-20 text-3xl font-bold transition-all ${
                  oneMoreNumeral === num
                    ? num === towerHeight + 1
                      ? "bg-green-100 border-green-500 ring-4 ring-green-200"
                      : "bg-red-100 border-red-500"
                    : "hover:bg-muted"
                }`}
              >
                {num}
              </Button>
            ))}
          </div>

          {oneMoreNumeral !== null && (
            <p className={`text-lg font-medium ${oneMoreNumeral === towerHeight + 1 ? "text-green-600" : "text-red-500"}`}>
              {oneMoreNumeral === towerHeight + 1
                ? `✨ Perfect! ${towerHeight} + 1 more = ${towerHeight + 1}!`
                : `Try again! What is 1 more than ${towerHeight}?`}
            </p>
          )}
        </>
      )}
    </div>
  );

  const renderCelebration = () => (
    <div className="text-center space-y-6">
      <div className="text-8xl animate-bounce">🏆</div>
      <h2 className="text-3xl font-bold text-foreground">Amazing Work!</h2>
      <div className="flex justify-center gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className="w-10 h-10 text-yellow-500 fill-yellow-500 animate-pulse"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
      <div className="space-y-2 text-lg">
        <p className="text-foreground">You completed the Culminating Task!</p>
        <p className="text-muted-foreground">You sorted objects, counted groups, built towers, and matched numerals!</p>
        <p className="text-green-600 font-medium">
          Your tower of {towerHeight} showed your {selectedGroup === "art" ? "art supplies" : "eating tools"}.
          <br />
          Then you made a tower of {towerHeight + 1} to show 1 more!
        </p>
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <Button onClick={resetActivity} variant="outline" className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Try Again
        </Button>
        <Link to="/activities/module-1">
          <Button className="gap-2 bg-green-600 hover:bg-green-700">
            <Sparkles className="w-4 h-4" />
            All Done!
          </Button>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border py-4 px-6 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/activities/module-1">
              <Button variant="outline" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="font-bold text-foreground">Lesson 37: Culminating Task</h1>
              <p className="text-xs text-muted-foreground">
                Sort, Count, Build Towers & Match Numerals
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={resetActivity}>
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset
          </Button>
        </div>
      </header>

      {/* Progress */}
      <div className="bg-card/50 border-b border-border py-2 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between gap-2">
            {activities.map((activity, index) => (
              <div
                key={index}
                className={`flex-1 text-center p-2 rounded-lg transition-all ${
                  index === currentActivity
                    ? "bg-primary text-primary-foreground"
                    : index < currentActivity
                    ? "bg-green-100 text-green-700"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <span className="text-lg">{activity.icon}</span>
                <p className="text-xs mt-1 hidden sm:block">{activity.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Card className="p-6 md:p-8">
          {renderActivity()}
        </Card>

        {/* Navigation */}
        {currentActivity < activities.length - 1 && (
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={prevActivity}
              disabled={currentActivity === 0}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <Button
              onClick={nextActivity}
              disabled={!canProceed()}
              className="gap-2 bg-primary hover:bg-primary/90"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default CountingMatching37;
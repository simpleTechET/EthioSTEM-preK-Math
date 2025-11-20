import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Clock, 
  Target, 
  Calendar,
  Star,
  Activity,
  LogOut,
  User,
  BookOpen
} from "lucide-react";

const Dashboard = () => {
  const { user, userProgress, logout } = useAuth();
  const navigate = useNavigate();

  const completedCount = userProgress?.completedActivities.length || 0;
  const totalActivities = 10; // Example total
  const completionPercentage = (completedCount / totalActivities) * 100;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
  };

  const getStreakMessage = (streak: number) => {
    if (streak === 0) return "Start your learning streak today!";
    if (streak === 1) return "Great start! Come back tomorrow!";
    if (streak <= 3) return `Awesome ${streak}-day streak!`;
    return `Amazing ${streak}-day streak! Keep going!`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Learning Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.firstName}!</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate("/activities")}>
              <BookOpen className="w-4 h-4 mr-2" />
              Continue Learning
            </Button>
            <Button variant="outline" size="icon">
              <User className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={logout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Progress Overview */}
          <Card className="col-span-full lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Learning Progress
              </CardTitle>
              <CardDescription>
                Track your math learning journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Overall Completion</span>
                    <span>{completedCount}/{totalActivities} activities</span>
                  </div>
                  <Progress value={completionPercentage} className="h-3" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold text-blue-700">Current Streak</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-800">{userProgress?.streak || 0} days</p>
                    <p className="text-xs text-blue-600 mt-1">
                      {getStreakMessage(userProgress?.streak || 0)}
                    </p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-green-600" />
                      <span className="font-semibold text-green-700">Time Learned</span>
                    </div>
                    <p className="text-2xl font-bold text-green-800">
                      {formatTime(userProgress?.totalTimeSpent || 0)}
                    </p>
                    <p className="text-xs text-green-600 mt-1">Total learning time</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              {userProgress && userProgress.completedActivities.length > 0 ? (
                <div className="space-y-3">
                  {userProgress.completedActivities.slice(-3).map(activityId => (
                    <div key={activityId} className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="bg-yellow-100 p-2 rounded-full">
                        <Trophy className="w-4 h-4 text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Completed!</p>
                        <p className="text-xs text-gray-600 capitalize">
                          {activityId.replace('-', ' ')}
                        </p>
                        {userProgress.scores[activityId] && (
                          <p className="text-xs text-green-600 font-semibold">
                            Score: {userProgress.scores[activityId].score}/{userProgress.scores[activityId].maxScore}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Target className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">No achievements yet</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                    onClick={() => navigate("/activities")}
                  >
                    Start Learning
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Activity Scores */}
          <Card className="col-span-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Activity Scores
              </CardTitle>
              <CardDescription>
                Your performance across different activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              {userProgress && Object.keys(userProgress.scores).length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {Object.entries(userProgress.scores).map(([activityId, score]) => (
                    <Card key={activityId} className="bg-white border-2 border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-800 capitalize">
                            {activityId.replace('-', ' ')}
                          </h4>
                          <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-bold">
                            {score.score}/{score.maxScore}
                          </div>
                        </div>
                        <Progress 
                          value={(score.score / score.maxScore) * 100} 
                          className="h-2 mb-2"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{formatTime(score.timeSpent)}</span>
                          <span>{new Date(score.completedAt).toLocaleDateString()}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-2">No activity scores yet</p>
                  <p className="text-gray-400 text-sm mb-4">
                    Complete activities to see your scores here
                  </p>
                  <Button onClick={() => navigate("/activities")}>
                    Start Your First Activity
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="col-span-full">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Continue your learning journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Button 
                  variant="outline" 
                  className="h-16 flex-col gap-2"
                  onClick={() => navigate("/activities")}
                >
                  <BookOpen className="w-6 h-6" />
                  All Activities
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-16 flex-col gap-2"
                  onClick={() => navigate("/counting-14")}
                >
                  <Star className="w-6 h-6" />
                  Continue Counting
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-16 flex-col gap-2"
                  onClick={() => navigate("/profile")}
                >
                  <User className="w-6 h-6" />
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
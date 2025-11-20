import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Sparkles, Users, Target, ArrowRight, CheckCircle2, Lock } from "lucide-react";

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border-2 border-purple-200">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-semibold text-purple-700">Welcome to EthioSTEM Learning</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Interactive Learning for
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                Young Minds
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Building strong foundations in mathematics and science through engaging, 
              research-based curriculum designed for Ethiopian children.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/activities">
                <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
                  Start Learning
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/parent-guide">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2">
                  Parent Guide
                  <BookOpen className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm border-y border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">Pre-K</div>
              <div className="text-gray-600">Math Module 1</div>
              <div className="text-sm text-gray-500 mt-1">Available Now</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">14</div>
              <div className="text-gray-600">Interactive Lessons</div>
              <div className="text-sm text-gray-500 mt-1">Counting to 5</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-600 mb-2">100%</div>
              <div className="text-gray-600">Free & Open</div>
              <div className="text-sm text-gray-500 mt-1">Always Free</div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Modules Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Learning Modules</h2>
            <p className="text-xl text-gray-600">Choose your learning journey</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Module 1 - Available */}
            <Card className="border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                    Available Now
                  </span>
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-2xl">Pre-K Math: Module 1</CardTitle>
                <CardDescription>Counting to 5</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <Target className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                    <span>Master counting, matching, and sorting skills</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                    <span>14 interactive lessons with engaging activities</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <BookOpen className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                    <span>Based on Eureka Math curriculum</span>
                  </div>
                  <Link to="/activities" className="block">
                    <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                      Start Module 1
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Module 2 - Coming Soon */}
            <Card className="border-2 border-gray-200 opacity-75">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                    Coming Soon
                  </span>
                  <Lock className="w-6 h-6 text-gray-400" />
                </div>
                <CardTitle className="text-2xl text-gray-700">Pre-K Math: Module 2</CardTitle>
                <CardDescription>Shapes and Spatial Relationships</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-2 text-sm text-gray-500">
                    <Target className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                    <span>Explore 2D and 3D shapes</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-500">
                    <Users className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                    <span>Learn spatial vocabulary</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-500">
                    <BookOpen className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                    <span>Hands-on geometry activities</span>
                  </div>
                  <Button disabled className="w-full mt-4 bg-gray-300 cursor-not-allowed">
                    Coming 2025
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Module 3 - Coming Soon */}
            <Card className="border-2 border-gray-200 opacity-75">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                    Coming Soon
                  </span>
                  <Lock className="w-6 h-6 text-gray-400" />
                </div>
                <CardTitle className="text-2xl text-gray-700">Pre-K Math: Module 3</CardTitle>
                <CardDescription>Counting to 10</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-2 text-sm text-gray-500">
                    <Target className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                    <span>Count and write numbers 6-10</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-500">
                    <Users className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                    <span>Compare quantities and order numbers</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-500">
                    <BookOpen className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                    <span>Build number sense to 10</span>
                  </div>
                  <Button disabled className="w-full mt-4 bg-gray-300 cursor-not-allowed">
                    Coming 2025
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why EthioSTEM?</h2>
            <p className="text-xl text-gray-600">Research-based learning that works</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="text-center border-2 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎯</span>
                </div>
                <CardTitle className="text-lg">Research-Based</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Curriculum based on proven Eureka Math methodology
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎮</span>
                </div>
                <CardTitle className="text-lg">Interactive</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Engaging games and activities that make learning fun
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">👨‍👩‍👧</span>
                </div>
                <CardTitle className="text-lg">Parent Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Comprehensive guides to help parents support learning
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📱</span>
                </div>
                <CardTitle className="text-lg">Accessible</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Works on any device - computer, tablet, or phone
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 text-white max-w-4xl mx-auto">
            <CardContent className="text-center py-16 px-6">
              <h2 className="text-4xl font-bold mb-4">Ready to Start Learning?</h2>
              <p className="text-xl mb-8 text-blue-50">
                Join thousands of Ethiopian families building strong foundations in math
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/activities">
                  <Button size="lg" className="text-lg px-8 py-6 bg-white text-blue-600 hover:bg-gray-100">
                    Begin Module 1
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/parent-guide">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 border-white text-white hover:bg-white/10">
                    Learn More
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">EthioSTEM</h3>
              <p className="text-sm text-gray-400">
                Building the next generation of Ethiopian scientists, engineers, and mathematicians
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/activities" className="hover:text-white transition-colors">Activities</Link></li>
                <li><Link to="/parent-guide" className="hover:text-white transition-colors">Parent Guide</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Teaching Tips</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Curriculum Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
            <p>© 2025 EthioSTEM. All rights reserved. Built with ❤️ for Ethiopian children.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;

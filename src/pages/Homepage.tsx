import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Sparkles, Users, Target, ArrowRight, CheckCircle2, Lock } from "lucide-react";

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-muted">
      {/* Header with Logo */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="/EthioSTEM-preK-Math/logo.png" 
                alt="Ethiopian STEM Academy" 
                className="w-12 h-12 object-contain"
              />
              <div>
                <h1 className="text-xl font-bold text-foreground">EthioSTEM Learning</h1>
                <p className="text-xs text-muted-foreground">Ethiopian STEM Academy</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link to="/activities">
                <Button variant="ghost" size="sm">Activities</Button>
              </Link>
              <Link to="/parent-guide">
                <Button variant="ghost" size="sm">Parent Guide</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <img 
                src="/EthioSTEM-preK-Math/logo.png" 
                alt="Ethiopian STEM Academy" 
                className="w-56 h-56 mx-auto object-contain mb-4"
              />
            </div>
            
            <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border-2 border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Welcome to EthioSTEM Learning</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Interactive Learning for
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                Young Minds
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Building strong foundations in mathematics and science through engaging, 
              research-based curriculum designed for Ethiopian children.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/activities">
                <Button size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 shadow-playful">
                  Start Learning
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/parent-guide">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 hover:bg-accent">
                  Parent Guide
                  <BookOpen className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/50 backdrop-blur-sm border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">Pre-K</div>
              <div className="text-muted-foreground">Math Module 1</div>
              <div className="text-sm text-muted-foreground/70 mt-1">Available Now</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary mb-2">14</div>
              <div className="text-muted-foreground">Interactive Lessons</div>
              <div className="text-sm text-muted-foreground/70 mt-1">Counting to 5</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-success mb-2">100%</div>
              <div className="text-muted-foreground">Free & Open</div>
              <div className="text-sm text-muted-foreground/70 mt-1">Always Free</div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Modules Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Learning Modules</h2>
            <p className="text-xl text-muted-foreground">Choose your learning journey</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Module 1 - Available */}
            <Card className="border-2 border-primary/20 hover:border-primary hover:shadow-playful transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                    Available Now
                  </span>
                  <CheckCircle2 className="w-6 h-6 text-success" />
                </div>
                <CardTitle className="text-2xl">Pre-K Math: Module 1</CardTitle>
                <CardDescription>Counting to 5</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Target className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span>Master counting, matching, and sorting skills</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span>14 interactive lessons with engaging activities</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <BookOpen className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span>Based on Eureka Math curriculum</span>
                  </div>
                  <Link to="/activities" className="block">
                    <Button className="w-full mt-4 bg-primary hover:bg-primary/90">
                      Start Module 1
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Module 2 - Coming Soon */}
            <Card className="border-2 border-border opacity-75">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-muted-foreground bg-muted px-3 py-1 rounded-full">
                    Coming Soon
                  </span>
                  <Lock className="w-6 h-6 text-muted-foreground" />
                </div>
                <CardTitle className="text-2xl text-muted-foreground">Pre-K Math: Module 2</CardTitle>
                <CardDescription>Shapes and Spatial Relationships</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Target className="w-4 h-4 text-muted-foreground/50 mt-1 flex-shrink-0" />
                    <span>Explore 2D and 3D shapes</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4 text-muted-foreground/50 mt-1 flex-shrink-0" />
                    <span>Learn spatial vocabulary</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <BookOpen className="w-4 h-4 text-muted-foreground/50 mt-1 flex-shrink-0" />
                    <span>Hands-on geometry activities</span>
                  </div>
                  <Button disabled className="w-full mt-4 bg-muted cursor-not-allowed">
                    Coming 2025
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Module 3 - Coming Soon */}
            <Card className="border-2 border-border opacity-75">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-muted-foreground bg-muted px-3 py-1 rounded-full">
                    Coming Soon
                  </span>
                  <Lock className="w-6 h-6 text-muted-foreground" />
                </div>
                <CardTitle className="text-2xl text-muted-foreground">Pre-K Math: Module 3</CardTitle>
                <CardDescription>Counting to 10</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Target className="w-4 h-4 text-muted-foreground/50 mt-1 flex-shrink-0" />
                    <span>Count and write numbers 6-10</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4 text-muted-foreground/50 mt-1 flex-shrink-0" />
                    <span>Compare quantities and order numbers</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <BookOpen className="w-4 h-4 text-muted-foreground/50 mt-1 flex-shrink-0" />
                    <span>Build number sense to 10</span>
                  </div>
                  <Button disabled className="w-full mt-4 bg-muted cursor-not-allowed">
                    Coming 2025
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Why EthioSTEM?</h2>
            <p className="text-xl text-muted-foreground">Research-based learning that works</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="text-center border-2 hover:shadow-playful transition-all">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎯</span>
                </div>
                <CardTitle className="text-lg">Research-Based</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Curriculum based on proven Eureka Math methodology
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:shadow-playful transition-all">
              <CardHeader>
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎮</span>
                </div>
                <CardTitle className="text-lg">Interactive</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Engaging games and activities that make learning fun
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:shadow-playful transition-all">
              <CardHeader>
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">👨‍👩‍👧</span>
                </div>
                <CardTitle className="text-lg">Parent Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Comprehensive guides to help parents support learning
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:shadow-playful transition-all">
              <CardHeader>
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📱</span>
                </div>
                <CardTitle className="text-lg">Accessible</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
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
          <Card className="bg-gradient-to-r from-primary to-secondary border-0 text-white max-w-4xl mx-auto">
            <CardContent className="text-center py-16 px-6">
              <h2 className="text-4xl font-bold mb-4">Ready to Start Learning?</h2>
              <p className="text-xl mb-8 text-primary-foreground/80">
                Join thousands of Ethiopian families building strong foundations in math
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/activities">
                  <Button size="lg" className="text-lg px-8 py-6 bg-background text-foreground hover:bg-background/90">
                    Begin Module 1
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/parent-guide">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 border-background text-background hover:bg-background/10">
                    Learn More
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card/80 backdrop-blur-sm text-muted-foreground py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/EthioSTEM-preK-Math/logo.png" 
                  alt="Ethiopian STEM Academy" 
                  className="w-10 h-10 object-contain"
                />
                <h3 className="text-xl font-bold text-foreground">EthioSTEM</h3>
              </div>
              <p className="text-sm">
                Building the next generation of Ethiopian scientists, engineers, and mathematicians
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/activities" className="hover:text-foreground transition-colors">Activities</Link></li>
                <li><Link to="/parent-guide" className="hover:text-foreground transition-colors">Parent Guide</Link></li>
                <li><a href="#" className="hover:text-foreground transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-foreground transition-colors">Teaching Tips</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Curriculum Guide</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm">
            <p>© 2025 EthioSTEM. All rights reserved. Built with ❤️ for Ethiopian children.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;

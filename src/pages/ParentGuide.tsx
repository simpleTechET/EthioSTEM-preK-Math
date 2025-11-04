import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Heart, Lightbulb, Target, Home as HomeIcon } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const ParentGuide = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-muted">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-foreground">Parent Guide</h1>
            <p className="text-sm text-muted-foreground">Supporting Your Child's Math Journey</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Welcome Section */}
        <section className="mb-12 text-center">
          <div className="inline-block p-4 rounded-full bg-primary/10 mb-4">
            <Heart className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-4xl font-bold mb-4 text-foreground">Welcome, Parents!</h2>
          <p className="text-xl text-muted-foreground">
            Your involvement is key to your child's success in mathematics. This guide will help you 
            support their learning journey through Module 1: Counting to 5.
          </p>
        </section>

        {/* Module Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Target className="w-6 h-6 text-primary" />
              Module 1 Overview
            </CardTitle>
            <CardDescription>What your child will learn</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground">
              This module builds foundational math skills through playful, interactive activities. 
              Children will develop four core mathematical understandings:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {coreIdeas.map((idea, index) => (
                <div key={index} className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{idea.icon}</span>
                    <h4 className="font-semibold text-foreground">{idea.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{idea.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* How to Help at Home */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <HomeIcon className="w-6 h-6 text-primary" />
              How to Help at Home
            </CardTitle>
            <CardDescription>Simple activities to reinforce learning</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {homeActivities.map((activity, index) => (
              <div key={index} className="flex gap-4 p-4 bg-secondary/20 rounded-lg">
                <div className="text-3xl">{activity.icon}</div>
                <div>
                  <h4 className="font-semibold mb-1 text-foreground">{activity.title}</h4>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Tips for Success */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-primary" />
              Tips for Success
            </CardTitle>
            <CardDescription>Making math time enjoyable and effective</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {successTips.map((tip, index) => (
                <li key={index} className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-foreground">{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-foreground">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const coreIdeas = [
  {
    icon: "🗣️",
    title: "Rote Counting",
    description: "Learning the number word list in order: one, two, three..."
  },
  {
    icon: "☝️",
    title: "One-to-One",
    description: "Pairing each object with exactly one number word"
  },
  {
    icon: "🎯",
    title: "Cardinality",
    description: "Understanding that the last number tells 'how many'"
  },
  {
    icon: "🔢",
    title: "Numerals",
    description: "Recognizing and using written numbers 1-5"
  }
];

const homeActivities = [
  {
    icon: "🧦",
    title: "Matching Socks",
    description: "Have your child match socks while doing laundry. Ask them to describe how the socks are the same."
  },
  {
    icon: "🍎",
    title: "Counting Groceries",
    description: "At the store or at home, count items together: '1, 2, 3. We need 3 apples!'"
  },
  {
    icon: "🎨",
    title: "Sorting Toys",
    description: "Sort toys by color, size, or type. Let your child explain their sorting choices."
  },
  {
    icon: "🔍",
    title: "I Spy Numbers",
    description: "Play I Spy with numbers: 'I spy something with the number 2 on it!'"
  }
];

const successTips = [
  "Keep sessions short and fun - 10-15 minutes is perfect for pre-K children",
  "Celebrate effort and progress, not just correct answers",
  "Use real objects whenever possible - toys, snacks, household items",
  "Let your child touch and move objects while counting",
  "Practice counting in everyday situations: steps, toys, fingers, snacks",
  "Be patient - children learn at different paces, and that's okay!",
  "Make it playful - use songs, games, and silly voices",
  "Review and repeat - repetition helps young children master new skills"
];

const faqs = [
  {
    question: "How much time should we spend on math each day?",
    answer: "For pre-K children, 10-15 minutes of focused math time is ideal. However, you can also incorporate counting and matching into everyday activities throughout the day."
  },
  {
    question: "My child is struggling with counting. What should I do?",
    answer: "This is completely normal! Start with smaller numbers (1-2), use concrete objects they can touch, and practice frequently in short sessions. Make it playful and pressure-free."
  },
  {
    question: "Should my child be writing numbers yet?",
    answer: "In Pre-K, the focus is on recognizing numbers and understanding what they represent. Writing numbers will come later as fine motor skills develop."
  },
  {
    question: "What if my child finishes activities quickly?",
    answer: "That's great! You can extend learning by using larger quantities in everyday counting, creating your own matching games, or exploring the same concepts with different objects."
  },
  {
    question: "How can I tell if my child is making progress?",
    answer: "Look for signs like: counting objects without skipping, knowing that the last number tells 'how many,' matching numbers to quantities, and using math words in everyday situations."
  }
];

export default ParentGuide;
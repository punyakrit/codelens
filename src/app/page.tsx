import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Github,
  Zap,
  MessageSquare,
  FileText,
  Search,
  Users,
  ArrowRight,
  Star,
  Code2,
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
              <Code2 className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">CodeLens</span>
          </div>
          <nav className="hidden items-center space-x-8 md:flex">
            <a
              href="#features"
              className="text-slate-600 transition-colors hover:text-slate-900"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-slate-600 transition-colors hover:text-slate-900"
            >
              Pricing
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/sign-in">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            </Link>
            <Link href="/sign-up">
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
              Get Started Free
            </Button>
              </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-100">
          <Github className="mr-2 h-4 w-4" />
          GitHub Integration
        </Badge>
        <h1 className="mb-6 text-5xl leading-tight font-bold text-slate-900 md:text-6xl">
          Ship Code Faster with
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {" "}
            AI-Powered
          </span>
          <br />
          GitHub Collaboration
        </h1>
        <p className="mx-auto mb-8 max-w-3xl text-xl text-slate-600">
          Transform your development workflow with AI-assisted code navigation,
          auto-generated documentation, and intelligent pull-request assistance.
          Connect your GitHub repos and start collaborating smarter.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 text-lg hover:from-blue-700 hover:to-purple-700"
          >
            <Code2 className="mr-2 h-5 w-5" />
            Connect Account
          </Button>
          <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
            Watch Demo
          </Button>
        </div>
        <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-slate-500">
          <div className="flex items-center">
            <Star className="mr-1 h-4 w-4 fill-current text-yellow-500" />
            <span>4.9/5 from 2,000+ developers</span>
          </div>
          <div className="flex items-center">
            <Users className="mr-1 h-4 w-4" />
            <span>10,000+ active users</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-slate-900">
            Everything You Need to Code Smarter
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-slate-600">
            AI-powered features that integrate seamlessly with your existing
            GitHub workflow
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-0 shadow-lg transition-shadow hover:shadow-xl">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <Search className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Natural Language Code Search</CardTitle>
              <CardDescription>
                Search your entire codebase using natural language queries. Find
                functions, classes, and implementations instantly.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg transition-shadow hover:shadow-xl">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                <MessageSquare className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>AI Code Chat</CardTitle>
              <CardDescription>
                Chat with your codebase. Ask questions, get explanations, and
                receive suggestions for improvements.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg transition-shadow hover:shadow-xl">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Auto-Generated Documentation</CardTitle>
              <CardDescription>
                Automatically generate comprehensive documentation for your
                code, APIs, and project structure.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg transition-shadow hover:shadow-xl">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle>Smart Pull Request Assistant</CardTitle>
              <CardDescription>
                AI-powered code review suggestions, conflict resolution, and
                automated testing recommendations.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg transition-shadow hover:shadow-xl">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                <Zap className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle>Workflow Automation</CardTitle>
              <CardDescription>
                Automate repetitive tasks, generate boilerplate code, and
                streamline your development process.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg transition-shadow hover:shadow-xl">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100">
                <Github className="h-6 w-6 text-indigo-600" />
              </div>
              <CardTitle>Seamless GitHub Integration</CardTitle>
              <CardDescription>
                Direct integration with GitHub repositories, commits, and pull
                requests. No context switching required.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-slate-900">
            How It Works
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-slate-600">
            Get started in minutes with our simple 3-step process
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h3 className="mb-4 text-xl font-semibold">Connect GitHub</h3>
            <p className="text-slate-600">
              Link your GitHub account and select repositories to enable
              AI-powered features
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
              <span className="text-2xl font-bold text-purple-600">2</span>
            </div>
            <h3 className="mb-4 text-xl font-semibold">AI Analysis</h3>
            <p className="text-slate-600">
              Our AI analyzes your codebase and provides intelligent insights
              and suggestions
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <span className="text-2xl font-bold text-green-600">3</span>
            </div>
            <h3 className="mb-4 text-xl font-semibold">Ship Faster</h3>
            <p className="text-slate-600">
              Collaborate smarter, generate docs automatically, and deploy with
              confidence
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-4 py-20">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-slate-900">
            Simple, Transparent Pricing
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-slate-600">
            Start free, upgrade when you need more power
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          <Card className="border-2 border-slate-200">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Free</CardTitle>
              <div className="text-4xl font-bold text-slate-900">
                $0
                <span className="text-lg font-normal text-slate-600">
                  /month
                </span>
              </div>
              <CardDescription>
                Perfect for individual developers and small projects
              </CardDescription>
            </CardHeader>
            <CardContent className="flex h-full flex-col justify-between">
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="mr-3 h-5 w-5 text-green-500" />
                  <span>Up to 3 repositories</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-3 h-5 w-5 text-green-500" />
                  <span>Basic AI code search</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-3 h-5 w-5 text-green-500" />
                  <span>100 AI chat messages/month</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-3 h-5 w-5 text-green-500" />
                  <span>Community support</span>
                </li>
              </ul>
              <Button className="mt-6 w-full" variant="outline">
                Get Started Free
              </Button>
            </CardContent>
          </Card>

          <Card className="relative border-2 border-blue-500">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 transform">
              <Badge className="bg-blue-600 text-white">Most Popular</Badge>
            </div>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Pro</CardTitle>
              <div className="text-4xl font-bold text-slate-900">
                $29
                <span className="text-lg font-normal text-slate-600">
                  /month
                </span>
              </div>
              <CardDescription>For teams and growing projects</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="mr-3 h-5 w-5 text-green-500" />
                  <span>Unlimited repositories</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-3 h-5 w-5 text-green-500" />
                  <span>Advanced AI features</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-3 h-5 w-5 text-green-500" />
                  <span>Unlimited AI chat</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-3 h-5 w-5 text-green-500" />
                  <span>Auto-generated documentation</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-3 h-5 w-5 text-green-500" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-3 h-5 w-5 text-green-500" />
                  <span>Team collaboration tools</span>
                </li>
              </ul>
              <Button className="mt-6 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Start Pro Trial
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-slate-900">
            Trusted by Developers Worldwide
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-slate-600">
            Join thousands of developers who've transformed their workflow
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Card className="border-0 shadow-lg">
            <CardContent className="pt-2">
              <div className="mb-4 flex items-center">
                <div>
                  <p className="font-semibold">Sarah Chen</p>
                  <p className="text-sm text-slate-600">
                    Senior Developer @ TechCorp
                  </p>
                </div>
              </div>
              <p className="text-slate-600">
                "CodeLens has cut our code review time in half. The AI
                suggestions are incredibly accurate and the documentation
                generation is a game-changer."
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="pt-2">
              <div className="mb-4 flex items-center">
                <div>
                  <p className="font-semibold">Marcus Rodriguez</p>
                  <p className="text-sm text-slate-600">
                    Lead Engineer @ StartupXYZ
                  </p>
                </div>
              </div>
              <p className="text-slate-600">
                "The natural language search feature alone has saved me hours of
                digging through legacy code. It's like having a senior developer
                on call 24/7."
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="pt-2">
              <div className="mb-4 flex items-center">
                <div>
                  <p className="font-semibold">Alex Thompson</p>
                  <p className="text-sm text-slate-600">
                    DevOps Engineer @ CloudScale
                  </p>
                </div>
              </div>
              <p className="text-slate-600">
                "Seamless GitHub integration means no context switching. Our
                team productivity has increased by 40% since we started using
                CodeLens."
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-12 text-center text-white">
          <h2 className="mb-4 text-4xl font-bold">
            Ready to Transform Your Development Workflow?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl opacity-90">
            Join thousands of developers who are already shipping code faster
            with AI-powered collaboration
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" variant="secondary" className="px-8 py-6 text-lg">
              Get Started
              <ArrowRight className="mr-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 text-white">
        <div className="container mx-auto px-4 text-center">
            <p>&copy; 2024 CodeLens. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

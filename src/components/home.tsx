import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  CheckCircle,
  Star,
  Zap,
  FileText,
  Layout,
  Sparkles,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">ResumeBuilder</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="#features"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Features
            </Link>
            <Link
              to="#templates"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Templates
            </Link>
            <Link
              to="#pricing"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Pricing
            </Link>
            <Link
              to="#testimonials"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="sm">Sign up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-24 md:py-32 space-y-8">
        <div className="text-center space-y-4">
          <Badge className="px-3 py-1 text-sm" variant="secondary">
            ✨ Professional Resume Builder
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Create stunning resumes that <br />
            <span className="text-primary">get you hired</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-[42rem] mx-auto">
            Build professional resumes in minutes with our intuitive
            drag-and-drop editor, AI-powered content suggestions, and
            ATS-friendly templates.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/signup">
            <Button size="lg" className="gap-2">
              Get started for free
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="#templates">
            <Button size="lg" variant="outline">
              Browse templates
            </Button>
          </Link>
        </div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative mx-auto mt-16 max-w-5xl rounded-lg border bg-background shadow-xl overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&q=80"
            alt="Resume Builder Interface"
            className="w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-30"></div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="container py-24 space-y-16">
        <div className="text-center space-y-4">
          <Badge variant="secondary">Features</Badge>
          <h2 className="text-3xl md:text-4xl font-bold">
            Everything you need to create the perfect resume
          </h2>
          <p className="text-xl text-muted-foreground max-w-[42rem] mx-auto">
            Our platform offers powerful tools to help you build a professional
            resume that stands out.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <Layout className="h-10 w-10 text-primary" />
              <h3 className="text-xl font-bold">Drag-and-Drop Editor</h3>
              <p className="text-muted-foreground">
                Easily arrange and customize resume sections with our intuitive
                drag-and-drop interface.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 space-y-4">
              <Sparkles className="h-10 w-10 text-primary" />
              <h3 className="text-xl font-bold">AI Content Suggestions</h3>
              <p className="text-muted-foreground">
                Get smart content recommendations tailored to your industry and
                experience level.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 space-y-4">
              <Zap className="h-10 w-10 text-primary" />
              <h3 className="text-xl font-bold">ATS-Friendly Templates</h3>
              <p className="text-muted-foreground">
                Ensure your resume passes through Applicant Tracking Systems
                with our optimized templates.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="bg-muted/40 py-24">
        <div className="container space-y-12">
          <div className="text-center space-y-4">
            <Badge variant="secondary">Templates</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Professional resume templates
            </h2>
            <p className="text-xl text-muted-foreground max-w-[42rem] mx-auto">
              Choose from our collection of professionally designed templates
              for any industry.
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center">
              <TabsList>
                <TabsTrigger value="all">All Templates</TabsTrigger>
                <TabsTrigger value="professional">Professional</TabsTrigger>
                <TabsTrigger value="creative">Creative</TabsTrigger>
                <TabsTrigger value="simple">Simple</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="all" className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="group relative overflow-hidden rounded-lg border bg-background shadow-md transition-all hover:shadow-xl"
                  >
                    <img
                      src={`https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&q=70`}
                      alt={`Resume Template ${item}`}
                      className="w-full aspect-[3/4] object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                      <div className="p-4 w-full">
                        <Button className="w-full">Use this template</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="professional" className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2].map((item) => (
                  <div
                    key={item}
                    className="group relative overflow-hidden rounded-lg border bg-background shadow-md transition-all hover:shadow-xl"
                  >
                    <img
                      src={`https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&q=70`}
                      alt={`Professional Template ${item}`}
                      className="w-full aspect-[3/4] object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                      <div className="p-4 w-full">
                        <Button className="w-full">Use this template</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="creative" className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2].map((item) => (
                  <div
                    key={item}
                    className="group relative overflow-hidden rounded-lg border bg-background shadow-md transition-all hover:shadow-xl"
                  >
                    <img
                      src={`https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&q=70`}
                      alt={`Creative Template ${item}`}
                      className="w-full aspect-[3/4] object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                      <div className="p-4 w-full">
                        <Button className="w-full">Use this template</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="simple" className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2].map((item) => (
                  <div
                    key={item}
                    className="group relative overflow-hidden rounded-lg border bg-background shadow-md transition-all hover:shadow-xl"
                  >
                    <img
                      src={`https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&q=70`}
                      alt={`Simple Template ${item}`}
                      className="w-full aspect-[3/4] object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                      <div className="p-4 w-full">
                        <Button className="w-full">Use this template</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container py-24 space-y-12">
        <div className="text-center space-y-4">
          <Badge variant="secondary">Pricing</Badge>
          <h2 className="text-3xl md:text-4xl font-bold">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-[42rem] mx-auto">
            Choose the plan that's right for you and start building your
            professional resume today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <Card className="border-muted">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Free</h3>
                <div className="text-4xl font-bold">
                  $0
                  <span className="text-muted-foreground text-base font-normal">
                    /month
                  </span>
                </div>
                <p className="text-muted-foreground">
                  Perfect for getting started with basic resume creation.
                </p>
                <ul className="space-y-2">
                  {["1 resume", "Basic templates", "Export as PDF"].map(
                    (feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ),
                  )}
                </ul>
                <Button className="w-full" variant="outline">
                  Get started
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="border-primary relative">
            <div className="absolute -top-4 left-0 right-0 flex justify-center">
              <Badge className="px-3 py-1">Most Popular</Badge>
            </div>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Pro</h3>
                <div className="text-4xl font-bold">
                  $9
                  <span className="text-muted-foreground text-base font-normal">
                    /month
                  </span>
                </div>
                <p className="text-muted-foreground">
                  Everything you need for professional resume building.
                </p>
                <ul className="space-y-2">
                  {[
                    "Unlimited resumes",
                    "All templates",
                    "AI content suggestions",
                    "Export as PDF, DOCX, TXT",
                    "ATS optimization",
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full">Get started</Button>
              </div>
            </CardContent>
          </Card>

          {/* Enterprise Plan */}
          <Card className="border-muted">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Enterprise</h3>
                <div className="text-4xl font-bold">
                  $29
                  <span className="text-muted-foreground text-base font-normal">
                    /month
                  </span>
                </div>
                <p className="text-muted-foreground">
                  Advanced features for teams and businesses.
                </p>
                <ul className="space-y-2">
                  {[
                    "Everything in Pro",
                    "Team management",
                    "Custom branding",
                    "Advanced analytics",
                    "Priority support",
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant="outline">
                  Contact sales
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-muted/40 py-24">
        <div className="container space-y-12">
          <div className="text-center space-y-4">
            <Badge variant="secondary">Testimonials</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              What our users say
            </h2>
            <p className="text-xl text-muted-foreground max-w-[42rem] mx-auto">
              Thousands of job seekers have found success using our resume
              builder.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Marketing Manager",
                content:
                  "The AI suggestions helped me highlight achievements I would have otherwise overlooked. I received interview calls within a week of applying with my new resume!",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
              },
              {
                name: "Michael Chen",
                role: "Software Developer",
                content:
                  "The ATS optimization feature is a game-changer. My application success rate has increased dramatically since using this platform.",
                avatar:
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
              },
              {
                name: "Emily Rodriguez",
                role: "Graphic Designer",
                content:
                  "As a creative professional, I needed a resume that would showcase my personality while remaining professional. The templates here are perfect!",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
              },
            ].map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="h-5 w-5 fill-primary text-primary"
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="h-10 w-10 rounded-full"
                      />
                      <div>
                        <h4 className="font-medium">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-24">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">
                  Ready to build your professional resume?
                </h2>
                <p className="text-primary-foreground/90 text-lg">
                  Join thousands of job seekers who have successfully landed
                  their dream jobs.
                </p>
              </div>
              <Link to="/signup">
                <Button
                  size="lg"
                  variant="secondary"
                  className="whitespace-nowrap"
                >
                  Get started for free
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">ResumeBuilder</span>
              </div>
              <p className="text-muted-foreground">
                Build professional resumes that get you hired.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-4">Product</h3>
              <ul className="space-y-2">
                {["Features", "Templates", "Pricing", "FAQ"].map((item) => (
                  <li key={item}>
                    <Link
                      to="#"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2">
                {["About", "Careers", "Blog", "Legal"].map((item) => (
                  <li key={item}>
                    <Link
                      to="#"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Connect</h3>
              <ul className="space-y-2">
                {["Twitter", "Instagram", "Facebook", "LinkedIn"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        to="#"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-muted-foreground">
            <p>
              © {new Date().getFullYear()} ResumeBuilder. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

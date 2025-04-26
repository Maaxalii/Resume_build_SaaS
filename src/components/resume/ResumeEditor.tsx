import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  Check,
  Download,
  FileDown,
  Lightbulb,
  MoveVertical,
  Plus,
  Save,
  Settings,
  Share2,
  Sparkles,
  Trash2,
} from "lucide-react";

interface ResumeEditorProps {
  resumeId?: string;
  templateId?: string;
}

const ResumeEditor: React.FC<ResumeEditorProps> = ({
  resumeId = "1",
  templateId = "modern-1",
}) => {
  const [activeTab, setActiveTab] = useState("personal");
  const [showAIDialog, setShowAIDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [atsScore, setAtsScore] = useState(85);

  // Mock data for the resume
  const resumeData = {
    personal: {
      name: "Alex Johnson",
      title: "Senior Frontend Developer",
      email: "alex.johnson@example.com",
      phone: "(555) 123-4567",
      location: "San Francisco, CA",
      website: "alexjohnson.dev",
      summary:
        "Experienced frontend developer with 6+ years specializing in React, TypeScript, and modern UI frameworks. Passionate about creating intuitive user experiences and scalable web applications.",
    },
    experience: [
      {
        id: "exp1",
        company: "Tech Innovations Inc.",
        title: "Senior Frontend Developer",
        location: "San Francisco, CA",
        startDate: "2020-03",
        endDate: "Present",
        description:
          "Lead frontend development for enterprise SaaS platform. Implemented component library reducing development time by 40%. Mentored junior developers and established code quality standards.",
      },
      {
        id: "exp2",
        company: "Digital Solutions Co.",
        title: "Frontend Developer",
        location: "Portland, OR",
        startDate: "2017-06",
        endDate: "2020-02",
        description:
          "Developed responsive web applications using React and Redux. Collaborated with UX team to implement design systems. Improved site performance by 35%.",
      },
    ],
    education: [
      {
        id: "edu1",
        institution: "University of California, Berkeley",
        degree: "Bachelor of Science in Computer Science",
        location: "Berkeley, CA",
        startDate: "2013-09",
        endDate: "2017-05",
        description:
          "Graduated with honors. Specialized in Human-Computer Interaction.",
      },
    ],
    skills: [
      { id: "skill1", name: "React", level: "Expert" },
      { id: "skill2", name: "TypeScript", level: "Expert" },
      { id: "skill3", name: "JavaScript", level: "Expert" },
      { id: "skill4", name: "HTML/CSS", level: "Expert" },
      { id: "skill5", name: "Redux", level: "Advanced" },
      { id: "skill6", name: "Node.js", level: "Intermediate" },
      { id: "skill7", name: "GraphQL", level: "Intermediate" },
      { id: "skill8", name: "UI/UX Design", level: "Intermediate" },
    ],
    projects: [
      {
        id: "proj1",
        title: "Enterprise Design System",
        description:
          "Created a comprehensive design system with 50+ components used across multiple products.",
        technologies: "React, TypeScript, Storybook",
      },
      {
        id: "proj2",
        title: "E-commerce Platform Redesign",
        description:
          "Led frontend redesign resulting in 25% increase in conversion rate.",
        technologies: "React, Redux, Styled Components",
      },
    ],
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">Resume Editor</h1>
          <Badge variant="outline" className="text-xs">
            {templateId}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAIDialog(true)}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  AI Optimize
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Optimize your resume with AI suggestions</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button variant="outline" size="sm" onClick={() => {}}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowExportDialog(true)}
          >
            <FileDown className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* Editor Panel */}
        <ResizablePanel defaultSize={40} minSize={30}>
          <div className="h-full flex flex-col">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="px-4 pt-4">
                <TabsList className="w-full grid grid-cols-5">
                  <TabsTrigger value="personal">Personal</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                </TabsList>
              </div>

              <ScrollArea className="flex-1 p-4">
                <TabsContent value="personal" className="space-y-4">
                  <Card>
                    <CardContent className="pt-6 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            defaultValue={resumeData.personal.name}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="title">Professional Title</Label>
                          <Input
                            id="title"
                            defaultValue={resumeData.personal.title}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            defaultValue={resumeData.personal.email}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            defaultValue={resumeData.personal.phone}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            defaultValue={resumeData.personal.location}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="website">Website</Label>
                          <Input
                            id="website"
                            defaultValue={resumeData.personal.website}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="summary">Professional Summary</Label>
                        <Textarea
                          id="summary"
                          rows={4}
                          defaultValue={resumeData.personal.summary}
                          className="resize-none"
                        />
                        <div className="flex justify-end">
                          <Button variant="ghost" size="sm" className="text-xs">
                            <Lightbulb className="h-3 w-3 mr-1" />
                            Get AI suggestions
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="experience" className="space-y-4">
                  {resumeData.experience.map((exp) => (
                    <Card key={exp.id} className="relative">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2 h-6 w-6 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <CardContent className="pt-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`company-${exp.id}`}>Company</Label>
                            <Input
                              id={`company-${exp.id}`}
                              defaultValue={exp.company}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`title-${exp.id}`}>Job Title</Label>
                            <Input
                              id={`title-${exp.id}`}
                              defaultValue={exp.title}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`location-${exp.id}`}>
                              Location
                            </Label>
                            <Input
                              id={`location-${exp.id}`}
                              defaultValue={exp.location}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`start-${exp.id}`}>
                              Start Date
                            </Label>
                            <Input
                              id={`start-${exp.id}`}
                              defaultValue={exp.startDate}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`end-${exp.id}`}>End Date</Label>
                            <Input
                              id={`end-${exp.id}`}
                              defaultValue={exp.endDate}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`desc-${exp.id}`}>Description</Label>
                          <Textarea
                            id={`desc-${exp.id}`}
                            rows={3}
                            defaultValue={exp.description}
                            className="resize-none"
                          />
                          <div className="flex justify-end">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-xs"
                            >
                              <Lightbulb className="h-3 w-3 mr-1" />
                              Get AI suggestions
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <Button className="w-full" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Experience
                  </Button>
                </TabsContent>

                <TabsContent value="education" className="space-y-4">
                  {resumeData.education.map((edu) => (
                    <Card key={edu.id} className="relative">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2 h-6 w-6 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <CardContent className="pt-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`institution-${edu.id}`}>
                              Institution
                            </Label>
                            <Input
                              id={`institution-${edu.id}`}
                              defaultValue={edu.institution}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                            <Input
                              id={`degree-${edu.id}`}
                              defaultValue={edu.degree}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`location-${edu.id}`}>
                              Location
                            </Label>
                            <Input
                              id={`location-${edu.id}`}
                              defaultValue={edu.location}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`start-${edu.id}`}>
                              Start Date
                            </Label>
                            <Input
                              id={`start-${edu.id}`}
                              defaultValue={edu.startDate}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`end-${edu.id}`}>End Date</Label>
                            <Input
                              id={`end-${edu.id}`}
                              defaultValue={edu.endDate}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`desc-${edu.id}`}>Description</Label>
                          <Textarea
                            id={`desc-${edu.id}`}
                            rows={2}
                            defaultValue={edu.description}
                            className="resize-none"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <Button className="w-full" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Education
                  </Button>
                </TabsContent>

                <TabsContent value="skills" className="space-y-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        {resumeData.skills.map((skill) => (
                          <div
                            key={skill.id}
                            className="flex items-center justify-between gap-4"
                          >
                            <div className="flex-1">
                              <Input defaultValue={skill.name} />
                            </div>
                            <div className="w-32">
                              <Select defaultValue={skill.level}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Level" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Beginner">
                                    Beginner
                                  </SelectItem>
                                  <SelectItem value="Intermediate">
                                    Intermediate
                                  </SelectItem>
                                  <SelectItem value="Advanced">
                                    Advanced
                                  </SelectItem>
                                  <SelectItem value="Expert">Expert</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="cursor-grab"
                            >
                              <MoveVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}

                        <Button className="w-full" variant="outline">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Skill
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="projects" className="space-y-4">
                  {resumeData.projects.map((project) => (
                    <Card key={project.id} className="relative">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2 h-6 w-6 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <CardContent className="pt-6 space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor={`title-${project.id}`}>
                            Project Title
                          </Label>
                          <Input
                            id={`title-${project.id}`}
                            defaultValue={project.title}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`tech-${project.id}`}>
                            Technologies Used
                          </Label>
                          <Input
                            id={`tech-${project.id}`}
                            defaultValue={project.technologies}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`desc-${project.id}`}>
                            Description
                          </Label>
                          <Textarea
                            id={`desc-${project.id}`}
                            rows={3}
                            defaultValue={project.description}
                            className="resize-none"
                          />
                          <div className="flex justify-end">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-xs"
                            >
                              <Lightbulb className="h-3 w-3 mr-1" />
                              Get AI suggestions
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <Button className="w-full" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Project
                  </Button>
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Preview Panel */}
        <ResizablePanel defaultSize={60}>
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-sm font-medium">Preview</h2>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">ATS Score:</span>
                  <div className="flex items-center gap-2">
                    <Progress value={atsScore} className="w-24 h-2" />
                    <span className="text-sm font-medium">{atsScore}%</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Template Settings
                </Button>
              </div>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-8 flex justify-center">
                <div className="w-[21cm] min-h-[29.7cm] bg-white shadow-lg p-8 border">
                  {/* Resume Preview Content */}
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="text-center space-y-2">
                      <h1 className="text-2xl font-bold">
                        {resumeData.personal.name}
                      </h1>
                      <p className="text-gray-600">
                        {resumeData.personal.title}
                      </p>
                      <div className="flex justify-center gap-4 text-sm text-gray-600">
                        <span>{resumeData.personal.email}</span>
                        <span>{resumeData.personal.phone}</span>
                        <span>{resumeData.personal.location}</span>
                      </div>
                    </div>

                    <Separator />

                    {/* Summary */}
                    <div>
                      <h2 className="text-lg font-semibold mb-2">
                        Professional Summary
                      </h2>
                      <p className="text-sm">{resumeData.personal.summary}</p>
                    </div>

                    {/* Experience */}
                    <div>
                      <h2 className="text-lg font-semibold mb-3">Experience</h2>
                      <div className="space-y-4">
                        {resumeData.experience.map((exp) => (
                          <div key={exp.id}>
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">{exp.title}</h3>
                                <p className="text-sm">{exp.company}</p>
                              </div>
                              <div className="text-sm text-gray-600">
                                <p>
                                  {exp.startDate} - {exp.endDate}
                                </p>
                                <p className="text-right">{exp.location}</p>
                              </div>
                            </div>
                            <p className="text-sm mt-1">{exp.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Education */}
                    <div>
                      <h2 className="text-lg font-semibold mb-3">Education</h2>
                      <div className="space-y-4">
                        {resumeData.education.map((edu) => (
                          <div key={edu.id}>
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">{edu.degree}</h3>
                                <p className="text-sm">{edu.institution}</p>
                              </div>
                              <div className="text-sm text-gray-600">
                                <p>
                                  {edu.startDate} - {edu.endDate}
                                </p>
                                <p className="text-right">{edu.location}</p>
                              </div>
                            </div>
                            <p className="text-sm mt-1">{edu.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Skills */}
                    <div>
                      <h2 className="text-lg font-semibold mb-2">Skills</h2>
                      <div className="flex flex-wrap gap-2">
                        {resumeData.skills.map((skill) => (
                          <Badge key={skill.id} variant="secondary">
                            {skill.name}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Projects */}
                    <div>
                      <h2 className="text-lg font-semibold mb-3">Projects</h2>
                      <div className="space-y-3">
                        {resumeData.projects.map((project) => (
                          <div key={project.id}>
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium">{project.title}</h3>
                              <p className="text-sm text-gray-600">
                                {project.technologies}
                              </p>
                            </div>
                            <p className="text-sm mt-1">
                              {project.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      {/* AI Optimization Dialog */}
      <Dialog open={showAIDialog} onOpenChange={setShowAIDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>AI Resume Optimization</DialogTitle>
            <DialogDescription>
              Let our AI analyze your resume and suggest improvements to
              increase your chances of getting noticed.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Target Job Title</Label>
              <Input placeholder="e.g. Senior Frontend Developer" />
            </div>

            <div className="space-y-2">
              <Label>Industry</Label>
              <Select defaultValue="technology">
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Optimization Focus</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="justify-start">
                  <Check className="h-4 w-4 mr-2" />
                  Keywords
                </Button>
                <Button variant="outline" className="justify-start">
                  <Check className="h-4 w-4 mr-2" />
                  Content
                </Button>
                <Button variant="outline" className="justify-start">
                  <Check className="h-4 w-4 mr-2" />
                  Format
                </Button>
                <Button variant="outline" className="justify-start">
                  <Check className="h-4 w-4 mr-2" />
                  Grammar
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowAIDialog(false)}>
              Cancel
            </Button>
            <Button>
              <Sparkles className="h-4 w-4 mr-2" />
              Optimize Resume
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Export Dialog */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Export Resume</DialogTitle>
            <DialogDescription>
              Choose a format to export your resume.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-3 gap-4 py-4">
            <Button variant="outline" className="flex flex-col h-auto py-4">
              <Download className="h-8 w-8 mb-2" />
              <span>PDF</span>
            </Button>
            <Button variant="outline" className="flex flex-col h-auto py-4">
              <Download className="h-8 w-8 mb-2" />
              <span>DOCX</span>
            </Button>
            <Button variant="outline" className="flex flex-col h-auto py-4">
              <Download className="h-8 w-8 mb-2" />
              <span>TXT</span>
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>ATS Optimized</Label>
              <Badge variant="outline" className="ml-2">
                Recommended
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Export with formatting optimized for Applicant Tracking Systems.
            </p>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setShowExportDialog(false)}
            >
              Cancel
            </Button>
            <Button>
              <Share2 className="h-4 w-4 mr-2" />
              Share Link
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResumeEditor;

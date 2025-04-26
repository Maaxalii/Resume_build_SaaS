import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTemplates, Template } from "@/hooks/useTemplates";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, Filter, Lock, Loader2, Search } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export default function TemplatesPage() {
  const { templates, loading, userPlan } = useTemplates();
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null,
  );
  const [previewOpen, setPreviewOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const [filterStyle, setFilterStyle] = useState("all");
  const [filterColor, setFilterColor] = useState("all");
  const [filterIndustry, setFilterIndustry] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  const filteredTemplates = templates.filter((template) => {
    const matchesStyle =
      filterStyle === "all" || template.style === filterStyle;
    const matchesColor =
      filterColor === "all" || template.color_scheme === filterColor;
    const matchesIndustry =
      filterIndustry === "all" || template.industry.includes(filterIndustry);
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStyle && matchesColor && matchesIndustry && matchesSearch;
  });

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setCreateDialogOpen(true);
  };

  const handlePreview = (template: Template) => {
    setSelectedTemplate(template);
    setPreviewOpen(true);
  };

  const handleCreateResume = async () => {
    if (!user) {
      navigate("/signin");
      return;
    }

    if (!selectedTemplate) return;
    if (!resumeTitle.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for your resume",
        variant: "destructive",
      });
      return;
    }

    try {
      // Create a new resume in the database
      const response = await fetch("/api/resumes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: resumeTitle,
          templateId: selectedTemplate.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create resume");
      }

      const data = await response.json();
      setCreateDialogOpen(false);
      navigate(`/editor/${data.id}`);
    } catch (error) {
      console.error("Error creating resume:", error);
      toast({
        title: "Error",
        description: "Failed to create resume. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-3xl font-bold">Resume Templates</h1>
        <p className="text-xl text-muted-foreground max-w-[42rem] mx-auto">
          Choose from our collection of professionally designed templates for
          any industry
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search templates..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <Select value={filterStyle} onValueChange={setFilterStyle}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Styles</SelectItem>
              <SelectItem value="minimal">Minimal</SelectItem>
              <SelectItem value="classic">Classic</SelectItem>
              <SelectItem value="creative">Creative</SelectItem>
              <SelectItem value="professional">Professional</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterColor} onValueChange={setFilterColor}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Color Scheme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Colors</SelectItem>
              <SelectItem value="monochrome">Monochrome</SelectItem>
              <SelectItem value="blue">Blue</SelectItem>
              <SelectItem value="colorful">Colorful</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterIndustry} onValueChange={setFilterIndustry}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Industries</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Templates</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="minimal">Minimal</TabsTrigger>
          <TabsTrigger value="creative">Creative</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onSelect={handleSelectTemplate}
                onPreview={handlePreview}
                userPlan={userPlan}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="popular" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates
              .filter((t) => t.popular)
              .map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onSelect={handleSelectTemplate}
                  onPreview={handlePreview}
                  userPlan={userPlan}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="minimal" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates
              .filter((t) => t.style === "minimal")
              .map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onSelect={handleSelectTemplate}
                  onPreview={handlePreview}
                  userPlan={userPlan}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="creative" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates
              .filter((t) => t.style === "creative")
              .map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onSelect={handleSelectTemplate}
                  onPreview={handlePreview}
                  userPlan={userPlan}
                />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      <TemplatePreviewDialog
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        template={selectedTemplate}
        onSelect={handleSelectTemplate}
        userPlan={userPlan}
      />

      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              Enter a title for your new resume using the{" "}
              {selectedTemplate?.name} template.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Input
                placeholder="Resume Title"
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setCreateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateResume}>Create Resume</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface TemplateCardProps {
  template: Template;
  onSelect: (template: Template) => void;
  onPreview: (template: Template) => void;
  userPlan: string | null;
}

const TemplateCard = ({
  template,
  onSelect,
  onPreview,
  userPlan,
}: TemplateCardProps) => {
  const isPremium = template.premium;
  const canAccess =
    !isPremium ||
    (userPlan && (userPlan === "Pro" || userPlan === "Enterprise"));

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md relative">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={template.thumbnail}
          alt={template.name}
          className={`w-full h-full object-cover transition-transform hover:scale-105 ${!canAccess ? "opacity-50" : ""}`}
        />
        {template.popular && (
          <Badge className="absolute top-2 right-2 bg-primary">Popular</Badge>
        )}
        {isPremium && (
          <Badge className="absolute top-2 left-2 bg-amber-500">Premium</Badge>
        )}
        {isPremium && !canAccess && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-background/80 p-3 rounded-full">
              <Lock className="h-8 w-8 text-muted-foreground" />
            </div>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="mb-4">
          <h3 className="font-medium text-lg">{template.name}</h3>
          <p className="text-muted-foreground text-sm">
            {template.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline">{template.style}</Badge>
          <Badge variant="outline">{template.color_scheme}</Badge>
          {template.industry.slice(0, 1).map((ind) => (
            <Badge key={ind} variant="outline">
              {ind}
            </Badge>
          ))}
          {template.industry.length > 1 && (
            <Badge variant="outline">+{template.industry.length - 1}</Badge>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onPreview(template)}
          >
            Preview
          </Button>
          <Button
            className="flex-1"
            onClick={() => onSelect(template)}
            disabled={!canAccess}
          >
            {!canAccess ? "Upgrade to Use" : "Select"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

interface TemplatePreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template: Template | null;
  onSelect: (template: Template) => void;
  userPlan: string | null;
}

const TemplatePreviewDialog = ({
  open,
  onOpenChange,
  template,
  onSelect,
  userPlan,
}: TemplatePreviewDialogProps) => {
  if (!template) return null;

  const isPremium = template.premium;
  const canAccess =
    !isPremium ||
    (userPlan && (userPlan === "Pro" || userPlan === "Enterprise"));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {template.name}
            {isPremium && <Badge className="bg-amber-500">Premium</Badge>}
          </DialogTitle>
          <DialogDescription>{template.description}</DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="border rounded-md overflow-hidden">
              <img
                src={template.thumbnail}
                alt={template.name}
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Template Details</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-muted-foreground">Style:</div>
                <div>{template.style}</div>
                <div className="text-muted-foreground">Color Scheme:</div>
                <div>{template.color_scheme}</div>
                <div className="text-muted-foreground">Best for:</div>
                <div>{template.industry.join(", ")}</div>
                {isPremium && (
                  <>
                    <div className="text-muted-foreground">Access:</div>
                    <div>
                      {canAccess
                        ? "Available"
                        : "Requires Pro or Enterprise plan"}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Features</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary" />
                  <span>ATS-friendly formatting</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Customizable sections</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Multiple export options</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Professional typography</span>
                </li>
              </ul>
            </div>

            <Button
              className="w-full"
              onClick={() => {
                onSelect(template);
                onOpenChange(false);
              }}
              disabled={!canAccess}
            >
              {!canAccess
                ? "Upgrade to Use This Template"
                : "Use This Template"}
            </Button>

            {!canAccess && (
              <Button
                variant="outline"
                className="w-full mt-2"
                onClick={() => {
                  onOpenChange(false);
                  window.location.href = "/subscription";
                }}
              >
                View Subscription Plans
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

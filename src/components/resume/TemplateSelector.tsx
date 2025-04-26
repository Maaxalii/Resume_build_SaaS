import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Search } from "lucide-react";

export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  style: string;
  industry: string[];
  colorScheme: string;
  popular: boolean;
}

interface TemplateSelectorProps {
  onSelectTemplate: (template: Template) => void;
}

const TemplateSelector = ({ onSelectTemplate }: TemplateSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStyle, setFilterStyle] = useState("all");
  const [filterColor, setFilterColor] = useState("all");
  const [filterIndustry, setFilterIndustry] = useState("all");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null,
  );
  const [previewOpen, setPreviewOpen] = useState(false);

  const templates: Template[] = [
    {
      id: "1",
      name: "Modern Professional",
      description: "Clean and professional layout for corporate roles",
      thumbnail:
        "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&q=80",
      style: "minimal",
      industry: ["business", "marketing", "sales"],
      colorScheme: "monochrome",
      popular: true,
    },
    {
      id: "2",
      name: "Healthcare Specialist",
      description: "Organized layout for healthcare professionals",
      thumbnail:
        "https://images.unsplash.com/photo-1586282391129-76a6b6a56b16?w=400&q=80",
      style: "classic",
      industry: ["healthcare", "medical", "nursing"],
      colorScheme: "blue",
      popular: true,
    },
    {
      id: "3",
      name: "Creative Portfolio",
      description: "Vibrant design for creative professionals",
      thumbnail:
        "https://images.unsplash.com/photo-1586282384495-f35d1eb0ef93?w=400&q=80",
      style: "creative",
      industry: ["design", "arts", "media"],
      colorScheme: "colorful",
      popular: false,
    },
    {
      id: "4",
      name: "Executive Brief",
      description: "Sophisticated design for senior professionals",
      thumbnail:
        "https://images.unsplash.com/photo-1586282384495-f35d1eb0ef93?w=400&q=80",
      style: "professional",
      industry: ["executive", "finance", "consulting"],
      colorScheme: "dark",
      popular: false,
    },
    {
      id: "5",
      name: "Tech Innovator",
      description: "Modern layout for tech professionals",
      thumbnail:
        "https://images.unsplash.com/photo-1586282023783-90002a6e20b5?w=400&q=80",
      style: "minimal",
      industry: ["technology", "engineering", "data"],
      colorScheme: "monochrome",
      popular: true,
    },
    {
      id: "6",
      name: "Academic CV",
      description: "Detailed layout for academic and research positions",
      thumbnail:
        "https://images.unsplash.com/photo-1586282023284-5abf4f994018?w=400&q=80",
      style: "classic",
      industry: ["education", "research", "science"],
      colorScheme: "blue",
      popular: false,
    },
  ];

  const filteredTemplates = templates.filter((template) => {
    const matchesStyle =
      filterStyle === "all" || template.style === filterStyle;
    const matchesColor =
      filterColor === "all" || template.colorScheme === filterColor;
    const matchesIndustry =
      filterIndustry === "all" || template.industry.includes(filterIndustry);
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStyle && matchesColor && matchesIndustry && matchesSearch;
  });

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template);
    onSelectTemplate(template);
  };

  const handlePreview = (template: Template) => {
    setSelectedTemplate(template);
    setPreviewOpen(true);
  };

  return (
    <div className="w-full bg-background p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Choose a Template</h1>
        <p className="text-muted-foreground">
          Select a template to start building your professional resume
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
        <div className="flex gap-4">
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
      />
    </div>
  );
};

interface TemplateCardProps {
  template: Template;
  onSelect: (template: Template) => void;
  onPreview: (template: Template) => void;
}

const TemplateCard = ({ template, onSelect, onPreview }: TemplateCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={template.thumbnail}
          alt={template.name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        {template.popular && (
          <Badge className="absolute top-2 right-2 bg-primary">Popular</Badge>
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
          <Badge variant="outline">{template.colorScheme}</Badge>
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
          <Button className="flex-1" onClick={() => onSelect(template)}>
            Select
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
}

const TemplatePreviewDialog = ({
  open,
  onOpenChange,
  template,
  onSelect,
}: TemplatePreviewDialogProps) => {
  if (!template) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{template.name}</DialogTitle>
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
                <div>{template.colorScheme}</div>
                <div className="text-muted-foreground">Best for:</div>
                <div>{template.industry.join(", ")}</div>
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
            >
              Use This Template
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateSelector;

import React, { useState } from "react";
import {
  PlusCircle,
  Search,
  Grid3X3,
  List,
  Filter,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Resume {
  id: string;
  title: string;
  lastEdited: string;
  template: string;
  thumbnail: string;
  status: "draft" | "completed";
}

const Dashboard = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for resumes
  const mockResumes: Resume[] = [
    {
      id: "1",
      title: "Software Engineer Resume",
      lastEdited: "2023-05-15",
      template: "Modern",
      thumbnail:
        "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&q=80",
      status: "completed",
    },
    {
      id: "2",
      title: "Product Manager CV",
      lastEdited: "2023-05-10",
      template: "Professional",
      thumbnail:
        "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=400&q=80",
      status: "draft",
    },
    {
      id: "3",
      title: "UX Designer Portfolio",
      lastEdited: "2023-05-05",
      template: "Creative",
      thumbnail:
        "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&q=80",
      status: "completed",
    },
    {
      id: "4",
      title: "Marketing Specialist Resume",
      lastEdited: "2023-04-28",
      template: "Simple",
      thumbnail:
        "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=400&q=80",
      status: "draft",
    },
  ];

  const filteredResumes = mockResumes.filter((resume) =>
    resume.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Resumes</h1>
            <p className="text-muted-foreground mt-1">
              Create, edit and manage your professional resumes
            </p>
          </div>
          <Button size="lg" className="gap-2">
            <PlusCircle className="h-5 w-5" />
            Create New Resume
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="all">All Resumes</TabsTrigger>
              <TabsTrigger value="drafts">Drafts</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search resumes..."
                  className="pl-8 w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <div className="border-l h-6 mx-2" />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-muted" : ""}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-muted" : ""}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="all" className="mt-6">
            {filteredResumes.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No resumes found. Create your first resume!
                </p>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResumes.map((resume) => (
                  <ResumeCard key={resume.id} resume={resume} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredResumes.map((resume) => (
                  <ResumeListItem key={resume.id} resume={resume} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="drafts" className="mt-6">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResumes
                  .filter((resume) => resume.status === "draft")
                  .map((resume) => (
                    <ResumeCard key={resume.id} resume={resume} />
                  ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredResumes
                  .filter((resume) => resume.status === "draft")
                  .map((resume) => (
                    <ResumeListItem key={resume.id} resume={resume} />
                  ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResumes
                  .filter((resume) => resume.status === "completed")
                  .map((resume) => (
                    <ResumeCard key={resume.id} resume={resume} />
                  ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredResumes
                  .filter((resume) => resume.status === "completed")
                  .map((resume) => (
                    <ResumeListItem key={resume.id} resume={resume} />
                  ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const ResumeCard = ({ resume }: { resume: Resume }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={resume.thumbnail}
          alt={resume.title}
          className="object-cover w-full h-full"
        />
        <div className="absolute top-2 right-2">
          <Badge
            variant={resume.status === "completed" ? "default" : "outline"}
          >
            {resume.status === "completed" ? "Completed" : "Draft"}
          </Badge>
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{resume.title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground">
          {resume.template} Template
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Last edited: {resume.lastEdited}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <Button variant="outline" size="sm">
          Edit
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuItem>Download PDF</DropdownMenuItem>
            <DropdownMenuItem>Share</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
};

const ResumeListItem = ({ resume }: { resume: Resume }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex items-center p-4">
        <div className="h-16 w-12 mr-4 overflow-hidden rounded">
          <img
            src={resume.thumbnail}
            alt={resume.title}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-medium">{resume.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-sm text-muted-foreground">
              {resume.template} Template
            </p>
            <span className="text-muted-foreground">•</span>
            <p className="text-sm text-muted-foreground">
              Last edited: {resume.lastEdited}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant={resume.status === "completed" ? "default" : "outline"}
            className="mr-2"
          >
            {resume.status === "completed" ? "Completed" : "Draft"}
          </Badge>
          <Button variant="outline" size="sm">
            Edit
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem>Download PDF</DropdownMenuItem>
              <DropdownMenuItem>Share</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  );
};

export default Dashboard;

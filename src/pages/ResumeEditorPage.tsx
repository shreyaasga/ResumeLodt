import React, { useState, useEffect, lazy, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/Layout";
import { useResume, ResumeData } from "@/contexts/ResumeContext";
import { useToast } from "@/hooks/use-toast";
import { templateComponents } from '@/lib/templateComponents';
import TEMPLATES from '@/data/templateData';

// Import new templates (now the only templates available)
const BusinessExecutiveTemplate = lazy(() => import("@/components/templates/BusinessExecutiveTemplate"));
const ITTemplate = lazy(() => import("@/components/templates/ITTemplate"));
const ProjectManagerTemplate = lazy(() => import("@/components/templates/ProjectManagerTemplate"));
const CashierTemplate = lazy(() => import("@/components/templates/CashierTemplate"));
const MedicalTemplate = lazy(() => import("@/components/templates/MedicalTemplate"));

// Mapping of template IDs to components


const ResumeEditorPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getResume, updateResume, generatePdf, currentResume, setCurrentResume, templates } = useResume();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState("personal");
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isSaveConfirmDialogOpen, setIsSaveConfirmDialogOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);

  useEffect(() => {
    const loadResume = async () => {
      if (!id) return;

      setIsLoading(true);
      try {
        const resume = await getResume(id);
        if (resume) {
          setResumeData(resume);
          setCurrentResume(resume);
        } else {
          navigate("/dashboard", { replace: true });
          toast({
            title: "Resume not found",
            description: "The requested resume could not be found.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error loading resume:", error);
        toast({
          title: "Error",
          description: "Failed to load resume. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadResume();

    // Clean up function to prevent memory leaks
    return () => {
      setCurrentResume(null);
    };
  }, [id, getResume, navigate, toast, setCurrentResume]);

  // Effect to debounce saving resume data
  useEffect(() => {
    if (!resumeData || !id) return; // Only save if resumeData and id are available

    setHasUnsavedChanges(true);

    const handler = setTimeout(async () => {
      try {
        // Only save if there are actual changes
        if (hasUnsavedChanges) {
          await updateResume(id, resumeData);
          setHasUnsavedChanges(false);
        }
      } catch (error) {
        console.error("Error auto-saving resume:", error);
      }
    }, 120000); // Increased debounce delay to 30 seconds

    // Cleanup function to clear the timeout if resumeData changes before the delay
    return () => {
      clearTimeout(handler);
    };
  }, [resumeData, id, updateResume, hasUnsavedChanges]); // Added hasUnsavedChanges to dependencies

  // Handle page navigation/exit with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  const handleChange = (section: keyof ResumeData, field: string, value: any) => {
    if (!resumeData) return;

    const updatedResumeData = { ...resumeData };

    if (section === "personalInfo") {
      updatedResumeData.personalInfo = {
        ...updatedResumeData.personalInfo,
        [field]: value,
      };
    } else if (section === "education" && field.includes(".")) {
      // Handle nested education field updates (e.g., "0.institution")
      const [index, nestedField] = field.split(".");
      const educationIndex = parseInt(index);
      updatedResumeData.education = [...updatedResumeData.education];
      updatedResumeData.education[educationIndex] = {
        ...updatedResumeData.education[educationIndex],
        [nestedField]: value,
      };
    } else if (section === "experience" && field.includes(".")) {
      // Handle nested experience field updates
      const [index, nestedField] = field.split(".");
      const experienceIndex = parseInt(index);
      updatedResumeData.experience = [...updatedResumeData.experience];
      updatedResumeData.experience[experienceIndex] = {
        ...updatedResumeData.experience[experienceIndex],
        [nestedField]: value,
      };
    } else if (section === "skills" && field.includes(".")) {
      // Handle nested skills field updates
      const [index, nestedField] = field.split(".");
      const skillIndex = parseInt(index);
      updatedResumeData.skills = [...updatedResumeData.skills];
      updatedResumeData.skills[skillIndex] = {
        ...updatedResumeData.skills[skillIndex],
        [nestedField]: nestedField === "level" ? parseInt(value) : value,
      };
    } else if (section === "languages" && field.includes(".")) {
      // Handle nested language field updates
      const [index, nestedField] = field.split(".");
      const languageIndex = parseInt(index);
      updatedResumeData.languages = [...(updatedResumeData.languages || [])];
      updatedResumeData.languages[languageIndex] = {
        ...updatedResumeData.languages[languageIndex],
        [nestedField]: value,
      };
    } else if (section === "certifications" && field.includes(".")) {
      // Handle nested certification field updates
      const [index, nestedField] = field.split(".");
      const certificationIndex = parseInt(index);
      updatedResumeData.certifications = [...(updatedResumeData.certifications || [])];
      updatedResumeData.certifications[certificationIndex] = {
        ...updatedResumeData.certifications[certificationIndex],
        [nestedField]: value,
      };
    } else {
      // Handle other section updates
      (updatedResumeData as any)[section] = value;
    }

    setResumeData(updatedResumeData);
    setHasUnsavedChanges(true);
  };

  const handleAddEducation = () => {
    if (!resumeData) return;

    const newEducation = {
      id: `edu-${Date.now()}`,
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      description: "",
    };

    setResumeData({
      ...resumeData,
      education: [...resumeData.education, newEducation],
    });
    setHasUnsavedChanges(true);
  };

  const handleRemoveEducation = (index: number) => {
    if (!resumeData) return;

    const updatedEducation = [...resumeData.education];
    updatedEducation.splice(index, 1);

    setResumeData({
      ...resumeData,
      education: updatedEducation,
    });
    setHasUnsavedChanges(true);
  };

  const handleAddExperience = () => {
    if (!resumeData) return;

    const newExperience = {
      id: `exp-${Date.now()}`,
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    };

    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, newExperience],
    });
    setHasUnsavedChanges(true);
  };

  const handleRemoveExperience = (index: number) => {
    if (!resumeData) return;

    const updatedExperience = [...resumeData.experience];
    updatedExperience.splice(index, 1);

    setResumeData({
      ...resumeData,
      experience: updatedExperience,
    });
    setHasUnsavedChanges(true);
  };

  const handleAddSkill = () => {
    if (!resumeData) return;

    const newSkill = {
      id: `skill-${Date.now()}`,
      name: "",
      level: 3,
    };

    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, newSkill],
    });
    setHasUnsavedChanges(true);
  };

  const handleRemoveSkill = (index: number) => {
    if (!resumeData) return;

    const updatedSkills = [...resumeData.skills];
    updatedSkills.splice(index, 1);

    setResumeData({
      ...resumeData,
      skills: updatedSkills,
    });
    setHasUnsavedChanges(true);
  };

  const handleAddLanguage = () => {
    if (!resumeData) return;

    const newLanguage = {
      language: "",
      proficiency: "",
    };

    setResumeData({
      ...resumeData,
      languages: [...(resumeData.languages || []), newLanguage],
    });
    setHasUnsavedChanges(true);
  };

  const handleRemoveLanguage = (index: number) => {
    if (!resumeData || !resumeData.languages) return;

    const updatedLanguages = [...resumeData.languages];
    updatedLanguages.splice(index, 1);

    setResumeData({
      ...resumeData,
      languages: updatedLanguages,
    });
    setHasUnsavedChanges(true);
  };

  const handleAddCertification = () => {
    if (!resumeData) return;

    const newCertification = {
      id: `cert-${Date.now()}`,
      name: "",
      issuer: "",
      issueDate: "",
      expiryDate: "",
      credentialId: "",
      description: "",
    };

    setResumeData({
      ...resumeData,
      certifications: [...(resumeData.certifications || []), newCertification],
    });
    setHasUnsavedChanges(true);
  };

  const handleRemoveCertification = (index: number) => {
    if (!resumeData || !resumeData.certifications) return;

    const updatedCertifications = [...resumeData.certifications];
    updatedCertifications.splice(index, 1);

    setResumeData({
      ...resumeData,
      certifications: updatedCertifications,
    });
    setHasUnsavedChanges(true);
  };

  const handleSave = async () => {
    if (!resumeData || !id) return;

    try {
      await updateResume(id, resumeData);
      setHasUnsavedChanges(false);
      toast({
        title: "Resume saved",
        description: "Your resume has been saved successfully.",
      });
    } catch (error) {
      console.error("Error saving resume:", error);
      toast({
        title: "Error",
        description: "Failed to save resume. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleExportPdf = async () => {
    if (!resumeData || !id) return;

    // If there are unsaved changes, prompt to save first
    if (hasUnsavedChanges) {
      setIsSaveConfirmDialogOpen(true);
      return;
    }

    await exportToPdf();
  };

  const exportToPdf = async () => {
    if (!id) return;

    setIsGeneratingPdf(true);
    try {
      await generatePdf(id);
    } catch (error) {
      console.error("Error exporting PDF:", error);
      toast({
        title: "Error",
        description: "Failed to export PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleSaveAndExport = async () => {
    if (!resumeData || !id) return;

    setIsSaveConfirmDialogOpen(false);

    try {
      await updateResume(id, resumeData);
      setHasUnsavedChanges(false);
      await exportToPdf();
    } catch (error) {
      console.error("Error saving and exporting:", error);
      toast({
        title: "Error",
        description: "Failed to save and export. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleExportWithoutSaving = () => {
    setIsSaveConfirmDialogOpen(false);
    exportToPdf();
  };

  const togglePreview = () => {
    setShowPreview(prevShowPreview => !prevShowPreview);
  };

  // Add effect to handle webhook responses from make.com
  useEffect(() => {
    // Function to handle incoming webhook data from make.com
    const handleMessage = (event: MessageEvent) => {
      if (!id || !resumeData) return;

      console.log("Setting up webhook response handler for resume ID:", id);

      // Listen for messages from the parent window (if this is being used in an iframe)
      // Verify the origin if needed
      // if (event.origin !== "https://your-make-com-domain.com") return;

      try {
        const optimizedData = event.data;
        console.log("Received optimized data:", optimizedData);

        if (!optimizedData || typeof optimizedData !== 'object') {
          console.log("Invalid data format received");
          return;
        }

        // Create a copy of the current resume data
        const updatedResumeData = { ...resumeData };

        // Apply optimized summary if available
        if (optimizedData.summary) {
          console.log("Applying optimized summary");
          updatedResumeData.personalInfo = {
            ...updatedResumeData.personalInfo,
            summary: optimizedData.summary,
          };
        }

        // Apply optimized education descriptions if available
        if (optimizedData.educationDescriptions && Array.isArray(optimizedData.educationDescriptions)) {
          console.log("Applying optimized education descriptions");
          optimizedData.educationDescriptions.forEach((description, index) => {
            if (index < updatedResumeData.education.length) {
              updatedResumeData.education[index] = {
                ...updatedResumeData.education[index],
                description: description,
              };
            }
          });
        }

        // Apply optimized experience descriptions if available
        if (optimizedData.experienceDescriptions && Array.isArray(optimizedData.experienceDescriptions)) {
          console.log("Applying optimized experience descriptions");
          optimizedData.experienceDescriptions.forEach((description, index) => {
            if (index < updatedResumeData.experience.length) {
              updatedResumeData.experience[index] = {
                ...updatedResumeData.experience[index],
                description: description,
              };
            }
          });
        }

        // Update the resume data
        setResumeData(updatedResumeData);

        // Save the changes
        updateResume(id, updatedResumeData);

        // Show a success message
        toast({
          title: "Resume Optimized",
          description: "Your resume has been updated with AI-optimized content.",
        });

        // Turn off the optimizing state
        setIsOptimizing(false);
      } catch (error) {
        console.error("Error applying optimized content:", error);
        toast({
          title: "Optimization Failed",
          description: "Failed to apply optimized content to your resume.",
          variant: "destructive",
        });
        setIsOptimizing(false);
      }
    };

    // Add event listener for messages
    window.addEventListener('message', handleMessage);

    // Return cleanup function
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [id, resumeData, updateResume, toast]);

  // Add this effect to periodically check for updates after optimization is triggered
  useEffect(() => {
    if (!isOptimizing || !id) return;

    // Function to check if resume has been updated
    const checkForUpdates = async () => {
      try {
        const updatedResume = await getResume(id);

        // If we have a new version, update the state
        if (updatedResume && JSON.stringify(updatedResume) !== JSON.stringify(resumeData)) {
          setResumeData(updatedResume);
          setIsOptimizing(false);

          toast({
            title: "Resume Optimized",
            description: "Your resume has been updated with AI-optimized content.",
          });
        }
      } catch (error) {
        console.error("Error checking for updates:", error);
      }
    };

    // Check immediately and then every 5 seconds
    const interval = setInterval(checkForUpdates, 5000);

    // Clean up
    return () => clearInterval(interval);
  }, [isOptimizing, id, resumeData, getResume, toast]);

  // Add this function for AI optimization
  const handleOptimizeSummary = async () => {
    if (!resumeData || !id) return;

    setIsOptimizing(true);
    try {
      // Prepare the data to send to make.com
      const requestData = {
        resumeId: id,
        summary: resumeData.personalInfo.summary,
        educationDescriptions: resumeData.education.map(edu => edu.description),
        experienceDescriptions: resumeData.experience.map(exp => exp.description),
        targetJob: (resumeData.personalInfo as any).targetJob || "",
      };

      console.log("Sending data to make.com:", requestData);

      // Send to make.com webhook
      const response = await fetch('https://hook.us2.make.com/syiyuq8p75ekdgjfrt2g74wz1zubjcxn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error('Failed to optimize content');
      }

      const responseText = await response.text();
      console.log("Received response:", responseText);

      // Try to parse as JSON first
      let optimizedData;
      try {
        optimizedData = JSON.parse(responseText);
      } catch (e) {
        // If not JSON, use as summary
        optimizedData = {
          summary: responseText.trim()
        };
      }

      // Create updated resume data with optimized content
      const updatedResumeData = { ...resumeData };

      // Update summary if provided
      if (optimizedData.summary) {
        updatedResumeData.personalInfo = {
          ...updatedResumeData.personalInfo,
          summary: optimizedData.summary
        };
      }

      // Update education descriptions if provided
      if (Array.isArray(optimizedData.educationDescriptions)) {
        updatedResumeData.education = updatedResumeData.education.map((edu, index) => ({
          ...edu,
          description: optimizedData.educationDescriptions[index] || edu.description
        }));
      }

      // Update experience descriptions if provided
      if (Array.isArray(optimizedData.experienceDescriptions)) {
        updatedResumeData.experience = updatedResumeData.experience.map((exp, index) => ({
          ...exp,
          description: optimizedData.experienceDescriptions[index] || exp.description
        }));
      }

      // Update the resume data
      await updateResume(id, updatedResumeData);
      setResumeData(updatedResumeData);

      toast({
        title: "Resume Optimized",
        description: "Your resume has been updated with AI-optimized content.",
      });
    } catch (error) {
      console.error("Error optimizing content:", error);
      toast({
        title: "Optimization Failed",
        description: "Failed to optimize your resume content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsOptimizing(false);
    }
  };

  // Add a helper function to apply optimized data
  const applyOptimizedData = (optimizedData: any) => {
    if (!resumeData || !id) return;

    console.log("Applying optimized data:", optimizedData);

    try {
      // Create a copy of the current resume data
      const updatedResumeData = { ...resumeData };

      // Apply optimized summary if available
      if (optimizedData.summary) {
        console.log("Applying optimized summary");
        updatedResumeData.personalInfo = {
          ...updatedResumeData.personalInfo,
          summary: optimizedData.summary,
        };
      }

      // Apply optimized education descriptions if available
      if (optimizedData.educationDescriptions && Array.isArray(optimizedData.educationDescriptions)) {
        console.log("Applying optimized education descriptions");
        optimizedData.educationDescriptions.forEach((description: string, index: number) => {
          if (index < updatedResumeData.education.length) {
            updatedResumeData.education[index] = {
              ...updatedResumeData.education[index],
              description: description,
            };
          }
        });
      }

      // Apply optimized experience descriptions if available
      if (optimizedData.experienceDescriptions && Array.isArray(optimizedData.experienceDescriptions)) {
        console.log("Applying optimized experience descriptions");
        optimizedData.experienceDescriptions.forEach((description: string, index: number) => {
          if (index < updatedResumeData.experience.length) {
            updatedResumeData.experience[index] = {
              ...updatedResumeData.experience[index],
              description: description,
            };
          }
        });
      }

      // Update the resume data
      setResumeData(updatedResumeData);

      // Save the changes
      updateResume(id, updatedResumeData);

      // Show a success message
      toast({
        title: "Resume Optimized",
        description: "Your resume has been updated with AI-optimized content.",
      });

      // Turn off the optimizing state
      setIsOptimizing(false);
    } catch (error) {
      console.error("Error applying optimized content:", error);
      toast({
        title: "Optimization Failed",
        description: "Failed to apply optimized content to your resume.",
        variant: "destructive",
      });
      setIsOptimizing(false);
    }
  };

  // Handler for changing template
  const handleTemplateChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTemplateId = e.target.value;
    if (!resumeData || !id) return;
    setResumeData({ ...resumeData, templateId: newTemplateId });
    setHasUnsavedChanges(true);
    try {
      await updateResume(id, { ...resumeData, templateId: newTemplateId });
      toast({
        title: 'Template Changed',
        description: 'Your resume template has been updated.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to change template. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (isLoading || !resumeData) {
    return (
      <Layout hideFooter>
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      </Layout>
    );
  }

  // Get the theme colors from the resume data
  const primaryColor = resumeData.colors?.primary || "#000000";
  const secondaryColor = resumeData.colors?.secondary || "#666666";

  return (
    <Layout hideFooter>
      <div className="container flex flex-col py-6">
        {/* Template Selector */}
        <div className="flex items-center gap-4 mb-4">
          <label htmlFor="template-select" className="font-medium">Template:</label>
          <select
            id="template-select"
            value={resumeData?.templateId || ''}
            onChange={handleTemplateChange}
            className="border rounded px-3 py-2"
          >
            {templates.map((template) => (
              <option key={template.id} value={template.id}>{template.name}</option>
            ))}
          </select>
        </div>
        {/* Header with controls */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-heading font-semibold truncate">
              {resumeData.name}
            </h1>
            <p className="text-sm text-muted-foreground">
              {resumeData.templateId} template
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={togglePreview}>
              {showPreview ? "Edit" : "Preview"}
            </Button>
            <Button variant="outline" onClick={() => navigate("/dashboard")}>
              Back
            </Button>
            <Button 
              variant={hasUnsavedChanges ? "default" : "outline"} 
              onClick={handleSave}
              disabled={!hasUnsavedChanges}
            >
              {hasUnsavedChanges ? "Save*" : "Saved"}
            </Button>
            <Button 
              onClick={handleExportPdf} 
              disabled={isGeneratingPdf}
            >
              {isGeneratingPdf ? "Exporting..." : "Export PDF"}
            </Button>
          </div>
        </div>

        <div className={`flex flex-col ${showPreview ? 'md:flex-row gap-6' : ''}`}>
          {/* Editor Panel - Always render but hide when preview is shown */}
          {!showPreview && (
            <div className={`flex-col gap-4 ${showPreview ? 'md:w-1/2 lg:w-2/5' : 'w-full'}`}>
              <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
                <TabsList className="grid grid-cols-6 mb-4">
                  <TabsTrigger value="personal">Personal</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                  <TabsTrigger value="languages">Languages</TabsTrigger>
                  <TabsTrigger value="certifications">Certifications</TabsTrigger>
                </TabsList>

                {/* Personal Info Tab */}
                <TabsContent value="personal">
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>
                        Add your basic information for the resume header
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          placeholder="John Doe"
                          value={resumeData.personalInfo.fullName}
                          onChange={(e) =>
                            handleChange("personalInfo", "fullName", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="title">Professional Title</Label>
                        <Input
                          id="title"
                          placeholder="Software Engineer"
                          value={resumeData.personalInfo.title}
                          onChange={(e) =>
                            handleChange("personalInfo", "title", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="targetJob">Target Job</Label>
                        <Input
                          id="targetJob"
                          placeholder="Senior Software Engineer at Google"
                          value={(resumeData.personalInfo as any).targetJob || ""}
                          onChange={(e) =>
                            handleChange("personalInfo", "targetJob", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="johndoe@example.com"
                          value={resumeData.personalInfo.email}
                          onChange={(e) =>
                            handleChange("personalInfo", "email", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          placeholder="(123) 456-7890"
                          value={resumeData.personalInfo.phone}
                          onChange={(e) =>
                            handleChange("personalInfo", "phone", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Address/Location</Label>
                        <Input
                          id="address"
                          placeholder="City, State"
                          value={resumeData.personalInfo.address}
                          onChange={(e) =>
                            handleChange("personalInfo", "address", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="summary">Professional Summary</Label>
                        <Textarea
                          id="summary"
                          placeholder="Write a brief summary of your professional background and skills..."
                          value={resumeData.personalInfo.summary}
                          onChange={(e) =>
                            handleChange("personalInfo", "summary", e.target.value)
                          }
                          className="min-h-[120px]"
                        />
                        <div className="flex justify-end mt-2">
                          <Button 
                            variant="outline"
                            onClick={handleOptimizeSummary}
                            disabled={isOptimizing || !resumeData.personalInfo.summary}
                            className="flex items-center gap-2"
                          >
                            {isOptimizing ? (
                              <>
                                <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full"></div>
                                Optimizing...
                              </>
                            ) : (
                              <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles">
                                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                                </svg>
                                Optimize with AI
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Education Tab */}
                <TabsContent value="education">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Education</CardTitle>
                        <CardDescription>
                          Add your educational background
                        </CardDescription>
                      </div>
                      <Button onClick={handleAddEducation}>Add Education</Button>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {resumeData.education.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          No education entries yet. Click "Add Education" to add your first entry.
                        </div>
                      ) : (
                        resumeData.education.map((edu, index) => (
                          <div key={edu.id} className="space-y-4 border-b pb-6 last:border-0">
                            <div className="flex justify-between items-center">
                              <h3 className="text-lg font-semibold">Education #{index + 1}</h3>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleRemoveEducation(index)}
                              >
                                Remove
                              </Button>
                            </div>

                            <div className="space-y-2">
                              <Label>Institution</Label>
                              <Input
                                placeholder="University Name"
                                value={edu.institution}
                                onChange={(e) =>
                                  handleChange("education", `${index}.institution`, e.target.value)
                                }
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Degree</Label>
                                <Input
                                  placeholder="Bachelor of Science"
                                  value={edu.degree}
                                  onChange={(e) =>
                                    handleChange("education", `${index}.degree`, e.target.value)
                                  }
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Field of Study</Label>
                                <Input
                                  placeholder="Computer Science"
                                  value={edu.field}
                                  onChange={(e) =>
                                    handleChange("education", `${index}.field`, e.target.value)
                                  }
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Start Date</Label>
                                <Input
                                  type="date"
                                  value={edu.startDate}
                                  onChange={(e) =>
                                    handleChange("education", `${index}.startDate`, e.target.value)
                                  }
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>End Date</Label>
                                <Input
                                  type="date"
                                  value={edu.endDate}
                                  onChange={(e) =>
                                    handleChange("education", `${index}.endDate`, e.target.value)
                                  }
                                  placeholder="Present (if current)"
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label>Description</Label>
                              <Textarea
                                placeholder="Relevant achievements, activities, etc."
                                value={edu.description}
                                onChange={(e) =>
                                  handleChange("education", `${index}.description`, e.target.value)
                                }
                              />
                            </div>
                          </div>
                        ))
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Experience Tab */}
                <TabsContent value="experience">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Work Experience</CardTitle>
                        <CardDescription>
                          Add your professional experience
                        </CardDescription>
                      </div>
                      <Button onClick={handleAddExperience}>Add Experience</Button>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {resumeData.experience.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          No experience entries yet. Click "Add Experience" to add your first entry.
                        </div>
                      ) : (
                        resumeData.experience.map((exp, index) => (
                          <div key={exp.id} className="space-y-4 border-b pb-6 last:border-0">
                            <div className="flex justify-between items-center">
                              <h3 className="text-lg font-semibold">Experience #{index + 1}</h3>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleRemoveExperience(index)}
                              >
                                Remove
                              </Button>
                            </div>

                            <div className="space-y-2">
                              <Label>Company/Organization</Label>
                              <Input
                                placeholder="Company Name"
                                value={exp.company}
                                onChange={(e) =>
                                  handleChange("experience", `${index}.company`, e.target.value)
                                }
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Position/Title</Label>
                                <Input
                                  placeholder="Software Engineer"
                                  value={exp.position}
                                  onChange={(e) =>
                                    handleChange("experience", `${index}.position`, e.target.value)
                                  }
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Location</Label>
                                <Input
                                  placeholder="City, State or Remote"
                                  value={exp.location}
                                  onChange={(e) =>
                                    handleChange("experience", `${index}.location`, e.target.value)
                                  }
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Start Date</Label>
                                <Input
                                  type="date"
                                  value={exp.startDate}
                                  onChange={(e) =>
                                    handleChange("experience", `${index}.startDate`, e.target.value)
                                  }
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>End Date</Label>
                                <Input
                                  type="date"
                                  value={exp.endDate}
                                  onChange={(e) =>
                                    handleChange("experience", `${index}.endDate`, e.target.value)
                                  }
                                  placeholder="Leave blank if current"
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label>Description</Label>
                              <Textarea
                                placeholder="Describe your responsibilities, achievements, and the skills you utilized..."
                                value={exp.description}
                                onChange={(e) =>
                                  handleChange("experience", `${index}.description`, e.target.value)
                                }
                                className="min-h-[100px]"
                              />
                            </div>
                          </div>
                        ))
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Skills Tab */}
                <TabsContent value="skills">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Skills</CardTitle>
                        <CardDescription>
                          Add your professional skills
                        </CardDescription>
                      </div>
                      <Button onClick={handleAddSkill}>Add Skill</Button>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {resumeData.skills.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          No skills added yet. Click "Add Skill" to add your first skill.
                        </div>
                      ) : (
                        resumeData.skills.map((skill, index) => (
                          <div key={skill.id} className="flex items-center gap-4 border-b pb-4 last:border-0">
                            <div className="flex-1">
                              <Input
                                placeholder="Skill name (e.g., JavaScript)"
                                value={skill.name}
                                onChange={(e) =>
                                  handleChange("skills", `${index}.name`, e.target.value)
                                }
                              />
                            </div>
                            <div className="w-24">
                              <select
                                className="w-full h-10 px-3 rounded-md border border-input bg-transparent text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                value={skill.level}
                                onChange={(e) =>
                                  handleChange("skills", `${index}.level`, e.target.value)
                                }
                              >
                                <option value="1">Beginner</option>
                                <option value="2">Elementary</option>
                                <option value="3">Intermediate</option>
                                <option value="4">Advanced</option>
                                <option value="5">Expert</option>
                              </select>
                            </div>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleRemoveSkill(index)}
                            >
                              Remove
                            </Button>
                          </div>
                        ))
                      )}

                      {/* Add Preview button at the end of Skills form */}
                      <div className="flex justify-end mt-6">
                        <Button variant="outline" onClick={togglePreview}>
                          {showPreview ? "Edit" : "Preview"}
                        </Button>
                      </div>

                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Languages Tab */}
                <TabsContent value="languages">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Languages</CardTitle>
                        <CardDescription>
                          Add languages and proficiency levels
                        </CardDescription>
                      </div>
                      <Button onClick={handleAddLanguage}>Add Language</Button>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {resumeData.languages && resumeData.languages.length > 0 ? (
                        resumeData.languages.map((lang, index) => (
                          <div key={lang.language || index} className="flex items-center gap-4 border-b pb-4 last:border-0">
                            <div className="flex-1">
                              <Label htmlFor={`language-name-${index}`}>Language</Label>
                              <Input
                                id={`language-name-${index}`}
                                placeholder="e.g., Spanish"
                                value={lang.language}
                                onChange={(e) =>
                                  handleChange("languages", `${index}.language`, e.target.value)
                                }
                              />
                            </div>
                            <div className="w-32">
                              <Label htmlFor={`language-proficiency-${index}`}>Proficiency</Label>
                              <Input
                                id={`language-proficiency-${index}`}
                                placeholder="e.g., Native"
                                value={lang.proficiency}
                                onChange={(e) =>
                                  handleChange("languages", `${index}.proficiency`, e.target.value)
                                }
                              />
                            </div>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleRemoveLanguage(index)}
                            >
                              Remove
                            </Button>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          No languages added yet. Click "Add Language" to add your first entry.
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Certifications Tab */}
                <TabsContent value="certifications">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Certifications</CardTitle>
                        <CardDescription>
                          Add your professional certifications and licenses
                        </CardDescription>
                      </div>
                      <Button onClick={handleAddCertification}>Add Certification</Button>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {resumeData.certifications && resumeData.certifications.length > 0 ? (
                        resumeData.certifications.map((cert, index) => (
                          <div key={cert.id || index} className="space-y-4 border-b pb-6 last:border-0">
                            <div className="flex justify-between items-center">
                              <h3 className="text-lg font-semibold">Certification #{index + 1}</h3>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleRemoveCertification(index)}
                              >
                                Remove
                              </Button>
                            </div>

                            <div className="space-y-2">
                              <Label>Certification Name</Label>
                              <Input
                                placeholder="e.g., AWS Certified Solutions Architect"
                                value={cert.name}
                                onChange={(e) =>
                                  handleChange("certifications", `${index}.name`, e.target.value)
                                }
                              />
                            </div>

                            <div className="space-y-2">
                              <Label>Issuing Organization</Label>
                              <Input
                                placeholder="e.g., Amazon Web Services"
                                value={cert.issuer}
                                onChange={(e) =>
                                  handleChange("certifications", `${index}.issuer`, e.target.value)
                                }
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Date Issued</Label>
                                <Input
                                  type="date"
                                  value={cert.issueDate}
                                  onChange={(e) =>
                                    handleChange("certifications", `${index}.issueDate`, e.target.value)
                                  }
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Expiry Date</Label>
                                <Input
                                  type="date"
                                  value={cert.expiryDate}
                                  onChange={(e) =>
                                    handleChange("certifications", `${index}.expiryDate`, e.target.value)
                                  }
                                  placeholder="Leave blank if no expiry"
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label>Credential ID (Optional)</Label>
                              <Input
                                placeholder="e.g., AWS-123456"
                                value={cert.credentialId}
                                onChange={(e) =>
                                  handleChange("certifications", `${index}.credentialId`, e.target.value)
                                }
                              />
                            </div>

                            <div className="space-y-2">
                              <Label>Description (Optional)</Label>
                              <Textarea
                                placeholder="Add any relevant details about the certification..."
                                value={cert.description}
                                onChange={(e) =>
                                  handleChange("certifications", `${index}.description`, e.target.value)
                                }
                              />
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          No certifications added yet. Click "Add Certification" to add your first entry.
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* AI Optimization Button */}
              <div className="mt-6">
                <Button 
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  onClick={handleOptimizeSummary}
                  disabled={isOptimizing}
                >
                  Optimize my whole resume with AI
                </Button>
              </div>
            </div>
          )}

          {/* Preview Panel - Only render when preview is shown */}
          {showPreview && (
            <div className="md:w-1/2 lg:w-3/5 flex flex-col gap-4">
              <div className="bg-muted rounded-lg p-4 sticky top-[80px]">
                <div className="overflow-auto max-h-[calc(100vh-200px)]">
                  <div className="resume-paper bg-white text-black p-6">
                    <Suspense fallback={<div>Loading Template...</div>}>
                      {resumeData.templateId ? (
                        (() => {
                          const TemplateComponent = templateComponents[resumeData.templateId];
                          return TemplateComponent ? (
                            <TemplateComponent resumeData={resumeData} />
                          ) : (
                            <div>Template component not found for ID: {resumeData.templateId}</div>
                          );
                        })()
                      ) : (
                        <div>No template selected.</div>
                      )}
                    </Suspense>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Save Confirmation Dialog */}
      <Dialog open={isSaveConfirmDialogOpen} onOpenChange={setIsSaveConfirmDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Unsaved Changes</DialogTitle>
            <DialogDescription>
              You have unsaved changes. Would you like to save them before exporting?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-between">
            <Button
              variant="outline"
              onClick={handleExportWithoutSaving}
            >
              Export Without Saving
            </Button>
            <Button onClick={handleSaveAndExport}>
              Save and Export
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Big Preview Button at the bottom */}
      <div className="container flex justify-center py-6">
        <Button size="lg" onClick={togglePreview} className="w-full max-w-sm">
          {showPreview ? "Back to Edit" : "Show Preview"}
        </Button>
      </div>

      </Layout>
      );
      };

      export default ResumeEditorPage;
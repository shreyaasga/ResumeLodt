import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import TEMPLATES, { Template, ColorOption } from '@/data/templateData';
import React from 'react';
import { templateComponents } from '@/lib/templateComponents';
import ReactDOMClient from 'react-dom/client';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate: string;
  credentialId: string;
  description: string;
}

export interface ResumeData {
  id: string;
  userId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  templateId: string;
  colorId?: string;
  colors?: {
    primary: string;
    secondary: string;
    accent?: string;
  };
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    title: string;
    summary: string;
    website?: string;
    linkedin?: string;
    github?: string;
  };
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  languages?: { language: string; proficiency: string }[];
  certifications?: Certification[];
}

interface ResumeContextType {
  resumes: ResumeData[];
  templates: Template[];
  currentResume: ResumeData | null;
  loading: boolean;
  createResume: (templateId: string, colorId?: string) => Promise<string>; // returns resumeId
  updateResume: (resumeId: string, data: Partial<ResumeData>) => Promise<void>;
  deleteResume: (resumeId: string) => Promise<void>;
  getResume: (resumeId: string) => Promise<ResumeData | null>;
  setCurrentResume: (resume: ResumeData | null) => void;
  generatePdf: (resumeId: string) => Promise<void>;
  hasReachedFreeLimit: boolean; // New property to check if user has reached the free limit
}

const ResumeContext = createContext<ResumeContextType | null>(null);

// Example resume data
const EXAMPLE_RESUMES: ResumeData[] = [
  {
    id: '1',
    userId: '1',
    name: 'Software Developer Resume',
    createdAt: '2023-01-15T12:00:00Z',
    updatedAt: '2023-01-15T15:30:00Z',
    templateId: 'modern',
    personalInfo: {
      fullName: 'Alex Johnson',
      email: 'alex.johnson@example.com',
      phone: '(555) 123-4567',
      address: 'San Francisco, CA',
      title: 'Senior Software Developer',
      summary: 'Experienced software developer with 5+ years of expertise in JavaScript, React, and Node.js. Passionate about creating efficient, scalable applications.',
      website: 'www.alexjohnson.dev',
      linkedin: 'linkedin.com/in/alexjohnson',
      github: 'github.com/alexjohnson'
    },
    education: [
      {
        id: 'edu1',
        institution: 'University of California, Berkeley',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        startDate: '2014-09-01',
        endDate: '2018-05-30',
        description: 'Dean\'s List, Software Engineering Club President'
      }
    ],
    experience: [
      {
        id: 'exp1',
        company: 'Tech Solutions Inc.',
        position: 'Senior Frontend Developer',
        location: 'San Francisco, CA',
        startDate: '2020-03-01',
        endDate: '',
        description: 'Lead a team of 5 developers in building responsive web applications with React and TypeScript. Improved site performance by 40% through code optimization.'
      },
      {
        id: 'exp2',
        company: 'StartUp Labs',
        position: 'Frontend Developer',
        location: 'San Francisco, CA',
        startDate: '2018-06-01',
        endDate: '2020-02-28',
        description: 'Developed user interfaces for various web applications using JavaScript, HTML5, and CSS3. Collaborated with design team to implement responsive designs.'
      }
    ],
    skills: [
      { id: 'skill1', name: 'JavaScript', level: 5 },
      { id: 'skill2', name: 'React', level: 5 },
      { id: 'skill3', name: 'TypeScript', level: 4 },
      { id: 'skill4', name: 'Node.js', level: 4 },
      { id: 'skill5', name: 'HTML/CSS', level: 5 },
      { id: 'skill6', name: 'Git', level: 4 }
    ],
    languages: [
      { language: 'English', proficiency: 'Native' },
      { language: 'Spanish', proficiency: 'Intermediate' }
    ],
    certifications: [
      {
        id: 'cert1',
        name: 'AWS Certified Developer',
        issuer: 'Amazon Web Services',
        issueDate: '2021-05-01',
        expiryDate: '2024-05-01',
        credentialId: 'AWS-123456',
        description: 'Professional level certification for AWS cloud development'
      }
    ]
  }
];

// Maximum number of resumes for free users
const FREE_PLAN_MAX_RESUMES = 3;

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const [currentResume, setCurrentResume] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Compute if the user has reached their free limit
  const hasReachedFreeLimit = resumes.length >= FREE_PLAN_MAX_RESUMES;

  // Load user's resumes when user changes
  useEffect(() => {
    if (user) {
      // In a real app, we would fetch from an API
      const storedResumes = localStorage.getItem(`resumes-${user.id}`);
      if (storedResumes) {
        try {
          setResumes(JSON.parse(storedResumes));
        } catch (error) {
          console.error('Error parsing stored resumes:', error);
          // Initialize with example resume
          const userResumes = [...EXAMPLE_RESUMES].filter(r => r.userId === user.id);
          setResumes(userResumes);
          localStorage.setItem(`resumes-${user.id}`, JSON.stringify(userResumes));
        }
      } else {
        // Initialize with example resume
        const userResumes = [...EXAMPLE_RESUMES].filter(r => r.userId === user.id);
        setResumes(userResumes);
        localStorage.setItem(`resumes-${user.id}`, JSON.stringify(userResumes));
      }
    } else {
      setResumes([]);
    }
    setLoading(false);
  }, [user]);

  const saveResumes = (updatedResumes: ResumeData[]) => {
    if (user) {
      setResumes(updatedResumes);
      localStorage.setItem(`resumes-${user.id}`, JSON.stringify(updatedResumes));
    }
  };

  const createResume = async (templateId: string, colorId?: string): Promise<string> => {
    if (!user) throw new Error('User must be authenticated');
    
    // Check if the user has reached the maximum number of resumes for the free plan
    if (resumes.length >= FREE_PLAN_MAX_RESUMES) {
      toast({
        title: 'Free plan limit reached',
        description: `You can create up to ${FREE_PLAN_MAX_RESUMES} resumes on the free plan. Please upgrade to create more.`,
        variant: 'destructive'
      });
      throw new Error('Free plan limit reached');
    }
    
    // Create a new blank resume
    const newResumeId = `resume-${Date.now()}`;
    const now = new Date().toISOString();
    
    // Find the template
    const template = TEMPLATES.find(t => t.id === templateId);
    if (!template) {
      throw new Error('Template not found');
    }
    
    // Find the color scheme
    const defaultColorId = template.colors[0]?.id;
    const selectedColorId = colorId || defaultColorId;
    const selectedColor = template.colors.find(c => c.id === selectedColorId);
    
    if (!selectedColor) {
      throw new Error('Color scheme not found');
    }
    
    // Create the new resume with the selected color
    const newResume: ResumeData = {
      id: newResumeId,
      userId: user.id,
      name: 'Untitled Resume',
      createdAt: now,
      updatedAt: now,
      templateId: templateId,
      colorId: selectedColorId,
      colors: {
        primary: selectedColor.primary,
        secondary: selectedColor.secondary,
        accent: selectedColor.accent
      },
      personalInfo: {
        fullName: user.profile?.full_name || user.email?.split('@')[0] || '',
        email: user.email,
        phone: '',
        address: '',
        title: '',
        summary: ''
      },
      education: [],
      experience: [],
      skills: []
    };
    
    const updatedResumes = [...resumes, newResume];
    saveResumes(updatedResumes);
    
    toast({
      title: 'Resume created',
      description: 'Your new resume has been created successfully.'
    });
    
    return newResumeId;
  };

  const updateResume = async (resumeId: string, data: Partial<ResumeData>): Promise<void> => {
    const resumeIndex = resumes.findIndex(r => r.id === resumeId);
    if (resumeIndex === -1) {
      toast({
        title: 'Error',
        description: 'Resume not found',
        variant: 'destructive'
      });
      return;
    }
    
    const updatedResume = {
      ...resumes[resumeIndex],
      ...data,
      updatedAt: new Date().toISOString()
    };
    
    const updatedResumes = [...resumes];
    updatedResumes[resumeIndex] = updatedResume;
    saveResumes(updatedResumes);
    
    // Also update current resume if it's the one being edited
    if (currentResume && currentResume.id === resumeId) {
      setCurrentResume(updatedResume);
    }
  };

  const deleteResume = async (resumeId: string): Promise<void> => {
    const updatedResumes = resumes.filter(r => r.id !== resumeId);
    saveResumes(updatedResumes);
    
    // Clear current resume if it's the one being deleted
    if (currentResume && currentResume.id === resumeId) {
      setCurrentResume(null);
    }
    
    toast({
      title: 'Resume deleted',
      description: 'Your resume has been deleted successfully.'
    });
  };

  const getResume = async (resumeId: string): Promise<ResumeData | null> => {
    const resume = resumes.find(r => r.id === resumeId);
    if (!resume) {
      toast({
        title: 'Error',
        description: 'Resume not found',
        variant: 'destructive'
      });
      return null;
    }
    return resume;
  };

  // PDF generation method using script loading to avoid import errors
  const generatePdf = async (resumeId: string): Promise<void> => {
    const resume = resumes.find(r => r.id === resumeId);
    if (!resume) {
      toast({
        title: 'Error',
        description: 'Resume not found',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: "Generating PDF",
      description: "Please wait while your resume is being prepared..."
    });

    // Create a temporary hidden container to render the template for PDF generation
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '0';
    // Set a fixed width to simulate the resume paper size for consistent rendering
    container.style.width = '8.5in'; // US Letter width
    container.style.backgroundColor = 'white';
    container.style.padding = '0.5in'; // 0.5 inch margins
    document.body.appendChild(container);

    let root: ReactDOMClient.Root | null = null; // Declare root here

    try {
      // Dynamically import the correct template component
      // const templateComponentModule = await import(`@/components/templates/${resume.templateId.replace(/-/g, '')}Template.tsx`);
      // const TemplateComponent = templateComponentModule.default;

      const TemplateComponent = templateComponents[resume.templateId];

      if (!TemplateComponent) {
        throw new Error(`Template component not found for ID: ${resume.templateId}`);
      }

      // Create a root for React rendering in the temporary container
      root = ReactDOMClient.createRoot(container);
      root.render(React.createElement(TemplateComponent, { resumeData: resume, printMode: true }));

      // Allow a small delay for rendering to complete
      await new Promise(resolve => setTimeout(resolve, 200));

      // Load libraries using CDN
      // await loadScriptFromCDN('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
      // await loadScriptFromCDN('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
      
      // Now we can safely use the window global objects
      // const html2canvas = (window as any).html2canvas;
      // const jspdf = (window as any).jspdf;
      
      // Assume html2canvas and jspdf are available globally or imported
      // const html2canvasLib = (window as any).html2canvas;
      // const jspdfLib = (window as any).jspdf;

      // if (!html2canvasLib || !jspdfLib) {
      //   throw new Error('PDF generation libraries are not available. Ensure html2canvas and jspdf are installed and included.');
      // }
      
      // Generate PDF from the rendered container
      const canvas = await html2canvas(container, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${resume.name || 'resume'}.pdf`);
      
      toast({
        title: "PDF Downloaded",
        description: "Your resume has been downloaded successfully."
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate PDF. Please try again.',
        variant: 'destructive'
      });
    } finally {
      // Clean up: unmount the React root and remove the container
      if (root) {
        root.unmount();
      }
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
    }
  };

  // Helper function to load scripts from CDN
  // const loadScriptFromCDN = (src: string): Promise<void> => {
  //   return new Promise((resolve, reject) => {
  //     // Check if script already exists
  //     const existingScript = document.querySelector(`script[src="${src}"]`);
  //     if (existingScript) {
  //       resolve();
  //       return;
  //     }

  //     const script = document.createElement('script');
  //     script.src = src;
  //     script.onload = () => resolve();
  //     script.onerror = (error) => reject(new Error(`Failed to load script: ${src}`));
  //     document.head.appendChild(script);
  //   });
  // };

  return (
    <ResumeContext.Provider value={{
      resumes,
      templates: TEMPLATES,
      currentResume,
      loading,
      createResume,
      updateResume,
      deleteResume,
      getResume,
      setCurrentResume,
      generatePdf,
      hasReachedFreeLimit
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};

// Augment the Window interface to recognize our dynamically loaded libraries
declare global {
  interface Window {
    html2canvas?: any;
    jspdf?: any;
  }
}

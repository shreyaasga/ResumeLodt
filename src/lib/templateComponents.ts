import React, { lazy } from 'react';
import { ResumeData } from '@/contexts/ResumeContext';

// Import templates
const BusinessExecutiveTemplate = lazy(() => import("@/components/templates/BusinessExecutiveTemplate"));
const ITTemplate = lazy(() => import("@/components/templates/ITTemplate"));
const ProjectManagerTemplate = lazy(() => import("@/components/templates/ProjectManagerTemplate"));
const CashierTemplate = lazy(() => import("@/components/templates/CashierTemplate"));
const MedicalTemplate = lazy(() => import("@/components/templates/MedicalTemplate"));
const ModernTemplate = lazy(() => import("@/components/templates/ModernTemplate"));
const ClassicTemplate = lazy(() => import("@/components/templates/ClassicTemplate"));
const RealtorTemplate = lazy(() => import("@/components/templates/RealtorTemplate"));
const HRProfessionalTemplate = lazy(() => import("@/components/templates/HRProfessionalTemplate"));
const DevOpsEngineerTemplate = lazy(() => import("@/components/templates/DevOpsEngineerTemplate"));

// Mapping of template IDs to components
export const templateComponents: Record<string, React.LazyExoticComponent<React.FC<{ resumeData: ResumeData; printMode?: boolean }>>> = {
  'business-executive': BusinessExecutiveTemplate,
  'it': ITTemplate,
  'project-manager': ProjectManagerTemplate,
  'cashier': CashierTemplate,
  'medical': MedicalTemplate,
  'modern': ModernTemplate,
  'classic': ClassicTemplate,
  'realtor': RealtorTemplate,
  'hr-professional': HRProfessionalTemplate,
  'devops-engineer': DevOpsEngineerTemplate,
}; 
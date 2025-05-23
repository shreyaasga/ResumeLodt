export interface Template {
  id: string;
  name: string;
  description: string;
  previewImage: string;
  isPro: boolean;
  colors: ColorOption[];
  styles?: {
    fontFamily?: string;
    spacing?: 'compact' | 'standard' | 'spacious';
    layout?: 'traditional' | 'modern' | 'creative';
  };
}

export interface ColorOption {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent?: string;
}

// Define color options that can be applied to templates
const COLORS: Record<string, ColorOption[]> = {
  professional: [
    { id: 'blue', name: 'Professional Blue', primary: '#2563eb', secondary: '#93c5fd' },
    { id: 'teal', name: 'Teal Accent', primary: '#0d9488', secondary: '#5eead4' },
    { id: 'purple', name: 'Royal Purple', primary: '#7e22ce', secondary: '#d8b4fe' },
    { id: 'gray', name: 'Executive Gray', primary: '#4b5563', secondary: '#cbd5e1' },
  ],
  creative: [
    { id: 'coral', name: 'Coral Sunset', primary: '#f43f5e', secondary: '#fecdd3' },
    { id: 'emerald', name: 'Vibrant Emerald', primary: '#059669', secondary: '#6ee7b7' },
    { id: 'amber', name: 'Golden Amber', primary: '#d97706', secondary: '#fcd34d' },
    { id: 'indigo', name: 'Deep Indigo', primary: '#4f46e5', secondary: '#c7d2fe' },
  ],
  minimal: [
    { id: 'monochrome', name: 'Monochrome', primary: '#262626', secondary: '#e5e5e5' },
    { id: 'light', name: 'Light Minimal', primary: '#737373', secondary: '#f5f5f5' },
    { id: 'warm', name: 'Warm Gray', primary: '#78716c', secondary: '#f5f5f4' },
    { id: 'cool', name: 'Cool Gray', primary: '#64748b', secondary: '#f1f5f9' },
  ],
}

// Template data
const TEMPLATES: Template[] = [
  {
    id: 'business-executive',
    name: 'Business Executive',
    description: 'Designed for business professionals and executives.',
    previewImage: '/templates/business-executive-placeholder.png',
    isPro: false,
    colors: COLORS.professional,
    styles: {
      fontFamily: 'serif',
      spacing: 'standard',
      layout: 'traditional'
    }
  },
  {
    id: 'it',
    name: 'IT Professional',
    description: 'Optimized for IT and tech-related roles.',
    previewImage: '/templates/it-placeholder.png',
    isPro: false,
    colors: [...COLORS.professional, ...COLORS.minimal],
    styles: {
      fontFamily: 'sans-serif',
      spacing: 'compact',
      layout: 'modern'
    }
  },
  {
    id: 'project-manager',
    name: 'Project Manager',
    description: 'Structured for project management roles.',
    previewImage: '/templates/project-manager-placeholder.png',
    isPro: false,
    colors: COLORS.professional,
    styles: {
      fontFamily: 'sans-serif',
      spacing: 'standard',
      layout: 'modern'
    }
  },
  {
    id: 'cashier',
    name: 'Cashier/Retail',
    description: 'A template suitable for cashier and retail positions.',
    previewImage: '/templates/cashier-placeholder.png',
    isPro: false,
    colors: COLORS.minimal,
    styles: {
      fontFamily: 'sans-serif',
      spacing: 'compact',
      layout: 'traditional'
    }
  },
  {
    id: 'medical',
    name: 'Medical Assistant',
    description: 'Tailored for medical assistant and healthcare roles.',
    previewImage: '/templates/medical-placeholder.png',
    isPro: false,
    colors: COLORS.professional,
    styles: {
      fontFamily: 'sans-serif',
      spacing: 'standard',
      layout: 'traditional'
    }
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'A clean and contemporary resume template.',
    previewImage: '/templates/modern-placeholder.png',
    isPro: false,
    colors: [...COLORS.professional, ...COLORS.creative],
    styles: {
      fontFamily: 'sans-serif',
      spacing: 'standard',
      layout: 'modern'
    }
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'A traditional and professional resume template.',
    previewImage: '/templates/classic-placeholder.png',
    isPro: false,
    colors: COLORS.professional,
    styles: {
      fontFamily: 'serif',
      spacing: 'standard',
      layout: 'traditional'
    }
  },
  {
    id: 'realtor',
    name: 'Realtor',
    description: 'Designed specifically for real estate professionals.',
    previewImage: '/templates/realtor-placeholder.png',
    isPro: false, // Assuming this is a Pro template based on its complexity
    colors: COLORS.creative, // Realtors might prefer more creative colors
    styles: {
      fontFamily: 'sans-serif',
      spacing: 'standard',
      layout: 'creative'
    }
  },
  {
    id: 'hr-professional',
    name: 'HR Professional',
    description: 'Optimized for human resources professionals.',
    previewImage: '/templates/hr-professional-placeholder.png',
    isPro: false, // Assuming this is a Pro template
    colors: COLORS.professional,
    styles: {
      fontFamily: 'sans-serif',
      spacing: 'standard',
      layout: 'modern'
    }
  },
  {
    id: 'devops-engineer',
    name: 'DevOps Engineer',
    description: 'Tailored for DevOps and IT professionals.',
    previewImage: '/templates/devops-engineer-placeholder.png',
    isPro: false, // Assuming this is a Pro template
    colors: COLORS.creative, // Tech roles might prefer creative/modern colors
    styles: {
      fontFamily: 'monospace', // Often preferred by developers
      spacing: 'compact',
      layout: 'modern'
    }
  }
];

export default TEMPLATES;

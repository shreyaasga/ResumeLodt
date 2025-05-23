// Local storage implementation for resume data
import { ResumeData } from "@/contexts/ResumeContext";

/**
 * Retrieves a resume from local storage by ID
 */
export async function getResumeFromStorage(id: string): Promise<ResumeData | null> {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    return null;
  }
  
  try {
    // Find the user ID from the resume ID format or use a default
    const userId = id.split('-')[2] || 'default';
    const storageKey = `resumes-${userId}`;
    
    // Get all resumes for this user
    const storedResumes = localStorage.getItem(storageKey);
    if (!storedResumes) {
      return null;
    }
    
    // Parse the stored resumes
    const resumes: ResumeData[] = JSON.parse(storedResumes);
    
    // Find the specific resume by ID
    return resumes.find(resume => resume.id === id) || null;
  } catch (error) {
    console.error('Error retrieving resume from storage:', error);
    return null;
  }
}

/**
 * Updates a resume in local storage
 */
export async function updateResumeInStorage(id: string, resumeData: Partial<ResumeData>): Promise<ResumeData | null> {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    return null;
  }
  
  try {
    // Find the user ID from the resume ID or the resume data
    const userId = resumeData.userId || id.split('-')[2] || 'default';
    const storageKey = `resumes-${userId}`;
    
    // Get all resumes for this user
    const storedResumes = localStorage.getItem(storageKey);
    if (!storedResumes) {
      return null;
    }
    
    // Parse the stored resumes
    const resumes: ResumeData[] = JSON.parse(storedResumes);
    
    // Find the index of the resume to update
    const resumeIndex = resumes.findIndex(resume => resume.id === id);
    if (resumeIndex === -1) {
      return null;
    }
    
    // Update the resume
    const updatedResume = {
      ...resumes[resumeIndex],
      ...resumeData,
      updatedAt: new Date().toISOString()
    };
    
    // Save the updated resume list
    resumes[resumeIndex] = updatedResume;
    localStorage.setItem(storageKey, JSON.stringify(resumes));
    
    return updatedResume;
  } catch (error) {
    console.error('Error updating resume in storage:', error);
    return null;
  }
}
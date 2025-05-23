// Simple Express middleware to handle webhook callbacks from make.com
export const handleWebhook = async (req, res) => {
  try {
    const { id } = req.params;
    const optimizedData = req.body;
    
    console.log(`Received webhook data for resume ${id}:`, optimizedData);
    
    // Validate the optimized data structure
    if (!optimizedData || typeof optimizedData !== 'object') {
      throw new Error('Invalid optimization data received');
    }

    // Store the optimized data in localStorage with a timestamp
    if (typeof window !== 'undefined') {
      localStorage.setItem(`optimized-${id}`, JSON.stringify({
        data: optimizedData,
        timestamp: Date.now()
      }));
    }

    // Return success response
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error handling webhook:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Helper function to get optimized data
export const getOptimizedData = (resumeId) => {
  try {
    const storedData = localStorage.getItem(`optimized-${resumeId}`);
    if (!storedData) return null;

    const { data, timestamp } = JSON.parse(storedData);
    
    // Check if data is less than 5 minutes old
    if (Date.now() - timestamp > 5 * 60 * 1000) {
      localStorage.removeItem(`optimized-${resumeId}`);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error retrieving optimized data:', error);
    return null;
  }
};

// Helper function to apply optimized data to resume
export const applyOptimizedData = (resume, optimizedData) => {
  try {
    const updatedResume = { ...resume };

    // Update professional summary if provided
    if (optimizedData.summary) {
      updatedResume.personalInfo = {
        ...updatedResume.personalInfo,
        summary: optimizedData.summary
      };
    }

    // Update education descriptions if provided
    if (Array.isArray(optimizedData.education)) {
      updatedResume.education = updatedResume.education.map((edu, index) => ({
        ...edu,
        description: optimizedData.education[index]?.description || edu.description
      }));
    }

    // Update experience descriptions if provided
    if (Array.isArray(optimizedData.experience)) {
      updatedResume.experience = updatedResume.experience.map((exp, index) => ({
        ...exp,
        description: optimizedData.experience[index]?.description || exp.description
      }));
    }

    return updatedResume;
  } catch (error) {
    console.error('Error applying optimized data:', error);
    return resume;
  }
};
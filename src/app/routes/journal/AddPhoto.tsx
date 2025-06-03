//photo upload to highlight the day. 
import React, { Component, useState, useEffect } from "react";
import { Storage } from "appwrite";
import { useOutletContext } from 'react-router-dom';
import BackButton from "../../../components/Shared/NavigationButtons/BackButton"; 
import SaveNextButton from "../../../components/Shared/NavigationButtons/SaveNextButton";
import SkipButton from "../../../components/Shared/NavigationButtons/SkipButton";
import { uploadImage } from "../../../services/imageService";

interface OutletContextType {
  goTo: (i: number) => void;
  currentIndex: number;
  lastIndex: number;
}

const AddPhoto: React.FC = () => {
  const { goTo, currentIndex } = useOutletContext<OutletContextType>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false); // For upload and DB save
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

 useEffect(() => {
    // Cleanup the object URL to prevent memory leaks when component unmounts or previewUrl changes
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl); // Revoke old preview URL before setting a new one
    }
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      // Basic file type validation (optional but good practice)
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file (e.g., JPG, PNG, GIF).');
        setSelectedFile(null);
        setPreviewUrl(null);
        return;
      }
      // Basic file size validation (e.g., less than 5MB) (optional)
      if (file.size > 5 * 1024 * 1024) { // 5MB
        setError('File is too large. Please select an image under 5MB.');
        setSelectedFile(null);
        setPreviewUrl(null);
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null); // Clear previous errors
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  const handleSaveAndNext = async () => {
    if (!selectedFile) {
      setError("Please select a photo to upload, or skip this step.");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // createPhotoEntry in journalService should handle:
      // 1. Calling imageService.uploadImage(selectedFile) to upload to Storage
      // 2. Taking the returned URL and saving it (with userId, createdAt) to the Database
      const result = await uploadImage(selectedFile);

      if (result) {
        goTo(currentIndex + 1); // Navigate to the next step
      } else {
        setError(result || "Failed to save photo. Please try again.");
      }
    } catch (uploadError: any) {
      console.error("Error in photo upload process:", uploadError);
      setError(`Upload failed: ${uploadError.message || 'An unknown error occurred'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSkip = () => {
    goTo(currentIndex + 1);
  };

  return (
    <section style={{ maxWidth: '500px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add a Photo (Optional)</h2>
      <p style={{ textAlign: 'center', marginBottom: '20px', color: '#555' }}>
        Share a photo that represents your day or something you're grateful for.
      </p>
      
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="photo-upload" style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
          Choose an image:
        </label>
        <input 
          id="photo-upload"
          type="file" 
          accept="image/*" // Helps browser filter files
          onChange={handleFileChange} 
          style={{ 
            display: 'block', 
            width: '100%', 
            padding: '10px', 
            marginBottom: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            boxSizing: 'border-box'
          }}
        />
        {previewUrl && (
          <div style={{ marginTop: '15px', textAlign: 'center', border: '1px dashed #ddd', padding: '10px', borderRadius: '4px' }}>
            <p style={{margin: '0 0 10px 0', fontSize: '0.9em', color: '#333'}}>Preview:</p>
            <img 
              src={previewUrl} 
              alt="Selected preview" 
              style={{ 
                maxWidth: '100%', 
                maxHeight: '300px', 
                border: '1px solid #eee', 
                borderRadius: '4px',
                objectFit: 'contain'
              }} 
            />
          </div>
        )}
      </div>

      {error && <p style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>{error}</p>}
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px', flexWrap: 'wrap', gap: '10px' }}>
        <BackButton onClick={() => goTo(currentIndex - 1)} />
        <div style={{ display: 'flex', gap: '10px' }}>
          <SkipButton onClick={handleSkip} text="Skip" />
          <SaveNextButton 
            onClick={handleSaveAndNext} 
            disabled={isProcessing || !selectedFile}
          />
        </div>
      </div>
      {isProcessing && <p style={{ marginTop: '15px', textAlign: 'center', color: '#007bff' }}>Processing, please wait...</p>}
    </section>
  );
};

export default AddPhoto;
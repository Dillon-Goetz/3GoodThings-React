import React, { useRef } from 'react'; // Removed useState
import { useOutletContext } from 'react-router-dom';
import JournalStepLayout from '@/components/Layouts/JournalStepLayout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { uploadImage } from '../../../services/imageService';
import { saveAddPhoto } from '../../../services/journalService';
import { Paperclip } from 'lucide-react';

// Define the shape of the context we expect
interface JournalContextType {
  goTo: (i: number) => void;
  currentIndex: number;
  journalData: {
    isPhotoPublic: boolean;
    selectedFile: File | null; // Add selectedFile to the type
  };
  onDataChange: (field: string, value: any) => void;
}

const AddPhoto: React.FC = () => {
  // 1. Get the shared state and update function from context
  const { goTo, currentIndex, journalData, onDataChange } = useOutletContext<JournalContextType>();
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 2. This handler now updates the parent's state
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onDataChange('selectedFile', event.target.files[0]);
    }
  };

  const handleUploadAndNext = async () => {
    // 3. The logic now uses the shared 'journalData.selectedFile'
    if (!journalData.selectedFile) {
      goTo(currentIndex + 1);
      return;
    }

    setIsUploading(true);
    try {
      const fileId = await uploadImage(journalData.selectedFile);
      await saveAddPhoto(fileId, journalData.isPhotoPublic);
      onDataChange('photoFileId', fileId);
      goTo(currentIndex + 1);
    } catch (error) {
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const onChooseFileClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <JournalStepLayout
      title="Add a Photo"
      description="Optionally add a photo that represents your day."
      footerContent={
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={() => goTo(currentIndex - 1)}>
            Back
          </Button>
          <Button onClick={handleUploadAndNext} disabled={isUploading}>
            {isUploading ? "Uploading..." : journalData.selectedFile ? "Save & Next" : "Skip & Next"}
          </Button>
        </div>
      }
    >
      <div className="flex flex-col items-center gap-6 w-full">
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          ref={fileInputRef}
          className="hidden" 
        />
        
        <div className="w-full h-48 border-2 border-dashed rounded-lg flex items-center justify-center bg-muted/50">
          {/* 4. The preview also uses the shared state */}
          {journalData.selectedFile ? (
            <img src={URL.createObjectURL(journalData.selectedFile)} alt="Preview" className="h-full w-full object-contain p-2" />
          ) : (
            <p className="text-muted-foreground">Image Preview</p>
          )}
        </div>

        <Button variant="secondary" onClick={onChooseFileClick}>
          <Paperclip className="mr-2 h-4 w-4" />
          {journalData.selectedFile ? 'Change Photo' : 'Choose Photo'}
        </Button>
        
        <div className="flex items-center space-x-2">
            <Checkbox 
              id="is-photo-public" 
              checked={journalData.isPhotoPublic}
              onCheckedChange={(checked) => onDataChange('isPhotoPublic', Boolean(checked))}
            />
            <Label htmlFor="is-photo-public" className="text-sm font-medium">
              Share with the community (optional)
            </Label>
        </div>
      </div>
    </JournalStepLayout>
  );
};

export default AddPhoto;
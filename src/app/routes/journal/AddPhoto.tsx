import React, { useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import JournalStepLayout from '@/components/Layouts/JournalStepLayout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { uploadImage } from '../../../services/imageService';
import { Paperclip } from 'lucide-react';

interface JournalContextType {
  goTo: (i: number) => void;
  currentIndex: number;
  journalData: {
    isPhotoPublic: boolean;
    selectedFile: File | null;
  };
  onDataChange: (field: string, value: any) => void;
}

const AddPhoto: React.FC = () => {
  const { goTo, currentIndex, journalData, onDataChange } = useOutletContext<JournalContextType>();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onDataChange('selectedFile', event.target.files[0]);
    }
  };

  const handleUploadAndNext = async () => {
    if (!journalData.selectedFile) {
      goTo(currentIndex + 1);
      return;
    }

    setIsUploading(true);
    try {
      const fileId = await uploadImage(journalData.selectedFile);
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

  // The fix is to wrap the main content inside <JournalStepLayout>
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
      {/* This div and its contents are the 'children' that were missing */}
      <div className="flex flex-col items-center gap-6 w-full">
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          ref={fileInputRef}
          className="hidden" 
        />
        
        <div className="w-full h-48 border-2 border-dashed rounded-lg flex items-center justify-center bg-muted/50">
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
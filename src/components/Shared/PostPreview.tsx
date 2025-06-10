import React from 'react'; //
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../ui/card'; //
import { getImagePreviewUrl } from '../../services/imageService'; //
import { ChevronDown, ChevronUp } from 'lucide-react'; //
import { Button } from '../ui/button'; //

// 1. UPDATE THE PROPS INTERFACE
export interface PostPreviewProps {
  entry: any;
  onToggleExpand: () => void; // Add this line
  isExpanded: boolean;       // Add this line
}

const PostPreview: React.FC<PostPreviewProps> = ({ entry, onToggleExpand, isExpanded }) => { //
  if (!entry) { //
    return null; //
  }

  const { goodThing1, goodThing2, goodThing3, createdAt, vibe, photoFileId } = entry; //
  const goodThings = [goodThing1, goodThing2, goodThing3].filter(Boolean); //
  const imageUrl = photoFileId ? getImagePreviewUrl(photoFileId) : null; //

  return (
    <Card className="w-full">
      {imageUrl && ( //
        <img src={imageUrl} alt="Journal entry" className="w-full h-64 object-cover rounded-t-lg" /> //
      )}
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">Three Good Things</CardTitle> //
            <p className="text-sm text-muted-foreground">
              {new Date(createdAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <span className="text-3xl">{vibe}</span> //
        </div>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside space-y-2">
          {goodThings.map((thing, index) => ( //
            <li key={index}>{thing}</li> //
          ))}
        </ul>
      </CardContent>
      {/* 2. ADD A BUTTON TO TOGGLE THE PRIVATE DETAILS */}
      <CardFooter className="flex justify-end">
        <Button variant="ghost" onClick={onToggleExpand}>
          {isExpanded ? 'Hide Details' : 'Show Details'}
          {isExpanded ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostPreview; //
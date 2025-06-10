import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { getImagePreviewUrl } from '../../services/imageService';

interface PostPreviewProps {
    entry: any; 
}

const PostPreview: React.FC<PostPreviewProps> = ({ entry }) => {
    const imageUrl = entry.photoFileId ? getImagePreviewUrl(entry.photoFileId) : null;

    return (
        <Card className="w-full">
            {imageUrl && (
                <img src={imageUrl} alt="Journal entry" className="w-full h-auto object-cover rounded-t-md" />
            )}
            
            <CardHeader>
                <CardTitle className="text-xl">Three Good Things</CardTitle>
            </CardHeader>

            <CardContent>
                {entry.threeGoodThings && Array.isArray(entry.threeGoodThings) && entry.threeGoodThings.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1">
                        {/* Add ': string' to the 'thing' parameter here */}
                        {entry.threeGoodThings.map((thing: string, index: number) => (
                            <li key={index}>{thing}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-muted-foreground">No good things were recorded for this day.</p>
                )}
            </CardContent>
        </Card>
    );
};

export default PostPreview;
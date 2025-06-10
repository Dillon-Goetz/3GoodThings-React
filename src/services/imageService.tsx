// src/services/imageService.tsx
import { Storage, ID } from 'appwrite'; // Import Storage class and ID directly from appwrite
import { client } from '../appwriteConfig'; // Import the configured client instance

// Get the Bucket ID from environment variables
// User confirmed VITE_APPWRITE_IMAGESTORAGE_ID is used for the Storage Bucket ID.
const BUCKET_ID = import.meta.env.VITE_APPWRITE_IMAGESTORAGE_ID;

// Create an instance of the Storage service
const storage = new Storage(client);

/**
 * Uploads an image file to Appwrite Storage.
 * @param file The image file (File object) to upload.
 * @returns A promise that resolves with the URL (string) of the uploaded file.
 * @throws Will throw an error if the upload fails or if BUCKET_ID is not configured.
 */
// Find your uploadImage function and make this change:
export const uploadImage = async (file: File): Promise<string> => {
    if (!BUCKET_ID) {
        const errorMessage = "Storage Bucket ID is not configured...";
        console.error(errorMessage);
        throw new Error(errorMessage);
    }
    if (!file) {
        throw new Error("No file provided for upload.");
    }
    try {
        const fileResponse = await storage.createFile(
            BUCKET_ID,
            ID.unique(),
            file
        );

        // Instead of returning a URL object, return the file's unique ID.
        return fileResponse.$id; 

    } catch (error) {
        console.error("Error uploading image to Appwrite Storage:", error);
        throw error;
    }
};

/**
 * Deletes an image file from Appwrite Storage.
 * @param fileId The ID of the file to delete from Appwrite Storage.
 * @returns A promise that resolves when the file is deleted.
 * @throws Will throw an error if the deletion fails or if BUCKET_ID is not configured.
 */
export const deleteImage = async (fileId: string): Promise<void> => {
    if (!BUCKET_ID) {
        const errorMessage = "Storage Bucket ID is not configured. Please set VITE_APPWRITE_IMAGESTORAGE_ID in your .env file.";
        console.error(errorMessage);
        throw new Error(errorMessage);
    }

    if (!fileId) {
        throw new Error("No file ID provided for deletion.");
    }

    try {
        await storage.deleteFile(BUCKET_ID, fileId);
        console.log(`File ${fileId} deleted successfully from bucket ${BUCKET_ID}.`);
    } catch (error) {
        console.error(`Error deleting file ${fileId} from Appwrite Storage:`, error);
        throw error;
    }
};

/**
 * Gets a preview URL for an image in Appwrite Storage.
 * This can be used for generating thumbnails or responsive images.
 * @param fileId The ID of the file in Appwrite Storage.
 * @param width Optional width for the preview image.
 * @param height Optional height for the preview image.
 * @param gravity Optional gravity for cropping (e.g., 'center', 'top-left'). Refer to Appwrite docs.
 * @param quality Optional quality for the preview image (0-100).
 * @returns The string URL for the file preview. Returns an error placeholder if BUCKET_ID or fileId is missing.
 */
export const getImagePreviewUrl = (
    fileId: string,
    width?: number,
    height?: number,
    gravity?: string, // Appwrite's SDK might type this more strictly, e.g., as specific string literals
    quality?: number
): string => {
    if (!BUCKET_ID) {
        console.error("Storage Bucket ID is not configured for getImagePreviewUrl. Please set VITE_APPWRITE_IMAGESTORAGE_ID.");
        return "#error-bucket-not-configured"; // Or throw an error / return placeholder
    }
    if (!fileId) {
        console.warn("No file ID provided for getImagePreviewUrl.");
        return "#error-no-file-id"; // Or throw an error / return placeholder
    }

    try {
        // Parameters for getFilePreview: bucketId, fileId, width, height, gravity, quality, ...
        // The Appwrite SDK's `gravity` parameter might expect specific string literals.
        // Casting to `any` here if the exact type is unknown or too restrictive, but it's better
        // to use the correct type if available from the SDK.
        const previewUrl = storage.getFilePreview(
            BUCKET_ID,
            fileId,
            width,
            height,
            gravity as any, 
            quality
        );
        return previewUrl;
    } catch (error) {
        console.error(`Error getting preview URL for file ${fileId}:`, error);
        return "#error-preview-generation"; // Fallback URL or error indicator
    }
};

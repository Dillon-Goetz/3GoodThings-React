// src/app/routes/profile/components/RecentPostsDisplay.tsx
import React, { useState, useEffect } from 'react';
import { Models } from 'appwrite';
import { account, databases } from '@/appwriteConfig'; // Adjusted path assuming appwriteConfig is in src
import { Query } from 'appwrite';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

// Define a type for your "Good Things" document structure
interface GoodThingsPost extends Models.Document {
    userId: string;
    goodThing1: string;
    goodThing2: string;
    goodThing3: string;
    isPublic: boolean;
    createdAt: string;
}

const goodThingsCollectionId = import.meta.env.VITE_APPWRITE_GOODTHINGS_COLLECTION_ID;
const databaseId = import.meta.env.VITE_APPWRITE_DATABASE;

const RecentPostsDisplay: React.FC = () => {
    const [yesterdayPost, setYesterdayPost] = useState<GoodThingsPost | null>(null);
    const [twoDaysAgoPost, setTwoDaysAgoPost] = useState<GoodThingsPost | null>(null);
    const [threeDaysAgoPost, setThreeDaysAgoPost] = useState<GoodThingsPost | null>(null);
    const [postsLoading, setPostsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchRecentPosts = async () => {
            setPostsLoading(true);
            try {
                const user = await account.get();
                if (!user?.$id || !databaseId || !goodThingsCollectionId) {
                    console.warn("User, databaseId, or goodThingsCollectionId missing for fetching posts.");
                    setPostsLoading(false);
                    return;
                }

                const fetchPostForDay = async (daysAgo: number): Promise<GoodThingsPost | null> => {
                    const targetDate = new Date();
                    targetDate.setDate(targetDate.getDate() - daysAgo);

                    const startOfDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate()).toISOString();
                    const endOfDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate() + 1).toISOString();

                    const response = await databases.listDocuments<GoodThingsPost>(
                        databaseId,
                        goodThingsCollectionId,
                        [
                            Query.equal('userId', user.$id),
                            Query.greaterThanEqual('createdAt', startOfDay),
                            Query.lessThan('createdAt', endOfDay),
                            Query.orderDesc('createdAt'), // Get the latest if multiple on same day
                            Query.limit(1)
                        ]
                    );
                    return response.documents.length > 0 ? response.documents[0] : null;
                };

                const [yesterday, twoDays, threeDays] = await Promise.all([
                    fetchPostForDay(1),
                    fetchPostForDay(2),
                    fetchPostForDay(3)
                ]);

                setYesterdayPost(yesterday);
                setTwoDaysAgoPost(twoDays);
                setThreeDaysAgoPost(threeDays);

            } catch (error) {
                console.error("Error fetching recent posts:", error);
                setYesterdayPost(null);
                setTwoDaysAgoPost(null);
                setThreeDaysAgoPost(null);
            } finally {
                setPostsLoading(false);
            }
        };

        fetchRecentPosts();
    }, []); // Runs once on mount.

    return (
        <div className="mt-6">
            <Card>
                <CardHeader>
                    <CardTitle>Recent Posts</CardTitle>
                    <CardDescription>Your "3 Good Things" from the past few days.</CardDescription>
                </CardHeader>
                <CardContent>
                    {postsLoading ? (
                        <p className="text-muted-foreground">Loading recent posts...</p>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-3">
                            {/* Yesterday's Post */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Yesterday</CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm">
                                    {yesterdayPost ? (
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>{yesterdayPost.goodThing1}</li>
                                            <li>{yesterdayPost.goodThing2}</li>
                                            <li>{yesterdayPost.goodThing3}</li>
                                        </ul>
                                    ) : (
                                        <p className="text-muted-foreground">No post yesterday.</p>
                                    )}
                                </CardContent>
                            </Card>

                            {/* 2 Days Ago Post */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">2 Days Ago</CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm">
                                    {twoDaysAgoPost ? (
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>{twoDaysAgoPost.goodThing1}</li>
                                            <li>{twoDaysAgoPost.goodThing2}</li>
                                            <li>{twoDaysAgoPost.goodThing3}</li>
                                        </ul>
                                    ) : (
                                        <p className="text-muted-foreground">No post from 2 days ago.</p>
                                    )}
                                </CardContent>
                            </Card>

                            {/* 3 Days Ago Post */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">3 Days Ago</CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm">
                                    {threeDaysAgoPost ? (
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>{threeDaysAgoPost.goodThing1}</li>
                                            <li>{threeDaysAgoPost.goodThing2}</li>
                                            <li>{threeDaysAgoPost.goodThing3}</li>
                                        </ul>
                                    ) : (
                                        <p className="text-muted-foreground">No post from 3 days ago.</p>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default RecentPostsDisplay;
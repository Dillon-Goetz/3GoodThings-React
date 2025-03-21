import React, { useState } from 'react';
import { Databases, ID, Account } from 'appwrite';
import { client, account, databases } from '../../appwriteConfig';

const ThreeGoodThings: React.FC = () => {
    const [goodThing1, setGoodThing1] = useState('');
    const [goodThing2, setGoodThing2] = useState('');
    const [goodThing3, setGoodThing3] = useState('');
    const [isPublic, setIsPublic] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const user = await account.get();
            if (!user) {
                console.error("User not logged in");
                return;
            }

            await databases.createDocument(
                process.env.VITE_APPWRITE_DATABASE_ID!,
                process.env.VITE_APPWRITE_GOODTHINGS_COLLECTION_ID!,
                ID.unique(),
                {
                    userId: user.$id,
                    goodThing1,
                    goodThing2,
                    goodThing3,
                    isPublic,
                }
            );

            alert('Good things saved!');
            setGoodThing1('');
            setGoodThing2('');
            setGoodThing3('');
        } catch (error) {
            console.error('Error saving good things:', error);
            alert('Error saving good things.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Good Thing 1:</label>
                <textarea value={goodThing1} onChange={(e) => setGoodThing1(e.target.value)} />
            </div>
            <div>
                <label>Good Thing 2:</label>
                <textarea value={goodThing2} onChange={(e) => setGoodThing2(e.target.value)} />
            </div>
            <div>
                <label>Good Thing 3:</label>
                <textarea value={goodThing3} onChange={(e) => setGoodThing3(e.target.value)} />
            </div>
            <div>
                <label>Share to Feed:</label>
                <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />
            </div>

        </form>
    );
};

export default ThreeGoodThings;
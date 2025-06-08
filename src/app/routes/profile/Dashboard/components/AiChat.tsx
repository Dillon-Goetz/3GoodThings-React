import React, { useState } from 'react';
import { getChatResponse } from '@/services/aiService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface AiChatProps {
    analysisContext: string;
}

const AiChat: React.FC<AiChatProps> = ({ analysisContext }) => {
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        try {
            const aiMessage = await getChatResponse(newMessages, analysisContext);
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I couldn't connect." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="mt-6">
            <CardHeader>
                <CardTitle>Chat with your AI Assistant</CardTitle>
                <CardDescription>Have questions about your overview? Want to dig deeper into a specific day or feeling? Ask away!</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="chat-window h-64 overflow-y-auto p-4 border rounded-md mb-4 bg-secondary">
                    {messages.map((msg, index) => (
                        <div key={index} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                            <span className={`inline-block p-2 rounded-lg ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                {msg.content}
                            </span>
                        </div>
                    ))}
                    {isLoading && <p className="text-muted-foreground">...</p>}
                </div>
                <form onSubmit={handleSend} className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-grow p-2 border rounded-md"
                        placeholder="Ask about your trends..."
                        disabled={isLoading}
                    />
                    <Button type="submit" disabled={isLoading}>Send</Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default AiChat;
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, BrainCircuit, Camera, BarChart } from 'lucide-react';

const HomePage: React.FC = () => {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="text-center py-20 px-4">
                <h1 className="text-5xl font-extrabold tracking-tight mb-4">
                    Find Your Sunshine, Every Day.
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Daily Mindfull is your personal space to cultivate gratitude and mindfulness.
                    Discover the power of focusing on the good, one day at a time.
                </p>
                <Button asChild size="lg">
                    <Link to="/login">Start Your Free Journal</Link>
                </Button>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4 bg-secondary">
                <div className="container mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12">
                        A Toolbox for a Happier Mind
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <Card>
                            <CardHeader className="items-center">
                                <div className="p-3 bg-primary/10 rounded-full">
                                    <CheckCircle className="h-8 w-8 text-primary" />
                                </div>
                                <CardTitle className="mt-4">Three Good Things</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center text-muted-foreground">
                                The core of your practice. End each day by noting three positive moments, big or small.
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="items-center">
                                <div className="p-3 bg-primary/10 rounded-full">
                                    <BrainCircuit className="h-8 w-8 text-primary" />
                                </div>
                                <CardTitle className="mt-4">AI-Powered Insights</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center text-muted-foreground">
                                Our smart assistant helps you uncover trends and patterns in your journal entries over time.
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="items-center">
                                <div className="p-3 bg-primary/10 rounded-full">
                                    <Camera className="h-8 w-8 text-primary" />
                                </div>
                                <CardTitle className="mt-4">Photo Journal</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center text-muted-foreground">
                                Capture a daily photo that represents your day, creating a visual timeline of your journey.
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="items-center">
                                <div className="p-3 bg-primary/10 rounded-full">
                                    <BarChart className="h-8 w-8 text-primary" />
                                </div>
                                <CardTitle className="mt-4">Track Your Vibe</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center text-muted-foreground">
                                Log your daily mood to see how your mindfulness practice influences your well-being over time.
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-12">Get Started in 3 Simple Steps</h2>
                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="flex flex-col items-center">
                            <div className="text-4xl font-bold text-primary p-4 border-2 border-primary rounded-full h-20 w-20 flex items-center justify-center">1</div>
                            <h3 className="text-2xl font-semibold mt-6 mb-2">Create Your Account</h3>
                            <p className="text-muted-foreground">Sign up for free and create your private, secure journal.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="text-4xl font-bold text-primary p-4 border-2 border-primary rounded-full h-20 w-20 flex items-center justify-center">2</div>
                            <h3 className="text-2xl font-semibold mt-6 mb-2">Begin Your Practice</h3>
                            <p className="text-muted-foreground">Follow the daily guided flow to log your thoughts and feelings.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="text-4xl font-bold text-primary p-4 border-2 border-primary rounded-full h-20 w-20 flex items-center justify-center">3</div>
                            <h3 className="text-2xl font-semibold mt-6 mb-2">Discover Yourself</h3>
                            <p className="text-muted-foreground">Visit your dashboard to see your progress and gain new insights.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-20 px-4 bg-secondary">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
                    <p className="text-xl text-muted-foreground mb-8">
                        Take the first step towards a more mindful and grateful life.
                    </p>
                    <Button asChild size="lg">
                        <Link to="/login">Sign Up for Free</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
import type React from "react"
import { Link } from "react-router-dom"
import DailyMindfullLogo from "@/assets/Daily_Mindfull-noBG.png"
import { Button } from "@/components/ui/button"
import { CheckCircle, BrainCircuit, Camera, BarChart, ArrowRight, Sparkles } from "lucide-react"

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src={DailyMindfullLogo || "/placeholder.svg"} alt="Daily Mindfull Logo" className="h-12 w-auto" />
            {/* ADDED: Daily Mindfull text next to the logo */}
            <Link to="/home" className="text-xl font-bold tracking-tight">
          Daily Mindfull
            </Link>
          </div>
          <Button asChild variant="outline" className="border-blue-200 hover:bg-blue-50">
            <Link to="/login">Sign In</Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Sparkles className="h-4 w-4" />
            <span>Start your mindfulness journey today</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-700 bg-clip-text text-transparent">
            Find Your Sunshine,
            <br />
            Every Day.
          </h1>

          <p className="text-xl text-blue-700/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Daily Mindfull is your personal sanctuary for cultivating gratitude and mindfulness. Discover the
            transformative power of focusing on the good, one day at a time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link to="/login" className="flex items-center space-x-2">
                <span className="text-white">Start Your Free Journal</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="text-blue-700 hover:text-blue-800 hover:bg-blue-50 px-8 py-6 text-lg"
            >
              <a href="#features">Learn More</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-blue-900">A Toolbox for a Happier Mind</h2>
            <p className="text-xl text-blue-700/70 max-w-2xl mx-auto">
              Everything you need to build a sustainable mindfulness practice
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-300">
                  <CheckCircle className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-blue-900">Three Good Things</h3>
              <p className="text-blue-700/70 leading-relaxed">
                The heart of your practice. End each day by capturing three positive moments, no matter how small.
              </p>
            </div>

            <div className="text-center group">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-300">
                  <BrainCircuit className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-blue-900">AI-Powered Insights</h3>
              <p className="text-blue-700/70 leading-relaxed">
                Our intelligent assistant reveals meaningful patterns and trends in your journal entries over time.
              </p>
            </div>

            <div className="text-center group">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-300">
                  <Camera className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-blue-900">Photo Journal</h3>
              <p className="text-blue-700/70 leading-relaxed">
                Capture daily moments that represent your journey, creating a beautiful visual timeline of growth.
              </p>
            </div>

            <div className="text-center group">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-300">
                  <BarChart className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-blue-900">Track Your Vibe</h3>
              <p className="text-blue-700/70 leading-relaxed">
                Monitor your daily mood and discover how mindfulness practice influences your well-being.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-blue-900">Get Started in 3 Simple Steps</h2>
          <p className="text-xl text-blue-700/70 mb-16 max-w-2xl mx-auto">
            Your journey to mindfulness begins with just a few clicks
          </p>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="flex flex-col items-center group">
              <div className="relative">
                <div className="text-4xl font-bold text-white bg-gradient-to-br from-blue-600 to-indigo-600 p-6 rounded-full h-24 w-24 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  1
                </div>
                <div className="absolute -inset-2 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full -z-10 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-2xl font-semibold mt-8 mb-4 text-blue-900">Create Your Account</h3>
              <p className="text-blue-700/70 leading-relaxed max-w-sm">
                Sign up for free and create your private, secure digital sanctuary for reflection.
              </p>
            </div>

            <div className="flex flex-col items-center group">
              <div className="relative">
                <div className="text-4xl font-bold text-white bg-gradient-to-br from-blue-600 to-indigo-600 p-6 rounded-full h-24 w-24 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  2
                </div>
                <div className="absolute -inset-2 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full -z-10 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-2xl font-semibold mt-8 mb-4 text-blue-900">Begin Your Practice</h3>
              <p className="text-blue-700/70 leading-relaxed max-w-sm">
                Follow our gentle, guided flow to capture your daily thoughts and feelings with ease.
              </p>
            </div>

            <div className="flex flex-col items-center group">
              <div className="relative">
                <div className="text-4xl font-bold text-white bg-gradient-to-br from-blue-600 to-indigo-600 p-6 rounded-full h-24 w-24 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  3
                </div>
                <div className="absolute -inset-2 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full -z-10 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-2xl font-semibold mt-8 mb-4 text-blue-900">Discover Yourself</h3>
              <p className="text-blue-700/70 leading-relaxed max-w-sm">
                Explore your personalized dashboard to track progress and uncover meaningful insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Join thousands who have discovered the transformative power of daily mindfulness and gratitude practice.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 px-10 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Link to="/login" className="flex items-center space-x-2">
                <span>Sign Up for Free</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <p className="text-blue-200 text-sm mt-6">No credit card required • Start in under 2 minutes</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-blue-900 text-blue-100">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <img
              src={DailyMindfullLogo || "/placeholder.svg"}
              alt="Daily Mindfull Logo"
              className="h-10 w-auto opacity-80"
            />
          </div>
          <p className="text-blue-300">© 2024 Daily Mindfull. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default HomePage

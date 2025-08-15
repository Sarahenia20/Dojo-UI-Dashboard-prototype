import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Shield, TrendingUp, Play, MessageSquare, CheckCircle } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 p-8 text-white">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome to SamurAI Dojo, Erika</h1>
          <p className="text-cyan-100 mb-4">Healthcare Security Analyst</p>
          <p className="text-cyan-50 max-w-2xl">
            Your cybersecurity journey starts here. Discover AI-powered security tools tailored to your healthcare
            environment.
          </p>
          <div className="flex items-center mt-4 space-x-4">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              5 Active Products
            </Badge>
          </div>
        </div>
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 400 200" fill="none">
            <path
              d="M0 100L50 80L100 120L150 60L200 100L250 40L300 80L350 20L400 60V200H0V100Z"
              fill="url(#gradient)"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="white" stopOpacity="0.1" />
                <stop offset="100%" stopColor="white" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Healthcare Security Path */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-cyan-500" />
              <CardTitle>Healthcare Security Path</CardTitle>
            </div>
            <CardDescription>Master cybersecurity for healthcare environments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center"
                    >
                      <CheckCircle className="w-4 h-4 text-cyan-600" />
                    </div>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">3 modules completed</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Next: HIPAA Compliance Overview (5 min)</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              <Button className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600">
                Continue Learning
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Hot in Healthcare */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-orange-500" />
              <CardTitle>Hot in Healthcare</CardTitle>
            </div>
            <CardDescription>Most popular security tools this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                <div>
                  <p className="font-medium">SIEM Solutions in Healthcare</p>
                  <p className="text-sm text-muted-foreground">+23% adoption in healthcare</p>
                </div>
                <Badge>Trending</Badge>
              </div>
              <Button variant="outline" className="w-full bg-transparent">
                View Trending
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Platform Tour */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Play className="h-5 w-5 text-blue-500" />
              <CardTitle>Platform Tour</CardTitle>
            </div>
            <CardDescription>Master the Dojo in 3 minutes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Play className="w-12 h-12 text-white" />
              </div>
              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Start Tour
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* AI Assistant */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-green-500" />
              <CardTitle>AI Assistant</CardTitle>
            </div>
            <CardDescription>Get personalized security recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="aspect-video bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-12 h-12 text-white" />
              </div>
              <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                Chat with AI
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom CTA Section */}
      <Card>
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold">Ready to explore cybersecurity solutions?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover AI-powered product recommendations tailored to your needs
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600">
                Start Product Search
              </Button>
              <Button variant="outline">Browse by Category</Button>
              <Button variant="outline">View Use Cases</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Partner Logos */}
      <div className="text-center space-y-4">
        <h4 className="text-lg font-semibold">Trusted by security professionals worldwide</h4>
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
          <div className="text-2xl font-bold text-blue-600">Google</div>
          <div className="text-2xl font-bold text-blue-800">Microsoft</div>
          <div className="text-2xl font-bold text-orange-600">AWS</div>
          <div className="text-2xl font-bold text-gray-700">Cisco</div>
          <div className="text-2xl font-bold text-green-600">Splunk</div>
        </div>
        <p className="text-sm text-muted-foreground">50+ Additional Partners</p>
      </div>
    </div>
  )
}

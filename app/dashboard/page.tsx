import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Shield, CheckCircle, Users, Activity, Clock, Zap, BarChart3, Plus } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 p-6 text-white">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-1">Welcome, Erika</h1>
              <p className="text-cyan-100 text-sm mb-4">Last active: 2 hours ago</p>
              <div className="flex items-center space-x-2 text-sm">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Security Evaluation - 75% Complete
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  <Clock className="w-3 h-3 mr-1" />
                  Compliance Review pending
                </Badge>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                New Search
              </Button>
              <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                View Reports
              </Button>
              <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                Resume Project
              </Button>
            </div>
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Recommendations */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-cyan-500" />
                <CardTitle>AI Recommendations</CardTitle>
              </div>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">90% Accuracy</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg text-white">
                <div className="text-2xl font-bold">+23%</div>
                <div className="text-sm text-cyan-100">Improvement potential</div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Phantom SOAR Platform</p>
                    <p className="text-xs text-muted-foreground">Top security automation potential</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    +30%
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">LogRhythm SIEM+</p>
                    <p className="text-xs text-muted-foreground">Log analysis optimization</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    +18%
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Labs */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-blue-500" />
                <CardTitle>Recent Labs</CardTitle>
              </div>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-1" />
                Deploy Lab
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Active Labs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">Windows AD Lab</span>
                    </div>
                    <Badge
                      variant="secondary"
                      className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                    >
                      Active
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs text-muted-foreground">TechCorp Security workspace</div>
                    <Progress value={75} className="h-2" />
                    <div className="text-xs text-muted-foreground">25 minutes remaining</div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 border-blue-200 dark:border-blue-800">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">Linux SIEM Test</span>
                    </div>
                    <Badge
                      variant="secondary"
                      className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                    >
                      Active
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs text-muted-foreground">Erika SecOps workspace</div>
                    <Progress value={45} className="h-2" />
                    <div className="text-xs text-muted-foreground">1.2 hours remaining</div>
                  </div>
                </div>
              </div>

              {/* Recent Lab History */}
              <div className="space-y-3">
                <div className="text-sm font-medium text-muted-foreground">Recent Activity</div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                        <Shield className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Splunk Enterprise Lab</div>
                        <div className="text-xs text-muted-foreground">Completed 2h ago • 45 min session</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Completed
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                        <Users className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">QRadar SIEM Demo</div>
                        <div className="text-xs text-muted-foreground">Completed 4h ago • 1.2 hour session</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Completed
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Posture */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-cyan-500" />
              <CardTitle>Security Posture</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="text-4xl font-bold text-cyan-600">78</div>
              <div className="text-sm text-muted-foreground">+15 this quarter</div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-semibold text-green-600">+12</div>
                  <div className="text-xs text-muted-foreground">Endpoint Protection</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-blue-600">+8</div>
                  <div className="text-xs text-muted-foreground">Network Security</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-red-600">-5</div>
                  <div className="text-xs text-muted-foreground">Compliance</div>
                </div>
              </div>

              <div className="p-3 bg-cyan-50 dark:bg-cyan-950 rounded-lg">
                <div className="text-sm font-medium text-cyan-800 dark:text-cyan-200">Top 25% in Manufacturing</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-blue-500" />
              <CardTitle>Recent Activity</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">SOAR comparison generated</p>
                  <p className="text-xs text-muted-foreground">2h</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Splunk vs QRadar report</p>
                  <p className="text-xs text-muted-foreground">4h</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Windows lab deployed</p>
                  <p className="text-xs text-muted-foreground">6h</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Team collaboration</p>
                  <p className="text-xs text-muted-foreground">1d</p>
                </div>
              </div>
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

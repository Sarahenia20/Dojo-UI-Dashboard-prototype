"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Zap,
  Key,
  Mail,
  Clock,
  Shield,
  Play,
  Pause,
  Square,
  Monitor,
  Server,
  Database,
  Globe,
  CheckCircle,
  AlertCircle,
  Loader2,
  Star,
  RotateCcw,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react"

export default function SamuraiLabsPage() {
  const [activeTab, setActiveTab] = useState("access")
  const [accessKey, setAccessKey] = useState("")
  const [showKey, setShowKey] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [keyError, setKeyError] = useState("")
  const [activeLabs, setActiveLabs] = useState<any[]>([])

  const [labHistory, setLabHistory] = useState<any[]>([
    {
      id: 1,
      name: "Microsoft 365 Security Lab",
      status: "completed",
      timeTaken: "3h 15m",
      completedAt: "2 days ago",
      score: 92,
      canReactivate: true,
    },
    {
      id: 2,
      name: "Salesforce Health Cloud",
      status: "completed",
      timeTaken: "2h 45m",
      completedAt: "1 week ago",
      score: 88,
      canReactivate: true,
    },
    {
      id: 3,
      name: "Slack Enterprise Lab",
      status: "expired",
      reason: "Session timeout",
      expiredAt: "3 days ago",
      canReactivate: true,
    },
  ])

  const [savedLabs, setSavedLabs] = useState<any[]>([
    {
      id: 1,
      name: "Healthcare Compliance Lab",
      description: "HIPAA focused security assessment",
      savedAt: "1 week ago",
      estimatedDuration: "2h 30m",
      complexity: "Intermediate",
      starred: true,
    },
    {
      id: 2,
      name: "Cloud Migration Sandbox",
      description: "Multi-cloud migration testing",
      savedAt: "3 days ago",
      estimatedDuration: "4h 00m",
      complexity: "Advanced",
      starred: true,
    },
  ])

  const handleKeySubmit = () => {
    if (!accessKey.trim()) {
      setKeyError("Please enter an access key")
      return
    }

    if (accessKey.length < 8) {
      setKeyError("Access key must be at least 8 characters")
      return
    }

    setKeyError("")
    setIsLoading(true)

    // Simulate secure key validation
    setTimeout(() => {
      setIsLoading(false)
      if (accessKey === "DEMO-KEY-123" || accessKey.match(/^[A-Z0-9]{8,}-[A-Z0-9]{4,}$/)) {
        setActiveLabs([
          {
            id: 1,
            name: "Microsoft 365 Security Lab",
            type: "Cloud Environment",
            status: "initializing",
            timeRemaining: "2h 45m",
            resources: ["Exchange Online", "SharePoint", "Teams"],
            accessUrl: "https://lab-m365-sec.samurai.labs",
          },
        ])
        setActiveTab("labs")
        setAccessKey("")
      } else {
        setKeyError("Invalid access key format. Please check your email for the correct key.")
      }
    }, 1500)
  }

  const handleReactivateLab = (labId: number) => {
    const lab = labHistory.find((l) => l.id === labId)
    if (lab) {
      // Simulate reactivation request
      alert(`Reactivation request sent for "${lab.name}". You'll receive a new access key via email within 5 minutes.`)
    }
  }

  const handleRemoveSavedLab = (labId: number) => {
    setSavedLabs((prev) => prev.filter((lab) => lab.id !== labId))
  }

  const handleToggleStar = (labId: number) => {
    setSavedLabs((prev) => prev.map((lab) => (lab.id === labId ? { ...lab, starred: !lab.starred } : lab)))
  }

  const availableLabs = [
    {
      id: 1,
      name: "Enterprise Security Assessment",
      description: "Multi-vendor security tool evaluation environment",
      duration: "3 hours",
      complexity: "Advanced",
      tools: ["CrowdStrike", "Splunk", "Microsoft Defender"],
      category: "Security",
    },
    {
      id: 2,
      name: "Healthcare Compliance Lab",
      description: "HIPAA-compliant infrastructure testing",
      duration: "2 hours",
      complexity: "Intermediate",
      tools: ["Salesforce Health Cloud", "Epic Integration", "Compliance Tools"],
      category: "Compliance",
    },
    {
      id: 3,
      name: "Cloud Migration Sandbox",
      description: "Test cloud migration strategies and tools",
      duration: "4 hours",
      complexity: "Advanced",
      tools: ["Azure Migration", "AWS WorkSpaces", "VMware Cloud"],
      category: "Infrastructure",
    },
  ]

  const handleTabChange = (value: string) => {
    console.log("[v0] Tab changed to:", value)
    setActiveTab(value)
  }

  return (
    <div className="min-h-screen bg-background p-4 lg:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold">SamurAI Labs</h1>
          </div>
          <p className="text-muted-foreground">
            Secure, isolated environments for testing and evaluating business solutions
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="access" className="flex items-center space-x-2">
              <Key className="h-4 w-4" />
              <span>Lab Access</span>
            </TabsTrigger>
            <TabsTrigger value="labs" className="flex items-center space-x-2">
              <Monitor className="h-4 w-4" />
              <span>Active Labs</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Lab History</span>
            </TabsTrigger>
            <TabsTrigger value="available" className="flex items-center space-x-2">
              <Server className="h-4 w-4" />
              <span>Available Labs</span>
            </TabsTrigger>
          </TabsList>

          <div className="mb-4 text-sm text-muted-foreground">Current tab: {activeTab}</div>

          {/* Lab Access Tab */}
          <TabsContent value="access" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Key className="h-5 w-5 text-blue-600" />
                  <span>Enter Lab Access Key</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">Check Your Email</h3>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Lab access keys are sent to your registered email address after product selection. Each key
                        provides secure, time-limited access to your requested lab environment.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Access Key</label>
                    <div className="flex space-x-3">
                      <div className="flex-1 relative">
                        <Input
                          type={showKey ? "text" : "password"}
                          placeholder="Enter your lab access key..."
                          value={accessKey}
                          onChange={(e) => {
                            setAccessKey(e.target.value)
                            setKeyError("")
                          }}
                          className={`pr-10 ${keyError ? "border-red-500" : ""}`}
                          onKeyPress={(e) => e.key === "Enter" && handleKeySubmit()}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowKey(!showKey)}
                        >
                          {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      <Button
                        onClick={handleKeySubmit}
                        disabled={!accessKey.trim() || isLoading}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        {isLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <Key className="h-4 w-4 mr-2" />
                            Access Lab
                          </>
                        )}
                      </Button>
                    </div>
                    {keyError && (
                      <p className="text-sm text-red-600 mt-1 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {keyError}
                      </p>
                    )}
                  </div>

                  <div className="text-xs text-muted-foreground bg-slate-50 dark:bg-slate-900 p-3 rounded-lg">
                    <p className="flex items-center">
                      <span className="mr-2">💡</span>
                      Demo key:{" "}
                      <code className="bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded ml-1">DEMO-KEY-123</code>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                    <Shield className="h-5 w-5 text-slate-600" />
                    <div>
                      <p className="font-medium text-sm">Secure Access</p>
                      <p className="text-xs text-muted-foreground">Encrypted connections</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                    <Clock className="h-5 w-5 text-slate-600" />
                    <div>
                      <p className="font-medium text-sm">Time Limited</p>
                      <p className="text-xs text-muted-foreground">Auto-expires for security</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                    <Database className="h-5 w-5 text-slate-600" />
                    <div>
                      <p className="font-medium text-sm">Isolated Environment</p>
                      <p className="text-xs text-muted-foreground">Dedicated resources</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Active Labs Tab */}
          <TabsContent value="labs" className="space-y-6">
            {activeLabs.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Monitor className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">No Active Labs</h3>
                  <p className="text-muted-foreground mb-4">Enter an access key to start your lab environment</p>
                  <Button onClick={() => setActiveTab("access")} className="bg-green-600 hover:bg-green-700">
                    <Key className="h-4 w-4 mr-2" />
                    Enter Access Key
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {activeLabs.map((lab) => (
                  <Card key={lab.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center space-x-2">
                          <Monitor className="h-5 w-5 text-blue-600" />
                          <span>{lab.name}</span>
                        </CardTitle>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={lab.status === "running" ? "default" : "secondary"}
                            className={lab.status === "running" ? "bg-green-600" : "bg-yellow-600"}
                          >
                            {lab.status === "initializing" && <Loader2 className="h-3 w-3 mr-1 animate-spin" />}
                            {lab.status === "running" && <CheckCircle className="h-3 w-3 mr-1" />}
                            {lab.status.charAt(0).toUpperCase() + lab.status.slice(1)}
                          </Badge>
                          <Badge variant="outline">
                            <Clock className="h-3 w-3 mr-1" />
                            {lab.timeRemaining}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Available Resources</h4>
                          <div className="flex flex-wrap gap-2">
                            {lab.resources.map((resource: string) => (
                              <Badge key={resource} variant="outline" className="text-xs">
                                {resource}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex space-x-3">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            disabled={lab.status !== "running"}
                          >
                            <Play className="h-4 w-4 mr-2" />
                            Launch Lab
                          </Button>
                          <Button size="sm" variant="outline">
                            <Pause className="h-4 w-4 mr-2" />
                            Pause
                          </Button>
                          <Button size="sm" variant="outline">
                            <Square className="h-4 w-4 mr-2" />
                            Stop
                          </Button>
                          <Button size="sm" variant="outline">
                            <Globe className="h-4 w-4 mr-2" />
                            Web Access
                          </Button>
                        </div>

                        {lab.status === "initializing" && (
                          <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border">
                            <div className="flex items-center space-x-2">
                              <AlertCircle className="h-4 w-4 text-slate-600" />
                              <p className="text-sm">
                                Lab environment is initializing. This may take 2-3 minutes. You'll receive an email
                                notification when ready.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Lab History Tab */}
          <TabsContent value="history" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Previous Labs */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <span>Recent Labs</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {labHistory.map((lab) => (
                    <div key={lab.id} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{lab.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {lab.status === "expired" ? (
                            <span className="text-amber-600">
                              Expired • {lab.reason} • {lab.expiredAt}
                            </span>
                          ) : (
                            <span>
                              Completed {lab.completedAt} • {lab.timeTaken} • Score: {lab.score}%
                            </span>
                          )}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        {lab.canReactivate && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs bg-transparent"
                            onClick={() => handleReactivateLab(lab.id)}
                          >
                            <RotateCcw className="h-3 w-3 mr-1" />
                            {lab.status === "expired" ? "Reactivate" : "Restart"}
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Saved/Starred Labs */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-600" />
                    <span>Saved Labs</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {savedLabs.map((lab) => (
                    <div key={lab.id} className="flex items-center justify-between p-3 bg-card rounded-lg border">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{lab.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {lab.description} • {lab.estimatedDuration} • {lab.complexity}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">Saved {lab.savedAt}</p>
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-xs p-1"
                          onClick={() => handleToggleStar(lab.id)}
                        >
                          <Star className={`h-3 w-3 ${lab.starred ? "fill-yellow-400 text-yellow-400" : ""}`} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs bg-green-600 hover:bg-green-700 text-white"
                        >
                          Launch
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-xs p-1 text-red-600 hover:text-red-700"
                          onClick={() => handleRemoveSavedLab(lab.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Security Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span>Security & Compliance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-card rounded-lg border">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-sm">Data Isolation</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Complete environment isolation with zero data persistence after session termination.
                    </p>
                  </div>
                  <div className="p-4 bg-card rounded-lg border">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-sm">Session Security</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Automatic session expiration and encrypted key-based access control.
                    </p>
                  </div>
                  <div className="p-4 bg-card rounded-lg border">
                    <div className="flex items-center space-x-2 mb-2">
                      <Database className="h-4 w-4 text-purple-600" />
                      <span className="font-medium text-sm">Audit Trail</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Comprehensive logging and monitoring for compliance and security analysis.
                    </p>
                  </div>
                  <div className="p-4 bg-card rounded-lg border">
                    <div className="flex items-center space-x-2 mb-2">
                      <Key className="h-4 w-4 text-orange-600" />
                      <span className="font-medium text-sm">Access Control</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Multi-factor authentication with time-limited, single-use access keys.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Available Labs Tab */}
          <TabsContent value="available" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableLabs.map((lab) => (
                <Card key={lab.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{lab.name}</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {lab.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{lab.description}</p>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="font-medium">{lab.duration}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Complexity:</span>
                        <Badge variant={lab.complexity === "Advanced" ? "default" : "secondary"} className="text-xs">
                          {lab.complexity}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Included Tools:</p>
                      <div className="flex flex-wrap gap-1">
                        {lab.tools.map((tool) => (
                          <Badge key={tool} variant="outline" className="text-xs">
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full bg-slate-600 hover:bg-slate-700" disabled>
                      <Key className="h-4 w-4 mr-2" />
                      Requires Access Key
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

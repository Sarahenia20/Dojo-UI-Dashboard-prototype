"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { WebTerminal } from "@/components/web-terminal"
import { VNCClient } from "@/components/vnc-client"
import { AIAssistantChat } from "@/components/ai-assistant-chat"
import {
  Clock,
  Shield,
  Play,
  Monitor,
  Server,
  CheckCircle,
  AlertCircle,
  Settings,
  AlertTriangle,
  RefreshCw,
  Mail,
  Terminal,
  Target,
  Star,
  Package,
  Wifi,
  Database,
} from "lucide-react"

type LabState = "none" | "deploying" | "email-sent" | "connected"
type ViewMode = "terminal" | "desktop"

const allProducts = [
  {
    id: 1,
    name: "CrowdStrike Falcon",
    vendor: "CrowdStrike",
    logo: "/crowdstrike-logo.png",
    category: "Cloud-Native Endpoint Protection",
  },
  {
    id: 2,
    name: "SentinelOne Singularity",
    vendor: "SentinelOne",
    logo: "/sentinelone-logo.png",
    category: "AI-Powered Endpoint Security",
  },
  {
    id: 3,
    name: "Microsoft Defender for Business",
    vendor: "Microsoft",
    logo: "/microsoft-logo.png",
    category: "Integrated Endpoint Security",
  },
  {
    id: 4,
    name: "Rapid7 InsightIDR",
    category: "SIEM + Endpoint Detection",
  },
  {
    id: 5,
    name: "Securonix Cloud SIEM",
    category: "Cloud-Native SIEM",
  },
]

export default function SamuraiLabsPage() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("scenarios")
  const [isAssistantOpen, setIsAssistantOpen] = useState(true)
  const [labState, setLabState] = useState<LabState>("none")
  const [pemKey, setPemKey] = useState("")
  const [viewMode, setViewMode] = useState<ViewMode>("terminal")
  const [userProfile] = useState({ focusAreas: ["Security & Compliance"] })
  const [userSubscription] = useState({ isPremium: false })
  const [deploymentProgress, setDeploymentProgress] = useState(0)
  const [deploymentStep, setDeploymentStep] = useState("")
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [showEmailAlerts, setShowEmailAlerts] = useState(false)

  useEffect(() => {
    const action = searchParams.get("action")
    const products = searchParams.get("products")

    if (action === "deploy" && products && !showEmailAlerts) {
      setShowEmailAlerts(true)
    }
  }, [searchParams, showEmailAlerts])

  const simulateDeployment = (productIds: number[] = [1, 2, 3]) => {
    setLabState("deploying")
    setDeploymentProgress(0)
    setCurrentStepIndex(0)

    const selectedProducts = allProducts.filter((p) => productIds.includes(p.id))

    const baseSteps = [
      { progress: 10, step: "Provisioning lab infrastructure...", duration: 8000, icon: Server },
      { progress: 25, step: "Installing base operating system...", duration: 12000, icon: Package },
      { progress: 40, step: "Configuring network security...", duration: 10000, icon: Wifi },
    ]

    const productSteps = selectedProducts.map((product, index) => ({
      progress: 40 + (index + 1) * 15,
      step: `Installing ${product.name}...`,
      duration: 8000 + Math.random() * 4000,
      icon: Shield,
    }))

    const finalSteps = [
      { progress: 85, step: "Configuring security policies...", duration: 6000, icon: Settings },
      { progress: 95, step: "Running security validation...", duration: 5000, icon: CheckCircle },
      { progress: 100, step: "Sending access credentials via email...", duration: 3000, icon: Mail },
    ]

    const allSteps = [...baseSteps, ...productSteps, ...finalSteps]

    let stepIndex = 0

    const runStep = () => {
      if (stepIndex < allSteps.length) {
        const currentStep = allSteps[stepIndex]
        setDeploymentProgress(currentStep.progress)
        setDeploymentStep(currentStep.step)
        setCurrentStepIndex(stepIndex)

        setTimeout(() => {
          stepIndex++
          if (stepIndex < allSteps.length) {
            runStep()
          } else {
            setLabState("email-sent")
          }
        }, currentStep.duration)
      }
    }

    runStep()
  }

  const getSelectedProductsFromUrl = () => {
    const products = searchParams.get("products")
    if (products) {
      const productIds = products.split(",").map((id) => Number.parseInt(id))
      return allProducts.filter((p) => productIds.includes(p.id))
    }
    return [allProducts[0], allProducts[1], allProducts[2]] // Default fallback
  }

  const selectedProductsForLab = getSelectedProductsFromUrl()

  const currentLab = {
    name: "Healthcare Security Lab",
    type: "Security Testing Environment",
    osType: "Windows Server 2022",
    instanceType: "Standard Configuration",
    userEmail: "user@company.com",
    tools: selectedProductsForLab.map((p) => p.name),
    progress: deploymentProgress,
    currentStep: deploymentStep,
    timeRemaining: "3h 24m",
    deployedAt: "2 hours ago",
  }

  const hasSecurityFocus = userProfile.focusAreas.includes("Security & Compliance")
  const hasActiveLab = labState !== "none"

  const [savedLabs] = useState([
    {
      id: 1,
      name: "Microsoft 365 Security Lab",
      type: "Standard Lab",
      configuration: "Windows Server 2022 • Standard Configuration",
      tools: ["CrowdStrike", "Splunk", "Defender"],
      savedAt: "2 days ago",
      canRecreate: true,
    },
    {
      id: 2,
      name: "Salesforce Health Cloud",
      type: "Container Lab",
      configuration: "Kubernetes • 2 nodes",
      tools: ["Falco", "Grafana", "Prometheus"],
      savedAt: "1 week ago",
      canRecreate: true,
    },
  ])

  const handleConnectLab = () => {
    if (pemKey.trim()) {
      setLabState("connected")
    }
  }

  const handleStopLab = () => {
    setLabState("none")
    setPemKey("")
  }

  const handleSaveLab = () => {
    alert("Lab configuration saved to Saved Labs!")
  }

  const handleRecreate = (labId: number) => {
    const lab = savedLabs.find((l) => l.id === labId)
    if (lab) {
      alert(`Recreation request sent for "${lab.name}". New lab will be provisioned within 5-8 minutes.`)
    }
  }

  const handleUseDemoKey = () => {
    setPemKey("-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEA7vbqajDhA...\n-----END RSA PRIVATE KEY-----")
    setLabState("connected")
  }

  const handleConfigureAttack = () => {
    alert("Attack scenario configuration saved! This will be applied when the lab is deployed.")
  }

  const handleTerminalCommand = (command: string) => {
    console.log(`[v0] Terminal command executed: ${command}`)
  }

  const deploymentSteps = [
    { icon: Server, label: "Infrastructure", completed: deploymentProgress >= 25 },
    { icon: Package, label: "OS Installation", completed: deploymentProgress >= 40 },
    { icon: Shield, label: "Security Tools", completed: deploymentProgress >= 70 },
    { icon: Settings, label: "Configuration", completed: deploymentProgress >= 85 },
    { icon: Mail, label: "Email Delivery", completed: deploymentProgress >= 100 },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col lg:flex-row">
        <div className={`flex-1 p-4 lg:p-6 transition-all duration-300 ${isAssistantOpen ? "lg:pr-80" : "lg:pr-4"}`}>
          <div className="max-w-6xl mx-auto">
            <div className="mb-6 p-3 bg-slate-50/50 dark:bg-slate-900/20 rounded-lg border border-slate-200/50 dark:border-slate-700/50">
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <div className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                    1
                  </div>
                  <span>Configure</span>
                </div>
                <div className="hidden sm:block text-slate-300">→</div>
                <div className="flex items-center space-x-1">
                  <div className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                    2
                  </div>
                  <span>Review</span>
                </div>
                <div className="hidden sm:block text-slate-300">→</div>
                <div className="flex items-center space-x-1">
                  <div className="w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                    3
                  </div>
                  <span className="text-green-600 dark:text-green-400 font-medium">Access Lab</span>
                </div>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="space-y-6">
                {/* Configuration Tools Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-muted-foreground">Configuration Tools</h3>
                  <div className="grid w-full grid-cols-1 sm:grid-cols-3 gap-4">
                    {hasSecurityFocus && (
                      <Button
                        variant={activeTab === "scenarios" ? "default" : "outline"}
                        onClick={() => setActiveTab("scenarios")}
                        className="flex flex-col items-center space-y-2 p-4 h-auto bg-card border border-border hover:bg-accent data-[state=active]:bg-blue-50 data-[state=active]:border-blue-300 dark:data-[state=active]:bg-blue-950/30"
                      >
                        <div className="text-center">
                          <div className="font-medium">Scenario Builder</div>
                          <div className="text-xs text-muted-foreground">Configure attack scenarios</div>
                        </div>
                      </Button>
                    )}
                    <Button
                      variant={activeTab === "hardware" ? "default" : "outline"}
                      onClick={() => setActiveTab("hardware")}
                      className="flex flex-col items-center space-y-2 p-4 h-auto bg-card border border-border hover:bg-accent data-[state=active]:bg-blue-50 data-[state=active]:border-blue-300 dark:data-[state=active]:bg-blue-950/30"
                    >
                      <div className="text-center">
                        <div className="font-medium">Hardware Diagram</div>
                        <div className="text-xs text-muted-foreground">Review infrastructure</div>
                      </div>
                    </Button>
                    <Button
                      variant={activeTab === "saved" ? "default" : "outline"}
                      onClick={() => setActiveTab("saved")}
                      className="flex flex-col items-center space-y-2 p-4 h-auto bg-card border border-border hover:bg-accent data-[state=active]:bg-yellow-50 data-[state=active]:border-yellow-300 dark:data-[state=active]:bg-yellow-950/30"
                    >
                      <div className="text-center">
                        <div className="font-medium">Saved Labs</div>
                        <div className="text-xs text-muted-foreground">Restore configurations</div>
                      </div>
                    </Button>
                  </div>
                </div>

                {/* Primary Lab Environment Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Lab Environment</h3>
                  <Button
                    variant={activeTab === "active" ? "default" : "outline"}
                    onClick={() => setActiveTab("active")}
                    className="w-full flex flex-col items-center space-y-4 p-6 h-auto bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-2 border-green-300 dark:border-green-700 hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-950/30 dark:hover:to-emerald-950/30 data-[state=active]:from-green-100 data-[state=active]:to-emerald-100 dark:data-[state=active]:from-green-950/40 dark:data-[state=active]:to-emerald-950/40 data-[state=active]:border-green-400 dark:data-[state=active]:border-green-600 data-[state=active]:shadow-lg data-[state=active]:shadow-green-200/50 dark:data-[state=active]:shadow-green-900/20 rounded-xl transition-all duration-300"
                  >
                    <div className="text-center">
                      <div className="text-xl font-bold text-green-700 dark:text-green-400">Active Lab Environment</div>
                      <div className="text-sm text-green-600 dark:text-green-500">
                        Your primary workspace - Connect and start testing
                      </div>
                    </div>
                    {hasActiveLab && (
                      <div className="flex items-center space-x-2 px-4 py-2 bg-green-200 dark:bg-green-800 rounded-full">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-green-800 dark:text-green-200">Lab Active</span>
                      </div>
                    )}
                  </Button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="mt-8">
                <TabsContent value="scenarios" className="space-y-6">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Security Testing Only:</strong> Configure attack scenarios to test your selected defensive
                      products. Scenarios will be applied when the lab is deployed.
                    </AlertDescription>
                  </Alert>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Target className="h-5 w-5 text-red-600" />
                        <span>Attack Scenario Builder</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-8">
                        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200">
                          <h4 className="font-medium mb-3 flex items-center">
                            <Shield className="h-4 w-4 mr-2 text-blue-600" />
                            Selected Products
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {selectedProductsForLab.map((product) => (
                              <div
                                key={product.id}
                                className="flex items-center space-x-3 p-3 bg-white dark:bg-card rounded border"
                              >
                                {product.logo && (
                                  <img
                                    src={product.logo || "/placeholder.svg"}
                                    alt={product.vendor}
                                    className="w-6 h-6 object-contain"
                                  />
                                )}
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm truncate">{product.name}</p>
                                  <p className="text-xs text-muted-foreground truncate">{product.category}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Network-Based Attacks */}
                        <Card className="border-red-200 bg-red-50/30 dark:bg-red-950/10">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center space-x-2">
                              <Wifi className="h-4 w-4 text-red-600" />
                              <span>Network-Based Attacks</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                              <label className="flex items-start space-x-3 p-3 rounded border bg-white dark:bg-card hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer transition-colors">
                                <input type="checkbox" className="mt-1 rounded flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm">Port Scanning & Enumeration</p>
                                  <p className="text-xs text-muted-foreground">
                                    Systematic discovery of open ports and services
                                  </p>
                                </div>
                              </label>

                              <label className="flex items-start space-x-3 p-3 rounded border bg-white dark:bg-card hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer transition-colors">
                                <input type="checkbox" className="mt-1 rounded flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm">Network Intrusion Simulation</p>
                                  <p className="text-xs text-muted-foreground">
                                    Lateral movement and network compromise techniques
                                  </p>
                                </div>
                              </label>

                              <label className="flex items-start space-x-3 p-3 rounded border bg-white dark:bg-card hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer transition-colors">
                                <input type="checkbox" className="mt-1 rounded flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm">DNS Tunneling</p>
                                  <p className="text-xs text-muted-foreground">Data exfiltration through DNS queries</p>
                                </div>
                              </label>

                              <label className="flex items-start space-x-3 p-3 rounded border bg-white dark:bg-card hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer transition-colors">
                                <input type="checkbox" className="mt-1 rounded flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm">Man-in-the-Middle Attack</p>
                                  <p className="text-xs text-muted-foreground">Traffic interception and manipulation</p>
                                </div>
                              </label>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Endpoint-Based Attacks */}
                        <Card className="border-orange-200 bg-orange-50/30 dark:bg-orange-950/10">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center space-x-2">
                              <Monitor className="h-4 w-4 text-orange-600" />
                              <span>Endpoint-Based Attacks</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                              <label className="flex items-start space-x-3 p-3 rounded border bg-white dark:bg-card hover:bg-orange-50 dark:hover:bg-orange-950/20 cursor-pointer transition-colors">
                                <input type="checkbox" className="mt-1 rounded flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm">Malware Deployment</p>
                                  <p className="text-xs text-muted-foreground">
                                    Simulated malware execution and behavior analysis
                                  </p>
                                </div>
                              </label>

                              <label className="flex items-start space-x-3 p-3 rounded border bg-white dark:bg-card hover:bg-orange-50 dark:hover:bg-orange-950/20 cursor-pointer transition-colors">
                                <input type="checkbox" className="mt-1 rounded flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm">Privilege Escalation</p>
                                  <p className="text-xs text-muted-foreground">
                                    Local and domain privilege escalation techniques
                                  </p>
                                </div>
                              </label>

                              <label className="flex items-start space-x-3 p-3 rounded border bg-white dark:bg-card hover:bg-orange-50 dark:hover:bg-orange-950/20 cursor-pointer transition-colors">
                                <input type="checkbox" className="mt-1 rounded flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm">Persistence Mechanisms</p>
                                  <p className="text-xs text-muted-foreground">
                                    Registry modifications and scheduled tasks
                                  </p>
                                </div>
                              </label>

                              <label className="flex items-start space-x-3 p-3 rounded border bg-white dark:bg-card hover:bg-orange-50 dark:hover:bg-orange-950/20 cursor-pointer transition-colors">
                                <input type="checkbox" className="mt-1 rounded flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm">Credential Harvesting</p>
                                  <p className="text-xs text-muted-foreground">
                                    Memory dumps and credential extraction
                                  </p>
                                </div>
                              </label>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Web Application Attacks */}
                        <Card className="border-purple-200 bg-purple-50/30 dark:bg-purple-950/10">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center space-x-2">
                              <Database className="h-4 w-4 text-purple-600" />
                              <span>Web Application Attacks</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                              <label className="flex items-start space-x-3 p-3 rounded border bg-white dark:bg-card hover:bg-purple-50 dark:hover:bg-purple-950/20 cursor-pointer transition-colors">
                                <input type="checkbox" className="mt-1 rounded flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm">SQL Injection</p>
                                  <p className="text-xs text-muted-foreground">
                                    Database compromise through injection attacks
                                  </p>
                                </div>
                              </label>

                              <label className="flex items-start space-x-3 p-3 rounded border bg-white dark:bg-card hover:bg-purple-50 dark:hover:bg-purple-950/20 cursor-pointer transition-colors">
                                <input type="checkbox" className="mt-1 rounded flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm">Cross-Site Scripting (XSS)</p>
                                  <p className="text-xs text-muted-foreground">
                                    Client-side code injection and session hijacking
                                  </p>
                                </div>
                              </label>

                              <label className="flex items-start space-x-3 p-3 rounded border bg-white dark:bg-card hover:bg-purple-50 dark:hover:bg-purple-950/20 cursor-pointer transition-colors">
                                <input type="checkbox" className="mt-1 rounded flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm">API Exploitation</p>
                                  <p className="text-xs text-muted-foreground">
                                    REST API vulnerabilities and data exposure
                                  </p>
                                </div>
                              </label>

                              <label className="flex items-start space-x-3 p-3 rounded border bg-white dark:bg-card hover:bg-purple-50 dark:hover:bg-purple-950/20 cursor-pointer transition-colors">
                                <input type="checkbox" className="mt-1 rounded flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm">Authentication Bypass</p>
                                  <p className="text-xs text-muted-foreground">
                                    Session management and access control flaws
                                  </p>
                                </div>
                              </label>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Card className="border-blue-200 bg-blue-50/30 dark:bg-blue-950/10">
                        <CardHeader>
                          <CardTitle className="text-base flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-blue-600" />
                            <span>Execution Order</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-sm sm:text-base">
                                Selected scenarios will run in this order:
                              </span>
                            </div>

                            <div className="space-y-2 p-4 bg-white dark:bg-card rounded border">
                              <div className="flex items-center space-x-3 text-sm">
                                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                                  1
                                </div>
                                <span className="text-muted-foreground flex-1 min-w-0 truncate">
                                  Port Scanning & Enumeration
                                </span>
                                <div className="flex flex-wrap items-center gap-1 ml-auto">
                                  <Badge variant="outline" className="text-xs">
                                    CrowdStrike
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    SentinelOne
                                  </Badge>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3 text-sm">
                                <div className="w-6 h-6 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                                  2
                                </div>
                                <span className="text-muted-foreground flex-1 min-w-0 truncate">
                                  Malware Deployment
                                </span>
                                <div className="flex flex-wrap items-center gap-1 ml-auto">
                                  <Badge variant="outline" className="text-xs">
                                    Microsoft Defender
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    CrowdStrike
                                  </Badge>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3 text-sm">
                                <div className="w-6 h-6 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                                  3
                                </div>
                                <span className="text-muted-foreground flex-1 min-w-0 truncate">
                                  Privilege Escalation
                                </span>
                                <div className="flex flex-wrap items-center gap-1 ml-auto">
                                  <Badge variant="outline" className="text-xs">
                                    All Products
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t space-y-4 sm:space-y-0">
                            <div className="flex items-center space-x-2">
                              <input type="checkbox" id="realtime-feedback" className="rounded" />
                              <label htmlFor="realtime-feedback" className="text-sm">
                                Enable real-time defensive response feedback
                              </label>
                            </div>
                            <Button
                              className="bg-red-600 hover:bg-red-700 w-full sm:w-auto"
                              onClick={handleConfigureAttack}
                            >
                              <Play className="h-4 w-4 mr-2" />
                              Configure Attack Sequence
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="active" className="space-y-6">
                  <Card>
                    <CardContent className="p-0">
                      <div className="space-y-0">
                        {/* Email Alerts Section - Show when coming from product search */}
                        {showEmailAlerts && (
                          <div className="p-4 space-y-3 bg-blue-50 dark:bg-blue-950/20 border-b">
                            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-200">
                              <div className="flex items-center justify-center space-x-2 mb-3">
                                <Mail className="h-5 w-5 text-blue-600" />
                                <span className="font-medium">Email Notification</span>
                              </div>
                              <p className="text-sm text-muted-foreground text-center">
                                You will receive an email with SSH keys, PAM credentials, and setup instructions within
                                the next 2-3 minutes.
                              </p>
                            </div>

                            <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-lg border border-yellow-200">
                              <div className="flex items-center justify-center space-x-2 mb-2">
                                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                                <span className="font-medium text-yellow-800 dark:text-yellow-200">Important</span>
                              </div>
                              <p className="text-sm text-yellow-700 dark:text-yellow-300 text-center">
                                Please do not refresh this browser to prevent any data loss. You can use the demo key
                                below for immediate testing.
                              </p>
                            </div>

                            <div className="flex justify-center">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowEmailAlerts(false)}
                                className="text-muted-foreground hover:text-foreground"
                              >
                                Dismiss Alerts
                              </Button>
                            </div>
                          </div>
                        )}

                        {/* Lab Environment Ready - Always Available */}
                        {labState !== "connected" && (
                          <div className="p-6 space-y-6">
                            {/* Top Section: Status & Context */}
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                  <span className="font-semibold text-lg">Lab Environment Ready</span>
                                </div>
                                <Badge className="bg-green-100 text-green-800 border-green-300">
                                  Infrastructure Active
                                </Badge>
                              </div>

                              {/* Security Tools Deployed */}
                              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200">
                                <h4 className="font-medium mb-3 flex items-center">
                                  <Shield className="h-4 w-4 mr-2 text-blue-600" />
                                  Security Tools Deployed
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  {selectedProductsForLab.map((product) => (
                                    <div
                                      key={product.id}
                                      className="flex items-center space-x-3 p-3 bg-white dark:bg-card rounded border"
                                    >
                                      {product.logo && (
                                        <img
                                          src={product.logo || "/placeholder.svg"}
                                          alt={product.vendor}
                                          className="w-6 h-6 object-contain"
                                        />
                                      )}
                                      <div className="flex-1 min-w-0">
                                        <p className="font-medium text-sm truncate">{product.name}</p>
                                        <p className="text-xs text-muted-foreground truncate">{product.category}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Center Section: Connection Interface */}
                            <div className="space-y-6">
                              <div className="text-center space-y-2">
                                <h3 className="text-xl font-semibold">Connect to Your Lab</h3>
                                <p className="text-muted-foreground">
                                  Paste your SSH private key to access your lab environment
                                </p>
                              </div>

                              <div className="space-y-4">
                                {/* Large PEM Key Input Area */}
                                <div className="space-y-2">
                                  <label className="block text-sm font-medium">SSH Private Key (PEM)</label>
                                  <textarea
                                    value={pemKey}
                                    onChange={(e) => setPemKey(e.target.value)}
                                    placeholder="-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEA7vbqajDhA...\n...\n-----END RSA PRIVATE KEY-----"
                                    className="w-full h-32 p-4 border rounded-lg text-sm font-mono resize-none bg-slate-50 dark:bg-slate-900/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  />
                                </div>

                                {/* File Upload Alternative */}
                                <div className="text-center">
                                  <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                      <div className="w-full border-t border-gray-300" />
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                      <span className="px-2 bg-background text-muted-foreground">or</span>
                                    </div>
                                  </div>
                                  <Button variant="outline" className="mt-4 bg-transparent">
                                    <Package className="h-4 w-4 mr-2" />
                                    Upload PEM File
                                  </Button>
                                </div>

                                {/* Connect Button */}
                                <div className="flex justify-center">
                                  <Button
                                    onClick={handleConnectLab}
                                    disabled={!pemKey.trim()}
                                    className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
                                    size="lg"
                                  >
                                    <Terminal className="h-5 w-5 mr-2" />
                                    Connect to Lab
                                  </Button>
                                </div>

                                <div className="text-center space-y-2">
                                  <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                      <div className="w-full border-t border-gray-300" />
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                      <span className="px-2 bg-background text-muted-foreground">for testing</span>
                                    </div>
                                  </div>
                                  <Button
                                    variant="outline"
                                    size="lg"
                                    onClick={handleUseDemoKey}
                                    className="bg-green-50 hover:bg-green-100 border-green-300 text-green-700 hover:text-green-800"
                                  >
                                    <Star className="h-4 w-4 mr-2" />
                                    Use Demo Key for Testing
                                  </Button>
                                  <p className="text-xs text-muted-foreground">
                                    Instantly access terminal and desktop with demo credentials
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Connected State - Terminal/Desktop Access */}
                        {labState === "connected" && (
                          <div className="space-y-0">
                            {/* Enhanced Header with View Toggle */}
                            <div className="flex items-center justify-between p-4 border-b bg-slate-50 dark:bg-slate-900/20">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-3">
                                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                  <span className="font-medium">Connected to Lab</span>
                                  <Badge variant="outline" className="text-xs">
                                    ubuntu@lab-instance:~$
                                  </Badge>
                                </div>

                                <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                                  <Button
                                    variant={viewMode === "terminal" ? "default" : "ghost"}
                                    size="sm"
                                    onClick={() => setViewMode("terminal")}
                                    className="px-3 py-1 text-xs h-8"
                                  >
                                    <Terminal className="h-3 w-3 mr-1" />
                                    Terminal View
                                  </Button>
                                  <Button
                                    variant={viewMode === "desktop" ? "default" : "ghost"}
                                    size="sm"
                                    onClick={() => setViewMode("desktop")}
                                    className="px-3 py-1 text-xs h-8"
                                  >
                                    <Monitor className="h-3 w-3 mr-1" />
                                    Desktop View
                                  </Button>
                                </div>
                              </div>

                              <div className="flex items-center space-x-4">
                                <span className="text-sm text-muted-foreground">Session: 2h 45m remaining</span>
                                <Button variant="outline" size="sm" onClick={handleStopLab}>
                                  Disconnect
                                </Button>
                              </div>
                            </div>

                            {/* Dynamic Content Based on View Mode */}
                            <div className="p-0">
                              {viewMode === "terminal" ? (
                                <WebTerminal
                                  className="w-full min-h-[500px]"
                                  labName="samurai-lab"
                                  onCommand={handleTerminalCommand}
                                />
                              ) : (
                                <VNCClient
                                  className="w-full min-h-[500px]"
                                  labName="samurai-lab"
                                  onConnect={() => console.log("[v0] VNC connected")}
                                  onDisconnect={() => console.log("[v0] VNC disconnected")}
                                />
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="hardware" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Server className="h-5 w-5 text-blue-600" />
                        <span>Lab Infrastructure Diagram</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 sm:p-8 lg:p-12 rounded-xl border-2 border-slate-200 dark:border-slate-700 min-h-[500px] sm:min-h-[600px]">
                        {/* Desktop Layout - Branched Design */}
                        <div className="hidden lg:block">
                          <div className="flex flex-col items-center space-y-12">
                            {/* Top: Firewall */}
                            <div className="flex flex-col items-center space-y-4">
                              <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-red-600 rounded-3xl flex items-center justify-center shadow-2xl border-4 border-red-200 hover:scale-105 transition-transform cursor-pointer">
                                <Shield className="h-12 w-12 text-white" />
                              </div>
                              <div className="text-center">
                                <p className="font-bold text-lg">Firewall</p>
                                <p className="text-sm text-muted-foreground">Network Security Gateway</p>
                              </div>
                            </div>

                            {/* Vertical Connection */}
                            <div className="flex flex-col items-center space-y-3">
                              <div className="h-16 border-l-4 border-dotted border-gray-400 relative">
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                                  <div className="w-0 h-0 border-t-6 border-t-gray-400 border-l-3 border-l-transparent border-r-3 border-r-transparent"></div>
                                </div>
                              </div>
                              <Badge className="bg-gray-100 text-gray-700 border-gray-300 px-3 py-1">
                                Secure Connection
                              </Badge>
                            </div>

                            {/* Middle: Your Machine */}
                            <div className="flex flex-col items-center space-y-4">
                              <div className="w-28 h-28 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl border-4 border-blue-200 hover:scale-105 transition-transform cursor-pointer">
                                <Monitor className="h-14 w-14 text-white" />
                              </div>
                              <div className="text-center">
                                <p className="font-bold text-lg">Your Machine</p>
                                <p className="text-sm text-muted-foreground">Local Development Environment</p>
                              </div>
                            </div>

                            {/* Branching Connection */}
                            <div className="flex flex-col items-center space-y-6">
                              <div className="h-12 border-l-4 border-dotted border-blue-400"></div>
                              <Badge className="bg-blue-100 text-blue-700 border-blue-300 px-3 py-1">
                                SSH/PEM Auth
                              </Badge>
                              <div className="h-12 border-l-4 border-dotted border-blue-400"></div>

                              {/* Branch Split */}
                              <div className="relative">
                                <div className="w-32 border-t-4 border-dotted border-blue-400"></div>
                                <div className="absolute left-0 top-0 w-4 h-4 border-l-4 border-b-4 border-dotted border-blue-400 transform -translate-x-2 -translate-y-2"></div>
                                <div className="absolute right-0 top-0 w-4 h-4 border-r-4 border-b-4 border-dotted border-blue-400 transform translate-x-2 -translate-y-2"></div>
                              </div>
                            </div>

                            {/* Bottom: Lab Environment and Security Tools */}
                            <div className="flex justify-center items-start space-x-24">
                              {/* Left Branch: Lab Environment */}
                              <div className="flex flex-col items-center space-y-4">
                                <div className="w-28 h-28 bg-gradient-to-br from-green-400 to-green-600 rounded-3xl flex items-center justify-center shadow-2xl border-4 border-green-200 hover:scale-105 transition-transform cursor-pointer">
                                  <Server className="h-14 w-14 text-white" />
                                </div>
                                <div className="text-center">
                                  <p className="font-bold text-lg">Lab Environment</p>
                                  <p className="text-sm text-muted-foreground">Security Testing Infrastructure</p>
                                </div>
                              </div>

                              {/* Right Branch: Security Tools Cluster */}
                              <div className="flex flex-col items-center space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  {selectedProductsForLab.slice(0, 4).map((product, index) => (
                                    <div
                                      key={product.id}
                                      className={`w-16 h-16 ${
                                        index % 4 === 0
                                          ? "bg-purple-500"
                                          : index % 4 === 1
                                            ? "bg-red-500"
                                            : index % 4 === 2
                                              ? "bg-yellow-500"
                                              : "bg-pink-500"
                                      } rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer`}
                                    >
                                      <Shield className="h-8 w-8 text-white" />
                                    </div>
                                  ))}
                                </div>
                                <div className="text-center">
                                  <p className="font-bold text-lg">Security Tools</p>
                                  <p className="text-sm text-muted-foreground">
                                    {selectedProductsForLab.length} Tools Deployed
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Mobile/Tablet Layout - Same vertical structure but smaller */}
                        <div className="lg:hidden space-y-8">
                          {/* Firewall */}
                          <div className="flex justify-center">
                            <div className="flex flex-col items-center space-y-3">
                              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl flex items-center justify-center shadow-xl border-3 border-red-200">
                                <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                              </div>
                              <div className="text-center">
                                <p className="font-bold text-sm sm:text-base">Firewall</p>
                                <p className="text-xs text-muted-foreground">Network Security</p>
                              </div>
                            </div>
                          </div>

                          {/* Connection */}
                          <div className="flex justify-center">
                            <div className="flex flex-col items-center space-y-2">
                              <div className="h-8 border-l-4 border-dotted border-gray-400"></div>
                              <Badge className="bg-gray-100 text-gray-700 border-gray-300 px-2 py-1 text-xs">
                                Secure
                              </Badge>
                            </div>
                          </div>

                          {/* Your Machine */}
                          <div className="flex justify-center">
                            <div className="flex flex-col items-center space-y-3">
                              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl border-3 border-blue-200">
                                <Monitor className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                              </div>
                              <div className="text-center">
                                <p className="font-bold text-sm sm:text-base">Your Machine</p>
                                <p className="text-xs text-muted-foreground">Local Environment</p>
                              </div>
                            </div>
                          </div>

                          {/* Connection */}
                          <div className="flex justify-center">
                            <div className="flex flex-col items-center space-y-2">
                              <div className="h-8 border-l-4 border-dotted border-blue-400"></div>
                              <Badge className="bg-blue-100 text-blue-700 border-blue-300 px-2 py-1 text-xs">
                                SSH/PEM
                              </Badge>
                            </div>
                          </div>

                          {/* Branched Bottom Section */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {/* Lab Environment */}
                            <div className="flex flex-col items-center space-y-3">
                              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-xl border-3 border-green-200">
                                <Server className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                              </div>
                              <div className="text-center">
                                <p className="font-bold text-sm sm:text-base">Lab Environment</p>
                                <p className="text-xs text-muted-foreground">Security Testing</p>
                              </div>
                            </div>

                            {/* Security Tools */}
                            <div className="flex flex-col items-center space-y-3">
                              <div className="grid grid-cols-2 gap-2">
                                {selectedProductsForLab.slice(0, 4).map((product, index) => (
                                  <div
                                    key={product.id}
                                    className={`w-8 h-8 sm:w-10 sm:h-10 ${
                                      index % 4 === 0
                                        ? "bg-purple-500"
                                        : index % 4 === 1
                                          ? "bg-red-500"
                                          : index % 4 === 2
                                            ? "bg-yellow-500"
                                            : "bg-pink-500"
                                    } rounded-lg flex items-center justify-center shadow-lg`}
                                  >
                                    <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                                  </div>
                                ))}
                              </div>
                              <div className="text-center">
                                <p className="font-bold text-sm sm:text-base">Security Tools</p>
                                <p className="text-xs text-muted-foreground">{selectedProductsForLab.length} Tools</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-8 sm:mt-12 p-4 sm:p-6 border-2 border-dashed border-gray-300 rounded-xl bg-white/50 dark:bg-gray-800/50">
                          <p className="text-center text-gray-500 font-medium text-sm sm:text-base">
                            Future: Drag & Drop Components Here to Customize Your Lab
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="saved" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Star className="h-5 w-5 text-blue-600" />
                        <span>Saved Lab Configurations</span>
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                          Premium Feature
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {!userSubscription.isPremium ? (
                        <Alert>
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription>
                            <strong>Premium Feature:</strong> Save your lab configurations for quick redeployment. Saved
                            labs can be restored instantly without reconfiguration.
                          </AlertDescription>
                        </Alert>
                      ) : null}

                      <div className="space-y-3">
                        {savedLabs.map((lab) => (
                          <div
                            key={lab.id}
                            className={`flex items-center justify-between p-4 rounded-lg border ${!userSubscription.isPremium ? "opacity-50" : ""}`}
                          >
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <Star className="h-4 w-4 text-yellow-500" />
                                <p className="font-medium">{lab.name}</p>
                                <Badge variant="outline" className="text-xs">
                                  {lab.type}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-1">{lab.configuration}</p>
                              <p className="text-xs text-muted-foreground">
                                Tools: {lab.tools.join(", ")} • Saved: {lab.savedAt}
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                disabled={!userSubscription.isPremium}
                                onClick={() => handleRecreate(lab.id)}
                              >
                                <RefreshCw className="h-3 w-3 mr-1" />
                                Restore
                              </Button>
                              <Button size="sm" variant="outline" disabled={!userSubscription.isPremium}>
                                Delete
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {!userSubscription.isPremium && (
                        <Card className="border-yellow-200 bg-yellow-50/50 dark:bg-yellow-950/20">
                          <CardContent className="p-6 text-center">
                            <h3 className="font-semibold mb-2">Upgrade to Premium</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              Save unlimited lab configurations and restore them instantly for quick testing
                            </p>
                            <Button className="bg-yellow-600 hover:bg-yellow-700">Upgrade Now</Button>
                          </CardContent>
                        </Card>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>

        <div className="lg:block">
          <AIAssistantChat
            context={activeTab === "scenarios" ? "scenario" : activeTab === "hardware" ? "hardware" : "lab"}
            onToggle={setIsAssistantOpen}
          />
        </div>
      </div>
    </div>
  )
}

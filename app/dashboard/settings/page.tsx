"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  Building2,
  MapPin,
  Mail,
  Shield,
  Edit,
  Bell,
  Key,
  Eye,
  EyeOff,
  Save,
  Sparkles,
  Database,
  Cloud,
  Zap,
  Check,
  Settings,
  Network,
  Users,
  FileText,
  Briefcase,
  MessageSquare,
  BarChart3,
  Workflow,
  Server,
  Brain,
  Target,
  Layers,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"

export default function ProfileSettingsPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)

  const [securityFocus, setSecurityFocus] = useState(["endpoint", "data", "compliance", "identity"])
  const [utilityFocus, setUtilityFocus] = useState(["productivity", "analytics", "collaboration"])

  const securityFocusOptions = [
    {
      id: "endpoint",
      label: "Endpoint Protection",
      icon: Shield,
      description: "Antivirus, EDR, device management",
      category: "Infrastructure",
    },
    {
      id: "network",
      label: "Network Security",
      icon: Network,
      description: "Firewalls, IDS/IPS, network monitoring",
      category: "Infrastructure",
    },
    {
      id: "data",
      label: "Data Protection",
      icon: Database,
      description: "Encryption, DLP, backup solutions",
      category: "Data Security",
    },
    {
      id: "cloud",
      label: "Cloud Security",
      icon: Cloud,
      description: "CASB, cloud workload protection",
      category: "Infrastructure",
    },
    {
      id: "identity",
      label: "Identity & Access",
      icon: User,
      description: "IAM, SSO, privileged access management",
      category: "Access Control",
    },
    {
      id: "compliance",
      label: "Compliance Management",
      icon: FileText,
      description: "GRC, audit trails, policy management",
      category: "Governance",
    },
    {
      id: "threat",
      label: "Threat Intelligence",
      icon: Brain,
      description: "SIEM, threat hunting, incident response",
      category: "Detection",
    },
    {
      id: "vulnerability",
      label: "Vulnerability Management",
      icon: AlertTriangle,
      description: "Scanning, assessment, patch management",
      category: "Risk Management",
    },
    {
      id: "application",
      label: "Application Security",
      icon: Layers,
      description: "SAST, DAST, code analysis",
      category: "Development",
    },
    {
      id: "incident",
      label: "Incident Response",
      icon: Target,
      description: "SOAR, forensics, crisis management",
      category: "Operations",
    },
  ]

  const utilityFocusOptions = [
    {
      id: "productivity",
      label: "Productivity Suites",
      icon: Zap,
      description: "Office tools, document management",
      category: "Workplace",
    },
    {
      id: "communication",
      label: "Communication Platforms",
      icon: MessageSquare,
      description: "Chat, video conferencing, messaging",
      category: "Collaboration",
    },
    {
      id: "analytics",
      label: "Business Intelligence",
      icon: BarChart3,
      description: "Data visualization, reporting, dashboards",
      category: "Analytics",
    },
    {
      id: "automation",
      label: "Process Automation",
      icon: Workflow,
      description: "RPA, workflow engines, integration",
      category: "Operations",
    },
    {
      id: "collaboration",
      label: "Team Collaboration",
      icon: Users,
      description: "Project management, file sharing",
      category: "Collaboration",
    },
    {
      id: "infrastructure",
      label: "IT Infrastructure",
      icon: Server,
      description: "Monitoring, deployment, DevOps tools",
      category: "Operations",
    },
    {
      id: "crm",
      label: "Customer Management",
      icon: Briefcase,
      description: "CRM, sales automation, support tools",
      category: "Business",
    },
    {
      id: "finance",
      label: "Financial Management",
      icon: Database,
      description: "ERP, accounting, expense management",
      category: "Business",
    },
    {
      id: "hr",
      label: "Human Resources",
      icon: Users,
      description: "HRIS, recruitment, performance management",
      category: "Business",
    },
    {
      id: "marketing",
      label: "Marketing Automation",
      icon: Target,
      description: "Email marketing, social media, campaigns",
      category: "Business",
    },
  ]

  const handleFocusChange = (type, focusId) => {
    if (type === "security") {
      setSecurityFocus((prev) => (prev.includes(focusId) ? prev.filter((id) => id !== focusId) : [...prev, focusId]))
    } else {
      setUtilityFocus((prev) => (prev.includes(focusId) ? prev.filter((id) => id !== focusId) : [...prev, focusId]))
    }
  }

  const groupedSecurityOptions = securityFocusOptions.reduce((acc, option) => {
    if (!acc[option.category]) acc[option.category] = []
    acc[option.category].push(option)
    return acc
  }, {})

  const groupedUtilityOptions = utilityFocusOptions.reduce((acc, option) => {
    if (!acc[option.category]) acc[option.category] = []
    acc[option.category].push(option)
    return acc
  }, {})

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl p-6 text-white">
        <div>
          <h1 className="text-2xl font-bold">Profile Settings</h1>
          <p className="text-cyan-100 mt-1">Manage your professional platform profile and preferences</p>
        </div>
      </div>

      <Tabs defaultValue="identity" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-slate-900 border-slate-800">
          <TabsTrigger value="identity" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
            <User className="h-4 w-4 mr-2" />
            Professional Identity
          </TabsTrigger>
          <TabsTrigger value="focus" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
            <Shield className="h-4 w-4 mr-2" />
            Focus Areas
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="integration" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
            <Key className="h-4 w-4 mr-2" />
            Integration
          </TabsTrigger>
        </TabsList>

        <TabsContent value="identity" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Information Card */}
            <Card className="bg-slate-900 border-slate-800 text-white">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Personal Information</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  {isEditing ? "Cancel" : "Edit"}
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <Avatar className="h-20 w-20 border-2 border-cyan-400/20">
                      <AvatarImage src="/professional-avatar.png" />
                      <AvatarFallback className="bg-cyan-400/20 text-cyan-400 text-xl">EJ</AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <div className="absolute -bottom-1 -right-1 bg-cyan-500 rounded-full p-2 cursor-pointer hover:bg-cyan-600 transition-colors">
                        <Edit className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium text-lg">Profile Photo</h3>
                    <p className="text-slate-400 text-sm mb-3">Upload a professional headshot</p>
                    {isEditing && (
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
                        >
                          Upload New
                        </Button>
                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                          Remove
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-slate-400 text-sm font-medium">Full Name</Label>
                    {isEditing ? (
                      <Input defaultValue="Erika Johnson" className="bg-slate-800 border-slate-600 text-white mt-2" />
                    ) : (
                      <p className="text-white font-medium mt-2 text-lg">Erika Johnson</p>
                    )}
                  </div>

                  <div>
                    <Label className="text-slate-400 text-sm font-medium">Job Title</Label>
                    {isEditing ? (
                      <Input
                        defaultValue="Healthcare Security Analyst"
                        className="bg-slate-800 border-slate-600 text-white mt-2"
                      />
                    ) : (
                      <p className="text-white font-medium mt-2">Healthcare Security Analyst</p>
                    )}
                  </div>

                  <div>
                    <Label className="text-slate-400 text-sm font-medium">Email Address</Label>
                    <div className="flex items-center space-x-2 mt-2">
                      <Mail className="h-4 w-4 text-slate-400" />
                      <span className="text-white font-medium">erika@mercygeneral.com</span>
                      <Sparkles className="h-4 w-4 text-cyan-400" />
                    </div>
                    <p className="text-slate-400 text-xs mt-1">Verified via smart detection</p>
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-end pt-4 border-t border-slate-700">
                    <Button className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Organization Information Card */}
            <Card className="bg-slate-900 border-slate-800 text-white">
              <CardHeader>
                <CardTitle className="text-lg">Organization Information</CardTitle>
                <p className="text-slate-400 text-sm">Company and location details</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-slate-400 text-sm font-medium">Company Name</Label>
                    <div className="flex items-center space-x-2 mt-2">
                      <Building2 className="h-4 w-4 text-slate-400" />
                      <span className="text-white font-medium">Mercy General Hospital</span>
                      <Sparkles className="h-4 w-4 text-cyan-400" />
                    </div>
                    <p className="text-slate-400 text-xs mt-1">Smart detection from email domain</p>
                  </div>

                  <div>
                    <Label className="text-slate-400 text-sm font-medium">Industry</Label>
                    <Input defaultValue="Healthcare" className="bg-slate-800 border-slate-600 text-white mt-2" />
                    <p className="text-slate-400 text-xs mt-1">Editable industry classification</p>
                  </div>

                  <div>
                    <Label className="text-slate-400 text-sm font-medium">Department/Organization</Label>
                    <Input
                      defaultValue="IT Security Department"
                      className="bg-slate-800 border-slate-600 text-white mt-2"
                    />
                    <p className="text-slate-400 text-xs mt-1">Editable organization unit</p>
                  </div>

                  <div>
                    <Label className="text-slate-400 text-sm font-medium">Region</Label>
                    <div className="flex items-center space-x-2 mt-2">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      <Input defaultValue="Asia Pacific" className="bg-slate-800 border-slate-600 text-white flex-1" />
                    </div>
                    <p className="text-slate-400 text-xs mt-1">Editable regional information</p>
                  </div>

                  <div>
                    <Label className="text-slate-400 text-sm font-medium">Location</Label>
                    <div className="flex items-center space-x-2 mt-2">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      <Input
                        defaultValue="San Francisco, CA"
                        className="bg-slate-800 border-slate-600 text-white flex-1"
                      />
                    </div>
                    <p className="text-slate-400 text-xs mt-1">Editable location information</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="focus" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Protection & Verification Focus */}
            <Card className="bg-slate-900 border-slate-800 text-white">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-cyan-400" />
                  <CardTitle className="text-lg">Protection & Verification Focus</CardTitle>
                </div>
                <p className="text-slate-400 text-sm">Select your security and protection focus areas</p>
                <div className="flex items-center space-x-2 mt-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 text-sm font-medium">{securityFocus.length} areas selected</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(groupedSecurityOptions).map(([category, options]) => (
                    <div key={category}>
                      <h4 className="text-slate-300 font-medium text-sm mb-3 uppercase tracking-wide">{category}</h4>
                      <div className="grid grid-cols-1 gap-3">
                        {options.map((option) => {
                          const Icon = option.icon
                          const isSelected = securityFocus.includes(option.id)
                          return (
                            <button
                              key={option.id}
                              onClick={() => handleFocusChange("security", option.id)}
                              className={`flex items-start p-4 rounded-lg border transition-all text-left ${
                                isSelected
                                  ? "border-cyan-500 bg-cyan-500/10"
                                  : "border-slate-600 bg-slate-800 hover:border-slate-500"
                              }`}
                            >
                              <Icon
                                className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${isSelected ? "text-cyan-400" : "text-slate-400"}`}
                              />
                              <div className="flex-1">
                                <span
                                  className={`font-medium block ${isSelected ? "text-cyan-300" : "text-slate-300"}`}
                                >
                                  {option.label}
                                </span>
                                <span className="text-slate-400 text-xs mt-1 block">{option.description}</span>
                              </div>
                              {isSelected && <Check className="w-4 h-4 ml-2 text-cyan-400 flex-shrink-0" />}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Business Utility Focus */}
            <Card className="bg-slate-900 border-slate-800 text-white">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-teal-400" />
                  <CardTitle className="text-lg">Business Utility Focus</CardTitle>
                </div>
                <p className="text-slate-400 text-sm">Select your business and productivity focus areas</p>
                <div className="flex items-center space-x-2 mt-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 text-sm font-medium">{utilityFocus.length} areas selected</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(groupedUtilityOptions).map(([category, options]) => (
                    <div key={category}>
                      <h4 className="text-slate-300 font-medium text-sm mb-3 uppercase tracking-wide">{category}</h4>
                      <div className="grid grid-cols-1 gap-3">
                        {options.map((option) => {
                          const Icon = option.icon
                          const isSelected = utilityFocus.includes(option.id)
                          return (
                            <button
                              key={option.id}
                              onClick={() => handleFocusChange("utility", option.id)}
                              className={`flex items-start p-4 rounded-lg border transition-all text-left ${
                                isSelected
                                  ? "border-teal-500 bg-teal-500/10"
                                  : "border-slate-600 bg-slate-800 hover:border-slate-500"
                              }`}
                            >
                              <Icon
                                className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${isSelected ? "text-teal-400" : "text-slate-400"}`}
                              />
                              <div className="flex-1">
                                <span
                                  className={`font-medium block ${isSelected ? "text-teal-300" : "text-slate-300"}`}
                                >
                                  {option.label}
                                </span>
                                <span className="text-slate-400 text-xs mt-1 block">{option.description}</span>
                              </div>
                              {isSelected && <Check className="w-4 h-4 ml-2 text-teal-400 flex-shrink-0" />}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-slate-900 border-slate-800 text-white">
            <CardHeader>
              <CardTitle className="text-lg">Notification Preferences</CardTitle>
              <p className="text-slate-400 text-sm">Manage how you receive updates and alerts</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Platform Updates</p>
                    <p className="text-slate-400 text-sm">New features and improvements</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Consultation Insights</p>
                    <p className="text-slate-400 text-sm">Weekly summary of recommendations</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Industry Updates</p>
                    <p className="text-slate-400 text-sm">Relevant industry news and trends</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Lab Notifications</p>
                    <p className="text-slate-400 text-sm">Lab completion and results</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integration Tab */}
        <TabsContent value="integration" className="space-y-6">
          <Card className="bg-slate-900 border-slate-800 text-white">
            <CardHeader>
              <CardTitle className="text-lg">Platform Integration</CardTitle>
              <p className="text-slate-400 text-sm">Manage your workspace access and integrations</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* VM Connection Settings section */}
              <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
                <div className="flex items-center space-x-2 mb-3">
                  <Settings className="h-5 w-5 text-blue-400" />
                  <h3 className="text-white font-medium">External VM Connection</h3>
                  <Badge className="bg-blue-500/20 text-blue-400 text-xs">Beta</Badge>
                </div>
                <p className="text-slate-400 text-sm mb-4">
                  Connect your external VMs or VMware infrastructure for secure lab access
                </p>
                <div className="space-y-3">
                  <div>
                    <Label className="text-slate-400 text-sm font-medium">Connection Type</Label>
                    <div className="mt-2 space-y-2">
                      <select className="w-full p-2 bg-slate-800 border border-slate-600 rounded text-white">
                        <option value="">Select connection type...</option>
                        <option value="vmware">VMware vSphere</option>
                        <option value="hyperv">Microsoft Hyper-V</option>
                        <option value="virtualbox">Oracle VirtualBox</option>
                        <option value="kvm">KVM/QEMU</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-slate-400 text-sm font-medium">Host Address</Label>
                      <Input placeholder="192.168.1.100" className="bg-slate-800 border-slate-600 text-white mt-1" />
                    </div>
                    <div>
                      <Label className="text-slate-400 text-sm font-medium">Port</Label>
                      <Input placeholder="443" className="bg-slate-800 border-slate-600 text-white mt-1" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-slate-400 text-sm font-medium">Username</Label>
                      <Input placeholder="admin" className="bg-slate-800 border-slate-600 text-white mt-1" />
                    </div>
                    <div>
                      <Label className="text-slate-400 text-sm font-medium">Password</Label>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="bg-slate-800 border-slate-600 text-white mt-1"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white">
                      Test Connection
                    </Button>
                    <Button
                      variant="outline"
                      className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                    >
                      Save Configuration
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-slate-400 text-sm font-medium">Workspace Access Key</Label>
                  <div className="mt-3 space-y-3">
                    <div className="flex items-center space-x-2 p-3 bg-slate-800 rounded-lg">
                      <Key className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-300 text-sm font-mono flex-1">
                        {showApiKey ? "ws-dojo-erika-mercy-general" : "••••••••••••••••••••"}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="h-8 w-8 p-0 text-slate-400 hover:text-white"
                      >
                        {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
                      >
                        Reset Key
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
                      >
                        Export Data
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label className="text-slate-400 text-sm font-medium">Active Integrations</Label>
                    <div className="mt-3 space-y-3">
                      <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                            <Database className="h-4 w-4 text-white" />
                          </div>
                          <span className="text-white font-medium">Healthcare Analytics</span>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center">
                            <Shield className="h-4 w-4 text-white" />
                          </div>
                          <span className="text-white font-medium">Compliance Monitoring</span>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

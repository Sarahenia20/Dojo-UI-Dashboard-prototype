"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
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
  Globe,
  Database,
  Cloud,
  Zap,
  FileText,
  Check,
} from "lucide-react"

export default function ProfileSettingsPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)

  // Focus areas from profiling wizard
  const [securityFocus, setSecurityFocus] = useState(["endpoint", "data", "compliance"])
  const [utilityFocus, setUtilityFocus] = useState(["productivity", "analytics"])
  const [compliance, setCompliance] = useState(["HIPAA", "SOC 2 Type II", "NIST Cybersecurity Framework"])

  const securityFocusOptions = [
    { id: "endpoint", label: "Endpoint Protection", icon: Shield },
    { id: "network", label: "Network Security", icon: Globe },
    { id: "data", label: "Data Protection", icon: Database },
    { id: "cloud", label: "Cloud Security", icon: Cloud },
    { id: "identity", label: "Identity Management", icon: User },
    { id: "compliance", label: "Compliance Management", icon: FileText },
  ]

  const utilityFocusOptions = [
    { id: "productivity", label: "Productivity Tools", icon: Zap },
    { id: "communication", label: "Communication Platforms", icon: Globe },
    { id: "analytics", label: "Business Analytics", icon: Database },
    { id: "automation", label: "Process Automation", icon: Sparkles },
    { id: "collaboration", label: "Team Collaboration", icon: User },
    { id: "infrastructure", label: "IT Infrastructure", icon: Cloud },
  ]

  const availableCompliance = [
    "HIPAA",
    "SOC 2 Type II",
    "NIST Cybersecurity Framework",
    "GDPR",
    "ISO 27001",
    "PCI DSS",
    "HITECH",
    "FDA 21 CFR Part 11",
  ]

  const handleFocusChange = (type, focusId) => {
    if (type === "security") {
      setSecurityFocus((prev) => (prev.includes(focusId) ? prev.filter((id) => id !== focusId) : [...prev, focusId]))
    } else {
      setUtilityFocus((prev) => (prev.includes(focusId) ? prev.filter((id) => id !== focusId) : [...prev, focusId]))
    }
  }

  const handleComplianceChange = (complianceId) => {
    setCompliance((prev) =>
      prev.includes(complianceId) ? prev.filter((id) => id !== complianceId) : [...prev, complianceId],
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Profile Settings</h1>
            <p className="text-cyan-100 mt-1">Manage your professional integrity platform profile</p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            className="bg-white/20 hover:bg-white/30 text-white border-white/20"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit className="h-4 w-4 mr-2" />
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Professional Identity Settings */}
        <Card className="bg-slate-900 border-slate-800 text-white">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-cyan-400" />
              <CardTitle className="text-lg">Professional Identity</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative">
                <Avatar className="h-16 w-16 border-2 border-cyan-400/20">
                  <AvatarImage src="/professional-avatar.png" />
                  <AvatarFallback className="bg-cyan-400/20 text-cyan-400 text-lg">EJ</AvatarFallback>
                </Avatar>
                {isEditing && (
                  <div className="absolute -bottom-1 -right-1 bg-cyan-500 rounded-full p-1 cursor-pointer hover:bg-cyan-600 transition-colors">
                    <Edit className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p className="text-white font-medium">Profile Photo</p>
                <p className="text-slate-400 text-sm">Upload a professional headshot</p>
                {isEditing && (
                  <div className="flex space-x-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
                    >
                      Upload Photo
                    </Button>
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                      Remove
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <Label className="text-slate-400 text-xs uppercase tracking-wide">Full Name</Label>
                {isEditing ? (
                  <Input defaultValue="Erika Johnson" className="bg-slate-800 border-slate-600 text-white mt-1" />
                ) : (
                  <p className="text-white font-medium mt-1">Erika Johnson</p>
                )}
              </div>

              <div>
                <Label className="text-slate-400 text-xs uppercase tracking-wide">Job Title</Label>
                {isEditing ? (
                  <Input
                    defaultValue="Healthcare Security Analyst"
                    className="bg-slate-800 border-slate-600 text-white mt-1"
                  />
                ) : (
                  <p className="text-white font-medium mt-1">Healthcare Security Analyst</p>
                )}
              </div>

              <div>
                <Label className="text-slate-400 text-xs uppercase tracking-wide">Email</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-300">erika@mercygeneral.com</span>
                  <Sparkles className="h-4 w-4 text-cyan-400" />
                </div>
              </div>
            </div>

            {isEditing && (
              <Button className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white mt-4">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Organization & Location Settings */}
        <Card className="bg-slate-900 border-slate-800 text-white">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-cyan-400" />
              <CardTitle className="text-lg">Organization & Location</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-slate-400 text-xs uppercase tracking-wide">Company</Label>
              {isEditing ? (
                <Input
                  defaultValue="Mercy General Hospital"
                  className="bg-slate-800 border-slate-600 text-white mt-1"
                />
              ) : (
                <p className="text-white font-medium mt-1">Mercy General Hospital</p>
              )}
            </div>

            <div>
              <Label className="text-slate-400 text-xs uppercase tracking-wide">Industry</Label>
              {isEditing ? (
                <Input defaultValue="Healthcare" className="bg-slate-800 border-slate-600 text-white mt-1" />
              ) : (
                <p className="text-white font-medium mt-1">Healthcare</p>
              )}
            </div>

            <div>
              <Label className="text-slate-400 text-xs uppercase tracking-wide">Organization</Label>
              {isEditing ? (
                <Input
                  defaultValue="Mercy General Hospital - IT Security Department"
                  className="bg-slate-800 border-slate-600 text-white mt-1"
                />
              ) : (
                <p className="text-white font-medium mt-1">Mercy General Hospital - IT Security Department</p>
              )}
            </div>

            <div>
              <Label className="text-slate-400 text-xs uppercase tracking-wide">Location</Label>
              {isEditing ? (
                <div className="flex items-center space-x-2 mt-1">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  <Input defaultValue="San Francisco, CA" className="bg-slate-800 border-slate-600 text-white flex-1" />
                </div>
              ) : (
                <div className="flex items-center space-x-2 mt-1">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  <span className="text-white font-medium">San Francisco, CA</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Protection & Verification Focus */}
        <Card className="bg-slate-900 border-slate-800 text-white">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-cyan-400" />
              <CardTitle className="text-lg">Protection & Verification Focus</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {securityFocusOptions.map((option) => {
                const Icon = option.icon
                const isSelected = securityFocus.includes(option.id)
                return (
                  <button
                    key={option.id}
                    onClick={() => handleFocusChange("security", option.id)}
                    className={`flex items-center p-3 rounded-lg border transition-all text-left ${
                      isSelected
                        ? "border-cyan-500 bg-cyan-500/10"
                        : "border-slate-600 bg-slate-800 hover:border-slate-500"
                    }`}
                  >
                    <Icon className={`w-4 h-4 mr-2 ${isSelected ? "text-cyan-400" : "text-slate-400"}`} />
                    <span className={`text-xs font-medium ${isSelected ? "text-cyan-300" : "text-slate-300"}`}>
                      {option.label}
                    </span>
                    {isSelected && <Check className="w-3 h-3 ml-auto text-cyan-400" />}
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Business Utility Focus */}
        <Card className="bg-slate-900 border-slate-800 text-white">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-cyan-400" />
              <CardTitle className="text-lg">Business Utility Focus</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {utilityFocusOptions.map((option) => {
                const Icon = option.icon
                const isSelected = utilityFocus.includes(option.id)
                return (
                  <button
                    key={option.id}
                    onClick={() => handleFocusChange("utility", option.id)}
                    className={`flex items-center p-3 rounded-lg border transition-all text-left ${
                      isSelected
                        ? "border-teal-500 bg-teal-500/10"
                        : "border-slate-600 bg-slate-800 hover:border-slate-500"
                    }`}
                  >
                    <Icon className={`w-4 h-4 mr-2 ${isSelected ? "text-teal-400" : "text-slate-400"}`} />
                    <span className={`text-xs font-medium ${isSelected ? "text-teal-300" : "text-slate-300"}`}>
                      {option.label}
                    </span>
                    {isSelected && <Check className="w-3 h-3 ml-auto text-teal-400" />}
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Professional Standards */}
        <Card className="bg-slate-900 border-slate-800 text-white">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-cyan-400" />
              <CardTitle className="text-lg">Professional Standards</CardTitle>
              <Sparkles className="h-4 w-4 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-2">
              {availableCompliance.map((framework) => {
                const isSelected = compliance.includes(framework)
                const isRecommended = ["HIPAA", "SOC 2 Type II", "NIST Cybersecurity Framework"].includes(framework)
                return (
                  <button
                    key={framework}
                    onClick={() => handleComplianceChange(framework)}
                    className={`flex items-center p-3 rounded-lg border transition-all text-left ${
                      isSelected
                        ? "border-cyan-500 bg-cyan-500/10"
                        : isRecommended
                          ? "border-cyan-400/30 bg-cyan-400/5 hover:border-cyan-400/50"
                          : "border-slate-600 bg-slate-800 hover:border-slate-500"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 mr-3 flex items-center justify-center rounded border ${
                        isSelected ? "border-cyan-500 bg-cyan-600" : "border-slate-400 bg-transparent"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className={`text-sm font-medium flex-1 ${isSelected ? "text-cyan-300" : "text-slate-300"}`}>
                      {framework}
                    </span>
                    {isRecommended && !isSelected && (
                      <Badge className="bg-cyan-500/20 text-cyan-400 text-xs">Recommended</Badge>
                    )}
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Notifications Settings */}
        <Card className="bg-slate-900 border-slate-800 text-white">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-cyan-400" />
              <CardTitle className="text-lg">Notifications</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Platform Updates</p>
                  <p className="text-slate-400 text-sm">New features and improvements</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator className="bg-slate-700" />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Consultation Insights</p>
                  <p className="text-slate-400 text-sm">Weekly summary of recommendations</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator className="bg-slate-700" />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Industry Updates</p>
                  <p className="text-slate-400 text-sm">Relevant industry news and trends</p>
                </div>
                <Switch />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Platform Integration */}
        <Card className="bg-slate-900 border-slate-800 text-white lg:col-span-2">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-2">
              <Key className="h-5 w-5 text-cyan-400" />
              <CardTitle className="text-lg">Platform Integration</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-slate-400 text-xs uppercase tracking-wide">Workspace Access</Label>
                <div className="mt-2 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Key className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-300 text-sm font-mono">
                      {showApiKey ? "ws-dojo-erika-mercy-general" : "••••••••••••••••••••"}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="h-6 w-6 p-0 text-slate-400 hover:text-white"
                    >
                      {showApiKey ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                    </Button>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
                    >
                      Reset Workspace
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
              </div>

              <div>
                <Label className="text-slate-400 text-xs uppercase tracking-wide">Active Integrations</Label>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between p-2 bg-slate-800 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                        <Database className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-white text-sm">Healthcare Analytics</span>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 text-xs">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-slate-800 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-cyan-500 rounded flex items-center justify-center">
                        <Shield className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-white text-sm">Compliance Monitoring</span>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 text-xs">Active</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

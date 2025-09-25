"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Shield, Users, Plus, X, Sparkles, CheckCircle2, Edit, Settings, Database, Globe } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"

interface InvitedMember {
  email: string
  role: string
}

const focusAreas = [
  // Security & Compliance Focus
  {
    id: "financial_protection",
    name: "Financial Protection",
    description: "Financial incident security validation",
    category: "Security & Compliance Focus",
  },
  {
    id: "network_security",
    name: "Network Security",
    description: "Firewall, IDS/IPS, and network monitoring",
    category: "Security & Compliance Focus",
  },
  {
    id: "identity_access",
    name: "Identity & Access Management",
    description: "SSO, MFA, and identity governance",
    category: "Security & Compliance Focus",
  },
  {
    id: "data_protection",
    name: "Data Protection",
    description: "DLP, encryption, and data governance",
    category: "Security & Compliance Focus",
  },
  {
    id: "cloud_security",
    name: "Cloud Security",
    description: "CSPM, CWPP, and multi-cloud security",
    category: "Security & Compliance Focus",
  },
  {
    id: "vulnerability_management",
    name: "Vulnerability Management",
    description: "Scanning, assessment, and remediation",
    category: "Security & Compliance Focus",
  },
  {
    id: "incident_response",
    name: "Incident Response",
    description: "SOAR, forensics, and incident management",
    category: "Security & Compliance Focus",
  },
  {
    id: "compliance_management",
    name: "Compliance Management",
    description: "GRC, audit, and regulatory compliance",
    category: "Security & Compliance Focus",
  },
  {
    id: "threat_intelligence",
    name: "Threat Intelligence",
    description: "Threat feeds, analysis, and hunting",
    category: "Security & Compliance Focus",
  },
  {
    id: "security_awareness",
    name: "Security Awareness",
    description: "Training, phishing simulation, and education",
    category: "Security & Compliance Focus",
  },
  {
    id: "application_security",
    name: "Application Security",
    description: "SAST, DAST, and application protection",
    category: "Security & Compliance Focus",
  },
  {
    id: "zero_trust",
    name: "Zero Trust Architecture",
    description: "Zero trust network and security frameworks",
    category: "Security & Compliance Focus",
  },

  // Business & Operations Focus
  {
    id: "business_intelligence",
    name: "Business Intelligence",
    description: "Analytics, reporting, and data visualization",
    category: "Business & Operations Focus",
  },
  {
    id: "collaboration_tools",
    name: "Collaboration Tools",
    description: "Communication, file sharing, and teamwork",
    category: "Business & Operations Focus",
  },
  {
    id: "project_management",
    name: "Project Management",
    description: "Planning, tracking, and resource management",
    category: "Business & Operations Focus",
  },
  {
    id: "customer_relationship",
    name: "Customer Relationship Management",
    description: "CRM, sales, and customer service tools",
    category: "Business & Operations Focus",
  },
  {
    id: "enterprise_resource",
    name: "Enterprise Resource Planning",
    description: "ERP, finance, and business process tools",
    category: "Business & Operations Focus",
  },
  {
    id: "human_resources",
    name: "Human Resources",
    description: "HR management, payroll, and employee tools",
    category: "Business & Operations Focus",
  },
  {
    id: "marketing_automation",
    name: "Marketing Automation",
    description: "Email marketing, campaigns, and lead generation",
    category: "Business & Operations Focus",
  },
  {
    id: "document_management",
    name: "Document Management",
    description: "Document storage, workflow, and collaboration",
    category: "Business & Operations Focus",
  },
  {
    id: "backup_recovery",
    name: "Backup & Recovery",
    description: "Data backup, disaster recovery, and continuity",
    category: "Business & Operations Focus",
  },
  {
    id: "monitoring_observability",
    name: "Monitoring & Observability",
    description: "System monitoring, logging, and performance",
    category: "Business & Operations Focus",
  },
  {
    id: "automation_orchestration",
    name: "Automation & Orchestration",
    description: "Workflow automation and process optimization",
    category: "Business & Operations Focus",
  },
  {
    id: "integration_platforms",
    name: "Integration Platforms",
    description: "API management, data integration, and connectivity",
    category: "Business & Operations Focus",
  },
]

const complianceStandards = [
  {
    id: "hipaa",
    name: "HIPAA",
    description: "Healthcare data protection and privacy",
    industries: ["Healthcare"],
    countries: ["USA"],
  },
  {
    id: "pci_dss",
    name: "PCI DSS",
    description: "Payment card industry data security",
    industries: ["Financial Services", "Retail", "*"],
    countries: ["*"],
  },
  {
    id: "sox",
    name: "SOX",
    description: "Sarbanes-Oxley financial reporting",
    industries: ["Financial Services", "*"],
    countries: ["USA"],
  },
  { id: "gdpr", name: "GDPR", description: "European data protection regulation", industries: ["*"], regions: ["EU"] },
  {
    id: "ccpa",
    name: "CCPA",
    description: "California consumer privacy act",
    industries: ["Technology", "Retail", "*"],
    countries: ["USA"],
  },
  {
    id: "nist_cybersecurity",
    name: "NIST Cybersecurity Framework",
    description: "National cybersecurity standards",
    industries: ["*"],
    countries: ["USA", "*"],
  },
  {
    id: "fisma",
    name: "FISMA",
    description: "Federal information security management",
    industries: ["Government", "*"],
    countries: ["USA"],
  },
  {
    id: "cis_controls",
    name: "CIS Controls",
    description: "Center for Internet Security authorization",
    industries: ["*"],
    countries: ["*"],
  },
  {
    id: "cobit",
    name: "COBIT",
    description: "IT governance and management framework",
    industries: ["*"],
    countries: ["*"],
  },
  {
    id: "itil",
    name: "ITIL",
    description: "IT service management best practices",
    industries: ["*"],
    countries: ["*"],
  },
  {
    id: "cmmc",
    name: "CMMC",
    description: "Cybersecurity maturity model certification",
    industries: ["Defense", "*"],
    countries: ["USA"],
  },
  {
    id: "nerc_cip",
    name: "NERC CIP",
    description: "Critical infrastructure protection",
    industries: ["Energy", "Utilities"],
    countries: ["USA"],
  },
  {
    id: "ffiec",
    name: "FFIEC",
    description: "Financial institution examination council",
    industries: ["Financial Services"],
    countries: ["USA"],
  },
  {
    id: "glba",
    name: "GLBA",
    description: "Gramm-Leach-Bliley Act financial privacy",
    industries: ["Financial Services"],
    countries: ["USA"],
  },
  {
    id: "ferpa",
    name: "FERPA",
    description: "Educational records privacy",
    industries: ["Education"],
    countries: ["USA"],
  },
  {
    id: "coso",
    name: "COSO",
    description: "Committee of Sponsoring Organizations framework",
    industries: ["*"],
    countries: ["*"],
  },
  {
    id: "basel_iii",
    name: "Basel III",
    description: "International banking regulations",
    industries: ["Financial Services"],
    countries: ["*"],
  },
  {
    id: "mifid_ii",
    name: "MiFID II",
    description: "Markets in Financial Instruments Directive",
    industries: ["Financial Services"],
    regions: ["EU"],
  },
  {
    id: "iso27001",
    name: "ISO 27001",
    description: "Information security management",
    industries: ["*"],
    countries: ["*"],
  },
  {
    id: "soc2",
    name: "SOC 2 Type II",
    description: "Service organization control",
    industries: ["*"],
    countries: ["USA", "*"],
  },
]

const industries = [
  "Healthcare",
  "Financial Services",
  "Technology",
  "Manufacturing",
  "Energy",
  "Retail",
  "Government",
  "Education",
  "Other",
]

const countries = [
  "USA",
  "Canada",
  "United Kingdom",
  "Germany",
  "France",
  "Australia",
  "Japan",
  "Singapore",
  "Saudi Arabia",
  "UAE",
  "Other",
]

export default function WorkspacesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [workspaceToDelete, setWorkspaceToDelete] = useState<string | null>(null)
  const [editingWorkspace, setEditingWorkspace] = useState<string | null>(null)

  const [workspaceName, setWorkspaceName] = useState("")
  const [workspaceType, setWorkspaceType] = useState("team")
  const [industry, setIndustry] = useState("")
  const [country, setCountry] = useState("")
  const [selectedFocusAreas, setSelectedFocusAreas] = useState<string[]>([])
  const [selectedStandards, setSelectedStandards] = useState<string[]>([])
  const [invitedMembers, setInvitedMembers] = useState<InvitedMember[]>([])
  const [currentEmail, setCurrentEmail] = useState("")
  const [currentRole, setCurrentRole] = useState("viewer")
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [storageLimit, setStorageLimit] = useState("50")
  const [computeResources, setComputeResources] = useState("medium")
  const [maxLabDuration, setMaxLabDuration] = useState("4")
  const [concurrentLabs, setConcurrentLabs] = useState("3")
  const [requireMFA, setRequireMFA] = useState(false)
  const [allowGuestAccess, setAllowGuestAccess] = useState(true)
  const [sessionTimeout, setSessionTimeout] = useState("8")
  const [ipWhitelist, setIpWhitelist] = useState("")

  const getRecommendedStandards = () => {
    return complianceStandards.filter(
      (standard) =>
        standard.industries.includes("*") ||
        standard.industries.includes(industry) ||
        standard.countries?.includes(country),
    )
  }

  const getAdditionalStandards = () => {
    const recommended = getRecommendedStandards().map((s) => s.id)
    return complianceStandards.filter((standard) => !recommended.includes(standard.id))
  }

  const handleDeleteWorkspace = (workspaceId: string) => {
    setWorkspaceToDelete(workspaceId)
    setIsDeleteOpen(true)
  }

  const confirmDeleteWorkspace = () => {
    setIsDeleteOpen(false)
    setWorkspaceToDelete(null)
  }

  const validateWorkspaceForm = () => {
    const errors: { [key: string]: string } = {}

    if (!workspaceName.trim()) {
      errors.workspaceName = "Workspace name is required"
    }

    if (workspaceName.length > 50) {
      errors.workspaceName = "Workspace name must be less than 50 characters"
    }

    if (!industry) {
      errors.industry = "Industry selection is required"
    }

    if (!country) {
      errors.country = "Country selection is required"
    }

    if (selectedStandards.length === 0) {
      errors.standards = "At least one compliance standard is required"
    }

    return errors
  }

  const handleSubmitWorkspace = () => {
    const errors = validateWorkspaceForm()
    setFormErrors(errors)

    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true)
      setTimeout(() => {
        setIsDialogOpen(false)
        setIsSubmitting(false)
        // Reset form
        setWorkspaceName("")
        setWorkspaceType("team")
        setIndustry("")
        setCountry("")
        setSelectedFocusAreas([])
        setSelectedStandards([])
        setInvitedMembers([])
        setCurrentEmail("")
        setCurrentRole("viewer")
        setFormErrors({})
        setEditingWorkspace(null)
      }, 1500)
    }
  }

  const handleEditWorkspace = (workspaceId: string, workspaceName: string) => {
    setEditingWorkspace(workspaceId)
    setWorkspaceName(workspaceName)
    if (workspaceId === "personal") {
      setWorkspaceType("personal")
      setWorkspaceName("Erika-Workspace")
    } else {
      setWorkspaceType("team")
    }
    setIndustry("Healthcare")
    setCountry("USA")
    setIsDialogOpen(true)
  }

  const handleCreateWorkspace = () => {
    setEditingWorkspace(null)
    setWorkspaceName("Erika-Workspace")
    setWorkspaceType("team") // Only team workspaces can be created
    setIndustry("Healthcare")
    setCountry("USA")
    setSelectedFocusAreas([])
    setSelectedStandards([])
    setIsDialogOpen(true)
  }

  const addMember = () => {
    if (currentEmail && !invitedMembers.find((m) => m.email === currentEmail)) {
      setInvitedMembers([...invitedMembers, { email: currentEmail, role: currentRole }])
      setCurrentEmail("")
      setCurrentRole("viewer")
    }
  }

  const removeMember = (index: number) => {
    setInvitedMembers(invitedMembers.filter((_, i) => i !== index))
  }

  const toggleFocusArea = (areaId: string) => {
    setSelectedFocusAreas((prev) => (prev.includes(areaId) ? prev.filter((id) => id !== areaId) : [...prev, areaId]))
  }

  const toggleStandard = (standardId: string) => {
    setSelectedStandards((prev) =>
      prev.includes(standardId) ? prev.filter((id) => id !== standardId) : [...prev, standardId],
    )
    if (formErrors.standards) {
      setFormErrors((prev) => ({ ...prev, standards: "" }))
    }
  }

  const getSecurityFocusAreas = () => focusAreas.filter((area) => area.category === "Security & Compliance Focus")
  const getBusinessFocusAreas = () => focusAreas.filter((area) => area.category === "Business & Operations Focus")

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Workspaces</h1>
          <p className="text-muted-foreground">Manage your evaluation environments and team collaboration</p>
          <p className="text-sm text-muted-foreground mt-1">Maximum 3 workspaces per user</p>
        </div>
        <Button onClick={handleCreateWorkspace} className="bg-gradient-to-r from-cyan-500 to-blue-500">
          <Plus className="w-4 h-4 mr-2" />
          Create Workspace
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold">Healthcare Compliance</CardTitle>
                  <p className="text-sm text-blue-600 font-medium">Personal Research</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEditWorkspace("personal", "Healthcare Compliance")}
                className="hover:bg-blue-100"
              >
                <Edit className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white/60 rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Industry:</span>
                  <p className="text-blue-600">Healthcare</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Country:</span>
                  <p className="text-blue-600">United States</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Focus Areas:</span>
                  <p className="text-blue-600">Security & Compliance</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Created:</span>
                  <p className="text-gray-600">2 weeks ago</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                HIPAA
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                SOC 2
              </Badge>
              <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                +2 more
              </Badge>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-blue-200">
              <span className="text-sm text-gray-600">Last active: 2 hours ago</span>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                Resume Project
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold">IT Security Team</CardTitle>
                  <p className="text-sm text-blue-600 font-medium">Team Collaboration</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditWorkspace("team", "IT Security Team")}
                  className="hover:bg-blue-100"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteWorkspace("team")}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white/60 rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Industry:</span>
                  <p className="text-blue-600">Technology</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Country:</span>
                  <p className="text-blue-600">United States</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Members:</span>
                  <p className="text-blue-600">4 active</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Created:</span>
                  <p className="text-gray-600">1 month ago</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                ISO 27001
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                NIST
              </Badge>
              <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                +3 more
              </Badge>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-blue-200">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center shadow-sm">
                  <span className="text-xs text-white font-medium">E</span>
                </div>
                <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center shadow-sm">
                  <span className="text-xs text-white font-medium">M</span>
                </div>
                <div className="w-8 h-8 bg-orange-500 rounded-full border-2 border-white flex items-center justify-center shadow-sm">
                  <span className="text-xs text-white font-medium">+2</span>
                </div>
              </div>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingWorkspace ? "Edit Workspace" : "Create New Workspace"}</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="roles" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              {workspaceType === "team" && <TabsTrigger value="roles">Roles & Members</TabsTrigger>}
              <TabsTrigger value="focus">Focus Areas</TabsTrigger>
              <TabsTrigger value="standards">Standards</TabsTrigger>
              <TabsTrigger value="configuration">Configuration</TabsTrigger>
            </TabsList>

            {workspaceType === "team" && (
              <TabsContent value="roles" className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="workspace-name">Workspace Name *</Label>
                    <Input
                      id="workspace-name"
                      placeholder="e.g., Erika-Workspace"
                      value={workspaceName}
                      onChange={(e) => {
                        setWorkspaceName(e.target.value)
                        if (formErrors.workspaceName) {
                          setFormErrors((prev) => ({ ...prev, workspaceName: "" }))
                        }
                      }}
                      className={formErrors.workspaceName ? "border-red-500" : ""}
                    />
                    {formErrors.workspaceName && <p className="text-sm text-red-600">{formErrors.workspaceName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>Industry *</Label>
                    <div className="relative">
                      <Select
                        value={industry}
                        onValueChange={(value) => {
                          setIndustry(value)
                          if (formErrors.industry) {
                            setFormErrors((prev) => ({ ...prev, industry: "" }))
                          }
                        }}
                      >
                        <SelectTrigger className={formErrors.industry ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {industries.map((ind) => (
                            <SelectItem key={ind} value={ind}>
                              {ind}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {industry && (
                        <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                          <Sparkles className="w-4 h-4 text-blue-500" />
                        </div>
                      )}
                    </div>
                    {formErrors.industry && <p className="text-sm text-red-600">{formErrors.industry}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>Country *</Label>
                    <div className="relative">
                      <Select
                        value={country}
                        onValueChange={(value) => {
                          setCountry(value)
                          if (formErrors.country) {
                            setFormErrors((prev) => ({ ...prev, country: "" }))
                          }
                        }}
                      >
                        <SelectTrigger className={formErrors.country ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((ctry) => (
                            <SelectItem key={ctry} value={ctry}>
                              {ctry}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {country && (
                        <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                          <Sparkles className="w-4 h-4 text-blue-500" />
                        </div>
                      )}
                    </div>
                    {formErrors.country && <p className="text-sm text-red-600">{formErrors.country}</p>}
                  </div>

                  {/* Team Members Section */}
                  {workspaceType === "team" && (
                    <div className="space-y-4 pt-4 border-t">
                      <Label>Team Members</Label>

                      <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-blue-600">E</span>
                            </div>
                            <div>
                              <div className="font-medium">erika@mercygeneral.com</div>
                              <div className="text-sm text-muted-foreground">You (Owner)</div>
                            </div>
                          </div>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                            Admin
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-3 p-4 border rounded-lg">
                        <Label>Invite Team Members</Label>
                        <div className="flex space-x-2">
                          <Input
                            placeholder="colleague@mercygeneral.com"
                            value={currentEmail}
                            onChange={(e) => setCurrentEmail(e.target.value)}
                            className="flex-1"
                          />
                          <Select value={currentRole} onValueChange={setCurrentRole}>
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="viewer">Viewer</SelectItem>
                              <SelectItem value="editor">Editor</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button onClick={addMember} disabled={!currentEmail}>
                            Add
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Hint: Use your organization domain (@mercygeneral.com)
                        </p>
                      </div>

                      {invitedMembers.length > 0 && (
                        <div className="space-y-2">
                          <Label className="text-sm">Invited Members</Label>
                          {invitedMembers.map((member, index) => (
                            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                                  <span className="text-sm font-medium">{member.email[0].toUpperCase()}</span>
                                </div>
                                <span className="font-medium">{member.email}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline">{member.role}</Badge>
                                <Button variant="ghost" size="sm" onClick={() => removeMember(index)}>
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </TabsContent>
            )}

            <TabsContent value="focus" className="space-y-6">
              <div className="space-y-6">
                {/* Security & Compliance Focus */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-blue-500" />
                    <Label className="text-base font-medium">Security & Compliance Focus</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Select security and compliance areas for evaluation and testing
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {getSecurityFocusAreas().map((area) => (
                      <div
                        key={area.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-all ${
                          selectedFocusAreas.includes(area.id)
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                        onClick={() => toggleFocusArea(area.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{area.name}</div>
                          {selectedFocusAreas.includes(area.id) && <CheckCircle2 className="w-4 h-4 text-blue-500" />}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">{area.description}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Business & Operations Focus */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Settings className="w-5 h-5 text-blue-500" />
                    <Label className="text-base font-medium">Business & Operations Focus</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">Select business and operational tools for evaluation</p>
                  <div className="grid grid-cols-2 gap-3">
                    {getBusinessFocusAreas().map((area) => (
                      <div
                        key={area.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-all ${
                          selectedFocusAreas.includes(area.id)
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                        onClick={() => toggleFocusArea(area.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{area.name}</div>
                          {selectedFocusAreas.includes(area.id) && <CheckCircle2 className="w-4 h-4 text-blue-500" />}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">{area.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="standards" className="space-y-6">
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-blue-500" />
                  <Label className="text-base font-medium">Compliance & Regulatory Standards</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Select applicable compliance frameworks and standards for your workspace.
                  <br />
                  <span className="text-blue-600 font-medium">
                    Note: These standards apply globally and will be filtered based on your selected country's
                    requirements.
                  </span>
                </p>

                {formErrors.standards && <p className="text-sm text-red-600">{formErrors.standards}</p>}

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    {complianceStandards.map((standard) => (
                      <div
                        key={standard.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-all ${
                          selectedStandards.includes(standard.id)
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                            : "border-blue-200 hover:border-blue-300"
                        }`}
                        onClick={() => toggleStandard(standard.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{standard.name}</div>
                          {selectedStandards.includes(standard.id) && (
                            <CheckCircle2 className="w-4 h-4 text-blue-500" />
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">{standard.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="configuration" className="space-y-6">
              <div className="space-y-6">
                {/* Resource Management */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Database className="w-5 h-5 text-blue-500" />
                    <Label className="text-base font-medium">Resource Management</Label>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Storage Limit (GB)</Label>
                      <Select value={storageLimit} onValueChange={setStorageLimit}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="25">25 GB</SelectItem>
                          <SelectItem value="50">50 GB</SelectItem>
                          <SelectItem value="100">100 GB</SelectItem>
                          <SelectItem value="250">250 GB</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Compute Resources</Label>
                      <Select value={computeResources} onValueChange={setComputeResources}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small (2 vCPU, 4GB RAM)</SelectItem>
                          <SelectItem value="medium">Medium (4 vCPU, 8GB RAM)</SelectItem>
                          <SelectItem value="large">Large (8 vCPU, 16GB RAM)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Max Lab Duration (hours)</Label>
                      <Select value={maxLabDuration} onValueChange={setMaxLabDuration}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2">2 hours</SelectItem>
                          <SelectItem value="4">4 hours</SelectItem>
                          <SelectItem value="8">8 hours</SelectItem>
                          <SelectItem value="24">24 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Concurrent Labs</Label>
                      <Select value={concurrentLabs} onValueChange={setConcurrentLabs}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Lab</SelectItem>
                          <SelectItem value="3">3 Labs</SelectItem>
                          <SelectItem value="5">5 Labs</SelectItem>
                          <SelectItem value="10">10 Labs</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Security & Access Control */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-blue-500" />
                    <Label className="text-base font-medium">Security & Access Control</Label>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Require Multi-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">All workspace members must use MFA</p>
                      </div>
                      <Switch checked={requireMFA} onCheckedChange={setRequireMFA} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Allow Guest Access</Label>
                        <p className="text-sm text-muted-foreground">Temporary access for external users</p>
                      </div>
                      <Switch checked={allowGuestAccess} onCheckedChange={setAllowGuestAccess} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Session Timeout (hours)</Label>
                        <Select value={sessionTimeout} onValueChange={setSessionTimeout}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 hour</SelectItem>
                            <SelectItem value="4">4 hours</SelectItem>
                            <SelectItem value="8">8 hours</SelectItem>
                            <SelectItem value="24">24 hours</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>IP Whitelist (Optional)</Label>
                        <Input
                          placeholder="192.168.1.0 / 24, 10.0.0.0 / 8"
                          value={ipWhitelist}
                          onChange={(e) => setIpWhitelist(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Integration Settings */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Globe className="w-5 h-5 text-blue-500" />
                    <Label className="text-base font-medium">Integration Settings</Label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Require Multi-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">All workspace members must use MFA</p>
                    </div>
                    <Switch checked={false} />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmitWorkspace}
              disabled={isSubmitting}
              className="bg-gradient-to-r from-cyan-500 to-blue-500"
            >
              {isSubmitting ? "Saving..." : editingWorkspace ? "Update Workspace" : "Create Workspace"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Workspace</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">
            Are you sure you want to delete this workspace? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteWorkspace}>
              Delete Workspace
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

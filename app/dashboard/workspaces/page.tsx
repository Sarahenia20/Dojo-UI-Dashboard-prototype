"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Shield, Users, Plus, BarChart3, X, Sparkles, CheckCircle2, Edit } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface InvitedMember {
  email: string
  role: string
}

export default function WorkspacesPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [workspaceToDelete, setWorkspaceToDelete] = useState<string | null>(null)
  const [editingWorkspace, setEditingWorkspace] = useState<string | null>(null)
  const [workspaceName, setWorkspaceName] = useState("")
  const [workspaceDescription, setWorkspaceDescription] = useState("")
  const [invitedMembers, setInvitedMembers] = useState<InvitedMember[]>([])
  const [currentEmail, setCurrentEmail] = useState("")
  const [currentRole, setCurrentRole] = useState("viewer")

  const [securityFocus, setSecurityFocus] = useState<string[]>(["endpoint-protection", "network-security"])
  const [businessFocus, setBusinessFocus] = useState<string[]>(["productivity-tools"])
  const [complianceStandards, setComplianceStandards] = useState<string[]>(["iso-27001", "nca-framework"])

  const handleEmailKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentEmail.trim()) {
      e.preventDefault()
      const email = currentEmail.trim()
      if (email.includes("@mercygeneral.com") && !invitedMembers.find((m) => m.email === email)) {
        setInvitedMembers([...invitedMembers, { email, role: currentRole }])
        setCurrentEmail("")
        setCurrentRole("viewer")
      }
    }
  }

  const removeMember = (emailToRemove: string) => {
    setInvitedMembers(invitedMembers.filter((member) => member.email !== emailToRemove))
  }

  const updateMemberRole = (email: string, newRole: string) => {
    setInvitedMembers(invitedMembers.map((member) => (member.email === email ? { ...member, role: newRole } : member)))
  }

  const toggleFocus = (category: "security" | "business", item: string) => {
    if (category === "security") {
      setSecurityFocus((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]))
    } else {
      setBusinessFocus((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]))
    }
  }

  const toggleCompliance = (standard: string) => {
    setComplianceStandards((prev) =>
      prev.includes(standard) ? prev.filter((s) => s !== standard) : [...prev, standard],
    )
  }

  const openEditDialog = (workspaceId: string) => {
    setEditingWorkspace(workspaceId)
    if (workspaceId === "personal") {
      setWorkspaceName("Erika Workspace")
      setWorkspaceDescription("Your personal workspace for professional tools and analysis")
    } else {
      setWorkspaceName("TechCorp Security")
      setWorkspaceDescription("Team workspace for security analysis and collaboration")
      setInvitedMembers([
        { email: "john.doe@mercygeneral.com", role: "editor" },
        { email: "sarah.smith@mercygeneral.com", role: "viewer" },
        { email: "mike.johnson@mercygeneral.com", role: "admin" },
      ])
    }
    setIsEditOpen(true)
  }

  const handleDeleteWorkspace = (workspaceName: string) => {
    setWorkspaceToDelete(workspaceName)
    setIsDeleteOpen(true)
  }

  const confirmDeleteWorkspace = () => {
    console.log(`Deleting workspace: ${workspaceToDelete}`)
    // Here you would actually delete the workspace
    setIsDeleteOpen(false)
    setWorkspaceToDelete(null)
  }

  const securityFocusOptions = [
    { id: "endpoint-protection", label: "Endpoint Protection", description: "Device security and threat detection" },
    { id: "network-security", label: "Network Security", description: "Firewall, IDS/IPS, and network monitoring" },
    { id: "data-protection", label: "Data Protection", description: "Encryption, DLP, and data governance" },
    { id: "identity-management", label: "Identity Management", description: "IAM, SSO, and access controls" },
    { id: "cloud-security", label: "Cloud Security", description: "Cloud infrastructure and service security" },
    { id: "compliance-management", label: "Compliance Management", description: "Regulatory compliance and auditing" },
  ]

  const businessFocusOptions = [
    { id: "productivity-tools", label: "Productivity Tools", description: "Office suites, collaboration platforms" },
    {
      id: "communication-platforms",
      label: "Communication Platforms",
      description: "Messaging, video conferencing, VoIP",
    },
    {
      id: "business-analytics",
      label: "Business Analytics",
      description: "BI tools, reporting, and data visualization",
    },
    { id: "process-automation", label: "Process Automation", description: "Workflow automation and RPA tools" },
    { id: "team-collaboration", label: "Team Collaboration", description: "Project management and team tools" },
    { id: "it-infrastructure", label: "IT Infrastructure", description: "Servers, networking, and system management" },
  ]

  const complianceOptions = [
    { id: "iso-27001", label: "ISO 27001", description: "Information security management", detected: true },
    {
      id: "nca-framework",
      label: "NCA Critical Infrastructure Framework",
      description: "Philippines critical infrastructure",
      detected: true,
    },
    { id: "pdpl", label: "PDPL", description: "Philippines Data Privacy Law", detected: true },
    { id: "hipaa", label: "HIPAA", description: "Healthcare information privacy" },
    { id: "gdpr", label: "GDPR", description: "European data protection regulation" },
    { id: "sox", label: "SOX", description: "Sarbanes-Oxley financial compliance" },
    { id: "pci-dss", label: "PCI DSS", description: "Payment card industry security" },
    { id: "nist", label: "NIST Framework", description: "Cybersecurity framework" },
    { id: "iso-22301", label: "ISO 22301", description: "Business continuity management" },
    { id: "iso-31000", label: "ISO 31000", description: "Risk management principles" },
    { id: "cobit", label: "COBIT", description: "IT governance and management" },
    { id: "itil", label: "ITIL", description: "IT service management" },
    { id: "coso", label: "COSO", description: "Internal control framework" },
    { id: "fisma", label: "FISMA", description: "Federal information security" },
    { id: "fedramp", label: "FedRAMP", description: "Federal cloud security" },
    { id: "ccpa", label: "CCPA", description: "California consumer privacy" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Workspace Management</h1>
          <p className="text-muted-foreground">Manage your workspaces and team collaboration</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-500">
              <Plus className="w-4 h-4 mr-2" />
              Create Workspace
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Workspace</DialogTitle>
            </DialogHeader>

            <Tabs defaultValue="team" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="team">Roles & Members</TabsTrigger>
                <TabsTrigger value="focus">Focus Areas</TabsTrigger>
                <TabsTrigger value="standards">Standards</TabsTrigger>
              </TabsList>

              <TabsContent value="team" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="workspace-name">Workspace Name</Label>
                    <Input
                      id="workspace-name"
                      placeholder="e.g., Marketing Team, Finance Professional"
                      value={workspaceName}
                      onChange={(e) => setWorkspaceName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="workspace-description">Description (Optional)</Label>
                    <Textarea
                      id="workspace-description"
                      placeholder="Brief description of this workspace's purpose..."
                      value={workspaceDescription}
                      onChange={(e) => setWorkspaceDescription(e.target.value)}
                      rows={2}
                    />
                  </div>

                  <div className="space-y-4">
                    <Label>Team Members & Roles</Label>

                    <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">E</span>
                          </div>
                          <div>
                            <div className="font-medium">erika@mercygeneral.com</div>
                            <div className="text-sm text-muted-foreground">You</div>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                          Admin
                        </Badge>
                      </div>
                    </div>

                    {/* Add Members */}
                    <div className="space-y-3">
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Enter team member email..."
                          value={currentEmail}
                          onChange={(e) => setCurrentEmail(e.target.value)}
                          onKeyPress={handleEmailKeyPress}
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
                      </div>

                      <div className="grid grid-cols-3 gap-3 text-xs">
                        <div className="p-2 bg-gray-50 dark:bg-gray-900 rounded">
                          <div className="font-medium text-gray-700 dark:text-gray-300">Viewer</div>
                          <div className="text-gray-500">View labs, reports, and searches</div>
                        </div>
                        <div className="p-2 bg-gray-50 dark:bg-gray-900 rounded">
                          <div className="font-medium text-gray-700 dark:text-gray-300">Editor</div>
                          <div className="text-gray-500">Create and modify content</div>
                        </div>
                        <div className="p-2 bg-gray-50 dark:bg-gray-900 rounded">
                          <div className="font-medium text-gray-700 dark:text-gray-300">Admin</div>
                          <div className="text-gray-500">Full workspace management</div>
                        </div>
                      </div>

                      {/* Invited Members List */}
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
                                <Select
                                  value={member.role}
                                  onValueChange={(role) => updateMemberRole(member.email, role)}
                                >
                                  <SelectTrigger className="w-24">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="viewer">Viewer</SelectItem>
                                    <SelectItem value="editor">Editor</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                  </SelectContent>
                                </Select>
                                <Button variant="ghost" size="sm" onClick={() => removeMember(member.email)}>
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="focus" className="space-y-6">
                {/* Security Focus Areas */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-blue-500" />
                    <Label className="text-base font-medium">Protection & Verification Focus</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Select areas where you evaluate protection and verification solutions
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {securityFocusOptions.map((option) => (
                      <div
                        key={option.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-all ${
                          securityFocus.includes(option.id)
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                        onClick={() => toggleFocus("security", option.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="font-medium">{option.label}</div>
                            {securityFocus.includes(option.id) && <CheckCircle2 className="w-4 h-4 text-blue-500" />}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">{option.description}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Business Utility Focus */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-blue-500" />
                    <Label className="text-base font-medium">Business Utility Focus</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">Select business tools and utilities you evaluate</p>
                  <div className="grid grid-cols-2 gap-3">
                    {businessFocusOptions.map((option) => (
                      <div
                        key={option.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-all ${
                          businessFocus.includes(option.id)
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                        onClick={() => toggleFocus("business", option.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="font-medium">{option.label}</div>
                            {businessFocus.includes(option.id) && <CheckCircle2 className="w-4 h-4 text-blue-500" />}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">{option.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="standards" className="space-y-6">
                {/* Professional Standards */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-blue-500" />
                    <Label className="text-base font-medium">Professional Standards</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Based on your industry (Healthcare) and location (Asia • Philippines), we've highlighted relevant
                    standards.
                  </p>

                  <div className="space-y-3">
                    <div className="text-sm font-medium text-blue-600">Recommended for your context:</div>
                    <div className="grid grid-cols-1 gap-2">
                      {complianceOptions
                        .filter((option) => option.detected)
                        .map((option) => (
                          <div
                            key={option.id}
                            className={`p-2 border rounded cursor-pointer transition-all ${
                              complianceStandards.includes(option.id)
                                ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                                : "border-blue-200 bg-blue-25"
                            }`}
                            onClick={() => toggleCompliance(option.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Sparkles className="w-3 h-3 text-blue-500" />
                                <div className="text-sm font-medium">{option.label}</div>
                                {complianceStandards.includes(option.id) && (
                                  <CheckCircle2 className="w-3 h-3 text-blue-500" />
                                )}
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground mt-1 ml-5">{option.description}</div>
                          </div>
                        ))}
                    </div>

                    <div className="text-sm font-medium text-gray-600 mt-6">Additional standards (if applicable):</div>
                    <div className="grid grid-cols-3 gap-2">
                      {complianceOptions
                        .filter((option) => !option.detected)
                        .map((option) => (
                          <div
                            key={option.id}
                            className={`p-2 border rounded cursor-pointer transition-all ${
                              complianceStandards.includes(option.id)
                                ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                                : "border-gray-200 hover:border-blue-300"
                            }`}
                            onClick={() => toggleCompliance(option.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-1">
                                <div className="text-sm font-medium">{option.label}</div>
                                {complianceStandards.includes(option.id) && (
                                  <CheckCircle2 className="w-3 h-3 text-blue-500" />
                                )}
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">{option.description}</div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex space-x-2 pt-4 border-t">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500"
                onClick={() => {
                  setIsCreateOpen(false)
                  // Reset form
                  setWorkspaceName("")
                  setWorkspaceDescription("")
                  setInvitedMembers([])
                  setCurrentEmail("")
                  setCurrentRole("viewer")
                  setSecurityFocus(["endpoint-protection", "network-security"])
                  setBusinessFocus(["productivity-tools"])
                  setComplianceStandards(["iso-27001", "nca-framework"])
                }}
              >
                Create Workspace
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Workspace</DialogTitle>
            </DialogHeader>

            <Tabs defaultValue="team" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="team">Roles & Members</TabsTrigger>
                <TabsTrigger value="focus">Focus Areas</TabsTrigger>
                <TabsTrigger value="standards">Standards</TabsTrigger>
              </TabsList>

              <TabsContent value="team" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-workspace-name">Workspace Name</Label>
                    <Input
                      id="edit-workspace-name"
                      value={workspaceName}
                      onChange={(e) => setWorkspaceName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-workspace-description">Description</Label>
                    <Textarea
                      id="edit-workspace-description"
                      value={workspaceDescription}
                      onChange={(e) => setWorkspaceDescription(e.target.value)}
                      rows={2}
                    />
                  </div>

                  {editingWorkspace !== "personal" && (
                    <div className="space-y-4">
                      <Label>Team Members & Roles</Label>

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

                      {invitedMembers.length > 0 && (
                        <div className="space-y-2">
                          <Label className="text-sm">Team Members</Label>
                          {invitedMembers.map((member, index) => (
                            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                                  <span className="text-sm font-medium">{member.email[0].toUpperCase()}</span>
                                </div>
                                <span className="font-medium">{member.email}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Select
                                  value={member.role}
                                  onValueChange={(role) => updateMemberRole(member.email, role)}
                                >
                                  <SelectTrigger className="w-24">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="viewer">Viewer</SelectItem>
                                    <SelectItem value="editor">Editor</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                  </SelectContent>
                                </Select>
                                <Button variant="ghost" size="sm" onClick={() => removeMember(member.email)}>
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

              <TabsContent value="focus" className="space-y-6">
                {/* Same focus areas content as create dialog */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-blue-500" />
                    <Label className="text-base font-medium">Protection & Verification Focus</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Select areas where you evaluate protection and verification solutions
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {securityFocusOptions.map((option) => (
                      <div
                        key={option.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-all ${
                          securityFocus.includes(option.id)
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                        onClick={() => toggleFocus("security", option.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="font-medium">{option.label}</div>
                            {securityFocus.includes(option.id) && <CheckCircle2 className="w-4 h-4 text-blue-500" />}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">{option.description}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Business Utility Focus */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-blue-500" />
                    <Label className="text-base font-medium">Business Utility Focus</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">Select business tools and utilities you evaluate</p>
                  <div className="grid grid-cols-2 gap-3">
                    {businessFocusOptions.map((option) => (
                      <div
                        key={option.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-all ${
                          businessFocus.includes(option.id)
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                        onClick={() => toggleFocus("business", option.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="font-medium">{option.label}</div>
                            {businessFocus.includes(option.id) && <CheckCircle2 className="w-4 h-4 text-blue-500" />}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">{option.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="standards" className="space-y-6">
                {/* Same standards content as create dialog */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-blue-500" />
                    <Label className="text-base font-medium">Professional Standards</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Based on your industry (Healthcare) and location (Asia • Philippines), we've highlighted relevant
                    standards.
                  </p>

                  <div className="space-y-3">
                    <div className="text-sm font-medium text-blue-600">Recommended for your context:</div>
                    <div className="grid grid-cols-1 gap-2">
                      {complianceOptions
                        .filter((option) => option.detected)
                        .map((option) => (
                          <div
                            key={option.id}
                            className={`p-2 border rounded cursor-pointer transition-all ${
                              complianceStandards.includes(option.id)
                                ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                                : "border-blue-200 bg-blue-25"
                            }`}
                            onClick={() => toggleCompliance(option.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Sparkles className="w-3 h-3 text-blue-500" />
                                <div className="text-sm font-medium">{option.label}</div>
                                {complianceStandards.includes(option.id) && (
                                  <CheckCircle2 className="w-3 h-3 text-blue-500" />
                                )}
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground mt-1 ml-5">{option.description}</div>
                          </div>
                        ))}
                    </div>

                    <div className="text-sm font-medium text-gray-600 mt-6">Additional standards (if applicable):</div>
                    <div className="grid grid-cols-3 gap-2">
                      {complianceOptions
                        .filter((option) => !option.detected)
                        .map((option) => (
                          <div
                            key={option.id}
                            className={`p-2 border rounded cursor-pointer transition-all ${
                              complianceStandards.includes(option.id)
                                ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                                : "border-gray-200 hover:border-blue-300"
                            }`}
                            onClick={() => toggleCompliance(option.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-1">
                                <div className="text-sm font-medium">{option.label}</div>
                                {complianceStandards.includes(option.id) && (
                                  <CheckCircle2 className="w-3 h-3 text-blue-500" />
                                )}
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">{option.description}</div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex space-x-2 pt-4 border-t">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500"
                onClick={() => {
                  setIsEditOpen(false)
                  setEditingWorkspace(null)
                }}
              >
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-red-600">Delete Workspace</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Are you sure you want to delete <strong>{workspaceToDelete}</strong>? This action cannot be undone.
              </p>
              <div className="bg-red-50 dark:bg-red-950 p-3 rounded-lg">
                <div className="text-sm text-red-800 dark:text-red-200">
                  <strong>This will permanently delete:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>All lab environments and configurations</li>
                    <li>Product search history and saved results</li>
                    <li>Team member access and permissions</li>
                    <li>Reports and analysis data</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex space-x-2 pt-4">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setIsDeleteOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" className="flex-1" onClick={confirmDeleteWorkspace}>
                Delete Workspace
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Workspace Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-cyan-500" />
              <div>
                <div className="text-2xl font-bold">2</div>
                <div className="text-sm text-muted-foreground">Active Workspaces</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">6</div>
                <div className="text-sm text-muted-foreground">Team Members</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-8 w-8 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">15</div>
                <div className="text-sm text-muted-foreground">Active Labs</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Simplified Workspace Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <span>Erika Workspace</span>
                    <Badge variant="secondary">Personal</Badge>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">Your default workspace</p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => openEditDialog("personal")}>
                <Edit className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-lg font-bold text-cyan-600">5</div>
                <div className="text-xs text-muted-foreground">Active Labs</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">12</div>
                <div className="text-xs text-muted-foreground">Searches</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">8</div>
                <div className="text-xs text-muted-foreground">Reports</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Resource Usage</span>
                <span className="text-cyan-600 font-medium">6.5 GB</span>
              </div>
              <Progress value={65} className="h-2" />
              <div className="text-xs text-muted-foreground">Last active: 2 hours ago</div>
            </div>
          </CardContent>
        </Card>

        {/* TechCorp Security Workspace */}
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <span>TechCorp Security</span>
                    <Badge variant="secondary">Team</Badge>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">5 team members</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => openEditDialog("team")}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-red-50 hover:border-red-200 dark:hover:bg-red-950/50 bg-transparent"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteWorkspace("TechCorp Security")
                  }}
                >
                  <X className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">18</div>
                <div className="text-xs text-muted-foreground">Active Labs</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">47</div>
                <div className="text-xs text-muted-foreground">Searches</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">23</div>
                <div className="text-xs text-muted-foreground">Reports</div>
              </div>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <div className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">Network Security Testing</div>
              <div className="flex items-center justify-between text-xs text-blue-600">
                <span>25 minutes remaining</span>
                <span>45% complete</span>
              </div>
              <Progress value={45} className="h-2 mt-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

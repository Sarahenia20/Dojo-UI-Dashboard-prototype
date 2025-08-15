"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Shield,
  Users,
  Settings,
  Mail,
  Plus,
  Activity,
  BarChart3,
  Sparkles,
  CheckCircle,
  Building,
  X,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function WorkspacesPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [workspaceName, setWorkspaceName] = useState("")
  const [workspaceDescription, setWorkspaceDescription] = useState("")
  const [inviteEmails, setInviteEmails] = useState<string[]>([])
  const [currentEmail, setCurrentEmail] = useState("")
  const [selectedCompliance, setSelectedCompliance] = useState([
    "NCA Critical Infrastructure Framework",
    "PDPL",
    "ISO 27001",
  ])
  const [securityFocus, setSecurityFocus] = useState(["Endpoint Protection", "Network Security"])
  const [utilityFocus, setUtilityFocus] = useState(["Productivity Tools"])

  const handleEmailKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentEmail.trim()) {
      e.preventDefault()
      const email = currentEmail.trim()
      if (email.includes("@mercygeneral.com") && !inviteEmails.includes(email)) {
        setInviteEmails([...inviteEmails, email])
        setCurrentEmail("")
      }
    }
  }

  const removeEmail = (emailToRemove: string) => {
    setInviteEmails(inviteEmails.filter((email) => email !== emailToRemove))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Workspace Management</h1>
          <p className="text-muted-foreground">Manage your workspaces, team members, and settings</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-cyan-500 to-teal-500">
              <Plus className="w-4 h-4 mr-2" />
              Create Workspace
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Workspace</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="workspace-name">Workspace Name</Label>
                <Input
                  id="workspace-name"
                  placeholder="e.g., Marketing SecOps, Finance Team"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Choose a descriptive name for your team or project</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="workspace-description">Description (Optional)</Label>
                <Textarea
                  id="workspace-description"
                  placeholder="Brief description of this workspace's purpose..."
                  value={workspaceDescription}
                  onChange={(e) => setWorkspaceDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="invite-emails">Invite Team Members</Label>
                <div className="space-y-2">
                  <Input
                    id="invite-emails"
                    placeholder="Type email and press Enter to add..."
                    value={currentEmail}
                    onChange={(e) => setCurrentEmail(e.target.value)}
                    onKeyPress={handleEmailKeyPress}
                  />
                  {inviteEmails.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {inviteEmails.map((email, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {email}
                          <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => removeEmail(email)} />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Only emails from your domain (@mercygeneral.com) can be invited. Users will get access when they sign
                  up.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-cyan-500" />
                  <span className="text-sm font-medium">Professional Standards</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Based on your industry (Healthcare) and location (Asia • Philippines). You can modify these for this
                  workspace.
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium text-cyan-600">Recommended for your context:</div>
                  <div className="space-y-2">
                    {["NCA Critical Infrastructure Framework", "PDPL", "ISO 27001"].map((standard) => (
                      <div
                        key={standard}
                        className="flex items-center space-x-2 p-2 bg-cyan-50 dark:bg-cyan-950 rounded border border-cyan-200 dark:border-cyan-800"
                      >
                        <Checkbox
                          checked={selectedCompliance.includes(standard)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedCompliance([...selectedCompliance, standard])
                            } else {
                              setSelectedCompliance(selectedCompliance.filter((s) => s !== standard))
                            }
                          }}
                        />
                        <span className="text-sm">{standard}</span>
                        <Sparkles className="w-3 h-3 text-cyan-500 ml-auto" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Additional standards (if applicable):</div>
                  <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                    {[
                      "ABNT Standards",
                      "ACPR Guidelines",
                      "ACSC Guidelines",
                      "ANSSI Framework",
                      "BDSG",
                      "BCB Guidelines",
                      "BSI C5",
                      "BaFin Guidelines",
                      "BIS Standards",
                    ].map((standard) => (
                      <div key={standard} className="flex items-center space-x-2">
                        <Checkbox
                          checked={selectedCompliance.includes(standard)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedCompliance([...selectedCompliance, standard])
                            } else {
                              setSelectedCompliance(selectedCompliance.filter((s) => s !== standard))
                            }
                          }}
                        />
                        <span className="text-xs">{standard}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-cyan-500" />
                  <span className="text-sm font-medium">Usage Focus Areas</span>
                </div>

                <div>
                  <div className="text-sm font-medium text-cyan-600 mb-2">Healthcare Security Path</div>
                  <div className="text-xs text-muted-foreground mb-2">
                    Select areas where you evaluate protection and verification solutions
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Endpoint Protection",
                      "Network Security",
                      "Data Protection",
                      "Cloud Security",
                      "Identity Management",
                      "Compliance Management",
                    ].map((area) => (
                      <div
                        key={area}
                        className={`p-2 border rounded text-xs cursor-pointer transition-colors ${
                          securityFocus.includes(area)
                            ? "bg-cyan-50 dark:bg-cyan-950 border-cyan-200 dark:border-cyan-800 text-cyan-700 dark:text-cyan-300"
                            : "hover:bg-accent/50"
                        }`}
                        onClick={() => {
                          if (securityFocus.includes(area)) {
                            setSecurityFocus(securityFocus.filter((f) => f !== area))
                          } else {
                            setSecurityFocus([...securityFocus, area])
                          }
                        }}
                      >
                        <div className="flex items-center space-x-2">
                          <Shield className="w-3 h-3" />
                          <span>{area}</span>
                          {securityFocus.includes(area) && <CheckCircle className="w-3 h-3 ml-auto" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-orange-600 mb-2">Business Utility Focus</div>
                  <div className="text-xs text-muted-foreground mb-2">
                    Select business tools and utilities you evaluate
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Productivity Tools",
                      "Communication Platforms",
                      "Business Analytics",
                      "Process Automation",
                      "Team Collaboration",
                      "IT Infrastructure",
                    ].map((area) => (
                      <div
                        key={area}
                        className={`p-2 border rounded text-xs cursor-pointer transition-colors ${
                          utilityFocus.includes(area)
                            ? "bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-300"
                            : "hover:bg-accent/50"
                        }`}
                        onClick={() => {
                          if (utilityFocus.includes(area)) {
                            setUtilityFocus(utilityFocus.filter((f) => f !== area))
                          } else {
                            setUtilityFocus([...utilityFocus, area])
                          }
                        }}
                      >
                        <div className="flex items-center space-x-2">
                          <Building className="w-3 h-3" />
                          <span>{area}</span>
                          {utilityFocus.includes(area) && <CheckCircle className="w-3 h-3 ml-auto" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-teal-500"
                  onClick={() => {
                    // Handle workspace creation
                    setIsCreateOpen(false)
                    setWorkspaceName("")
                    setWorkspaceDescription("")
                    setInviteEmails([])
                    setCurrentEmail("")
                    setSelectedCompliance(["NCA Critical Infrastructure Framework", "PDPL", "ISO 27001"])
                    setSecurityFocus(["Endpoint Protection", "Network Security"])
                    setUtilityFocus(["Productivity Tools"])
                  }}
                >
                  Create Workspace
                </Button>
              </div>
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
              <BarChart3 className="h-8 w-8 text-green-500" />
              <div>
                <div className="text-2xl font-bold">15</div>
                <div className="text-sm text-muted-foreground">Active Labs</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Workspace Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Erika SecOps Workspace */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <span>Erika SecOps</span>
                    <Badge variant="secondary">Personal</Badge>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">Your default workspace</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="members">Members</TabsTrigger>
                <TabsTrigger value="compliance">Compliance</TabsTrigger>
                <TabsTrigger value="focus">Focus Areas</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-accent/50 rounded-lg">
                    <div className="text-sm font-medium">Resource Usage</div>
                    <div className="text-2xl font-bold text-cyan-600">6.5 GB</div>
                    <Progress value={65} className="h-2 mt-1" />
                  </div>
                  <div className="p-3 bg-accent/50 rounded-lg">
                    <div className="text-sm font-medium">Active Resources</div>
                    <div className="text-2xl font-bold text-blue-600">5</div>
                    <div className="text-xs text-muted-foreground">2 VMs, 1 Browser, 2 Tools</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Recent Activity</span>
                    <Badge variant="outline">
                      <Activity className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">Last search: SOAR comparison (2h ago)</div>
                  <div className="text-xs text-muted-foreground">Active: Firewall testing environment</div>
                </div>
              </TabsContent>

              <TabsContent value="members" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Team Members (1/5)</div>
                  <Button size="sm" variant="outline">
                    <Mail className="w-4 h-4 mr-1" />
                    Invite
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 p-2 border rounded">
                    <div className="w-8 h-8 bg-cyan-100 dark:bg-cyan-900 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-cyan-600">E</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">Erika (You)</div>
                      <div className="text-xs text-muted-foreground">erika@company.com</div>
                    </div>
                    <Badge>Owner</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <Input placeholder="Enter email to invite team member" />
                  <div className="text-xs text-muted-foreground">
                    Invited users will get access to this workspace's labs, searches, and reports.
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="compliance" className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-cyan-500" />
                    <span className="text-sm font-medium">Professional Standards</span>
                  </div>
                  <div className="text-xs text-muted-foreground mb-3">
                    Based on your industry (Healthcare) and location (Asia • Philippines)
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium text-cyan-600">Recommended for your context:</div>
                    <div className="space-y-2">
                      {[
                        { name: "NCA Critical Infrastructure Framework", checked: true },
                        { name: "PDPL", checked: true },
                        { name: "ISO 27001", checked: true },
                      ].map((standard, i) => (
                        <div
                          key={i}
                          className="flex items-center space-x-2 p-2 bg-cyan-50 dark:bg-cyan-950 rounded border border-cyan-200 dark:border-cyan-800"
                        >
                          <Checkbox checked={standard.checked} />
                          <span className="text-sm">{standard.name}</span>
                          <Sparkles className="w-3 h-3 text-cyan-500 ml-auto" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Additional standards (if applicable):</div>
                    <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                      {[
                        "ABNT Standards",
                        "ACPR Guidelines",
                        "ACSC Guidelines",
                        "ANSSI Framework",
                        "BDSG",
                        "BCB Guidelines",
                        "BSI C5",
                        "BaFin Guidelines",
                        "BIS Standards",
                      ].map((standard, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <Checkbox />
                          <span className="text-xs">{standard}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="focus" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <Shield className="w-4 h-4 text-cyan-500" />
                      <span className="text-sm font-medium">Healthcare Security Path</span>
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">
                      Select areas where you evaluate protection and verification solutions
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { name: "Endpoint Protection", selected: true },
                        { name: "Network Security", selected: true },
                        { name: "Data Protection", selected: false },
                        { name: "Cloud Security", selected: false },
                        { name: "Identity Management", selected: false },
                        { name: "Compliance Management", selected: false },
                      ].map((area, i) => (
                        <div
                          key={i}
                          className={`p-2 border rounded text-xs cursor-pointer ${
                            area.selected
                              ? "bg-cyan-50 dark:bg-cyan-950 border-cyan-200 dark:border-cyan-800 text-cyan-700 dark:text-cyan-300"
                              : "hover:bg-accent/50"
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <Shield className="w-3 h-3" />
                            <span>{area.name}</span>
                            {area.selected && <CheckCircle className="w-3 h-3 ml-auto" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <Building className="w-4 h-4 text-orange-500" />
                      <span className="text-sm font-medium">Business Utility Focus</span>
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">
                      Select business tools and utilities you evaluate
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { name: "Productivity Tools", selected: true },
                        { name: "Communication Platforms", selected: false },
                        { name: "Business Analytics", selected: false },
                        { name: "Process Automation", selected: false },
                        { name: "Team Collaboration", selected: false },
                        { name: "IT Infrastructure", selected: false },
                      ].map((area, i) => (
                        <div
                          key={i}
                          className={`p-2 border rounded text-xs cursor-pointer ${
                            area.selected
                              ? "bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-300"
                              : "hover:bg-accent/50"
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <Building className="w-3 h-3" />
                            <span>{area.name}</span>
                            {area.selected && <CheckCircle className="w-3 h-3 ml-auto" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* TechCorp Security Workspace */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <span>TechCorp Security</span>
                    <Badge variant="secondary">Team</Badge>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">Shared team workspace</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="members">Members (5)</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-accent/50 rounded-lg">
                    <div className="text-lg font-bold text-orange-600">18</div>
                    <div className="text-xs text-muted-foreground">Active Resources</div>
                  </div>
                  <div className="text-center p-3 bg-accent/50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">47</div>
                    <div className="text-xs text-muted-foreground">Searches</div>
                  </div>
                  <div className="text-center p-3 bg-accent/50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">23</div>
                    <div className="text-xs text-muted-foreground">Reports</div>
                  </div>
                </div>
                <div className="p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                  <div className="text-sm font-medium text-orange-800 dark:text-orange-200">
                    Network Security Testing - 25 minutes left
                  </div>
                  <Progress value={45} className="h-2 mt-2" />
                </div>
              </TabsContent>

              <TabsContent value="members" className="space-y-3">
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {[
                    { name: "John Smith", email: "john@techcorp.com", role: "Admin", initial: "J" },
                    { name: "Erika (You)", email: "erika@techcorp.com", role: "Member", initial: "E" },
                    { name: "Sarah Wilson", email: "sarah@techcorp.com", role: "Member", initial: "S" },
                    { name: "Mike Johnson", email: "mike@techcorp.com", role: "Member", initial: "M" },
                    { name: "Lisa Chen", email: "lisa@techcorp.com", role: "Member", initial: "L" },
                  ].map((member, i) => (
                    <div key={i} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-orange-600">{member.initial}</span>
                        </div>
                        <div>
                          <div className="text-sm font-medium">{member.name}</div>
                          <div className="text-xs text-muted-foreground">{member.email}</div>
                        </div>
                      </div>
                      <Badge variant={member.role === "Admin" ? "default" : "secondary"} className="text-xs">
                        {member.role}
                      </Badge>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="activity" className="space-y-3">
                <div className="space-y-2">
                  {[
                    { action: "Lab deployed", user: "John Smith", time: "2h ago", color: "green" },
                    { action: "Report generated", user: "Sarah Wilson", time: "4h ago", color: "blue" },
                    { action: "Search completed", user: "Mike Johnson", time: "6h ago", color: "orange" },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center space-x-3 p-2 border rounded">
                      <div className={`w-2 h-2 bg-${activity.color}-500 rounded-full`}></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{activity.action}</div>
                        <div className="text-xs text-muted-foreground">
                          by {activity.user} • {activity.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

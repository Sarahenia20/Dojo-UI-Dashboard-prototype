"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"
import { CheckCircle } from "lucide-react"
import {
  LayoutDashboard,
  Search,
  Zap,
  BarChart3,
  Settings,
  Moon,
  Sun,
  User,
  Building2,
  CreditCard,
  Bell,
  HelpCircle,
  Bug,
  LogOut,
  Users,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Product Search", href: "/dashboard/product-search", icon: Search },
  { name: "Samurai Labs", href: "/dashboard/labs", icon: Zap },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Workspaces", href: "/dashboard/workspaces", icon: Users },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mainSidebarCollapsed, setMainSidebarCollapsed] = useState(false)
  const [currentWorkspace, setCurrentWorkspace] = useState("Erika Workspace")

  const workspaces = [
    { name: "Erika Workspace", type: "Personal", icon: User, color: "cyan" },
    { name: "TechCorp Security", type: "Team", icon: Users, color: "blue" },
  ]

  const handleLeaveWorkspace = (workspaceName: string) => {
    if (workspaceName !== "Erika Workspace") {
      console.log(`Leaving workspace: ${workspaceName}`)
      if (currentWorkspace === workspaceName) {
        setCurrentWorkspace("Erika Workspace")
      }
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div
        className={`fixed inset-y-0 left-0 z-50 bg-card border-r border-border transition-all duration-300 ${
          mainSidebarCollapsed ? "w-16" : "w-64"
        }`}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setMainSidebarCollapsed(!mainSidebarCollapsed)}
          className="absolute -right-10 top-1/2 transform -translate-y-1/2 bg-white dark:bg-card border rounded-l-none rounded-r-lg h-12 w-10 p-0 shadow-md z-10"
        >
          {mainSidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>

        <div className="flex h-16 items-center px-6 border-b border-border">
          {mainSidebarCollapsed ? (
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center mx-auto">
              <Zap className="w-5 h-5 text-white" />
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-foreground">The SamurAI</span>
                <span className="text-lg font-bold text-cyan-600 dark:text-cyan-400 ml-1">DOJO</span>
              </div>
            </div>
          )}
        </div>

        <nav className="mt-6 px-3">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? "bg-gradient-to-r from-cyan-500/10 to-teal-500/10 text-cyan-600 dark:text-cyan-400"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    } ${mainSidebarCollapsed ? "justify-center" : ""}`}
                    title={mainSidebarCollapsed ? item.name : undefined}
                  >
                    <item.icon className={`h-5 w-5 ${mainSidebarCollapsed ? "" : "mr-3"}`} />
                    {!mainSidebarCollapsed && item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {!mainSidebarCollapsed && (
          <div className="absolute bottom-4 left-3 right-3">
            <div className="mb-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 mb-2">
                Current Workspace
              </p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full px-3 py-2 bg-accent/50 rounded-lg hover:bg-accent/70 transition-colors"
                  >
                    <div className="flex items-center space-x-3 w-full">
                      <div className="w-8 h-8 bg-cyan-100 dark:bg-cyan-900 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <p className="text-sm font-medium text-foreground truncate">{currentWorkspace}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {workspaces.find((w) => w.name === currentWorkspace)?.type || "Personal"}
                        </p>
                      </div>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="start" side="top">
                  {workspaces.map((workspace) => (
                    <DropdownMenuItem
                      key={workspace.name}
                      className="cursor-pointer p-3"
                      onClick={() => setCurrentWorkspace(workspace.name)}
                    >
                      <div className="flex items-center space-x-3 w-full">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            workspace.color === "cyan" ? "bg-cyan-100 dark:bg-cyan-900" : "bg-blue-100 dark:bg-blue-900"
                          }`}
                        >
                          <workspace.icon
                            className={`w-4 h-4 ${
                              workspace.color === "cyan"
                                ? "text-cyan-600 dark:text-cyan-400"
                                : "text-blue-600 dark:text-blue-400"
                            }`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{workspace.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{workspace.type}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          {currentWorkspace === workspace.name && <CheckCircle className="w-4 h-4 text-cyan-500" />}
                          {workspace.type === "Team" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 hover:bg-red-100 dark:hover:bg-red-900/50"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleLeaveWorkspace(workspace.name)
                              }}
                            >
                              <Trash2 className="w-3 h-3 text-red-500" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="text-center py-2 border-t border-border/50">
              <p className="text-xs text-slate-500 dark:text-slate-400">© 2025 SamurAI DOJO Inc.</p>
            </div>
          </div>
        )}
      </div>

      <div className={`transition-all duration-300 ${mainSidebarCollapsed ? "pl-16" : "pl-64"}`}>
        <header className="h-16 bg-background border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            {mainSidebarCollapsed && (
              <Button variant="ghost" size="sm" onClick={() => setMainSidebarCollapsed(false)} className="lg:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            )}
            <h1 className="text-xl font-semibold text-foreground">
              {navigation.find((item) => item.href === pathname)?.name || "Dashboard"}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
            </Button>

            <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full ring-2 ring-transparent hover:ring-cyan-500/20 transition-all"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/professional-avatar.png" />
                    <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold">
                      E
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-72 p-0" align="end" forceMount>
                <div className="bg-gradient-to-r from-cyan-500 to-teal-500 p-4 text-white">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 ring-2 ring-white/20">
                      <AvatarImage src="/professional-avatar.png" />
                      <AvatarFallback className="bg-white/20 text-white font-semibold">E</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white">Erika</p>
                      <p className="text-sm text-white truncate">Healthcare Security Analyst</p>
                      <p className="text-xs text-cyan-200 truncate">erika@mercygeneral.com</p>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <div className="space-y-1">
                    <DropdownMenuItem
                      asChild
                      className="cursor-pointer rounded-md p-3 hover:bg-cyan-50 dark:hover:bg-cyan-950/50 transition-colors"
                    >
                      <Link href="/dashboard/settings" className="flex items-center">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-900/50 mr-3">
                          <User className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                        </div>
                        <div>
                          <p className="font-medium">Profile Settings</p>
                          <p className="text-xs text-muted-foreground">Manage your account</p>
                        </div>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="cursor-pointer rounded-md p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 mr-3">
                        <Building2 className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                      </div>
                      <div>
                        <p className="font-medium">Organization</p>
                        <p className="text-xs text-muted-foreground">Mercy General Hospital</p>
                      </div>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="cursor-pointer rounded-md p-3 hover:bg-amber-50 dark:hover:bg-amber-950/50 transition-colors">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/50 mr-3">
                        <CreditCard className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <p className="font-medium">Billing & Usage</p>
                        <p className="text-xs text-muted-foreground">Pro Plan • $29/month</p>
                      </div>
                    </DropdownMenuItem>
                  </div>

                  <DropdownMenuSeparator className="my-2" />

                  <div className="space-y-1">
                    <DropdownMenuItem className="cursor-pointer rounded-md p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <HelpCircle className="mr-3 h-4 w-4 text-muted-foreground" />
                      <span>Help Center</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="cursor-pointer rounded-md p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <Bug className="mr-3 h-4 w-4 text-muted-foreground" />
                      <span>Report Bug</span>
                    </DropdownMenuItem>
                  </div>

                  <DropdownMenuSeparator className="my-2" />

                  <DropdownMenuItem className="cursor-pointer rounded-md p-3 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors text-red-600 dark:text-red-400">
                    <LogOut className="mr-3 h-4 w-4" />
                    <span className="font-medium">Sign Out</span>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}

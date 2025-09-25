"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Send, Bot, User, X } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
}

interface AIAssistantChatProps {
  context: "hardware" | "lab" | "scenario"
  className?: string
  onToggle?: (isOpen: boolean) => void
}

export function AIAssistantChat({ context, className = "", onToggle }: AIAssistantChatProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        context === "hardware"
          ? "I can help explain the infrastructure setup and guide you through the deployment process. What would you like to know about the lab configuration?"
          : context === "scenario"
            ? "I can help you understand attack scenarios, suggest combinations, and explain how different security tools respond to threats. What would you like to know?"
            : "Welcome to your lab environment! I can help you with PEM authentication, terminal commands, and accessing your security tools. How can I assist you?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")

  const getQuickActions = () => {
    if (context === "hardware") {
      return [
        { label: "Explain Infrastructure", action: "infrastructure" },
        { label: "Lab Features", action: "features" },
        { label: "Deployment Process", action: "deployment" },
      ]
    } else if (context === "scenario") {
      return [
        { label: "Attack Categories", action: "categories" },
        { label: "Tool Responses", action: "responses" },
        { label: "Configure Sequence", action: "sequence" },
      ]
    } else {
      return [
        { label: "PEM Help", action: "pem" },
        { label: "Terminal Guide", action: "terminal" },
        { label: "Tool Access", action: "tools" },
        { label: "Connection Steps", action: "connection" },
        { label: "Security Commands", action: "security" },
        { label: "Lab Status", action: "status" },
      ]
    }
  }

  const handleQuickAction = (action: string) => {
    let response = ""

    if (context === "hardware") {
      switch (action) {
        case "infrastructure":
          response =
            "Your lab infrastructure includes: Firewall (network security), Your Machine (local development), Lab Environment (security testing), and Security Tools cluster. Each component is connected via secure protocols."
          break
        case "features":
          response =
            "Standard Lab Features: Endpoint security tools testing, Traditional SIEM deployments, Windows-based security tools, Legacy application testing. Container Lab Features: Cloud-native security tools, Container security testing, Kubernetes security policies, Microservices security."
          break
        case "deployment":
          response =
            "Deployment process: 1) Infrastructure provisioning, 2) OS installation, 3) Security tools installation, 4) Configuration setup, 5) Email delivery with access credentials."
          break
      }
    } else if (context === "scenario") {
      switch (action) {
        case "categories":
          response =
            "Attack categories include: Network-Based (port scanning, intrusion simulation, DNS tunneling), Endpoint-Based (malware deployment, privilege escalation, persistence), Web Application (SQL injection, XSS, API exploitation)."
          break
        case "responses":
          response =
            "Each security tool responds differently: CrowdStrike focuses on endpoint detection, SentinelOne provides AI-powered analysis, Microsoft Defender offers integrated protection. The execution order shows which tools will respond to each attack."
          break
        case "sequence":
          response =
            "Configure your attack sequence by selecting scenarios from each category. The execution order at the bottom shows the planned sequence and which security tools will respond to each attack type."
          break
      }
    } else {
      switch (action) {
        case "pem":
          response =
            "PEM authentication: 1) Check your email for the PEM private key, 2) Copy the entire key including BEGIN/END lines, 3) Paste into the terminal authentication area, 4) Click Connect to establish SSH connection."
          break
        case "terminal":
          response =
            "Terminal access: After PEM authentication, you'll have full SSH access to your lab environment. You can execute commands, access security tools, and perform testing. Switch between Terminal and Desktop views as needed."
          break
        case "tools":
          response =
            "Security tools are pre-installed and configured in your lab environment. Access them via terminal commands or through the desktop interface. Each tool has its own configuration and can be used for different testing scenarios."
          break
        case "connection":
          response =
            "Connection Steps: 1) Open the email with your lab credentials, 2) Copy the PEM private key content, 3) Paste it in the text area above, 4) Click 'Connect to Lab'. If you need help, I can guide you through each step."
          break
        case "security":
          response =
            "Common security commands: 'sudo systemctl status crowdstrike-falcon' (check CrowdStrike), 'ps aux | grep sentinel' (check SentinelOne), 'tail -f /var/log/security.log' (monitor security logs), 'netstat -tulpn' (check network connections)."
          break
        case "status":
          response =
            "Lab Status: Infrastructure is active and ready for connection. Your security tools are pre-installed and configured. Session time remaining will be displayed once connected. Need help checking specific tool status?"
          break
      }
    }

    const assistantMessage: Message = {
      id: Date.now().toString(),
      content: response,
      sender: "assistant",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, assistantMessage])
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getContextualResponse(inputValue, context),
        sender: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
    }, 1000)
  }

  const getContextualResponse = (input: string, context: string): string => {
    const lowerInput = input.toLowerCase()

    if (context === "hardware") {
      if (lowerInput.includes("infrastructure") || lowerInput.includes("setup")) {
        return "The lab infrastructure is automatically provisioned based on your selected security tools. Each lab includes dedicated compute resources, network isolation, and pre-configured security tools ready for testing."
      }
      return "I can explain the lab architecture, help you understand the deployment process, or guide you through the infrastructure components."
    } else if (context === "scenario") {
      if (lowerInput.includes("attack") || lowerInput.includes("scenario")) {
        return "Attack scenarios are organized by category (Network, Endpoint, Web Application) and can be combined for comprehensive testing. Each scenario targets specific security controls and generates realistic attack patterns."
      }
      return "I can help you select appropriate attack scenarios, understand their impact, or suggest combinations based on your security tools."
    } else {
      if (lowerInput.includes("pem") || lowerInput.includes("auth")) {
        return "Once you receive your email with the PEM private key, paste it into the terminal authentication area. The PEM key will establish an SSH connection directly to your lab environment. Need help with the connection steps?"
      }
      if (lowerInput.includes("terminal") || lowerInput.includes("command")) {
        return "The terminal provides full SSH access to your lab environment. After PEM authentication, you'll have complete access to all installed security tools and can execute any commands needed for testing. Want some common security commands?"
      }
      if (lowerInput.includes("connect") || lowerInput.includes("connection")) {
        return "To connect: 1) Check your email for PEM credentials, 2) Copy the private key, 3) Paste it in the connection area, 4) Click 'Connect to Lab'. The connection is secure and gives you full terminal access."
      }
      if (lowerInput.includes("tool") || lowerInput.includes("security")) {
        return "Your security tools are pre-installed and ready: CrowdStrike Falcon, SentinelOne, Microsoft Defender, and others. Access them via terminal commands or desktop interface. Need specific tool commands?"
      }
      return "I'm here to help with lab access, terminal commands, security tool usage, and troubleshooting. What specific assistance do you need?"
    }
  }

  const handleToggle = (newState: boolean) => {
    setIsOpen(newState)
    onToggle?.(newState)
  }

  return (
    <>
      {isOpen && <div className="lg:hidden fixed inset-0 bg-black/50 z-30" onClick={() => handleToggle(false)} />}

      <div
        className={`fixed z-40 transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"} ${
          "lg:right-0 lg:top-0 lg:h-full lg:w-80 " + "right-0 top-0 h-full w-full sm:w-96"
        } ${className}`}
      >
        <Button
          onClick={() => handleToggle(!isOpen)}
          className={`hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full rounded-r-none rounded-l-lg bg-blue-600 hover:bg-blue-700 shadow-lg z-50 px-2`}
        >
          <Bot className="w-4 h-4" />
        </Button>

        {/* Sidebar Content */}
        <Card className="w-full h-full flex flex-col bg-white dark:bg-card shadow-xl border-l border-gray-200 dark:border-gray-700 rounded-none">
          <div className="flex items-center justify-between p-4 border-b bg-blue-50 dark:bg-blue-950/20">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-blue-600" />
              <span className="font-medium">Lab Assistant</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => handleToggle(false)} className="lg:hidden p-1 h-8 w-8">
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="p-4 border-b bg-gray-50 dark:bg-gray-900/20">
            <p className="text-xs text-muted-foreground mb-2">Quick Actions:</p>
            <div className="flex flex-wrap gap-2">
              {getQuickActions().map((action) => (
                <Button
                  key={action.action}
                  variant="outline"
                  size="sm"
                  className="text-xs h-7 bg-transparent"
                  onClick={() => handleQuickAction(action.action)}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.sender === "assistant" && <Bot className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />}
                <div
                  className={`max-w-[75%] p-3 rounded-lg text-sm leading-relaxed ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-sm"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-sm"
                  }`}
                >
                  {message.content}
                </div>
                {message.sender === "user" && (
                  <User className="w-6 h-6 text-gray-600 dark:text-gray-400 mt-1 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>

          <div className="p-4 border-t bg-gray-50 dark:bg-gray-900/20">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 text-sm"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button onClick={handleSendMessage} size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {!isOpen && (
        <Button
          onClick={() => handleToggle(true)}
          className="lg:hidden fixed bottom-4 right-4 z-30 rounded-full w-14 h-14 bg-blue-600 hover:bg-blue-700 shadow-lg"
        >
          <Bot className="w-6 h-6" />
        </Button>
      )}
    </>
  )
}

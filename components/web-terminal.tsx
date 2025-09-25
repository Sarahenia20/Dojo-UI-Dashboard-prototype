"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface WebTerminalProps {
  className?: string
  labName?: string
  onCommand?: (command: string) => void
}

export function WebTerminal({ className = "", labName = "healthcare-lab", onCommand }: WebTerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isReady, setIsReady] = useState(false)
  const [currentLine, setCurrentLine] = useState("")
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [output, setOutput] = useState<string[]>([])

  useEffect(() => {
    // Initialize terminal with welcome message
    const welcomeMessage = [
      "╔══════════════════════════════════════════════════════════════════════════════╗",
      "║                          🥷 SAMURAI LABS TERMINAL                            ║",
      "╚══════════════════════════════════════════════════════════════════════════════╝",
      "",
      "Welcome to your secure lab environment!",
      `Lab Instance: ${labName}`,
      "OS: Ubuntu 22.04.3 LTS",
      "Kernel: Linux 5.15.0-91-generic",
      "",
      "Security tools installed and ready:",
      "  • CrowdStrike Falcon Sensor",
      "  • Splunk Universal Forwarder",
      "  • Microsoft Defender for Endpoint",
      "  • Wireshark Network Analyzer",
      "",
      'Type "help" for available commands or "demo" for a security demo.',
      "",
    ]

    setOutput(welcomeMessage)
    setIsReady(true)

    // Focus input
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [labName])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      if (currentLine.trim()) {
        handleCommand(currentLine.trim())
        setCommandHistory((prev) => [...prev, currentLine.trim()])
        setHistoryIndex(-1)
      }
      setCurrentLine("")
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setCurrentLine(commandHistory[newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1)
          setCurrentLine("")
        } else {
          setHistoryIndex(newIndex)
          setCurrentLine(commandHistory[newIndex])
        }
      }
    }
  }

  const addOutput = (lines: string | string[]) => {
    const newLines = Array.isArray(lines) ? lines : [lines]
    setOutput((prev) => [...prev, `user@${labName}:~$ ${currentLine}`, ...newLines])
  }

  const handleCommand = (command: string) => {
    const cmd = command.toLowerCase().trim()

    if (onCommand) {
      onCommand(command)
    }

    switch (cmd) {
      case "help":
        addOutput([
          "Available commands:",
          "  help          - Show this help message",
          "  demo          - Run security demonstration",
          "  ls            - List directory contents",
          "  pwd           - Print working directory",
          "  whoami        - Display current user",
          "  ps            - Show running processes",
          "  netstat       - Display network connections",
          "  crowdstrike   - Check CrowdStrike status",
          "  splunk        - Check Splunk status",
          "  defender      - Check Defender status",
          "  wireshark     - Launch Wireshark",
          "  clear         - Clear terminal",
          "  exit          - Exit terminal",
        ])
        break

      case "demo":
        runSecurityDemo()
        break

      case "ls":
        addOutput([
          "total 24",
          "drwxr-xr-x 3 user user 4096 Dec 18 10:30 .",
          "drwxr-xr-x 3 root root 4096 Dec 18 10:25 ..",
          "drwxr-xr-x 2 user user 4096 Dec 18 10:30 security-tools",
          "drwxr-xr-x 2 user user 4096 Dec 18 10:30 logs",
          "-rw-r--r-- 1 user user  220 Dec 18 10:25 .bash_logout",
          "-rw-r--r-- 1 user user 3526 Dec 18 10:25 .bashrc",
          "-rw-r--r-- 1 user user  807 Dec 18 10:25 .profile",
        ])
        break

      case "pwd":
        addOutput("/home/user")
        break

      case "whoami":
        addOutput("user")
        break

      case "ps":
        addOutput([
          "  PID TTY          TIME CMD",
          " 1234 pts/0    00:00:01 bash",
          " 1456 pts/0    00:00:00 falcon-sensor",
          " 1789 pts/0    00:00:00 splunkd",
          " 2012 pts/0    00:00:00 mdatp",
          " 2345 pts/0    00:00:00 ps",
        ])
        break

      case "netstat":
        addOutput([
          "Active Internet connections (w/o servers)",
          "Proto Recv-Q Send-Q Local Address           Foreign Address         State",
          "tcp        0      0 10.0.1.100:22          203.0.113.1:54321       ESTABLISHED",
          "tcp        0      0 10.0.1.100:8089        splunk.company.com:443  ESTABLISHED",
        ])
        break

      case "crowdstrike":
        addOutput([
          "✓ CrowdStrike Falcon Sensor Status: RUNNING",
          "  Version: 7.10.0-16303",
          "  Last Contact: 2 minutes ago",
          "  Protection Status: ENABLED",
          "  Real-time Protection: ON",
        ])
        break

      case "splunk":
        addOutput([
          "✓ Splunk Universal Forwarder Status: RUNNING",
          "  Version: 9.1.2",
          "  Deployment Server: splunk.company.com:8089",
          "  Last Successful Connection: 1 minute ago",
          "  Data Inputs: 12 active",
        ])
        break

      case "defender":
        addOutput([
          "✓ Microsoft Defender for Endpoint Status: RUNNING",
          "  Version: 101.23112.0001",
          "  Cloud Protection: ENABLED",
          "  Real-time Protection: ON",
          "  Last Definition Update: 15 minutes ago",
        ])
        break

      case "wireshark":
        addOutput([
          "Launching Wireshark Network Analyzer...",
          "Starting capture on interface eth0...",
          "✓ Wireshark GUI launched successfully",
          "Access via VNC or X11 forwarding",
        ])
        break

      case "clear":
        setOutput([])
        return // Don't add command to output

      case "exit":
        addOutput("Goodbye! Lab session will remain active.")
        break

      default:
        if (cmd.startsWith("cd ")) {
          const dir = cmd.substring(3).trim()
          if (dir === "~" || dir === "/home/user" || dir === "") {
            addOutput("")
          } else if (dir === "security-tools") {
            addOutput("")
          } else {
            addOutput(`bash: cd: ${dir}: No such file or directory`)
          }
        } else if (cmd.includes("sudo")) {
          addOutput("Sudo access restricted in lab environment")
        } else {
          addOutput(`bash: ${command}: command not found`)
        }
        break
    }

    // Scroll to bottom
    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight
      }
    }, 100)
  }

  const runSecurityDemo = () => {
    addOutput("🔒 Starting Security Demonstration...")

    const demoSteps = [
      "[Step 1/5] Simulating malware detection...",
      "⚠️  ALERT: Suspicious file detected: /tmp/malware.exe",
      "✓ CrowdStrike Falcon: Threat quarantined automatically",
      "[Step 2/5] Checking network anomalies...",
      "⚠️  ALERT: Unusual outbound connection detected",
      "✓ Microsoft Defender: Connection blocked",
      "[Step 3/5] Analyzing system logs...",
      "✓ Splunk: Security events forwarded to SIEM",
      "✓ Correlation rules triggered",
      "[Step 4/5] Generating compliance report...",
      "✓ HIPAA compliance check: PASSED",
      "✓ PCI DSS compliance check: PASSED",
      "[Step 5/5] Demo complete!",
      "",
      "🎉 Security demonstration finished successfully!",
      "All security tools are working together to protect your environment.",
      "",
    ]

    let stepIndex = 0
    const runStep = () => {
      if (stepIndex < demoSteps.length) {
        setOutput((prev) => [...prev, demoSteps[stepIndex]])
        stepIndex++
        setTimeout(() => {
          runStep()
          // Scroll to bottom after each step
          if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight
          }
        }, 1000)
      }
    }

    setTimeout(runStep, 1000)
  }

  return (
    <div className={`bg-black rounded-lg overflow-hidden ${className}`}>
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2 text-white text-sm">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span>Terminal - {labName}</span>
        </div>
        <div className="text-xs text-gray-400">{isReady ? "Connected" : "Connecting..."}</div>
      </div>

      <div
        ref={terminalRef}
        className="h-96 p-4 overflow-y-auto font-mono text-sm text-green-400"
        style={{ minHeight: "400px", backgroundColor: "#0a0a0a" }}
      >
        {output.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap">
            {line.includes("✓") ? (
              <span className="text-green-400">{line}</span>
            ) : line.includes("⚠️") || line.includes("ALERT") ? (
              <span className="text-red-400">{line}</span>
            ) : line.includes("🔒") || line.includes("🎉") ? (
              <span className="text-yellow-400">{line}</span>
            ) : line.includes("[Step") ? (
              <span className="text-cyan-400">{line}</span>
            ) : line.startsWith("user@") ? (
              <span className="text-green-400">{line}</span>
            ) : (
              <span className="text-gray-300">{line}</span>
            )}
          </div>
        ))}

        {/* Current input line */}
        <div className="flex items-center">
          <span className="text-green-400">user@{labName}:~$ </span>
          <input
            ref={inputRef}
            type="text"
            value={currentLine}
            onChange={(e) => setCurrentLine(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-green-400 outline-none font-mono"
            autoComplete="off"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  )
}

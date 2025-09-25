"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Package, Maximize, Minimize, RotateCcw, Keyboard } from "lucide-react"

interface VNCClientProps {
  className?: string
  labName?: string
  onConnect?: () => void
  onDisconnect?: () => void
}

export function VNCClient({ className = "", labName = "healthcare-lab", onConnect, onDisconnect }: VNCClientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState("Connecting to VNC server...")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Simulate VNC connection process
    const connectToVNC = async () => {
      setIsConnecting(true)
      setConnectionStatus("Establishing secure connection...")

      // Simulate connection steps
      const steps = [
        { message: "Connecting to VNC server...", delay: 1000 },
        { message: "Authenticating with lab credentials...", delay: 1500 },
        { message: "Initializing desktop session...", delay: 2000 },
        { message: "Loading Windows Server 2022 desktop...", delay: 1000 },
      ]

      for (const step of steps) {
        setConnectionStatus(step.message)
        await new Promise((resolve) => setTimeout(resolve, step.delay))
      }

      // Simulate successful connection
      setIsConnected(true)
      setIsConnecting(false)
      setConnectionStatus("Desktop Connected")

      if (onConnect) {
        onConnect()
      }

      // Initialize mock desktop rendering
      initializeDesktop()
    }

    connectToVNC()
  }, [onConnect])

  const initializeDesktop = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = 1920
    canvas.height = 1080

    // Draw Windows Server 2022 desktop mockup
    drawDesktop(ctx)
  }

  const drawDesktop = (ctx: CanvasRenderingContext2D) => {
    // Clear canvas
    ctx.fillStyle = "#0078d4" // Windows blue background
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // Draw taskbar
    ctx.fillStyle = "#1f1f1f"
    ctx.fillRect(0, ctx.canvas.height - 48, ctx.canvas.width, 48)

    // Draw Start button
    ctx.fillStyle = "#0078d4"
    ctx.fillRect(8, ctx.canvas.height - 40, 40, 32)
    ctx.fillStyle = "white"
    ctx.font = "16px Segoe UI"
    ctx.fillText("⊞", 20, ctx.canvas.height - 20)

    // Draw taskbar icons
    const icons = ["📁", "🌐", "🛡️", "📊", "⚙️"]
    icons.forEach((icon, index) => {
      ctx.fillStyle = "#333"
      ctx.fillRect(60 + index * 48, ctx.canvas.height - 40, 40, 32)
      ctx.fillStyle = "white"
      ctx.font = "20px Segoe UI"
      ctx.fillText(icon, 70 + index * 48, ctx.canvas.height - 18)
    })

    // Draw system tray
    ctx.fillStyle = "white"
    ctx.font = "14px Segoe UI"
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    ctx.fillText(time, ctx.canvas.width - 80, ctx.canvas.height - 28)
    ctx.fillText("12/18/2024", ctx.canvas.width - 80, ctx.canvas.height - 12)

    // Draw desktop icons
    const desktopIcons = [
      { name: "CrowdStrike", icon: "🛡️", x: 50, y: 50 },
      { name: "Splunk", icon: "📊", x: 50, y: 150 },
      { name: "Defender", icon: "🔒", x: 50, y: 250 },
      { name: "Wireshark", icon: "🦈", x: 50, y: 350 },
      { name: "Event Viewer", icon: "📋", x: 50, y: 450 },
      { name: "PowerShell", icon: "💻", x: 50, y: 550 },
    ]

    desktopIcons.forEach((item) => {
      // Icon background
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)"
      ctx.fillRect(item.x - 5, item.y - 5, 70, 80)

      // Icon
      ctx.font = "32px Segoe UI"
      ctx.fillStyle = "white"
      ctx.fillText(item.icon, item.x + 15, item.y + 30)

      // Label
      ctx.font = "12px Segoe UI"
      ctx.fillStyle = "white"
      ctx.fillText(item.name, item.x, item.y + 55)
    })

    // Draw security status window (simulated)
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(300, 100, 400, 300)
    ctx.strokeStyle = "#0078d4"
    ctx.lineWidth = 2
    ctx.strokeRect(300, 100, 400, 300)

    // Window title bar
    ctx.fillStyle = "#0078d4"
    ctx.fillRect(300, 100, 400, 30)
    ctx.fillStyle = "white"
    ctx.font = "14px Segoe UI"
    ctx.fillText("Security Dashboard", 310, 120)

    // Window content
    ctx.fillStyle = "white"
    ctx.font = "12px Segoe UI"
    const statusLines = [
      "✓ CrowdStrike Falcon: Active",
      "✓ Microsoft Defender: Protected",
      "✓ Splunk Forwarder: Connected",
      "✓ Windows Firewall: Enabled",
      "",
      "Last Scan: 2 minutes ago",
      "Threats Detected: 0",
      "System Status: Secure",
    ]

    statusLines.forEach((line, index) => {
      ctx.fillText(line, 320, 160 + index * 20)
    })
  }

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isConnected) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = (event.clientX - rect.left) * (canvas.width / rect.width)
    const y = (event.clientY - rect.top) * (canvas.height / rect.height)

    setMousePosition({ x: Math.round(x), y: Math.round(y) })

    // Simulate click interaction
    console.log(`[v0] VNC click at (${Math.round(x)}, ${Math.round(y)})`)
  }

  const handleCanvasMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isConnected) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = (event.clientX - rect.left) * (canvas.width / rect.width)
    const y = (event.clientY - rect.top) * (canvas.height / rect.height)

    setMousePosition({ x: Math.round(x), y: Math.round(y) })
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const sendCtrlAltDel = () => {
    console.log("[v0] Sending Ctrl+Alt+Del to remote desktop")
    // In a real implementation, this would send the key combination to the VNC server
  }

  const takeScreenshot = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement("a")
    link.download = `${labName}-screenshot-${new Date().toISOString().slice(0, 19)}.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  const refreshConnection = () => {
    setIsConnecting(true)
    setIsConnected(false)
    setConnectionStatus("Refreshing connection...")

    setTimeout(() => {
      setIsConnected(true)
      setIsConnecting(false)
      setConnectionStatus("Desktop Connected")
      initializeDesktop()
    }, 2000)
  }

  return (
    <div className={`bg-black relative ${className}`} style={{ minHeight: "500px" }}>
      {/* Connection Status Overlay */}
      {isConnecting && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
            <div className="space-y-2">
              <h3 className="text-white text-lg font-semibold">Establishing Desktop Connection</h3>
              <p className="text-gray-300 text-sm">{connectionStatus}</p>
            </div>
          </div>
        </div>
      )}

      {/* VNC Canvas */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full cursor-crosshair ${isFullscreen ? "fixed inset-0 z-50" : ""}`}
        onClick={handleCanvasClick}
        onMouseMove={handleCanvasMouseMove}
        style={{
          minHeight: "500px",
          imageRendering: "pixelated",
          backgroundColor: "#0078d4",
        }}
      />

      {/* Desktop View Controls Overlay */}
      {isConnected && (
        <div
          className={`absolute top-4 right-4 flex items-center space-x-2 bg-black/70 rounded-lg p-2 ${isFullscreen ? "z-50" : ""}`}
        >
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 h-8 px-2"
            title="Toggle Fullscreen"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 h-8 px-2"
            title="Take Screenshot"
            onClick={takeScreenshot}
          >
            <Package className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 h-8 px-2"
            title="Send Ctrl+Alt+Del"
            onClick={sendCtrlAltDel}
          >
            <Keyboard className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 h-8 px-2"
            title="Refresh Connection"
            onClick={refreshConnection}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Connection Status Indicator */}
      {isConnected && (
        <div
          className={`absolute bottom-4 left-4 flex items-center space-x-2 bg-black/70 rounded-lg p-2 ${isFullscreen ? "z-50" : ""}`}
        >
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-white text-xs">{connectionStatus}</span>
          <span className="text-gray-400 text-xs">|</span>
          <span className="text-gray-400 text-xs">
            Mouse: {mousePosition.x}, {mousePosition.y}
          </span>
        </div>
      )}

      {/* Fullscreen Exit Button */}
      {isFullscreen && (
        <div className="absolute top-4 left-4 z-50">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 bg-black/70"
            onClick={toggleFullscreen}
          >
            Exit Fullscreen
          </Button>
        </div>
      )}
    </div>
  )
}

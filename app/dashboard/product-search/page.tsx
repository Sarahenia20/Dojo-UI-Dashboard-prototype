"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Sparkles,
  Send,
  Users,
  MessageCircle,
  Table,
  Bot,
  Paperclip,
  Download,
  Play,
  CheckCircle,
  Target,
  Building,
  Star,
  Lock,
  Compass,
  Search,
} from "lucide-react"

export default function ProductSearchPage() {
  const [activePhase, setActivePhase] = useState<"discovery" | "product-search">("discovery")
  const [activeTab, setActiveTab] = useState("search")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])
  const [hasConversation, setHasConversation] = useState(false)
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([])

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleSendMessage = () => {
    if (searchQuery.trim()) {
      if (!hasConversation) {
        setHasConversation(true)
      }

      const isUnrelated =
        !searchQuery.toLowerCase().includes("product") &&
        !searchQuery.toLowerCase().includes("solution") &&
        !searchQuery.toLowerCase().includes("software") &&
        !searchQuery.toLowerCase().includes("tool") &&
        !searchQuery.toLowerCase().includes("endpoint") &&
        !searchQuery.toLowerCase().includes("security")

      if (isUnrelated && Math.random() > 0.7) {
        setMessages([
          ...messages,
          { role: "user", content: searchQuery },
          {
            role: "assistant",
            content:
              "This question is unrelated to the current product search task. Please provide instructions related to finding business solutions and products. I can help you find software, tools, and platforms for your healthcare organization.",
          },
        ])
      } else {
        setMessages([
          ...messages,
          { role: "user", content: searchQuery },
          {
            role: "assistant",
            content:
              "Perfect! Based on your healthcare industry profile and the manufacturing context you've described, I've identified several endpoint protection solutions that excel in industrial environments with strict compliance requirements. These solutions are specifically chosen for organizations with similar operational complexity and regulatory needs.",
          },
        ])
      }
      setSearchQuery("")
    }
  }

  const handleProductSelection = (productId: number, category?: string) => {
    const product = allProducts.find((p) => p.id === productId)
    if (!product) return

    const conflictingProduct = selectedProducts.find((id) => {
      const selectedProduct = allProducts.find((p) => p.id === id)
      return selectedProduct && selectedProduct.category === product.category && id !== productId
    })

    if (conflictingProduct && !selectedProducts.includes(productId)) {
      const conflictingProductName = allProducts.find((p) => p.id === conflictingProduct)?.name
      alert(
        `🚫 Hey! These are similar categories - won't pass!\n\nYou already selected "${conflictingProductName}" from the ${product.category} category.\n\nYou can only test one solution per category at a time. Please deselect "${conflictingProductName}" first if you want to choose "${product.name}" instead.`,
      )
      return
    }

    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const handleLaunchLab = () => {
    if (selectedProducts.length > 0) {
      alert(
        `🚀 Launching lab environment with ${selectedProducts.length} selected products. Check your email for lab access credentials and setup instructions.`,
      )
    }
  }

  const handleLogoClick = (product: any) => {
    const mindMapModal = document.createElement("div")
    mindMapModal.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; 
      background: rgba(0,0,0,0.9); z-index: 9999; display: flex; 
      align-items: center; justify-content: center; cursor: pointer;
    `

    const mindMapImage = document.createElement("img")
    mindMapImage.src =
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-MZfMpJyO3bctL61S1YNSIoIOdcj9J7.png"
    mindMapImage.style.cssText = `
      max-width: 90vw; max-height: 90vh; border-radius: 12px; 
      animation: spin 20s linear infinite; transform-origin: center;
    `

    const style = document.createElement("style")
    style.textContent = "@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }"
    document.head.appendChild(style)

    mindMapModal.appendChild(mindMapImage)
    document.body.appendChild(mindMapModal)

    mindMapModal.onclick = () => {
      document.body.removeChild(mindMapModal)
      document.head.removeChild(style)
    }
  }

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
  }

  const handleDisabledTabClick = (tabName: string) => {
    alert(
      `🔒 ${tabName} is locked. Please start a conversation in Product Search to unlock recommendations and comparisons.`,
    )
  }

  const renderMindMapWheel = () => {
    return (
      <div className="relative w-full max-w-6xl mx-auto">
        <div className="text-center">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Pk9fQ23OYg7N3Q7tPWOiEZGm23qlQ1.png"
            alt="Product Discovery Mind Map"
            className="w-full max-w-5xl mx-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    )
  }

  const topProducts = [
    {
      id: 1,
      name: "CrowdStrike Falcon",
      vendor: "CrowdStrike",
      logo: "/crowdstrike-logo.png",
      score: 96,
      category: "Cloud-Native Endpoint Protection",
      price: "$8.99/endpoint/month",
      users: "2,800+ customers",
      compliance: ["PCI DSS", "SOC 2", "ISO 27001"],
    },
    {
      id: 2,
      name: "SentinelOne Singularity",
      vendor: "SentinelOne",
      logo: "/sentinelone-logo.png",
      score: 94,
      category: "AI-Powered Endpoint Security",
      price: "$7.50/endpoint/month",
      users: "2,100+ customers",
      compliance: ["PCI DSS", "SOC 2", "HITECH"],
    },
    {
      id: 3,
      name: "Microsoft Defender for Business",
      vendor: "Microsoft",
      logo: "/microsoft-logo.png",
      score: 91,
      category: "Integrated Endpoint Security",
      price: "$3.00/user/month",
      users: "600+ customers",
      compliance: ["PCI DSS", "SOC 2", "ISO 27001"],
    },
  ]

  const allProducts = [
    ...topProducts,
    {
      id: 4,
      name: "Rapid7 InsightIDR",
      category: "SIEM + Endpoint Detection",
      score: 89,
      price: "$95/user/month",
      users: "400+ customers",
      compliance: ["PCI DSS", "HITECH"],
    },
    {
      id: 5,
      name: "Securonix Cloud SIEM",
      category: "Cloud-Native SIEM",
      score: 88,
      price: "$110/user/month",
      users: "450+ customers",
      compliance: ["PCI DSS", "HITECH"],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 p-4 lg:p-6">
        <div className="flex-1 min-w-0 max-w-none lg:max-w-5xl">
          <div className="mb-6">
            <div className="flex items-center justify-center space-x-6 p-2 bg-slate-100 dark:bg-slate-800 rounded-xl w-fit mx-auto">
              <Button
                variant={activePhase === "discovery" ? "default" : "ghost"}
                onClick={() => setActivePhase("discovery")}
                className="flex items-center space-x-3 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 hover:scale-105"
                size="lg"
              >
                <Compass className="h-6 w-6" />
                <span>Product Discovery</span>
              </Button>
              <Button
                variant={activePhase === "product-search" ? "default" : "ghost"}
                onClick={() => setActivePhase("product-search")}
                className="flex items-center space-x-3 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 hover:scale-105"
                size="lg"
              >
                <Search className="h-6 w-6" />
                <span>Product Search</span>
              </Button>
            </div>
          </div>

          {activePhase === "discovery" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Compass className="h-5 w-5 text-blue-600" />
                  <span>Product Discovery Map</span>
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Explore products organized by your healthcare industry profile and compliance requirements
                </p>
              </CardHeader>
              <CardContent className="p-8">
                <div className="flex flex-col items-center">{renderMindMapWheel()}</div>
              </CardContent>
            </Card>
          )}

          {activePhase === "product-search" && (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="search" className="flex items-center space-x-2">
                  <MessageCircle className="h-4 w-4" />
                  <span className="hidden sm:inline">Conversation</span>
                  <span className="sm:hidden">Chat</span>
                </TabsTrigger>
                <TabsTrigger
                  value="mindmap"
                  className="flex items-center space-x-2"
                  disabled={!hasConversation}
                  onClick={!hasConversation ? () => handleDisabledTabClick("Top Solutions") : undefined}
                >
                  <Target className="h-4 w-4" />
                  <span className="hidden sm:inline">Top Solutions</span>
                  <span className="sm:hidden">Top 3</span>
                </TabsTrigger>
                <TabsTrigger
                  value="comparison"
                  className="flex items-center space-x-2"
                  disabled={!hasConversation}
                  onClick={!hasConversation ? () => handleDisabledTabClick("Full Comparison") : undefined}
                >
                  <Table className="h-4 w-4" />
                  <span className="hidden sm:inline">Full Comparison</span>
                  <span className="sm:hidden">Table</span>
                </TabsTrigger>
              </TabsList>

              {/* Product Search Tab */}
              <TabsContent value="search" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Bot className="h-5 w-5 text-blue-600" />
                      <span>Product Search Assistant</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {messages.length === 0 ? (
                      <div className="text-center py-12">
                        <MessageCircle className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                        <h3 className="text-lg font-semibold mb-2">Start Your Product Search</h3>
                        <p className="text-muted-foreground mb-6">
                          Describe your specific needs to get personalized product recommendations
                        </p>
                      </div>
                    ) : (
                      /* Chat Messages */
                      <div className="h-64 overflow-y-auto mb-6 space-y-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                        {messages.map((message, index) => (
                          <div
                            key={index}
                            className={`flex items-start space-x-3 ${message.role === "user" ? "justify-end" : ""}`}
                          >
                            {message.role === "assistant" && (
                              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                <Bot className="h-4 w-4 text-white" />
                              </div>
                            )}
                            <div
                              className={`max-w-md px-4 py-3 rounded-lg ${
                                message.role === "user"
                                  ? "bg-blue-600 text-white ml-auto"
                                  : "bg-white dark:bg-card border"
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                            </div>
                            {message.role === "user" && (
                              <Avatar className="h-8 w-8 flex-shrink-0">
                                <AvatarImage src="/professional-avatar.png" />
                                <AvatarFallback>E</AvatarFallback>
                              </Avatar>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Input Area */}
                    <div className="flex space-x-3 mb-6">
                      <Button variant="outline" size="sm" className="px-3 bg-transparent flex-shrink-0">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Textarea
                        placeholder="Describe your specific needs... (e.g., 'We need better endpoint protection for our manufacturing facilities')"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSendMessage())
                        }
                        className="flex-1 min-h-[60px] resize-none"
                      />
                      <Button
                        onClick={handleSendMessage}
                        className="bg-blue-600 hover:bg-blue-700 px-6 self-end flex-shrink-0"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>

                    {hasConversation && (
                      <div className="space-y-4">
                        {/* Quick Preview Table */}
                        <Card className="border-blue-200">
                          <CardHeader className="pb-3">
                            <CardTitle className="flex items-center space-x-2 text-lg">
                              <Sparkles className="h-5 w-5 text-blue-600" />
                              <span>Top Matches</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm">
                                <thead>
                                  <tr className="border-b">
                                    <th className="text-left py-2 font-medium">Solution</th>
                                    <th className="text-left py-2 font-medium">Match</th>
                                    <th className="text-left py-2 font-medium">Price</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {topProducts.map((product) => (
                                    <tr key={product.id} className="border-b hover:bg-slate-50 dark:hover:bg-slate-800">
                                      <td className="py-3">
                                        <div className="flex items-center space-x-3">
                                          <img
                                            src={product.logo || "/placeholder.svg"}
                                            alt={product.vendor}
                                            className="w-6 h-6 object-contain flex-shrink-0"
                                          />
                                          <div className="min-w-0">
                                            <p className="font-medium truncate">{product.name}</p>
                                            <p className="text-xs text-muted-foreground truncate">{product.category}</p>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="py-3">
                                        <span className="font-semibold text-blue-600">{product.score}%</span>
                                      </td>
                                      <td className="py-3">{product.price.split("/")[0]}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                          <Button
                            variant="outline"
                            onClick={() => setActiveTab("mindmap")}
                            className="bg-blue-600 text-white border-0 hover:bg-blue-700"
                          >
                            <Target className="h-4 w-4 mr-2" />
                            View Top Solutions
                          </Button>
                          <Button variant="outline" onClick={() => setActiveTab("comparison")}>
                            <Table className="h-4 w-4 mr-2" />
                            Full Comparison
                          </Button>
                        </div>
                      </div>
                    )}

                    {!hasConversation && (
                      <div className="text-center py-8 text-muted-foreground">
                        <Lock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Start a conversation to unlock product recommendations</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="mindmap">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Star className="h-5 w-5 text-blue-600" />
                      <span>Top Recommended Solutions</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex items-end justify-center gap-4 lg:gap-8 mb-8 min-h-96">
                      {/* Second Place - Left */}
                      <div className="flex flex-col items-center mb-10">
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4 shadow-lg">
                          2
                        </div>
                        <Card className="w-56 lg:w-64 hover:shadow-lg transition-all duration-300 hover:scale-105 border-blue-300">
                          <CardContent className="p-4 lg:p-6 text-center">
                            <div
                              className="w-14 h-14 lg:w-16 lg:h-16 bg-white rounded-full shadow-md border-2 border-blue-300 flex items-center justify-center cursor-pointer mx-auto mb-4 hover:border-blue-400 transition-colors"
                              onClick={() => handleLogoClick(topProducts[1])}
                            >
                              <img
                                src={topProducts[1].logo || "/placeholder.svg"}
                                alt={topProducts[1].vendor}
                                className="w-8 h-8 lg:w-10 lg:h-10 object-contain"
                              />
                            </div>
                            <h3 className="font-bold mb-1 text-sm lg:text-base">{topProducts[1].name}</h3>
                            <p className="text-xs lg:text-sm text-muted-foreground mb-2">{topProducts[1].vendor}</p>
                            <div className="text-lg lg:text-xl font-bold text-blue-600 mb-2">
                              {topProducts[1].score}%
                            </div>
                            <p className="text-xs lg:text-sm mb-3">{topProducts[1].price}</p>
                            <div className="flex flex-wrap gap-1 justify-center mb-3">
                              {topProducts[1].compliance.map((comp) => (
                                <Badge key={comp} variant="outline" className="text-xs">
                                  {comp}
                                </Badge>
                              ))}
                            </div>
                            <Button
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700 text-xs"
                              onClick={() => handleProductSelection(topProducts[1].id, topProducts[1].category)}
                            >
                              Select for Lab
                            </Button>
                          </CardContent>
                        </Card>
                      </div>

                      {/* First Place - Center (Most Prominent) */}
                      <div className="flex flex-col items-center z-10">
                        <div className="w-12 h-12 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold text-2xl mb-4 shadow-xl">
                          1
                        </div>
                        <Card className="w-64 lg:w-72 hover:shadow-xl transition-all duration-300 hover:scale-105 ring-2 ring-blue-200 shadow-lg border-blue-400">
                          <CardContent className="p-6 lg:p-8 text-center">
                            <div
                              className="w-18 h-18 lg:w-20 lg:h-20 bg-white rounded-full shadow-lg border-3 border-blue-400 flex items-center justify-center cursor-pointer mx-auto mb-4 hover:border-blue-500 transition-colors"
                              onClick={() => handleLogoClick(topProducts[0])}
                            >
                              <img
                                src={topProducts[0].logo || "/placeholder.svg"}
                                alt={topProducts[0].vendor}
                                className="w-10 h-10 lg:w-12 lg:h-12 object-contain"
                              />
                            </div>
                            <h3 className="font-bold mb-1 text-base lg:text-lg">{topProducts[0].name}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{topProducts[0].vendor}</p>
                            <div className="text-2xl lg:text-3xl font-bold text-blue-700 mb-2">
                              {topProducts[0].score}%
                            </div>
                            <p className="text-sm mb-3 font-medium">{topProducts[0].price}</p>
                            <div className="flex flex-wrap gap-1 justify-center mb-3">
                              {topProducts[0].compliance.map((comp) => (
                                <Badge key={comp} variant="outline" className="text-xs">
                                  {comp}
                                </Badge>
                              ))}
                            </div>
                            <Button
                              size="sm"
                              className="bg-blue-700 hover:bg-blue-800 text-white"
                              onClick={() => handleProductSelection(topProducts[0].id, topProducts[0].category)}
                            >
                              Select for Lab
                            </Button>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Third Place - Right */}
                      <div className="flex flex-col items-center mb-20">
                        <div className="w-7 h-7 bg-blue-400 text-white rounded-full flex items-center justify-center font-bold mb-4 shadow-md">
                          3
                        </div>
                        <Card className="w-52 lg:w-60 hover:shadow-lg transition-all duration-300 hover:scale-105 border-blue-200">
                          <CardContent className="p-3 lg:p-5 text-center">
                            <div
                              className="w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-full shadow-md border-2 border-blue-200 flex items-center justify-center cursor-pointer mx-auto mb-4 hover:border-blue-400 transition-colors"
                              onClick={() => handleLogoClick(topProducts[2])}
                            >
                              <img
                                src={topProducts[2].logo || "/placeholder.svg"}
                                alt={topProducts[2].vendor}
                                className="w-6 h-6 lg:w-8 lg:h-8 object-contain"
                              />
                            </div>
                            <h3 className="font-bold mb-1 text-xs lg:text-sm">{topProducts[2].name}</h3>
                            <p className="text-xs text-muted-foreground mb-2">{topProducts[2].vendor}</p>
                            <div className="text-base lg:text-lg font-bold text-blue-500 mb-2">
                              {topProducts[2].score}%
                            </div>
                            <p className="text-xs mb-3">{topProducts[2].price}</p>
                            <div className="flex flex-wrap gap-1 justify-center mb-3">
                              {topProducts[2].compliance.map((comp) => (
                                <Badge key={comp} variant="outline" className="text-xs">
                                  {comp}
                                </Badge>
                              ))}
                            </div>
                            <Button
                              size="sm"
                              className="bg-blue-500 hover:bg-blue-600 text-white text-xs"
                              onClick={() => handleProductSelection(topProducts[2].id, topProducts[2].category)}
                            >
                              Select for Lab
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <Button variant="outline" onClick={() => setActiveTab("comparison")}>
                        <Table className="h-4 w-4 mr-2" />
                        View Full Comparison
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="comparison">
                <Card>
                  <CardHeader className="flex flex-col lg:flex-row lg:items-center justify-between space-y-2 lg:space-y-0">
                    <CardTitle className="flex items-center space-x-2">
                      <Table className="h-5 w-5 text-blue-600" />
                      <span>Business Solutions Recommendations</span>
                    </CardTitle>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <Button variant="outline" className="bg-blue-600 text-white border-0">
                        <Download className="h-4 w-4 mr-2" />
                        Export Results
                      </Button>
                      {selectedProducts.length > 0 && (
                        <Button onClick={handleLaunchLab} className="bg-blue-600 hover:bg-blue-700">
                          Compare Selected ({selectedProducts.length})
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4 text-sm text-muted-foreground">
                      Tailored for Healthcare • Large Organization (500+ employees) • Cloud-First
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b-2 border-slate-200">
                            <th className="text-left py-3 px-2 font-medium w-8"></th>
                            <th className="text-left py-3 px-2 font-medium min-w-[200px]">Solution</th>
                            <th className="text-left py-3 px-2 font-medium">Match Score</th>
                            <th className="text-left py-3 px-2 font-medium min-w-[200px]">Key Features</th>
                            <th className="text-left py-3 px-2 font-medium">Compliance</th>
                            <th className="text-left py-3 px-2 font-medium">Annual Cost</th>
                            <th className="text-left py-3 px-2 font-medium">Healthcare Experience</th>
                            <th className="text-left py-3 px-2 font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allProducts.map((product, index) => (
                            <tr
                              key={product.id}
                              className={`border-b hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                                selectedProducts.includes(product.id) ? "bg-blue-50 dark:bg-blue-900/20" : ""
                              }`}
                            >
                              <td className="py-4 px-2">
                                <Checkbox
                                  checked={selectedProducts.includes(product.id)}
                                  onCheckedChange={() => handleProductSelection(product.id, product.category)}
                                />
                              </td>
                              <td className="py-4 px-2">
                                <div className="flex items-center space-x-3">
                                  <img
                                    src={product.logo || "/placeholder.svg"}
                                    alt={product.name}
                                    className="w-6 h-6 object-contain flex-shrink-0"
                                  />
                                  <div className="min-w-0">
                                    <div className="font-medium">{product.name}</div>
                                    <div className="text-xs text-muted-foreground flex items-center">
                                      {"★".repeat(Math.floor(product.score / 20))} ({product.score / 10})
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-2">
                                <span className="font-bold text-blue-600 text-lg">{product.score}%</span>
                              </td>
                              <td className="py-4 px-2">
                                <div className="space-y-1 text-xs">
                                  <div>• Cloud-native {product.category.toLowerCase()}</div>
                                  <div>• HIPAA audit trail automation</div>
                                  <div>• Real-time compliance alerting</div>
                                  <div className="text-blue-600">+2 more features</div>
                                </div>
                              </td>
                              <td className="py-4 px-2">
                                <div className="space-y-1">
                                  {product.compliance?.map((comp) => (
                                    <Badge key={comp} variant="outline" className="text-xs mr-1 mb-1">
                                      {comp}
                                    </Badge>
                                  ))}
                                </div>
                              </td>
                              <td className="py-4 px-2">
                                <div className="font-medium">{product.price.split("/")[0]}</div>
                                <div className="text-xs text-muted-foreground">Per user/month (cloud)</div>
                                <div className="text-xs text-muted-foreground">Setup: $10,000 - $25,000</div>
                              </td>
                              <td className="py-4 px-2">
                                <div className="text-sm font-medium">{product.users} customers</div>
                                <div className="text-xs text-muted-foreground">2-4 months implementation</div>
                                <div className="text-xs text-muted-foreground">Extensive experience</div>
                              </td>
                              <td className="py-4 px-2">
                                <div className="flex flex-col space-y-1">
                                  <Button size="sm" variant="outline" className="h-7 text-xs bg-transparent">
                                    Details
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-7 text-xs text-blue-600 bg-transparent"
                                  >
                                    Cloud Demo
                                  </Button>
                                  <Button
                                    size="sm"
                                    className="h-7 text-xs bg-green-600 hover:bg-green-700 text-white"
                                    onClick={() => handleProductSelection(product.id, product.category)}
                                  >
                                    Select
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>

        <div className="w-full lg:w-72 flex-shrink-0 order-first lg:order-last">
          <div className="space-y-4 max-h-screen overflow-y-auto pb-4 lg:pb-20">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Building className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Organization Context</h3>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                <h4 className="font-semibold mb-2 flex items-center text-sm">
                  <Users className="h-4 w-4 text-slate-600 mr-2" />
                  Professional Profile
                </h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Industry:</span>
                    <span className="font-medium">Healthcare</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Region:</span>
                    <span className="font-medium">Asia Pacific</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Role:</span>
                    <span className="font-medium">IT Director</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                <h4 className="font-semibold mb-2 text-sm">Compliance Requirements</h4>
                <div className="flex flex-wrap gap-1 mb-2">
                  <Badge variant="outline" className="text-xs">
                    PCI DSS
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    HIPAA
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    HITECH
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    ISO 27001
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    SOC 2
                  </Badge>
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                <h4 className="font-semibold mb-2 text-sm">Focus Areas</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    <span>Endpoint Protection</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-slate-600 rounded-full"></div>
                    <span>Manufacturing Security</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-slate-600 rounded-full"></div>
                    <span>PCI DSS Compliance</span>
                  </div>
                </div>
              </div>

              {selectedProducts.length > 0 && (
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200">
                  <h4 className="font-semibold mb-2 flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                    Selected ({selectedProducts.length})
                  </h4>
                  <div className="space-y-1">
                    {selectedProducts.slice(0, 2).map((id) => {
                      const product = allProducts.find((p) => p.id === id)
                      return product ? (
                        <div
                          key={id}
                          className="flex items-center justify-between text-xs bg-white dark:bg-slate-800 p-2 rounded"
                        >
                          <span className="font-medium truncate">{product.name}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleProductSelection(id, product.category)}
                            className="h-5 w-5 p-0 text-slate-400 hover:text-slate-600"
                          >
                            ×
                          </Button>
                        </div>
                      ) : null
                    })}
                    {selectedProducts.length > 2 && (
                      <div className="text-xs text-muted-foreground text-center">
                        +{selectedProducts.length - 2} more
                      </div>
                    )}
                  </div>
                  <Button onClick={handleLaunchLab} className="w-full mt-2 bg-green-600 hover:bg-green-700 text-xs h-8">
                    <Play className="h-3 w-3 mr-1" />
                    Launch Lab
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

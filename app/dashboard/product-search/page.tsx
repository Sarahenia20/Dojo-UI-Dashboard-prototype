"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ProductSelectionModal } from "@/components/product-selection-modal"
import { ProductDetailsModal } from "@/components/product-details-modal"
import { useRouter } from "next/navigation"
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
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Zap,
  Shield,
  Cloud,
  Database,
  Network,
  Monitor,
} from "lucide-react"

export default function ProductSearchPage() {
  const router = useRouter()
  const [activePhase, setActivePhase] = useState<"discovery" | "product-search" | "solution-optimizer">("discovery")
  const [activeTab, setActiveTab] = useState("search")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])
  const [hasConversation, setHasConversation] = useState(false)
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([])
  const [showSelectionModal, setShowSelectionModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedProductForDetails, setSelectedProductForDetails] = useState<any>(null)
  const [isOrgContextCollapsed, setIsOrgContextCollapsed] = useState(false)

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const [optimizerTab, setOptimizerTab] = useState<"research" | "recommendations">("research")
  const [selectedUseCase, setSelectedUseCase] = useState<string>("")
  const [customUseCase, setCustomUseCase] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [researchResults, setResearchResults] = useState<any[]>([])
  const [recommendedProducts, setRecommendedProducts] = useState<any[]>([])

  const [assessmentProducts, setAssessmentProducts] = useState<number[]>([])
  const [productSearchQuery, setProductSearchQuery] = useState("")

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
        `⚠️ Similar Products Conflict\n\nPlease select one product. You cannot choose similar products.\n\nYou already selected "${conflictingProductName}" from the ${product.category} category.\n\nDeselect "${conflictingProductName}" first if you want to choose "${product.name}" instead.`,
      )
      return
    }

    if (!selectedProducts.includes(productId)) {
      setIsOrgContextCollapsed(false)
    }

    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const handlePopularIntegrationClick = (integrationName: string) => {
    // Show organization context when clicking integrations
    setIsOrgContextCollapsed(false)

    // Add to selected products based on integration type
    const integrationProductMap: { [key: string]: number } = {
      CrowdStrike: 1,
      SentinelOne: 2,
      "Microsoft Defender": 3,
      Rapid7: 4,
      Securonix: 5,
    }

    const productId = integrationProductMap[integrationName]
    if (productId) {
      handleProductSelection(productId)
    }
  }

  const handleLaunchLab = () => {
    if (selectedProducts.length > 0) {
      alert(
        "⚠️ Important: Do not refresh your browser for the next few minutes while we deploy your lab environment. You will receive an email with access credentials shortly.",
      )

      // Navigate to labs page and trigger deployment
      router.push("/dashboard/labs?action=deploy&products=" + selectedProducts.join(","))
    }
  }

  const handleProductDetailsClick = (product: any) => {
    setSelectedProductForDetails(product)
    setShowDetailsModal(true)
  }

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
  }

  const handleDisabledTabClick = (tabName: string) => {
    alert(
      `🔒 ${tabName} is locked. Please start a conversation in Product Search to unlock recommendations and comparisons.`,
    )
  }

  const handleProcessUseCase = async () => {
    if (!selectedUseCase && !customUseCase) return

    setIsProcessing(true)

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const useCase = selectedUseCase || customUseCase

    // Generate research results based on use case
    const mockResearchResults = [
      {
        id: 1,
        title: "Industry Best Practices for " + useCase,
        summary: "Comprehensive analysis of current market trends and recommended approaches",
        insights: [
          "Multi-layered security approach recommended",
          "Cloud-native solutions show 40% better performance",
          "Integration capabilities are critical for success",
        ],
      },
      {
        id: 2,
        title: "Compliance Requirements Analysis",
        summary: "Regulatory compliance mapping for your specific use case",
        insights: [
          "HIPAA compliance mandatory for healthcare",
          "PCI DSS requirements for payment processing",
          "SOC 2 certification preferred by enterprise clients",
        ],
      },
    ]

    // Generate product recommendations
    const mockRecommendations = [
      {
        id: 6,
        name: "Palo Alto Cortex XDR",
        category: "Extended Detection & Response",
        score: 93,
        reason: "Specifically optimized for " + useCase + " with advanced threat hunting capabilities",
        compliance: ["PCI DSS", "HIPAA", "SOC 2"],
        integrations: ["Microsoft 365", "AWS", "Splunk"],
      },
      {
        id: 7,
        name: "Splunk Enterprise Security",
        category: "SIEM Platform",
        score: 91,
        reason: "Excellent analytics and reporting for " + useCase + " monitoring requirements",
        compliance: ["PCI DSS", "HIPAA", "ISO 27001"],
        integrations: ["CrowdStrike", "AWS CloudTrail", "Microsoft Sentinel"],
      },
    ]

    setResearchResults(mockResearchResults)
    setRecommendedProducts(mockRecommendations)
    setIsProcessing(false)
    setOptimizerTab("recommendations")
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

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-8">
              {[
                { name: "CrowdStrike", icon: Shield, color: "bg-red-500" },
                { name: "SentinelOne", icon: Zap, color: "bg-purple-500" },
                { name: "Microsoft Defender", icon: Cloud, color: "bg-blue-500" },
                { name: "Rapid7", icon: Database, color: "bg-green-500" },
                { name: "Securonix", icon: Network, color: "bg-orange-500" },
                { name: "More Solutions", icon: Monitor, color: "bg-gray-500" },
              ].map((integration, index) => (
                <Button
                  key={integration.name}
                  variant="ghost"
                  className="h-8 w-20 bg-white/70 hover:bg-white/90 hover:scale-110 transition-all duration-200 border border-blue-100 hover:border-blue-300 text-xs"
                  onClick={() => handlePopularIntegrationClick(integration.name)}
                >
                  <div className="flex flex-col items-center space-y-0.5">
                    <div className={`w-3 h-3 rounded-full ${integration.color} flex items-center justify-center`}>
                      <integration.icon className="h-2 w-2 text-white" />
                    </div>
                    <span className="text-[10px] font-medium leading-tight">{integration.name.split(" ")[0]}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderSolutionOptimizer = () => {
    const useCaseOptions = [
      "Endpoint Protection for Healthcare",
      "Manufacturing Security Compliance",
      "Cloud Infrastructure Protection",
      "Data Loss Prevention",
      "Incident Response Automation",
      "Threat Intelligence Integration",
    ]

    const availableProducts = [
      { id: 1, name: "CrowdStrike Falcon", category: "Endpoint Protection", logo: "/crowdstrike-logo.png" },
      { id: 2, name: "SentinelOne Singularity", category: "Endpoint Protection", logo: "/sentinelone-logo.png" },
      { id: 3, name: "Microsoft Defender", category: "Endpoint Protection", logo: "/microsoft-logo.png" },
      { id: 4, name: "Rapid7 InsightIDR", category: "SIEM", logo: "/rapid7-logo.png" },
      { id: 5, name: "Securonix Cloud SIEM", category: "SIEM", logo: "/securonix-logo.png" },
      { id: 6, name: "Palo Alto Cortex XDR", category: "XDR", logo: "/paloalto-logo.png" },
      { id: 7, name: "Splunk Enterprise Security", category: "SIEM", logo: "/splunk-logo.png" },
      { id: 8, name: "Okta Identity Cloud", category: "Identity Management", logo: "/okta-logo.png" },
      { id: 9, name: "Zscaler Zero Trust Exchange", category: "Zero Trust", logo: "/zscaler-logo.png" },
      { id: 10, name: "Proofpoint Email Protection", category: "Email Security", logo: "/proofpoint-logo.png" },
    ]

    const filteredProducts = availableProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(productSearchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(productSearchQuery.toLowerCase()),
    )

    const handleAssessmentProductToggle = (productId: number) => {
      setAssessmentProducts((prev) =>
        prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
      )
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center space-x-4 p-2 bg-slate-100 dark:bg-slate-800 rounded-xl w-fit mx-auto">
          <Button
            variant={optimizerTab === "research" ? "default" : "ghost"}
            onClick={() => setOptimizerTab("research")}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200"
          >
            <Search className="h-4 w-4" />
            <span>Assessment</span>
          </Button>
          <Button
            variant={optimizerTab === "recommendations" ? "default" : "ghost"}
            onClick={() => setOptimizerTab("recommendations")}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200"
            disabled={recommendedProducts.length === 0}
          >
            <Sparkles className="h-4 w-4" />
            <span>Recommendations</span>
          </Button>
        </div>

        {optimizerTab === "research" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Search className="h-5 w-5 text-blue-600" />
                <span>Solution Assessment & Analysis</span>
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Select your use case and products to analyze for tailored recommendations
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Select Use Case</label>
                  <div className="grid gap-2 md:grid-cols-2">
                    {useCaseOptions.map((useCase) => (
                      <Button
                        key={useCase}
                        variant={selectedUseCase === useCase ? "default" : "outline"}
                        onClick={() => {
                          setSelectedUseCase(useCase)
                          setCustomUseCase("")
                        }}
                        className="justify-start text-left h-auto p-3"
                      >
                        <div>
                          <div className="font-medium">{useCase}</div>
                          <div className="text-xs text-muted-foreground mt-1">Tailored for your industry profile</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <label className="text-sm font-medium mb-2 block">Or Add Custom Use Case</label>
                  <Textarea
                    placeholder="Describe your specific use case or requirements..."
                    value={customUseCase}
                    onChange={(e) => {
                      setCustomUseCase(e.target.value)
                      if (e.target.value) setSelectedUseCase("")
                    }}
                    className="min-h-[80px]"
                  />
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                  <h4 className="font-semibold mb-3 flex items-center text-sm">
                    <Target className="h-4 w-4 text-blue-600 mr-2" />
                    Select Products for Assessment
                  </h4>

                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="Search products by name or category..."
                      value={productSearchQuery}
                      onChange={(e) => setProductSearchQuery(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center space-x-3 p-2 hover:bg-white dark:hover:bg-slate-800 rounded cursor-pointer"
                        onClick={() => handleAssessmentProductToggle(product.id)}
                      >
                        <Checkbox
                          checked={assessmentProducts.includes(product.id)}
                          onChange={() => handleAssessmentProductToggle(product.id)}
                        />
                        <img
                          src={product.logo || "/placeholder.svg"}
                          alt={product.name}
                          className="w-5 h-5 object-contain"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{product.name}</div>
                          <div className="text-xs text-muted-foreground">{product.category}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {assessmentProducts.length > 0 && (
                    <div className="mt-3 pt-3 border-t">
                      <div className="text-xs text-muted-foreground mb-2">
                        Selected for Assessment ({assessmentProducts.length})
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {assessmentProducts.map((id) => {
                          const product = availableProducts.find((p) => p.id === id)
                          return product ? (
                            <Badge key={id} variant="outline" className="bg-blue-50 text-xs">
                              {product.name}
                            </Badge>
                          ) : null
                        })}
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  onClick={handleProcessUseCase}
                  disabled={(!selectedUseCase && !customUseCase) || isProcessing}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing Assessment...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Generate Recommendations
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {optimizerTab === "recommendations" && recommendedProducts.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                <span>Recommended Solutions</span>
              </CardTitle>
              <p className="text-sm text-muted-foreground">Based on your use case analysis and assessment criteria</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendedProducts.map((product) => (
                <Card key={product.id} className="border-purple-200 bg-purple-50 dark:bg-purple-900/20">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3 flex-1">
                        <img
                          src={product.logo || "/placeholder.svg"}
                          alt={product.name}
                          className="w-8 h-8 object-contain"
                        />
                        <div>
                          <h3 className="font-semibold text-lg">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">{product.category}</p>
                          <div className="text-lg font-bold text-purple-600 mt-1">{product.score}% Match</div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleProductDetailsClick(product)}
                          className="bg-transparent"
                        >
                          Details
                        </Button>
                        <Button
                          size="sm"
                          className="bg-purple-600 hover:bg-purple-700"
                          onClick={() => handleProductSelection(product.id, product.category)}
                        >
                          Select Product
                        </Button>
                      </div>
                    </div>

                    <p className="text-sm mb-3 text-purple-800 dark:text-purple-200">
                      <strong>Why recommended:</strong> {product.reason}
                    </p>

                    <div className="grid gap-3 md:grid-cols-2">
                      <div>
                        <h4 className="text-sm font-medium mb-1">Compliance</h4>
                        <div className="flex flex-wrap gap-1">
                          {product.compliance.map((comp: string) => (
                            <Badge key={comp} variant="outline" className="text-xs">
                              {comp}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1">Key Integrations</h4>
                        <div className="flex flex-wrap gap-1">
                          {product.integrations.map((integration: string) => (
                            <Badge key={integration} variant="outline" className="text-xs bg-blue-50">
                              {integration}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        )}
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
      users: "400+ customers",
      compliance: ["PCI DSS", "HITECH"],
    },
    {
      id: 5,
      name: "Securonix Cloud SIEM",
      category: "Cloud-Native SIEM",
      score: 88,
      users: "450+ customers",
      compliance: ["PCI DSS", "HITECH"],
    },
  ]

  const selectedProductsData = selectedProducts
    .map((id) => allProducts.find((p) => p.id === id))
    .filter(Boolean) as typeof allProducts

  const getConflictingProduct = (productId: number) => {
    const product = allProducts.find((p) => p.id === productId)
    if (!product) return undefined

    const conflictingId = selectedProducts.find((id) => {
      const selectedProduct = allProducts.find((p) => p.id === id)
      return selectedProduct && selectedProduct.category === product.category && id !== productId
    })

    return conflictingId ? allProducts.find((p) => p.id === conflictingId)?.name : undefined
  }

  // Dummy function to satisfy the prop requirement
  const handleConfirmLaunch = () => {
    console.log("Confirm Launch clicked")
    // Implement actual launch logic here
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex gap-4 lg:gap-6 p-4 lg:p-6">
        <div className="flex-1 min-w-0">
          <div className="mb-6">
            <div className="flex items-center justify-center space-x-4 p-2 bg-slate-100 dark:bg-slate-800 rounded-xl w-fit mx-auto">
              <Button
                variant={activePhase === "discovery" ? "default" : "ghost"}
                onClick={() => setActivePhase("discovery")}
                className="flex items-center space-x-2 px-6 py-3 text-base font-semibold rounded-lg transition-all duration-200 hover:scale-105"
                size="lg"
              >
                <Compass className="h-5 w-5" />
                <span>Product Discovery</span>
              </Button>
              <Button
                variant={activePhase === "product-search" ? "default" : "ghost"}
                onClick={() => setActivePhase("product-search")}
                className="flex items-center space-x-2 px-6 py-3 text-base font-semibold rounded-lg transition-all duration-200 hover:scale-105"
                size="lg"
              >
                <Search className="h-5 w-5" />
                <span>Product Search</span>
              </Button>
              <Button
                variant={activePhase === "solution-optimizer" ? "default" : "ghost"}
                onClick={() => setActivePhase("solution-optimizer")}
                className="flex items-center space-x-2 px-6 py-3 text-base font-semibold rounded-lg transition-all duration-200 hover:scale-105"
                size="lg"
              >
                <Lightbulb className="h-5 w-5" />
                <span>Solution Optimizer</span>
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
                  Explore products organized by your healthcare industry profile and compliance requirements. Click on
                  popular integrations to select them.
                </p>
              </CardHeader>
              <CardContent className="p-8">
                <div className="flex flex-col items-center">{renderMindMapWheel()}</div>
              </CardContent>
            </Card>
          )}

          {activePhase === "solution-optimizer" && <div>{renderSolutionOptimizer()}</div>}

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
                            <CardTitle className="flex items-center space-x-2">
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
                              onClick={() => handleProductDetailsClick(topProducts[1])}
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
                              Select Product
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
                              onClick={() => handleProductDetailsClick(topProducts[0])}
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
                              Select Product
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
                              onClick={() => handleProductDetailsClick(topProducts[2])}
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
                              Select Product
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
                          Submit Products ({selectedProducts.length})
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
                                    className="w-6 h-6 object-contain flex-shrink-0 cursor-pointer"
                                    onClick={() => handleProductDetailsClick(product)}
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
                                <div className="text-sm font-medium">{product.users} customers</div>
                                <div className="text-xs text-muted-foreground">2-4 months implementation</div>
                                <div className="text-xs text-muted-foreground">Extensive experience</div>
                              </td>
                              <td className="py-4 px-2">
                                <div className="flex flex-col space-y-1">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-7 text-xs bg-transparent"
                                    onClick={() => handleProductDetailsClick(product)}
                                  >
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
                                    Select Product
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

        <div
          className={`transition-all duration-300 flex-shrink-0 ${isOrgContextCollapsed ? "w-12" : "w-full lg:w-72"}`}
        >
          {isOrgContextCollapsed ? (
            <div className="h-full flex flex-col items-center pt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOrgContextCollapsed(false)}
                className="p-2 mb-4 hover:bg-blue-50"
              >
                <div className="flex flex-col items-center space-y-1">
                  <Building className="h-4 w-4 text-blue-600" />
                  <ChevronLeft className="h-3 w-3 text-slate-400" />
                </div>
              </Button>
            </div>
          ) : (
            <div className="space-y-4 max-h-screen overflow-y-auto pb-4 lg:pb-20">
              <div className="flex items-center justify-between">
                <div className="text-center flex-1">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <Building className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Organization Context</h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOrgContextCollapsed(true)}
                  className="p-2 hover:bg-slate-100"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
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
                    <Button
                      onClick={handleLaunchLab}
                      className="w-full mt-2 bg-green-600 hover:bg-green-700 text-xs h-8"
                    >
                      <Play className="h-3 w-3 mr-1" />
                      Submit Products
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <ProductSelectionModal
        isOpen={showSelectionModal}
        onClose={() => setShowSelectionModal(false)}
        selectedProducts={selectedProductsData}
        onConfirmLaunch={handleConfirmLaunch}
      />

      <ProductDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        product={selectedProductForDetails}
        onAddToCart={handleProductSelection}
        isSelected={selectedProductForDetails ? selectedProducts.includes(selectedProductForDetails.id) : false}
        conflictingProduct={selectedProductForDetails ? getConflictingProduct(selectedProductForDetails.id) : undefined}
      />
    </div>
  )
}

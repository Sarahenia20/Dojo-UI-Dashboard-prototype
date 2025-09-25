"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, CheckCircle, Star, Users, Globe, Zap, Plus, AlertTriangle } from "lucide-react"

interface Product {
  id: number
  name: string
  vendor?: string
  logo?: string
  category: string
  score: number
  compliance?: string[]
  users?: string
  features?: string[]
  standards?: string[]
  integrations?: string[]
}

interface ProductDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product | null
  onAddToCart: (productId: number) => void
  isSelected: boolean
  conflictingProduct?: string
}

export function ProductDetailsModal({
  isOpen,
  onClose,
  product,
  onAddToCart,
  isSelected,
  conflictingProduct,
}: ProductDetailsModalProps) {
  if (!product) return null

  const handleAddToCart = () => {
    onAddToCart(product.id)
  }

  const mockFeatures = [
    "Real-time threat detection and response",
    "AI-powered behavioral analysis",
    "Cloud-native architecture",
    "HIPAA compliance automation",
    "Zero-trust network access",
    "Advanced endpoint protection",
  ]

  const mockStandards = [
    "ISO 27001 certified",
    "SOC 2 Type II compliant",
    "NIST Cybersecurity Framework aligned",
    "Common Criteria EAL4+ evaluated",
  ]

  const mockIntegrations = [
    "Microsoft Azure AD",
    "AWS Security Hub",
    "Splunk SIEM",
    "ServiceNow ITSM",
    "Okta Identity Management",
    "Palo Alto Networks",
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-lg shadow-md border flex items-center justify-center">
              <img
                src={product.logo || "/placeholder.svg"}
                alt={product.vendor || product.name}
                className="w-8 h-8 object-contain"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold">{product.name}</h2>
              <p className="text-sm text-muted-foreground">{product.vendor}</p>
            </div>
            <div className="ml-auto">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="font-bold text-lg">{product.score}%</span>
                <span className="text-sm text-muted-foreground">match</span>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Category & Overview */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary" className="text-sm">
                    {product.category}
                  </Badge>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{product.users || "2,000+ customers"}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Enterprise-grade security solution designed for healthcare organizations with advanced threat
                  detection and compliance automation capabilities.
                </p>
              </CardContent>
            </Card>

            {/* Key Features */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-blue-600" />
                  <span>Key Features</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {mockFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2 text-sm">
                      <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Standards & Compliance */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span>Standards & Compliance</span>
                </h3>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {product.compliance?.map((comp) => (
                      <Badge key={comp} variant="outline" className="text-xs">
                        {comp}
                      </Badge>
                    ))}
                  </div>
                  <div className="space-y-1">
                    {mockStandards.map((standard, index) => (
                      <div key={index} className="flex items-start space-x-2 text-sm">
                        <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{standard}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Integrations */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-blue-600" />
                  <span>Popular Integrations</span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {mockIntegrations.map((integration, index) => (
                    <div key={index} className="p-2 bg-slate-50 dark:bg-slate-800 rounded text-xs text-center">
                      {integration}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Conflict Warning */}
            {conflictingProduct && (
              <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950/20">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-orange-800 dark:text-orange-200">
                        Similar Product Selected
                      </p>
                      <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">
                        You already have "{conflictingProduct}" selected. You can only test one solution per category.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Add to Cart */}
            <Card>
              <CardContent className="p-4">
                <Button
                  onClick={handleAddToCart}
                  className={`w-full ${
                    isSelected ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                  disabled={!!conflictingProduct && !isSelected}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {isSelected ? "Selected for Testing" : "Add to Cart"}
                </Button>
                {conflictingProduct && !isSelected && (
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Remove "{conflictingProduct}" first to select this product
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3 text-sm">Quick Stats</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Match Score:</span>
                    <span className="font-medium">{product.score}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category:</span>
                    <span className="font-medium">Security</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Deployment:</span>
                    <span className="font-medium">2-4 weeks</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Support:</span>
                    <span className="font-medium">24/7</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

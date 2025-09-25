"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Clock, Server, Shield, Zap, ArrowRight } from "lucide-react"

interface Product {
  id: number
  name: string
  vendor?: string
  logo?: string
  category: string
  price?: string
  compliance?: string[]
}

interface ProductSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  selectedProducts: Product[]
  onConfirmLaunch: () => void
}

export function ProductSelectionModal({
  isOpen,
  onClose,
  selectedProducts,
  onConfirmLaunch,
}: ProductSelectionModalProps) {
  const [isLaunching, setIsLaunching] = useState(false)

  const handleLaunchLab = async () => {
    setIsLaunching(true)
    // Simulate brief processing time
    await new Promise((resolve) => setTimeout(resolve, 1500))
    onConfirmLaunch()
    setIsLaunching(false)
  }

  const estimatedDeployTime = Math.max(3, selectedProducts.length * 2)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span>Launch Lab Environment</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Selected Products Summary */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-blue-600" />
              <span>Selected Products ({selectedProducts.length})</span>
            </h3>
            <div className="grid gap-3">
              {selectedProducts.map((product) => (
                <Card key={product.id} className="border-blue-200 bg-blue-50/50 dark:bg-blue-950/20">
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-3">
                      {product.logo && (
                        <img
                          src={product.logo || "/placeholder.svg"}
                          alt={product.vendor || product.name}
                          className="w-8 h-8 object-contain flex-shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.category}</p>
                      </div>
                      {product.compliance && (
                        <div className="flex flex-wrap gap-1">
                          {product.compliance.slice(0, 2).map((comp) => (
                            <Badge key={comp} variant="outline" className="text-xs">
                              {comp}
                            </Badge>
                          ))}
                          {product.compliance.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{product.compliance.length - 2}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Lab Configuration */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center space-x-2">
              <Server className="h-4 w-4 text-blue-600" />
              <span>Lab Configuration</span>
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-card rounded-lg border">
                <p className="text-sm font-medium mb-1">Lab Type</p>
                <p className="text-xs text-muted-foreground">Security Testing Environment</p>
              </div>
              <div className="p-3 bg-card rounded-lg border">
                <p className="text-sm font-medium mb-1">Estimated Deploy Time</p>
                <p className="text-xs text-muted-foreground">
                  {estimatedDeployTime}-{estimatedDeployTime + 2} minutes
                </p>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              <strong>Security Lab Environment:</strong> This lab will be isolated and configured for security testing.
              SSH credentials will be sent to your registered email address.
            </AlertDescription>
          </Alert>

          {/* Deployment Process Preview */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center space-x-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <span>Deployment Process</span>
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                <span>Provision lab infrastructure</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                <span>Install and configure selected security tools</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                <span>Set up network security and access controls</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                <span>Send SSH credentials and connection details via email</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-4 border-t">
            <Button variant="outline" onClick={onClose} disabled={isLaunching}>
              Cancel
            </Button>
            <Button onClick={handleLaunchLab} disabled={isLaunching} className="bg-blue-600 hover:bg-blue-700">
              {isLaunching ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Launching Lab...
                </>
              ) : (
                <>
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Launch Lab Environment
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

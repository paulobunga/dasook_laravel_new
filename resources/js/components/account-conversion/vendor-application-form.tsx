"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Store, Upload, CheckCircle, FileText, CreditCard, Globe, Phone, MapPin, Package, Shield } from "lucide-react"

interface VendorApplicationFormProps {
  onSubmit: (data: any) => void
  isLoading?: boolean
}

export function VendorApplicationForm({ onSubmit, isLoading = false }: VendorApplicationFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Business Information
    businessName: "",
    businessType: "",
    businessDescription: "",
    businessCategory: "",
    businessWebsite: "",
    businessPhone: "",
    businessEmail: "",

    // Business Address
    businessAddress: "",
    businessCity: "",
    businessState: "",
    businessZip: "",
    businessCountry: "US",

    // Legal Information
    businessRegistrationNumber: "",
    taxId: "",
    businessLicense: null as File | null,
    taxDocument: null as File | null,
    identityDocument: null as File | null,

    // Banking Information
    bankName: "",
    accountHolderName: "",
    accountNumber: "",
    routingNumber: "",
    accountType: "checking",

    // Business Operations
    expectedMonthlyVolume: "",
    averageOrderValue: "",
    productCategories: [] as string[],
    shippingMethods: [] as string[],
    returnPolicy: "",
    processingTime: "",

    // Additional Information
    businessExperience: "",
    marketplaceExperience: "",
    whyJoinPlatform: "",

    // Agreements
    agreeToTerms: false,
    agreeToCommission: false,
    agreeToDataProcessing: false,
  })

  const totalSteps = 6
  const progress = (currentStep / totalSteps) * 100

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (field: string, file: File | null) => {
    setFormData((prev) => ({ ...prev, [field]: file }))
  }

  const handleArrayToggle = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].includes(value)
        ? (prev[field as keyof typeof prev] as string[]).filter((item) => item !== value)
        : [...(prev[field as keyof typeof prev] as string[]), value],
    }))
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.businessName && formData.businessType && formData.businessDescription)
      case 2:
        return !!(formData.businessAddress && formData.businessCity && formData.businessState)
      case 3:
        return !!(formData.businessRegistrationNumber && formData.taxId)
      case 4:
        return !!(formData.bankName && formData.accountHolderName && formData.accountNumber)
      case 5:
        return !!(formData.expectedMonthlyVolume && formData.productCategories.length > 0)
      case 6:
        return formData.agreeToTerms && formData.agreeToCommission && formData.agreeToDataProcessing
      default:
        return true
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateStep(currentStep)) {
      onSubmit(formData)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Store className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Business Information</h3>
              <p className="text-gray-600">Tell us about your business</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="businessName">Business Name *</Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange("businessName", e.target.value)}
                  placeholder="Your Business Name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="businessType">Business Type *</Label>
                <Select
                  value={formData.businessType}
                  onValueChange={(value) => handleInputChange("businessType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sole-proprietorship">Sole Proprietorship</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                    <SelectItem value="llc">LLC</SelectItem>
                    <SelectItem value="corporation">Corporation</SelectItem>
                    <SelectItem value="non-profit">Non-Profit</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="businessCategory">Business Category *</Label>
                <Select
                  value={formData.businessCategory}
                  onValueChange={(value) => handleInputChange("businessCategory", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select primary category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="fashion">Fashion & Apparel</SelectItem>
                    <SelectItem value="home-garden">Home & Garden</SelectItem>
                    <SelectItem value="sports">Sports & Outdoors</SelectItem>
                    <SelectItem value="books">Books & Media</SelectItem>
                    <SelectItem value="beauty">Beauty & Personal Care</SelectItem>
                    <SelectItem value="automotive">Automotive</SelectItem>
                    <SelectItem value="toys">Toys & Games</SelectItem>
                    <SelectItem value="pet-supplies">Pet Supplies</SelectItem>
                    <SelectItem value="food-beverages">Food & Beverages</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="businessDescription">Business Description *</Label>
                <Textarea
                  id="businessDescription"
                  value={formData.businessDescription}
                  onChange={(e) => handleInputChange("businessDescription", e.target.value)}
                  placeholder="Describe your business, products, and what makes you unique..."
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="businessWebsite">Website</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="businessWebsite"
                      value={formData.businessWebsite}
                      onChange={(e) => handleInputChange("businessWebsite", e.target.value)}
                      placeholder="https://yourwebsite.com"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="businessPhone">Business Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="businessPhone"
                      value={formData.businessPhone}
                      onChange={(e) => handleInputChange("businessPhone", e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Business Address</h3>
              <p className="text-gray-600">Where is your business located?</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="businessAddress">Street Address *</Label>
                <Input
                  id="businessAddress"
                  value={formData.businessAddress}
                  onChange={(e) => handleInputChange("businessAddress", e.target.value)}
                  placeholder="123 Business Street"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="businessCity">City *</Label>
                  <Input
                    id="businessCity"
                    value={formData.businessCity}
                    onChange={(e) => handleInputChange("businessCity", e.target.value)}
                    placeholder="City"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="businessState">State/Province *</Label>
                  <Input
                    id="businessState"
                    value={formData.businessState}
                    onChange={(e) => handleInputChange("businessState", e.target.value)}
                    placeholder="State"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="businessZip">ZIP/Postal Code</Label>
                  <Input
                    id="businessZip"
                    value={formData.businessZip}
                    onChange={(e) => handleInputChange("businessZip", e.target.value)}
                    placeholder="12345"
                  />
                </div>

                <div>
                  <Label htmlFor="businessCountry">Country</Label>
                  <Select
                    value={formData.businessCountry}
                    onValueChange={(value) => handleInputChange("businessCountry", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="US">United States</SelectItem>
                      <SelectItem value="CA">Canada</SelectItem>
                      <SelectItem value="UK">United Kingdom</SelectItem>
                      <SelectItem value="AU">Australia</SelectItem>
                      <SelectItem value="DE">Germany</SelectItem>
                      <SelectItem value="FR">France</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <FileText className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Legal Information</h3>
              <p className="text-gray-600">Provide your business registration and tax details</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="businessRegistrationNumber">Business Registration Number *</Label>
                  <Input
                    id="businessRegistrationNumber"
                    value={formData.businessRegistrationNumber}
                    onChange={(e) => handleInputChange("businessRegistrationNumber", e.target.value)}
                    placeholder="REG123456789"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="taxId">Tax ID/EIN *</Label>
                  <Input
                    id="taxId"
                    value={formData.taxId}
                    onChange={(e) => handleInputChange("taxId", e.target.value)}
                    placeholder="12-3456789"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Business License</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Upload your business license</p>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload("businessLicense", e.target.files?.[0] || null)}
                      className="hidden"
                      id="businessLicense"
                    />
                    <Button variant="outline" onClick={() => document.getElementById("businessLicense")?.click()}>
                      Choose File
                    </Button>
                    {formData.businessLicense && (
                      <p className="text-sm text-green-600 mt-2">✓ {formData.businessLicense.name}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label>Tax Document</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Upload tax document or W-9 form</p>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload("taxDocument", e.target.files?.[0] || null)}
                      className="hidden"
                      id="taxDocument"
                    />
                    <Button variant="outline" onClick={() => document.getElementById("taxDocument")?.click()}>
                      Choose File
                    </Button>
                    {formData.taxDocument && (
                      <p className="text-sm text-green-600 mt-2">✓ {formData.taxDocument.name}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label>Identity Document</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Upload government-issued ID</p>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload("identityDocument", e.target.files?.[0] || null)}
                      className="hidden"
                      id="identityDocument"
                    />
                    <Button variant="outline" onClick={() => document.getElementById("identityDocument")?.click()}>
                      Choose File
                    </Button>
                    {formData.identityDocument && (
                      <p className="text-sm text-green-600 mt-2">✓ {formData.identityDocument.name}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CreditCard className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Banking Information</h3>
              <p className="text-gray-600">Where should we send your payments?</p>
            </div>

            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                Your banking information is encrypted and secure. We use bank-level security to protect your data.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div>
                <Label htmlFor="bankName">Bank Name *</Label>
                <Input
                  id="bankName"
                  value={formData.bankName}
                  onChange={(e) => handleInputChange("bankName", e.target.value)}
                  placeholder="Bank of America"
                  required
                />
              </div>

              <div>
                <Label htmlFor="accountHolderName">Account Holder Name *</Label>
                <Input
                  id="accountHolderName"
                  value={formData.accountHolderName}
                  onChange={(e) => handleInputChange("accountHolderName", e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="accountNumber">Account Number *</Label>
                  <Input
                    id="accountNumber"
                    value={formData.accountNumber}
                    onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                    placeholder="1234567890"
                    type="password"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="routingNumber">Routing Number *</Label>
                  <Input
                    id="routingNumber"
                    value={formData.routingNumber}
                    onChange={(e) => handleInputChange("routingNumber", e.target.value)}
                    placeholder="123456789"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="accountType">Account Type</Label>
                <Select value={formData.accountType} onValueChange={(value) => handleInputChange("accountType", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checking">Checking</SelectItem>
                    <SelectItem value="savings">Savings</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Package className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Business Operations</h3>
              <p className="text-gray-600">Tell us about your business operations</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expectedMonthlyVolume">Expected Monthly Sales Volume *</Label>
                  <Select
                    value={formData.expectedMonthlyVolume}
                    onValueChange={(value) => handleInputChange("expectedMonthlyVolume", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select volume range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1000">$0 - $1,000</SelectItem>
                      <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
                      <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                      <SelectItem value="10000-25000">$10,000 - $25,000</SelectItem>
                      <SelectItem value="25000-50000">$25,000 - $50,000</SelectItem>
                      <SelectItem value="50000+">$50,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="averageOrderValue">Average Order Value</Label>
                  <Select
                    value={formData.averageOrderValue}
                    onValueChange={(value) => handleInputChange("averageOrderValue", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-25">$0 - $25</SelectItem>
                      <SelectItem value="25-50">$25 - $50</SelectItem>
                      <SelectItem value="50-100">$50 - $100</SelectItem>
                      <SelectItem value="100-250">$100 - $250</SelectItem>
                      <SelectItem value="250+">$250+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Product Categories *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {[
                    "Electronics",
                    "Fashion",
                    "Home & Garden",
                    "Sports",
                    "Books",
                    "Beauty",
                    "Automotive",
                    "Toys",
                    "Pet Supplies",
                    "Food & Beverages",
                    "Health",
                    "Jewelry",
                  ].map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={formData.productCategories.includes(category)}
                        onCheckedChange={() => handleArrayToggle("productCategories", category)}
                      />
                      <Label htmlFor={category} className="text-sm">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Shipping Methods</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {["Standard Shipping", "Express Shipping", "Overnight", "Local Pickup", "International"].map(
                    (method) => (
                      <div key={method} className="flex items-center space-x-2">
                        <Checkbox
                          id={method}
                          checked={formData.shippingMethods.includes(method)}
                          onCheckedChange={() => handleArrayToggle("shippingMethods", method)}
                        />
                        <Label htmlFor={method} className="text-sm">
                          {method}
                        </Label>
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="processingTime">Processing Time</Label>
                  <Select
                    value={formData.processingTime}
                    onValueChange={(value) => handleInputChange("processingTime", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select processing time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="same-day">Same Day</SelectItem>
                      <SelectItem value="1-2-days">1-2 Business Days</SelectItem>
                      <SelectItem value="3-5-days">3-5 Business Days</SelectItem>
                      <SelectItem value="1-week">1 Week</SelectItem>
                      <SelectItem value="2-weeks">2 Weeks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="returnPolicy">Return Policy</Label>
                  <Select
                    value={formData.returnPolicy}
                    onValueChange={(value) => handleInputChange("returnPolicy", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select return policy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no-returns">No Returns</SelectItem>
                      <SelectItem value="7-days">7 Days</SelectItem>
                      <SelectItem value="14-days">14 Days</SelectItem>
                      <SelectItem value="30-days">30 Days</SelectItem>
                      <SelectItem value="60-days">60 Days</SelectItem>
                      <SelectItem value="90-days">90 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Review & Submit</h3>
              <p className="text-gray-600">Review your information and agree to our terms</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="businessExperience">Business Experience (Optional)</Label>
                <Textarea
                  id="businessExperience"
                  value={formData.businessExperience}
                  onChange={(e) => handleInputChange("businessExperience", e.target.value)}
                  placeholder="Tell us about your business experience..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="marketplaceExperience">Marketplace Experience (Optional)</Label>
                <Textarea
                  id="marketplaceExperience"
                  value={formData.marketplaceExperience}
                  onChange={(e) => handleInputChange("marketplaceExperience", e.target.value)}
                  placeholder="Have you sold on other marketplaces? Tell us about it..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="whyJoinPlatform">Why do you want to join our platform? (Optional)</Label>
                <Textarea
                  id="whyJoinPlatform"
                  value={formData.whyJoinPlatform}
                  onChange={(e) => handleInputChange("whyJoinPlatform", e.target.value)}
                  placeholder="What attracted you to our platform?"
                  rows={3}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked)}
                  />
                  <div>
                    <Label htmlFor="agreeToTerms" className="text-sm font-medium">
                      I agree to the Terms of Service and Vendor Agreement *
                    </Label>
                    <p className="text-xs text-gray-600">
                      By checking this box, you agree to our vendor terms and conditions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="agreeToCommission"
                    checked={formData.agreeToCommission}
                    onCheckedChange={(checked) => handleInputChange("agreeToCommission", checked)}
                  />
                  <div>
                    <Label htmlFor="agreeToCommission" className="text-sm font-medium">
                      I agree to the commission structure (5% per transaction) *
                    </Label>
                    <p className="text-xs text-gray-600">Platform commission will be deducted from each sale.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="agreeToDataProcessing"
                    checked={formData.agreeToDataProcessing}
                    onCheckedChange={(checked) => handleInputChange("agreeToDataProcessing", checked)}
                  />
                  <div>
                    <Label htmlFor="agreeToDataProcessing" className="text-sm font-medium">
                      I consent to data processing for vendor verification *
                    </Label>
                    <p className="text-xs text-gray-600">We will process your information to verify your business.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">Become a Vendor</CardTitle>
          <Badge variant="outline">
            Step {currentStep} of {totalSteps}
          </Badge>
        </div>
        <div className="space-y-2">
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-gray-600">{Math.round(progress)}% Complete</p>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>
          {renderStepContent()}

          <div className="flex justify-between mt-8">
            <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1}>
              Previous
            </Button>

            <div className="flex space-x-2">
              {currentStep < totalSteps ? (
                <Button type="button" onClick={nextStep} disabled={!validateStep(currentStep)}>
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={!validateStep(currentStep) || isLoading}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isLoading ? "Submitting..." : "Submit Application"}
                </Button>
              )}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

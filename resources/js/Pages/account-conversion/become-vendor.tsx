"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import CustomerLayout from "@/layouts/customer-layout"
import { VendorApplicationForm } from "@/components/account-conversion/vendor-application-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Store,
  DollarSign,
  Users,
  TrendingUp,
  Shield,
  Headphones,
  Globe,
  CheckCircle,
  ArrowRight,
  Clock,
  Award,
} from "lucide-react"

export default function BecomeVendor() {
  const router = useRouter()
  const [showApplication, setShowApplication] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleApplicationSubmit = async (formData: any) => {
    setIsSubmitting(true)

    try {
      // Simulate API submission
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Redirect to application status page
      router.push("/account-conversion/application-status")
    } catch (error) {
      console.error("Application submission failed:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (showApplication) {
    return (
      <CustomerLayout>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <VendorApplicationForm onSubmit={handleApplicationSubmit} isLoading={isSubmitting} />
        </div>
      </CustomerLayout>
    )
  }

  return (
    <CustomerLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-6">
            <Store className="w-5 h-5" />
            <span className="font-medium">Vendor Program</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Start Selling on Dasook</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join thousands of successful vendors and turn your passion into profit. Reach millions of customers and grow
            your business with our powerful platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowApplication(true)}>
              Start Your Application
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Low Commission</h3>
              <p className="text-gray-600">Only 5% commission on sales - one of the lowest in the industry</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Huge Audience</h3>
              <p className="text-gray-600">Reach over 10 million active customers across the platform</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Growth Tools</h3>
              <p className="text-gray-600">Advanced analytics, marketing tools, and business insights</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-600">Fast, secure payments with fraud protection and dispute resolution</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Dedicated vendor support team to help you succeed</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Global Reach</h3>
              <p className="text-gray-600">Sell internationally with built-in shipping and currency support</p>
            </CardContent>
          </Card>
        </div>

        {/* Success Stories */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "TechGadgets Pro",
                category: "Electronics",
                growth: "300% in 6 months",
                revenue: "$50K/month",
                image: "/placeholder.svg?height=60&width=60",
              },
              {
                name: "Artisan Crafts",
                category: "Handmade",
                growth: "250% in 4 months",
                revenue: "$25K/month",
                image: "/placeholder.svg?height=60&width=60",
              },
              {
                name: "Fashion Forward",
                category: "Clothing",
                growth: "400% in 8 months",
                revenue: "$75K/month",
                image: "/placeholder.svg?height=60&width=60",
              },
            ].map((story, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <img src={story.image || "/placeholder.svg"} alt={story.name} className="w-12 h-12 rounded-full" />
                    <div>
                      <h3 className="font-semibold">{story.name}</h3>
                      <p className="text-sm text-gray-600">{story.category}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Growth</span>
                      <Badge variant="outline" className="text-green-600">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {story.growth}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Revenue</span>
                      <span className="font-semibold">{story.revenue}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Application Process */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Simple Application Process</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  step: 1,
                  title: "Submit Application",
                  description: "Fill out our comprehensive vendor application form",
                  icon: <Store className="w-6 h-6" />,
                  time: "10 minutes",
                },
                {
                  step: 2,
                  title: "Document Review",
                  description: "We review your business documents and information",
                  icon: <Shield className="w-6 h-6" />,
                  time: "2-3 days",
                },
                {
                  step: 3,
                  title: "Account Setup",
                  description: "Set up your vendor dashboard and payment methods",
                  icon: <CheckCircle className="w-6 h-6" />,
                  time: "1 day",
                },
                {
                  step: 4,
                  title: "Start Selling",
                  description: "List your products and start reaching customers",
                  icon: <TrendingUp className="w-6 h-6" />,
                  time: "Same day",
                },
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-blue-600">{step.icon}</div>
                  </div>
                  <div className="mb-2">
                    <Badge variant="outline" className="mb-2">
                      Step {step.step}
                    </Badge>
                    <h3 className="font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                  <div className="flex items-center justify-center space-x-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{step.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Requirements */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Requirements to Become a Vendor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  Business Requirements
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Valid business registration or license</li>
                  <li>• Tax identification number (EIN/SSN)</li>
                  <li>• Business bank account</li>
                  <li>• Physical business address</li>
                  <li>• Government-issued ID</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4 flex items-center">
                  <Award className="w-5 h-5 text-blue-600 mr-2" />
                  Quality Standards
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• High-quality product images</li>
                  <li>• Detailed product descriptions</li>
                  <li>• Competitive pricing</li>
                  <li>• Fast shipping and handling</li>
                  <li>• Excellent customer service</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                {
                  question: "How much does it cost to become a vendor?",
                  answer:
                    "It's free to apply and set up your vendor account. We only charge a 5% commission on successful sales.",
                },
                {
                  question: "How long does the approval process take?",
                  answer:
                    "Most applications are reviewed within 2-3 business days. Complex applications may take up to 5 business days.",
                },
                {
                  question: "Can I sell internationally?",
                  answer:
                    "Yes! Our platform supports international selling with built-in currency conversion and shipping options.",
                },
                {
                  question: "What payment methods do you support?",
                  answer:
                    "We support bank transfers, PayPal, and various digital payment methods depending on your location.",
                },
                {
                  question: "Do you provide marketing support?",
                  answer:
                    "Yes! We offer various marketing tools, promotional opportunities, and dedicated account management for top performers.",
                },
              ].map((faq, index) => (
                <div key={index}>
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-gray-600 text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-6 opacity-90">
            Join thousands of successful vendors and start building your business today
          </p>
          <Button size="lg" variant="secondary" onClick={() => setShowApplication(true)}>
            Start Your Application Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </CustomerLayout>
  )
}

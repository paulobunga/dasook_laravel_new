"use client"

import { Label } from "@/components/ui/label"
import { useState } from "react"
import CustomerLayout from "@/layouts/customer-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import {
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  Download,
  Edit,
  RefreshCw,
} from "lucide-react"

export default function ApplicationStatus() {
  const [application] = useState({
    id: "APP-2024-001234",
    status: "under_review",
    submittedAt: "2024-01-15T10:30:00Z",
    lastUpdated: "2024-01-16T14:20:00Z",
    estimatedCompletion: "2024-01-18T17:00:00Z",
    currentStep: 2,
    totalSteps: 4,
    businessName: "TechStore Pro",
    contactEmail: "michael.chen@techstore.com",
    contactPhone: "+1 (555) 987-6543",
    documents: [
      { name: "Business License", status: "approved", uploadedAt: "2024-01-15T10:30:00Z" },
      { name: "Tax Document", status: "approved", uploadedAt: "2024-01-15T10:30:00Z" },
      { name: "Identity Document", status: "pending", uploadedAt: "2024-01-15T10:30:00Z" },
      {
        name: "Bank Statement",
        status: "rejected",
        uploadedAt: "2024-01-15T10:30:00Z",
        reason: "Document unclear, please resubmit",
      },
    ],
    timeline: [
      {
        step: "Application Submitted",
        status: "completed",
        date: "2024-01-15T10:30:00Z",
        description: "Your vendor application has been received",
      },
      {
        step: "Document Review",
        status: "in_progress",
        date: "2024-01-16T09:00:00Z",
        description: "Our team is reviewing your submitted documents",
      },
      {
        step: "Business Verification",
        status: "pending",
        date: null,
        description: "We'll verify your business information and credentials",
      },
      {
        step: "Account Activation",
        status: "pending",
        date: null,
        description: "Your vendor account will be activated and ready to use",
      },
    ],
    messages: [
      {
        id: 1,
        from: "Vendor Support Team",
        message: "Thank you for your application! We're currently reviewing your documents.",
        timestamp: "2024-01-15T11:00:00Z",
        type: "info",
      },
      {
        id: 2,
        from: "Document Review Team",
        message: "Your bank statement needs to be resubmitted. Please ensure all information is clearly visible.",
        timestamp: "2024-01-16T14:20:00Z",
        type: "action_required",
      },
    ],
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "under_review":
        return "bg-blue-100 text-blue-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "action_required":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "in_progress":
        return <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
      case "pending":
        return <Clock className="w-5 h-5 text-gray-400" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const progress = (application.currentStep / application.totalSteps) * 100

  return (
    <CustomerLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Vendor Application Status</h1>
              <p className="text-gray-600">Application ID: {application.id}</p>
            </div>
            <Badge className={getStatusColor(application.status)}>
              {application.status.replace("_", " ").toUpperCase()}
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </div>

        {/* Action Required Alert */}
        {application.status === "action_required" && (
          <Alert className="mb-6 border-orange-200 bg-orange-50">
            <AlertCircle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              Action required: Please review the messages below and resubmit any requested documents.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Application Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Application Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {application.timeline.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">{getStatusIcon(item.status)}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{item.step}</h3>
                          {item.date && (
                            <span className="text-sm text-gray-500">{new Date(item.date).toLocaleDateString()}</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Document Status */}
            <Card>
              <CardHeader>
                <CardTitle>Document Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {application.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <div>
                          <h4 className="font-medium">{doc.name}</h4>
                          <p className="text-sm text-gray-600">
                            Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}
                          </p>
                          {doc.reason && <p className="text-sm text-red-600 mt-1">{doc.reason}</p>}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(doc.status)}>{doc.status.toUpperCase()}</Badge>
                        {doc.status === "rejected" && (
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4 mr-1" />
                            Resubmit
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Messages */}
            <Card>
              <CardHeader>
                <CardTitle>Messages & Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {application.messages.map((message) => (
                    <div key={message.id} className="border-l-4 border-blue-500 pl-4 py-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{message.from}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(message.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{message.message}</p>
                      {message.type === "action_required" && (
                        <Badge className="mt-2 bg-orange-100 text-orange-800">Action Required</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Application Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Application Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Business Name</Label>
                  <p className="font-medium">{application.businessName}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-600">Submitted</Label>
                  <p className="text-sm">{new Date(application.submittedAt).toLocaleDateString()}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-600">Last Updated</Label>
                  <p className="text-sm">{new Date(application.lastUpdated).toLocaleDateString()}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-600">Estimated Completion</Label>
                  <p className="text-sm">{new Date(application.estimatedCompletion).toLocaleDateString()}</p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Button className="w-full" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Application
                  </Button>
                  <Button className="w-full" variant="outline">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-sm text-gray-600">vendor-support@dasook.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Phone Support</p>
                    <p className="text-sm text-gray-600">+1 (800) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Business Hours</p>
                    <p className="text-sm text-gray-600">Mon-Fri 9AM-6PM PST</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </CustomerLayout>
  )
}

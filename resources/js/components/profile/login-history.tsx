"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { History, MapPin, Shield, AlertTriangle, CheckCircle, Smartphone, Monitor, Tablet } from "lucide-react"

interface LoginAttempt {
  id: string
  timestamp: string
  location: string
  device: string
  browser: string
  ip_address: string
  status: "success" | "failed" | "blocked"
  device_type: "desktop" | "mobile" | "tablet"
}

interface LoginHistoryProps {
  history?: LoginAttempt[]
}

export function LoginHistory({ history }: LoginHistoryProps) {
  const loginHistory: LoginAttempt[] = history || [
    {
      id: "1",
      timestamp: "2024-01-15T10:30:00Z",
      location: "New York, NY",
      device: "MacBook Pro",
      browser: "Chrome 120",
      ip_address: "192.168.1.100",
      status: "success",
      device_type: "desktop",
    },
    {
      id: "2",
      timestamp: "2024-01-15T09:15:00Z",
      location: "New York, NY",
      device: "iPhone 15 Pro",
      browser: "Safari 17",
      ip_address: "192.168.1.101",
      status: "success",
      device_type: "mobile",
    },
    {
      id: "3",
      timestamp: "2024-01-14T22:45:00Z",
      location: "Unknown Location",
      device: "Unknown Device",
      browser: "Chrome 119",
      ip_address: "203.0.113.1",
      status: "blocked",
      device_type: "desktop",
    },
    {
      id: "4",
      timestamp: "2024-01-14T18:20:00Z",
      location: "Los Angeles, CA",
      device: "Windows PC",
      browser: "Edge 120",
      ip_address: "198.51.100.1",
      status: "failed",
      device_type: "desktop",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return (
          <Badge variant="outline" className="text-green-600 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Success
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="destructive">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Failed
          </Badge>
        )
      case "blocked":
        return (
          <Badge variant="secondary" className="text-orange-600">
            <Shield className="w-3 h-3 mr-1" />
            Blocked
          </Badge>
        )
      default:
        return null
    }
  }

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "mobile":
        return <Smartphone className="w-4 h-4" />
      case "tablet":
        return <Tablet className="w-4 h-4" />
      default:
        return <Monitor className="w-4 h-4" />
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <History className="w-5 h-5" />
          <span>Login History</span>
        </CardTitle>
        <p className="text-sm text-gray-600">Recent login attempts and security events</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {loginHistory.map((attempt) => (
            <div key={attempt.id} className="flex items-start justify-between p-4 rounded-lg border">
              <div className="flex items-start space-x-4">
                <div className="text-gray-600 mt-1">{getDeviceIcon(attempt.device_type)}</div>

                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    {getStatusBadge(attempt.status)}
                    <span className="text-sm text-gray-600">{formatTimestamp(attempt.timestamp)}</span>
                  </div>

                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex items-center space-x-4">
                      <span className="font-medium">{attempt.device}</span>
                      <span>•</span>
                      <span>{attempt.browser}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{attempt.location}</span>
                      </div>
                      <span>•</span>
                      <span className="font-mono text-xs">{attempt.ip_address}</span>
                    </div>
                  </div>
                </div>
              </div>

              {attempt.status === "blocked" && (
                <Button variant="outline" size="sm">
                  Report Issue
                </Button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium">Security Alert</h4>
              <p className="text-sm text-gray-600">Get notified of suspicious login attempts</p>
            </div>
            <Button variant="outline">Configure Alerts</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

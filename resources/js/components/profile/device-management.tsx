"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Smartphone, Monitor, Tablet, MapPin, Calendar, Shield, AlertTriangle, LogOut } from "lucide-react"

interface Device {
  id: string
  name: string
  type: "desktop" | "mobile" | "tablet"
  browser: string
  os: string
  location: string
  last_active: string
  is_current: boolean
  trusted: boolean
}

interface DeviceManagementProps {
  devices?: Device[]
}

export function DeviceManagement({ devices }: DeviceManagementProps) {
  const [deviceList, setDeviceList] = useState<Device[]>(
    devices || [
      {
        id: "1",
        name: "MacBook Pro",
        type: "desktop",
        browser: "Chrome 120",
        os: "macOS 14.2",
        location: "New York, NY",
        last_active: "2024-01-15T10:30:00Z",
        is_current: true,
        trusted: true,
      },
      {
        id: "2",
        name: "iPhone 15 Pro",
        type: "mobile",
        browser: "Safari 17",
        os: "iOS 17.2",
        location: "New York, NY",
        last_active: "2024-01-15T09:15:00Z",
        is_current: false,
        trusted: true,
      },
      {
        id: "3",
        name: "Windows PC",
        type: "desktop",
        browser: "Edge 120",
        os: "Windows 11",
        location: "Unknown Location",
        last_active: "2024-01-10T14:22:00Z",
        is_current: false,
        trusted: false,
      },
    ],
  )

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "mobile":
        return <Smartphone className="w-5 h-5" />
      case "tablet":
        return <Tablet className="w-5 h-5" />
      default:
        return <Monitor className="w-5 h-5" />
    }
  }

  const formatLastActive = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Active now"
    if (diffInHours < 24) return `${diffInHours} hours ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays} days ago`
  }

  const handleSignOutDevice = (deviceId: string) => {
    setDeviceList((prev) => prev.filter((device) => device.id !== deviceId))
  }

  const handleTrustDevice = (deviceId: string) => {
    setDeviceList((prev) =>
      prev.map((device) => (device.id === deviceId ? { ...device, trusted: !device.trusted } : device)),
    )
  }

  const handleSignOutAll = () => {
    setDeviceList((prev) => prev.filter((device) => device.is_current))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="w-5 h-5" />
          <span>Device Management</span>
        </CardTitle>
        <p className="text-sm text-gray-600">Manage devices that have access to your account</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {deviceList.map((device, index) => (
          <div key={device.id}>
            <div className="flex items-start justify-between p-4 rounded-lg border">
              <div className="flex items-start space-x-4">
                <div className="text-gray-600 mt-1">{getDeviceIcon(device.type)}</div>

                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium">{device.name}</h4>
                    {device.is_current && (
                      <Badge variant="secondary" className="text-xs">
                        Current Device
                      </Badge>
                    )}
                    {device.trusted ? (
                      <Badge variant="outline" className="text-xs text-green-600">
                        Trusted
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="text-xs">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Untrusted
                      </Badge>
                    )}
                  </div>

                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex items-center space-x-4">
                      <span>
                        {device.browser} • {device.os}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{device.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatLastActive(device.last_active)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {!device.is_current && (
                  <>
                    <Button variant="outline" size="sm" onClick={() => handleTrustDevice(device.id)}>
                      {device.trusted ? "Untrust" : "Trust"}
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleSignOutDevice(device.id)}>
                      <LogOut className="w-4 h-4 mr-1" />
                      Sign Out
                    </Button>
                  </>
                )}
              </div>
            </div>
            {index < deviceList.length - 1 && <Separator className="my-4" />}
          </div>
        ))}

        <Separator />

        <div className="flex justify-between items-center pt-4">
          <div>
            <h4 className="font-medium">Sign out all devices</h4>
            <p className="text-sm text-gray-600">This will sign you out of all devices except this one</p>
          </div>
          <Button variant="destructive" onClick={handleSignOutAll}>
            Sign Out All
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

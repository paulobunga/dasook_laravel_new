"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, Eye, Database, Share2, Cookie, Download, Trash2 } from "lucide-react"

interface AdvancedPrivacySettingsProps {
  settings?: any
}

export function AdvancedPrivacySettings({ settings }: AdvancedPrivacySettingsProps) {
  const [privacySettings, setPrivacySettings] = useState({
    data_collection: {
      analytics: true,
      personalization: true,
      marketing: false,
      third_party_sharing: false,
    },
    visibility: {
      profile_public: false,
      activity_tracking: true,
      search_indexing: false,
      social_sharing: true,
    },
    communications: {
      email_tracking: false,
      read_receipts: true,
      typing_indicators: true,
      online_status: false,
    },
    data_retention: {
      auto_delete_period: "never",
      backup_frequency: "monthly",
      export_format: "json",
    },
  })

  const handleSettingChange = (category: string, setting: string, value: any) => {
    setPrivacySettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value,
      },
    }))
  }

  const handleDataExport = () => {
    // Simulate data export
    console.log("Exporting user data...")
  }

  const handleAccountDeletion = () => {
    // Simulate account deletion request
    console.log("Requesting account deletion...")
  }

  return (
    <div className="space-y-6">
      {/* Data Collection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="w-5 h-5" />
            <span>Data Collection & Usage</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Analytics & Performance</Label>
              <p className="text-sm text-gray-600">Help us improve our services with usage analytics</p>
            </div>
            <Switch
              checked={privacySettings.data_collection.analytics}
              onCheckedChange={(checked) => handleSettingChange("data_collection", "analytics", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Personalization</Label>
              <p className="text-sm text-gray-600">Customize your experience based on your preferences</p>
            </div>
            <Switch
              checked={privacySettings.data_collection.personalization}
              onCheckedChange={(checked) => handleSettingChange("data_collection", "personalization", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Marketing & Advertising</Label>
              <p className="text-sm text-gray-600">Use your data for targeted marketing campaigns</p>
            </div>
            <Switch
              checked={privacySettings.data_collection.marketing}
              onCheckedChange={(checked) => handleSettingChange("data_collection", "marketing", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Third-Party Data Sharing</Label>
              <p className="text-sm text-gray-600">Share anonymized data with trusted partners</p>
            </div>
            <Switch
              checked={privacySettings.data_collection.third_party_sharing}
              onCheckedChange={(checked) => handleSettingChange("data_collection", "third_party_sharing", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Profile Visibility */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Eye className="w-5 h-5" />
            <span>Profile Visibility</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Public Profile</Label>
              <p className="text-sm text-gray-600">Make your profile visible to other users</p>
            </div>
            <Switch
              checked={privacySettings.visibility.profile_public}
              onCheckedChange={(checked) => handleSettingChange("visibility", "profile_public", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Activity Tracking</Label>
              <p className="text-sm text-gray-600">Track your browsing and shopping activity</p>
            </div>
            <Switch
              checked={privacySettings.visibility.activity_tracking}
              onCheckedChange={(checked) => handleSettingChange("visibility", "activity_tracking", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Search Engine Indexing</Label>
              <p className="text-sm text-gray-600">Allow search engines to index your public profile</p>
            </div>
            <Switch
              checked={privacySettings.visibility.search_indexing}
              onCheckedChange={(checked) => handleSettingChange("visibility", "search_indexing", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Social Media Sharing</Label>
              <p className="text-sm text-gray-600">Enable sharing your activities on social media</p>
            </div>
            <Switch
              checked={privacySettings.visibility.social_sharing}
              onCheckedChange={(checked) => handleSettingChange("visibility", "social_sharing", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Communication Privacy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Share2 className="w-5 h-5" />
            <span>Communication Privacy</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Email Tracking</Label>
              <p className="text-sm text-gray-600">Track when you open our emails</p>
            </div>
            <Switch
              checked={privacySettings.communications.email_tracking}
              onCheckedChange={(checked) => handleSettingChange("communications", "email_tracking", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Read Receipts</Label>
              <p className="text-sm text-gray-600">Show when you've read messages</p>
            </div>
            <Switch
              checked={privacySettings.communications.read_receipts}
              onCheckedChange={(checked) => handleSettingChange("communications", "read_receipts", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Typing Indicators</Label>
              <p className="text-sm text-gray-600">Show when you're typing in chat</p>
            </div>
            <Switch
              checked={privacySettings.communications.typing_indicators}
              onCheckedChange={(checked) => handleSettingChange("communications", "typing_indicators", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Online Status</Label>
              <p className="text-sm text-gray-600">Show when you're online to other users</p>
            </div>
            <Switch
              checked={privacySettings.communications.online_status}
              onCheckedChange={(checked) => handleSettingChange("communications", "online_status", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Cookie className="w-5 h-5" />
            <span>Data Management</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label>Auto-Delete Period</Label>
            <Select
              value={privacySettings.data_retention.auto_delete_period}
              onValueChange={(value) => handleSettingChange("data_retention", "auto_delete_period", value)}
            >
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="never">Never</SelectItem>
                <SelectItem value="1_year">After 1 year</SelectItem>
                <SelectItem value="2_years">After 2 years</SelectItem>
                <SelectItem value="5_years">After 5 years</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-600 mt-1">Automatically delete your data after the specified period</p>
          </div>

          <div>
            <Label>Data Backup Frequency</Label>
            <Select
              value={privacySettings.data_retention.backup_frequency}
              onValueChange={(value) => handleSettingChange("data_retention", "backup_frequency", value)}
            >
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="never">Never</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Export Your Data</h4>
                <p className="text-sm text-gray-600">Download a copy of all your personal data</p>
              </div>
              <Button variant="outline" onClick={handleDataExport}>
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-red-600">Delete Account</h4>
                <p className="text-sm text-gray-600">Permanently delete your account and all associated data</p>
              </div>
              <Button variant="destructive" onClick={handleAccountDeletion}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* GDPR Compliance */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">GDPR Compliance</h4>
              <p className="text-sm text-blue-700 mt-1">
                We comply with GDPR regulations. You have the right to access, rectify, erase, and port your data.
                Contact our privacy team for any data-related requests.
              </p>
              <Button variant="outline" size="sm" className="mt-2 border-blue-300 text-blue-700">
                Learn More
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

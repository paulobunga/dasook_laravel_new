"use client"

import AdminLayout from "@/layouts/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, MessageSquare, Users, Clock, Send, Archive, Star } from "lucide-react"
import { Link } from "@inertiajs/react"
import { useState } from "react"

interface ChatConversation {
  id: number
  type: "user_vendor" | "user_support" | "vendor_support"
  subject?: string
  status: "active" | "closed" | "archived"
  user?: {
    first_name: string
    last_name: string
    email: string
  }
  vendor?: {
    store_name: string
  }
  support_agent?: {
    first_name: string
    last_name: string
  }
  last_message_at: string
  unread_count: number
  created_at: string
}

interface ChatMessage {
  id: number
  sender_id: number
  sender_type: "user" | "vendor" | "support"
  message_type: "text" | "image" | "file" | "system"
  content: string
  is_read: boolean
  created_at: string
}

interface ChatPageProps {
  conversations: {
    data: ChatConversation[]
    links: any[]
    meta: any
  }
  activeConversation?: ChatConversation
  messages?: ChatMessage[]
  filters: {
    search?: string
    type?: string
    status?: string
  }
}

export default function ChatPage({ conversations, activeConversation, messages = [], filters }: ChatPageProps) {
  const [newMessage, setNewMessage] = useState("")

  const getTypeColor = (type: string) => {
    switch (type) {
      case "user_vendor":
        return "default"
      case "user_support":
        return "secondary"
      case "vendor_support":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "closed":
        return "secondary"
      case "archived":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "user_vendor":
        return "Customer ↔ Vendor"
      case "user_support":
        return "Customer ↔ Support"
      case "vendor_support":
        return "Vendor ↔ Support"
      default:
        return type
    }
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Chat Management</h1>
            <p className="text-gray-600">Monitor and manage customer conversations</p>
          </div>
          <Button asChild>
            <Link href="/admin/chat/settings">Chat Settings</Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <MessageSquare className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">
                    {conversations.data.filter((c) => c.status === "active").length}
                  </div>
                  <p className="text-sm text-gray-600">Active Chats</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">
                    {conversations.data.reduce((sum, c) => sum + c.unread_count, 0)}
                  </div>
                  <p className="text-sm text-gray-600">Unread Messages</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">
                    {conversations.data.filter((c) => c.type === "user_support").length}
                  </div>
                  <p className="text-sm text-gray-600">Support Requests</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Archive className="h-8 w-8 text-gray-600" />
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">
                    {conversations.data.filter((c) => c.status === "archived").length}
                  </div>
                  <p className="text-sm text-gray-600">Archived</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Conversations</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="Search conversations..." className="pl-10" defaultValue={filters.search} />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-96 overflow-y-auto">
                  {conversations.data.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                        activeConversation?.id === conversation.id ? "bg-blue-50 border-blue-200" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant={getTypeColor(conversation.type)} className="text-xs">
                              {getTypeLabel(conversation.type)}
                            </Badge>
                            {conversation.unread_count > 0 && (
                              <Badge variant="destructive" className="text-xs">
                                {conversation.unread_count}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {conversation.subject || "No subject"}
                          </p>
                          <div className="text-xs text-gray-500">
                            {conversation.user && (
                              <span>
                                {conversation.user.first_name} {conversation.user.last_name}
                              </span>
                            )}
                            {conversation.vendor && <span> • {conversation.vendor.store_name}</span>}
                          </div>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(conversation.last_message_at).toLocaleString()}
                          </p>
                        </div>
                        <Badge variant={getStatusColor(conversation.status)} className="text-xs">
                          {conversation.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            {activeConversation ? (
              <Card className="h-full">
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{activeConversation.subject || "Chat Conversation"}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={getTypeColor(activeConversation.type)}>
                          {getTypeLabel(activeConversation.type)}
                        </Badge>
                        <Badge variant={getStatusColor(activeConversation.status)}>{activeConversation.status}</Badge>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Star className="w-4 h-4 mr-2" />
                          Mark Important
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Archive className="w-4 h-4 mr-2" />
                          Archive
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Close Conversation</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="p-0">
                  <div className="h-96 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender_type === "support" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.sender_type === "support" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`text-xs mt-1 ${
                              message.sender_type === "support" ? "text-blue-100" : "text-gray-500"
                            }`}
                          >
                            {new Date(message.created_at).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="border-t p-4">
                    <div className="flex gap-2">
                      <Textarea
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1 min-h-[60px]"
                      />
                      <Button className="self-end">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center">
                  <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No conversation selected</h3>
                  <p className="text-gray-600">Select a conversation from the list to start chatting</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

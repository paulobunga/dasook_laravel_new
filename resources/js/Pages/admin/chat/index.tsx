"use client"

import type React from "react"
import { useState } from "react"
import { Head } from "@inertiajs/react"
import AdminLayout from "@/layouts/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Send, MoreVertical, Phone, Video } from "lucide-react"

interface ChatUser {
  id: number
  name: string
  avatar?: string
  role: "customer" | "vendor"
  last_message: string
  last_message_time: string
  unread_count: number
  online: boolean
}

interface Message {
  id: number
  sender_id: number
  sender_name: string
  message: string
  timestamp: string
  is_admin: boolean
}

interface Props {
  chatUsers: ChatUser[]
  activeChat?: {
    user: ChatUser
    messages: Message[]
  }
}

export default function ChatIndex({ chatUsers, activeChat }: Props) {
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(activeChat?.user || null)
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    // Handle message sending logic here
    setNewMessage("")
  }

  return (
    <AdminLayout>
      <Head title="Chat Management" />

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Chat Management</h1>
            <p className="text-muted-foreground">Communicate with customers and vendors</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Chat List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Conversations</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search conversations..." className="pl-10" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[500px]">
                {chatUsers.map((user) => (
                  <div
                    key={user.id}
                    className={`p-4 border-b cursor-pointer hover:bg-muted/50 ${
                      selectedUser?.id === user.id ? "bg-muted" : ""
                    }`}
                    onClick={() => setSelectedUser(user)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {user.online && (
                          <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium truncate">{user.name}</p>
                          <div className="flex items-center gap-1">
                            <Badge variant={user.role === "vendor" ? "default" : "secondary"} className="text-xs">
                              {user.role}
                            </Badge>
                            {user.unread_count > 0 && (
                              <Badge variant="destructive" className="text-xs">
                                {user.unread_count}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{user.last_message}</p>
                        <p className="text-xs text-muted-foreground">{user.last_message_time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Chat Window */}
          <Card className="lg:col-span-3">
            {selectedUser ? (
              <>
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedUser.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{selectedUser.name}</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant={selectedUser.role === "vendor" ? "default" : "secondary"} className="text-xs">
                            {selectedUser.role}
                          </Badge>
                          <span
                            className={`text-xs ${selectedUser.online ? "text-green-600" : "text-muted-foreground"}`}
                          >
                            {selectedUser.online ? "Online" : "Offline"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-0">
                  <ScrollArea className="h-[400px] p-4">
                    {activeChat?.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`mb-4 flex ${message.is_admin ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            message.is_admin ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{message.message}</p>
                          <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>

                  <div className="border-t p-4">
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                      <Input
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1"
                      />
                      <Button type="submit" size="sm">
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
                  <p className="text-muted-foreground">Choose a conversation from the list to start chatting</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}

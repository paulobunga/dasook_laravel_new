"use client"

import { Head } from "@inertiajs/react"
import VendorLayout from "@/layouts/vendor-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MoreHorizontal, Search, Eye, Check, X, MessageCircle, DollarSign, Clock, TrendingUp } from "lucide-react"
import { useState } from "react"

interface Offer {
  id: number
  product: {
    id: number
    name: string
    image_url?: string
  }
  customer: {
    name: string
    email: string
    phone?: string
  }
  offer_amount: number
  message?: string
  status: "pending" | "accepted" | "rejected" | "countered" | "expired"
  expires_at?: string
  created_at: string
  counter_offer?: {
    amount: number
    message: string
    created_at: string
  }
}

interface ContactRequest {
  id: number
  product: {
    id: number
    name: string
    image_url?: string
  }
  customer: {
    name: string
    email: string
    phone?: string
  }
  message: string
  status: "pending" | "responded" | "closed"
  created_at: string
  response?: {
    message: string
    created_at: string
  }
}

interface Props {
  offers: {
    data: Offer[]
    meta: any
  }
  contactRequests: {
    data: ContactRequest[]
    meta: any
  }
  stats: {
    pending_offers: number
    pending_contacts: number
    total_offers_value: number
    acceptance_rate: number
  }
}

export default function VendorOffers({ offers, contactRequests, stats }: Props) {
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null)
  const [selectedContact, setSelectedContact] = useState<ContactRequest | null>(null)
  const [counterOfferAmount, setCounterOfferAmount] = useState("")
  const [counterOfferMessage, setCounterOfferMessage] = useState("")
  const [responseMessage, setResponseMessage] = useState("")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "accepted":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "countered":
        return "bg-blue-100 text-blue-800"
      case "expired":
        return "bg-gray-100 text-gray-800"
      case "responded":
        return "bg-green-100 text-green-800"
      case "closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const isExpired = (expiresAt?: string) => {
    if (!expiresAt) return false
    return new Date(expiresAt) < new Date()
  }

  return (
    <VendorLayout>
      <Head title="Offers & Inquiries" />

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Offers & Inquiries</h1>
          <p className="text-muted-foreground">Manage customer offers and pricing inquiries</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Offers</p>
                  <p className="text-2xl font-bold">{stats.pending_offers}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Contacts</p>
                  <p className="text-2xl font-bold">{stats.pending_contacts}</p>
                </div>
                <MessageCircle className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Offers Value</p>
                  <p className="text-2xl font-bold">${stats.total_offers_value.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Acceptance Rate</p>
                  <p className="text-2xl font-bold">{stats.acceptance_rate}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="offers" className="space-y-4">
          <TabsList>
            <TabsTrigger value="offers">Offers ({offers.data.length})</TabsTrigger>
            <TabsTrigger value="contacts">Contact Requests ({contactRequests.data.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="offers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Customer Offers</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search offers..." className="pl-8" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Offer Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Expires</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="w-[70px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {offers.data.map((offer) => (
                      <TableRow key={offer.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-200 rounded"></div>
                            <div>
                              <div className="font-medium">{offer.product.name}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{offer.customer.name}</div>
                            <div className="text-sm text-muted-foreground">{offer.customer.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold">${offer.offer_amount.toFixed(2)}</span>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(offer.status)}>
                            {offer.status}
                            {isExpired(offer.expires_at) && offer.status === "pending" && " (Expired)"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {offer.expires_at ? (
                            <span className={isExpired(offer.expires_at) ? "text-red-600" : ""}>
                              {new Date(offer.expires_at).toLocaleDateString()}
                            </span>
                          ) : (
                            "No expiry"
                          )}
                        </TableCell>
                        <TableCell>{new Date(offer.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setSelectedOffer(offer)}>
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              {offer.status === "pending" && !isExpired(offer.expires_at) && (
                                <>
                                  <DropdownMenuItem className="text-green-600">
                                    <Check className="w-4 h-4 mr-2" />
                                    Accept Offer
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <MessageCircle className="w-4 h-4 mr-2" />
                                    Counter Offer
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    <X className="w-4 h-4 mr-2" />
                                    Reject Offer
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contact Requests</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search contacts..." className="pl-8" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="w-[70px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contactRequests.data.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-200 rounded"></div>
                            <div>
                              <div className="font-medium">{contact.product.name}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{contact.customer.name}</div>
                            <div className="text-sm text-muted-foreground">{contact.customer.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-xs truncate">{contact.message}</div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(contact.status)}>{contact.status}</Badge>
                        </TableCell>
                        <TableCell>{new Date(contact.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setSelectedContact(contact)}>
                                <Eye className="w-4 h-4 mr-2" />
                                View & Respond
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Offer Details Dialog */}
      {selectedOffer && (
        <Dialog open={!!selectedOffer} onOpenChange={() => setSelectedOffer(null)}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Offer Details</DialogTitle>
              <DialogDescription>Review and respond to this customer offer</DialogDescription>
            </DialogHeader>
            {/* Offer details content would go here */}
          </DialogContent>
        </Dialog>
      )}

      {/* Contact Response Dialog */}
      {selectedContact && (
        <Dialog open={!!selectedContact} onOpenChange={() => setSelectedContact(null)}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Respond to Inquiry</DialogTitle>
              <DialogDescription>Send a response to this customer inquiry</DialogDescription>
            </DialogHeader>
            {/* Contact response content would go here */}
          </DialogContent>
        </Dialog>
      )}
    </VendorLayout>
  )
}

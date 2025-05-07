"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Clock, MapPin, Send, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { mockComplaints } from "@/lib/mock-data"

export default function ComplaintDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [comment, setComment] = useState("")

  // Find the complaint by ID
  const complaint = mockComplaints.find((c) => c.id === params.id) || mockComplaints[0]

  // Mock comments
  const [comments, setComments] = useState([
    {
      id: "1",
      user: "Admin User",
      role: "Administrator",
      content: "Assigning this to the Water & Sewage department for investigation.",
      timestamp: "2023-05-15T10:30:00Z",
    },
    {
      id: "2",
      user: "John Technician",
      role: "Water & Sewage Dept.",
      content: "I've scheduled an inspection for tomorrow morning. Will update after the visit.",
      timestamp: "2023-05-15T14:45:00Z",
    },
  ])

  // Handle comment submission
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim()) return

    const newComment = {
      id: Date.now().toString(),
      user: "Admin User",
      role: "Administrator",
      content: comment,
      timestamp: new Date().toISOString(),
    }

    setComments((prev) => [...prev, newComment])
    setComment("")
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Complaint Details</h1>
        <div className="ml-auto flex items-center gap-2">
          <Select defaultValue={complaint.status}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
          <Button>Mark as Resolved</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{complaint.title}</CardTitle>
                  <CardDescription>
                    Complaint #{complaint.id.slice(0, 8)} • Submitted {formatDate(complaint.createdAt)}
                  </CardDescription>
                </div>
                <Badge
                  variant={
                    complaint.status === "resolved"
                      ? "default"
                      : complaint.status === "in-progress"
                        ? "secondary"
                        : "outline"
                  }
                  className="ml-auto"
                >
                  {complaint.status === "in-progress"
                    ? "In Progress"
                    : complaint.status === "resolved"
                      ? "Resolved"
                      : "Pending"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Description</h3>
                  <p className="mt-2 text-muted-foreground">{complaint.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Submitted by: {complaint.submittedBy}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Date: {new Date(complaint.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Location: {complaint.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Time: {new Date(complaint.createdAt).toLocaleTimeString()}</span>
                  </div>
                </div>

                {complaint.attachments && complaint.attachments.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-2">Attachments</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {complaint.attachments.map((attachment, index) => (
                        <div key={index} className="border rounded-md overflow-hidden">
                          <img
                            src="/placeholder.svg?height=200&width=300"
                            alt={`Attachment ${index + 1}`}
                            className="w-full h-32 object-cover"
                          />
                          <div className="p-2 text-sm">Attachment {index + 1}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activity & Comments</CardTitle>
              <CardDescription>Communication history and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt={comment.user} />
                      <AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{comment.user}</span>
                        <Badge variant="outline" className="text-xs">
                          {comment.role}
                        </Badge>
                        <span className="text-xs text-muted-foreground ml-auto">{formatDate(comment.timestamp)}</span>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <form onSubmit={handleCommentSubmit} className="w-full space-y-4">
                <Textarea
                  placeholder="Add a comment or update..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <div className="flex justify-end">
                  <Button type="submit">
                    <Send className="mr-2 h-4 w-4" />
                    Send
                  </Button>
                </div>
              </form>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Assignment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Department</label>
                <Select defaultValue={complaint.department}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Water & Sewage">Water & Sewage</SelectItem>
                    <SelectItem value="Roads & Infrastructure">Roads & Infrastructure</SelectItem>
                    <SelectItem value="Waste Management">Waste Management</SelectItem>
                    <SelectItem value="Public Safety">Public Safety</SelectItem>
                    <SelectItem value="Housing">Housing</SelectItem>
                    <SelectItem value="Health Services">Health Services</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Assign to Staff</label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select staff member" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="john-doe">John Doe</SelectItem>
                    <SelectItem value="jane-smith">Jane Smith</SelectItem>
                    <SelectItem value="robert-johnson">Robert Johnson</SelectItem>
                    <SelectItem value="sarah-williams">Sarah Williams</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Priority</label>
                <Select defaultValue="medium">
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full">Update Assignment</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <div className="h-full w-px bg-border"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Complaint Submitted</p>
                    <p className="text-xs text-muted-foreground">{formatDate(complaint.createdAt)}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <div className="h-full w-px bg-border"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Assigned to Department</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(
                        new Date(new Date(complaint.createdAt).getTime() + 24 * 60 * 60 * 1000).toISOString(),
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <div className="h-full w-px bg-border"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Investigation Started</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(
                        new Date(new Date(complaint.createdAt).getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(),
                      )}
                    </p>
                  </div>
                </div>

                {complaint.status === "resolved" && (
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Complaint Resolved</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(
                          new Date(new Date(complaint.createdAt).getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(),
                        )}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Related Complaints</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockComplaints
                  .filter((c) => c.department === complaint.department && c.id !== complaint.id)
                  .slice(0, 3)
                  .map((relatedComplaint) => (
                    <div key={relatedComplaint.id} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{relatedComplaint.title}</p>
                        <p className="text-xs text-muted-foreground">#{relatedComplaint.id.slice(0, 8)}</p>
                      </div>
                      <Badge
                        variant={
                          relatedComplaint.status === "resolved"
                            ? "default"
                            : relatedComplaint.status === "in-progress"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {relatedComplaint.status === "in-progress"
                          ? "In Progress"
                          : relatedComplaint.status === "resolved"
                            ? "Resolved"
                            : "Pending"}
                      </Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Clock, MapPin, Send, User } from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

interface Complaint {
  id: string
  name: string
  email: string
  phone: string
  service: string
  complaint_type: string
  complaint_details: string
  department_id: string | null
  status: "pending" | "in_progress" | "resolved" | "rejected"
  created_at: string
  updated_at: string
}

interface Department {
  id: string
  name: string
  description: string
  code: string
}

interface Comment {
  id: string
  complaint_id: string
  user_id: string
  content: string
  created_at: string
  user: {
    name: string
    role: string
  }
}

interface ComplaintDetailProps {
  id: string
}

export default function ComplaintDetail({ id }: ComplaintDetailProps) {
  const router = useRouter()
  const [comment, setComment] = useState("")
  const [complaint, setComplaint] = useState<Complaint | null>(null)
  const [departments, setDepartments] = useState<Department[]>([])
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [userRole, setUserRole] = useState<string>("")
  const [userDepartmentId, setUserDepartmentId] = useState<string>("")

  const supabase = createClientComponentClient()
  const { toast } = useToast()

  // Get current user and their role/department
  useEffect(() => {
    const getCurrentUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (session?.user) {
        setUser(session.user)
        setUserRole(session.user.user_metadata?.role || "")
        setUserDepartmentId(session.user.user_metadata?.department_id || "")
      }
    }
    getCurrentUser()
  }, [supabase])

  // Fetch complaint details
  useEffect(() => {
    const fetchComplaint = async () => {
      if (!user) return

      setLoading(true)
      try {
        let query = supabase.from("complaints").select("*").eq("id", id)

        // Apply role-based filtering
        if (userRole !== "administrator" && userDepartmentId) {
          query = query.eq("department_id", userDepartmentId)
        }

        const { data, error } = await query.single()

        if (error) throw error
        setComplaint(data)
      } catch (error) {
        console.error("Error fetching complaint:", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch complaint details. Please try again.",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchComplaint()
  }, [id, user, userRole, userDepartmentId, supabase, toast])

  // Fetch departments
  useEffect(() => {
    const fetchDepartments = async () => {
      const { data } = await supabase.from("departments").select("*")
      if (data) {
        setDepartments(data)
      }
    }
    fetchDepartments()
  }, [supabase])

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      if (!complaint) return

      const { data, error } = await supabase
        .from("comments")
        .select(`
          *,
          user:users(name, role)
        `)
        .eq("complaint_id", complaint.id)
        .order("created_at", { ascending: true })

      if (error) {
        console.error("Error fetching comments:", error)
      } else {
        setComments(data || [])
      }
    }

    fetchComments()
  }, [complaint, supabase])

  // Handle status change
  const handleStatusChange = async (newStatus: "pending" | "in_progress" | "resolved" | "rejected") => {
    if (!complaint) return

    try {
      const { error } = await supabase
        .from("complaints")
        .update({
          status: newStatus,
          updated_at: new Date().toISOString(),
        })
        .eq("id", complaint.id)

      if (error) throw error

      setComplaint((prev) => (prev ? { ...prev, status: newStatus, updated_at: new Date().toISOString() } : null))

      toast({
        title: "Status Updated",
        description: `Complaint status changed to ${newStatus}`,
      })
    } catch (error) {
      console.error("Error updating status:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update complaint status. Please try again.",
      })
    }
  }

  // Handle department assignment
  const handleDepartmentChange = async (departmentId: string) => {
    if (!complaint) return

    try {
      const { error } = await supabase
        .from("complaints")
        .update({
          department_id: departmentId,
          updated_at: new Date().toISOString(),
        })
        .eq("id", complaint.id)

      if (error) throw error

      setComplaint((prev) =>
        prev ? { ...prev, department_id: departmentId, updated_at: new Date().toISOString() } : null,
      )

      toast({
        title: "Department Updated",
        description: "Complaint has been assigned to the selected department.",
      })
    } catch (error) {
      console.error("Error updating department:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update department assignment. Please try again.",
      })
    }
  }

  // Handle comment submission
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim() || !complaint) return

    try {
      const { error } = await supabase.from("comments").insert({
        complaint_id: complaint.id,
        user_id: user.id,
        content: comment,
        created_at: new Date().toISOString(),
      })

      if (error) throw error

      // Refresh comments
      const { data } = await supabase
        .from("comments")
        .select(`
          *,
          user:users(name, role)
        `)
        .eq("complaint_id", complaint.id)
        .order("created_at", { ascending: true })

      setComments(data || [])
      setComment("")

      toast({
        title: "Comment Added",
        description: "Your comment has been added successfully.",
      })
    } catch (error) {
      console.error("Error adding comment:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add comment. Please try again.",
      })
    }
  }

  // Get department name by ID
  const getDepartmentName = (departmentId: string | null) => {
    if (!departmentId) return "Not assigned"
    const department = departments.find((d) => d.id === departmentId)
    return department ? department.name : `Unknown Department (ID: ${departmentId})`
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading complaint details...</p>
        </div>
      </div>
    )
  }

  if (!complaint) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Complaint not found</h2>
          <p className="text-muted-foreground mt-2">
            The complaint you're looking for doesn't exist or you don't have permission to view it.
          </p>
          <Button onClick={() => router.back()} className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Complaint Details</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{complaint.complaint_type}</CardTitle>
                  <CardDescription>
                    Complaint #{complaint.id.slice(0, 8)} • Submitted {formatDate(complaint.created_at)}
                  </CardDescription>
                </div>
                <Badge
                  variant={
                    complaint.status === "resolved"
                      ? "default"
                      : complaint.status === "in_progress"
                        ? "secondary"
                        : "outline"
                  }
                  className="ml-auto"
                >
                  {complaint.status === "in_progress"
                    ? "In Progress"
                    : complaint.status === "resolved"
                      ? "Resolved"
                      : complaint.status === "rejected"
                        ? "Rejected"
                        : "Pending"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Description</h3>
                  <p className="mt-2 text-muted-foreground">{complaint.complaint_details}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Submitted by: {complaint.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Date: {formatDate(complaint.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Department: {getDepartmentName(complaint.department_id)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Service: {complaint.service}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <Card>
            <CardHeader>
              <CardTitle>Comments & Updates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {comments.length > 0 ? (
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="border-l-2 border-muted pl-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">{comment.user.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {comment.user.role}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{formatDate(comment.created_at)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{comment.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">No comments yet.</p>
              )}

              <form onSubmit={handleCommentSubmit} className="space-y-3">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment or update..."
                  className="w-full min-h-[80px] p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button type="submit" disabled={!comment.trim()}>
                  <Send className="h-4 w-4 mr-2" />
                  Add Comment
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Status Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Status</label>
                <Select value={complaint.status} onValueChange={handleStatusChange}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Assignment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Department</label>
                <Select value={complaint.department_id || ""} onValueChange={handleDepartmentChange}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept.id} value={dept.id}>
                        {dept.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <p className="text-sm">{complaint.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Phone</label>
                <p className="text-sm">{complaint.phone}</p>
              </div>
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
                    <p className="text-xs text-muted-foreground">{formatDate(complaint.created_at)}</p>
                  </div>
                </div>

                {complaint.updated_at && complaint.updated_at !== complaint.created_at && (
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Last Updated</p>
                      <p className="text-xs text-muted-foreground">{formatDate(complaint.updated_at)}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MoreHorizontal, Search, Shield, Eye } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Department interface
interface Department {
  id: number
  name: string
  description: string
  code: string
}

// Anonymous Complaint interface
interface AnonymousComplaint {
  id: number
  complaint_type: string
  description: string
  location: string
  incident_date: string
  verification_code: string
  reference_number: string
  department_id: number | null
  status: "pending" | "in_progress" | "resolved" | "rejected"
  created_at: string
  updated_at: string
}

export default function AnonymousComplaintsPage() {
  const [complaints, setComplaints] = useState<AnonymousComplaint[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [currentComplaint, setCurrentComplaint] = useState<AnonymousComplaint | null>(null)
  const [user, setUser] = useState<any>(null)
  const [userRole, setUserRole] = useState<string>("")
  const [userDepartmentId, setUserDepartmentId] = useState<string>("")
  const PAGE_SIZE = 10
  const [page, setPage] = useState(1)

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
        const role = session.user.user_metadata?.role || "staff"
        const deptId = session.user.user_metadata?.department_id || null
        setUserRole(role)
        setUserDepartmentId(deptId?.toString() || "")
      }
    }
    getCurrentUser()
  }, [supabase])

  useEffect(() => {
    fetchDepartments()
    fetchComplaints()
  }, [user, userRole, userDepartmentId])

  const fetchDepartments = async () => {
    try {
      const { data, error } = await supabase.from("departments").select("id, name, description, code").order("name")

      if (error) {
        console.error("Error fetching departments:", error)
      } else {
        setDepartments(data || [])
      }
    } catch (error) {
      console.error("Exception fetching departments:", error)
    }
  }

  const fetchComplaints = async () => {
    if (!user) return

    setLoading(true)
    try {
      let query = supabase.from("anonymous_complaints").select("*").order("created_at", { ascending: false })

      // Apply role-based filtering - Department heads only see their department's complaints
      if (userRole === "department_head" && userDepartmentId) {
        const deptId = Number.parseInt(userDepartmentId)
        query = query.eq("department_id", deptId)
      }

      const { data, error } = await query

      if (error) {
        console.error("Error fetching anonymous complaints:", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch anonymous complaints. Please try again.",
        })
      } else {
        setComplaints(data || [])
      }
    } catch (error) {
      console.error("Exception fetching anonymous complaints:", error)
    } finally {
      setLoading(false)
    }
  }

  const getDepartmentName = (departmentId: number | null) => {
    if (!departmentId) return "Not assigned"
    const department = departments.find((d) => d.id === departmentId)
    return department ? department.name : `Unknown (${departmentId})`
  }

  const getCurrentUserDepartmentName = () => {
    return getDepartmentName(Number.parseInt(userDepartmentId || "0"))
  }

  const handleStatusChange = async (complaintId: number, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("anonymous_complaints")
        .update({
          status: newStatus,
          updated_at: new Date().toISOString(),
        })
        .eq("id", complaintId)

      if (error) throw error

      // Update local state
      setComplaints((prev) =>
        prev.map((complaint) =>
          complaint.id === complaintId
            ? { ...complaint, status: newStatus as any, updated_at: new Date().toISOString() }
            : complaint,
        ),
      )

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

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.complaint_type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.reference_number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      getDepartmentName(complaint.department_id).toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || complaint.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const paginatedComplaints = filteredComplaints.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const getStatusBadge = (status: string) => {
    const statusColors = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      in_progress: "bg-blue-100 text-blue-800 border-blue-200",
      resolved: "bg-green-100 text-green-800 border-green-200",
      rejected: "bg-red-100 text-red-800 border-red-200",
    }

    return (
      <span
        className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium border ${
          statusColors[status as keyof typeof statusColors] || statusColors.pending
        }`}
      >
        {status.replace("_", " ")}
      </span>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {userRole === "administrator"
              ? "Anonymous Complaints Management"
              : `${getCurrentUserDepartmentName()} Anonymous Complaints`}
          </h1>
          <p className="text-muted-foreground">
            {userRole === "administrator"
              ? "View and manage all anonymous complaints"
              : `View and manage anonymous complaints for ${getCurrentUserDepartmentName()}`}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            {userRole === "administrator" ? "All Anonymous Complaints" : "Department Anonymous Complaints"}
          </CardTitle>
          <CardDescription>
            {userRole === "administrator"
              ? "Manage anonymous complaints across all departments"
              : "Manage anonymous complaints for your department"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search complaints..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reference #</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Location</TableHead>
                    {userRole === "administrator" && <TableHead>Department</TableHead>}
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={userRole === "administrator" ? 8 : 7} className="text-center py-8">
                        Loading anonymous complaints...
                      </TableCell>
                    </TableRow>
                  ) : paginatedComplaints.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={userRole === "administrator" ? 8 : 7} className="text-center py-8">
                        No anonymous complaints found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedComplaints.map((complaint) => (
                      <TableRow key={complaint.id}>
                        <TableCell className="font-mono text-sm">{complaint.reference_number}</TableCell>
                        <TableCell className="capitalize">{complaint.complaint_type?.replace("-", " ")}</TableCell>
                        <TableCell className="max-w-xs">
                          <div className="text-sm text-muted-foreground">
                            {complaint.description?.slice(0, 50)}
                            {complaint.description?.length > 50 ? "..." : ""}
                          </div>
                        </TableCell>
                        <TableCell>{complaint.location}</TableCell>
                        {userRole === "administrator" && (
                          <TableCell>
                            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                              {getDepartmentName(complaint.department_id)}
                            </span>
                          </TableCell>
                        )}
                        <TableCell>
                          <Select
                            value={complaint.status}
                            onValueChange={(value) => handleStatusChange(complaint.id, value)}
                          >
                            <SelectTrigger className="h-8 w-[130px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="in_progress">In Progress</SelectItem>
                              <SelectItem value="resolved">Resolved</SelectItem>
                              <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          {complaint.created_at ? new Date(complaint.created_at).toLocaleDateString() : ""}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => {
                                  setCurrentComplaint(complaint)
                                  setIsDetailsDialogOpen(true)
                                }}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              <span className="text-sm px-2">
                Page {page} of {Math.ceil(filteredComplaints.length / PAGE_SIZE) || 1}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page * PAGE_SIZE >= filteredComplaints.length}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Anonymous Complaint Details
            </DialogTitle>
            <DialogDescription>
              Reference: {currentComplaint?.reference_number} | Submitted on{" "}
              {currentComplaint?.created_at ? new Date(currentComplaint.created_at).toLocaleDateString() : ""}
            </DialogDescription>
          </DialogHeader>
          {currentComplaint && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Complaint Type</h4>
                  <p className="text-sm text-muted-foreground capitalize">
                    {currentComplaint.complaint_type?.replace("-", " ")}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Status</h4>
                  {getStatusBadge(currentComplaint.status)}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{currentComplaint.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Location</h4>
                  <p className="text-sm text-muted-foreground">{currentComplaint.location}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Incident Date</h4>
                  <p className="text-sm text-muted-foreground">
                    {currentComplaint.incident_date
                      ? new Date(currentComplaint.incident_date).toLocaleDateString()
                      : "Not specified"}
                  </p>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Department</h4>
                <p className="text-sm text-muted-foreground">{getDepartmentName(currentComplaint.department_id)}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailsDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { MoreHorizontal, Search } from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DialogFooter,
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"

const PAGE_SIZE = 10

export default function ComplaintsPage() {
  const [complaints, setComplaints] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc")
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [departments, setDepartments] = useState<any[]>([])
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null)
  const [user, setUser] = useState<any>(null)
  const [userRole, setUserRole] = useState<string>("")
  const [userDepartmentId, setUserDepartmentId] = useState<string>("")
  const [showAssignDialog, setShowAssignDialog] = useState(false)
  const [assignDepartmentId, setAssignDepartmentId] = useState<string>("")

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

  // Fetch departments for filter dropdown
  useEffect(() => {
    async function fetchDepartments() {
      const { data } = await supabase.from("departments").select("*")
      if (data) {
        setDepartments(data)
      }
    }
    fetchDepartments()
  }, [supabase])

  // Fetch complaints from Supabase with role-based filtering
  useEffect(() => {
    async function fetchComplaints() {
      if (!user) return

      setLoading(true)
      try {
        let query = supabase
          .from("complaints")
          .select("*", { count: "exact" })
          .order("created_at", { ascending: sortOrder === "asc" })

        // Apply role-based filtering
        if (userRole !== "administrator" && userDepartmentId) {
          query = query.eq("department_id", userDepartmentId)
        }

        // Apply additional filters
        if (statusFilter !== "all") query = query.eq("status", statusFilter)
        if (departmentFilter !== "all") {
          if (userRole === "administrator") {
            query = query.eq("department_id", departmentFilter)
          }
        }

        // Apply search filter
        if (searchQuery) {
          query = query.or(
            `name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%,complaint_details.ilike.%${searchQuery}%,service.ilike.%${searchQuery}%`,
          )
        }

        // Apply pagination
        query = query.range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1)

        const { data, count, error } = await query

        if (error) throw error

        setComplaints(data || [])
        setTotal(count || 0)
      } catch (error) {
        console.error("Error fetching complaints:", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch complaints. Please try again.",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchComplaints()
  }, [searchQuery, statusFilter, departmentFilter, sortOrder, page, user, userRole, userDepartmentId, supabase, toast])

  // Handle status change with database update
  const handleStatusChange = async (complaintId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("complaints")
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
            ? { ...complaint, status: newStatus, updated_at: new Date().toISOString() }
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

  // Handle department assignment
  const handleAssignDepartment = async () => {
    if (!selectedComplaint || !assignDepartmentId) return

    try {
      const { error } = await supabase
        .from("complaints")
        .update({
          department_id: assignDepartmentId,
          status: "pending", // Reset to pending when reassigned
          updated_at: new Date().toISOString(),
        })
        .eq("id", selectedComplaint.id)

      if (error) throw error

      // Update local state
      setComplaints((prev) =>
        prev.map((complaint) =>
          complaint.id === selectedComplaint.id
            ? {
                ...complaint,
                department_id: assignDepartmentId,
                status: "pending",
                updated_at: new Date().toISOString(),
              }
            : complaint,
        ),
      )

      toast({
        title: "Department Assigned",
        description: `Complaint assigned to ${getDepartmentName(assignDepartmentId)}`,
      })

      setShowAssignDialog(false)
      setSelectedComplaint(null)
      setAssignDepartmentId("")
    } catch (error) {
      console.error("Error assigning department:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to assign department. Please try again.",
      })
    }
  }

  // Get department name by ID, safely handling null/undefined input
  const getDepartmentName = (departmentId: string | null | undefined) => {
    // Return a default string if departmentId is null or undefined
    if (!departmentId) {
      return "Not assigned";
    }
    // Find department, safely accessing d.id
    const dept = departments.find((d) => d.id?.toString() === departmentId.toString());
    // Return department name if found, otherwise indicate department not found for the given ID
    return dept ? dept.name : `Unknown Department (ID: ${departmentId})`;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Complaints Management</h1>
          <p className="text-muted-foreground">
            {userRole === "administrator"
              ? "Manage all complaints across departments"
              : `Manage complaints for ${getDepartmentName(userDepartmentId)}`}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{userRole === "administrator" ? "All Complaints" : "Department Complaints"}</CardTitle>
          <CardDescription>
            {userRole === "administrator"
              ? "Manage and respond to all citizen complaints and feedback"
              : "Manage and respond to complaints assigned to your department"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="grid w-full sm:max-w-sm items-center gap-1.5">
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    type="search"
                    placeholder="Search by name, email, or details..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => {
                      setPage(1)
                      setSearchQuery(e.target.value)
                    }}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <div className="grid gap-1.5">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={statusFilter}
                    onValueChange={(v) => {
                      setPage(1)
                      setStatusFilter(v)
                    }}
                  >
                    <SelectTrigger id="status" className="w-[180px]">
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

                {userRole === "administrator" && (
                  <div className="grid gap-1.5">
                    <Label htmlFor="department">Department</Label>
                    <Select
                      value={departmentFilter}
                      onValueChange={(v) => {
                        setPage(1)
                        setDepartmentFilter(v)
                      }}
                    >
                      <SelectTrigger id="department" className="w-[180px]">
                        <SelectValue placeholder="Filter by department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        {departments.map((dept) => (
                          <SelectItem key={dept.id} value={dept.id.toString()}>
                            {dept.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="grid gap-1.5">
                  <Label htmlFor="sort">Sort</Label>
                  <Select
                    value={sortOrder}
                    onValueChange={(v) => {
                      setPage(1)
                      setSortOrder(v as "asc" | "desc")
                    }}
                  >
                    <SelectTrigger id="sort" className="w-[120px]">
                      <SelectValue placeholder="Sort" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="desc">Newest</SelectItem>
                      <SelectItem value="asc">Oldest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Complaint Type</TableHead>
                    <TableHead>Complaint Details</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={10} className="h-24 text-center">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : complaints.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={10} className="h-24 text-center">
                        No complaints found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    complaints.map((complaint) => (
                      <TableRow key={complaint.id}>
                        <TableCell className="font-medium">{complaint.name}</TableCell>
                        <TableCell>{complaint.phone}</TableCell>
                        <TableCell>{complaint.email}</TableCell>
                        <TableCell>{complaint.service}</TableCell>
                        <TableCell>{complaint.complaint_type}</TableCell>
                        <TableCell>
                          <div className="text-sm text-muted-foreground">
                            <div>
                              {complaint.complaint_details?.slice(0, 50)}
                              {complaint.complaint_details?.length > 50 ? "..." : ""}
                            </div>
                            {complaint.complaint_details?.length > 50 && (
                              <button
                                className="text-primary hover:underline text-xs mt-1"
                                onClick={() => {
                                  setSelectedComplaint(complaint)
                                  setShowDetailsDialog(true)
                                }}
                              >
                                See more
                              </button>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{getDepartmentName(complaint.department_id)}</TableCell>
                        <TableCell>
                          <Select
                            value={complaint.status}
                            onValueChange={(value) => handleStatusChange(complaint.id, value)}
                          >
                            <SelectTrigger className="h-8 w-[130px]">
                              <SelectValue placeholder="Status" />
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
                              <DropdownMenuItem>
                                <Link href={`/dashboard/complaints/${complaint.id}`} className="w-full">
                                  View details
                                </Link>
                              </DropdownMenuItem>
                              {userRole === "administrator" && (
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedComplaint(complaint)
                                    setAssignDepartmentId(complaint.department_id || "")
                                    setShowAssignDialog(true)
                                  }}
                                >
                                  Assign to department
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Add comment</DropdownMenuItem>
                              {userRole === "administrator" && (
                                <>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive">Delete complaint</DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>

              {/* Details Dialog */}
              <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Complaint Details</DialogTitle>
                    <DialogDescription>
                      Submitted by {selectedComplaint?.name} on{" "}
                      {selectedComplaint?.created_at ? new Date(selectedComplaint.created_at).toLocaleDateString() : ""}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Complaint Details</h4>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {selectedComplaint?.complaint_details}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Contact Information</h4>
                        <p className="text-sm text-muted-foreground">
                          Phone: {selectedComplaint?.phone}
                          <br />
                          Email: {selectedComplaint?.email}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Service Information</h4>
                        <p className="text-sm text-muted-foreground">
                          Service: {selectedComplaint?.service}
                          <br />
                          Type: {selectedComplaint?.complaint_type}
                          <br />
                          Department:{" "}
                          {selectedComplaint?.department_id
                            ? getDepartmentName(selectedComplaint.department_id)
                            : "Not assigned"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    {userRole === "administrator" && (
                      <Button
                        onClick={() => {
                          setShowDetailsDialog(false)
                          setAssignDepartmentId(selectedComplaint?.department_id || "")
                          setShowAssignDialog(true)
                        }}
                        className="mr-auto"
                      >
                        Assign to Department
                      </Button>
                    )}
                    <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
                      Close
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Assign Department Dialog */}
              <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Assign to Department</DialogTitle>
                    <DialogDescription>
                      Select a department to handle this complaint. The complaint will be reset to pending status.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="department-assign">Department</Label>
                      <Select value={assignDepartmentId} onValueChange={setAssignDepartmentId}>
                        <SelectTrigger id="department-assign">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept.id} value={dept.id.toString()}>
                              {dept.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowAssignDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAssignDepartment} disabled={!assignDepartmentId}>
                      Assign Department
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex items-center justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              <span className="text-sm px-2">
                Page {page} of {Math.ceil(total / PAGE_SIZE) || 1}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page * PAGE_SIZE >= total}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      {children}
    </label>
  )
}

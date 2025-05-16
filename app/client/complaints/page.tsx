"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { MoreHorizontal, Plus, Search } from "lucide-react"
import { createClient } from "@supabase/supabase-js"
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

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

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
  const [departments, setDepartments] = useState<string[]>(["all"])

  // Fetch departments for filter dropdown
  useEffect(() => {
    async function fetchDepartments() {
      const { data } = await supabase.from("departments").select("name")
      if (data) {
        setDepartments(["all", ...data.map((d: any) => d.name)])
      }
    }
    fetchDepartments()
  }, [])

  // Fetch complaints from Supabase
  useEffect(() => {
    async function fetchComplaints() {
      setLoading(true)
      let query = supabase
        .from("complaints")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: sortOrder === "asc" })
        .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1)

      if (statusFilter !== "all") query = query.eq("status", statusFilter)
      if (departmentFilter !== "all") query = query.eq("department", departmentFilter)
      if (searchQuery) {
        // For search, fetch all and filter client-side (Supabase doesn't support full-text search on multiple fields by default)
        const { data, count } = await supabase
          .from("complaints")
          .select("*", { count: "exact" })
          .order("created_at", { ascending: sortOrder === "asc" })
        const filtered = (data || []).filter(
          (complaint: any) =>
            complaint.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            complaint.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            complaint.id?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        setComplaints(filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE))
        setTotal(filtered.length)
        setLoading(false)
        return
      }

      const { data, count } = await query
      setComplaints(data || [])
      setTotal(count || 0)
      setLoading(false)
    }
    fetchComplaints()
  }, [searchQuery, statusFilter, departmentFilter, sortOrder, page])

  // Handle status change (client-side only, for demo)
  const handleStatusChange = (complaintId: string, newStatus: string) => {
    setComplaints((prev) =>
      prev.map((complaint) => (complaint.id === complaintId ? { ...complaint, status: newStatus } : complaint))
    )
    // TODO: Update in Supabase if you want to persist
  }

  // Handle department assignment (client-side only, for demo)
  const handleDepartmentAssign = (complaintId: string, department: string) => {
    setComplaints((prev) =>
      prev.map((complaint) =>
        complaint.id === complaintId ? { ...complaint, department, status: "in-progress" } : complaint
      )
    )
    // TODO: Update in Supabase if you want to persist
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Complaints Management</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Complaint
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Complaints</CardTitle>
          <CardDescription>Manage and respond to citizen complaints and feedback</CardDescription>
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
                    placeholder="Search by ID, title, or description..."
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
                  <Select value={statusFilter} onValueChange={(v) => { setPage(1); setStatusFilter(v) }}>
                    <SelectTrigger id="status" className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="department">Department</Label>
                  <Select value={departmentFilter} onValueChange={(v) => { setPage(1); setDepartmentFilter(v) }}>
                    <SelectTrigger id="department" className="w-[180px]">
                      <SelectValue placeholder="Filter by department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept === "all" ? "All Departments" : dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="sort">Sort</Label>
                  <Select value={sortOrder} onValueChange={(v) => { setPage(1); setSortOrder(v as "asc" | "desc") }}>
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
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : complaints.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No complaints found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    complaints.map((complaint) => (
                      <TableRow key={complaint.id}>
                        <TableCell className="font-medium">#{complaint.id.slice(0, 8)}</TableCell>
                        <TableCell>
                          <div className="font-medium">{complaint.title}</div>
                          <div className="text-sm text-muted-foreground line-clamp-1">{complaint.description}</div>
                        </TableCell>
                        <TableCell>
                          <Select
                            defaultValue={complaint.department}
                            onValueChange={(value) => handleDepartmentAssign(complaint.id, value)}
                          >
                            <SelectTrigger className="h-8 w-[140px]">
                              <SelectValue placeholder="Assign" />
                            </SelectTrigger>
                            <SelectContent>
                              {departments
                                .filter((d) => d !== "all")
                                .map((dept) => (
                                  <SelectItem key={dept} value={dept}>
                                    {dept}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Select
                            defaultValue={complaint.status}
                            onValueChange={(value) => handleStatusChange(complaint.id, value)}
                          >
                            <SelectTrigger className="h-8 w-[130px]">
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="in-progress">In Progress</SelectItem>
                              <SelectItem value="resolved">Resolved</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          {complaint.created_at
                            ? new Date(complaint.created_at).toLocaleDateString()
                            : ""}
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
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Assign to staff</DropdownMenuItem>
                              <DropdownMenuItem>Add comment</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">Delete complaint</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
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
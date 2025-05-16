"use client"

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash2, Plus, Search } from "lucide-react"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function AnonymousComplaintsPage() {
  const [complaints, setComplaints] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentComplaint, setCurrentComplaint] = useState<any>(null)
  const [newComplaint, setNewComplaint] = useState({
    complaint_type: "",
    description: "",
    location: "",
    incident_date: "",
    reference_number: "",
    status: "",
    department_id: "",
  })
  const PAGE_SIZE = 10
  const [page, setPage] = useState(1)

  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true)
      const { data } = await supabase
        .from("anonymous_complaints")
        .select("id, complaint_type, description, location, incident_date, reference_number, status, created_at, updated_at, department_id")
        .order("created_at", { ascending: false })
      setComplaints(data || [])
      setLoading(false)
    }
    fetchComplaints()
  }, [])

  const filteredComplaints = complaints.filter(
    (c) =>
      c.complaint_type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.reference_number?.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const paginatedComplaints = filteredComplaints.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  // Add, Edit, Delete handlers (implement as in users page, using setComplaints and Supabase)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Anonymous Complaints</h1>
        {/* Add dialog trigger here if needed */}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Anonymous Complaints</CardTitle>
          <CardDescription>Manage anonymous complaints</CardDescription>
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
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Incident Date</TableHead>
                    <TableHead>Reference #</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Department ID</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Updated At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={10}>Loading...</TableCell>
                    </TableRow>
                  ) : paginatedComplaints.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={10}>No complaints found.</TableCell>
                    </TableRow>
                  ) : (
                    paginatedComplaints.map((c) => (
                      <TableRow key={c.id}>
                        <TableCell>{c.complaint_type}</TableCell>
                        <TableCell>{c.description}</TableCell>
                        <TableCell>{c.location}</TableCell>
                        <TableCell>{c.incident_date}</TableCell>
                        <TableCell>{c.reference_number}</TableCell>
                        <TableCell>{c.status}</TableCell>
                        <TableCell>{c.department_id}</TableCell>
                        <TableCell>{c.created_at ? new Date(c.created_at).toLocaleDateString() : ""}</TableCell>
                        <TableCell>{c.updated_at ? new Date(c.updated_at).toLocaleDateString() : ""}</TableCell>
                        <TableCell className="text-right">
                          {/* Add edit/delete dropdown here, similar to users */}
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
    </div>
  )
}
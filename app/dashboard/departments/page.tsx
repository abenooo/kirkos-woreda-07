"use client"

import { useState, useEffect } from "react"
import { Edit, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentDepartment, setCurrentDepartment] = useState<any>(null)
  const [newDepartment, setNewDepartment] = useState({
    name: "",
    description: "",
    head: "",
    email: "",
    phone: "",
    status: "active",
    employeeCount: 0,
    code: "",
  })
  const PAGE_SIZE = 10;
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true)
      try {
        const { data } = await supabase.from("departments").select("*")
        setDepartments(data || [])
      } finally {
        setLoading(false)
      }
    }
    fetchDepartments()
  }, [])

  // Filter departments based on search query
  const filteredDepartments = departments.filter(
    (department) =>
      department.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      department.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      department.head.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const paginatedDepartments = filteredDepartments.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  // Handle adding a new department
  const handleAddDepartment = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("departments")
        .insert([
          {
            name: newDepartment.name,
            description: newDepartment.description,
            code: newDepartment.code,
          }
        ])
        .select()
      if (error) throw error
      // Optionally, fetch all departments again or just append the new one:
      setDepartments((prev) => [...prev, ...(data || [])])
      setIsAddDialogOpen(false)
      setNewDepartment({ name: "", description: "", head: "", email: "", phone: "", status: "active", employeeCount: 0, code: "" })
    } finally {
      setLoading(false)
    }
  }

  // Handle editing a department
  const handleEditDepartment = async () => {
    if (!currentDepartment) return
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("departments")
        .update({
          name: currentDepartment.name,
          description: currentDepartment.description,
          code: currentDepartment.code,
        })
        .eq("id", currentDepartment.id)
        .select()
      if (error) throw error
      setDepartments((prev) =>
        prev.map((dept) => (dept.id === currentDepartment.id ? (data ? data[0] : currentDepartment) : dept))
      )
      setIsEditDialogOpen(false)
    } finally {
      setLoading(false)
    }
  }

  // Handle deleting a department
  const handleDeleteDepartment = async () => {
    if (!currentDepartment) return
    setLoading(true)
    try {
      const { data: users } = await supabase
        .from('users')
        .select('id, name')
        .eq('department_id', currentDepartment.id);

      if (users && users.length > 0) {
        alert(
          `Cannot delete department while users are assigned to it. Users: ${users.map(u => u.name).join(', ')}`
        );
        setIsDeleteDialogOpen(false);
        return;
      }

      const { error } = await supabase
        .from("departments")
        .delete()
        .eq("id", currentDepartment.id)
      if (error) throw error
      setDepartments((prev) => prev.filter((dept) => dept.id !== currentDepartment.id))
      setIsDeleteDialogOpen(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Departments Management</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
              <Plus className="mr-2 h-4 w-4" />
              Add Department
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border-slate-700 text-slate-100">
            <DialogHeader>
              <DialogTitle>Add New Department</DialogTitle>
              <DialogDescription className="text-slate-400">
                Add a new department to the sub-city administration structure.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-slate-300">
                  Department Name
                </Label>
                <Input
                  id="name"
                  value={newDepartment.name}
                  onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-slate-100"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description" className="text-slate-300">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newDepartment.description}
                  onChange={(e) => setNewDepartment({ ...newDepartment, description: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-slate-100"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="head" className="text-slate-300">
                    Department Head
                  </Label>
                  <Input
                    id="head"
                    value={newDepartment.head}
                    onChange={(e) => setNewDepartment({ ...newDepartment, head: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-slate-100"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="employeeCount" className="text-slate-300">
                    Employee Count
                  </Label>
                  <Input
                    id="employeeCount"
                    type="number"
                    value={newDepartment.employeeCount.toString()}
                    onChange={(e) =>
                      setNewDepartment({ ...newDepartment, employeeCount: Number.parseInt(e.target.value) || 0 })
                    }
                    className="bg-slate-800 border-slate-700 text-slate-100"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-slate-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={newDepartment.email}
                  onChange={(e) => setNewDepartment({ ...newDepartment, email: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-slate-100"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone" className="text-slate-300">
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={newDepartment.phone}
                  onChange={(e) => setNewDepartment({ ...newDepartment, phone: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-slate-100"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status" className="text-slate-300">
                  Status
                </Label>
                <Select
                  value={newDepartment.status}
                  onValueChange={(value) => setNewDepartment({ ...newDepartment, status: value })}
                >
                  <SelectTrigger id="status" className="bg-slate-800 border-slate-700 text-slate-100">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="code" className="text-slate-300">
                  Department Code
                </Label>
                <Input
                  id="code"
                  value={newDepartment.code}
                  onChange={(e) => setNewDepartment({ ...newDepartment, code: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-slate-100"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
                className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-slate-100"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddDepartment}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              >
                Add Department
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>All Departments</CardTitle>
          <CardDescription className="text-slate-400">
            Manage the departments in the sub-city administration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                <Input
                  type="search"
                  placeholder="Search departments..."
                  className="pl-8 bg-slate-800/50 border-slate-700 text-slate-100"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="rounded-md border border-slate-700">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={4}>Loading...</TableCell>
                    </TableRow>
                  ) : paginatedDepartments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4}>No departments found.</TableCell>
                    </TableRow>
                  ) : (
                    paginatedDepartments.map((department) => (
                      <TableRow key={department.id}>
                        <TableCell>{department.name}</TableCell>
                        <TableCell>{department.description}</TableCell>
                        <TableCell>{department.code}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setCurrentDepartment(department);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              setCurrentDepartment(department);
                              setIsDeleteDialogOpen(true);
                            }}
                            className="ml-2"
                          >
                            Delete
                          </Button>
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
                Page {page} of {Math.ceil(filteredDepartments.length / PAGE_SIZE) || 1}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page * PAGE_SIZE >= filteredDepartments.length}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Department Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-slate-900 border-slate-700 text-slate-100">
          <DialogHeader>
            <DialogTitle>Edit Department</DialogTitle>
            <DialogDescription className="text-slate-400">Update the details of this department.</DialogDescription>
          </DialogHeader>
          {currentDepartment && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name" className="text-slate-300">
                  Department Name
                </Label>
                <Input
                  id="edit-name"
                  value={currentDepartment.name}
                  onChange={(e) => setCurrentDepartment({ ...currentDepartment, name: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-slate-100"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description" className="text-slate-300">
                  Description
                </Label>
                <Textarea
                  id="edit-description"
                  value={currentDepartment.description}
                  onChange={(e) => setCurrentDepartment({ ...currentDepartment, description: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-slate-100"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-head" className="text-slate-300">
                    Department Head
                  </Label>
                  <Input
                    id="edit-head"
                    value={currentDepartment.head}
                    onChange={(e) => setCurrentDepartment({ ...currentDepartment, head: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-slate-100"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-employeeCount" className="text-slate-300">
                    Employee Count
                  </Label>
                  <Input
                    id="edit-employeeCount"
                    type="number"
                    value={currentDepartment?.employeeCount != null ? currentDepartment.employeeCount.toString() : ""}
                    onChange={(e) =>
                      setCurrentDepartment({
                        ...currentDepartment,
                        employeeCount: Number.parseInt(e.target.value) || 0,
                      })
                    }
                    className="bg-slate-800 border-slate-700 text-slate-100"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-email" className="text-slate-300">
                  Email
                </Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={currentDepartment.email}
                  onChange={(e) => setCurrentDepartment({ ...currentDepartment, email: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-slate-100"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-phone" className="text-slate-300">
                  Phone
                </Label>
                <Input
                  id="edit-phone"
                  value={currentDepartment.phone}
                  onChange={(e) => setCurrentDepartment({ ...currentDepartment, phone: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-slate-100"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-status" className="text-slate-300">
                  Status
                </Label>
                <Select
                  value={currentDepartment.status}
                  onValueChange={(value) => setCurrentDepartment({ ...currentDepartment, status: value })}
                >
                  <SelectTrigger id="edit-status" className="bg-slate-800 border-slate-700 text-slate-100">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-slate-100"
            >
              Cancel
            </Button>
            <Button
              onClick={handleEditDepartment}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Department Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-slate-900 border-slate-700 text-slate-100">
          <DialogHeader>
            <DialogTitle>Delete Department</DialogTitle>
            <DialogDescription className="text-slate-400">
              Are you sure you want to delete this department? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {currentDepartment && (
            <div className="py-4">
              <p className="font-medium text-slate-100">{currentDepartment.name}</p>
              <p className="text-sm text-slate-400">{currentDepartment.description}</p>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-slate-100"
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteDepartment}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

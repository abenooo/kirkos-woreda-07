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
  })

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

  // Handle adding a new department
  const handleAddDepartment = () => {
    const department = {
      id: `d${Date.now()}`,
      ...newDepartment,
      createdAt: new Date().toISOString(),
    }

    setDepartments((prev) => [...prev, department])
    setNewDepartment({
      name: "",
      description: "",
      head: "",
      email: "",
      phone: "",
      status: "active",
      employeeCount: 0,
    })
    setIsAddDialogOpen(false)
  }

  // Handle editing a department
  const handleEditDepartment = () => {
    if (!currentDepartment) return

    setDepartments((prev) => prev.map((dept) => (dept.id === currentDepartment.id ? currentDepartment : dept)))

    setIsEditDialogOpen(false)
  }

  // Handle deleting a department
  const handleDeleteDepartment = () => {
    if (!currentDepartment) return

    setDepartments((prev) => prev.filter((dept) => dept.id !== currentDepartment.id))

    setIsDeleteDialogOpen(false)
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
                <TableHeader className="bg-slate-800/50">
                  <TableRow className="border-slate-700 hover:bg-slate-800/50">
                    <TableHead className="text-slate-300">Department Name</TableHead>
                    <TableHead className="text-slate-300">Head</TableHead>
                    <TableHead className="text-slate-300">Contact</TableHead>
                    <TableHead className="text-slate-300">Employees</TableHead>
                    <TableHead className="text-slate-300">Status</TableHead>
                    <TableHead className="text-right text-slate-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow className="border-slate-700 hover:bg-slate-800/50">
                      <TableCell colSpan={6} className="h-24 text-center text-slate-400">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : filteredDepartments.length === 0 ? (
                    <TableRow className="border-slate-700 hover:bg-slate-800/50">
                      <TableCell colSpan={6} className="h-24 text-center text-slate-400">
                        No departments found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredDepartments.map((department) => (
                      <TableRow key={department.id} className="border-slate-700 hover:bg-slate-800/50">
                        <TableCell className="font-medium text-slate-100">
                          <div>{department.name}</div>
                          <div className="text-xs text-slate-400 mt-1 max-w-xs truncate">{department.description}</div>
                        </TableCell>
                        <TableCell className="text-slate-300">{department.head}</TableCell>
                        <TableCell className="text-slate-300">
                          <div className="text-sm">{department.email}</div>
                          <div className="text-xs text-slate-400">{department.phone}</div>
                        </TableCell>
                        <TableCell className="text-slate-300">{department.employeeCount}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              department.status === "active"
                                ? "default"
                                : department.status === "maintenance"
                                  ? "secondary"
                                  : "outline"
                            }
                            className={
                              department.status === "active"
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : department.status === "maintenance"
                                  ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                  : "bg-slate-500/20 text-slate-400 border-slate-500/30"
                            }
                          >
                            {department.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-slate-100">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700 text-slate-100">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() => {
                                  setCurrentDepartment(department)
                                  setIsEditDialogOpen(true)
                                }}
                                className="hover:bg-slate-700"
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className="bg-slate-700" />
                              <DropdownMenuItem
                                className="text-red-400 hover:bg-slate-700 hover:text-red-400"
                                onClick={() => {
                                  setCurrentDepartment(department)
                                  setIsDeleteDialogOpen(true)
                                }}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
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

            <div className="flex items-center justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-slate-100"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-slate-100"
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
                    value={currentDepartment.employeeCount.toString()}
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

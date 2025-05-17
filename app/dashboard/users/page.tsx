"use client"

import { useEffect, useState } from "react"
import { Edit, Key, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react"
import { createClient } from "@supabase/supabase-js"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { AlertCircle } from "lucide-react"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function DashboardPage() {
  const [complaints, setComplaints] = useState<any[]>([])
  const [feedback, setFeedback] = useState<any[]>([])
  const [anonymousComplaints, setAnonymousComplaints] = useState<any[]>([])
  const [departments, setDepartments] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "staff",
    department_id: "",
    password: "",
    confirmPassword: "",
    status: "active",
  })

  const PAGE_SIZE = 10;
  const [page, setPage] = useState(1);

  useEffect(() => {
    const supabase = createClientComponentClient()
    
    const fetchData = async () => {
      try {
        // First get the current user
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const { data: userData } = await supabase
            .from('users')
            .select('*')
            .eq('id', user.id)
            .single()
          setCurrentUser(userData)
        }

        // Fetch all data
        const [
          { data: complaintsData },
          { data: feedbackData },
          { data: anonymousData },
          { data: departmentsData },
          { data: usersData }
        ] = await Promise.all([
          supabase.from('complaints').select('*'),
          supabase.from('feedback').select('*'),
          supabase.from('anonymous_complaints').select('*'),
          supabase.from('departments').select('*'),
          supabase.from('users').select('*')
        ])

        // Filter data based on user role and department
        if (currentUser?.role === 'department_head') {
          // For department heads, only show their department's data
          setComplaints(complaintsData?.filter(c => c.department_id === currentUser.department_id) || [])
          setAnonymousComplaints(anonymousData?.filter(a => a.department_id === currentUser.department_id) || [])
        } else {
          // For admins, show all data
          setComplaints(complaintsData || [])
          setAnonymousComplaints(anonymousData || [])
        }

        // Set other data
        setFeedback(feedbackData || [])
        setDepartments(departmentsData || [])
        setUsers(usersData || [])
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Stats for the dashboard
  const stats = {
    totalComplaints: complaints.length,
    pendingComplaints: complaints.filter((c) => c.status === "pending").length,
    inProgressComplaints: complaints.filter((c) => c.status === "in_progress").length,
    resolvedComplaints: complaints.filter((c) => c.status === "resolved").length,
    rejectedComplaints: complaints.filter((c) => c.status === "rejected").length,
    totalFeedback: feedback.length,
    totalAnonymous: anonymousComplaints.length,
    totalDepartments: departments.length,
    totalUsers: users.length
  }

  // Get department name from ID
  const getDepartmentName = (departmentId: string) => {
    const department = departments.find(d => d.id === departmentId)
    return department?.name || departmentId
  }

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.department_id + "").toLowerCase().includes(searchQuery.toLowerCase())
  )

  const paginatedUsers = filteredUsers.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  // Handle adding a new user
  const handleAddUser = async () => {
    // Validate form as needed
    if (
      !newUser.name ||
      !newUser.email ||
      !newUser.role ||
      !newUser.department_id ||
      !newUser.status
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          department_id: newUser.department_id,
        }
      ])
      .select();

    if (error) {
      alert("Failed to add user: " + error.message);
      return;
    }

    setUsers((prev) => [...prev, ...(data || [])]);
    setIsAddDialogOpen(false);
    setNewUser({
      name: "",
      email: "",
      role: "staff",
      department_id: "",
      password: "",
      confirmPassword: "",
      status: "active",
    });
  };

  // Handle editing a user
  const handleEditUser = async () => {
    if (!currentUser) return;

    const { data, error } = await supabase
      .from("users")
      .update({
        name: currentUser.name,
        email: currentUser.email,
        role: currentUser.role,
        department_id: currentUser.department_id,
      })
      .eq("id", currentUser.id)
      .select();

    if (error) {
      alert("Failed to update user: " + error.message);
      return;
    }

    setUsers((prev) =>
      prev.map((user) => (user.id === currentUser.id ? (data ? data[0] : currentUser) : user))
    );
    setIsEditDialogOpen(false);
  };

  // Handle deleting a user
  const handleDeleteUser = async () => {
    if (!currentUser) return;

    const { error } = await supabase
      .from("users")
      .delete()
      .eq("id", currentUser.id);

    if (error) {
      alert("Failed to delete user: " + error.message);
      return;
    }

    setUsers((prev) => prev.filter((user) => user.id !== currentUser.id));
    setIsDeleteDialogOpen(false);
  };

  // Get role badge variant
  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "administrator":
        return "default"
      case "department_head":
        return "secondary"
      default:
        return "outline"
    }
  }

  // Get role display name
  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "administrator":
        return "Administrator"
      case "department_head":
        return "Department Head"
      case "staff":
        return "Staff"
      default:
        return role
    }
  }

  if (loading) {
    return <div className="p-8 text-center">Loading dashboard data...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          {currentUser?.role === 'department_head' && (
            <p className="text-muted-foreground">
              Department: {getDepartmentName(currentUser.department_id)}
            </p>
          )}
        </div>
        {/* ... (keep existing timeframe selector) */}
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Complaints</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalComplaints}</div>
            <p className="text-xs text-muted-foreground">
              {stats.pendingComplaints} pending, {stats.resolvedComplaints} resolved
            </p>
          </CardContent>
        </Card>
        {/* ... (keep other stat cards) */}
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="complaints">Complaints</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="anonymous">Anonymous</TabsTrigger>
          {currentUser?.role === 'administrator' && (
            <>
              <TabsTrigger value="departments">Departments</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
            </>
          )}
        </TabsList>

        {/* Complaints Tab */}
        <TabsContent value="complaints">
          <Card>
            <CardHeader>
              <CardTitle>
                {currentUser?.role === 'department_head' 
                  ? `${getDepartmentName(currentUser.department_id)} Complaints`
                  : 'All Complaints'}
              </CardTitle>
              <CardDescription>
                {currentUser?.role === 'department_head'
                  ? 'Complaints for your department'
                  : 'All complaints across departments'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {complaints.map((complaint) => (
                    <TableRow key={complaint.id}>
                      <TableCell>{complaint.name}</TableCell>
                      <TableCell>{complaint.email}</TableCell>
                      <TableCell>{complaint.service}</TableCell>
                      <TableCell>
                        <Badge>{complaint.status}</Badge>
                      </TableCell>
                      <TableCell>{new Date(complaint.created_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Anonymous Complaints Tab */}
        <TabsContent value="anonymous">
          <Card>
            <CardHeader>
              <CardTitle>
                {currentUser?.role === 'department_head'
                  ? `${getDepartmentName(currentUser.department_id)} Anonymous Complaints`
                  : 'All Anonymous Complaints'}
              </CardTitle>
              <CardDescription>
                {currentUser?.role === 'department_head'
                  ? 'Anonymous complaints for your department'
                  : 'All anonymous complaints across departments'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {anonymousComplaints.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.complaint_type}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{item.location}</TableCell>
                      <TableCell>
                        <Badge>{item.status}</Badge>
                      </TableCell>
                      <TableCell>{new Date(item.created_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Only show these tabs for administrators */}
        {currentUser?.role === 'administrator' && (
          <>
            <TabsContent value="departments">
              {/* ... (keep existing departments tab content) */}
            </TabsContent>
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>All Users</CardTitle>
                  <CardDescription>Manage user accounts and their permissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search users..."
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
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Department ID</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead>Updated At</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {loading ? (
                            <TableRow>
                              <TableCell colSpan={6}>Loading...</TableCell>
                            </TableRow>
                          ) : paginatedUsers.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={6}>No users found.</TableCell>
                            </TableRow>
                          ) : (
                            paginatedUsers.map((user) => (
                              <TableRow key={user.id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>{user.department_id}</TableCell>
                                <TableCell>{user.created_at ? new Date(user.created_at).toLocaleDateString() : ""}</TableCell>
                                <TableCell>{user.updated_at ? new Date(user.updated_at).toLocaleDateString() : ""}</TableCell>
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
                                      <DropdownMenuItem
                                        onClick={() => {
                                          setCurrentUser(user);
                                          setIsEditDialogOpen(true);
                                        }}
                                      >
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem
                                        className="text-destructive"
                                        onClick={() => {
                                          setCurrentUser(user);
                                          setIsDeleteDialogOpen(true);
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
                        Page {page} of {Math.ceil(filteredUsers.length / PAGE_SIZE) || 1}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={page * PAGE_SIZE >= filteredUsers.length}
                        onClick={() => setPage((p) => p + 1)}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </>
        )}
      </Tabs>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user details and permissions.</DialogDescription>
          </DialogHeader>
          {currentUser && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Full Name</Label>
                <Input
                  id="edit-name"
                  value={currentUser.name}
                  onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={currentUser.email}
                  onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-role">Role</Label>
                  <Select
                    value={currentUser.role}
                    onValueChange={(value) => setCurrentUser({ ...currentUser, role: value })}
                  >
                    <SelectTrigger id="edit-role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="administrator">Administrator</SelectItem>
                      <SelectItem value="department_head">Department Head</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-department">Department</Label>
                  <Select
                    value={currentUser.department_id}
                    onValueChange={(value) => setCurrentUser({ ...currentUser, department_id: value })}
                  >
                    <SelectTrigger id="edit-department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Administration">Administration</SelectItem>
                      <SelectItem value="Water & Sewage">Water & Sewage</SelectItem>
                      <SelectItem value="Roads & Infrastructure">Roads & Infrastructure</SelectItem>
                      <SelectItem value="Waste Management">Waste Management</SelectItem>
                      <SelectItem value="Public Safety">Public Safety</SelectItem>
                      <SelectItem value="Housing">Housing</SelectItem>
                      <SelectItem value="Health Services">Health Services</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  value={currentUser.status}
                  onValueChange={(value) => setCurrentUser({ ...currentUser, status: value })}
                >
                  <SelectTrigger id="edit-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditUser}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {currentUser && (
            <div className="py-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt={currentUser.name} />
                  <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{currentUser.name}</div>
                  <div className="text-sm text-muted-foreground">{currentUser.email}</div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

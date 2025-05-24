"use client"

import { useEffect, useState } from "react"
import {
  Edit,
  Key,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  Mail,
  CheckCircle2,
  AlertTriangle,
  Shield,
} from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { getAuthenticatedUsers, updateUserMetadata, deleteAuthUser } from "../../actions/user-actions"

const PAGE_SIZE = 10

interface AuthUser {
  id: string
  name: string
  email: string
  role: string
  department_id: number
  status: string
  created_at: string
  email_confirmed_at?: string
  last_sign_in_at?: string
}

interface Department {
  id: number
  name: string
  code: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<AuthUser[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null)
  const [currentLoggedUser, setCurrentLoggedUser] = useState<any>(null)
  const [userRole, setUserRole] = useState<string>("")
  const [page, setPage] = useState(1)
  const [debugInfo, setDebugInfo] = useState<string>("")

  const supabase = createClientComponentClient()
  const { toast } = useToast()
  const router = useRouter()

  // Check if user is admin
  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user) {
        router.push("/dashboard/login")
        return
      }

      const role = session.user.user_metadata?.role || "staff"
      setCurrentLoggedUser(session.user)
      setUserRole(role)

      // Only administrators can access this page
      if (role !== "administrator") {
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: "Only administrators can manage users.",
        })
        router.push("/dashboard")
        return
      }
    }

    checkAuth()
  }, [supabase, router, toast])

  useEffect(() => {
    if (userRole === "administrator") {
      fetchUsers()
      fetchDepartments()
    }
  }, [userRole])

  const fetchDepartments = async () => {
    try {
      const { data, error } = await supabase.from("departments").select("*").order("name")
      if (error) throw error
      setDepartments(data || [])
    } catch (error) {
      console.error("Error fetching departments:", error)
    }
  }

  const fetchUsers = async () => {
    setLoading(true)
    try {
      console.log("Fetching users via server action...")

      const result = await getAuthenticatedUsers()

      if (!result.success) {
        console.error("Server action error:", result.error)
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error || "Failed to fetch users",
        })
        return
      }

      console.log("Users fetched successfully:", result.users.length)
      setUsers(result.users)

      toast({
        title: "Users Loaded",
        description: `Loaded ${result.users.length} authenticated users.`,
      })
    } catch (error) {
      console.error("Exception fetching users:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch users. Check console for details.",
      })
    } finally {
      setLoading(false)
    }
  }

  const getDepartmentName = (departmentId: number) => {
    const dept = departments.find((d) => d.id === departmentId)
    return dept ? dept.name : "Unknown"
  }

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      getDepartmentName(user.department_id).toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Paginate users
  const paginatedUsers = filteredUsers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleEditUser = async () => {
    if (!currentUser) return

    try {
      setLoading(true)

      const result = await updateUserMetadata(currentUser.id, {
        name: currentUser.name,
        role: currentUser.role,
        department_id: currentUser.department_id,
        status: currentUser.status,
      })

      if (!result.success) {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error || "Failed to update user.",
        })
      } else {
        toast({
          title: "User Updated",
          description: `${currentUser.name} has been updated successfully.`,
        })
        fetchUsers() // Refresh the users list
        setIsEditDialogOpen(false)
        setCurrentUser(null)
      }
    } catch (error) {
      console.error("Error updating user:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred while updating the user.",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUser = async () => {
    if (!currentUser) return

    try {
      setLoading(true)

      const result = await deleteAuthUser(currentUser.id)

      if (!result.success) {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error || "Failed to delete user.",
        })
      } else {
        toast({
          title: "User Deleted",
          description: `${currentUser.name} has been deleted successfully.`,
        })
        fetchUsers() // Refresh the users list
        setIsDeleteDialogOpen(false)
        setCurrentUser(null)
      }
    } catch (error) {
      console.error("Error deleting user:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred while deleting the user.",
      })
    } finally {
      setLoading(false)
    }
  }

  const resendConfirmationEmail = async (email: string, userName: string) => {
    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard/login`,
        },
      })

      if (error) {
        toast({
          variant: "destructive",
          title: "Failed to Resend Email",
          description: error.message,
        })
      } else {
        toast({
          title: "Confirmation Email Sent",
          description: `A new confirmation email has been sent to ${email}`,
        })
      }
    } catch (error) {
      console.error("Error resending confirmation email:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to resend confirmation email.",
      })
    }
  }

  const resetUserPassword = async (userId: string, email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/dashboard/login`,
      })

      if (error) {
        toast({
          variant: "destructive",
          title: "Failed to Send Reset Email",
          description: error.message,
        })
      } else {
        toast({
          title: "Password Reset Email Sent",
          description: `A password reset email has been sent to ${email}`,
        })
      }
    } catch (error) {
      console.error("Error sending password reset:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send password reset email.",
      })
    }
  }

  useEffect(() => {
    const checkUserCapabilities = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (session?.user) {
        const debugData = {
          userId: session.user.id,
          email: session.user.email,
          role: session.user.user_metadata?.role,
          isAdmin: session.user.user_metadata?.role === "administrator",
          hasServiceRole: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        }
        setDebugInfo(JSON.stringify(debugData, null, 2))
        console.log("User capabilities:", debugData)
      }
    }

    if (userRole === "administrator") {
      checkUserCapabilities()
    }
  }, [userRole, supabase])

  if (userRole !== "administrator") {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Shield className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
          <p className="text-muted-foreground">Only administrators can access user management.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">Manage authenticated users and their permissions</p>
        </div>
        <Button onClick={() => router.push("/dashboard/register")}>
          <Plus className="mr-2 h-4 w-4" />
          Add New User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Authenticated Users</CardTitle>
          <CardDescription>
            Manage user accounts, roles, and permissions. These are users registered through the authentication system.
          </CardDescription>
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
              <Button variant="outline" onClick={fetchUsers} disabled={loading}>
                {loading ? "Refreshing..." : "Refresh"}
              </Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email Status</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Registered</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        Loading users...
                      </TableCell>
                    </TableRow>
                  ) : paginatedUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        No users found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user.name} />
                              <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {user.email_confirmed_at ? (
                            <div className="flex items-center space-x-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                              <span className="text-green-700 text-sm">Confirmed</span>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-2">
                              <AlertTriangle className="h-4 w-4 text-yellow-500" />
                              <span className="text-yellow-700 text-sm">Pending</span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                            {user.role}
                          </span>
                        </TableCell>
                        <TableCell>{getDepartmentName(user.department_id)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {user.status === "active" ? (
                              <>
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                <div className="flex flex-col">
                                  <span className="text-green-700 text-sm">Active</span>
                                  {user.last_sign_in_at && (
                                    <span className="text-xs text-muted-foreground">
                                      Last login: {new Date(user.last_sign_in_at).toLocaleDateString()}
                                    </span>
                                  )}
                                </div>
                              </>
                            ) : (
                              <>
                                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                <span className="text-yellow-700 text-sm">Pending</span>
                              </>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
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
                                  setCurrentUser(user)
                                  setIsEditDialogOpen(true)
                                }}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit User
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => resetUserPassword(user.id, user.email)}>
                                <Key className="mr-2 h-4 w-4" />
                                Reset Password
                              </DropdownMenuItem>
                              {!user.email_confirmed_at && (
                                <DropdownMenuItem onClick={() => resendConfirmationEmail(user.email, user.name)}>
                                  <Mail className="mr-2 h-4 w-4" />
                                  Resend Confirmation
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => {
                                  setCurrentUser(user)
                                  setIsDeleteDialogOpen(true)
                                }}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete User
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
                <Label htmlFor="edit-email">Email (Read Only)</Label>
                <Input id="edit-email" type="email" value={currentUser.email} disabled />
                <p className="text-xs text-muted-foreground">Email cannot be changed after registration</p>
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
                    value={currentUser.department_id.toString()}
                    onValueChange={(value) => setCurrentUser({ ...currentUser, department_id: Number.parseInt(value) })}
                  >
                    <SelectTrigger id="edit-department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept.id} value={dept.id.toString()}>
                          {dept.name} ({dept.code})
                        </SelectItem>
                      ))}
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
            <Button onClick={handleEditUser} disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone and will permanently remove the
              user from the authentication system.
            </DialogDescription>
          </DialogHeader>
          {currentUser && (
            <div className="py-4">
              <div className="flex items-center gap-3 p-4 border rounded-lg bg-destructive/5">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt={currentUser.name} />
                  <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{currentUser.name}</div>
                  <div className="text-sm text-muted-foreground">{currentUser.email}</div>
                  <div className="text-sm text-muted-foreground">Role: {currentUser.role}</div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser} disabled={loading}>
              {loading ? "Deleting..." : "Delete User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

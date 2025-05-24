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
import { MoreHorizontal, Edit, Trash2, Plus, Search, Star } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Department interface
interface Department {
  id: number
  name: string
  description: string
  code: string
}

// Feedback interface
interface Feedback {
  id: number
  name: string
  email: string
  service: string
  rating: string | number
  feedback_details: string
  department_id: number | null
  created_at: string
  updated_at: string
}

export default function FeedbacksPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentFeedback, setCurrentFeedback] = useState<Feedback | null>(null)
  const [user, setUser] = useState<any>(null)
  const [userRole, setUserRole] = useState<string>("")
  const [userDepartmentId, setUserDepartmentId] = useState<string>("")
  const [newFeedback, setNewFeedback] = useState<Omit<Feedback, "id" | "created_at" | "updated_at">>({
    name: "",
    email: "",
    service: "",
    rating: "",
    feedback_details: "",
    department_id: null,
  })
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
    fetchFeedbacks()
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

  const fetchFeedbacks = async () => {
    if (!user) return

    setLoading(true)
    try {
      let query = supabase.from("feedback").select("*").order("created_at", { ascending: false })

      // Apply role-based filtering - Department heads only see their department's feedback
      if (userRole === "department_head" && userDepartmentId) {
        const deptId = Number.parseInt(userDepartmentId)
        query = query.eq("department_id", deptId)
      }

      const { data, error } = await query

      if (error) {
        console.error("Error fetching feedbacks:", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch feedback. Please try again.",
        })
      } else {
        setFeedbacks(data || [])
      }
    } catch (error) {
      console.error("Exception fetching feedbacks:", error)
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

  const filteredFeedbacks = feedbacks.filter(
    (f) =>
      f.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.service?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.feedback_details?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      getDepartmentName(f.department_id).toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const paginatedFeedbacks = filteredFeedbacks.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleAddFeedback = async () => {
    try {
      const { data, error } = await supabase.from("feedback").insert([newFeedback]).select()

      if (error) {
        console.error("Error adding feedback:", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to add feedback. Please try again.",
        })
      } else {
        setFeedbacks([...feedbacks, data[0]])
        setIsAddDialogOpen(false)
        setNewFeedback({
          name: "",
          email: "",
          service: "",
          rating: "",
          feedback_details: "",
          department_id: null,
        })
        toast({
          title: "Success",
          description: "Feedback added successfully.",
        })
      }
    } catch (error) {
      console.error("Exception adding feedback:", error)
    }
  }

  const handleEditFeedback = async () => {
    if (!currentFeedback) return

    try {
      const { data, error } = await supabase
        .from("feedback")
        .update(currentFeedback)
        .eq("id", currentFeedback.id)
        .select()

      if (error) {
        console.error("Error updating feedback:", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update feedback. Please try again.",
        })
      } else {
        setFeedbacks(feedbacks.map((f) => (f.id === currentFeedback.id ? currentFeedback : f)))
        setIsEditDialogOpen(false)
        setCurrentFeedback(null)
        toast({
          title: "Success",
          description: "Feedback updated successfully.",
        })
      }
    } catch (error) {
      console.error("Exception updating feedback:", error)
    }
  }

  const handleDeleteFeedback = async () => {
    if (!currentFeedback) return

    try {
      const { error } = await supabase.from("feedback").delete().eq("id", currentFeedback.id)

      if (error) {
        console.error("Error deleting feedback:", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete feedback. Please try again.",
        })
      } else {
        setFeedbacks(feedbacks.filter((f) => f.id !== currentFeedback.id))
        setIsDeleteDialogOpen(false)
        setCurrentFeedback(null)
        toast({
          title: "Success",
          description: "Feedback deleted successfully.",
        })
      }
    } catch (error) {
      console.error("Exception deleting feedback:", error)
    }
  }

  const renderStars = (rating: string | number) => {
    const numRating = Number(rating)
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${star <= numRating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">({numRating})</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {userRole === "administrator" ? "Feedback Management" : `${getCurrentUserDepartmentName()} Feedback`}
          </h1>
          <p className="text-muted-foreground">
            {userRole === "administrator"
              ? "View and manage all user feedback"
              : `View and manage feedback for ${getCurrentUserDepartmentName()}`}
          </p>
        </div>
        {userRole === "administrator" && (
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Feedback
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{userRole === "administrator" ? "All Feedback" : "Department Feedback"}</CardTitle>
          <CardDescription>
            {userRole === "administrator"
              ? "View and manage user feedback across all departments"
              : "View and manage feedback for your department"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search feedback..."
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
                    <TableHead>Service</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Feedback Details</TableHead>
                    {userRole === "administrator" && <TableHead>Department</TableHead>}
                    <TableHead>Created At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={userRole === "administrator" ? 8 : 7} className="text-center py-8">
                        Loading feedback...
                      </TableCell>
                    </TableRow>
                  ) : paginatedFeedbacks.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={userRole === "administrator" ? 8 : 7} className="text-center py-8">
                        No feedback found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedFeedbacks.map((feedback) => (
                      <TableRow key={feedback.id}>
                        <TableCell className="font-medium">{feedback.name || "Anonymous"}</TableCell>
                        <TableCell>{feedback.email || "Not provided"}</TableCell>
                        <TableCell>{feedback.service}</TableCell>
                        <TableCell>{renderStars(feedback.rating)}</TableCell>
                        <TableCell className="max-w-xs">
                          <div className="text-sm text-muted-foreground">
                            {feedback.feedback_details?.slice(0, 50)}
                            {feedback.feedback_details?.length > 50 ? "..." : ""}
                          </div>
                        </TableCell>
                        {userRole === "administrator" && (
                          <TableCell>
                            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                              {getDepartmentName(feedback.department_id)}
                            </span>
                          </TableCell>
                        )}
                        <TableCell>
                          {feedback.created_at ? new Date(feedback.created_at).toLocaleDateString() : ""}
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
                              {userRole === "administrator" && (
                                <>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setCurrentFeedback(feedback)
                                      setIsEditDialogOpen(true)
                                    }}
                                  >
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setCurrentFeedback(feedback)
                                      setIsDeleteDialogOpen(true)
                                    }}
                                    className="text-red-600"
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </>
                              )}
                              <DropdownMenuItem>View details</DropdownMenuItem>
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
                Page {page} of {Math.ceil(filteredFeedbacks.length / PAGE_SIZE) || 1}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page * PAGE_SIZE >= filteredFeedbacks.length}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Feedback Dialog - Only for administrators */}
      {userRole === "administrator" && (
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Feedback</DialogTitle>
              <DialogDescription>Create a new feedback entry in the system.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  value={newFeedback.name}
                  onChange={(e) => setNewFeedback({ ...newFeedback, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="email" className="text-right text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={newFeedback.email}
                  onChange={(e) => setNewFeedback({ ...newFeedback, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="service" className="text-right text-sm font-medium">
                  Service
                </label>
                <Input
                  id="service"
                  value={newFeedback.service}
                  onChange={(e) => setNewFeedback({ ...newFeedback, service: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="rating" className="text-right text-sm font-medium">
                  Rating
                </label>
                <Input
                  id="rating"
                  type="number"
                  min="1"
                  max="5"
                  value={newFeedback.rating}
                  onChange={(e) => setNewFeedback({ ...newFeedback, rating: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="feedback_details" className="text-right text-sm font-medium">
                  Feedback Details
                </label>
                <Input
                  id="feedback_details"
                  value={newFeedback.feedback_details}
                  onChange={(e) => setNewFeedback({ ...newFeedback, feedback_details: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="department_id" className="text-right text-sm font-medium">
                  Department
                </label>
                <Select
                  value={newFeedback.department_id?.toString() || "0"}
                  onValueChange={(value) =>
                    setNewFeedback({ ...newFeedback, department_id: value ? Number.parseInt(value) : null })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Not assigned</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept.id} value={dept.id.toString()}>
                        {dept.name} ({dept.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddFeedback}>Add Feedback</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit and Delete dialogs - Only for administrators */}
      {userRole === "administrator" && (
        <>
          {/* Edit Feedback Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Edit Feedback</DialogTitle>
                <DialogDescription>Update the feedback information.</DialogDescription>
              </DialogHeader>
              {currentFeedback && (
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="edit-name" className="text-right text-sm font-medium">
                      Name
                    </label>
                    <Input
                      id="edit-name"
                      value={currentFeedback.name}
                      onChange={(e) => setCurrentFeedback({ ...currentFeedback, name: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="edit-email" className="text-right text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="edit-email"
                      type="email"
                      value={currentFeedback.email}
                      onChange={(e) => setCurrentFeedback({ ...currentFeedback, email: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="edit-service" className="text-right text-sm font-medium">
                      Service
                    </label>
                    <Input
                      id="edit-service"
                      value={currentFeedback.service}
                      onChange={(e) => setCurrentFeedback({ ...currentFeedback, service: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="edit-rating" className="text-right text-sm font-medium">
                      Rating
                    </label>
                    <Input
                      id="edit-rating"
                      type="number"
                      min="1"
                      max="5"
                      value={currentFeedback.rating}
                      onChange={(e) => setCurrentFeedback({ ...currentFeedback, rating: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="edit-feedback_details" className="text-right text-sm font-medium">
                      Feedback Details
                    </label>
                    <Input
                      id="edit-feedback_details"
                      value={currentFeedback.feedback_details}
                      onChange={(e) => setCurrentFeedback({ ...currentFeedback, feedback_details: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="edit-department_id" className="text-right text-sm font-medium">
                      Department
                    </label>
                    <Select
                      value={currentFeedback.department_id?.toString() || "0"}
                      onValueChange={(value) =>
                        setCurrentFeedback({
                          ...currentFeedback,
                          department_id: value ? Number.parseInt(value) : null,
                        })
                      }
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Not assigned</SelectItem>
                        {departments.map((dept) => (
                          <SelectItem key={dept.id} value={dept.id.toString()}>
                            {dept.name} ({dept.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleEditFeedback}>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Delete Feedback Dialog */}
          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Delete Feedback</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this feedback? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDeleteFeedback}>
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  )
}
